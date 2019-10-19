<template lang='pug'>
	.hero-cell(:style="bg") 
</template>

<script>
export default {
  name: "HeroCell",
  props: ["item"],
  computed: {
    bg() {
      return {
        backgroundImage: `url(/media/hero/hero_${this.item
          .toString()
          .padStart(2, "0")}.jpg)`
      };
    }
  }
};
</script>

<style lang='scss' scoped>
/* autoprefixer grid: on */
.hero-cell {
  position: relative;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $sky;
    opacity: 0.5;
    @supports (mix-blend-mode: screen) {
      opacity: 1;
      mix-blend-mode: screen;
    }
  }
	$r: 1;
	$c: 1;
	@for $n from 1 through 20 {
		@if $c > 5 {
			$c: 1;
			$r: $r+1;
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
		$c: $c+1;
	}
  
}
</style>