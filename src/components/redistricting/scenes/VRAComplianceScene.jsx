import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'maximize-minority': { icon: '✊', tags: [{ label: '+VRA', color: 'green' }, { label: '+Fairness', color: 'blue' }] },
  'influence-districts':{ icon: '🗺️', tags: [{ label: '+Competitive', color: 'green' }, { label: '+Fairness', color: 'blue' }] },
  'minimal-vra':       { icon: '⚠️', tags: [{ label: '−VRA', color: 'red' }, { label: '−Legal', color: 'red' }] },
};

export default function VRAComplianceScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  const communities = [
    { name: 'Black voters', pct: 22, area: 'Metro areas', color: '#3b82f6' },
    { name: 'Latino voters', pct: 18, area: '3 counties', color: '#8b5cf6' },
    { name: 'Native American', pct: 8, area: 'Rural north', color: '#f59e0b' },
  ];

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-vra-stage">
        <div className="im-scene-panel">
          <div style={{ fontSize: 42 }}>📜</div>
          <div className="im-panel-label">VOTING RIGHTS ACT</div>
          <div className="im-stat-box im-stat-box--hi">
            <div className="im-stat-box__num">§2</div>
            <div className="im-stat-box__label">Prohibits vote dilution<br/>based on race</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">Gingles</div>
            <div className="im-stat-box__label">3-part test: size,<br/>cohesion, bloc voting</div>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-panel-label">MINORITY COMMUNITIES</div>
          {communities.map(c => (
            <div key={c.name} className="rd-community-row">
              <div className="rd-community-row__bar-bg">
                <div className="rd-community-row__bar" style={{ width: `${c.pct * 4}%`, background: c.color }}/>
              </div>
              <div className="rd-community-row__info">
                <span className="rd-community-row__name">{c.name}</span>
                <span className="rd-community-row__pct">{c.pct}% of state</span>
                <span className="rd-community-row__area">{c.area}</span>
              </div>
            </div>
          ))}
          <div className="im-panel-sub" style={{ marginTop: 8 }}>Must have meaningful opportunity<br/>to elect representatives</div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">Shaw</div>
            <div className="im-stat-box__label">v. Reno — Race cannot be<br/>the "predominant factor"<br/>in drawing lines</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">50%+</div>
            <div className="im-stat-box__label">Majority-minority district<br/>threshold</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The Voting Rights Act requires meaningful minority representation.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">Minority communities need representation. <em>How do you draw the lines?</em></h3>
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
