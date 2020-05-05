<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'GMap',
    data() {
        return {
            lat: 20.5937,
            lng: 78.9629,
        }
    },
    props: [
        'auth_user'
    ],
    methods: {
        renderMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 21,
                minZoom: 3,
                streetViewControl: false,
                satteliteViewControl: true,
            })

            db.collection('users').get()
            .then(users => {
                users.docs.forEach(doc => {
                    let user = doc.data()

                    if (user.geolocation) {
                        let marker = new google.maps.Marker({
                            position: {
                                lat: user.geolocation.lat,
                                lng: user.geolocation.lng
                            },
                            map
                        })

                        marker.addListener('click', () => {
                            this.$router.push({ name: 'ViewProfile', params: { id: doc.id }})
                        })
                    }
                })
            })
        }
    },
    mounted() {
        let user = firebase.auth().currentUser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        db.collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: this.lat,
                                lng: this.lng
                            }
                        })
                    })
                }).then(() => {
                    this.renderMap()
                })

                this.renderMap()
            }, err => {
                console.log(err)
                this.renderMap()
            }, {maximumAge: 60000, timeout: 3000})
        } else {
            this.renderMap()
        }
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