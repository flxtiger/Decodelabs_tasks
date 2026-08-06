import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="mt-16 max-w-5xl mx-auto px-6 text-slate-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-white mb-3">Understanding Password Security</h2>
        <p className="text-slate-400 text-lg">Key concepts for protecting your digital identity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-3 text-blue-400">What is Password Strength?</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            Password strength is a measure of the effectiveness of a password against guessing or brute-force attacks. It depends on length, complexity, and unpredictability.
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-3 text-blue-400">Why strong passwords matter?</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            Weak passwords are the leading cause of data breaches. A strong password acts as the first line of defense, preventing unauthorized access to your sensitive personal and financial data.
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-3 text-blue-400">What is a brute force attack?</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            A brute force attack is a hacking method that uses trial and error to crack passwords, login credentials, and encryption keys by iterating through possible combinations until the correct one is found.
          </p>
        </div>
      </div>
    </section>
  );
};
