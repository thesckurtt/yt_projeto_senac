"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
class Playlist {
    constructor(nomePlaylist, qntVideos, playlistId) {
        this.videoAulas = {};
        this.nomePlaylist = nomePlaylist;
        this.qntVideos = qntVideos;
        this.playlistId = playlistId;
        this.videoAulas = [];
    }
    addAulas(aulaJSON) {
        this.videoAulas.push({
            videoId: aulaJSON.videoId,
            position: aulaJSON.position,
            channel_name: aulaJSON.videoOwnerChannelTitle,
            concluded: false,
        });
    }
    mudarStatusAula() {
    }
    getNome() {
        return this.nomePlaylist;
    }
    getAulas() {
        // this.videoAulas.forEach(el => {
        //     console.log(el.getAllinfo());
        // })
        console.log(this.videoAulas);
        console.log("teste ", this.nomePlaylist);
    }
    addVideoAulas(videoAula) {
        this.videoAulas.push(videoAula);
    }
}
exports.Playlist = Playlist;
// new Playlist("Teste", "fwderfw", 12, "dedwf");
