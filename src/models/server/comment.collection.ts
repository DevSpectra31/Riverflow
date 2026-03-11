import {db,commentCollection} from "../name";
import {databases} from "./config"
import { Permission } from "node-appwrite";

export default async function createCommentCollection(){
    //creating collection
    await databases.createCollection(db,commentCollection,commentCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]),
    console.log("comment collection created");

    //created attributes
    Promise.all([
        databases.createStringAttribute(db,commentCollection,"content",1000,true),
        databases.createEnumAttribute(db,commentCollection,"type",["answer","question"],true),
        databases.createStringAttribute(db,commentCollection,"typeId",50,true),
        databases.createStringAttribute(db,commentCollection,"authorId",50,true),
    ])
    console.log("attributes of comment collection ")
}