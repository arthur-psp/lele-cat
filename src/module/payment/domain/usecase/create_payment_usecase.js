const createPaymentPixUseCase = (repository) => async (data) => {
    try {
        return await repository(data);
    } catch (error) {
        throw error
    }
}

export default createPaymentPixUseCase