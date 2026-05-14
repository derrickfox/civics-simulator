import React, { useReducer, useCallback } from 'react';
import { stages, INITIAL_STATE } from './data/simulationData';
import {
  applyChoice,
  calculateVoteCount,
  determinePassed,
  generateFeedback
} from './engine/simulationEngine';

import ProcessMap from './components/ProcessMap';
import BillCard from './components/BillCard';
import MetricsPanel from './components/MetricsPanel';
import CurrentStagePanel from './components/CurrentStagePanel';
import ChoicePanel from './components/ChoicePanel';
import FeedbackBox from './components/FeedbackBox';
import FinalOutcome from './components/FinalOutcome';
import CitizenIdeaScene from './components/CitizenIdeaScene';
import RepresentativeOfficeScene from './components/RepresentativeOfficeScene';
import DraftingScene from './components/DraftingScene';
import CommitteeHearingScene from './components/CommitteeHearingScene';
import AmendmentsScene from './components/AmendmentsScene';
import FloorDebateScene from './components/FloorDebateScene';
import VoteScene from './components/VoteScene';
import OtherChamberScene from './components/OtherChamberScene';
import ExecutiveScene from './components/ExecutiveScene';
import ImplementationScene from './components/ImplementationScene';

// --- Reducer ---
function simulationReducer(state, action) {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { choice } = action;
      const oldState = {
        publicSupport: state.publicSupport,
        budgetConcern: state.budgetConcern,
        committeeSupport: state.committeeSupport,
        oppositionStrength: state.oppositionStrength,
        mediaAttention: state.mediaAttention,
        implementationDifficulty: state.implementationDifficulty,
        voteCount: state.voteCount
      };

      const nextMetrics = applyChoice(oldState, choice.effects || {});
      const feedback = generateFeedback(choice, oldState, nextMetrics);
      const isTabled = choice.tabled === true;

      return {
        ...state,
        ...nextMetrics,
        feedbackVisible: true,
        lastChoice: choice,
        oldState,
        feedback,
        isTabled: isTabled || false,
        stageChoices: {
          ...state.stageChoices,
          [state.currentStage]: choice.id
        }
      };
    }

    case 'ADVANCE_STAGE': {
      const { isTabled } = state;
      const isLastStage = state.currentStage >= stages.length - 1;

      if (isTabled) {
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          passed: false
        };
      }

      if (isLastStage) {
        const passed = determinePassed(state);
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          passed
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
      const fresh = { ...INITIAL_STATE };
      fresh.voteCount = calculateVoteCount(fresh);
      return fresh;
    }

    default:
      return state;
  }
}

function initState() {
  const s = { ...INITIAL_STATE };
  s.voteCount = calculateVoteCount(s);
  return s;
}

// --- App ---
export default function App({ onBack }) {
  const [state, dispatch] = useReducer(simulationReducer, undefined, initState);

  const handleChoiceSelect = useCallback((choice) => {
    dispatch({ type: 'MAKE_CHOICE', choice });
  }, []);

  const handleContinue = useCallback(() => {
    dispatch({ type: 'ADVANCE_STAGE' });
  }, []);

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const currentStageData = stages[state.currentStage];

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__title-group">
            {onBack && (
              <button className="court-back-btn" onClick={onBack}>
                ← Back to Modules
              </button>
            )}
            <h1 className="app-header__title">
              <span className="app-header__icon">🏛️</span> Civics Simulator
            </h1>
            <p className="app-header__subtitle">
              Learn government by guiding a bill through the process.
            </p>
          </div>
          <div className="app-header__mission">
            <div className="mission-badge">
              <span className="mission-badge__icon">🎯</span>
              <div>
                <p className="mission-badge__label">Your Mission</p>
                <p className="mission-badge__text">
                  Can you pass a policy that improves student safety before the next school year?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Process Map */}
      <section className="process-map-section">
        <ProcessMap
          stages={stages}
          currentStage={state.currentStage}
          completedStages={state.completedStages}
          onStageClick={() => {}}
        />
      </section>

      {/* Main Content */}
      {state.isComplete ? (
        <FinalOutcome
          billState={state}
          passed={state.passed}
          tabled={state.isTabled}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <main className="app-main">
          <div className="app-main__left">
            {/* Each stage gets a custom animated scene; fallback uses generic panels */}
            {state.currentStage === 0 && !state.feedbackVisible ? (
              <CitizenIdeaScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 1 && !state.feedbackVisible ? (
              <RepresentativeOfficeScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 2 && !state.feedbackVisible ? (
              <DraftingScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 3 && !state.feedbackVisible ? (
              <CommitteeHearingScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 4 && !state.feedbackVisible ? (
              <AmendmentsScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 5 && !state.feedbackVisible ? (
              <FloorDebateScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 6 && !state.feedbackVisible ? (
              <VoteScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 7 && !state.feedbackVisible ? (
              <OtherChamberScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 8 && !state.feedbackVisible ? (
              <ExecutiveScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.currentStage === 9 && !state.feedbackVisible ? (
              <ImplementationScene
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : (
              <>
                <CurrentStagePanel
                  stage={currentStageData}
                  stageIndex={state.currentStage}
                />
                {!state.feedbackVisible ? (
                  <ChoicePanel
                    choices={currentStageData.choices}
                    onChoiceSelect={handleChoiceSelect}
                    disabled={false}
                  />
                ) : (
                  <FeedbackBox
                    feedback={state.feedback}
                    onContinue={handleContinue}
                    isLastStage={state.currentStage >= stages.length - 1}
                    isTabled={state.isTabled}
                  />
                )}
              </>
            )}
          </div>

          <div className="app-main__right">
            <BillCard
              billState={state}
              stageName={currentStageData.title}
            />
            <MetricsPanel billState={state} />
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>Civics Simulator — Building informed citizens, one choice at a time.</p>
      </footer>
    </div>
  );
}
