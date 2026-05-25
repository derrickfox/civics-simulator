import React, { useEffect, useState } from 'react';

// AI_CHANGE:
// Tool: Claude Code
// Model: Claude Opus 4.7
// Timestamp: 2026-05-25T19:58:18-04:00
// Purpose: Replaces the unstyled `ci-feedback__*` class prefix with the shared `feedback-box` classes used by every other module's FeedbackBox.
// Reason: The `ci-feedback__*` classes had no matching CSS, so the "What Happened" panel rendered without a card, padding, or pill spacing. Aligning with the shared component class names restores the styling and adds the fade-in animation for free.
export default function RedistrictingFeedbackBox({ feedback, onContinue, isLastStage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);
  if (!feedback) return null;
  return (
    <div className={`feedback-box card${visible ? ' feedback-box--visible' : ''}`}>
      <div className="feedback-box__header">
        <span className="feedback-box__icon">🗺️</span>
        <h3 className="feedback-box__title">What Happened</h3>
      </div>
      <p className="feedback-box__text">{feedback.text}</p>
      {feedback.changes?.length > 0 && (
        <div className="feedback-box__changes">
          <p className="feedback-box__changes-title">Case Impact:</p>
          <div className="feedback-box__change-list">
            {feedback.changes.map(({ label, delta }) => (
              <span
                key={label}
                className={`feedback-change ${delta > 0 ? 'change--good' : 'change--bad'}`}
              >
                {label}: {delta > 0 ? '+' : ''}{delta}
              </span>
            ))}
          </div>
        </div>
      )}
      <button className="btn btn--primary feedback-box__continue" onClick={onContinue}>
        {isLastStage ? 'See Outcome →' : 'Continue →'}
      </button>
    </div>
  );
}
