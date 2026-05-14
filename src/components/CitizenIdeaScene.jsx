import React, { useState, useEffect } from 'react';

export default function CitizenIdeaScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0); // 0=scene, 1=story, 2=lesson, 3=choices
  const [selectedId, setSelectedId] = useState(null);

  // Cascade phase reveals
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
    <div className="ci-scene">
      {/* ── Animated School Zone Scene ── */}
      <div className="ci-scene__stage">
        {/* Sky */}
        <div className="ci-sky">
          <div className="ci-sun" />
          <div className="ci-cloud ci-cloud--1" />
          <div className="ci-cloud ci-cloud--2" />
        </div>

        {/* School building */}
        <div className="ci-school">
          <div className="ci-school__roof" />
          <div className="ci-school__body">
            <div className="ci-school__windows">
              <div className="ci-school__window" />
              <div className="ci-school__window" />
              <div className="ci-school__window" />
            </div>
            <div className="ci-school__door" />
          </div>
          <div className="ci-school__sign">🏫 Lincoln Middle School</div>
          <div className="ci-flag">🇺🇸</div>
        </div>

        {/* Road */}
        <div className="ci-road">
          <div className="ci-road__dash ci-road__dash--1" />
          <div className="ci-road__dash ci-road__dash--2" />
          <div className="ci-road__dash ci-road__dash--3" />

          {/* Crosswalk */}
          <div className="ci-crosswalk">
            {[0,1,2,3,4].map(i => <div key={i} className="ci-crosswalk__stripe" />)}
          </div>

          {/* Speeding cars */}
          <div className="ci-car ci-car--1">🚗</div>
          <div className="ci-car ci-car--2">🚙</div>
          <div className="ci-car ci-car--3">🚕</div>

          {/* Speed limit sign */}
          <div className="ci-sign">
            <div className="ci-sign__post" />
            <div className="ci-sign__face">
              <span>SCHOOL</span>
              <span>ZONE</span>
              <span className="ci-sign__speed">25</span>
            </div>
          </div>
        </div>

        {/* Sidewalk & characters */}
        <div className="ci-sidewalk">
          {/* Waiting student */}
          <div className="ci-figure ci-student">
            <div className="ci-figure__head" />
            <div className="ci-figure__body ci-figure__body--blue" />
            <div className="ci-figure__bag">🎒</div>
          </div>

          {/* Worried parent */}
          <div className="ci-figure ci-parent">
            <div className="ci-figure__head" />
            <div className="ci-figure__body ci-figure__body--red" />
            <div className="ci-parent__bubble">😟</div>
          </div>

          {/* Danger flash over crosswalk */}
          <div className="ci-danger">⚠️</div>
        </div>
      </div>

      {/* ── Story Text ── */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">
          A parent sees something dangerous.
        </h2>
        <p className="ci-story__body">
          Every morning, students at Lincoln Middle School race across a 4-lane road
          with no signal and no protection. Drivers ignore the 25 mph limit.
          Near-misses are routine. Nobody has done anything — yet.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">📜</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          You're that parent. <em>What's your first move?</em>
        </h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && (
                  <div className="ci-choice__check">✓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Visual metadata for each choice card
const choiceMeta = {
  petition: {
    icon: '📋',
    tags: [
      { label: '+Public Support', color: 'green' },
      { label: '+Media Attention', color: 'blue' },
    ],
  },
  'town-hall': {
    icon: '🎤',
    tags: [
      { label: '+Public Support', color: 'green' },
      { label: '+Committee Support', color: 'purple' },
    ],
  },
  'direct-contact': {
    icon: '✉️',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Budget Concern', color: 'green' },
    ],
  },
};
