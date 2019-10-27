<template>
  <b-table bordered hover :items="employee" :fields="fields">
    <template v-slot:cell(actions)="data">
      <b-button
      pill
      variant="outline-success"
      size="small"
      :to="{ name: 'singleEmployee', params: { id: data.item.id } }"
      >
      View Details
      </b-button>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'all-employees',
  props: {
    employee: Array
  },
  data() {
    return {
      fields: [
        { key: 'name' },
        { key: 'title' },
        { key: 'phone', label: 'Phone #' },
        { key: 'email' },
        { key: 'hire date',
          formatter: (value, key, item) => {
            if(item.createdAt) {
              const date = new Date(item.createdAt)
              return item.createdAt = date.toDateString()
            }
          }
        },
        { key: 'actions' },
      ]
    }
  }
}
</script>

<style scoped>
</style>
