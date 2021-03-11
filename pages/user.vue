<template>
  <div class="content">
    <a-row class="wrapper" :gutter="[32, 8]">
      <!-- INFOMATION -->
        <a-col class="ant-col ant-col-md-24 ant-col-lg-7 wrapper-infomation">
          <a-card class="mom-infomation" hoverable>
            <img class="user-avatar" src="img/custom-logo.jpg" alt="" />
            <div class="user-name">
              <h1>User Name</h1>
              <p>Mom</p>
            </div>
            <div class="user-detail">
              <p><a-icon type="mail" />Mail</p>
              <p><a-icon type="contacts" />Age</p>
              <p><a-icon type="environment" />Location</p>
            </div>
          </a-card>

          <a-card class="son-infomation" hoverable>
            <img class="user-avatar" src="img/custom-logo.jpg" alt="" />
            <div class="user-name">
              <h1>Son Name</h1>
              <p>Son</p>
            </div>
            <div class="user-detail">
              <p><a-icon type="user" />Gender</p>
              <p><a-icon type="carry-out" />EDD</p>
              <p><a-icon type="calendar" />Birthday</p>
            </div>
          </a-card>
        </a-col>
      <!-- /INFOMATION -->
      <!-- EDIT INFOMATION -->
        <a-col
          class="want-col ant-col-md-24 ant-col-lg-17 wrapper-edit-infomation"
        >
          <template>
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
                      placeholder="input with clear icon"
                      allow-clear
                      @change="onChange"
                    />
                  </div>
                  <!--  -->
                  <!--  -->
                  <div class="form-edit-feild gutter-example">
                    <a-row :gutter="16">
                      <a-col class="gutter-row" :span="9">
                        <div class="gutter-box">
                          <span class="form-edit-label">Name</span>
                          <a-input
                            placeholder="input with clear icon"
                            allow-clear
                            @change="onChange"
                          />
                        </div>
                      </a-col>
                      <a-col class="gutter-row" :span="9">
                        <div class="gutter-box">
                          <span class="form-edit-label">Last Name</span>
                          <a-input
                            placeholder="input with clear icon"
                            allow-clear
                            @change="onChange"
                          />
                        </div>
                      </a-col>
                      <a-col class="gutter-row" :span="6">
                        <div class="gutter-box">
                          <span class="form-edit-label">Age</span>
                          <a-input-number
                            :min="1"
                            :max="100000"
                            :default-value="3"
                            @change="onChange"
                          />
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
                      @change="onChange"
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
                        @change="onChange"
                      />
                    </div>
                    <!--  -->
                    <div class="form-edit-feild gutter-example">
                      <a-row :gutter="16">
                        <a-col class="gutter-row" :span="9">
                          <div class="gutter-box">
                            <span class="form-edit-label">Date Of Birth</span>
                            <a-date-picker
                              format="YYYY-MM-DD HH:mm:ss"
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
                              format="YYYY-MM-DD HH:mm:ss"
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
                              :default-value="{ key: 'Male' }"
                              style="width: 120px"
                              @change="handleChange"
                            >
                              <a-select-option value="Female">
                                Female
                              </a-select-option>
                              <a-select-option value="Male">
                                Male
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
                        @change="onChange"
                      />
                    </div>
                    <!--  -->
                  </div>
                <!-- /FORM EDIT -->
              </div>
            <!-- /SONEDIT  -->
            <a-button class="editable-add-btn" @click="handleAdd">
              Thay Đổi
            </a-button>
            </a-card>
          </template>
        </a-col>
      <!-- /EDIT INFOMATION -->
    </a-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  methods: {
    onChange(value) {
      console.log("changed", value);
    },
    handleChange(value) {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
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
    }
  }
};
</script>

<style>

.wrapper .ant-col{
  padding-right: 0 !important
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
  padding-left: 32px;
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
.form-edit-feild .ant-input,.form-edit-feild .ant-select,.form-edit-feild .ant-input-number{
  margin-top: 10px;
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
