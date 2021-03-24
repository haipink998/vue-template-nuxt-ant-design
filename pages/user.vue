<template>
  <div class="content">
    <a-row class="wrapper" :gutter="[32, 8]">
      <!-- INFOMATION -->
      <a-col class="ant-col ant-col-md-24 ant-col-lg-7 wrapper-infomation">
        <a-card class="mom-infomation" hoverable>
          <img class="user-avtar" :src="userAvatar" alt="" />
          <img class="user-avatar" src="img/custom-logo.jpg" alt="" />
          <div class="user-name">
            <h1>{{ userInfo.first_name }} {{ userInfo.last_name }}</h1>
            <p>Mom</p>
          </div>
          <div class="user-detail">
            <p><a-icon type="mail" />{{ userInfo.email }}</p>
            <p><a-icon type="contacts" />{{ userInfoUserProfile.age }}</p>
            <p>
              <a-icon type="environment" />{{ userInfoUserProfile.address }}
            </p>
          </div>
        </a-card>

        <a-card class="son-infomation" hoverable>
          <img class="user-avatar" src="img/custom-logo.jpg" alt="" />
          <div class="user-name">
            <h1>{{ children.name }}</h1>
            <p>Son</p>
          </div>
          <div class="user-detail">
            <p><a-icon type="user" />{{ gender }}</p>
            <p><a-icon type="carry-out" />{{ children.edd }}</p>
            <p><a-icon type="calendar" />{{ children.birthday }}</p>
          </div>
        </a-card>
      </a-col>
      <!-- /INFOMATION -->
      <!-- EDIT INFOMATION -->
      <a-col
        class="want-col ant-col-md-24 ant-col-lg-17 wrapper-edit-infomation"
      >
        <EditInfomation :data="userInfo" :dataUser="userInfoUserProfile" :dataSon="userInfoUserChildren"/>
      </a-col>
      <!-- /EDIT INFOMATION -->
    </a-row>
  </div>
</template>

<script>
import moment from "moment";
import { typeGender } from "~/constants/index";
import mutationTypes from '~/constants/mutationTypes';
import EditInfomation from '~/components/editInfomation'
export default {
  components: {
    EditInfomation
  },
   watch: {
    data: function(value) {
      const cloneData = { ...value };
      this.userInfo = cloneData;
    },
    dataUser: function(value) {
      const cloneDataProfile = { ...value };
      this.userInfoUserProfile = cloneDataProfile;
    },
    dataSon: function(value) {
      const cloneDataProfile = { ...value };
      this.children = cloneDataProfile;
    }
  },
    data: function() {
    return {
      inputValue: this.value
    };
  },
   mounted() {
    this.$watch(
      "value",
      value => {
        this.inputValue = value;
      },
      { immediate: true }
    );
  },
  methods: {
    moment
  },
  computed: {
    userInfo: function() {
      return this.$store.getters["user/getUserInfo"] || {};
    },
    userInfoUserProfile: function() {
      const userInfo = this.$store.getters["user/getUserInfo"];
      return userInfo?.user_profile || {};
    },
    children: function() {
      const userInfo = this.$store.getters["user/getUserInfo"];
      return userInfo?.user_children?.[0] || {};
    },
    userInfoUserChildren: function() {
    const userInfo = this.$store.getters["user/getUserInfo"];
    return userInfo?.user_children?.[0] || {};
    },
    userAvatar: function() {
      return (
        this.$store.getters["user/getUserInfo"]?.user_profile
          ?.profile_picture || null
      );
    },
    gender: function() {
      const userInfo = this.$store.getters["user/getUserInfo"];
      if (userInfo) {
        const gender = userInfo.user_profile.gender;
        return typeGender[gender];
      }
      return null;
    },
    userId: function() {
      return this.$store.getters["auth/getIdOfUser"];
    },
    optionsGenderLocal: function() {
      return optionsGender;
    }

  }
};
</script>

<style>
.wrapper .ant-col {
  padding-right: 0 !important;
}
.wrapper-infomation {
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.95);
}

.edit-infomation {
  box-shadow: rgba(0, 0, 0, 0.9);
}
.ant-card-body {
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}
.mom-infomation,
.son-infomation {
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.85);
}
.user-avatar {
  text-align: center;
  max-width: 104px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.user-name {
  text-align: center;
}
.user-name h1 {
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
.user-detail {
  padding-top: 32px;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
}
.user-detail p {
  padding: 5px 0;
}
.user-detail p i {
  padding-right: 10px;
}
/*  */
.mom-edit,
.son-edit {
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  padding: 20px 0;
  position: relative;
}
.header-text-title {
  position: absolute;
  top: -14px;
  z-index: 1;
  padding-right: 12px;
  background: #fff;
  font-weight: 500;
  font-size: 16px;
  color: #1890ff;
}
.header-text-depcription {
  font-size: 14px;
}
.form-edit {
  padding: 32px 0;
}
.form-edit-label {
  font-size: 14px;
  font-weight: 500;
}
.form-edit-feild {
  padding: 15px 0;
}

/*  */
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}

.ant-input-number,
.ant-calendar-picker,
.ant-select {
  width: 100% !important;
}
/*  */
.editable-add-btn {
  background: #24b314;
  color: white;
  align-items: center;
}
</style>
