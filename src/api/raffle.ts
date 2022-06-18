import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import Raffle from "../utils/PolyLottoRaffle.sol/PolylottoRaffle.json";
import IERC20 from "../utils/PolyLottoRaffle.sol/IERC20.json";
import { ERC20_DECIMALS } from "../utils/constants";
import BigNumber from "bignumber.js";

const raffleContractAddress = "0x38349a22899fFd835E2237f8884D77301f324feB";
const USDCContractAddress = "0xe75613bc32e3ec430adbd46d8ddf44c2b7f82071";

const raffleContractABI = Raffle.abi as AbiItem[];
const IERC20ABI = IERC20.abi as AbiItem[];

interface Transaction {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
}
interface RaffleData {
    raffleID: number;
    noOfTicketSold: number;
    noOfPlayers: string;
    winners: string[];
    winningTickets: string[];
    winnersPayout: string[];
    raffleStartTime: string;
    raffleEndTime: string;
    amountInjected: string;
}
interface CategoryData {
    raffleCategory: number;
    rafflePool: string;
    currentRaffleState: string;
    currentRaffle: RaffleData;
    mostRecentRaffles: RaffleData[];
    userTicketsPerRaffle: string[];
}
interface GetResponse {
    contractLinkBalance: string;
    currentRaffleState: string;
    raffleCategoryData: CategoryData[];
    userTransactions: Transaction[]
}
interface CountDown {
    currentRaffleEndTime: string;
    currentRaffleRebootEndTime: string;
}

const init_raffle: RaffleData = {
    raffleID: 0,
    noOfTicketSold: 0,
    noOfPlayers: "0",
    winners: [],
    winningTickets: [],
    winnersPayout: [],
    raffleStartTime: "0",
    raffleEndTime: "0",
    amountInjected: "0"
}

export async function getRaffle(
    account: string
): Promise<GetResponse> {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    // Errror Function
    const contractLinkBalance = await raffleContract.methods.getRebootEndTime().call();
    // Get current Raffle Data and Most Recent Raffle Data
    const raffleID = await raffleContract.methods.getRaffleID().call();
    const raffleCount = Number(raffleID) + 1;
    //looping through each category
    const raffleCategoryData: CategoryData[] = [];
    for (let i = 0; i < 3; i++) {
        const raffles: RaffleData[] = [];
        for (let n = 1; n <= 3; n++) {
            const ID = raffleCount - n;
            if (ID <= 0) {
                break;
            }
            const raffle = await raffleContract.methods.getRaffle(i, ID).call();
            raffles.push({
                raffleID: raffle.ID,
                noOfTicketSold: raffle.noOfTicketSold,
                noOfPlayers: raffle.noOfPlayers,
                winners: raffle.winners,
                winningTickets: raffle.winningTickets,
                winnersPayout: raffle.winnersPayout,
                raffleStartTime: raffle.raffleStartTime,
                raffleEndTime: raffle.raffleEndTime,
                amountInjected: raffle.amountInjected
            });
        }
        const raffleData = await raffleContract.methods.getRaffleData(i).call();
        const currentRaffleState = raffleData.raffleState
        // const ticketPrice = raffleData.ticketPrice;
        const rafflePool = raffleData.rafflePool;
        const userTicketsPerRaffle = await raffleContract.methods.viewUserTickets(i, account, raffleID).call();
        raffleCategoryData.push({
            raffleCategory: i,
            rafflePool,
            currentRaffleState,
            currentRaffle: raffles[0] || init_raffle,
            mostRecentRaffles: raffles,
            userTicketsPerRaffle
        })
    }
    const _raffleState = raffleCategoryData[0].currentRaffleState || undefined;

    const currentRaffleState = _raffleState ? _raffleState.toString() : "0"

    // Get User Transaction History
    const transactionCount = await raffleContract.methods.getUserTransactionCount(account).call();
    // get 5 most recent tx
    const count = Number(transactionCount)
    const userTransactions: Transaction[] = [];
    for (let i = 1; i <= 5; i++) {
        const txIndex = count - i;
        if (txIndex < 0) {
            break;
        }
        const tx = await raffleContract.methods.getuserTransactionHistory(account, txIndex).call();
        userTransactions.push({
            txIndex: tx.txID,
            timestamp: tx.time,
            raffleCategory: tx.raffleCategory,
            noOfTickets: tx.noOfTickets
        });
    }
    return {
        contractLinkBalance: contractLinkBalance,
        currentRaffleState: currentRaffleState,
        raffleCategoryData: raffleCategoryData,
        userTransactions: userTransactions,
    };
}

export async function getCountDown(
    account: string
): Promise<CountDown> {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const currentRaffleEndTime = await raffleContract.methods.getRaffleEndTime().call();
    const currentRaffleRebootEndTime = await raffleContract.methods.getRebootEndTime().call();

    return {
        currentRaffleEndTime,
        currentRaffleRebootEndTime
    }
}

export async function buyTickets(
    account: string,
    params: {
        raffleCategory: number;
        tickets: number[];
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const { raffleCategory, tickets } = params;

    await raffleContract.methods.buyTickets(raffleCategory, tickets).send({
        from: account
    });
}

export async function approve(
    account: string,
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);

    const USDC = new web3.eth.Contract(
        IERC20ABI,
        USDCContractAddress
    );

    const amountToApprove = new BigNumber(792281625147.26).shiftedBy(ERC20_DECIMALS).toString();
    await USDC.methods.approve(raffleContractAddress, amountToApprove).send({
        from: account
    });
}

export async function checkAllowance(
    account: string,
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const USDC = new web3.eth.Contract(
        IERC20ABI,
        USDCContractAddress
    );
    const allowance = await USDC.methods.allowance(account, raffleContractAddress).call();
    const count = Number(allowance);

    if (count === 0) {
        return (false);
    } else {
        return (true);
    }
}

export async function viewRollovers(
    account: string,
    params: {
        raffleCategory: number;
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const { raffleCategory } = params;
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const rollover = await raffleContract.methods.viewUserRollovers(raffleCategory, account).call();
    return rollover;
}

export async function claimRollover(
    account: string,
    params: {
        raffleCategory: number;
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const { raffleCategory } = params;
    await raffleContract.methods.claimRollover(raffleCategory).send({
        from: account
    });
}

export async function recoverWrongTokens(
    account: string,
    params: {
        tokenAddress: string;
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);

    const { tokenAddress } = params;

    await raffleContract.methods.recoverWrongTokens(tokenAddress).send({
        from: account
    });
}

export async function injectFunds(
    account: string,
    params: {
        raffleCategory: number,
        amount: number
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const { raffleCategory, amount } = params;
    const amountToSend = new BigNumber(amount).shiftedBy(ERC20_DECIMALS).toString();
    await raffleContract.methods.injectFunds(raffleCategory, amountToSend).send({
        from: account
    });
}

export async function setInjectorAndTreasuryAddresses(
    account: string,
    params: {
        injectorAddress: string,
        treasuryAddress: string
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const { injectorAddress, treasuryAddress } = params;
    await raffleContract.methods.SetInjectorAndTreasuryAddresses(
        injectorAddress,
        treasuryAddress
    ).send({
        from: account
    });
}

export async function deactivateRaffle(
    account: string
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);

    await raffleContract.methods.deactivateRaffle().send({
        from: account
    });
}

export async function reactivateRaffle(
    account: string
) {

    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);

    await raffleContract.methods.reactivateRaffle().send({
        from: account
    });


}

export async function withdrawFundsDueToDeactivation(
    account: string,
    params: {
        raffleCategory: number
    }
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);
    const { raffleCategory } = params;

    await raffleContract.methods.withdrawFundsDueToDeactivation(raffleCategory).send({
        from: account
    })
}



//Set Events
export function subscribe(
    callback: (error: Error | null, log: Log | null) => void
) {
    //@ts-ignore
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    const raffleContract = new web3.eth.Contract(raffleContractABI, raffleContractAddress);

    const response = raffleContract.events.allEvents((error: Error, log: Log) => {
        if (error) {
            callback(error, null);
        } else if (log) {
            callback(null, log)
        }
    });

    return () => response.unsubscribe();

}

interface RaffleOpen {
    event: "RaffleOpen";
    returnValues: {
        raffleID: string;
        endTime: string;
        rebootTime: string;
        raffleState: string;
    };
}

interface TicketsPurchased {
    event: "TicketsPurchased";
    returnValues: {
        raffleCategory: string;
        raffleId: string;
        tickets: string[];
        rafflePool: string;
        winnersPayout: string[];
    }
}

interface NewUserTransaction {
    event: "NewUserTransaction";
    returnValues: {
        txIndex: number;
        timestamp: number;
        raffleCategory: number;
        noOfTickets: number;
    }
}

interface RaffleEnded {
    event: "RaffleEnded";
    returnValues: {
        raffleCategory: string;
        raffleId: string;
        raffleState: string;
    }
}

interface WinnersAwarded {
    event: "WinnersAwarded";
    returnValues: {
        raffleCategory: string;
        winners: string[];
        amount: string;
        timestamp: string;
    }
}

interface RolloverClaimed {
    event: "RolloverClaimed";
    returnValues: {
        raffleCategory: string;
        raffleId: string;
        buyer: string;
        tickets: string[];
    }
}

interface LotteryInjection {
    event: "LotteryInjection";
    returnValues: {
        raffleCategory: string;
        raffleId: string;
        injectedAddress: string;
    }
}

interface NewTreasuryAndInjectorAddresses {
    event: "NewTreasuryAndInjectorAddresses";
    returnValues: {
        treasuryAddress: string;
        injectorAddress: string;
    }
}

interface AdminTokenRecovery {
    event: "AdminTokenRecovery";
    returnValues: {
        raffleId: string;
        startTime: string;
        endTime: string;
    }
}

interface RaffleDeactivated {
    event: "RaffleDeactivated";
    returnValues: {
        raffleID: string;
        timeStamp: string;
        raffleState: string;
    }

}

interface RaffleReactivated {
    event: "RaffleReactivated";
    returnValues: {
        raffleID: string;
        timeStamp: string;
        raffleState: string;
    }
}

interface WithdrawalComplete {
    event: "WithdrawalComplete";
    returnValues: {
        raffleID: string;
        amount: string;
    }
}



type Log =
    | RaffleOpen
    | TicketsPurchased
    | NewUserTransaction
    | RaffleEnded
    | WinnersAwarded
    | RolloverClaimed
    | LotteryInjection
    | NewTreasuryAndInjectorAddresses
    | AdminTokenRecovery
    | RaffleDeactivated
    | RaffleReactivated
    | WithdrawalComplete;


//Current Code flow
// First we check for allowance,
// If false, we ask for approval,
// where we then check if the user selected infinite approval(True) or one time approval(false)
// Then we run the approval function, and ask client to pay.

// Special case, if client approves one time, setting the client allowances to that one time amount,
// But fails to pay at that certain period, we need to have a clear process, to tell client that the approved amount,
// is not enough.