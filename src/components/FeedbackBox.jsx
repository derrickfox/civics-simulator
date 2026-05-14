import React, { useEffect, useState } from 'react';

const metricLabels = {
  publicSupport: 'Public Support',
  budgetConcern: 'Budget Concern',
  committeeSupport: 'Committee Support',
  oppositionStrength: 'Opposition Strength',
  mediaAttention: 'Media Attention',
  implementationDifficulty: 'Implementation Difficulty'
};

// For negative metrics, going down is actually good
const negativeMetrics = new Set(['budgetConcern', 'oppositionStrength', 'implementationDifficulty']);

function getChangeClass(key, delta) {
  const isNegativeMetric = negativeMetrics.has(key);
  if (delta > 0) return isNegativeMetric ? 'change--bad' : 'change--good';
  if (delta < 0) return isNegativeMetric ? 'change--good' : 'change--bad';
  return '';
}

export default function FeedbackBox({ feedback, onContinue, isLastStage, isTabled }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!feedback) return null;

  const continueLabel = isTabled
    ? 'See Outcome →'
    : isLastStage
    ? 'See Final Outcome →'
    : 'Continue →';

  return (
    <div className={`feedback-box card${visible ? ' feedback-box--visible' : ''}`}>
      <div className="feedback-box__header">
        <span className="feedback-box__icon">💬</span>
        <h3 className="feedback-box__title">What Happened</h3>
      </div>
      <p className="feedback-box__text">{feedback.text}</p>

      {feedback.changes.length > 0 && (
        <div className="feedback-box__changes">
          <p className="feedback-box__changes-title">Metric Changes:</p>
          <div className="feedback-box__change-list">
            {feedback.changes.map(({ key, label, delta }) => (
              <span
                key={key}
                className={`feedback-change ${getChangeClass(key, delta)}`}
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
