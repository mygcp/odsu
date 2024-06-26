import {
  LoaderFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { baseURL } from "~/global/baseURL";
import OnGoingResponse from "~/types/OnGoingResponse";

export const meta: MetaFunction = () => {
  return [
    { title: "Nonton Anime Bahasa Indonesia" },
    {
      name: "description",
      content: "Web Clone Otakudesu (unofficial) !",
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const getOngoingAnime = await fetch(baseURL + "/ongoing/" + params.page, {
    method: "GET",
  });

  return json({
    getOngoingAnime: (await getOngoingAnime.json()) as OnGoingResponse,
  });
};

export default function Index() {
  const { getOngoingAnime } = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <div className="font-sans bg-slate-50">
      <main className="max-w-[1200px] m-auto px-3">
        <h2 className="text-lg font-semibold mt-6">On-going Anime</h2>
        <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-3 xl:gap-6 md:gap-4 gap-2">
          {/* card */}
          {getOngoingAnime !== undefined
            ? getOngoingAnime.ongoing.map((value, i) => (
                <div>
                  <Link
                    to={`/anime/${value.endpoint.substring(
                      value.endpoint.indexOf("anime/") + "anime/".length
                    )}`}
                  >
                    <div key={i} className="rounded-t-xl shadow-lg border-s">
                      <div className="w-full">
                        <img
                          className="rounded-t-lg object-cover w-full h-56 sm:h-72"
                          src={`${value.thumb}`}
                          alt="tumb"
                        />
                      </div>
                      <div className="px-2 content-between pb-2 mt-2">
                        <div className="lg:text-md text-sm font-semibold truncate">
                          {value.title}
                        </div>
                        <div className="lg:text-sm text-xs font-light text-gray-700">
                          {value.updated_day}, {value.updated_on}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""}
        </div>
        <div className="w-full flex justify-center my-14 space-x-2">
          {getOngoingAnime.currentPage !== "1" ? (
            <Link
              to={`/page/` + String(Number(getOngoingAnime.currentPage) - 1)}
            >
              <div className="rounded-sm w-fit px-3 py-2 shadow-md border bg-white">
                {"<"} Provious Page
              </div>
            </Link>
          ) : (
            ""
          )}
          <Link to={`/page/` + String(Number(getOngoingAnime.currentPage) + 1)}>
            <div className="rounded-sm w-fit px-3 py-2 shadow-md border bg-white">
              Next Page {">"}
            </div>
          </Link>
        </div>
        <div className="w-full flex py-6 justify-center">
          <div>Unofficial Otakudesu Clone@2024</div>
        </div>
      </main>
    </div>
  );
}
