const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Function to handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value.trim();

  // Validation
  if (newItem === '') {
    alert('Please add an Item');
    return;
  }

  // Check if the item already exists in the list
  const items = Array.from(itemList.querySelectorAll('li'));
  if (items.some((item) => item.textContent.trim() === newItem)) {
    alert(`The item "${newItem}" is already added.`);
    return;
  }

  // Create item
  const li = createListItem(newItem);
  itemList.appendChild(li);

  // Update UI and reset input
  checkUI();
  itemInput.value = '';
}

// Function to create a list item with remove button
function createListItem(itemText) {
  const li = document.createElement('li');
  li.textContent = itemText;

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  return li;
}

// Function to create a remove button
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

// Function to handle item removal
function handleItemRemove(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

// Function to handle clear button click
function handleClearButtonClick() {
  const lis = itemList.querySelectorAll('li');
  lis.forEach((li) => li.remove());
  checkUI();
}

// Function to handle filter input change
function handleFilterInputChange(e) {
  // Add filtering logic here
  const text = e.target.value.toLowerCase();

  const items = itemList.querySelectorAll('li');
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase().trim();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Function to check and update UI state
function checkUI() {
  if (itemList.children.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event listeners
itemForm.addEventListener('submit', handleFormSubmit);
itemList.addEventListener('click', handleItemRemove);
clearBtn.addEventListener('click', handleClearButtonClick);
itemFilter.addEventListener('input', handleFilterInputChange);
