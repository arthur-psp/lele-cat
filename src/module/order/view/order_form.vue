<template>
    <v-card title="Identificação" flat class="pa-4">
        <v-form validate-on="submit lazy" :ref="controller.formRef">
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="controller.form.value.name"
                        :counter="50"
                        maxlength="50"
                        :rules="controller.helper.requiredRules"
                        label="Nome completo"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        prepend-inner-icon="mdi-account-outline"
                        @input="controller.form.value.name = controller.formatTitle($event.target.value)"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="controller.form.value.cpf"
                        :counter="14"
                        maxlength="14"
                        :rules="controller.helper.cpfRules"
                        label="CPF"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        placeholder="000.000.000-00"
                        prepend-inner-icon="mdi-card-account-details-outline"
                        @input="controller.form.value.cpf = controller.formatCpfCnpj($event.target.value)"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="controller.form.value.email"
                        :counter="60"
                        maxlength="60"
                        :rules="controller.helper.emailRules"
                        label="E-mail"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        placeholder="exemplo@email.com"
                        prepend-inner-icon="mdi-email-outline"
                        @input="controller.form.value.email = controller.formatEmail($event.target.value)"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="controller.form.value.phone"
                        :counter="15"
                        maxlength="15"
                        :rules="controller.helper.phoneRules"
                        label="Telefone"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        placeholder="(00) 00000-0000"
                        prepend-inner-icon="mdi-phone-outline"
                        @input="controller.form.value.phone = controller.formatPhone($event.target.value)"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h3 class="text-subtitle-1 font-weight-bold mb-4">
                <v-icon icon="mdi-map-marker-outline" size="18" class="mr-1"></v-icon>
                Endereço de entrega
            </h3>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="controller.form.value.cep"
                        :counter="9"
                        maxlength="9"
                        :rules="controller.helper.cepRules"
                        label="CEP"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        placeholder="00000-000"
                        prepend-inner-icon="mdi-map-marker-radius"
                        @input="controller.form.value.cep = controller.formatCep($event.target.value)"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="8">
                    <v-text-field
                        v-model="controller.form.value.city"
                        :counter="50"
                        maxlength="50"
                        :rules="controller.helper.requiredRules"
                        label="Cidade"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        @input="controller.form.value.city = controller.formatTitle($event.target.value)"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="8">
                    <v-text-field
                        v-model="controller.form.value.street"
                        :counter="80"
                        maxlength="80"
                        :rules="controller.helper.requiredRules"
                        label="Rua"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        @input="controller.form.value.street = controller.formatTitle($event.target.value)"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                    <v-text-field
                        v-model="controller.form.value.number"
                        :counter="10"
                        maxlength="10"
                        :rules="controller.helper.requiredRules"
                        label="Nº"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                    <v-text-field
                        v-model="controller.form.value.neighborhood"
                        :counter="50"
                        maxlength="50"
                        :rules="controller.helper.requiredRules"
                        label="Bairro"
                        required
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        @input="controller.form.value.neighborhood = controller.formatTitle($event.target.value)"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-textarea
                        v-model="controller.form.value.description"
                        :counter="200"
                        maxlength="200"
                        label="Complemento / Descrição (opcional)"
                        density="comfortable"
                        color="primary"
                        clearable
                        rounded="lg"
                        rows="2"
                        auto-grow
                        @input="controller.form.value.description = controller.formatTitle($event.target.value)"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script setup>
import { watch } from "vue";
import { orderController } from "../controller/order_controller";

const props = defineProps({
    products: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['submitted'])

const { controller } = orderController()

watch(() => props.products, (products) => {
    controller.form.value.products = [...products]
}, { immediate: true })

const submit = async () => {
    const order = await controller.submitOrder()
    if (order) {
        emit('submitted', order)
    }
}

const reset = () => {
    controller.resetForm()
}

defineExpose({ submit, reset })
</script>