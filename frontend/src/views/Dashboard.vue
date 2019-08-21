<template>
  <div class="dash-container">
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
import CreateInvoice from '@/components/CreateInvoice'
import ViewInvoice from '@/components/ViewInvoice'

export default {
  name: 'dashboard',
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
