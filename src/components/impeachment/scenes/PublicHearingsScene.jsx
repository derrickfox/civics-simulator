import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'dramatic-witnesses':  { icon: '🎭', tags: [{ label: '+Public', color: 'blue' }, { label: '+Evidence', color: 'green' }] },
  'methodical-documents':{ icon: '📁', tags: [{ label: '+Legal', color: 'green' }, { label: '+Evidence', color: 'blue' }] },
  'balanced-hearings':   { icon: '⚖️', tags: [{ label: '+Integrity', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
};

export default function PublicHearingsScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-hearing-stage">
        {/* Hearing room */}
        <div className="im-hearing-room">
          <div className="im-hearing__dais">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="im-hearing__member">
                <div className="im-hearing__head"/>
                <div className="im-hearing__body"/>
              </div>
            ))}
          </div>
          <div className="im-hearing__witness-table">
            <div className="im-witness">
              <div className="im-witness__head"/>
              <div className="im-witness__body"/>
              <div className="im-witness__mic">🎙️</div>
            </div>
          </div>
          <div className="im-hearing__cameras">
            {[0,1].map(i=><div key={i} className="im-camera">📷</div>)}
          </div>
        </div>
        <div className="im-viewer-badge">📺 50M viewers expected</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The cameras are on. 50 million viewers are watching.</h2>
        <p className="ci-story__body">
          Public hearings are your best chance to make the case directly to the American people.
          The witnesses are ready, the documents are prepared, and every word will be replayed for
          months. How you structure these hearings will define public understanding of what happened.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The nation is watching. <em>How do you structure the hearings?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#7f1d1d' }}
                onClick={() => handleSelect(choice)} disabled={!!selectedId}>
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">{meta.tags?.map(t=><span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}</div>
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
