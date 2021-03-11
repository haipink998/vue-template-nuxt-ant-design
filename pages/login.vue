<template>
  <div class="container">
    <div class="login-form">
      <div class="login-form-logo">
        <img src="img/logo.png" alt="" />
      </div>
      <h4 class="login-form-header">
        Login
      </h4>
      <!-- FORM LOGIN -->
      <a-form-model
        layout="vertical"
        :model="formInline"
        @submit.prevent="login"
        @submit="handleSubmit"
        @submit.native.prevent
        class="login-form-form"
      >
        <a-form-model-item>
          <a-input v-model="formInline.username" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="formInline.password"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formInline.username === '' || formInline.password === ''"
          >
            Log in
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <!--  -->
      <div class="login-form-footer">
        <p>Design By ABC</p>
      </div>
    </div>
  </div>
</template>

<script>
import mutationTypes from "~/constants/mutationTypes";
import { Alert } from "~/node_modules/ant-design-vue/lib";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  layout: "empty",

  data() {
    return {
      hasErrors,
      formInline: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    handleSubmit(e) {
      console.log(this.formInline);
    },
    async login() {
      try {
        const res = await this.$store.dispatch(mutationTypes.AUTH.LOGIN, {
          username: this.formInline.username,
          password: this.formInline.password
        });
        if (res) {
           this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          setTimeout(() => {this.$router.push("/")}, 1000)
          
        } else {
          this.$swal({
            icon: "error",
            title: "You have some wrong",
            text: "Wrong password or account.",
            timer: 2000
          });
        }
      } catch (e) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  background: #f3efe8;
  padding: 20px;
  min-height: 100%;
}
.login-form {
  max-width: 450px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
  background: white;
  height: 100%;
}
.login-form-logo {
  text-align: center;
  padding: 15%;
}
.login-form-logo img {
  max-width: 80px;
}
.login-form-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  padding-left: 80px;
  font-size: 1.5rem;
  font-weight: 500;
  color: #334152;
}
.login-form-header::after {
  content: "";
  background-color: royalblue;
  width: 32px;
  height: 7px;
  border-radius: 2px;
  display: block;
  position: absolute;
  bottom: -4px;
  left: 80px;
}
.login-form-form {
  padding: 20px 80px;
}
.login-form-footer {
  margin-top: 20px;
  font-weight: 300;
}
.login-form-footer p {
  margin-top: 0;
  margin-bottom: 1rem;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  background: #fff;
  border: 2px solid #dde2ec;
  border-radius: 4px;
}
</style>
