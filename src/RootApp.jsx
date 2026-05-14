import React, { useState } from 'react';
import ModuleSelector from './ModuleSelector';
import App from './App';
import CourtApp from './components/court/CourtApp';
import ElectionApp from './components/election/ElectionApp';
import BudgetApp from './components/budget/BudgetApp';
import ImpeachmentApp from './components/impeachment/ImpeachmentApp';
import RedistrictingApp from './components/redistricting/RedistrictingApp';

export default function RootApp() {
  const [module, setModule] = useState(null); // null | 'bill' | 'court' | 'election' | 'budget' | 'impeachment' | 'redistricting'

  if (module === 'bill') {
    return <App onBack={() => setModule(null)} />;
  }

  if (module === 'court') {
    return <CourtApp onBack={() => setModule(null)} />;
  }

  if (module === 'election') {
    return <ElectionApp onBack={() => setModule(null)} />;
  }

  if (module === 'budget') {
    return <BudgetApp onBack={() => setModule(null)} />;
  }

  if (module === 'impeachment') {
    return <ImpeachmentApp onBack={() => setModule(null)} />;
  }

  if (module === 'redistricting') {
    return <RedistrictingApp onBack={() => setModule(null)} />;
  }

  return <ModuleSelector onSelect={setModule} />;
}
