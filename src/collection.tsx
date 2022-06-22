import React from 'react';
import { Game } from './game';
import * as $ from "jquery";
import * as Interfaces from "./shared/interfaces";

export class Collection extends React.Component<Interfaces.CollectionProps, Interfaces.CollectionState>{
  constructor(props: Interfaces.CollectionProps) {
      super(props);
      this.state = {
        collection: []
      };
    }
  
  componentDidMount() {
    this.GetCollection();
  }
  
  GetCollection() {
    let url = this.props.url;
    let token = this.props.authorizationToken;
    $.ajax({
      beforeSend: function(request) {
          request.setRequestHeader("Authorization", token);
      },
      dataType: "JSON",
      url: url,
      success: function(data) {
          console.log(data);
      }
    }).then((results) => this.setState({ collection: results }));
  }
  
  render() {
    const collection = this.state.collection.map((game: Interfaces.IGame, i: number) => (
      <Game gameProps={game} />
    ));
    return (
      <div id="collection-content" className="layout-content-wrapper">
        <div>{ collection }</div>
      </div>
    );
  }
}