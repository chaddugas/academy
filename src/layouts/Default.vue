<template lang="pug">
	#academy
		app-notification
		app-nav
		app-utility
		slot
</template>

<static-query>
</static-query>

<script>
import Notification from "@/components/Notification"
import Nav from "@/components/Nav"
import Utility from "@/components/Utility"
export default {
	name: "Layout",
  components: {
    appNotification: Notification,
		appNav: Nav,
		appUtility: Utility
  }
}
</script>

<style>
</style>
