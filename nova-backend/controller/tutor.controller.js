let db = require("../config/db.config")
let collections = require("../config/collections.config")
let bcrypt = require("bcrypt")

module.exports = {
    signupTutor: (data) => {
        return new Promise(async (resolve, reject) => {
            data.password = await bcrypt.hash(data.password, 10)
            await db.get().collection(collections.TUTOR_COLLECTION).insertOne(data).then((res) => {
                resolve({
                    "id": res.insertedId,
                    "name": data.name,
                    "type": "tutor"
                })
            }).catch((err) => {
                reject(err)
            })

        })
    },

    doLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            let doc = await db.get().collection(collections.TUTOR_COLLECTION).findOne({ mail: data.email })
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
                    "type": "tutor"
                })
            }
        })
    }
}