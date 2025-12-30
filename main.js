window.onload = (() => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 1080
  canvas.height = 720
  const game = new Game(canvas, ctx)
  game.render()
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.render()
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