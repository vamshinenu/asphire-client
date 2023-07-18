export default async function UserRegisterLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <h2 className={`text-3xl text-center text-zinc-400 font-semibold`}><span>Create A User</span> </h2>
                {children}
                <p className="max-w-md px-4 text-sm text-center text-zinc-800 ">
                    <span className="text-sm text-zinc-700"><br />This will add user with seleted role to your company</span>
                    <br />Make sure that this email is associated with a Google Account, other wise the user will not be able to login.
                </p>
            </div>
        </div>
    )
}