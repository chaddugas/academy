<template lang="pug">
	Layout-Stripped
		main
			div
				iframe(:src='badge')
</template>

<script>
import LayoutStripped from '~/layouts/Stripped'
export default {
	name: "Status",
	data() {
		return {
			badge: 'https://api.netlify.com/api/v1/badges/f20078b3-e570-4100-95ce-19b3230d5891/deploy-status'
		}
	},
	components: {
		LayoutStripped
	},
	mounted() {
		setInterval(() => {
			this.$el.querySelector('iframe').contentWindow.location.reload(true)
		},2500)
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
iframe {
	border: none;
	width: 100%;
	height: 100%;
	background: none;
}
</style>
