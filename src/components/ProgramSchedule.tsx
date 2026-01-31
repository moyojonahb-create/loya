import { Clock, Music, Mic, Radio, Users, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Program {
  time: string;
  name: string;
  host: string;
  icon: React.ReactNode;
  isLive?: boolean;
}

const weekdaySchedule: Program[] = [
  { time: "05:00 - 07:00", name: "Morning Devotion", host: "Pastor Moyo", icon: <BookOpen className="h-4 w-4" /> },
  { time: "07:00 - 09:00", name: "Breakfast Show", host: "DJ Themba", icon: <Mic className="h-4 w-4" /> },
  { time: "09:00 - 12:00", name: "Mid-Morning Mix", host: "Sisi Tino", icon: <Music className="h-4 w-4" /> },
  { time: "12:00 - 14:00", name: "Lunchtime Vibes", host: "MC Biggie", icon: <Radio className="h-4 w-4" /> },
  { time: "14:00 - 16:00", name: "Afternoon Drive", host: "DJ Spha", icon: <Music className="h-4 w-4" /> },
  { time: "16:00 - 18:00", name: "Community Hour", host: "Mbuya Nkomo", icon: <Users className="h-4 w-4" /> },
  { time: "18:00 - 20:00", name: "Evening News & Talk", host: "Bra Zakes", icon: <Mic className="h-4 w-4" /> },
  { time: "20:00 - 22:00", name: "Night Grooves", host: "DJ Nox", icon: <Music className="h-4 w-4" /> },
  { time: "22:00 - 00:00", name: "Late Night Love", host: "Lovey Dove", icon: <Heart className="h-4 w-4" /> },
];

const weekendSchedule: Program[] = [
  { time: "06:00 - 09:00", name: "Weekend Wake Up", host: "DJ Sunny", icon: <Music className="h-4 w-4" /> },
  { time: "09:00 - 12:00", name: "Gospel Hour", host: "Choir Masters", icon: <BookOpen className="h-4 w-4" /> },
  { time: "12:00 - 15:00", name: "Weekend Party Mix", host: "DJ Flames", icon: <Music className="h-4 w-4" /> },
  { time: "15:00 - 18:00", name: "Sports Round-Up", host: "Coach Ndlovu", icon: <Radio className="h-4 w-4" /> },
  { time: "18:00 - 21:00", name: "Saturday Night Live", host: "MC Vibes", icon: <Mic className="h-4 w-4" /> },
  { time: "21:00 - 00:00", name: "Club Mix", host: "DJ Storm", icon: <Music className="h-4 w-4" /> },
];

const getCurrentProgram = (schedule: Program[]): string | null => {
  const now = new Date();
  const currentHour = now.getHours();
  
  for (const program of schedule) {
    const [startTime] = program.time.split(" - ");
    const [startHour] = startTime.split(":").map(Number);
    const [, endTime] = program.time.split(" - ");
    const [endHour] = endTime.split(":").map(Number);
    
    if (currentHour >= startHour && currentHour < (endHour === 0 ? 24 : endHour)) {
      return program.name;
    }
  }
  return null;
};

const ProgramCard = ({ program, isCurrentShow }: { program: Program; isCurrentShow: boolean }) => (
  <div 
    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
      isCurrentShow 
        ? "bg-primary/10 border border-primary/30" 
        : "hover:bg-muted/50"
    }`}
  >
    <div className={`p-2 rounded-full ${isCurrentShow ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
      {program.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <p className="font-medium text-foreground truncate">{program.name}</p>
        {isCurrentShow && (
          <Badge variant="default" className="text-xs shrink-0">
            ON AIR
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{program.host}</p>
    </div>
    <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
      <Clock className="h-3 w-3" />
      <span>{program.time}</span>
    </div>
  </div>
);

export const ProgramSchedule = () => {
  const isWeekend = [0, 6].includes(new Date().getDay());
  const currentSchedule = isWeekend ? weekendSchedule : weekdaySchedule;
  const currentProgram = getCurrentProgram(currentSchedule);

  return (
    <Card className="bg-card/80 backdrop-blur-md border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Radio className="h-5 w-5 text-primary" />
          Program Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={isWeekend ? "weekend" : "weekday"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekday">Mon - Fri</TabsTrigger>
            <TabsTrigger value="weekend">Sat - Sun</TabsTrigger>
          </TabsList>
          <TabsContent value="weekday" className="space-y-2 mt-0">
            {weekdaySchedule.map((program) => (
              <ProgramCard 
                key={program.name} 
                program={program} 
                isCurrentShow={!isWeekend && currentProgram === program.name}
              />
            ))}
          </TabsContent>
          <TabsContent value="weekend" className="space-y-2 mt-0">
            {weekendSchedule.map((program) => (
              <ProgramCard 
                key={program.name} 
                program={program}
                isCurrentShow={isWeekend && currentProgram === program.name}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
