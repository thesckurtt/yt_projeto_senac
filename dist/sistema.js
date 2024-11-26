"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sistema = void 0;
const node_localstorage_1 = require("node-localstorage");
const googleapis_1 = require("googleapis");
class Sistema {
    static parseJSON(jsonObj) {
        if (jsonObj !== null) {
            return JSON.parse(jsonObj);
        }
        else {
            return "Formato inválido ou nulo";
        }
    }
    static validUser(itemL) {
        const localStorage = new node_localstorage_1.LocalStorage("./scratch");
        localStorage.getItem(itemL);
        if (localStorage.getItem(itemL) !== null) {
            let user = localStorage.getItem(itemL);
            return {
                status: true,
                userJSON: JSON.parse(user || ""),
            };
        }
        else {
            return {
                status: false,
                userJSON: null,
            };
        }
    }
    // Pega usuario do localStorage
    static getUserAuth() {
        const localStorage = new node_localstorage_1.LocalStorage("./scratch");
        let user = localStorage.getItem("Usuario");
        return {
            user: JSON.parse(user || ""),
        };
    }
    staticUpdateUser() { }
    static findPlaylist(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const regexURL = /(?<=list=)[^&]+/;
            let match = url.match(regexURL);
            if (match) {
                console.log(match[0].toString());
                var playlist = yield this.getPlaylistItems(match[0]);
                // playlist.then((data : any) => {
                //     return data.response;
                // })
                return { response: playlist.response, playlistId: match };
            }
            else {
                console.log("Formato invalido de URL!");
            }
        });
    }
    static getPlaylistItems(playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_KEY = process.env.YOUTUBE_API_KEY;
            const youtube = googleapis_1.google.youtube({
                version: "v3",
                auth: API_KEY,
            });
            try {
                const response = yield youtube.playlistItems.list({
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
                }
                else {
                    console.log("Nenhum item encontrado na playlist.");
                    return null;
                }
            }
            catch (error) {
                console.error("Erro ao buscar informações:", error.message);
                //   throw error; // Propaga o erro para quem chamar este método tratar
            }
        });
    }
}
exports.Sistema = Sistema;
