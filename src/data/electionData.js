export const INITIAL_ELECTION_STATE = {
  nationalPolls: 42,
  battlegroundLead: 45,
  partyUnity: 60,
  undecidedWon: 35,
  campaignFunds: 55,
  mediaNarrative: 40,
  electoralVotes: 0,
  currentStage: 0,
  completedStages: [],
  stageChoices: {},
  feedbackVisible: false,
  lastChoice: null,
  oldState: null,
  isComplete: false,
  won: null,
  droppedOut: false,
};

export const electionStages = [
  {
    id: 'exploratory',
    title: 'Exploratory Committee',
    shortDescription:
      "Jordan Reyes has been floated as a presidential candidate. Before declaring, you need to test the waters — gauge support, assess the field, and decide how to enter the race.",
    civicLesson:
      "Most serious presidential campaigns begin with an exploratory committee — a formal structure for testing viability before officially declaring. Candidates use this phase to raise seed money, hire early staff, and gauge whether their message resonates. Timing and framing of an announcement can define a candidacy.",
    choices: [
      {
        id: 'announce-big',
        label: 'Launch with a major rally in your home state',
        description: 'Go big from day one — a large crowd, national press, and a bold policy vision.',
        effects: { nationalPolls: 8, mediaNarrative: 15, campaignFunds: 10, partyUnity: -5 },
        feedback:
          "The rally drew 12,000 supporters and dominated cable news for two days. You're in the race with momentum — but some party insiders think you jumped in too fast.",
      },
      {
        id: 'grassroots-announce',
        label: 'Announce via a grassroots video — no rally, just a message',
        description: 'Keep it authentic and digital-first to build a small-dollar fundraising base early.',
        effects: { campaignFunds: 18, undecidedWon: 8, mediaNarrative: 5, nationalPolls: 4 },
        feedback:
          "The video raised $2.3M in 48 hours from 40,000 small donors. The press called it 'scrappy and smart.' Your email list is your early superpower.",
      },
      {
        id: 'insider-rollout',
        label: 'Brief party leaders and major donors before announcing',
        description: 'Build the establishment coalition first — lock in endorsements before the public launch.',
        effects: { partyUnity: 18, campaignFunds: 15, mediaNarrative: 5, nationalPolls: 3 },
        feedback:
          "Three senators, two governors, and your party's biggest bundler are on board before you say a word publicly. The endorsements roll out the morning you announce.",
      },
    ],
  },
  {
    id: 'primary',
    title: 'The Primary',
    shortDescription:
      "Iowa and New Hampshire vote first. The entire field is fighting for early momentum. A strong showing here can clear the field; a weak one can end a campaign before Super Tuesday.",
    civicLesson:
      "Presidential primaries are state-by-state contests where party members choose their nominee. Iowa's caucuses and New Hampshire's primary carry outsized influence despite being small states — a strong finish generates media coverage and donor confidence that can reshape the whole race. Candidates who skip early states rarely recover.",
    choices: [
      {
        id: 'retail-politics',
        label: 'Go all-in on Iowa — meet voters at every diner and town hall',
        description: 'Spend weeks doing retail politics: small events, personal connection, local press.',
        effects: { partyUnity: 12, undecidedWon: 15, battlegroundLead: 5, mediaNarrative: 8 },
        feedback:
          "You shook 8,000 hands in 30 days. 'Jordan actually listened to me' became a local news meme. You placed second in Iowa and won New Hampshire outright.",
      },
      {
        id: 'tv-air-war',
        label: 'Blanket Iowa and New Hampshire with TV ads',
        description: 'Outspend the field on broadcast and digital to drive name recognition.',
        effects: { nationalPolls: 10, campaignFunds: -15, mediaNarrative: 10, battlegroundLead: 8 },
        feedback:
          "The ad blitz worked — you're the most recognized candidate going into voting day. But you burned through $18M faster than expected.",
      },
      {
        id: 'skip-iowa',
        label: 'Skip Iowa, focus all resources on Super Tuesday states',
        description: 'Gamble that early states are overrated and compete where the delegate math is larger.',
        effects: { nationalPolls: 5, battlegroundLead: 12, partyUnity: -15, mediaNarrative: -10 },
        feedback:
          "The press declared you 'out of the race' after Iowa — even though you weren't on the ballot. Party leaders are nervous. But your Super Tuesday operation is formidable.",
        droppedOut: false,
      },
    ],
  },
  {
    id: 'convention',
    title: 'The Convention',
    shortDescription:
      "You've secured enough delegates to win the nomination. Now the party gathers to formally nominate you, unify around your platform, and introduce you to the broadest audience of your life.",
    civicLesson:
      "The national party convention is where delegates formally nominate the presidential and vice-presidential candidates. The convention serves multiple purposes: energizing the party base, introducing the candidate to undecided voters, and signaling policy priorities through the party platform. A VP pick can reshape a campaign in a single day.",
    choices: [
      {
        id: 'unity-vp',
        label: 'Pick a VP who unifies a divided party',
        description: 'Choose a popular figure from the wing of the party you struggled with in the primary.',
        effects: { partyUnity: 22, mediaNarrative: 10, nationalPolls: 8, undecidedWon: 5 },
        feedback:
          "The pick electrified the convention. Even your primary rivals took the stage to endorse the ticket. The party is unified heading into the general.",
      },
      {
        id: 'battleground-vp',
        label: 'Pick a VP from a critical battleground state',
        description: "Prioritize electoral math — choose someone whose home state could flip.",
        effects: { battlegroundLead: 18, campaignFunds: 8, mediaNarrative: 8, partyUnity: 5 },
        feedback:
          "The pick makes Pennsylvania a home game. Your VP's favorability in the state is 20 points higher than yours. The Electoral College math just got friendlier.",
      },
      {
        id: 'bold-vp',
        label: 'Make a bold, unexpected VP pick to dominate the news cycle',
        description: 'Go outside conventional wisdom — pick someone who resets the narrative.',
        effects: { mediaNarrative: 20, undecidedWon: 10, nationalPolls: 10, partyUnity: -8 },
        feedback:
          "The pick broke the internet for 72 hours. Some party elders are skeptical, but the enthusiasm among younger voters and independents is real.",
      },
    ],
  },
  {
    id: 'debate',
    title: 'The Presidential Debate',
    shortDescription:
      "The first general election debate. 70 million viewers. Your opponent is sharp, disciplined, and well-funded. The whole country is watching — including millions of undecided voters who will make up their minds tonight.",
    civicLesson:
      "Presidential debates can be decisive moments in a campaign — or they can be irrelevant. Research shows undecided voters pay close attention to debates. Candidates must balance attack and vision, respond to unexpected moments, and avoid the 'gaffe' that dominates coverage for a week. How you handle pressure on stage tells voters something about how you'd handle the Oval Office.",
    choices: [
      {
        id: 'vision-debate',
        label: 'Lead with a forward-looking vision, avoid personal attacks',
        description: "Stay above the fray — let your opponent attack while you talk about the future.",
        effects: { undecidedWon: 15, mediaNarrative: 12, nationalPolls: 8, partyUnity: 5 },
        feedback:
          "Post-debate polls showed you winning with independents by 14 points. 'Presidential' was the word most undecided voters used to describe you.",
      },
      {
        id: 'attack-debate',
        label: 'Go on offense — draw sharp contrasts with your opponent',
        description: "Hit hard on your opponent's record and force them to play defense all night.",
        effects: { partyUnity: 10, mediaNarrative: 8, battlegroundLead: 10, undecidedWon: -5 },
        feedback:
          "Your base loved every punch. But focus groups showed moderate voters uncomfortable with the tone. It fired up your coalition but didn't grow it.",
      },
      {
        id: 'policy-debate',
        label: 'Go deep on policy — specific plans, real numbers',
        description: "Show you've done the homework. Detailed policy positions signal competence and seriousness.",
        effects: { mediaNarrative: 15, undecidedWon: 10, campaignFunds: 8, nationalPolls: 5 },
        feedback:
          "The press gave you the best post-debate reviews in years. Donors opened their checkbooks. Policy wonks declared you the clear winner.",
      },
    ],
  },
  {
    id: 'strategy',
    title: 'Campaign Strategy',
    shortDescription:
      "Six weeks out. The campaign has limited time and money. Every decision about where to spend resources — which states, which voter groups, which messages — is a trade-off. You can't be everywhere.",
    civicLesson:
      "Modern presidential campaigns are won in a handful of competitive 'battleground' or 'swing' states. Most states vote predictably for one party, so campaigns pour resources into states like Pennsylvania, Michigan, Wisconsin, Arizona, and Georgia. A campaign's strategic map — where it invests time, ads, and staff — reveals its theory of how to win 270 electoral votes.",
    choices: [
      {
        id: 'firewall-strategy',
        label: 'Lock down your base states, then expand the map',
        description: "Secure your most likely wins first, then invest remaining resources in reach states.",
        effects: { battlegroundLead: 10, campaignFunds: -5, mediaNarrative: 5 },
        feedback:
          "Your firewall states are solid. You've banked 230+ safe electoral votes and are now competing in two states your opponent thought were safe.",
      },
      {
        id: 'blue-wall-strategy',
        label: 'Go all-in on Pennsylvania, Michigan, and Wisconsin',
        description: "The traditional 'Blue Wall' — win all three and you're likely the next President.",
        effects: { battlegroundLead: 18, undecidedWon: 8, campaignFunds: -10, nationalPolls: 5 },
        feedback:
          "Your ground game in the Rust Belt is the best in a generation. Three polls in a row show you up in all three states.",
      },
      {
        id: 'sunbelt-strategy',
        label: 'Expand into Texas, Florida, and Georgia',
        description: "Bet on demographic shifts in the Sunbelt to open new Electoral College paths.",
        effects: { mediaNarrative: 12, undecidedWon: 12, battlegroundLead: 8, campaignFunds: -12 },
        feedback:
          "The gamble is paying off in Georgia and Arizona. Texas is still a stretch. Your opponent is now forced to defend states they considered safe.",
      },
    ],
  },
  {
    id: 'gotv',
    title: 'Get Out the Vote',
    shortDescription:
      "The final two weeks. Persuasion is over — now it's pure turnout. How you deploy your field operation, volunteers, and final dollars will determine whether your supporters actually vote.",
    civicLesson:
      "Get Out the Vote (GOTV) operations are among the most important factors in close elections. Research shows that personal contact — a neighbor knocking on your door or calling your phone — is more effective than TV ads at increasing turnout. A candidate can lead in polls and still lose if their supporters don't show up.",
    choices: [
      {
        id: 'ground-game',
        label: 'Deploy 50,000 volunteers for door-to-door canvassing',
        description: "The most proven GOTV method — personal contact with low-propensity voters.",
        effects: { battlegroundLead: 15, undecidedWon: 10, partyUnity: 8, mediaNarrative: 5 },
        feedback:
          "Your field office made 4 million voter contacts in the final 10 days. Early vote numbers in battleground counties are ahead of projections.",
      },
      {
        id: 'digital-blitz',
        label: 'Spend the final $20M on targeted digital advertising',
        description: "Micro-targeted ads on social media and streaming platforms to reach specific voter segments.",
        effects: { undecidedWon: 12, nationalPolls: 8, mediaNarrative: 8, campaignFunds: -18 },
        feedback:
          "Your digital team turned the last stretch into a real-time data operation. Turnout models show strong performance among your target demographics.",
      },
      {
        id: 'celebrity-push',
        label: 'Schedule high-profile concerts and rallies with celebrity surrogates',
        description: "Big events, big names, big news coverage — drive enthusiasm and earned media.",
        effects: { mediaNarrative: 18, partyUnity: 10, nationalPolls: 6, undecidedWon: 5 },
        feedback:
          "The closing rallies filled arenas. The energy is electric. Your base is fired up — and the earned media value of the events was incalculable.",
      },
    ],
  },
  {
    id: 'election-day',
    title: 'Election Day',
    shortDescription:
      "Polls are open across the country. Your campaign's rapid-response operation is monitoring turnout data, tracking lines, and dispatching lawyers where needed. The work is mostly done — but Election Day can still be won or lost.",
    civicLesson:
      "On Election Day, campaigns shift from persuasion to mobilization and protection. They track turnout in real-time, dispatch lawyers to polling sites where voters are being challenged, and run 'chase programs' to contact supporters who haven't voted yet. The mechanics of Election Day — ballot access, polling place hours, provisional ballots — can determine outcomes in close races.",
    choices: [
      {
        id: 'chase-program',
        label: 'Run an aggressive ballot chase and ride-to-polls operation',
        description: "Call every identified supporter who hasn't voted yet and offer rides, childcare, and help.",
        effects: { battlegroundLead: 12, undecidedWon: 5, partyUnity: 5 },
        feedback:
          "Your chase program contacted 800,000 people who hadn't voted by 4pm. Turnout in your strongest precincts is running 6 points above 2020.",
      },
      {
        id: 'legal-protection',
        label: 'Deploy election protection lawyers to every contested county',
        description: "Station legal observers at precincts in swing counties to challenge voter suppression in real time.",
        effects: { battlegroundLead: 8, mediaNarrative: 10, nationalPolls: 5 },
        feedback:
          "Your lawyers blocked three attempts to close polls early in key precincts. The story dominated afternoon cable news and may have driven turnout.",
      },
      {
        id: 'victory-lap',
        label: 'Hold a final noon rally to drive last-minute turnout',
        description: "A noon event in your strongest battleground city — pure energy and earned media.",
        effects: { mediaNarrative: 15, partyUnity: 8, undecidedWon: 5, battlegroundLead: 5 },
        feedback:
          "The noon rally images — huge crowd, American flags, your candidate beaming — dominated the afternoon news cycle. Turnout models are exceeding projections.",
      },
    ],
  },
  {
    id: 'electoral-count',
    title: 'Electoral College Count',
    shortDescription:
      "The votes are being counted. Networks are calling states. The electoral map is filling in. Your path to 270 is coming into focus — or narrowing. Everything depends on a handful of states still too close to call.",
    civicLesson:
      "The United States uses an Electoral College system where each state has a number of electors equal to its Congressional delegation. Voters technically vote for electors, not directly for president. A candidate needs 270 of 538 electoral votes to win. In most states, the winner of the popular vote wins all electoral votes ('winner-take-all'). This is why battleground states receive such outsized campaign attention.",
    choices: [
      {
        id: 'steady-messaging',
        label: 'Project calm and confidence — no premature victory claims',
        description: "Stay disciplined while results come in. Don't declare victory in close states.",
        effects: { mediaNarrative: 12, partyUnity: 8, nationalPolls: 5 },
        feedback:
          "Your measured tone reassured nervous supporters and contrasted sharply with your opponent's premature victory claims. The press praised your discipline.",
      },
      {
        id: 'rapid-response',
        label: 'Rapid-response every network call — keep your base energized',
        description: "React to every state call in real time with social media and campaign emails.",
        effects: { partyUnity: 12, campaignFunds: 5, mediaNarrative: 5 },
        feedback:
          "Your real-time communication kept supporters from doomscrolling. Small-dollar donations poured in through the night as each state was called.",
      },
      {
        id: 'legal-ready',
        label: 'Prepare legal teams for potential recounts and challenges',
        description: "In case the margin is narrow, have legal resources ready before results are certified.",
        effects: { battlegroundLead: 5, mediaNarrative: 5, partyUnity: 5 },
        feedback:
          "Your legal preparation proved decisive. A recount request in one state was handled swiftly, and the final margin was confirmed within 72 hours.",
      },
    ],
  },
  {
    id: 'certification',
    title: 'Certification',
    shortDescription:
      "Congress meets in joint session to certify the Electoral College results. The Vice President presides. Objections can be raised — but under the Electoral Count Reform Act, they require a supermajority to succeed. The transfer of power is almost complete.",
    civicLesson:
      "The certification of electoral votes is a constitutional requirement, not a formality. Under the Electoral Count Reform Act of 2022, Congress clarified that the Vice President's role is purely ceremonial and that only a supermajority can sustain objections. The peaceful transfer of power — the hallmark of American democracy — depends on both winners and losers accepting legitimate results.",
    choices: [
      {
        id: 'gracious-winner',
        label: 'Call your opponent personally before certification',
        description: "Reach out privately and publicly acknowledge the legitimacy of the process.",
        effects: { mediaNarrative: 15, partyUnity: 10, nationalPolls: 8, undecidedWon: 5 },
        feedback:
          "The call was leaked and praised universally. 'Presidential even before the inauguration' was the headline. Your approval rating jumped 6 points overnight.",
      },
      {
        id: 'unity-speech',
        label: 'Deliver a major national unity address before certification',
        description: "Use the moment to speak to the whole country, including those who didn't vote for you.",
        effects: { mediaNarrative: 18, undecidedWon: 12, nationalPolls: 8 },
        feedback:
          "The speech trended nationally for 24 hours. Late-night hosts praised it. Even opposition pundits called it 'exactly what the country needed.'",
      },
      {
        id: 'transition-focus',
        label: 'Focus on the transition — announce cabinet picks early',
        description: "Signal governing readiness by moving quickly on personnel and policy priorities.",
        effects: { mediaNarrative: 10, campaignFunds: 5, partyUnity: 8, nationalPolls: 5 },
        feedback:
          "Your transition announcements dominated the week. Markets responded positively. Washington insiders called it the most organized transition since 2008.",
      },
    ],
  },
  {
    id: 'inauguration',
    title: 'Inauguration Day',
    shortDescription:
      "January 20th. The Capitol steps. Chief Justice administering the oath. Hundreds of thousands on the National Mall. Jordan Reyes is about to become President of the United States.",
    civicLesson:
      "The presidential inauguration is mandated by the Constitution — the President must take the oath of office before assuming power. It is both a legal requirement and a democratic ritual, symbolizing the peaceful transfer of power. The inaugural address sets the tone for a presidency and is studied by historians for what it reveals about a leader's vision and priorities.",
    choices: [
      {
        id: 'unity-address',
        label: "Deliver an inaugural address focused on national unity",
        description: "Speak to all Americans — acknowledge divisions and call for common purpose.",
        effects: { mediaNarrative: 20, undecidedWon: 15, nationalPolls: 10, partyUnity: 5 },
        feedback:
          "The address was immediately compared to Lincoln's second inaugural. 'We are not enemies, but fellow citizens' trended on every platform for three days.",
      },
      {
        id: 'bold-agenda',
        label: "Open with a bold policy agenda — signal your first 100 days",
        description: "Use the address to lay out specific priorities and show voters you have a mandate.",
        effects: { partyUnity: 15, mediaNarrative: 12, campaignFunds: 8, nationalPolls: 8 },
        feedback:
          "Policy groups and advocacy organizations immediately rallied around your first 100-day agenda. Congress is already drafting legislation to match your priorities.",
      },
      {
        id: 'historical-moment',
        label: "Lean into the historic nature of the moment",
        description: "Acknowledge what this election means for the country and for future generations.",
        effects: { mediaNarrative: 18, undecidedWon: 12, nationalPolls: 8, partyUnity: 8 },
        feedback:
          "The images from the Capitol steps went around the world. 'This is what democracy looks like' was the global headline. Your approval rating started the presidency at 62%.",
      },
    ],
  },
];
