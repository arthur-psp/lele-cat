class Order {
    constructor(
        name,
        cpf,
        email,
        phone,
        cep,
        city,
        street,
        number,
        neighborhood,
        description,
        products
    ) {
        this.name = name,
        this.cpf = cpf,
        this.email = email,
        this.phone = phone,
        this.cep = cep,
        this.city = city,
        this.street = street,
        this.number = number,
        this.neighborhood = neighborhood,
        this.description = description,
        this.products = products
    }
}

export const orderDefault = () => {
    const order = {
        name: '',
        cpf: '',
        email: '',
        phone: '',
        cep: '',
        city: '',
        street: '',
        number: '',
        neighborhood: '',
        description: '',
        products: []
    }
    return order
}

export default Order