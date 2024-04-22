import "./App.css";
import { useState } from "react";
function App() {
  let [city, setCity] = useState("");
  let [weatherDetails, setWeatherDetails] = useState();
  let [isLoadind, setIsLoading] = useState(false);
  let getData = (event) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f5e53c6b1f0816fa9df5e02a28d00a7&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWeatherDetails(undefined);
        } else {
          setWeatherDetails(finalRes);
        }

        setIsLoading(false);
      });
    event.preventDefault();
    setCity("");
  };
  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-center text-[40px] font-bold py-[50px] text-white">
          Weather App
        </h1>
        <form className="text-center" onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[300px] h-[40px] pl-3 outline-none"
            placeholder="City Name"
          />
          <button className="bg-[#141E46] w-[80px] h-[41px] text-white">
            Submit
          </button>
        </form>

        <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative ">
          <img
            src="https://i.stack.imgur.com/kOnzy.gif"
            width={100}
            className={`absolute left-[37%] ${isLoadind ? "" : "hidden"} `}
            alt="404"
          />
          {weatherDetails !== undefined ? (
            <>
              <h3 className="font-bold text-[30px]">
                {weatherDetails.name}{" "}
                <span className="bg-[yellow]">
                  {weatherDetails.sys.country}
                </span>
              </h3>
              <h2 className="font-bold text-[40px]">
                {weatherDetails.main.temp}
              </h2>
              <p>Visibility: {weatherDetails.visibility}</p>
              <p>Wind Speed: {weatherDetails.wind.speed}</p>
              <img
                src={`http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`}
                alt="404"
              />
              <p>{weatherDetails.weather[0].description.toUpperCase()}</p>
            </>
          ) : (
            "No Data"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
