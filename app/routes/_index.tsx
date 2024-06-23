import { json, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, useLocation } from "@remix-run/react";
import { baseURL } from "~/global/baseURL";

export const meta: MetaFunction = () => {
  return [
    { title: "Nonton Anime Bahasa Indonesia" },
    {
      name: "description",
      content: "Web Clone Otakudesu (unofficial) !",
    },
  ];
};

export const loader = async () => {
  const getOngoingAnime = await fetch(baseURL + "/ongoing/1", {
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
      {/* Navbar */}
      <nav className="shadow-sm py-3">
        <div className="flex justify-between max-w-[1200px] m-auto px-2">
          <div>OtakuClone</div>
          <div className="md:flex space-x-3 hidden">
            <div>Home</div>
            <div>Anime List</div>
            <div>On Going Anime</div>
            <div>Genre List</div>
          </div>
        </div>
      </nav>
      <main className="max-w-[1200px] m-auto px-2">
        <h2 className="text-lg font-semibold mt-6">On-going Anime</h2>

        <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-3 xl:gap-6 md:gap-4 gap-2">
          {/* card */}
          {getOngoingAnime !== undefined
            ? getOngoingAnime.ongoing.map((value, i) => (
                <div key={i} className="rounded-t-xl shadow-lg border-s">
                  <div className="w-full">
                    <img
                      className="rounded-t-lg object-cover w-full h-32 sm:h-60 md:h-64 lg:h-72 xl:h-72"
                      src={`${value.thumb}`}
                      alt="tumb"
                    />
                  </div>
                  <div className="px-2 content-between pb-2 mt-2">
                    <div className="text-md font-semibold truncate">{value.title}</div>
                    <div className="text-sm font-light text-gray-700">
                      {value.updated_day}, {value.updated_on}
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="w-full flex justify-center my-14 space-x-2">
          <div className="hidden rounded-sm w-fit px-3 py-2 shadow-md border bg-white"> {"<"} Provious Page</div>
          <div className="rounded-sm w-fit px-3 py-2 shadow-md border bg-white">Next Page {">"}</div>
        </div>
        <div className="">
          Footer
        </div>
      </main>
    </div>
  );
}
