<template lang="pug">
  router-view
</template>

<static-query>
</static-query>

<script>
export default {
  name: "Academy"
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Archivo:700|Overpass:300,400,700&display=swap");

html {
  font-size: 16px;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: "Overpass", serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4;
  background: $gray;
}

main {
	z-index: 1;
	padding-bottom: 80px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Archivo", sans-serif;
  font-weight: 700;
}
</style>