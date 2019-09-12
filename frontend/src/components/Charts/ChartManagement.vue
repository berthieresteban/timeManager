<template>
  <v-card :dark="darkMode">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-switch @change="handleDisplayedChange" v-model="displayed" label="Displayed" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-radio-group v-model="size" @change="handleSizeChange" label="Size">
              <v-radio v-for="n in availableSize" :key="n" :label="`${n}`" :value="n"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="2">
            <v-radio-group v-model="position" @change="handlePositionChange" label="Position">
              <v-radio v-for="n in availablePosition" :key="n" :label="`${n}`" :value="n"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="4" v-for="color in getChart.colors.length" :key="color">
            <v-color-picker
              label="Color"
              hide-inputs
              :dark="darkMode"
              v-model="colors[color - 1]"
              @input="value => handleColorsChange(value, colors, color - 1)"
            ></v-color-picker>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    chart: String,
    title: String
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    getChart() {
      return this.$store.state[this.chart];
    }
  },
  data() {
    return {
      position: null,
      size: null,
      displayed: null,
      colors: [],
      availableSize: [4, 6, 8, 12],
      availablePosition: [0, 1, 2, 3]
    };
  },
  methods: {
    handlePositionChange(value) {
      const params = {
        chart: this.chart,
        position: value
      };
      this.$emit("handlePositionChange", params);
    },
    handleColorsChange(value, colors, color) {
      const newColors = colors;
      newColors[color] = value;
      const params = {
        chart: this.chart,
        colors: newColors
      };
      this.$emit("handleColorsChange", params);
    },
    handleSizeChange(value) {
      const params = {
        chart: this.chart,
        size: value
      };
      this.$emit("handleSizeChange", params);
    },
    handleDisplayedChange(value) {
      const params = {
        chart: this.chart,
        displayed: value
      };
      this.$emit("handleDisplayedChange", params);
    }
  },
  created() {
    this.colors = this.getChart.colors;
    this.position = this.getChart.position;
    this.size = this.getChart.size;
    this.displayed = this.getChart.displayed;
  },
  watch: {
    getChart: {
      handler(value) {
        this.colors = this.getChart.colors;
        this.position = this.getChart.position;
        this.size = this.getChart.size;
        this.displayed = this.getChart.displayed;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
