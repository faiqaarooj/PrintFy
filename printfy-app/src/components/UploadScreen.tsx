import { useState } from "react";
import { Printer, Upload, Minus, Plus, X, FileText, Users } from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  pages: number;
}

interface UploadScreenProps {
  studentName: string;
  queueCount?: number;
  hasActiveJob?: boolean;
  onJoinQueue?: (jobData: {
    fileName: string;
    documentUrl: string;
    pages: number;
    copies: number;
    color: "bw" | "color";
    binding: boolean;
    arrivalTime: string;
  }) => void;
  onSignOut?: () => void;
  onViewQueue?: () => void;
}

export function UploadScreen({ studentName, queueCount, hasActiveJob, onJoinQueue, onSignOut, onViewQueue }: UploadScreenProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [copies, setCopies] = useState(1);
  const [colorMode, setColorMode] = useState<"bw" | "color">("bw");
  const [binding, setBinding] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const id = Date.now().toString();
      
      // For images, page count is always 1
      // For documents, estimate based on file size (rough estimate: 50KB per page for PDFs)
      const isImage = file.type.startsWith('image/');
      const estimatedPages = isImage ? 1 : Math.max(1, Math.round(file.size / 51200));
      
      setFiles([...files, { file, id, pages: estimatedPages }]);
    }
  };

  const updatePageCount = (id: string, pages: number) => {
    setFiles(files.map(f => f.id === id ? { ...f, pages } : f));
  };

  const isValid = files.length > 0 && selectedTime;

  const handleJoinQueue = () => {
    if (isValid && onJoinQueue) {
      // Combine all files into one job
      const totalPages = files.reduce((sum, f) => sum + f.pages, 0);
      const fileNames = files.map(f => f.file.name).join(", ");
      
      // Convert first file to base64 for preview/viewing
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        console.log('File converted to base64:', base64Data.substring(0, 100) + '...');
        
        const jobData = {
          fileName: files.length === 1 ? files[0].file.name : `${files.length} files: ${fileNames}`,
          documentUrl: base64Data, // Base64 data URL
          pages: totalPages,
          copies,
          color: colorMode,
          binding,
          arrivalTime: selectedTime,
        };
        
        console.log('Job data created:', { ...jobData, documentUrl: jobData.documentUrl.substring(0, 100) + '...' });
        onJoinQueue(jobData);
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Error uploading file. Please try again.');
      };
      
      // Read the first file as base64
      reader.readAsDataURL(files[0].file);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // Calculate total cost
  const totalPages = files.reduce((sum, f) => sum + f.pages, 0);
  const pricePerPage = colorMode === "color" ? 15 : 10;
  const totalCost = totalPages * copies * pricePerPage;

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6">
      {/* Sign Out Button - Top Right */}
      {onSignOut && (
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={onSignOut}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Sign Out
          </button>
        </div>
      )}
      
      {/* Greeting */}
      <h2 className="text-xl sm:text-2xl mb-3 text-[#1A1A1A]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
        Hey {studentName}, ready to print?
      </h2>

      {/* Queue Indicator Badge */}
      {queueCount !== undefined && queueCount > 0 && (
        <div className="inline-flex items-center gap-2 bg-[#A8C5B5] bg-opacity-15 border border-[#A8C5B5] border-opacity-30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
          <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A8C5B5]" />
          <span className="text-xs sm:text-sm text-[#1A1A1A]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {queueCount} {queueCount === 1 ? 'student' : 'students'} in queue
          </span>
        </div>
      )}

      {/* Active Job Alert - Show if user has pending job */}
      {hasActiveJob && onViewQueue && (
        <div className="bg-gradient-to-br from-[#A8C5B5] to-[#8AB5A5] rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-25 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base sm:text-lg mb-1 font-semibold" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
                You have an active print job
              </h3>
              <p className="text-white text-opacity-90 text-xs sm:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Track your position in real-time
              </p>
            </div>
          </div>
          <button
            onClick={onViewQueue}
            className="w-full bg-white text-[#1A1A2E] py-3 sm:py-3.5 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm sm:text-base font-semibold shadow-md flex items-center justify-center gap-2"
            style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
          >
            <Printer className="w-4 h-4" />
            View My Queue Position
          </button>
        </div>
      )}

      {/* File Upload Zone */}
      <div className="mb-4 sm:mb-6">
        <label className="block w-full">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <div className="border-2 border-dashed border-[#EBEBEB] rounded-xl p-6 sm:p-8 bg-white cursor-pointer hover:border-[#A8C5B5] transition-colors flex flex-col items-center justify-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-[#F8F7F4] rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Upload className="w-6 sm:w-7 h-6 sm:h-7 text-[#A8C5B5]" />
            </div>
            <p className="text-[#1A1A1A] mb-1 text-sm sm:text-base text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Tap to upload documents
            </p>
            <p className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              PDF, DOC, DOCX, JPG, PNG • Upload multiple files
            </p>
          </div>
        </label>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Uploaded Files ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((uploadedFile) => (
              <div key={uploadedFile.id} className="bg-white rounded-lg p-3 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F8F7F4] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#A8C5B5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1A1A1A] truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {uploadedFile.pages} {uploadedFile.pages === 1 ? 'page' : 'pages'}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFile(uploadedFile.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Print Settings */}
      <div className="bg-white rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
        <h3 className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Print Settings
        </h3>

        {/* Copies Counter */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-[#EBEBEB]">
          <span className="text-sm sm:text-base text-[#1A1A1A]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Copies
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCopies(Math.max(1, copies - 1))}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#F8F7F4] flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#1A1A1A]" />
            </button>
            <span className="w-7 sm:w-8 text-center text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {copies}
            </span>
            <button
              onClick={() => setCopies(copies + 1)}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#F8F7F4] flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#1A1A1A]" />
            </button>
          </div>
        </div>

        {/* Color Mode Toggle */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-[#EBEBEB]">
          <span className="text-sm sm:text-base text-[#1A1A1A]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Color Mode
          </span>
          <div className="flex bg-[#F8F7F4] rounded-full p-1">
            <button
              onClick={() => setColorMode("bw")}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full transition-colors text-xs sm:text-sm ${
                colorMode === "bw"
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-gray-500"
              }`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              B&W
            </button>
            <button
              onClick={() => setColorMode("color")}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full transition-colors text-xs sm:text-sm ${
                colorMode === "color"
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-gray-500"
              }`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Color
            </button>
          </div>
        </div>

        {/* Binding Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base text-[#1A1A1A]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Binding
          </span>
          <button
            onClick={() => setBinding(!binding)}
            className={`w-11 sm:w-12 h-5 sm:h-6 rounded-full transition-colors relative ${
              binding ? "bg-[#A8C5B5]" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                binding ? "left-5 sm:left-6" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Arrival Time */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          When will you arrive?
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:mx-0 px-3 sm:px-0">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0 text-xs sm:text-sm ${
                selectedTime === time
                  ? "bg-[#A8C5B5] text-white"
                  : "bg-white text-gray-600 border border-[#EBEBEB]"
              }`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      {files.length > 0 && (
        <div className="bg-gradient-to-br from-[#A8C5B5] to-[#8AB5A5] rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-xs sm:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Total Pages
            </span>
            <span className="text-white text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {totalPages} × {copies} {copies > 1 ? 'copies' : 'copy'}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-xs sm:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Rate
            </span>
            <span className="text-white text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Rs. {pricePerPage}/page ({colorMode === "color" ? "Color" : "B&W"})
            </span>
          </div>
          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm sm:text-base" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
                Total Amount
              </span>
              <span className="text-white text-xl sm:text-2xl" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
                Rs. {totalCost}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Join Queue Button */}
      <button
        disabled={!isValid}
        className={`w-full py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base text-center ${
          isValid
            ? "bg-gradient-to-r from-[#A8C5B5] to-[#8AB5A5] text-white hover:from-[#98B5A5] hover:to-[#7AA595] shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
        onClick={handleJoinQueue}
      >
        Join Queue
      </button>
    </div>
  );
}