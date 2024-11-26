import { VideoAula } from "./videoAula";

export class Playlist {
  protected nomePlaylist: string;
  protected qntVideos: number;
  protected playlistId: string;
  protected videoAulas: Record<string, any> = {};

  constructor(
    nomePlaylist: string,
    qntVideos: number,
    playlistId: string
  ) {
    this.nomePlaylist = nomePlaylist;
    this.qntVideos = qntVideos;
    this.playlistId = playlistId;
    this.videoAulas = [];
  }

  addAulas(aulaJSON: any) {
    this.videoAulas.push({
      videoId: aulaJSON.videoId,
      position: aulaJSON.position,
      channel_name: aulaJSON.videoOwnerChannelTitle,
      concluded: false,
    });
  }

  mudarStatusAula(): any{

  }

  getNome(): string {
    return this.nomePlaylist;
  }
  getAulas(): void {
    // this.videoAulas.forEach(el => {
    //     console.log(el.getAllinfo());
    // })
    console.log(this.videoAulas);
    console.log("teste ", this.nomePlaylist)
  }

  addVideoAulas(videoAula: VideoAula): void {
    this.videoAulas.push(videoAula);
  }
}

// new Playlist("Teste", "fwderfw", 12, "dedwf");
