const electron = require('electron'); // declared once, no need to be declared again
const { ipcRenderer } = electron;  // same as above comment

// ------------------------------------------------------------------------------------------------

var mysql = require("mysql");
var connection = mysql.createConnection({ // Make the connection to the database
    host: "localhost",
    user: "root",
    password: null,
    database: "requestTable"
});

connection.connect((err) => { // Check if conenction is made or not
    if (err) {
        return console.log(" Connection Failed " + err);
    }
    console.log("Connected");
})

$queryString = "SELECT * FROM `requeststable`;"

connection.query($queryString, (err, rows, fields) => {
  if (err) {
    return console.log("Error with Query");
    console.log(fields);
  }
    console.log(rows);

    var table = document.getElementById("requestContents").getElementsByTagName('tbody')[0];

    for (var i = 0; i < rows.length; i++){
        const createRow = document.createElement('tr')
        const requestIDAdd = document.createElement('td')
        const requestTypeAdd = document.createElement('td')
        const bloodTypeAdd = document.createElement('td')
        const noticeAdd = document.createElement('td')
        const dateAdd = document.createElement('td')

        const requestID = document.createTextNode(rows[i].request_id)
        const requestTypeText = document.createTextNode(rows[i].request_type)
        const bloodTypeText = document.createTextNode(rows[i].blood_type)
        const NoticeText = document.createTextNode(rows[i].notice)
        const dateText = document.createTextNode(rows[i].date)

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
    }

    })


// --------------------------------------- Need to get data from other micro service -----------------------------------------------------

//var mysql = require("mysql");
//var connection = mysql.createConnection({ // Make the connection to the database
   // host: "localhost",
   // user: "root",
  //  password: null,
 //   database: "donorTable"
//});

//connection.connect((err) => { // Check if conenction is made or not
    //if (err) {
   //     return console.log(" Connection Failed " + err);
  //  }
 //   console.log("Connected");
//})

//$queryString = "SELECT * FROM `donorTable`;"

//connection.query($queryString, (err, rows, fields) => {
    //if (err) {
      //  return console.log("Error with Query");
     //   console.log(fields);
    //}
    //console.log(rows);


// --------------------------------------------------------------------------------------------






// Dont mess with this shit for now

 ipcRenderer.on('setupData', function (e, hospitalName, streetAddress, cityName, postalCode) {
     document.title = hospitalName
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
//function viewWindow(){
  //console.log("Working")
//  main.openWindow('createDonorWindow')
//}
