import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'partisan-gerrymander': { icon: '🐙', tags: [{ label: '−Fairness', color: 'red' }, { label: '−Legal', color: 'red' }] },
  'competitive-map':      { icon: '⚖️', tags: [{ label: '+Fairness', color: 'green' }, { label: '+Competitive', color: 'blue' }] },
  'incumbent-protection': { icon: '🛡️', tags: [{ label: '+Bipartisan', color: 'blue' }, { label: '−Competitive', color: 'red' }] },
};

export default function FirstDraftScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-draft-stage">
        <div className="im-scene-panel">
          {/* AI_CHANGE:
              Tool: Claude Code
              Model: Claude Opus 4.7
              Timestamp: 2026-05-25T19:58:18-04:00
              Purpose: Tag the pencil emoji so CSS can drive a continuous "writing" wiggle animation.
              Reason: User asked for more playful graphics across scenes via animation; this is the first scene in the pilot. */}
          <div className="rd-draft-pencil">✏️</div>
          <div className="im-panel-label">GERRYMANDERING TACTICS</div>
          <div className="rd-gerry-tactic">
            <div className="rd-gerry-tactic__name">PACKING</div>
            <div className="rd-gerry-tactic__desc">Concentrate opposition<br/>voters in few districts</div>
            <div className="rd-gerry-visual rd-gerry-visual--pack">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className={`rd-gv-dot ${i < 7 ? 'rd-gv-dot--opp' : 'rd-gv-dot--you'}`}/>)}
            </div>
          </div>
          <div className="rd-gerry-tactic">
            <div className="rd-gerry-tactic__name">CRACKING</div>
            <div className="rd-gerry-tactic__desc">Split opposition across<br/>multiple districts</div>
            <div className="rd-gerry-visual rd-gerry-visual--crack">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className={`rd-gv-dot ${i % 3 === 0 ? 'rd-gv-dot--opp' : 'rd-gv-dot--you'}`}/>)}
            </div>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="rd-map-preview rd-map-preview--large">
            <div className="rd-map-preview__title">FIRST DRAFT MAP</div>
            {[0,1,2,3,4].map(i => (
              <div key={i} className="rd-map-row">
                {[0,1,2].map(j => (
                  <div key={j} className={`rd-map-cell rd-map-cell--${(i + j) % 3 === 0 ? 'dem' : 'rep'}`}/>
                ))}
              </div>
            ))}
          </div>
          <div className="im-panel-label">54-46 state, vote split</div>
          <div className="im-panel-sub">How lines are drawn determines outcomes</div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">10yr</div>
            <div className="im-stat-box__label">This map governs<br/>elections until 2034</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">54%</div>
            <div className="im-stat-box__label">Your party's statewide<br/>vote share</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">15</div>
            <div className="im-stat-box__label">Seats to allocate —<br/>how many can you win?</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The pen hits the map. Every line is a political decision.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The map is blank. <em>How do you draw the first lines?</em></h3>
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
