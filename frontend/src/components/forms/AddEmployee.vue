<template>
  <b-form @submit.prevent="submitEmployee">
    <b-form-group
    id="input-group-9"
    label="Employee Name:"
    label-for="input-9">
    <b-form-input
    id="input-9"
    v-model="employeeInfo.name"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-14"
    label="Employee Phone:"
    label-for="input-14">
    <b-form-input
    id="input-14"
    v-model="employeeInfo.phone"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-15"
    label="Employee Email:"
    label-for="input-15">
    <b-form-input
    id="input-15"
    v-model="employeeInfo.email"
    type="email"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-10"
    label="Home Address:"
    label-for="input-10">
    <b-form-input
    id="input-10"
    v-model="employeeInfo.address"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-11"
    label="Home City:"
    label-for="input-11">
    <b-form-input
    id="input-11"
    v-model="employeeInfo.city"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-12"
    label="Home State:"
    label-for="input-12">
    <b-form-input
    id="input-12"
    v-model="employeeInfo.state"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-13"
    label="Home Zip:"
    label-for="input-13">
    <b-form-input
    id="input-13"
    v-model="employeeInfo.zip"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-16"
    label="State Tax %:"
    label-for="input-16">
    <b-form-input
    id="input-16"
    v-model="employeeInfo.state_tax"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-17"
    label="Federal Deductions:"
    label-for="input-17">
    <b-form-input
    id="input-17"
    v-model="employeeInfo.fed_tax"
    required
    ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Add Employee</b-button>
    {{ status }}
  </b-form>
</template>

<script>
import employeeService from '@/services/employeeService'

export default {
  name: 'add-employee',
  data() {
    return {
      status: '',
      employeeInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        state_tax: '',
        fed_tax: ''
      }
    }
  },
  computed: {
  },
  methods: {
    async submitEmployee() {
      this.staus = "Saving Employee..."
      let employee = {}
      const formData = new FormData()
      formData.append("name", this.employeeInfo.name),
      formData.append("phone", this.employeeInfo.phone),
      formData.append("email", this.employeeInfo.email),
      formData.append("address", this.employeeInfo.address),
      formData.append("city", this.employeeInfo.city),
      formData.append("state", this.employeeInfo.state),
      formData.append("zip", this.employeeInfo.zip),
      formData.append("state_tax", this.employeeInfo.state_tax),
      formData.append("fed_tax", this.employeeInfo.fed_tax),
      formData.append("employeeId", this.user.id)
      for (const [key, value] of formData.entries()) {
        employee[key] = value
      }
      await employeeService.create(employee).then(res => {
        if (res.data.status === true) {
          alert(res.data.message)
          this.clearEmployeeForm()
        } else {
          alert(res.data.message)
        }
      })
    },
    clearEmployeeForm() {
      this.employeeInfo.name = ''
      this.employeeInfo.phone = ''
      this.employeeInfo.email = ''
      this.employeeInfo.address = ''
      this.employeeInfo.city = ''
      this.employeeInfo.state = ''
      this.employeeInfo.zip = ''
      this.employeeInfo.state_tax = ''
      this.employeeInfo.fed_tax = ''
      this.status = ''
    }
  }
}
</script>

<style scoped>
</style>
