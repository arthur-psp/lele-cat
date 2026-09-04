import { inject, ref, computed, onBeforeUnmount } from "vue";
import { paymentKeys } from "../keys/payment_keys";
import { paymentPixDefault } from "../domain/payment/payment_pix";
import { QrcodeSvg } from "qrcode.vue";
import { useRouter } from "vue-router";

const form = ref(paymentPixDefault())
const loading = ref(false)
const loadingQrCode = ref(false)
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

function paymentController() {
    const createPaymentPixUseCaseImpl = inject(paymentKeys.createPaymentPixUseCaseImpl)
    const getPaymentStatusByIdUseCaseImpl = inject(paymentKeys.getPaymentStatusByIdUseCaseImpl)
    const createSimulatePaymentPixUseCaseImpl = inject(paymentKeys.createSimulatePaymentPixUseCaseImpl)

    const router = useRouter()

    const formatBRL = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    const resetForm = () => {
        form.value = paymentPixDefault()
    }

    const generatePixQrCode = async () => {
        try{
            loadingQrCode.value = true
            const payload = {
                quantity: form.value.quantity,
                isKit: form.value.is_kit
            }
            qrCodeGenerated.value = await createPaymentPixUseCaseImpl(payload)

            startTimer()
            
            if(qrCodeGenerated.value.status === 'PENDING') {
                saveProduct(qrCodeGenerated.value)
            }

            nextStep()
        } catch (err) {
            console.log(err);
        } finally {
            loadingQrCode.value = false
        }
    }

    const saveProduct = (item) => {
        const payload = {
            id: item.id,
            chip: selectedProduct.value?.chip,
            name: selectedProduct.value?.name,
            image: selectedProduct.value?.image
        }
        localStorage.setItem("product_status", JSON.stringify(payload))
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
            quantity: qty,
            is_kit: product.isKit
        }        
        
        setSelectedProduct(product, qty)
        paymentDialog.value = true
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

    const handleClosePaymentDialog = () => {
        stopTimer()
        paymentDialog.value = false
        form.value = paymentPixDefault()
        qrCodeGenerated.value = {}
        copySuccess.value = false

        if(currentStep.value === 3) {
            router.push({ path: '/' })
        }

        currentStep.value = 1
    }


    return {
        controller: {
            form,
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
            loadingQrCode,

            copyPixCode,
            formatBRL,
            resetForm,
            generatePixQrCode,
            setSelectedProduct,
            handlePaymentDialog,
            nextStep,
            prevStep,
            handleClosePaymentDialog,
            checkPayment,
        }
    }
}

export { paymentController }