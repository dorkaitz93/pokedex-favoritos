const busqueda = document.getElementById("form-busqueda");
const inputPokemon = document.getElementById("nombre-pokedex");
const tarjeta = document.getElementById("tarjeta-pokemon");
const contenedorFavoritos = document.getElementById("favoritos");
let pokemonFavorito;
busqueda.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = inputPokemon.value;
  if (nombre.length <= 0) {
    alert("Tienes que introducir un nombre");
  } else {
    try {

      const respuesta = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase()
      );

      
      if (!respuesta.ok) {
        alert("Pokemon no encontrado");
        return;
      }

      // 3. Convierte a JSON
      const datos = await respuesta.json();
      pokemonFavorito = datos;

      tarjeta.innerHTML = `
        
            <h3>${datos.name}</h3>
            <img src="${datos.sprites.front_default}" alt="pokemon">
            <p>id:${datos.id}</p>
            <p>Tipo:${datos.types[0].type.name}</p>
            <button id= "guardar">Añadir a favoritos</button
            `;

      const guardar = document.getElementById("guardar");

      guardar.addEventListener("click", async function () {

        const pokemon = {
        api_id: pokemonFavorito.id,
        nombre: pokemonFavorito.name,
        tipo: pokemonFavorito.types[0].type.name,
        imagen: pokemonFavorito.sprites.front_default,
      };
        try {
          await fetch("backend/agregar-favoritos.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pokemon)
          });
          alert(datos.name +  " Guardado en favoritos");
          
        } catch (error) {
          console.error("No se a podido guardar a favoritos", error);
        }
      });
    } catch (error) {
      console.log("error al cargar el pokemon", error);
    }
  }
});

async function mostrarFavoritos(){
  

  try{
     const respuesta = await fetch('backend/listar-favoritos.php');

     if (!respuesta.ok) {
        throw new Error("Error en la respuesta del servidor");
    }
     const listaFavoritos = await respuesta.json();

     contenedorFavoritos.innerHTML = '';
     let htmlContent = '';

    listaFavoritos.forEach(pokemon =>{

      htmlContent += `
          <div class ="contenido">
            <h3>${pokemon.nombre}</h3>
            <img src="${pokemon.imagen}" alt="pokemon">
            <p>id:${pokemon.id}</p>
            <p>Tipo:${pokemon.tipo}</p>
            </div> 
            `; 
    });

    contenedorFavoritos.innerHTML = htmlContent;
      
     
  }catch(error){
    alert("No se a podido mostrar los pokemon favoritos")
  }
}
mostrarFavoritos();