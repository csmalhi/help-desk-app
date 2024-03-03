import { getDocs, doc, collection } from "firebase/firestore";
import { Ticket } from "@/models/ticket";

const TicketService = {
  getTickets: async function (auth: any, db: any) {
    let userId = auth.currentUser.uid;
    const q = collection(db, "users")
    const querySnapshot = await getDocs(q) 

    const tickets = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    return tickets;
  },
  getTicket: function (ticketId: string) {},
  addTicket: function (ticket: Ticket) {},
  removeTicket: function (ticketId: string) {},
  updateTicket: function (ticket: Ticket) {},
};

export default TicketService;
