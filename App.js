import { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sortType: "asc",
        ListNum: "",
        TodoLists: TodoData
      };
    }
  
    render() {
      return (
        <Nav
          lists1={this.state.TodoLists.TodoList1}
          lists2={this.state.TodoLists.TodoList2}
          sortType={this.state.sortType}
          listNum={this.state.listNum}
        />
      );
    }
  }
  

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location:
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={submitHandler}
          >
            Search
          </button>
        </div>
      </div>
      <div className="card mt-3 mx-auto">
        {apiData.main ? (
          <div className="card-body text-center">
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />
            <p className="h2">{kelvinToFarenheit(apiData.main.temp)}&deg;F</p>
            <p className="h5">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="fas fa-1x mr-2 text-dark"
              />
              <strong>{apiData.name}</strong>
            </p>
            <div className="row mt-4">
              <div className="col-md-6">
                <p>
                  <FontAwesomeIcon
                    icon={faTemperatureLow}
                    className="fas fa-1x mr-2 text-primary"
                  />
                  <strong>{kelvinToFarenheit(apiData.main.temp_min)}&deg;F</strong>
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faTemperatureHigh}
                    className="fas fa-1x mr-2 text-danger"
                  />
                  <strong>{kelvinToFarenheit(apiData.main.temp_max)}&deg;F</strong>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>{apiData.weather[0].main}</strong>
                </p>
                <p>
                  <strong>
                    {countries.getName(apiData.sys.country, 'en', {
                      select: 'official',
                    })}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
      <footer className="footer">
        &copy; React Weather App
      </footer>
    </div>
  );
}

export default App;
