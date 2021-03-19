<template>
  <div class="table-wrapper">
    <Momtable :diaryList="diaryList" />
    <Sontable :diaryListSon="diaryListSon" />
  </div>
</template>
<script>
import Sontable from "~/components/sontable";
import { convertTime, convertDateTime } from "~/helpers/time";
import mutationTypes from "~/constants/mutationTypes";
export default {
  components: {
    Sontable
  },
  mounted() {
    this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY}`);
    this.$store.dispatch(`diary/${mutationTypes.USER.GET_DIARY_SON}`, {
      id: this.idOfSon
    });
    this.$store.dispatch(`template/${mutationTypes.TEMPLATE.GET_TEMPLATE}`)
  },
  computed: {
    diaryList: function() {
      return (this.$store.getters["diary/getDiaryList"] || []).map(el => ({
        ...el,
        status: !!el.end_time,
        start_time_time: el.start_time
          ? convertTime(el.start_time)
          : "Processing",
        end_time_time: el.end_time ? convertTime(el.end_time) : "Processing",
        end_time_day: el.end_time ? convertDateTime(el.end_time) : "Processing"
      }));
    },
    diaryListSon: function() {
      const list = this.$store.getters["diary/diaryListSon"];
      return list.map(el => {
        return {
          ...el,
          status: !!el.end_time,
          start_time_time: el.start_time
            ? convertTime(el.start_time)
            : "Processing",
          end_time_time: el.end_time ? convertTime(el.end_time) : "Processing",
          end_time_day: el.end_time
            ? convertDateTime(el.end_time)
            : "Processing"
        };
      });
    },
    idOfSon: function() {
      return this.$store.getters[`user/getIdOfSon`];
    }
  }
};
</script>

<style scoped></style>
