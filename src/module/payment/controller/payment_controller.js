import { inject } from "vue";
import { paymentKeys } from "../keys/payment_keys";
import { paymentPixDefault } from "../domain/payment/payment_pix";

function paymentController() {
    const createPaymentPixUseCaseImpl = inject(paymentKeys.createPaymentPixUseCaseImpl)
    const getPaymentStatusByIdUseCaseImpl = inject(paymentKeys.getPaymentStatusByIdUseCaseImpl)
    const createSimulatePaymentPixUseCaseImpl = inject(paymentKeys.createSimulatePaymentPixUseCaseImpl)

    const form = paymentPixDefault()

    return {
        controller: {
            form,
        }
    }
}

export { paymentController }