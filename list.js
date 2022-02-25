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

var trainerList = []; //array of objects?

trainerList.push(new Trainer("Kyle", [new Pokemon("Rattata", "Normal", 5, 0, "Rattata", 500, ["Quick Attack", "Tackle"])]));
// trainerList.push(new Trainer("Emma", ["Oddish", "Bellsprout"], 10));
// trainerList.push(new Trainer("Kovas", ["Tentacool", "Golduck"], 20));
// trainerList.push(new Trainer("Cora", ["Arcanine"], 25));
// trainerList.push(new Trainer("Basilio", ["Magnemite"], 30));
// trainerList.push(new Trainer("Isabel", ["Rapidash", "Ninetales"], 40));
// trainerList.push(new Trainer("Amy", ["Haunter", "Alakazam"], 45));
// trainerList.push(new Trainer("Zoya", ["Lapras"], 50));
// trainerList.push(new Trainer("Albinson", ["Mewtwo"], 100));

for (var trainer of trainerList){
  console.log(trainer.pokemon);
}