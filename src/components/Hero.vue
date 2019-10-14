<template lang="pug">
	section.hero
		canvas.hero-canvas
		.hero-inner
			.hero-logo
				h1.hero-title
					span Academy
					span 
						i.fa.fa-heartbeat
						| Park
					span Pediatrics
				p.hero-tagline
					span A partner in your child's health.
			.hero-content
				.hero-content-inner
					.hero-item.hero-news(v-for="item in news", v-if="item.active")
						.item-icon
							i(:class="item.icon")
						p.item-title {{ item.title }}
						span.item-text {{ item.text }}
					.hero-item.hero-loc
						.item-icon
							i.far.fa-clock
						p.item-title Highlands Ranch
						span.item-text {{ hr_status }}
					.hero-item.hero-loc
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
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			now: new Date()
		}
	},
  computed: {
		hr_status() {
			return this.createStatusString(this.$static.office.edges[0].node.highlands.hours)
		},
		lt_status() {
			return this.createStatusString(this.$static.office.edges[0].node.lakewood.hours)
		},
    news() {
      return this.$static.news.edges[0].node.news;
		},
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
				if (item.open[2].toLowerCase() == 'pm') item.open[0] = item.open[0] + 12
				if (item.close[2].toLowerCase() == 'pm') item.close[0] = item.close[0] + 12
				if (weekday == item.title) (today = item, todayIndex = i)
				return item
			})

			if (!today) return 'Closed today'

			if (this.now.getTime() < (new Date()).setHours(today.open[0], today.open[1],0)) {
				return `Opens today at ${data[todayIndex].open}`
			}
			if (this.now.getTime() < (new Date()).setHours(today.close[0], today.close[1],0)) {
				return `Open today until ${data[todayIndex].close}`
			}
			return 'Closed for the day'
		}
	},
	created() {
		setInterval(() => {
			this.now = new Date()
		}, 30000)
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
  justify-content: flex-end;
  position: relative;
  padding-bottom: #{$pull};
  margin-bottom: #{$pull * -1};
  background-image: $grad;
  @media (min-width: $lg) {
    padding-bottom: 0;
    min-height: calc(100vh + #{$pull});
  }
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-inner {
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-direction: column;
  @media (min-width: $lg) {
    flex-direction: row;
    width: 80vw;
    min-width: 1200px;
  }
}

.hero-logo {
  margin: 50px 20px 30px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  align-self: center;
  position: relative;
  flex: 0 0 auto;
  color: $white;
  background: rgba($indigo, 0.5);

  @media (min-width: $sm) {
    margin: 50px auto;
    padding: 80px;
  }

  @media (min-width: $lg) {
    top: #{$pull * -1};
    margin: 100px;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 15px solid rgba($orange, 1);
    content: "";
    @media (min-width: $sm) {
      border: 30px solid rgba($orange, 1);
    }
  }
  @media (min-width: $sm) {
    &:after {
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      width: 100vw;
      background: $orange;
      content: "";
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
    flex: 1 1 100%;
    height: 100%;
  }
}

.hero-content-inner {
  display: flex;
  flex-flow: row wrap;
  @media (min-width: $lg) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    right: 0;
    overflow-y: auto;
    flex-flow: column nowrap;
  }
}

.hero-item {
  color: $white;
  display: grid;
  padding: 30px 20px;
  grid-template: repeat(2, max-content) / auto 1fr;
  border-right: none;
  // margin-right: 0;
  border-top: 1px solid transparent;
  border-bottom: 1px solid rgba($white, 0.25);
  grid-gap: 0 20px;
  flex: 0 0 100%;
  min-width: 100%;
  &:last-child {
    border-bottom: none;
  }
  @media (min-width: $sm) {
    flex: 0 0 50%;
    min-width: 50%;
    &:nth-last-child(2):nth-child(odd) {
      border-bottom: none;
    }
  }
  @media (min-width: $lg) {
    grid-template: repeat(2, max-content) / 1fr auto;
    flex: 0 1 auto;
    max-width: 320px;
    text-align: right;
    padding: 40px 20px 40px 30px;
    min-width: none;
    &:first-child {
      margin-top: auto;
    }
    &:nth-last-child(2):nth-child(odd) {
      border-bottom: 1px solid rgba($white, 0.25);
    }
    &:last-child {
      border-bottom: none;
      padding-bottom: $pull * 1.5;
      margin-bottom: auto;
    }
  }
}

.item-icon {
  grid-area: 1 / 1 / 3 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: $lg) {
    grid-area: 1 / 2 / 3 / 3;
  }
  i {
    font-size: 50px;
  }
}

.item-title {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
  grid-area: 1 / 2 / 2 / 3;
  @media (min-width: $lg) {
    grid-area: 1 / 1 / 2 / 2;
  }
}

.item-text {
  grid-area: 2 / 2 / 3 / 3;
  @media (min-width: $lg) {
    grid-area: 2 / 1 / 3 / 2;
  }
  span {
    &:before {
      content: " ";
    }
  }
}
</style>