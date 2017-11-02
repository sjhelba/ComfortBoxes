import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CategoryList component:
 *   renders Links of categories
 */
export default function CategoryList ({categories, current}) {

  return (
    <div style={{marginTop: '10px', marginBottom: '50px'}} className='categoryList'>
      {
        categories.map((category, i) => {
          if (current && current.toLowerCase() === category.title.toLowerCase()) {
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
    </div>
  );
}
