import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AddBook } from './AddBook';
import { UpdateBooks } from './UpdateBooks';
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddModal: false,
      showUpdateModal: false,
      selectedBookDataObj: {}
    }
  }
  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  ///////////////////////////////////
  handelAddModal = (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.bookName.value,
      description: e.target.bookDescription.value,
      status: e.target.bookStatus.value,
      email: e.target.email.value
    }

    axios.post(`${process.env.REACT_APP_API_URL}/books`, reqBody).then(createdBookObject => {
      this.state.books.push(createdBookObject.data);
      this.setState({ books: this.state.books });
      this.handelDisplayAddModal();
    }).catch(() => alert("Something went wrong!"));
  }
  ///////////////////////////////////////////////
  handelDeleteBook = (bookId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/books/${bookId}`).then(deleteResponse => {
      if (deleteResponse.data.deletedCount === 1) {
        const newBooks = this.state.books.filter(book => book._id !== bookId);

        this.setState({ books: newBooks });
      }
    }).catch(() => alert("something went wrong"));
  }

  // here to Update
  //////////////////////////////////////////////////////////
  handelUpdateModal = (e) => {
    e.preventDefault();    
    const reqBody = {
      title: e.target.bookName.value,
      description: e.target.bookDescription.value,
      status: e.target.bookStatus.value,
      email: e.target.email.value,
      _id: this.state.selectedBookDataObj._id
    }    
    axios.put(`${process.env.REACT_APP_API_URL}/books/${reqBody._id}`, reqBody).then(updatedBookObject => {
      const updateBookArr = this.state.books.map(book => {
        if (book._id === this.state.selectedBookDataObj._id) {
          book = updatedBookObject.data;
          return book;
        }
        return book;
      });
      this.setState({
        books: updateBookArr,
        selectedBookDataObj: {}
      })      
      this.handelDisplayUpdateModal();
    }).catch(() => alert("Something went wrong!"));
  }

  handelDisplayUpdateModal = async (bookObj) => {    
    await this.setState({
      showUpdateModal: !this.state.showUpdateModal,
      selectedBookDataObj: bookObj
    });    
    // handelUpdateModal();
  }
  //////////////////////////////////////////////////////////

  handelDisplayAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  }
  componentDidMount = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/books`).then((booksResponse) => {
      this.setState({
        books: booksResponse.data,
      });      
    })
      .catch(error => alert(error.message));
  }

  render() {/* TODO: render user's books in a Carousel */
    return (
      <>
        <Button onClick={this.handelDisplayAddModal}>
          Show Add Book Modal Form
        </Button>
        {
          this.state.showAddModal &&
          <>
            <AddBook
              show={this.state.showAddModal}
              handelAddModal={this.handelAddModal}
              handelDisplayAddModal={this.handelDisplayAddModal}
            />
          </>
        }
        {
          this.state.showUpdateModal &&
          <>
            <UpdateBooks
              show={this.state.showUpdateModal}
              handelUpdateModal={this.handelUpdateModal}
              handelDisplayUpdateModal={this.handelDisplayUpdateModal}              
              selectedBookDataObj={this.state.selectedBookDataObj}
            />
          </>
        }
        {this.state.books.length ? (
          <div>
            {
              this.state.books.map(book => {
                return (
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        <p>{book.description}</p>
                      </Card.Text>
                      <p>{book.status}</p>
                      <Card.Text>
                        <p>{book.email}</p>
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.handelDeleteBook(book._id)}>Delete Book</Button>
                      <br />
                      <Button variant="warning" onClick={() => this.handelDisplayUpdateModal(book)}>Update Book</Button>
                    </Card.Body>
                  </Card>
                )
              })
            }
          </div>
        ) : (
          <h3>book collection is empty :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;

