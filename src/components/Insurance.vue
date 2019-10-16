<template lang="pug">
	.ins
		transition-group.ins-content(name="fade", tag="div")
			.ins-wysiwyg(v-show="!active", :key="'wysiwyg'")
				h1 Insurance
				p When you arrive at our office, please have your insurance card ready. Please call if you are going to be late or need to reschedule. If you have insurance or demographic changes, please arrive 5 to 10 minutes prior to your appointment.
				p Please call our office insurance department prior to relying on Health Insurance Website Information as our contracting may change.
				p We are happy to answer your insurance participation questions at 303-988-5252. 
			.ins-info(v-show="active", :key="'info'") 
				h3.ins-infoName {{heading}}
				p.ins-infoCopy {{content}}
			
		.ins-items
			.ins-item(@mouseover="setContent()", @mouseleave="active = false")
				span.ins-mono A
				span.ins-name Aetna
			.ins-item
				span.ins-mono A
				span.ins-name Anthem
			.ins-item
				span.ins-mono B
				span.ins-name Bright Health
			.ins-item
				span.ins-mono C
				span.ins-name Cigna
			.ins-item
				span.ins-mono G
				span.ins-name Great West
			.ins-item
				span.ins-mono C
				span.ins-name Cofinity
			.ins-item
				span.ins-mono C
				span.ins-name Colorado Access
			.ins-item
				span.ins-mono C
				span.ins-name Coventry
			.ins-item
				span.ins-mono H
				span.ins-name Humana
			.ins-item
				span.ins-mono M
				span.ins-name Medicaid
			.ins-item
				span.ins-mono P
				span.ins-name Ph Cs
			.ins-item
				span.ins-mono R
				span.ins-name Rocky Mountain Health
			.ins-item
				span.ins-mono U
				span.ins-name United Healthcare
</template>

<script>
export default {
  name: "Insurance",
  data() {
    return {
      active: false,
      active_item: 0
    };
  },
  computed: {
    heading() {
      return "Aetna";
    },
    content() {
      return "We accept most products. No health exchange plans.";
    }
  },
  methods: {
    setContent(item) {
      this.active_item = item;
      this.active = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.ins {
  @include container($max: 1200px);
  display: flex;
  margin-bottom: 50px;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: $lg) {
    flex-direction: row;
  }
}

.ins-content {
  padding: 30px;
  background: $white;
  align-self: stretch;
  position: relative;
  margin-bottom: 20px;
  @media (min-width: $lg) {
    margin-right: 20px;
    margin-bottom: 0;
		flex: 0 1 500px;
  }
}

.ins-info,
.ins-wysiwyg {
  width: 100%;
	pointer-events: none;
}

.ins-info {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  bottom: 20px;
  width: auto;
}

.ins-infoName {
  font-size: 30px;
  font-weight: 700;
  font-family: $headings;
  color: $onyx;
  margin-bottom: 20px;
  margin-top: 22px;
}

.ins-items {
  display: grid;
	grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 20px;
	width: 100%;
  @media (min-width: $lg) {
		flex-grow: 0;
		width: auto;
		grid-template-columns: repeat(4, 1fr);
  }
}

.ins-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $white;
  padding: 20px;
	transition: 0.25s ease;
  cursor: pointer;
	&:hover {
		box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
		transform: scale(1.035, 1.035);
	}
  &:nth-child(5n-4) {
    .ins-mono {
      color: $red;
    }
  }
  &:nth-child(5n-3) {
    .ins-mono {
      color: $teal;
    }
  }
  &:nth-child(5n-2) {
    .ins-mono {
      color: $paste;
    }
  }
  &:nth-child(5n-1) {
    .ins-mono {
      color: $onyx;
    }
  }
  &:nth-child(5n) {
    .ins-mono {
      color: $indigo;
    }
  }
  span {
    margin: 0;
  }
}

.ins-mono {
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: $headings;
}

.ins-name {
  font-weight: 700;
  text-align: center;
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