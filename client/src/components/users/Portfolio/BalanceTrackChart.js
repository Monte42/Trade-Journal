import React from "react";
import {VictoryLine,VictoryChart,VictoryTheme,VictoryVoronoiContainer} from "victory";

class Chart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {balanceData} = this.props
        
        return (
        <div>
            <VictoryChart 
            theme={VictoryTheme.material}
            width={1000}
            containerComponent={
                <VictoryVoronoiContainer
                    labels={({ datum }) => `$${datum.y}`}
                />
            }
            >
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" }
                    }}
                    data={balanceData}
                />
            </VictoryChart>
        </div>
        );
    }
}

export default Chart;
