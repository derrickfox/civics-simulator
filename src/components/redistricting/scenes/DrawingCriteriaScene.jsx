import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'compactness-first': { icon: '📐', tags: [{ label: '+Legal', color: 'green' }, { label: '+Fairness', color: 'blue' }] },
  'communities-first': { icon: '🏘️', tags: [{ label: '+VRA', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'algorithmic-blind': { icon: '💻', tags: [{ label: '+Fairness', color: 'green' }, { label: '+Competitive', color: 'blue' }] },
};

export default function DrawingCriteriaScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  const criteria = ['Equal Population', 'Contiguous', 'Compact', 'VRA Compliance', 'Communities of Interest', 'Partisan Fairness'];
  const required = [true, true, false, true, false, false];

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-criteria-stage">
        <div className="im-scene-panel">
          <div style={{ fontSize: 42 }}>📐</div>
          <div className="im-panel-label">LEGAL REQUIREMENTS</div>
          {criteria.map((c, i) => (
            <div key={c} className={`rd-criteria-item${required[i] ? ' rd-criteria-item--required' : ''}`}>
              <span>{required[i] ? '🔴' : '🟡'}</span>
              <span>{c}</span>
              <span style={{ fontSize: 9, color: required[i] ? '#dc2626' : '#92400e' }}>{required[i] ? 'Required' : 'Optional'}</span>
            </div>
          ))}
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="rd-map-preview">
            <div className="rd-map-preview__title">DISTRICT MAP</div>
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`rd-map-row`}>
                {[0,1,2].map(j => (
                  <div key={j} className={`rd-map-cell rd-map-cell--${(i * 3 + j) % 5}`}/>
                ))}
              </div>
            ))}
            <div className="rd-map-preview__label">Criteria determine how lines are drawn</div>
          </div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">Rucho</div>
            <div className="im-stat-box__label">v. Common Cause (2019)<br/>Fed courts can't rule on<br/>partisan gerrymanders</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">State</div>
            <div className="im-stat-box__label">Courts CAN strike down<br/>partisan gerrymanders<br/>under state constitutions</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The criteria you set now become your legal defense later.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The committee needs guiding principles. <em>What criteria come first?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#14532d' }}
                onClick={() => handleSelect(choice)} disabled={!!selectedId}>
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">{meta.tags?.map(t => <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}</div>
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
