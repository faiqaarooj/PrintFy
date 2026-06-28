import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { UploadScreen } from "./components/UploadScreen";
import { QueueScreen } from "./components/QueueScreen";
import { OperatorDashboard } from "./components/OperatorDashboard";
import { LandingPage } from "./components/LandingPage";

type Screen = "login" | "signup" | "upload" | "queue" | "operatorDashboard" | "landingPage";

export interface PrintJob {
  id: number;
  position: number;
  studentName: string;
  fileName: string;
  documentUrl: string;
  pages: number;
  copies: number;
  color: "bw" | "color";
  binding: boolean;
  arrivalTime: string;
  submittedAt: number; // Timestamp in milliseconds
  status: "waiting" | "printing" | "done";
}

export default function Component() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landingPage");
  const [userType, setUserType] = useState<"student" | "operator" | null>(null);
  const [studentName, setStudentName] = useState("");
  const [myJobId, setMyJobId] = useState<number | null>(null);
  
  // Load queue from localStorage on mount
  const [queue, setQueue] = useState<PrintJob[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('printQueue');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error loading queue from localStorage:', e);
        }
      }
    }
    return [
      {
        id: 1,
        position: 1,
        studentName: "Fatima Khan",
        fileName: "Assignment_3.pdf",
        documentUrl: "#",
        pages: 12,
        copies: 2,
        color: "bw",
        binding: false,
        arrivalTime: "9:30 AM",
        submittedAt: Date.now() - 3600000,
        status: "printing",
      },
      {
        id: 2,
        position: 2,
        studentName: "Ali Ahmed",
        fileName: "Research_Paper.pdf",
        documentUrl: "#",
        pages: 25,
        copies: 1,
        color: "color",
        binding: true,
        arrivalTime: "10:00 AM",
        submittedAt: Date.now() - 1800000,
        status: "waiting",
      },
    ];
  });

  // Save queue to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('printQueue', JSON.stringify(queue));
    }
  }, [queue]);

  const handleLogin = (name: string, type: "student" | "operator") => {
    setStudentName(name);
    setUserType(type);
    if (type === "operator") {
      setCurrentScreen("operatorDashboard");
    } else {
      setCurrentScreen("upload");
    }
  };

  const handleSignup = (name: string) => {
    setStudentName(name);
    setUserType("student");
    setCurrentScreen("upload");
  };

  const handleSignOut = () => {
    setCurrentScreen("login");
    setUserType(null);
    setStudentName("");
    setMyJobId(null);
  };

  // Helper function to sort and assign positions based on arrival time + submission timestamp
  const sortQueueByPriority = (jobs: PrintJob[]): PrintJob[] => {
    // Define time slot order for proper sorting
    const timeSlots = [
      "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
      "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"
    ];
    
    const sorted = [...jobs].sort((a, b) => {
      // First, sort by status (printing > waiting > done)
      if (a.status === "printing" && b.status !== "printing") return -1;
      if (a.status !== "printing" && b.status === "printing") return 1;
      if (a.status === "done" && b.status !== "done") return 1;
      if (a.status !== "done" && b.status === "done") return -1;
      
      // Then sort by arrival time
      const aTimeIndex = timeSlots.indexOf(a.arrivalTime);
      const bTimeIndex = timeSlots.indexOf(b.arrivalTime);
      if (aTimeIndex !== bTimeIndex) {
        return aTimeIndex - bTimeIndex;
      }
      
      // If same arrival time, sort by submission timestamp (earlier first)
      return a.submittedAt - b.submittedAt;
    });
    
    // Reassign positions
    return sorted.map((job, index) => ({
      ...job,
      position: index + 1
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Screen Container */}
     <div className={`w-full ${currentScreen === "landingPage" || currentScreen === "operatorDashboard" ? "max-w-6xl" : "max-w-[480px]"}`}>
          {currentScreen === "landingPage" && (
          <LandingPage onGetStarted={() => setCurrentScreen("login")} />
        )}
        {currentScreen === "login" && (
          <LoginScreen
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentScreen("signup")}
          />
        )}
        {currentScreen === "signup" && (
          <SignupScreen
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentScreen("login")}
          />
        )}
        {currentScreen === "upload" && (
          <UploadScreen
            studentName={studentName}
            queueCount={queue.filter(job => job.status !== "done").length}
            hasActiveJob={myJobId !== null && queue.find(j => j.id === myJobId && j.status !== "done") !== undefined}
            onJoinQueue={(jobData) => {
              console.log('Received job data in main.tsx:', { ...jobData, documentUrl: jobData.documentUrl.substring(0, 100) + '...' });
              
              const newJob: PrintJob = {
                id: Date.now(),
                position: queue.length + 1, // Temporary, will be recalculated
                studentName: studentName,
                fileName: jobData.fileName,
                documentUrl: jobData.documentUrl,
                pages: jobData.pages,
                copies: jobData.copies,
                color: jobData.color,
                binding: jobData.binding,
                arrivalTime: jobData.arrivalTime,
                submittedAt: Date.now(),
                status: "waiting",
              };
              
              console.log('Created new job:', { ...newJob, documentUrl: newJob.documentUrl.substring(0, 100) + '...' });
              
              const updatedQueue = sortQueueByPriority([...queue, newJob]);
              console.log('Updated queue:', updatedQueue.map(j => ({ id: j.id, fileName: j.fileName, documentUrl: j.documentUrl.substring(0, 50) + '...' })));
              
              setQueue(updatedQueue);
              setMyJobId(newJob.id);
              setCurrentScreen("queue");
            }}
            onSignOut={handleSignOut}
            onViewQueue={() => setCurrentScreen("queue")}
          />
        )}
        {currentScreen === "queue" && (
          <QueueScreen
            studentName={studentName}
            queue={queue}
            myJobId={myJobId}
            onPrintAnother={() => setCurrentScreen("upload")}
            onSignOut={handleSignOut}
            onBack={() => setCurrentScreen("upload")}
          />
        )}
        {currentScreen === "operatorDashboard" && (
          <OperatorDashboard
            queue={queue}
            setQueue={setQueue}
            onSignOut={handleSignOut}
          />
        )}
      </div>
    </div>
  );
}