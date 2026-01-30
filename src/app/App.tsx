import { useState } from 'react';
import { AuthProvider } from '@/app/contexts/AuthContext';
import Screen01Login from '@/app/components/Screen01Login';
import Screen02Dashboard from '@/app/components/Screen02Dashboard';
import Screen03Employees from '@/app/components/Screen03Employees';
import Screen04EmployeeDetail from '@/app/components/Screen04EmployeeDetail';
import Screen05VacationsLeaves from '@/app/components/Screen05VacationsLeaves';
import Screen06AIIntegration from '@/app/components/Screen06AIIntegration';
import Screen07Reports from '@/app/components/Screen07Reports';
import Screen08Settings from '@/app/components/Screen08Settings';
import AIChatAssistant from '@/app/components/AIChatAssistant';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const screens = [
  { id: 1, name: 'Screen 01 – Login', component: Screen01Login },
  { id: 2, name: 'Screen 02 – Main Dashboard', component: Screen02Dashboard },
  { id: 3, name: 'Screen 03 – Employees Management', component: Screen03Employees },
  { id: 4, name: 'Screen 04 – Employee Detail', component: Screen04EmployeeDetail },
  { id: 5, name: 'Screen 05 – Vacations & Medical Leaves', component: Screen05VacationsLeaves },
  { id: 6, name: 'Screen 06 – AI Automation & Validation', component: Screen06AIIntegration },
  { id: 7, name: 'Screen 07 – Reports', component: Screen07Reports },
  { id: 8, name: 'Screen 08 – Settings', component: Screen08Settings },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  
  const CurrentComponent = screens[currentScreen].component;

  const goToNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const goToPrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <AuthProvider>
      <div className="relative w-full h-screen bg-background">
        {/* Screen Display */}
        <div className="w-full h-full">
          <CurrentComponent onOpenAIChat={() => setIsAIChatOpen(true)} />
        </div>

        {/* AI Chat Assistant - Available on all screens except login */}
        {currentScreen !== 0 && (
          <AIChatAssistant 
            isOpen={isAIChatOpen} 
            onOpenChange={setIsAIChatOpen}
          />
        )}

        {/* Navigation Controls - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
          <div className="max-w-[1440px] mx-auto px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Previous Button */}
              <Button
                onClick={goToPrevious}
                disabled={currentScreen === 0}
                variant="outline"
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {/* Screen Indicator */}
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-center">
                    {screens[currentScreen].name}
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    Wireframe Preview
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  {currentScreen + 1} / {screens.length}
                </Badge>
              </div>

              {/* Next Button */}
              <Button
                onClick={goToNext}
                disabled={currentScreen === screens.length - 1}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Screen Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {screens.map((screen, index) => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreen(index)}
                  className={`h-8 w-8 rounded-md text-xs font-medium border transition-all ${
                    currentScreen === index
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                  title={screen.name}
                >
                  {screen.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}