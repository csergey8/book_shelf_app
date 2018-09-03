import axios from 'axios';


export function getBooks(limit = 10, start = 0, order = 'asc', list = '') {
  const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                  .then(response => {
                      if(list) {
                        return [...list, ...response.data]
                      } else {
                        return response.data
                      }
                  });

  return {
    type: 'GET_BOOKS',
    payload: request
  }
}
//ACTION FOR TWO RESPONSE
export function getBookWithReviewer(id) {
  const request = axios.get(`/api/getBook?id=${id}`)


  return (dispatch) => {
    request.then(({ data }) => {
      let book = data;

      axios.get(`/api/getReviewer?id=${book.ownerId}`)
        .then( ({data}) => {
          let response = {
            book,
            reviewer: data
          }
          dispatch({
            type: 'GET_BOOK_W_REVIEWER',
            payload: response
          })
        })
    });
  }
}

export function addBook(book) {
  const request = axios.post('/api/book', book)
                        .then(response => response.data);

  return {
    type: 'ADD_BOOK',
    payload: request
  }
  
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEW_BOOK',
    payload: {}
  }
}

export function getUserPosts(userId) {
  const request = axios.get(`/api/user_posts?user=${userId}`)
                        .then(response => response.data);

  return {
    type: 'GET_USER_POSTS',
    payload: request
  }
}

export function getBook(id) {
  const request = axios.get(`/api/getBook?id=${id}`)
                        .then(response => response.data);


  return {
    type: 'GET_BOOK',
    payload: request
  }
}

export function updateBook(data) {
  const request = axios.post(`/api/book_update`, data)
                        .then(response => response.data);

  return {
    type: 'UPDATE_BOOK',
    payload: request
  }
} 

export function deleteBook(id) {
  const request = axios.delete(`/api/delete_book?id=${id}`)
                        .then(response => response.data);

  return {
    type: 'DELETE_BOOK',
    payload: request
  }
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: {},
      updateBook: false,
      postDeleted: false
    }
  }
}

//CLEAR STORE FUNCTION
export function clearBookWithReviewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  }
}

///////USER REQUESTS/////////////
export function loginUser({ email, password}) {
  console.log(password)
  const request = axios.post(`/api/login`, {email, password})
                        .then(response => response.data)


  return {
    type: 'USER_LOGIN',
    payload: request
  }
} 

export function auth() {
  const request = axios.get('/api/auth')
                        .then(response => response.data)

  return {
    type: 'USER_AUTH',
    payload: request
  }
}