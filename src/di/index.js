import { paymentController } from "../module/payment/di/payment_di";

export const configDi = (app) => {
    paymentController(app)
}