import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'accept-results':      { icon: '✅', tags: [{ label: '+Legal', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'challenge-undercount':{ icon: '📋', tags: [{ label: '+VRA', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'bipartisan-kickoff':  { icon: '🤝', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Legal', color: 'blue' }] },
};

export default function CensusScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-census-stage">
        <div className="im-scene-panel">
          <div style={{ fontSize: 52 }}>📊</div>
          <div className="im-panel-label">2020 CENSUS</div>
          <div className="im-stat-box im-stat-box--hi">
            <div className="im-stat-box__num">+18%</div>
            <div className="im-stat-box__label">State population growth</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">+2</div>
            <div className="im-stat-box__label">New congressional seats</div>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="rd-seat-grid">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className={`rd-seat${i >= 13 ? ' rd-seat--new' : ''}`}>{i >= 13 ? '★' : i + 1}</div>
            ))}
          </div>
          <div className="im-panel-label">15 Congressional Districts</div>
          <div className="im-panel-sub">13 existing + 2 new seats</div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box">
            <div className="im-stat-box__num">10yr</div>
            <div className="im-stat-box__label">Maps in effect until<br/>2030 Census</div>
          </div>
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">All</div>
            <div className="im-stat-box__label">Districts must be<br/>redrawn from scratch</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">≈1%</div>
            <div className="im-stat-box__label">Max allowed population<br/>variance between districts</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The Census is in. Your state gains two seats.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The Census results are certified. <em>How do you begin?</em></h3>
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
