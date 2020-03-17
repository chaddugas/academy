<template lang="pug">
transition(name="fade")
	.alert(
		v-if="alert.active && visible",
		:class="{'is-expanded': expanded, 'is-active': active}")
		.alert-content(v-if="active === true")
			.alert-main
				h6.alert-title
					i(v-if="alert.icon", :class="alert.icon")
					span {{ alert.title }}
				p.alert-subtitle(v-if="!expanded && alert.subtitle")
					span {{ alert.subtitle }}
				.alert-copy.wysiwyg(v-if="expanded && more")
					Markdown {{ alert.copy }}
		.alert-actions
			.alert-open(
				v-if="active === false",
				@click="active = true")
				i(:class="alert.icon")
			.alert-close(
				v-if="active === true",
				@click="active = false",
				:style="actionHeight")
				i.fas.fa-compress-arrows-alt
			.alert-more(
				v-if="more && active === true"
				@click="expanded = !expanded",
				:style="actionHeight")
				i.fas.fa-info-circle
				i.fas.fa-angle-right
</template>

<script>
export default {
  name: "Alert",
  props: ["alert", "index"],
  data() {
    return {
			visible: false,
      active: true,
      expanded: false,
      height: "100px"
    };
  },
  computed: {
    more() {
      return !!this.alert.copy.trim().length;
    },
    actionHeight() {
      if (this.more) {
        return { maxHeight: `${this.height / 2}px` };
      }
      return { maxHeight: `${this.height}px` };
    }
  },
  mounted() {
    if (process.isClient)
      setTimeout(() => {
        this.visible = true;
        setTimeout(() => {
          this.height = this.$el.offsetHeight;
        }, 10);
      }, 350 + this.index * 200);
  }
};
</script>

<style lang="scss">
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.alert {
  margin-bottom: 1rem;
  display: flex;
  width: 400px;
  max-width: 100%;
  max-height: 100%;
  pointer-events: all;
  box-shadow: 0 0 5px rgba($black, 0.25), 0 0 20px rgba($black, 0.1);
  background: $white;
  position: relative;
  align-self: flex-start;
  &:not(.is-active) {
    width: auto;
  }
}

.alert-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 0.75rem;
}

.alert-main {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  position: relative;
	flex: 1 1 100%;
	max-height: 100%;
}

.alert-title {
  display: flex;
  align-items: flex-start;
  font-size: 1.375rem;
  line-height: 1.25;
  margin: 0;
  padding: 0;
  &:not(:only-child),
  .is-expanded & {
    margin-bottom: 1rem;
  }
  i {
    font-size: 1.75rem;
    margin-right: 0.5rem;
    color: $red;
  }
}

.alert-subtitle {
  padding: 0 0.5rem 0;
  font-style: italic;
  font-size: 14px;
  margin: 0;
  max-width: 316px;
  span {
    opacity: 1;
  }
}

.alert-copy {
  margin: 0;
  padding: 0 0.5rem 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.alert-actions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-left: 1px solid darken($gray, 5%);
}

.alert-open,
.alert-close,
.alert-more {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;
  cursor: pointer;
  transition: 0.25s ease;
  max-height: 80px;
  &:first-child:not(:only-child) {
    border-bottom: 1px solid darken($gray, 5%);
  }
  i {
		transition: transform 0.25s ease;
    font-size: 1.25rem;
    &:nth-child(2) {
      margin-left: 0.25rem;
    }
  }
  &:hover {
    background: $onyx;
    color: $white;
  }
}

.is-expanded {
	.alert-more i {
		&:last-child {
			transform: rotate(180deg);
		}
	}
}
</style>