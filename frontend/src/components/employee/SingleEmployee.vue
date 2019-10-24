<template>
  <b-container fluid class="employee">
    <b-row>
      <b-col cols="5">
        <div class="employee-info">
          <b-card v-if="!editing">
            <b-card-title>{{ employee.name }}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                Phone: {{ employee.phone }}
              </b-list-group-item>
              <b-list-group-item>
                Email: {{ employee.email }}
              </b-list-group-item>
              <b-list-group-item>
                Address: {{ employee.address }}
              </b-list-group-item>
              <b-list-group-item>
                City/State/ZIP: {{ employee.city }}, {{ employee.state }} {{ employee.zip }}
              </b-list-group-item>
              <b-list-group-item>
                Marital Status: {{ employee.marital_status }}
              </b-list-group-item>
              <b-list-group-item>
                State Tax: {{ employee.state_tax }} &#37;
              </b-list-group-item>
              <b-list-group-item>
                Federal Deductions: {{ employee.fed_tax }}
              </b-list-group-item>
            </b-list-group>
            <b-button variant="outline-danger" @click="editEmployee">
              Edit Info
            </b-button>
          </b-card>
          <b-card v-if="editing">
            <b-card-title>Editing {{ employee.name }}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                <b-form-group label="Name:" label-for="input-1" label-cols>
                <b-form-input
                  id="input-1"
                  v-model="employee.name"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Phone:" label-for="input-2" label-cols>
                <b-form-input
                  id="input-2"
                  v-model="employee.phone"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Email:" label-for="input-3" label-cols>
                <b-form-input
                  id="input-3"
                  v-model="employee.email"
                  type="email"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Address:" label-for="input-4" label-cols>
                <b-form-input
                  id="input-4"
                  v-model="employee.address"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="City:" label-for="input-8" label-cols>
                <b-form-input
                  id="input-8"
                  v-model="employee.city"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State:" label-for="input-9" label-cols>
                <b-form-input
                  id="input-9"
                  v-model="employee.state"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="ZIP:" label-for="input-10" label-cols>
                <b-form-input
                  id="input-10"
                  v-model="employee.zip"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Marital Status:" label-for="input-5" label-cols>
                <b-form-input
                  id="input-5"
                  v-model="employee.marital_status"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State Tax %" label-for="input-6" label-cols>
                <b-form-input
                  id="input-6"
                  v-model="employee.state_tax"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Federal Deductions:" label-for="input-7" label-cols>
                <b-form-input
                  id="input-7"
                  v-model="employee.fed_tax"
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
import FileUpload from '@/components/FileUpload'
import employeeService from '@/services/employeeService'

export default {
  name: 'singleEmployee',
  components: {
    FileUpload
  },
  data () {
    return {
      employee: [],
      fields: [
        {key: 'id', label: 'ID #'},
        {key: 'name'},
        {key: 'phone'},
        {key: 'email'},
        {key: 'address'},
        {key: 'city'},
        {key: 'state'},
        {key: 'zip'},
        {key: 'marital_status'},
        {key: 'fed_tax', label: 'Federal Deductions'},
        {key: 'state_tax', label: 'State Tax Rate'},
        {key: 'edit'},
      ],
      editing: false
    }
  },
  computed: {
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
