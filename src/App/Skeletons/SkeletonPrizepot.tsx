import React from 'react'
import "../css/prizepot.css"
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonPrizePot = ({
}) => {
    const [active, setActive] = React.useState(false);
    const handleActive = ()=>{
        active ? setActive(false): setActive(true)
    }

    return (
    <div className=''>
        <div className="prizepot">
            <div className="prizepot-header">
                <h3>Next Draw: &#160;</h3>
                <div className='skeleton-wrapper'>
                     <SkeletonElement types="title skel" />
                    <Shimmer />
                </div>
            </div>

            <div className="prizepot-profit">
                <h2>Prize Pot</h2>
                <div className='skeleton-wrapper'>
                    <SkeletonElement types="text" />
                    <Shimmer />
                </div> 
            </div>

            <div className="your-tickets">
                <h2>Your Tickets</h2>
                <div className='skeleton-wrapper'>
                    <SkeletonElement types="text" />
                    <Shimmer />
                </div> 
            </div>
            <div className="prizes">
                <div className={active ? "prizes-active": "prizes-hidden"}>
                    <div className="winning-category">
                        <div className="winner1">
                            <p className="winner-head">First Lucky Winner</p>
                            <div className='skeleton-wrapper'>
                                <p className="winner-amount"> <SkeletonElement types="title" /> USDC</p>
                                <Shimmer />
                            </div>    
                        </div>
                        <div className="winner2">
                            <p className="winner-head">Second Lucky Winner</p>
                            <div className='skeleton-wrapper'>
                                <p className="winner-amount"> <SkeletonElement types="title" />USDC</p>
                                <Shimmer />
                            </div>  
                       </div>
                        <div className="winner3">
                            <p className="winner-head">Third Lucky Winner</p>
                            <div className='skeleton-wrapper'> 
                                <p className="winner-amount"> <SkeletonElement types="title" /> USDC</p>
                                <Shimmer />
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="details-btn" onClick={handleActive}>
                {!active ? <>
                    <span>Details</span> <span>&#9660;</span>
                </>: 
                    <>
                        <span>Hide</span> <span>&#9650;</span>
                    </>
                }
            </div>
            
        </div>
    </div>
  )
}

export default SkeletonPrizePot;
