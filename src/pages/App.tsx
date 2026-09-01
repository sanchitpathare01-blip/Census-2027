import React from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stage1Safety from '../components/Stage1Safety';
import Stage2Understand from '../components/Stage2Understand';
import Stage3GetReady from '../components/Stage3GetReady';
import AskCensusHub from '../components/AskCensusHub';
import Footer from '../components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-navy text-white selection:bg-accent-blue/30 selection:text-white">
      <AnimatedBackground />
      
      <Header />
      
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        
        <div className="flex flex-col gap-12 pb-16">
          <Stage1Safety />
          <Stage2Understand />
          <Stage3GetReady />
          <AskCensusHub />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
