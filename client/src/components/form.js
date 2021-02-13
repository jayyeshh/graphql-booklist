import React from "react";
import "./form.css";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const Form = () => {
  const res = useQuery(getAuthorsQuery);
  const [addBook, { data }] = useMutation(addBookMutation);
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const book = e.target[0].value;
        const genre = e.target[1].value;
        const authorId = e.target[2].firstChild.getAttribute("data-id");
        addBook({
          variables: { title: book, genre, authorId },
          refetchQueries: [{ query: getBooksQuery }],
        }).then((_res)=>{
          e.target[0].value="";
          e.target[1].value="";
        });
      }}
    >
      <div>
        <label htmlFor="bookname">BookName: </label>
        <input id="bookname" />
      </div>
      <div>
        <label htmlFor="genre">Genre: </label>
        <input id="genre" />
      </div>
      <div>
        <label htmlFor="bookname">Author: </label>
        <select>
          {res.data &&
            res.data.authors.map((author) => {
              return (
                <option key={author.id} data-id={author.id} value={author.name}>
                  {author.name}
                </option>
              );
            })}
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
