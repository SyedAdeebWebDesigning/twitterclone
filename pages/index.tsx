import type { GetServerSideProps, NextPage } from "next";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
// import { Toaster } from "react-hot-toast";

interface Props {
	tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
	return (
		<div className="lg:max-w-7xl mx-auto max-h-screen overflow-hidden">
			{/* <Toaster /> */}
			<main className="grid grid-cols-9">
				<Sidebar></Sidebar>

				<Feed tweets={tweets}></Feed>

				<Widgets></Widgets>
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const tweets = await fetchTweets();

	return {
		props: {
			tweets,
		},
	};
};
