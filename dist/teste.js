"use strict";
// import { LocalStorage } from "node-localstorage";
Object.defineProperty(exports, "__esModule", { value: true });
const sistema_1 = require("./sistema");
// const locals = new LocalStorage('./scratch');
// var user = locals.getItem("Usuario");
// if(user !== null){
//     // console.log(JSON.parse(user).playlist)
//     var playlists = [];
//     JSON.parse(user).playlist.forEach(el => {
//         playlists.push(el)
//         console.log(el)
//     })
//     // console.log(playlists)
// }
// localStorage.setItem("teste", JSON.stringify({ew: "dd"}))
// var teste = localStorage.getItem("teste");
// console.log(Sistema.parseJSON(teste).ew)
// const usuario = new Usuario("Jõao", 1, "jjuser");
// // console.log(usuario.toJSON());
// localStorage.setItem("Usuario", JSON.stringify(usuario.toJSON()));
// console.log(Usuario.fromJSON(Sistema.parseJSON(localStorage.getItem("Usuario"))))
// const play1 = new Playlist("Teste", "f4ehw8eufw", 10, "fwefj8wjf0w")
// user1.getAllInfo()
// user1.addPlaylist(play1);
// console.log(user1);
// console.log("------------")
// play1.getAulas()
// function main(){
//     if()
// }
// console.log(Sistema.validUser("Usuario"))
console.log(sistema_1.Sistema.findPlaylist("https://www.youtube.com/watch?v=7nID-0ezeKI&list=PLi0vRGmHz6KxUfdL7k7ps5mTBBj1oWKSX").then(data => {
    console.log(data);
}));
