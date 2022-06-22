import React from 'react';
import { PriceMonitorData } from './priceMonitorData';
import * as Interfaces from "./shared/interfaces";

export class Game extends React.Component<Interfaces.GameProps, Interfaces.GameState> {
    render() {
        const priceMonitors = this.props.gameProps.priceMonitorData?.map((priceMonitor: Interfaces.IPriceMonitorData, i: number) => (
            <PriceMonitorData priceMonitorDataProps={priceMonitor} />
        ));
        return (
            <div>
                <h1>Game Name: { this.props.gameProps.gameName }</h1>
                <h2>Developer: { this.props.gameProps.developer }</h2>
                <p>Year Released: { this.props.gameProps.yearReleased }</p>
                <p>Genre: { this.props.gameProps.genre }</p>
                <div>{ priceMonitors }</div>
            </div>
        )
    }
}
