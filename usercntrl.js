var app = angular.module("app", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "login.html",

    }).when("/dashboard", {
        templateUrl: "dashboard.html",
        controller: "currentwther"
    }).when("/ragister", {
        templateUrl: "ragister.html"
    }).when("/facts", {
        templateUrl: "facts.html"
    }).when("/sports", {
        templateUrl: "sports.html"
    }).when("/astronomy", {
        templateUrl: "astronomy.html"
    }).otherwise({
        redirectTo: '/'
    });
});

app.controller("loginctrl", ["$scope", "$location", "loginService", function (p, $location, loginService) {
    p.redirect = function () {
        $location.path('/dashboard')
    }
    p.userarr;
    p.loginsuccess = false;
    p.dispplayPswIncMsg = false;
    p.displayUsrNtFnd = false;
    p.Isshow = function () {
        p.isShow = false;

    }


    p.login = function () {
        loginService.loginUser(
            function (usersdata) {
                p.userarr = usersdata;

                let flag = false;
                for (user of p.userarr) {
                    if (user.email === p.loginemail && user.password === p.loginpassword) {
                        p.loginsuccess = true;

                        console.log("loginsucess")
                        flag = true;
                        p.redirect();
                        break;
                    }
                    else if (user.email === p.loginemail && user.password !== p.loginpassword) {
                        p.dispplayPswIncMsg = true;
                        alert("incorrect paassword")
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    alert("User Not found Please Ragister")
                }
            }
        );
    }
}])

app.controller("rgtrCtrl", ["$scope", "$location", "rgtrService", function (p, $location, rgtrService) {

    p.isSHow = function () {
        p.isShow = false;

    }
    p.ragister = function () {
        var userData = {
            name: p.name,
            email: p.email,
            password: p.password
        }
        p.redirect = function () {
            $location.path('/dashboard')
        }
        if (p.password === p.confirmPassword) {
            rgtrService.checkUserPresence(function (users) {
                var userPrsence = false;
                for (user of users) {
                    // console.log(user)
                    if (user.email == p.email) {
                        userPrsence = true;
                        console.log(user)
                        alert("user already exist! Please Login")
                        break;
                    }
                }
                if (!userPrsence) {
                    rgtrService.ragisterUser(userData);
                    p.redirect()
                }
            })
        }
        else {
            alert("password not matched")
        }


        // else{
        //     alert("user already exist! Please Login")
        // }
    }

}])

app.controller("currentwther", ["$scope", "$interval", "$injector", "currentweatherservice", function (p, $interval, injector, currentweatherservice) {
    p.name;
    p.region;
    p.country;
    p.temp_c;
    p.text;
    p.feelslike_c;
    p.img;
    var src_base = `./64x64/`
    p.is_day;
    p.imglink;
    p.date = new Date();




    p.cityName;
    p.searchWeather = function (cityname) {
        // alert("searching");
        currentweatherservice.currentWthr("/current.json", cityname, null, function (res) {
            var wind_mph = res.current.wind_mph;
            var wind_kph = res.current.wind_mph;
            var precip_mm = res.current.precip_mm;
            var precip_in = res.current.precip_in;
            var cloud = res.current.cloud;
            var visibility = res.current.vis_miles;

            console.log(res)

            if (wind_mph > 35 || wind_kph > 56) {
                p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
            } else if (precip_mm > 0.1 || precip_in > 0.25) {
                if (visibility < 1) {
                    p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
                } else {
                    p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
                }
            } else if (cloud > 75) {
                p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            } else if (cloud > 50) {
                p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            } else if (visibility < 1) {
                p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
            } else {
                p.imglink = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
            }
            p.currback = {
                "background-image": p.imglink
            };
            // console.log(res)
            p.name = res.location.name;
            p.region = res.location.region;
            p.country = res.location.country;
            p.temp_c = res.current.temp_c;
            p.text = res.current.condition.text;
            p.feelslike_c = res.current.feelslike_c;
            var iconl = res.current.condition.icon;
            p.img = `${src_base}${iconl.substring(iconl.length - 11)}`
        });
    }
    p.searchWeather(null);
    $interval(function () {
        p.date = new Date();

    }, 1000);
    $interval(function () {
        p.searchWeather(null);

    }, 60000);


}])

app.controller("hourlyWeather", ["$scope", "$interval", "currentweatherservice", function (p, $interval, currentweatherservice) {
    p.hourlyWeatherData = [];
    p.icon;
    currentweatherservice.currentWthr("/forecast.json", null, null, function (res) {
        p.hourlyWeatherData = res.forecast.forecastday[0].hour;
        // console.log(res);


        // console.log(p.hourlyWeatherData);

    })
}])

app.controller("daillyweather", ["$scope", "currentweatherservice", function (p, currentweatherservice) {
    p.daiilyData = [];
    var startDate = new Date();
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 14);
    var currentDate = startDate;
    var numDays = 0;
    while (currentDate <= endDate) {
        var DateString = currentDate.toISOString().slice(0, 10);
        console.log(DateString);

        currentweatherservice.currentWthr("/forecast.json", null, DateString, function (res) {
            p.daiilyData.push([res.forecast.forecastday[0].day, res.forecast.forecastday[0].date]);
            numDays++;
            if (numDays === 15) {
                p.daiilyData.sort(function (a, b) {
                    var dateA = new Date(a[1]);
                    var dateB = new Date(b[1]);
                    return dateA - dateB;
                });
                console.log(p.daiilyData);
            }

        })
        currentDate.setDate(currentDate.getDate() + 1);
    }



}])

app.controller("astronomy", ["$scope", "$interval", "currentweatherservice", function (s, $interval, currentweatherservice) {
    s.astronomyarr;
    s.backgroungimg;
    s.moonphase;
    s.myImage;
    s.cityName;
    s.wea = function (cityname) {
        currentweatherservice.currentWthr("/astronomy.json", cityname, null, function (res) {
            s.astronomyarr = res;

            if (s.astronomyarr.astronomy.astro.is_moon_up == 1) {
                s.backgroungimg = {
                    "background-image": 'url("./64x64/astronomy/day.jpg")',
                }
                s.textcolor = {
                    "color": "black"
                }

            }
            else if (s.astronomyarr.astronomy.astro.is_moon_up == 0) {
                s.backgroungimg = {
                    "background-image": 'url("./64x64/astronomy/night.jpg")',

                }
                s.textcolor = {
                    "color": "white"
                }

            }
            if (s.astronomyarr.astronomy.astro.moon_phase === 'New Moon') {
                s.myImage = './64x64/astronomy/new-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'Waxing Crescent') {
                s.myImage = './64x64/astronomy/waxing-crescent-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'First Quarter') {
                s.myImage = './64x64/astronomy/first-quarter-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'Waxing Gibbous') {
                s.myImage = './64x64/astronomy/waxing-gibbous-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'Full Moon') {
                s.myImage = './64x64/astronomy/full-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'Waning Gibbous') {
                s.myImage = './64x64/astronomy/waning-gibbous-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'Last Quarter') {
                s.myImage = './64x64/astronomy/thisrd-quarter-moon.jpg';
            } else if (s.astronomyarr.astronomy.astro.moon_phase === 'Waning Crescent') {
                s.myImage = './64x64/astronomy/waning-gibbous-moon.jpg';
            }



            console.log("erer");
        })
    }
    s.wea(null);
    $interval(function () {
        s.wea(null);

    }, 60000);
}])

app.controller("sportscntrl", ["$scope", "currentweatherservice", function (s, currentweatherservice) {
    s.football;
    s.cricket;
    s.golf;
    s.matchs;
    currentweatherservice.currentWthr("/sports.json", null, null, function (res) {
        s.football = res.football
        s.cricket = res.cricket;
        s.golf = res.golf;
        s.matchs = {
            football: s.football,
            cricket: s.cricket,
            golf: s.golf
        }
        console.log(s.matchs);

    })


}])



app.controller("factscntrlr", ["$scope", "currentweatherservice", function (s, currentweatherservice) {
    s.factslist;
    currentweatherservice.uniqueFacts(function (res) {
        // console.log(res[0].fact)
        s.factslist = res;
    })
}])

