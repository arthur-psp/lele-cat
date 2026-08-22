class PaymentPix {
    constructor(
        quantity,
        is_kit
    ) {
        this.quantity = quantity,
        this.is_kit = is_kit
    }
}

export const paymentPixDefault = () => {
    const paymentPix = {
        quantity: 0,
        is_kit: false
    }
    return paymentPix
}

export default PaymentPix