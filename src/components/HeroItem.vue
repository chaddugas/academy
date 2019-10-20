<template lang="pug">
	aside.item(
		v-if="type == 'loc' || item.active", :class="`item--${type}`")
		.item-inner
			.item-grid
				.item-icon
					i(:class="item.icon")
				h6.item-title {{ item.title }}
				span.item-text(v-if="type == 'news'") {{ item.text }}
				span.item-text(v-else, :data-note="item.note") {{ createStatusString(item.hours) }}
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
        return `Opens at ${data[todayIndex].open
          .replace(" am", "")
          .replace(" pm", "")}`;
      }
      if (
        this.now.getTime() <
        new Date().setHours(today.close[0], today.close[1], 0)
      ) {
        return `Open until ${data[todayIndex].close
          .replace(" am", "")
          .replace(" pm", "")}`;
      }
      return "Closed now";
    }
  },
  created() {
    setInterval(() => {
      this.now = new Date();
    }, 30000);
  }
};
</script>

<style lang="scss", scoped>
.item {
  background: saturate($teal, 10%);
  color: $white;
  margin: 0 2.5px;
  margin-bottom: 5px;
  @media (min-width: $sm) {
    margin: 0 5px;
    margin-bottom: 10px;
  }
  &--loc {
    background: $orange;
		color: $onyx;
		.item-text {
			&::after {
				content: attr(data-note);
				font-size: 12px;
				margin-top: 3px;
				font-style: italic;
			}
		}
  }
}

.item-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (min-width: $md) {
    padding: 20px;
  }
}

.item-grid {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  line-height: 1.1;
  @supports (grid-gap: 10px) {
    display: grid;
    grid-template: repeat(2, min-content) / 1fr 20px;
    grid-gap: 3px 0;
  }
  @media (min-width: $md) {
    line-height: 1.4;
    grid-template: repeat(2, min-content) / 1fr 25px;
    grid-gap: 5px 10px;
  }
}

.item-icon {
  display: none;
  @supports (grid-gap: 10px) {
    @media (min-width: $md) {
      display: block;
      grid-area: 1 / 2 / 2 / 3;
      font-size: 24px;
    }
  }
}

.item-title {
  font-weight: 700;
  grid-area: 1 / 1 / 2 / 3;
  font-size: 15px;
  @supports (grid-gap: 10px) {
    @media (min-width: $md) {
      grid-area: 1 / 1 / 2 / 2;
      align-self: center;
      font-size: 18px;
    }
  }
}

.item-text {
  grid-area: 2 / 1 / 3 / 3;
	font-size: 14px;
	display: flex;
	flex-direction: column;
  @media (min-width: $md) {
    font-size: 16px;
  }
}
</style>