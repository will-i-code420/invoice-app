<template>
  <div class="profile">
    <h1>Hello, {{ user.name }} from {{ user.company_name }}</h1>
    <div class="profile-tabs">
    <b-card no-body>
      <b-tabs pills card vertical nav-wrapper-class="w-25">
        <b-tab title="Your Info" active><b-card-text>
          <li>{{ user.name }}</li>
          <li>{{ user.email }}</li>
          <li>{{ user.phone }}</li>
        </b-card-text></b-tab>
        <b-tab title="Company Info"><b-card-text>
          <li>{{ user.company_name }}</li>
          <li>{{ user.company_address }}</li>
          <li>{{ user.company_city }}, {{ user.company_state }}, {{ user.company_zip }}</li>
        </b-card-text></b-tab>
        <b-tab title="Add Business To Rolodex"><b-card-text>
          <b-form @submit.prevent="submitBusiness">
            <b-form-group
            id="input-group-1"
            label="Business Name:"
            label-for="input-1"
            >
            <b-form-input
            id="input-1"
            v-model="businessInfo.business_name"
            required
            ></b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="Contact Name:"
            label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="businessInfo.business_contact"
            required
            ></b-form-input>
            </b-form-group>
            <b-form-group
            id="input-group-3"
            label="Contact Phone:"
            label-for="input-3">
            <b-form-input
            id="input-3"
            v-model="businessInfo.business_phone"
            type="tel"
            required
            ></b-form-input>
            </b-form-group>
            <b-form-group
            id="input-group-4"
            label="Contact Email:"
            label-for="input-4">
            <b-form-input
            id="input-4"
            v-model="businessInfo.business_email"
            type="email"
            required
            ></b-form-input>
            </b-form-group>
            <b-form-group
            id="input-group-5"
            label="Business Address:"
            label-for="input-5">
            <b-form-input
            id="input-5"
            v-model="businessInfo.business_address"
            required
            ></b-form-input>
            </b-form-group>
            <b-form-group
            id="input-group-6"
            label="Business City:"
            label-for="input-6">
            <b-form-input
            id="input-6"
            v-model="businessInfo.business_city"
            required
            ></b-form-input>
            <b-form-group
            id="input-group-7"
            label="Business State:"
            label-for="input-7">
            <b-form-input
            id="input-7"
            v-model="businessInfo.business_state"
            required
            ></b-form-input>
            </b-form-group>
            </b-form-group>
            <b-form-group
            id="input-group-8"
            label="Business Zip:"
            label-for="input-8">
            <b-form-input
            id="input-8"
            v-model="businessInfo.business_zip"
            required
            ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Add Business</b-button>
          </b-form>
        </b-card-text></b-tab>
        <b-tab title="Business Rolodex"><b-card-text>
          <b-table bordered hover :items="business" :fields="bfields">
            <template slot="view" slot-scope="{ item }">
              <b-button
              pill
              variant="outline-success"
              size="small"
              :to="{ name: 'singleBusiness', params: { id: item.id } }"
              >
              View Employee
              </b-button>
            </template>
          </b-table>
        </b-card-text></b-tab>
        <b-tab title="Employee Rolodex"><b-card-text>
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
        </b-card-text></b-tab>
        <b-tab title="Add Employee"><b-card-text>
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
            label="State Tax Rate:"
            label-for="input-16">
            <b-form-input
            id="input-16"
            v-model="employeeInfo.state_tax"
            required
            ></b-form-input>
            </b-form-group>
            <b-form-group
            id="input-group-17"
            label="Federal Tax Rate:"
            label-for="input-17">
            <b-form-input
            id="input-17"
            v-model="employeeInfo.fed_tax"
            required
            ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Add Employee</b-button>
          </b-form>
        </b-card-text></b-tab>
      </b-tabs>
    </b-card>
    </div>
  </div>
</template>

<script>
import businessService from '@/services/businessService'
import employeeService from '@/services/employeeService'

export default {
  name: 'profile',
  data () {
    return {
      business: [],
      employee: [],
      fields: [
        { key: 'name' },
        { key: 'phone', label: 'Phone #' },
        { key: 'email' },
        { key: 'created_on', label: 'Hire Date' },
        { key: 'view' }
      ],
      bfields: [
        { key: 'business_name', label: 'Name' },
        { key: 'business_contact', label: 'Contact' },
        { key: 'business_phone', label: 'Phone #' },
        { key: 'business_email', label: 'Email' },
        { key: 'view' },
      ],
      status: '',
      businessInfo: {
        business_name: '',
        business_contact: '',
        business_phone: '',
        business_email: '',
        business_address: '',
        business_city: '',
        business_state: '',
        business_zip: ''
      },
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
    user() {
      return this.$store.getters.getUser
    },
    token() {
      return this.$store.getters.getToken
    }
  },
  async created () {
    try {
      await this.getBusinessRolodex()
      await this.getEmployeeRolodex()
    } catch (err) {
      alert(err.response.data.error)
    }
  },
  methods: {
    editInfo() {
    },
    async submitBusiness() {
      this.status = "Saving New Business"
      let business = {}
      const formData = new FormData()
      formData.append("business_name", this.businessInfo.business_name)
      formData.append("business_contact", this.businessInfo.business_contact)
      formData.append("business_email", this.businessInfo.business_email)
      formData.append("business_phone", this.businessInfo.business_phone)
      formData.append("business_address", this.businessInfo.business_address)
      formData.append("business_city", this.businessInfo.business_city)
      formData.append("business_state", this.businessInfo.business_state)
      formData.append("business_zip", this.businessInfo.business_zip)
      formData.append("businessId", this.user.id)
      for (const [key, value] of formData.entries()) {
        business[key] = value
      }
      console.log(business)
      await businessService.create(business).then(res => {
        if (res.data.status === true) {
          alert(res.data.message)
          this.getBusinessRolodex()
          this.clearBusinessForm()
        } else {
          alert(res.data.message)
        }
      })
    },
    clearBusinessForm() {
      this.businessInfo.business_name = '',
      this.businessInfo.business_contact = '',
      this.businessInfo.business_email = '',
      this.businessInfo.business_phone = '',
      this.businessInfo.business_address = '',
      this.businessInfo.business_city = '',
      this.businessInfo.business_state = '',
      this.businessInfo.business_zip = '',
      this.status = ''
    },
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
      console.log(employee)
      await employeeService.create(employee).then(res => {
        if (res.data.status === true) {
          alert(res.data.message)
          this.getEmployeeRolodex()
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
    },
    async getBusinessRolodex() {
      try {
        const id = this.$store.state.user.id
        await businessService.index(id).then(res => {
          if (res.data.status === true) {
            this.business = res.data.business
          }
        })
      } catch (err) {
        alert(err.response.data.error)
      }
    },
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
h1 {
  padding-top: 70px;
}
.profile-tabs {
  margin-top: 50px;
}
</style>
