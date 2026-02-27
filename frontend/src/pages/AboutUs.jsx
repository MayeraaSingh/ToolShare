const members = ["Mishka", "Khushi", "Mayeraa"];

export default function AboutUs() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/about-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-screen px-6 text-center">
        {/* Title */}
        <p className="text-xs tracking-[0.35em] text-teal-400 uppercase mb-3 font-light">
          The Team
        </p>
        <h1
          className="text-5xl md:text-7xl font-extralight tracking-widest text-white mb-6 uppercase"
          style={{ letterSpacing: "0.15em" }}
        >
          About Us
        </h1>
        <div className="w-16 h-px bg-teal-400 mb-10 opacity-70" />
        <p className="text-sm md:text-base text-white/60 tracking-wide max-w-md mb-20 font-light leading-relaxed">
          Three builders. One idea. A platform for sharing what you have with those who need it.
        </p>

        {/* Names */}
        <div className="flex flex-col md:flex-row gap-14 md:gap-24 items-center">
          {members.map((name, i) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-4"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Avatar circle */}
              <div className="w-20 h-20 rounded-full border border-teal-400/50 flex items-center justify-center text-2xl font-light text-teal-300 group-hover:border-teal-300 group-hover:scale-105 transition-all duration-500 backdrop-blur-sm bg-white/5">
                {name[0]}
              </div>
              {/* Name */}
              <span className="text-lg md:text-xl tracking-[0.25em] font-light text-white/85 uppercase group-hover:text-teal-300 transition-colors duration-300">
                {name}
              </span>
              {/* Underline accent */}
              <div className="h-px w-0 group-hover:w-full bg-teal-400 transition-all duration-500 opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}