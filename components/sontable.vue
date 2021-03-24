<template>
  <div class="content">
    <div class="table-list-button">
      <div class="table-list-button-title">
        Son Table
      </div>
      <ButtonSon
        @onChangeSelect="onChangeSon($event)"
        :onClickStart="onClickStart"
        :onClickEnd="onClickEnd"
        :onClickStartEat="onClickStartEat"
        :onClickEndEat="onClickEndEat"
        :currentAction="currentAction"
        :isLoading="isLoading"
        :hiddenTemplate="hiddenTemplate"
      />
    </div>
    <!-- TABLE -->
    <a-table :columns="columns" :data-source="diaryListSon" bordered>
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
              <a-button type="primary" ghost @click="readTableSon(record)">
                <a-icon type="edit" />
              </a-button>
            </span>
          </div>
          <span v-else>
            <a-spin>
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 24px; color: green"
                spin
              />
            </a-spin>
          </span>
        </div>
      </template>
    </a-table>
    <!-- /TABLE -->
    <!-- Modal -->
    <a-modal
      class="width-modal"
      v-model="visible"
      title="Chỉnh Sửa Con"
      @ok="updateTableSon"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item label="Start Time">
            <a-input
              type="time"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableReadSon.start_time_time = $event"
              v-model="tableReadSon.start_time_time"
              :value="tableReadSon.start_time_time"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="End Time">
            <a-input
              type="time"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableReadSon.end_time_time = $event"
              v-model="tableReadSon.end_time_time"
              :value="tableReadSon.end_time_time"
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
              @onChange="tableReadSon.add_field = $event"
              v-model="tableReadSon.add_field"
              :value="tableReadSon.add_field"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Sữa Phải">
            <a-input
              type="number"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="tableReadSon.add_field_right = $event"
              v-model="tableReadSon.add_field_right"
              :value="tableReadSon.add_field_right"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="Ghi Chú">
        <a-textarea
          placeholder="textarea with clear icon"
          v-on:input="onChange"
          @onChange="tableReadSon.note = $event"
          v-model="tableReadSon.note"
          :value="tableReadSon.note"
        />
      </a-form-item>
    </a-modal>
    <!--  -->
    <!-- Modal Button END -->
    <a-modal
      class="width-modal"
      v-model="visible222"
      title="ChỈnh Sửa Mới"
      @ok="updateAction"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item label="Start Time">
            <a-input
              type="time"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="diary.start_time_time = $event"
              v-model="diary.start_time_time"
              :value="diary.start_time_time"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="End Time">
            <a-input
              type="time"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="diary.end_time_time = $event"
              v-model="diary.end_time_time"
              :value="diary.end_time_time"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item label="Lượng Sữa" v-if="diary.action === 3">
            <a-input
              type="number"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="diary.add_field = $event"
              v-model="diary.add_field"
              :value="diary.add_field"
            />
          </a-form-item>
          <a-form-item label="Lượng Sữa" v-else-if="diary.action === 5">
            <a-input
              type="number"
              placeholder="input placeholder"
              v-on:input="onChange"
              @onChange="diary.add_field = $event"
              v-model="diary.add_field"
              :value="diary.add_field"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="Ghi Chú">
        <a-textarea
          placeholder="textarea with clear icon"
          v-on:input="onChange"
          @onChange="diary.note = $event"
          v-model="diary.note"
          :value="diary.note"
        />
      </a-form-item>
    </a-modal>
    <!--  -->
  </div>
</template>
<script>
import mutationTypes from "~/constants/mutationTypes";
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
        key: "end_time_time",
        customRender(text, record) {
          let content = "action 1"
          if (record.action === 2) {
            content = "action 2";
          }

          return text;
        }
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
import {
  convertTime,
  convertDateTime,
  parseTimeToCallAPI
} from "~/helpers/time";
import ButtonSon from "~/components/button-son";
export default {
  components: {
    ButtonSon
  },
  data() {
    return {
      columns,
      editingKey: "",
      diarySelected: null,
      showDiarySon: this.diarySelected || {},
      inputValue: this.value,
      visible: false,
      visible222: false,
      //
      actionEat: "5",
      isChangingAction: false,
      templateRead: {},
      currentAction: {},
      currentIndex: 0,
      maxLengthAction: 9999,
      start_time: moment().format("YYYY-MM-DDTHH:mm:ss"),
      dataUpdated: {},
      diary: this.dataUpdated || {},
      isLoading: false,
      hiddenTemplate: localStorage.getItem("hiddenTemplate") === "true"
    };
  },
  props: ["diaryListSon"],
  methods: {
    // API
    async updateTableSon(e) {
      try {
        const startTimeChange = this.tableReadSon.start_time_time;
        const startTime = this.tableReadSon.start_time;
        const newStartTime = parseTimeToCallAPI(startTimeChange, startTime);
        const endTimeChange = this.tableReadSon.end_time_time;
        const endTime = this.tableReadSon.end_time;
        const newEndTime = parseTimeToCallAPI(endTimeChange, endTime);
        const res = await this.$store.dispatch(
          `template/${mutationTypes.TEMPLATE.UPDATE_TEMPLATE}`,
          {
            id: this.tableReadSon.id,
            start_time: newStartTime,
            end_time: newEndTime,
            add_field: this.tableReadSon.add_field,
            note: this.tableReadSon.note,
            user: this.userId,
            action: this.action,
            children: this.idOfSon
          }
        );
        if (res) {
          this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY_SON}`, {
            id: this.idOfSon
          });
          this.visible = false;
          this.tableReadSon.value = {};
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
    readTableSon: function(showDiarySon) {
      this.diarySelected = showDiarySon;
      this.visible = true;
    },
    onChange(e) {
      this.inputValue = e.target.value;
      this.$emit("onChange", e.target.value);
    },
    onChangeSon: async function(id) {
      const templateRead = await this.$store.dispatch(
        `template/${mutationTypes.TEMPLATE.READ_TEMPLATE}`,
        { id }
      );
      const index = this.currentIndex;
      this.currentIndex = index;
      this.maxLengthAction = templateRead?.diary_template?.length || 0;

      const findTemplate = templateRead?.diary_template[index];
      // Check if current index > max length
      if (findTemplate) {
        this.currentAction = templateRead?.diary_template[index];
      } else {
        alert("max");
      }

      this.templateRead = templateRead;
    },
    async updateAction() {
      try {
        const startTimeChange = this.diary.start_time_time;
        const startTime = this.diary.start_time;
        const newStartTime = parseTimeToCallAPI(startTimeChange, startTime);
        const endTimeChange = this.diary.end_time_time;
        const endTime = this.diary.end_time;
        const newEndTime = parseTimeToCallAPI(endTimeChange, endTime);
        const res = await this.$store.dispatch(
          `template/${mutationTypes.TEMPLATE.UPDATE_TEMPLATE}`,
          {
            id: this.diary.id,
            start_time: newStartTime,
            end_time: newEndTime,
            add_field: this.diary.add_field,
            note: this.diary.note,
            user: this.userId,
            action: this.action,
            children: this.idOfSon
          }
        );
        if (res) {
          this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY_SON}`, {
            id: this.idOfSon
          });
          this.visible222 = false;
          this.diary.value = "";
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
    async addTemplate() {
      try {
        this.isLoading = true;

        const res = await this.$store.dispatch(
          `template/${mutationTypes.TEMPLATE.ADD_TEMPLATE}`,
          {
            action: this.currentAction.action,
            start_time: this.start_time,
            actual_date: this.start_time,
            children: this.idOfSon,
            user: this.userId
          }
        );
        this.isLoading = false;
        if (res) {
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          return this.$store.dispatch(
            `diary/${mutationTypes.USER.GET_DIARY_SON}`,
            {
              id: this.idOfSon
            }
          );
        } else {
          this.$swal({
            icon: "error",
            title: "You have some wrong",
            text: "Check some field.",
            timer: 2000
          });
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    // Add Night Eat
    async addNightEat() {
      try {
        this.isLoading = true;

        const res = await this.$store.dispatch(
          `template/${mutationTypes.TEMPLATE.ADD_NIGHTEAT}`,
          {
            action: this.actionEat,
            start_time: this.start_time,
            actual_date: this.start_time,
            user: this.userId,
            children: this.idOfSon
          }
        );
        this.isLoading = false;
        if (res) {
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          return this.$store.dispatch(
            `diary/${mutationTypes.USER.GET_DIARY_SON}`,
            {
              id: this.idOfSon
            }
          );
        } else {
          this.$swal({
            icon: "error",
            title: "You have some wrong",
            text: "Check some field.",
            timer: 2000
          });
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    // end template
    async endTemplate() {
      try {
        const res = await this.$store.dispatch(
          `template/${mutationTypes.TEMPLATE.END_TEMPLATE}`,
          {
            id: this.diaryListSon[0].id,
            start_time: this.diaryListSon[0].start_time,
            end_time: this.start_time,
            children: this.idOfSon,
            user: this.userId,
            action: this.diaryListSon[0].action
          }
        );

        if (res) {
          const resOfDiray = await this.$store.dispatch(
            `diary/${mutationTypes.USER.GET_DIARY_SON}`,
            {
              id: this.idOfSon
            }
          );
          // Check data [0]
          this.dataUpdated = res.data || {};
          this.visible222 = true;
        } else {
          this.$toast.error("Error");
        }
      } catch (error) {
        console.log(error);
      }
    },

    // END NIGHT EAT
    async endNightEat() {
      try {
        const res = await this.$store.dispatch(
          `template/${mutationTypes.TEMPLATE.END_TEMPLATE}`,
          {
            id: this.diaryListSon[0].id,
            start_time: this.diaryListSon[0].start_time,
            end_time: this.start_time,
            children: this.idOfSon,
            user: this.userId,
            action: this.diaryListSon[0].action
          }
        );

        if (res) {
          const resOfDiray = await this.$store.dispatch(
            `diary/${mutationTypes.USER.GET_DIARY_SON}`,
            {
              id: this.idOfSon
            }
          );
          // Check data [0]
          this.dataUpdated = res.data || {};
          this.visible222 = true;
        } else {
          this.$toast.error("Error");
        }
      } catch (error) {
        console.log(error);
      }
    },
    push() {
      let index = this.currentIndex;
      this.isChangingAction = true;
      if (index <= this.maxLengthAction) {
        index = index + 1;
        this.currentIndex = index;
        const findTemplate = this.templateRead?.diary_template[index];
        // Check if current index > max length
        if (findTemplate) {
          this.currentAction = this.templateRead?.diary_template[index];
        } else {
          localStorage.setItem("hiddenTemplate", true);
          localStorage.removeItem("currentIndex");
          localStorage.removeItem("currentAction");
          localStorage.removeItem("templateRead");
          localStorage.removeItem("selected");
          localStorage.removeItem("isStartButton");
          this.hiddenTemplate = "true";
          this.visible222 = false;
        }
      } else {
        localStorage.removeItem("currentIndex");
        $(".form-template").hide();
        $(".button-start").show();
      }
    },
    check() {
      const check = this.diaryListSon[0].action;
      
      return check;
    },
    onClickStart() {
      this.addTemplate();
    },
    onClickEnd() {
      this.push();
      this.endTemplate();
    },
    onClickStartEat() {
      this.addNightEat();
    },
    onClickEndEat() {
      this.endNightEat();
    },
    moment: function() {
      return moment();
    }
  },
  watch: {
    currentAction(newCurrentAction) {
      localStorage.currentAction = JSON.stringify(newCurrentAction);
    },
    templateRead(newtemplateRead) {
      localStorage.templateRead = JSON.stringify(newtemplateRead);
    },
    dataUpdated: function(value) {
      const clonePropDiary = { ...value };
      clonePropDiary["end_time_time"] = clonePropDiary.end_time
        ? convertTime(clonePropDiary.end_time)
        : "";
      clonePropDiary["start_time_time"] = clonePropDiary.start_time
        ? convertTime(clonePropDiary.start_time)
        : "";
      this.diary = clonePropDiary;
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
    if (localStorage.currentAction) {
      this.currentAction =
        localStorage.currentAction && JSON.parse(localStorage.currentAction);
    }
    if (localStorage.templateRead) {
      this.templateRead =
        localStorage.templateRead && JSON.parse(localStorage.templateRead);
    }
    if (localStorage.currentIndex) {
      this.currentIndex =
        localStorage.currentIndex && JSON.parse(localStorage.currentIndex);
    }
  },
  computed: {
    tableReadSon: function() {
      return this.diarySelected || {};
    },
    userId: function() {
      return this.$store.getters["auth/getIdOfUser"];
    },
    idOfSon: function() {
      return this.$store.getters[`user/getIdOfSon`];
    }
  }
};
</script>
<style scoped>
.table-list-button-button {
  display: flex;
  width: 33%;
  align-items: center;
}
.editable-row-operations {
  display: flex;
  justify-content: center;
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
</style>
