// get and set login token
const logIn = () => {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#pwd').val();
    $.ajax({
        url: "https://reqres.in/api/login",
        type: "POST",
        data: {
            email: email,
            password: password
        },
       statusCode: {
          400: function () {
            $(".alertComplete").removeClass("alertComplete").fadeIn(1000)
            }
        },
        success: function(response){
            const token = response.token;
            localStorage.setItem('token', token);
            $("button#bgPic_log").click(function(event){
                location.href = 'weather.html';
            })
        }
    }) 
};
// get and set register token
const register = () => {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#pwd').val();
    $.ajax({
        url: "https://reqres.in/api/register",
        type: "POST",
        data: {
            email: email,
            password: password
        },
        statusCode: {
            400: function () {
                $(".alertComplete").removeClass("alertComplete").fadeIn(1000)
            }
        },
        success: function(response){
            let token = response.token;
            localStorage.setItem('token', token);
            $("button#bgPic_sign").click(function(event){
                location.href = 'weather.html';
            })
        }
    })
};
//logo fade in
$("#logo").css("display", "none");
    $("#logo").fadeIn(2000 , function(){
        $(this).css("display","normal");
});
$('#logo').animate({
    left: "300px"
}, 2000 ) ;
//form fade in 
$("form#logIn").css("display", "none");
    $("form#logIn").delay(4000).fadeIn(800 , function(){
        $(this).css("display","normal");
});
// wheather info
const weatherShow = (event) => {
    let city= $('#cityName').val();
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=529280e0794d71b495953681a12d6f38`,
        type: "POST",
        success: function(response){
            let degree= response.main.temp;
            let weather= response.weather[0];
            let description= weather.description;
            $('span.degree').append(degree+'°c'),
            $('span.weatherS').append(description);
            console.log(weather);
            if(weather.main === 'Drizzle' || weather.main === 'Rain'){
                $('body div.bg').removeClass("bg").addClass("bg_rain")
                $('body div.logo2').removeClass("logo2").addClass("logo2_rain")
                $('body span.degree').removeClass("degree").addClass("degree_rain")
                $('body span.weatherS').removeClass("weatherS").addClass("weatherS_rain")
                $('form div p.labale').removeClass("labale").addClass("labale_rain")
                $('form div.inputBorder').removeClass("inputBorder").addClass("inputBorder_rain")
            }
            if(weather.main === 'Snow'){
                $('body div.bg').removeClass("bg").addClass("bg_snow")
                $('body div.logo2').removeClass("blogo2").addClass("logo2_snow")
                $('body span.degree').removeClass("degree").addClass("degree_snow")
                $('body span.weatherS').removeClass("weatherS").addClass("weatherS_snow")
                $('body p.labale').removeClass("labale").addClass("labale_snow")
                $('body div.inputBorder').removeClass("inputBorder").addClass("inputBorder_snow")
            }
            if(weather.main === 'Clear'){
                $('body div.bg').removeClass("bg").addClass("bg_clear")
                $('body div.logo2').removeClass("blogo2").addClass("logo2_snow")
                $('body span.degree').removeClass("degree").addClass("degree_snow")
                $('body span.weatherS').removeClass("weatherS").addClass("weatherS_snow")
                $('body p.labale').removeClass("labale").addClass("labale_snow")
                $('body div.inputBorder').removeClass("inputBorder").addClass("inputBorder_snow")
            }
            if(weather.main === 'Clouds'){
                $('body div.bg').removeClass("bg").addClass("bg_cloud")
                $('body div.logo2').removeClass("blogo2").addClass("logo2_snow")
                $('body span.degree').removeClass("degree").addClass("degree_snow")
                $('body span.weatherS').removeClass("weatherS").addClass("weatherS_snow")
                $('body p.labale').removeClass("labale").addClass("labale_snow")
                $('body div.inputBorder').removeClass("inputBorder").addClass("inputBorder_snow")
            }
        },
        statusCode: {
            404: function () {
                $(".alertCity").removeClass("alertCity").fadeIn(1000)
            }
        }
    })
};