<template lang="pug">
	.hero-item(v-if="type == 'loc' || item.active", :class="`.hero-${type}`")
		.hero-item-inner
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
      let timeArray = JSON.parse(JSON.stringify(data))
      let weekday = this.days[this.now.getDay()]
      let today, todayIndex

      timeArray = timeArray.map((item, i) => {
        item.open = item.open.split(/ |\:/)
        item.open[0] = parseInt(item.open[0])
        item.open[1] = parseInt(item.open[1])
        item.close = item.close.split(/ |\:/)
        item.close[0] = parseInt(item.close[0])
        item.close[1] = parseInt(item.close[1])
        if (item.open[2].toLowerCase() == "pm")
          item.open[0] = item.open[0] + 12
        if (item.close[2].toLowerCase() == "pm")
          item.close[0] = item.close[0] + 12
        if (weekday == item.title) (today = item), (todayIndex = i)
        return item
      })

      if (!today) return "Closed today"

      if (
        this.now.getTime() <
        new Date().setHours(today.open[0], today.open[1], 0)
      ) {
        return `Opens today at ${data[todayIndex].open}`
      }
      if (
        this.now.getTime() <
        new Date().setHours(today.close[0], today.close[1], 0)
      ) {
        return `Open today until ${data[todayIndex].close}`
      }
      return "Closed for the day"
    }
  },
  created() {
    setInterval(() => {
      this.now = new Date()
    }, 30000)
  }
}
</script>

<style lang="scss">
.hero-item {
  display: flex;
  align-items: center;
  padding: 0 40px;
  flex: 1 1 100%;
  min-height: 105px;
  @for $n from 0 to 10 {
    $perc: $n * 5%;
    &:nth-child(#{$n + 1}) {
      background: rgba(darken($white, $perc), 0.75);
    }
  }
}

.hero-item-inner {
  display: grid;
  grid-gap: 0 20px;
  grid-template: repeat(2, max-content) / auto 1fr;
}

.item-icon {
  grid-area: 1 / 1 / 3 / 2;
  display: flex;
  justify-content: center;
  width: 50px;
  align-items: center;
  @media (min-width: $lg) {
    grid-area: 1 / 1 / 3 / 2;
  }
  i {
    font-size: 50px;
    color: $teal;
  }
}

.item-title {
  color: $onyx;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
  grid-area: 1 / 2 / 2 / 3;
  @media (min-width: $lg) {
    grid-area: 1 / 2 / 2 / 3;
  }
}

.item-text {
  color: $onyx;
  grid-area: 2 / 2 / 3 / 3;
  @media (min-width: $lg) {
    grid-area: 2 / 2 / 3 / 3;
  }
  span {
    &:before {
      content: " ";
    }
  }
}
</style>