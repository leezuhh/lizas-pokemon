var fireMoves = ["Ember", "Flamethrower", "Fire Punch", "Fire Fang", "Flare Blitz", "Blaze Kick", "Incinerate", "Sacred Fire"]; //8 moves per type
var waterMoves = ["Bubble Beam", "Water Gun", "Aqua Jet", "Liquidation", "Hydro Pump", "Scald", "Surf", "Sparkling Aria"];
var grassMoves = ["Vine Whip", "Bullet Seed", "Leech Seed", "Energy Ball", "Petal Dance", "Leaf Blade", "Giga Drain", "Solar Beam"];
var electricMoves = ["Thunderbolt", "Volt Tackle", "Electro Ball", "Charge Beam", "Bolt Strike", "Thunder Fang", "Wild Charge", "Zap Cannon"];
var flyingMoves = ["Wing Attack", "Air Slash", "Drill Peck", "Fly", "Gust", "Sky Attack", "Brave Bird", "Aeroblast"];
var poisonMoves = ["Toxic", "Sludge Bomb", "Acid", "Gunk Shot", "Poison Fang", "Cross Poison", "Venoshock", "Smog"];
var fairyMoves = ["Fairy Wind", "Charming Voice", "Moonblast", "Play Rough", "Draining Kiss", "Sparkly Swirl", "Dazzling Gleam", "Fleur Cannon"];
var normalMoves = ["Scratch", "Slash", "Strength", "Comet Punch", "Multi-Attack", "Hyper Fang", "Judgement", "Giga Impact"];
var bugMoves = ["Bug Bite", "Pin Missile", "Lunge", "Twineedle", "Bug Buzz", "X-Scissor", "Signal Beam", "Megahorn"];
var ghostMoves = ["Night Shade", "Lick", "Shadow Ball", "Spectral Thief", "Hex", "Ominous Wind", "Phantom Force", "Trick-or-Treat"];
var psychicMoves = ["Psybeam", "Telekinesis", "Zen Headbutt", "Heart Stamp", "Extrasensory", "Psystrike", "Glitzy Glow", "Photon Geyser"];

var moveArray = [fireMoves, waterMoves, grassMoves, electricMoves, flyingMoves, poisonMoves, fairyMoves, normalMoves, bugMoves, ghostMoves, psychicMoves];
var types = ["Fire", "Water", "Grass", "Electric", "Flying", "Poison", "Fairy", "Normal", "Bug", "Ghost", "Psychic"];
//there's probably a more efficient way to do this but that's for Future Liza to figure out

//ok so for evolution: I'm going to have a list of all of the Pokemon. When trying to evolve you first check to see if it's a Pokemon that can evolve at all, and if so, then you find the indexOf the Pokemon name in the Pokemon name list, and then go one index further.
var pkmList = [["Pikachu", "Electric"], ["Raichu", "Electric"], ["Charmander", "Fire"], ["Charmeleon", "Fire"], ["Charizard", "Fire"], ["Squirtle", "Water"], ["Wartortle", "Water"], ["Blastoise", "Water"], ["Bulbasaur", "Grass"], ["Ivysaur", "Grass"], ["Venusaur", "Grass"], ["Pidgey", "Flying"], ["Pidgeotto", "Flying"], ["Pidgeot", "Flying"], ["Caterpie", "Bug"], ["Metapod", "Bug"], ["Butterfree", "Bug"], ["Ekans", "Poison"], ["Arbok", "Poison"], ["Jigglypuff", "Fairy"], ["Wigglytuff", "Fairy"], ["Zubat", "Poison"], ["Golbat", "Poison"], ["Crobat", "Poison"], ["Oddish", "Grass"], ["Gloom", "Poison"], ["Vileplume", "Poison"], ["Doduo", "Normal"], ["Dodrio", "Normal"], ["Vulpix", "Fire"], ["Ninetales", "Fire"], ["Gastly", "Ghost"], ["Haunter", "Ghost"], ["Gengar", "Ghost"], ["Weedle", "Bug"], ["Kakuna", "Bug"], ["Beedrill", "Bug"], ["Clefairy", "Fairy"], ["Clefable", "Fairy"], ["Meowth", "Normal"], ["Persian", "Normal"], ["Growlithe", "Fire"], ["Arcanine", "Fire"], ["Magnemite", "Electric"], ["Magneton", "Electric"], ["Magnezone", "Electric"], ["Lapras", "Water"], ["Rattata", "Normal"], ["Raticate", "Normal"], ["Psyduck", "Water"], ["Golduck", "Water"], ["Mewtwo", "Psychic"]];

var wildPokemon = [["Pidgey", "Flying"], ["Caterpie", "Bug"], ["Ekans", "Poison"], ["Jigglypuff", "Fairy"], ["Zubat", "Flying"], ["Oddish", "Grass"], ["Doduo", "Normal"], ["Vulpix", "Fire"], ["Gastly", "Ghost"], ["Rattata", "Normal"], ["Weedle", "Bug"], ["Clefairy", "Fairy"], ["Meowth", "Normal"], ["Growlithe", "Fire"]]; //list of wild Pokemon to grab from for a random encounter

var trainerList = [["Kyle", ["Rattata"], 5], ["Emma", ["Oddish"], 10], ["Kovas", ["Golduck"], 20], ["Cora", ["Growlithe"], 25], ["Basilio", ["Magnemite"], 30], ["Isabel", ["Ninetales"], 40], ["Amy", ["Haunter"], 45], ["Zoya", ["Lapras"], 50], ["Albinson", ["Mewtwo"], 100]]; 
//possible "trainers" (lol) to fight in a battle - progression

function getPokemonId(name){ //get the id of the pokemon from pkmList
  console.log("hello? " + name);
  for (var i=0; i<pkmList.length; i++){
    if (pkmList[i][0] == name){
      console.log(pkmList[i]);
      return i;
    }
  }
}

class Trainer {
  constructor(name, pokemon, level, charImg="", charX=0, charY=0){
    this.name = name;
    this.defeated = false;
    this.img = charImg;
    this.x = charX;
    this.y = charY;
    this.pokemon = [];
    for (var n=0; n<pokemon.length; n++){
      var pkmId = getPokemonId(pokemon[n]);
      this.pokemon.push(new Pokemon(pkmList[pkmId][0], pkmList[pkmId][1], level));
    }
  }
}

class Pokemon {
  constructor(name, type, level, exp=0, nickname=name, hp=level*100){
    this.knownMoves = ["Tackle"];
    this.name = name;
    this.nickname = nickname;
    this.type = type;
    this.level = level;
    this.hp = hp;
    this.maxHP = level * 100;
    this.exp = exp;
    this.baseDamage = 10 + 5*level;
    this.getMoves();
  }
  getMoves(){ //for pokemon spawning in - determine how many moves to add
    var typeDex = types.indexOf(this.type);
    var typeMoves = moveArray[typeDex]; //list with all this type's possible moves
    this.knownMoves.push(typeMoves[0]);
    var numMoves = Math.floor(this.level / 5);
    if (numMoves <= 7){
      for (var i=1; i<=numMoves; i++){
        this.knownMoves.push(typeMoves[i]);
      }
    }
  }
  levelup(){
    this.level += 1;
    this.baseDamage += 5;
    this.hp += 100;
    this.maxHP += 100;
    $("#0 .lvl").text(starter.level);
    text("Your " + this.nickname + " leveled up to level " + this.level + "!", x, y);
    y += 15;
    this.exp = this.exp - 50;
    if (this.level % 5 == 0 && this.level <= 35){
      this.addMove();
    }
  }
  //this is for player Pokemon ONLY
  addMove(){
    var typeDex = types.indexOf(this.type);
    var typeMoves = moveArray[typeDex]; //list with all this type's possible moves
    //let's try our hand at a switch statement!
    var addedMove;
    switch (this.level){
      case 5:
        addedMove = typeMoves[1];
        break;
      case 10:
        addedMove = typeMoves[2];
        break;
      case 15:
        addedMove = typeMoves[3];
        this.evolve();
        break;
      case 20:
        addedMove = typeMoves[4];
        break;
      case 25:
        addedMove = typeMoves[5];
        break;
      case 30:
        addedMove = typeMoves[6];
        this.evolve();
        break;
      case 35:
        addedMove = typeMoves[7];
        break;
    }

    this.knownMoves.push(addedMove);

    if (this.knownMoves.length <= 4){
      var recentMove = this.knownMoves.length-1;
      var buttonToBeAdded = "<button onclick='useMove("+recentMove+")' class='btn'>"+addedMove+"</button>";
      $("#moves").append(buttonToBeAdded);
      
      text("Your " +this.nickname+" learned " + this.knownMoves[recentMove] + "!", x, y);
      y += 15;
    }
    else {
      text("Your " + this.nickname + " already knows 4 moves. Please select a move to remove.", x, y);
      y += 15;
      for (var i=0; i<this.knownMoves.length; i++){
        var btba = "<button onclick='starter.removeMove("+i+")' class='btn' id='"+i+"'>"+this.knownMoves[i]+"</button>";
        $("#moveSet").append(btba);
      }
      $("#moveSet").show();
    }

    console.log(this.knownMoves);
  }

  removeMove(id){
    $("#moveSet").empty();

    var rMInd = this.knownMoves.length-1;
    var rM = this.knownMoves[rMInd];

    var removedMove = this.knownMoves[id];
    var arr1 = this.knownMoves.slice(0, id);
    var arr2 = this.knownMoves.slice(id+1, rMInd+1);
    this.knownMoves = arr1.concat(arr2);

    $("#moveSet").hide();
    var buttonToBeAdded = "<button onclick='useMove("+rMInd+")' class='btn'>"+rM+"</button>";
    $("#moves").append(buttonToBeAdded);
    
    text("The move "+removedMove+" has been removed. Your " +this.nickname+" learned " + rM + "!", x, y);
    y += 15;
  }

  evolve(){
    if (this.name == "Raichu" || this.name == "Arbok" || this.name == "Dodrio" || this.name == "Ninetales" || this.name == "Wigglytuff" || this.name == "Clefable" || this.name == "Lapras" || this.name == "Raticate" || this.name == "Golduck"){
      console.log("Evolution failed");
      //fucking don't do anything I guess
    }
    else {
      var newNameIndex = getPokemonId(this.name) + 1;
      this.name = pkmList[newNameIndex][0];
      this.type = pkmList[newNameIndex][1];
      $("#0 .species").text(this.name);
      $("#0 img").attr("src", "images/"+this.name+".png");
      $("#starterImage").attr("src", "images/"+this.name+".png");
      text("Congratulations! Your " + this.nickname + " evolved into a " + this.name + "!", x, y);
      y += 15;
    }
  }
}

class Tile{
  constructor(x, y, type){
    //type will be: path (no chance of Pokemon encounter), trainer (fight trainer), grass (chance of wild Pokemon). we can also have shop (shop)
    this.x = x;
    this.y = y;
    this.type = type;
  }
  walk(){
    if (this.type == "trainer"){
      //trainer fight
    }
    else if (this.type == "grass"){
      //chance of wild Pokemon encounter - roll
    }
    else if (this.type == "shop"){
      //open the shop
      //we also need to close the shop if leaving the tile
    }
  }
}