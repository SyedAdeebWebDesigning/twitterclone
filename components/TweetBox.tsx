import {
	CalendarIcon,
	EmojiHappyIcon,
	LocationMarkerIcon,
	PhotographIcon,
	SearchCircleIcon,
} from "@heroicons/react/outline";
// import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";

interface Props {
	setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
	const [input, setInput] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const { data: session } = useSession();
	const imageInputRef = useRef<HTMLInputElement>(null);
	const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

	const addImageToTweet = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		if (!imageInputRef.current?.value) return;
		setImage(imageInputRef.current.value);
		imageInputRef.current.value = "";
		setImageUrlBoxIsOpen(false);
	};

	const postTweet = async () => {
		const tweetInfo: TweetBody = {
			text: input,
			username: session?.user?.name || "Unknown User",
			profileImg: session?.user?.image || "https://links.papareact.com/gll",
			image: image,
		};

		const result = await fetch("/api/addTweet", {
			body: JSON.stringify(tweetInfo),
			method: "POST",
		});

		const json = await result.json();
		const newTweets = await fetchTweets();
		setTweets(newTweets);
		// toast("Tweet Posted", {
		// 	icon: "🚀",
		// });
		return json;
	};

	const handleSubmit = (
		e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		postTweet();
		setInput("");
		setImage("");
		setImageUrlBoxIsOpen(false);
	};

	return (
		<div className="flex space-x-2 p-5">
			<img
				className="h-12 w-12 object-cover rounded-full mt-4"
				src={session?.user?.image || "https://links.papareact.com/gll"}
				alt=""
			/>
			<div className="flex justify-between sm:flex-1 items-center pl-2">
				<form className="flex flex-1 flex-col">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder="What's Happening?"
						className="h-24 w-full text-xl outline-none placeholder:text-sm sm:placeholder:text-xl"
					/>
					<div className="flex items-center flex-col xsm:flex-row">
						<div className="flex  space-x-2 text-twitter flex-1">
							<PhotographIcon
								onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
								className="w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-150"
							/>
							<SearchCircleIcon className="w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out " />
							<EmojiHappyIcon className="w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out " />
							<CalendarIcon className="w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out " />
							<LocationMarkerIcon className="w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out " />
						</div>
						<button
							onClick={handleSubmit}
							disabled={!input || !session}
							className="disabled:opacity-40 mt-2 disabled:cursor-not-allowed bg-twitter px-5 py-2 font-bold text-white rounded-full"
						>
							{session && (`Tweet`) || 'Sign In' }
						</button>
					</div>
					{imageUrlBoxIsOpen && (
						<div className="object-cover -ml-10 sm:ml-0">
							<form className="mt-5 flex flex-col transition-all duration-200 sm:flex-row rounded-3xl bg-twitter/60 py-2 px-4 justify-between">
								<input
									ref={imageInputRef}
									type="text"
									className="flex-1 outline-none bg-transparent text-white placeholder:text-white"
									placeholder="Enter image URL"
								/>
								<button
									type="submit"
									onClick={addImageToTweet}
									className="px-4 py-1 rounded-3xl text-white font-semibold"
								>
									Add Image
								</button>
							</form>
						</div>
					)}
					{image && (
						<img
							className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
							src={image}
							alt=""
						/>
					)}
				</form>
			</div>
		</div>
	);
}

export default TweetBox;
