<template>
  <div class="main-invoice-container">
    <InvoiceSideNav/>
    <section v-if="main" class="main-invoice-dashboard">
      <h2>Invoice Dashboard</h2>
      <div class="invoice-selection-container">
        <div class="invoice-selection-cards">
        </div>
      </div>
    </section>
    <router-view/>
  </div>
</template>

<script>
import InvoiceSideNav from '@/components/invoice/InvoiceSideNav'

export default {
  name: 'invoice-dashboard',
  components: {
    InvoiceSideNav
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
