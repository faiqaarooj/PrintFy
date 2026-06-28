import { FileText, Eye, LogOut, Download } from "lucide-react";
import { useEffect, useState } from "react";
import type { PrintJob } from "../utils/types";
import { 
  downloadDocument, 
  openDocumentInBrowser
} from "../utils/documentViewer";
import { updateJobStatus, getJobsByStatus } from "../utils/queueManager";

interface OperatorDashboardProps {
  queue: PrintJob[];
  setQueue: (queue: PrintJob[]) => void;
  onSignOut: () => void;
}

export function OperatorDashboard({ queue, setQueue, onSignOut }: OperatorDashboardProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeTab, setActiveTab] = useState<"live" | "ended">("live");
  const [previewDocument, setPreviewDocument] = useState<{ url: string; fileName: string } | null>(null);
  
  const handleViewDocument = (url: string, fileName: string) => {
    if (url === '#' || !url || url.trim() === '') {
      alert('No document available for this job. This is a demo entry.');
      return;
    }
    setPreviewDocument({ url, fileName });
  };

  const handleViewAndPrint = (url: string) => {
    if (url === '#' || !url || url.trim() === '') {
      alert('No document available for this job. This is a demo entry.');
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    iframe.onload = () => { iframe.contentWindow?.print(); };
  };
  
  const handleStartJob = (jobId: number) => {
    setQueue(updateJobStatus(queue, jobId, 'printing'));
  };

  const handleStopJob = (jobId: number) => {
    setQueue(updateJobStatus(queue, jobId, 'waiting'));
  };

  const handleCompleteJob = (jobId: number) => {
    setQueue(updateJobStatus(queue, jobId, 'done'));
  };

  const handleUndoneJob = (jobId: number) => {
    setQueue(updateJobStatus(queue, jobId, 'waiting'));
  };

  const liveJobs = [...getJobsByStatus(queue, "waiting"), ...getJobsByStatus(queue, "printing")];
  const endedJobs = getJobsByStatus(queue, "done");
  const displayJobs = activeTab === "live" ? liveJobs : endedJobs;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        const firstWaitingJob = queue.find(job => job.status === 'waiting');
        if (firstWaitingJob) {
          handleViewAndPrint(firstWaitingJob.documentUrl);
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowShortcuts(!showShortcuts);
      }
      
      if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const position = parseInt(e.key);
        const job = queue.find(j => j.position === position);
        if (job) {
          handleViewDocument(job.documentUrl, job.fileName);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [queue, showShortcuts]);

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-6xl mx-auto">
      {showShortcuts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShortcuts(false)}>
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-md w-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg sm:text-xl text-[#1A1A1A] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
              Keyboard Shortcuts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Print next job</span>
                <kbd className="px-2 py-1 bg-[#F8F7F4] rounded text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Ctrl + P</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>View job #1, #2, #3...</span>
                <kbd className="px-2 py-1 bg-[#F8F7F4] rounded text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>1-9</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Toggle shortcuts</span>
                <kbd className="px-2 py-1 bg-[#F8F7F4] rounded text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Ctrl + K</kbd>
              </div>
            </div>
            <button
              onClick={() => setShowShortcuts(false)}
              className="w-full mt-5 py-2 rounded-lg bg-[#1A1A2E] text-white hover:bg-[#2A2A3E] transition-colors text-sm"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-xl sm:text-2xl text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
            Print Queue
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShortcuts(true)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Ctrl+K for shortcuts
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 sm:mb-6 border-b border-[#EBEBEB]">
        <button
          onClick={() => setActiveTab("live")}
          className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all relative ${
            activeTab === "live" ? "text-[#1A1A2E]" : "text-gray-400 hover:text-gray-600"
          }`}
          style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
        >
          <div className="flex items-center gap-2">
            Live Queue
            <div className="bg-[#A8C5B5] bg-opacity-20 text-[#A8C5B5] px-2 py-0.5 rounded-full text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {liveJobs.length}
            </div>
            {activeTab === "live" && liveJobs.length > 0 && (
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          {activeTab === "live" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1A2E]" />}
        </button>
        <button
          onClick={() => setActiveTab("ended")}
          className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all relative ${
            activeTab === "ended" ? "text-[#1A1A2E]" : "text-gray-400 hover:text-gray-600"
          }`}
          style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
        >
          <div className="flex items-center gap-2">
            Ended Queue
            <div className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {endedJobs.length}
            </div>
          </div>
          {activeTab === "ended" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1A2E]" />}
        </button>
      </div>

      <div className="hidden md:grid md:grid-cols-12 gap-3 px-4 py-2 bg-[#F8F7F4] rounded-lg mb-3 text-xs text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="col-span-1">#</div>
        <div className="col-span-2">Student</div>
        <div className="col-span-2">File</div>
        <div className="col-span-2">Details</div>
        <div className="col-span-1">Time</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      {displayJobs.length > 0 ? (
        <div className="space-y-2">
          {displayJobs.map((job: PrintJob) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-3 sm:p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBEB] hover:border-[#A8C5B5] transition-all cursor-pointer"
            >
              <div className="md:hidden">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <div className="w-9 h-9 bg-[#F8F7F4] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-base text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>{job.position}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A1A1A] mb-0.5 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{job.studentName}</p>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <p className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{job.fileName}</p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded-full text-[10px] flex-shrink-0 ${
                      job.status === "printing" ? "bg-green-50 text-green-600" : job.status === "done" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-500"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {job.status === "printing" ? "Printing" : job.status === "done" ? "Done" : "Waiting"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2 text-[10px] text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <span>{job.pages}p</span><span>•</span>
                  <span>{job.copies}c</span><span>•</span>
                  <span>{job.color === "bw" ? "B&W" : "Color"}</span><span>•</span>
                  <span>{job.binding ? "Bind" : "No bind"}</span><span>•</span>
                  <span>{job.arrivalTime}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDocument(job.documentUrl, job.fileName)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#A8C5B5] text-[#A8C5B5] hover:bg-[#A8C5B5] hover:bg-opacity-10 transition-colors text-xs flex-shrink-0"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  
                  {job.status === "waiting" ? (
                    <button onClick={() => handleStartJob(job.id)} className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all shadow-sm text-xs text-center font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Start</button>
                  ) : job.status === "printing" ? (
                    <button onClick={() => handleStopJob(job.id)} className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all shadow-sm text-xs text-center font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Stop</button>
                  ) : null}
                  
                  {job.status === "done" ? (
                    <button onClick={() => handleUndoneJob(job.id)} className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all shadow-sm text-xs text-center font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Undone</button>
                  ) : (
                    <button onClick={() => handleCompleteJob(job.id)} className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm text-xs text-center font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Done</button>
                  )}
                </div>
              </div>

              <div className="hidden md:grid md:grid-cols-12 gap-3 items-center">
                <div className="col-span-1">
                  <div className="w-9 h-9 bg-[#F8F7F4] rounded-full flex items-center justify-center">
                    <span className="text-sm text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>{job.position}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#1A1A1A] truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{job.studentName}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <p className="text-xs text-gray-600 truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{job.fileName}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    <span>{job.pages}p</span><span>•</span>
                    <span>{job.copies}c</span><span>•</span>
                    <span>{job.color === "bw" ? "B&W" : "Color"}</span>
                    {job.binding && <><span>•</span><span>Bind</span></>}
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{job.arrivalTime}</p>
                </div>
                <div className="col-span-1">
                  <div
                    className={`px-2 py-1 rounded-full text-[10px] text-center ${
                      job.status === "printing" ? "bg-green-50 text-green-600" : job.status === "done" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-500"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {job.status === "printing" ? "Printing" : job.status === "done" ? "Done" : "Waiting"}
                  </div>
                </div>
                <div className="col-span-3 flex gap-2 justify-end">
                  <button
                    onClick={() => handleViewDocument(job.documentUrl, job.fileName)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#A8C5B5] text-[#A8C5B5] hover:bg-[#A8C5B5] hover:bg-opacity-10 transition-colors text-xs"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  
                  {job.status === "waiting" ? (
                    <button onClick={() => handleStartJob(job.id)} className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all shadow-sm text-xs font-medium min-w-[70px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Start</button>
                  ) : job.status === "printing" ? (
                    <button onClick={() => handleStopJob(job.id)} className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all shadow-sm text-xs font-medium min-w-[70px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Stop</button>
                  ) : null}
                  
                  {job.status === "done" ? (
                    <button onClick={() => handleUndoneJob(job.id)} className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all shadow-sm text-xs font-medium min-w-[70px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Undone</button>
                  ) : (
                    <button onClick={() => handleCompleteJob(job.id)} className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm text-xs font-medium min-w-[70px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Done</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#F8F7F4] rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <FileText className="w-8 sm:w-10 h-8 sm:h-10 text-gray-300" />
          </div>
          <p className="text-gray-500 mb-1 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {activeTab === "live" ? "Live queue is empty" : "No ended jobs yet"}
          </p>
          <p className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {activeTab === "live" ? "No active print jobs at the moment" : "Completed jobs will appear here"}
          </p>
        </div>
      )}
      
      {previewDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setPreviewDocument(null)}>
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-[#EBEBEB] bg-[#F8F7F4]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1A1A2E]" />
                <h3 className="text-base font-medium text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>{previewDocument.fileName}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadDocument(previewDocument.url, previewDocument.fileName)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#1A1A2E] to-[#2A2A3E] text-white hover:from-[#2A2A3E] hover:to-[#3A3A4E] transition-all shadow-md hover:shadow-lg font-medium text-sm"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={() => openDocumentInBrowser(previewDocument.url, previewDocument.fileName)}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  Open in Browser
                </button>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-80px)] bg-gray-50">
              <div className="flex items-center justify-center p-6">
                {previewDocument.url.startsWith('data:image/') ? (
                  <img src={previewDocument.url} alt={previewDocument.fileName} className="max-w-full h-auto rounded-lg shadow-lg" />
                ) : previewDocument.url.startsWith('data:application/pdf') ? (
                  <iframe src={previewDocument.url} className="w-full h-[700px] rounded-lg shadow-lg border-0" title={previewDocument.fileName} />
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Preview not available for this file type</p>
                    <button
                      onClick={() => downloadDocument(previewDocument.url, previewDocument.fileName)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1A1A2E] to-[#2A2A3E] text-white hover:from-[#2A2A3E] hover:to-[#3A3A4E] transition-all shadow-lg font-medium"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      <Download className="w-5 h-5" />
                      Download File
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}