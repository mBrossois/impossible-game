class Room {
    constructor(game) {
        this.game = game
        this.widthDefault = 1080
        this.heightDefault = 720
        this.floorBlockWidthDefault = 44
        this.floorSpeed = 1
        this.floorX = 0
        this.currentFloor = 1;

        this.linePosXDefault = 100
        this.linePosYDefault = 80
        this.setGameSize()
    }
    setGameSize() {
        this.width = this.game.canvas.width > this.widthDefault ? this.widthDefault : this.game.canvas.width
        this.height = this.heightDefault / this.game.ratio

        // 44 equals the size of the svg floor block
        this.totalBlocks = Math.floor(this.width / 44)
         // Floors need to update depending on the time and speed of the floor
        this.floorTiles = Array.from({ length: this.totalBlocks }, () => 'line')

        this.x = (this.game.canvas.width - this.width) / 2
        this.y = this.game.canvas.height

        this.widthRatio = this.game.canvas.width > this.widthDefault ? 1 : this.width / this.widthDefault

        this.linePosX = this.x + (this.linePosXDefault * this.widthRatio)
        this.linePosY = this.y - (this.linePosYDefault * this.game.ratio)

        this.linePosWidth = (this.game.canvas.width - (this.linePosX * 2)) / this.totalBlocks
        this.xEnd = this.x + this.width
    }
    getGameCenter() {
        return {x: this.game.canvas.width / 2, y: this.linePosY}
    }
    updateFloor() {
        this.floorX += this.floorSpeed
        const tileWidth = this.linePosWidth * this.currentFloor - this.floorX
        if(tileWidth <= 0) {
            this.floorTiles.shift()
            this.currentFloor++
            this.floorTiles.push('block')
        }
    }
    getXPos(tile) {
        if(tile > 0) {
            return this.linePosX + (this.linePosWidth * tile) - (this.floorX / this.currentFloor)
        }

        return this.linePosX
    }
    getWidth(tile) {
        if(tile > 0) {
            return this.linePosWidth
        }

        const tileWidth = this.linePosWidth * this.currentFloor - this.floorX
        return tileWidth
    }
    draw() {
        for(let tile in this.floorTiles) {
            this.game.context.lineWidth = 2
            // console.log(tile)

            this.game.context.fillStyle = tile <= 14 ? 'black' : "white"
            this.game.context.fillRect(this.getXPos(tile), this.linePosY, this.getWidth(tile), 2)
        }
    }
}