import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

const addBookMutation=gql`
  mutation($title: String!,$genre: String!,$authorId: ID!){
    addBook(title: $title,genre: $genre,authorId: $authorId){
      title
      id
    }
  }
`

const getBookQuery=gql`
  query getBookDetails($id: ID!){
    book(id: $id){
      id
      title
      genre
      author{
        id
        name
        age
        books{
          id
          title
        }
      }
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery};
