<template lang="pug">
	Layout-Stripped
		main
			div
				img(src='https://api.netlify.com/api/v1/badges/f20078b3-e570-4100-95ce-19b3230d5891/deploy-status')
</template>

<script>
import LayoutStripped from '~/layouts/Stripped'
export default {
	name: "Status",
	components: {
		LayoutStripped
	}
};
</script>

<style lang="scss" scoped>
div {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3rem;
	min-height: 100vh;
}
</style>
