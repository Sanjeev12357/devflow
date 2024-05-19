"use client"
import React, { useEffect, useState } from 'react'
import {ReloadIcon} from "@radix-ui/react-icons"
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
const GlobalResult = () => {
    const searchParams=useSearchParams();
    const [isLoading,setIsLoading]=useState(false);

    const [result,setResult]=useState([
        {type:'question',id:1,title:'Next js'},
        {type:'tag',id:2,title:' React js'},
        {type:'user',id:3,title:'js'}
    ]);

    const global=searchParams.get('global');
    const type=searchParams.get('type');

    useEffect(()=>{
        const fetchresults=async()=>{
            setResult([]);
            setIsLoading(true);
            try{
                // Everything everywhere is a global search

            }catch(error){
                console.log(error);
                throw error;
            }finally{
                setIsLoading(false);
            }
        }

    },[global,type])

    const renderLink=(type:string, id:string)=>{
        return '/';
    }


  return (
    <div className='absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl'>
        Filters
        <div className='my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50'>
        
        </div>

        <div className="space-y-5">
            <p className='text-dark400_light900 paragraph-semibold px-5'>
                Top Match
            </p>
            {
    isLoading ? (
        <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">Browsing the Entire Db</p>
        </div>
    ) : (
        <div className="flex flex-col gap-2">
            {result.length > 0 ? (
                result.map((item:any, index:number) => (
                    <Link
                        href={renderLink(item.type, item.id)}
                        key={`${item.type}-${item.id}-${index}`}
                        className='flex w-full  cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:bg-dark-500/50'
                    >
                       <Image
                       src="/assets/icons/tag.svg"
                       alt="tags"
                       width={18}
                       height={18}
                       className='invert-colors mt-1 object-contain'
                       />
                       <div className='flex flex-col '>
                        <p className='body-medium text-dark200_light800 line-clamp-1'>{item.title}</p>
                        <p className='text-light500_light500 small-medium mt-1 capitalize'>{item.type}</p>

                       </div>
                    </Link>
                ))
            ) : (
                <div className='px-5 flex-center flex-col '>
                    <p className='text-dark200_light800 body-regular px-5 py-2.5'>OOps,  NO result</p>
                </div>
            )}
        </div>
    )
}


        </div>
    </div>
  )
}

export default GlobalResult