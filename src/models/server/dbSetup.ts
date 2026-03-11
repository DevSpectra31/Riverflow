import {db} from "../name"
import createQuestionCollection from "./question.collection"
import  createCommentCollection  from "./comment.collection"
import createAnswerCollection from "./answer.collection"
import createVotesCollection from "./vote.collection"
import { questionAttachemntBucket } from "../name"  
import { databases } from "./config"

export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log("DB connected")
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log("database created")
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVotesCollection(),
            ])
            console.log("Collection created")
            console.log("Database created")
        } catch (error) {
            console.log("Error creating databse or collections ",error)
        }
    }
    return databases
}