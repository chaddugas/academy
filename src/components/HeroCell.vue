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
.hero-cell {
  position: relative;
  background-size: cover;
  margin: 0 2.5px;
  margin-bottom: 5px;
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
</style>