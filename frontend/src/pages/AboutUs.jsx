import React from 'react'


export default function AboutUs() {
  

    return (
        <>
        <section
          className="bg-gray-100 dark:bg-gray-900"
          style={{
            backgroundImage: `url('/path-to-your-image.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
        </section>


        <section className="container mx-auto py-16">
          <h2 className="text-3xl text-teal-500 font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center mb-12">
            We're three friends who believe in the power of sharing (and avoiding unnecessary purchases). 
            Plus, who doesn't love a good old-fashioned neighborly exchange? 
            (Except for maybe our neighbors who keep 'borrowing' our lawnmower.)
          </p>
    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-teal-600 font-semibold text-center mb-2">The Architect</h3>
              <ul className="text-sm text-center">
                <li><b>Name:</b> Mishka </li>
                <li><b>Role:</b> The one who dreams in code and duct tape.</li>
                <li><b>Fun Fact:</b> I once tried to build a robot out of Legos and a toaster oven. It didn't go well.</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-teal-600 font-semibold text-center mb-2">The Stabilizer</h3>
              <ul className="text-sm text-center">
                <li><b>Name:</b> Khushi </li>
                <li><b>Role:</b> The voice of reason (sometimes). Mostly, I just keep the others from blowing things up.</li>
                <li><b>Fun Fact:</b> I have a secret talent for organizing chaos. Except for my own life, of course.</li>
              </ul>
            </div>
    
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-teal-600 font-semibold text-center mb-2">The Catalyst</h3>
              <ul className="text-sm text-center">
                <li><b>Name:</b> Mayeraa </li>
                <li><b>Role:</b> The idea machine, fueled by caffeine and sheer willpower.</li>
                <li><b>Fun Fact:</b> I'm convinced I can talk my way into anything, including a free pizza.</li>
              </ul>
            </div>
          </div>
        </section>
        </>
      );
    };