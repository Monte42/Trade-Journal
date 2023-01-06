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
                height={window.innerWidth*.15}
                colorScale={['#8ecae6','#219ebc','#023047','#ffb703','#fb8500']}
                innerRadius={10}
                style={{ labels: {fontSize: 9}}}
                data={diversityData}
            />
        </div>
        );
    }
}

export default Chart;
