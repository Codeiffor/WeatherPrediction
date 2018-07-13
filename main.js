var weatherResponse=document.querySelector('.weatherResponse');
var getWeather=document.querySelector('#getWeather');
var city=document.querySelector(".city");
var list=document.querySelector(".list");
var predictionWindow=document.querySelectorAll(".predictionWindow");

var resp,innerHtml,theUrl,xmlHttp,inputCity,inputCityLength,i,j;

var locationNames=["London","San Francisco","New York","Sydney","Philadelphia","Manchester","Houston","Birmingham","Los Angeles","Berlin","Chicago","Tokyo","Beijing","Mexico City","Osaka","Bristol","Mumbai","Glasgow","Amsterdam","Johannesburg","Rio de Janeiro","Shanghai","New Delhi","Jakarta","Seoul","São Paulo","Moscow","Hong Kong","San Diego","San Jose","Dallas","Indianapolis","San Antonio","Montréal","Jacksonville","Austin","Kiev","Phoenix","Madrid","Toronto","Fort Worth","Guangzhou","Columbus","Memphis","Washington DC","Paris","Munich","Brisbane","Rome","Milwaukee","Bradford","Liverpool","Wakefield","Istanbul","El Paso","Seattle","Baltimore","Las Vegas","Melbourne","Buenos Aires","Boston","Nashville","Edinburgh","Perth","Karachi","Hamburg","Dubai","Leeds","Sheffield","Adelaide","Charlotte","Detroit","Louisville","Barcelona","Denver","Portland","Oklahoma City","Cardiff","Kolkata","Cairo","Virginia Beach","Kinshasa","Honolulu","Tehrān","Colorado Springs","Auckland","Dongguan","Sacramento","Kansas City","Fresno","Bangkok","Ho Chi Minh City","Mesa","Atlanta","Bangalore","Lima","Albuquerque","Tucson","Lagos","Long Beach","Shenzhen","Bogotá","Omaha","Raleigh","Miami","Exeter","Hà Nội","Casablanca","Singapore","Yokohama","Nairobi","Tianjin","Dhaka","Pyongyang","Addis Ababa","Hyderabad","Santa Cruz","Dublin","Budapest","Milan","Cambridge","Oxford","Vienna","Brussels","Cologne","Riyadh","Damascus","Ankara","Little Rock","Wilmington","Santiago","Birmingham","Baghdad","Boise","Anchorage","Athens","Santorini","Reykjavík","Sofia","Prague","Zagreb","Oslo","Copenhagen","Bucharest","Torino","Stockholm","Naples","Warsaw","Bridgeport","Wichita","Richmond","New Orleans","Calgary","Edmonton","St Petersburg","Manila","Vancouver","Maracaibo","Caracas","Cheyenne","Charleston","Santander","İzmir","Toulouse","Bordeaux","Wuhan","Marseille","Lille","Ahmedabad","Lyon","Nice","Lahore","Belfast","Bremen","Stoke-on-Trent","Fargo","Sendai","Truro","Preston","Sunderland","Lisbon","Phuket","Palm Springs","Leicester","Stuttgart","Coventry","Gothenburg","Hanover","St. Louis","Salvador","Plymouth","Lake Tahoe","Nuremberg","Mountain View","Kawasaki","Kyoto","Kobe","Hangzhou","Blackpool","Yangon","Bakersfield","Salt Lake City","Geneva","Portland","Reading","Durban","Saitama","Brighton","Dresden","Ajaccio","Pune","Mombasa","Providence","Chennai","Kharkiv","Helsinki","Taipei","Essen","St Ives","Aberdeen","Oakland","Sapporo","Ipswich","Norwich","Christchurch","Surat","Busan","Manchester","Hiroshima","Northampton","Leipzig","Southend-on-Sea","The Hague","Minsk","Salford","Kirkwall","Swansea","Penzance","Ibadan","Billings","Alexandria","Newcastle","Jackson","Sioux Falls","Nagoya","Swindon","Brasília","Dundee","Kano","Kitakyushu","Denpasar","Boulder","Minneapolis","Frankfurt","Falmouth","Middlesbrough","Rhyl","Bournemouth","Fukuoka","Newark","Manukau","Luton","Wellington","Abidjan","Kingston upon Hull","Des Moines","Windhoek","Calvi","Venice","Santa Cruz de Tenerife","Chengdu","York","Kuala Lumpur","Portsmouth","Burlington","Santa Fe","Zurich","Nottingham","Derby","Huddersfield","Dortmund","Wolverhampton","Cape Town","Düsseldorf","Columbia"]
var locationNamesLength=locationNames.length;
city.addEventListener('dblclick',function(event){
  list.removeAttribute('hidden');
});

city.addEventListener('keydown',function(event){
  window.setTimeout(function(){
    list.innerHTML='<ul class="list-group">';
    inputCity=city.value;
    inputCityLength=inputCity.length;
    if(inputCityLength){
      j=0;
      for(i=0;i<locationNamesLength;i++){
        if(j>12)break;
        if(locationNames[i].slice(0,inputCityLength).toLowerCase()==inputCity.toLowerCase()){
          list.innerHTML+='<li class="list-group-item">'+locationNames[i]+'</li>';
          j++;
        }
      }
    }
    list.innerHTML+='</ul>';
  },1);
});

getWeather.addEventListener('click',function(event){
  list.innerHTML='<ul class="list-group"></ul';
  window.setTimeout(function(){
    resp=getXhr();
    resp=JSON.parse(resp);
    weatherResponse.innerHTML='<h3>Weather of '+resp['title']+'</h3>';
    for(var i=0;i<6;i++){
      innerHtml='<p>Weather for = '+resp['consolidated_weather'][i]['applicable_date']+
      '</p><p>Max Temperature = '+Math.round(resp['consolidated_weather'][i]['max_temp'])+
      '°C</p><p>Min Temperature = '+Math.round(resp['consolidated_weather'][i]['min_temp'])+
      '°C</p><p>State = '+resp['consolidated_weather'][i]['weather_state_name']+'</p>';
      predictionWindow[i].innerHTML=innerHtml;
    }
  },5);
});
function getXhr(){
  theUrl='http://localhost:3001/'+city.value;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl,false);
  xmlHttp.send( null );
  return(xmlHttp.responseText);
}