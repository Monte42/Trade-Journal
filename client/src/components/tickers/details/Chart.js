import React from "react";

import {
    VictoryCandlestick,
    VictoryChart,
    VictoryAxis,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryTheme
} from "victory";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Triggered by onZoomDomainChange and
    // alters VictoryBrushContainer brushDomain prop
    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    // Triggered by onBrushDomainChange and
    // alters VictoryZoomContainer zoomDomain prop
    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {
        const {chartData} = this.props
        return (
        <div>
            <VictoryChart
                theme={VictoryTheme.material}
                width={window.innerWidth}
                height={350}
                containerComponent={
                    <VictoryZoomContainer
                    responsive={true}
                    zoomDimension="x"
                    zoomDomain={this.state.zoomDomain}
                    allowZoom={true}
                    onZoomDomainChange={this.handleZoom.bind(this)}
                />
            }
            >
            <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                candleWidth={10}
                data={chartData}
                />
            </VictoryChart>

            <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={window.innerWidth}
            height={90}
            containerComponent={
                <VictoryBrushContainer
                responsive={true}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
                />
            }
            >
            <VictoryAxis crossAxis tickFormat={(t) => `${new Date(t).getMonth()+1}/${new Date(t).getDate()}`}/>
            <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                candleWidth={15}
                data={chartData}
                />
            </VictoryChart>
        </div>
        );
    }
}

export default Chart;
