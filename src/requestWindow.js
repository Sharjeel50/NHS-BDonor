const { ipcRenderer } = require('electron').remote;

const form = document.querySelector('form')

form.addEvenListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  console.log("working");

  const bloodType = document.querySelector('#bloodType').value;
  ipcRenderer.send('Request:bloodType', bloodType);

}
