<template>
  <div class="image">
    <form enctype="multipart/form-data" @submit.prevent="imageUpload">
      <div class="dropzone">
        <input class="input-image" type="file" ref="image" multiple @change="selectedImage" @drop.prevent="selectedImage" @dragover.prevent/>
          <p v-if="!uploading" class="image-box">
            Drag image or click...
          </p>
          <p v-if="uploading" class="uploading-image">
            Uploading: {{ progress }}%
          </p>
      </div>
      <b-button pill variant="outline-primary" type="submit">
        Submit Image
      </b-button>
    </form>
  </div>
</template>

<script>
import fileService from '@/services/fileService'

export default {
  name: 'imageUpload',
  data () {
    return {
      image: '',
      uploading: false,
      progress: 0
    }
  },
  methods: {
    selectedImage() {
      const image = this.$refs.image.files[0]
      this.image = image
    },
    async imageUpload() {
      this.uploading = true
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('imageId', this.$store.state.user.id)
      try {
        await fileService.logo(formData, {
          onUploadProgress: event => this.progress = Math.round(event.loaded * 100 / event.total)
        }).then(res => {
          if (res.data.status === true) {
            alert(res.data.message)
            this.image = ''
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
.image{
  margin-top: 30px;
}

.dropzone {
  max-height: 125px;
  width: 125px;
  margin: 0 auto;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
  border: 2px dashed gray;
  border-radius: 60px;
  background: lightcyan;
}

.dropzone:hover {
  background: lightblue;
}

.input-image {
  max-height: 100px;
  width: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.image-box, .uploading-image {
  font-size: 1.3rem;
  padding-top: .3rem;
}

.btn {
  margin-top: 10px;
}
</style>
