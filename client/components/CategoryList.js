import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CategoryList component:
 *   renders Links of categories
 */
export default function CategoryList ({categories, current}) {
  let currentCategoryDescription;

  return (
    <div id="categoryListPage" className="categoryList">
      {
        categories.map((category, i) => {
          if (current && current.toLowerCase() === category.title.toLowerCase()) {
            currentCategoryDescription = category.description;
            return (
              <Link
                style={{padding: '5px', border: 'solid rgba(128, 128, 128, 0.12)', borderRadius: '10px'}}
                key={i}
                to={`/buildbox/${category.title}`}>
                {category.title}
              </Link>
            )
          } else {
            return (
              <Link
                style={{padding: '5px'}}
                key={i}
                to={`/buildbox/${category.title}`}>
                {category.title}
              </Link>
            )
          }
        })

      }
      <h3 id="categoryDescription" >{currentCategoryDescription}</h3>
    </div>
  );
}
