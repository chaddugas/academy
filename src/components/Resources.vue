<template lang="pug">
	section#resources.resources
		.resources-inner
			a.resource(:href="`/`", :download="false", target="_blank")
				.resource-icon
					i.fas.fa-notes-medical
				p.resource-title Incoming Medical Release (Lakewood)
				.resource-action
					i.fas.fa-download
			a.resource(:href="`/`", :download="true", target="_blank")
				.resource-icon
					i.fas.fa-notes-medical
				p.resource-title Incoming Medical Release (Highlands Ranch)
				.resource-action
					i.fas.fa-download
			a.resource(:href="`/`", :download="true", target="_blank")
				.resource-icon
					i.fas.fa-comment-medical
				p.resource-title Outgoing Medical Release
				.resource-action
					i.fas.fa-download
			a.resource(:href="`/`", :download="true", target="_blank")
				.resource-icon
					i.fas.fa-star-of-life
				p.resource-title New Registration
				.resource-action
					i.fas.fa-download
			a.resource(:href="`/`", :download="true", target="_blank")
				.resource-icon
					i.fas.fa-pills
				p.resource-title OTC Dosing Chart
				.resource-action
					i.fas.fa-download
			a.resource(:href="`/`", :download="true", target="_blank")
				.resource-icon
					i.fas.fa-microscope
				p.resource-title American Academy of Pediatrics
				.resource-action
					i.fas.fa-external-link-square-alt
</template>

<script>
export default {
	name: "Resources"
}
</script>

<style lang="scss" scoped>
.resources {
  margin: 50px 0 80px;
}
.resources-inner {
  @include container($max: 1200px);
	position: relative;
	display: flex;
	flex-direction: column;
  background: $white;
	padding: 30px 20px;
  @media (min-width: $md) {
    padding: 30px 40px;
  }
}

.resource {
	display: flex;
	align-items: center;
	padding: 20px 30px;
	border-top: 1px solid transparent;
	border-bottom: 1px solid $gray;
	transition: .2s ease;
	cursor: pointer;
  &:last-child {
		border-bottom: none;
	}
	&:hover {
		background: $gray;
		.resource-action {
			color: $sky;
		}
	}
}

.resource-icon {
	width: 60px;
	font-size: 40px;
	display: flex;
	margin-right: 10px;
}

.resource-title {
	margin-right: auto;
}

.resource-action {
	font-size: 24px;
	transition: .2s ease;
}
</style>