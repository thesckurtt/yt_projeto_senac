"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const node_localstorage_1 = require("node-localstorage");
const playlist_1 = require("./playlist");
const sistema_1 = require("./sistema");
class Usuario {
    constructor(nome, id, username, playlists) {
        this.localStorage = new node_localstorage_1.LocalStorage("./scratch");
        this.nome = nome;
        this.id = id;
        this.username = username;
        this.playlists = playlists ? playlists : [];
    }
    getAllPlaylistsNome() {
        this.playlists.forEach((el) => {
            console.log(el.getNome());
            //   el.getAulas()
        });
    }
    addPlaylist(playlist) {
        this.playlists.push(playlist);
        let user = sistema_1.Sistema.parseJSON(this.localStorage.getItem("Usuario"));
        user.playlist.push(playlist);
        console.log(user.playlist);
        this.localStorage.setItem("Usuario", JSON.stringify(user));
        console.log("Playlist adicionada na sua estante virtual.");
    }
    getAllInfo() {
        console.log(`${this.nome} - ${this.id.toString()} - ${this.username} - ${this.playlists}`);
    }
    toJSON() {
        return {
            nome: this.nome,
            id: this.id,
            username: this.username,
            playlist: this.playlists,
        };
    }
    setNome(nome) {
        this.nome = nome;
    }
    static fromJSON(json) {
        let playlists = [];
        json.playlist.forEach((el) => {
            playlists.push(new playlist_1.Playlist(el.nomePlaylist, el.canalId, el.qntVideos, el.playlistId));
        });
        // var playlist1 = new Playlist("teste", "werwfw", 33, "rr3r");
        return new Usuario(json.nome, json.id, json.username, playlists);
    }
}
exports.Usuario = Usuario;
