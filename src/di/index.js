import { paymentController } from "../module/payment/di/payment_di";
import { orderController } from "../module/order/di/order_di";

export const configDi = (app) => {
    paymentController(app)
    orderController(app)
}