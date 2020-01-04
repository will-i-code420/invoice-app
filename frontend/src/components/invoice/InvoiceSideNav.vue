<template>
  <SideNavBar>
    <template #icons>
      <router-link class="icon-links" :to="{ name: 'create-invoice' }">
        <font-awesome-icon class="icon" :icon="['fas', 'file-invoice-dollar']" />
      </router-link>
      <router-link class="icon-links" :to="{ name: 'all-invoices' }">
        <font-awesome-icon class="icon" :icon="['fas', 'file-alt']" />
      </router-link>
    </template>
    <template #links>
      <router-link class="router-links" :to="{ name: 'create-invoice' }" key="1">
        Create Invoice
      </router-link>
      <router-link class="router-links" :to="{ name: 'all-invoices' }" key="2">
        View Invoices
      </router-link>
    </template>
  </SideNavBar>
</template>

<script>
export default {
  name: 'invoice-side-nav'
}
</script>
