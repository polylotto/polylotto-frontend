import { Promise } from "bluebird";
import randomNumber from "random-number-csprng";

export const generateRandomTickets = (_numOfTickets: number) => {
  const tickets: number[] = []
  for (let i = 0; i < _numOfTickets; i++) {
    Promise.try(function () {
      return randomNumber(10000, 99999);
    }).then(function (number) {
      if (tickets.includes(number)) {
        return
      }
      tickets.push(number);
    })
  }
  return tickets;
}