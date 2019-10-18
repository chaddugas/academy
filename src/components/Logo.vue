<template lang="pug">
h1.grid-tile.grid-logo
	span.logo-text Academy 
	span.logo-text 
		i.fa.fa-heartbeat
		| Park
	span.logo-text Pediatrics
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style lang="scss">
.grid-tile.grid-logo {
	display: flex;
	flex-direction: column;
	z-index: 2;
	background: $indigo;
	justify-content: center;
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