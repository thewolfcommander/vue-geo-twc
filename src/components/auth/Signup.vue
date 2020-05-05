<template>

<div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
        <h2 class="center deep-purple-text">Signup</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email"  v-model="email" placeholder="something@example.com">
            <small v-if="email">Are you sure, your email is: <strong class="deep-purple-text">{{ email }}</strong></small>
        </div>
        <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password"  v-model="password" placeholder="Something@3896">
        </div>
        <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias"  v-model="alias" placeholder="John Doe" @keyup="make_slug">
            <small v-if="slug">You will be called as: <strong class="deep-purple-text">{{ this.slug }}</strong></small>
        </div>
        <p v-if="feedback" class="center"><small class="red-text">{{ feedback }}</small></p>
        <div class="field center"><button class="btn deep-purple">Signup</button></div>

        <p class="center">Already have an account? <strong class="deep-purple-text"><router-link :to="{ name: 'Login' }" class="deep-purple-text">Login</router-link></strong></p>
    </form>
</div>
    
</template>

<script>
import slugify from 'slugify'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            password: null,
            alias: '',
            feedback: null,
            slug: null,
        }
    },
    methods: {
        make_slug() {
            this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
        },
        signup() {
            if (this.alias && this.email && this.password) {
                this.make_slug()
                console.log(this.alias)
                console.log(this.slug)
                let ref = db.collection('users').doc(this.slug)

                ref.get().then(doc => {
                    if (doc.exists) {
                        this.feedback = 'This alias is already taken, try a different one.'
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            ref.set({
                                alias: this.alias,
                                geolocation: null,
                                user_id: cred.user.uid
                            })
                        })
                        .then(() => {
                            this.$router.push({name: 'GMap'})
                        })
                        .catch(err => {
                            console.log(err)
                            this.feedback = err.message
                        })
                        this.feedback = "Correct"
                    }
                })
                // this.feedback = null;
            } else {
                this.feedback = "You must provide all fields"
            }
        }
    }
}
</script>

<style>

.signup {
    max-width: 400px;
    margin-top: 60px;
}

.signup h2 {
    font-size: 2em;
}

.signup .field {
    margin-bottom: 16px;
}

</style>