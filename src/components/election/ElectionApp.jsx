import React, { useReducer, useCallback } from 'react';
import { electionStages, INITIAL_ELECTION_STATE } from '../../data/electionData';
import {
  applyElectionChoice,
  calculateElectoralVotes,
  determineWon,
  generateElectionFeedback
} from '../../engine/electionEngine';

import ElectionProcessMap from './ElectionProcessMap';
import CandidateCard from './CandidateCard';
import ElectionMetricsPanel from './ElectionMetricsPanel';
import ElectionFeedbackBox from './ElectionFeedbackBox';
import ElectionFinalOutcome from './ElectionFinalOutcome';

import ExploratoryScene from './scenes/ExploratoryScene';
import PrimaryScene from './scenes/PrimaryScene';
import ConventionScene from './scenes/ConventionScene';
import DebateScene from './scenes/DebateScene';
import StrategyScene from './scenes/StrategyScene';
import GotvScene from './scenes/GotvScene';
import ElectionDayScene from './scenes/ElectionDayScene';
import ElectoralCountScene from './scenes/ElectoralCountScene';
import CertificationScene from './scenes/CertificationScene';
import InaugurationScene from './scenes/InaugurationScene';

const sceneComponents = [
  ExploratoryScene,
  PrimaryScene,
  ConventionScene,
  DebateScene,
  StrategyScene,
  GotvScene,
  ElectionDayScene,
  ElectoralCountScene,
  CertificationScene,
  InaugurationScene,
];

function electionReducer(state, action) {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { choice } = action;
      const oldState = {
        nationalPolls:    state.nationalPolls,
        battlegroundLead: state.battlegroundLead,
        partyUnity:       state.partyUnity,
        undecidedWon:     state.undecidedWon,
        campaignFunds:    state.campaignFunds,
        mediaNarrative:   state.mediaNarrative,
        electoralVotes:   state.electoralVotes,
      };

      const nextMetrics = applyElectionChoice(oldState, choice.effects || {});
      const feedback = generateElectionFeedback(choice, oldState, nextMetrics);

      return {
        ...state,
        ...nextMetrics,
        feedbackVisible: true,
        lastChoice: choice,
        oldState,
        feedback,
        stageChoices: {
          ...state.stageChoices,
          [state.currentStage]: choice.id,
        },
      };
    }

    case 'ADVANCE_STAGE': {
      const isLastStage = state.currentStage >= electionStages.length - 1;

      if (isLastStage) {
        const won = determineWon(state);
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          won,
        };
      }

      return {
        ...state,
        feedbackVisible: false,
        currentStage: state.currentStage + 1,
        completedStages: [...state.completedStages, state.currentStage],
        lastChoice: null,
        feedback: null,
      };
    }

    case 'RESET': {
      const fresh = { ...INITIAL_ELECTION_STATE };
      fresh.electoralVotes = calculateElectoralVotes(fresh);
      return fresh;
    }

    default:
      return state;
  }
}

function initState() {
  const s = { ...INITIAL_ELECTION_STATE };
  s.electoralVotes = calculateElectoralVotes(s);
  return s;
}

export default function ElectionApp({ onBack }) {
  const [state, dispatch] = useReducer(electionReducer, undefined, initState);

  const handleChoiceSelect = useCallback((choice) => {
    dispatch({ type: 'MAKE_CHOICE', choice });
  }, []);

  const handleContinue = useCallback(() => {
    dispatch({ type: 'ADVANCE_STAGE' });
  }, []);

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const currentStageData = electionStages[state.currentStage];
  const SceneComponent = sceneComponents[state.currentStage];

  return (
    <div className="app election-app">
      <header className="app-header election-header">
        <div className="app-header__inner">
          <div className="app-header__title-group">
            {onBack && (
              <button className="court-back-btn" onClick={onBack}>
                ← Back to Modules
              </button>
            )}
            <h1 className="app-header__title">
              <span className="app-header__icon">🗳️</span> How a Presidential Election Works
            </h1>
            <p className="app-header__subtitle">
              Run a presidential campaign from exploratory committee to inauguration.
            </p>
          </div>
          <div className="app-header__mission">
            <div className="mission-badge">
              <span className="mission-badge__icon">🎯</span>
              <div>
                <p className="mission-badge__label">Your Mission</p>
                <p className="mission-badge__text">
                  Can you guide Jordan Reyes to 270 electoral votes and the presidency?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="process-map-section">
        <ElectionProcessMap
          stages={electionStages}
          currentStage={state.currentStage}
          completedStages={state.completedStages}
        />
      </section>

      {state.isComplete ? (
        <ElectionFinalOutcome
          electionState={state}
          won={state.won}
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
              <ElectionFeedbackBox
                feedback={state.feedback}
                onContinue={handleContinue}
                isLastStage={state.currentStage >= electionStages.length - 1}
              />
            ) : null}
          </div>

          <div className="app-main__right">
            <CandidateCard
              electionState={state}
              stageName={currentStageData.title}
            />
            <ElectionMetricsPanel electionState={state} />
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>Civics Simulator — Building informed citizens, one choice at a time.</p>
      </footer>
    </div>
  );
}
