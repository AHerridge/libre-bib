import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDFcLZ24jLC-1wCHGib6N4m-4IwKO5OrY0',
  authDomain: 'libre-bib.firebaseapp.com',
  databaseURL: 'https://libre-bib.firebaseio.com',
  projectId: 'libre-bib',
  storageBucket: 'libre-bib.appspot.com',
  messagingSenderId: '762004849458',
  appId: '1:762004849458:web:c2a949daa8d1d2e6',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();

    let settings = {
      timestampsInSnapshots: true,
    };

    this.db.settings(settings);

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            console.log(dbUser);

            // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = [];
            // }

            // merge auth and db user
            authUser = {
              id: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  // *** Message API ***

  message = uid => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');

  // *** Loan API ***

  loan = uid => this.db.doc(`loans/${uid}`);

  loans = () => this.db.collection('loans');
}

export default Firebase;
