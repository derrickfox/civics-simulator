import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'robust-hearings':  { icon: '🎤', tags: [{ label: '+Public', color: 'green' }, { label: '+Legal', color: 'blue' }] },
  'fast-track':       { icon: '⏩', tags: [{ label: '−Public', color: 'red' }, { label: '−Legal', color: 'red' }] },
  'community-maps':   { icon: '🗺️', tags: [{ label: '+Fairness', color: 'green' }, { label: '+VRA', color: 'blue' }] },
};

export default function PublicHearingsScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-hearings-stage">
        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--hi">
            <div className="im-stat-box__num">20</div>
            <div className="im-stat-box__label">Hearings statewide<br/>(robust approach)</div>
          </div>
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">4</div>
            <div className="im-stat-box__label">Hearings minimum<br/>(fast-track approach)</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">4,000</div>
            <div className="im-stat-box__label">Pages of public record<br/>courts will review</div>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-hdais">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="im-hdais__member">
                <div className="im-hdais__head"/>
                <div className="im-hdais__body"/>
              </div>
            ))}
          </div>
          <div className="im-panel-label">Committee Hearing</div>
          <div className="im-hwitness" style={{ marginTop: 8 }}>
            <div className="im-hwitness__figure">
              <div className="im-hwitness__head"/>
              <div className="im-hwitness__body"/>
            </div>
            <div className="im-hwitness__mic">🎙️</div>
            <div className="im-hwitness__label">Community testimony</div>
          </div>
        </div>

        <div className="im-scene-panel">
          <div style={{ fontSize: 42 }}>📋</div>
          <div className="im-panel-label">PUBLIC RECORD</div>
          <div className="im-panel-sub">Courts scrutinize whether community<br/>input was genuinely considered</div>
          <div className="im-stat-box im-stat-box--warn" style={{ marginTop: 8 }}>
            <div className="im-stat-box__num">47</div>
            <div className="im-stat-box__label">Community maps<br/>could be submitted</div>
          </div>
        </div>

        <div className="im-viewer-badge" style={{ background: '#14532d' }}>📋 Public comment period open</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The public gets its say — and courts will read every word.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The community wants to be heard. <em>How do you run the hearings?</em></h3>
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
