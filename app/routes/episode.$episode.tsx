import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import Header from "~/Components/Header";
import { baseURL } from "~/global/baseURL";
import EpisodeResponse from "~/types/EpisodeResponse";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const getEpisode = await fetch(baseURL + "/episode/" + params.episode);

  return json({ getEpisode: (await getEpisode.json()) as EpisodeResponse });
};

export default function Episode() {
  const { getEpisode } = useLoaderData<typeof loader>();

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] m-auto px-3 mt-8">
        <div className="font-semibold text-lg">{getEpisode.title}</div>
        <div className="mt-6 flex lg:justify-normal lg:space-x-2 *:bg-slate-200 *:px-2 *:py-1 *:cursor-pointer *:rounded-md justify-between">
          {getEpisode.relative.map((val, i) => (
            <div key={i + "d" + val.title_ref}>
              {val.title_ref === "Previous Eps." ? (
                <div>
                  <Link
                    to={`/episode/${val.link_ref.substring(
                      val.link_ref.indexOf("episode/") + "episode/".length
                    )}`}
                  >
                    <div className="hover:bg-slate-300">Previous</div>
                  </Link>
                </div>
              ) : (
                ""
              )}
              {val.title_ref === "See All Episodes" ? (
                <div>
                  <Link
                    to={`/anime/${val.link_ref.substring(
                      val.link_ref.indexOf("anime/") + "anime/".length
                    )}`}
                  >
                    <div className="hover:bg-slate-300">All Episode</div>
                  </Link>
                </div>
              ) : (
                ""
              )}
              {val.title_ref === "Next Eps." ? (
                <div>
                  <Link
                    to={`/episode/${val.link_ref.substring(
                      val.link_ref.indexOf("episode/") + "episode/".length
                    )}`}
                  >
                    <div className="hover:bg-slate-300">Next</div>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <iframe
            className="w-full aspect-video hover:aspect-square"
            src={getEpisode.streamLink}
            allowFullScreen
          ></iframe>
        </div>

        <div className="mb-4">
          <div className="mt-6 text-lg font-semibold">Download</div>
          <div>
            <div className="mt-5">
              <div className="mb-2 font-semibold">High Quality</div>
              <div>{getEpisode.quality.high_quality.quality}</div>
              <div className="">
                {getEpisode.quality.high_quality.download_links.map(
                  (value, i) => (
                    <div key={i}>
                      <Link
                        className="hover:text-blue-600"
                        target="_blank"
                        to={value.link}
                      >
                        {value.host}
                      </Link>
                    </div>
                  )
                )}
              </div>
              <div>{getEpisode.quality.high_quality.size}</div>
            </div>
            <div className="mt-5">
              <div className="mb-2 font-semibold">Medium Quality</div>
              <div>{getEpisode.quality.medium_quality.quality}</div>
              <div className="">
                {getEpisode.quality.medium_quality.download_links.map(
                  (value, i) => (
                    <div key={i}>
                      <Link
                        className="hover:text-blue-600"
                        target="_blank"
                        to={value.link}
                      >
                        {value.host}
                      </Link>
                    </div>
                  )
                )}
              </div>
              <div>{getEpisode.quality.medium_quality.size}</div>
            </div>
            <div className="mt-5">
              <div className="mb-2 font-semibold">Low Quality</div>
              <div>{getEpisode.quality.low_quality.quality}</div>
              <div className="">
                {getEpisode.quality.low_quality.download_links.map(
                  (value, i) => (
                    <div key={i}>
                      <Link
                        className="hover:text-blue-600"
                        target="_blank"
                        to={value.link}
                      >
                        {value.host}
                      </Link>
                    </div>
                  )
                )}
              </div>
              <div>{getEpisode.quality.low_quality.size}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
