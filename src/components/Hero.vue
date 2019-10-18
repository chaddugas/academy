<template lang="pug">
	section.hero(:style="transform")
		.hero-bg
			app-cell(v-for="item in 20", :key="item", :item="item")
		.hero-content
			app-logo
			app-item(v-for="item in offices", :type="'loc'", :item="item", :key="item.title")
			app-item(v-for="(item, i) in news", v-if="i < 3" :type="'news'", :item="item", :key="item.title")
			span.blank
			span.blank
			span.blank
</template>

<script>
import Parallax from "@/mixins/Parallax";
import Logo from "@/components/Logo";
import Cell from "@/components/Cell";
import Item from "@/components/Item";

export default {
  name: "Hero",
  mixins: [Parallax],
  components: {
    appLogo: Logo,
    appCell: Cell,
    appItem: Item
  },
  data() {
    return {
      media: null
    };
  },
  computed: {
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

<style lang="scss" scoped>
.hero {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1;
  height: auto;
  display: flex;
  flex-direction: column;
	height: 100vw;
	will-change: transform;
	max-width: 1300px;
	max-height: 1300px;
	margin: 0 auto;
  @media (min-width: $sm) {
		max-height: 1040px;
    height: 80vw;
  }
}

.hero-bg,
.hero-content {
  display: grid;
  grid-gap: 5px;
  z-index: 1;
  @media (min-width: $sm) {
    grid-gap: 10px;
  }
  @media (min-width: $lg) {
    margin: 0;
  }
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  grid-template: repeat(5, 1fr) / repeat(5, 1fr);
  @media (min-width: $sm) {
    grid-template: repeat(4, 1fr) / repeat(5, 1fr);
  }
}

.hero-content {
  height: 100%;
  grid-template: repeat(5, 1fr) / repeat(5, 1fr);
  grid-template-areas:
    "l l l . e"
    "l l l . ."
    "a a a . ."
    "d d d d ."
    "b b c c c";

  @media (min-width: $sm) {
    grid-template: repeat(4, 1fr) / repeat(5, 1fr);
    grid-template-areas:
      "l l l a a"
      "l l l . e"
      "f b b . ."
      "c c d d .";
  }
  @media (min-width: $lg) {
    grid-template-areas:
      "e . . . ."
      "l l . . ."
      "l l a . ."
      "d c f b .";
  }
}

.logo {
  position: relative;
  grid-area: l;
}

.item {
  position: relative;
  &:nth-of-type(1) {
    grid-area: a;
  }
  &:nth-of-type(2) {
    grid-area: b;
  }
  &:nth-of-type(3) {
    grid-area: c;
  }
  &:nth-of-type(4) {
    grid-area: d;
  }
}

.blank {
  z-index: -1;
  position: relative;
  &:nth-of-type(1) {
    grid-area: e;
  }
  &:nth-of-type(2) {
    grid-area: d;
  }
  &:nth-of-type(3) {
    grid-area: e;
    @media (min-width: $sm) {
      grid-area: f;
    }
  }
  &:after {
    background: $gray;
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
  }
}
</style>