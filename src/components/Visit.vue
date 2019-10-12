<template lang="pug">
	section#visit.visit
		.visit-inner 
			.visit-item(v-for="loc in locations")
				.visit-map
					app-map(v-if="ready", :location="loc")
				.visit-content
					h2.visit-title {{ loc.name }}
					.visit-address
						span(v-for="line in loc.address") {{ line }}
						a(@click="directions(loc)") Get Directions
					.visit-phone {{ loc.phone }}
					.visit-fax {{ loc.fax }}
					.visit-hours
						span.visit-hour(v-for="hour in loc.hours")
							strong {{ hour.day.substring(0, 2) }}
							span {{ timeString(hour) }}
</template>

<script>
import ID from "@/mixins/ID";
import Map from "./Map";
export default {
  name: "Visit",
  mixins: [ID],
  components: {
    appMap: Map
  },
  data() {
    return {
      key: "AIzaSyC6Ojv2UazcgzgWHc4y00j6kwRjRpMdwxI",
      resolve: null,
      reject: null,
      initialized: false,
      ready: false,
      mapPromise: null,
      locations: [
        {
          coords: { lat: 39.529038, lng: -104.941598 },
          name: "Highlands Ranch Office",
          address: [
            "4185 E. Wildcat Reserve Parkway",
            "Suite #230",
            "Highlands Ranch, CO 80126"
          ],
          phone: "303 996-0730",
          fax: "303 996-0732",
          hours: [
            {
              day: "Monday",
              open: { hour: 8, minute: 30 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Tuesday",
              open: { hour: 8, minute: 0 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Wednesday",
              open: { hour: 8, minute: 0 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Thursday",
              open: { hour: 8, minute: 0 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Friday",
              open: { hour: 8, minute: 0 },
              close: { hour: 5, minute: 0 }
            }
          ],
          popup: "<h1>test</h1>"
        },
        {
          coords: { lat: 39.650403, lng: -105.078522 },
          name: "Lakewood Office",
          address: [
            "7373 West Jefferson Ave",
            "Suite #102",
            "Lakewood, CO 80235"
          ],
          phone: "303 996-0730",
          fax: "303 996-0732",
          hours: [
            {
              day: "Monday",
              open: { hour: 8, minute: 30 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Tuesday",
              open: { hour: 8, minute: 30 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Wednesday",
              open: { hour: 8, minute: 30 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Thursday",
              open: { hour: 8, minute: 30 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Friday",
              open: { hour: 8, minute: 30 },
              close: { hour: 5, minute: 0 }
            },
            {
              day: "Saturday",
              open: { hour: 8, minute: 30 },
              close: { hour: 10, minute: 30 }
            }
          ],
          popup: "<h1>test</h1>"
        }
      ]
    };
  },
  methods: {
    directions(loc) {
      let params = {}

      // window.location.href = 'https://www.google.com/maps/dir/?api=1&parameters'
    },
    createMapPromise() {
      this.mapPromise = new Promise((res, rej) => {
        this.resolve = res
        this.reject = rej
			})
			this.initialized = !!window.google
      this.prepareMaps()
    },
    prepareMaps() {
      if (this.initialized) return this.mapPromise
      this.initialized = true
      window[this.id] = () => (
        (this.ready = true), this.resolve(window.google)
      )

      const script = document.createElement("script")
      script.async = true
      script.defer = true
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.key}&callback=${this.id}`
      script.onerror = this.reject
      document.head.appendChild(script)
    },
    timeString(hour) {
      let timeString = hour.open.hour
      if (hour.open.minute > 0) timeString += `${hour.open.minute}`
      timeString += ` - `
      timeString += hour.close.hour
      if (hour.close.minute > 0) timeString += `${hour.close.minute}`
      return timeString
    }
  },
  mounted() {
    if (process.isClient) this.createMapPromise();
  }
};
</script>


<style lang="scss">
.visit {
  margin-bottom: 80px;
}
.visit-inner {
  @include container($max: 1200px);
  position: relative;
  background: $white;
  padding: 20px 50px;
  z-index: 1;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 30%;
    right: 60%;
    z-index: -1;
    background-image: linear-gradient(
      to bottom right,
      rgba($gray, 0.35),
      rgba($gray, 0.35) 50%,
      transparent 50%,
      transparent
    );
    content: "";
  }
  &:after {
    position: absolute;
    top: 0;
    left: 10%;
    bottom: 70%;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      to bottom left,
      rgba($gray, 0.35),
      rgba($gray, 0.35) 50%,
      transparent 50%,
      transparent
    );
    content: "";
  }
}

.visit-item {
  display: grid;
  grid-template: auto / max-content 1fr;
  border-bottom: 1px solid $gray;
  grid-gap: 40px;
  padding: 30px 0 60px;
  margin-bottom: 30px;
  justify-content: space-between;
  text-align: left;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 30px;
  }
  &:nth-child(even) {
    text-align: right;
    grid-template: auto / 1fr max-content;
    .visit-map {
      grid-area: 1 / 1 / 2 / 2;
    }
    .visit-hours {
      justify-content: flex-end;
    }
    .visit-hour {
      justify-content: flex-end;
    }
  }
}

.visit-map {
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
}

.visit-content {
  display: flex;
  flex-direction: column;
  color: $onyx;
}

.visit-title {
  font-size: 22px;
  margin-bottom: 10px;
}

.visit-address,
.visit-contact {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  span {
    margin-bottom: 2px;
  }
}

.visit-hours {
  display: flex;
  flex-wrap: wrap;
  max-width: 250px;
  justify-content: flex-start;
  align-self: flex-end;
  margin-top: 10px;
}

.visit-hour {
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  strong {
    display: block;
    margin-right: 5px;
    width: 25px;
  }
}
</style>