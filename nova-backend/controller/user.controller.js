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

}