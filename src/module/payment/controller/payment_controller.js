import { inject, ref, computed, onBeforeUnmount } from "vue";
import { paymentKeys } from "../keys/payment_keys";
import { paymentPixDefault } from "../domain/payment/payment_pix";
import { QrcodeSvg } from "qrcode.vue";

const form = ref(paymentPixDefault())
const formRef = ref(null)
const loading = ref(false)
const paymentDialog = ref(false)
const selectedProduct = ref(null)
const selectedQty = ref(1)
const currentStep = ref(1)
const isPix = ref(true)
const qrCodeGenerated = ref({})
const now = ref(Date.now())
let timerInterval = null
const copySuccess = ref(false)
const paymentState = ref({})
const statusPaymentDialog = ref(false)

function paymentController() {
    const createPaymentPixUseCaseImpl = inject(paymentKeys.createPaymentPixUseCaseImpl)
    const getPaymentStatusByIdUseCaseImpl = inject(paymentKeys.getPaymentStatusByIdUseCaseImpl)
    const createSimulatePaymentPixUseCaseImpl = inject(paymentKeys.createSimulatePaymentPixUseCaseImpl)

    const formatPhone = (input) => {
        let numbers = input.replace(/\D/g, '')
        if (numbers.length > 11) numbers = numbers.slice(0, 11)
        if (numbers.length <= 10) {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
        } else {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
        }
    }

    const formatCpfCnpj = (input) => {
        let numbers = input.replace(/\D/g, '')
        if (numbers.length <= 11) {
            return numbers
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        } else {
            // CNPJ - comentado por enquanto, manter apenas CPF
            // return numbers.substring(0, 14)
            //     .replace(/(\d{2})(\d)/, '$1.$2')
            //     .replace(/(\d{3})(\d)/, '$1.$2')
            //     .replace(/(\d{3})(\d)/, '$1/$2')
            //     .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
            return numbers.substring(0, 11)
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        }
    }

    const formatTitle = (input) => {
        return input.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    const formatCep = (input) => {
        let numbers = input.replace(/\D/g, '')
        if (numbers.length > 8) numbers = numbers.slice(0, 8)
        return numbers.replace(/(\d{5})(\d)/, '$1-$2')
    }

    const helper = {
        requiredRules: [
            v => !!v || 'Campo obrigatório',
            v => (v && v.length >= 3) || 'Mínimo de 3 caracteres'
        ],
        cpfRules: [
            value => {
                if (value) return true
                return 'CPF/CNPJ é obrigatório.'
            },
            value => {
                if (/^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})$/.test(value)) return true
                return 'Formato inválido.'
            }
        ],
        phoneRules: [
            value => {
                if (value) return true
                return 'Celular é obrigatório.'
            },
            value => {
                const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/
                return regex.test(value) || 'Formato inválido. Use: (00) 00000-0000'
            }
        ],
        cepRules: [
            v => !!v || 'CEP obrigatório',
            v => /^\d{5}-\d{3}$/.test(v) || 'CEP inválido (ex: 00000-000)'
        ]
    }

    const resetForm = () => {
        form.value = paymentPixDefault()
    }

    const generatePixQrCode = async () => {
        try{
            loading.value = true
            const payload = {
                quantity: form.value.quantity,
                isKit: form.value.is_kit
            }
            qrCodeGenerated.value = await createPaymentPixUseCaseImpl(payload)

            startTimer()
            nextStep()
        } catch (err) {
            console.log(err);
        } finally {
            loading.value = false
        }
    }

    const checkPayment = async () => {
        try {
            loading.value = true
            console.log(qrCodeGenerated.value);
            
            paymentState.value = await getPaymentStatusByIdUseCaseImpl(qrCodeGenerated.value.id)
            console.log(paymentState.value);
            
        } catch (err) {
            console.log('Erro ao consultar estado do pagamento: ', err);
        } finally {
            loading.value = false
        }
    }

    const setSelectedProduct = (product, qty) => {
        selectedProduct.value = product
        selectedQty.value = qty
    }

    const handlePaymentDialog = (product, qty) => {
        form.value = {
            ...paymentPixDefault(),
            products: product.name,
            quantity: qty,
            is_kit: product.isKit
        }        
        
        setSelectedProduct(product, qty)
        paymentDialog.value = true
    }

    const formatBRL = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    const timeRemaining = computed(() => {
        if (!qrCodeGenerated.value?.expiresAt) return null
        const diff = new Date(qrCodeGenerated.value.expiresAt).getTime() - now.value
        if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true, text: 'Expirado' }
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        return {
            hours,
            minutes,
            seconds,
            expired: false,
            text: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }
    })

    const startTimer = () => {
        stopTimer()
        now.value = Date.now()
        timerInterval = setInterval(() => {
            now.value = Date.now()
        }, 1000)
    }

    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval)
            timerInterval = null
        }
    }

    const copyPixCode = async () => {
        if (!qrCodeGenerated.value?.brCode) return
        try {
            await navigator.clipboard.writeText(qrCodeGenerated.value.brCode)
            copySuccess.value = true
            setTimeout(() => { copySuccess.value = false }, 2000)
        } catch (err) {
            console.error('Erro ao copiar:', err)
        }
    }

    const nextStep = () => {
        if (currentStep.value < 3) {
            currentStep.value++
        }
    }

    const prevStep = () => {
        if (currentStep.value > 1) {
            currentStep.value--
        }
    }

    const submitStep1 = async () => {
        try {
            const { valid } = await formRef.value.validate()
            if (valid) {
                console.log(form.value);
                
                nextStep()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleClosePaymentDialog = () => {
        stopTimer()
        paymentDialog.value = false
        form.value = {...paymentPixDefault}
        qrCodeGenerated.value = {}
        copySuccess.value = false
        currentStep.value = 1
    }

    const handleStatusPaymentOpen = async (value) => {
        console.log('clicked');
        
        statusPaymentDialog.value = value
    }


    return {
        controller: {
            form,
            formRef,
            helper,
            loading,
            paymentDialog,
            selectedProduct,
            selectedQty,
            currentStep,
            isPix,
            qrCodeGenerated,
            timeRemaining,
            copySuccess,
            paymentState,
            statusPaymentDialog,

            copyPixCode,
            formatPhone,
            formatCpfCnpj,
            formatTitle,
            formatCep,
            formatBRL,
            resetForm,
            generatePixQrCode,
            setSelectedProduct,
            handlePaymentDialog,
            nextStep,
            prevStep,
            submitStep1,
            handleClosePaymentDialog,
            checkPayment,
            handleStatusPaymentOpen
        }
    }
}

export { paymentController }