import React, { Component } from 'react';
import './App.css';

const height = 500
const width = 800
const ratio = window.devicePixelRatio || 1

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: {
				height: height,
				width: width,
				ratio: ratio
			},
			block: {
				fillStyle: ['rgb','(',200,',',0,',',0,')'],
				x: 0,
				y: 0,
				height: 50,
				width: 50
			}
		}
		this.x = this.state.block.x
		this.y = this.state.block.y
		this.blockHeight = this.state.block.height
		this.blockWidth = this.state.block.width
	}

	componentDidMount() {
		var canvas = this.refs.canvas
		var ctx = canvas.getContext('2d')
		ctx.fillStyle = this.state.block.fillStyle.join('')
		ctx.fillRect(this.x,this.y,this.blockWidth,this.blockHeight)
		window.addEventListener('keydown', this.handleInput.bind(this))
		window.addEventListener('keyup', e => {console.log(e)})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		var canvas = this.refs.canvas
		var ctx = canvas.getContext('2d')
		var x = prevState.block.x
		var y = prevState.block.y
		var width = prevState.block.width
		var height = prevState.block.height
		ctx.beginPath()
		ctx.clearRect(x, y, width, height)
		ctx.moveTo(this.state.block.x, this.state.block.y)
		ctx.fillRect(this.state.block.x,this.state.block.y,this.state.block.width,this.state.block.height)
		ctx.closePath()	
	}

	handleInput(key) {
		var deltaX = 0
		var deltaY = 0
		var x = this.state.block.x
		var y = this.state.block.y
		var speed = 50
		switch(key.keyCode) {
			case 37:
				if ((x - speed) >= 0) {
					deltaX -= speed
					x = x + deltaX
					console.log('left :', deltaX)
					this.setState(prevState => ({...prevState,block: {...prevState.block,x: x}}))
					console.log(this.state)
				}
				break;
			case 38:
				if ((y - speed) >= 0) {
					deltaY -= speed
					y = y + deltaY
					console.log('up :', deltaY)
					this.setState(prevState => ({...prevState,block: {...prevState.block,y: y}}))
					console.log(this.state)
				}
				break;
			case 39:
				if ((x + speed) <= (this.state.screen.width - speed)) {
					deltaX += speed
					x = x + deltaX
					console.log('right :', deltaX)
					this.setState(prevState => ({...prevState,block: {...prevState.block,x: x}}))
					console.log(this.state)				
				}
				break;
			case 40:
				if ((y + speed) <= (this.state.screen.height - speed)) {
					deltaY += speed
					y = y + deltaY
					console.log('down :', deltaY)
					this.setState(prevState => ({...prevState,block: {...prevState.block,y: y}}))
					console.log(this.state)
				}
				break;
			default:
		}
	}

  render() {
    return (
      <canvas id='canvas'ref='canvas' height={this.state.screen.height} width={this.state.screen.width} ratio={this.state.screen.ratio} />
    );
  }
}

export default App;
