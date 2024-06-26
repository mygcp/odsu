interface EpisodeResponse {
  title: string;
  baseUrl: string;
  id: string;
  streamLink: string;
  relative: {
    title_ref: string;
    link_ref: string;
  }[];
  list_episode: {
    list_episode_title: string;
    list_episode_endpoint: string;
  }[];
  link_stream_response: string;
  mirror1: MirrorQuality;
  mirror2: MirrorQuality;
  mirror3: MirrorQuality;
  quality: {
    low_quality: QualityDetail;
    medium_quality: QualityDetail;
    high_quality: QualityDetail;
  };
}

interface MirrorQuality {
  quality: string;
  mirrorList: {
    host: string;
    id: string;
  }[];
}

interface QualityDetail {
  quality: string;
  size: string;
  download_links: {
    host: string;
    link: string;
  }[];
}

export default EpisodeResponse;