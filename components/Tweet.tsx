import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
	ChatAlt2Icon,
	HeartIcon,
	SwitchHorizontalIcon,
	UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
	tweet: Tweet;
}

function Tweet({ tweet }: Props) {
	const { data: session } = useSession();
	const [comments, setComments] = useState<Comment[]>([]);
	const [input, setInput] = useState(``);
	const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(tweet._id);
		setComments(comments);
	};

	useEffect(() => {
		refreshComments();
	}, []);

	const handelSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const commentToast = toast.loading("Posting Comment...");

		// Comment logic
		const comment: CommentBody = {
			comment: input,
			tweetId: tweet._id,
			username: session?.user?.name || "Unknown User",
			profileImg: session?.user?.image || "https://links.papareact.com/gll",
		};

		const result = await fetch(`/api/addComment`, {
			body: JSON.stringify(comment),
			method: "POST",
		});

		console.log("WOOHOO we made it", result);
		toast.success("Comment Posted!", {
			id: commentToast,
		});

		setInput("");
		setCommentBoxVisible(false);
		refreshComments();
	};

	return (
		<div className="flex  flex-col space-x-3 border-y p-5 border-gray-100">
			<div className="flex space-x-3">
				<img
					src={tweet.profileImg}
					alt=""
					className="w-10 h-10 rounded-full object-cover"
				/>
				<div>
					<div className="flex sm:items-center space-x-1 flex-col xsm:flex-row items-start">
						<p className="mr-1 font-bold whitespace-nowrap">{tweet.username}</p>
						<p className="lowercase text-gray-500 text-sm whitespace-nowrap hidden lg:inline">
							@{tweet.username.replace(" ", "")}
						</p>
						<TimeAgo
							className="text-sm text-gray-500 whitespace-nowrap"
							date={tweet._createdAt}
						/>
					</div>
					<p className="pt-1">{tweet.text}</p>
					{tweet.image && (
						<img
							src={tweet.image}
							alt=""
							className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover xl:max-w-xl"
						/>
					)}
				</div>
			</div>
			<div className="flex mt-5 justify-between">
				<div
					onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
					className="flex cursor-pointer group hover:bg-twitter/30 px-4 py-4 rounded-full hover:text-white item-center space-x-3 text-gray-400  transition-all duration-400"
				>
					<ChatAlt2Icon className="h-5 w-5  rounded-full group-hover:text-twitter"></ChatAlt2Icon>
					<p className="group-hover:text-twitter">{comments.length}</p>
				</div>
				<div className="flex cursor-pointer group item-center hover:bg-green-400/30 px-4 py-4 rounded-full space-x-3 text-gray-400 transition-all duration-400">
					<SwitchHorizontalIcon className="h-5 w-5 group-hover:text-green-400"></SwitchHorizontalIcon>
				</div>
				<div className="flex cursor-pointer group item-center hover:bg-[crimson]/30 px-4 py-4 rounded-full space-x-3 text-gray-400 transition-all duration-400">
					<HeartIcon className="h-5 w-5 group-hover:text-[red]"></HeartIcon>
				</div>
				<div className="flex cursor-pointer group item-center px-4 py-4 hover:bg-twitter/30 rounded-full space-x-3 text-gray-400 transition-all duration-400">
					<UploadIcon className="h-5 w-5 group-hover:text-twitter"></UploadIcon>
				</div>
			</div>
			{commentBoxVisible && (
				<form onSubmit={handelSubmit} className="mt-3 flex space-x-3">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder="Write a comment..."
						className="flex-1 rounded-lg text-sm sm:text-normal bg-gray-100 outline-none py-2 px-4"
					/>
					<button
						disabled={!input}
						type="submit"
						className="disabled:text-gray-200 text-sm sm:text-normal text-twitter px-2 py-1 rounded-lg"
					>
						Post
					</button>
				</form>
			)}
			{comments.length > 0 && (
				<div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-y border-gray-100 p-5">
					{comments.map((comment) => (
						<div key={comment._id} className="relative flex space-x-2">
							<hr className="absolute left-[26px] top-10 h-8 border-x mx-auto border-twitter/30" />
							<img
								src={comment.profileImg}
								className="h-10 mt-2 object-cover w-10 rounded-full"
								alt=""
							/>
							<div className="sm:items-center space-x-1 flex-col xsm:flex-row items-start">
								<div className="flex flex-col xsm:flex-row items-center space-x-1">
									<p className="ml-1 font-bold whitespace-nowrap">
										{comment.username}
									</p>
									<p className="lowercase hidden lg:inline whitespace-nowrap text-gray-500 text-sm">
										@{comment.username.replace(" ", "")}
									</p>
									<TimeAgo
										className="text-sm text-gray-500 whitespace-nowrap"
										date={comment._createdAt}
									/>
								</div>
								<p className="text-sm sm:text-lg">{comment.comment}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Tweet;
