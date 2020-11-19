const SERVER = 'http://localhost:3000'
let searchId

$(document).ready(()=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        $("#login").hide()
        $("#home").show()
        showById()
        $("#showbyid").show()
        $("#add").hide()
        $("#edit").hide()
        $("#update").hide()
    }else{
        $("#home").hide()
        $("#login").show()
        $("#showbyid").hide()
        $("#add").hide()
        $("#edit").hide()
        $("#update").hide()
    }
})

$('#register').hide()
$("#registertog").on("click", function(){
    let tog = false
    tog = !tog
    if(tog){
        $('#register').show()
        $('#login').hide()
        $("#home").hide()
    }
})



$("#backtog").on("click", function(){
    let tog = false
    tog = !tog
    if(tog){
        $('#register').hide()
        $('#login').show()
        $("#home").hide()
    }
})


function login(ev){
    ev.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    console.log(email, password);
    $.ajax({
        method: "POST",
        url: SERVER + "/user/login",
        data: { email,password }
      })
      .done(res=>{
        localStorage.setItem('accessToken', res.access_token);
        $("#login").hide()
        $("#home").show()
        showById()
        $("#showbyid").show()
        $("#add").hide()
      })
      .fail(err=>{
        console.log(err)
    })
}

function register(ev){
    ev.preventDefault()
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    const name = $("#register-name").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/user/register",
        data: { email,password,name }
      })
      .done(res=>{
        $("#login").show()
        $("#home").hide()
        $('#register').hide()
      })
      .fail(err=>{
        console.log(err)
    })
}

function showById(){
    $.ajax({
        method: "GET",
        url: SERVER + "/todo",
        headers: {
            "access_token": localStorage.getItem('accessToken')
        }
      })
      .done(res=>{
        console.log(res)
        $('#todos').empty()
        res.forEach(e=>{

            let date = e.due_date.split("T")[0]
            if(e.status === true){
                e.status = "Done"
            }else if(e.status === false){
                e.status = "Not Yet"
            }
            console.log(e)
            $('#todos').append(
            `
            <div class="col-md-10">
                <h3>Title: ${e.title}</h3>
            </div>
            <div class="col-md-2">
                <h5>Form Action</h5>
            </div>
            <div class="col-md-10">
                <h5>Description: ${e.description}</h5>
            </div>
            <div class="col-md-2">
            <a href="#" onclick="checkId(${e.id})">edit</a>
            <a style="margin-left: 35px" href="#" onclick="deleteTodo(${e.id})">delete</a>
            </div>
            <div class="col-md-12">
                <h5>Status: ${e.status}</h5>
                <p><a href="#" onclick="checkId2(${e.id})">edit status</a></p>
            </div>
            <div class="col-md-12">
                <h5>Date: ${date}</h5>
            </div>
            <br>
            <br>
            <br>
            `
        )
        })
        $("#login").hide()
        $("#home").show()
        $('#register').hide()
        $("#add").hide()
      })
      .fail(err=>{
        console.log(err)
    })
}


function checkId2(id) {
    searchId  = id
    $.ajax({
        method: 'GET',
        url: `${SERVER}/todo/${id}`,
        headers: {
            "access_token": localStorage.getItem('accessToken')
        }
    })
    .done(response => {
        $('#edit-title').val(response.title)
        $('#edit-description').val(response.description)
        $('#edit-status').val(response.status)
        $('#edit-date').val(response.due_date)
        $('#todos').empty()
        showById()
        $("#showbyid").hide()
        $("#login").hide()
        $("#home").hide()
        $('#register').hide()
        $("#add").hide()
        $("#edit").hide()
        $("#update").show()
    })
    .fail(err =>{
        console.log(err)
    })
}

function checkId(id) {
    searchId  = id
    $.ajax({
        method: 'GET',
        url: `${SERVER}/todo/${id}`,
        headers: {
            "access_token": localStorage.getItem('accessToken')
        }
    })
    .done(response => {
        $('#edit-title').val(response.title)
        $('#edit-description').val(response.description)
        $('#edit-status').val(response.status)
        $('#edit-date').val(response.due_date)
        $('#todos').empty()
        showById()
        $("#showbyid").hide()
        $("#login").hide()
        $("#home").hide()
        $('#register').hide()
        $("#add").hide()
        $("#edit").show()
    })
    .fail(err =>{
        console.log(err)
    })
}

function editTodo(ev){
    ev.preventDefault
    const title = $('#edit-title').val()
    const description = $('#edit-description').val()
    const status = $('#edit-status').val()
    const due_date = $('#edit-date').val()
   
    $.ajax({
        method: 'PUT',
        url: `${SERVER}/todo/${searchId}`,
        headers: {
            "access_token": localStorage.getItem('accessToken')
        },
        data: {title,description,status,due_date}
    })
    console.log(searchId)
    .done(response => {
        console.log(response)
        $('#todos').empty()
        showById()
        $("#showbyid").show()
        $("#login").hide()
        $("#home").show()
        $('#register').hide()
        $("#add").hide()
    })
    .fail(err =>{
        console.log(err)
    })
}

function updateTodo(ev){
    ev.preventDefault
    const status = $('#update-status').val()
    $.ajax({
        method: 'PUT',
        url: `${SERVER}/todo/${searchId}`,
        headers: {
            "access_token": localStorage.getItem('accessToken')
        },
        data: {status}
    })
    console.log(searchId)
    .done(response => {
        console.log(response)
        $('#todos').empty()
        showById()
        $("#showbyid").show()
        $("#login").hide()
        $("#home").show()
        $('#register').hide()
        $("#add").hide()
    })
    .fail(err =>{
        console.log(err)
    })
}

function deleteTodo(id){
    $.ajax({
        method: "DELETE",
        url: SERVER + "/todo/" +id,
        headers: {
            "access_token": localStorage.getItem('accessToken')
        }
      })
      .done(res=>{
          $('#todos').empty()
          showById()
          $("#login").hide()
          $("#home").show()
          $('#register').hide()
      })
      .fail(err=>{
          console.log(err)
      })
}

function addTodo(ev){
    ev.preventDefault()
    $("#home").hide()
    $("#showbyid").hide()
    $("#add").show()
}

function add(ev) {
    ev.preventDefault()
    console.log('function add')
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const status = $("#add-status").val()
    const due_date = $("#add-date").val()
    $.ajax({
      method: "POST",
      url: SERVER + "/todo",
      headers:{
        "access_token": localStorage.getItem('accessToken')
      },
      data: {title,description,status,due_date}
    })
      .done(res => {
          console.log(res)
          $('#todos').empty()
          showById()
          $("#showbyid").show()
          $("#login").hide()
          $("#home").show()
          $('#register').hide()
          $("#add").hide()
      })
      .fail(err => {
        console.log(err)
      })
  }

//Google Sign in
function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token, '<<< ini access_token dari google');
    $.ajax({
      method: 'POST',
      url: SERVER + '/user/googlelogin',
      headers: {
        google_access_token
      }
    })
      .done(response => {
          console.log(response.access_token)
        localStorage.setItem('accessToken', response.access_token)
        $("#login").hide()
        $("#home").show()
        showById()
        $("#showbyid").show()
        $("#add").hide()
      })
      .fail(err => {
        console.log(err)
      })
  }
  
  // Google sign out
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    $("#content").hide()
    hideContent()
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
  }

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    localStorage.removeItem('accessToken');
    $("#home").hide()
    $("#login").show()
}


