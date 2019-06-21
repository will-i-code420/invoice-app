<template>
  <div class="dash-container">
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
  name: 'dash',
  components: {
    CreateInvoice,
    ViewInvoice
  },
  data () {
    return {
      isactive: 'create',
      user: (this.$route.params.user) ? this.$route.params.user : null
    }
  }
}
</script>

<style>
</style>
