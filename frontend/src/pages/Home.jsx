import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react';
import {Link} from 'react-router-dom';

const HomePage = () => {
  const [faqs, setFaqs] = useState([
    { question: "How do I join?", answer: "Click the join button and follow the steps.", open: false },
    { question: "What are the benefits?", answer: "Enjoy exclusive features and discounts.", open: false },
    { question: "Is there a free trial?", answer: "Yes, we offer a 7-day free trial.", open: false },
    { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription anytime.", open: false },
    { question: "How do I contact support?", answer: "You can reach us at support@example.com.", open: false },
  ]);

  const toggleFaq = (index) => {
    setFaqs(
      faqs.map((faq, i) => ({
        ...faq,
        open: i === index ? !faq.open : faq.open,
      }))
    );
  };

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* Centered Big Title Section */}
      <div className="flex flex-col items-center justify-center min-h-screen mt-[-10%]">
        <h1 className="text-5xl font-extrabold mb-8 text-center">Connecting communities,
          <hr/>promoting sustainability!</h1>
        <div className="flex gap-8">
        <Link to='/explore'>
          <Button size="lg">Rent a Product</Button>
        </Link>
        <Link to='/addtool'>
        <Button size="lg">Register a Product</Button>
        </Link>
        </div>
      </div>

      {/* More Reasons Section */}
      <div className="w-full max-w-4xl mx-auto mt-[-5%] mb-5">
        <h2 className="text-lg font-bold text-left">More Reasons to Join</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
      {[1, 2, 3].map((card, index) => (
        <Card 
          key={index} 
          className="p-4 text-center h-[250px] w-[250px] transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <h3 className="font-bold">Card {card}</h3>
          <p>Some information here.</p>
        </Card>
      ))}
      </div>

      {/* FAQs Section */}
      <div className="w-full max-w-2xl mt-20">
        <h3 className="text-xl font-semibold mb-4">FAQs</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-2">
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <p>{faq.question}</p>
              <span>{faq.open ? '-' : '+'}</span>
            </div>
            {faq.open && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
