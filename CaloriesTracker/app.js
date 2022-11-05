class App {

  #itemController;
  #uiController;

  constructor(itemController, uiController) {
    this.#itemController = itemController;
    this.#uiController = uiController 
  }
  init() {
    this.getUiController().getAddMealButton()
      .addEventListener('click', event => this.addMeal(event));
    this.getUiController().getClearButton()
      .addEventListener('click', event => this.clearAllMeals(event));
    this.getUiController().getUpdateButton()
      .addEventListener('click', event => this.clearUpdateMeal(event));
    this.getUiController().getDeleteButton()
      .addEventListener('click', event => this.clearDeleteMeal(event));
    this.getUiController().getGoBackButton()
      .addEventListener('click', event => this.goBack(event));
  }

  
  getItemController() { return this.#itemController; }

  getUiController() { return this.#uiController; }

  getListItemByElement(elem) {
    const mealName = elem.querySelector('strong').textContent;
    const calories = parseInt(elem.querySelector('em').textContent, 10);
    const itemId = parseInt((new RegExp('[0-9]+$')).exec(elem.id));
    const item = new Item(mealName, calories);
    item.setId(itemId);
    return item;
  }

  editItem(event) {
    console.log(this);
    const listItem = event.target.parentElement.parentElement;
    const item = this.getListItemByElement(listItem);
    this.getItemController().setCurrentlyEditedItem(item);
    this.getUiController().changeDisplayedButtons('edit');
  }

  clearAllMeals(event) {
    this.getItemController().clearItemList();
    this.getUiController().clearItemListDisplay();
    this.getItemController().setTotalCalories(0);
    this.getUiController().setTotalCaloriesDisplayed('0');
    this.getUiController().clearErrorPrompts();
    this.getUiController().clearInputs();
    event.preventDefault();
  }

  validate(id, value) {
    let regex;
    switch(id) {
      case 'meal-name': {
        regex = new RegExp('^(?:[A-Za-z]{1,10} ?){1,4}$');
        break;
      } 
      case 'calorie-count': {
        regex = new RegExp('^[0-9]{1,4}$');
      }
    }
    return regex.test(value);
  } 
  

  processInvalidInput(inputDomElement, inputedValue) {
    inputDomElement.value = '';
    this.getUiController().displayErrorMessage(inputDomElement, inputedValue);
    inputDomElement.addEventListener('focus', event => this.getUiController().clearErrorMessage(event.target));
  }

  takeAndValidateInput(element) {
    const inputedValue = element.value;
    if(false === this.validate(element.id, inputedValue)) {
      this.processInvalidInput(element, inputedValue);
      element.value = '';
      return {value: '', isValid: false};
    }
    else
      return {value: inputedValue, isValid: true};
  }

  addMeal(event) {
    const mealName = this.takeAndValidateInput(
      this.getUiController().getMealNameInput());
    const calories = this.takeAndValidateInput(
      this.getUiController().getCaloriesInput());

    if(mealName.isValid && calories.isValid) {
      this.getUiController().clearInputs();
      const item = new Item(mealName.value, parseInt(calories.value, 10));
      item.setNewId();

      this.getItemController().addItemToList(item);
      const button = this.getUiController().displayItemAndGetItemsButton(item);
      button.addEventListener('click', event => this.editItem(event));
      this.getItemController().addToTotalCalories(item.getCalories());
      this.getUiController().updateTotalCaloriesDisplayed(
        this.getItemController().getTotalCalories());
    }
    event.preventDefault();
  }
}

let appController = new App(new ItemController(), new UiController());
appController.init();
const inputForm = document.getElementById('input-form');



