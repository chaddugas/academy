<template lang="pug">
	section.hero(:style="p_transform")
		.hero-bg
			app-hero-cell(
				v-for="item in 20",
				:key="item", 
				:item="item", 
				:flipped="flipped",
				:set="set",
				:next_set="next_set",
				:active_cells="active_cells",
				:total="total")
		.hero-content
			app-hero-logo
			app-hero-item(v-for="item in offices", :type="'loc'", :item="item", :key="item.title")
			app-hero-item(v-for="(item, i) in news", v-if="i < 3" :type="'news'", :item="item", :key="item.title")
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
      total: 7,
      sets: [],
      set: null,
      next_set: null,
      flipped: false,
      active_count: 0,
      mediaSm: process.isClient
        ? window.matchMedia("(min-width: 650px)")
        : null,
      mediaLg: process.isClient
        ? window.matchMedia("(min-width: 1100px)")
        : null
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
    },
    active_cells() {
      if (this.media == "xs") {
        let arr = [4, 5, 9, 10];
        if (this.news.filter(n=>n.active).length == 0) {
          arr.push(11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
        }
        else if (this.news.filter(n=>n.active).length == 1) {
          arr.push(14, 15, 16, 17, 18, 19, 20);
				}
				else if (this.news.filter(n=>n.active).length == 2) {
          arr.push(14, 15, 20);
				}
        return arr
      }
      if (this.media == "sm") {
        let arr = [3, 4, 5, 8, 9, 10];
        if (this.news.filter(n=>n.active).length == 0) {
          arr.push(11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
        }
        else if (this.news.filter(n=>n.active).length == 1) {
          arr.push(13, 14, 15, 16, 17, 18, 19, 20);
				}
				else if (this.news.filter(n=>n.active).length == 2) {
          arr.push(13, 14, 15, 18, 19, 20);
				}
        return arr
      }
      if (this.media == "lg") {
        let arr = [2, 3, 4, 5, 8, 9, 10];
        if (this.news.filter(n=>n.active).length == 0) {
          arr.push(13, 14, 15, 19, 20);
        }
        else if (this.news.filter(n=>n.active).length == 1) {
          arr.push(14, 15, 19, 20);
				}
				else if (this.news.filter(n=>n.active).length == 2) {
					arr.push(14, 15, 20);
				}
        return arr
      }
      return [];
    }
  },
  methods: {
    activate() {
			this.flipped = !this.flipped;
    },
    rotate() {
      let set = this.next_set;
      let next_set;

      if (!this.sets.length) {
        this.sets = Array.apply(null, Array(this.total)).map((x, i) => i + 1);
      }
      next_set = this.sets[Math.floor(Math.random() * this.sets.length)];
      this.sets.splice(this.sets.indexOf(next_set), 1);
      this.next_set = next_set;

      if (!this.set) {
        this.set = next_set;
        next_set = this.sets[Math.floor(Math.random() * this.sets.length)];
        this.sets.splice(this.sets.indexOf(next_set), 1);
        this.next_set = next_set;
      } else {
        this.set = set;
      }
    },
    checkMedia() {
      if (this.mediaLg.matches) {
        this.media = "lg";
      } else if (this.mediaSm.matches) {
        this.media = "sm";
      } else {
        this.media = "xs";
      }
    }
  },
  created() {
    this.rotate();
    setInterval(() => {
      this.rotate();
      this.flipped = !this.flipped;
    }, 8000);
    if (process.isClient) {
      this.checkMedia();
    }
  },
  mounted() {
    if (process.isClient) this.mediaLg.addListener(this.checkMedia);
    if (process.isClient) this.mediaSm.addListener(this.checkMedia);
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
  max-width: 1200px;
  max-height: 1200px;
  margin: 0 auto;
  @media (min-width: $sm) {
    max-height: 960px;
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
  pointer-events: none;
  @media (min-width: $sm) {
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-rows: 1fr 5px 1fr 5px 1fr 5px 1fr;
    grid-template-columns: 1fr 5px 1fr 5px 1fr 5px 1fr 5px 1fr;
  }
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-content {
  grid-template-areas:
    "l l l . ."
    "l l l . ."
    "c c c . ."
    "d d d d ."
    "a a a b b";

  @media (min-width: $sm) {
    grid-template-areas:
      "l l l . . . . . ."
      ". . . . . . . . ."
      "a . b . . . . . ."
      ". . . . . . . . ."
      "c c c . . . . . ."
      ". . . . . . . . ."
      "d d d . . . . . .";
  }
  @media (min-width: $lg) {
    grid-template-areas:
      ". . . . . . . . ."
      ". . . . . . . . ."
      "l l l . . . . . ."
      "l l l . . . . . ."
      "l l l . c . . . ."
      ". . . . . . . . ."
      "a . b . . . d . .";
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
</style>