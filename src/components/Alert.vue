<template lang="pug">
transition(name="fade")
	.alert(
		v-if="alert.active && visible",
		:class="{'is-expanded': expanded, 'is-active': active}")
		.alert-content
			.alert-main
				h6.alert-title
					i(:class="alert.icon")
					span {{ alert.title }}
				p.alert-subtitle(v-if="alert.subtitle")
					span {{ alert.subtitle }}
				.alert-copy.wysiwyg(v-if="more")
					Markdown {{ alert.copy }}
		.alert-actions
			.alert-open(
				@click="open")
				i(:class="alert.icon")
			.alert-close(
				@click="close",
				:style="actionHeight")
				i.fas.fa-compress-arrows-alt
			.alert-more(
				v-if="more"
				@click="expand",
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
      height: "100px",
      start: { height: 0, width: 0 },
      end: { height: 0, width: 0 }
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
  methods: {
    animate(callback) {
      if (process.isClient) {
        this.start.width = this.$el.offsetWidth;
        this.start.height = this.$el.offsetHeight;
        setTimeout(callback);
        setTimeout(() => {
          this.end.width = this.$el.offsetWidth;
          this.end.height = this.$el.offsetHeight;
        });
        setTimeout(() => {
          this.$el.animate(
            [
              {
                height: `${this.start.height}px`,
                width: `${this.start.width}px`
              },
              { height: `${this.end.height}px`, width: `${this.end.width}px` }
            ],
            {
              duration: 400,
              easing: "ease"
            }
          );
        });
      }
    },
    open() {
      this.animate(() => {
        this.active = true;
      });
    },
    close() {
      this.animate(() => {
        this.expanded = false;
        this.active = false;
      });
    },
    expand() {
      this.animate(() => {
        this.expanded = !this.expanded;
      });
    }
  },
  mounted() {
    if (process.isClient)
      setTimeout(() => {
        this.visible = true;
        setTimeout(() => {
          this.height = this.$el.offsetHeight;
          this.$emit("change");
        }, 10);
      }, 350 + this.index * 200);
  },
  watch: {
    active() {
      setTimeout(() => {
        this.$emit("change");
      }, 410);
    }
  }
};
</script>

<style lang="scss">
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.alert {
  margin-top: 1.5rem;
  display: flex;
  width: 50px;
  max-width: 100%;
  max-height: 100%;
  pointer-events: all;
  box-shadow: 0 0 5px rgba($black, 0.15), 0 0 20px rgba($black, 0.05);
  position: relative;
  align-self: flex-start;
  transition: background 0.25s ease, opacity 0.25s ease;
  background: $white;
  flex: 0 0 auto;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    transition: 0.25s ease;
    background: transparent;
    pointer-events: none;
  }
  &:last-child {
    margin-top: auto;
  }
  &.is-active {
    width: 400px;
    background: lighten($gray, 2%);
    padding-left: 8px;
    &::before {
      background: $red;
    }
    .alert-content,
    .alert-title,
    .alert-subtitle,
    .alert-more,
    .alert-close {
      height: auto;
      width: auto;
      transition-delay: 400ms;
      opacity: 1;
    }
    .alert-more,
    .alert-close {
      padding: 0.75rem;
      flex: 1 1 100%;
    }
    .alert-more {
      border-top: 1px solid darken($gray, 5%);
    }
    .alert-open {
      flex: 0 0 0;
      height: 0;
      width: 0;
      padding: 0;
      min-width: 0;
      min-height: 0;
      opacity: 0;
      transition-delay: 0ms;
    }
  }
  &.is-expanded {
    .alert-content,
    .alert-copy {
      height: auto;
      width: auto;
    }
    .alert-title {
      transition-delay: 400ms;
      opacity: 1;
    }
    .alert-subtitle {
      height: 0;
      height: 0;
      opacity: 0;
      transition-delay: 0ms;
    }
    .alert-copy {
      opacity: 1;
      transition-delay: 400ms;
    }
    .alert-copy {
      overflow-y: auto;
    }
  }
}

.alert-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  height: 0;
  width: 0;
  overflow: hidden;
}

.alert-main {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  position: relative;
  flex: 1 1 100%;
  max-height: 100%;
  padding: 0.75rem;
}

.alert-title {
  display: flex;
  align-items: flex-start;
  font-size: 1.375rem;
  line-height: 1.25;
  margin: 0;
  padding: 0;
  flex: 0 0 auto;
  opacity: 0;
  height: auto;
  width: auto;
  overflow: hidden;
  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  .is-active &:not(:only-child),
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
  height: 0;
  width: 0;
  overflow: hidden;
  font-style: italic;
  font-size: 14px;
  margin: 0;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease;
}

.alert-copy {
  margin: 0;
  height: 0;
  width: 0;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

.alert-actions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: $white;
  .is-active & {
    flex: 0 0 60px;
    border-left: 1px solid darken($gray, 5%);
  }
}

.alert-open,
.alert-close,
.alert-more {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  overflow: hidden;
  height: 0;
  width: 0;
  max-height: 160px;
  i {
    transition: transform 0.25s ease;
    font-size: 1.25rem;
    &:nth-child(2) {
      margin-left: 0.25rem;
    }
  }
  @media (hover: hover) {
    &:hover {
      background: $onyx;
      color: $white;
    }
  }
}

.is-expanded {
  .alert-more i {
    &:last-child {
      transform: rotate(180deg);
    }
  }
}

.alert-open {
  flex: 1 1 100%;
  min-width: 50px;
  height: auto;
  width: auto;
  padding: 0.75rem;
  opacity: 1;
  transition-delay: 400ms;
}
</style>