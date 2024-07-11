export default function Card({ card, onClick }) {
    return (
      <div className="border p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-100 hover:text-black transition-all delay-75 ease-in" onClick={onClick}>
        <h2 className="text-lg  font-bold">{card.title}</h2>
        <p>{card.description}</p>
        <p >{card.price}</p>
      </div>
    );
  }