export function getPokeUrl(pokemon){
    let pokeUrl;
    switch(pokemon){
        case 'pikachu':
            pokeUrl = "./images/pokemons/pikachu.svg";
            break;
        case 'rattata':
            pokeUrl = "./images/pokemons/rattata.svg";
            break;
        case 'snorlax':
                pokeUrl = "./images/pokemons/snorlax.svg";
                break;
        default:
            pokeUrl = "./images/pokemons/egg.svg";
            
    }
    return pokeUrl;
}