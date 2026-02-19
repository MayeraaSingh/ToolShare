import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react';
import {Link} from 'react-router-dom';

const HomePage = () => {
  console.log('[Home] Rendering HomePage');
  const [faqs, setFaqs] = useState([
    { question: "Is there a limit to how many tools I can borrow or lend?", 
      answer: "Nope! You can borrow or lend as many tools as you'd like, as long as they’re available and meet the terms set by the owner. It’s all about sharing responsibly within your community"
      , open: false },
    { question: "Can I lend tools that require specific skills or safety precautions?", 
      answer: "Absolutely! When listing such tools, include detailed usage instructions and safety guidelines in the description. Borrowers must agree to these terms before renting."
      , open: false },
    { question: "Are there any restrictions on the tools I can lend?", 
      answer: "Yes, ToolShare prohibits items that are unsafe, illegal, or unsuitable for sharing (e.g., hazardous materials or heavily worn-out tools). Please ensure all listed items are in good working condition.", open: false },
    { question: "How do I ensure my tools are returned on time?", 
      answer: "ToolShare sends reminders to borrowers about return deadlines. You can also set specific return terms when lending your tool to ensure clear communication and timely returns.", open: false },
    { question: "How do I contact support?", 
      answer: "You can reach us at support@toolshare.com.", open: false },
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
        <h2 className="text-lg font-bold text-left">More Reasons to Join!</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
        {[
          {
            title: "Declutter and Earn",
            description: "Got tools collecting dust? List them on our platform and earn extra cash while helping others. It’s a win-win!",
            
          },
          {
            title: "Save Money on Tools",
            description: "Why buy expensive tools when you can borrow them for a fraction of the cost? Join our community to access a wide range of tools whenever you need them.", 
          },
          {
            title: "Build Community Connections",
            description: "Connect with your neighbors and foster a sense of community by sharing resources. It’s not just about tools—it’s about building relationships!",
            
          },
        ].map((card, index) => (
          <Card 
            key={index} 
            className="p-4 text-center h-[250px] w-[250px] transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="font-bold text-teal-400 dark:text-teal-600 mb-2">{card.title}</h3>
            <p className="mb-4 text-sm">{card.description}</p>
          </Card>
        ))}
      </div>


      {/* FAQs Section */}
      <div className="w-full max-w-2xl mt-20">
        <h3 className="text-xl text-teal-500 font-semibold mb-4">FAQs</h3>
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
