"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";


export async function getQuestions(params:GetQuestionsParams){
    try {
        connectToDatabase();

        const questions=await Question.find({})
            .populate({path:'tags',model:Tag})
            .populate({path:'author',model:User})
            .sort({createdAt:-1})


        return {questions};
    } catch (error) {
        console.log(error);
        throw error;
        
    }

}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to Db
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create the question
    const question = await Question.create({
      title,
      content,
      author,
    });
    
    // create the tags or get them if they already exists

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`,"i") },
        },
        {
            $setOnInsert:{name:tag}, $push :{question:question._id}
        },
        {
            upsert:true,new:true
        }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id,{
        $push:{tags:{$each:tagDocuments}}
    })

    revalidatePath(path);

    // create  an interaction record for the user's ask_question action

    // increment author's rputation by+5 for creating a question
  } catch (error) {}
}
