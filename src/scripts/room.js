class Room {
    constructor(game) {
        this.game = game
        this.widthDefault = 1080
        this.heightDefault = 720

        this.linePosXDefault = 100
        this.linePosYDefault = 80
        this.setGameSize()
    }
    setGameSize() {
        this.width = this.game.canvas.width > this.widthDefault ? this.widthDefault : this.game.canvas.width
        this.height = this.heightDefault / this.game.ratio

        this.x = (this.game.canvas.width - this.width) / 2
        this.y = this.game.canvas.height

        this.widthRatio = this.game.canvas.width > this.widthDefault ? 1 : this.width / this.widthDefault

        this.linePosX = this.x + (this.linePosXDefault * this.widthRatio)
        this.linePosY = this.y - (this.linePosYDefault * this.game.ratio)

        this.linePosWidth = this.game.canvas.width - (this.linePosX * 2)
        this.xEnd = this.x + this.width
    }
    getGameCenter() {
        return {x: this.game.canvas.width / 2, y: this.linePosY}
    }
    draw() {
        this.game.context.lineWidth = 2
        this.game.context.lineCap = 'round'

        this.game.context.fillStyle = "white"
        this.game.context.fillRect(this.linePosX, this.linePosY, this.linePosWidth, 2)
    }
}