"use client"
import { useEffect, useState } from 'react';
import Card from '../components/cards';
import Popup from '../components/popup'; 

import cardsData from '../api/cards/page.json';

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setCards(cardsData.cards);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">E-commerce Homepage</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={() => setSelectedCard(card)} />
        ))}
      </div>
      {selectedCard && <Popup card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </div>
  );
}

