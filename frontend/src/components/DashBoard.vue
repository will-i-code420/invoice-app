<template>
  <div class="dashBoard">
    <template v-if="this.isactive === 'create'">
      <CreateInvoice/>
    </template>
    <template v-else>
      <ViewInvoice/>
    </template>
  </div>
</template>

<script>
import CreateInvoice from '@/components/CreateInvoice.vue'
import ViewInvoice from '@/components/ViewInvoice.vue'

export default {
  name: 'DashBoard',
  components: {
    CreateInvoice,
    ViewInvoice
  },
  data () {
    return {
      isactive: 'create'
    }
  }
}
</script>

<style>
</style>
