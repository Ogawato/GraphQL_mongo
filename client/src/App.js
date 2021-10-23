import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container, Col, Row } from 'reactstrap';
import Header from './components/Header';
import MovieList from './components/MovieList';
import SideNav from './components/SideNav';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <Header />
      <ApolloProvider client={client}>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <SideNav />
            </Col>
            <Col xs={12} sm={8}>
              <MovieList />
            </Col>
          </Row>
        </Container>
      </ApolloProvider>
    </div>
  );
}

export default App;
