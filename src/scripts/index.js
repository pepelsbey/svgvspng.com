const infoButton = document.querySelector('.info__button');
const infoDescription = document.querySelector('.info__description');

function toggleInfo(open) {
	infoButton.setAttribute('aria-pressed', open);
	infoDescription.toggleAttribute('hidden', !open);
}

document.addEventListener('click', (event) => {
	if (event.target === infoButton) {
		toggleInfo(infoDescription.hidden);
		console.log(event.target === infoDescription);
	} else {
		if (event.target !== infoDescription) {
			toggleInfo(false);
		}
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key === 'Escape') {
		toggleInfo(false);
	}
});
