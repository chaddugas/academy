<template lang='pug'>
	.hero-cell(:class="{flipped}")
		.cell-flipper(
			:style="{transitionDelay}",
			@transitionend="load(false)")
			.cell-img(v-show="active_cells.includes(item)", :style="{transitionDelay: `${transitionDelay}, ${transitionDelay}`, backgroundImage: bg_front}")
			.cell-img(v-show="active_cells.includes(item)", :style="{transitionDelay: `${transitionDelay}, ${transitionDelay}`, backgroundImage: bg_back}")
		img.cell-prerender(
			v-show="active_cells.includes(item)",
			@load.once="load(true)",
			:src="image(set)")
</template>

<script>
export default {
  name: "HeroCell",
  props: ["item", "set", "next_set", "total", "active_cells", "flipped"],
  data() {
    return {
      imageSet: this.set,
      bg_front: null,
      bg_back: null
    };
  },
  computed: {
    transitionDelay() {
      if (this.active_cells.indexOf(this.item)) {
        return `${this.active_cells.indexOf(this.item) * 0.05 * 1000}ms`;
      }
      return "0ms";
    }
  },
  methods: {
    image(set) {
      return `/media/hero-${set}/hero_${this.item
        .toString()
        .padStart(2, "0")}.jpg`;
    },
    set_background() {
      if (this.flipped) {
        this.bg_front = `url(${this.image(this.next_set)})`;
      } else {
        this.bg_back = `url(${this.image(this.next_set)})`;
      }
    },
    load(initial = false) {
      if (initial) {
				this.bg_back = `url(${this.image(this.set)})`;
				setTimeout(() => {
					this.$emit('ready')
				}, 500)
        return;
      }
      this.set_background();
    }
  }
};
</script>

<style lang='scss' scoped>
.hero-cell {
  position: relative;
  display: flex;
  perspective: 1000px;
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
  transform-style: preserve-3d;
  height: 100%;
  width: 100%;
  position: relative;
  .flipped & {
    .cell-img {
      &:nth-child(1) {
        opacity: 0;
        transform: translateZ(1px) rotateY(180deg);
      }
      &:nth-child(2) {
        opacity: 1;
        transform: translateZ(1px) rotateY(0deg);
      }
    }
  }
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
  perspective: 1px;
  transition: opacity 400ms ease, transform 0.8s ease;
  transform: translateZ(1px) rotateY(0deg);
  outline: 1px solid transparent;
  opacity: 1;
  transform-style: preserve-3d;
  &:nth-child(2) {
    transform: translateZ(1px) rotateY(-180deg);
    opacity: 0;
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