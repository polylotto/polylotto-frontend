import React from "react";
import "../css/prizepot.css";
import "../css/finishedRounds.css";
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'


const SkeletonPrevRounds = ({
})=> {

	const [active, setActive] = React.useState(false);
	const handleActive = () => {
		active ? setActive(false) : setActive(true);
	};

	return (
		<div className="">
			<div className="prizepot">
				<div className="finished-rounds_header">
					<div className="rounds">
						<h3 style={{ display: "flex", alignItems: "center" }}>
							Round 
                            <div className='skeleton-wrapper rounds'>
                                <SkeletonElement types="title skel" />
                                <Shimmer />
                            </div>  
						</h3>
						<div className="rounds-nav">
							<span className="prev">&#8592;</span>
							<span className="next">&#8594;</span>
						</div>
					</div>
                    <div>
                        <h4 style={{ display: "flex", alignItems: "center" }}>
							Drawn  
                            <div className='skeleton-wrapper'>
                                <SkeletonElement types="title skel" />
                                <Shimmer />
                            </div>  
						</h4>
                    </div>

				</div>
				<hr style={{ opacity: 0.2, margin: 0 }} />
				<div className="winning-numbers">
                    <div className='skeleton-wrapper'>
                        <SkeletonElement types="rounds"/>
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
					{!active ? (
						<>
							<span>Details</span> <span>&#9660;</span>
						</>
					) : (
						<>
							<span>Hide</span> <span>&#9650;</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SkeletonPrevRounds;
