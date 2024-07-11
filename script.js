const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

// EVENT LISTENERS
itemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newItem = itemInput.value.trim();
  // validation
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
  // CREATE ITEM
  const li = document.createElement('li');
  li.textContent = newItem;

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);
  itemInput.value = '';
});

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
