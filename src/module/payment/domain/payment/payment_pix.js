class PaymentPix {
    constructor(
        amount,
        expiresIn
    ) {
        this.amount = amount,
        this.expiresIn = expiresIn
    }
}

export const paymentPixDefault = () => {
    const paymentPix = {
        amount: "",
        expiresIn: 3600
    }
    return paymentPix
}

export default PaymentPix