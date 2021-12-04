import React, {useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
import API from "../../api"
function Graph({casesType, ...props}) {
    const [data,setData] = useState({});
    
    const buildChartData = (data, casesType) => {
        let chartData = [];
        let lastDataPoint;
        for(let date in data.cases) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData = async() => {
            let data = await API.disease.getHistoricalByDays();
            let chartData = buildChartData(data, casesType);
            setData(chartData); 
        }
        fetchData();
    }, [casesType]);


    return (
        <div className={props.className}>
            <Line
                data={{
                    datasets: [{
                        data: data,
                        backgroundColor: "rgba(204,35,17,0.5)",
                        borderColor: "#CC3012",
                        minHeight: "200px",
                        legend: {
                            display: false,
                        },
                    }], 
                }} 
                options={{
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                }}
            />
        </div>
    )
}

export default Graph
