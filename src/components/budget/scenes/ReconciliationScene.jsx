import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'drug-pricing':    { icon: '💊', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'means-test-medicare': { icon: '📋', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'payment-shifts':  { icon: '📅', tags: [{ label: '+Passage', color: 'blue' }, { label: '−Deficit', color: 'red' }] },
};

export default function ReconciliationScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSelect = (choice) => {
    if (selectedId) return;
    setSelectedId(choice.id);
    setTimeout(() => onChoiceSelect(choice), 300);
  };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage bg-budget-reconcile">
        {/* Medicare/Social Security icons */}
        <div className="bd-mandatory-icons">
          <div className="bd-mand-icon">
            <span className="bd-mand-icon__emoji">💊</span>
            <span className="bd-mand-icon__label">Medicare</span>
            <span className="bd-mand-icon__pct">15% of budget</span>
          </div>
          <div className="bd-mand-icon">
            <span className="bd-mand-icon__emoji">👴</span>
            <span className="bd-mand-icon__label">Social Security</span>
            <span className="bd-mand-icon__pct">23% of budget</span>
          </div>
          <div className="bd-mand-icon">
            <span className="bd-mand-icon__emoji">🏥</span>
            <span className="bd-mand-icon__label">Medicaid</span>
            <span className="bd-mand-icon__pct">10% of budget</span>
          </div>
        </div>
        {/* Savings target */}
        <div className="bd-savings-target">
          <span>🎯 Target: <strong>$600B</strong> in 10-year mandatory savings</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Medicare, Medicaid, Social Security — the big numbers.</h2>
        <p className="ci-story__body">
          Mandatory programs make up two-thirds of the entire federal budget. The reconciliation
          bill needs $600 billion in 10-year savings from these programs to hit deficit targets.
          These decisions affect seniors, low-income families, and children across America.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">$600B in mandatory savings needed. <em>Where does it come from?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#065f46' }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">
                  {meta.tags?.map(t => <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}
                </div>
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
