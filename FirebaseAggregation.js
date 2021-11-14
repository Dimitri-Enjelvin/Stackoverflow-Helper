const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp()
const db = admin.firestore()

exports.aggregateNewUsers = functions.firestore
    .document('users/{userId}')
    .onCreate( async (snapshot, context) => {

        const newUser = snapshot.data()

        const aggUsersRef = db.doc('aggregation/users')

        const aggUsersDoc = await aggUsersRef.get()
        const aggUsersData = aggUsersDoc.data()

        const allUsers = {
            users : [newUser , aggUsersData]
        }
        console.log(allUsers)

        return aggUsersRef.set(allUsers)



    })