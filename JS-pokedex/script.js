var pokemonInfo = []
var pokePics = []
var pokemon

async function getPokemon(pokemonCount){
  if(localStorage.getItem("pokemon") === null || JSON.parse(localStorage.getItem("pokemon")).length < pokemonCount) {
    pokemon = []
    await fetchManyPokemon(pokemonCount)
    await fetchPokemonImages()
    await makePokemonList(pokemonCount)
    localStorage.setItem("pokemon", JSON.stringify(pokemon))
  }
  else {
   pokemon = JSON.parse(localStorage.getItem("pokemon"))
  }
}

async function fetchManyPokemon(pokemonCount) {
  for(var i = 1; i <= pokemonCount; i++){
    await fetchPokemon(i)
  }
}

async function fetchPokemon(pokemonId) {  
  var response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonId.toString()+'/')
  var poke = await response.json()
  pokemonInfo.push(poke)
}

async function fetchPokemonImage(pokemonInfo) {
  var imageUrl = pokemonInfo.sprites.front_default
  
  var imageResponse = await fetch(imageUrl)
  var image = await imageResponse.blob()
  
  var base64 = await getBase64(image)
  
  pokePics.push(base64)
}



async function fetchPokemonImages() {
  for(var i = 0; i < pokemonInfo.length; i++){
    await fetchPokemonImage(pokemonInfo[i])
  }
}

function makePokemonList(pokemonCount) {
  for(var i = 0; i < pokemonCount; i++){
    pokemon.push(new Pokemon(i))
  }
}

function Pokemon(pokemonIndex) {
  var info = pokemonInfo[pokemonIndex]
  
  this.id = info.id
  this.name = info.name
  this.image = pokePics[pokemonIndex]
  
  this.types = []
  
  for(var i = 0; i < info.types.length; i++){
    var type = info.types[i].type.name
    this.types.push(type)
  }
  
  this.abilities = []
  
  for(var i = 0; i < info.abilities.length; i++){
    var ability = info.abilities[i].ability.name
    this.abilities.push(ability)
  }
  
}

function makePokemonHTML(pokemon) {
  var figure = document.createElement("figure")
  figure.id = "pokemon-"+pokemon.id.toString()
  
  var image = document.createElement("img")
  image.src = pokemon.image
  
  var caption = document.createElement("figcaption")
  var pokeName = document.createTextNode("#"+pokemon.id+": "+pokemon.name)
  caption.appendChild(pokeName)
  
  figure.appendChild(image)
  figure.appendChild(caption)
  
  return figure
}

function displayPokemonList() {
  var display =  document.getElementById("display")
  display.innerHTML = ""
  for(var i = 0; i < pokemon.length; i++) {
    display.appendChild(makePokemonHTML(pokemon[i]))
  }
}

function getTypesList() {
  var typesList = []
  for(var i = 0; i < pokemon.length; i++){
    for(var j = 0; j < pokemon[i].types.length; j++){
      var type = pokemon[i].types[j]
      if(typesList.indexOf(type) === -1){
        typesList.push(type)
      }
    }
  }
  typesList.sort() // alphabetize the list, to find things easily
  return typesList
}

function filterDexByType(){
  var selectedType = this.value

  for(var i=0; i < pokemon.length; i++){
    var fig = document.getElementById("pokemon-"+pokemon[i].id.toString())
    if(pokemon[i].types.indexOf(selectedType) === -1){
      if(selectedType === "all"){
        fig.style.display = "initial"
      }
      else{
        fig.style.display = "none"
      }
    }
    else {
      fig.style.display = "initial"
    }
  }

}

function createTypePicker() {
  var typePicker = document.getElementById("type-picker")
  var typesList = getTypesList()
  
  typePicker.innerHTML = "<option value=\"all\">all</option>"
  
  for(var i = 0; i < typesList.length; i++){
    var type = document.createElement("option")
    type.value = typesList[i]
    var typeName = document.createTextNode(typesList[i])
    type.appendChild(typeName)
    typePicker.appendChild(type)
  }

  typePicker.addEventListener("change", filterDexByType)
}

function searchDex(event) {
  event.preventDefault()
  var searchText = document.getElementById("pokemon-name").value
  searchText = searchText.toLowerCase()
  for(var i=0; i < pokemon.length; i++){
    var fig = document.getElementById("pokemon-"+pokemon[i].id.toString())
    if(pokemon[i].name.includes(searchText)){
      fig.style.display = "initial"
    }
    else {
      fig.style.display = "none"
    }
  }
}

async function buildDex(pokemonCount){
  await getPokemon(pokemonCount)
  displayPokemonList()
  createTypePicker()
  document.getElementById("pokemon-name-button").addEventListener("click",searchDex)
}

buildDex(25)
