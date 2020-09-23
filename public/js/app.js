console.log('This is client side Javascript code.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  //Prevent automatic refresh of page by the browser
  e.preventDefault();

  const location = search.value;
  const url = `http://localhost:3000/weather?address=${location}`;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
