import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
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
    this.auth.signInWithRedirect(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = [];
            // }

            // merge auth and db user
            authUser = {
              id: authUser.uid,
              // email: authUser.email,
              // emailVerified: authUser.emailVerified,
              // providerData: authUser.providerData,
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

  createLoan(user, book) {
    let checkoutDate = Date.now();
    let dueDate = new Date().setDate(new Date().getDate() + 7);

    this.loans().add({
      book,
      user,
      checkoutDate,
      dueDate
    });
  }

  deleteLoan(loanId) {
    this.loan(loanId).delete();
  }
}

export default Firebase;
