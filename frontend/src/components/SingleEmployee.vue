<template>
  <div class="single-employee">
    <h1>{{ employee.name }} Profile:</h1>
    <FileUpload/>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload'
import axios from 'axios'

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
  created () {
    let employee_id = this.$route.params.employee_id
    axios.get(`http://localhost:3128/employee/${this.user.id}/${employee_id}`,
    {
      headers: { "x-access-token": this.token }
    }).then(res => {
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
