import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CommunityHighlight from './components/CommunityHighlight';
import SubmissionForm from './components/SubmissionForm';
import LaunchPhase from './components/LaunchPhase';
import { Product } from './types';

// Set launch date to 35 days from now
const LAUNCH_DATE = new Date();
LAUNCH_DATE.setDate(LAUNCH_DATE.getDate() + 35);

function App() {
  const [showSubmission, setShowSubmission] = useState(false);

  const handleSubmission = (submission: Omit<Product, 'id'>) => {
    console.log('New submission:', submission);
    setShowSubmission(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12">
          <CommunityHighlight onShare={() => setShowSubmission(true)} />
          <LaunchPhase launchDate={LAUNCH_DATE} />
        </div>

        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;