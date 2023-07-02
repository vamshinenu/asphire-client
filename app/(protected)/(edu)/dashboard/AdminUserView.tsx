'use client'
import Card from "@/app/components/DashBoardCard";
import { use, useEffect, useState } from "react";

// @ts-ignore
import debounce from 'loadsh/debounce';
import { Inter } from "next/font/google";

const fetchMap = new Map<string, Promise<any>>();

function queryClient<QueryResult>(name: string, query: () => Promise<QueryResult>) {

    if (!fetchMap.has(name)) {
        fetchMap.set(name, query());
    }
    return fetchMap.get(name)!;
}

interface User {
    id: string;
    name: string;
}

interface Message {
    id: string;
    message: string;
    user: User;

}

interface Stage {
    stage: string;
    status: string;
    createdAt: string;
    messages: Message[]
}

interface MemberOfCompany {
    id: string;
    name: string;
}

interface Candidate {
    id: string;
    name: string;
    email: string;
    cadidateStages: Stage[];
    memberOfCompany: MemberOfCompany;

}

export default function AdminUserView() {
    useEffect(() => {
        // debounce resize function
        const debouncedHandleResize = debounce(function handleResize() {
            const width = window.innerWidth;

            // Determine pageSize based on window width
            if (width <= 600) {
                setPageSize(5);
            } else if (width > 600 && width <= 1200) {
                setPageSize(20);
            } else {
                setPageSize(30);
            }
        }, 500);

        // Add event listener
        window.addEventListener("resize", debouncedHandleResize);

        // Call handler right away so state gets updated with initial window size
        debouncedHandleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", debouncedHandleResize);
    }, []);


    const handleInputChange = (value: string) => {
        setSearchTermDebounced(value);
        debounce(
            (value: string) => {
                setSearchTerm(value);
            }, 500
        )(value);
    }


    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermDebounced, setSearchTermDebounced] = useState('');
    const [sortTerm, setSortTerm] = useState('all');

    let { candidates } = use(
        queryClient(`${pageSize}-${pageNumber}-candidates-${searchTerm}-${sortTerm}`, async () => fetch(
            `/api/dashboard?pagesize=${pageSize}&pagenumber=${pageNumber}&search=${searchTerm}&sort=${sortTerm}`, {
            method: 'GET',
        }
        ).then(res => res.json() as Promise<{
            currentUser: any,
            candidates: any
        }>)
        ))

    console.log(candidates);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="flex flex-col items-stretch justify-between min-h-screen">
            <div className="flex flex-col items-center">
                <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:justify-start">
                    <input
                        id="search"
                        type="text"
                        value={searchTermDebounced}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-200 text-zinc-700 font-md placeholder-zinc-500 sm:text-xl"
                        placeholder="Search For Candidates"
                    />
                    <select
                        className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-200 text-zinc-700 font-md placeholder-zinc-500 sm:text-xl"
                        value={sortTerm}
                        placeholder="Sort By "
                        onChange={e => setSortTerm(e.target.value)}
                    >
                        <option value="all">Sort By Date</option>
                        <option value="asc">Date Asc</option>
                        <option value="desc">Date Des</option>
                    </select>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 p-8 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        candidates ? candidates.map((candidate: Candidate) => (
                            <Card
                                key={candidate.id}
                                userId={candidate.id}
                                name={candidate.name as string}
                                // actor={candidate.cadidateStages[0]!.user.name as string}
                                actor="NULL"
                                status={candidate.cadidateStages[0]?.status as string}
                                stage={candidate.cadidateStages[0]?.stage as string}
                                company={candidate.memberOfCompany.name as string}
                                message={candidate.cadidateStages[0]?.messages[0]?.message as string}
                                dateAdded={new Date(candidate.cadidateStages[0].createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: userTimeZone,
                                })}
                            />
                        )
                        ) : <div className="text-2xl text-zinc-500 sm:text-3xl"> hello </div>
                    }
                </div>
            </div>
            <div className="inline-flex self-center mt-2 xs:mt-0">
                <button
                    className={`${pageNumber === 1 ? 'hidden' : ''} inline-flex items-center px-4 py-2 text-sm duration-500 rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-500`}
                    onClick={() => {
                        if (pageNumber > 1) {
                            setPageNumber(pageNumber - 1);
                        }

                    }}
                >
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Prev
                </button>
                <p className="inline-flex items-center px-4 py-2 ml-1 mr-1 text-sm rounded-lg text-zinc-300 bg-zinc-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                    {pageNumber}
                </p>
                <button className={`${candidates.length === pageSize ? '' : 'hidden'} inline-flex items-center px-4 py-2 text-sm duration-500 rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-500`}
                    onClick={() => {
                        if (candidates.length === pageSize)
                            setPageNumber(pageNumber + 1);
                    }}
                >
                    Next
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div >
    )
}



{/*                     
                    <div className="flex flex-col items-center px-8 mt-8 mb-4">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:justify-start">
                            <h1 className="text-2xl text-zinc-500 sm:text-3xl">
                                Welcome,<span className="font-bold text-zinc-300">{currentUser?.name as string}</span>
                            </h1>
                            <input
                                id="search"
                                type="text"
                                className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-xl"
                                placeholder="Search For Candidates"
                            />
                            <select className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-xl">
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="progress">In Progress</option>
                            </select>
                            <select className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-xl">
                                <option value="date-asc">Sort by Date Ascending</option>
                                <option value="date-desc">Sort by Date Descending</option>
                                <option value="stage">Sort by Stage</option>
                            </select>
                        </div>
                    </div> */}




{/* Footer to change to go to the next page */ }
{/* <div className="inline-flex self-center mt-2 xs:mt-0">
                    <button
                        disabled={pageNumber === 1}
                        className="inline-flex items-center px-4 py-2 text-sm duration-500 rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-500"
                        onClick={() => {
                            if (pageNumber > 1) {
                                setPageNumber(pageNumber - 1);
                            }
                        }}
                    >
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                        Prev
                    </button>
                    <p className="inline-flex items-center px-4 py-2 ml-1 mr-1 text-sm rounded-lg text-zinc-300 bg-zinc-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                        {pageNumber}
                    </p>
                    <button className="inline-flex items-center px-4 py-2 text-sm duration-500 rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-500"
                        onClick={() => {
                            setPageNumber(pageNumber + 1);
                        }}
                    >
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div> */}