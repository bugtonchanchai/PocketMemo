import firebase from "firebase";

function getMainMenu() {
    let arr = [];
    firebase.firestore().collection("mmenus")
        //.where("status", "==", true)
        .orderBy("order")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                arr.push(doc.data());
                // console.log(doc.data());
            });
        });
    return arr;
}

export { getMainMenu }