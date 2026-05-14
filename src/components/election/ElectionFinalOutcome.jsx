import React from 'react';

const allMetrics = [
  { key: 'nationalPolls',    label: 'National Polls',    icon: '🗺️', colorType: 'positive' },
  { key: 'battlegroundLead', label: 'Battleground Lead', icon: '🔵', colorType: 'positive' },
  { key: 'partyUnity',       label: 'Party Unity',       icon: '🤝', colorType: 'positive' },
  { key: 'undecidedWon',     label: 'Undecided Won',     icon: '💬', colorType: 'positive' },
  { key: 'campaignFunds',    label: 'Campaign Funds',    icon: '💰', colorType: 'positive' },
  { key: 'mediaNarrative',   label: 'Media Narrative',   icon: '📺', colorType: 'positive' },
];

function getColor(value) {
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function buildExplanation(electionState, won) {
  const ev = electionState.electoralVotes ?? 0;
  if (won) {
    const reasons = [];
    if (electionState.battlegroundLead >= 60) reasons.push('a dominant performance in battleground states');
    if (electionState.partyUnity >= 60) reasons.push('exceptional party unity');
    if (electionState.undecidedWon >= 60) reasons.push('winning over undecided voters');
    if (electionState.mediaNarrative >= 60) reasons.push('favorable media coverage throughout');
    return `Jordan Reyes wins the presidency with ${ev} electoral votes — ${ev - 270} above the 270 threshold. The campaign succeeded through ${reasons.length ? reasons.join(', ') : 'smart strategic decisions at every stage'}. On January 20th, Reyes takes the oath of office as the next President of the United States.`;
  } else {
    const reasons = [];
    if (electionState.battlegroundLead < 40) reasons.push('poor performance in swing states');
    if (electionState.partyUnity < 35) reasons.push('a divided party base');
    if (electionState.campaignFunds < 30) reasons.push('inadequate campaign funding');
    return `Jordan Reyes falls short with only ${ev} electoral votes — ${270 - ev} short of the 270 needed. The campaign struggled due to ${reasons.length ? reasons.join(' and ') : 'weak metrics across key categories'}. The opponent is elected president. Losing campaigns often reshape the party and set up future runs — this isn't the end of the story.`;
  }
}

export default function ElectionFinalOutcome({ electionState, won, onPlayAgain }) {
  const ev = electionState.electoralVotes ?? 0;
  const evPct = (ev / 538) * 100;
  const thresholdPct = (270 / 538) * 100;
  const explanation = buildExplanation(electionState, won);

  const bannerText = won ? 'PRESIDENT-ELECT' : 'ELECTION LOST';
  const bannerClass = won ? 'outcome-banner--passed' : 'outcome-banner--failed';
  const bannerEmoji = won ? '🎉' : '❌';

  return (
    <div className="final-outcome">
      <div className="final-outcome__content card">
        <div className={`outcome-banner ${bannerClass}`}>
          <span className="outcome-banner__emoji">{bannerEmoji}</span>
          <span className="outcome-banner__text">{bannerText}</span>
        </div>

        <h2 className="final-outcome__bill-name">Jordan Reyes for President</h2>

        <div style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: '22px', fontWeight: 800, color: won ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {ev} Electoral Votes
        </div>

        <p className="final-outcome__explanation">{explanation}</p>

        <div className="final-outcome__vote">
          <span className="final-outcome__vote-label">Electoral Vote Result:</span>
          <div className="final-outcome__vote-bar-bg" style={{ position: 'relative' }}>
            <div
              className="final-outcome__vote-bar-fill"
              style={{
                width: `${evPct}%`,
                backgroundColor: won ? 'var(--color-success)' : 'var(--color-danger)',
              }}
            />
            <div className="final-outcome__vote-threshold" style={{ left: `${thresholdPct}%` }} />
          </div>
          <span
            className="final-outcome__vote-count"
            style={{ color: won ? 'var(--color-success)' : 'var(--color-danger)' }}
          >
            {ev} of 538 electoral votes (270 needed)
          </span>
        </div>

        <h3 className="final-outcome__metrics-title">Final Campaign Metrics</h3>
        <div className="final-outcome__metrics-grid">
          {allMetrics.map(({ key, label, icon }) => {
            const value = electionState[key] ?? 0;
            const color = getColor(value);
            return (
              <div className="final-metric" key={key}>
                <span className="final-metric__icon">{icon}</span>
                <span className="final-metric__label">{label}</span>
                <div className="final-metric__bar-bg">
                  <div
                    className="final-metric__bar-fill"
                    style={{ width: `${value}%`, backgroundColor: color }}
                  />
                </div>
                <span className="final-metric__value" style={{ color }}>{value}</span>
              </div>
            );
          })}
        </div>

        <div className="final-outcome__lesson">
          <p>
            <strong>Remember:</strong> Real presidential campaigns depend on thousands of volunteers,
            hundreds of strategic decisions, and factors beyond any candidate's control. Every election
            shapes the next one — even losing campaigns move ideas forward and build the infrastructure
            for future runs.
          </p>
        </div>

        <button className="btn btn--primary final-outcome__replay" onClick={onPlayAgain}>
          Run Again 🔄
        </button>
      </div>
    </div>
  );
}
