import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'accept-ruling':           { icon: '✅', tags: [{ label: '+Public', color: 'green' }, { label: '+Legal', color: 'blue' }] },
  'appeal-scotus':           { icon: '⬆️', tags: [{ label: '−Public', color: 'red' }, { label: '−Legal', color: 'red' }] },
  'redraw-under-supervision':{ icon: '🔧', tags: [{ label: '+Fairness', color: 'green' }, { label: '+Legal', color: 'blue' }] },
};

export default function CourtRulingScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-ruling-stage">
        <div className="im-scene-panel">
          <div style={{ fontSize: 42 }}>🏛️</div>
          <div className="im-panel-label">FEDERAL COURT RULING</div>
          <div className="rd-ruling-doc">
            <div className="rd-ruling-doc__title">MEMORANDUM OPINION</div>
            <div className="rd-ruling-doc__line"/>
            <div className="rd-ruling-doc__line rd-ruling-doc__line--short"/>
            <div className="rd-ruling-doc__finding">Finding: Mixed</div>
            <div className="rd-ruling-doc__line"/>
          </div>
          <div className="im-panel-sub" style={{ marginTop: 6 }}>Some districts upheld,<br/>some under scrutiny</div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-panel-label">DISTRICT-BY-DISTRICT RULING</div>
          <div className="rd-district-results">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className={`rd-district-result rd-district-result--${i < 12 ? 'upheld' : 'challenged'}`}>
                D{i + 1} {i < 12 ? '✓' : '⚠️'}
              </div>
            ))}
          </div>
          <div className="im-panel-sub" style={{ marginTop: 6 }}>12 upheld · 3 under review</div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--hi">
            <div className="im-stat-box__num">Accept</div>
            <div className="im-stat-box__label">Fastest path to<br/>a final, stable map</div>
          </div>
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">SCOTUS</div>
            <div className="im-stat-box__label">Appeal could delay<br/>implementation by years</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">Special<br/>Master</div>
            <div className="im-stat-box__label">Court-supervised redraw<br/>preserves some input</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The court has ruled. Every decision from the past year comes down to this.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The court has spoken. <em>What do you do next?</em></h3>
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
