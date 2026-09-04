import { axiosInstance } from "../../../di/axios_instance_di";
import { orderKeys } from "../keys/order_keys";

import createOrderRepository from "../repository/create_order_repository";
import createOrderUseCase from "../domain/usecase/create_order_usecase";

const createOrderRepositoryImpl = createOrderRepository(axiosInstance)
const createOrderUseCaseImpl = createOrderUseCase(createOrderRepositoryImpl)

const orderController = (app) => {
    app.provide(orderKeys.createOrderUseCaseImpl, createOrderUseCaseImpl)
}

export { orderController }