
import { SearchParamsProps } from '@/types'
import React from 'react'
import AnswerCard from '../cards/AnswerCard';
import { getUserAnswers } from '@/lib/actions/user.action';

interface Props extends SearchParamsProps{
    userId:string;
    clerkId?:string | null ;


}
const AnswersTab =async ({searchParams,userId,clerkId}:Props) => {
    const result=await getUserAnswers({
        userId,
        page:1,
    })
    return (
        <div>
            {result.answers.map((item)=>(
                <AnswerCard
                key={item._id}
                clerkId={clerkId}
                _id={item._id}
                question={item.question}
                author={item.author}
                upvotes={item.upvotes.length}
                createdAt={item.createdAt}
                />
            ))}
        
        </div>
    )
}

export default AnswersTab