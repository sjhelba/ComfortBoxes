import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../store/categories';
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


export class BuildBox extends Component {
  constructor(props) {
    super(props)
    this.completeBox = this.completeBox.bind(this)
  }

  componentDidMount () {
    // fetch categories from DB
    this.props.fetchCategories();
  }

  completeBox (redirectTo) {
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

  
  render () {

    const currentCategory = this.props.location.pathname.slice(10)
    const categoryTitles = this.props.categories.map(cat => cat.title)
    const nextCategory = categoryTitles[categoryTitles.indexOf(currentCategory) + 1]
    const prevCategory = categoryTitles[categoryTitles.indexOf(currentCategory) - 1]

    return (
      <div id='buildboxPage'>
        <CategoryList categories={this.props.categories} />
        {prevCategory &&
          <PrevSidebar prevCategory={prevCategory} />
        }
        <button onClick={() => this.completeBox('toHome')}>Add Box to Cart and Continue Shopping</button>
        <button onClick={() => this.completeBox('toCart')}>Add Box to Cart and Go to Cart</button>
        <ProductList categories={this.props.categories} />
        <button onClick={() => this.completeBox('toHome')}>Add Box to Cart and Continue Shopping</button>
        <button onClick={() => this.completeBox('toCart')}>Add Box to Cart and Go to Cart</button>
        {nextCategory &&
          <NextSidebar nextCategory={nextCategory} />
        }
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
