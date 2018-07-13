var weatherResponse=document.querySelector('.weatherResponse');
var getWeather=document.querySelector('#getWeather');
var city=document.querySelector(".city");
var list=document.querySelector(".list");
var predictionWindow=document.querySelectorAll(".predictionWindow");
var listGroupItem;

var resp,innerHtml,theUrl,xmlHttp,inputCity,inputCityLength,i,j;
//location names
var locationNames=["London","San Francisco","New York","Sydney","Philadelphia","Manchester","Houston","Birmingham","Los Angeles","Berlin","Chicago","Tokyo","Beijing","Mexico City","Osaka","Bristol","Mumbai","Glasgow","Amsterdam","Johannesburg","Rio de Janeiro","Shanghai","New Delhi","Jakarta","Seoul","São Paulo","Moscow","Hong Kong","San Diego","San Jose","Dallas","Indianapolis","San Antonio","Montréal","Jacksonville","Austin","Kiev","Phoenix","Madrid","Toronto","Fort Worth","Guangzhou","Columbus","Memphis","Washington DC","Paris","Munich","Brisbane","Rome","Milwaukee","Bradford","Liverpool","Wakefield","Istanbul","El Paso","Seattle","Baltimore","Las Vegas","Melbourne","Buenos Aires","Boston","Nashville","Edinburgh","Perth","Karachi","Hamburg","Dubai","Leeds","Sheffield","Adelaide","Charlotte","Detroit","Louisville","Barcelona","Denver","Portland","Oklahoma City","Cardiff","Kolkata","Cairo","Virginia Beach","Kinshasa","Honolulu","Tehrān","Colorado Springs","Auckland","Dongguan","Sacramento","Kansas City","Fresno","Bangkok","Ho Chi Minh City","Mesa","Atlanta","Bangalore","Lima","Albuquerque","Tucson","Lagos","Long Beach","Shenzhen","Bogotá","Omaha","Raleigh","Miami","Exeter","Hà Nội","Casablanca","Singapore","Yokohama","Nairobi","Tianjin","Dhaka","Pyongyang","Addis Ababa","Hyderabad","Santa Cruz","Dublin","Budapest","Milan","Cambridge","Oxford","Vienna","Brussels","Cologne","Riyadh","Damascus","Ankara","Little Rock","Wilmington","Santiago","Birmingham","Baghdad","Boise","Anchorage","Athens","Santorini","Reykjavík","Sofia","Prague","Zagreb","Oslo","Copenhagen","Bucharest","Torino","Stockholm","Naples","Warsaw","Bridgeport","Wichita","Richmond","New Orleans","Calgary","Edmonton","St Petersburg","Manila","Vancouver","Maracaibo","Caracas","Cheyenne","Charleston","Santander","İzmir","Toulouse","Bordeaux","Wuhan","Marseille","Lille","Ahmedabad","Lyon","Nice","Lahore","Belfast","Bremen","Stoke-on-Trent","Fargo","Sendai","Truro","Preston","Sunderland","Lisbon","Phuket","Palm Springs","Leicester","Stuttgart","Coventry","Gothenburg","Hanover","St. Louis","Salvador","Plymouth","Lake Tahoe","Nuremberg","Mountain View","Kawasaki","Kyoto","Kobe","Hangzhou","Blackpool","Yangon","Bakersfield","Salt Lake City","Geneva","Portland","Reading","Durban","Saitama","Brighton","Dresden","Ajaccio","Pune","Mombasa","Providence","Chennai","Kharkiv","Helsinki","Taipei","Essen","St Ives","Aberdeen","Oakland","Sapporo","Ipswich","Norwich","Christchurch","Surat","Busan","Manchester","Hiroshima","Northampton","Leipzig","Southend-on-Sea","The Hague","Minsk","Salford","Kirkwall","Swansea","Penzance","Ibadan","Billings","Alexandria","Newcastle","Jackson","Sioux Falls","Nagoya","Swindon","Brasília","Dundee","Kano","Kitakyushu","Denpasar","Boulder","Minneapolis","Frankfurt","Falmouth","Middlesbrough","Rhyl","Bournemouth","Fukuoka","Newark","Manukau","Luton","Wellington","Abidjan","Kingston upon Hull","Des Moines","Windhoek","Calvi","Venice","Santa Cruz de Tenerife","Chengdu","York","Kuala Lumpur","Portsmouth","Burlington","Santa Fe","Zurich","Nottingham","Derby","Huddersfield","Dortmund","Wolverhampton","Cape Town","Düsseldorf","Columbia"]
var locationNamesLength=locationNames.length;

//auto focus on input
city.focus();

//keydown listener on input
city.addEventListener('keydown',function(event){
  //timeout for input to read latest value
  window.setTimeout(function(){
    list.innerHTML='<ul class="list-group">';
    inputCity=city.value;
    inputCityLength=inputCity.length;
    //matching input with city names
    if(inputCityLength){
      j=0;
      for(i=0;i<locationNamesLength;i++){
        if(j>20)break;
        if(locationNames[i].slice(0,inputCityLength).toLowerCase()==inputCity.toLowerCase()){
          list.innerHTML+='<li class="list-group-item">'+locationNames[i]+'</li>';  //adding city to list
          j++;
        }
      }
    }
    list.innerHTML+='</ul>';
    //mouse events on list
    listGroupItem=document.querySelectorAll('.list-group-item');
    for(i=0;i<listGroupItem.length;i++){
      listGroupItem[i].addEventListener('mouseenter',function(event){
        // for(j=0;j<listGroupItem.length;j++)
        //   listGroupItem[j].classList.remove('bg1');
        this.className+=' bg1';
        this.addEventListener('click',function(event){ //on clicking any list value
          city.value=this.innerHTML;
          list.innerHTML='';
          window.setTimeout(function(){
            getWeather.click(); //click button
          },10);
        });
      });
      listGroupItem[i].addEventListener('mouseleave',function(event){
        this.classList.remove('bg1');
      });
    }
  },1);
});

//click listener on button
getWeather.addEventListener('click',function(event){
  list.innerHTML='';
  window.setTimeout(function(){
    resp=getXhr();
    console.log(resp);    
    resp=JSON.parse(resp);
    weatherResponse.innerHTML='<h3>Weather of '+resp['title']+'</h3>';
    for(var i=0;i<6;i++){
      innerHtml='Weather for = '+resp['consolidated_weather'][i]['applicable_date']+
      '<br>Max Temperature = '+Math.round(resp['consolidated_weather'][i]['max_temp'])+
      '°C<br>Min Temperature = '+Math.round(resp['consolidated_weather'][i]['min_temp'])+
      '°C<br>State = '+resp['consolidated_weather'][i]['weather_state_name'];
      predictionWindow[i].innerHTML=innerHtml;
    }
  },5);
});
//function interacting with server
function getXhr(){
  theUrl='http://localhost:3001/'+city.value;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl,false);
  xmlHttp.send( null );
  return(xmlHttp.responseText);
}