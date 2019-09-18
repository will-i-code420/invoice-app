<template>
  <div class="image">
    <form enctype="multipart/form-data" @submit.prevent="imageUpload">
      <div class="dropzone" :style="{'background-image': `url(${imagePreview})`}">
        <input class="input-image" type="file" ref="image" @change="selectedImage" @drop.prevent="selectedImage" @dragover.prevent/>
          <span v-if="!uploading && !showPreview" class="image-box">
            Drag image or click...
          </span>
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
      progress: 0,
      showPreview: false,
      imagePreview: ''
    }
  },
  methods: {
    selectedImage() {
      this.image = this.$refs.image.files[0]
       let reader = new FileReader()
       if (this.image) {
         this.showPreview = true
         reader.onload = e => {
           this.imagePreview = e.target.result
         }
         reader.readAsDataURL(this.image)
       }
    },
    async imageUpload() {
      this.uploading = true
      const formData = new FormData()
      formData.append('image', this.image)
      try {
        await fileService.logo(formData, {
          onUploadProgress: event => this.progress = Math.round(event.loaded / event.total * 100)
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
  height: 125px;
  width: 125px;
  margin: 0 auto;
  padding: 10px 10px;
  position: relative;
  display: block;
  cursor: pointer;
  border: 2px dashed gray;
  border-radius: 50%;
  background: lightcyan;
  background-size: cover;
  background-position: center center;
}

.dropzone:hover {
  background: lightblue;
}

.input-image {
  height: 125px;
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
