import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const STREAM_URL = "https://stream.zeno.fm/yn65fsaurfhvv";

export const RadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
      // Auto-play when ready
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Browser may block autoplay - user needs to click
        setIsPlaying(false);
      });
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <audio ref={audioRef} src={STREAM_URL} preload="auto" />

      {/* Animated visualizer */}
      <div className="relative flex items-end justify-center gap-1 h-24 w-48">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-3 rounded-full bg-primary transition-all duration-150 ${
              isPlaying && !isLoading
                ? "animate-pulse"
                : "h-2"
            }`}
            style={{
              height: isPlaying && !isLoading
                ? `${Math.random() * 60 + 20}%`
                : "8px",
              animationDelay: `${i * 0.1}s`,
              opacity: isPlaying && !isLoading ? 0.7 + Math.random() * 0.3 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Radio className="h-4 w-4" />
        <span className="text-sm font-medium">
          {hasError
            ? "Connection error - tap to retry"
            : isLoading
            ? "Connecting..."
            : isPlaying
            ? "LIVE NOW"
            : "Tap to play"}
        </span>
        {isPlaying && !isLoading && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
          </span>
        )}
      </div>

      {/* Play/Pause button */}
      <Button
        variant="default"
        size="lg"
        className="h-20 w-20 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95"
        onClick={togglePlay}
        disabled={isLoading && isPlaying}
      >
        {isLoading && isPlaying ? (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-foreground border-t-transparent" />
        ) : isPlaying ? (
          <Pause className="h-8 w-8" />
        ) : (
          <Play className="h-8 w-8 ml-1" />
        )}
      </Button>

      {/* Volume control */}
      <div className="flex items-center gap-4 w-full max-w-xs">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="shrink-0"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};
