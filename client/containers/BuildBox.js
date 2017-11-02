import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../store/categories';
import Modal from 'react-modal';
import {
  ProductList,
  CategoryList,
  NextSidebar,
  PrevSidebar,
} from '../components';
import { getCopyOfTempShoppingCart, completeBox } from '../shoppingCart';
import history from '../history'


//BUILD BOX CONTAINER
/**
 * BUILD BOX CONTAINER
 *
 * displays category list: <CategoryList />
 * displays product list corresponding to selected category: <ProductList />
 *
 * mapSTP: Fetches categories array from store
 * mapDTP: brings in thunk that populates category list in DB
 *
 */


 //TESTING:
 const customModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    lineHeight: '1.6',
    fontWeight: '400',
    fontFamily: 'sans-serif'
  }
};


export class BuildBox extends Component {
  constructor(props) {
    super(props)
    this.completeBox = this.completeBox.bind(this)

    this.state = {
      seeModal: false,
      modalIsOpen: false  //test
    }

    //TESTING:
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount () {
    // fetch categories from DB
    this.props.fetchCategories();
  }

  completeBox (redirectTo) {
    // this.setState({seeModal: true});
    // IN BTWN
    const tempCart = getCopyOfTempShoppingCart();
    const current = localStorage.getItem('currentBoxId')
    if (tempCart[current]) {
      completeBox()
      if (redirectTo === 'toHome') {
        history.push('/');
      } else if (redirectTo === 'toCart') {
        history.push('/cart');
      }
    } else {
      alert('Cannot complete box without a box product selected')
    }
  }


    //TEST:
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render () {

    const currentCategory = this.props.location.pathname.slice(10)
    const categoryTitles = this.props.categories.map(cat => cat.title)
    const nextCategory = categoryTitles[categoryTitles.indexOf(currentCategory) + 1]
    const prevCategory = categoryTitles[categoryTitles.indexOf(currentCategory) - 1]

    return (
      <div id="buildboxPage">
        <CategoryList current={currentCategory} categories={this.props.categories} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customModalStyle}
        >
          <div>Add Box to Cart and...</div>
            <button onClick={() => this.completeBox('toHome')}>Continue Shopping</button>
            <button onClick={() => this.completeBox('toCart')}>Go to Cart</button>
            <button onClick={this.closeModal}>Oops.. Back to Box</button>
        </Modal>
        <button onClick={this.openModal}>Add Completed Box to Cart</button>
        <div className="btnGroup">
          {prevCategory &&
            <PrevSidebar prevCategory={prevCategory} />
          }
          {nextCategory &&
            <NextSidebar nextCategory={nextCategory} />
          }
        </div>
        <ProductList categories={this.props.categories} />
        <div className="btnGroup">
          {prevCategory &&
            <PrevSidebar prevCategory={prevCategory} />
          }
          {nextCategory &&
            <NextSidebar nextCategory={nextCategory} />
          }
        </div>
        <button onClick={this.openModal}>Add Completed Box to Cart</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
  }
}

export default connect(
  mapStateToProps,
  {fetchCategories}
)(BuildBox);
