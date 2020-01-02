<template>
  <CreateInvoice v-if="create"/>
  <ViewInvoice v-else-if="view"/>
  <SingleInvoice v-else-if="single"/>
</template>

<script>
import CreateInvoice from '@/components/invoice/CreateInvoice'
import ViewInvoice from '@/components/invoice/ViewInvoice'
import SingleInvoice from '@/components/invoice/SingleInvoice'

export default {
  name: 'invoice',
  components: {
    CreateInvoice,
    SingleInvoice,
    ViewInvoice
  },
  data() {
    return {
      create: true,
      view: false,
      single: false
    }
  }
}
</script>
