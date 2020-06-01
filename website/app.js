/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let apiKey = 'cc206738ef3a2bb22300bf68c4f728aa';



document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
let user_response = document.getElementById('feelings').value;
const newzip =  document.getElementById('zip').value;
getAnimal(baseURL,newzip, apiKey)
.then(function(data){
  console.log(data.main.temp);
   postData('/addWeather' , {temperature:data.main.temp , user_response:user_response});
  }).then(()=>{
    updateUI();}
  );
}
const getAnimal = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+'&appid='+key);
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  const updateUI = async () => {
    const request = await fetch('/all')
    try{
      const allData = await request.json();
      let d = new Date();
      let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
      document.getElementById('temp').innerHTML = `The temperature is ${(allData.temperature - 273).toPrecision(2)} C`;
      document.getElementById('content').innerHTML = "You feel like that " +  allData.user_response;
      document.getElementById('date').innerHTML = d;
  
    }catch(error){
      console.log("error", error);
    }
  }