<template>

<div class="login container">
    <form class="card-panel" @submit.prevent="login">
        <h2 class="center deep-purple-text">Login</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email"  v-model="email" placeholder="something@example.com">
            <small v-if="email">Are you sure, your email is: <strong class="deep-purple-text">{{ email }}</strong></small>
        </div>
        <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password"  v-model="password" placeholder="Something@3896">
        </div>
        <p v-if="feedback" class="center"><small class="red-text">{{ feedback }}</small></p>
        <div class="field center"><button class="btn deep-purple">Login</button></div>
        <p class="center">Don't have an account? <strong><router-link :to="{ name: 'Signup' }" class="deep-purple-text">Signup</router-link></strong></p>
    </form>
</div>
    
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            feedback: null,
            auth_user: null
        }
    },
    methods: {
        login() {
            if (this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.auth_user = cred.user
                    this.$router.push({name: 'GMap', params: { auth_user: this.auth_user }})
                    this.feedback = null
                })
                .catch(err => {
                    this.feedback = err.message
                })
            } else {
                this.feedback = 'You must provide all the fields'
            }
        }
    }
}
</script>

<style>

a {
    color: inherit;
}

.login {
    max-width: 400px;
    margin-top: 60px;
}

.login h2 {
    font-size: 2em;
}

.login .field {
    margin-bottom: 16px;
}

</style>