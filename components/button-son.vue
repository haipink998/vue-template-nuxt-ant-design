<template>
  <div class="table-list-button-button" v-if="!hiddenTemplate">
    <div v-if="timeCheck >= 5 && timeCheck <= 9">
      <a-button class="editable-add-btn">
        Bắt đầu hút sữa
      </a-button>
    </div>
    <!--  -->
    <div v-else>
      <div v-if="isLoading">Loading...</div>
      <div class="button-template" v-else>
        <a-button
          v-if="renderButtonStart"
          type="button"
          class="editable-add-btn"
          @click="handleClickStart"
        >
          Bắt đầu {{ currentAction.action_name }}
          Id: {{ currentAction.id }}
        </a-button>
        <a-button
          v-else-if="renderButtonEnd"
          type="button"
          class="editable-add-btn-end"
          @click="handleClickEnd"
        >
          Kết thúc {{ currentAction.action_name }}
          Id: {{ currentAction.id }}
        </a-button>
        <p v-else></p>
      </div>
    </div>
    <a-select
      show-search
      placeholder="Select a person"
      option-filter-prop="children"
      style="width: 200px"
      v-model="selected"
      @change="onChange($event)"
    >
      <a-select-option
        v-for="option in templateList"
        :key="option.id"
        :value="option.id"
      >
        {{ option.title }}
      </a-select-option>
    </a-select>
  </div>
  <div v-else>
      <a-button
        type="button"
        class="editable-add-btn"
        @click="handleClickStartEat"
        v-if="renderStart"
      >
        Bắt đầu ăn đêm
      </a-button>
      <a-button
        type="button"
        class="editable-add-btn-end"
        @click="handleClickEndEat"
        v-else
      >
        Kết thúc ăn đêm
      </a-button>
    </div>
</template>

<script>
import { currentTime } from "~/helpers/time";
export default {
  
  data() {
    return {
      maxLengthAction: 999,
      isLastAction: false,
      showStart: localStorage.getItem("isStartButton") === "true",
      showStartEat: localStorage.getItem("isStartButtonEat") === "true",
      selected: ""
    };
  },
  props: [
    "templateRead",
    "onClickStart",
    "onClickEnd",
    "onClickStartEat",
    "onClickEndEat",
    "currentAction",
    "index",
    "onAdd",
    "isLoading",
    "hiddenTemplate"
  ],
  mounted() {
    if (localStorage.selected) {
      this.selected =
        localStorage.selected && JSON.parse(localStorage.selected);
    }
    if (localStorage.hiddenTemplate) {
      this.hiddenTemplate =
        localStorage.hiddenTemplate && JSON.parse(localStorage.hiddenTemplate);
    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selected = JSON.stringify(newSelected);
    },
    hiddenTemplateWatched(cloneHiddenTemplate) {
      localStorage.hiddenTemplate = JSON.stringify(cloneHiddenTemplate);
    }
  },
  methods: {
    onChange() {
      this.$emit("onChangeSelect", this.selected);
    },
    onAddMethod() {
      this.onAdd && this.onAdd();
    },
    toogle() {
      this.showStart = !this.showStart;
      localStorage.setItem("isStartButton", this.showStart);
    },
    toggleEat() {
      this.showStartEat = !this.showStartEat;
      localStorage.setItem("isStartButtonEat", this.showStartEat);
    },
    handleClickStartEat() {
      this.toggleEat();
      this.onClickStartEat && this.onClickStartEat();
    },
    handleClickEndEat() {
      this.toggleEat();
      this.onClickEndEat && this.onClickEndEat();
    },
    handleClickStart() {
      this.toogle();
      this.onClickStart && this.onClickStart();
    },

    handleClickEnd() {
      this.toogle();
      this.onClickEnd && this.onClickEnd();
    }
  },
  computed: {
    queueAction: function() {
      const listAction = this.templateRead?.diary_template || [];
      this.maxLengthAction = listAction.length;
      return;
    },
    timeCheck: function(time) {
      const timezone = currentTime(time);
      return timezone;
    },
    templateList: function() {
      const list = this.$store.getters["template/getTemplateList"] || [];
      return list;
    },

    renderButtonStart: function() {
      return this.currentAction.id && !this.showStart;
    },
    renderStart: function() {
      return !this.showStartEat;
    },
    renderButtonEnd: function() {
      return this.currentAction.id && this.showStart;
    },
    renderEnd: function() {
      return this.showStartEat;
    }
  }
};
</script>

<style>
.editable-add-btn {
  background: #24b314;
  color: white;
  align-items: center;
  margin: 0 15px;
}
.editable-add-btn-end {
  background: #ff0000;
  color: white;
  align-items: center;
  margin: 0 15px;
}
</style>
