import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyDZtXkwiEY_SEBQlAQ1ipZfdXyVWGp83N4",
//   authDomain: "healthytouch-da44e.firebaseapp.com",
//   projectId: "healthytouch-da44e",
//   storageBucket: "healthytouch-da44e.appspot.com",
//   messagingSenderId: "912524857622",
//   appId: "1:912524857622:web:adff4e5be0dd6b7d614037",
//   measurementId: "G-5WDP16WB6B"
// };

// Initialize Firebase
// export  default initializeApp(firebaseConfig);


const app = initializeApp ({
    apiKey: "AIzaSyDZtXkwiEY_SEBQlAQ1ipZfdXyVWGp83N4",
  authDomain: "healthytouch-da44e.firebaseapp.com",
  projectId: "healthytouch-da44e",
  storageBucket: "healthytouch-da44e.appspot.com",
  messagingSenderId: "912524857622",
  appId: "1:912524857622:web:adff4e5be0dd6b7d614037",
  measurementId: "G-5WDP16WB6B"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;

