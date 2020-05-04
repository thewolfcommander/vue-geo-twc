<template>

    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <span class="brand-logo left">
                    <router-link to="">
                        GeoNinjas
                    </router-link>
                </span>
                <ul class="right">
                    <li>
                        <router-link>Signup</router-link>
                    </li>
                    <li>
                        <router-link>Login</router-link>
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



</style>