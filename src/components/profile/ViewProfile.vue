<template>
    <div class="container view-profile">
        <div class="card">
            <h2 class="deep-purple-text center"><span v-if="profile">{{ profile.alias }}'s</span> Wall</h2>
            <AddComment :auth_user="auth_user" />

            <div class="card-footer">
                <ul class="collection comments">
                    <li v-for="comment in comments" :key="comment.id" class="comment">
                        <p class="comment-content">{{ comment.content }}</p>
                        <small class="deep-purple-text">By <router-link :to="{ name: 'ViewProfile', params: {id: comment.from} }"><strong class="deep-orange-text">{{ comment.from }}</strong></router-link> at <span class="grey-text">{{ comment.timestamp }}</span></small>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import db from '@/firebase/init'
import AddComment from '@/components/profile/AddComment'

export default {
    name: 'ViewProfile',
    data() {
        return {
            profile: null,
            auth_user: null,
            comments: []
        }
    },
    components: {
        AddComment
    },
    created() {
        let ref = db.collection('users')

        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data()
        })

        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.auth_user = doc.data()
                this.auth_user.id = doc.id
            })
        }).catch(err => {
            console.log(err)
        })

        let com = db.collection('comments').where('to', '==', this.$route.params.id).orderBy('timestamp')

        com.onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                let doc = change.doc

                this.comments.push({
                    id: doc.id,
                    content: doc.data().content,
                    from: doc.data().from,
                    to: doc.data().to,
                    timestamp: moment(doc.data().timestamp).format('lll')
                })
            })
        })
    }
}
</script>

<style>
.view-profile {
    max-width: 700px;
    margin-top: 60px;
}

.view-profile .card {
    padding: 10px 20px;
}

.view-profile .comment {
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    margin: 10px 0;
}

.view-profile p {
    margin-bottom: 0!important;
}

.view-profile .grey-text {
    font-style: italic;
}
</style>