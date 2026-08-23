class PaymentPix {
    constructor(
        name,
        cpf,
        phone,
        cep,
        city,
        street,
        number,
        neighborhood,
        description,
        products,
        quantity,
        is_kit
    ) {
        this.name = name,
        this.cpf = cpf,
        this.phone = phone,
        this.cep = cep,
        this.city = city,
        this.street = street,
        this.number = number,
        this.neighborhood = neighborhood,
        this.description = description,
        this.products = products,
        this.quantity = quantity,
        this.is_kit = is_kit
    }
}

export const paymentPixDefault = () => {
    const paymentPix = {
        name: '',
        cpf: '',
        phone: '',
        cep: '',
        city: '',
        street: '',
        number: '',
        neighborhood: '',
        description: '',
        products: [],
        quantity: 1,
        is_kit: false
    }
    return paymentPix
}

export default PaymentPix