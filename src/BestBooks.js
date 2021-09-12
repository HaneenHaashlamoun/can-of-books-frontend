import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
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
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length ? (
          <Carousel>
            {
              this.state.books.map(book => {
                return (
                  
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADGCAMAAAAqo6adAAAABlBMVEUAAAAORKmU5gWIAAAA3klEQVR4nO3PAQEAAAjDoNu/tEEYDdjN1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W39bf1t/W34b/H769AMf5McvaAAAAAElFTkSuQmCC"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                        <p>{book.status}</p>
                        <p>{book.email}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  
                )
              })
            }
          </Carousel>
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