import Vue from 'vue'

Vue.mixin({
  mounted() {
    this.$api = 'http://localhost:5898'
    this.$mobile = this.isMobile()
    this.$bypass = this.checkBypass()
  },
  data() {
    return {
      $mobile: true,
      $bypass: false,
    }
  },
  methods: {
    downloadURI(uri, name) {
      var link = document.createElement('a')
      // If you don't know the name or want to use
      // the webserver default set name = ''
      link.setAttribute('download', name)
      link.href = uri
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        return true
      } else {
        return false
      }
    },
    checkBypass() {
      return localStorage.getItem('bypass') == 'true'
    },
    formatSizeUnits(bytes) {
      if (bytes >= 1073741824) {
        bytes = (bytes / 1073741824).toFixed(2) + ' GB'
      } else if (bytes >= 1048576) {
        bytes = (bytes / 1048576).toFixed(2) + ' MB'
      } else if (bytes >= 1024) {
        bytes = (bytes / 1024).toFixed(2) + ' KB'
      } else if (bytes > 1) {
        bytes = bytes + ' bytes'
      } else if (bytes == 1) {
        bytes = bytes + ' byte'
      } else {
        bytes = '0 bytes'
      }
      return bytes
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
          if (encoded.length % 4 > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4))
          }
          resolve(encoded)
        }
        reader.onerror = (error) => reject(error)
      })
    },
    getByteBuffer(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
          resolve(new Uint8Array(reader.result))
        }
        reader.onerror = (error) => reject(error)
      })
    },
  },
})
