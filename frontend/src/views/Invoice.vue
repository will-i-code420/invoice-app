<template>
  <div class="main-invoice-container">
    <section v-if="main" class="main-invoice-dashboard">
      <h2>Invoice Dashboard</h2>
      <div class="invoice-selection-container">
        <div class="invoice-selection-cards">

        </div>
      </div>
    </section>
    <section v-if="create" class="create-container">
      <CreateInvoice/>
    </section>
    <section v-if="view" class="view-container">
      <ViewInvoice />
    </section>
    <section v-if="single" class="single-container">
      <SingleInvoice />
    </section>
  </div>
</template>

<script>
import CreateInvoice from '@/components/invoice/CreateInvoice'
import ViewInvoice from '@/components/invoice/ViewInvoice'
import SingleInvoice from '@/components/invoice/SingleInvoice'

export default {
  name: 'invoice-dashboard',
  components: {
    CreateInvoice,
    SingleInvoice,
    ViewInvoice
  },
  data() {
    return {
      main: true,
      create: false,
      view: false,
      single: false
    }
  }
}
</script>
