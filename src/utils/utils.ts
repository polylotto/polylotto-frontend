import BigNumber from 'bignumber.js';
import { ERC20_DECIMALS } from "./constants";

export function formatBigNumber(num: string | number) {
    if (!num) return 0;
    const number = new BigNumber(num).shiftedBy(-ERC20_DECIMALS);
    return number.toString()
}