import { useState, useEffect } from "react";
import { RadioPlayer } from "@/components/RadioPlayer";
import heroImage from "@/assets/radio-hero.jpg";

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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm mb-6 border-2 border-primary/30">
            <span className="text-4xl font-bold text-primary">FM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
            Ntepe Manama FM
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-primary">
            97.0 MHz
          </p>
          <p className="text-muted-foreground mt-2">
            Community Radio • Zimbabwe
          </p>
        </div>

        {/* Current time */}
        <div className="mb-8 text-center">
          <p className="text-4xl font-mono font-bold text-foreground">
            {formatTime(currentTime)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Player */}
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-border/50">
            <RadioPlayer />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Tune in to the best community programming</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
