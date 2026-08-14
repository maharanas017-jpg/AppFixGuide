import React, { useState, useEffect } from 'react';

interface Submission {
  id: string;
  title: string;
  logs: string;
  device: string;
  appType: string;
  desc: string;
  submittedAt: string;
  status: string;
}

export default function AdminView() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('submitted_errors') || '[]');
    setSubmissions(list);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = submissions.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: newStatus };
      }
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('submitted_errors', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      const filtered = submissions.filter(s => s.id !== id);
      setSubmissions(filtered);
      localStorage.setItem('submitted_errors', JSON.stringify(filtered));
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            🛡️ Sandbox Moderator Panel
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Review, approve, or reject community submitted Android exceptions and error reports.
          </p>
        </div>
        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md text-xs font-bold">
          Sandbox Active
        </span>
      </div>

      {submissions.length > 0 ? (
        <div className="space-y-6">
          {submissions.map((sub) => (
            <div 
              key={sub.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">{sub.title}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
                    <span>Submitted: {sub.submittedAt}</span>
                    <span>•</span>
                    <span>Device: {sub.device || 'Unspecified'}</span>
                    <span>•</span>
                    <span>Stack: {sub.appType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' :
                    sub.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Raw exception or logs:</span>
                <pre className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-[10px] font-mono text-red-600 dark:text-red-400 overflow-x-auto break-all whitespace-pre-wrap">
                  {sub.logs}
                </pre>
              </div>

              {sub.desc && (
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Description:</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{sub.desc}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={() => handleUpdateStatus(sub.id, 'Approved')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition"
                >
                  Approve / Publish
                </button>
                <button 
                  onClick={() => handleUpdateStatus(sub.id, 'Rejected')}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-lg transition"
                >
                  Reject
                </button>
                <button 
                  onClick={() => handleDelete(sub.id)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500">
          <span className="text-4xl block mb-2">📋</span>
          <span className="font-bold block text-zinc-700 dark:text-zinc-300">No Submissions Found</span>
          <span className="text-xs">Dynamic submissions saved via the submit form will populate here.</span>
        </div>
      )}
    </div>
  );
}
