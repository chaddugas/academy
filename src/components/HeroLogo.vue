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
  font-size: 28px;
  line-height: 1.2;
  text-transform: uppercase;
  i {
    font-size: 22px;
    margin-right: 10px;
    color: $red;
  }
  @media (min-width: $sm) {
    font-size: 30px;
    i {
      font-size: 26px;
      margin-right: 10px;
    }
  }
  @media (min-width: $lg) {
		line-height: 1.3;
    font-size: 38px;
    i {
      font-size: 35px;
      margin-right: 20px;
    }
  }
}
</style>