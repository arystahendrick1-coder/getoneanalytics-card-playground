import React, { useState } from 'react';

const DEMO_ACCOUNTS = [
  { name: 'Arysta Hendrik', email: 'ah@gmail.com', password: '000000', firstName: 'Arysta', lastName: 'Hendrik' },
  { name: 'Hospio Team', email: 'marketing@example.com', password: '000000', firstName: 'Hospio', lastName: 'Team' },
];

export default function Home({ onLogin }) {
  const [view, setView] = useState('home');
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupProperty, setSignupProperty] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [success, setSuccess] = useState('');

  const submitLogin = (event) => {
    event.preventDefault();
    const account = DEMO_ACCOUNTS.find((item) =>
      [item.name.toLowerCase(), item.email.toLowerCase()].includes(loginName.trim().toLowerCase()) && item.password === password
    );
    if (!account) {
      setError('Account name/email or password is incorrect.');
      return;
    }
    setError('');
    onLogin(account);
  };

  return (
    <div className="goa-home-shell min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between font-sans">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white">
        <div className="text-xl font-bold text-blue-600 tracking-wide cursor-pointer" onClick={() => setView('home')}>GetOneAnalytics</div>
        <div className="flex items-center gap-6 text-sm text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition font-medium">Features</a>
          <button onClick={() => { setView('login'); setError(''); }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm">Login</button>
        </div>
      </header>

      {view === 'home' && <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl md:text-[42px] font-extrabold text-slate-900 leading-tight mb-6">All Your Digital Marketing Analytics in One Single Dashboard</h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">Unify Google Analytics 4, Meta Ads, and multi-channel performance data. Stop logging into multiple portals and start making data-driven marketing decisions.</p>
        <button onClick={() => setView('signup')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg">Get Started</button>
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full text-left">
          {[
            ['Google Analytics Integration', 'Automated traffic, conversions, and user journey insights synced directly via official Google OAuth APIs.'],
            ['Meta Ads Performance', 'Track ad spend, cost per result, click-through rates, reach and impression metrics across Facebook & Instagram seamlessly.'],
            ['Unified Reporting', 'Export clean, client-ready marketing performance summaries without spending hours on manual spreadsheets.'],
          ].map(([title, desc]) => <div key={title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><h3 className="text-blue-600 font-semibold mb-2">{title}</h3><p className="text-slate-600 text-xs leading-relaxed">{desc}</p></div>)}
        </div>
      </main>}

      {view === 'login' && <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-500 mb-6">Log in to access your analytics dashboard.</p>
          <form onSubmit={submitLogin} className="space-y-4">
            <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Account Name or Email</label><input value={loginName} onChange={e => setLoginName(e.target.value)} placeholder="Arysta Hendrik or Hospio Team" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600" required /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600" required /></div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm">Log In</button>
          </form>
          <div className="text-center mt-6 text-xs text-slate-600">Don't have an account? <button onClick={() => setView('signup')} className="text-blue-600 font-semibold hover:underline">Sign up</button></div>
          <div className="text-center mt-6"><button onClick={() => setView('home')} className="text-xs text-slate-500 hover:text-blue-600">← Back to Home</button></div>
        </div>
      </main>}

      {view === 'signup' && <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Start your free 38-day trial</h2>
          <p className="text-xs text-slate-500 mb-6">No credit card required · Automatically registered as Admin</p>
          <form onSubmit={e => { e.preventDefault(); setSuccess('Sign Up is still in testing and is not connected to the database yet.'); }} className="space-y-3">
            <div><label className="block text-xs font-semibold mb-1.5">First Name</label><input value={signupFirstName} onChange={e=>setSignupFirstName(e.target.value)} placeholder="Enter first name" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" required /></div>
            <div><label className="block text-xs font-semibold mb-1.5">Last Name</label><input value={signupLastName} onChange={e=>setSignupLastName(e.target.value)} placeholder="Enter last name" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" required /></div>
            <div><label className="block text-xs font-semibold mb-1.5">Property Name</label><input value={signupProperty} onChange={e=>setSignupProperty(e.target.value)} placeholder="Enter Company Name" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" required /></div>
            <div><label className="block text-xs font-semibold mb-1.5">Email</label><input type="email" value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} placeholder="Enter email" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" required /></div>
            <div><label className="block text-xs font-semibold mb-1.5">Password</label><input type="password" value={signupPassword} onChange={e=>setSignupPassword(e.target.value)} placeholder="Create password" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" required /></div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm">Create Account</button>
          </form>
          <div className="flex items-center gap-3 my-4 text-xs text-slate-400"><span className="h-px bg-slate-200 flex-1"/>OR<span className="h-px bg-slate-200 flex-1"/></div>
          <button onClick={() => setSuccess('Google Sign Up is still in testing.')} className="w-full border border-slate-300 text-slate-700 font-medium py-2.5 rounded-lg text-sm">Sign up with Google</button>
          {success && <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-3 mt-4">{success}</p>}
          <div className="text-center mt-6 text-xs text-slate-600">Already have an account? <button onClick={() => setView('login')} className="text-blue-600 font-semibold">Log in</button></div>
          <div className="text-center mt-6"><button onClick={() => setView('home')} className="text-xs text-slate-500">← Back to Home</button></div>
        </div>
      </main>}

      <footer className="py-8 text-center border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col gap-3"><div className="flex justify-center gap-6"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div><p>© 2026 GetOneAnalytics. All rights reserved.</p><p className="max-w-2xl mx-auto px-4 text-slate-400">GetOneAnalytics respects user privacy and complies with Google API Services User Data Policy and Meta Developer Terms.</p></footer>
    </div>
  );
}
