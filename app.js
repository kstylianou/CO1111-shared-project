var idVar;
var validName;
var sessionID;
var Latitude;
var Longitude;
var uuid;
let getName;
let list;
let challenges;
let players;
let player;
let LatitudeArr = [];
let LongitudeArr = [];
let loc;
let questionLink;
let scoreLink;
let LeadeList;
let ansLink;
let test;
var span;
var modal;
let btn;
let spin = false;


function myFunction() {
    var popup = document.getElementById("Hcancel");
    var popup1 = document.getElementById("Hskip");
    var pop = document.getElementById("pop");
    var skip = document.getElementById("skip");
    if(popup.type == "hidden") {
        popup.type = "button";
        popup1.type = "button";
        popup.value = "Cancel";
        popup1.value = "Skip";
        skip.style.display = "none";
        pop.innerHTML ="Skip question?"
    }else{
        popup.type = "hidden";
        popup1.type = "hidden";
        pop.innerHTML ="";
        skip.style.display = "block";
    }
}
// responsive navigation bar
function navbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
// loading animation function
function spinner(spin) {
    let loader = document.getElementById("loader");
    if(spin === true){
        document.body.style.backgroundColor = "black";

        document.getElementById("opa").style.opacity = "0.0";
        loader.style.display = "inline-block";
    }else{
        document.body.style.backgroundColor = "";
        document.getElementById("opa").style.opacity = "1.0";
        loader.style.display = "none";

    }

}

function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*30*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// gets the current position of user
function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie()
{
    var sessionid = getCookie("sessionid");
    var username = getCookie("username");
    var arr = getCookie("Latitude");
    var arr1 = getCookie("Longitude");

    if (sessionid != "")
    {
        document.getElementById("dCookies").style.display = "block";
        document.getElementById("welcomeUser").innerHTML = "Welcome back " + username;
        let cookie = document.getElementById("cookie");
        let deleteCookie = document.getElementById("deleteCookie");
        cookie.value = "Continue";
        deleteCookie.value = "New Game";
        sessionID = sessionid;
        validName = username;
        spinner(spin = false);
        LatitudeArr = JSON.parse(arr);
        LongitudeArr = JSON.parse(arr1);
        console.log(LatitudeArr + " / " + LongitudeArr);

    }
    else
    {
        getname();
    }
}

function deleteCookie()
{
    document.cookie = "username=;  path=/;";
    document.cookie = "sessionid=;  path=/;";
    document.cookie = "Latitude=;  path=/;";
    document.cookie = "Longitude=;  path=/;";
    LatitudeArr = [];
    LongitudeArr = [];
    getname();
}
// gets the the username of a user as an input and proceeds
function userName() {
    document.getElementById("dGetName").style.display = "block";
    getName = document.getElementById("getName");
    let text = document.createElement("p");
    text.id="text";

    let name = document.createElement("input");

    name.id="nameId";
    challenges = document.getElementById("allChallenges").innerHTML = "";
    let submit = document.createElement("button");
    submit.className="animated-button";
    text.innerText = "Username";
    submit.type = "submit";
    submit.innerHTML = "<span></span><span></span><span></span><span></span>"+"Start";
    submit.id = "startbtn";


    getName.appendChild(text);
    getName.appendChild(name);
    getName.appendChild(submit);

    submit.onclick = function() {

        if (name.value == "") {
            let error = document.createElement("p");
            error.innerHTML = "Enter username";
            getName.appendChild(error);

        }
        else {
            validName = name.value;
            TestStart = undefined;
            start();
            spinner(spin = true);

        }
    }

}
// gets all the available challenges
function getname()
{
    spinner(spin = true);
    challenges = document.getElementById("allChallenges").innerHTML = "ALL CHALLENGES";
    fetch(Tlist)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            spinner(spin = false);
            list = document.getElementById("challenges");
            if(test === false) {
                console.log(jsonObject); //TODO - Success, do something with the data.
                document.getElementById("DallChallenges").style.display = "block";
                document.getElementById("dCookies").style.display = "none";
                document.getElementById("dChallenges").style.display = "block";
                list.id = "list";
            }
            let array = jsonObject.treasureHunts;
            for(let i =0; i <array.length; i++)
            {
                let listItem = document.createElement("button");
                listItem.id="listItem";
                listItem.className = "animated-button1";
                listItem.value = array[i].uuid;
                listItem.innerHTML = "<span></span><span></span><span></span><span></span>"+array[i].name;
                list.appendChild(listItem);
                listItem.onclick = function ()
                {
                    document.getElementById("dChallenges").style.display = "none";
                    uuid = listItem.value;
                    if(test === false) {
                        userName();
                    }
                };
            }
        });
}
let TestStart;

function start()
{
    if(test === false && TestStart == undefined){

        TestStart = Tstart + "?player=" + validName + "&app=Team3&treasure-hunt-id=" + uuid + "";
    }else{
        TestStart = Tstart;
    }
    spinner(spin = true);

    fetch(TestStart)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            spinner(spin = false);
            console.log(jsonObject); //TODO - Success, do something with the data.//
            var myObj = jsonObject;
            if (myObj.status === "ERROR")
            {
                document.getElementById("dError").style.display = "block";
                let error = document.getElementById("error");
                error.id="error";
                error.innerHTML = myObj.errorMessages+ "<br>";


            }
            else
            {
                document.getElementById("dChallenges").style.display = "none";
                document.getElementById("dGetName").style.display = "none";
                document.getElementById("DallChallenges").style.display = "none";
                document.getElementById("dError").style.display = "none";
                if(test === false) {
                    sessionID = myObj.session;
                    setCookie("sessionid", sessionID, 1);
                    setCookie("username", validName, 1);
                    myLocation();
                    loopLocation();
                    question();
                }


            }
        });
}


// Gets the questions from the server
function question()
{
    document.getElementById("myTopnav").style.display = "none";
    if(test === false){
        if(questionLink == undefined) {
            questionLink = Tguestion + sessionID;
        }
    }else{
        questionLink = Tguestion;
    }
    spinner(spin = true);
    fetch(questionLink)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            spinner(spin = false);
            console.log(jsonObject); //TODO - Success, do something with the data.//

            var myObj = jsonObject;
            if(test === false) {
                document.getElementById("dCookies").style.display = "none";
            }
            if (myObj.status === "ERROR")
            {
                document.getElementById("dError").style.display = "block";
                document.getElementById("error").innerHTML = myObj.errorMessages;

            }
            else
            {
                document.getElementById("dQuestion").style.display = "block";
                document.getElementById("guestion").innerHTML = myObj.questionText;
                    if(test === false) {
                        // Get the modal
                        document.getElementById("camera").style.display = "block";
                        modal = document.getElementById("myModal");
                        btn = document.getElementById("myBtn");
                        span = document.getElementsByClassName("close")[0];
                        btn.onclick = function () {
                            modal.style.display = "block";
                            getCamera();
                        };
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                    }

                }


            if(myObj.completed == false)
            {
                if(test === false) {
                    score();
                }
                let currentQuestionIndex = myObj.currentQuestionIndex + 1;
                document.getElementById("dQuessionNum").style.display = "block";
                document.getElementById("dCorrectScore").style.display = "block";
                document.getElementById("quessionNum").innerHTML = "QUESTIONS: " + currentQuestionIndex + "/" + myObj.numOfQuestions;
                document.getElementById("correctScore").innerHTML = "Correct Score: " + myObj.correctScore + "<br> Wrong Score: " + myObj.wrongScore;
                document.getElementById("dError").style.display = "none";

                if (myObj.canBeSkipped == true)
                {
                    document.getElementById("dSkip").style.display = "block";
                    var skip = document.getElementById("skip");
                    skip.innerHTML = "<span></span><span></span><span></span><span></span>SKIP";
                    document.getElementById("correctScore").innerHTML = "Correct Score: " + myObj.correctScore + "<br> Wrong Score: " + myObj.wrongScore + "<br> Skip Score: "+ myObj.skipScore;
                }
                else
                {
                    document.getElementById("dSkip").style.display = "none";

                }

                if (myObj.requiresLocation == true)
                {
                    myLocation();

                }
                if (myObj.questionType == "BOOLEAN")
                {
                    document.getElementById("dTrueFalse").style.display = "block";
                    var True = document.getElementById("true");
                    var False = document.getElementById("false");
                    True.value = "TRUE";
                    False.value = "FALSE";
                }
                else
                {
                    document.getElementById("dTrueFalse").style.display = "none";
                }

                if (myObj.questionType == "TEXT")
                {
                    document.getElementById("dMyInput").style.display = "block";
                    var myInput = document.getElementById("myInput");
                    myInput.value = "";
                }
                else
                {
                    document.getElementById("dMyInput").style.display = "none";
                }
                if(myObj.questionType == "INTEGER"){
                    document.getElementById("dInteger").style.display = "block";
                    var integer = document.getElementById("integer");
                    integer.value = "";
                }
                else
                {
                    document.getElementById("dInteger").style.display = "none";
                }
                if(myObj.questionType == "NUMERIC"){
                    document.getElementById("dNumeric").style.display = "block";
                    var numeric = document.getElementById("numeric");
                    numeric.value = "";
                }
                else{
                    document.getElementById("dNumeric").style.display = "none";
                }

                if(myObj.questionType == "MCQ")
                {
                    document.getElementById("dMCQ").style.display = "block";
                    var mcq1 = document.getElementById("mcq");
                    var mcq2 = document.getElementById("mcq1");
                    var mcq3 = document.getElementById("mcq2");
                    var mcq4 = document.getElementById("mcq3");
                    mcq1.value = "A";
                    mcq2.value = "B";
                    mcq3.value = "C";
                    mcq4.value = "D";
                }
                else
                {
                    document.getElementById("dMCQ").style.display = "none";
                }
            }

            else if(myObj.completed == true)
            {
                document.getElementById("dError").style.display = "none";
                document.getElementById("dSkip").style.display = "none";
                document.getElementById("dTrueFalse").style.display = "none";
                document.getElementById("dMyInput").style.display = "none";
                document.getElementById("dInteger").style.display = "none";
                document.getElementById("dNumeric").style.display = "none";
                document.getElementById("dMCQ").style.display = "none";
                if(test === false) {
                    document.getElementById("camera").style.display = "none";
                    document.getElementById("dQuessionNum").style.display = "none";
                    document.getElementById("dCorrectScore").style.display = "none";
                    document.getElementById("dQuestion").style.display = "none";
                    document.cookie = "username=;  path=/;";
                    document.cookie = "sessionid=;  path=/;";
                    document.cookie = "Latitude=;  path=/;";
                    document.cookie = "Longitude=;  path=/;";
                    LatitudeArr = [];
                    LongitudeArr = [];
                    score();
                    leaderboard();
                    clearInterval(idVar);

                }else{
                    document.getElementById("dQuestion").innerHTML = "Completed: "+myObj.completed;
                }



            }
        });
}
//  updates the score of the user
function score()
{
    if(test=== false){
        if(scoreLink === undefined) {
            scoreLink = Tscore + "?session=" + sessionID + "";
        }
    }else{
        scoreLink = Tscore;
    }
    fetch(scoreLink)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            console.log(jsonObject); //TODO - Success, do something with the data.//
            var myObj = jsonObject;
            if (myObj.status === "ERROR")
            {
                document.getElementById("dError").style.display = "block";
                document.getElementById("error").innerHTML = myObj.errorMessages;
            }
            else {
                document.getElementById("dScore").style.display = "block";
                document.getElementById("score").innerHTML = myObj.player + "<br>Score: " + myObj.score;
            }
        });
}

function loopLocation()
{

// Get the modal
        var modal1 = document.getElementById("myModal1");

// Get the button that opens the modal
        let btn1 = document.getElementById("myBtn1");
        btn1.style.display = "block";
// Get the <span> element that closes the modal
        var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal
        btn1.onclick = function () {
            modal1.style.display = "block";
            map();
        };

// When the user clicks on <span> (x), close the modal
        span1.onclick = function () {
            modal1.style.display = "none";
        };
// When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal1) {
                modal1.style.display = "none";
            }
        };

        idVar = setInterval(() => {
            myLocation();

        }, 45000);

}

function myLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        document.getElementById("error").innerHTML = "Geolocation is not supported by your browser."; //TODO - Geolocation is NOT supported by browser.
        clearInterval(idVar);
    }
}

function showPosition(position)
{
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    LatitudeArr.push(Latitude);
    LongitudeArr.push(Longitude);
    let lat = JSON.stringify(LatitudeArr);
    let long = JSON.stringify(LongitudeArr);
    setCookie('Latitude', lat , 1);
    setCookie('Longitude', long , 1);
    console.log(Latitude, Longitude);
    getlocation()

}
//  Gets the user's current location
function getlocation()
{
    fetch(Tlocation+"?session="+ sessionID+ "&latitude="+ Latitude+"&longitude="+ Longitude+"")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            console.log(jsonObject); //TODO - Success, do something with the data.//
            var myObj = jsonObject;
            if (myObj.status === "ERROR")
            {
                document.getElementById("dError").style.display = "block";
                document.getElementById("error").innerHTML = myObj.errorMessages;
            }
        });
}
// skips to the next question when able
function skip()
{
    spinner(spin = true);
    fetch(Tskip+"?session="+ sessionID + "")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            spinner(spin = false);
            console.log(jsonObject); //TODO - Success, do something with the data.//
            question();
        });
}
// input of user if  text/integer/numeric
function getInputValue(check)
{
    if(check == 'text') {
        var inputVal = document.getElementById("myInput").value;
        answer(inputVal);
    }
    if(check == 'integer'){
        let integer = document.getElementById("integer").value;
        let value = parseInt(integer);
        answer(value);
    }
    if(check == 'numeric'){
        let numeric = document.getElementById("numeric").value;
        if(isNaN(numeric)){
            document.write(numeric + " is not a number <br/>");
        }else{
            document.write(numeric + " is a number <br/>");
            answer(numeric);
        }
    }
}
// checks the answer of user
function answer(answer)
{
    if(test===false){
        if(ansLink == undefined) {
            ansLink = Tanswer + "?session=" + sessionID + "&answer="+answer+"";
        }
    }else{
        ansLink = Tanswer;
    }
    spinner(spin = true);
    fetch(ansLink)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            spinner(spin = false);
            console.log(jsonObject); //TODO - Success, do something with the data.//
            var myObj = jsonObject;
            ansLink = undefined;
            if(myObj.correct == false)
            {
                document.getElementById("dError").style.display = "block";
                document.getElementById("error").innerHTML = myObj.message;
                score();

            } else {
                    if(test === false) {
                        question();
                    }else{
                        document.getElementById("dError").style.display = "block";
                        document.getElementById("error").innerHTML = myObj.message;

                    }
                }
            if(myObj.completed == true && test === true){
                document.getElementById("dError").style.display = "block";
                document.getElementById("error").innerHTML = myObj.message + "<br> Completed: " + myObj.completed;
            }else if(myObj.completed == false &&test === true){
                document.getElementById("dError").style.display = "block";
                document.getElementById("error").innerHTML = myObj.message + "<br> Completed: " + myObj.completed;
            }
        });
}

// Gets the leaderboard of the server and prints the array of it
function leaderboard() {
    if (test === false) {
        if (LeadeList == undefined) {
            Tleaderboard = Tleaderboard + "?session=" + sessionID + "&sorted";
        }
    }
    spinner(spin = true);
    fetch(Tleaderboard)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            spinner(spin = false);
            console.log(jsonObject); //TODO - Success, do something with the data.//
            var myObj = jsonObject;
            let array = myObj.leaderboard;
            players = myObj.numOfPlayers;
            var noOfPlayers;
            if(test === false) {
                finished();
                for (let i = 0; i < array.length - 1; i++) {
                    if (array[i].player == validName) {
                        player = i;
                    }

                }

                noOfPlayers = 10;
            }else{
                noOfPlayers = players;
            }

            if (noOfPlayers > 0) {
                var table = document.createElement("table");
                table.style.width = '80%';
                table.setAttribute('border', '1');
                table.setAttribute('cellspacing', '0');
                table.setAttribute('cellpadding', '5');


                var col = []; // define an empty array
                for (var i = 0; i < noOfPlayers; i++) {
                    for (var key in array[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                for (let i = 0; i < noOfPlayers; i++) {
                    let milliseconds = array[i].completionTime;
                    if(test === false) {
                        let playerMilliseconds = array[player].completionTime;
                        var playerDate = new Date(playerMilliseconds);
                        let pDate = playerDate.toLocaleString();
                        array[player][col[2]] = pDate;
                    }
                    var myDate = new Date(milliseconds);

                    let date = myDate.toLocaleString();
                    array[i][col[2]] = date;

                }

                var tHead = document.createElement("thead");

                var hRow = document.createElement("tr");
                var tj = document.createElement("th");
                tj.innerHTML = "Position";
                hRow.appendChild(tj);

                if (player > 10 && test === false) {
                    var bRow1 = document.createElement("tr");
                    var td1 = document.createElement("td");
                    td1.innerHTML = player;
                    td1.id = "player";
                    bRow1.appendChild(td1);
                    for (var j = 0; j < col.length; j++) {

                        var td1 = document.createElement("td");
                        td1.id = "player";
                        td1.innerHTML = array[player][col[j]];
                        bRow1.appendChild(td1);
                    }
                }

                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");

                    th.innerHTML = col[i];
                    hRow.appendChild(th);

                }

                tHead.appendChild(hRow);
                table.appendChild(tHead);


                var tBody = document.createElement("tbody");
                if(test === false) {
                    tBody.appendChild(bRow1);
                }
                for (var i = 0; i < noOfPlayers; i++) {

                    var bRow = document.createElement("tr");
                    var tj = document.createElement("td");
                    tj.innerHTML = i + 1;
                    bRow.appendChild(tj);

                    for (var j = 0; j < col.length; j++) {


                        var td = document.createElement("td");
                        td.innerHTML = array[i][col[j]];
                        bRow.appendChild(td);


                    }
                    tBody.appendChild(bRow)
                }

                table.appendChild(tBody);


                var divContainer = document.getElementById("leaderboard");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
            }
            if(test === false) {
                let loadMore = document.getElementById("loadMore");
                loadMore.id="loadMoreButton";
                let button = document.createElement("button");
                button.id="buttonLoadId"
                button.innerHTML = "Load more";
                loadMore.appendChild(button);
                button.onclick = function () {
                    noOfPlayers = noOfPlayers + 10;
                    if (noOfPlayers > 0) {
                        var table = document.createElement("table");
                        table.style.width = '80%';
                        table.setAttribute('border', '1');
                        table.setAttribute('cellspacing', '0');
                        table.setAttribute('cellpadding', '5');


                        var col = []; // define an empty array
                        for (var i = 0; i < noOfPlayers; i++) {
                            for (var key in array[i]) {
                                if (col.indexOf(key) === -1) {
                                    col.push(key);
                                }
                            }
                        }
                        for (let i = 0; i < noOfPlayers; i++) {
                            let milliseconds = array[i].completionTime;
                            let playerMilliseconds = array[player].completionTime;
                            var myDate = new Date(milliseconds);
                            var playerDate = new Date(playerMilliseconds);
                            let date = myDate.toLocaleString();
                            let pDate = playerDate.toLocaleString();

                            array[i][col[2]] = date;
                            array[player][col[2]] = pDate;
                        }

                        var tHead = document.createElement("thead");

                        var hRow = document.createElement("tr");
                        var tj = document.createElement("th");
                        tj.innerHTML = "Position";
                        hRow.appendChild(tj);

                        if (player > 10) {
                            var bRow1 = document.createElement("tr");
                            var td1 = document.createElement("td");
                            td1.innerHTML = player;
                            bRow1.appendChild(td1);
                            for (var j = 0; j < col.length; j++) {

                                var td1 = document.createElement("td");
                                td1.innerHTML = array[player][col[j]];
                                bRow1.appendChild(td1);
                            }
                        }

                        for (var i = 0; i < col.length; i++) {
                            var th = document.createElement("th");

                            th.innerHTML = col[i];
                            hRow.appendChild(th);

                        }

                        tHead.appendChild(hRow);
                        table.appendChild(tHead);


                        var tBody = document.createElement("tbody");
                        tBody.appendChild(bRow1);

                        for (var i = 0; i < noOfPlayers; i++) {

                            var bRow = document.createElement("tr");
                            var tj = document.createElement("td");
                            tj.innerHTML = i + 1;
                            bRow.appendChild(tj);

                            for (var j = 0; j < col.length; j++) {


                                var td = document.createElement("td");
                                td.innerHTML = array[i][col[j]];
                                bRow.appendChild(td);


                            }
                            tBody.appendChild(bRow)
                        }

                        table.appendChild(tBody);


                        var divContainer = document.getElementById("leaderboard");
                        divContainer.innerHTML = "";
                        divContainer.appendChild(table);
                    }
                };
            }
        });

}

//  Checks if questions finished and navigates through HomePage / NewGame
function finished() {
    let finish = document.getElementById("finish");
    let newGame = document.createElement("button");
    newGame.id="newGameButton";
    newGame.className = "animated-button3";
    let home = document.createElement("button");
    home.id="homeButton";
    home.className = "animated-button3";
    newGame.innerHTML = "<span></span><span></span><span></span><span></span>New Game";
    home.innerHTML += "<span></span><span></span><span></span><span></span>Home Page";
    home.onclick = function(){
        location.replace("index.html");
    };
    finish.appendChild(newGame);
    finish.appendChild(home);
    newGame.onclick = function () {
        location.reload();
    }
}
// Gets all the available cameras
function getCamera() {
    let opts = {
        // Whether to scan continuously for QR codes. If false, use scanner.scan() to manually scan.
        // If true, the scanner emits the "scan" event when a QR code is scanned. Default true.
        continuous: true,

        // The HTML element to use for the camera's video preview. Must be a <video> element.
        // When the camera is active, this element will have the "active" CSS class, otherwise,
        // it will have the "inactive" class. By default, an invisible element will be created to
        // host the video.
        video: document.getElementById('preview'),

        // Whether to horizontally mirror the video preview. This is helpful when trying to
        // scan a QR code with a user-facing camera. Default true.
        mirror: false,

        // Whether to include the scanned image data as part of the scan result. See the "scan" event
        // for image format details. Default false.
        captureImage: false,

        // Only applies to continuous mode. Whether to actively scan when the tab is not active.
        // When false, this reduces CPU usage when the tab is not active. Default true.
        backgroundScan: true,

        // Only applies to continuous mode. The period, in milliseconds, before the same QR code
        // will be recognized in succession. Default 5000 (5 seconds).
        refractoryPeriod: 5000,

        // Only applies to continuous mode. The period, in rendered frames, between scans. A lower scan period
        // increases CPU usage but makes scan response faster. Default 1 (i.e. analyze every frame).
        scanPeriod: 1
    };
    let j = 0;
    let camerass;
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            console.log(cameras);
            scanner.start(cameras[0]);
            let cmra = document.getElementById("demo");
            camerass = document.createElement("input");
            camerass.id = "button1";
            camerass.type = "button";
            camerass.value = "Switch Camera";
            cmra.appendChild(camerass);
            for (let i = 0; i < cameras.length; i++) {
                camerass.onclick = function () {
                    if (j < cameras.length - 1) {
                        j = j + 1;
                        scanner.start(cameras[j]);
                    } else {
                        j = 0;
                        scanner.start(cameras[j]);
                    }
                }
            }
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });

    let scanner = new Instascan.Scanner(opts);
    scanner.addListener('scan', function (content) {
        console.log(content);
        if (content != "") {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            document.getElementById("content").innerHTML = "";
            if (!regex.test(content)) {
                document.getElementById("content").innerHTML = content;
                answer(content);
                modal.style.display = "none";
            } else {
                document.getElementById("content").innerHTML += "<a href='" + content + "'target=\"_blank\">" + content + "</a>";
                window.open(content);
            }
        }


    });
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        scanner.stop();
        camerass.remove();
        modal.style.display = "none";
    };

}


// mapBox Map + markers
function map() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3lyaWFrb3M5OGIiLCJhIjoiY2szb28yOXBsMG80MjNwcXJ1cnYzd2cwYSJ9.uFxaEPB3KDykZn_4G0UPEg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [LongitudeArr[0], LatitudeArr[0]],
        zoom: 15
    });

    let index = 0;
    let pop = index + 1;
    var geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [LongitudeArr[index], LatitudeArr[index]]
            },
            properties: {
                title: 'Treasure Hunt',
                description: "Position" + pop
            }
        }],

    };
    console.log(geojson);
    if(LatitudeArr.length-1 >0) {
        for (let i = 0; i < LatitudeArr.length - 1; i++) {
            index++;
            pop = index + 1;
            geojson.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [LongitudeArr[index], LatitudeArr[index]]
                },
                properties: {
                    title: 'Treasure Hunt',
                    description: "Position" + pop
                }
            });
        }
    }
                // add markers to map
                geojson.features.forEach(function (marker) {

                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';

                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
                            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                        .addTo(map);
                });



}