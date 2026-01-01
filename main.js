window.onload = (() => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 1080
  canvas.height = 720
  const game = new Game(canvas, ctx)
  game.render()
  function animate() {
    if(game.status === gameStatus.play) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      game.render()
    }
    requestAnimationFrame(animate)
  }

  animate()
})

class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context

    this.width = this.canvas.width
    this.height = this.canvas.height
    this.widthDefault = 1080
    this.heightDefault = 720
    this.ratio = this.height / this.heightDefault

    this.status = gameStatus.play
    
    this.resize(window.innerWidth, window.innerHeight)

    this.speed = 8 * this.ratio
    
    this.player = new Player(this)
    this.room = new Room(this)
    this.control = new Control(this)
    this.player.updateSize()

    window.addEventListener('resize', (event) => {
      this.speed = 8 * this.ratio
      this.resize(event.currentTarget.innerWidth, event.currentTarget.innerHeight)
      this.room.setGameSize()
      this.control.resize()
      this.player.updateSize()
    })
  }

  getCollisionSide(square1, square2) {
    // Calculate overlap on each axis
    const dx = (square2.collisionX + square2.levelX) - square1.collisionX;
    const dy = square2.collisionY - square1.collisionY;
    
    const combinedHalfWidth = (square1.collisionSize + square2.collisionSize) / 2;
    const combinedHalfHeight = (square1.collisionSize + square2.collisionSize) / 2;
    
    // Calculate overlap amounts
    const overlapX = combinedHalfWidth - Math.abs(dx);
    const overlapY = combinedHalfHeight - Math.abs(dy);
    
    // No collision
    if (overlapX <= 0 || overlapY <= 0) {
        return null;
    }
    
    // The side with smaller overlap is the collision side
    if(dy > 0) {
      // Vertical collision
      return 'bottom';
    }
    else if (overlapX < overlapY) {
        // Horizontal collision
        return dx > 0 ? 'right' : 'left';
    } else {
        // Vertical collision
        return 'top';
    }
  }

  isOnTop(movingSquare, staticSquare) {
    return (
      ((movingSquare.collisionY + movingSquare.collisionSize <= staticSquare.collisionY 
      && movingSquare.collisionY + movingSquare.collisionSize - movingSquare.ySpeed > staticSquare.collisionY)
      || (movingSquare.collisionY + movingSquare.collisionSize > staticSquare.collisionY
        && movingSquare.ySpeed === 0))
      && movingSquare.collisionX + movingSquare.collisionSize >= (staticSquare.collisionX + staticSquare.levelX) 
      && movingSquare.collisionX <  (staticSquare.collisionX + staticSquare.levelX) + staticSquare.collisionSize
    )
  }

  isOnLeft(movingSquare, staticSquare) {
    const hitOnX = (
      movingSquare.collisionX + movingSquare.collisionSize - this.speed <= staticSquare.collisionX + staticSquare.levelX
      && movingSquare.collisionX + movingSquare.collisionSize > staticSquare.collisionX + staticSquare.levelX
    )
    const inHeightZone = (
      movingSquare.collisionY - 10 > staticSquare.collisionY - staticSquare.collisionSize
      && movingSquare.collisionY + movingSquare.collisionSize < staticSquare.collisionY + (staticSquare.collisionSize * 2)
    )

    return (
      hitOnX && inHeightZone
    )
  }

  resize(width, height) {
    this.canvas.width = width > this.widthDefault ? this.widthDefault : width
    this.canvas.height = height
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ratio = this.height / this.heightDefault
  }

  render() {
      this.room.updateFloor()
      this.room.draw()
      this.control.draw()
      this.player.draw()
  }
 }