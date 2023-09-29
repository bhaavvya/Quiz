const timer = document.querySelector('#time span')

setInterval(() => {
	timer.innerText = new Date().toLocaleString()
}, 1000)
