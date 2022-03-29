import React from "react";

interface Props {
    display: boolean;
}

const MobileNav: React.FC<Props> = ({display})  => {
    return (
        <ul className={"mobile-nav " + display}>
            <li><a href="/">Home</a></li>
            <li><a href="/#">About</a></li>
            <li><a href="/#">Contact</a></li>
            <li><a href="/coming" className="btn">$Buy Token</a></li>
            <li><a href="/#play" className="btn">Play Now</a></li>
        </ul>
    );
}

export default MobileNav;