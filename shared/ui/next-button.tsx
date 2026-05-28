import React from 'react';

interface NextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const NextButton: React.FC<NextButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button 
      className={`w-full bg-[#34c759] hover:bg-[#2eaa4a] text-white rounded-[2rem] py-4 px-6 flex items-center justify-center text-[1.8rem] font-bold transition-all active:scale-[0.98] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#34c759]/50 ${className}`}
      style={{ fontFamily: 'var(--font-playfair)' }}
      {...props}
    >
      {children}
    </button>
  );
};
