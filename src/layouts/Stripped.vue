<template lang="pug">
	#academy
		slot
</template>

<static-query>
</static-query>

<script>
import Alerts from "@/components/Alerts"
import Nav from "@/components/Nav"
export default {
	name: "Layout",
  components: {
    appAlerts: Alerts,
		appNav: Nav
  }
}
</script>

<style lang="scss" scoped>
</style>
