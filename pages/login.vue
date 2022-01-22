<template>
  <div class="login-page">
    <h1>Login To View Details</h1>
    <form class="login-form" @submit="login">
      <div class="login-input">
        <img
          src="@/assets/svg/email_white_24dp.svg"
          width="32"
          height="32"
        /><input name="email" type="email"  placeholder="Email" required v-model="email" />
      </div>
      <div class="login-input">
        <img
          src="@/assets/svg/password_white_24dp.svg"
          width="32"
          height="32"
        /><input name="password" type="password" placeholder="Password" required v-model="password"/>
      </div>
      <span class="response">
          {{statusText}}
      </span>
      <button type="submit">
          <img :src="submitState" height="32px" width="32px">
      </button>
      
    </form>
  </div>
</template>

<script>
export default {
    name: 'login',
    methods: {
        async login(e) {
            e.preventDefault();
            this.submitState = require('@/assets/svg/buttonload.svg');
            let verifyReq = await fetch('http://localhost:5898/development/login', {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({email: this.email, password: this.password})
            });
            let status = verifyReq.status;
            let json = await verifyReq.json();
            if (status === 403) {
                this.statusText = json.res;
                this.submitState = require('@/assets/svg/close.svg');
            } else {
                localStorage.removeItem('auth');
                localStorage.setItem('auth', JSON.stringify({verifier: json.verifier, expiry: Date.now() + 5400000}));
                setTimeout(() => location.href = '/', 150);
            }
        }
    },
    data() {
        return {
            email: '',
            password: '',
            statusText: '',
            submitState: require('@/assets/svg/login_white_24dp.svg')
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";
.login-page {
  display: flex;
  justify-content: center;
  height: 50vh;
  flex-direction: column;
  align-items: center;
}
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
}
.login-input {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: $primary 2px solid;
  background: $background-secondary;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  img {
    margin-left: 5px;
    margin-right: 5px;
  }
  input {
    outline: 0;
    background: transparent;
    padding: 5px;
    border: none;
    border-left: #bb86fc70 2px solid;
    font-size: 150%;

    color: $secondary;
    width: 100%;
  }

}
  button[type="submit"] {
      @include button;
      font-size: 32px;
      font-weight: bold;
      padding: 1px;
      margin-top: 20px;
      border-radius: 5px;
      width: 100px;
      img {
          margin-top: 5px;
          margin-bottom: auto;
      }
  }
  .response {
      color: $error;
      font-weight: bold;
      font-family: Arial;
  }
</style>