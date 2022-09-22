let db = require("../config/db.config")
let collection = require("../config/collections.config")
let bcrypt = require("bcrypt")
const mongoose = require('mongoose');

module.exports = {

    doSignup: async (userData) => {
        return new Promise(async (resolve) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.STUDENT_COLLECTION).insertOne(userData).then((data, err) => {
                resolve({
                    "id": data.insertedId,
                    "name": data.name,
                    "type": "student"
                })
            }).catch((err) => {
                throw err
            })
        })
    },


    doLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            let doc = await db.get().collection(collection.STUDENT_COLLECTION).findOne({ mail: data.email })
            if (!doc) {
                return reject("nodoc")
            }
            let pass = doc.password
            let validPass = await bcrypt.compare(data.password, pass)
            if (!validPass) {
                return reject("passincorrect")
            } else {
            
                console.log(doc);
                return resolve({
                    "id": doc._id,
                    "name": doc.name,
                    "type": "student"
                })
            }
        })
    }
}