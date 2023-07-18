import Link from "next/link";

import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";

export const Navigation: React.FC = async () => {

	const session = await getServerSession(authoptions);
	if (session) {
		console.log(session);
	}

	return (
		<div className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b bg-zinc-900/500  border-zinc-800`}>
			<div className="container flex flex-row-reverse items-center justify-between px-6 py-4 mx-auto">
				<div className="flex items-center gap-8">
					<Link href="/contact" className="duration-200 hover:text-emerald-400">Contact</Link>
					{
						!session?.user ? (
							<Link className={`bg-zinc-200 px-4 py-2 rounded-xl hover:bg-emerald-400 hover:text-white duration-200`} href={"/auth/login"}>Login</Link>
						)
							: (
								<Link className={`bg-zinc-200 px-4 py-2 rounded-xl hover:bg-emerald-400 hover:text-white duration-200`} href={"/dashboard"}>Dashboard</Link>)
					}
				</div>
				<div className="flex justify-between gap-8">
					<Link href="/faq" className="duration-200 hover:text-emerald-400">FAQ</Link>
					<Link href="/edu" className="duration-200 hover:text-emerald-400">Education</Link>
					<Link href="/job" className="duration-200 hover:text-emerald-400">Job</Link>
					<Link href="/faq" className="duration-200 hover:text-emerald-400">Visa</Link>
				</div>
			</div>
		</div>
	);
};
