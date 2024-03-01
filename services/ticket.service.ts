import { getDoc, doc } from "firebase/firestore";
import { Ticket } from "@/models/ticket";

const TicketService = {
  getTickets: async function (auth: any, db: any) {
    // let userId = auth.currentUser.uid;
    // const tickets = await getDoc(doc(db, `users/${userId}/tickets/aggregate`))
    // return tickets.data()
  },
  getTicket: function (ticketId: string) {},
  addTicket: function (ticket: Ticket) {},
  removeTicket: function (ticketId: string) {},
  updateTicket: function (ticket: Ticket) {},
};

export default TicketService;
