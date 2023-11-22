const slider = document.querySelector('.slider-line')
const priceInputs = document.querySelectorAll('.price-input')
const rangeInputs = document.querySelectorAll('.slider-input')
const maxInput = document.querySelector('.max-input')
const maxSliderInput = document.querySelector('.max-slider-input')

let priceDiff = 300

const setMaxPrice = () => {
	maxInput.value = maxInput.dataset.max
	rangeInputs.forEach(rangeInput => {
		rangeInput.max = maxInput.dataset.max
	})
	maxSliderInput.value = maxInput.dataset.max
}

setMaxPrice()

const lockRangeInputs = (min, max, priceDiff, event, className) => {
	if (event.target.classList.contains(className)) {
		rangeInputs[0].value = max - priceDiff
	} else {
		rangeInputs[1].value = min + priceDiff
	}
}

const fillRangeSlider = (min, max) => {
	slider.style.left = (min / rangeInputs[0].max) * 100 + '%'
	slider.style.right = 100 - (max / rangeInputs[1].max) * 100 + '%'
}

priceInputs.forEach(input => {
	input.addEventListener('input', e => {
		const min = +priceInputs[0].value
		const max = +priceInputs[1].value

		if (
			max - min >= priceDiff &&
			max <= rangeInputs[1].max &&
			min >= rangeInputs[0].min
		) {
			if (e.target.classList.contains('min-input')) {
				rangeInputs[0].value = min
				slider.style.left = (min / rangeInputs[0].max) * 100 + '%'
			} else {
				rangeInputs[1].value = max
				slider.style.right =
					100 - (max / rangeInputs[1].max) * 100 + '%'
			}
		}
	})

	input.addEventListener('blur', e => {
		const min = +rangeInputs[0].value
		const max = +rangeInputs[1].value

		if (input.value < min || input.value > max) {
			if (e.target.classList.contains('min-input')) {
				input.value = min
			} else {
				input.value = max
			}
		}
	})
})

rangeInputs.forEach(input => {
	input.addEventListener('input', e => {
		const min = +rangeInputs[0].value
		const max = +rangeInputs[1].value

		if (max - min < priceDiff) {
			lockRangeInputs(min, max, priceDiff, e, 'min-slider-input')
		} else {
			priceInputs[0].value = min
			priceInputs[1].value = max
			fillRangeSlider(min, max)
		}
	})
})
