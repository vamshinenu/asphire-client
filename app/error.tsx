"use client"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <html>
            <body className="flex flex-col items-center justify-center min-h-screen gap-2 text-center">
                <h2 className="text-xl text-red-500">Something went wrong!</h2>
                <p className="max-w-xs px-4 py-2 text-sm rounded-xl outline outline-1 outline-gray-800 bg-zinc-900 text-zinc-700">{error.message}</p>
                <button
                    className="px-4 py-2 text-sm duration-500 rounded-md text-zinc-500 bg-zinc-700 hover:bg-zinc-500 hover:text-zinc-300"
                    onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}