<template>
  <div class="profile">
    <NavHead
    :user="user"
    />
    <h1>Hello, {{ user.name }} from {{ user.company_name }}</h1>
    <h2>Current Info:</h2>
    <hr>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <div class="profile-info">
            <b-table bordered hover :items="userInfo" :fields="fields">
              <template slot="edit" slot-scope="{ item }">
                <b-button
                pill
                variant="outline-danger"
                size="small"
                @click="editItem(item)"
                >
                  Edit
                </b-button>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'

export default {
  name: 'profile',
  components: {
    NavHead
  },
  data () {
    return {
      user: '',
      userInfo:[],
      fields: [
        { key: 'name' },
        { key: 'email' },
        { key: 'phone', label: 'Contact #' },
        { key: 'company_name' },
        { key: 'company_address', label: 'Address' },
        { key: 'edit' }
      ]
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userInfo = [this.user]
  },
  methods: {
    editInfo(item) {

    }
  }
}
</script>

<style scoped>
h1 {
  padding-top: 70px;
}
</style>
