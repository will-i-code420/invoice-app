<template>
  <b-container fluid class="employee">
    <b-row>
      <b-col cols="6">
        <div class="employee-info">
          <b-card v-if="!editing">
            <b-card-title>{{ user.name }}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                Title: {{ user.title }}
              </b-list-group-item>
              <b-list-group-item>
                Phone: {{ user.phone }}
              </b-list-group-item>
              <b-list-group-item>
                Email: {{ user.email }}
              </b-list-group-item>
              <b-list-group-item>
                DOB: {{ user.employeeId[0].dob }}
              </b-list-group-item>
              <b-list-group-item>
                SSN: {{ user.employeeId[0].ssn }}
              </b-list-group-item>
              <b-list-group-item>
                Address: {{ user.employeeId[0].address }}
              </b-list-group-item>
              <b-list-group-item>
                City/State/ZIP: {{ user.employeeId[0].city }}, {{ user.employeeId[0].state }} {{ user.employeeId[0].zip }}
              </b-list-group-item>
              <b-list-group-item>
                Marital Status: {{ user.employeeId[0].taxId.marital_status }}
              </b-list-group-item>
              <b-list-group-item>
                FICA: {{ user.employeeId[0].taxId.fica }}&#37;
              </b-list-group-item>
              <b-list-group-item>
                Medicare: {{ user.employeeId[0].taxId.medicare }}&#37;
              </b-list-group-item>
              <b-list-group-item>
                State Tax: {{ user.employeeId[0].taxId.state_tax }}&#37;
              </b-list-group-item>
              <b-list-group-item>
                Federal Deductions: {{ user.employeeId[0].taxId.fed_deductions }}
              </b-list-group-item>
            </b-list-group>
            <b-button variant="outline-danger" @click="editEmployee">
              Edit Info
            </b-button>
          </b-card>
          <b-card v-if="editing">
            <b-card-title>Editing</b-card-title>
            <b-list-group>
              <b-list-group-item>
                <b-form-group label="Name:" label-for="input-1" label-cols>
                <b-form-input
                  id="input-1"
                  v-model="userInfo.name"
                  :placeholder="user.name"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="Title:" label-for="input-13" label-cols>
                <b-form-input
                  id="input-13"
                  v-model="userInfo.title"
                  :placeholder="user.title"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Phone:" label-for="input-2" label-cols>
                <b-form-input
                  id="input-2"
                  v-model="userInfo.phone"
                  :placeholder="user.phone"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Email:" label-for="input-3" label-cols>
                <b-form-input
                  id="input-3"
                  v-model="userInfo.email"
                  type="email"
                  :placeholder="user.email"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="DOB:" label-for="input-11" label-cols>
                <b-form-input
                  id="input-11"
                  v-model="employeeInfo.dob"
                  :placeholder="user.employeeId[0].dob"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="SSN:" label-for="input-12" label-cols>
                <b-form-input
                  id="input-12"
                  v-model="employeeInfo.ssn"
                  :placeholder="user.employeeId[0].ssn"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Address:" label-for="input-4" label-cols>
                <b-form-input
                  id="input-4"
                  v-model="employeeInfo.address"
                  :placeholder="user.employeeId[0].address"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="City:" label-for="input-8" label-cols>
                <b-form-input
                  id="input-8"
                  v-model="employeeInfo.city"
                  :placeholder="user.employeeId[0].city"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State:" label-for="input-9" label-cols>
                <b-form-input
                  id="input-9"
                  v-model="employeeInfo.state"
                  :placeholder="user.employeeId[0].state"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="ZIP:" label-for="input-10" label-cols>
                <b-form-input
                  id="input-10"
                  v-model="employeeInfo.zip"
                  :placeholder="user.employeeId[0].zip"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Marital Status:" label-for="input-5" label-cols>
                <b-form-input
                  id="input-5"
                  v-model="taxInfo.marital_status"
                  :placeholder="user.employeeId[0].taxId.marital_status"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="State Tax %" label-for="input-14" label-cols>
                <b-form-input
                  id="input-14"
                  v-model="taxInfo.state_tax"
                  :placeholder="user.employeeId[0].taxId.fica"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="State Tax %" label-for="input-15" label-cols>
                <b-form-input
                  id="input-15"
                  v-model="taxInfo.state_tax"
                  :placeholder="user.employeeId[0].taxId.medicare"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State Tax %" label-for="input-6" label-cols>
                <b-form-input
                  id="input-6"
                  v-model="taxInfo.state_tax"
                  :placeholder="user.employeeId[0].taxId.state_tax"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Federal Deductions:" label-for="input-7" label-cols>
                <b-form-input
                  id="input-7"
                  v-model="taxInfo.fed_tax"
                  :placeholder="user.employeeId[0].taxId.fed_deductions"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
            </b-list-group>
            <b-button variant="outline-success" @click="saveChanges">
              Save
            </b-button>
          </b-card>
        </div>
      </b-col>
      <b-col cols="6">
        <div class="employee-files">
          <h1>Place Holder For Current Files Saved</h1>
          <FileUpload/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import employeeService from '@/services/employeeService'

export default {
  name: 'singleEmployee',
  data () {
    return {
      user: [],
      userInfo: {
        name: '',
        title: '',
        phone: '',
        email: ''
      },
      employeeInfo: {
        dob: '',
        ssn: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      taxInfo: {
        marital_status: '',
        fica: '',
        medicare: '',
        state_tax: '',
        fed_deductions: ''
      },
      editing: false
    }
  },
  computed: {
    admin() {
      return this.$store.getters.isAdmin
    }
  },
  async created () {
    const employeeId = this.$store.state.route.params.id
    await employeeService.employee(employeeId).then(res => {
      if (res.data.status === true) {
        this.user = res.data.employee
      }
    })
  },
  methods: {
    editEmployee() {
      this.editing = true
    },
    async saveChanges() {
      await employeeService.put(this.employee).then(res => {
        if (res.data.status === true) {
          alert(res.data.message)
          this.editing = false
        } else {
          alert(res.data.error)
        }
      })
    }
  }
}
</script>

<style scoped>
.employee {
  padding-top: 80px;
}

.btn {
  margin-top: 10px;
}
</style>
