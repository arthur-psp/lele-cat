<template>
  <v-dialog
    v-model="controller.paymentDialog.value"
    fullscreen
  >
    <v-card class="bg-liquid d-flex align-center justify-center">
      <v-stepper 
        v-model="controller.currentStep.value"
        :items="['Identificação', 'Pagamento', 'Confirmação']" 
        min-width="900"
        rounded="lg"
      >

        <template v-slot:item.1>
            <OrderForm
                ref="orderFormRef"
                :products="orderProducts"
                @submitted="onOrderSubmitted"
            />
        </template>

        <template v-slot:item.2>
            <v-card flat class="pa-4">
                <h2 class="text-h6 font-weight-bold mb-6">
                    <v-icon icon="mdi-clipboard-check-outline" size="22" class="mr-1"></v-icon>
                    Confirme seus dados
                </h2>

                <!-- Dados pessoais -->
                <v-card variant="tonal" rounded="lg" class="pa-4 mb-4">
                    <div class="d-flex align-center mb-3">
                        <v-icon icon="mdi-account-outline" size="20" class="mr-2"></v-icon>
                        <span class="text-subtitle-2 font-weight-bold">Dados Pessoais</span>
                    </div>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <div class="text-caption text-medium-emphasis">Nome</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.name }}</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="text-caption text-medium-emphasis">E-mail</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.email }}</div>
                        </v-col>
                    </v-row>
                    <v-row dense class="mt-1">
                        <v-col cols="12" md="6">
                            <div class="text-caption text-medium-emphasis">CPF</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.cpf }}</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="text-caption text-medium-emphasis">Telefone</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.phone }}</div>
                        </v-col>
                    </v-row>
                </v-card>

                <!-- Endereço -->
                <v-card variant="tonal" rounded="lg" class="pa-4 mb-4">
                    <div class="d-flex align-center mb-3">
                        <v-icon icon="mdi-map-marker-outline" size="20" class="mr-2"></v-icon>
                        <span class="text-subtitle-2 font-weight-bold">Endereço de Entrega</span>
                    </div>
                    <v-row dense>
                        <v-col cols="12" md="3">
                            <div class="text-caption text-medium-emphasis">CEP</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.cep }}</div>
                        </v-col>
                        <v-col cols="12" md="5">
                            <div class="text-caption text-medium-emphasis">Cidade</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.city }}</div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="text-caption text-medium-emphasis">Bairro</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.neighborhood }}</div>
                        </v-col>
                    </v-row>
                    <v-row dense class="mt-1">
                        <v-col cols="12" md="8">
                            <div class="text-caption text-medium-emphasis">Rua</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.street }}</div>
                        </v-col>
                        <v-col cols="12" md="2">
                            <div class="text-caption text-medium-emphasis">Nº</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.number }}</div>
                        </v-col>
                        <v-col cols="12" md="2">
                            <div class="text-caption text-medium-emphasis">Complemento</div>
                            <div class="text-body-1">{{ orderCtrl.form.value.description || '—' }}</div>
                        </v-col>
                    </v-row>
                </v-card>

                <!-- Produto -->
                <v-card variant="tonal" rounded="lg" class="pa-4 mb-4">
                    <div class="d-flex align-center mb-3">
                        <v-icon icon="mdi-package-variant-closed" size="20" class="mr-2"></v-icon>
                        <span class="text-subtitle-2 font-weight-bold">Produto</span>
                    </div>

                    <div class="d-flex align-center ga-3 pa-3 rounded-lg bg-surface">
                        <v-avatar :color="controller.selectedProduct.value.chip" size="40">
                            <v-icon icon="mdi-scent" color="white" size="20"></v-icon>
                        </v-avatar>
                        <div class="flex-grow-1">
                            <div class="text-body-1 font-weight-bold">{{ controller.selectedProduct.value.name }}</div>
                            <div class="text-caption text-medium-emphasis">{{ controller.selectedQty.value }}x — {{ controller.formatBRL(controller.selectedProduct.value.price) }}</div>
                        </div>
                        <div class="text-subtitle-1 font-weight-black text-logoColor">
                            {{ controller.formatBRL(controller.selectedProduct.value.price * controller.selectedQty.value) }}
                        </div>
                    </div>
                </v-card>

                <div
                  v-if="controller.loadingQrCode.value"
                  class="d-flex align-center justify-center my-2"
                >
                    <v-progress-circular color="primary" indeterminate></v-progress-circular>
                </div>
                <v-card v-else variant="tonal" rounded="lg" class="pa-4 mb-4">
                    <div class="d-flex align-center mb-3">
                        <v-icon icon="mdi-cash" size="20" class="mr-2"></v-icon>
                        <span class="text-subtitle-2 font-weight-bold">Forma de Pagamento</span>
                    </div>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex align-center">
                                  <v-icon
                                    icon="mdi-qrcode"
                                    size="15"
                                    class="mr-1"
                                  ></v-icon>
                                  <div class="text-caption text-medium-emphasis">Pix</div>
                                </div>
                                <v-radio
                                  class="d-flex justify-end"
                                  color="primary"
                                  readonly
                                  v-model="controller.isPix.value"
                                ></v-radio>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex align-center">
                                  <v-icon
                                    icon="mdi-credit-card-outline"
                                    size="15"
                                    class="mr-1"
                                  ></v-icon>
                                  <div class="text-caption text-medium-emphasis">Cartão de Crédito</div>
                                </div>
                                <v-tooltip
                                    text="Estamos trabalhando nessa funcionalidade"
                                    open-delay="400"
                                    location="top"
                                >
                                    <template v-slot:activator="{ props }">
                                        <span v-bind="props" style="display: inline-block;">
                                            <v-btn
                                                text="Adicionar"
                                                class="text-caption"
                                                variant="outlined"
                                                density="comfortable"
                                                disabled
                                            ></v-btn>
                                        </span>
                                    </template>
                                </v-tooltip>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card>
        </template>

        <template v-slot:item.3>
            <v-card flat class="pa-4">
                <div class="text-center mb-2">
                    <v-icon icon="mdi-qrcode" size="48" color="logoColor" class="mb-3"></v-icon>
                    <h2 class="text-h5 font-weight-bold mb-1">Escaneie o QR Code</h2>
                    <p class="text-body-2 text-medium-emphasis">Pague com o banco da sua preferência</p>
                </div>

                <!-- Timer -->
                <div class="text-center mb-4">
                    <v-chip
                        v-if="controller.timeRemaining.value && !controller.timeRemaining.value.expired"
                        color="warning"
                        variant="tonal"
                        size="small"
                        prepend-icon="mdi-clock-outline"
                    >
                        Expira em {{ controller.timeRemaining.value.text }}
                    </v-chip>
                    <v-chip
                        v-else-if="controller.timeRemaining.value?.expired"
                        color="error"
                        variant="tonal"
                        size="small"
                        prepend-icon="mdi-clock-alert-outline"
                    >
                        QR Code expirado
                    </v-chip>
                </div>

                <!-- QR Code Card -->
                <div class="d-flex justify-center mb-4">
                    <v-card
                        class="qr-card pa-4 d-flex align-center justify-center"
                        rounded="xl"
                        elevation="4"
                    >
                        <v-img
                            :src="controller.qrCodeGenerated.value.brCodeBase64"
                            width="200"
                            height="200"
                            max-width="200"
                            class="rounded-lg"
                        ></v-img>
                    </v-card>
                </div>

                <!-- Copy Button -->
                <div class="d-flex justify-center mb-4">
                    <v-btn
                        :color="controller.copySuccess.value ? 'success' : 'logoColor'"
                        :variant="controller.copySuccess.value ? 'flat' : 'outlined'"
                        rounded="lg"
                        class="font-weight-bold text-none"
                        prepend-icon="mdi-content-copy"
                        @click="controller.copyPixCode"
                    >
                        {{ controller.copySuccess.value ? 'Copiado!' : 'Copiar código PIX' }}
                    </v-btn>
                </div>

                <!-- Instructions -->
                <v-card variant="tonal" rounded="lg" class="pa-4">
                    <div class="d-flex align-center mb-3">
                        <v-icon icon="mdi-information-outline" size="20" class="mr-2"></v-icon>
                        <span class="text-subtitle-2 font-weight-bold">Como pagar</span>
                    </div>
                    <v-list density="compact" class="bg-transparent pa-0">
                        <v-list-item class="pa-0" min-height="32">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-1" size="18" color="logoColor"></v-icon>
                            </template>
                            <v-list-item-title class="text-body-2">Abra o app do seu banco</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="pa-0" min-height="32">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-2" size="18" color="logoColor"></v-icon>
                            </template>
                            <v-list-item-title class="text-body-2">Escolha a opção <strong>Pix</strong> e escaneie o QR Code</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="pa-0" min-height="32">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-3" size="18" color="logoColor"></v-icon>
                            </template>
                            <v-list-item-title class="text-body-2">Confirme o pagamento de <strong>{{ controller.formatBRL(controller.selectedProduct.value?.price * controller.selectedQty.value) }}</strong></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-card>
        </template>

        <template v-slot:actions>
            <div class="d-flex pa-4">
                <v-btn
                    v-if="controller.currentStep.value === 1"
                    text="Cancelar"
                    variant="flat"
                    rounded="lg"
                    class="font-weight-bold text-none"
                    size="large"
                    @click="handleClose"
                ></v-btn>

                <v-btn
                    v-if="controller.currentStep.value > 1"
                    :disabled="controller.currentStep.value === 3"
                    text="Voltar"
                    variant="outlined"
                    rounded="lg"
                    class="font-weight-bold text-none"
                    size="large"
                    @click="controller.prevStep"
                ></v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    v-if="controller.currentStep.value === 1"
                    text="Próximo"
                    color="logoColor"
                    variant="flat"
                    rounded="lg"
                    class="font-weight-bold text-none"
                    size="large"
                    @click="handleNext"
                ></v-btn>

                <v-btn
                    v-if="controller.currentStep.value === 2"
                    text="Fazer Pedido"
                    color="logoColor"
                    variant="flat"
                    rounded="lg"
                    class="font-weight-bold text-none"
                    size="large"
                    @click="controller.generatePixQrCode"
                ></v-btn>

                <v-btn
                    v-if="controller.currentStep.value === 3"
                    text="Ok"
                    color="logoColor"
                    variant="flat"
                    rounded="lg"
                    class="font-weight-bold text-none"
                    size="large"
                    @click="handleClose"
                ></v-btn>
            </div>
        </template>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { paymentController } from '../controller/payment_controller';
import { orderController } from '../../order/controller/order_controller';
import OrderForm from '../../order/view/order_form.vue';

const { controller } = paymentController()
const { controller: orderCtrl } = orderController()

const orderFormRef = ref(null)

const orderProducts = computed(() => {
    const name = controller.selectedProduct.value?.name
    return name ? [name] : []
})

const onOrderSubmitted = () => {
    controller.nextStep()
}

const handleNext = async () => {
    await orderFormRef.value?.submit()
}

const handleClose = () => {
    orderFormRef.value?.reset()
    controller.handleClosePaymentDialog()
}
</script>

<style>
.bg-liquid{
  background-color: rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(15px) !important;
}
.qr-card {
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.08);
  width: 240px;
  height: 240px;
}
</style>