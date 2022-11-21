let db = require("../config/db.config")
let collections = require("../config/collections.config")
let bcrypt = require("bcrypt")
let crypto = require("crypto")
let { ObjectId } = require("mongodb")
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const { url } = require("inspector")

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
            let docs = await db.get().collection(collections.ALLIANCES_COLLECTION).find({ tutorid: userid.id }).toArray()
            resolve(docs)
        })
    },
    generateInviteLink: (data) => {
        return new Promise(async (resolve, reject) => {

            let { alliance, id, tutorid } = data
            let random = generateFromEmail(
                alliance,
                6
            );
            random = random.replace(/\s/g, '')
            random = random.toLowerCase()
            let find = await db.get().collection(collections.ALLIANCEINVITE_LINKS).findOne({ alliance: id })
            if (find) {
                return resolve(find)
            }
            let obj = {
                url: random,
                tutorid: tutorid,
                alliance: id
            }
            let dc = await db.get().collection(collections.ALLIANCEINVITE_LINKS).insertOne(obj)
            resolve(obj)
        })
    },

    createClass: (data) => {
        console.log(data);
        return new Promise(async (resolve, reject) => {
            var d = new Date();
            let date = d.toDateString()
            let hour = d.getHours();
            let minute = d.getMinutes();

            let conf = {
                "tutor": data.id,
                "students": [],
                "createdAt": {
                    "date": date,
                    "hour": hour,
                    "minute": minute
                },
                "alliance": data.alc,
                "active": "true",
                "tutorname": data.name,
                "timeString": d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
            await db.get().collection(collections.CLASSES).insertOne(conf).then((inserted) => {
                conf.url = inserted.insertedId
                resolve(conf)
            }).catch((err) => {
                reject("db err")
            })
        })
    },
    getClasses: (id) => {
        return new Promise(async (resolve, reject) => {
            let alcs = await db.get().collection(collections.CLASSES).find({ alliance: id }).toArray()
            resolve(alcs)
        })
    },

    addPeerid: (classid, peerid) => {
        console.log("peerid adding to doc" + peerid);
        return new Promise(async (resolve, reject) => {
            let doc = await db.get().collection(collections.CLASSES).updateOne({
                _id: ObjectId(classid)
            }, {
                $set: {
                    "peerid": peerid
                }
            })
            resolve(doc)
        })
    },
    getClassInfo: (data) => {
        let classid = data.id
        return new Promise(async (resolve, reject) => {
            let doc = db.get().collection(collections.CLASSES).findOne({ _id: ObjectId(classid) })
            resolve(doc)
        })
    },

    ReomovePeerId: (data) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collections.CLASSES).updateOne(
                {
                    _id: ObjectId(data.id)
                },

                {
                    $unset: {
                        "peerid": 1,

                    }
                },
                {
                    multi: true
                }

            )
            resolve()
        })
    },
    listAllClasses:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let docs=await db.get().collection(collections.CLASSES).find({tutor:id}).then((result)=>{
                resolve(result)
            })
        })
    }
}