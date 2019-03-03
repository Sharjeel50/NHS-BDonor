const electron = require('electron'); // declared once, no need to be declared again
const { ipcRenderer } = electron;  // same as above comment
var currentdate = new Date(); // Getting current date and time

// Add info to table -- May need to be fixed

ipcRenderer.on('Request:DonorInformation', function (event, requestType, bloodType, Notice) {

    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "   "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()

    var table = document.getElementById("requestContents").getElementsByTagName('tbody')[0];

    const createRow = document.createElement('tr')
    const requestIDAdd = document.createElement('td')
    const requestTypeAdd = document.createElement('td')
    const bloodTypeAdd = document.createElement('td')
    const noticeAdd = document.createElement('td')
    const dateAdd = document.createElement('td')

    const requestID = document.createTextNode(" ")
    const requestTypeText = document.createTextNode(requestType)
    const bloodTypeText = document.createTextNode(bloodType)
    const NoticeText = document.createTextNode(Notice)
    const dateText = document.createTextNode(datetime)

    requestIDAdd.appendChild(requestID)
    requestTypeAdd.appendChild(requestTypeText)
    bloodTypeAdd.appendChild(bloodTypeText)
    noticeAdd.appendChild(NoticeText)
    dateAdd.appendChild(dateText)

    createRow.appendChild(requestIDAdd)
    createRow.appendChild(requestTypeAdd)
    createRow.appendChild(bloodTypeAdd)
    createRow.appendChild(noticeAdd)
    createRow.appendChild(dateAdd)

    table.appendChild(createRow)

})

 ipcRenderer.on('setupData', function (e, hospitalName, streetAddress, cityName, postalCode) {
     document.title = hospitalName + " " + "|" + cityName + " " + "|" + streetAddress
 })

 // Search Bar -- Dont Touch
 function myFunction() {

     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();
     table = document.getElementById("donorContents");
     tr = table.getElementsByTagName("tr");
     for (i = 0; i < tr.length; i++) {
         td = tr[i].getElementsByTagName("td")[0];
         if (td) {
             txtValue = td.textContent || td.innerText;
             if (txtValue.toUpperCase().indexOf(filter) > -1) {
                 tr[i].style.display = "";
             } else {
                 tr[i].style.display = "none";
             }
         }
     }
 }


// Open window with myFunction
function viewWindow(){
  console.log("Working")
  ipcRenderer.send('createDonorWindow')
}
