const busqueda = document.getElementById("form-busqueda");
const inputPokemon = document.getElementById("nombre-pokedex");
const tarjeta = document.getElementById("tarjeta-pokemon");
busqueda.addEventListener('submit', async function(e) {

        e.preventDefault();
        
        const nombre = inputPokemon.value;
        if(nombre.length <= 0){
            alert("Tienes que introducir un nombre");

        }else{
        try{
            // 1. Pide los datos (Añade toLowerCase() para evitar errores si escriben "Pikachu")
            const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/' + nombre.toLowerCase());
            
            // 2. Comprueba si existe (si escriben "agumon" la api da error 404)
            if(!respuesta.ok) {
                alert("Pokemon no encontrado");
                return;
            }

            // 3. Convierte a JSON
            const datos = await respuesta.json();

            tarjeta.innerHTML=`
        
            <h3>${datos.name}</h3>
            <img src="${datos.sprites.front_default}" alt="pokemon">
            <p>id:${datos.id}</p>
            <p>Tipo:${datos.types[0].type.name}</p>
            <button id= "guardar">Añadir a favoritos</button
            `;

        }catch(error){
            console.log('error al cargar el pokemon', error);
        }
    }
});
