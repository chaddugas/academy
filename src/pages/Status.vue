<template lang="pug">
	Layout-Stripped
		main
			div
				img(:src="`${badge}?${cashbust}`")
</template>

<script>
import LayoutStripped from '~/layouts/Stripped'
export default {
	name: "Status",
	data() {
		return {
			cashbust: new Date().getTime(),
			badge: 'https://api.netlify.com/api/v1/badges/f20078b3-e570-4100-95ce-19b3230d5891/deploy-status?'
		}
	},
	components: {
		LayoutStripped
	},
	methods: {
		int() {
			this.cashbust++
		}
	},
	mounted() {
		window.setInterval(this.int, 7500)
	},
	beforeDestroy() {
		window.clearInterval(this.int)
	}
};
</script>

<style lang="scss" scoped>
div {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;
}
</style>
