$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAG0wfCLZpe-EMXcbg6ZkcnHXuOf9j2G8o",
        authDomain: "trainwreck-622d8.firebaseapp.com",
        databaseURL: "https://trainwreck-622d8.firebaseio.com",
        projectId: "trainwreck-622d8",
        storageBucket: "trainwreck-622d8.appspot.com",
        messagingSenderId: "824399186719"
    };
    //Initialize the database
    firebase.initializeApp(config);
    // Create a variable to reference the database
    var db = firebase.database().ref('Trains');
    var randomID;
    var myTrain = {
        name: "",
        destination: "",
        frequecy: 30,
        nextArrival: 1020,
        ID: 102030409,
    };

    //-------- DATABASE ------------------------------
    db.on("child_added", function (childSnapshot) {
        var data = Object.values(childSnapshot.val());
        console.log(data);
        const [ID, destination, frequency, name, nextArrival] = data;
        // var name$           = $("<td>").text(name);
        // var destination$    = $("<td>").text(destination);
        // var frequency$      = $("<td>").text(frequency);
        // var nextArrival$    = $("<td>").text(nextArrival);
        var tBody = $("tbody");
        var tRow = $("<tr>");

        // // Append the newly created table data to the table row
        tRow.prepend(name$, destination$, frequency$, nextArrival$);
        // // Append the table row to the table body
        tBody.prepend(tRow);
        // Then include Firebase error logging
    },
        function (errorObject) {
            // In case of error this will print the error
            console.log("The read failed: " + errorObject.code);
    });

    $('#addTrainBtn').on('click', function (e) {
        e.preventDefault();
        // Generate a random ID for our train
        randomID = Math.floor(Math.random() * 989812843) + 1;
        // Capture user inputs and store them into variables
        var trainName = $("#trainNameInput").val().trim();
        var trainDest = $("#trainDestInput").val().trim();
        var firstTrainInput = $("#firstTrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        if (trainName === "" || trainDest === "" || firstTrainInput === "" || frequency === "") {
            alert(`ERROR: Please complete all information. NO EMPTY FIELDS ARE ALLOWED.`);
        } else {
            // Validation for the FREQUENCY
            if (frequency > 720) {
                alert(`ERROR: Wrong frequency entered. Do not exceed 720 minutes`);
                document.getElementById('frequencyInput').focus();
            } else {
                //Validation for the FIRST TRAIN INPUT
                var regex = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
                if (regex.test(firstTrainInput)) {
                    $('#firstTrainInput').removeClass("invalid");
                    console.log(nextArrival(firstTrainInput, frequency));
                    myTrain.name        = trainName;
                    myTrain.destination = trainDest;
                    myTrain.frequecy    = frequency;
                    myTrain.nextArrival = nextArrival(firstTrainInput, frequency);
                    myTrain.ID          = randomID;
                    console.log(myTrain);
                    db.push(myTrain);
                } else {
                    alert(`ERROR: Wrong date format entered. Please follow the format HH:MM (Military Time) Examples: 00:25, 09:30 17:45`);
                    $('#firstTrainInput').addClass("invalid");
                    document.getElementById('firstTrainInput').focus();
                }
            }
        }
    });

    function nextArrival(initTime, addMinutes) {
        // console.log(initTime, addMinutes);
        if (!initTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/))
        return null;
        var timeSplit = initTime.split(':');
        var hours = parseInt(timeSplit[0]);
        var minutes = parseInt(timeSplit[1]) + parseInt(addMinutes);
        hours += Math.floor(minutes / 60);
        while (hours >= 24) {
            hours -= 24;
        }
        minutes = minutes % 60;
        return ('0' + hours).slice(-2) + ':' + ('0' +minutes).slice(-2);
    }
});