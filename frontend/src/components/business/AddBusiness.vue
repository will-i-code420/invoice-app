<template>
  <b-container class="add-business">
    <h1>Add Business</h1>
    <b-row>
      <b-col cols="8" offset="2">
        <b-form @submit.prevent="submitBusiness">
          <b-form-group label="Business Name:">
          <b-form-input
          v-model="businessInfo.business_name"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Contact Name:">
          <b-form-input
          v-model="businessInfo.business_contact"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Contact Phone:">
          <b-form-input
          v-model="businessInfo.business_phone"
          type="tel"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Contact Email:">
          <b-form-input
          v-model="businessInfo.business_email"
          type="email"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Business Address:">
          <b-form-input
          v-model="businessInfo.business_address"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Business City:">
          <b-form-input
          v-model="businessInfo.business_city"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Business State:">
          <b-form-input
          v-model="businessInfo.business_state"
          required
          ></b-form-input>
          </b-form-group>
          <b-form-group label="Business Zip:">
          <b-form-input
          v-model="businessInfo.business_zip"
          required
          ></b-form-input>
          </b-form-group>
          <div v-if="submitting" class="submit-status">
            {{ status }}
          </div>
          <b-button type="submit" variant="success" pill>Add Business</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import businessService from '@/services/businessService'

export default {
  name: 'add-business',
  data() {
    return {
      status: '',
      submitting: false,
      businessInfo: {
        business_name: '',
        business_contact: '',
        business_phone: '',
        business_email: '',
        business_address: '',
        business_city: '',
        business_state: '',
        business_zip: ''
      }
    }
  },
  methods: {
    async submitBusiness() {
      this.submitting = true
      try {
        this.status = "Creating New Business..."
        await businessService.create(this.businessInfo).then(res => {
          if (res.data.status === true) {
            this.status = `${res.data.message}`
          }
        })
        this.clearBusinessForm()
      } catch (err) {
        this.status = `${err}`
      }
    },
    clearBusinessForm() {
      this.businessInfo.business_name = ''
      this.businessInfo.business_contact = ''
      this.businessInfo.business_email = ''
      this.businessInfo.business_phone = ''
      this.businessInfo.business_address = ''
      this.businessInfo.business_city = ''
      this.businessInfo.business_state = ''
      this.businessInfo.business_zip = ''
      this.status = ''
      this.submitting = false
    }
  }
}
</script>

<style scoped>
.add-business {
  margin-top: 70px;
  border: 2px solid blue;
  box-shadow: 0 0 10px green;
}

.btn {
  margin: 20px 0;
}
</style>
