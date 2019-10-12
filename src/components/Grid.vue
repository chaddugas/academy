<template lang="pug">
	section#staff.grid
		.grid-inner
			app-person(:title="true")
			app-person(v-for="(person, i) in 7", :key="i", :person="i", :title="false")
</template>

<script>
import Person from "./Person";
export default {
	name: "Staff",
  components: {
    appPerson: Person
  },
}
</script>

<style lang="scss" scoped>
.grid {
	@include container;
	padding: 30px 0;
}

.grid-inner {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 1fr;
	grid-gap: 20px;
	position: relative;
	z-index: 1;
	@media (min-width: $md) {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>