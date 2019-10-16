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
				@mouseover="setContent()",
				@click="scroll()",
				@mouseleave="active = false")
				span.insurance-mono A
				span.insurance-name Aetna
			.insurance-item
				span.insurance-mono A
				span.insurance-name Anthem
			.insurance-item
				span.insurance-mono B
				span.insurance-name Bright Health
			.insurance-item
				span.insurance-mono C
				span.insurance-name Cigna
			.insurance-item
				span.insurance-mono G
				span.insurance-name Great West
			.insurance-item
				span.insurance-mono C
				span.insurance-name Cofinity
			.insurance-item
				span.insurance-mono C
				span.insurance-name Colorado Access
			.insurance-item
				span.insurance-mono C
				span.insurance-name Coventry
			.insurance-item
				span.insurance-mono H
				span.insurance-name Humana
			.insurance-item
				span.insurance-mono M
				span.insurance-name Medicaid
			.insurance-item
				span.insurance-mono P
				span.insurance-name Ph Cs
			.insurance-item
				span.insurance-mono R
				span.insurance-name Rocky Mountain Health
			.insurance-item
				span.insurance-mono U
				span.insurance-name United Healthcare
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
		},
		scroll(item) {
			let top = this.$el.getBoundingClientRect().top - 30;
      window.scrollBy({
        top,
        behavior: "smooth"
			});
			setContent(item)
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
  @media (min-width: $lg) {
    margin-right: 20px;
    margin-bottom: 0;
		flex: 0 1 500px;
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
  display: grid;
	grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 20px;
	width: 100%;
	@media (min-width: $sm) {
		grid-template-columns: repeat(3, 1fr);
	}
  @media (min-width: $lg) {
		flex-grow: 0;
		width: auto;
		grid-template-columns: repeat(4, 1fr);
  }
}

.insurance-item {
	&:nth-child(3),
	&:nth-child(4),
	&:nth-child(6),
	&:nth-child(7),
	&:nth-child(9),
	&:nth-child(10),
	&:nth-child(13) {
		background: lighten($black, 25%);
		color: $white;
		&:nth-child(5n-1) .insurance-mono {
			color: $orange !important;
		}
	}
}

.insurance-item {
  display: flex;
  flex-direction: column;
  align-items: center;
	justify-content: center;
	background: lighten($black, 25%);
  padding: 15px;
	transition: 0.25s ease;
  cursor: pointer;
	@media ($md) {
  padding: 20px;
	}
	&:hover {
		box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
		transform: scale(1.035, 1.035);
	}
  &:nth-child(5n-4) {
    .insurance-mono {
      color: $red;
    }
  }
  &:nth-child(5n-3) {
    .insurance-mono {
      color: lighten(saturate($teal, 20%), 15%);
    }
  }
  &:nth-child(5n-2) {
    .insurance-mono {
      color: saturate($paste, 30%);
    }
  }
  &:nth-child(5n-1) {
    .insurance-mono {
      color: $orange;
    }
  }
  &:nth-child(5n) {
    .insurance-mono {
      color: lighten(saturate($indigo, 30%), 15%);
    }
  }
}

.insurance-mono {
  font-size: 38px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: $headings;
	line-height: 1;
	margin-bottom: 5px;
	@media (min-width: $md) {
		font-size: 50px;
	}
}

.insurance-name {
  font-weight: 700;
  text-align: center;
	font-size: .75rem;
	color: $white;
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