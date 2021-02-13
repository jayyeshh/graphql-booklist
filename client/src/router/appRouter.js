import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import Book from "../components/Book";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const appRouter = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={App} exact />
        <Route path="/book/:id" component={Book} exact />
      </Router>
    </ApolloProvider>
  );
};

export default appRouter;
