<template>
  <div class="file">
    <form enctype="multipart/form-data" @submit.prevent="fileUpload">
      <label>Upload File</label>
      <input type="file" ref="files" multiple @change="selectedFiles"/>
      <div class="file-list" v-for="(file, index) in files" :key="index">
        {{file.name}}
      </div>
      <br>
      <b-button pill variant="outline-primary" type="submit">
        Add
      </b-button>
    </form>
  </div>
</template>

<script>
import fileService from '@/services/fileService'
import _ from 'lodash'

export default {
  name: 'FileUpload',
  data () {
    return {
      files: []
    }
  },
  methods: {
    selectedFiles() {
      const files = this.$refs.files.files
      this.files = [...this.files, ...files]
    },
    async fileUpload() {
      const formData = new FormData()
      _.forEach(this.files, file => {
        formData.append('files', file)
      })
      formData.append('fileId', this.$store.state.route.params.id)
      try {
        await fileService.upload(formData).then(res => {
          if (res.data.status === true) {
            alert(res.data.message)
            this.files = []
          }
        })
      } catch(err) {
          alert(err.response.data.error)
      }
    }
  }
}
</script>

<style scoped>
</style>
