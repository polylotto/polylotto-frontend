import MainNav from "./MainNav";
import polyLotto from "../images/polylotto-logo-white.png"

interface Props {}

const Header: React.FC<Props> = () => {
    return(
        <header className="main-header">
            <div className="logo">
                <img alt="" src={polyLotto}/>
            </div>
            <MainNav />
        </header>
    );
}

export default Header;