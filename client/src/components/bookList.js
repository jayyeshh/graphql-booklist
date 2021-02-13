import React from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

const BookList = (props)=>{
    const res=useQuery(getBooksQuery, {
        variables: {
            offset: 0,
            limit: 2
        }
    });
    if(res.loading){
        return <h4>loading...</h4>
    }
    return res.data.books.map(book=>{
        return <li onClick={()=> props.history.push('/book/'+book.id)} key={book.id}>{book.title}</li>
    })
}

export default withRouter(BookList);