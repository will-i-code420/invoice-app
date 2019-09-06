<template>
  <div class="single-employee">
    <h1>{{ employee.name }} Profile:</h1>
    <FileUpload/>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload'
import employeeService from '@/services/employeeService'

export default {
  name: 'singleEmployee',
  components: {
    FileUpload
  },
  data () {
    return {
      employee: {}
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    token() {
      return this.$store.getters.getToken
    }
  },
  async created () {
    const id = this.$store.state.user.id
    const employeeId = this.$store.state.route.params.id
    await employeeService.employee(id, employeeId).then(res => {
      if (res.data.status === true) {
        this.employee = res.data.employee
      }
    })
  },
  methods: {
  }
}
</script>

<style scoped>
h1 {
  margin-top: 70px;
}
</style>
