import polyLotto from "../images/polylotto-logo-white.png";
export const Footer = ()=>{

    return (
        <footer className="main-footer">
            <div className="container">
                <div>
                    <small>about</small>
                    <ul>
                        <li><a href="/#">contact</a></li>
                        <li><a href="/#">brand</a></li>
                        <li><a href="/#">blog</a></li>
                        <li><a href="/#">community</a></li>
                    </ul>
                </div>
                <div>
                    <small>help</small>
                    <ul>
                        <li><a href="/#">customer support</a></li>
                        <li><a href="/#">troubleshooting</a></li>
                        <li><a href="/#">guides</a></li>
                    </ul>
                </div>
                <div>
                    <small>developers</small>
                    <ul>
                        <li><a href="/#">github</a></li>
                        <li><a href="/#">documentation</a></li>
                        <li><a href="/#">audits</a></li>
                        <li><a href="/#">careers</a></li>
                    </ul>
                </div>
                <div className="logo">
                    <img alt="" src={polyLotto}/>
                </div>
            </div>
            <hr />
            <div className="container buy-token">
                <a href="/coming" className="btn-3">Buy Token &#8594;</a>
            </div>
        </footer>
    );
}