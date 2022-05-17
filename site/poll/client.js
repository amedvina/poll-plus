/* eslint-disable no-empty */
// eslint-disable-next-line no-unused-vars

//source: https://github.com/multiparty/jiff
function connect() {
  $('#connectButton').prop('disabled', true);
  var computation_id = $('#computation_id').val();
  var registered_id = localStorage.getItem('id-name');
  var registered_number = localStorage.getItem('party-count');
  var exitButton = document.getElementById('exit');
  
  var users_id = $('#users_id').val();
  var retrievedUsers = JSON.parse(localStorage.getItem('userArray'));
  var isUserArr = retrievedUsers.includes(users_id);

  if ((computation_id === registered_id & (isUserArr === true))) {

    const filtered = retrievedUsers.filter(item => item !== users_id);

    localStorage.setItem('userArray', JSON.stringify(filtered));

    var options = {
      party_count: registered_number,
      Zp: 31
    };
    options.onError = function (_, error) {
      $('#output').append("<p class='error'>" + error + '</p>');
    };
    options.onConnect = function () {
      $('#button').attr('disabled', false);
      $('#revealButton').attr('disabled', false);
      $('#output').append('<p>All voters connected. You can now vote!</p>');

      exitButton.onclick = function () {
        registered_number-=1;
      }
      // eslint-disable-next-line no-octal
      var minute = localStorage.getItem('time-amount');
      // eslint-disable-next-line no-octal
      var second = 01;

      setInterval(function () {
        document.getElementById('timer').innerHTML = minute + ':' + second;
        second--;

        // eslint-disable-next-line no-octal
        if (second === 00) {
          minute--;
          second = 60;
        }
        if (minute === 0 && second === 1) {
          document.getElementById('timer').innerHTML = 'Timer Stopped';
          alert('Time has ran out!');
          window.location.href = 'home.html';
        }
        if (minute <= -1) {
          document.getElementById('timer').innerHTML = '';
        }
      }, 1000);
    };
    var hostname = window.location.hostname.trim();
    var port = window.location.port;
    if (port == null || port === '') {
      port = '80';
    }
    if (!(hostname.startsWith('http://') || hostname.startsWith('https://'))) {
      hostname = 'http://' + hostname;
    }
    if (hostname.endsWith('/')) {
      hostname = hostname.substring(0, hostname.length - 1);
    }
    if (hostname.indexOf(':') > -1 && hostname.lastIndexOf(':') > hostname.indexOf(':')) {
      hostname = hostname.substring(0, hostname.lastIndexOf(':'));
    }

    hostname = hostname + ':' + port;
    // eslint-disable-next-line no-undef
    mpc.connect(hostname, computation_id, options);
  } else {
    $('#output').append("<p class='error'>ID does not match!</p>");
    $('#connectButton').prop('disabled', false);
    return;
  }
}

// eslint-disable-next-line no-unused-vars
function submit() {
  var vote = $('#option').prop('checked') ? 2 : 1;

  var inputs = [];
  var radios = $('input[type=radio]');
  var oneChecked = false;
  for (var i = 0; i < radios.length; i++) {
    inputs.push(radios[i].checked ? vote : 0);
    oneChecked = oneChecked || radios[i].checked;
  }

  if (!oneChecked) {
    $('#output').append("<p class='error'>Please select!</p>");
    return;
  }

  $('#sumButton').attr('disabled', true);
  $('#output').append('<p>Poll+ has commenced!</p>');

  // eslint-disable-next-line no-undef
  var promise = mpc.compute(inputs);
  if (promise != null) {
    promise.then(handleResult, handleError);
  }
}

function handleResult(result) {
  // eslint-disable-next-line no-undef
  var option_one = localStorage.getItem('option-one');
  var option_two = localStorage.getItem('option-two');
  var option_three = localStorage.getItem('option-three');
  var option_four = localStorage.getItem('option-four');
  var keys = [option_one, option_two, option_three, option_four];

  var values = result;

  var obj = {};


  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }

  for (var key of Object.keys(obj)) {
    $('#output').append('<p>Result is: ' + key + ' => ' + obj[key] + '</p>');
  }

  $('#button').attr('disabled', false);
}

function handleError() {
  console.log('Error in open_array');
}

// eslint-disable-next-line no-unused-vars
function toggleButton() { //

  var revealButton = document.getElementById('revealButton');

  revealButton.onclick = function () {
    var div = document.getElementById('myDiv');
    if (div.style.display !== 'none') {
      div.style.display = 'none';
    } else {
      div.style.display = 'block';
    }
  }
}

var poll_name = '';
var id_name = '';
var userid_num = '';
var party_count = '';
var time_amount = '';
var option_one = '';
var option_two = '';
var option_three = '';
var option_four = '';

// eslint-disable-next-line no-empty
if (!(localStorage.getItem('poll-name') == null)) {
  $('.poll-name').text(localStorage.getItem('poll-name'));
  $('.poll-name-res').text(localStorage.getItem('poll-name'));
}

if (!(localStorage.getItem('id-name') == null)) {
  $('.id-name').text(localStorage.getItem('id-name'));
  $('.id-name-res').text(localStorage.getItem('id-name'));
}

if (!(localStorage.getItem('userid-num') == null)) {
  $('.userid-num').text(localStorage.getItem('userid-num'));
  $('.userid-num-res').text(localStorage.getItem('userid-num'));
}


if (!(localStorage.getItem('party-count') == null)) {
  $('.party-count').text(localStorage.getItem('party-count'));
  $('.party-count-res').text(localStorage.getItem('party-count'));
}

if (!(localStorage.getItem('time-amount') == null)) {
  $('.time-amount').text(localStorage.getItem('time-amount'));
  $('.time-amount-res').text(localStorage.getItem('time-amount'));
}

if (!(localStorage.getItem('option-one') == null)) {
  $('#cn-1').text(localStorage.getItem('option-one'));
  $('.c1-nme').text(localStorage.getItem('option-one') + ':');
}

if (!(localStorage.getItem('option-two') == null)) {
  $('#cn-2').text(localStorage.getItem('option-two'));
  $('.c2-nme').text(localStorage.getItem('option-two') + ':');
}

if (!(localStorage.getItem('option-three') == null)) {
  $('#cn-3').text(localStorage.getItem('option-three'));
  $('.c3-nme').text(localStorage.getItem('option-three') + ':');
}

if (!(localStorage.getItem('option-four') == null)) {
  $('#cn-4').text(localStorage.getItem('option-four'));
  $('.c4-nme').text(localStorage.getItem('option-four') + ':');
}

// eslint-disable-next-line no-unused-vars
function saveButton() {
  $('.save-btn').click(function () {
    poll_name = document.getElementById('pl-input').value;
    id_name = document.getElementById('compid-inp').value;
    userid_num = document.getElementById('usersid-inp').value;
    party_count = document.getElementById('count').value;
    time_amount = document.getElementById('time').value;
    option_one = document.getElementById('option-one-input').value;
    option_two = document.getElementById('option-two-input').value;
    option_three = document.getElementById('option-three-input').value;
    option_four = document.getElementById('option-four-input').value;
    localStorage.setItem('poll-name', poll_name);
    localStorage.setItem('id-name', id_name);
    localStorage.setItem('userid-num', userid_num);
    localStorage.setItem('party-count', party_count);
    localStorage.setItem('time-amount', time_amount);
    localStorage.setItem('option-one', option_one);
    localStorage.setItem('option-two', option_two);
    localStorage.setItem('option-three', option_three);
    localStorage.setItem('option-four', option_four);

    userid_num = document.getElementById('usersid-inp').value;
    var userid_arr = userid_num.split(',');
    localStorage.setItem("userArray", JSON.stringify(userid_arr));


    window.location.href = 'vote.html';
  })
}
