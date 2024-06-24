import { LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import { baseURL } from "~/global/baseURL"
import EpisodeResponse from "~/types/EpisodeResponse";

export const loader = async ({params}: LoaderFunctionArgs) => {
    const getEpisode = await fetch(baseURL + '/episode/' + params.episode);

    return json({getEpisode: await getEpisode.json() as EpisodeResponse})
}

export default function Episode() {
    const {getEpisode} = useLoaderData<typeof loader>();

    return(
        <div>
            <div>{getEpisode.title}</div>
            <div><iframe src={getEpisode.streamLink} ></iframe></div>
        </div>
    )
}