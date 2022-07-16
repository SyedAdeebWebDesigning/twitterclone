import { RefreshIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import Tweets from "./Tweet";
import TweetBox from "./TweetBox";
// import toast from 'react-hot-toast'

interface Props {
	tweets: Tweet[];
}

function Feed({ tweets:tweetProps }: Props) {

	const [tweets, setTweets] = useState<Tweet[]>(tweetProps)

	const handleRefresh = async () => {
		// const refreshToast = toast.loading('Refreshing...')
		const tweet = await fetchTweets()
		setTweets(tweet)
		// toast.success('Feed Updated', {
		// 	id: refreshToast
		// })
	}

	return (
		<div className="col-span-8 max-h-screen overflow-y-scroll scrollbar-hide md:col-span-7 lg:col-span-5 sm:col-span-7 border-x">
			<div className="flex items-center justify-between">
				<h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
				<RefreshIcon
					onClick={handleRefresh}
					className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
				/>
			</div>
			{/* Tweetbox */}
			<div>
				<TweetBox setTweets={setTweets}></TweetBox>
			</div>
			{/* Feed */}
			<div className="">
				{tweets.map((tweet) => (
					<Tweets key={tweet._id} tweet={tweet}></Tweets>
				))}
			</div>
		</div>
	);
}

export default Feed;
