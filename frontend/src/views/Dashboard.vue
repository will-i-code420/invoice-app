<template>
  <div class="dash-container">
    <NavHead
    :user="user"
    />
    <template v-if="this.isactive === 'create'">
      <b-container class="forms-container">
        <b-row>
          <b-col sm="6" offset="3">
            <CreateInvoice/>
          </b-col>
        </b-row>
      </b-container>
    </template>
    <template v-else>
      <b-container class="forms-container">
        <b-row>
          <b-col sm="6" offset="3">
            <ViewInvoice/>
          </b-col>
        </b-row>
      </b-container>
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
