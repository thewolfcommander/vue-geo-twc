<template>

    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <span class="brand-logo left">
                    <!-- <img src="@/assets/logo.png" width="90px"> -->
                    <router-link :to="{ name: 'GMap' }">
                        <i class="material-icons brand-icon">location_on</i>
                        <span>VueGeoTWC</span>
                    </router-link>
                </span>
                <ul class="right" v-if="auth_user">
                    <li>{{ auth_user.email }}</li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
                <ul class="right" v-else-if="!auth_user">
                    <li>
                        <router-link :to="{ name: 'Signup' }">Signup</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Login' }">Login</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data() {
        return {
            auth_user: null,
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.auth_user = user
            } else {
                this.auth_user = null
            }
        })
    },
    methods: {
        logout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({name: 'Login'})
                this.auth_user = null
            })
            .catch(err => {
                alert(`Unable to logout at the moment. ${err}`)
            })
        }
    }
}
</script>

<style>

.navbar {
    z-index: 1001;
}

.navbar .brand-icon {
    font-size: 1.8em;
}

</style>