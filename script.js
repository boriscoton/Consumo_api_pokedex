const lista_pokemon = document.getElementById('lista_pokemon');
const buttons = document.getElementById('buttons');
const input = document.getElementById('input')

const apiPokemon = 'https://pokeapi.co/api/v2/pokemon';

let botonSigue;
let botonAnte;
let plantillaHtml;

const getPokemon = async(url)=>{
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results)
        dataPokemon(results.results)

        botonSigue=results.next ? `<button onclick="masPoke(this)"  class="button" data-url=${results.next}>
        <span class="text">Siguiente</span>
        <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
        </button>` : '';
        botonAnte=results.previous ? `<button onclick="masPoke(this)" class="button" data-url=${results.previous}">
        <svg class="arrow2" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
        <span class="text">Anterior</span>
        </button>`:'';
        buttons.innerHTML=botonAnte + " " + botonSigue

    } catch (error) {
        console.log(error)
    }
}

getPokemon(apiPokemon)

async function dataPokemon(data) {
    lista_pokemon.innerHTML = '';
    try {
        for (let index of data) {
            const resp = await fetch(index.url);
            const resul = await resp.json();
            console.log(resul);

            const tiposPokemon = resul.types.map(type => type.type.name);
            const habilidadesPokemon = resul.abilities.map(ability => ability.ability.name);

            const tiposHtml = tiposPokemon.map(tipo => `<p class="tipo">${tipo}</p>`).join(' ');
            const habilidadesHtml = habilidadesPokemon.map(habilidad => `<p class="habilidad">${habilidad}</p>`).join(' ');

            const plantillaHtml = `
                <div class="pokemon_img">
                    <div class="numero"><p><strong>N.° ${resul.id}</strong></p><h3>${resul.name}</h3></div>
                    <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name} />
                    <hr>
                    <p><strong>Tipo</strong></p>
                    ${tiposHtml}
                    <p><strong>Habilidades</strong></p>
                    
                    <p><strong>Puntos de base</strong>  <span>${resul.base_experience}</span></p>
                </div>
            `;

            lista_pokemon.innerHTML += plantillaHtml;
        }
    } catch (error) {
        console.log(error);
    }
}

function masPoke(button) {
    try {
        const url = button.getAttribute('data-url');
        console.log(url);
        getPokemon(url);
    } catch (error) {
        console.log(error)
    }
}

async function buscarPokemon() {
    const nombrePokemon = document.getElementById('input').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}/`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            mostrarPokemon(data);
        } else {
            console.error('No se encontró un Pokémon con ese nombre.');
        }
    } catch (error) {
        console.error('Error al buscar el Pokémon:', error);
    }

    limpiarInput();
}

function mostrarPokemon(data) {
    const lista_pokemon = document.getElementById('lista_pokemon');
    lista_pokemon.innerHTML = '';

    const tiposPokemon = data.types.map(type => type.type.name);
    const habilidadesPokemon = data.abilities.map(ability => ability.ability.name);

    const tiposHtml = tiposPokemon.map(tipo => `<p class="tipo">${tipo}</p>`).join(' ');
    const habilidadesHtml = habilidadesPokemon.map(habilidad => `<p class="habilidad">${habilidad}</p>`).join(' ');

    const plantillaHtml = `
        <div class="pokemon_img">
            <div class="numero"><p><strong>N.° ${data.id}</strong></p><h3>${data.name}</h3></div>
            <img src=${data.sprites.other.dream_world.front_default} alt=${data.name} />
            <hr>
            <p><strong>Tipo</strong></p>
            ${tiposHtml}
            <p><strong>Habilidades</strong></p>
            ${habilidadesHtml}
            <p>Experiencia Base <span>${data.base_experience}</span></p>
        </div>
        <div class="conteiner-buscador">
        <button id="volver" onclick="getPokemon(apiPokemon)">Volver</button>
        </div>
    `;

    lista_pokemon.innerHTML += plantillaHtml;
}

function limpiarInput() {
    input.value = '';
}