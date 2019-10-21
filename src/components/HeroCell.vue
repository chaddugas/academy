<template lang='pug'>
	.hero-cell
		.cell-img(:style="style")
</template>

<script>
export default {
  name: "HeroCell",
	props: ["item", "set"],
  computed: {
		image() {
			return this.item.toString().padStart(2, "0")
		},
		delay() {
			return (this.item - 1) * 0.05
		},
    style() {
      return {
				backgroundImage: `url(/media/hero-${this.set}/hero_${this.image}.jpg)`,
				transitionDelay: `${this.delay}s`
      };
    }
  }
};
</script>

<style lang='scss' scoped>
.hero-cell {
	position: relative;
	background-color: $sky;
  margin: 0 2.5px;
	margin-bottom: 5px;
	overflow: hidden;
  @media (min-width: $sm) {
    margin: 0 5px;
    margin-bottom: 10px;
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

.cell-img {
	position: absolute;
	top: -2.5px; left: -2.5px; right: -2.5px; bottom: -2.5px;
	background-size: cover;
	transition: 0.25s ease;
	opacity: 0;
	&[style] {
		opacity: 1;
	}
}
</style>