import  { gql }  from '@apollo/client';

export  const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!, $username: String!) {
        addUser(email: $email, password: $password, username: $username) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($book: bookInput!) {
        saveBook(book: $book) {
            _id
            username
            email  
            savedBooks {    
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email  
            bookCount 
            savedBooks {    
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;



