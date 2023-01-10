import React from "react";
import {VictoryPie} from "victory";

class Chart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {diversityData} = this.props
        
        return (
        <div>
            <VictoryPie
                width={window.innerWidth*.6}
                colorScale={['#001219','#005f73','#0a9396','#94d2bd','#e9d8a6','#ee9b00','#219ebc','#ca6702','#bb3e03','#ae2012','#9b2226']}
                innerRadius={20}
                style={{ labels: {fontSize: 18, fill:'#fff'}, }}
                data={diversityData}
            />
        </div>
        );
    }
}

export default Chart;
