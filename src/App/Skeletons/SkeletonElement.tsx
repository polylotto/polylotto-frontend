import React from 'react';
import './Skeleton.css';

interface props {
  types: string;
}

const SkeletonElement: React.FC<props> = ({types}) => {
  const classes = `skeleton ${types}`;

  return (
    <div className={classes}></div>
  )
}

export default SkeletonElement


// import React from 'react'
// import Shimmer from './Shimmer'
// import SkeletonElement from './SkeletonElement'

// const SkeletonArticle = ({ theme }) => {
//   const themeClass = theme || 'light'

//   return (
//     <div className={`skeleton-wrapper ${themeClass}`}>
//       <div className="skeleton-article">
//         <SkeletonElement type="title" />
//         <SkeletonElement type="text" />
//         <SkeletonElement type="text" />
//         <SkeletonElement type="text" />
//       </div>
//       <Shimmer />
//     </div>
//   )
// }

// export default SkeletonArticle;