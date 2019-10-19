<template lang="pug">
	section#locations.locations
		.locations-inner 
			.location(v-for="office in locations")
				.location-map
					app-location-map(v-if="ready", :location="map(office)")
				.location-content
					h2.location-title 
						span {{ office.title }}
						a(:href="`https://www.google.com/maps/dir//Academy+Park+Pediatrics/@${office.lat},${office.long}`", target="_blank") directions
					.location-address
						span(v-for="line in address(office.address)") {{ line }}
					.location-phone 
						i.fas.fa-phone
						span {{ office.phone }}
					.location-fax
						i.fas.fa-file-contract
						span {{ office.fax }}
					.location-hours
						span.location-hour(v-for="hour in office.hours")
							strong {{ hour.title.substring(0, 2) }}
							span {{ timeString(hour) }}
</template>

<script>
import ID from "@/mixins/ID";
import LocationMap from "./LocationMap";
export default {
  name: "Locations",
  mixins: [ID],
  components: {
    appLocationMap: LocationMap
  },
  data() {
    return {
      key: "AIzaSyC6Ojv2UazcgzgWHc4y00j6kwRjRpMdwxI",
      resolve: null,
      reject: null,
      initialized: false,
      ready: false,
      mapPromise: null
    };
  },
  computed: {
    locations() {
      return [
        JSON.parse(JSON.stringify(this.$static.office.edges[0].node.highlands)),
        JSON.parse(JSON.stringify(this.$static.office.edges[0].node.lakewood))
      ];
    }
  },
  methods: {
    createMapPromise() {
      this.mapPromise = new Promise((res, rej) => {
        this.resolve = res;
        this.reject = rej;
      });
      this.initialized = !!window.google;
      this.prepareMaps();
    },
    prepareMaps() {
      if (this.initialized) return;
      this.initialized = true;
      window[this.id] = () => (
        (this.ready = true), this.resolve(window.google)
      );

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.key}&callback=${this.id}`;
      script.onerror = this.reject;
      document.head.appendChild(script);
      return;
    },
    address(addr) {
      return addr.split(/\n+?/);
    },
    map(office) {
      return {
        coords: {
          lat: parseFloat(office.lat),
          lng: parseFloat(office.lng)
        },
        popup: office.popup,
        name: office.name
      };
    },
    timeString(hour) {
      let open = hour.open.split(/ |\:/);
      let close = hour.close.split(/ |\:/);
      let str;
      str = `${open[0]}${open[1] == "00" ? "" : `:${open[1]}`} - `;
      str += `${close[0]}${close[1] == "00" ? "" : `:${close[1]}`}`;
      return str;
    }
  },
  mounted() {
    if (process.isClient) this.createMapPromise();
  }
};
</script>

<static-query>
	query {
		office: allOffice {
			edges {
				node {
					highlands {
						title
						address
						phone
						fax
						lng
						lat
						popup
						hours {
							title
							open
							close
						}
					}
					lakewood {
						title
						address
						phone
						fax
						lng
						lat
						popup
						hours {
							title
							open
							close
						}
					}
				}
			}
		}
	}
</static-query>

<style lang="scss">
.locations {
  margin: 50px 0 80px;
}
.locations-inner {
  @include container($max: 1200px);
  position: relative;
  background: $white;
  padding: 20px 30px;
  z-index: 1;
  @media (min-width: $md) {
    padding: 20px 50px;
  }
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

.location {
  display: flex;
  flex-direction: column;
  padding: 15px 0 30px;
  margin-bottom: 15px;
  justify-content: space-between;
  border-bottom: 1px solid $gray;
  text-align: left;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 15px;
  }
  @media (min-width: $md) {
    display: grid;
    grid-template: auto / max-content 1fr;
    grid-gap: 40px;
    padding: 30px 0 60px;
    &:last-child {
      padding-bottom: 30px;
    }
    &:nth-child(even) {
      text-align: right;
      grid-template: auto / 1fr max-content;
      .location-title {
        align-items: flex-end;
        a::after {
          left: 100%;
          right: 0;
        }
        &:hover a::after {
          left: 0;
          right: 0;
        }
      }
      .location-map {
        grid-area: 1 / 1 / 2 / 2;
      }
      .location-phone,
      .location-fax {
				justify-content: flex-end;
				i {
					order: 1;
					margin-right: 0;
					margin-left: 5px;
				}
      }
      .location-hours {
        justify-content: flex-end;
      }
      .location-hour {
        justify-content: flex-end;
      }
    }
  }
}

.location-map {
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
  min-height: 200px;
  order: -1;
  margin-bottom: 20px;
  @media (min-width: $md) {
    margin-bottom: 0;
  }
}

.location-content {
  display: flex;
  flex-direction: column;
  color: $onyx;
}

.location-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    font-size: 22px;
  }
  a {
    margin: -3px 0 10px;
    color: lighten($onyx, 20%);
    font-size: 14px;
    position: relative;
		transition: 0.5s ease;
		font-family: $body;
    &::before {
      content: "";
      position: absolute;
      top: calc(100% - 2px);
      left: 0;
      right: 0;
      height: 2px;
      background: $orange;
    }
    &::after {
      content: "";
      position: absolute;
      top: calc(100% - 2px);
      left: 0;
      right: 100%;
      height: 2px;
      background: $teal;
      transition: 0.5s ease;
    }
    &:hover {
      &::after {
        right: 0;
      }
    }
  }
}

.location-address,
.location-contact {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  span {
    margin-bottom: 2px;
  }
}

.location-phone,
.location-fax {
  display: flex;
  i {
		text-align: center;
		width: 18px;
    margin-right: 5px;
  }
}

.location-hours {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  @media (min-width: $md) {
    max-width: 250px;
    justify-content: flex-start;
    align-self: flex-end;
  }
}

.location-hour {
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