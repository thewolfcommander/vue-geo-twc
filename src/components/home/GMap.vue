<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
export default {
    name: 'GMap',
    data() {
        return {
            lat: 20.5937,
            lng: 78.9629,
        }
    },
    methods: {
        renderMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false,
                satteliteViewControl: true,
            })
        }
    },
    mounted() {
        this.renderMap()
    }
}
</script>

<style>

.map .google-map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: #fff;
    margin: 0 auto;
}

</style>