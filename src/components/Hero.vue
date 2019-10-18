<template lang="pug">
	section.hero
		.hero-grid(:style="bg")
			- var n = 0
			while n < 3
				div.grid-tile
				- n++
			app-logo
			app-hero-item(v-for="item in offices", :type="'loc'", :item="item", :key="item.title", v-if="media == 'lg'")
			app-hero-item(v-for="(item, i) in news", :type="'news'", :item="item", :key="item.title", v-if="media == 'lg'")
		.hero-content(v-if="media == 'sm'", :style="transform")
			app-hero-item(v-for="item in offices", :type="'loc'", :item="item", :key="item.title")
			app-hero-item(v-for="(item, i) in news", :type="'news'", :item="item", :key="item.title")
</template>

<script>
import Parallax from "@/mixins/Parallax";
import Logo from "@/components/Logo";
import HeroItem from "@/components/HeroItem";
import HeroImage from "@/assets/images/hero.jpg";

export default {
  name: "Hero",
  mixins: [Parallax],
  components: {
    appLogo: Logo,
    appHeroItem: HeroItem
  },
  data() {
    return {
      media: null
    };
  },
  computed: {
    bg() {
      return {
        backgroundImage: `linear-gradient(#4389A2, #4389A2), url(${HeroImage})`,
        ...this.transform
      };
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
  },
  created() {
    let media = window.matchMedia("(min-width: 1100px)");
    let swap = e => {
      if (e.matches) {
        this.media = "lg";
      } else {
        this.media = "sm";
      }
    };
    swap(media);
    media.addListener(swap);
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

<style lang="scss">
.hero {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1;
  height: auto;
  display: flex;
  flex-direction: column;
}

$gap: 10px;
$h_divisions: 5;
$h_perc: 100% / $h_divisions;
$h_adjust: $gap/$h_divisions;
$v_divisions: 4;
$v_perc: 100% / $v_divisions;
$v_adjust: $gap/$v_divisions;
$background: $gray;
.hero-grid {
  z-index: 1;
  width: 100%;
  min-height: 80vw;
  background-color: transparent;
  background-position: bottom right, bottom right;
  background-size: 100% auto, 100% auto;
  background-repeat: no-repeat, no-repeat;
  background-blend-mode: screen;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
        to left,
        transparent,
        transparent calc(#{$h_perc} + #{$h_adjust} - #{$gap}),
        $background calc(#{$h_perc} + #{$h_adjust} - #{$gap}),
        $background calc(#{$h_perc} + #{$h_adjust})
      ),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent calc(#{$v_perc} + #{$v_adjust} - #{$gap}),
        $background calc(#{$v_perc} + #{$v_adjust} - #{$gap}),
        $background calc(#{$v_perc} + #{$v_adjust})
      );
    background-repeat: repeat-x, repeat-y;
    background-position: 80% 0;
  }
}

div.grid-tile {
  position: absolute;
  background: $background;
  height: calc(#{$v_perc} + #{$v_adjust});
  width: calc(#{$h_perc} + #{$h_adjust});
	&:nth-of-type(1) {
		top: calc(#{$v_perc * 2} + #{$v_adjust * 2} - #{$gap});
		right: calc(#{$h_perc * 4} + #{$h_adjust * 4} - #{$gap});
	}
	&:nth-of-type(2) {
		top: calc(#{$v_perc * 1} + #{$v_adjust * 1} - #{$gap});
		right: 0;
	}
	&:nth-of-type(3) {
		top: calc(#{$v_perc * 3} + #{$v_adjust * 3} - #{$gap});
		right: calc(#{$h_perc * 1} + #{$h_adjust * 1} - #{$gap});
	}
  @media (min-width: $lg) {
    &:nth-of-type(1) {
      top: 0;
      right: calc(#{$h_perc * 4} + #{$h_adjust * 4} - #{$gap});
    }
    &:nth-of-type(2) {
      top: calc(#{$v_perc * 3} + #{$v_adjust * 3} - #{$gap});
      right: calc(#{$h_perc * 2} + #{$h_adjust * 2} - #{$gap});
    }
    &:nth-of-type(3) {
      top: calc(#{$v_perc * 3} + #{$v_adjust * 3} - #{$gap});
      right: calc(#{$h_perc * 3} + #{$h_adjust * 3} - #{$gap});
    }
  }
}

.grid-tile.grid-logo {
  position: absolute;
  height: calc(#{$v_perc * 2} + #{$v_adjust * 2} - #{$gap});
  width: calc(#{$h_perc * 3} + #{$h_adjust * 3});
  top: 0;
  right: calc(#{$h_perc * 2} + #{$h_adjust * 2} - #{$gap});
  padding: 30px 30px 20px 20px;
  border-right: 10px solid $background;
  z-index: 2;
  @media (min-width: $lg) {
    border-top: 10px solid $background;
    height: calc(#{$v_perc * 2} + #{$v_adjust * 2});
    width: calc(#{$h_perc * 2} + #{$h_adjust * 2});
    top: calc(#{$v_perc * 1} + #{$v_adjust * 1} - #{$gap});
    right: calc(#{$h_perc * 3} + #{$h_adjust * 3} - #{$gap});
  }
}

.hero-content {
  display: flex;
  flex-flow: row wrap;
  .grid-tile.grid-item {
    position: relative;
    flex: 0 0 100%;
    padding: 20px 30px;
    border-top: 10px solid $background;
    @media (min-width: $sm) {
      flex: 0 0 50%;
      &:nth-child(even) {
        border-left: 5px solid $background;
      }
      &:nth-child(odd) {
        border-right: 5px solid $background;
      }
    }
  }
}

.grid-tile.grid-item {
  @media (min-width: $lg) {
    position: absolute;
    padding: 30px 30px 20px 20px;
    border-right: 10px solid $background;
    border-top: 10px solid $background;
    height: calc(#{$v_perc * 1} + #{$v_adjust * 1});
    width: calc(#{$h_perc * 1} + #{$h_adjust * 1});
    &:nth-of-type(1) {
      top: calc(#{$v_perc * 2} + #{$v_adjust * 2} - #{$gap});
      right: calc(#{$h_perc * 2} + #{$h_adjust * 2} - #{$gap});
    }
    &:nth-of-type(2) {
      top: calc(#{$v_perc * 3} + #{$v_adjust * 3} - #{$gap});
      right: calc(#{$h_perc * 1} + #{$h_adjust * 1} - #{$gap});
    }
    &:nth-of-type(3) {
      top: calc(#{$v_perc * 3} + #{$v_adjust * 3} - #{$gap});
      right: calc(#{$h_perc * 3} + #{$h_adjust * 3} - #{$gap});
    }
    &:nth-of-type(4) {
      top: calc(#{$v_perc * 3} + #{$v_adjust * 3} - #{$gap});
      right: calc(#{$h_perc * 4} + #{$h_adjust * 4} - #{$gap});
    }
  }
}
</style>