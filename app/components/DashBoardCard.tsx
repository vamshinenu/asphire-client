import Link from "next/link";

interface CardProps {
    userId: string;
    name: string;
    actor: string;
    status: string;
    stage: string;
    message: string;
    dateAdded: string;
    company: string;
}



const Card = ({ userId, name, actor, status, stage, message, dateAdded, company }: CardProps) => {
    return (
        <div className="p-4 shadow-lg rounded-xl outline outline-1 outline-zinc-300">
            <Link href={`/user/${userId}`}>
                <div className="flex items-center justify-between mb-2">
                    <div
                        className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 text-sm bg-gray-300 rounded-full">
                            <h1>
                                {name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                            </h1>
                        </div>
                        <span className="overflow-hidden text-lg overflow-ellipsis whitespace-nowrap">
                            {name}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">{company}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span
                        className={`px-2 py-1 bg-zinc-100 rounded-lg  text-sm ${status === 'pending' ? 'text-orange-400' : 'text-emerald-400'
                            }`}
                    >
                        {status}
                    </span>
                    <span className="text-sm text-gray-300">Stage {stage}</span>
                </div>
                <div className="mt-4">
                    <p className="overflow-hidden text-sm text-gray-700 overflow-ellipsis">{message}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500">{dateAdded}</span>
                </div>
            </Link>
        </div>
    );
};

export default Card;