import firebase from 'firebase';

export const authMethods = {
    signUp: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    },
    signIn: (email, password) => {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email, password);
            });
    },
    signOut: () => {
        return firebase.auth().signOut();
    },
};