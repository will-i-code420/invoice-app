<template>
  <div class="single-employee">
    <NavHead
    :user="user"
    />
    <h1>{{ employee.name }} Profile:</h1>
    <FileUpload/>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'
import FileUpload from '@/components/FileUpload.vue'
import axios from 'axios'

export default {
  name: 'singleEmployee',
  components: {
    NavHead,
    FileUpload
  },
  data () {
    return {
      user: '',
      employee: {}
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    let token = localStorage.getItem('token')
    let employee_id = this.$route.params.employee_id
    axios.get(`http://localhost:3128/employee/user/${this.user.id}/${employee_id}`,
    {
      headers: { "x-access-token": token }
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
