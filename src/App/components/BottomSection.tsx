import Cards from "./Cards";
import HowItWorks from "./HowItWorks";

const BottomSection = () => {
    return (
        <div className="bottom-section">
            <div className="container">
                <Cards />
            </div>
            <HowItWorks />
        </div>
    );
}

export default BottomSection;