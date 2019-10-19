<template lang="pug">
aside.utility(:class="{deactivated}")
	a.utility-item(href="https://mychart.childrenscolorado.org/MyChart/", target="_blank")
		.utility-icon
			i.fas.fa-baby
		p.utility-text My Chart
</template>

<script>
export default {
  name: "Utility",
  data() {
    return {
      deactivated: process.isClient ? window.scrollY > 200 : false
    };
  },
  methods: {
    deactivate() {
      this.deactivated = window.scrollY > 200
		},
    init() {
      window.addEventListener("scroll", this.deactivate)
    },
    destroy() {
      window.removeEventListener("scroll", this.deactivate)
    }
	},
  mounted() {
    if (process.isClient) this.init()
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>

<style lang="scss" scoped>
.utility {
	position: fixed;
	top: 0;
	right: 0;
	background: $onyx;
	padding: 10px 20px;
	z-index: 10;
	display: flex;
	transform: translateY(0);
	transition: 0.2s ease;
	&.deactivated {
		transform: translateY(-100%);
	}
}

.utility-item {
	color: $white;
	display: flex;
	align-items: center;
	transition: 0.2s ease;
	&:hover {
		color: $sky;
	}
}

.utility-icon {
	font-size: 22px;
	margin-right: 8px;
}

.utility-text {
	font-size: 14px;
}
</style>