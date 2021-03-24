

<script>
import { Bar } from "vue-chartjs";
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    dataLabels: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    },
    bgcolor: {
      type: String,
      default: ""
    }
  },
  
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: this.dataLabels,
        datasets: [
          {
            label: this.label,
            backgroundColor: this.bgcolor,
            width: "600",
            height: "500",
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
