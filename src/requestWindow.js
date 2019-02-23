const { ipcRenderer } = require('electron').remote;

const form = document.querySelector('form')

form.addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  console.log("working");

  const bloodType = document.getElementById('bloodType').value;
  console.log(bloodType);
  ipcRenderer.send('Request:bloodType', bloodType);

}
