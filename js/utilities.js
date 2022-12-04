function formatArrIn2D(array, amountX) {
	const arrayTemp = []

	for (let i = 0; i < array.length; i += amountX) {
		arrayTemp.push(array.slice(i, i + amountX))
	}

	return arrayTemp
}

function filterArrayForPosition(array, symbolChar, scale) {
	const arrayTemp = []

	array.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			if (tile === symbolChar) {
				arrayTemp.push({
					index: {
						x: tileIndex,
						y: rowIndex,
					},
					width: 12 * scale,
					height: 12 * scale,
					position: {
						x: tileIndex * 12 * scale + offsetInit.x,
						y: rowIndex * 12 * scale + offsetInit.y,
					}
				})
			}
		})
	})

	return arrayTemp
}

function rectangularCollision(object1, object2) {
	return (
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width &&
		object1.position.y + object1.height >= object2.position.y &&
		object1.position.y <= object2.position.y + object2.height
	)
}

function rectangularCollisionMiddleY(object1, object2) {
	return (
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width &&
		object1.position.y + object1.height >= object2.position.y &&
		object1.center.y <= object2.position.y + object2.height
	)
}