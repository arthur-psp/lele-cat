import { inject, ref } from "vue";
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
            console.log(qrCodeGenerated.value);
            nextStep()
        } catch (err) {
            console.log(err);
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
        paymentDialog.value = false
        form.value = {...paymentPixDefault}
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
            handleClosePaymentDialog
        }
    }
}

export { paymentController }