import firebaseApp from 'firebase';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

// TODO: Configure for deployment
try {
  firebaseApp.initializeApp(config);
  firebaseApp.auth().useEmulator('http://localhost:9099/');
} catch (err) {
  console.log('INitialization error', err);
}

export const signIn = async (email: string, password: string) => {
  const data = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);
  const token = await data.user?.getIdToken();

  return { token, data };
};
