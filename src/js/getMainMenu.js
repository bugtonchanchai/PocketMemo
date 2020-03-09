// import firebase from "firebase";

function getMainMenu() {
    let arr = [];
    // firebase.firestore().collection("mmenus")
    //     //.where("status", "==", true)
    //     .orderBy("order")
    //     .get()
    //     .then(querySnapshot => {
    //         querySnapshot.forEach(function (doc) {
    //             arr.push(doc.data());
    //             // console.log(doc.data());
    //         });
    //     });

    arr = [
        {
            icon: "mdi-home",
            link: "/",
            text: "Home"
        }, {
            icon: "mdi-settings",
            link: "MasterConfig",
            text: "Config"
        }, {
            icon: "mdi-bug",
            link: "test",
            text: "Testing"
        }
    ]


    return arr;
}

export { getMainMenu }