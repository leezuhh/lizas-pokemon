//CURRENTLY FIXING: Attack buttons.
//Fix attack buttons when switching Pokemon
//Make sure the Pokeball button disappears when fighting a trainer

var x = 10;
var y = 15;
var myCanvas;
var starterList = [["Pikachu", "Electric"], ["Bulbasaur", "Grass"], ["Charmander", "Fire"], ["Squirtle", "Water"]];
var starter; //because I don't want to go and change everything, "starter" is just whatever Pokemon is "equipped"
var playerPokemon = []; //all total pokemon
var currentTrainer = null;
var enemyPokemon = null;
var enemiesDefeated = []; //trainers; to track progress
var vgfont;
var pokeballs = 0;
var potions = 0;
var pokecoins = 0;
var mapAllowed = false;

//variable for save/load
var user;

//variable for switching pkm
var ind1;

//map variables
var player = new Trainer("Player", [], 0, "char1.png", 12.5, 12.5);
var playerImg;
var tiles = [];

$(document).ready(function() {
  $("#pokemonInfo, #reset, #shop, #capture, #tester, #selector, #opener, #potion, #changeNN, #inder, #moveSet, #inventory, #blergh").hide();
})

function preload() {
  vgfont = loadFont("VGFONT.ttf");
  playerImg = loadImage("images/"+player.img);
}

function setup() {
  var subtract = $("footer").height();
  myCanvas = createCanvas(windowWidth*.5, subtract+75);
  myCanvas.parent("main");
  background(255);
  noLoop();
  strokeWeight(0.1);
  textFont(vgfont);
  imageMode(CENTER);
  rectMode(CENTER);
  textSize(20);
  setInterval(clearText, 10);
  $("canvas").hide();
}

function levelUp(){
  starter.levelup();
}
function blergh(){
  enemiesDefeated.push(["This is a tester enemy"]);
  console.log(enemiesDefeated);
}

function selectStarter(ind) {
  //name and type are from starterList, level 1
  starter = new Pokemon(starterList[ind][0], starterList[ind][1], 1);
  $("#selector").hide();
  $("canvas, #inventory").show();
  addToTeam(starter);
  document.getElementById("starterImage").src = "images/" + starter.name + ".png";
  document.getElementById("move1").innerHTML = starter.knownMoves[0];
  document.getElementById("move2").innerHTML = starter.knownMoves[1];
  startTrainerBattle("Isabel", ["Vulpix"], 1); //starting trainer battle always the same
}

function walk() {
  clear();
  allowMap();
  y = 15;
  text("You walked around outside.", x, y);
  y += 15;
  $("#shop").hide(); //bye bye shop <3
  if (currentTile.type == "grass"){
    //when walking, get a number 0-3. 0, nothing happens. 1-2, encounter wild Pokemon. 3, encounter trainer
    var chance = Math.floor(Math.random()*4);
    switch (chance){
      case 0:
        text("Nothing happened.", x, y)
        y += 15;
        break;
      case 1:
      case 2:
        var poke = Math.floor(Math.random()*wildPokemon.length);
        wildEncounter(wildPokemon[poke][0], wildPokemon[poke][1], starter.level);
        break;
      case 3:
      //   //progression - two regular trainers, then a more difficult trainer
        var progressionLevel = checkProgression();
        console.log(progressionLevel);
        if (progressionLevel == null){
          text("You encountered a Trainer, but they ignored you.", x, y);
          y += 15;
        }
        else {
          var trainer = trainerList[progressionLevel];
          startTrainerBattle(trainer[0], trainer[1], trainer[2]);
        }
        break;
    }
  }
  else if (currentTile.type == "shop"){
    shop();
    clearMap();
  }
  else {
    text("It's a beautiful day.", x, y);
    y += 15;
    draw();
  }
}

//begin a trainer battle
//we take: trainer name, pokemon name, pokemon type, pokemon level
function startTrainerBattle(trainer, pokemon, level){
  //pokemon is an ARRAY now
  clearMap();
  clear();
  y = 15;
  currentTrainer = new Trainer(trainer, pokemon, level);
  $("#trainerImage").show();
  $("#trainerImage").attr("src", "images/"+trainer+".png");
  enemyPokemon = currentTrainer.pokemon[0];
  text("Trainer "+trainer+" challenged you to a battle!", x, y);
  y += 15;
  text("Trainer "+trainer+" sent out " +pokemon[0]+"!", x, y);
  y += 15;
  attackText();
  
  //shop goes poof
  $("#shop, #capture, #run").hide();

  //what shows up: moves, enemy pokemon image, hp bars
  $("#pokemonInfo").show();
  document.getElementById("enemyImage").src = "images/" + pokemon[0] + ".png";
}

function wildEncounter(pokemon, type, lvl){
  clearMap();
  clear();
  $("#run").show();
  $("#trainerImage").hide(); //because my code hates me
  enemyPokemon = new Pokemon(pokemon, type, lvl);
  document.getElementById("enemyp").style.width = "100px";
  multiplier = 100/starter.maxHP;
  document.getElementById("starterp").style.width = starter.hp*multiplier + "px";
  text("You encountered a wild Level "+lvl+" "+pokemon+"!", x, y);
  y += 15;
  text("Go, " + starter.nickname + "!", x, y);
  y += 15;
  attackText();
  if (pokeballs > 0) {
    $("#capture").show();
  }
  if (potions > 0) {
    $("#potion").show();
  }
  $("#pokemonInfo").show();
  document.getElementById("enemyImage").src = "images/" + pokemon + ".png";
}

//for a PLAYER POKEMON, attacks
function useMove(id){
  var moves = starter.knownMoves;
  var move = moves[id];
  var damage = starter.baseDamage + id*5;
  moveText(starter.name, move, damage);
  dealDamage(damage, "enemy");
  attack(enemyPokemon);
}

//for a NON-PLAYER pokemon, decides which move they will use
function attack(pokemon){
  var moves = pokemon.knownMoves;
  var chance = Math.floor(Math.random()*moves.length);
  var move = moves[chance];
  var damage = pokemon.baseDamage + chance*5;
  moveText(pokemon.name, move, damage);
  attackText();
  dealDamage(damage, "player");
}

//literally just says "What will you do?" because I'm lazy!
function attackText(){
  text("What will you do?", x, y);
  y += 15;
}

function moveText(name, move, damage) {
  text(name + " used " + move + "! It did " + damage + " damage!", x, y);
  y += 15;
}

function capture(){
  y = 15;
  clear();
  if (pokeballs > 0){
    var chance = Math.random()*10;
    var value = 1 * (enemyPokemon.maxHP / enemyPokemon.hp);
    pokeballs--;
    text("You threw a Pokeball!", x, y);
    $("#balls").text(pokeballs);
    y += 15;
    if (chance <= value){
      //catch pokemon
      text("You caught the wild Level " + enemyPokemon.level + " " + enemyPokemon.name + "!", x, y);
      addToTeam(enemyPokemon);
      y += 15;
      enemiesDefeated.push(enemyPokemon);
      enemyPokemon = null;
      $("#pokemonInfo").hide();
      $(".change").show();
      allowMap();
    }
    else{
      //check if out of pokeballs. if so, remove "throw a pokeball" button
      text("The wild Level " + enemyPokemon.level + " " + enemyPokemon.name + " burst free!", x, y);
      y += 15;
      if (pokeballs == 0){
        text("You are out of Pokeballs!", x, y);
        y += 15;
        $("#capture").hide();
        attackText();
        attack(enemyPokemon);
      }
    }
  }
  else{
    text("You are out of Pokeballs!", x, y);
    y += 15;
  }
}

//deal damage - "receiver" will either be the starter pokemon or the enemy pokemon. Only effects HP
function dealDamage(damage, receiver){
  var multiplier;
  if (receiver == "enemy"){
    multiplier = 100/enemyPokemon.maxHP; //like ex: 100/200 = 1/2
    enemyPokemon.hp -= damage;
    document.getElementById("enemyp").style.width = enemyPokemon.hp*multiplier + "px";
    if (enemyPokemon.hp <= 0){
      document.getElementById("enemyp").style.width = "0px";
      //check if they have any more Pokemon
      var allDefeated = true;
      if (currentTrainer != null){
        for (var i=0; i<currentTrainer.pokemon.length; i++){
          var faintedPkm = currentTrainer.pokemon.shift();
          currentTrainer.pokemon.push(faintedPkm);
          if (currentTrainer.pokemon[0].hp > 0){
            allDefeated = false;
            enemyPokemon = currentTrainer.pokemon[i];
            //change hp bar and image
            multiplier = 100/enemyPokemon.maxHP;
            document.getElementById("enemyp").style.width = enemyPokemon.hp*multiplier + "px";
            $("#enemyImage").attr("src", "images/" + enemyPokemon.name + ".png");
  
            clear();
            y = 15;
            text("Trainer " + currentTrainer.name + "'s Pokemon fainted!", x, y);
            y += 15;
            text("They sent out " + enemyPokemon.name + "!", x, y);
            y += 15;
            break;
          }
        }
      }
      if (allDefeated){
        win();
      }
    }
  }

  else if (receiver == "player"){
    multiplier = 100/starter.maxHP;
    starter.hp -= damage;
    document.getElementById("starterp").style.width = starter.hp*multiplier + "px";
    if (starter.hp <= 0){
      starter.hp = 0;
      document.getElementById("starterp").style.width = "0px";
      lose();
    }
  }
}

function heal(){
  for (var i=0; i<playerPokemon.length; i++){
    playerPokemon[i].hp = playerPokemon[i].maxHP;
  }
  text("Pokemon healed. Thank you for visiting the Pokemart!", x, y);
  y += 15;
  //and then fill the hp bar for next battle
  document.getElementById("starterp").style.width = "100px";
}

function usePotion(){
  if (potions > 0){
    potions--;
    text("1 potion used! You have " + potions + " potions left!", x, y);
    $("#pot").text(potions);
    y += 15;
    if (starter.hp < starter.maxHP - 20){
      starter.hp += 20;
    }
    else {
      starter.hp = starter.maxHP;
    }
    multiplier = 100/starter.maxHP;
    document.getElementById("starterp").style.width = starter.hp*multiplier + "px";
  }
  else {
    text("You have no potions!", x, y);
    y += 15;
  }
  
}

function win(){
  clear();
  y = 15;
  allowMap();
  var coinsEarned = 0;
  $("#pokemonInfo").hide();
  if (currentTrainer != null){
    currentTrainer.defeated = true;
    enemiesDefeated.push(currentTrainer);
    $("#capture, #run").show();
    $("#trainerImage").hide();
    text("You won the battle against Trainer " + currentTrainer.name + "!", x, y);
    y+=15;
    currentTrainer = null;
    coinsEarned += 10 * enemyPokemon.level;
  }
  else {
    enemiesDefeated.push(enemyPokemon);
    text("You won the battle against the Level " + enemyPokemon.level + " " + enemyPokemon.name + "!", x, y);
    y += 15;
  }
  if (enemiesDefeated.length == 1){
    clearMap();
    $("#shop").show();
    clear();
    text("You can now visit the shop on the right side of the screen!", x, y);
    y+=15;
  }
  starter.exp += 10;
  if (starter.exp >= 50){
    starter.levelup();
  }
  coinsEarned += 10;
  pokecoins += coinsEarned;
  text("You earned "+coinsEarned+" Pokecoins!", x, y);
  y+=15;
  document.getElementById("goldCount").innerHTML = ""+pokecoins+"";
  enemyPokemon = null;
}

function lose(){
  var allDefeated = true; //assume all are fainted unless you see otherwise
  var liveInd;
  for (var i=playerPokemon.length-1; i>0; i--){
    if (playerPokemon[i].hp > 0){
      allDefeated = false;
      liveInd = i;
    }
  }
  if (allDefeated == true){
    y = 15;
    clear();
    $("#moves, #starterImage, #capture").hide();
    $("#reset").show();
    text("The enemy "+enemyPokemon.name+" defeated you!", x, y);
    y+=15;
  }
  else {
    clear();
    y = 15;
    text("The enemy " + enemyPokemon.name + " defeated your " + starter.nickname + "!", x, y);
    y+=15;
    ind1 = 0;
    switchPokemon(liveInd);
    text("Your "+starter.nickname+" was sent out!", x, y);
    y+=15;
  }
}

function reset(){
  location.reload();
}

function buy(id){
  //id will signify what item is purchased
  switch (id){
    case 0:
      if (pokecoins < 10){
        text("You don't have enough Pokecoins to buy this item!", x, y);
        y += 15;
      }
      else {
        pokeballs++;
        pokecoins -= 10;
        text("One Pokeball purchased.", x, y);
        $("#balls").text(pokeballs);
        y += 15;
      }
      break;
    case 1:
      if (pokecoins < 5){
        text("You don't have enough Pokecoins to buy this item!", x, y);
        y += 15;
      }
      else {
        potions++;
        pokecoins -= 5;
        text("One potion purchased.", x, y);
        $("#pot").text(potions);
        y += 15;
      }
      break;
  }
  document.getElementById("goldCount").innerHTML = pokecoins;
}

function shop(){ //just shows the shop
  clearMap();
  clear();
  y = 15;
  text("Welcome back to the Pokemart!", x, y);
  y += 15;
  $("#pokemonInfo").hide();
  $("#shop, #openBox").show();
  player.y += 25;
  findCurrentTile(player.x, player.y);
}

function loadGame(){
  clearMap();
  y = 15;
  user = $("input#user").val(); //str
  if (user == "admin"){
    $("#tester, #blergh").show();
  }

  if (user == ""){
    $("canvas").show();
    text("Please enter a username.", x, y);
    y += 15;
  }
  else {
    //we need to split, then parse
    plpkm = localStorage.getItem(user+"pkm").split("!!");

    for (var i=0; i<plpkm.length; i++){
      var curPoke = objectToPokemon(JSON.parse(plpkm[i]));
      addToTeam(curPoke);
    }

    ende = localStorage.getItem(user+"ed").split("!!");

    for (var i=0; i<ende.length; i++){
      enemiesDefeated.push(JSON.parse(ende[i]));
    }

    pokeballs = parseInt(localStorage.getItem(user+"pb"));
    potions = parseInt(localStorage.getItem(user+"pt"));
    pokecoins = parseInt(localStorage.getItem(user+"pc"));

    starter = playerPokemon[0];
    document.getElementById("starterImage").src = "images/" + starter.name + ".png";
    $("#starterImage").show(); //incase you're loading after a loss
    document.getElementById("move1").innerHTML = starter.knownMoves[0];
    document.getElementById("move2").innerHTML = starter.knownMoves[1];
    $("#goldCount").text(pokecoins);
    $("#balls").text(pokeballs);
    $("#pot").text(potions);

    $("#menu").hide();
    $("#shop, canvas, #inventory").show();

    clear();
    y = 15;
    text("Welcome back!", x, y);
    y += 15;
  }

}

function newGame(){
  //note: localStorage only saves strings because it hates happiness
  //all arrays will need to be converted to and from strings with names separated with commas
  //can change to with array.join();
  //can change from with string.split(",")
  var user = $("input#user").val();
  fill(0);
  y = 15;
  if (user == ""){
    $("canvas").show();
    text("Please enter a username.", x, y);
    y += 15;
  }
  else {
    $("canvas").hide();
    clear();

    localStorage.setItem(user+"pkm", "");
    localStorage.setItem(user+"ed", "");
    localStorage.setItem(user+"pb", 0);
    localStorage.setItem(user+"pt", 0);
    localStorage.setItem(user+"pc", 0);

    $("#menu").hide();
    $("#opener").show();
  }

}

function saveGame(){
  //can only be done at a pokemart
  var plpkm = JSON.stringify(playerPokemon[0]);
  for (var i=1; i<playerPokemon.length; i++){
    plpkm = plpkm + "!!" + JSON.stringify(playerPokemon[i]);
  }
  localStorage.setItem(user+"pkm", plpkm);

  //now do the same for enemiesDefeated

  var ende = JSON.stringify(enemiesDefeated[0]);
  for (var i=1; i<enemiesDefeated.length; i++){
    ende = ende + "!!" + JSON.stringify(enemiesDefeated[i]);
  }
  localStorage.setItem(user+"ed", ende);

  //these are just integers so they don't need conversion... whew
  localStorage.setItem(user+"pb", pokeballs);
  localStorage.setItem(user+"pt", potions);
  localStorage.setItem(user+"pc", pokecoins);
  //ok so this shit just isn't saving right... TF??

  text("Game saved!", x, y);
  y += 15;
}

function objectToPokemon(objToBeConv){ //since local storage is a little bitch
  var pkmName = objToBeConv.name;
  var pkmType = objToBeConv.type;
  var pkmLevel = objToBeConv.level;
  var pkmExp = objToBeConv.exp;
  var pkmNName = objToBeConv.nickname;
  var pkmHP = objToBeConv.hp;
  
  var creation = new Pokemon(pkmName, pkmType, pkmLevel, pkmExp, pkmNName, pkmHP);
  return creation;
}

function clearText(){
  if (y >= myCanvas.height){
    clear();
    y = 15;
    text("What will you do?", x, y);
    y += 15;
  }
}

function addToTeam(pkmn){
  //adds a Pokemon to the management bar at the bottom
  playerPokemon.push(pkmn);
  var n = pkmn.name;
  var nn = pkmn.nickname;
  var l = pkmn.level;
  var t = pkmn.type;
  var mh = pkmn.maxHP;
  var h = pkmn.hp
  var imgSrc = n + ".png";
  var ind = playerPokemon.indexOf(pkmn);
  $("footer").append("<div class='pBox' id='"+ind+"'><button class='switch btn' onclick='switchPokemon("+ind+")'>Switch</button><br><img src='../images/"+imgSrc+"'><p class='nn'><strong><span>"+nn+"</span></strong> <button onclick='openNN("+ind+")' class='changeNN btn'>Change</button></p><p>Species: <span class='species'>"+n+"</span></p><p>Level <span class='lvl'>"+l+"</span></p><button class='change btn' onclick='startSwitch("+ind+")'>Switch position</button></div>");
  $(".switch").hide();
  if (playerPokemon.length <= 1){
    $(".change").hide();
  }
  else {
    $(".change").show();
  }
}

function openNN(pkmInd){
  $("#changeNN").show();
  $("#inder").text(pkmInd);
}

function changeNN(){
  var ind = $("#inder").text();
  var newName = $("#changer").val();
  var pkmn = playerPokemon[ind];
  $("#changeNN").hide();
  $("#"+ind+" p.nn span").text(newName);
  pkmn.nickname = newName;
  $("#changer").val("")
}

function startSwitch(ind){
  if (playerPokemon[ind].hp > 0){
    //ind = index of party member that's selected to switch
    ind1 = ind;
    text("Switching " +playerPokemon[ind].name+ ".", x, y);
    y += 15;
    text("Select a Pokemon to switch with.", x, y);
    y += 15;
    $(".switch").show();
    $(".change").hide();
  }
  else {
    text("This Pokemon is out of HP and cannot be switched!", x, y);
    y += 15;
  }
}

function switchPokemon(ind){
  if (playerPokemon[ind].hp > 0){
    //ind = index of party member that's switching
    var temp = playerPokemon[ind1];
    playerPokemon[ind1] = playerPokemon[ind];
    playerPokemon[ind] = temp;
    if (playerPokemon[0] == undefined){
      starter = playerPokemon[1];
    }
    else {
      starter = playerPokemon[0];
    }
    //this successfully switches them!
    text("Switch successful!", x, y)
    y += 15;

    console.log(starter.knownMoves);
    for (var i=0; i<starter.knownMoves; i++){
      $("#move"+i).text(starter.knownMoves[i]);
      var btba = "<button id='move"+i+"' onclick='useMove("+i+")' class='btn'>"+starter.knownMoves[i]+"</button>";
      $("#moves").append(btba);
    }

    //FINISH: SWITCH HTML
    var box1 = $("#" + ind1).html();
    var box2 = $("#" + ind).html();
    $("#" + ind1).html(box2);
    $("#" + ind).html(box1);
    $("#starterImage").attr("src", "images/" + starter.name + ".png");
    $("#move1").text(starter.knownMoves[0]);
    $("#move2").text(starter.knownMoves[1]);
    multiplier = 100/starter.maxHP;
    document.getElementById("starterp").style.width = starter.hp*multiplier + "px";
    for (var i=0; i<playerPokemon.length; i++){
      $("#"+i + " button.switch").attr("onclick", "switchPokemon("+i+")");
      $("#"+i + " button.change").attr("onclick", "startSwitch("+i+")");
    }
    
    $(".switch").hide();
    $(".change").show();
  }
  else {
    text("This Pokemon is out of HP and cannot be switched!", x, y);
    y += 15;
  }
}

function checkProgression(){
  var tLvl = enemiesDefeated.length;
  if (tLvl >= 500){
    return 8;
  }
  else if (tLvl >= 250){
    return 7;
  }
  else if (tLvl >= 225){
    return 6;
  }
  else if (tLvl >= 200){
    return 5;
  }
  else if (tLvl >= 150){
    return 4;
  }
  else if (tLvl >= 125){
    return 3;
  }
  else if (tLvl >= 100){
    return 2;
  }
  else if (tLvl >= 50){
    return 1;
  }
  else if (tLvl >= 25){
    return 0;
  }
  else {
    return null;
  }
}

function clearMap(){
  //gets rid of the map
  mapAllowed = false;
  fill(255);
  noStroke();
  square(150, 150);
  stroke(0);
  fill(0);
  x = 10;
}

function allowMap(){
  mapAllowed = true;
  x = 310;
  draw();
}

function startGame(){
  $("#opener").hide();
  $("#selector").show();
}

function run(){
  var chance = Math.random()*10;
  if (chance >= 5){
    //escape successfully
    clear();
    y = 15;
    allowMap();
    text("You ran away.", x, y);
    y += 15;
    enemyPokemon = null;
    $("#pokemonInfo").hide();
  }
  else {
    text("You tried to run, but couldn't.", x, y);
    y += 15;
  }
}

/*

List of things to add:
- Find items when walking around randomly (later)
- Type effectiveness
- Wild Pokemon evolve
- Wild Pokemon are within a range of levels and not just Your Level
- Show numerical health with health bar

Izzy Glitches:
- When leveling up, new attack buttons keep getting added for all Pokemon
- Wild Pokemon are never evolved

*/