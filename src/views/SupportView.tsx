import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';

interface Ticket {
  id: string;
  name: string;
  email: string;
  category: string;
  priority: string;
  message: string;
  status: string;
  agent: string;
  createdAt: string;
}

export default function SupportView() {
  const { language } = useLanguage();
  const { styles } = useAppTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Gradle / Compiler');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('support_tickets') || '[]');
    setTickets(list);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields');
      return;
    }

    const agents = ['Aditya Sharma (Senior Android Engineer)', 'Michael Chen (Gradle Script Specialist)', 'Sarah Jenkins (Play Console Compliance Expert)'];
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];

    const newTicket: Ticket = {
      id: Date.now().toString(),
      name,
      email,
      category,
      priority,
      message,
      status: 'Assigned / Investigating',
      agent: randomAgent,
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem('support_tickets', JSON.stringify(updated));

    setName('');
    setEmail('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleDeleteTicket = (id: string) => {
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    localStorage.setItem('support_tickets', JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-6 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
      {/* Description & Form Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${styles.text}`}>
            {language === 'hi' ? 'विशेषज्ञ सहायता' : 'ASK AN EXPERT'}
          </span>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white leading-tight">
            Need Dedicated Android Help?
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            Submit a diagnostic ticket detailing your compiler log or device sideload block. One of our sandbox developer representatives will be assigned to guide you.
          </p>
        </div>

        {success && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold">
            ✓ Support request submitted! Our simulated expert has been assigned. Check the ticket list on the right.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Your Name *</label>
            <input 
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Jane Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Email Address *</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., jane@developer.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Category</label>
              <select 
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Gradle / Compiler">Gradle / Compiler</option>
                <option value="APK Sideload">APK Sideload</option>
                <option value="WebView Container">WebView Container</option>
                <option value="Play Store Publish">Play Store Publish</option>
                <option value="Manifest / Permissions">Manifest / Permissions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Priority</label>
              <select 
                value={priority} onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical 🔥">Critical 🔥</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Detail your crash or issue *</label>
            <textarea 
              rows={4} required value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide exact steps to reproduce, or paste the crashing method signature..."
            />
          </div>

          <button 
            type="submit"
            className={`w-full py-2.5 bg-gradient-to-r ${styles.gradient} text-white text-xs font-black rounded-xl transition shadow-md hover:brightness-110`}
          >
            Submit Help Ticket
          </button>
        </form>
      </div>

      {/* Tickets List Sandbox Display */}
      <div className="lg:col-span-7 space-y-6">
        <h3 className="font-bold text-base text-zinc-900 dark:text-white border-b pb-2 flex justify-between items-center">
          <span>Active Sandbox Tickets ({tickets.length})</span>
          <span className="text-[10px] font-bold uppercase text-zinc-400">Local Sandbox Session</span>
        </h3>

        {tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div 
                key={t.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <div>
                    <h4 className="font-bold text-xs text-zinc-950 dark:text-white leading-tight">
                      [{t.category}] Support Request
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Filed: {t.createdAt} • Priority: <span className="font-bold text-amber-600">{t.priority}</span>
                    </p>
                  </div>

                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 text-[9px] font-black uppercase rounded-full">
                    {t.status}
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap italic">
                  "{t.message}"
                </div>

                <div className="flex justify-between items-center text-[11px] pt-1">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <span className="text-sm">🧑‍💻</span>
                    <span>Assigned Expert: <strong className="text-zinc-800 dark:text-zinc-200">{t.agent}</strong></span>
                  </div>
                  <button 
                    onClick={() => handleDeleteTicket(t.id)}
                    className="text-red-500 hover:underline font-bold text-[10px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-500 flex flex-col items-center justify-center">
            <span className="text-4xl block mb-2">📬</span>
            <span className="font-bold block text-zinc-700 dark:text-zinc-300 text-sm">No Active Tickets</span>
            <span className="text-[11px] mt-0.5 max-w-xs leading-relaxed">Submit the diagnostic help request form to initiate a simulated support session with our expert engineers.</span>
          </div>
        )}
      </div>
    </div>
  );
}
