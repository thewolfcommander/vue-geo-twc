<template>

    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <span class="brand-logo left">
                    <!-- <img src="@/assets/logo.png" width="90px"> -->
                    <router-link :to="{ name: 'GMap' }">
                        <span>VueGeoTWC</span>
                    </router-link>
                </span>
                <ul class="right">
                    <li>
                        <router-link :to="{ name: 'Signup' }">Signup</router-link>
                    </li>
                    <li>
                        <router-link to="">Login</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {

        }
    }
}
</script>

<style>

.navbar {
    z-index: 1001;
}

</style>