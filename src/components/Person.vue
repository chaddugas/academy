<template lang="pug">
	.person(v-if="title" :class="{title}")
		h2.section-title
			span Meet 
			span Our
			span Staff
	.person(v-else, :class="{active}")
		.person-profile(@click="toggle")
			.profile-content
				.profile-data
					.profile-image
						img(:src="`//i.pravatar.cc/${500+person}`")
					.profile-name
						h3 Someone Somebody
				.profile-wysiwyg
					h3 Dr. Someone Somebody
					p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum ut. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Tempus quam pellentesque nec nam aliquam sem. Blandit libero volutpat sed cras ornare arcu dui vivamus arcu. Leo integer malesuada nunc vel risus commodo viverra maecenas. Ut enim blandit volutpat maecenas volutpat blandit aliquam. Amet consectetur adipiscing elit ut aliquam. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Massa vitae tortor condimentum lacinia. Etiam tempor orci eu lobortis. Amet mauris commodo quis imperdiet. Id leo in vitae turpis massa sed elementum tempus egestas. At tellus at urna condimentum mattis. Nullam vehicula ipsum a arcu.
					p Nisi scelerisque eu ultrices vitae auctor eu augue. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Eu facilisis sed odio morbi quis commodo odio aenean. Massa sed elementum tempus egestas sed sed risus. Mi eget mauris pharetra et. Tortor consequat id porta nibh venenatis. Laoreet sit amet cursus sit amet dictum sit amet. Massa tempor nec feugiat nisl pretium fusce id velit ut. Ut ornare lectus sit amet. Id donec ultrices tincidunt arcu non. Cras pulvinar mattis nunc sed blandit libero volutpat. Gravida arcu ac tortor dignissim. Viverra suspendisse potenti nullam ac. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris.
					p Auctor urna nunc id cursus metus. Diam sit amet nisl suscipit adipiscing. Eu facilisis sed odio morbi quis commodo odio aenean sed. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Ut consequat semper viverra nam libero justo laoreet sit. Purus sit amet luctus venenatis lectus. Quam pellentesque nec nam aliquam. Donec adipiscing tristique risus nec feugiat in. Morbi tristique senectus et netus et malesuada fames ac turpis. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Cursus risus at ultrices mi tempus imperdiet. Non sodales neque sodales ut etiam. Libero enim sed faucibus turpis in eu. Est ultricies integer quis auctor. Cursus euismod quis viverra nibh cras pulvinar mattis. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Non enim praesent elementum facilisis. Est placerat in egestas erat imperdiet sed euismod nisi. Non odio euismod lacinia at quis risus.
					p Cursus sit amet dictum sit amet justo. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Cum sociis natoque penatibus et magnis. Tincidunt ornare massa eget egestas purus viverra. Semper viverra nam libero justo laoreet sit. Nam at lectus urna duis convallis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Massa tempor nec feugiat nisl pretium fusce id velit ut. Convallis convallis tellus id interdum. Fringilla est ullamcorper eget nulla. Malesuada fames ac turpis egestas integer eget aliquet. Eros donec ac odio tempor orci dapibus. Viverra maecenas accumsan lacus vel facilisis volutpat est.
					p Netus et malesuada fames ac turpis. Arcu ac tortor dignissim convallis aenean. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Fames ac turpis egestas integer eget aliquet nibh praesent. Viverra vitae congue eu consequat ac felis donec et odio. Elit pellentesque habitant morbi tristique senectus et. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Lacus laoreet non curabitur gravida arcu. Id porta nibh venenatis cras. Orci dapibus ultrices in iaculis nunc. Eget nullam non nisi est sit amet facilisis magna. Volutpat sed cras ornare arcu dui vivamus. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Scelerisque purus semper eget duis at tellus. Sed faucibus turpis in eu mi. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Arcu dui vivamus arcu felis bibendum. In iaculis nunc sed augue. Aenean sed adipiscing diam donec adipiscing tristique. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan.
					p Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Erat imperdiet sed euismod nisi. Quam nulla porttitor massa id. Porta non pulvinar neque laoreet suspendisse. Ut morbi tincidunt augue interdum. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet facilisis magna etiam tempor. Velit laoreet id donec ultrices. Volutpat commodo sed egestas egestas fringilla. Pellentesque habitant morbi tristique senectus et. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Quisque egestas diam in arcu cursus euismod quis. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Aliquam ultrices sagittis orci a scelerisque. Luctus venenatis lectus magna fringilla urna. Id faucibus nisl tincidunt eget nullam non.
					p Et sollicitudin ac orci phasellus egestas tellus. Fusce ut placerat orci nulla pellentesque dignissim enim. Dictum varius duis at consectetur lorem. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. Sagittis nisl rhoncus mattis rhoncus. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Arcu bibendum at varius vel. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Cursus turpis massa tincidunt dui ut. Dolor morbi non arcu risus quis varius quam quisque id. Eget nunc lobortis mattis aliquam faucibus. Volutpat diam ut venenatis tellus. Id diam vel quam elementum.
					p Pellentesque habitant morbi tristique senectus et netus et. Suspendisse faucibus interdum posuere lorem ipsum dolor. Volutpat diam ut venenatis tellus in metus vulputate. Integer malesuada nunc vel risus commodo viverra maecenas. Duis at consectetur lorem donec massa sapien faucibus et molestie. Eget aliquet nibh praesent tristique magna sit amet. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Nulla facilisi etiam dignissim diam. Senectus et netus et malesuada. Tortor at auctor urna nunc id cursus metus aliquam. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Erat velit scelerisque in dictum non consectetur a. Neque sodales ut etiam sit amet nisl purus. Dui ut ornare lectus sit amet est. In nisl nisi scelerisque eu.
					p Gravida quis blandit turpis cursus in hac. Id consectetur purus ut faucibus pulvinar. Justo donec enim diam vulputate ut pharetra sit amet. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Pretium quam vulputate dignissim suspendisse in est ante in nibh. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Id aliquet lectus proin nibh nisl condimentum id venenatis. Faucibus scelerisque eleifend donec pretium. Dignissim sodales ut eu sem integer vitae justo. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet.
					p Nec feugiat in fermentum posuere urna nec. Feugiat in ante metus dictum at tempor commodo. A lacus vestibulum sed arcu non odio. Proin nibh nisl condimentum id venenatis a condimentum. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Purus in massa tempor nec feugiat. Fringilla ut morbi tincidunt augue interdum velit. Interdum velit euismod in pellentesque. Sagittis vitae et leo duis ut diam quam nulla porttitor. Sit amet nisl suscipit adipiscing. Ultrices tincidunt arcu non sodales neque. Cursus in hac habitasse platea dictumst quisque sagittis purus. Ridiculus mus mauris vitae ultricies leo integer malesuada. Sed augue lacus viverra vitae congue eu consequat ac. Turpis nunc eget lorem dolor sed viverra ipsum. Arcu vitae elementum curabitur vitae. Cursus euismod quis viverra nibh. Id consectetur purus ut faucibus pulvinar elementum.
		
</template>

<script>
export default {
  name: "Person",
  props: ["title", "person"],
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggle() {
      this.$el.querySelector(".profile-content").scrollTop = 0
      if (this.active) return (this.active = false);

      let grid = this.$el.closest(".grid");
      let items = [...grid.querySelectorAll(".person")];
      let top = 0;

      if (window.matchMedia("(min-width: 850px)").matches) {
        if (items.indexOf(this.$el) < 9) {
          top = grid.getBoundingClientRect().top;
        } else {
          top = items[items.indexOf(this.$el) - 6].getBoundingClientRect().top - 30;
        }
      } else {
        if (items.indexOf(this.$el) < 4) {
          top = grid.getBoundingClientRect().top;
        } else {
          top =
            items[items.indexOf(this.$el) - 2].getBoundingClientRect().top - 20;
        }
      }

      this.active = true;
      window.scrollBy({
        top,
        behavior: "smooth"
      });
    },
    close(e) {
      let closest = e.target.closest(".person");
      if (!e.target.closest(".person") || closest != this.$el) {
        this.active = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  }
};
</script>

<style lang="scss" scoped>
$gap: 20px;
$grow_time: 0.5s;
$fade_time: 0.15s;
$hover_time: 0.25s;

.person.title {
  grid-area: span 1 / span 1;
  background: darken($indigo, 5%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  color: $white;
  &:before {
    display: none;
  }
  @media (min-width: $xs) {
    padding: 30px;
  }
  @media (min-width: $sm) {
    padding: 40px;
  }
}

.section-title {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  line-height: 1.1;
  text-transform: uppercase;
  @media (min-width: $xs) {
    font-size: 28px;
  }
  @media (min-width: $sm) {
    font-size: 45px;
  }
  @media (min-width: $md) {
    font-size: 50px;
    line-height: 1.2;
  }
  @media (min-width: $lg) {
    font-size: 55px;
  }
  @media (min-width: $xl) {
    font-size: 65px;
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}

.person {
  grid-area: span 1 / span 1;
  position: relative;
  z-index: -1;
  transition: z-index 0ms linear;
  transition-delay: 500ms;
  &:before {
    content: "";
    display: block;
    position: relative;
    padding-top: 100%;
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
  background: $white;
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
				filter: grayscale(60%) brightness(50%);
			}
		}
	}
}

.profile-content {
  height: 100%;
  width: 100%;
  transition: 500ms ease;
  overflow-y: auto;
  pointer-events: none;
  background-color: $white;
  background-image: inherit;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
  transform: scale(1, 1);
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
	filter: grayscale(0%) brightness(100%);
	will-change: transform, filter;
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
	@include wysiwyg;
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
    @media (min-width: $md) {
      height: calc(300% + 40px);
      width: calc(300% + 40px);
    }
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
    filter: none;
		margin-right: 20px;
		margin-bottom: 10px;
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
    &:nth-child(4) {
      .person-profile {
				top: calc(-100% - 20px);
				left: 0;
      }
    }
    &:nth-child(5) {
      .person-profile {
				top: calc(-100% - 20px);
				left: calc(-100% - 20px);
      }
    }
    &:nth-child(6) {
      .person-profile {
				top: calc(-100% - 20px);
				left: calc(-200% - 40px);
      }
    }
    &:nth-child(3n + 7) {
      .person-profile {
				top: calc(-200% - 40px);
				left: 0;
      }
    }
    &:nth-child(3n + 8) {
      .person-profile {
				top: calc(-200% - 40px);
				left: calc(-100% - 20px);
      }
    }
    &:nth-child(3n + 9) {
      .person-profile {
				top: calc(-200% - 40px);
				left: calc(-200% - 40px);
      }
    }
  }
}
</style>