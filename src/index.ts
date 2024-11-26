import { Playlist } from "./playlist";
import { Usuario } from "./usuario";
import { Sistema } from "./sistema";
import { LocalStorage } from "node-localstorage";

const prompt = require("prompt-sync")();

// Cria um localStorage no diretório './scratch'
const localStorage = new LocalStorage("./scratch");

// Teste de playlist
// var playlist1 = new Playlist("teste", "werwfw", 33, "rr3r");

async function screenHome(usuario: Usuario): Promise<void> {
  let controleScreenHome = true;
  while (controleScreenHome) {
    console.log();
    console.log("===========================");
    console.log(
      " Opções ----------- \n Visualizar Playlists (1) \n Cadastrar Playlist (2) \n Sair (s)"
    );
    console.log("===========================");

    let inptOpt = prompt("=> ");

    switch (inptOpt) {
      case "1":
        usuario.getAllPlaylistsNome();
        break;
      case "2":
        console.log();
        console.log("===========================");
        console.log("Cadastrar nova Playlist");
        console.log("===========================");

        let inptURLPlaylist = prompt("Digite a URL da playlist: ");
        let inptPlaylistName = prompt("Digite o nome da playlist: ");

        const data = await Sistema.findPlaylist(inptURLPlaylist);

        // console.log("Videos totais na playlist:", data.response);

        usuario.addPlaylist(
          new Playlist(
            inptPlaylistName,
           data.response.pageInfo.totalResults,
            data.playlistId
          )
        );

        usuario.getAllPlaylistsNome();

        // Sistema.findPlaylist(inptURLPlaylist).then((data) => {
        //   // console.log(data.response)
        //   //   console.log(
        //   //     "Videos totais na playlist: ",
        //   //     data.response.pageInfo.totalResults
        //   //   );
        //   //   console.log(data.response.items[0].snippet);

        //   //   usuario.addPlaylist(
        //   //     new Playlist(
        //   //       inptPlaylistName,
        //   //       data.pageInfo.totalResults,
        //   //       data.playlistId
        //   //     )
        //   //   );

        // //   usuario.getAllPlaylistsNome();
        //   // console.log(data.items[0].snippet.title);
        // });

        // var playlist3 = new Playlist("urururururururu", 33, "werwfw");
        // usuario.addPlaylist(playlist3);
        //   usuario.addPlaylist()
        //   usuario.getAllPlaylistsNome();
        break;
      default:
        break;
    }
    if (inptOpt.toLowerCase() == "s") {
      controleScreenHome = false;
    }
  }
}

function main() {
  // Verifica se user está no localstorage, caso contrario ele registra um novo

  if (Sistema.validUser("Usuario").status) {
    console.log("===========================");
    console.log(`Bem-vindo(a) ${Sistema.getUserAuth().user.nome}`);
    console.log("===========================");

    var usuario = localStorage.getItem("Usuario");

    if (usuario !== null) {
      var user = Usuario.fromJSON(JSON.parse(usuario));
      screenHome(user);
    }

    // console.log(Sistema.validUser("Usuario").userJSON);
  } else {
    console.log("Você não se cadastrou no sistema!");
    let constrole = true;
    while (constrole) {
      let inptNome = prompt("nome: ");
      let inptUsername = prompt("username: ");
      let id = 1;

      const user = new Usuario(inptNome, id, inptUsername, null);

      localStorage.setItem("Usuario", JSON.stringify(user.toJSON()));
      if (user) {
        constrole = false;
      }
    }
  }
  main();
}

main();

// var usuario = localStorage.getItem("Usuario");

//     if (usuario !== null) {
//         var user = Usuario.fromJSON(JSON.parse(usuario));
//         // user.addPlaylist(playlist1);
//         screenHome(user);
//         console.log(user)
//     }
