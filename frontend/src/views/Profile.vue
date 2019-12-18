<template>
  <NavHead/>
  <div class="profile">
    <b-container fluid>
      <b-row>
        <b-col sm="2" class="profile-nav">
          <b-button
          variant="link"
          class="profile-button"
          :disabled="showing === 'user'"
          @click="changeView('user')"
          >
            User Profile
          </b-button>
          <b-button
          variant="link"
          class="profile-button"
          :disabled="showing === 'company'"
          @click="changeView('company')"
          >
            Company Info
          </b-button>
          <b-button
          variant="link"
          class="profile-button"
          :disabled="showing === 'business'"
          @click="changeView('business')"
          >
            Business Rolodex
          </b-button>
          <b-button
          variant="link"
          class="profile-button"
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
              <b-list-group-item>{{ user.title }}</b-list-group-item>
              <b-list-group-item>{{ user.phone }}</b-list-group-item>
              <b-list-group-item>{{ user.email }}</b-list-group-item>
            </b-list-group>
            <b-button
            variant="primary"
            pill
            :to="{ name: 'singleEmployee', params: { id: user.id } }"
            >
              View Details
            </b-button>
            </b-card>
          </div>
          <div class="company" v-else-if="showing === 'company'">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            :img-alt="company.company_name"
            img-top
            v-if="!editing"
            >
            <b-list-group>
              <b-list-group-item>Tax ID: {{ company.company_ein }}</b-list-group-item>
              <b-list-group-item>{{ company.company_name }}</b-list-group-item>
              <b-list-group-item>{{ company.company_phone }}</b-list-group-item>
              <b-list-group-item>{{ company.company_email }}</b-list-group-item>
              <b-list-group-item>{{ company.company_address }}</b-list-group-item>
              <b-list-group-item>{{ company.company_city }}, {{ company.company_state }}, {{ company.company_zip }}</b-list-group-item>
            </b-list-group>
            <b-button v-if="admin && !editing" variant="danger" pill @click="editCompany(company)">
              Edit
            </b-button>
            </b-card>
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            :img-alt="company.company_name"
            img-top
            v-if="editing"
            >
            <b-list-group>
              <b-list-group-item>
                <b-form-group label="Tax ID:" label-for="input-1" label-cols>
                <b-form-input
                  id="input-1"
                  class="num-input"
                  v-model="companyInfo.company_ein"
                  type="number"
                  no-wheel
                  number
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Name:" label-for="input-2" label-cols>
                <b-form-input
                  id="input-2"
                  v-model="companyInfo.company_name"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Phone:" label-for="input-3" label-cols>
                <b-form-input
                  id="input-3"
                  v-model="companyInfo.company_phone"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Email:" label-for="input-4" label-cols>
                <b-form-input
                  id="input-4"
                  v-model="companyInfo.company_email"
                  type="email"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Address:" label-for="input-5" label-cols>
                <b-form-input
                  id="input-5"
                  v-model="companyInfo.company_address"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="City:" label-for="input-6" label-cols>
                <b-form-input
                  id="input-6"
                  v-model="companyInfo.company_city"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State:" label-for="input-7" label-cols>
                <b-form-input
                  id="input-7"
                  v-model="companyInfo.company_state"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Zip:" label-for="input-8" label-cols>
                <b-form-input
                  id="input-8"
                  class="num-input"
                  v-model="companyInfo.company_zip"
                  type="number"
                  no-wheel
                  number
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
            </b-list-group>
            <LogoUpload/>
            <b-button class="company-button" variant="success" pill @click="saveChanges">
              Save Changes
            </b-button>
            <b-button class="company-button" variant="danger" pill @click="cancelEditCompany">
              Cancel
            </b-button>
            </b-card>
          </div>
          <div class="business" v-else-if="showing === 'business'">
            <h1>Business Rolodex</h1>
            <AllBusiness
            :business="business"
            />
            <b-button v-if="admin" variant="primary" pill to="/create-business">
              Create New
            </b-button>
          </div>
          <div class="employee" v-else-if="showing === 'employee'">
            <h1>Employee Rolodex</h1>
            <AllEmployee
            :employee="employee"
            />
            <b-button v-if="admin" variant="primary" pill to="/create-employee">
              Create New
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AllBusiness from '@/components/business/AllBusinesses'
import AllEmployee from '@/components/employee/AllEmployees'
import businessService from '@/services/businessService'
import companyService from '@/services/companyService'
import employeeService from '@/services/employeeService'

export default {
  name: 'profile',
  components: {
    AllBusiness,
    AllEmployee
  },
  data () {
    return {
      showing: 'user',
      business: [],
      employee: [],
      editing: false,
      companyInfo: {}
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    company() {
      return this.$store.getters.getCompany
    },
    admin() {
      return this.$store.getters.isAdmin
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
    },
    editCompany(company) {
      this.companyInfo = {...company}
      this.editing = true
    },
    cancelEditCompany() {
      this.companyInfo = {}
      this.editing = false
    },
    async saveChanges() {
      try {
        await companyService.put(this.companyInfo).then(res => {
          if (res.data.status === true) {
            alert('Company Updated')
            this.$store.dispatch('setCompany', res.data.company)
            this.editing = false
          }
        })
      } catch (err) {
        alert(`${err}`)
      }
    }
  }
}
</script>

<style scoped>
.num-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

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
  border: 2px solid black;
}

.btn {
  margin-top: 20px;
}

.company-button {
  margin: 20px 10px;
}

.user, .company, .business, .employee {
  width: 90%;
}
</style>
