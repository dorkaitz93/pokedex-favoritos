const busqueda = document.getElementById("form-busqueda");
const inputPokemon = document.getElementById("nombre-pokedex");
const tarjeta = document.getElementById("tarjeta-pokemon");

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
          await fetch("backend/agregar-favorito.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pokemon)
          });
          alert(datos.name +  "Guardado en favoritos");
          
        } catch (error) {
          console.error("No se a podido guardar a favoritos", error);
        }
      });
    } catch (error) {
      console.log("error al cargar el pokemon", error);
    }
  }
});
