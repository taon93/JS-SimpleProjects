class ItemController {
  #itemList;
  #currentlyEditedItem;
  #totalCalories;

  constructor() {
  this.#itemList = [];
  this.#currentlyEditedItem = null;
  this.#totalCalories = 0;
  }

  getItemList() {
    return this.#itemList;
  }

  clearItemList() {
    this.getItemList().length = 0;
  }
  
  addToTotalCalories(value) {
    this.#totalCalories += value;
  }

  subtractFromTotalCalories(value) {
    this.#totalCalories -= value;
  }

  setTotalCalories(value) {
    this.#totalCalories = value;
  }  

  getTotalCalories() {
    return this.#totalCalories;
  }

  addItemToList(item) {
    this.#itemList.push(item);
  }

  setItemList(itemList) {
    this.#itemList = itemList;
  }

  setCurrentlyEditedItem(item) {
    this.#currentlyEditedItem = item;
  }
  getCurrentlyEditedItem() {
    return this.#currentlyEditedItem;
  }

  updateItem(itemUpdates) {
    let itemToUpdate = this.#itemList.find(item => item.getId() === itemUpdates.getId());
    itemToUpdate.setMealName(itemUpdates.getMealName());
    itemToUpdate.setCalories(itemUpdates.getCalories());
  }

  removeItem(itemToRemove) {
    this.setItemList(
      this.#itemList.filter(item => item.getId() !== itemToRemove.getId()));
  }
}