<template>
  <b-container fluid class="business">
    <b-row>
      <b-col cols="6">
        <div class="business-info">
          <b-card v-if="!editing">
            <b-card-title>{{ business.business_name }}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                Contact: {{ business.business_contact }}
              </b-list-group-item>
              <b-list-group-item>
                Phone: {{ business.business_phone }}
              </b-list-group-item>
              <b-list-group-item>
                Email: {{ business.business_email }}
              </b-list-group-item>
              <b-list-group-item>
                Address: {{ business.business_address }}
              </b-list-group-item>
              <b-list-group-item>
                City/State/ZIP: {{ business.business_city }}, {{ business.business_state }} {{ business.business_zip }}
              </b-list-group-item>
              </b-list-group>
            <b-button variant="outline-danger" @click="editBusiness">
              Edit Info
            </b-button>
          </b-card>
          <b-card v-if="editing">
            <b-card-title>Editing {{ business.business_name }}</b-card-title>
            <b-list-group>
              <b-list-group-item>
                <b-form-group label="Company Name:" label-for="input-1" label-cols>
                <b-form-input
                  id="input-1"
                  v-model="business.business_name"
                ></b-form-input>
              </b-form-group>
            </b-list-group-item>
            <b-list-group-item>
              <b-form-group label="Contact:" label-for="input-5" label-cols>
              <b-form-input
                id="input-5"
                v-model="business.business_contact"
              ></b-form-input>
            </b-form-group>
            </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Phone:" label-for="input-2" label-cols>
                <b-form-input
                  id="input-2"
                  v-model="business.business_phone"
                ></b-form-input>
              </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Email:" label-for="input-3" label-cols>
                <b-form-input
                  id="input-3"
                  v-model="business.business_email"
                  type="email"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="Address:" label-for="input-4" label-cols>
                <b-form-input
                  id="input-4"
                  v-model="business.business_address"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="City:" label-for="input-8" label-cols>
                <b-form-input
                  id="input-8"
                  v-model="business.business_city"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="State:" label-for="input-9" label-cols>
                <b-form-input
                  id="input-9"
                  v-model="business.business_state"
                ></b-form-input>
                </b-form-group>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-group label="ZIP:" label-for="input-10" label-cols>
                <b-form-input
                  id="input-10"
                  v-model="business.business_zip"
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
        <div class="business-files">
          <h1>Place Holder For Current Files Saved</h1>
          <FileUpload/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import businessService from '@/services/businessService'

export default {
  name: 'singleBusiness',
  data () {
    return {
      business: {},
      editing: false
    }
  },
  computed: {
  },
  async created () {
    const businessId = this.$store.state.route.params.id
    await businessService.business(businessId).then(res => {
      if (res.data.status === true) {
        this.business = res.data.business
      }
    })
  },
  methods: {
    editBusiness() {
      this.editing = true
    },
    async saveChanges() {
      await businessService.put(this.business).then(res => {
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
.business {
  padding-top: 80px;
}

.btn {
  margin-top: 10px;
}
</style>
