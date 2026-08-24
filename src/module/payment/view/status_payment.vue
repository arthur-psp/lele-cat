<template>
  <v-dialog
    v-model="controller.statusPaymentDialog.value"
    fullscreen
  >
    <v-card class="bg-liquid d-flex align-center justify-center" min-width="900">
      <template v-slot:title>
        <div class="d-flex justify-space-between align-center">
          <div>Meus Produtos</div>
          <v-btn
            icon="mdi-close"
            rounded="lg"
            density="comfortable"
            @click="controller.handleStatusPaymentOpen(false)"
          ></v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { paymentController } from '../controller/payment_controller';

const { controller } = paymentController()
</script>

<style>
.bg-liquid{
  background-color: rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(15px) !important;
}
</style>