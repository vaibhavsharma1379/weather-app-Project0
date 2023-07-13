app.service("loginService",["$http",function(h){
    this.loginUser=function(ulogin){
        h({
            method:"GET",
            url:" http://localhost:3000/users"
        }).then(function(response){
            ulogin(response.data);
        },function(e){
            console.log(e.data.error.message)
        })
    }
}])

app.service("rgtrService",["$http",function(h){
    this.checkUserPresence=function(checkUser){
        h({
           method:"GET",
           url:"http://localhost:3000/users" 
        }).then(function(res){
                checkUser(res.data);
        },function(e){
            console.log(e);
            alert(e.data.error.message);
        })
    }
    this.ragisterUser=function(user){
        console.log(user);
        h({
            method:"POST",
            url:"http://localhost:3000/users",
            data:user
        }).then(function(response){
            console.log(response);
            alert(`${response.data.email} is Ragistered`);
        },function(e){
            alert(e.data.error.message)
            console.log(e);
        })
    }
}])

app.service("currentweatherservice", ["$http", function (h) {
    var base_url = `http://api.weatherapi.com/v1`;
  var api_key = "93521c6e22c244cbbe944012230807";
  var factsApiBaseUrl = `https://api.api-ninjas.com/v1`;
  var factsApiKey = "yiT8fq31WUwYkk1Q7j+RsQ==auUCm2ZHCKxOvt5E"; // Replace with your own API key
  
  this.uniqueFacts = function(cb) {
    h({
      method: "GET",
      url: `${factsApiBaseUrl}/facts?limit=10`,
      headers: {
        'X-Api-Key': factsApiKey
      }
    }).then(function(res) {
      cb(res.data);
    }, function(e) {
        alert(e.data.error.message)
      console.log(e);
    });
  }

    this.currentWthr = function (datatype,cityName,date,cb) {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude =position.coords.latitude;
                var longitude =position.coords.longitude;
                var searchpara=`${latitude},${longitude}`
                console.log(latitude, longitude);
                h({
                    method: "GET",
                    url: `${base_url}${datatype}?key=${api_key}&q=${cityName!==null?cityName:searchpara}&dt=${date}`
                }).then(function (res) {
                    cb(res.data);
                }, function (e) {
                    alert(e.data.error.message);
                    console.log(e);
                })
            });
        }

        
    }
}])