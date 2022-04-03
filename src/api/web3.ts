// import detectEthereumProvider from '@metamask/detect-provider';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function connectWalletMetamask() {
    //@ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
        toast.warn("Make sure you have MetaMask Connected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return
    }
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    // await ethereum.request({ 
    //     //137 mainnet 0x89
    //     //80001 0x13881
    //     method: "wallet_switchEthereumChain", params:[{chainId: '0x13881'}]
    // });

    // await ethereum.enable();
    // const accounts = await web3.eth.getAccounts();

    return { account: accounts[0] || "" };
}

export function subscribeToAccount(
    callback: (error: Error | null, account: string | "") => any
) {
    const id = setInterval(async () => {
        try {
            // @ts-ignore
            const { ethereum } = window;
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            callback(null, accounts[0])
        } catch (e) {
            const error = e as Error;
            callback(error, "")
        }
    }, 1000);

    return () => {
        clearInterval(id);
    };
}


