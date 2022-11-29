const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d')


function animate() {
	window.requestAnimationFrame(animate)

	drawBackground()
}

function drawBackground() {
	c.fillStyle = "white"
	c.fillRect(0, 0, canvas.width, canvas.height)
}

animate()