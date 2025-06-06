// // firebase/config.js
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, collection, query, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, where } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBGP-cGd8c_CG8LAMLWN1ssyM2pmQXTd3c",
//     authDomain: "adminchat-7cd34.firebaseapp.com",
//     projectId: "adminchat-7cd34",
//     storageBucket: "adminchat-7cd34.firebasestorage.app",
//     messagingSenderId: "489255288771",
//     appId: "1:489255288771:web:5c82a4b19727246ac74776",
//     measurementId: "G-JJEFM1P9RP"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// //const db = getFirestore(firebaseApp);
// const storage = getStorage(app);
// // Auly_ullah-132
// export {  
//   auth,  
//   db,  
//   storage,  
//   collection,  
//   query,  
//   onSnapshot,  
//   addDoc,  
//   deleteDoc,  
//   doc,  
//   serverTimestamp,  
//   where,  
//   ref,  
//   uploadBytes,  
//   getDownloadURL  
// };

// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';

// const firebaseConfig = {
//         apiKey: "AIzaSyBGP-cGd8c_CG8LAMLWN1ssyM2pmQXTd3c",
//         authDomain: "adminchat-7cd34.firebaseapp.com",
//         projectId: "adminchat-7cd34",
//         storageBucket: "adminchat-7cd34.firebasestorage.app",
//         messagingSenderId: "489255288771",
//         appId: "1:489255288771:web:5c82a4b19727246ac74776",
//         measurementId: "G-JJEFM1P9RP"
//       };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc };


// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
          apiKey: "AIzaSyBGP-cGd8c_CG8LAMLWN1ssyM2pmQXTd3c",
          authDomain: "adminchat-7cd34.firebaseapp.com",
          projectId: "adminchat-7cd34",
          storageBucket: "adminchat-7cd34.firebasestorage.app",
          messagingSenderId: "489255288771",
          appId: "1:489255288771:web:5c82a4b19727246ac74776",
          measurementId: "G-JJEFM1P9RP"
        };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);