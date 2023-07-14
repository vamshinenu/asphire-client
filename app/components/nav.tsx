import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const Navigation: React.FC = () => {
	return (
		<div className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b bg-zinc-900/500  border-zinc-800`}>
			<div className="container flex flex-row-reverse items-center justify-between px-6 py-4 mx-auto">
				<div className="flex items-center gap-8">
					<Link href="/contact" className="duration-200 hover:text-emerald-400">Contact</Link>
					<Link className={`${buttonVariants({ variant: "secondary" })} bg-black`} href={"/auth/login"}>Login</Link>
				</div>
				<div className="flex justify-between gap-8">
					<Link href="/faq" className="duration-200 hover:text-emerald-400">FAQ</Link>
					<Link href="/edu" className="duration-200 hover:text-emerald-400">Education</Link>
					<Link href="/job" className="duration-200 hover:text-emerald-400">Job</Link>
				</div>
			</div>
		</div>
	);
};
