<template lang="pug">
	aside.note(:class="{active, dismissed}")
		.note-icon
			i.far.fa-bell
		.note-content
			h6.note-title Our Lakewood Office is moving!
			p.note-copy Starting November 4th we will be located at <strong>3333 S. Wadsworth Blvd # B102, Lakewood, CO 80235</strong>
		.note-close(@click="dismiss")
			i.fas.fa-times-circle
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      active: true,
      dismissed: false
    };
  },
  methods: {
    activate() {
      let dismissed = window.sessionStorage.getItem("dismissed")
        ? !!window.sessionStorage.getItem("dismissed")
        : false;
      if (!dismissed) {
        this.active = true;
      }
    },
    dismiss() {
      this.active = false;
      this.dismissed = true;
      setTimeout(() => {
        this.dismissed = false;
      }, 50);
      window.sessionStorage.setItem("dismissed", "true");
    }
  },
  created() {
		if (process.isClient) this.activate()
  }
};
</script>

<style lang="scss">
@keyframes enter {
	0% {
    transform: translate(-50%, -150%);
	}
  70% {
    transform: translate(-50%, 20px);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg) scale(1, 1);
  }

  1% {
    transform: rotate(8deg) scale(1.05, 1.05);
  }

  3% {
    transform: rotate(-16deg) scale(1.1, 1.1);
  }

  5% {
    transform: rotate(10deg) scale(1.125, 1.125);
  }

  7% {
    transform: rotate(-8deg) scale(1.175, 1.175);
  }

  9% {
    transform: rotate(3deg) scale(1.175, 1.175);
  }

  15% {
    transform: rotate(0deg) scale(1.175, 1.175);
    color: $orange;
  }

  18% {
    transform: rotate(0deg) scale(1, 1);
    color: $red;
  }
}

.note {
  display: flex;
  position: fixed;
  top: 30px;
  width: 800px;
  max-width: calc(100% - 40px);
  background: $white;
  padding: 15px 20px;
  color: $onyx;
  left: 50%;
  transform: translate(-50%, -150%);
  z-index: 25;
  box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
  transition: 0.25s ease;
  &.active {
    transition: none;
    animation: enter 0.4s 1.5s forwards ease;
  }
  &.dismissed {
    transform: translate(-50%, 0);
  }
}

.note-icon {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: $red;
  i {
    font-size: 34px;
    transform-origin: 50% 50%;
    animation: wiggle 5.5s 1.8s infinite ease;
  }
}

.note-content {
  flex: 1 1 100%;
}

.note-title {
  font-size: 16px;
  margin-bottom: 3px;
}

.note-copy {
  font-style: italic;
  font-size: 14px;
}

.note-close {
  flex: 0 0 auto;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.1s ease;
  align-self: flex-start;
  i {
    font-size: 20px;
  }
  &:hover {
    color: $red;
  }
}
</style>