import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { baseURL } from "~/global/baseURL";
import AnimeDetailResponse from "~/types/AnimeDetailResponse";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const getDetailManga = await fetch(baseURL + "/detail/" + params.anime);
  return json({
    getDetailManga: (await getDetailManga.json()) as AnimeDetailResponse,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Nonton Anime Bahasa Indonesia - Detail Anime" },
    {
      name: "description",
      content: "Web Clone Otakudesu (unofficial) !",
    },
  ];
};

export default function Anime() {
  const { getDetailManga } = useLoaderData<typeof loader>();
  // ${getDetailManga?.anime_detail.thumb}
  return (
    <div className="max-w-[1200px] m-auto">
      <div>
        <div
          className="bg-no-repeat h-[340px] bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url('${getDetailManga?.anime_detail.thumb}')`,
          }}
        ></div>
        <div className="-mt-44">
          <div className="flex">
            <img
              className="w-44 ml-20 z-20"
              src={getDetailManga.anime_detail.thumb}
              alt="picture"
            />
            <div className="ml-5 text-gray-200 z-30">
              <div className="text-5xl font-extrabold">
                {getDetailManga.anime_detail.title}
              </div>
            </div>
          </div>
          <div>
            {getDetailManga.anime_detail.sinopsis}
          </div>

          <div>
            {getDetailManga.episode_list.map((value, index) => (
              <Link key={index} to={`/episode/${value.episode_endpoint.substring(
                      value.episode_endpoint.indexOf("episode/") + "episode/".length
                    )}`}>
                <div className="border rounded-md p-2 mt-2">
                  <div>{value.episode_title}</div>
                  <div>{value.episode_date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
