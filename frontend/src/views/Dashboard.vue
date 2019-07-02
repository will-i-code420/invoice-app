<template>
  <div class="dash-container">
    <NavHead
    :user="user"
    />
    <template v-if="this.isactive === 'create'">
      <CreateInvoice/>
    </template>
    <template v-else>
      <ViewInvoice/>
    </template>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'
import CreateInvoice from '@/components/CreateInvoice.vue'
import ViewInvoice from '@/components/ViewInvoice.vue'

export default {
  name: 'dashboard',
  components: {
    NavHead,
    CreateInvoice,
    ViewInvoice
  },
  data () {
    return {
      isactive: 'create',
      user: ''
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style>
</style>
