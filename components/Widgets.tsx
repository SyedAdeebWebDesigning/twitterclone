import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Widget } from "./Widget";
import { useSession } from "next-auth/react";

function Widgets() {
	const { data: session } = useSession();
	const [tweet, setTweet] = useState(``);
	useEffect(() => {});

	return (
		<div className="hidden overflow-y-scroll max-h-screen scrollbar-hide px-2 mt-2 col-span-2 lg:inline">
			{/* Search */}
			{session && (
				<div className="flex items-center space-x-2 bg-[whitesmoke] p-3 rounded-full mt-2">
					<input
						value={tweet}
						onChange={(e) => setTweet(e.target.value)}
						type="text"
						placeholder={`${session?.user?.name}`}
						className="bg-transparent flex-1 outline-none"
					/>
					<button id="click" value={tweet} onClick={() => setTweet(tweet)}>
						<SearchIcon className="h-5 w-5 text-gray-400" />
					</button>
				</div>
			)}
			<div className="mt-4 py-5 pb-0 rounded-2xl">
				<h1 className="font-bold text-xl px-4">What's Happening?</h1>
				{Widget.map((item) => (
					<div className="mt-8 cursor-pointer hover:bg-gray-100 last:rounded-b-2xl transition-all duration-400 px-4 py-2">
						<p className="text-sm text-gray-400">
							{item.related} · {item.time}
						</p>
						<h1 className="font-semibold text-lg">{item.topic}</h1>
						<p className="text-sm text-gray-400 mt-2">Trending With</p>
						<p className="text-sm text-twitter mt-2 hover:underline">
							#{item.tags}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Widgets;
