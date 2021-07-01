import firebase from 'firebase';
import { USER_POSTS_STATE_CHANG, USER_STATE_CHANG } from '../constants';
export const fetchUser = () => {
    return (dispatch) => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    console.log(snapshot.data());
                    dispatch({
                        type: USER_STATE_CHANG,
                        currentUser: snapshot.data(),
                    });
                } else {
                    console.log('does not exist');
                }
            });
    };
};

export const fetchUserPosts = () => {
    return (dispatch) => {
        firebase
            .firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection('userPosts')
            .orderBy('creation', 'asc')
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                // console.log('test', posts);
                dispatch({
                    type: USER_POSTS_STATE_CHANG,
                    posts,
                });
                // console.log(snapshot.docs);
            });
    };
};
