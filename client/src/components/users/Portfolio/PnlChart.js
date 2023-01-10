import React from "react";
import {VictoryPie} from "victory";

class Chart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {pnlData} = this.props
        
        return (
        <div>
            <VictoryPie
                width={window.innerWidth*.45}
                colorScale={['red','green']}
                startAngle={90}
                endAngle={-90}
                style={{ labels: {fontSize: 16, fill:'#fff'}}}
                data={pnlData}
            />
        </div>
        );
    }
}

export default Chart;
