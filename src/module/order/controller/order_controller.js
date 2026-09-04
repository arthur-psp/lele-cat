import { inject, ref } from "vue";
import { orderKeys } from "../keys/order_keys";
import { orderDefault } from "../domain/order/order";

const form = ref(orderDefault())
const formRef = ref(null)
const loading = ref(false)

function orderController() {
    const createOrderUseCaseImpl = inject(orderKeys.createOrderUseCaseImpl)

    const formatPhone = (input) => {
        let numbers = input.replace(/\D/g, '')
        if (numbers.length > 11) numbers = numbers.slice(0, 11)
        if (numbers.length <= 10) {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
        } else {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
        }
    }

    const formatCpfCnpj = (input) => {
        let numbers = input.replace(/\D/g, '')
        if (numbers.length <= 11) {
            return numbers
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        } else {
            // CNPJ - comentado por enquanto, manter apenas CPF
            // return numbers.substring(0, 14)
            //     .replace(/(\d{2})(\d)/, '$1.$2')
            //     .replace(/(\d{3})(\d)/, '$1.$2')
            //     .replace(/(\d{3})(\d)/, '$1/$2')
            //     .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
            return numbers.substring(0, 11)
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        }
    }

    const formatTitle = (input) => {
        return input.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    const formatCep = (input) => {
        let numbers = input.replace(/\D/g, '')
        if (numbers.length > 8) numbers = numbers.slice(0, 8)
        return numbers.replace(/(\d{5})(\d)/, '$1-$2')
    }

    const formatEmail = (input) => {
        return input.trim().toLowerCase()
    }

    const helper = {
        requiredRules: [
            v => !!v || 'Campo obrigatório',
            v => (v && v.length >= 3) || 'Mínimo de 3 caracteres'
        ],
        cpfRules: [
            value => {
                if (value) return true
                return 'CPF/CNPJ é obrigatório.'
            },
            value => {
                if (/^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})$/.test(value)) return true
                return 'Formato inválido.'
            }
        ],
        emailRules: [
            value => {
                if (value) return true
                return 'E-mail é obrigatório.'
            },
            value => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return regex.test(value) || 'Formato de e-mail inválido.'
            }
        ],
        phoneRules: [
            value => {
                if (value) return true
                return 'Celular é obrigatório.'
            },
            value => {
                const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/
                return regex.test(value) || 'Formato inválido. Use: (00) 00000-0000'
            }
        ],
        cepRules: [
            v => !!v || 'CEP obrigatório',
            v => /^\d{5}-\d{3}$/.test(v) || 'CEP inválido (ex: 00000-000)'
        ]
    }

    const resetForm = () => {
        form.value = orderDefault()
    }

    const submitOrder = async () => {
        try {
            const { valid } = await formRef.value.validate()
            if (!valid) return null

            loading.value = true
            return await createOrderUseCaseImpl(form.value)
        } catch (err) {
            console.log(err)
            return null
        } finally {
            loading.value = false
        }
    }

    return {
        controller: {
            form,
            formRef,
            helper,
            loading,

            formatPhone,
            formatCpfCnpj,
            formatTitle,
            formatCep,
            formatEmail,

            resetForm,
            submitOrder,
        }
    }
}

export { orderController }