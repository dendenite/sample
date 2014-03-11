// Userlist data array for filling in info box
var userListData = [];
// DOM Ready =============================================================
document.addEventListener('DOMContentLoaded', function() {
	// Populate the user table on initial page load
	populateTable();
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
});
// Functions =============================================================
// Fill table with data
function populateTable() {
	// Empty content string
	var tableContent = '';
	// jQuery AJAX call for JSON
	$.getJSON( '/userlist', function(data) {
		// Stick our user data array into a userlist variable in the global object
	    userListData = data;
		// For each item in our JSON, add a table row and cells to the content string
		for (var i = 0, j = data.length; i < j; i++) {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + data[i].username + '" title="Show Details">' + data[i].username + '</td>';
			tableContent += '<td>' + data[i].email + '</td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + data[i]._id + '">delete</a></td>';
			tableContent += '</tr>';
		}
		// Inject the whole content string into our existing HTML table
		document.querySelector('#userList table tbody').innerHTML = tableContent;
	});
}
// Show User Info
function showUserInfo(event) {
	// Prevent Link from Firing
	event.preventDefault();
	// Retrieve username from link rel attribute
	var thisUserName = this.getAttribute('rel');
	// Get Index of object based on id value
	var arrayPosition = userListData.map(function(arrayItem) {
		return arrayItem.username;
	}).indexOf(thisUserName);
	// Get our User Object
	var thisUserObject = userListData[arrayPosition];
	//Populate Info Box
	document.getElementById('userInfoName').textContent = thisUserObject.fullname;
	document.getElementById('userInfoAge').textContent = thisUserObject.age;
	document.getElementById('userInfoGender').textContent = thisUserObject.gender;
	document.getElementById('userInfoLocation').textContent = thisUserObject.location;
}