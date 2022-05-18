import BigNumber from 'bignumber.js';
import { ERC20_DECIMALS } from "./constants";

export function formatBigNumber(num: string | number) {
    if (!num) return 0;
    const number = new BigNumber(num).shiftedBy(-ERC20_DECIMALS);
    return number.toString()
}


export function convertTime(secs: number) {
    if (secs === 0) {
        return "--"
    }

    let dateObj = new Date(secs * 1000);

    let date = dateObj.toLocaleDateString('en-us', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    let time = dateObj.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
    return date + ', ' + time;
}
