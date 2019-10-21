<template lang="pug">
header.logo
	.logo-inner
		span.logo-text Academy 
		span.logo-text 
			i.fas.fa-heartbeat
			| Park
		span.logo-text Pediatrics
</template>

<script>
export default {
  name: "HeroLogo"
};
</script>

<style lang="scss">
.logo {
  background: $indigo;
  // margin: 0 2.5px;
  // margin-bottom: 5px;
  // @media (min-width: $sm) {
  //   margin: 0 5px;
  //   margin-bottom: 10px;
  // }
}

.logo-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  @media (min-width: $sm) {
  padding: 20px;
	}
  @media (min-width: $md) {
  padding: 30px;
	}
}

.logo-text {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  color: $white;
  text-align: right;
  font-size: 22px;
  line-height: 1.3;
  text-transform: uppercase;
  i {
    font-size: 18px;
    margin-right: 10px;
    color: $red;
  }
  @media (min-width: $sm) {
    font-size: 38px;
    i {
      font-size: 35px;
      margin-right: 20px;
    }
  }
}

.title-tagline {
  font-size: 16px;
  margin-top: 10px;
  white-space: nowrap;
  @media (min-width: $sm) {
    font-size: 22px;
  }
}
</style>