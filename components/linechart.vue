<script>
import { Line } from "vue-chartjs";

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
    },
    bordercolor: {
      type: String,
      default: ""
    },
    pointcolor: {
      type: String,
      default: ""
    }
  },
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: this.dataLabels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: this.bgcolor,
            borderColor: this.bordercolor,
            pointBackgroundColor: this.pointcolor
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
      }
    );
  }
};
</script>