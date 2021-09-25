const images = document.querySelector('#pictures');
const container = document.querySelector('.image-container');

images.addEventListener('change', updateImageSection);

let selections = [];

function updateImageSection() {
  if (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const curFiles = images.files;
  if (curFiles.length === 0) {
    const para = document.createElement('h3');
    para.textContent = 'No images uploaded';
    container.appendChild(para);
  } else {
    const imageList = document.createElement('ol');
    container.appendChild(imageList);
    imageList.setAttribute('class', 'image-list');

    for (let image of curFiles) {
      //creates the new sections
      const name = image.name.slice(0, -4);
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      const para = document.createElement('p');
      const print = document.createElement('button');
      const digital = document.createElement('button');
      // set the class for css
      listItem.setAttribute('class', 'image-item');

      // sets the attributes for the img
      img.setAttribute('width', '300');
      img.setAttribute('height', 'auto');

      // sets img and the name
      para.textContent = `Name ${name}`;
      img.src = URL.createObjectURL(image);

      //sets the attributes for the selections

      print.setAttribute('value', `${image.name}-print`);
      print.setAttribute('id', `${image.name}-print`);
      print.setAttribute('class', 'pristine button-print');
      print.onclick = () => {
        handlePrintSelection(image.name + '-print');
      };
      print.textContent = 'Order Print';
      digital.setAttribute('value', `${image.name}-digital`);
      digital.setAttribute('id', `${image.name}-digital`);
      digital.setAttribute('class', 'pristine button-digital');
      digital.onclick = () => {
        handleSelection(image.name + '-digital');
      };
      digital.textContent = 'Order Digital';

      // Add all the kids to the li
      listItem.appendChild(img);
      listItem.appendChild(para);
      listItem.appendChild(print);
      listItem.appendChild(digital);

      //add the li to the ol
      imageList.appendChild(listItem);
    }
  }
}

function handleSelection(value) {
  current = document.getElementById(value);
  current.classList.remove('pristine');

  // checks if the selection has been clicked on before if it has then we delete it.
  if (current.className !== 'digitalSelected') {
    selections.push(value);
  } else {
    selections = selections.filter((item) => {
      return item !== value;
    });
  }
  current.classList.toggle('digitalSelected');
  console.log(selections);
  showSelections();
}

function handlePrintSelection(value) {
  current = document.getElementById(value);
  current.classList.remove('pristine');

  // checks if the selection has been clicked on before if it has then we delete it.
  if (current.className !== 'printSelected') {
    selections.push(value);
  } else {
    selections = selections.filter((item) => {
      return item !== value;
    });
  }
  current.classList.toggle('printSelected');
  console.log(selections);
  showSelections();
}

// handling the rest of the form
const submitButton = document.querySelector('#save-button');
submitButton.addEventListener('click', (e) => {
  e.preventDefault(), handleSubmit();
});

// get the info from the the form

function handleSubmit() {
  // grab the elements
  const id = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  electron.doThing(id, email, phone, selections);
}

// Pass the selections to be below the form
function showSelections() {
  document.querySelector('.selections-list').innerHTML = '';
  for (let name of selections) {
    const selection = document.createElement('h6');
    selection.textContent = name;
    document.querySelector('.selections-list').appendChild(selection);
  }
}
