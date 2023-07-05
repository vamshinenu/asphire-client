import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { authoptions } from "../api/auth/[...nextauth]/route";

export const Navigation: React.FC = () => {
	return (
		<header
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  bg-zinc-900/500  border-zinc-800`}

			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">

						<Link
							href="/faq"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							FAQ
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Contact
						</Link>
						<Link
							href="/edu"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Education
						</Link>
						<Link
							href="/job"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Job
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
