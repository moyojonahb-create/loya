import { useState, useEffect } from "react";
import { RadioPlayer } from "@/components/RadioPlayer";
import { ProgramSchedule } from "@/components/ProgramSchedule";
import heroImage from "@/assets/radio-hero.jpg";
import radioLogo from "@/assets/radio-logo.jpg";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <img 
            src={radioLogo} 
            alt="Ntepe Manama FM 97.0" 
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary/30 shadow-xl mx-auto"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
            Ntepe Manama FM
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-primary">
            97.0 MHz
          </p>
        </div>

        {/* Current time */}
        <div className="mb-6 text-center">
          <p className="text-3xl font-mono font-bold text-foreground">
            {formatTime(currentTime)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Player */}
        <div className="w-full max-w-md mb-8">
          <div className="bg-card/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-border/50">
            <RadioPlayer />
          </div>
        </div>

        {/* Program Schedule */}
        <div className="w-full max-w-md">
          <ProgramSchedule />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Community Radio • Zimbabwe</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
