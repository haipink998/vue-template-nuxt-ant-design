<template>
  <div class="content">
    <div class="table-list-button">
      <div class="table-list-button-title">
        Biểu đồ hút sữa
      </div>
      <div class="" v-if="chartSuckMilk.isShow">
        <Barchart
          :label="'ml'"
          :bgcolor="'#ffa6a6'"
          :dataLabels="chartSuckMilk.label"
          :data="chartSuckMilk.data"
        />
      </div>
    </div>
    <div class="table-list-button">
      <div class="table-list-button-title">
        Biểu đồ lượng bình
      </div>
      <div class=""  v-if="chartMilkSon.isShow">
        <Barchart
          :label="'ml'"
          :bgcolor="'#f7c992'"
          :dataLabels="chartMilkSon.label"
          :data="chartMilkSon.data"
        />
      </div>
    </div>
    <div class="table-list-button">
      <div class="table-list-button-title">
        Biểu đồ cân nặng
      </div>
      <div class="" v-if="chartWeight.isShow">
        <Linechart
          :label="'kg'"
          :dataLabels="chartWeight.label"
          :data="chartWeight.data"
          :bordercolor="'rgba(1, 116, 188, 0.50)'"
          :pointcolor="'#4b4e81'"
          :bgcolor="'transparent'"
        />
      </div>
    <a-button class="editable-add-btn" @click="showModal2">
      Thêm
    </a-button>
    </div>
    <div class="table-list-button">
      <div class="table-list-button-title">
        Biểu đồ chiều cao
      </div>
      <div class="" v-if="chartHeight.isShow">
        <Linechart
          :label="'cm'"
          :dataLabels="chartHeight.label"
          :data="chartHeight.data"
          :bordercolor="'rgba(1, 116, 188, 0.50)'"
          :pointcolor="'#4b4e81'"
          :bgcolor="'transparent'"
        />
      </div>
    </div>
    <a-button class="editable-add-btn" @click="showModal">
      Thêm
    </a-button>
    <a-modal v-model="visible2" title="Thêm Cân Nặng" @ok="addWeight">
      <div>
        Ngày: {{moment(this.day).format('YYYY-MM-DDTHH:mm:ss')}}
        <a-date-picker
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          :disabled-time="disabledDate"
          :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          v-model="day"
        />
        Cân Nặng：{{ total }}
        <a-input
          type="number"
          v-model="total"
          :min="1"
          :max="10"
          @change="onChange"
        />
      </div>
    </a-modal>
    <a-modal v-model="visible" title="Thêm Chiều Cao" @ok="addHeight">
      <div>
        Ngày: {{moment(this.day).format('YYYY-MM-DDTHH:mm:ss')}}
        <a-date-picker
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          :disabled-time="disabledDate"
          v-model="day"
        />
        Chiều Cao：{{ total }}
        <a-input
          type="number"
          v-model="total"
          :min="1"
          :max="10"
          @change="onChange"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import mutationTypes from "~/constants/mutationTypes";
import Barchart from "~/components/barchart";
import Linechart from "~/components/linechart";
import { convertTime, convertDateTime, parseTimeToCallAPI } from "~/helpers/time";
import { cloneDeep, isEmpty } from "lodash";
import moment from 'moment';

export default {
  
  components: { Barchart, Linechart },
  data() {
    return {
      visible: false,
      visible2: false,
      moment: moment,
      actionWeight: 4,
      actionHeight: 7,
      inputValue: this.value,
      total: '',
      day: '',
      dateAPI: moment(this.day).format('YYYY-MM-DDTHH:mm:ss'),
    };
  },
  methods: {
      onChange(e) {
      this.inputValue = e.target.value;
      this.$emit("onChange", e.target.value);
    },
     async addWeight() {
      try {
        const res = await this.$store.dispatch(
          `report/${mutationTypes.CHART.ADD_CHART}`,
          {
            action: this.actionWeight,
            start_time:  moment(this.day).format('YYYY-MM-DDTHH:mm:ss'),
            actual_date: moment(this.day).format('YYYY-MM-DDTHH:mm:ss'),
            user: this.userId,
            children: this.idofSon,
            add_field: this.total
          }
        );
        if (res) {

          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          this.visible2 = false;
          this.day = '';
          this.total = '';
          this.$store.dispatch(`report/${mutationTypes.CHART.GET_CHART}`);
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
    async addHeight() {
      try {
        const res = await this.$store.dispatch(
          `report/${mutationTypes.CHART.ADD_CHART}`,
          {
            action: this.actionHeight,
            start_time: moment(this.day).format('YYYY-MM-DDTHH:mm:ss'),
            actual_date: moment(this.day).format('YYYY-MM-DDTHH:mm:ss'),
            user: this.userId,
            children: this.idofSon,
            add_field: this.total
          }
        );
        if (res) {

          this.$swal({
            icon: "success",
            title: "Success",
            text: "Enjoy your life",
            timer: 1000
          });
          this.visible = false;
          this.day = '';
          this.total = '';
          this.$store.dispatch(`report/${mutationTypes.CHART.GET_HEIGHT}`);
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
    showModal() {
      this.visible = true;
    },
     showModal2() {
      this.visible2 = true;
    },
    // 
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDate(current) {
      // Can not select days before today and today
      return moment(this.children, 'YYYY-MM-DD') > current && current || moment().endOf('day') < current && current;
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
  },
  async mounted() {
     this.$watch(
      "value",
      value => {
        this.inputValue = value;
      },
      { immediate: true }
    );
    this.$store.dispatch(`report/${mutationTypes.CHART.GET_CHART}`);
    this.$store.dispatch(`report/${mutationTypes.CHART.GET_HEIGHT}`);
    this.$store.dispatch(`diary/${mutationTypes.USER.GET_ACTION}`);
  },
  computed: {
    userId: function() {
      return this.$store.getters["auth/getIdOfUser"];
    },
    idOfSon: function() {
      return this.$store.getters[`user/getIdOfSon`];
    },
    children: function() {
      const userInfo = cloneDeep(this.$store.getters["user/getUserInfo"]);
      const userCl = userInfo?.user_children?.[0] || {};
      return userCl.birthday;
    },
    checkdata: function() {
      const check = this.$store.getters["report/getHeight"]?.height_data || []
      console.log(check, "aa");
      return check;
    },
    chartSuckMilk: function() {
      const tempArr = cloneDeep(this.$store.getters["report/getChart"]?.mother_data || []);
      return {
        data: tempArr.slice(1).map(el => el.total),
        label: tempArr.slice(1).map(el => (el.day ? convertDateTime(el.day) : "")),
        isShow: !isEmpty(tempArr),
      }
    },
    chartMilkSon: function() {
      const tempArr = cloneDeep(this.$store.getters["report/getChart"]?.children_data || []);
      return {
        data: tempArr.slice(1).map(el => el.total),
        label: tempArr.slice(1).map(el => (el.day ? convertDateTime(el.day) : "")),
        isShow: !isEmpty(tempArr),
      }
    },
    chartWeight: function() {
      const tempArr = cloneDeep(this.$store.getters["report/getChart"]?.weight_data || []);
      return {
        data: tempArr.slice(1).map(el => el.total),
        label: tempArr.slice(1).map(el => (el.day ? convertDateTime(el.day) : "")),
        isShow: !isEmpty(tempArr),
      }
    },
    chartHeight: function() {
      const tempArr = cloneDeep(this.$store.getters["report/getHeight"]?.height_data || []);
      return {
        data: tempArr.slice(1).map(el => el.total),
        label: tempArr.slice(1).map(el => (el.day ? convertDateTime(el.day) : "")),
        isShow: !isEmpty(tempArr),
      }
    }
  }
};
</script>

<style scoped>
.table-list-button-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
}
.table-list-button {
  padding: 16px;
  margin: 0 -24px;
  border-top: 16px solid #f0f2f5;
}
.table-list-button:first-child {
  border-top: none;
  padding: 0 16px;
}
.editable-add-btn {
  background: #24b314;
  color: white;
  align-items: center;
}
</style>
