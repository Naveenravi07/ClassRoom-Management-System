let db = require("../config/db.config")
let collections = require("../config/collections.config")
let bcrypt = require("bcrypt")
let crypto = require("crypto")
let { ObjectId } = require("mongodb")

module.exports = {
    signupTutor: (data) => {
        return new Promise(async (resolve, reject) => {
            let { mail } = data
            let check = await db.get().collection(collections.TUTOR_COLLECTION).findOne({ mail: mail })
            if (check) {
                return reject("accexists")
            }
            data.password = await bcrypt.hash(data.password, 10)
            await db.get().collection(collections.TUTOR_COLLECTION).insertOne(data).then((res) => {
                resolve({
                    "id": res.insertedId,
                    "name": data.name,
                    "type": "tutor"
                })
            }).catch((err) => {
                return reject("servererr")
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
    },

    createAlliance: (data) => {
        return new Promise(async (resolve, reject) => {
            data.createdAt = new Date().toLocaleDateString("en-US")
            data.studentscount = 0
            let dummyobj = {
                studentid: ""
            }
            data.students = [dummyobj]
            db.get().collection(collections.ALLIANCES_COLLECTION).insertOne(data).then((resolvedAlc) => {
                resolve({
                    "id": resolvedAlc.insertedId,
                })
            }).catch((err) => {
                return reject("servererr")
            })

        })
    },

    createHexaCode: () => {
        const id = crypto.randomBytes(16).toString("hex");
        return id
    },
    getAlliances: (userid) => {
        return new Promise(async (resolve, reject) => {
            console.log(userid);
            let docs = await db.get().collection(collections.ALLIANCES_COLLECTION).find({ tutorid: userid.id }).toArray()
            resolve(docs)
        })
    },
}