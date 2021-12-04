import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import { sortData } from "./components/utility";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import Graph from "./components/Graph/Graph";
import numeral from "numeral";
import NamenLogo from "./components/NamenLogo/NamenLogo";
import API from "./api";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([40.36822, 49.83856]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [loading, setLoading] = useState(false);

  const fetchAllCountries = async () => {
    setLoading(true);
    let data = await API.disease.getAllCountries();
    setCountryInfo(data);
    setLoading(false);
  };

  const getCountriesData = async () => {
    let data = await API.disease.getCountriesList();
    const countries = data.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2,
    }));
    let sortedData = sortData(data);
    setTableData(sortedData);
    setMapCountries(data);
    setCountries(countries);
  };

  useEffect(() => {
    fetchAllCountries();
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    let data =
      countryCode === "worldwide"
        ? await API.disease.getAllCountries()
        : await API.disease.getCountry(countryCode);
    setCountry(countryCode);
    setCountryInfo(data);
    setMapCenter(
      countryCode === "worldwide"
        ? [0, 0]
        : [data.countryInfo.lat, data.countryInfo.long]
    );
    setMapZoom(countryCode === "worldwide" ? 2 : 5);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <NamenLogo />
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Весь Мир</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            className="app__stat"
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            isRed
            title="Заразилось: "
            cases={numeral(countryInfo.todayCases).format("0,0")}
            total={numeral(countryInfo.cases).format("0,0")}
          />
          <InfoBox
            className="app__stat"
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Вылечилось: "
            cases={numeral(countryInfo.todayRecovered).format("0,0")}
            total={numeral(countryInfo.recovered).format("0,0")}
          />
          <InfoBox
            className="app__stat"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            isRed
            title="Умерло: "
            cases={numeral(countryInfo.todayDeaths).format("0,0")}
            total={numeral(countryInfo.deaths).format("0,0")}
          />
        </div>
        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Число заболевших в странах мира: </h3>
          <Table countries={tableData} />
          <Divider style={{ margin: "10px 0" }} />
          <h3>Новые случаи в мире за 30 дней: </h3>
          <Graph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
