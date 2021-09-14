import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AddBook } from './AddBook';
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddModal: false,
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

    console.log(bookId)

    axios.delete(`${process.env.REACT_APP_API_URL}/books/${bookId}`).then(deleteResponse => {
      if (deleteResponse.data.deletedCount === 1) {
        const newBooks = this.state.books.filter(book => book._id !== bookId);

        this.setState({ books: newBooks });
      }
    }).catch(() => alert("something went wrong"));
  }


  handelDisplayAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  }
  componentDidMount = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/books`).then((booksResponse) => {
      this.setState({
        books: booksResponse.data,
      });
      console.log(this.state.books);
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


// class MyFavoriteBooks extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//      userData: [],

//     }

//   }

//    componentDidMount = async  () => {
//     const { user } = this.props.auth0;
//     //http://localhost:3001/books?userEmail=algourabrar@gmail.com
//     let url = `http://localhost:3001/books?userEmail=${user.email}`
//     let resData = await axios.get(url);

//     await this.setState({
//       userData: resData.data
//     })
//     console.log(this.state.userData)
//   }





//   render() {


//     return (
//       <>


//         {this.state.userData == null ?
//           <Jumbotron>
//             <h1>My Favorite Books</h1>
//             <p>
//               This is a collection of my favorite books
//             </p>
//           </Jumbotron>
//           :

//           this.state.userData.map(item => {
//             return(
//             <Card>
//               <Card.Body>Name :{item.name}</Card.Body>
//               <Card.Body>Description :{item.description}</Card.Body>
//               <Card.Body>Status : {item.status}</Card.Body>
//             </Card>
//         )  })

//         }
//       </>
//     )
//   }
// }

// export default withAuth0(MyFavoriteBooks);