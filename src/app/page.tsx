"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const { data: session, status } = useSession()

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            {status === "unauthenticated" && (
                <button
                    className='cursor-pointer bg-black px-4 py-2 rounded-md text-white'
                    onClick={() => signIn("google")}
                >
                    Login with Google
                </button>
            )}

            <div>Logged In as: {session?.user?.name}</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}

export default Page
