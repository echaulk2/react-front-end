export interface CollectionProps {
  authorizationToken: string;
  url: string;
}

export interface CollectionState {
  collection: [];
}

export interface GameProps {
    gameProps: IGame
}
export interface GameState {
    game: [];
}

export interface PriceMonitorDataProps {
    priceMonitorDataProps: IPriceMonitorData;
}

export interface PriceMonitorDataState {
    priceMonitorData: [];
}

export interface GamePriceDataProps {
    gamePriceDataProps: IGamePriceData;
}

export interface GamePriceDataState {
    gamePriceData: [];
}

export interface IGame {
    gameName: string;
    yearReleased: number;
    genre: string;
    console: string;
    developer: string;
    priceMonitorData?: IPriceMonitorData[];
}

export interface IPriceMonitorData {
    priceMonitorID: string;
    gameID: string;
    collectionID: string;
    userID: string;
    desiredPrice: number;
    gamePriceData: IGamePriceData;
}

export interface IGamePriceData {
    gamePriceDataID: string;
    priceMonitorID: string;
    averagePrice: string;
    desiredPrice: number;
    desiredPriceExists: boolean;
    lastChecked: Date;
    listedItemConsole: string;
    listedItemTitle: string;
    listedItemURL: string;
    lowestPrice: string;    
}