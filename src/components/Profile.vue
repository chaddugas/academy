<template lang="pug">
	.profile(:class="{active}", :style="`background-image: url(${profile.photo})`", @click.self="close")
		.profile-inner(@click="toggle")
			.profile-content
				.profile-data
					.profile-image
						img(:src="profile.photo")
						img(src="/media/healy-kristy.jpg")
					.profile-name
						h3 {{ profile.title }}
				Markdown.profile-wysiwyg {{ profile.bio }}
		
</template>

<script>
import { ProfileBus } from "@/EventBus.js";
export default {
  name: "Profile",
  props: ["title", "profile"],
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggle() {
      this.$el.querySelector(".profile-content").scrollTop = 0;
      this.active = !this.active;
      ProfileBus.$emit("toggled", this.$el);
    },
    close() {
      this.active = false;
    }
  },
  mounted() {
    ProfileBus.$on("toggled", el => (this.$el != el ? this.close() : false));
  }
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;
  z-index: -1;
  flex: 0 0 calc(50% - 5px);
  width: calc(50% - 5px);
  margin: 0 2.5px 5px;
  transition: z-index 0ms linear;
  transition-delay: 500ms;
  background-size: 0 0;
  &:before {
    content: "";
    display: block;
    position: relative;
    padding-top: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-size: cover;
    background-position: 50% 50%;
    background-image: inherit;
    filter: grayscale(50%);
    opacity: 0.25;
  }
  @media (min-width: $md) {
    flex: 0 0 calc(33.333% - 20px);
    width: calc(33.333% - 20px);
    margin: 0 10px 20px;
  }
}

.profile-inner {
  display: flex;
  position: absolute;
  overflow: hidden;
  cursor: pointer;
  height: calc(100% + 0px);
  width: calc(100% + 0px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: height, width, top, left;
    @media (hover: hover) {
      &:hover {
        .profile-name {
          opacity: 1;
          transform: translateY(0);
        }
        .profile-image {
          transform: scale(1.15, 1.15);
          filter: grayscale(0%) brightness(60%);
        }
      }
    }
  }
}

.profile-content {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  pointer-events: none;
  background-color: $white;
  transform: scale(1, 1);
  position: relative;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
  }
  &:before {
    content: "";
    position: absolute;
    top: 20%;
    left: 0;
    bottom: 0;
    right: 40%;
    z-index: -1;
    background-image: linear-gradient(
      to top right,
      rgba($gray, 0.45),
      rgba($gray, 0.45) 50%,
      transparent 50%,
      transparent
    );
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20%;
    top: 60%;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      to top left,
      rgba($gray, 0.45),
      rgba($gray, 0.45) 50%,
      transparent 50%,
      transparent
    );
  }
}

.profile-data {
  z-index: 1;
  position: relative;
  width: 100%;
  max-width: 100%;
  float: left;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: width, max-width;
  }
}

.profile-image {
  position: relative;
  transform: scale(1, 1);
  z-index: 1;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: transform, filter;
  }
  img {
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    &:nth-child(2) {
      opacity: 0;
    }
  }
  &::before {
    content: "";
    position: relative;
    display: block;
    padding-top: 100%;
  }
}

.profile-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: $black;
  padding: 5px;
  pointer-events: none;
  text-transform: uppercase;
  background: $white;
  margin: 0;
  opacity: 0;
  transform: translateY(100%);
  z-index: 2;
  @supports (mix-blend-mode: screen) {
    mix-blend-mode: screen;
    transition: 500ms ease;
    will-change: opacity transform;
  }
  @media (min-width: $xs) {
    font-size: 16px;
  }
  @media (min-width: $sm) {
    font-size: 20px;
    padding: 20px;
  }
}

.profile-wysiwyg {
  margin: 20px;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
}

.profile.active {
  z-index: 2;
  transition-delay: 0ms;
  .profile-inner {
    height: calc(200% + 5px);
    width: calc(200% + 5px);
    box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
    @media (min-width: $md) {
      height: calc(200% + 20px);
      width: calc(200% + 20px);
    }
  }
  .profile-content {
    overflow-y: auto;
    pointer-events: all;
  }
  .profile-data {
    width: 350px;
		max-width: 40%;
		@media (min-width: $md) {
			max-width: 50%;
		}
  }
  .profile-image {
    transform: scale(1, 1);
    margin: 20px 20px 10px;
    img {
      opacity: 0;
      &:nth-child(2) {
        opacity: 1;
      }
    }
  }
  .profile-name {
    transform: translateY(0);
    opacity: 0;
  }
  .profile-wysiwyg {
    opacity: 1;
    visibility: visible;
    @supports (mix-blend-mode: screen) {
      transition: 250ms 700ms ease;
    }
  }
  &:nth-child(2) {
    .profile-inner {
      top: 0;
      left: calc(-100% - 5px);
    }
  }
  &:nth-child(2n + 3) {
    .profile-inner {
      top: calc(-100% - 5px);
      left: 0;
    }
  }
  &:nth-child(2n + 4) {
    .profile-inner {
      top: calc(-100% - 5px);
      left: calc(-100% - 5px);
    }
  }
  @media (min-width: $md) {
    &:nth-child(2) {
      .profile-inner {
        top: 0;
        left: calc(-100% - 20px);
      }
    }
    &:nth-child(3) {
      .profile-inner {
        top: 0;
        left: calc(-200% - 40px);
      }
    }
    &:nth-child(3n + 4) {
      .profile-inner {
        top: calc(-100% - 20px);
        left: 0;
      }
    }
    &:nth-child(3n + 5) {
      .profile-inner {
        top: calc(-100% - 20px);
        left: calc(-100% - 20px);
      }
    }
    &:nth-child(3n + 6) {
      .profile-inner {
        top: calc(-100% - 20px);
        left: calc(-200% - 40px);
      }
    }
  }
}
</style>