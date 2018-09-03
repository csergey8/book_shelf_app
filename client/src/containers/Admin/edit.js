import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';

class EditBook extends PureComponent {

  state = {
    formdata: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  }
  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formdata));
  }
  handleInput = (event, name) => {
    const newFormData = {...this.state.formdata};
    newFormData[name] = event.target.value;
    this.setState({
      formdata: newFormData
    })
  }

  redirectUser = () => {
    setTimeout(()=> {
      this.props.history.push('/user/user-reviews');
    }, 2000)
  }

  deletePost = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  }
  
  componentWillMount() {
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    let book = nextProps.books.book;
    this.setState({
      formdata: {
        _id: book._id,
        name: book.name,
        author: book.author,
        review: book.review,
        pages: book.pages,
        rating: book.rating,
        price: book.price
      }
    })
  }

  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }
  

  render() {
    console.log(this.props)
    return (
      <div className="rl_container article">
      {
        this.props.books.updateBook ? <div className="edit_confirm">Review Successfull Updated <Link to={`/books/${this.props.books.book._id}`}>link</Link></div>  : null
      }
      {
        this.props.books.postDeleted ? <div className="red_tag">Post Deleted {this.redirectUser()}</div> : null  
      }
          <form onSubmit={this.submitForm}>
            <h2>Edit a Review</h2>
            <div className="form_element">
              <input 
              type="text" 
              placeholder="Enter name" 
              value={this.state.formdata.name} 
              onChange={(event) => this.handleInput(event, 'name')}/>
            </div>
            <div className="form_element">
              <input 
              type="text" 
              placeholder="Enter author" 
              value={this.state.formdata.author}
              onChange={(event) => this.handleInput(event, 'author')}
              />
            </div>
            <textarea 
            value={this.state.formdata.review} 
            placeholder="Enter review" 
            onChange={(event) => this.handleInput(event, 'review')}
            />
            <div className="form_element">
              <input 
              type="number" 
              placeholder="Pages" 
              value={this.state.formdata.pages}
              onChange={(event) => this.handleInput(event, 'pages')}
              />
            </div>
            <h3>Rating</h3>
            <div className="form_element">
              <select 
              value={this.state.formdata.rating}
              onChange={(event) => this.handleInput(event, 'rating')}
              >
                <option val="1">1</option>
                <option val="2">2</option>
                <option val="3">3</option>
                <option val="4">4</option>
                <option val="5">5</option>
              </select> 
            </div>
            <div className="form_element">
              <input 
              type="number" 
              placeholder="Price" 
              value={this.state.formdata.price}
              onChange={(event) => this.handleInput(event, 'price')}
              />
            </div>
            <button type="submit">Update Review</button>
            <div className="delete_post">
              <div
                className="button"
                onClick={this.deletePost}
                >
                Delete review
              </div>
            
            </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(EditBook);
