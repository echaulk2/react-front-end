import React from 'react';
import * as Interfaces from "./shared/interfaces";
import { GamePriceData } from './gamePriceData';

export class PriceMonitorData extends React.Component<Interfaces.PriceMonitorDataProps, Interfaces.PriceMonitorDataState> {
    render() {
        return (
            <div>
                <h3>Price Monitor</h3>
                <p>{ this.props.priceMonitorDataProps.desiredPrice }</p>
                <GamePriceData gamePriceDataProps={this.props.priceMonitorDataProps.gamePriceData} />
            </div>
        )
    }
}