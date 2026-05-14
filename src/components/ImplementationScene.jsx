import React, { useState, useEffect } from 'react';

export default function ImplementationScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSelect = (choice) => {
    if (selectedId) return;
    setSelectedId(choice.id);
    setTimeout(() => onChoiceSelect(choice), 300);
  };

  return (
    <div className="im-scene">
      {/* ── Animated School Zone Construction Scene ── */}
      <div className="im-scene__stage">
        {/* Bright daytime sky */}
        <div className="im-sky">
          <div className="im-sun" />
          <div className="im-cloud im-cloud--1" />
          <div className="im-cloud im-cloud--2" />
        </div>

        {/* School building (same as Stage 1 but transformed) */}
        <div className="im-school">
          <div className="im-school__roof" />
          <div className="im-school__body">
            <div className="im-school__windows">
              <div className="im-school__window" />
              <div className="im-school__window" />
              <div className="im-school__window" />
            </div>
            <div className="im-school__door" />
          </div>
          <div className="im-school__sign">🏫 Lincoln Middle School</div>
          <div className="im-flag">🇺🇸</div>
        </div>

        {/* New SCHOOL ZONE sign (being installed) */}
        <div className="im-new-sign">
          <div className="im-new-sign__post" />
          <div className="im-new-sign__face">
            <span>🚸 SCHOOL</span>
            <span>ZONE</span>
            <span className="im-new-sign__speed">20</span>
          </div>
          <div className="im-new-sign__new-badge">NEW!</div>
        </div>

        {/* Road with fresh crosswalk */}
        <div className="im-road">
          {/* Fresh bright crosswalk stripes */}
          <div className="im-crosswalk">
            {[0,1,2,3,4].map(i => <div key={i} className="im-crosswalk__stripe" />)}
          </div>

          {/* Paint roller animation */}
          <div className="im-roller">🖌️</div>
        </div>

        {/* Sidewalk with workers and happy students */}
        <div className="im-sidewalk">
          {/* Construction worker */}
          <div className="im-figure im-worker">
            <div className="im-figure__head im-figure__head--hat" />
            <div className="im-figure__body im-figure__body--orange" />
            <div className="im-worker__tool">🔨</div>
          </div>

          {/* Happy student */}
          <div className="im-figure im-student">
            <div className="im-figure__head" />
            <div className="im-figure__body im-figure__body--blue" />
            <div className="im-student__cheer">🎉</div>
          </div>

          {/* Smiling parent */}
          <div className="im-figure im-parent">
            <div className="im-figure__head" />
            <div className="im-figure__body im-figure__body--red" />
            <div className="im-parent__bubble">😊</div>
          </div>
        </div>

        {/* Construction truck */}
        <div className="im-truck">🚛</div>

        {/* Progress clipboard */}
        <div className="im-progress">
          <div className="im-progress__header">📋 Progress</div>
          <div className="im-progress__bar-bg">
            <div className="im-progress__bar-fill" />
          </div>
          <div className="im-progress__pct">78%</div>
        </div>
      </div>

      {/* ── Story Text ── */}
      <div className={`im-story${phase >= 1 ? ' im-story--visible' : ''}`}>
        <h2 className="im-story__headline">The law is real. Now make it work.</h2>
        <p className="im-story__body">
          Passing a law is just the beginning. How government agencies implement it —
          whether it's fully funded, actively monitored, and held accountable — determines
          whether kids are actually safer. Your work isn't done yet.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`im-lesson${phase >= 2 ? ' im-lesson--visible' : ''}`}>
        <span className="im-lesson__icon">🚀</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`im-choices${phase >= 3 ? ' im-choices--visible' : ''}`}>
        <h3 className="im-choices__prompt">
          How do you implement it? <em>Choose your approach.</em>
        </h3>
        <div className="im-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`im-choice${selectedId === choice.id ? ' im-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' im-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="im-choice__icon">{meta.icon}</div>
                <div className="im-choice__body">
                  <div className="im-choice__label">{choice.label}</div>
                  <div className="im-choice__desc">{choice.description}</div>
                </div>
                <div className="im-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="im-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'full-funding': {
    icon: '💵',
    tags: [
      { label: '−Impl. Difficulty', color: 'green' },
      { label: '+Public Support',   color: 'green' },
      { label: '+Budget Concern',   color: 'red'   },
    ],
  },
  'oversight-committee': {
    icon: '👁️',
    tags: [
      { label: '−Impl. Difficulty', color: 'green' },
      { label: '+Media Attention',  color: 'blue'  },
    ],
  },
  'minimal-oversight': {
    icon: '🤷',
    tags: [
      { label: '+Impl. Difficulty', color: 'red' },
      { label: '−Public Support',   color: 'red' },
      { label: 'Risk of Delays',    color: 'red' },
    ],
  },
};
