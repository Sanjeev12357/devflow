
import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'

import {  UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'

import React from 'react'

const Page = async () => {

  const result =await getAllUsers({})
  return (
    <>


        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
       
      
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
         
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4 '>
          {result.users.length >0 ? (
            result.users.map((user)=>(
              <UserCard user={user} key ={user._id}/>

            ))
          ): (<div className ="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            No users yet
          </div>)}
      </section>
      
    </>
  )
}

export default Page