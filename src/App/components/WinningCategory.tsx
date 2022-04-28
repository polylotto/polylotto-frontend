import React from 'react'
import { useRaffleContext } from '../../context/raffle'

interface props {
    estimatedPayouts: string[];
}

const WinningCategory: React.FC<props> = ({estimatedPayouts}) => {
  return (
    <div>
        <div className="winning-category">
            <div className="winner1">
                <p className="winner-head">First Lucky Winner</p>
                <p className="winner-amount">{estimatedPayouts[0]? estimatedPayouts[0] : 0} USDC</p>
                {/* <small>~$4000</small> */}
            </div>
            <div className="winner2">
                <p className="winner-head">Second Lucky Winner</p>
                <p className="winner-amount">{estimatedPayouts[1]? estimatedPayouts[1] : 0} USDC</p>
                {/* <small>~$7211</small> */}
            </div>
            <div className="winner3">
                <p className="winner-head">Third Lucky Winner</p>
                <p className="winner-amount"> {estimatedPayouts[2]? estimatedPayouts[2] : 0} USDC</p>
                {/* <small>~$12000</small> */}
            </div>
        </div>
    </div>
  )
}

export default WinningCategory;