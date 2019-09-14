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
          <AllBusinesses/>
        </b-card-text></b-tab>
        <b-tab title="Employee Rolodex"><b-card-text>
          <AllEmployees/>
        </b-card-text></b-tab>
        <b-tab title="Add Business"><b-card-text>
          <AddBusiness/>
        </b-card-text></b-tab>
        <b-tab title="Add Employee"><b-card-text>
          <AddEmployee/>
        </b-card-text></b-tab>
      </b-tabs>
    </b-card>
    </div>
  </div>
</template>

<script>
import AddBusiness from '@/components/forms/AddBusiness'
import AddEmployee from '@/components/forms/AddEmployee'
import AllBusinesses from '@/components/business/AllBusinesses'
import AllEmployees from '@/components/employee/AllEmployees'
import ImageUpload from '@/components/ImageUpload'

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
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  async created () {
  },
  methods: {
    editInfo() {
    }
  }
}
</script>

<style scoped>

.profile-tabs {
  margin-top: 50px;
}
</style>
