/* global Character */
/* eslint-disable no-unused-vars */
class Ghost extends Character {

  constructor(cells, className, startPosition) {
    super(cells, className, startPosition)
    this.delay = 150
  }

  getValidMoveIndex() {
    const allowedMoves = this.vectors.filter(v => v !== -this.direction)
    let index = allowedMoves[Math.floor(Math.random() * allowedMoves.length)] + this.position
    while(!this.moveIsValid(index)) {
      index = allowedMoves[Math.floor(Math.random() * allowedMoves.length)] + this.position
    }
    return index
  }

  getCoords(index) {
    return [index % this.gridWidth, Math.floor(index / this.gridWidth)]
  }

  isCloser(index, point) {
    const [pointX, pointY] = this.getCoords(point)
    const [posX, posY] = this.getCoords(this.position)
    const [nextX, nextY] = this.getCoords(index)

    return Math.abs(nextX - pointX) > Math.abs(posX - pointX) ||
      Math.abs(nextY - pointY) > Math.abs(posY - pointY)
  }

  makeIntelligentMove(point, toward) {
    let nextIndex = this.getValidMoveIndex()
    let isCloser = this.isCloser(nextIndex, point)
    let attempts = 10

    while(
      (toward ? isCloser : !isCloser) && attempts
    ) {
      nextIndex = this.getValidMoveIndex()
      isCloser = this.isCloser(nextIndex, point)
      attempts--
    }
    this.direction = nextIndex - this.position
    this.move(nextIndex)
  }

  hunt() {
    const pacManIndex = this.cells.findIndex(cell => cell.classList.contains('pacman'))
    this.makeIntelligentMove(pacManIndex, true)
  }

  flee() {
    const pacManIndex = this.cells.findIndex(cell => cell.classList.contains('pacman'))
    this.makeIntelligentMove(pacManIndex, false)
  }

  nest() {
    this.makeIntelligentMove(this.startPosition, true)
  }

  addClass(className) {
    this.className = this.className.split(' ').concat(className).join(' ')
  }

  removeClass(className) {
    this.className = this.className.split(' ').filter(c => c!==className).join(' ')
  }

  hasClass(className) {
    return this.className.split(' ').includes(className)
  }

  caputure() {
    clearTimeout(this.preyId)
    this.delay = 150
    this.removeClass('prey')
    this.addClass('deceased')
  }

  leaveNest() {
    if(Math.random() < 0.5) this.makeIntelligentMove(289, true)
    else this.makeIntelligentMove(298, true)
  }

  becomePrey() {
    clearTimeout(this.preyId)
    this.delay = 250
    if(!this.cells[this.position].classList.contains('nest')) this.addClass('prey')
    this.preyId = setTimeout(() => {
      this.removeClass('prey')
      this.delay = 150
    }, 5000)
  }

  animate() {
    if(this.hasClass('deceased')) {
      if(this.position === this.startPosition) this.removeClass('deceased')
      else this.nest()
    } else if(this.hasClass('prey')) {
      this.flee()
    } else if(this.cells[this.position].classList.contains('nest')) {
      this.leaveNest()
    } else {
      this.hunt()
    }

    this.animateId = setTimeout(() => {
      this.animate()
    }, this.delay)
  }

  stop() {
    clearTimeout(this.animateId)
  }

}
