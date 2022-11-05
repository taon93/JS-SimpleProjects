class UiController {
  #totalCalories;
  #foodList;
  #caloriesInput;
  #mealNameInput;

  #addMealButton;
  #deleteButton; 
  #updateButton; 
  #goBackButton; 
  #clearButton;

  getAddMealButton() { return this.#addMealButton; }

  getDeleteButton() { return this.#deleteButton; }

  getUpdateButton() { return this.#updateButton; }

  getGoBackButton() { return this.#goBackButton; }

  getClearButton() { return this.#clearButton; }


  setFoodList(foodListQuery) {
    this.#foodList = foodListQuery;
  }

  getFoodList() {
    return this.#foodList;
  }

  setTotalCalories(totalCaloriesQuery) {
    this.#totalCalories = totalCaloriesQuery;
  }

  getTotalCaloriesDisplayed() {
    return this.#totalCalories;
  }

  setTotalCaloriesDisplayed(value) {
    this.getTotalCaloriesDisplayed().textContent = value;
  }

  clearErrorPrompts() {
    this.clearErrorMessage(this.getCaloriesInput());
    this.clearErrorMessage(this.getMealNameInput());
  }

  constructor() {
    this.setTotalCalories(document.querySelector('.calories-value'));
    this.setFoodList(document.getElementById('item-list'));
    this.#caloriesInput = document.getElementById('calorie-count');
    this.#mealNameInput = document.getElementById('meal-name'); 
    this.#addMealButton = document.querySelector('.add-btn');
    this.#deleteButton = document.querySelector('.dlt-btn');
    this.#updateButton = document.querySelector('.upd-btn');
    this.#goBackButton = document.querySelector('.bck-btn');
    this.#clearButton = document.querySelector('.clr-btn');
  }

  getMealNameInput() { return this.#mealNameInput; }

  setMealNameInputValue(value) { this.#mealNameInput.value = value; }

  setCaloriesInputValue(value) { this.#caloriesInput.value = value; }

  getCaloriesInput() { return this.#caloriesInput; }

  clearInputs(){
    this.setMealNameInputValue('');
    this.setCaloriesInputValue('');
  }

  clearItemListDisplay() {
    this.getFoodList().innerHTML = '';
  }

  clearErrorMessage(inputElem) {
    const elem = inputElem.parentElement;
    elem.querySelector('.error-prompt').style.display = 'none';
    elem.querySelector('#invalid-value').textContent = '';
  }

  displayErrorMessage(element, inputedValue) {
    const errorMessage = element.parentElement.querySelector('.error-prompt');
    errorMessage.style.display = 'block';
    errorMessage.querySelector('#invalid-value').textContent = inputedValue;
  }
  
  displayItemAndGetItemsButton(item){
    const listElement = document.createElement('li');
    listElement.id = `item-${item.getId()}`;
    listElement.className = 'collection-item';
    listElement.innerHTML = this.setFieldsInItem(item.getMealName(), item.getCalories());
    this.#foodList.appendChild(listElement);
    return listElement.querySelector('.edit-item');
  }

  hideElement(elem) {
    elem.style.display = 'none';
  }

  revealElement(elem) {
    elem.style.display = 'block';
  }

  changeDisplayedButtons(mode) {
    switch(mode) {
      case 'normal': {
        this.revealElement(this.getClearButton());
        this.revealElement(this.getAddMealButton());
        this.revealElement(this.getGoBackButton());
        this.hideElement(this.getUpdateButton());
        this.hideElement(this.getDeleteButton());

        break;
      }
      case 'edit' : {
        this.revealElement(this.getUpdateButton());
        this.revealElement(this.getDeleteButton());
        this.hideElement(this.getAddMealButton());
        this.hideElement(this.getGoBackButton());
        this.hideElement(this.getClearButton());
      }
    }
  }

  removeItemById(id) {
    this.getFoodList().getElementById(`item-${id}`).outerHTML = "";
  }
  modifyItem(item) {
    this.getFoodList().getElementById(`item-${item.getId()}`)
      .innerHTML = this.setFieldsInItem(item.getMealName(), item.getCalories());
  }

  updateTotalCaloriesDisplayed(calories) {
    this.#totalCalories.textContent = calories;
  }

  setFieldsInItem(mealName, calories) {
    return `
    <strong>${mealName}</strong>
    <em>${calories} Calories</em>
    <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i>
    </a>
    `;
  }
}