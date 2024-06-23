import { json, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
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

  const getOngoingAnime = await fetch(baseURL + '/ongoing/1', {
    method: 'GET'
  });


  return json({getOngoingAnime: await getOngoingAnime.json() as OnGoingResponse})

}

export default function Index() {

  const {getOngoingAnime} = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      {getOngoingAnime.ongoing.map((data, index) => (
        <div key={index}>
          <div>{data.title}</div>
          <div>{data.updated_on}</div>
        </div>
        
      ))}
    </div>
  );
}
