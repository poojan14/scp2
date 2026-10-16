/*
  Firebase connection settings for Scientific Python Lab – Unit 3.

  1. Firebase console > your new project > Project settings > Your apps > Web app > Config.
  2. Paste the values below, replacing every PASTE_... value.
  These are public identifiers, not secrets; security comes from firestore.rules.
*/
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDstMAiWvAQlBP3UiCd88J38v8T51mcdq4",
  authDomain: "scpch3-8acbd.firebaseapp.com",
  projectId: "scpch3-8acbd",
  storageBucket: "scpch3-8acbd.firebasestorage.app",
  messagingSenderId: "504736761319",
  appId: "1:504736761319:web:365ff930fa9095a9f2e942"
};

/* Teacher accounts: can open teacher.html and preview every topic.
   Keep this list the same as spIsTeacher() / isTeacher() in firestore.rules. */
window.TEACHERS = ["poojan.shah@rru.ac.in"];

};

