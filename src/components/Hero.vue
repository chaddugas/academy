<template lang="pug">
	section.hero(style="background-image: url(media/hero.jpg)")
		canvas.hero-canvas
		.hero-inner
			.hero-logo
				h1.hero-title
					span Academy
					span 
						i.fa.fa-heartbeat
						| Park
					span Pediatrics
				h6.hero-tagline
					span A partner in your child's health.
			.hero-content
				.hero-content-inner
					.hero-item.hero-news(v-for="item in news", v-if="item.active")
						.hero-item-inner
							.item-icon
								i(:class="item.icon")
							p.item-title {{ item.title }}
							span.item-text {{ item.text }}
					.hero-item.hero-loc
						.hero-item-inner
							.item-icon
								i.far.fa-clock
							p.item-title Highlands Ranch
							span.item-text {{ hr_status }}
					.hero-item.hero-loc
						.hero-item-inner
							.item-icon
								i.far.fa-clock
							p.item-title Littleton
							span.item-text {{ lt_status }}
</template>

<script>
import Canvas from "@/mixins/Canvas";

export default {
  name: "Hero",
  mixins: [Canvas],
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
  computed: {
    hr_status() {
      return this.createStatusString(
        this.$static.office.edges[0].node.highlands.hours
      );
    },
    lt_status() {
      return this.createStatusString(
        this.$static.office.edges[0].node.lakewood.hours
      );
    },
    news() {
      return this.$static.news.edges[0].node.news;
    }
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

<static-query>
query {
  news: allNews {
    edges {
      node {
        news {
          active
          title
          text
          icon
        }
      }
    }
  },
  office: allOffice {
    edges {
      node {
        highlands {
          hours {
            title
            open
            close
          }
        }
        lakewood {
          hours {
            title
            open
            close
          }
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
$pull: 150px;
.hero {
  width: 100%;
  display: flex;
  position: relative;
  padding-bottom: #{$pull};
  margin-bottom: #{$pull * -1};
  z-index: 1;
  background-size: 0 0;
  align-items: center;
  @media (min-width: $lg) {
    padding-bottom: 0;
    min-height: calc(100vh);
  }
  &:before {
    content: "";
    background: $teal;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -5;
  }
  &:after {
    content: "";
    background-image: inherit;
    background-size: cover;
    background-position: bottom center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;
    opacity: 0.4;
  }
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
}

.hero-inner {
  @include container;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 30px 0;
  width: 100%;
  margin-top: 30px;
  &:after {
    position: absolute;
    z-index: -3;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: lighten($orange, 0%);
    @media (min-width: $lg) {
      width: 100vw;
      left: auto;
      content: "";
    }
  }
  @media (min-width: $sm) {
    padding: 30px 60px;
  }
  @media (min-width: $lg) {
    padding: 30px 0;
    flex-direction: row;
    justify-content: flex-end;
    height: 460px;
    margin-top: 0;
    padding: 0;
  }
}

.hero-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  position: relative;
  flex: 0 0 auto;
  color: $white;
  padding: 40px;
  @media (min-width: $sm) {
    padding: 60px;
  }
  @media (min-width: $lg) {
    padding: 80px;
    order: 1;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    z-index: -1;
    background: $indigo;
    @media (min-width: $lg) {
      background-clip: content-box;
      border: 30px solid transparent;
    }
  }
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-size: 38px;
  line-height: 1.3;
  text-transform: uppercase;
  @media (min-width: $sm) {
    font-size: 55px;
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  i {
    font-size: 35px;
    margin-right: 20px;
    color: $red;
    @media (min-width: $sm) {
      font-size: 50px;
    }
  }
}

.hero-tagline {
  font-size: 16px;
  margin-top: 10px;
  white-space: nowrap;
  @media (min-width: $sm) {
    font-size: 22px;
  }
}

.hero-content {
  position: relative;
  @media (min-width: $lg) {
    height: 100%;
    margin-left: 100px;
    margin-right: auto;
  }
}

.hero-content-inner {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hero-item {
  display: flex;
  align-items: center;
  padding: 0 40px;
  flex: 1 1 100%;
  min-height: 115px;
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