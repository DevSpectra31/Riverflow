import {db,answerCollection} from "../name"
import {databases} from "./config"
import { IndexType, Permission } from "node-appwrite"

export default async function createAnswerCollection(){
    await databases.createCollection(db,answerCollection,answerCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]),
    console.log("Answer collection created")
    //attributes
    await Promise.all([
        databases.createStringAttribute(db,answerCollection,"content",1000,true),
        databases.createStringAttribute(db,answerCollection,"questionId",50,true),
        databases.createStringAttribute(db,answerCollection,"authorId",50,true),
    ])
    console.log("anwser collection attributes created")
}