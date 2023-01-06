import { useState,useEffect } from "react"
import axios from "axios";
import Chart from "./Chart";
import { parseTickerChatData } from "../../../utils/getChartData";
import env from 'react-dotenv'

const TickerChart = ({chartURL}) => {
    const [chartData,setChartData] = useState([])

    useEffect(() =>{
        axios.get(`${chartURL}${env.CHART_DATA_API}`)
            .then(res=> setChartData(parseTickerChatData(res.data.results)))
            .catch(err=>console.log(err))
    },[chartURL])

    return (
        <>
            <Chart chartData={chartData} />
            <h6 className="text-center">Click and drag to zoom and scroll</h6>
        </>
    )
}

export default TickerChart