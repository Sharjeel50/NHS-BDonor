const form = document.getElementById('requestButton')

if (form) {
    form.addEventListener('click', function () { // Add event listener on button

        // ---------------------------------------------  Validation --------------------------------------------------------

        if (document.forms["requestForm"]["reqType"].value == "") {
            alert("Enter a Request Type")
            return false;
        }

        if (document.forms["requestForm"]["noticeType"].value == "") {
            alert("Enter a Notice Type")
            return false;
        }

        // ---------------------------------------------  Database --------------------------------------------------------

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

		// Make the SQL queries here
		const bloodType = document.getElementById("bloodType").value;
		const requestType = document.getElementById("requestType").value;
		const Notice = document.getElementById("Notice").value;

        $queryString = "INSERT INTO `requeststable`(`request_type`, `blood_type`, `notice`, `date`) VALUES ('" + requestType + "', '" + bloodType + "', '" + Notice + "', CURDATE());";

		connection.query($queryString, (err, rows, fields) => {
			if (err) {
				return console.log("Error with Query");
			}
			console.log(rows);
			console.log(fields);
		})

		connection.end(() => {
			console.log("Connection Closed");
		})
	})
} else {
	console.log("Button not working");
}