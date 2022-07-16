import { groq } from "next-sanity";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../typings";
import { sanityClient } from "../../sanity";

const commentQuery = groq`
	*[_type == 'comment' && references(*[_type == 'tweet' && _id == $tweetId]._id) ]{
        _id,
        ...
    } | order(_createdAt desc)`;

type Data = Comment[];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { tweetId } = req.query;
	const comment:Comment[] = await sanityClient.fetch(commentQuery, {
		tweetId,
	})
	console.log(comment);
	
	res.status(200).json( comment );
}
