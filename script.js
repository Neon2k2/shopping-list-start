// DOM Elements
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

// Function to handle form submission
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value.trim();

  if (newItem === '') {
    alert('Please add an Item');
    return;
  }

  if (isItemInList(newItem)) {
    alert(`The item "${newItem}" is already added.`);
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = document.querySelector('.edit-mode');
    if (itemToEdit) {
      const itemsFromStorage = getItemsFromStorage();
      const index = itemsFromStorage.indexOf(itemToEdit.textContent.trim());
      if (index !== -1) {
        itemsFromStorage.splice(index, 1);
      }
      localStorage.setItem('items', JSON.stringify(itemsFromStorage));
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      isEditMode = false;
    }
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);

  itemInput.value = '';
  checkUI();
}

// Function to check if item already exists in the list
function isItemInList(itemText) {
  const items = Array.from(itemList.querySelectorAll('li'));
  return items.some((item) => item.textContent.trim() === itemText);
}

// Function to create a list item with Add button
function createListItem(itemText) {
  const li = document.createElement('li');
  li.textContent = itemText;

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  return li;
}

// Function to create a add button
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  return button;
}

// Function to create an icon
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Function to add item to storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function to get items from storage
function getItemsFromStorage() {
  return localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [];
}

// Function to add item to DOM
function addItemToDOM(item) {
  const li = createListItem(item);
  itemList.appendChild(li);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228b22';
  itemInput.value = item.textContent.trim();
}

// Function to handle item removal
function handleItemRemove(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      const itemToRemove = e.target.parentElement.parentElement;
      const itemText = itemToRemove.textContent.trim();

      itemToRemove.remove();

      removeItemFromStorage(itemText);
      checkUI();
    }
  } else {
    setItemToEdit(e.target);
  }
}

// Function to remove item from storage
function removeItemFromStorage(itemText) {
  const itemsFromStorage = getItemsFromStorage();
  const index = itemsFromStorage.indexOf(itemText);
  if (index !== -1) {
    itemsFromStorage.splice(index, 1);
  }
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function to handle clear button click
function handleClearButtonClick() {
  const lis = itemList.querySelectorAll('li');
  lis.forEach((li) => li.remove());
  localStorage.clear();
  checkUI();
}

// Function to handle filter input change
function handleFilterInputChange(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase().trim();
    item.style.display = itemName.includes(text) ? 'flex' : 'none';
  });
}

// Function to check and update UI state
function checkUI() {
  itemInput.value = '';
  const items = itemList.children.length;
  clearBtn.style.display = items === 0 ? 'none' : 'block';
  itemFilter.style.display = items === 0 ? 'none' : 'block';

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

// Initialize UI
function init() {
  checkUI();
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', handleItemRemove);
  clearBtn.addEventListener('click', handleClearButtonClick);
  itemFilter.addEventListener('input', handleFilterInputChange);
  document.addEventListener('DOMContentLoaded', displayItems);
}

// Run initialization
init();
