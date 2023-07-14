export default async function CompanyRegisterLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h2 className={`text-3xl text-center text-zinc-500 font-semibold`}><span>Create A Company</span> </h2>
            {children}
            <p className="max-w-md px-4 text-sm text-center text-zinc-700 ">
                This will allow to add a external company to the Asphire Network. and they will be able to login using Google (more options soon)
            </p>
            <p className="max-w-md px-4 text-sm text-center text-zinc-700 ">
            </p>
        </div>
    )
}