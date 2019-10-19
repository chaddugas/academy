<template lang="pug">
	#insurance.insurance
		transition-group.insurance-content(name="fade", tag="div")
			.insurance-wysiwyg(:class="{hidden: active}", :key="'wysiwyg'")
				h1 Insurance
				p When you arrive at our office, please have your insurance card ready. Please call if you are going to be late or need to reschedule. If you have insurance or demographic changes, please arrive 5 to 10 minutes prior to your appointment.
				p Please call our office insurance department prior to relying on Health Insurance Website Information as our contracting may change.
				p We are happy to answer your insurance participation questions at 303-988-5252. 
			.insurance-info(v-if="active", :key="'info'") 
				h3.insurance-infoName {{heading}}
				p.insurance-infoCopy {{content}}
			
		.insurance-items
			.insurance-item(
				v-for="item in insurance"
				@mouseover="setContent(item)",
				@click="scroll(item)",
				@mouseleave="active = false")
				.insurance-inner
					span.insurance-mono {{item.title[0].toUpperCase()}}
					span.insurance-name {{item.title}}
</template>

<static-query>
query {
  insurance: allInsurance {
    edges {
      node {
        insurance {
          title
          info 
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  name: "Insurance",
  data() {
    return {
      active: false,
      active_item: null
    };
  },
  computed: {
    heading() {
      return this.active_item.title;
    },
    content() {
      return this.active_item.info;
    },
    insurance() {
      return this.$static.insurance.edges[0].node.insurance;
    }
  },
  methods: {
    setContent(item) {
      this.active_item = item;
      this.active = true;
    },
    scroll(item) {
      if (process.isClient) {
        let top = this.$el.getBoundingClientRect().top - 30;
        window.scrollBy({
          top,
          behavior: "smooth"
        });
        setContent(item);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.insurance {
  @include container($max: 1200px);
  display: flex;
  margin-bottom: 50px;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: $lg) {
    flex-direction: row;
  }
}

.insurance-content {
  background: $white;
  align-self: stretch;
  position: relative;
  margin-bottom: 20px;
  z-index: 1;
  @media (min-width: $lg) {
    margin-right: 20px;
    margin-bottom: 0;
    flex: 0 1 450px;
    min-width: 450px;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 10%;
    right: 40%;
    z-index: -1;
    background-image: linear-gradient(
      to bottom right,
      rgba($gray, 0.35),
      rgba($gray, 0.35) 50%,
      transparent 50%,
      transparent
    );
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0%;
    bottom: 40%;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      to bottom left,
      rgba($gray, 0.35),
      rgba($gray, 0.35) 50%,
      transparent 50%,
      transparent
    );
  }
}

.insurance-info,
.insurance-wysiwyg {
  width: 100%;
  pointer-events: none;
  padding: 30px;
}

.insurance-wysiwyg {
  opacity: 1;
  transition: opacity 0.25s;
  font-size: 1rem;
  &.hidden {
    opacity: 0;
  }
}

.insurance-info {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
}

.insurance-infoName {
  font-size: 30px;
  font-weight: 700;
  font-family: $headings;
  color: $onyx;
  margin-bottom: 20px;
}

.insurance-items {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 5px);
  z-index: 1;
  margin: 0 -2.5px -5px;
  @media (min-width: $sm) {
    width: calc(100% + 20px);
    margin: 0 -10px -20px;
  }
  @media (min-width: $md) {
  }
  @media (min-width: $lg) {
    flex: 1 1 100%;
  }
}

.insurance-item {
	flex: 0 0 calc(33.333% - 5px);
	width: calc(33.333% - 5px);
	margin: 0 2.5px 5px;
  background: $white;
  transition: 0.25s ease;
  cursor: pointer;
  position: relative;
  padding: 15px;
  &::before {
    content: "";
    position: relative;
    padding-top: 100%;
    display: block;
  }
  &::after {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    z-index: -1;
    content: "";
  }
  @media (min-width: $sm) {
		flex: 0 0 calc(25% - 20px);
		width: calc(25% - 20px);
    margin: 0 10px 20px;
  }
  @media (min-width: $md) {
		flex: 0 0 calc(20% - 20px);
		width: calc(20% - 20px);
    padding: 20px;
  }
  @media (min-width: $lg) {
		flex: 0 0 calc(25% - 20px);
		width: calc(25% - 20px);
    padding: 20px;
  }
  &:hover {
    box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
    transform: scale(1.035, 1.035);
  }
  &:nth-child(5n-4) {
    .insurance-mono {
      color: $indigo;
    }
  }
  &:nth-child(5n-3) {
    .insurance-mono {
      color: $sky;
    }
  }
  &:nth-child(5n-2) {
    .insurance-mono {
      color: $orange;
    }
  }
  &:nth-child(5n-1) {
    .insurance-mono {
      color: $teal;
    }
  }
  &:nth-child(5n) {
    .insurance-mono {
      color: $red;
    }
  }
}

.insurance-inner {
	position: absolute;
	height: 100%;
	width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.insurance-mono {
  font-size: 38px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: $headings;
  line-height: 1;
	margin-bottom: 5px;
	width: 100%;
  text-align: center;
  @media (min-width: $md) {
    font-size: 50px;
  }
}

.insurance-name {
  font-weight: 700;
  text-align: center;
  font-size: 0.75rem;
  color: $onyx;
	width: 100%;
  @media (min-width: $md) {
    font-size: 1rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>