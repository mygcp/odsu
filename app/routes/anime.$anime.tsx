import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import Header from "~/Components/Header";
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
  return (
    <div>
      <Header />
      <div className="max-w-[1200px] m-auto">
        <div
          className="bg-no-repeat h-[140px] lg:h-[340px] bg-cover bg-center blur-sm brightness-50"
          style={{
            backgroundImage: `url('${getDetailManga?.anime_detail.thumb}')`,
          }}
        ></div>
        <div className="lg:-mt-44 -mt-28 px-3">
          <div className="flex">
            <img
              className="rounded-md lg:w-40 w-24 lg:ml-20 ml-4 z-20"
              src={getDetailManga.anime_detail.thumb}
              alt="picture"
            />
            <div className="ml-5 text-slate-50 z-30">
              <div className="xl:text-5xl lg:text-4xl md:text-xl text-lg font-extrabold">
                {getDetailManga.anime_detail.title}
              </div>
            </div>
          </div>
          <div className="my-6 text-justify">
            &nbsp;&nbsp;&nbsp; {getDetailManga.anime_detail.sinopsis}
          </div>

          <div className="mb-4">
            {getDetailManga.episode_list.map((value, index) => (
              <Link key={index} to={`/episode/${value.episode_endpoint.substring(
                      value.episode_endpoint.indexOf("episode/") + "episode/".length
                    )}`}>
                <div className="border rounded-md p-2 mt-2">
                  <div className="font-medium">{value.episode_title}</div>
                  <div className="text-sm font-light">{value.episode_date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
