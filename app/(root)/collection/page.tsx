import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

import {  QuestionFilters } from "@/constants/filters";

import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import {auth} from "@clerk/nextjs"


export default async function Home({searchParams}:SearchParamsProps) {
const {userId}=auth();
if(!userId) return null;
   const result =await getSavedQuestions({
    clerkId:userId,
    searchQuery:searchParams.q,
    filter:searchParams.filter,
    page:searchParams.page ? +searchParams.page : 1
   });

   console.log(result.questions)
  return (
    <>
      
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
     
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
         
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0
          ? result.questions.map((question) => <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
          />)
          : <NoResult
          title="there is no saved question to show"
          description="Be the first to break the silence! ask a question and kickstart the discussion. our query could be the next big thing others learn from, Get involved!"
          link="/ask-question"
          linkTitle="Ask a question"
          />
          }
      </div>
    </>
  );
}
