<template>
  <b-table bordered hover :items="employee" :fields="fields">
    <template slot="view" slot-scope="{ item }">
      <b-button
      pill
      variant="outline-success"
      size="small"
      :to="{ name: 'singleEmployee', params: { id: item.id } }"
      >
      View Employee
      </b-button>
    </template>
  </b-table>
</template>

<script>
import employeeService from '@/services/employeeService'

export default {
  name: 'all-employees',
  data() {
    return {
      employee: [],
      fields: [
        { key: 'name' },
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
        { key: 'view' }
      ]
    }
  },
  computed: {
  },
  async created () {
    try {
      await this.getEmployeeRolodex()
    } catch (err) {
      alert(err.response.data.error)
    }
  },
  methods: {
    async getEmployeeRolodex() {
      try {
        const id = this.$store.state.user.id
        await employeeService.index(id).then(res => {
          if (res.data.status === true) {
            this.employee = res.data.employee
          }
        })
      } catch (err) {
        alert(err.response.data.error)
      }
    }
  }
}
</script>

<style scoped>
</style>
