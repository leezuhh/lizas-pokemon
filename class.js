function getPokemonId(name){ //get the id of the pokemon from pkmList
  for (var i=0; i<pkmList.length; i++){
    if (pkmList[i][0] == name){
      return i;
    }
  }
}

function getMove(name){ //get the move
  for (movetype of moveArray){
    for (move of movetype){
      if (move.name == name){
        return move;
      }
    }
  }
}

class Trainer {
  constructor(name, pokemon, charImg="images/"+name+".png", charX=0, charY=0){
    this.name = name;
    this.defeated = false;
    this.img = charImg;
    this.x = charX;
    this.y = charY;
    this.pokemon = pokemon;
  }
}

class Pokemon {
  constructor(name, type, level, moveType, moveset=[], exp=0, nickname=name, hp=level*100){
    this.name = name;
    this.nickname = nickname;
    this.type = type;
    this.level = level;
    this.hp = hp;
    this.maxHP = level * 100;
    this.exp = exp;
    this.possibleMoves = moveType;
    this.baseDamage = 10 + 5*level;
    this.knownMoves = [];
    for (var move of moveset){
      var moveObj = getMove(move);
      // console.log(moveObj);
      this.knownMoves.push(moveObj);
    }
    if (this.knownMoves == []){
      this.knownMoves.push("Tackle");
      this.getMoves();
    }
  }
  getMoves(){ //for pokemon spawning in - determine how many moves to add
    this.knownMoves.push(this.possibleMoves[0]);
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

//a move with 1000 accuracy will never miss
class Move{ //maybe add another attribute: a function for an added effect? like, drain, multi, lowerDef etc?
  constructor(name, type, damage, accuracy){
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.accuracy = accuracy;
  }
  hit(){
    //rolls to see if attack hits. returns true (hit) or false (miss)
    var chance = Math.floor(Math.random()*100);
    if (chance < this.accuracy){
      return true;
    }
    return false;
  }
  doDamage(enemyPkm){
    //tests against type to see how much damage is done
    var damageDealt = this.damage; //easier to do dual types later if i get to it?
    switch (enemyPkm.type){
      case "Normal":
        if (this.type == "Fighting"){
          damageDealt *= 2;
        }
        else if (this.type == "Ghost"){
          return 0;
        }
        break;
      case "Fire":
        if (this.type == "Water" || this.type == "Ground" || this.type == "Rock"){
          damageDealt *= 2;
        }
        if (this.type == "Fire" || this.type == "Grass" || this.type == "Ice" || this.type == "Bug" || this.type == "Steel" || this.type == "Fairy"){
          damageDealt *= 0.5;
        }
        break;
      case "Water":
        if (this.type == "Grass" || this.type == "Electric"){
          damageDealt *= 2;
        }
        if (this.type == "Fire" || this.type == "Water" || this.type == "Ice" || this.type == "Steel"){
          damageDealt *= 0.5;
        }
        break;
      case "Grass":
        if (this.type == "Fire" || this.type == "Ice" || this.type == "Poison" || this.type == "Flying" || this.type == "Bug"){
          damageDealt *= 2;
        }
        if (this.type == "Water" || this.type == "Grass" || this.type == "Electric" || this.type == "Ground"){
          damageDealt *= 0.5;
        }
        break;
      case "Electric":
        if (this.type == "Ground"){
          damageDealt *= 2;
        }
        if (this.type == "Electric" || this.type == "Flying" || this.type == "Steel"){
          damageDealt *= 0.5;
        }
        break;
      case "Ice":
        if (this.type == "Fire" || this.type == "Fighting" || this.type == "Rock" || this.type == "Steel"){
          damageDealt *= 2;
        }
        if (this.type == "Ice"){
          damageDealt *= 0.5;
        }
        break;
      case "Fighting":
        if (this.type == "Flying" || this.type == "Psychic" || this.type == "Fairy"){
          damageDealt *= 2;
        }
        if (this.type == "Bug" || this.type == "Rock" || this.type == "Dark"){
          damageDealt *= 0.5;
        }
        break;
      case "Poison":
        if (this.type == "Ground" || this.type == "Psychic"){
          damageDealt *= 2;
        }
        if (this.type == "Grass" || this.type == "Fighting" || this.type == "Poison" || this.type == "Bug" || this.type == "Fairy"){
          damageDealt *= 0.5;
        }
        break;
      case "Ground":
        if (this.type == "Water" || this.type == "Grass" || this.type == "Ice"){
          damageDealt *= 2;
        }
        if (this.type == "Poison" || this.type == "Rock"){
          damageDealt *= 0.5;
        }
        if (this.type == "Electric"){
          damageDealt *= 0;
        }
        break;
      case "Flying":
        if (this.type == "Electric" || this.type == "Ice" || this.type == "Rock"){
          damageDealt *= 2;
        }
        if (this.type == "Grass" || this.type == "Fighting" || this.type == "Bug"){
          damageDealt *= 0.5;
        }
        if (this.type == "Ground"){
          damageDealt *= 0;
        }
        break;
      case "Psychic":
        if (this.type == "Bug" || this.type == "Ghost" || this.type == "Dark"){
          damageDealt *= 2;
        }
        if (this.type == "Grass" || this.type == "Fighting" || this.type == "Ground"){
          damageDealt *= 0.5;
        }
        break;
      case "Bug":
        if (this.type == "Fire" || this.type == "Flying" || this.type == "Rock"){
          damageDealt *= 2;
        }
        if (this.type == "Grass" || this.type == "Fighting" || this.type == "Ground"){
          damageDealt *= 0.5;
        }
        break;
      case "Rock":
        if (this.type == "Water" || this.type == "Grass" || this.type == "Fighting" || this.type == "Ground" || this.type == "Steel"){
          damageDealt *= 2;
        }
        if (this.type == "Normal" || this.type == "Fire" || this.type == "Poison" || this.type == "Flying"){
          damageDealt *= 0.5;
        }
        break;
      case "Ghost":
        if (this.type == "Ghost" || this.type == "Dark"){
          damageDealt *= 2;
        }
        if (this.type == "Poison" || this.type == "Bug"){
          damageDealt *= 0.5;
        }
        if (this.type == "Normal" || this.type == "Fighting"){
          damageDealt *= 0;
        }
        break;
      case "Dragon":
        if (this.type == "Ice" || this.type == "Dragon" || this.type == "Fairy"){
          damageDealt *= 2;
        }
        if (this.type == "Fire" || this.type == "Water" || this.type == "Grass"|| this.type == "Electric"){
          damageDealt *= 0.5;
        }
        break;
      case "Dark":
        if (this.type == "Fighting" || this.type == "Bug" || this.type == "Fairy"){
          damageDealt *= 2;
        }
        if (this.type == "Ghost" || this.type == "Dark"){
          damageDealt *= 0.5;
        }
        if (this.type == "Psychic"){
          damageDealt *= 0;
        }
        break;
      case "Steel":
        if (this.type == "Fire" || this.type == "Fighting" || this.type == "Ground"){
          damageDealt *= 2;
        }
        if (this.type == "Normal" || this.type == "Grass" || this.type == "Ice" || this.type == "Flying" || this.type == "Psychic" || this.type == "Bug" || this.type == "Rock" || this.type == "Dragon" || this.type == "Steel" || this.type == "Fairy"){
          damageDealt *= 0.5;
        }
        break;
      case "Fairy":
        if (this.type == "Poison" || this.type == "Steel"){
          damageDealt *= 2;
        }
        if (this.type == "Fighting" || this.type == "Bug" || this.type == "Dark"){
          damageDealt *= 0.5;
        }
        if (this.type == "Dragon"){
          damageDealt *= 0;
        }
        break;
    }
    return damageDealt;
  }
}

// tester

// var testee2 = new Pokemon("Alolan Rapidash", "Fairy", 20, fairyMoves, 0, "Dashie", 200, []);

// console.log(testeeMove.doDamage(testee2));

$(document).ready(function() {
  var testee = new Pokemon("Gengar", "Ghost", 1000, ghostMoves, 0, "Ghostie", 100000, ["Tackle", "Lick"]);
  // console.log(testee.knownMoves);
})