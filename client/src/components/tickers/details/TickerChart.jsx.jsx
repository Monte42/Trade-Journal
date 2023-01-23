import { useState,useEffect } from "react"
import { parseTickerChatData } from "../../../utils/getChartData";
import env from 'react-dotenv'
import Chart from "./Chart";
import axios from "axios";

const TickerChart = ({chartURL}) => {
    const [chartData,setChartData] = useState([])

    useEffect(() =>{
        axios.get(`${chartURL}${env.CHART_DATA_API}`)
            .then(res=> setChartData(parseTickerChatData(res.data.results)))
            .catch(err=>console.log(err))
    },[chartURL])

    return (
        <div style={{backgroundColor:'#aaa',borderRadius:'5px',boxShadow:'5px 5px 5px #333',marginBottom:'20px'}}>
            <Chart chartData={chartData} />
            <h6 className="text-center">Click and drag to zoom and scroll</h6>
        </div>
    )
}

export default TickerChart