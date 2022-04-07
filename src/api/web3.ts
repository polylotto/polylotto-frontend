export async function connectWalletMetamask() {
    //@ts-ignore
    const { ethereum } = window;

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    return { account: accounts[0] || "" };
}

export function subscribeToAccount(
    callback: (error: Error | null, account: string | "") => any
) {
    const id = setInterval(async () => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const check = await ethereum._metamask.isUnlocked();

            if (check) {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                callback(null, accounts[0])
            } else {
                callback(null, "locked")
            }
        } catch (e) {
            const error = e as Error;
            callback(error, "")
        }
    }, 1000);

    return () => {
        clearInterval(id);
    };
}


export function getChainID(
    callback: (error: Error | null, chainId: string | "") => any
) {
    const id = setInterval(async () => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const chainId = await ethereum.request({ method: 'eth_chainId' });
            callback(null, chainId)
        } catch (e) {
            const error = e as Error;
            callback(error, "")
        }
    }, 1000);

    return () => {
        clearInterval(id);
    };
}

export async function subscribeToChainID() {
    try {
        // @ts-ignore
        const { ethereum } = window;
        await ethereum.request({
            //137 mainnet 0x89
            //80001 0x13881
            method: "wallet_switchEthereumChain", params: [{ chainId: '0x13881' }]
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // @ts-ignore
        if (switchError.code === 4902) {
            try {
                // @ts-ignore
                const { ethereum } = window;
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x13881',
                            chainName: 'Mumbai Testnet',
                            rpcUrls: ['https://rpc-mumbai.matic.today'],
                            nativeCurrency: {
                                name: "MATIC",
                                symbol: "MATIC", // 2-6 characters long
                                decimals: 18,
                            },
                            blockExplorerUrls: ["https://mumbai.polygonscan.com"]
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
    }

}


