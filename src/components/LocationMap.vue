<template lang="pug">
div
  .map
    iframe(
      loading="lazy",
      allowfullscreen,
      :src="`https://www.google.com/maps/embed/v1/place?key=${key}&q=place_id:${place_id}`"
    ) 
</template>

<script>
export default {
  name: "LocationMap",
  props: ["place_id"],
  data() {
    return {
      key: "AIzaSyASR1_xXVYFzx5OvmeFjCc7j29-PD5KrYc",
    };
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: none;
  }
}

.map-content {
  text-align: left;
  line-height: 1.5;
  h1 {
    font-size: 16px;
    color: $indigo;
  }
  h2 {
    font-size: 14px;
    color: $teal;
  }
  em {
    color: lighten($onyx, 15%);
    font-size: 12px;
  }
  a {
    color: $teal;
    text-decoration: underline;
    font-size: 12px;
  }
}
</style>