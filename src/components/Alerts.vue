<template lang="pug">
	aside.alerts
		app-alert(
			v-for="(alert, i) in alerts"
			:key="alert.title"
			:index="i"
			:alert="alert")
</template>

<static-query>
query {
  alerts: allAlerts {
    edges {
      node {
        alerts {
          icon
          title
					subtitle
          copy
          active
        }
      }
    }
  }
}
</static-query>

<script>
import Alert from './Alert'
export default {
	name: "Alerts",
	components: {
		appAlert: Alert
	},
  computed: {
    alerts() {
			return this.$static.alerts.edges[0].node.alerts;
    }
  }
};
</script>

<style lang="scss">
.alerts {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: -0.5rem;
	height: 100vh;
	width: calc(100vw + 0.5rem);
	max-height: 100vh;
	padding: 1.5rem;
	padding-right: 2rem;
	z-index: 1000;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	pointer-events: none;
	display: flex;
	flex-direction: column;
}
</style>