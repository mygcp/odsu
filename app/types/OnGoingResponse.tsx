interface Anime {
  title: string;
  thumb: string;
  total_episode: string;
  updated_on: string;
  updated_day: string;
  endpoint: string;
}

interface OnGoingResponse {
  status: boolean;
  message: string;
  ongoing: Anime[];
}

export default OnGoingResponse;