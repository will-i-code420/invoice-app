<template>
  <div class="profile">
    <NavHead
    :user="user"
    />
    <h1>Hello {{ user.name }} of {{ user.company_name }}</h1>
    <h2>Current Profile Info:</h2>
    <hr>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <div class="profile-info">
            <b-table bordered hover :items="user">
              <template slot="edit" slot-scope="{ item }">
                <b-button
                pill
                variant="outline-danger"
                size="small"
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
      user: ''
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style scoped>
h1 {
  padding-top: 70px;
}
</style>
