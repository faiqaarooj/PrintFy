import { Clock, ArrowLeft } from "lucide-react";

interface QueueScreenProps {
  studentName: string;
  queue: PrintJob[];
  myJobId: number | null;
  onPrintAnother: () => void;
  onSignOut: () => void;
  onBack?: () => void;
}

interface PrintJob {
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
  submittedAt: number;
  status: "waiting" | "printing" | "done";
}

export function QueueScreen({ studentName, queue, myJobId, onPrintAnother, onSignOut, onBack }: QueueScreenProps) {
  // Find current job in the queue
  const currentJob = queue.find(j => j.id === myJobId);
  
  // Job is marked as done by operator
  if (currentJob && currentJob.status === "done") {
    return (
      <div className="px-3 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center min-h-[500px]">
        {/* Sign Out Button */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={onSignOut}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-white to-[#F8F7F4] rounded-xl p-6 sm:p-8 text-center shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBEB] max-w-md">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#A8C5B5] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
            Your document is ready
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Please collect it from the print station
          </p>
          <button
            onClick={onPrintAnother}
            className="w-full bg-[#1A1A2E] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#2A2A3E] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
          >
            Print Another
          </button>
        </div>
      </div>
    );
  }
  
  // Job not found (shouldn't happen but handle gracefully)
  if (!currentJob) {
    return (
      <div className="px-3 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center min-h-[500px]">
        {/* Sign Out Button */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={onSignOut}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-white to-[#F8F7F4] rounded-xl p-6 sm:p-8 text-center shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBEB] max-w-md">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#A8C5B5] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
            Your document is ready
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Please collect it from the print station
          </p>
          <button
            onClick={onPrintAnother}
            className="w-full bg-[#1A1A2E] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#2A2A3E] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
          >
            Print Another
          </button>
        </div>
      </div>
    );
  }

  const isPrinting = currentJob.status === "printing";
  const isDone = currentJob.status === "done";

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6">
      {/* Header with Back and Sign Out */}
      <div className="w-full flex items-center justify-between mb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        <button
          onClick={onSignOut}
          className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all ml-auto"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Sign Out
        </button>
      </div>
      
      {/* Position Card or Printing Status */}
      {isPrinting ? (
        <div className="bg-gradient-to-br from-white to-[#F8F7F4] rounded-xl p-5 sm:p-6 mb-3 sm:mb-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBEB]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#A8C5B5] bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🖨️</span>
            </div>
            <div>
              <p className="text-lg sm:text-xl text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
                Your document is printing
              </p>
              <p className="text-gray-600 text-xs sm:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Almost ready to collect
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-white to-[#F8F7F4] rounded-xl p-5 sm:p-6 mb-3 sm:mb-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBEB]">
          <p className="text-gray-500 mb-1 text-xs sm:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Your position
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl sm:text-5xl text-[#1A1A2E]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
              #{currentJob.position}
            </span>
            <span className="text-gray-500 text-base sm:text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              in line
            </span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            You're almost there!
          </p>
        </div>
      )}

      {/* Arrival Time Reminder */}
      <div className="bg-[#A8C5B5] bg-opacity-20 border border-[#A8C5B5] border-opacity-30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 inline-flex items-center gap-2">
        <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A8C5B5]" />
        <span className="text-xs sm:text-sm text-[#1A1A1A]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Arriving at {currentJob.arrivalTime}
        </span>
      </div>

      {/* Queue List */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {queue.map((job) => (
          <div
            key={job.id}
            className={`bg-white rounded-xl p-3 sm:p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] ${
              job.id === myJobId ? "border-2 border-[#A8C5B5]" : "border border-[#EBEBEB]"
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              {/* Position Number */}
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#F8F7F4] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs sm:text-sm text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
                  {job.position}
                </span>
              </div>

              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#1A1A1A] mb-0.5 text-sm sm:text-base truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {job.id === myJobId ? "Your Document" : job.fileName}
                </p>
                <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {job.studentName}
                </p>
              </div>

              {/* Status */}
              <div
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs flex-shrink-0 ${
                  job.status === "printing"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-50 text-gray-500"
                }`}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {job.status === "printing" ? "Printing" : "Waiting"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Button - Only show if not printing */}
      {!isPrinting && (
        <button
          className="w-full py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] bg-white text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base text-center"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Cancel Print Job
        </button>
      )}
    </div>
  );
}