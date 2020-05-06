<template>
    <div class="add-comment">
        <form @submit.prevent="addComment">
            <div class="field">
                <label for="comment">Add Comment to the feed</label>
                <input type="text" name="comment" placeholder="Hi, How are you?" v-model="comment">
            </div>
            <div class="field"><button class="btn deep-purple">Add</button></div>
            <p class="red-text" v-if="feedback">{{ this.feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'AddComment',
    props: ['auth_user'],
    data() {
        return {
            comment: null,
            feedback: null
        }
    },
    methods: {
        addComment() {
            if (this.comment) {
                db.collection('comments').add({
                    content: this.comment,
                    to: this.$route.params.id,
                    from: this.auth_user.id,
                    timestamp: Date.now()
                })
                .then(() => {
                    console.log("Its done")
                })
                .catch(err => {
                    this.feedback = err.message
                })
            } else {
                this.feedback = "You must provide input."
            }
            this.comment = null
        }
    }
}
</script>