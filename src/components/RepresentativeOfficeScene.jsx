import React, { useState, useEffect } from 'react';

export default function RepresentativeOfficeScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSelect = (choice) => {
    if (selectedId) return;
    setSelectedId(choice.id);
    setTimeout(() => onChoiceSelect(choice), 300);
  };

  return (
    <div className="ro-scene">

      {/* ── Animated Office Scene ── */}
      <div className="ro-scene__stage">

        {/* Back wall */}
        <div className="ro-wall" />

        {/* Window with Capitol view */}
        <div className="ro-window">
          <div className="ro-window__sky" />
          <div className="ro-window__clouds">
            <div className="ro-wcloud ro-wcloud--1" />
            <div className="ro-wcloud ro-wcloud--2" />
          </div>
          <div className="ro-capitol">
            <div className="ro-capitol__dome" />
            <div className="ro-capitol__drum" />
            <div className="ro-capitol__body" />
            <div className="ro-capitol__steps" />
          </div>
          <div className="ro-window__frame" />
          <div className="ro-window__cross-h" />
          <div className="ro-window__cross-v" />
        </div>

        {/* Flag */}
        <div className="ro-flag-pole">
          <div className="ro-flag-pole__rod" />
          <div className="ro-flag-pole__flag">🇺🇸</div>
        </div>

        {/* Bookshelf */}
        <div className="ro-shelf">
          <div className="ro-shelf__plank" />
          {['#e05', '#06c', '#e80', '#5a5', '#a35', '#36a'].map((c, i) => (
            <div key={i} className="ro-book" style={{ background: c, height: `${28 + (i % 3) * 6}px` }} />
          ))}
        </div>

        {/* Framed motto */}
        <div className="ro-frame">
          <div className="ro-frame__inner">
            <span>"Of the people,</span>
            <span>by the people."</span>
          </div>
        </div>

        {/* Floor */}
        <div className="ro-floor" />

        {/* Desk */}
        <div className="ro-desk">
          <div className="ro-desk__surface">
            {/* Nameplate */}
            <div className="ro-nameplate">Rep. A. Johnson</div>
            {/* Papers stack */}
            <div className="ro-papers">
              <div className="ro-paper ro-paper--3" />
              <div className="ro-paper ro-paper--2" />
              <div className="ro-paper ro-paper--1">
                <div className="ro-paper__lines">
                  {[0,1,2,3].map(i => <div key={i} className="ro-paper__line" />)}
                </div>
              </div>
            </div>
            {/* Bill document sliding in */}
            <div className="ro-bill-doc">
              <div className="ro-bill-doc__header">📋 H.B. 2847</div>
              <div className="ro-bill-doc__title">Safe Crosswalks Near Schools Act</div>
            </div>
            {/* Pen */}
            <div className="ro-pen">✒️</div>
          </div>
          <div className="ro-desk__leg ro-desk__leg--l" />
          <div className="ro-desk__leg ro-desk__leg--r" />
        </div>

        {/* Representative character (behind desk) */}
        <div className="ro-figure ro-rep">
          <div className="ro-figure__head" />
          <div className="ro-figure__body ro-figure__body--suit" />
          <div className="ro-figure__arms" />
          {/* Speech bubble */}
          <div className="ro-bubble ro-rep-bubble">
            I'll sponsor it!
          </div>
        </div>

        {/* Citizen character (in front of desk) */}
        <div className="ro-figure ro-citizen">
          <div className="ro-figure__head" />
          <div className="ro-figure__body ro-figure__body--casual" />
          <div className="ro-figure__arms" />
          <div className="ro-bubble ro-citizen-bubble">
            Our kids need this. 🙏
          </div>
        </div>

        {/* Handshake effect */}
        <div className="ro-handshake">🤝</div>

      </div>

      {/* ── Story ── */}
      <div className={`ro-story${phase >= 1 ? ' ro-story--visible' : ''}`}>
        <h2 className="ro-story__headline">Your idea just got a powerful ally.</h2>
        <p className="ro-story__body">
          Representative Johnson has agreed to sponsor the bill. But getting a sponsor
          is just step one. How you launch this bill — who you bring in, how loudly you
          announce it — will shape the political battle ahead.
        </p>
      </div>

      {/* ── Lesson ── */}
      <div className={`ro-lesson${phase >= 2 ? ' ro-lesson--visible' : ''}`}>
        <span className="ro-lesson__icon">🏛️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`ro-choices${phase >= 3 ? ' ro-choices--visible' : ''}`}>
        <h3 className="ro-choices__prompt">
          Strategy time. <em>What's your first move with the rep?</em>
        </h3>
        <div className="ro-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ro-choice${selectedId === choice.id ? ' ro-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' ro-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ro-choice__icon">{meta.icon}</div>
                <div className="ro-choice__body">
                  <div className="ro-choice__label">{choice.label}</div>
                  <div className="ro-choice__desc">{choice.description}</div>
                </div>
                <div className="ro-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="ro-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  bipartisan: {
    icon: '🤝',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Opposition',        color: 'green'  },
      { label: '+Public Support',    color: 'green'  },
    ],
  },
  'committee-allies': {
    icon: '🏛️',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Budget Concern',    color: 'green'  },
    ],
  },
  'press-release': {
    icon: '📰',
    tags: [
      { label: '+Public Support',  color: 'green' },
      { label: '+Media Attention', color: 'blue'  },
      { label: '+Opposition',      color: 'red'   },
    ],
  },
};
