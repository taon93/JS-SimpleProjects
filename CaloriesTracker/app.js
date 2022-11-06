class App {

  #itemController;
  #uiController;

  constructor(itemController, uiController) {
    this.#itemController = itemController;
    this.#uiController = uiController 
  }
  init() {
    this.getUiController().getAddMealButton()
      .addEventListener('click', event => this.onAddMeal(event));
    this.getUiController().getClearButton()
      .addEventListener('click', event => this.onClearAllMeals(event));
    this.getUiController().getUpdateButton()
      .addEventListener('click', event => this.onUpdateMeal(event));
    this.getUiController().getDeleteButton()
      .addEventListener('click', event => this.onDeleteMeal(event));
    this.getUiController().getGoBackButton()
      .addEventListener('click', event => this.onGoBack(event));
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

  goBack() {
    this.getItemController().setCurrentlyEditedItem(null);
    this.getUiController().changeDisplayedButtons('normal');
    this.getUiController().clearErrorPrompts();
    this.getUiController().clearInputs();
  }

  onAddMeal(event) {
    const mealName = this.takeAndValidateInput(
        this.getUiController().getMealNameInput());
    const calories = this.takeAndValidateInput(
        this.getUiController().getCaloriesInput());

    if(mealName.isValid && calories.isValid) {
      this.getUiController().clearInputs();
      const item = new Item(mealName.value, parseInt(calories.value, 10));
      item.setNewId();

      this.getItemController().addItemToList(item);
      const editButton = this.getUiController().displayItemAndGetItemsButton(item);
      editButton.addEventListener('click', event => this.onEditItem(event));
      this.getItemController().addToTotalCalories(item.getCalories());
      this.getUiController().updateTotalCaloriesDisplayed(
          this.getItemController().getTotalCalories());
    }
    event.preventDefault();
  }

  onEditItem(event) {
    const listItem = event.target.parentElement.parentElement;
    const item = this.getListItemByElement(listItem);
    this.getItemController().setCurrentlyEditedItem(item);
    this.getUiController().changeDisplayedButtons('edit');
    this.getUiController().setInputs(item);
  }

  onGoBack(event) {
    this.goBack();
    event.preventDefault();
  }

  onDeleteMeal(event) {
    const currentItemId = this.getItemController().getCurrentlyEditedItem().getId();
    this.getUiController().removeItemById(currentItemId);
    this.getItemController().removeItem(currentItemId);
    this.getUiController().setTotalCaloriesDisplayed(this.getItemController().getTotalCaloriesCount());
    this.goBack();
    event.preventDefault();
  }

  onUpdateMeal(event) {
    let updatedItem = this.getItemController().getCurrentlyEditedItem();
    const mealName = this.takeAndValidateInput(
        this.getUiController().getMealNameInput());
    const calories = this.takeAndValidateInput(
        this.getUiController().getCaloriesInput());
    if(mealName.isValid && calories.isValid) {
      updatedItem.setMealName(mealName.value);
      updatedItem.setCalories(parseInt(calories.value));
      this.getItemController().updateItem(updatedItem);
      this.getUiController().modifyItem(updatedItem);
      document.getElementById(`item-${updatedItem.getId()}`)
          .querySelector('.edit-item')
          .addEventListener('click', event => this.onEditItem(event));
      this.getUiController().setTotalCaloriesDisplayed(
          this.getItemController().getTotalCaloriesCount());
      this.goBack();
    }
    event.preventDefault();
  }

  onClearAllMeals(event) {
    this.getItemController().clearItemList();
    this.getUiController().clearItemListDisplay();
    this.getItemController().setTotalCalories(0);
    this.getUiController().setTotalCaloriesDisplayed('0');

    this.goBack();
    event.preventDefault();
  }

  validate(id, value) {
    let regex;
    switch(id) {
      case 'meal-name': {
        regex = new RegExp('^(?:[A-Za-z]{1,10}\\s?){1,4}$');
        break;
      } 
      case 'calorie-count': {
        regex = new RegExp('^[0-9]{1,4}$');
      }
    }
    return regex.test(value);
  } 
  

  processInvalidInput(inputDomElement, inputtedValue) {
    // TODO: Why validate input dont work for mael name?
    inputDomElement.value = '';
    this.getUiController().displayErrorMessage(inputDomElement, inputtedValue);
    inputDomElement.addEventListener('focus', event => this.getUiController().clearErrorMessage(event.target));
  }

  takeAndValidateInput(element) {
    const inputtedValue = element.value;
    if(false === this.validate(element.id, inputtedValue)) {
      this.processInvalidInput(element, inputtedValue);
      element.value = '';
      return {value: '', isValid: false};
    }
    else
      return {value: inputtedValue, isValid: true};
  }
}

let appController = new App(new ItemController(), new UiController());
appController.init();
const inputForm = document.getElementById('input-form');



