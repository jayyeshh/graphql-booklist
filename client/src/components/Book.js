import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";
import { ApolloConsumer } from '@apollo/client';

const Book = (props) => {
  const res = useQuery(getBookQuery, {
    variables: { id: props.match.params.id },
  });
  if (res.loading) return <h1>loading...</h1>;
  console.log(res);
  const {
    data: {
      book: { title, id, genre, author },
    },
  } = res;
  return (
    <div key={id}>
      <ApolloConsumer>
          {client=> console.log(client)}
      </ApolloConsumer>
      <h1>{title}</h1>
      <h3>
        <span>Genre: </span>
        {genre}
      </h3>
      <h3>
        <span>Author: </span>
        {author.name}
      </h3>
      <div>
        <div>Other books by author:</div>
        {author.books.map((b) => {
          return <h3 key={b.id}>{b.title}</h3>;
        })}
      </div>
    </div>
  );
};

export default Book;
