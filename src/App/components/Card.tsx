import React from "react";

interface cardProps {
    cardClass: string;
    cardImgClass: string;
    cardImg: string;
    amount: string;
    title: string;
    link: string;
}

const Card: React.FC<cardProps> = ({
    cardClass,
    cardImgClass,
    cardImg,
    amount,
    title,
    link
}) => {
    return (
        <div className={cardClass}>
            <div className={cardImgClass}>
                <img src={cardImg} alt="basic" srcSet=""></img>
            </div>
            <p className="amount">${amount}</p>
            <p>{title}</p>
            <a href={link} className="play btn">Play</a>
        </div>
    );
}

export default Card;