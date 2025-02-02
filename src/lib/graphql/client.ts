import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

(window as any).client = client;

export default client;
