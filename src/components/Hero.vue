<template lang="pug">
	section.hero
		.hero-bg(:style="parallax")
		canvas.hero-canvas
		.hero-inner
			app-logo
			.hero-content
				.hero-items
					app-hero-item(v-for="item in news", :type="'news'", :item="item", :key="item.title")
					app-hero-item(v-for="item in offices", :type="'loc'", :item="item", :key="item.title")
</template>

<script>
import Canvas from "@/mixins/Canvas";
import Parallax from "@/mixins/Parallax";
import Logo from "@/components/Logo";
import HeroItem from "@/components/HeroItem";
import HeroImage from "@/assets/images/hero.jpg"

export default {
  name: "Hero",
  mixins: [Canvas, Parallax],
  components: {
    appLogo: Logo,
    appHeroItem: HeroItem
  },
  computed: {
		parallax() {
			return {
				backgroundImage: `url(${HeroImage})`,
				...this.transform
			}
		},
    offices() {
      return [
        {
          title: this.$static.office.edges[0].node.highlands.title,
          hours: this.$static.office.edges[0].node.highlands.hours,
          icon: "far fa-clock"
        },
        {
          title: this.$static.office.edges[0].node.lakewood.title,
          hours: this.$static.office.edges[0].node.lakewood.hours,
          icon: "far fa-clock"
        }
      ];
    },
    news() {
      return this.$static.news.edges[0].node.news;
    }
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
					title
					phone
          hours {
            title
            open
            close
          }
        }
        lakewood {
					title
					phone
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
	--parallax: 500px;
  width: 100%;
  display: flex;
  position: relative;
  padding-bottom: #{$pull};
  margin-bottom: #{$pull * -1};
  z-index: 1;
  align-items: center;
	overflow: hidden;
  @media (min-width: $lg) {
    padding-bottom: 0;
    min-height: calc(100vh + #{$pull});
    height: auto;
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
}

.hero-bg {
  position: absolute;
  top: calc(var(--parallax) * -1);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
	height: calc(100% + var(--parallax));
	width: 100%;
	background-size: cover;
	background-position: bottom center;
  opacity: 0.4;
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
  @include container($max: 1200px);
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
    padding: 0;
    flex-direction: row;
    justify-content: flex-end;
    height: 460px;
    top: #{$pull * -1};
    margin-top: #{$pull + 30};
  }
}

.hero-content {
  position: relative;
  @media (min-width: $lg) {
    height: 100%;
    margin-right: auto;
  }
}

.hero-items {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>