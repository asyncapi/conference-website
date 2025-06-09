import Button from '../Buttons/button';

export function TicketCard({ ticket, style, isEnded }): JSX.Element {
  return (
    <div
      className="absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out"
      //   style={{
      //     transform,
      //     opacity,
      //     zIndex,
      //   }}
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {ticket.type}
              </h3>
              <p className="text-gray-500 mt-1">{ticket.description}</p>
            </div>
            <div className="px-2 py-1 rounded-full text-sm font-medium text-gradient">
              {isEnded ? 'Ended' : ticket.status}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">
              ${ticket.price}
            </span>
            <span className="text-gray-500 ml-2">/person</span>
          </div>

          <ul className="mt-6 space-y-2">
            {ticket.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center text-gray-600">
                <Ticket className="h-4 w-4 mr-2 text-blue-500" />
                {benefit}
              </li>
            ))}
          </ul>

          {ticket.url && !isEnded ? (
            <a href={ticket.url} target="_blank" rel="noreferrer">
              <Button type="button" className="mt-8 w-full">
                Get a Ticket
              </Button>
            </a>
          ) : (
            <Button
              type="button"
              disabled={true}
              overlay={true}
              className="mt-8 w-full bg-gray-300"
            >
              {isEnded ? 'Event Ended' : 'Get a Ticket'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
