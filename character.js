/* eslint-disable no-unused-vars */
class Character {
  constructor(cells, className, startPosition) {
    this.cells = cells
    this.className = className
    this.startPosition = startPosition
    this.position = startPosition
    this.gridWidth = Math.sqrt(this.cells.length)
    this.vectors = [-1,1,-this.gridWidth,this.gridWidth]

    this.move(this.startPosition)
  }

  moveIsValid(index) {
    if(
      index >= this.cells.length ||
      index < 0 ||
      (this.position % this.gridWidth === 0 && index === this.position-1) ||
      (this.position % this.gridWidth === this.gridWidth-1  && index === this.position+1) ||
      this.cells[index].classList.contains('wall')
    ) {
      return false
    }

    return true
  }

  move(index) {
    if(!this.moveIsValid(index)) return false
    this.cells[this.position].classList.remove(...this.className.split(' '), 'deceased', 'prey')
    this.position = index
    this.cells[this.position].classList.add(...this.className.split(' '))
  }

}
