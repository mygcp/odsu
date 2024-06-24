interface AnimeDetail {
  thumb: string;
  sinopsis: string[];
  detail: string[];
  title: string;
}

interface Episode {
  episode_title: string;
  episode_endpoint: string;
  episode_date: string;
}

interface AnimeDetailResponse {
  status: boolean;
  message: string;
  anime_detail: AnimeDetail;
  episode_list: Episode[];
  endpoint: string;
}

interface AnimeDetailInfo {
  judul: string;
  japanese: string;
  skor: number;
  produser: string;
  tipe: string;
  status: string;
  total_episode: number;
  durasi: string;
  tanggal_rilis: string;
  studio: string;
  genre: string[];
}

export default AnimeDetailResponse;
