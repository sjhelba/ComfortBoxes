import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//Next Sidebar
/*
 * Has a link to navigate to next category
 * Dynamically determines which category 'next' link will to navigate to, based on current category
 *
*/

export default class NextSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nextCategory: this.props.categories[this.props.categories.indexOf(this.props.currentCategory) + 1]
    }
  }

  render () {

    return (
      <div id='next-sidebar'>
        <Link to={`/buildbox/{nextCategory}`}>Next</Link>
      </div>
    )
  }
}

const mapStateToProps = ({currentCategory, categories}) => ({currentCategory, categories});

export default connect(mapStateToProps, null)(NextSidebar);
