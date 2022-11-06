class Item {
  #mealName;
  #calories;
  #id
  static #idInitializer = 0;
  static #getNextIdInitializer() {
    return Item.#idInitializer++;
  }
  constructor(mealName, calories) {
    this.#mealName = mealName;
    this.#calories = calories;
  }

  setNewId() {
    this.#id = Item.#getNextIdInitializer();
  }

  setId(id) {
    this.#id = id;
  }

  setMealName(newMealName) {
    this.#mealName = newMealName;
  }
  setCalories(newCalories) {
    this.#calories = newCalories;
  }

  getMealName() {
    return this.#mealName;
  }
  getCalories() {
    return this.#calories;
  }

  getId() {
    return this.#id;
  }
}