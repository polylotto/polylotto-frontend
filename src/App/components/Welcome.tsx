import card_img from "../images/cards.svg";

const WelcomeContent = () => {
    return (
        <div className="container">
            <section className="welcome-content">
                <div className="welcome">
                    <p>new crypto game</p>
                    <h2>play to win</h2>
                    <p className="text-muted">Play, Invest, Exchange and join the contest with high rewards at Poly Lotto.</p>
                    <a href="#play" className="btn">Get Started Now</a>
                </div>
                <div className="welcome-img">
                    <img src={card_img} alt="game-img" srcSet=""></img>
                </div>
            </section>
        </div>
    )
}

export default WelcomeContent;