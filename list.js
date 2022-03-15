var fireMoves = [new Move("Ember", "Fire", 40, 100), new Move("Fire Fang", "Fire", 65, 95), new Move("Fire Punch", "Fire", 75, 100), new Move("Blaze Kick", "Fire", 85, 90), new Move("Flamethrower", "Fire", 90, 100), new Move("Incinerate", "Fire", 100, 100), new Move("Flare Blitz", "Fire", 110, 90), new Move("Sacred Fire", "Fire", 120, 95), new Move("Fire Blast", "Fire", 110, 85), new Move("Flame Charge", "Fire", 50, 100)]; //8 moves per type

var waterMoves = [new Move("Water Gun", "Water", 40, 100), new Move("Aqua Jet", "Water", 45, 100), new Move("Bubble Beam", "Water", 65, 100), new Move("Liquidation", "Water", 85, 100), new Move("Hydro Pump", "Water", 110, 80), new Move("Scald", "Water", 80, 100), new Move("Surf", "Water", 90, 100), new Move("Sparkling Aria", "Water", 95, 100), new Move("Water Pulse", "Water", 60, 100), new Move("Aqua Tail", "Water", 70, 90)];

var grassMoves = [new Move("Vine Whip", "Grass", 45, 100), new Move("Bullet Seed", "Grass", 25, 100), new Move("Razor Leaf", "Grass", 55, 95), new Move("Energy Ball", "Grass", 90, 100), new Move("Leaf Blade", "Grass", 95, 100), new Move("Petal Dance", "Grass", 110, 100), new Move("Giga Drain", "Grass", 75, 100), new Move("Solar Beam", "Grass", 120, 100), new Move("Growth", "Grass", 50, 100)];

var electricMoves = [new Move("Thunderbolt", "Electric", 45, 100), new Move("Volt Tackle", "Electric", 120, 100), new Move("Electro Ball", "Electric", 55, 95), new Move("Charge Beam", "Electric", 50, 90), new Move("Bolt Strike", "Electric", 130, 85), new Move("Thunder Fang", "Electric", 65, 95), new Move("Wild Charge", "Electric", 90, 100), new Move("Zap Cannon", "Electric", 120, 50), new Move("Thunder Shock", "Electric", 40, 100), new Move("Spark", "Electric", 65, 100)]; //this array is way outta order lol

var flyingMoves = [new Move("Gust", "Flying", 40, 100), new Move("Wing Attack", "Flying", 60, 100), new Move("Air Slash", "Flying", 75, 95), new Move("Drill Peck", "Flying", 80, 100), new Move("Fly", "Flying", 90, 95), new Move("Hurricane", "Flying", 110, 70), new Move("Brave Bird", "Flying", 120, 100), new Move("Aeroblast", "Flying", 100, 95)];

var poisonMoves = [new Move("Smog", "Poison", 30, 70), new Move("Acid", "Poison", 40, 100), new Move("Poison Fang", "Poison", 50, 100), new Move("Venoshock", "Poison", 65, 100), new Move("Cross Poison", "Poison", 70, 100), new Move("Sludge Bomb", "Poison", 90, 100), new Move("Gunk Shot", "Poison", 120, 80), new Move("Belch", "Poison", 120, 90), new Move("Poison Sting", "Poison", 15, 100)];

var fairyMoves = [new Move("Fairy Wind", "Fairy", 40, 100), new Move("Draining Kiss", "Fairy", 50, 100), new Move("Disarming Voice", "Fairy", 60, 1000), new Move("Play Rough", "Fairy", 75, 90), new Move("Dazzling Gleam", "Fairy", 80, 100), new Move("Sparkly Swirl", "Fairy", 90, 100), new Move("Moonblast", "Fairy", 100, 100), new Move("Fleur Cannon", "Fairy", 130, 90)];

var normalMoves = [new Move("Scratch", "Normal", 40, 100), new Move("Slash", "Normal", 65, 100), new Move("Hyper Fang", "Normal", 80, 90), new Move("Strength", "Normal", 80, 100), new Move("Body Slam", "Normal", 85, 100), new Move("Multi-Attack", "Normal", 90, 100), new Move("Mega Kick", "Normal", 120, 75), new Move("Giga Impact", "Normal", 150, 90), new Move("Quick Attack", "Normal", 20, 100), new Move("Tackle", "Normal", 30, 100), new Move("Wrap", "Normal", 40, 90)];

var bugMoves = [new Move("Bug Bite", "Bug", 40, 100), new Move("Twineedle", "Bug", 50, 100), new Move("Silver Wind", "Bug", 60, 100), new Move("Signal Beam", "Bug", 75, 100), new Move("Lunge", "Bug", 80, 100), new Move("Bug Buzz", "Bug", 90, 100), new Move("X-Scissor", "Bug", 100, 100), new Move("Megahorn", "Bug", 120, 85)];

var ghostMoves = [new Move("Night Shade", "Ghost", 40, 100), new Move("Ominous Wind", "Ghost", 60, 100), new Move("Hex", "Ghost", 65, 100), new Move("Shadow Ball", "Ghost", 75, 100), new Move("Spirit Shackle", "Ghost", 80, 100), new Move("Spectral Thief", "Ghost", 90, 90), new Move("Phantom Force", "Ghost", 90, 100), new Move("Trick-or-Treat", "Ghost", 150, 100), new Move("Lick", "Ghost", 30, 100), new Move("Shadow Punch", "Ghost", 60, 1000)];

var psychicMoves = [new Move("Confusion", "Psychic", 50, 100), new Move("Heart Stamp", "Psychic", 60, 100), new Move("Psybeam", "Psychic", 65, 100), new Move("Zen Headbutt", "Psychic", 75, 90), new Move("Extrasensory", "Psychic", 80, 100), new Move("Glitzy Glow", "Psychic", 90, 100), new Move("Psystrike", "Psychic", 100, 100), new Move("Photon Geyser", "Psychic", 120, 95), new Move("Psyshock", "Psychic", 80, 100), new Move("Psycho Cut", "Psychic", 70, 100), new Move("Psychic", "Psychic", 90, 100)];

var darkMoves = [new Move("Bite", "Dark", 40, 100)];
var iceMoves = [new Move("Ice Shard", "Ice", 40, 100), new Move("Ice Beam", "Ice", 90, 100)];
var steelMoves = [new Move("Flash Cannon", "Steel", 80, 100)];
var fightingMoves = [new Move("Aura Sphere", "Fighting", 80, 1000)];

var moveArray = [fireMoves, waterMoves, grassMoves, electricMoves, flyingMoves, poisonMoves, fairyMoves, normalMoves, bugMoves, ghostMoves, psychicMoves, darkMoves, iceMoves, steelMoves, fightingMoves];
var types = ["Fire", "Water", "Grass", "Electric", "Flying", "Poison", "Fairy", "Normal", "Bug", "Ghost", "Psychic", "Dark", "Ice", "Steel", "Fighting"];

//name, type, level, possiblemoves, exp, nickname, hp, knownmoves
var starterList = [new Pokemon("Pikachu", "Electric", 5, electricMoves, 0, "Pikachu", 500, ["Quick Attack", "Thunder Shock"]), new Pokemon("Bulbasaur", "Grass", 5, grassMoves, 0, "Bulbasaur", 500, ["Tackle", "Vine Whip"]), new Pokemon("Charmander", "Fire", 5, fireMoves, 0, "Charmander", 500, ["Scratch", "Ember"]), new Pokemon("Squirtle", "Water", 5, waterMoves, 0, "Squirtle", 500, ["Tackle", "Water Gun"])];

//ok so for evolution: I'm going to have a list of all of the Pokemon. When trying to evolve you first check to see if it's a Pokemon that can evolve at all, and if so, then you find the indexOf the Pokemon name in the Pokemon name list, and then go one index further.
var pkmList = [["Pikachu", "Electric"], ["Raichu", "Electric"], ["Charmander", "Fire"], ["Charmeleon", "Fire"], ["Charizard", "Fire"], ["Squirtle", "Water"], ["Wartortle", "Water"], ["Blastoise", "Water"], ["Bulbasaur", "Grass"], ["Ivysaur", "Grass"], ["Venusaur", "Grass"], ["Pidgey", "Flying"], ["Pidgeotto", "Flying"], ["Pidgeot", "Flying"], ["Caterpie", "Bug"], ["Metapod", "Bug"], ["Butterfree", "Bug"], ["Ekans", "Poison"], ["Arbok", "Poison"], ["Jigglypuff", "Fairy"], ["Wigglytuff", "Fairy"], ["Zubat", "Poison"], ["Golbat", "Poison"], ["Crobat", "Poison"], ["Oddish", "Grass"], ["Gloom", "Poison"], ["Vileplume", "Poison"], ["Doduo", "Normal"], ["Dodrio", "Normal"], ["Vulpix", "Fire"], ["Ninetales", "Fire"], ["Gastly", "Ghost"], ["Haunter", "Ghost"], ["Gengar", "Ghost"], ["Weedle", "Bug"], ["Kakuna", "Bug"], ["Beedrill", "Bug"], ["Clefairy", "Fairy"], ["Clefable", "Fairy"], ["Meowth", "Normal"], ["Persian", "Normal"], ["Growlithe", "Fire"], ["Arcanine", "Fire"], ["Magnemite", "Electric"], ["Magneton", "Electric"], ["Magnezone", "Electric"], ["Lapras", "Water"], ["Rattata", "Normal"], ["Raticate", "Normal"], ["Psyduck", "Water"], ["Golduck", "Water"], ["Mewtwo", "Psychic"], ["Bellsprout", "Grass"], ["Weepinbell", "Grass"], ["Victreebel", "Grass"], ["Tentacool", "Water"], ["Tentacruel", "Water"], ["Abra", "Psychic"], ["Kadabra", "Psychic"], ["Alakazam", "Psychic"], ["Ponyta", "Fire"], ["Rapidash", "Fire"], ["Drowzee", "Psychic"], ["Hypno", "Psychic"]];

var wildPokemon = [["Pidgey", "Flying"], ["Caterpie", "Bug"], ["Ekans", "Poison"], ["Jigglypuff", "Fairy"], ["Zubat", "Flying"], ["Oddish", "Grass"], ["Doduo", "Normal"], ["Vulpix", "Fire"], ["Gastly", "Ghost"], ["Rattata", "Normal"], ["Weedle", "Bug"], ["Clefairy", "Fairy"], ["Meowth", "Normal"], ["Growlithe", "Fire"], ["Ponyta", "Fire"]]; //list of wild Pokemon to grab from for a random encounter

var trainerList = []; //array of objects

trainerList.push(new Trainer("Kyle", [new Pokemon("Rattata", "Normal", 5, normalMoves, 0, "Rattata", 500, ["Quick Attack", "Tackle"]), new Pokemon("Meowth", "Normal", 4, normalMoves, 0, "Meowth", 400, ["Tackle", "Scratch"]), new Pokemon("Paras", "Bug", 5, bugMoves, 0, "Paras", 500, ["Tackle"])], "Kyle.png"));
trainerList.push(new Trainer("Emma", [new Pokemon("Oddish", "Grass", 12, grassMoves, 0, "Turnip", 1200, ["Growth", "Acid"]), new Pokemon("Bellsprout", "Grass", 11, grassMoves, 0, "Bellsprout", 1100, ["Vine Whip", "Wrap", "Acid"])])); //oddish, bellsprout
trainerList.push(new Trainer("Kovas", [new Pokemon("Tentacool", "Water", 20, waterMoves, 0, "Kraken", 2000, ["Water Gun", "Poison Sting", "Water Pulse"]), new Pokemon("Golduck", "Water", 23, waterMoves, 0, "Golduck", 2300, ["Aqua Jet", "Scratch", "Water Gun", "Aqua Tail"])])); //tentacool, golduck
trainerList.push(new Trainer("Cora", [new Pokemon("Arcanine", "Fire", 27, fireMoves, 0, "Fido", 2700, ["Bite", "Ember", "Fire Fang", "Flare Blitz"])])); //arcanine
trainerList.push(new Trainer("Basilio", [new Pokemon("Magnemite", "Electric", 28, electricMoves, 0, "Magnemite", 2800, ["Thunder Shock", "Spark"]), new Pokemon("Magneton", "Electric", 33, electricMoves, 0, "Magneton", 3300, ["Thunder Shock", "Spark", "Flash Cannon"])])); //magneton, magnemite
trainerList.push(new Trainer("Isabel", [new Pokemon("Rapidash", "Fire", 40, fireMoves, 0, "Rapidash", 4000, ["Quick Attack", "Flame Charge", "Flare Blitz"]), new Pokemon("Ninetales", "Fire", 43, fireMoves, 0, "Ninetales", 4300, ["Ember", "Fire Blast", "Flamethrower"])])); //rapidash, ninetales
trainerList.push(new Trainer("Amy", [new Pokemon("Haunter", "Ghost", 45, ghostMoves, 0, "Haunter", 4500, ["Lick", "Shadow Punch", "Hex", "Dark Pulse"]), new Pokemon("Alakazam", "Psychic", 46, psychicMoves, 0, "Alakazam", 4600, ["Confusion", "Psybeam", "Psyshock"])])); //haunter, alakazam
trainerList.push(new Trainer("Zoya", [new Pokemon("Lapras", "Water", 52, waterMoves, 0, "Lapras", 5200, ["Ice Shard", "Water Pulse", "Ice Beam", "Hydro Pump"])])); //lapras
trainerList.push(new Trainer("Albinson", [new Pokemon("Mewtwo", "Psychic", 100, psychicMoves, 0, "Mewtwo", 10000, ["Psycho Cut", "Aura Sphere", "Psychic", "Psystrike"])])); //mewtwo

// for (trainer of trainerList){
//   for (pkmn of trainer.pokemon){
//     console.log(pkmn.possibleMoves);
//   }
// }