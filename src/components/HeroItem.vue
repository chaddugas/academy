<template lang="pug">
	aside.grid-tile.grid-item(v-if="type == 'loc' || item.active", :class="`hero-${type}`")
		.item-inner
			.item-icon
				i(:class="item.icon")
			p.item-title {{ item.title }}
			span.item-text(v-if="type == 'news'") {{ item.text }}
			span.item-text(v-else) {{ createStatusString(item.hours) }}
</template>

<script>
export default {
  name: "HeroItem",
  props: ["item", "type"],
  data() {
    return {
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      now: new Date()
    };
  },
  methods: {
    createStatusString(data) {
      let timeArray = JSON.parse(JSON.stringify(data));
      let weekday = this.days[this.now.getDay()];
      let today, todayIndex;

      timeArray = timeArray.map((item, i) => {
        item.open = item.open.split(/ |\:/);
        item.open[0] = parseInt(item.open[0]);
        item.open[1] = parseInt(item.open[1]);
        item.close = item.close.split(/ |\:/);
        item.close[0] = parseInt(item.close[0]);
        item.close[1] = parseInt(item.close[1]);
        if (item.open[2].toLowerCase() == "pm")
          item.open[0] = item.open[0] + 12;
        if (item.close[2].toLowerCase() == "pm")
          item.close[0] = item.close[0] + 12;
        if (weekday == item.title) (today = item), (todayIndex = i);
        return item;
      });

      if (!today) return "Closed today";

      if (
        this.now.getTime() <
        new Date().setHours(today.open[0], today.open[1], 0)
      ) {
        return `Opens today at ${data[todayIndex].open}`;
      }
      if (
        this.now.getTime() <
        new Date().setHours(today.close[0], today.close[1], 0)
      ) {
        return `Open today until ${data[todayIndex].close}`;
      }
      return "Closed for the day";
    }
  },
  created() {
    setInterval(() => {
      this.now = new Date();
    }, 30000);
  }
};
</script>

<style lang="scss">
.grid-tile.grid-item {
  background: $teal;
  display: flex;
  align-items: center;
  z-index: 1;
  @media (min-width: $lg) {
    justify-content: flex-end;
  }
}

.item-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: $white;
  padding-left: 60px;
  @media (min-width: $lg) {
    padding-left: 0;
    text-align: right;
    align-items: flex-end;
  }
}

.item-icon {
  position: absolute;
  left: 30px;
  font-size: 50px;
  z-index: -1;
  opacity: 0.1;
  width: 50px;
  display: flex;
  justify-items: center;
	align-items: center;
  i {
    margin: 0 auto;
  }
  @media (min-width: $lg) {
		top: 20px;
		left: 20px;
		width: 60px;
    font-size: 60px;
  }
}

.item-title {
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 5px;
  @media (min-width: $lg) {
    font-size: 22px;
  }
}

.item-text {
}
</style>