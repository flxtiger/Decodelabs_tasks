import React, { useState } from 'react';
import { Activity, CheckCircle, XCircle, Award, ChevronRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary goal of a phishing attack?',
    options: [
      'To install antivirus software.',
      'To steal sensitive information like passwords or credit card numbers.',
      'To speed up your computer.',
      'To encrypt your hard drive.'
    ],
    correct: 1,
    explanation: 'Phishing is a social engineering attack designed to steal user data, including login credentials and credit card numbers.'
  },
  {
    id: 2,
    question: 'Which of the following is a common indicator of a phishing email?',
    options: [
      'Personalized greeting using your full name.',
      'A sense of urgency threatening account suspension.',
      'Links that point to the exact domain of the company.',
      'Digitally signed emails.'
    ],
    correct: 1,
    explanation: 'Attackers often create a false sense of urgency to make the victim act quickly without thinking.'
  },
  {
    id: 3,
    question: 'What is Typosquatting?',
    options: [
      'A spelling mistake in the email body.',
      'Registering a domain name very similar to a popular domain (e.g., g00gle.com).',
      'Sending too many emails at once.',
      'A type of malware.'
    ],
    correct: 1,
    explanation: 'Typosquatting relies on mistakes such as typos made by Internet users when inputting a website address into a web browser.'
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto text-center space-y-8 mt-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-sm p-12 rounded-3xl inline-block shadow-2xl"
        >
          <Award className="w-24 h-24 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">Simulation Complete</h2>
          <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-8">You scored {score} out of {QUESTIONS.length}</p>
          
          <div className="h-1 w-64 mx-auto bg-white/5 rounded-full overflow-hidden mb-8">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                score / QUESTIONS.length > 0.7 ? "bg-green-500" : "bg-blue-500"
              )}
              style={{ width: `${(score / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <button 
            onClick={restart}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> Retake Simulation
          </button>
        </motion.div>
      </div>
    );
  }

  const q = QUESTIONS[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-400" />
            Threat Simulation
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">Test your knowledge against simulated attack scenarios.</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Scenario {currentQuestion + 1} of {QUESTIONS.length}</span>
           <div className="flex gap-1 mt-2">
             {QUESTIONS.map((_, i) => (
               <div key={i} className={cn("h-1 w-8", i <= currentQuestion ? "bg-blue-500" : "bg-white/10")} />
             ))}
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-lg font-bold text-white mb-8 leading-relaxed">{q.question}</h2>
        
        <div className="space-y-4">
          {q.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = q.correct === i;
            const showStatus = isAnswered;

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
                className={cn(
                  "w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all group",
                  !showStatus && isSelected && "bg-blue-500/10 border-blue-500/50",
                  !showStatus && !isSelected && "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10",
                  showStatus && isCorrect && "bg-green-500/10 border-green-500/50 text-green-300",
                  showStatus && isSelected && !isCorrect && "bg-red-500/10 border-red-500/50 text-red-300",
                  showStatus && !isSelected && !isCorrect && "bg-black/20 border-white/5 opacity-50"
                )}
              >
                <span className="text-sm">{opt}</span>
                {showStatus && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
                {showStatus && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-blue-900/10 border border-blue-500/20">
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Analyst Notes</p>
                <p className="text-sm text-gray-300">{q.explanation}</p>
              </div>
              
              <button 
                onClick={handleNext}
                className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
              >
                {currentQuestion < QUESTIONS.length - 1 ? 'Next Scenario' : 'Complete Simulation'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
