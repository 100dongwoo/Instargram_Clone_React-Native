import firebase from 'firebase';
import { USER_STATE_CHAGE } from '../constants';
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
                        type: USER_STATE_CHAGE,
                        currentUser: snapshot.data(),
                    });
                } else {
                    console.log('does not exist');
                }
            });
    };
};
