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
                throw err
            })

        })
    }
}