import React from 'react';
import * as Interfaces from "./shared/interfaces";

export class GamePriceData extends React.Component<Interfaces.GamePriceDataProps, Interfaces.GamePriceDataState> {
    render() {
        return (
            <div>
                <p>Average Price: { this.props.gamePriceDataProps.averagePrice }</p>
                <p>Desired Price Exists: { this.props.gamePriceDataProps.desiredPriceExists.toString() }</p>
                <p>Listed Item Console: { this.props.gamePriceDataProps.listedItemConsole }</p>
                <p>Listed Item Title: { this.props.gamePriceDataProps.listedItemTitle }</p>
                <p><a href={ this.props.gamePriceDataProps.listedItemURL } >Listed Item URL</a></p>
                <p>Lowest Price: { this.props.gamePriceDataProps.lowestPrice }</p>
            </div>
        )
    }
}