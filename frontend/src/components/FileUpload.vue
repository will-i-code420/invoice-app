<template>
  <div class="file">
    <b-form enctype="multipart/form-data" @submit.prevent="fileUpload">
      <label>Upload File</label>
      <input type="file" ref="file" @change="selectedFile">
      <b-button pill variant="outline-primary" type="submit">
        Add
      </b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FileUpload',
  data () {
    return {
      file: ''
    }
  },
  methods: {
    selectedFile() {
      const form = this.$refs.file.files[0]
      this.file = form
    },
    async fileUpload() {
      let user = JSON.parse(localStorage.getItem('user'))
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('user_id', user.id)
      try {
        await axios.post('http://localhost:3128/uploads', formData,
        {
          headers: {"x-access-token": localStorage.getItem("token")}
        })
        alert("Upload Successful!")
      }
      catch(err) {
        alert(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
