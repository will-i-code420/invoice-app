<template>
  <b-container class="add-employee">
    <h1>Create New Employee</h1>
    <b-row>
      <b-col cols="8" offset="2">
        <b-form @submit.prevent="submitEmployee">
          <b-form-group label="Employee Name:">
          <b-form-input
          v-model="userInfo.name"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Employee Title:">
          <b-form-input
          v-model="userInfo.title"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Employee Phone:">
          <b-form-input
          v-model="userInfo.phone"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Employee Email:">
          <b-form-input
          v-model="userInfo.email"
          type="email"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Temporary Password:">
          <b-form-input
          v-model="userInfo.password"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Role">
          <b-form-radio-group
          v-model="userInfo.role"
          :options="roleOptions"
          required
          ></b-form-radio-group>
          </b-form-group>
          <b-form-group label="DOB:">
          <b-form-input
          v-model="userInfo.employeeInfo.dob"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="SSN#">
          <b-form-input
          v-model="userInfo.employeeInfo.ssn"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Home Address:">
          <b-form-input
          v-model="userInfo.employeeInfo.address"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Home City:">
          <b-form-input
          v-model="userInfo.employeeInfo.city"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Home State:">
          <b-form-input
          v-model="userInfo.employeeInfo.state"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Home Zip:">
          <b-form-input
          v-model="userInfo.employeeInfo.zip"
          type="number"
          no-wheel
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Marital Status">
          <b-form-radio-group
          v-model="userInfo.employeeInfo.taxInfo.marital_status"
          :options="options"
          required
          ></b-form-radio-group>
          </b-form-group>
          <b-form-group label="FICA%">
          <b-form-input
          v-model="userInfo.employeeInfo.taxInfo.fica"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Medicare%">
          <b-form-input
          v-model="userInfo.employeeInfo.taxInfo.medicare"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="State Tax%">
          <b-form-input
          v-model="userInfo.employeeInfo.taxInfo.state_tax"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Federal Deductions">
          <b-form-input
          v-model="userInfo.employeeInfo.taxInfo.fed_deductions"
          type="number"
          no-wheel
          required
          ></b-form-input>
          </b-form-group>
          <FileUpload/>
          <div v-if="submitting" class="submit-status">
            <p class="status">{{ status }}</p>
          </div>
          <b-button type="submit" variant="success" pill>Add Employee</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import employeeService from '@/services/employeeService'

export default {
  name: 'add-employee',
  data() {
    return {
      status: '',
      submitting: false,
      userInfo: {
        name: '',
        title: '',
        phone: '',
        email: '',
        password: '',
        role: 'user',
        employeeInfo: {
          dob: '',
          ssn: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          taxInfo: {
            marital_status: '',
            fica: '',
            medicare: '',
            state_tax: '',
            fed_deductions: ''
          }
        }
      },
      options: [
        {text: 'Single', value: 'single'},
        {text: 'Married', value: 'married'}
      ],
      roleOptions: [
        {text: 'Admin', value: 'admin'},
        {text: 'Manager', value: 'manager'},
        {text: 'HR', value: 'hr'},
        {text: 'User', value: 'user'}

      ]
    }
  },
  methods: {
    async submitEmployee() {
      this.submitting = true
      try {
        this.status = "Creating Employee..."
        await employeeService.create(this.userInfo).then(res => {
          if (res.data.status === true) {
            this.status = `${res.data.message}`
          }
        })
        this.clearEmployeeForm()
      } catch (err) {
        this.status = `${err}`
      }
    },
    clearEmployeeForm() {
      this.userInfo.name = ''
      this.userInfo.title = ''
      this.userInfo.phone = ''
      this.userInfo.email = ''
      this.userInfo.employeeInfo.dob = ''
      this.userInfo.employeeInfo.ssn = ''
      this.userInfo.employeeInfo.address = ''
      this.userInfo.employeeInfo.city = ''
      this.userInfo.employeeInfo.state = ''
      this.userInfo.employeeInfo.zip = ''
      this.userInfo.employeeInfo.taxInfo.marital_status = ''
      this.userInfo.employeeInfo.taxInfo.fica = ''
      this.userInfo.employeeInfo.taxInfo.medicare = ''
      this.userInfo.employeeInfo.taxInfo.state_tax = ''
      this.userInfo.employeeInfo.taxInfo.fed_deductions = ''
      this.status = ''
      this.submitting = false
    }
  }
}
</script>

<style scoped>
.add-employee {
  margin-top: 70px;
  border: 2px solid blue;
  box-shadow: 0 0 10px green;
}

.btn {
  margin: 20px 0;
}
</style>
