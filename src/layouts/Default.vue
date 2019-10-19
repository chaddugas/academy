<template lang="pug">
	#academy
		app-notification
		app-nav
		slot
</template>

<static-query>
</static-query>

<script>
import Notification from "@/components/Notification"
import Nav from "@/components/Nav"
export default {
	name: "Layout",
  components: {
    appNotification: Notification,
		appNav: Nav
  }
}
</script>

<style lang="scss" scoped>
</style>
