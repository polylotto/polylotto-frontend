import React from 'react'
import "../css/howitworks.css"
import step from "../images/step.png"
import one from "../images/1.svg"
import two from "../images/2.svg"
import three from "../images/3.svg"

export default function HowItWorks() {
  return (
    <div className='how_it_works'>
        <h2>How It Works</h2>
        <p>PolyLotto is the best way to play these exciting lotteries from anywhere in the world.</p>
        <div className="steps">
            <div className='step'>
                <div className="step-img" data-step="01">
                    <img src={one} alt="" />
                </div>
                <h3>Choose</h3>
                <p>Choose your lottery</p>
            </div>
            <div className='step'>
                <div className="step-img" data-step="02">
                    <img src={two} alt="" />
                </div>
                <h3>Buy</h3>
                <p>Complete your purchase</p>
            </div>
            <div className='step'>
                <div className="step-img" data-step="03">
                    <img src={three} alt="" />
                </div>
                <h3>Win</h3>
                <p>Start dreaming, you're almost there</p>
            </div>
            <div>
                <img src={step} alt="step" />
            </div>
        </div>
    </div>
  )
}
