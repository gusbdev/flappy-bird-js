//Função responsável por criar novos elementos
function newElement(tagName, className){
	const element = document.createElement(tagName);
	element.className = className;
	return element;
}

function createBarriers(reverse = false){
	this.element = newElement('div', 'barrier');

	const border = newElement('div', 'border');
	const body = newElement('div', 'body');

	this.element.appendChild(reverse ? body : border);
	this.element.appendChild(reverse ? border : body);

	this.setHeight = height => body.style.height = `${height}px`
}

//const b = new createBarriers(true);
//b.setHeight(200);
//document.querySelector('[tp-flappy]').appendChild(b.element);

function createPairBarrier(height, opening, position){
	this.element = newElement('div', 'pair-barriers');

	this.higher = new createBarriers(true);
	this.bottom = new createBarriers(false);

	this.element.appendChild(this.higher.element);
	this.element.appendChild(this.bottom.element);

	this.randomOpening = () => {
		const heightHigher = Math.random() * (height - opening);

		const heightBottom = height - opening - heightHigher;

		this.higher.setHeight(heightHigher);

		this.bottom.setHeight(heightBottom);
	}

	this.getPosition = () => parseInt(this.element.style.left.split('px')[0]);

	this.setPosition = position => this.element.style.left = `${position}px`;

	this.getWidth = () => this.element.clientWidth;

	this.randomOpening();
	this.setPosition(position);
}

const b = new createPairBarrier(700,200,800);
document.querySelector('[tp-flappy]').appendChild(b.element);
