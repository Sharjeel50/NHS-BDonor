
const electron = require('electron'); // declared once, no need to be decalerd again
const { ipcRenderer } = electron;  // same as above comment

console.log(document.getElementById("requestContents"))

ipcRenderer.on('Request:DonorInformation', function submitForm(e, requestType, bloodType, Notice) {

  var table = document.getElementById("requestContents");
  var row = table.insertRow(table.getElementsByTagName("tr").length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML =  requestType;
  cell2.innerHTML =  bloodType;
  cell3.innerHTML =  Notice;

  // Create another row within the table
//  const createRow = document.createElement('tr')
///  const requestTypeAdd = document.createElement('td')
//    const bloodTypeAdd = document.createElement('td')
//  const noticeAdd = document.createElement('td')

  // Create a text for the data coming from requestWidow
//  const requestTypeText = document.createTextNode(requestType)
//    const bloodTypeText = document.createTextNode(bloodType)
//  const NoticeText = document.createTextNode(Notice)

  // Add text to the td
//  requestTypeAdd.appendChild(requestTypeText)
//  bloodTypeAdd.appendChild(bloodTypeText)
//  noticeAdd.appendChild(NoticeText)

  // Add the created td's to the tr
//  createRow.appendChild(requestTypeAdd)
//  createRow.appendChild(bloodTypeAdd)
//  createRow.appendChild(noticeAdd)

  // Add tr to the table
//  table.appendChild(createRow)

})
