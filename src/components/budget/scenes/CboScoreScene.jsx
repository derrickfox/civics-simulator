import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'adjust-proposal': { icon: '✂️', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'challenge-cbo':   { icon: '⚡', tags: [{ label: '+Public', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
  'dynamic-scoring': { icon: '📈', tags: [{ label: '+Programs', color: 'green' }, { label: '+Economy', color: 'blue' }] },
};

export default function CboScoreScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-cbo">
        {/* CBO building */}
        <div className="bd-cbo-building">
          <div className="bd-cbo__sign">Congressional Budget Office</div>
          <div className="bd-cbo__windows">
            {[0,1,2,3,4,5].map(i => <div key={i} className="bd-cbo__window" />)}
          </div>
        </div>
        {/* Score chart going up/red */}
        <div className="bd-score-chart">
          <div className="bd-score-chart__bar bd-score-chart__bar--bad" />
          <div className="bd-score-chart__label">+$820B over estimate</div>
          <div className="bd-score-chart__arrow">⬆️</div>
        </div>
        {/* Alert */}
        <div className="bd-alert">⚠️ Score: $820B over White House estimate</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">CBO: the budget costs $820 billion more than claimed.</h2>
        <p className="ci-story__body">
          The nonpartisan Congressional Budget Office has scored your proposal — and the number is brutal.
          The White House accounting left out mandatory spending increases, using optimistic growth assumptions
          the CBO doesn't accept. Every budget hawk in Congress is waving this score.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The CBO score is damaging momentum. <em>How do you respond?</em></h3>
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
