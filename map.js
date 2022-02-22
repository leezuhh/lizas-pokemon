
for (var y=12.5; y<=(575/2); y+=25){
  var thisRow = [];
  for (var x=12.5; x<=(575/2); x+=25){
    var thisType = "grass";
    if (x == (225/2)){
      thisType = "path";
    }
    else if (y == 12.5){
      thisType = "path";
    }
    if (x == (225/2) && y == 12.5){
      thisType = "shop";
    }
    thisRow.push(new Tile(x, y, thisType));
  }
  tiles.push(thisRow);
}
var currentTile = tiles[0][0];

function draw() {
  if (mapAllowed){
    for (var i=0; i<tiles.length; i++){
      for (var n=0; n<tiles[i].length; n++){
        var thisTile = tiles[i][n];
        switch (thisTile.type){
          case "grass":
            fill(182, 252, 149);
          break;
          case "path":
            fill(250, 209, 152);
          break;
          case "shop":
            fill(255, 189, 246);
          break;
        }
        square(thisTile.x, thisTile.y, 30);
      }
    }
    spawn(player);
  }
  fill(0);
}

function spawn(character) {
  image(playerImg, character.x, character.y, 25, 25);
}

function keyPressed(){
  if (mapAllowed){
    switch (keyCode){
      case LEFT_ARROW:
        if (player.x > 12.5){
          clear();
          player.x -= 25;
          findCurrentTile(player.x, player.y);
          draw();
          walk();
        }
        break;
      case RIGHT_ARROW:
        if (player.x < 287.5){
          clear();
          player.x += 25;
          findCurrentTile(player.x, player.y);
          draw();
          walk();
        }
        break;
      case UP_ARROW:
        if (player.y > 12.5){
          clear();
          player.y -= 25;     
          findCurrentTile(player.x, player.y);
          draw();
          walk();
        }
        break;
      case DOWN_ARROW:
        if (player.y < 287.5){
          clear();
          player.y += 25; 
          findCurrentTile(player.x, player.y);
          draw();
          walk();
        }
        break;
    }
  }
}

function findCurrentTile(plX, plY){
  for (var i=0; i<tiles.length; i++){
    for (var n=0; n<tiles[i].length; n++){
      thisTile = tiles[i][n];
      if (thisTile.x == plX && thisTile.y == plY){
        currentTile = tiles[i][n];
      }
    }
  }
}