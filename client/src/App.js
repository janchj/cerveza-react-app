import logo from './logo.svg';
import './App.css';

import Moment from 'moment';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider, createNetworkInterface } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj6f4rv8y5oxi01210kglu67o',
  }),
});

const brewList = ({ data: { loading, error, allBrews }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <div>
     { allBrews.map(brew => brew.tempReadingses.map(tempReadings => 
        <div key={tempReadings.id}>{Moment(tempReadings.createdAt).format('DD/MM/YYYY hh:mm:ss')} {tempReadings.temp + ' C'} </div> )) }
   </div>;
 };

 const brewListQuery = gql`
   query {
    allBrews {
      id,
      name,
      tempReadingses (orderBy: createdAt_DESC){
        id,
        createdAt,
        temp
      }
    }
  }
 `;

const ChannelsListWithData = graphql(brewListQuery)(brewList);

class App extends Component {
   render() {
     return (
       <ApolloProvider client={client}>
         <div className="App">
           <div className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <h2>Welcome to Apollo</h2>
           </div>
           <ChannelsListWithData />
         </div>
       </ApolloProvider>
     );
   }
 }

export default App;
