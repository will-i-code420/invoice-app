<template>
  <b-form @submit.prevent="submitBusiness">
    <b-form-group
    id="input-group-1"
    label="Business Name:"
    label-for="input-1"
    >
    <b-form-input
    id="input-1"
    v-model="businessInfo.business_name"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-2"
    label="Contact Name:"
    label-for="input-2">
    <b-form-input
    id="input-2"
    v-model="businessInfo.business_contact"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-3"
    label="Contact Phone:"
    label-for="input-3">
    <b-form-input
    id="input-3"
    v-model="businessInfo.business_phone"
    type="tel"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-4"
    label="Contact Email:"
    label-for="input-4">
    <b-form-input
    id="input-4"
    v-model="businessInfo.business_email"
    type="email"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-5"
    label="Business Address:"
    label-for="input-5">
    <b-form-input
    id="input-5"
    v-model="businessInfo.business_address"
    required
    ></b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-6"
    label="Business City:"
    label-for="input-6">
    <b-form-input
    id="input-6"
    v-model="businessInfo.business_city"
    required
    ></b-form-input>
    <b-form-group
    id="input-group-7"
    label="Business State:"
    label-for="input-7">
    <b-form-input
    id="input-7"
    v-model="businessInfo.business_state"
    required
    ></b-form-input>
    </b-form-group>
    </b-form-group>
    <b-form-group
    id="input-group-8"
    label="Business Zip:"
    label-for="input-8">
    <b-form-input
    id="input-8"
    v-model="businessInfo.business_zip"
    required
    ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="success" pill>Add Business</b-button>
    {{ status }}
  </b-form>
</template>

<script>
import businessService from '@/services/businessService'

export default {
  name: 'add-business',
  props: {
    getBusinessRolodex: Function
  },
  data() {
    return {
      status: '',
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
      this.status = "Saving New Business"
      const business = {}
      const formData = new FormData()
      formData.append("business_name", this.businessInfo.business_name)
      formData.append("business_contact", this.businessInfo.business_contact)
      formData.append("business_email", this.businessInfo.business_email)
      formData.append("business_phone", this.businessInfo.business_phone)
      formData.append("business_address", this.businessInfo.business_address)
      formData.append("business_city", this.businessInfo.business_city)
      formData.append("business_state", this.businessInfo.business_state)
      formData.append("business_zip", this.businessInfo.business_zip)
      formData.append("businessId", this.$store.state.user.id)
      for (const [key, value] of formData.entries()) {
        business[key] = value
      }
      await businessService.create(business).then(res => {
        if (res.data.status === true) {
          alert(res.data.message)
          this.getBusinessRolodex()
          this.clearBusinessForm()
        } else {
          alert(res.data.message)
        }
      })
    },
    clearBusinessForm() {
      this.businessInfo.business_name = '',
      this.businessInfo.business_contact = '',
      this.businessInfo.business_email = '',
      this.businessInfo.business_phone = '',
      this.businessInfo.business_address = '',
      this.businessInfo.business_city = '',
      this.businessInfo.business_state = '',
      this.businessInfo.business_zip = '',
      this.status = ''
    }
  }
}
</script>

<style scoped>
</style>
