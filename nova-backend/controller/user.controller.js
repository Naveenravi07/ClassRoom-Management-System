let db = require("../config/db.config")
let collection = require("../config/collections.config")
let bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

module.exports = {

    doSignup: async (userData) => {
        return new Promise(async (resolve, reject) => {
            let { mail, name } = userData
            let check = await db.get().collection(collection.STUDENT_COLLECTION).findOne({ mail: mail })
            if (check) {
                return reject("accexists")
            }
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.STUDENT_COLLECTION).insertOne(userData).then((data, err) => {
                resolve({
                    "id": data.insertedId,
                    "name": name,
                    "type": "student"
                })
            }).catch((err) => {
                return reject("servererr")
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
    },
    getAlliances: (data) => {
        return new Promise(async (resolve, reject) => {
            let doc = await db.get().collection(collection.ALLIANCES_COLLECTION).aggregate([
                {
                    $match: { "students.studentid": data.id }
                },
                {
                    $project: {
                        "students": 0,
                        "phone": 0,
                        "tutorid": 0
                    }
                }
            ]).toArray()
            resolve(doc)
        })
    },

    joinAlliance: ({ inv, student }) => {
        return new Promise(async (resolve, reject) => {
            let validUrl = await db.get().collection(collection.ALLIANCEINVITE_LINKS).aggregate(
                [
                    {
                        $match: { url: inv }
                    },
                    {
                        $project: {
                            "alliance": {
                                $toObjectId: "$alliance"
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: collection.ALLIANCES_COLLECTION,
                            localField: 'alliance',
                            foreignField: '_id',
                            as: 'config'
                        }
                    },

                    {
                        $project: {
                            _id: 1,
                            conf: { $arrayElemAt: ['$config', 0] },
                        }
                    },

                    {
                        $project: {
                            "conf.phone_number": 0,
                        }
                    },

                    {
                        $lookup: {
                            from: collection.TUTOR_COLLECTION,
                            localField: 'conf.tutorid',
                            foreignField: '_id',
                            as: 'creatorarr'
                        }
                    },
                    {
                        $project: {
                            "creatorarr.password": 0,
                            "creatorarr.phone": 0
                        }
                    },
                ]
            ).toArray()
            console.log(validUrl);
            if (validUrl.length == 0) {
                return reject("invalidLink")
            }

            let checking = await validUrl[0].conf.students.findIndex(students => students.studentid.toString() == student)

            if (checking !== -1) {
                return reject("already joined")
            } else {
                let obj = {
                    studentid: student
                }
                await db.get().collection(collection.ALLIANCES_COLLECTION).updateOne({ _id: validUrl[0].conf._id },
                    {
                        $push: { "students": obj }
                    }
                )
            }
            delete validUrl[0].conf.students
            delete validUrl[0].conf.tutorid
            delete validUrl[0].creatorarr
            console.log(validUrl);

            resolve(validUrl)
        })
    },

    getClasses: (data) => {
        return new Promise(async (resolve, reject) => {
            let classes = await db.get().collection(collection.CLASSES).find({ alliance: data.id }).toArray()
            resolve(classes)
        })
    },

    addStudentDetailsToClass: (data) => {
        return new Promise(async (resolve, reject) => {
            let doc = await db.get().collection(collection.CLASSES).updateOne(
                {
                    _id: ObjectId(data.classid)
                },
                {
                    $push: {
                        "students": {
                            "peerid": data.peerid,
                            "studentid": data.id
                        }
                    }
                },

            )
            resolve(data)
        })
    },

    remmoveDuplicateStudent: (data) => {
        return new Promise(async (resolve, reject) => {
            let check = await db.get().collection(collection.CLASSES).updateOne(
                {
                    _id: ObjectId(data.classid)
                },

                {
                    $pull: {
                        "students": {
                            "studentid": data.id
                        }
                    }
                },

            )
            resolve(check)
        })

    },
   
}