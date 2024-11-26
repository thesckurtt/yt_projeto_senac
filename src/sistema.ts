import { LocalStorage } from "node-localstorage";
import { google, youtube_v3 } from "googleapis";
import { promises } from "dns";
import { Playlist } from "./playlist";

export class Sistema {
  static parseJSON(jsonObj: string | null): any {
    if (jsonObj !== null) {
      return JSON.parse(jsonObj);
    } else {
      return "Formato inválido ou nulo";
    }
  }

  static validUser(itemL: string): any {
    const localStorage = new LocalStorage("./scratch");
    localStorage.getItem(itemL);
    if (localStorage.getItem(itemL) !== null) {
      let user = localStorage.getItem(itemL);
      return {
        status: true,
        userJSON: JSON.parse(user || ""),
      };
    } else {
      return {
        status: false,
        userJSON: null,
      };
    }
  }

  // Pega usuario do localStorage
  static getUserAuth(): any {
    const localStorage = new LocalStorage("./scratch");
    let user = localStorage.getItem("Usuario");
    return {
      user: JSON.parse(user || ""),
    };
  }

  staticUpdateUser(): void {}

  static async findPlaylist(url: string): Promise<any> {
    const regexURL = /(?<=list=)[^&]+/;
    let match = url.match(regexURL);

    if (match) {
      console.log(match[0].toString());
        var playlist = await this.getPlaylistItems(match[0]);
        
        // playlist.then((data : any) => {
        //     return data.response;
        // })
        return {response: playlist.response, playlistId: match};
    } else {
      console.log("Formato invalido de URL!");
    }
  }

  protected static async getPlaylistItems(playlistId: string): Promise<any> {
    const API_KEY: any = process.env.YOUTUBE_API_KEY;
    const youtube: youtube_v3.Youtube = google.youtube({
      version: "v3",
      auth: API_KEY,
    });

    try {
      const response = await youtube.playlistItems.list({
        part: ["snippet", "contentDetails", "status"],
        playlistId: playlistId,
        maxResults: 100, // Número de vídeos que deseja listar
      });

      if (response.data.items) {
        // response.data.items.forEach((item) => {
        //   if (item.snippet) {
        //     console.log(`Título: ${item.snippet.title}`);
        //     console.log(`Thumb URL: ${item.snippet.thumbnails?.default?.url}`);
        //     console.log(`Posição n: ${Number(item.snippet.position) + 1}`);
        //     // console.log(`Descrição: ${item.snippet.description}`);
        //     console.log(
        //       `URL do Vídeo: https://www.youtube.com/watch?v=${item.snippet.resourceId?.videoId}`
        //     );
        //     console.log("---");
        //   }
        // });
        // console.log(response.data)
        return { response: response.data };
      } else {
        console.log("Nenhum item encontrado na playlist.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar informações:", (error as Error).message);
    //   throw error; // Propaga o erro para quem chamar este método tratar
    }
  }
}
