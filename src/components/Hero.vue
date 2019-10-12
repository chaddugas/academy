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
					span {{ site.title }}
			.hero-content
				.hero-content-inner
					.hero-item.hero-news(v-for="item in site.news", v-if="item.active")
						.item-icon
							i(:class="item.icon")
						p.item-title {{ item.title }}
						span.item-text {{ item.text }}
					.hero-item.hero-loc
						.item-icon
							i.far.fa-clock
						p.item-title Highlands Ranch
						span.item-text
							| Open today until
							span 4:00 pm
					.hero-item.hero-loc
						.item-icon
							i.far.fa-clock
						p.item-title Littleton
						span.item-text
							| Open today until
							span 4:00 pm
</template>

<static-query>
query Site {
  site: allSite {
    edges {
      node {
        title
        news {
          active
          title
          text
          icon
        }
      }
    }
  }
}
</static-query>

<script>
import Canvas from "@/mixins/Canvas";

export default {
  name: "Hero",
  mixins: [Canvas],
  computed: {
		site() {
			return this.$static.site.edges[0].node
		}
	}
};
</script>

<style lang="scss" scoped>
$pull: 150px;
.hero {
  min-height: calc(100vh + #{$pull});
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-bottom: #{$pull * -1};
  background-image: $grad;
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
  width: 80vw;
  min-width: 1200px;
}

.hero-logo {
  margin: 100px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  align-self: center;
  position: relative;
  flex: 0 0 auto;
  color: $white;
  top: #{$pull * -1};
  background: rgba($indigo, 0.5);
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 30px solid rgba($orange, 1);
    content: "";
  }
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

.hero-title {
  display: flex;
  flex-direction: column;
  font-size: 55px;
  line-height: 1.3;
  text-transform: uppercase;
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  i {
    font-size: 50px;
    margin-right: 20px;
    color: $red;
  }
}

.hero-tagline {
  font-size: 22px;
  margin-top: 10px;
  white-space: nowrap;
}

.hero-content {
  flex: 1 1 100%;
  height: 100%;
  position: relative;
}

.hero-content-inner {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  right: 0;
}

.hero-item {
  color: $white;
  padding: 40px 20px 40px 30px;
  display: grid;
  grid-template: repeat(2, auto) / 1fr auto;
  border-right: none;
  margin-right: 0;
  border-top: 1px solid transparent;
  border-bottom: 1px solid rgba($white, 0.25);
  max-width: 320px;
  text-align: right;
  grid-gap: 0 20px;
  &:first-child {
    margin-top: auto;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: $pull * 1.5;
    margin-bottom: auto;
  }
}

.item-icon {
  grid-area: 1 / 2 / 3 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 50px;
  }
}

.item-title {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
  grid-area: 1 / 1 / 2 / 2;
}

.item-text {
  grid-area: 2 / 1 / 3 / 2;
  span {
    &:before {
      content: " ";
    }
  }
}
</style>