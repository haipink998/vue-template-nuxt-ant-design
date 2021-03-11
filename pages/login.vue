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
      <a-form class="login-form-form" layout="vertical" :form="form" @submit="handleSubmit">
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
              'phonenumber',
              {
                rules: [
                  { required: true, message: 'Please input your Phone Number!' }
                ]
              }
            ]"
            placeholder="Phone Number"
          >
            <a-icon slot="prefix" type="phone" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              }
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
      <!--  -->
      <div class="login-form-footer">
        <p>Design By ABC</p>
      </div>
    </div>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  layout: "empty",
  
   data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('phonenumber') && getFieldError('phonenumber');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>

<style>
body{
  background: #f3efe8;
}
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
.login-form-footer{
  margin-top:20px;
  font-weight: 300;
}.login-form-footer p{
  margin-top:0;
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
