/* global Character,  */

class Pacman extends Character {

  constructor(cells, startPosition, becomeHunter) {
    super(cells, 'pacman', startPosition)

    this.becomeHunter = becomeHunter

    document.addEventListener('keydown', (e) => {
      if(this.cells.gameOver) return false
      let nextIndex = this.position
      switch(e.keyCode) {
        case 37:
          nextIndex += -1
          break
        case 38:
          nextIndex += -this.gridWidth
          break
        case 39:
          nextIndex += 1
          break
        case 40:
          nextIndex += this.gridWidth
          break
      }

      if(this.cells[nextIndex].classList.contains('big-food')) this.becomeHunter()
      this.cells[nextIndex].classList.remove('food', 'big-food')
      this.move(nextIndex)
    })
  }

}
