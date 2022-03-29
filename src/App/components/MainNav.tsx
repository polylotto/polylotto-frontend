import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import useAsync from "../../async/useAsync";
import { connectWalletMetamask } from "../../api/web3"; 
import { Button } from "semantic-ui-react";
import { useWeb3Context } from "../../context/web3";
import { useUserContext } from "../../context/user";
import NavDropDown from "./NavDropDown";

interface Props {}

const MainNav: React.FC<Props> = () =>{
    const {
        state: { account },
        updateAccount,
    } = useWeb3Context();

    const {
        state: { userConnected },
        updateConnection,
    } = useUserContext();


    const { pending, call } = useAsync(connectWalletMetamask);

    async function onClickConnect() {
        const { error, data } = await call(null);
        
        if (error) {
            console.error(error);
        }
        if(data) {
            updateAccount(data);
            updateConnection({userConnected: true});
        }
    }
    
    return (
        <>
            <ul className="main-nav">
                <li className="nav-item">
                <Link to="/">
                        {/* <img src={home} className="home"alt="home icon"/> */}
                        <FontAwesomeIcon icon={faHome as IconProp} fontSize={35} className="home"/>
                    </Link>
                </li>
                {userConnected && account? 
                    <NavDropDown/>
                    :  
                    <li>
                    <Button
                    color="green"
                    onClick={() => onClickConnect()}
                    className="btn-3"
                    disabled={pending}
                    loading={pending}
                    >
                        Connect
                    </Button>
                    {/* <a href="" className="btn-3" onClick={() => onClickConnect()}>Connect</a> */}
                </li> 
                }
            </ul>

        </>
    );
}

export default MainNav;