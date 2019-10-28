<template>
  <b-container fluid class="employee">
    <b-row>
      <b-col cols="6">
        <div class="employee-info">
          <b-card v-if="!editing">
            <b-card-title>{{ employee.name }}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                Title: {{ employee.title }}
              </b-list-group-item>
              <b-list-group-item>
                Phone: {{ employee.phone }}
              </b-list-group-item>
              <b-list-group-item>
                Email: {{ employee.email }}
              </b-list-group-item>
              <b-list-group-item>
                DOB: {{ employee.employeeId[0].dob }}
              </b-list-group-item>
              <b-list-group-item>
                SSN: {{ employee.employeeId[0].ssn }}
              </b-list-group-item>
              <b-list-group-item>
                Address: {{ employee.employeeId[0].address }}
              </b-list-group-item>
              <b-list-group-item>
                City/State/ZIP: {{ employee.employeeId[0].city }}, {{ employee.employeeId[0].state }} {{ employee.employeeId[0].zip }}
              </b-list-group-item>
              <b-list-group-item>
                Marital Status: {{ employee.employeeId[0].taxId.marital_status }}
              </b-list-group-item>
              <b-list-group-item>
                FICA: {{ employee.employeeId[0].taxId.fica }}&#37;
              </b-list-group-item>
              <b-list-group-item>
                Medicare: {{ employee.employeeId[0].taxId.medicare }}&#37;
              </b-list-group-item>
              <b-list-group-item>
                State Tax: {{ employee.employeeId[0].taxId.state_tax }}&#37;
              </b-list-group-item>
              <b-list-group-item>
                Federal Deductions: {{ employee.employeeId[0].taxId.fed_deductions }}
              </b-list-group-item>
            </b-list-group>
            <b-button variant="outline-danger" @click="editEmployee(employee)">
              Edit Info
            </b-button>
          </b-card>
          <b-card v-if="editing">
            <b-card-title>Editing: {{employee.name}}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                <b-form-group label="Name:" label-for="input-1" label-cols>
                <b-form-input
                  id="input-1"
                  v-model="employeeInfo.name"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="Title:" label-for="input-13" label-cols>
                <b-form-input
                  id="input-13"
                  v-model="employeeInfo.title"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Phone:" label-for="input-2" label-cols>
                <b-form-input
                  id="input-2"
                  v-model="employeeInfo.phone"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Email:" label-for="input-3" label-cols>
                <b-form-input
                  id="input-3"
                  v-model="employeeInfo.email"
                  type="email"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="DOB:" label-for="input-11" label-cols>
                <b-form-input
                  id="input-11"
                  v-model="employeeInfo.employeeId[0].dob"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="SSN:" label-for="input-12" label-cols>
                <b-form-input
                  id="input-12"
                  v-model="employeeInfo.employeeId[0].ssn"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Address:" label-for="input-4" label-cols>
                <b-form-input
                  id="input-4"
                  v-model="employeeInfo.employeeId[0].address"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="City:" label-for="input-8" label-cols>
                <b-form-input
                  id="input-8"
                  v-model="employeeInfo.employeeId[0].city"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State:" label-for="input-9" label-cols>
                <b-form-input
                  id="input-9"
                  v-model="employeeInfo.employeeId[0].state"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="ZIP:" label-for="input-10" label-cols>
                <b-form-input
                  id="input-10"
                  v-model="employeeInfo.employeeId[0].zip"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Marital Status:" label-for="input-5" label-cols>
                  <b-form-radio-group
                  id="input-16"
                  v-model="employeeInfo.employeeId[0].taxId.marital_status"
                  :options="options"
                  required
                  ></b-form-radio-group>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="FICA %" label-for="input-14" label-cols>
                <b-form-input
                  id="input-14"
                  v-model="employeeInfo.employeeId[0].taxId.fica"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item v-if="admin">
                <b-form-group label="Medicare %" label-for="input-15" label-cols>
                <b-form-input
                  id="input-15"
                  v-model="employeeInfo.employeeId[0].taxId.medicare"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State Tax %" label-for="input-6" label-cols>
                <b-form-input
                  id="input-6"
                  v-model="employeeInfo.employeeId[0].taxId.state_tax"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Federal Deductions:" label-for="input-7" label-cols>
                <b-form-input
                  id="input-7"
                  v-model="employeeInfo.employeeId[0].taxId.fed_deductions"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
            </b-list-group>
            <b-button variant="outline-success" @click="saveChanges">
              Save
            </b-button>
            <b-button variant="outline-success" @click="cancelChanges">
              Cancel
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
      employee: [],
      employeeInfo: {},
      editing: false,
      options: [
        {text: 'Single', value: 'single'},
        {text: 'Married', value: 'married'}
      ]
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
        this.employee = res.data.employee
      }
    })
  },
  methods: {
    editEmployee(employee) {
      this.employeeInfo = {...employee}
      this.editing = true
    },
    cancelChanges() {
      this.employeeInfo = {}
      this.editing = false
    },
    async saveChanges() {
      await employeeService.put(this.employeeInfo).then(res => {
        if (res.data.status === true) {
          alert(res.data.message)
          this.employee = res.data.employee
          this.$store.dispatch('setUser', res.data.employee)
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
  margin: 20px 10px;
}
</style>
