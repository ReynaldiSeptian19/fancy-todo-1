const SERVER = 'http://localhost:3000'

$(document).ready(()=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        $("#login").hide()
        $("#home").show()
    }else{
        $("#home").hide()
        $("#login").show()
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
        localStorage.setItem('accessToken', res.accessToken);
        // console.log(res.accessToken)
        $("#login").hide()
        $("#home").show()
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


function logout() {
    localStorage.removeItem('accessToken');
    $("#home").hide()
    $("#login").show()
}
