const electron = require('electron');
const { ipcRenderer } = electron;


const ul = document.querySelector('ul')
ipcRenderer.on('Request:bloodType', function(e, type){

  // Create a list
  const li = document.createElement('li')
  const typeText = document.createTextNode(type)

  // Add type to li and then add li to ul
  li.appendChild(typeText)
  ul.appendChild(li)
})
