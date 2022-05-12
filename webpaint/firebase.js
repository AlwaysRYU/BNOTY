const firebaseConfig = {
  apiKey: "AIzaSyC4bhvgrZnBlZa63HOjr4YWb0vPUEy0TNs",
  authDomain: "bnoty-ae856.firebaseapp.com",
  databaseURL: "https://bnoty-ae856-default-rtdb.firebaseio.com",
  projectId: "bnoty-ae856",
  storageBucket: "bnoty-ae856.appspot.com",
  messagingSenderId: "109988155599",
  appId: "1:109988155599:web:24fc23b8766d44363a27ba",
  measurementId: "G-J5849SYJY8"
};    

firebase.initializeApp(firebaseConfig);
console.log(firebase);

let city = "Chicago";
const db = firebase.firestore();


chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'}, function(info) {
  email = info.email;
  console.log(info);
})

// const db = firebase.firestore();
// db.collection('restaurants').get().then((response)=>{
//   response.forEach((doc)=>{
//     console.log(doc.data())
//   })
// })

chrome.runtime.onMessage.addListener((msg, sender, response) => {


  if(msg.command == '10SecSave'){
    console.log("10SecSave");
    
    if(city === ""){
      console.log("로컬 저장")
    }
    else {
      db.collection('restaurants').get().then((response)=>{
        response.forEach((doc)=>{
          let docCity = doc.get('city');
          if(city === docCity){
            console.log(doc.id);
            db.collection('restaurants').doc(doc.id).collection('ratings').doc().set({
              config: "데이터"
            })
            .then(() => {
              alert("자동저장")
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
          } // if end
        })
      })
    } // else end

  }

  return true;
});

// chrome.runtime.onMessage.addListener((msg, sender, response) => {

//   if(msg.command == 'testNote'){
//     console.log("testNote");
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//       let url = tabs[0].url;
//       console.log(url);
//     }); 
//   }

//   return true;
// });