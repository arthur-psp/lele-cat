import { inject, ref } from "vue";
import { paymentKeys } from "../keys/payment_keys";
import { paymentPixDefault } from "../domain/payment/payment_pix";

function paymentController() {
    const createPaymentPixUseCaseImpl = inject(paymentKeys.createPaymentPixUseCaseImpl)
    const getPaymentStatusByIdUseCaseImpl = inject(paymentKeys.getPaymentStatusByIdUseCaseImpl)
    const createSimulatePaymentPixUseCaseImpl = inject(paymentKeys.createSimulatePaymentPixUseCaseImpl)

    const form = paymentPixDefault()
    const loading = ref(false)

    const generatePixQrCode = async () => {
        try{
            loading.value = true
            const payload = {
                quantity: 200,
                isKit: false
            }
            createPaymentPixUseCaseImpl(payload)
        } catch (err) {
            console.log(err);
        }
    }

    return {
        controller: {
            form,

            generatePixQrCode
        }
    }
}

export { paymentController }