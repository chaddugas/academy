<template lang="pug">
	section#locations.locations
		.locations-inner 
			.location(v-for="(office, index) in locations")
				.location-map
					app-location-map(:place_id="placeID(index)")
				.location-content
					h2.location-title 
						span {{ office.title }}
						a(:href="`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`", target="_blank") directions
					.location-address
						span(v-for="line in address(office.address)") {{ line }}
					.location-phone 
						i.fas.fa-phone
						a(:href="`tel:${office.phone.replace(/ /g,'').replace(/\-/g,'')}`") {{ office.phone }}
					.location-fax
						i.fas.fa-file-contract
						span {{ office.fax }}
					.location-hours
						span.location-hour(v-for="hour in office.hours")
							strong {{ hour.title.substring(0, 2) }}
							span {{ timeString(hour) }}
					.location-note(v-if="office.note")
						span {{ office.note }}
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
      resolve: null,
      reject: null,
      initialized: false,
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
    address(addr) {
      return addr.split(/\n+?/);
    },
    placeID(index) {
      if (index === 0) {
        return "ChIJs-wMJWKDbIcRUdHt3qJH5KA";
      }
      else {
        return "ChIJAZAAqCyAa4cRe-9_3uYos38";
      }
    },
    timeString(hour) {
      let open = hour.open.split(/ |\:/);
      let close = hour.close.split(/ |\:/);
      let str;
      str = `${open[0]}${open[1] == "00" ? "" : `:${open[1]}`} - `;
      str += `${close[0]}${close[1] == "00" ? "" : `:${close[1]}`}`;
      return str;
    }
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
						note
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
						note
					}
				}
			}
		}
	}
</static-query>

<style lang="scss">
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
    flex-direction: row;
    padding: 30px 0 60px;
    &:last-child {
      padding-bottom: 30px;
    }
    &:nth-child(even) {
      text-align: right;
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
				order: -1;
				margin-left: 0;
				margin-right: 20px;
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
	order: -1;
  position: relative;
  min-height: 200px;
  margin-bottom: 20px;
  flex: 1 1 auto;
  @media (min-width: $md) {
		order: 1;
    margin-left: 20px;
    margin-bottom: 0;
  }
}

.location-content {
	flex: 0 0 auto;
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
	width: 100%;
	margin-bottom: 10px;
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

.location-note {
	font-size: 14px;
	&::before {
		content: '*'
	}
}
</style>