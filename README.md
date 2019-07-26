# PacMan

> An implementation of PacMan, using JavaScript

<img src="https://user-images.githubusercontent.com/3531085/61970033-d5b6d480-afd3-11e9-875b-e0bf1ed993ca.png" style="box-shadow:0 2px 25px 0">

Play online here: https://mickyginger.github.io/pacman/

## Technologies used

- HTML5
- CSS3
- ES6
- Lodash

## Approach

I decided to make a generic `Character` class which knew only how to move and whether a move was valid. I then created a `Pacman` class which inherited `Character` where I added a `keydown` event listener so the user could move PacMan.

I then created a `Ghost` class which also inherited from `Character`. This class includes all the logic to make the ghosts move.

Both characters move around the grid by swapping classes on `div` elements. The whole grid is an array of divs, and the movement is calculated using the index of the `div` in the array. I used a 28 x 28 grid. To find the `div` that the character wants to move to I used the following formula:

- **NORTH**: currentIndex - width
- **SOUTH**: currentIndex + width
- **EAST**: currentIndex + 1
- **WEST**: currentIndex - 1

I prevented characters walking through walls, I checked for the class of `wall` on the `div` before making the move.

## Ghost Movement

The ghost movement is split into three modes:

- **Hunt mode**: The ghost is moving toward PacMan
- **Flee mode**: The ghost is moving away from PacMan
- **Nest mode**: The ghost is moving toward its start position

Essentially they are all using the same functionality. In _hunt mode_ the x and y coordinate of the ghost and PacMan compared and a random move is made that would bring the ghost closer to PacMan's location.

In _flee mode_ the same logic is used, except this time a random move is made that would take the ghost farther away from PacMan

Finally in _nest mode_ the random move is made that would bring the ghost closer to its home square.

To determine whether the ghost's move is closer or further away from its destination I wrote a simple `isCloser` method, which took the current index, and the destination index.

```js
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
```

## Challenges

The most challenging problem was the ghost movement. In earlier iterations of the game ghosts would get stuck in the corners or move backward and forward on the same two squares.

Since the path that the ghosts can move along is only one square wide, often the ghost can only make a choice of north/south or east/west. When a ghost reaches a junction it might have two or three options.

In the end the solution to both problems was a simple one: do not allow the ghost to double back on itself. This way the ghost will never get stuck in a corner, nor will it move back and forth between two squares.

## Contributing

Please fork the repo and make a pull request.

If you'd rather just take the code and develop it please credit me and drop me a link to your repo, I'd love to take a look!
