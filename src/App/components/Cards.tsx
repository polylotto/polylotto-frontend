import Card from "./Card"
import basic_img from "../images/basic.svg";
import investor_img from "../images/investor.svg";
import whale_img from "../images/whale.svg";


const Cards = () => {
    return (
        <div className="cards" id="play">
            <Card 
                amount = "1" 
                cardClass = "card card-1" 
                cardImgClass = "card-img-1" 
                title = "basic"
                cardImg = {basic_img}
                link = "/basic"
            />

            <Card 
                amount = "10" 
                cardClass = "card card-2" 
                cardImgClass = "card-img-2" 
                title = "Investor"
                cardImg = {investor_img}
                link = "investor"
            />

            <Card 
                amount = "100" 
                cardClass = "card card-3" 
                cardImgClass = "card-img-3" 
                title = "whale"
                cardImg = {whale_img}
                link = "/whale"
            />
        </div>
    );
}

export default Cards;


