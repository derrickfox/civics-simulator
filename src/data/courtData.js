export const courtStages = [
  {
    id: 'incident',
    title: 'The Incident',
    shortDescription: 'Sofia Martinez, 14, was struck by a speeding driver at an unprotected school crossing. The district had received 12 safety complaints about this intersection and done nothing. Her family wants justice — and change.',
    civicLesson: 'Many landmark Supreme Court cases begin with an ordinary person suffering a real harm that exposes a gap in constitutional protection. Before filing a lawsuit, a family must decide how to frame their fight — legally, publicly, and strategically.',
    choices: [
      {
        id: 'file-immediately',
        label: 'File a federal civil rights lawsuit immediately',
        description: 'Move fast while public attention is high and evidence is fresh.',
        effects: { legalStrength: 10, certScore: 5, publicInterest: 10 },
        feedback: "Filing quickly kept the story in the news and preserved key evidence. The district's attorneys are scrambling to respond."
      },
      {
        id: 'negotiate-first',
        label: 'Demand the district fix the crossing before filing',
        description: 'Attempt a direct negotiation — if they refuse, it strengthens your case.',
        effects: { oppositionStrength: -10, legalStrength: 8, publicInterest: 5 },
        feedback: "The district refused. Their refusal is now on record, making them look negligent. Your case just got stronger."
      },
      {
        id: 'media-first',
        label: 'Go to the media before filing anything',
        description: 'Build public pressure before entering court — control the narrative.',
        effects: { publicInterest: 25, oppositionStrength: 10, legalStrength: 5 },
        feedback: "The story went national. The district is now playing defense in the court of public opinion — but they've also hired top-tier legal defense."
      }
    ]
  },
  {
    id: 'legal-theory',
    title: 'Legal Theory',
    shortDescription: 'Your attorneys must choose the constitutional argument that gives the case the best shot at surviving lower courts and reaching the Supreme Court.',
    civicLesson: 'The legal theory of a case — the specific constitutional provision or statute you invoke — shapes everything: what you must prove, what defenses the other side can raise, and whether the Supreme Court will find the case worth deciding.',
    choices: [
      {
        id: 'substantive-due-process',
        label: '14th Amendment: State-Created Danger doctrine',
        description: 'Argue the district created a dangerous condition and had a constitutional duty to fix it.',
        effects: { legalStrength: 15, precedentSupport: 10, certScore: 5 },
        feedback: "A strong theory with growing circuit support. It directly ties the district's inaction to a constitutional violation."
      },
      {
        id: 'section-1983',
        label: 'Section 1983: Civil Rights Violation',
        description: 'Use the federal civil rights statute to sue for deprivation of constitutional rights under color of law.',
        effects: { legalStrength: 10, precedentSupport: 15, oppositionStrength: -5 },
        feedback: "Section 1983 has a rich precedent trail. Courts are familiar with this path, and it offers a clearer roadmap to the Supreme Court."
      },
      {
        id: 'ada-angle',
        label: 'ADA: Disability Rights Angle',
        description: 'Argue the district failed students with disabilities who depend on accessible crosswalks.',
        effects: { publicInterest: 20, legalStrength: 5, precedentSupport: 5 },
        feedback: "The disability rights angle broadened your coalition significantly and drew amicus support from national advocacy groups."
      }
    ]
  },
  {
    id: 'district-court',
    title: 'District Court',
    shortDescription: 'Your case opens in federal district court before a single judge. This is where you build your factual record — win or lose here, the record you create will travel all the way to the Supreme Court.',
    civicLesson: 'Federal district courts are the trial courts of the federal system. They find facts, apply law, and create the record that appellate courts review. Even when advocates expect to ultimately lose at this level, building a strong factual record is critical for success in higher courts.',
    choices: [
      {
        id: 'summary-judgment',
        label: 'File a comprehensive motion for summary judgment',
        description: 'Argue there are no disputed facts — the district is legally liable as a matter of law.',
        effects: { legalStrength: 12, certScore: 8, precedentSupport: 5 },
        feedback: "Your brief was thorough and compelling. Even though the judge ruled against you on qualified immunity, you created a detailed record for appeal."
      },
      {
        id: 'emergency-injunction',
        label: 'Request an emergency injunction to fix the crossing now',
        description: 'Ask the court to order immediate repairs while the case proceeds.',
        effects: { publicInterest: 15, legalStrength: 8, precedentSupport: 5 },
        feedback: "The injunction request was denied but generated major press. The judge's written denial contained useful language about constitutional obligations."
      },
      {
        id: 'settle',
        label: "Accept the district's settlement offer",
        description: 'Take the payout and the crosswalk improvements — without a precedent.',
        effects: { publicInterest: -30, certScore: -50, legalStrength: -30 },
        feedback: "The family gets justice, but no constitutional precedent is set. Thousands of other students remain unprotected.",
        settled: true
      }
    ]
  },
  {
    id: 'appeals-court',
    title: 'Court of Appeals',
    shortDescription: 'A three-judge appellate panel reviews the district court\'s decision. You need to win — or strategically lose in the right way to set up a Supreme Court petition.',
    civicLesson: 'Courts of Appeals review legal questions, not facts. A circuit split — when different appeals courts rule differently on the same legal question — is one of the strongest reasons the Supreme Court agrees to hear a case. Sometimes losing below in the right way is the best path to the highest court.',
    choices: [
      {
        id: 'circuit-split',
        label: 'Emphasize the circuit split — courts are divided on this issue',
        description: 'Highlight that the 9th Circuit ruled differently than the 5th, creating national inconsistency.',
        effects: { certScore: 22, legalStrength: 5, precedentSupport: 8 },
        feedback: "The panel acknowledged the split. Their ruling deepened the conflict between circuits — virtually guaranteeing Supreme Court attention."
      },
      {
        id: 'facts-focus',
        label: 'Focus on the specific facts and harm done to Sofia',
        description: 'Let the human story drive the legal argument.',
        effects: { publicInterest: 15, precedentSupport: 8, legalStrength: 5 },
        feedback: "The judges were visibly moved. One dissent was particularly passionate and will be cited in your cert petition."
      },
      {
        id: 'law-professor',
        label: 'Hire a prominent constitutional law professor to argue',
        description: "Bring in a recognized scholar whose arguments will be taken seriously by SCOTUS clerks.",
        effects: { legalStrength: 18, precedentSupport: 12, certScore: 8 },
        feedback: "The professor's argument was razor-sharp. Clerks at the Supreme Court are already flagging this case as certworthy."
      }
    ]
  },
  {
    id: 'cert-petition',
    title: 'Petition for Certiorari',
    shortDescription: 'You must now ask the Supreme Court to hear your case. The Court receives roughly 7,000 petitions per year and accepts about 70. Your petition must make the case that this is one of those 70.',
    civicLesson: "A petition for certiorari is a formal request for the Supreme Court to review a lower court's decision. The Court's Rule of Four means four justices must vote to grant cert. Petitions that highlight circuit splits, important unresolved constitutional questions, or significant national impact are most likely to succeed.",
    choices: [
      {
        id: 'national-importance',
        label: 'Lead with national importance — student safety across America',
        description: 'Frame this as a case affecting millions of students at unsafe crossings nationwide.',
        effects: { publicInterest: 18, certScore: 15, legalStrength: 5 },
        feedback: "The petition's opening paragraph was reprinted in three major newspapers. Clerks flagged it as high-profile."
      },
      {
        id: 'circuit-split-lead',
        label: "Lead with the circuit split — inconsistent constitutional rights",
        description: "Argue that Americans' constitutional rights shouldn't depend on which circuit they live in.",
        effects: { certScore: 22, precedentSupport: 12, legalStrength: 5 },
        feedback: "The circuit split argument is textbook cert-worthy. The Solicitor General's office filed a brief supporting review."
      },
      {
        id: 'constitutional-novelty',
        label: 'Emphasize the novel constitutional question',
        description: 'Frame this as a case the Court must take to settle an open question of constitutional law.',
        effects: { legalStrength: 12, certScore: 10, precedentSupport: 8 },
        feedback: "The constitutional framing intrigued the justices. Several clerks recommended the case be relisted for further consideration."
      }
    ]
  },
  {
    id: 'cert-granted',
    title: 'Cert Granted',
    shortDescription: 'The Supreme Court has agreed to hear Martinez v. Riverside USD. Now you must build the broadest possible coalition of support before merits briefing begins.',
    civicLesson: 'When cert is granted, the real strategic work begins. Amicus curiae ("friend of the court") briefs from outside organizations can signal the breadth of a ruling\'s impact and influence justices\' thinking. Coalition building — bringing in civil rights groups, educators, disability advocates, and others — can shift a case\'s trajectory.',
    choices: [
      {
        id: 'amicus-coalition',
        label: 'Coordinate a broad amicus brief coalition',
        description: 'Recruit civil rights groups, education associations, and child safety organizations to file supporting briefs.',
        effects: { precedentSupport: 18, publicInterest: 12, legalStrength: 5 },
        feedback: "24 organizations filed amicus briefs. The justices' clerks noted the breadth of support in their cert memos."
      },
      {
        id: 'narrow-ruling',
        label: "Focus on a narrow ruling — just fix this specific gap",
        description: "Ask for a limited decision that won't alarm justices worried about broad liability.",
        effects: { oppositionStrength: -18, legalStrength: 12, precedentSupport: 5 },
        feedback: "The narrow framing reassured moderate justices. The opposition's amicus briefs are less alarmed than expected."
      },
      {
        id: 'broad-protection',
        label: 'Go broad — ask for maximum constitutional protection',
        description: 'Seek a sweeping ruling that creates strong constitutional duties for all government entities.',
        effects: { publicInterest: 20, oppositionStrength: 18, legalStrength: 8 },
        feedback: "Bold move. Civil rights advocates are energized, but several justices are signaling concern about the scope."
      }
    ]
  },
  {
    id: 'merits-brief',
    title: 'Writing the Brief',
    shortDescription: 'The merits brief is your full written argument to the nine justices. It must anticipate every counterargument, cite every relevant precedent, and tell a compelling story of constitutional harm.',
    civicLesson: 'Supreme Court merits briefs are the most carefully crafted legal documents in American law. They are read by the justices themselves, not just their clerks. The best briefs combine rigorous legal doctrine with a clear narrative that helps justices understand the real-world stakes of their ruling.',
    choices: [
      {
        id: 'narrative-brief',
        label: "Lead with Sofia's story, then the law",
        description: 'Open with the human narrative before laying out the constitutional doctrine.',
        effects: { publicInterest: 12, legalStrength: 12, precedentSupport: 5 },
        feedback: "Justice after justice noted the compelling opening at oral argument. The brief humanized an abstract constitutional question."
      },
      {
        id: 'doctrinal-brief',
        label: 'Dense doctrinal argument — strictly legal, no emotion',
        description: 'Lead with precedent, constitutional text, and historical analysis.',
        effects: { precedentSupport: 18, legalStrength: 12, certScore: 5 },
        feedback: "The brief is a tour de force of constitutional scholarship. Three justices cited it directly during oral argument questioning."
      },
      {
        id: 'propose-test',
        label: 'Propose a clear legal test for courts to apply going forward',
        description: 'Give the Court a ready-made framework — justices often look for administrable rules.',
        effects: { precedentSupport: 22, legalStrength: 8, oppositionStrength: -8 },
        feedback: "Your proposed two-part test gave the moderate justices something concrete to work with. It appears in two justices' questions at oral argument."
      }
    ]
  },
  {
    id: 'oral-arguments',
    title: 'Oral Arguments',
    shortDescription: 'You have 30 minutes to argue before all nine justices. They will interrupt constantly with questions, hypotheticals, and challenges. How you handle the hot bench will determine the outcome.',
    civicLesson: 'Oral arguments at the Supreme Court are unlike any other legal proceeding. Advocates rarely get to finish a sentence before a justice interrupts. Skilled advocates use questions as opportunities to strengthen their argument — not just answer and move on. A single well-handled hypothetical can shift a justice\'s vote.',
    choices: [
      {
        id: 'concede-narrow',
        label: 'Concede narrow points to protect the broader argument',
        description: 'Strategically acknowledge limits of your position to reassure skeptical justices.',
        effects: { legalStrength: 18, oppositionStrength: -12, precedentSupport: 5 },
        feedback: "Your concessions disarmed two skeptical justices who had been prepared to vote against you. The room shifted visibly."
      },
      {
        id: 'hold-firm',
        label: 'Hold firm on the broadest interpretation',
        description: "Don't give an inch — show confidence in the full scope of your argument.",
        effects: { publicInterest: 12, oppositionStrength: 12, legalStrength: 8 },
        feedback: "Advocates and press admired your conviction. But two swing justices seemed troubled by the breadth. It's a gamble."
      },
      {
        id: 'hot-bench-prep',
        label: 'Answer every hypothetical precisely and pivot back',
        description: "You've prepared for 200 hypotheticals — show mastery of the bench.",
        effects: { precedentSupport: 12, legalStrength: 18, certScore: 5 },
        feedback: "Flawless performance. The justices' law clerks are reportedly predicting 6-3 in your favor based on the argument."
      }
    ]
  },
  {
    id: 'conference',
    title: 'The Conference',
    shortDescription: 'The nine justices meet alone — no clerks, no staff — to discuss and take an initial vote. The most senior justice in the majority assigns who writes the opinion.',
    civicLesson: 'The Supreme Court conference is one of the most secretive meetings in American government. No outsiders are present. Justices speak in order of seniority. The initial conference vote is often not the final vote — justices can change their minds as the opinion is drafted. Persuasive draft opinions have swung cases before.',
    choices: [
      {
        id: 'supplemental-brief',
        label: 'File a supplemental brief on a key unresolved question',
        description: 'A justice asked a question at oral argument you can answer more fully in writing.',
        effects: { precedentSupport: 12, legalStrength: 8, certScore: 5 },
        feedback: "The supplemental brief arrived just before conference. Two clerks flagged it as directly responsive to the Chief Justice's concern."
      },
      {
        id: 'final-amicus',
        label: 'Rally a final round of amicus support from unexpected allies',
        description: 'Get conservative law enforcement groups to file a brief — showing this crosses partisan lines.',
        effects: { publicInterest: 18, precedentSupport: 8, oppositionStrength: -8 },
        feedback: "Law enforcement amici filing in your favor surprised the justices. It may have moved a critical vote."
      },
      {
        id: 'trust-record',
        label: 'Trust the brief and argument — no last-minute moves',
        description: "You've done everything right. Let the process work.",
        effects: { legalStrength: 5, precedentSupport: 5 },
        feedback: "Steady as she goes. The record speaks for itself. The conference is happening right now."
      }
    ]
  },
  {
    id: 'decision',
    title: 'The Decision',
    shortDescription: 'The opinion is written. The majority has ruled. Now the question is whether the ruling is broad enough to protect future students — or narrow enough to be a hollow victory.',
    civicLesson: "A Supreme Court ruling's impact depends not just on who wins, but on how broadly the majority writes the opinion. Landmark decisions like Brown v. Board created sweeping change. Narrow rulings can win a case for the plaintiff while leaving the underlying constitutional question unanswered for future courts.",
    choices: [
      {
        id: 'accept-narrow',
        label: 'Accept a narrow but clear ruling in your favor',
        description: 'A unanimous or near-unanimous narrow ruling builds strong, lasting precedent.',
        effects: { oppositionStrength: -22, precedentSupport: 15, legalStrength: 5 },
        feedback: "The 8-1 ruling is narrow but ironclad. Every circuit court in America must now follow it. Sofia's case changed the law."
      },
      {
        id: 'hold-broad',
        label: 'Hold out for a broad landmark ruling',
        description: 'Push the majority author to write a sweeping opinion protecting students nationwide.',
        effects: { publicInterest: 22, legalStrength: 12, oppositionStrength: 12 },
        feedback: "The 5-4 ruling is broad and historic — but a narrow dissent signals this battle isn't over."
      },
      {
        id: 'swing-compromise',
        label: "Accept the swing justice's concurring compromise",
        description: 'A concurring opinion from Justice 5 creates a controlling standard — narrow but workable.',
        effects: { precedentSupport: 18, legalStrength: 8, publicInterest: 5 },
        feedback: "The concurrence is now the controlling opinion. It's not everything you hoped for, but it's clear, it's constitutional, and it protects students."
      }
    ]
  }
];

export const INITIAL_COURT_STATE = {
  legalStrength: 50,
  precedentSupport: 35,
  publicInterest: 20,
  oppositionStrength: 45,
  certScore: 30,
  voteProjection: 0,
  currentStage: 0,
  completedStages: [],
  stageChoices: {},
  feedbackVisible: false,
  lastChoice: null,
  oldState: null,
  isComplete: false,
  won: null,
  settled: false
};
