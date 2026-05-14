import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'vigorous-defense':    { icon: '⚔️', tags: [{ label: '+Legal', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
  'concede-one-district':{ icon: '🔧', tags: [{ label: '+Legal', color: 'green' }, { label: '+VRA', color: 'blue' }] },
  'consent-decree':      { icon: '🤝', tags: [{ label: '+VRA', color: 'green' }, { label: '+Legal', color: 'blue' }] },
};

export default function LegalChallengeScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  const suits = [
    { party: 'Minority Party', claim: 'Partisan gerrymandering', court: 'State court' },
    { party: 'Civil Rights Orgs', claim: 'VRA § 2 violation', court: 'Federal court' },
    { party: 'Suburban County', claim: 'Community split illegally', court: 'Federal court' },
  ];

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-legal-stage">
        <div className="im-scene-panel">
          <div style={{ fontSize: 42 }}>⚖️</div>
          <div className="im-panel-label">LAWSUITS FILED</div>
          {suits.map((s, i) => (
            <div key={i} className="rd-suit-row">
              <div className="rd-suit-row__party">{s.party}</div>
              <div className="rd-suit-row__claim">{s.claim}</div>
              <div className="rd-suit-row__court">{s.court}</div>
            </div>
          ))}
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-cj-big">
            <div className="im-cj-big__head"/>
            <div className="im-cj-big__robe"/>
          </div>
          <div className="im-panel-label">Federal District Court</div>
          <div className="rd-trial-calendar">
            <div className="rd-trial-calendar__label">Trial date</div>
            <div className="rd-trial-calendar__date">8 months before<br/>next primary</div>
          </div>
          <div className="im-stat-box im-stat-box--danger" style={{ marginTop: 8 }}>
            <div className="im-stat-box__num">$4M</div>
            <div className="im-stat-box__label">Estimated legal costs<br/>if fully litigated</div>
          </div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">Rucho</div>
            <div className="im-stat-box__label">Fed courts closed<br/>to partisan claims</div>
          </div>
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">State</div>
            <div className="im-stat-box__label">Courts can still rule<br/>on partisan maps</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">100%</div>
            <div className="im-stat-box__label">Of post-2010 maps<br/>faced legal challenge</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Three lawsuits filed. This was expected. How you fight determines whether you win.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The lawsuits are filed. <em>What's your legal strategy?</em></h3>
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
