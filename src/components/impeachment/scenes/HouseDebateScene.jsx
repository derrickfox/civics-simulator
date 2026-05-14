import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'constitutional-argument': { icon: '📜', tags: [{ label: '+Legal', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'political-argument':      { icon: '🗳️', tags: [{ label: '+Public', color: 'blue' }, { label: '−Legal', color: 'red' }] },
  'let-record-speak':        { icon: '📁', tags: [{ label: '+Integrity', color: 'green' }, { label: '+Evidence', color: 'blue' }] },
};

export default function HouseDebateScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-debate-stage">
        {/* House floor */}
        <div className="im-house-floor">
          <div className="im-house__speaker-podium">
            <div className="im-speaker__figure">
              <div className="im-speaker__head"/>
              <div className="im-speaker__body"/>
            </div>
            <div className="im-speaker__podium-stand"/>
          </div>
          <div className="im-house__seats">
            {[0,1,2,3,4,5,6,7].map(i => (
              <div key={i} className={`im-house__seat im-house__seat--${i % 2 === 0 ? 'dem' : 'rep'}`}>
                <div className="im-house__head"/>
              </div>
            ))}
          </div>
          <div className="im-house__nameplate">U.S. HOUSE OF REPRESENTATIVES</div>
        </div>
        {/* C-SPAN badge */}
        <div className="im-cspan-badge">📺 C-SPAN LIVE</div>
        {/* Timer */}
        <div className="im-debate-timer">⏱️ 12 hours of debate</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Every word will be in the Congressional Record forever.</h2>
        <p className="ci-story__body">
          The full House floor debate has opened. Every member gets time to speak. The speeches will
          be replayed in Senate campaign ads for years. Two moderates from swing districts are still
          undecided on their final vote. How you frame the debate argument could bring them aboard —
          or push them away.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The floor is yours. <em>How do you lead the debate?</em></h3>
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
