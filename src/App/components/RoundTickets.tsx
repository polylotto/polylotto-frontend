import React, {
    Dispatch,
    SetStateAction,
} from 'react';

interface props {
    setTicketModal: Dispatch<SetStateAction<boolean>>;
    tickets: number[];
    raffleID: number
}

export const RoundTickets: React.FC<props> = ({setTicketModal, tickets, raffleID}) =>{

    const handleTicketModal = ()=>{
        setTicketModal(false)
    }
  return (
    <>
        <div className='tickets_modal'>
            <div className='round-tickets'>
                <div className="prizepot-header d-flex"><h3>Round {raffleID}</h3> <span onClick={handleTicketModal}>X</span></div>
                <div className="content">
                    <p>Your Tickets</p>
                    {/* <small>#{raffleID}</small> */}
                    {
                        tickets.length !== 0 ? 
                        tickets.map(ticket => (
                            <p key={ticket} className='num'>
                                #{ticket}
                            </p>
                        ))  
                        : <p style={{color: "black", textAlign: "center", fontSize: "2rem", marginTop: "3rem", opacity: "0.7", wordWrap: "break-word"}}>No Ticket</p>

                    }
                </div>
            </div>
        </div>
    </>
  )
}

