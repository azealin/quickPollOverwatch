(function() {
    //
    // Loading and initializing the NPAPI plugin.
    //
    navigator.plugins.refresh(true);

//
// Click/key listeners
//
    document.querySelector('#btnpass').addEventListener("click", connectToTwitch);


    var chatPlugin = document.querySelector('#chatPlugin');

    if (chatPlugin == null) {
        document.querySelector('#title').innerText = "Chat plugin couldn't be loaded!";

    } else {
        document.querySelector('#title').innerText = "Chat plugin was loaded!";


    };

//
// Twitch API Login
//
    function serialize(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    function loginToTwitchApi(username, password, callback) {

        var data = {
            username: username,
            password: password,
            streamId: null,
            client_id: 'd6yp57j6aqsursujc0rkxlg4pyepeuk',
            client_secret: '9n602nhzcblqilb2ycr1kpvgmjv5q5k',
            scope: 'user_read channel_stream channel_read channel_editor chat_login channel_commercial sdk_broadcast metadata_events_edit',
            grant_type: 'password'
        };

        var xhr = new XMLHttpRequest();

        //Don't forget to add the twitch API url to the externally_connectable property in your manifest.json
        xhr.open("POST", "https://api.twitch.tv/kraken/oauth2/token", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.setRequestHeader("Accept", "application/json, text/plain, */*");

        xhr.send(serialize(data));

        xhr.onload = function () {
            callback(JSON.parse(this.responseText));
        };

    }   //
// Connecting to Twitch Chat and starting the poll
//
    var usernamesave;
    function connectToTwitch() {
        console.log("connect");
        var username = document.querySelector("#User").value;
        var password = document.querySelector("#Password").value;

        loginToTwitchApi(username, password, function (response) {

            if (response.status) {
                document.querySelector('.lead').innerText = response.message;
                return;
            }
            var token = response.access_token;

            document.querySelector('.lead').innerText = "Status: Connecting...";
            chatPlugin.chatConnect(username, username, token, function (e, error) {

                    if (e) {
                        document.querySelector('.lead').innerText = "Status: Connected to chat";
                        //usernamesave= username;
                        //document.querySelector('#currentuser').innerText = username;
                        loadQuestion();
                    }
                    else {
                        document.querySelector('.lead').innerText = "Status: Could not connect to chat - " + error;
                    }
                    console.log("connect callback:", e, error)
                }
            )
        });
    }
    function loadQuestion(){
        document.querySelector(".jumbotron").innerHTML = "    <h1 id='title'></h1> \
        <p class='lead'>Enter your question here</p>\
        <form class='form-inline'>\
        <div class='form-group'>\
        <input type='text' class='form-control' placeholder='Enter Question' id='Question'>\
        </div>\
        \
        <button type='button' class='btn btn-lg btn-success' id='btnquestion'>Submit</button>\
        </form>";

        document.querySelector('#btnquestion').addEventListener("click", storeQuestion);

    }
var question;
    function storeQuestion(){
        question = document.querySelector('#Question').value;
        if(question != null) {
            console.log(question);
            loadOptions();
        }
    }
var option1;
    var option2;
    var option3;
    var option4;
    function loadOptions(){
        document.querySelector(".jumbotron").innerHTML = "    <h1 id='title'></h1> \
        <p class='lead'>Enter your poll options here</p>\
        <form class='form-inline'>\
        <div class='form-group'>\
        <input type='text' class='form-control' placeholder='Enter Poll Option 1' id='poll1''>\
        </div>\
        <div class='form-group'>\
        <input type='text' class='form-control' placeholder='Enter Poll Option 2' id='poll2' >\
        </div>\
        <div class='form-group'>\
        <input type='text' class='form-control' placeholder='Enter Poll Option 3' id='poll3' >\
        </div>\
        <div class='form-group'>\
        <input type='text' class='form-control' placeholder='Enter Poll Option 4' id='poll4' >\
        </div>\
        \
        <button type='button' class='btn btn-lg btn-success' id='btnpoll'>Start Poll</button>\
        </form>";
        document.querySelector('#btnpoll').addEventListener("click", storePoll);
    }
    function storePoll(){
        option1 = document.querySelector('#poll1').value;
        option2 = document.querySelector('#poll2').value;
        option3 = document.querySelector('#poll3').value;
        option4 = document.querySelector('#poll4').value;

    }
    //
    // Poll data
    //
    var pollData = {
        isPollLive: false,
        pollNumVotes: [],
        pollTimeElapsedMs: 0
    }
}
)();/**
 * Created by azeal_000 on 2/23/2015.
 */
