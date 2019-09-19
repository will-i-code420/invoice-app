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
          <h3>Placeholder for Company Logo</h3>
          <li>{{ user.company_name }}</li>
          <li>{{ user.company_address }}</li>
          <li>{{ user.company_city }}, {{ user.company_state }}, {{ user.company_zip }}</li>
          <ImageUpload/>
        </b-card-text></b-tab>
        <b-tab title="Business Rolodex"><b-card-text>
          <AllBusinesses
          :business="business"
          />
        </b-card-text></b-tab>
        <b-tab title="Employee Rolodex"><b-card-text>
          <AllEmployees
          :employee="employee"
          />
        </b-card-text></b-tab>
        <b-tab title="Add Business"><b-card-text>
          <AddBusiness
          :getBusinessRolodex="getBusinessRolodex"
          />
        </b-card-text></b-tab>
        <b-tab title="Add Employee"><b-card-text>
          <AddEmployee
          :getEmployeeRolodex="getEmployeeRolodex"
          />
        </b-card-text></b-tab>
      </b-tabs>
    </b-card>
    </div>
  </div>
</template>

<script>
import AddBusiness from '@/components/business/AddBusiness'
import AddEmployee from '@/components/employee/AddEmployee'
import AllBusinesses from '@/components/business/AllBusinesses'
import AllEmployees from '@/components/employee/AllEmployees'
import ImageUpload from '@/components/ImageUpload'
import businessService from '@/services/businessService'
import employeeService from '@/services/employeeService'

export default {
  name: 'profile',
  components: {
    AddBusiness,
    AddEmployee,
    AllBusinesses,
    AllEmployees,
    ImageUpload
  },
  data () {
    return {
      business: [],
      employee: []
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  async created () {
    try {
      await this.getEmployeeRolodex()
      await this.getBusinessRolodex()
    } catch (err) {
      alert(err.response.data.error)
    }
  },
  methods: {
    async getEmployeeRolodex() {
      try {
        await employeeService.index().then(res => {
          if (res.data.status === true) {
            this.employee = res.data.employee
          }
        })
      } catch (err) {
        alert(err.response.data.error)
      }
    },
    async getBusinessRolodex() {
      try {
        await businessService.index().then(res => {
          if (res.data.status === true) {
            this.business = res.data.business
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

.profile-tabs {
  margin-top: 50px;
}
</style>
