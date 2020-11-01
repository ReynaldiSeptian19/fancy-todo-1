const SERVER = 'http://localhost:3000'


$(document).ready(()=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        $("#login").hide()
        $("#home").show()
        showById()
        $("#showbyid").show()
        $("#add").hide()
    }else{
        $("#home").hide()
        $("#login").show()
        $("#showbyid").hide()
        $("#add").hide()

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
        localStorage.setItem('accessToken', res);
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
        // console.log(res)
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
            <a href="#" onclick="edit()">edit</a>
            <a style="margin-left: 35px" href="#" onclick="deleteTodo(${e.id})">delete</a>
            </div>
            <div class="col-md-12">
                <h5>Status: ${e.status}</h5>
                <p><a href="#" onclick="patchTodo()">edit status</a></p>
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
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:"POST",
        url : SERVER + '/user/googlelogin',
        data : {google_token}
    })
    .done(res =>{
        console.log(res);
        localStorage.setItem('accessToken', res);
        $("#login").hide()
        $("#home").show()
        showById()
        $("#showbyid").show()
        $("#add").hide()
    })
    .fail(err =>{
        console.log(err)
    })
  }

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    localStorage.removeItem('accessToken');
    $("#home").hide()
    $("#login").show()
}


