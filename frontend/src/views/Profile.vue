<template>
  <div class="profile">
    <b-container fluid>
      <b-row>
        <b-col sm="2" class="profile-nav">
          <b-button
          variant="link"
          class="profile-tab"
          :disabled="showing === 'user'"
          @click="changeView('user')"
          >
            User Profile
          </b-button>
          <b-button
          variant="link"
          class="profile-tab"
          :disabled="showing === 'company'"
          @click="changeView('company')"
          >
            Company Info
          </b-button>
          <b-button
          variant="link"
          class="profile-tab"
          :disabled="showing === 'business'"
          @click="changeView('business')"
          >
            Business Rolodex
          </b-button>
          <b-button
          variant="link"
          class="profile-tab"
          :disabled="showing === 'employee'"
          @click="changeView('employee')"
          >
            Employee Rolodex
          </b-button>
        </b-col>
        <b-col cols="10" class="profile-tab">
          <div class="user" v-if="showing === 'user'">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            >
            <b-list-group>
              <b-list-group-item>{{ user.name }}</b-list-group-item>
              <b-list-group-item>{{ user.phone }}</b-list-group-item>
              <b-list-group-item>{{ user.email }}</b-list-group-item>
            </b-list-group>
            <b-button variant="danger">Edit</b-button>
            </b-card>
          </div>
          <div class="company" v-else-if="showing === 'company'">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            >
            <b-list-group>
              <b-list-group-item>Tax ID: {{ company.company_ein }}</b-list-group-item>
              <b-list-group-item>{{ company.company_name }}</b-list-group-item>
              <b-list-group-item>{{ company.company_phone }}</b-list-group-item>
              <b-list-group-item>{{ company.company_email }}</b-list-group-item>
              <b-list-group-item>{{ company.company_address }}</b-list-group-item>
              <b-list-group-item>{{ company.company_city }}, {{ company.company_state }}, {{ company.company_zip }}</b-list-group-item>
            </b-list-group>
            <b-button variant="danger">Edit</b-button>
            <LogoUpload/>
            </b-card>
          </div>
          <div class="business" v-else-if="showing === 'business'">
            <h1>Business Rolodex</h1>
            <AllBusiness
            :business="business"
            />
          </div>
          <div class="employee" v-else-if="showing === 'employee'">
            <h1>Employee Rolodex</h1>
            <AllEmployee
            :employee="employee"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AllBusiness from '@/components/business/AllBusinesses'
import AllEmployee from '@/components/employee/AllEmployees'
import LogoUpload from '@/components/LogoUpload'
import businessService from '@/services/businessService'
import employeeService from '@/services/employeeService'

export default {
  name: 'profile',
  components: {
    AllBusiness,
    AllEmployee,
    LogoUpload
  },
  data () {
    return {
      showing: 'user',
      business: [],
      employee: []
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    company() {
      return this.$store.getters.getCompany
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
    },
    changeView(view) {
      this.showing = view
    }
  }
}
</script>

<style scoped>
.profile {
  padding-top: 65px;
  background-color: #14AE94;
  min-height: 100vh;
}

.profile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.profile-tab {
  display: flex;
  justify-content: center;
  color: white;
}

.btn {
  margin-top: 20px;
}

.user, .company, .business, .employee {
  width: 80%;
}
</style>
