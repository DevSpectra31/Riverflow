import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { db,answerCollection } from "@/models/name";
import {UserPrefs} from "@/store/Auth"

//creaate answer
export async function POST(request : NextRequest){
    try {
        const {questionId,answer,authorId}=await request.json();
        const response = await databases.createDocument(db,answerCollection,ID.unique(),{
            content : answer,
            authorId : authorId,
            questionId:questionId,
        })

        //increase author reputation
        const prefs=await users.getPrefs<UserPrefs>(authorId)
        await users.updatePrefs(authorId,{
            reputation : Number(prefs.reputation) +1
        })
        return NextResponse.json(response,{
            status:201,
        })
    } catch (error : any ) {
        return NextResponse.json(
            {
                error : error?.message || "Error creating answer"
            },
            {
                status:500,
            }
        )
    }
}


// delete a answer
export async function DELETE(request : NextRequest){
    try {
        const {answerId}=await request.json();
        const answer=await databases.getDocument(db,answerCollection,answerId)
        const response = await databases.deleteDocument(db,answerCollection,answerId)
        // decrease the reputation
          const prefs=await users.getPrefs<UserPrefs>(answerId?.authorId)
        await users.updatePrefs(answerId?.authorId,{
            reputation : Number(prefs.reputation) -1,
        })
        return NextResponse.json(
            {data:response},
            {status:200},
        )
    } catch ( error :any) {
        return NextResponse.json(
            {
                error : error?.message || "error in deleting  answer"
            },
            {
                status:500
            }
        )
    }
}