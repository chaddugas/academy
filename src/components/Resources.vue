<template lang="pug">
	section#resources.resources
		.resources-inner
			a.resource(
				v-for="item in resources",
				:key="item.title",
				:href="item.file ? item.file : item.link",
				:download="item.file ? item.title : false",
				target="_blank")
				.resource-icon
					i(:class="item.icon")
				p.resource-title {{ item.title }}
				.resource-action
					i(:class="item.file ? 'fas fa-download' : 'fas fa-external-link-square-alt'")
</template>

<script>
export default {
  name: "Resources",
  computed: {
    resources() {
      return this.$static.resources.edges[0].node.resources;
    }
  }
};
</script>

<static-query>
query {
  resources: allResources {
    edges {
      node {
        resources {
          title
          icon
          file
          link
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
.resources-inner {
  @include container($max: 1200px);
  position: relative;
  display: flex;
  flex-direction: column;
  background: $white;
  padding: 20px;
  @media (min-width: $md) {
    padding: 30px 40px;
  }
}

.resource {
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid $gray;
  transition: 0.2s ease;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: $gray;
    &:nth-child(4n-3) {
      color: $red;
    }
    &:nth-child(4n-2) {
      color: $indigo;
    }
    &:nth-child(4n-1) {
      color: $sky;
    }
    &:nth-child(4n) {
      color: $teal;
    }
  }
  @media (min-width: $md) {
    padding: 20px 30px;
    margin: 0 -10px;
  }
}

.resource-icon {
	display: flex;
	justify-content: center;
	align-items: center;
  width: 35px;
  min-width: 35px;
  font-size: 28px;
  display: flex;
  margin-right: 10px;
  @media (min-width: $sm) {
    width: 60px;
    font-size: 40px;
  }
}

.resource-title {
  margin-right: auto;
  font-size: 14px;
  @media (min-width: $sm) {
    font-size: 1rem;
  }
}

.resource-action {
  font-size: 20px;
  margin-left: 10px;
  width: 25px;
  @media (min-width: $sm) {
    width: 30px;
    font-size: 24px;
  }
}
</style>