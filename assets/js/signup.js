$("#add-user").on("click", function(event) {
    //event.preventDefault();
    var first = $("#first-input").val().trim();
    var last = $("#last-input").val().trim();
    var email = $("#email-input").val().trim();

    $("#name-display").text(first + last);
    $("#email-display").text(email);

    // Clear sessionStorage
    sessionStorage.clear();

    // Store all content into sessionStorage
    sessionStorage.setItem("first", first);
    sessionStorage.setItem("last", last);
    sessionStorage.setItem("email", email);
});

// By default display the content from sessionStorage
if(sessionStorage.getItem("first") !== null){
    $('.panel-title').text('You\'ve signed up successfully!');
    $("#name-display").text(sessionStorage.getItem("first") + ' ' + sessionStorage.getItem("last"));
    $("#email-display").text(sessionStorage.getItem("email"));
}

$(document).ready(function () {
    if(sessionStorage.getItem("first") !== null){
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCfuDWDjOIhrrDx4al6ONoSoSNjfFpygoo",
            authDomain: "emanagement-43257.firebaseapp.com",
            databaseURL: "https://emanagement-43257.firebaseio.com",
            projectId: "emanagement-43257",
            storageBucket: "",
            messagingSenderId: "707210450275"
        };

        //Initialize the database
        firebase.initializeApp(config);
        // Create a variable to reference the database
        var db = firebase.database().ref('Users');
        db.child(sessionStorage.getItem("first") + ' ' + sessionStorage.getItem("last")).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if(!exists){
                db.push().set({
                    userName: sessionStorage.getItem("first") + ' ' + sessionStorage.getItem("last"),
                    email: sessionStorage.getItem("email"),
                    dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
            }
        });
    }
});