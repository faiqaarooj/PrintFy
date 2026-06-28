// ============================================
// QUEUE MANAGEMENT UTILITIES
// ============================================

import type { PrintJob } from "./types";

/**
 * Sort queue by arrival time slot, then by submission timestamp
 * Priority 1: Arrival time slot (earlier slots first)
 * Priority 2: Submission timestamp (who submitted first)
 */
export function sortQueue(queue: PrintJob[]): PrintJob[] {
  return [...queue].sort((a, b) => {
    // First, sort by arrival time
    if (a.arrivalTime !== b.arrivalTime) {
      return a.arrivalTime.localeCompare(b.arrivalTime);
    }
    // If arrival times are the same, sort by submission timestamp
    return a.submittedAt - b.submittedAt;
  });
}

/**
 * Calculate queue positions based on sorted order
 */
export function calculateQueuePositions(queue: PrintJob[]): PrintJob[] {
  const sorted = sortQueue(queue);
  return sorted.map((job, index) => ({
    ...job,
    position: index + 1,
  }));
}

/**
 * Add a new job to the queue
 */
export function addJobToQueue(queue: PrintJob[], newJob: Omit<PrintJob, "id" | "position">): PrintJob[] {
  // Generate new ID
  const maxId = queue.length > 0 ? Math.max(...queue.map((j) => j.id)) : 0;
  const jobWithId: PrintJob = {
    ...newJob,
    id: maxId + 1,
    position: 0, // Will be recalculated
  };

  // Add to queue and recalculate positions
  const updatedQueue = [...queue, jobWithId];
  return calculateQueuePositions(updatedQueue);
}

/**
 * Update a job's status in the queue
 */
export function updateJobStatus(
  queue: PrintJob[],
  jobId: number,
  status: "waiting" | "printing" | "done"
): PrintJob[] {
  return queue.map((job) => (job.id === jobId ? { ...job, status } : job));
}

/**
 * Remove a job from the queue
 */
export function removeJobFromQueue(queue: PrintJob[], jobId: number): PrintJob[] {
  const filtered = queue.filter((job) => job.id !== jobId);
  return calculateQueuePositions(filtered);
}

/**
 * Get the next job in the queue (first waiting job)
 */
export function getNextJob(queue: PrintJob[]): PrintJob | null {
  const sorted = sortQueue(queue);
  return sorted.find((job) => job.status === "waiting") || null;
}

/**
 * Get jobs by status
 */
export function getJobsByStatus(
  queue: PrintJob[],
  status: "waiting" | "printing" | "done"
): PrintJob[] {
  return queue.filter((job) => job.status === status);
}

/**
 * Get queue statistics
 */
export function getQueueStats(queue: PrintJob[]): {
  total: number;
  waiting: number;
  printing: number;
  done: number;
} {
  return {
    total: queue.length,
    waiting: queue.filter((j) => j.status === "waiting").length,
    printing: queue.filter((j) => j.status === "printing").length,
    done: queue.filter((j) => j.status === "done").length,
  };
}
