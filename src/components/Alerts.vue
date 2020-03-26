<template lang="pug">
	aside.alerts
		app-alert(
			v-for="(alert, i) in alerts",
			:key="alert.title",
			:index="i",
			:alert="alert",
			@change="adjustBottom")
</template>

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
  },
	methods: {
		adjustLeft() {
			if (window.matchMedia("(min-width: 1410px)").matches) {
				this.$el.style.left = ((window.innerWidth - 1350)/2) + 'px'
				this.$el.style.paddingLeft = 0;
			}
			else {
				this.$el.removeAttribute('style')
			}
		},
		adjustBottom() {
			let alerts = [...this.$el.querySelectorAll('.alert')]
			let height = 0

			alerts.forEach(alert => {
				let styles = window.getComputedStyle(alert)
				height += alert.offsetHeight
				height += parseFloat(styles.marginBottom)
			})

			document.querySelector('main').style.paddingBottom = height + 'px'
		},
		adjustVH() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}
	},
	mounted() {
		this.adjustLeft()
		window.addEventListener('resize', this.adjustLeft)
		window.addEventListener('resize', this.adjustVH)
	}
};
</script>

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

<style lang="scss">
.alerts {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 100vh;
	height: calc(var(--vh, 1vh) * 100);
	padding: 1.5rem 1.875rem;
	z-index: 10;
	pointer-events: none;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-start;
	transition: height 0.25s ease;
}
</style>