import { Random } from "random-js";

export function generateRandomTickets(_numOfTickets: number) {
  const tickets = new Array(_numOfTickets);
  for (let i = 0; i < _numOfTickets; i++) {
    const random = new Random();
    tickets[i] = random.integer(10000, 99999);
  }
  return tickets;
}