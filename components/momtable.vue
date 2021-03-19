<template>
  <div class="content">
    <div class="table-list-button">
      <div class="table-list-button-title">
        MomTable
      </div>
      <a-button class="editable-add-btn" @click="addAction" v-if="isButtonEnd">
        Bắt đầu hút sữa
      </a-button>
      <p v-else></p>
    </div>
    <a-table :columns="columns" :data-source="diaryList" bordered>
      <template
        v-for="col in ['action_name', 'start_time']"
        :slot="col"
        slot-scope="text"
      >
        <div :key="col">
          <template>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <div v-if="record.status">
            <span>
              <a-button type="primary" ghost @click="readTable(record)">
                <a-icon type="edit" />
              </a-button>
            </span>
          </div>
          <span v-else>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Kết Thúc</span>
              </template>
              <a-button type="danger" ghost @click="endAction(record)">
                <a-icon type="close" />
              </a-button>
            </a-tooltip>
          </span>
        </div>
      </template>
    </a-table>
    <!-- Modal -->
    <a-modal
      class="width-modal"
      v-model="visible"
      title="Chỉnh Sửa Mẹ"
      @ok="handleOk"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item label="Start Time">
            <a-input
              type="time"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableRead.start_time_time = $event"
              v-model="tableRead.start_time_time"
              :value="tableRead.start_time_time"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="End Time">
            <a-input
              type="time"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableRead.end_time_time = $event"
              v-model="tableRead.end_time_time"
              :value="tableRead.end_time_time"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item label="Sữa Trái">
            <a-input
              type="number"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableRead.add_field = $event"
              v-model="tableRead.add_field"
              :value="tableRead.add_field"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Sữa Phải">
            <a-input
              type="number"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableRead.add_field_right = $event"
              v-model="tableRead.add_field_right"
              :value="tableRead.add_field_right"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        label="Ghi Chú"      >
        <a-textarea placeholder="textarea with clear icon" 
          v-on:input="onChange"
        @onChange="tableRead.note = $event"
        v-model="tableRead.note"
        :value="tableRead.note"
        />
      </a-form-item>
    </a-modal>
    <!--  -->
  </div>
</template>
<script>
const columns = [
  {
    title: "Hoạt Động",
    dataIndex: "action_name",
    width: "15%",
    scopedSlots: { customRender: "Hoạt Động" }
  },
  {
    title: "Thời Gian",
    children: [
      {
        title: "Bắt Đầu",
        dataIndex: "start_time_time",
        key: "start_time_time"
      },
      {
        title: "Kết Thúc",
        dataIndex: "end_time_time",
        key: "end_time_time"
      }
    ],
    width: "15%",
    scopedSlots: { customRender: "Khung giờ" }
  },
  {
    title: "Ngày",
    dataIndex: "end_time_day",
    width: "15%",
    scopedSlots: { customRender: "Ngày" }
  },
  {
    title: "Lượng sữa (ml)",
    children: [
      {
        title: "Trái",
        dataIndex: "add_field",
        key: "add_field"
      },
      {
        title: "Phải",
        dataIndex: "add_field_right",
        key: "add_field_right"
      }
    ],
    width: "15%",
    scopedSlots: { customRender: "Lượng sữa" }
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
    width: "20%",
    scopedSlots: { customRender: "Ghi chú" }
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    width: "10%",
    scopedSlots: { customRender: "Trạng Thái" }
  },
  {
    title: "Tùy chỉnh",
    dataIndex: "id",
    width: "10%",
    scopedSlots: { customRender: "operation" },
    key: "id"
  }
];

import moment from "moment";
import { convertTime, convertDateTime, parseTimeToCallAPI } from "~/helpers/time";
import mutationTypes from "~/constants/mutationTypes";
export default {

  //
  data() {
    return {
      columns,
      editingKey: "",
      // API
      end_time: moment().format("YYYY-MM-DDTHH:mm:ss"),
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      diarySelected: null,
      // START BUTTON
      actionMom: "1",
      start_time: moment().format("YYYY-MM-DDTHH:mm:ss"),
      diary: this.diaryList[0]?.end_time,
      showDiary: this.diarySelected || {},
      inputValue: this.value,
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
    // Modal
    async handleOk(e) {
      try {
        const startTimeChange = this.tableRead.start_time_time;
        const startTime = this.tableRead.start_time;
        const newStartTime = parseTimeToCallAPI(startTimeChange, startTime);
        const endTimeChange = this.tableRead.end_time_time;
        const endTime = this.tableRead.end_time;
        const newEndTime = parseTimeToCallAPI(endTimeChange, endTime);
        const res = await this.$store.dispatch(
          `diary/${mutationTypes.TABLE.UPDATE_ACTION}`,
          {
            id: this.tableRead.id,
            start_time: newStartTime,
            end_time: newEndTime,
            add_field: this.tableRead.add_field,
            add_field_right: this.tableRead.add_field_right,
            note: this.tableRead.note,
            user: this.userId,
            action: this.action
          }
        );
        if (res) {
          this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY}`);
          this.visible = false;
          this.tableRead.value = {};
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
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
    },
    // API
    moment: function() {
      return moment();
    },
    readTable: function(showDiary) {
      this.diarySelected = showDiary;
      this.visible = true;
    },
    onChange(e) {
      this.inputValue = e.target.value;
      this.$emit("onChange", e.target.value);
    },
    async endAction(thisDiary) {
      const nextDiary = { ...thisDiary };
      nextDiary.end_time = convertDateTime(null, "YYYY-MM-DDTHH:mm:ss");

      try {
        const res = await this.$store.dispatch(
          `diary/${mutationTypes.TABLE.END_ACTION}`,
          {
            nextDiary
          }
        );
        if (res) {
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY}`);
        } else {
          this.$swal({
            icon: "error",
            title: "You have some wrong",
            text: "Wrong password or account.",
            timer: 2000
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addAction() {
      try {
        const res = await this.$store.dispatch(
          `diary/${mutationTypes.TABLE.ADD_ACTION}`,
          {
            action: this.actionMom,
            start_time: this.start_time,
            actual_date: this.start_time,
            user: this.userId
          }
        );
        if (res) {
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY}`);
        } else {
          this.$swal({
            icon: "error",
            title: "You have some wrong",
            text: "Wrong password or account.",
            timer: 2000
          });
        }
      } catch (error) {
        console.log(error, "wrong");
      }
    },
    // END API
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    }
  },
  // API
  props: ["diaryList"],
  computed: {
    userId: function() {
      return this.$store.getters["auth/getIdOfUser"];
    },
    tableRead: function() {
      return this.diarySelected || {};
    },
    isButtonEnd: function() {
      const res = this.diaryList[0]?.end_time;
      return res;
    },
    userId: function() {
      return this.$store.getters["auth/getIdOfUser"];
    }
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.table-list-button {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
}
.table-list-button-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
}
.editable-add-btn {
  background: #24b314;
  color: white;
  align-items: center;
}
</style>
