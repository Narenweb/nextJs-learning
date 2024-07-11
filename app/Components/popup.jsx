export default function Popup({ card, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-black">{card.title}</h2>
        <p className="text-black">{card.description}</p>
        <p className="text-gray-600">{card.price}</p>
        <p className="text-gray-600">{card.product}</p>
        <p className="text-gray-600">{card.stars}</p>
        <div className="flex justify-end w-full">
          <button
            className="flex justify-end mt-2 px-3 rounded-xl py-2 bg-red-400 mb-2 text-white "
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
