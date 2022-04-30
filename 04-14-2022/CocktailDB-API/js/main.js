//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
//grab a random drink
//use a non template literal
//grab a carousel of drinks

document
	.querySelector("#cocktailNameButton")
	.addEventListener("click", getDrink);
document
	.querySelector("#cocktailIngredientButton")
	.addEventListener("click", () => {
		// getSearchByIngredient();
		// addDrinks(arrayDrinkByIngredient);
		loadDrinks();
	});

let drinkResults = "";

function getDrink() {
	let drink = document.querySelector("#cocktailNameSearch").value;

	fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			console.log(data.drinks);
			drinkResults = data.drinks;
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}

let arrayDrinkByIngredient;

function getSearchByIngredient() {
	let ingredient = document.querySelector("#ingredientSearch").value;
	let arrLength = 0;
	fetch(
		`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
	)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			console.log(data);
			console.log(data.drinks);
			arrayDrinkByIngredient = data.drinks;
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}

async function loadDrinks() {
	let ingredient = document.querySelector("#ingredientSearch").value;
	const response = await fetch(
		`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
	);
	const drinks = await response.json();
	console.log(drinks);
	addDrinks(drinks);
	console.log(drinks);
	return drinks;
}

function addDrinks(arrayOfDrinks) {
	let list = document.querySelector("ul");

	for (let i = 0; i < arrayOfDrinks.length; i++) {
		let imgDrink = document.createElement("img");
		// create a list item
		let item = document.createElement("li");
		// add class of carousel__slide to each list item
		item.classList.add("carousel__slide");
		// add img inside the list item
		imgDrink.src = arrayOfDrinks[i].strDrinkThumb;
		imgDrink.classList.add("carousel__image");
		item.appendChild(imgDrink);
		// add drink name inside the list item
		let drkName = document.createElement("h2");
		// set its contents
		item.appendChild(document.createTextNode(arrayOfDrinks[i].strDrink));

		// add it to the list
		list.appendChild(item);
	}
}
