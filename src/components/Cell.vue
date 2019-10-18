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
  grid-area: span 1 / span 1;
  position: relative;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $teal;
    mix-blend-mode: screen;
  }
}
</style>