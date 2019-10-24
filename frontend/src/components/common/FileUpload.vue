<template>
  <div class="file">
    <form enctype="multipart/form-data" @submit.prevent="fileUpload">
      <div class="dropzone">
        <input class="input-file" type="file" ref="files" multiple @change="selectedFiles" @drop.prevent="selectedFiles" @dragover.prevent/>
          <p v-if="!uploading" class="file-box">
            Drag your files here or click to select...
          </p>
          <p v-if="uploading" class="uploading-files">
            Uploading: {{ progress }}%
          </p>
      </div>
      <b-button pill variant="outline-primary" type="submit">
        Submit Files
      </b-button>
      <div class="file-list" v-if="files.length >= 1">
        <ul>
          <h3>Files To Upload:</h3>
          <li v-for="(file, index) in files" :key="index">
            {{file.name}}
          </li>
        </ul>
      </div>
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
      files: [],
      uploading: false,
      progress: 0
    }
  },
  methods: {
    selectedFiles() {
      const files = this.$refs.files.files
      this.files = [...this.files, ...files]
    },
    async fileUpload() {
      this.uploading = true
      const formData = new FormData()
      _.forEach(this.files, file => {
        formData.append('files', file)
      })
      formData.append('fileId', this.$store.state.route.params.id)
      try {
        await fileService.upload(formData, {
          onUploadProgress: event => this.progress = Math.round(event.loaded / event.total * 100)
        }).then(res => {
          if (res.data.status === true) {
            alert(res.data.message)
            this.files = []
            this.uploading = false
            this.progress = 0
          }
        })
      } catch(err) {
        this.uploading = false
        alert(err.response.data.error)
      }
    }
  }
}
</script>

<style scoped>
.dropzone {
  max-height: 200px;
  width: 350px;
  margin: 0 auto;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
  border: 2px dashed gray;
  border-radius: 25px;
  background: lightcyan;
}

.dropzone:hover {
  background: lightblue;
}

.input-file {
  max-height: 200px;
  width: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.file-box, .uploading-files {
  font-size: 1.3rem;
  padding-top: 1.5rem;
}

.file-list {
  margin-top: 10px;
}

.btn {
  margin-top: 10px;
}
</style>
