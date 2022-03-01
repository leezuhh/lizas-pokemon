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
var pkmList = [["Pikachu", "Electric"], ["Raichu", "Electric"], ["Charmander", "Fire"], ["Charmeleon", "Fire"], ["Charizard", "Fire"], ["Squirtle", "Water"], ["Wartortle", "Water"], ["Blastoise", "Water"], ["Bulbasaur", "Grass"], ["Ivysaur", "Grass"], ["Venusaur", "Grass"], ["Pidgey", "Flying"], ["Pidgeotto", "Flying"], ["Pidgeot", "Flying"], ["Caterpie", "Bug"], ["Metapod", "Bug"], ["Butterfree", "Bug"], ["Ekans", "Poison"], ["Arbok", "Poison"], ["Jigglypuff", "Fairy"], ["Wigglytuff", "Fairy"], ["Zubat", "Poison"], ["Golbat", "Poison"], ["Crobat", "Poison"], ["Oddish", "Grass"], ["Gloom", "Poison"], ["Vileplume", "Poison"], ["Doduo", "Normal"], ["Dodrio", "Normal"], ["Vulpix", "Fire"], ["Ninetales", "Fire"], ["Gastly", "Ghost"], ["Haunter", "Ghost"], ["Gengar", "Ghost"], ["Weedle", "Bug"], ["Kakuna", "Bug"], ["Beedrill", "Bug"], ["Clefairy", "Fairy"], ["Clefable", "Fairy"], ["Meowth", "Normal"], ["Persian", "Normal"], ["Growlithe", "Fire"], ["Arcanine", "Fire"], ["Magnemite", "Electric"], ["Magneton", "Electric"], ["Magnezone", "Electric"], ["Lapras", "Water"], ["Rattata", "Normal"], ["Raticate", "Normal"], ["Psyduck", "Water"], ["Golduck", "Water"], ["Mewtwo", "Psychic"], ["Bellsprout", "Grass"], ["Weepinbell", "Grass"], ["Victreebel", "Grass"], ["Tentacool", "Water"], ["Tentacruel", "Water"], ["Abra", "Psychic"], ["Kadabra", "Psychic"], ["Alakazam", "Psychic"], ["Ponyta", "Fire"], ["Rapidash", "Fire"], ["Drowzee", "Psychic"], ["Hypno", "Psychic"]];

var wildPokemon = [["Pidgey", "Flying"], ["Caterpie", "Bug"], ["Ekans", "Poison"], ["Jigglypuff", "Fairy"], ["Zubat", "Flying"], ["Oddish", "Grass"], ["Doduo", "Normal"], ["Vulpix", "Fire"], ["Gastly", "Ghost"], ["Rattata", "Normal"], ["Weedle", "Bug"], ["Clefairy", "Fairy"], ["Meowth", "Normal"], ["Growlithe", "Fire"], ["Ponyta", "Fire"]]; //list of wild Pokemon to grab from for a random encounter

var trainerList = []; //array of objects

trainerList.push(new Trainer("Kyle", [new Pokemon("Rattata", "Normal", 5, 0, "Rattata", 500, ["Quick Attack", "Tackle"]), new Pokemon("Meowth", "Normal", 4, 0, "Meowth", 450, ["Tackle", "Scratch"])]));
trainerList.push(new Trainer("Emma", [new Pokemon("Oddish", "Grass", 12, 0, "Turnip", 1150, ["Growth", "Acid"]), new Pokemon("Bellsprout", "Grass", 11, 0, "Bellsprout", 1100, ["Vine Whip", "Wrap", "Acid"])])); //oddish, bellsprout
trainerList.push(new Trainer("Kovas", [new Pokemon("Tentacool", "Water", 20, 0, "Kraken", 2100, ["Water Gun", "Poison Sting", "Water Pulse"]), new Pokemon("Golduck", "Water", 23, 0, "Golduck", 2250, ["Aqua Jet", "Scratch", "Water Gun", "Aqua Tail"])])); //tentacool, golduck
trainerList.push(new Trainer("Cora", [new Pokemon("Arcanine", "Fire", 27, 0, "Fido", 2700, ["Bite", "Ember", "Fire Fang", "Flare Blitz"])])); //arcanine
trainerList.push(new Trainer("Basilio", [new Pokemon("Magnemite", "Electric", 28, 0, "Magnemite", 2900, ["Thunder Shock", "Spark"]), new Pokemon("Magneton", "Electric", 33, 0, "Magneton", 3200, ["Thunder Shock", "Spark", "Flash Cannon"])])); //magneton, magnemite
trainerList.push(new Trainer("Isabel", [new Pokemon("Rapidash", "Fire", 40, 0, "Rapidash", 4000, ["Quick Attack", "Flame Charge", "Flare Blitz"]), new Pokemon("Ninetales", "Fire", 43, 0, "Ninetales", 4200, ["Ember", "Fire Blast", "Flamethrower"])])); //rapidash, ninetales
trainerList.push(new Trainer("Amy", [new Pokemon("Haunter", "Ghost", 45, 0, "Haunter", 4500, ["Lick", "Shadow Punch", "Hex", "Dark Pulse"]), new Pokemon("Alakazam", "Psychic", 46, 0, "Alakazam", 4600, ["Confusion", "Psybeam", "Psyshock"])])); //haunter, alakazam
trainerList.push(new Trainer("Zoya", [new Pokemon("Lapras", "Water", 52, 0, "Lapras", 5200, ["Ice Shard", "Water Pulse", "Ice Beam", "Hydro Pump"])])); //lapras
trainerList.push(new Trainer("Albinson", [new Pokemon("Mewtwo", "Psychic", 100, 0, "Mewtwo", 10000, ["Psycho Cut", "Aura Sphere", "Psychic", "Psystrike"])])); //mewtwo

for (trainer of trainerList){
  console.log(trainer.pokemon);
}