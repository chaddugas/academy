<template lang="pug">
.hero-logo
	h1.hero-title
		span Academy
		span 
			i.fa.fa-heartbeat
			| Park
		span Pediatrics
	h6.hero-tagline
		span A partner in your child's health.
</template>

<script>
export default {
	name: "Logo"
}
</script>

<style lang="scss">
.hero-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  position: relative;
  flex: 0 0 auto;
  color: $white;
  padding: 40px;
  @media (min-width: $sm) {
    padding: 60px;
  }
  @media (min-width: $lg) {
    padding: 80px;
    order: 1;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    z-index: -1;
    background: $indigo;
    @media (min-width: $lg) {
      background-clip: content-box;
      border: 30px solid transparent;
    }
  }
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-size: 38px;
  line-height: 1.3;
  text-transform: uppercase;
  @media (min-width: $sm) {
    font-size: 55px;
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  i {
    font-size: 35px;
    margin-right: 20px;
    color: $red;
    @media (min-width: $sm) {
      font-size: 50px;
    }
  }
}

.hero-tagline {
  font-size: 16px;
  margin-top: 10px;
  white-space: nowrap;
  @media (min-width: $sm) {
    font-size: 22px;
  }
}
</style>