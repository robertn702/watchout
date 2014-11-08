// start slingin' some d3 here.
var playGame = function() {
  var numOfEnemies = 30;
  var boardHeight = 450;
  var boardWidth = 700;
  var playerRadius = 15;
  var enemyRadius = 10;
  var highscore = 0;
  var score = 0;
  var collisions = 0;

  function randomLocation(numEnemies) {
    var data = [];
    for (var i = 0; i < numEnemies; i++) {
      var coordinates = {};
      coordinates['left'] = Math.floor(Math.random() * 700) + 'px';
      coordinates['top'] = Math.floor(Math.random() * 450) + 'px';
      data.push(coordinates);
    }
    return data;
  }

  var player = {
    left: boardWidth / 2 - playerRadius + 'px',
    top: boardHeight / 2 - playerRadius + 'px',
  };

  //Commented code below is for SVG Circle nodes

  // function generatePlayer(){
  //   d3.select('svg.player').selectAll('circle').data([player])
  //   .enter().append('circle')
  //   .attr('fill', 'red')
  //   .attr('cx', function(d) {return d['left'];})
  //   .attr('cy', function(d) {return d['top'];})
  //   .attr('r', playerRadius + 'px')
  //   .call(drag);
  // }

  function generatePlayer(){
    d3.select('svg.player').selectAll('image').data([player])
    .enter().append('image')
    .attr('x', function(d) {return d['left'];})
    .attr('y', function(d) {return d['top'];})
    .attr('width', playerRadius * 2 + 'px')
    .attr('height', playerRadius * 2 + 'px')
    .attr('xlink:href', 'Spaceship.png')
    .call(drag);
  }

  //Commented code below is for SVG Circle nodes

  // function generateAsteroids() {
  //   var data = randomLocation(numOfEnemies);
  //   d3.select('svg').selectAll('.enemies > circle').data(data)
  //   .enter().append('circle')
  //   .attr('fill', 'white')
  //   .attr('cx', function(d) {return d['left'];})
  //   .attr('cy', function(d) {return d['top'];})
  //   .attr('r', enemyRadius + 'px');
  // }

  // function moveAsteroids() {
  //   var data = randomLocation(numOfEnemies);
  //   d3.select('svg').selectAll('.enemies > circle').data(data).transition().duration(2000)
  //   .tween('text', checkCollision)
  //   .attr('cx', function(d) {return d['left'];})
  //   .attr('cy', function(d) {return d['top'];})
  //   .attr('r', enemyRadius + 'px');
  // }
  //
  //

  function generateAsteroids() {
    var data = randomLocation(numOfEnemies);
    d3.select('svg').selectAll('.enemies > image').data(data)
    .enter().append('image')
    .attr('x', function(d) {return d['left'];})
    .attr('y', function(d) {return d['top'];})
    .attr('height', enemyRadius * 2 + 'px')
    .attr('width', enemyRadius * 2 + 'px')
    .attr('xlink:href', 'Shuriken.png');
  }

  function moveAsteroids() {
    var data = randomLocation(numOfEnemies);
    d3.select('svg').selectAll('.enemies > image')
    .data(data).transition().duration(2000)
    .tween('text', checkCollision)
    .attr('x', function(d) {return d['left'];})
    .attr('y', function(d) {return d['top'];})
    .attr('height', enemyRadius * 2 + 'px')
    .attr('width', enemyRadius * 2 + 'px')
  }


  var drag = d3.behavior.drag().on('drag', move);

  function move() {
    var cx = d3.event.x;
    var cy = d3.event.y;
    if (cy >= boardHeight - playerRadius * 2) {
      cy = boardHeight - playerRadius * 2;
    } else if (cy <= 0) {
      cy = 0;
    }
    if (cx >= boardWidth - playerRadius * 2) {
      cx = boardWidth - playerRadius * 2;
    } else if (cx <= 0) {
      cx = 0;
    }
    d3.select(this).attr('x', cx).attr('y', cy);
  }


  function checkCollision(){

    return function(t){
      var radiusSum = playerRadius + enemyRadius;

      var playerPosition = d3.select('svg.player image');
      var playerCX = parseInt(playerPosition.attr('x'), 10) + playerRadius;
      var playerCY = parseInt(playerPosition.attr('y'), 10) + playerRadius;

      var xDiff = playerCX - parseInt(d3.select(this).attr('x'), 10) + enemyRadius;
      var yDiff = playerCY - parseInt(d3.select(this).attr('y'), 10) + enemyRadius;
      var separationDist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      if (separationDist < radiusSum) {
        collisions++;
        score = 0;

        d3.select('div.collisions span')
        .text(String(collisions));
      }
    };
  }

  function increaseScore(){
    score += 20;
    d3.select('div.current span')
    .text(String(score));

    highscore = Math.max(highscore, score);
    d3.select('div.high span')
    .text(String(highscore));
  }

  randomLocation(numOfEnemies);
  generateAsteroids();
  generatePlayer();
  setInterval(function(){ increaseScore();}, 125);
  setInterval(function(){ moveAsteroids(); }, 2000);
};

playGame();


