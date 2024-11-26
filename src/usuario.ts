import { LocalStorage } from "node-localstorage";
import { Playlist } from "./playlist";
import { Sistema } from "./sistema";

interface intfUsuarioMetodos {
  addPlaylist(playlist: Playlist): void;
  getAllInfo(): void;
}

export class Usuario implements intfUsuarioMetodos {
  protected nome: string;
  protected id: number;
  protected username: string;
  protected playlists: Playlist[];
  protected localStorage: LocalStorage = new LocalStorage("./scratch");
  constructor(
    nome: string,
    id: number,
    username: string,
    playlists: Playlist[] | null
  ) {
    this.nome = nome;
    this.id = id;
    this.username = username;
    this.playlists = playlists ? playlists : [];
  }

  getAllPlaylistsNome(): void {
    this.playlists.forEach((el) => {
      console.log(el.getNome());
    //   el.getAulas()
    });
  }

  addPlaylist(playlist: Playlist): void {
    this.playlists.push(playlist);

    let user = Sistema.parseJSON(this.localStorage.getItem("Usuario"));

    user.playlist.push(playlist);

    console.log(user.playlist);

    this.localStorage.setItem("Usuario", JSON.stringify(user));
    
    console.log("Playlist adicionada na sua estante virtual.");
  }

  getAllInfo(): void {
    console.log(
      `${this.nome} - ${this.id.toString()} - ${this.username} - ${
        this.playlists
      }`
    );
  }

  toJSON(): any {
    return {
      nome: this.nome,
      id: this.id,
      username: this.username,
      playlist: this.playlists,
    };
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  static fromJSON(json: any) {
    let playlists: Playlist[] = [];

    json.playlist.forEach((el: any) => {
      playlists.push(
        new Playlist(el.nomePlaylist, el.canalId, el.qntVideos, el.playlistId)
      );
    });
    // var playlist1 = new Playlist("teste", "werwfw", 33, "rr3r");

    return new Usuario(json.nome, json.id, json.username, playlists);
  }
}
