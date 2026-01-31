import { useEffect, useState } from "react";

interface EqualizerBarsProps {
  isPlaying: boolean;
  barCount?: number;
}

export const EqualizerBars = ({ isPlaying, barCount = 40 }: EqualizerBarsProps) => {
  const [heights, setHeights] = useState<number[]>(() =>
    Array(barCount).fill(0).map(() => Math.random() * 100)
  );

  useEffect(() => {
    if (!isPlaying) {
      setHeights(Array(barCount).fill(0).map(() => 5));
      return;
    }

    const interval = setInterval(() => {
      setHeights(prev =>
        prev.map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className="absolute inset-0 flex items-end justify-center gap-[2px] opacity-30 overflow-hidden">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-1 sm:w-2 bg-primary/50 rounded-t transition-all duration-100"
          style={{
            height: `${height}%`,
            transitionDelay: `${i * 5}ms`,
          }}
        />
      ))}
    </div>
  );
};
