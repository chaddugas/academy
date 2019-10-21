<template lang='pug'>
	.hero-cell(:class="{flipped}")
		.cell-flipper(v-if="active_cells.includes(item)", :style="{transitionDelay}")
			.cell-img(:style="{backgroundImage: bg_1}")
			.cell-img(:style="{backgroundImage: bg_2}")
</template>

<script>
export default {
  name: "HeroCell",
  props: ["item", "set", "next_set", "total", "active_cells"],
  data() {
    return {
      imageSet: this.set,
			flipped: true,
			bg_1: null,
			bg_2: null
    };
  },
  computed: {
    transitionDelay() {
      return `${(this.active_cells.indexOf(this.item)) * 0.075 * 1000}ms`
    }
  },
  methods: {
    image(set) {
      return `/media/hero-${set}/hero_${this.item
        .toString()
        .padStart(2, "0")}.jpg`;
		},
		set_background(both = true, pos) {
			if (both) {
				this.bg_1 = `url(${this.image(this.set)})`
				this.bg_2 = `url(${this.image(this.next_set)})`
			}
			else {
				if (pos == 'front') {
					this.bg_1 = `url(${this.image(this.next_set)})`
				}
				else if (pos == 'back') {
					this.bg_2 = `url(${this.image(this.next_set)})`
				}
			}
		}
	},
	watch: {
		set() {
			this.flipped = !this.flipped
			setTimeout(() => {
				if (this.flipped) {
					this.set_background(false, 'front')
				}
				else {
					this.set_background(false, 'back')
				}
			}, 5000)
		}
	},
	mounted() {
		this.set_background()
	}
};
</script>

<style lang='scss' scoped>
.hero-cell {
  position: relative;
	display: flex;
	perspective: 1000px;
	&.flipped .cell-flipper {
		transform: rotateY(180deg);
	}
  $r: 1;
  $c: 1;
  @for $n from 1 through 20 {
    @if $c > 5 {
      $c: 1;
      $r: $r + 1;
    }
    @if $r > 4 {
      $r: 1;
    }
    &:nth-child(#{$n}) {
      grid-row-start: #{$r};
      grid-row-end: #{$r + 1};
      grid-column-start: #{$c};
      grid-column-end: #{$c + 1};
    }
    $c: $c + 1;
  }
  @media (min-width: $sm) {
    $r: 1;
    $c: 1;
    @for $n from 1 through 20 {
      @if $c > 9 {
        $c: 1;
        $r: $r + 2;
      }
      @if $r > 7 {
        $r: 1;
      }
      &:nth-child(#{$n}) {
        grid-row-start: #{$r};
        grid-row-end: #{$r + 1};
        grid-column-start: #{$c};
        grid-column-end: #{$c + 1};
      }
      $c: $c + 2;
    }
  }
}

.cell-flipper {
  transition: transform 0.8s ease;
	transform-style: preserve-3d;
	height: 100%;
	width: 100%;
	position: relative;
}

.cell-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	background-size: cover;
	background-position: 50% 50%;
  backface-visibility: hidden;
  &:nth-child(2) {
		transform: rotateY(180deg);
  }
}

.cell-prerender {
  position: absolute;
  top: -100vh;
  left: -100vw;
  height: 1px;
  width: 1px;
  opacity: 0;
}
</style>