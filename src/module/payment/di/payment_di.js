import { axiosInstance } from "../../../di/axios_instance_di";
import { paymentKeys } from "../keys/payment_keys";

import createPaymentPixRepository from "../repository/create_payment_repository";
import createPaymentPixUseCase from "../domain/usecase/create_payment_usecase";
import getPaymentStatusByIdRepository from "../repository/get_payment_status_by_id_repository";
import getPaymentStatusByIdUseCase from "../domain/usecase/get_payment_status_by_id_usecase";
import createSimulatePaymentPixRepository from "../repository/create_simulate_payment_repository";
import createSimulatePaymentPixUseCase from "../domain/usecase/create_simulate_payment_usecase";

const createPaymentPixRepositoryImpl = createPaymentPixRepository(axiosInstance)
const createPaymentPixUseCaseImpl = createPaymentPixUseCase(createPaymentPixRepositoryImpl)
const getPaymentStatusByIdRepositoryImpl = getPaymentStatusByIdRepository(axiosInstance)
const getPaymentStatusByIdUseCaseImpl = getPaymentStatusByIdUseCase(getPaymentStatusByIdRepositoryImpl)
const createSimulatePaymentPixRepositoryImpl = createSimulatePaymentPixRepository(axiosInstance)
const createSimulatePaymentPixUseCaseImpl = createSimulatePaymentPixUseCase(createSimulatePaymentPixRepositoryImpl)

const paymentController = (app) => {
    app.provide(paymentKeys.createPaymentPixUseCaseImpl, createPaymentPixUseCaseImpl)
    app.provide(paymentKeys.getPaymentStatusByIdUseCaseImpl, getPaymentStatusByIdUseCaseImpl)
    app.provide(paymentKeys.createSimulatePaymentPixUseCaseImpl, createSimulatePaymentPixUseCaseImpl)
}

export { paymentController }