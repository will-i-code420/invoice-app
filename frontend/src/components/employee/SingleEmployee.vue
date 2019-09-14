<template>
  <b-container fluid class="employee">
    <b-row>
      <b-col cols="5">
        <div class="employee-info">
          <b-card>
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
                Marital Status: {{ employee.marital_status }} &#37;
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
    const id = this.$store.state.user.id
    const employeeId = this.$store.state.route.params.id
    await employeeService.employee(id, employeeId).then(res => {
      if (res.data.status === true) {
        this.employee = res.data.employee
      }
    })
  },
  methods: {
    editEmployee() {
      this.editing = true
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
