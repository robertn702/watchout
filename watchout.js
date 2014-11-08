// start slingin' some d3 here.
var playGame = function() {
  var numOfEnemies = 50;
  var boardHeight = 450;
  var boardWidth = 700;
  var playerRadius = 10;
  var enemyRadius = 10;

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
    left: boardWidth/2 + 'px',
    top: boardHeight/2 + 'px',
  };

  function generatePlayer(){
    d3.select('svg.player').selectAll('circle').data([player])
    .enter().append('circle')
    .attr('fill', 'red')
    .attr('cx', function(d) {return d['left'];})
    .attr('cy', function(d) {return d['top'];})
    .attr('r', playerRadius + 'px')
    .call(drag);
  }

  function generateAsteroids() {
    var data = randomLocation(numOfEnemies);
    d3.select('svg').selectAll('.enemies > circle').data(data)
    .enter().append('circle')
    .attr('fill', 'white')
    .attr('cx', function(d) {return d['left'];})
    .attr('cy', function(d) {return d['top'];})
    .attr('r', enemyRadius + 'px');
  }

  function moveAsteroids() {
    var data = randomLocation(numOfEnemies);
    d3.select('svg').selectAll('.enemies > circle').data(data).transition().duration(1000)
    .tween('text', checkCollision)
    .attr('cx', function(d) {return d['left'];})
    .attr('cy', function(d) {return d['top'];})
    .attr('r', enemyRadius + 'px');
  }

  var drag = d3.behavior.drag().on('drag', move);

  function move() {
    var cx = d3.event.x;
    var cy = d3.event.y;
    if (cy >= boardHeight - playerRadius) {
      cy = boardHeight - playerRadius;
    } else if (cy <= 0 + playerRadius) {
      cy = 0 + playerRadius;
    }
    if (cx >= boardWidth - playerRadius) {
      cx = boardWidth - playerRadius;
    } else if (cx <= 0 + playerRadius) {
      cx = 0 + playerRadius;
    }
    d3.select(this).attr('cx', cx).attr('cy', cy);
  }


  function checkCollision(){

    return function(t){
      var radiusSum = playerRadius + enemyRadius;

      var playerPosition = d3.select('svg.player circle');
      var playerCX = parseInt(playerPosition.attr('cx'), 10);
      var playerCY = parseInt(playerPosition.attr('cy'), 10);

      var xDiff = playerCX - parseInt(d3.select(this).attr('cx'), 10);
      var yDiff = playerCY - parseInt(d3.select(this).attr('cy'), 10);
      var separationDist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

      if (separationDist < radiusSum) {
        console.log('collision');
      }
    };
  }

  randomLocation(numOfEnemies);
  generateAsteroids();
  generatePlayer();
  setInterval(function(){ moveAsteroids(); }, 1500);
};




playGame();


