<template>
  <a-form @submit.prevent="updateUser">
    <a-card class="edit-infomation" title="Edit Infomation">
      <!-- MOM EDIT -->
      <div class="mom-edit">
        <div class="header-text">
          <span class="header-text-title">
            Mom Edit
          </span>
          <span class="header-text-depcription">
            Enjoy the passion
          </span>
        </div>
        <div class="form-edit">
          <!--  -->
          <div class="form-edit-feild">
            <span class="form-edit-label">Email address</span>
            <a-input
              placeholder="Input Here..."
              allow-clear
              v-on:input="onChange"
              @onChange="userInfoEdit.email = $event"
              v-model="userInfoEdit.email"
              :value="userInfoEdit.email"
              
            />
            {{userInfoEdit.email}}
          </div>
          <!--  -->
          <!--  -->
          <div class="form-edit-feild gutter-example">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="9">
                <div class="gutter-box">
                  <span class="form-edit-label">Name</span>
                  <a-input
                    placeholder="Input Here..."
                    allow-clear
                    v-on:input="onChange"
                    @onChange="userInfoEdit.first_name = $event"
                    v-model="userInfoEdit.first_name"
                    :value="userInfoEdit.first_name"
                  />
                </div>
              </a-col>
              <a-col class="gutter-row" :span="9">
                <div class="gutter-box">
                  <span class="form-edit-label">Last Name</span>
                  <a-input
                    placeholder="Input Here..."
                    allow-clear
                    v-on:input="onChange"
                    @onChange="userInfoEdit.last_name = $event"
                    v-model="userInfoEdit.last_name"
                    :value="userInfoEdit.last_name"
                  />
                </div>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <div class="gutter-box">
                  <span class="form-edit-label">Age</span>
                  <a-input-number
                    :min="1"
                    :max="99"
                    @change="handleChange"
                    v-on:input="handleChange"
                    @handleChange="userInfoUserProfile.age = $event"
                    v-model="userInfoUserProfile.age"
                    :default-value="userInfoUserProfile.age"
                  />
                </div>
                {{userInfoUserProfile.age}}
              </a-col>
            </a-row>
          </div>
          <!--  -->
          <!--  -->
          <div class="form-edit-feild">
            <span class="form-edit-label">Address</span>
            <a-textarea
              placeholder="Input Here..."
              allow-clear
              v-on:input="onChange"
              @change="onChange"
              @onChange="userInfoUserProfile.address = $event"
              :value="userInfoUserProfile.address"
              v-model="userInfoUserProfile.address"
            />
          </div>
          <!--  -->
        </div>
      </div>
      <!--  -->
      <!-- SON EDIT -->
      <div class="son-edit">
        <!-- SON TITLE EDIT -->
        <div class="header-text">
          <span class="header-text-title">
            Son Edit
          </span>
          <span class="header-text-depcription">
            Enjoy the passion
          </span>
        </div>
        <!-- /SON TITLE EDIT -->
        <!-- FORM EDIT -->
        <div class="form-edit">
          <div class="form-edit-feild">
            <span class="form-edit-label">Son Name</span>
            <a-input
              placeholder="input with clear icon"
              allow-clear
              v-on:input="onChange"
              @onChange="userInfoUserChildren.name = $event"
              :value="userInfoUserChildren.name"
              v-model="userInfoUserChildren.name"
            />
          </div>
          <!--  -->
          <div class="form-edit-feild gutter-example">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="9">
                <div class="gutter-box">
                  <span class="form-edit-label">Date Of Birth</span>
                  <a-date-picker
                    :value="userInfoUserChildren.birthday"
                    format="YYYY-MM-DD HH:mm:ss"
                    @change="handleChange"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledDateTime"
                    :show-time="{
                      defaultValue: moment('00:00:00', 'HH:mm:ss')
                    }"
                  />
                </div>
              </a-col>
              <a-col class="gutter-row" :span="9">
                <div class="gutter-box">
                  <span class="form-edit-label">Edd</span>
                  <a-date-picker
                    :value="userInfoUserChildren.edd"
                    format="YYYY-MM-DD HH:mm:ss"
                    @change="handleChange"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledDateTime"
                    :show-time="{
                      defaultValue: moment('00:00:00', 'HH:mm:ss')
                    }"
                  />
                </div>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <div class="gutter-box">
                  <span class="form-edit-label">Gender</span>
                  <a-select
                    label-in-value
                    :default-value="{ key: optionsGenderLocal[0].value }"
                    style="width: 120px"
                  >
                    <a-select-option v-for="gender in optionsGenderLocal" :key="gender.value" :value="gender.value">
                      {{gender.label}}
                    </a-select-option>
                  </a-select>
                </div>
              </a-col>
            </a-row>
          </div>
          <!--  -->
          <!--  -->
          <div class="form-edit-feild">
            <span class="form-edit-label">Note</span>
            <a-textarea
              placeholder="textarea with clear icon"
              allow-clear
              v-on:input="onChange"
              @onChange="userInfoUserProfile.text_note = $event"
              :value="userInfoUserChildren.text_note"
              v-model="userInfoUserChildren.text_note"
            /> 
          </div>
          <!--  -->
        </div>
        <!-- /FORM EDIT -->
      </div>
      <!-- /SONEDIT  -->
      <a-button html-type="submit" class="editable-add-btn">
        Thay Đổi
      </a-button>
    </a-card>
  </a-form>
</template>

<script>
import moment from "moment";
import { cloneDeep } from "lodash";
import mutationTypes from "~/constants/mutationTypes";
import { optionsGender } from "~/constants/index";
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    dataUser: {
      type: Object,
      default: {}
    },
    dataSon: {
      type: Object,
      default: {}
    } 
  },
  data: function() {
    return {
      userInfoEdit: cloneDeep(this.data || {}),
      userInfoUserProfile: cloneDeep(this.dataUser || {}),
      userInfoUserChildren: cloneDeep(this.dataSon || {}),
      inputValue: this.value,
    };
  },
  watch: {
    data: function(value) {
      const cloneData = { ...value };
      this.userInfoEdit = cloneData;
    },
    dataUser: function(value) {
      const cloneDataProfile = { ...value };
      this.userInfoUserProfile = cloneDataProfile;
    },
    dataSon: function(value) {
    const cloneDataProfileChildren = { ...value };
    this.userInfoUserChildren = cloneDataProfileChildren;
    }
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
    moment,
    handleChange(value) {
      this.inputValue = value;
      this.$emit("handleChange", value)
    },
    onChange(e) {
      this.inputValue = e.target.value;
      this.$emit("onChange", e.target.value);
    },
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56]
      };
    },

    disabledRangeTime(_, type) {
      if (type === "start") {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56]
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56]
      };
    },
    async updateUser() {
      try {
        const res = await this.$store.dispatch(
          `user/${mutationTypes.USER.UPDATE_USER}`,
          {
            id: this.userId,
            email: this.userInfoEdit.email,
            first_name: this.userInfoEdit.first_name,
            last_name: this.userInfoEdit.last_name,
            user_profile: {
              ...this.userInfoUserProfile,
              address: this.address,
              age: this.age
            },
            user_children: { ...this.userInfoUserChildren,id: this.idOfSon, name: this.nameSon, text_note: this.textNote  }
          }
        );
        if (res) {
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          setInterval(() => {
            location.reload();
          }, 1000);
        } else {
          this.$swal({
            icon: "error",
            title: "You have some wrong",
            text: "Check some field.",
            timer: 2000
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    nameSon: function() {
      return this.userInfoUserChildren.name;
    },
    textNote: function() {
      return this.userInfoUserChildren.text_note;
    },
    address: function() {
      return this.userInfoUserProfile.address;
    },
    age: function() {
      return this.userInfoUserProfile.age;
    },
    userId: function() {
      return this.$store.getters["auth/getIdOfUser"];
    },
    idOfSon: function() {
      return this.$store.getters[`user/getIdOfSon`];
    },
    optionsGenderLocal: function() {
      return optionsGender;
    }
  }
};
</script>

<style></style>
