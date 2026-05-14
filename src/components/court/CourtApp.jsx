import React, { useReducer, useCallback } from 'react';
import { courtStages, INITIAL_COURT_STATE } from '../../data/courtData';
import {
  applyCourtChoice,
  calculateVoteProjection,
  determineWon,
  generateCourtFeedback
} from '../../engine/courtEngine';

import CourtProcessMap from './CourtProcessMap';
import CaseCard from './CaseCard';
import CourtMetricsPanel from './CourtMetricsPanel';
import CourtFeedbackBox from './CourtFeedbackBox';
import CourtFinalOutcome from './CourtFinalOutcome';

import IncidentScene from './scenes/IncidentScene';
import LegalTheoryScene from './scenes/LegalTheoryScene';
import DistrictCourtScene from './scenes/DistrictCourtScene';
import AppealsCourtScene from './scenes/AppealsCourtScene';
import CertPetitionScene from './scenes/CertPetitionScene';
import CertGrantedScene from './scenes/CertGrantedScene';
import MeritsBriefScene from './scenes/MeritsBriefScene';
import OralArgumentsScene from './scenes/OralArgumentsScene';
import ConferenceScene from './scenes/ConferenceScene';
import DecisionScene from './scenes/DecisionScene';

const sceneComponents = [
  IncidentScene,
  LegalTheoryScene,
  DistrictCourtScene,
  AppealsCourtScene,
  CertPetitionScene,
  CertGrantedScene,
  MeritsBriefScene,
  OralArgumentsScene,
  ConferenceScene,
  DecisionScene,
];

// --- Reducer ---
function courtReducer(state, action) {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { choice } = action;
      const oldState = {
        legalStrength: state.legalStrength,
        precedentSupport: state.precedentSupport,
        publicInterest: state.publicInterest,
        oppositionStrength: state.oppositionStrength,
        certScore: state.certScore,
        voteProjection: state.voteProjection
      };

      const nextMetrics = applyCourtChoice(oldState, choice.effects || {});
      const feedback = generateCourtFeedback(choice, oldState, nextMetrics);
      const isSettled = choice.settled === true;

      return {
        ...state,
        ...nextMetrics,
        feedbackVisible: true,
        lastChoice: choice,
        oldState,
        feedback,
        settled: isSettled || state.settled,
        stageChoices: {
          ...state.stageChoices,
          [state.currentStage]: choice.id
        }
      };
    }

    case 'ADVANCE_STAGE': {
      const { settled } = state;
      const isLastStage = state.currentStage >= courtStages.length - 1;

      if (settled) {
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          won: false
        };
      }

      if (isLastStage) {
        const won = determineWon(state);
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          won
        };
      }

      const nextStage = state.currentStage + 1;
      return {
        ...state,
        feedbackVisible: false,
        currentStage: nextStage,
        completedStages: [...state.completedStages, state.currentStage],
        lastChoice: null,
        feedback: null
      };
    }

    case 'RESET': {
      const fresh = { ...INITIAL_COURT_STATE };
      fresh.voteProjection = calculateVoteProjection(fresh);
      return fresh;
    }

    default:
      return state;
  }
}

function initState() {
  const s = { ...INITIAL_COURT_STATE };
  s.voteProjection = calculateVoteProjection(s);
  return s;
}

// --- CourtApp ---
export default function CourtApp({ onBack }) {
  const [state, dispatch] = useReducer(courtReducer, undefined, initState);

  const handleChoiceSelect = useCallback((choice) => {
    dispatch({ type: 'MAKE_CHOICE', choice });
  }, []);

  const handleContinue = useCallback(() => {
    dispatch({ type: 'ADVANCE_STAGE' });
  }, []);

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const currentStageData = courtStages[state.currentStage];
  const SceneComponent = sceneComponents[state.currentStage];

  return (
    <div className="app court-app">
      {/* Header */}
      <header className="app-header court-header">
        <div className="app-header__inner">
          <div className="app-header__title-group">
            {onBack && (
              <button className="court-back-btn" onClick={onBack}>
                ← Back to Modules
              </button>
            )}
            <h1 className="app-header__title">
              <span className="app-header__icon">⚖️</span> How a Supreme Court Case Is Decided
            </h1>
            <p className="app-header__subtitle">
              Fight a constitutional rights case from incident to landmark ruling.
            </p>
          </div>
          <div className="app-header__mission">
            <div className="mission-badge">
              <span className="mission-badge__icon">🎯</span>
              <div>
                <p className="mission-badge__label">Your Mission</p>
                <p className="mission-badge__text">
                  Can you win a landmark Supreme Court ruling that protects students' constitutional rights?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Process Map */}
      <section className="process-map-section">
        <CourtProcessMap
          stages={courtStages}
          currentStage={state.currentStage}
          completedStages={state.completedStages}
        />
      </section>

      {/* Main Content */}
      {state.isComplete ? (
        <CourtFinalOutcome
          courtState={state}
          won={state.won}
          settled={state.settled}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <main className="app-main">
          <div className="app-main__left">
            {!state.feedbackVisible && SceneComponent ? (
              <SceneComponent
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.feedbackVisible ? (
              <CourtFeedbackBox
                feedback={state.feedback}
                onContinue={handleContinue}
                isLastStage={state.currentStage >= courtStages.length - 1}
                settled={state.settled}
              />
            ) : null}
          </div>

          <div className="app-main__right">
            <CaseCard
              courtState={state}
              stageName={currentStageData.title}
            />
            <CourtMetricsPanel courtState={state} />
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>Civics Simulator — Building informed citizens, one choice at a time.</p>
      </footer>
    </div>
  );
}
