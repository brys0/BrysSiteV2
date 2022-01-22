<template>
  <div class="release">
    <div class="release" v-if="blank">
      <div class="release-header">
        <h3 class="notice">
          New Release
          <div class="header">
            <h4>Logout in {{ time }}</h4>
          </div>
        </h3>
        <div class="input">
          <span>Release Tag:</span>
          <input
            type="text"
            class="release-input"
            placeholder="Release Tag"
            v-model="release.tag"
            required
          />
          <span class="release-channel">Channel:</span>
          <button
            class="pre-release-toggle enable"
            v-if="prerelease"
            @click="prerelease = false"
          />
          <button
            class="pre-release-toggle disable"
            v-else-if="!prerelease"
            @click="prerelease = true"
          />
        </div>
        <div class="input">
          <span>Title:</span>
          <input
            type="text"
            class="release-input extended left"
            placeholder="Title"
            v-model="release.title"
            required
          />
        </div>
        <div class="special-input">
          <span>Description:</span>
          <textarea
            type="text"
            class="release-input txt extended left"
            placeholder="Description"
            v-model="release.description"
            required
          />
        </div>
        <div class="input-file">
          <button
            @click="selectFile"
            class="select-btn"
            v-if="!file || !file.valid"
          >
            <img src="@/assets/svg/select.svg" />
          </button>

          <input
            type="file"
            name="release-upload"
            ref="release-upload"
            accept=".msi"
            @change="verifyFile"
            required
          />
        </div>

        <div class="release-actions">
          <button
            class="upload-btn"
            @click="uploadFile"
            v-if="file && file.valid"
            :finished="upload.finished"
          >
            <img src="@/assets/svg/file_upload_white_24dp.svg" />
          </button>
          <div class="release-actions-info">
            <div class="release-file-details" v-if="file">
              <span :class="'file-details ' + file.valid ? 'primary' : 'error'"
                >{{ file.name }}
                <span class="primary"
                  ><b>{{ formatSizeUnits(file.size) }}</b></span
                ></span
              >
              <button class="file-actions" @click="deleteFile">
                <img src="@/assets/svg/close.svg" height="18px" width="18px" />
              </button>
            </div>
            <span class="release-uploaded" v-if="uploading"
              >{{ formatSizeUnits(upload.uploaded) }}/{{
                formatSizeUnits(upload.total)
              }}</span
            >
            <span>{{ response.text }}</span>
          </div>
          <button class="cancel-upload-btn" @click="deleteComp">
            <img src="@/assets/svg/close.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="release" v-else>
      <div class="tag">
        <button
          :class="`pre-release-toggle rh circle ${
            r.prerelease ? 'enable' : 'disable'
          }`"
          disabled
        />
        <b
          ><h2 :class="`${r.prerelease ? 'enable' : 'disable'}`">
            {{ r.tag }}
          </h2></b
        >
      </div>
      <div class="release-header" static="true">
        <span>{{ r.title }}</span>
      </div>
      <div class="special-input">
        <span type="text" class="release-input txt extended left">{{
          r.description
        }}</span>
      </div>
      <div class="release-actions">
        <button
          @click="downloadFile"
          :class="`${r.prerelease ? 'enable' : 'disable'} download-btn`"
          type="button"
        >
          <img src="@/assets/svg/file_download_white_24dp.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import countdown from "countdown";
export default {
  name: "release",
  props: {
    r: Object,
    blank: Boolean,
  },
  mounted() {
    if (
      !localStorage.getItem("auth") ||
      JSON.parse(localStorage.getItem("auth").expiry < Date.now())
    ) {
      return this.$router.push("/login");
    }

    let auth = JSON.parse(localStorage.getItem("auth"));
    this.access = true;
    this.time = new countdown(auth.expiry);
    setInterval(() => {
      this.time = new countdown(auth.expiry);
      if (auth.expiry < Date.now()) {
        this.$router.push("/login");
      }
    }, 1000);
  },
  methods: {
    downloadFile(e) {
      this.downloadURI(this.$api + this.r.msi, this.r.tag);
    },
    deleteComp() {
      this.$emit("close");
    },
    deleteFile(e) {
      e.preventDefault();
      this.file = null;
      this.$refs["release-upload"].value = null;
    },
    selectFile(e) {
      e.preventDefault();
      this.$refs["release-upload"].click();
    },
    verifyFile(e) {
      e.preventDefault();
      let file = e.srcElement.files[0];
      if (file == null) return;
      if (!file.name.includes(".msi")) {
        this.file = {
          name: "Invalid File Type",
          size: 0,
          valid: false,
        };
        return;
      }
      this.file = {
        name: file.name,
        raw: file,
        size: file.size,
        valid: true,
      };
    },
    async uploadFile(e) {
      let ctx = this;
      this.upload.info = "Converting...";
      let b64 = await this.getBase64(this.file.raw);
      this.upload.info = "Uploading";
      this.uploading = true;
      this.$axios
        .$post(
          `${this.$api}/development/release/create`,
          JSON.stringify({
            auth: JSON.parse(localStorage.getItem("auth")).verifier,
            release: {
              tag: ctx.release.tag,
              title: ctx.release.title,
              description: ctx.release.description,
              prerelease: ctx.prerelease,
              msi: b64,
            },
          }),
          {
            onUploadProgress: (progressEvent) => {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              ctx.upload.total = progressEvent.total;
              ctx.upload.uploaded = progressEvent.loaded;
              ctx.upload.info = `${percentCompleted}`;
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          this.upload.finished = true;
          this.release = {
            tag: "",
            description: "",
            tag: "",
          };
          this.file = null;
          this.upload = {
            info: "0",
            progress: 0,
            total: 0,
            uploaded: 0,
            finished: false,
          };
          this.response = {
            text: "",
          };
          this.$emit("close");
          this.uploading = false;
          return;
        })
        .catch((e) => {
          this.response.text = e.response.data.res;
          this.uploading = false;
          return;
        });
    },
  },
  data() {
    return {
      prerelease: false,
      release: {
        title: "",
        description: "",
        tag: "",
      },
      file: null,
      upload: {
        info: "0",
        progress: 0,
        total: 0,
        uploaded: 0,
        finished: false,
      },
      response: {
        text: "",
      },
      uploading: false,
      time: "",
      access: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.tag {
  display: flex;
  align-items: center;
  margin-left: 5px;
  b {
    margin-left: 5px;
  }
  button {
    border-radius: 3px;
  }
}
.notice {
  color: $primary;
  margin-right: 10px;
}
.release-header {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  &[static="true"] {
    flex-direction: row;
    align-items: center;
    color: $primary;
    font-weight: bold;
    span {
      margin-left: 5px;
      font-size: 32px;
    }
  }
}
.release {
  background: $background-secondary;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
.release-input {
  border: none;
  background: $background-darker;
  outline: none;
  color: white;
  height: 22px;
  width: 50px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  margin-left: 5px;
  :hover {
    outline: none;
    border: none;
  }
}
.input {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.special-input {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  margin-top: 5px;
}
.input-file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.extended {
  width: 160px;
}
.left {
  text-align: left;
}
.txt {
  min-width: 50vw;
  width: 70vw;
  height: 25vh;
  max-width: 90vw;
  max-height: 50vh;
  font-family: $font-web;
  font-weight: lighter;
  font-size: 22px;
  word-wrap: break-word;
}
.release-channel {
  margin-left: 10px;
}
.release-upload-lbl {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.pre-release-toggle {
  @include button;
  margin-left: 10px;
  height: 20px;
  &.enable {
    background: $error;
  }
  &.disable {
    background: $secondary;
  }
}
.input-file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
.select-btn {
  @include button;
  height: 30px;
}
.download-btn {
  @include button;
  height: 30px;
}
input[type="file"] {
  display: none;
}
.upload-btn {
  @include button($secondary);
  height: 28px;
  margin: 5px;
  font-size: 22px;
  margin-right: auto;
  &[finished="true"] {
    background: $secondary;
    &:hover {
      background: $error;
    }
  }
}
.release-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 3px;
}
.cancel-upload-btn {
  @include button($background);
  height: 28px;
  margin: 5px;
  font-size: 22px;
  margin-left: auto;
  &[finished="true"] {
    background: $secondary;
    &:hover {
      background: $error;
    }
  }
}
.release-uploaded {
  color: $secondary;
}
.release-actions-info {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.file-actions {
  @include button($background);
}
.release-file-details {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  color: $primary;
  h4 {
    margin-left: auto;
    color: white;
    opacity: 0.6;
  }
}
.rh {
  cursor: default;
  margin-left: 0px;
  &:hover {
    opacity: 1;
  }
}
.circle {
  border-radius: 50% !important;
  height: 32px !important;
  width: 32px !important;
  min-width: 0px;
}
.enable {
  color: $error;
  &[type="button"] {
    background: $error !important;
  }
}
.disable {
  color: $secondary;
  &[type="button"] {
    background: $secondary !important;
  }
}
</style>