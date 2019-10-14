<template lang="pug">
	div
		.map-popup(v-show="false")
			Markdown.map-content {{ location.popup }}
		.map
</template>

<script>
export default {
	props: ["location"],
  data() {
    return {
			styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5"
            }
          ]
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f5f5"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#bdbdbd"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#eeeeee"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#e5e5e5"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#dadada"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              color: "#e5e5e5"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#eeeeee"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#c9c9c9"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        }
      ]
    }
  },
  methods: {
    init() {
      const styles = this.styles
      const map = new google.maps.Map(this.$el.querySelector('.map'), {
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: false,
				center: this.location.coords,
				styles,
        zoom: 16
      })
      const infowindow = new google.maps.InfoWindow({
        content: this.$el.querySelector('.map-popup').innerHTML
      })
      const marker = new google.maps.Marker({
        map,
        position: this.location.coords,
        title: this.location.name
      })
      marker.addListener("click", function() {
        infowindow.open(map, marker)
      })
    }
	},
	mounted() {
		this.init()
	}
}
</script>

<style lang="scss">
.map-content {
	text-align: left;
	line-height: 1.6;
	h1,
	h2 {
		color: $indigo;
	}
	h1 {
		font-size: 16px;
	}
	h2 {
		font-size: 15px;
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

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>