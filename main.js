
var weatherResponse=document.querySelector('.weatherResponse');
var getWeather=document.querySelector('#getWeather');
var resp;
getWeather.addEventListener('click',function(event){
  var city=document.querySelector('#city').value;
  var theUrl='http://localhost:3001/'+city;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl,false);
  xmlHttp.send( null );
  resp=xmlHttp.responseText;
  // console.log(typeof resp);
  
  resp=JSON.parse(resp);
  var innerHtml='<p>Maximum Temperature = '+resp['consolidated_weather'][0]['max_temp']+
  '</p><p>Minimum Temperature = '+resp['consolidated_weather'][0]['min_temp']+
  '</p><p>Weather Prediction = '+resp['consolidated_weather'][0]['weather_state_name']+'</p>';
  weatherResponse.innerHTML=innerHtml;
});