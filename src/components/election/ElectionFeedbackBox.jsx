import React, { useEffect, useState } from 'react';

// All election metrics: up is good for the campaign
function getChangeClass(delta, direction) {
  if (direction === 'good') return 'change--good';
  if (direction === 'bad')  return 'change--bad';
  return '';
}

export default function ElectionFeedbackBox({
  feedback,
  onContinue,
  isLastStage,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!feedback) return null;

  const continueLabel = isLastStage
    ? 'See the Outcome →'
    : 'Continue →';

  return (
    <div className={`feedback-box card${visible ? ' feedback-box--visible' : ''}`}>
      <div className="feedback-box__header">
        <span className="feedback-box__icon">🗳️</span>
        <h3 className="feedback-box__title">What Happened</h3>
      </div>
      <p className="feedback-box__text">{feedback.text}</p>

      {feedback.changes.length > 0 && (
        <div className="feedback-box__changes">
          <p className="feedback-box__changes-title">Campaign Impact:</p>
          <div className="feedback-box__change-list">
            {feedback.changes.map(({ key, label, delta, direction }) => (
              <span
                key={key}
                className={`feedback-change ${getChangeClass(delta, direction)}`}
              >
                {label}: {delta > 0 ? '+' : ''}{delta}
              </span>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn--primary feedback-box__continue" onClick={onContinue}>
        {continueLabel}
      </button>
    </div>
  );
}
