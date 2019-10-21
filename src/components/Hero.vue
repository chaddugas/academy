<template lang="pug">
	section.hero(:style="p_transform")
		.hero-bg
			app-hero-cell(
				v-for="item in 20", 
				:key="item", 
				:item="item", 
				:set="set",
				:total="total")
		.hero-content
			app-hero-logo
			app-hero-item(v-for="item in offices", :type="'loc'", :item="item", :key="item.title")
			app-hero-item(v-for="(item, i) in news", v-if="i < 3" :type="'news'", :item="item", :key="item.title")
			span.blank
			span.blank
</template>

<script>
import Parallax from "@/mixins/Parallax";
import HeroLogo from "@/components/HeroLogo";
import HeroCell from "@/components/HeroCell";
import HeroItem from "@/components/HeroItem";

export default {
  name: "Hero",
  mixins: [Parallax],
  components: {
    appHeroLogo: HeroLogo,
    appHeroCell: HeroCell,
    appHeroItem: HeroItem
  },
  data() {
    return {
      media: null,
      total: 8,
      sets: [],
      set: null
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
  methods: {
    rotate() {
      let next;
      if (!this.sets.length) {
        this.sets = Array.apply(null, Array(this.total)).map((x, i) => i + 1);
      }
      next = this.sets[Math.floor(Math.random() * this.sets.length)];
      this.set = next;
      this.sets.splice(this.sets.indexOf(next), 1);
    }
  },
  created() {
    this.rotate();
    setInterval(() => {
      this.rotate();
    }, 12000);
    if (process.isClient) {
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
					note
          hours {
            title
            open
            close
						lunch
          }
        }
        lakewood {
					title
					phone
					note
          hours {
            title
            open
            close
						lunch
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
  max-width: 1190px;
  max-height: 1190px;
  margin: 0 auto;
  @media (min-width: $sm) {
    max-height: 952px;
    height: 80vw;
  }
}

.hero-bg,
.hero-content {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
  z-index: 1;
  height: 100%;
  grid-column-gap: 3px;
  grid-row-gap: 3px;
  @media (min-width: $sm) {
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-rows: 1fr 5px 1fr 5px 1fr 5px 1fr;
    grid-template-columns: 1fr 5px 1fr 5px 1fr 5px 1fr 5px 1fr;
  }
}

.hero-bg {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-content {
  grid-template-areas:
    "l l l . e"
    "l l l . ."
    "a a . . ."
    "c c c c ."
    "d d d b b";

  @media (min-width: $sm) {
    grid-template-areas:
      "l l l . . . . . ."
      "l l l . . . . . ."
      "l l l . . . . . ."
      ". . . . . . . . ."
      "a . b . . . . . ."
      ". . . . . . . . ."
      "c c c . d d d . .";
  }
  @media (min-width: $lg) {
    grid-template-areas:
      "e . . . . . . . ."
      ". . . . . . . . ."
      "l l l . . . . . ."
      "l l l . . . . . ."
      "l l l . a . . . ."
      ". . . . . . . . ."
      "c . d . f . b . .";
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
  display: none;
  &:nth-of-type(1) {
    grid-area: e;
  }
  &:nth-of-type(2) {
    grid-area: f;
  }
  @media (min-width: $lg) {
    display: block;
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