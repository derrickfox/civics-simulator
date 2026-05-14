export const INITIAL_IMPEACHMENT_STATE = {
  evidenceStrength: 44,
  publicSupport: 42,
  bipartisanSupport: 30,
  legalGrounding: 48,
  senateSentiment: 36,
  proceduralIntegrity: 55,
  currentStage: 0,
  completedStages: [],
  stageChoices: {},
  feedbackVisible: false,
  lastChoice: null,
  oldState: null,
  isComplete: false,
  convicted: null,
};

export const impeachmentStages = [
  {
    id: 'complaint',
    title: 'The Complaint',
    shortDescription:
      "A credible whistleblower complaint has arrived at the House Intelligence Committee, alleging the President used the power of the office to pressure a foreign government for personal political benefit. The evidence is serious — but incomplete. As a senior member of the House Judiciary Committee, you decide how to open the investigation.",
    civicLesson:
      "Impeachment begins in the House of Representatives, which has the sole power to impeach under Article I of the Constitution. Unlike a criminal trial, impeachment is a political and constitutional process — the standard is 'high crimes and misdemeanors,' a deliberately vague phrase the Founders left for Congress to define. The decision of how to begin an inquiry shapes everything that follows.",
    choices: [
      {
        id: 'immediate-referral',
        label: 'Refer directly to the Judiciary Committee for formal inquiry',
        description: 'Move fast — launch a formal impeachment inquiry immediately and put the President on defense.',
        effects: { evidenceStrength: 5, publicSupport: 10, bipartisanSupport: -8, legalGrounding: 6 },
        feedback:
          "The formal inquiry launched with front-page coverage nationwide. Your party is energized. But Republicans called it 'a predetermined political hit job,' and three swing-district moderates in your own caucus expressed discomfort with the pace.",
      },
      {
        id: 'preliminary-investigation',
        label: 'Conduct a preliminary investigation before launching a formal inquiry',
        description: "Gather more evidence first — a stronger factual record before the formal process begins.",
        effects: { evidenceStrength: 14, legalGrounding: 10, bipartisanSupport: 5, publicSupport: -3 },
        feedback:
          "Six weeks of quiet document review produced three corroborating witnesses and a second whistleblower. When you finally announced the formal inquiry, the press called it 'methodical and devastating.' The evidence base is stronger.",
      },
      {
        id: 'bipartisan-inquiry',
        label: 'Invite Republican members to co-lead a bipartisan inquiry',
        description: 'Build cross-party legitimacy from day one — give minority members real investigative power.',
        effects: { bipartisanSupport: 18, proceduralIntegrity: 14, publicSupport: 8, evidenceStrength: 4 },
        feedback:
          "Two Republican members agreed to participate. The bipartisan framing dominated the coverage and gave moderate senators early cover to take the process seriously. The investigation will move slower, but its conclusions will carry far more weight.",
      },
    ],
  },
  {
    id: 'house-investigation',
    title: 'House Investigation',
    shortDescription:
      "The Judiciary Committee has launched its investigation. Witnesses are being identified, documents are being subpoenaed, and the White House has announced it will not cooperate voluntarily. You must decide how aggressively to pursue the evidence and what to do when the administration stonewalls.",
    civicLesson:
      "Congress has broad subpoena power — it can compel testimony and documents from any person or entity, including executive branch officials. When an administration asserts executive privilege and refuses to comply, the dispute can go to court, often delaying the process for months. How committees handle stonewalling reveals their theory of the case and their willingness to test constitutional boundaries.",
    choices: [
      {
        id: 'broad-subpoenas',
        label: 'Issue broad subpoenas to all potential witnesses and agencies',
        description: 'Cast a wide net — compel testimony from everyone even tangentially connected to the allegations.',
        effects: { evidenceStrength: 12, legalGrounding: 5, bipartisanSupport: -6, proceduralIntegrity: -5 },
        feedback:
          "The broad subpoena strategy unearthed three witnesses you hadn't anticipated. But Republicans accused you of a fishing expedition and the White House successfully challenged two subpoenas in court, creating a month-long delay.",
      },
      {
        id: 'focused-subpoenas',
        label: 'Focus subpoenas narrowly on the strongest, most direct evidence',
        description: 'Pick the three most damning witnesses and the most incriminating documents — go for depth, not breadth.',
        effects: { evidenceStrength: 10, legalGrounding: 12, bipartisanSupport: 8, proceduralIntegrity: 8 },
        feedback:
          "The focused approach made every subpoena defensible on the merits. Courts upheld all three. The testimony was damaging and precise. Legal scholars praised the committee for staying within clear constitutional authority.",
      },
      {
        id: 'proceed-without',
        label: 'Proceed with the evidence you have — draw a negative inference from the stonewalling',
        description: "Tell the American public: the White House's refusal to cooperate is itself evidence of guilt.",
        effects: { publicSupport: 12, proceduralIntegrity: -8, bipartisanSupport: -10, evidenceStrength: -4 },
        feedback:
          "Your 'obstruction as evidence' argument played well with your base and in the press. But legal scholars warned it was constitutionally shaky, and Republican senators announced they would discount any evidence gathered this way.",
      },
    ],
  },
  {
    id: 'public-hearings',
    title: 'Public Hearings',
    shortDescription:
      "The cameras are on. Public hearings before the full Judiciary Committee are your best chance to make the case directly to the American people. Fifty million viewers are expected. The witnesses are ready. How you structure these hearings will define the public's understanding of what happened.",
    civicLesson:
      "Public hearings are as much about persuasion as fact-finding. The Watergate hearings of 1973 turned public opinion against Nixon because the testimony was compelling, clear, and credible. Congressional hearings are staged events — member question time, witness sequencing, and framing all shape the narrative as much as the underlying facts do.",
    choices: [
      {
        id: 'dramatic-witnesses',
        label: 'Lead with the most dramatic, emotional witnesses',
        description: "Open with firsthand testimony of the most direct harm — put a human face on the constitutional violations.",
        effects: { publicSupport: 16, evidenceStrength: 6, bipartisanSupport: -5, proceduralIntegrity: -3 },
        feedback:
          "The opening witnesses were riveting — their testimony dominated the news cycle for four days. But Republicans called it 'theater over substance,' and two witnesses were later partially discredited under cross-examination.",
      },
      {
        id: 'methodical-documents',
        label: 'Build methodically — documents first, then witnesses to explain them',
        description: "Lead with the paper trail, then bring in witnesses to put the documents in context. Build the case like a prosecutor.",
        effects: { legalGrounding: 14, evidenceStrength: 12, bipartisanSupport: 8, proceduralIntegrity: 10 },
        feedback:
          "The document-first approach was slower to gain traction in the press, but legal experts called it 'airtight.' By day three, every senator on the fence had received a 12-page summary of the key exhibits. The case is built to last.",
      },
      {
        id: 'balanced-hearings',
        label: 'Give minority members full time — run visibly fair, balanced hearings',
        description: "Let Republicans cross-examine, present counter-witnesses, and make their case. Neutralize 'partisan witch hunt' attacks.",
        effects: { proceduralIntegrity: 18, bipartisanSupport: 14, publicSupport: 6, evidenceStrength: 4 },
        feedback:
          "The balanced hearings neutralized the Republican 'sham process' talking point entirely. Two Republican members ended the hearings publicly undecided. The process is now the strongest argument for the outcome.",
      },
    ],
  },
  {
    id: 'articles-of-impeachment',
    title: 'Drafting the Articles',
    shortDescription:
      "You must now write the formal Articles of Impeachment — the specific charges that the full House will vote on and the Senate will try. Every word will be scrutinized by legal scholars, political operatives, and 100 senators. Scope and precision are everything.",
    civicLesson:
      "Articles of Impeachment are the formal charges — the equivalent of an indictment. They must describe specific conduct that constitutes 'high crimes and misdemeanors.' Overly broad articles can be dismissed as vague; too many articles can dilute focus. Articles that mix genuine constitutional violations with policy disagreements are the easiest for the Senate to reject. The strength of the articles is often the strongest predictor of conviction.",
    choices: [
      {
        id: 'broad-articles',
        label: 'Draft broad articles covering all alleged misconduct',
        description: "Include every category of misconduct: abuse of power, obstruction of Congress, and violations of campaign finance law.",
        effects: { publicSupport: 8, evidenceStrength: 5, legalGrounding: -10, bipartisanSupport: -8 },
        feedback:
          "The broad articles energized your caucus but alarmed legal scholars. 'Throwing everything at the wall' was the headline in three major papers. Senate Republicans announced they would use the breadth to argue the process lacked constitutional seriousness.",
      },
      {
        id: 'single-article',
        label: 'Draft one focused, airtight article — abuse of power',
        description: "One charge, perfectly supported by the evidence. Difficult to dismiss, difficult to acquit.",
        effects: { legalGrounding: 18, evidenceStrength: 10, bipartisanSupport: 10, publicSupport: 5 },
        feedback:
          "The single article was praised by constitutional scholars as 'the most legally defensible impeachment charge in modern history.' Three Republican legal commentators publicly agreed the conduct described was impeachable. The Senate will have a very hard time acquitting this.",
      },
      {
        id: 'two-articles',
        label: 'Draft two articles: abuse of power and obstruction of Congress',
        description: "Abuse of power for the underlying conduct; obstruction for refusing to cooperate with the investigation.",
        effects: { legalGrounding: 10, evidenceStrength: 8, bipartisanSupport: 5, proceduralIntegrity: 6 },
        feedback:
          "The two-article approach mirrors the Clinton impeachment structure and was well-received by moderate legal voices. It gives senators two separate questions to answer and makes the obstruction case stand independently of the underlying conduct.",
      },
    ],
  },
  {
    id: 'judiciary-committee-vote',
    title: 'Judiciary Committee Vote',
    shortDescription:
      "The Judiciary Committee votes on whether to recommend the Articles of Impeachment to the full House. A party-line vote advances the articles but gives opponents a 'partisan' talking point. A bipartisan vote sends a powerful signal to the Senate. Two Republican members are genuinely persuadable.",
    civicLesson:
      "Committee votes on impeachment are rarely the most important votes — but they set the tone. A unanimous or near-unanimous vote from the majority signals confidence. A bipartisan vote is the most powerful signal possible. When the House Judiciary Committee voted 27–11 to recommend Nixon's impeachment in 1974, six Republicans joined the majority — those six Republican votes are credited with giving the Senate the political cover to convict.",
    choices: [
      {
        id: 'party-line-push',
        label: 'Push for a unified majority vote — prioritize speed over outreach',
        description: "Hold every Democrat and advance the articles on a party-line vote.",
        effects: { publicSupport: 5, bipartisanSupport: -5, proceduralIntegrity: -3, senateSentiment: 4 },
        feedback:
          "The party-line vote moved fast and held together. Republicans immediately labeled it 'the most partisan impeachment in history.' Three swing-state senators announced they would 'wait for the trial' before deciding. You have your vote but not the momentum.",
      },
      {
        id: 'persuade-republicans',
        label: 'Spend two weeks persuading the two Republican members',
        description: "Delay the committee vote to personally brief both persuadable Republicans on the full evidence.",
        effects: { bipartisanSupport: 16, senateSentiment: 14, proceduralIntegrity: 8, publicSupport: 6 },
        feedback:
          "One Republican member voted yes. The 24–14 committee vote — with a Republican defection — was the lead story for three days. Five Senate Republicans publicly said they would 'keep an open mind' heading into the trial. This one vote changed the calculus.",
      },
      {
        id: 'procedural-maneuver',
        label: 'Use a procedural motion to limit Republican debate time',
        description: "Cut off the minority's ability to delay — use committee rules to accelerate the vote.",
        effects: { senateSentiment: 5, proceduralIntegrity: -14, bipartisanSupport: -12, publicSupport: -4 },
        feedback:
          "The procedural move advanced the articles faster, but the backlash was severe. Three Republican senators who had been leaning toward conviction publicly announced they could not support 'an impeachment built on procedural shortcuts.' This hurt badly.",
      },
    ],
  },
  {
    id: 'house-debate',
    title: 'House Floor Debate',
    shortDescription:
      "The full House debates the Articles of Impeachment. Every member gets time to speak. Speeches will be replayed in Senate campaign ads for years. Moderates from competitive districts are watching each other. The whip count is close in your caucus — two members are still undecided.",
    civicLesson:
      "House floor debate on impeachment is largely performative — most members' votes are decided long before the speeches. But the debate matters for the historical record and for the political signal it sends to the Senate. Members know their words will be on the record permanently. Framers of the Constitution envisioned impeachment as a deliberative political judgment, not a judicial verdict — which is why the standards and procedures are set by Congress itself.",
    choices: [
      {
        id: 'constitutional-argument',
        label: 'Lead the debate with the constitutional argument — why this conduct is impeachable',
        description: "Frame every speech around Article II and the Founders' intent. Elevate the debate above partisanship.",
        effects: { legalGrounding: 10, bipartisanSupport: 8, proceduralIntegrity: 8, publicSupport: 6 },
        feedback:
          "Your floor speeches were widely praised for seriousness. Three Republican members publicly credited your constitutional framing for making their position difficult. One of your undecided moderates came onboard after your opening argument.",
      },
      {
        id: 'political-argument',
        label: 'Drive the debate around political accountability — elections and democracy',
        description: "Frame impeachment as protecting the integrity of future elections — a forward-looking argument for the public.",
        effects: { publicSupport: 14, senateSentiment: 6, bipartisanSupport: -6, legalGrounding: -5 },
        feedback:
          "The democracy-focused framing generated enormous energy among voters and dominated social media. But legal scholars noted that 'protecting elections' as a rationale is technically weaker than direct constitutional violations, and Senate Republicans used it to argue the charges were pretextual.",
      },
      {
        id: 'let-record-speak',
        label: "Let the documentary record speak — keep your members on facts, not rhetoric",
        description: "Discipline your caucus to read from the evidence and say nothing beyond what the documents establish.",
        effects: { evidenceStrength: 8, proceduralIntegrity: 12, legalGrounding: 8, bipartisanSupport: 8 },
        feedback:
          "The fact-focused debate was called 'unusually disciplined' by three editorial boards. No member said anything that could be attacked as overreach. Both undecided moderates voted yes. The record going into the Senate trial is clean.",
      },
    ],
  },
  {
    id: 'house-vote',
    title: 'House Vote to Impeach',
    shortDescription:
      "The full House votes on the Articles of Impeachment. A simple majority is all that's needed — 218 votes. The whip count shows you have 221 committed yes votes, but three are 'soft.' The outcome isn't certain. How you manage the final 48 hours determines whether any Republicans cross over.",
    civicLesson:
      "Only three presidents have been impeached by the House: Andrew Johnson (1868), Bill Clinton (1998), and Donald Trump (2019 and 2021). Richard Nixon resigned in 1974 before the full House could vote. In each case, the House vote was largely partisan. The Senate vote — which requires a two-thirds supermajority to convict — has never once achieved that threshold. Understanding why teaches more about American politics than almost anything else.",
    choices: [
      {
        id: 'party-whip',
        label: 'Whip every Democrat — maximize margin, don\'t reach across the aisle',
        description: "Shore up your 221 committed votes. A comfortable majority matters more than symbolic bipartisanship.",
        effects: { senateSentiment: 6, bipartisanSupport: -5, proceduralIntegrity: 3, publicSupport: 5 },
        feedback:
          "The vote passed 224–211 — a comfortable majority. Every Democrat held. No Republicans crossed over. The Senate trial will begin with a clean House vote but no evidence of cross-party support for conviction.",
      },
      {
        id: 'persuade-republicans-vote',
        label: 'Spend 48 hours personally lobbying persuadable Republicans',
        description: "One or two Republican yes votes in the House would transform the Senate trial's dynamics.",
        effects: { bipartisanSupport: 14, senateSentiment: 16, proceduralIntegrity: 6, publicSupport: 8 },
        feedback:
          "Two Republicans voted yes. The 223–213 vote — with bipartisan support — was called 'a historic signal.' Seven Senate Republicans immediately announced they would approach the trial 'with an open mind.' The Senate math just got real.",
      },
      {
        id: 'protect-moderates',
        label: 'Give vulnerable moderates a procedural vote to hide behind',
        description: "Offer a procedural 'send to committee' motion so moderates don't have to cast a direct yes/no impeachment vote.",
        effects: { senateSentiment: 3, proceduralIntegrity: -10, bipartisanSupport: -4, publicSupport: -5 },
        feedback:
          "The procedural maneuvering confused the public and gave Republicans ammunition to call the process a 'shell game.' Two of your moderates voted yes on procedure but no on final passage. The Senate trial begins under a cloud of process questions.",
      },
    ],
  },
  {
    id: 'senate-trial',
    title: 'Senate Trial',
    shortDescription:
      "The Senate trial has begun. The Chief Justice presides. You lead the House Managers — the prosecutors presenting the case to 100 senators who will serve as the jury. Each side gets equal time. The evidence is the same as the House heard. But the audience is different, and the bar is two-thirds.",
    civicLesson:
      "The Senate impeachment trial is unique in American law — it is neither a criminal trial nor a political debate, but something in between. The Chief Justice presides but senators are both jury and judge. The rules are set by the Senate itself at the start of each trial. House Managers serve as prosecutors; the President's personal legal team presents the defense. Witnesses can be called, but the Senate votes on whether to allow them — a vote that has historically been decisive.",
    choices: [
      {
        id: 'call-witnesses',
        label: 'Fight hard to call live witnesses — go to the mat on this',
        description: "Demand live testimony from the most direct witnesses. Losing this vote would be damaging, but winning it could be decisive.",
        effects: { evidenceStrength: 16, publicSupport: 10, bipartisanSupport: -6, senateSentiment: 8 },
        feedback:
          "After a tense 51–49 procedural vote, the Senate agreed to call two witnesses. Their live testimony — under oath, in the chamber — moved three undecided senators. The evidence is now undeniable.",
      },
      {
        id: 'document-case',
        label: 'Present the documentary record — build a case the senators cannot dismiss',
        description: "Let the documents speak. No witnesses needed — the paper trail is airtight and doesn't require a procedural vote.",
        effects: { legalGrounding: 14, evidenceStrength: 10, proceduralIntegrity: 10, bipartisanSupport: 6 },
        feedback:
          "Your 16-hour document presentation was methodical and precise. Legal analysts called it 'the most thorough factual presentation in Senate impeachment history.' Five Republican senators requested additional time to review the key exhibits.",
      },
      {
        id: 'emotional-case',
        label: 'Open with the human cost — lead with impact, close with law',
        description: "Start with what the conduct meant for real people and democratic institutions, then pivot to the legal argument.",
        effects: { publicSupport: 16, senateSentiment: 8, legalGrounding: -4, bipartisanSupport: 4 },
        feedback:
          "The opening day of trial generated the highest viewership of the entire process. Two Republican senators privately told your team it was 'more compelling than expected.' But the defense attacked the emotional framing as designed to distract from the weak legal case.",
      },
    ],
  },
  {
    id: 'senate-deliberation',
    title: 'Senate Deliberations',
    shortDescription:
      "The Senate has retired to closed deliberations. The whip count shows 55 senators leaning toward conviction — twelve short of the 67 needed. Three Republican senators are genuinely undecided. Everything now depends on the next 72 hours of backroom negotiation, public statements, and last-minute appeals.",
    civicLesson:
      "The two-thirds threshold for Senate conviction — 67 of 100 senators — is the most difficult vote threshold in American government. It was deliberately set high by the Founders to prevent impeachment from becoming a partisan tool. In American history, no president has ever been convicted by the Senate. Whether that's evidence that the system works (no president has truly merited removal) or that the system is broken (the bar is impossibly high) is the central debate in impeachment scholarship.",
    choices: [
      {
        id: 'negotiate-swing-votes',
        label: 'Personally meet with the three undecided senators',
        description: "Go door to door — make the constitutional case privately to each persuadable Republican senator.",
        effects: { bipartisanSupport: 16, senateSentiment: 14, proceduralIntegrity: 5, publicSupport: 4 },
        feedback:
          "All three meetings happened. One senator committed to conviction. One committed to acquittal. One remained publicly undecided but privately told you: 'I'm with you.' The math may just work.",
      },
      {
        id: 'public-pressure',
        label: 'Go public — hold rallies and media appearances to pressure undecided senators',
        description: "Make the political cost of acquittal as high as possible. Let voters pressure their senators directly.",
        effects: { publicSupport: 14, bipartisanSupport: -10, senateSentiment: -6, proceduralIntegrity: -5 },
        feedback:
          "The rallies were electric but the Senate backlash was severe. Two Republican senators who had been undecided publicly announced they would vote to acquit, citing 'improper political pressure on the Senate.' The strategy backfired.",
      },
      {
        id: 'accept-censure',
        label: 'Negotiate a bipartisan censure resolution as an alternative to conviction',
        description: "If conviction seems impossible, a formal Senate censure would still be historic — and unanimous.",
        effects: { bipartisanSupport: 10, proceduralIntegrity: 8, senateSentiment: -10, publicSupport: -6 },
        feedback:
          "The censure deal attracted 18 Republican co-sponsors and passed 94–6. But your own caucus was furious — a censure has no legal force and removes the President from nothing. It's a political compromise, not a constitutional verdict.",
      },
    ],
  },
  {
    id: 'senate-vote',
    title: 'Senate Vote',
    shortDescription:
      "The Chief Justice calls the Senate to order. Each senator will cast a vote: guilty or not guilty on each article. Two-thirds — 67 votes — are needed to convict and remove the President from office. The last 10 stages of constitutional process come down to this moment.",
    civicLesson:
      "The Senate vote to convict requires a two-thirds supermajority — one of the highest bars in American law. If convicted, the President is immediately removed from office. The Senate may then hold a separate vote to bar them from holding future office (a simple majority suffices for this second vote). If acquitted, the President remains in office. Acquittal does not mean the conduct was acceptable — only that the Senate declined to remove. The historical record of the conduct, the testimony, and the vote itself becomes part of the permanent constitutional record of the presidency.",
    choices: [
      {
        id: 'closing-argument',
        label: 'Deliver a final closing argument to the nation before the vote',
        description: "Address the American people directly — explain why this moment matters for the Constitution, not just this president.",
        effects: { publicSupport: 12, senateSentiment: 8, legalGrounding: 6, proceduralIntegrity: 6 },
        feedback:
          "Your closing argument was broadcast live and watched by 40 million people. Constitutional scholars called it 'one of the finest floor speeches in Senate impeachment history.' Two final Republican senators publicly announced their votes — one guilty, one not guilty.",
      },
      {
        id: 'evidence-speaks',
        label: 'Let the evidence speak — no final appeal, trust the record',
        description: "Submit the final brief and let the documented record stand on its own. No more theater.",
        effects: { legalGrounding: 10, proceduralIntegrity: 12, evidenceStrength: 6, bipartisanSupport: 4 },
        feedback:
          "Your final brief was 80 pages and airtight. Three Republican senators cited its clarity in their floor statements explaining their vote. The process ends as it began — grounded in evidence and constitutional principle.",
      },
      {
        id: 'last-negotiation',
        label: 'Make one final direct appeal to the last undecided senator',
        description: "One conversation in the Capitol hallway. Everything depends on this one vote.",
        effects: { senateSentiment: 12, bipartisanSupport: 8, publicSupport: 6, proceduralIntegrity: 4 },
        feedback:
          "The conversation lasted 22 minutes. You laid out the full constitutional case one more time. Senator Reeves looked out the window for a long moment and said: 'I'll do what's right.' You don't know what that means until the vote is called.",
      },
    ],
  },
];
