import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'constitutional-argument': { icon: '📜', tags: [{ label: '+Legal', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'political-argument':      { icon: '🗳️', tags: [{ label: '+Public', color: 'blue' }, { label: '−Legal', color: 'red' }] },
  'let-record-speak':        { icon: '📁', tags: [{ label: '+Integrity', color: 'green' }, { label: '+Evidence', color: 'blue' }] },
};

const DEM_SEATS = 24;
const REP_SEATS = 16;

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
        {/* Speaker podium */}
        <div className="im-podium-section">
          <div className="im-podium__figure">
            <div className="im-podium__head"/>
            <div className="im-podium__body"/>
          </div>
          <div className="im-podium__stand"/>
          <div className="im-podium__label">Speaker</div>
        </div>

        {/* House chamber seats — two parties */}
        <div className="im-chamber-seats">
          <div className="im-chamber-seats__label">U.S. HOUSE OF REPRESENTATIVES</div>
          <div className="im-chamber-seats__grid">
            {Array.from({ length: DEM_SEATS }).map((_, i) => (
              <div key={`d${i}`} className="im-seat im-seat--dem"/>
            ))}
            {Array.from({ length: REP_SEATS }).map((_, i) => (
              <div key={`r${i}`} className="im-seat im-seat--rep"/>
            ))}
          </div>
          <div className="im-chamber-seats__legend">
            <span className="im-legend__dem">● Dem</span>
            <span className="im-legend__rep">● Rep</span>
          </div>
        </div>

        {/* Stat column */}
        <div className="im-debate-stats">
          <div className="im-debate-stat">
            <div className="im-debate-stat__num">435</div>
            <div className="im-debate-stat__label">Members voting</div>
          </div>
          <div className="im-debate-stat">
            <div className="im-debate-stat__num">218</div>
            <div className="im-debate-stat__label">Needed to pass</div>
          </div>
          <div className="im-debate-stat im-debate-stat--live">
            <div className="im-debate-stat__num">12h</div>
            <div className="im-debate-stat__label">Floor debate</div>
          </div>
        </div>

        <div className="im-cspan-badge">📺 C-SPAN LIVE</div>
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
