export const INITIAL_REDISTRICTING_STATE = {
  fairness: 40,
  competitiveness: 35,
  vraCompliance: 45,
  publicSupport: 42,
  legalDefensibility: 50,
  bipartisanSupport: 28,
  currentStage: 0,
  completedStages: [],
  stageChoices: {},
  feedbackVisible: false,
  lastChoice: null,
  oldState: null,
  isComplete: false,
  mapApproved: null,
};

export const redistrictingStages = [
  {
    id: 'census-results',
    title: 'Census Results',
    shortDescription:
      "The decennial Census results are in. Your state's population grew by 18% — faster than the national average. As a result, your state gains two new congressional seats, growing from 13 to 15 districts. Every existing district must be redrawn from scratch. You chair the state legislature's redistricting committee and the process begins now.",
    civicLesson:
      "The U.S. Census, conducted every 10 years, determines how 435 congressional seats are distributed among the 50 states — a process called apportionment. States that grow faster than average gain seats; states that shrink or grow slowly lose them. After apportionment, each state must redraw its congressional districts so each contains roughly the same population. This is required by the Supreme Court's 'one person, one vote' ruling in Reynolds v. Sims (1964).",
    choices: [
      {
        id: 'accept-results',
        label: 'Accept the Census and immediately begin the redistricting process',
        description: 'Move fast — use the official Census data and start drawing maps. Speed builds political momentum.',
        effects: { publicSupport: 6, legalDefensibility: 8, competitiveness: 4, bipartisanSupport: 3 },
        feedback:
          "Your decision to accept the Census and move quickly was praised by editorial boards as 'professional and nonpartisan.' You now have two new seats to fill — each requiring a new district. The redistricting committee is formally convened. The clock is running.",
      },
      {
        id: 'challenge-undercount',
        label: "Challenge the Census — argue it undercounted your state's urban population",
        description: "Dispute the methodology. Urban communities of color are historically undercounted, which affects both apportionment and district design.",
        effects: { vraCompliance: 10, publicSupport: 6, legalDefensibility: -4, bipartisanSupport: -6 },
        feedback:
          "Your legal team filed a formal challenge to Census methodology, citing documented undercount rates in urban census tracts. Civil rights groups praised the move. The Commerce Department rejected the challenge — but the documented undercount will now be central to your VRA compliance argument when drawing minority districts.",
      },
      {
        id: 'bipartisan-kickoff',
        label: 'Invite the minority party to co-chair the redistricting committee',
        description: 'Share power from day one — bipartisan legitimacy now reduces legal exposure later.',
        effects: { bipartisanSupport: 18, legalDefensibility: 12, fairness: 10, publicSupport: 8 },
        feedback:
          "The bipartisan committee structure made national news. Three Republican members agreed to co-chair subcommittees. The map-drawing process won't be faster — but the legitimacy it earns will be invaluable when the lawsuits come. And they will come.",
      },
    ],
  },
  {
    id: 'drawing-criteria',
    title: 'Drawing Criteria',
    shortDescription:
      "Before drawing a single line, your committee must establish the criteria that will guide all map decisions. Courts require certain criteria (equal population, contiguity, compactness) but give wide discretion on others. The criteria you adopt will define your legal defense when the map is challenged — and it will be challenged.",
    civicLesson:
      "Courts have established a hierarchy of redistricting criteria. 'Mandatory' criteria include equal population (districts within 1% of each other) and Voting Rights Act compliance. 'Traditional' criteria include contiguity (all parts connected), compactness (no extreme tentacles), and preservation of political subdivisions. 'Permissive' criteria include communities of interest, incumbency protection, and partisan fairness. Courts look at which criteria were prioritized and whether political considerations were used to override legal ones.",
    choices: [
      {
        id: 'compactness-first',
        label: 'Adopt strict geographic compactness as the primary criterion',
        description: "Draw the most geometrically compact districts possible. Clean shapes are easy to defend in court.",
        effects: { legalDefensibility: 12, fairness: 8, competitiveness: 6, bipartisanSupport: 5 },
        feedback:
          "The compactness-first criteria were formally adopted and published. Legal scholars called your criteria 'textbook defensible.' Three court precedents directly support compact districts as a neutral standard. The downside: compact districts often split urban communities along mathematical lines that ignore neighborhood boundaries.",
      },
      {
        id: 'communities-first',
        label: 'Prioritize keeping communities of interest together — even if shapes are irregular',
        description: "Allow non-compact shapes if they keep cohesive communities (cities, counties, cultural communities) intact.",
        effects: { vraCompliance: 12, publicSupport: 14, fairness: 10, legalDefensibility: -4 },
        feedback:
          "Community groups from 14 cities testified in favor of your criteria. Three Native American tribes said it was the first time redistricting criteria acknowledged their communities as a unit. The legal team flagged one concern: irregular shapes invite 'racial gerrymandering' claims even when the intent is community preservation.",
      },
      {
        id: 'algorithmic-blind',
        label: "Use an algorithm that ignores party registration entirely",
        description: "Commission a computer-generated map using only population equality and compactness, with no human line-drawing.",
        effects: { fairness: 16, competitiveness: 14, legalDefensibility: 10, bipartisanSupport: 8 },
        feedback:
          "The algorithmic approach generated significant press coverage and praise from good-government groups. The computer produced 500 equally valid maps — your committee chose among the top 10. One Republican member publicly called it 'the most honest redistricting process I've seen.' The algorithm, however, split three counties that have voted together for 40 years.",
      },
    ],
  },
  {
    id: 'first-draft',
    title: 'Drawing the First Map',
    shortDescription:
      "The map-drawing begins in earnest. Your committee's cartographers are staring at population data and blank district lines. This is the moment where abstract principles meet political reality. How the lines are drawn here will determine the partisan composition of your congressional delegation for the next decade.",
    civicLesson:
      "The two primary gerrymandering techniques are 'packing' — concentrating the opposition party's voters into a few districts so they win by huge margins and waste votes — and 'cracking' — splitting opposition communities across multiple districts so they're always a minority. Both manipulate the geographic distribution of voters to produce partisan advantage. The Supreme Court ruled in Rucho v. Common Cause (2019) that federal courts cannot strike down partisan gerrymanders — but state courts and the VRA still provide check.",
    choices: [
      {
        id: 'partisan-gerrymander',
        label: 'Draw lines that maximize your party\'s safe seats — pack and crack',
        description: "Use packing and cracking to give your party a structural advantage for the next 10 years.",
        effects: { fairness: -14, competitiveness: -12, bipartisanSupport: -14, legalDefensibility: -8, publicSupport: -6 },
        feedback:
          "Your map gives your party 11 of 15 seats in a state that voted 54-46 last cycle. Internal models show this holds through normal electoral swings. But the shapes are extraordinary — one district looks like a seahorse. Three cartographers on your team quietly asked to be removed from the project.",
      },
      {
        id: 'competitive-map',
        label: 'Maximize competitive districts — draw a map where seats are earned, not guaranteed',
        description: "Create as many 45-55% districts as possible. Elections should be decided by voters, not mapmakers.",
        effects: { competitiveness: 20, fairness: 16, publicSupport: 14, bipartisanSupport: 12, legalDefensibility: 8 },
        feedback:
          "Your map has 9 genuinely competitive districts — more than any state of comparable size. Three national good-government organizations endorsed it. Both parties immediately began recruiting stronger candidates knowing that incumbency protection is gone. Political scientists called it 'the most consequential redistricting in a generation.'",
      },
      {
        id: 'incumbent-protection',
        label: 'Draw lines that protect incumbents of both parties — bipartisan stability',
        description: "Protect sitting members by keeping their voter bases intact. Both parties get their safe seats; nobody's career is threatened.",
        effects: { bipartisanSupport: 14, legalDefensibility: 8, competitiveness: -10, fairness: -4, publicSupport: -5 },
        feedback:
          "Every incumbent in your delegation privately sent thanks. The map passed committee with zero dissent — the first time anyone can remember. Critics call it 'a gerrymander that protects politicians rather than parties, which is somehow worse.' Eight of 15 districts are now effectively unwinnable for challengers.",
      },
    ],
  },
  {
    id: 'vra-compliance',
    title: 'Voting Rights Act Review',
    shortDescription:
      "Your state has significant minority populations — Black voters concentrated in two metro areas, a growing Latino community in three counties, and a Native American population spread across the rural north. The Voting Rights Act requires you to ensure these communities have a meaningful opportunity to elect representatives of their choice. How you handle this will define the legal fate of the map.",
    civicLesson:
      "Section 2 of the Voting Rights Act prohibits voting practices that discriminate based on race. In redistricting, this means maps cannot 'dilute' minority voting power by packing or cracking minority communities in ways that deny them fair representation. Courts use a three-part test from Thornburg v. Gingles (1986): the minority group must be large enough to form a majority in a district, it must be politically cohesive, and white voters must vote sufficiently as a bloc to defeat minority-preferred candidates. If all three are met, a majority-minority district may be required.",
    choices: [
      {
        id: 'maximize-minority',
        label: 'Create maximum majority-minority districts — exceed VRA minimums',
        description: "Draw 3 majority-minority districts (2 Black, 1 Latino) where minority voters constitute 55%+ of each district.",
        effects: { vraCompliance: 20, fairness: 8, legalDefensibility: 10, publicSupport: 8, bipartisanSupport: -4 },
        feedback:
          "Civil rights organizations testified in unanimous support of your minority districts. The NAACP called the map 'a landmark.' One legal risk emerged: the Supreme Court has ruled that using race as the 'predominant factor' in drawing lines is unconstitutional — your team documented that communities of interest, not race alone, drove the lines.",
      },
      {
        id: 'influence-districts',
        label: 'Create influence districts — spread minority voters for maximum statewide impact',
        description: "Rather than concentrating minority voters in majority-minority districts, give them decisive influence in 6 competitive districts.",
        effects: { vraCompliance: 8, competitiveness: 10, fairness: 10, legalDefensibility: 6, publicSupport: 6 },
        feedback:
          "The influence district approach divided civil rights groups. The NAACP opposed it; a coalition of Latino advocacy organizations supported it. Legal scholars called it 'a defensible but risky interpretation of Section 2.' Three districts now have minority voters holding a decisive 20-30% bloc — enough to determine outcomes in close elections.",
      },
      {
        id: 'minimal-vra',
        label: 'Meet the minimum VRA floor — one majority-minority district, no more',
        description: "Create exactly one majority-minority district where the Gingles test is clearly met. Argue the VRA doesn't require more.",
        effects: { vraCompliance: -8, legalDefensibility: -10, bipartisanSupport: 4, competitiveness: 6, publicSupport: -8 },
        feedback:
          "The Department of Justice sent a formal letter of concern within 48 hours. Two civil rights organizations filed preliminary injunction motions before the map was even finalized. Your legal team is confident they can win — but the litigation will cost millions and may not be resolved before the next election.",
      },
    ],
  },
  {
    id: 'public-hearings',
    title: 'Public Hearings',
    shortDescription:
      "State law requires public hearings before the map is finalized. Dozens of community groups, advocacy organizations, city councils, and individual citizens want to be heard. The hearings are your chance to build public legitimacy — or expose the map's weaknesses under public scrutiny.",
    civicLesson:
      "Public comment periods in redistricting serve two purposes: democratic legitimacy and legal record-building. Courts review the public record to determine whether mapmakers considered community input. A robust public record showing that comments were received and addressed — even if the map wasn't changed — strengthens legal defense. An inadequate public process is itself grounds for a court challenge. Many state constitutions now require a minimum public comment period.",
    choices: [
      {
        id: 'robust-hearings',
        label: 'Hold 20 hearings statewide — including rural areas and communities of color',
        description: "Go beyond the minimum. Build a public record that demonstrates every community was heard.",
        effects: { publicSupport: 16, legalDefensibility: 12, vraCompliance: 6, bipartisanSupport: 8, fairness: 6 },
        feedback:
          "Turnout at the rural hearings surprised everyone — farmers concerned about county splits filled a high school gym. Three communities submitted alternative maps that your team incorporated in part. The public record is now 4,000 pages. Courts love paper trails like this.",
      },
      {
        id: 'fast-track',
        label: 'Hold the minimum required hearings — four meetings, two weeks',
        description: "Meet the legal minimum and move to a vote. The deadline is real and the map is ready.",
        effects: { publicSupport: -10, legalDefensibility: -8, bipartisanSupport: -8, fairness: -4 },
        feedback:
          "The minority party called the hearings 'a rubber stamp.' Three good-government groups filed public statements calling the process 'a fig leaf.' One federal judge, reviewing the schedule later, wrote in a footnote that 'the compressed timeline raises questions about whether public input was genuinely considered.' That footnote will appear in every subsequent legal brief.",
      },
      {
        id: 'community-maps',
        label: 'Accept community-submitted alternative maps for official consideration',
        description: "Formally invite communities to draw and submit their own maps. Consider them alongside the committee draft.",
        effects: { fairness: 14, publicSupport: 14, vraCompliance: 8, legalDefensibility: 8, bipartisanSupport: 10 },
        feedback:
          "Forty-seven community maps were submitted. Three were genuinely better than your draft for minority representation. You incorporated two communities-of-interest boundaries you hadn't noticed. A federal court later cited the community map process as 'a model for participatory redistricting.'",
      },
    ],
  },
  {
    id: 'rival-map',
    title: 'The Rival Map',
    shortDescription:
      "The minority party has released their competing redistricting proposal — a map that would give them 9 of 15 seats. They've held a press conference calling your map 'the most brazen gerrymander in state history' and submitted it to the courts as evidence of partisan intent. How you respond shapes the political and legal battle ahead.",
    civicLesson:
      "In redistricting litigation, the existence of alternative maps is powerful evidence. If a party can show that a mapmaker was aware of a viable alternative that achieved the same population equality and VRA compliance but produced less partisan advantage — and chose the more gerrymandered map anyway — courts treat that as evidence of discriminatory intent. The Supreme Court's Shaw v. Reno (1993) introduced the 'bizarreness' test: if a district is so irregular that it can only be explained by racial or partisan intent, it's presumptively unconstitutional.",
    choices: [
      {
        id: 'attack-rival-map',
        label: "Commission an expert analysis exposing the rival map's own gerrymandering",
        description: "If they're attacking your map, show the public that their map is just as gerrymandered — in the other direction.",
        effects: { publicSupport: 8, bipartisanSupport: -8, legalDefensibility: 6, fairness: -4 },
        feedback:
          "Your expert witness demonstrated that the rival map packs rural voters more aggressively than your map packs urban ones. The press ran 'both maps are gerrymandered' stories — which muddies the waters legally and politically. The minority party's strongest argument has been blunted, though the overall perception of redistricting as a corrupt process deepened.",
      },
      {
        id: 'incorporate-elements',
        label: 'Incorporate two district boundaries from the rival map into your final version',
        description: "Cherry-pick two improvements from their map. Defuse their strongest criticisms and narrow the legal target.",
        effects: { legalDefensibility: 14, bipartisanSupport: 12, fairness: 10, publicSupport: 10 },
        feedback:
          "The announcement that you were incorporating rival map elements generated the best press of the entire process. The minority party caucus split — moderates called it 'a genuine compromise,' hardliners called it 'surrender.' Three potential legal challengers privately signaled they might withdraw their suits.",
      },
      {
        id: 'ignore-rival',
        label: "Proceed with your map — dismiss the rival proposal as political theater",
        description: "You have the votes. Their map is a political document, not a serious proposal.",
        effects: { legalDefensibility: -10, bipartisanSupport: -12, publicSupport: -8, fairness: -4 },
        feedback:
          "The dismissal played well with your base but became Exhibit A in the lawsuit filed six weeks later. The plaintiff's legal team quoted your press statement — 'political theater' — in their brief, arguing it showed deliberate disregard of alternative approaches that would have reduced partisan advantage.",
      },
    ],
  },
  {
    id: 'legislative-vote',
    title: 'Legislative Vote',
    shortDescription:
      "The map is ready for a vote in the state legislature. Your party holds a 58-42 majority — enough to pass on a party-line vote. But three members of your own caucus have privately expressed concerns about specific district lines. And two Republican members are rumored to be open to voting yes on a slightly modified version.",
    civicLesson:
      "In 33 states, redistricting maps are passed by the legislature like ordinary legislation, subject to gubernatorial veto. In the remaining states, independent or bipartisan commissions draw the lines — a reform adopted after high-profile gerrymanders in the 2000s and 2010s. California, Arizona, Colorado, Michigan, and Virginia all shifted to commissions. Courts have generally upheld commission-drawn maps as more legally defensible, in part because the process is designed to insulate line-drawing from direct partisan control.",
    choices: [
      {
        id: 'party-line-vote',
        label: 'Push for a party-line vote — you have the majority, use it',
        description: "Whip your caucus and pass the map on a straight party-line vote. Fast and decisive.",
        effects: { bipartisanSupport: -12, publicSupport: -6, legalDefensibility: -6, competitiveness: 3 },
        feedback:
          "The map passed 58-42, with every Democrat voting yes and every Republican voting no. The minority leader's floor speech was cited in three legal filings within 24 hours: 'This party-line vote proves the map was drawn for partisan advantage, not the public interest.' It's now the central argument in the lawsuit.",
      },
      {
        id: 'negotiate-compromise',
        label: 'Negotiate minor line changes to win 4-6 Republican votes',
        description: "Spend two weeks negotiating. A bipartisan vote dramatically strengthens the map's legal defense.",
        effects: { bipartisanSupport: 18, legalDefensibility: 16, publicSupport: 12, fairness: 6 },
        feedback:
          "After 11 days of negotiations, four Republican members voted yes. The 62-38 vote with bipartisan support dominated coverage. Three legal scholars publicly said the bipartisan vote made the map 'substantially harder to attack on partisan gerrymandering grounds.' One potential plaintiff quietly dropped their lawsuit.",
      },
      {
        id: 'defer-commission',
        label: 'Defer to an independent redistricting commission — remove the legislature',
        description: "Propose creating an independent commission to finalize the map. Give up partisan control to gain legitimacy.",
        effects: { fairness: 20, legalDefensibility: 18, publicSupport: 18, bipartisanSupport: 16, competitiveness: 8 },
        feedback:
          "The commission announcement was the most significant redistricting reform in your state in 50 years. Both parties agreed to the commission structure. The resulting map was praised by five federal judges in subsequent rulings as 'the model of a constitutionally sound redistricting process.' You gave up partisan control — and the map may not favor your party — but it will stand.",
      },
    ],
  },
  {
    id: 'governors-desk',
    title: "Governor's Desk",
    shortDescription:
      "The map has passed the legislature and is now on the governor's desk. Your governor is from the same party. She has 10 days to act. Internal polls show the map is unpopular with independent voters, but your base strongly supports it. The governor is up for re-election in two years.",
    civicLesson:
      "In states where the governor has veto power over redistricting (most states), the governor becomes a critical check on the legislature. A veto forces either a legislative override (typically requiring a two-thirds supermajority) or a redraw. If neither happens, the courts may step in with their own map. Several high-profile redistricting cycles — including Pennsylvania in 2012 — ended with court-drawn maps because the legislature and governor could not agree. Court-drawn maps typically favor neither party and can be more competitive than politically drawn ones.",
    choices: [
      {
        id: 'full-support',
        label: 'Governor signs with a full public endorsement',
        description: "Sign quickly and publicly. Political unity sends a signal to potential challengers.",
        effects: { bipartisanSupport: -6, publicSupport: 4, legalDefensibility: 4, competitiveness: -2 },
        feedback:
          "The governor's signing ceremony was covered as a partisan rally. Independents viewed the enthusiasm as confirmation that the map was political. Legal challengers cited the ceremony in their standing arguments — 'the governor's public celebration of the map's partisan effects is itself evidence of discriminatory intent.'",
      },
      {
        id: 'conditional-approval',
        label: 'Governor requests two specific line changes before signing',
        description: "The governor sends the map back with targeted amendments — fixing the two most legally vulnerable districts.",
        effects: { legalDefensibility: 14, fairness: 10, publicSupport: 8, bipartisanSupport: 8 },
        feedback:
          "The governor's amendments fixed the two districts that every legal expert had flagged as vulnerable. She signed the revised map in a low-key ceremony. Three planned lawsuits were withdrawn within a week. The changes cost your party one likely seat — but the remaining 14 are now on solid legal ground.",
      },
      {
        id: 'veto-fight',
        label: "Governor vetoes — force the legislature to override or redraw",
        description: "The governor vetoes, demanding a fairer map. The legislature must now override with a 2/3 vote or redraw.",
        effects: { publicSupport: 12, fairness: 10, legalDefensibility: 6, bipartisanSupport: 14, competitiveness: 8 },
        feedback:
          "The veto was a political earthquake. The legislature failed to reach 2/3 for an override by four votes. In the emergency redraw process, your party compromised on three districts. The final map is less favorable to your party — but it cleared every legal challenge and was praised by two federal appeals courts for its integrity.",
      },
    ],
  },
  {
    id: 'legal-challenge',
    title: 'Legal Challenge',
    shortDescription:
      "As expected, the map has been challenged in federal court. Three lawsuits have been consolidated: one from the minority party alleging partisan gerrymandering, one from civil rights groups alleging VRA violations in two districts, and one from a suburban county arguing their community was split illegally. The trial date is set for eight months before the next primary.",
    civicLesson:
      "Redistricting litigation is now essentially automatic. After the 2010 cycle, nearly every state's map was challenged in court. Key legal standards include: equal population (one person, one vote), VRA compliance, racial gerrymandering (race cannot be the predominant factor), and — in state courts — partisan gerrymandering. The Supreme Court's 2019 Rucho decision closed federal courts to partisan gerrymandering claims, but state supreme courts in North Carolina, Pennsylvania, and Ohio have struck down maps under state constitutions. Litigation can last years and maps can be redrawn mid-decade.",
    choices: [
      {
        id: 'vigorous-defense',
        label: 'Vigorously defend every aspect of the map — fight every district',
        description: "Hire the top redistricting firm in the country. Contest every claim, every district, every methodology argument.",
        effects: { legalDefensibility: 8, bipartisanSupport: -8, publicSupport: -6, fairness: -4 },
        feedback:
          "The vigorous defense strategy cost $4.2 million and lasted 14 months. You won 8 of 10 district arguments. You lost the two VRA claims — a court ordered two districts redrawn. The litigation itself became a political liability as discovery produced internal emails discussing partisan intent. Those emails will be in law school textbooks.",
      },
      {
        id: 'concede-one-district',
        label: 'Proactively redraw the two most vulnerable districts before trial',
        description: "Concede the weakest two districts, redraw them to eliminate the legal exposure, and protect the other 13.",
        effects: { legalDefensibility: 16, vraCompliance: 12, publicSupport: 8, bipartisanSupport: 10, fairness: 8 },
        feedback:
          "The proactive redraw was a strategic masterstroke. The court dismissed two of three lawsuits as moot. The remaining partisan gerrymandering claim was substantially weakened. 'When a state voluntarily corrects problems before trial, it signals good faith,' wrote the judge. The final ruling upheld 13 of 15 districts.",
      },
      {
        id: 'consent-decree',
        label: 'Negotiate a consent decree with the civil rights plaintiffs',
        description: "Settle the VRA lawsuit by agreeing to specific district standards under court supervision. Close the biggest legal risk.",
        effects: { vraCompliance: 18, legalDefensibility: 14, publicSupport: 10, bipartisanSupport: 12, fairness: 12 },
        feedback:
          "The consent decree took three months to negotiate but resolved the most dangerous legal claim. Civil rights groups called it 'a historic settlement.' The court retained oversight jurisdiction for one redistricting cycle. The remaining partisan gerrymandering claim was heard without the VRA issue muddying the case, and the court upheld the map.",
      },
    ],
  },
  {
    id: 'court-ruling',
    title: 'The Court Ruling',
    shortDescription:
      "The federal district court has issued its ruling. The case now determines the maps for the next decade — affecting 15 congressional seats, millions of voters, and the balance of power in Congress. The judge's decision is complex: some districts upheld, others under scrutiny. Your next move determines whether this ends here or goes to the Supreme Court.",
    civicLesson:
      "Federal courts have broad power in redistricting cases. They can uphold maps, require specific modifications, impose interim maps, or appoint special masters to draw new lines. The remedial phase — what happens after a court finds a violation — is often more consequential than the liability phase. Courts typically give legislatures a chance to redraw before imposing their own map. If Congress changes before a case is resolved, courts must decide whether to apply the ruling retroactively. Redistricting cases from the 2020 cycle are still being decided.",
    choices: [
      {
        id: 'accept-ruling',
        label: 'Accept the court modifications and implement the map',
        description: "Work with the court to implement the required changes. End the litigation, get stability, move on.",
        effects: { legalDefensibility: 12, publicSupport: 14, fairness: 10, bipartisanSupport: 12 },
        feedback:
          "Your decision to accept the ruling immediately was praised by every editorial board in the state. The court's modifications changed three districts. The final map — a blend of your legislature's work and the court's corrections — took effect in time for the primary. Legal scholars called the process 'imperfect but functional democracy at work.'",
      },
      {
        id: 'appeal-scotus',
        label: 'Appeal to the Supreme Court — this ruling sets a national precedent',
        description: "Fight this to the end. If you win at SCOTUS, you set precedent that protects redistricting plans across the country.",
        effects: { legalDefensibility: -8, publicSupport: -10, bipartisanSupport: -10, fairness: -6 },
        feedback:
          "The Supreme Court took the case. Oral arguments were heated. The Court ruled 5-4 to remand for further proceedings — not a win, not a loss. Meanwhile, your state held two elections under a court-imposed interim map while the litigation continued. The uncertainty cost your party three seats they would have held under a settled map.",
      },
      {
        id: 'redraw-under-supervision',
        label: "Work with a court-appointed special master to redraw the challenged districts",
        description: "Proactively propose a supervised redraw. Retain some legislative input while demonstrating compliance.",
        effects: { fairness: 16, legalDefensibility: 14, publicSupport: 12, bipartisanSupport: 14, vraCompliance: 8 },
        feedback:
          "The supervised redraw was completed in 60 days. The special master — a retired federal judge — praised your team's cooperation. The resulting three districts were upheld unanimously on appeal. The process became a model cited by courts in four other states facing similar redistricting disputes.",
      },
    ],
  },
];
