<template lang="pug">
	.person(:class="{active}", :style="`background-image: url(${profile.photo})`", @click.self="active = false")
		.person-profile(@click="toggle")
			.profile-content
				.profile-data
					.profile-image
						img(:src="profile.photo")
					.profile-name
						h3 {{ profile.title }}
				Markdown.profile-wysiwyg {{ profile.bio }}
		
</template>

<script>
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
      if (process.isClient) {
        this.$el.querySelector(".profile-content").scrollTop = 0;
        if (this.active) return (this.active = false);

        let grid = this.$el.closest(".grid");
        let items = [...grid.querySelectorAll(".person")];
        let top = 0;

        if (window.matchMedia("(min-width: 850px)").matches) {
          if (items.indexOf(this.$el) < 5) {
            top = grid.getBoundingClientRect().top;
          } else {
            top =
              items[items.indexOf(this.$el) - 3].getBoundingClientRect().top -
              30;
          }
        } else {
          if (items.indexOf(this.$el) < 3) {
            top = grid.getBoundingClientRect().top;
          } else {
            top =
              items[items.indexOf(this.$el) - 2].getBoundingClientRect().top -
              20;
          }
        }

        this.active = true;
        window.scrollBy({
          top,
          behavior: "smooth"
        });
      }
    },
    close(e) {
      let closest = e.target.closest(".person");
      if (!e.target.closest(".person") || closest != this.$el) {
        this.active = false;
      }
    }
  },
  mounted() {
    if (process.isClient) {
      document.addEventListener("click", this.close);
    }
  },
  beforeDestroy() {
    if (process.isClient) {
      document.removeEventListener("click", this.close);
    }
  }
};
</script>

<style lang="scss" scoped>
.person {
  grid-area: span 1 / span 1;
  position: relative;
  z-index: -1;
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
}

.person-profile {
  display: flex;
  position: absolute;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
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
        filter: grayscale(0%);
      }
    }
  }
}

.profile-content {
  height: 100%;
  width: 100%;
  transition: 500ms ease;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: none;
  background-color: $white;
  transform: scale(1, 1);
  position: relative;
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
  transition: 500ms ease;
  float: left;
  will-change: width, max-width;
}

.profile-image {
  position: relative;
  transition: 500ms ease;
  transform: scale(1, 1);
  will-change: transform, filter;
  z-index: 1;
  img {
    max-width: 100%;
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
  transition: 500ms ease;
  text-transform: uppercase;
  mix-blend-mode: screen;
  background: $white;
  margin: 0;
  opacity: 0;
  transform: translateY(100%);
  z-index: 2;
  will-change: opacity transform;
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

.person.active {
  z-index: 2;
  transition-delay: 0ms;
  .person-profile {
    height: calc(200% + 20px);
    width: calc(200% + 20px);
    box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
  }
  .profile-content {
    pointer-events: all;
  }
  .profile-data {
    width: 350px;
    max-width: 40%;
  }
  .profile-image {
    transform: scale(1, 1);
    margin: 20px 20px 10px;
  }
  .profile-name {
    transform: translateY(0);
    opacity: 0;
  }
  .profile-wysiwyg {
    opacity: 1;
    visibility: visible;
    transition: 250ms 700ms ease;
  }
  &:nth-child(2) {
    .person-profile {
      top: 0;
      left: calc(-100% - 20px);
    }
  }
  &:nth-child(2n + 3) {
    .person-profile {
      top: calc(-100% - 20px);
      left: 0;
    }
  }
  &:nth-child(2n + 4) {
    .person-profile {
      top: calc(-100% - 20px);
      left: calc(-100% - 20px);
    }
  }
  @media (min-width: $md) {
    &:nth-child(2) {
      .person-profile {
        top: 0;
        left: calc(-100% - 20px);
      }
    }
    &:nth-child(3) {
      .person-profile {
        top: 0;
        left: calc(-200% - 40px);
      }
    }
    &:nth-child(3n + 4) {
      .person-profile {
        top: calc(-100% - 20px);
        left: 0;
      }
    }
    &:nth-child(3n + 5) {
      .person-profile {
        top: calc(-100% - 20px);
        left: calc(-100% - 20px);
      }
    }
    &:nth-child(3n + 6) {
      .person-profile {
        top: calc(-100% - 20px);
        left: calc(-200% - 40px);
      }
    }
  }
}
</style>