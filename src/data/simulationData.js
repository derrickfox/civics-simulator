export const stages = [
  {
    id: 'citizen-idea',
    title: 'Citizen Idea',
    shortDescription:
      'Every law starts with a problem someone wants to solve. A concerned parent noticed that drivers speed through school zones, making it dangerous for students to cross the street. Now they want to turn their idea into a law.',
    civicLesson:
      'In a democracy, any citizen can propose an idea for a new law. Most successful legislation begins with ordinary people who identify a problem in their community and bring it to the attention of their elected representatives. This is the foundation of representative government.',
    choices: [
      {
        id: 'petition',
        label: 'Start a neighborhood petition',
        description:
          'Gather signatures from parents, teachers, and residents to show widespread support before approaching a representative.',
        effects: { publicSupport: +15, mediaAttention: +10 },
        feedback:
          'Great start! You collected over 500 signatures in a week. Local news picked up the story, and your representative\'s office has taken notice.'
      },
      {
        id: 'town-hall',
        label: 'Speak at a town hall meeting',
        description:
          'Present the safety data and personal stories at a public city council meeting to build credibility.',
        effects: { publicSupport: +10, committeeSupport: +10, mediaAttention: +5 },
        feedback:
          'Your presentation was compelling. Council members were moved by the safety data, and a local TV station covered your speech.'
      },
      {
        id: 'direct-contact',
        label: 'Contact your representative directly',
        description:
          'Write a detailed letter to your state representative with accident statistics and a proposed solution.',
        effects: { committeeSupport: +15, budgetConcern: -5 },
        feedback:
          'Your representative responded within a week — they were already aware of the issue and are eager to sponsor a bill.'
      }
    ]
  },
  {
    id: 'representatives-office',
    title: "Representative's Office",
    shortDescription:
      'A state representative has agreed to sponsor the Safe Crosswalks Near Schools Act. Now you need to help shape the strategy for getting it through the legislature.',
    civicLesson:
      'A bill sponsor is a legislator who officially introduces and advocates for a piece of legislation. Sponsors are crucial because they use their political relationships and knowledge of the legislative process to shepherd the bill forward. Finding the right sponsor can make or break a bill.',
    choices: [
      {
        id: 'bipartisan',
        label: 'Recruit a bipartisan co-sponsor',
        description:
          'Work to get a representative from the opposing party to co-sponsor the bill, showing it has broad support.',
        effects: { committeeSupport: +20, oppositionStrength: -10, publicSupport: +5 },
        feedback:
          'Excellent strategy! With a co-sponsor from across the aisle, the bill is now seen as a common-sense safety measure rather than a partisan issue.'
      },
      {
        id: 'committee-allies',
        label: 'Build relationships with committee chairs',
        description:
          'Spend time briefing key committee members before the bill is formally introduced.',
        effects: { committeeSupport: +15, budgetConcern: -10 },
        feedback:
          'Your groundwork paid off. Committee chairs feel respected and consulted, making them more likely to give the bill a fair hearing.'
      },
      {
        id: 'press-release',
        label: 'Issue a major press release',
        description:
          'Launch the bill with a public announcement to generate media buzz and public pressure.',
        effects: { publicSupport: +15, mediaAttention: +20, oppositionStrength: +10 },
        feedback:
          'The press release generated significant buzz — but it also alerted opposition groups who are now mobilizing against the bill.'
      }
    ]
  },
  {
    id: 'drafting',
    title: 'Drafting',
    shortDescription:
      'The bill needs to be written in precise legal language. The scope and detail of the legislation will determine its cost, impact, and political viability.',
    civicLesson:
      'Bill drafting is both a legal and political process. Legislative staff and attorneys must translate a policy idea into specific, enforceable legal language. The scope of a bill — how broad or narrow it is — significantly affects its chances of passing, its cost, and its real-world impact.',
    choices: [
      {
        id: 'pilot-program',
        label: 'Create a small pilot program near 10 schools',
        description:
          'Start with a limited pilot to test effectiveness and control costs before expanding.',
        effects: { publicSupport: +5, budgetConcern: -10, implementationDifficulty: -10 },
        feedback:
          'A cautious but smart approach. Budget hawks are reassured by the limited scope, and you\'ll have data to justify expansion later.'
      },
      {
        id: 'citywide',
        label: 'Create a citywide crosswalk program near every school',
        description:
          'Go big — address safety at all schools at once for maximum impact.',
        effects: { publicSupport: +20, budgetConcern: +25, implementationDifficulty: +15 },
        feedback:
          'Parents love the ambition, but the price tag is raising eyebrows. Budget committee members are already expressing concern.'
      },
      {
        id: 'speed-cameras',
        label: 'Add speed cameras and traffic-calming redesigns',
        description:
          'Include automated enforcement and street redesigns for a comprehensive safety overhaul.',
        effects: {
          publicSupport: +10,
          budgetConcern: +20,
          oppositionStrength: +15,
          mediaAttention: +20
        },
        feedback:
          'Speed cameras are controversial — civil liberties groups and some parent organizations are pushing back, but safety advocates are enthusiastic.'
      }
    ]
  },
  {
    id: 'committee-hearing',
    title: 'Committee Hearing',
    shortDescription:
      'The bill has been assigned to the Transportation Safety Committee. You need to choose who testifies to make the strongest possible case.',
    civicLesson:
      'Committee hearings are where most of the real work of legislation happens. Committees examine bills in detail, hear from experts and stakeholders, and decide whether a bill deserves a full vote. Roughly 90% of bills die in committee — so winning over committee members is critical.',
    choices: [
      {
        id: 'parents-students',
        label: 'Invite parents and students to testify',
        description:
          'Personal stories from affected families create emotional resonance and public sympathy.',
        effects: { publicSupport: +15, mediaAttention: +10 },
        feedback:
          'The hearing room was packed. A student\'s tearful testimony about a close call at a crosswalk made the evening news.'
      },
      {
        id: 'engineers',
        label: 'Invite traffic engineers and safety experts',
        description:
          'Technical credibility from professionals can address concerns about effectiveness.',
        effects: { committeeSupport: +20, oppositionStrength: -5 },
        feedback:
          'The data was irrefutable. Engineers presented accident statistics and proven safety interventions that impressed skeptical committee members.'
      },
      {
        id: 'budget-analysts',
        label: 'Invite budget analysts',
        description:
          'Address the elephant in the room by having fiscal experts explain the costs and potential savings.',
        effects: { budgetConcern: -10, committeeSupport: +10 },
        feedback:
          'Smart move. The analysts showed that improved crosswalks could reduce costly accidents, partially offsetting the investment.'
      },
      {
        id: 'disability-advocates',
        label: 'Invite disability advocates',
        description:
          'Highlight how safer crosswalks benefit students with disabilities and mobility challenges.',
        effects: {
          publicSupport: +10,
          committeeSupport: +15,
          mediaAttention: +15
        },
        feedback:
          'Advocates broadened the coalition, showing the bill helps all students. Their testimony shifted two undecided committee members.'
      }
    ]
  },
  {
    id: 'amendments',
    title: 'Amendments',
    shortDescription:
      'Committee members want to modify the bill before advancing it. Each proposed amendment is a trade-off between getting votes and preserving the bill\'s original goals.',
    civicLesson:
      'Amendments are changes made to a bill during the legislative process. Accepting amendments can be a necessary compromise to build a winning coalition, but too many changes can weaken a bill\'s effectiveness. Skilled legislators know when to compromise and when to hold firm.',
    choices: [
      {
        id: 'pilot-compromise',
        label: 'Accept a pilot-program compromise',
        description:
          'Limit the initial rollout to reduce costs, with a promise to expand if the pilot succeeds.',
        effects: {
          committeeSupport: +15,
          budgetConcern: -15,
          publicSupport: -5
        },
        feedback:
          'Committee members are satisfied with the fiscal restraint. Some advocates are disappointed by the limited scope, but the bill is moving forward.'
      },
      {
        id: 'remove-cameras',
        label: 'Remove speed cameras from the bill',
        description:
          'Drop the most controversial element to reduce opposition and simplify the legislation.',
        effects: {
          oppositionStrength: -20,
          budgetConcern: -10,
          publicSupport: -10
        },
        feedback:
          'Opposition groups stand down. The bill is simpler and cheaper, though safety advocates wish the enforcement provision had stayed.'
      },
      {
        id: 'delay-implementation',
        label: 'Delay implementation by one year',
        description:
          'Give agencies more time to prepare, reducing implementation risk and budget pressure.',
        effects: {
          committeeSupport: +10,
          implementationDifficulty: -15,
          publicSupport: -15
        },
        feedback:
          'The delay calmed fiscal worries, but parents who wanted action this school year are frustrated by the wait.'
      },
      {
        id: 'no-amendments',
        label: 'Refuse all amendments',
        description:
          'Stand firm on the original bill to preserve its full impact.',
        effects: {
          committeeSupport: -20,
          oppositionStrength: +10
        },
        feedback:
          'Your principled stand impressed advocates, but committee members feel disrespected. The bill is in serious jeopardy.'
      }
    ]
  },
  {
    id: 'floor-debate',
    title: 'Floor Debate',
    shortDescription:
      'The bill has cleared committee and reached the full chamber floor. Legislators on both sides will debate the merits, costs, and politics of the bill.',
    civicLesson:
      'Floor debate is where all members of a legislative chamber discuss a bill openly before voting. Legislators may make impassioned speeches, raise procedural objections, or propose last-minute amendments. A good floor debate strategy can swing undecided votes and shape public opinion.',
    choices: [
      {
        id: 'emotional-appeal',
        label: 'Lead with an emotional safety appeal',
        description:
          'Open the debate with stories of students injured at unsafe crosswalks to connect with legislators as parents.',
        effects: { publicSupport: +10, mediaAttention: +15, committeeSupport: +5 },
        feedback:
          'Your speech dominated the evening news. Legislators\' phones lit up with constituent calls supporting the bill.'
      },
      {
        id: 'fiscal-argument',
        label: 'Lead with a cost-benefit argument',
        description:
          'Focus on long-term savings from reduced accidents and insurance costs to win over fiscal conservatives.',
        effects: { budgetConcern: -15, committeeSupport: +10, oppositionStrength: -10 },
        feedback:
          'Your economic framing won over three previously undecided legislators. The bill now looks like smart fiscal policy.'
      },
      {
        id: 'procedural-shield',
        label: 'Use procedural rules to limit debate time',
        description:
          'Invoke rules to keep debate focused and prevent opponents from stalling with long speeches.',
        effects: { committeeSupport: +5, oppositionStrength: -5, publicSupport: -5 },
        feedback:
          'Debate moved quickly, but some legislators felt their voices were silenced. The move drew minor criticism but kept the schedule on track.'
      }
    ]
  },
  {
    id: 'vote',
    title: 'Vote',
    shortDescription:
      'The moment of truth — the full chamber votes on the Safe Crosswalks Near Schools Act. Your choices throughout the process all come down to this.',
    civicLesson:
      'Legislative votes can be conducted in several ways: voice votes (all say "aye" or "nay" together), standing votes, or roll-call votes where each member\'s vote is recorded by name. Roll-call votes create a public record of accountability, but can also expose legislators to political risk.',
    choices: [
      {
        id: 'immediate-vote',
        label: 'Call for an immediate voice vote',
        description:
          'Move quickly while momentum is on your side — a voice vote avoids putting legislators on the record.',
        effects: {},
        feedback:
          'The vote proceeds swiftly. Your bill\'s fate is now determined by the support you\'ve built throughout this process.'
      },
      {
        id: 'roll-call',
        label: 'Request a roll-call vote for maximum transparency',
        description:
          'Force every legislator to go on the record — this increases accountability but may spook fence-sitters.',
        effects: { mediaAttention: +15, publicSupport: +5 },
        feedback:
          'The recorded vote creates a clear accountability moment. Constituents will know exactly how their representatives voted.'
      },
      {
        id: 'table',
        label: 'Table it for next session',
        description:
          'Delay the vote to next session — sometimes retreat preserves a bill for a stronger push later.',
        effects: { publicSupport: -20, committeeSupport: -15 },
        feedback:
          'The bill is shelved for now. Momentum is lost, and supporters are disappointed. This will be an uphill climb to revive.',
        tabled: true
      }
    ]
  },
  {
    id: 'other-chamber',
    title: 'Other Chamber',
    shortDescription:
      'The bill passed the first chamber! Now it must go through the same process in the other legislative chamber, which may have different priorities and members.',
    civicLesson:
      'In a bicameral legislature (two chambers, like the U.S. Senate and House), a bill must pass both chambers in identical form to become law. The second chamber may amend the bill, requiring a conference committee to reconcile differences. This system creates additional checks on legislation.',
    choices: [
      {
        id: 'lobby-second-chamber',
        label: 'Personally lobby key members of the other chamber',
        description:
          'Meet one-on-one with influential members to address their specific concerns and build relationships.',
        effects: { committeeSupport: +15, oppositionStrength: -10 },
        feedback:
          'Your direct outreach built crucial relationships. Three influential members who were on the fence are now committed supporters.'
      },
      {
        id: 'grassroots-pressure',
        label: 'Mobilize grassroots pressure in the other chamber\'s districts',
        description:
          'Organize constituent calls, emails, and visits to legislators in the second chamber.',
        effects: { publicSupport: +15, mediaAttention: +10, budgetConcern: +5 },
        feedback:
          'The grassroots effort showed legislators their constituents care. The second chamber\'s leadership agreed to fast-track the bill.'
      },
      {
        id: 'accept-changes',
        label: 'Accept the other chamber\'s proposed changes',
        description:
          'Agree to modifications the second chamber wants to speed up the process and avoid a conference committee.',
        effects: {
          committeeSupport: +10,
          implementationDifficulty: -10,
          publicSupport: -5
        },
        feedback:
          'The compromise reduced delays but required giving up some provisions. The bill emerges slightly different but still effective.'
      }
    ]
  },
  {
    id: 'executive-signature',
    title: 'Executive Signature or Veto',
    shortDescription:
      'The bill has passed both chambers and now sits on the Governor\'s desk. The executive must decide whether to sign it into law, veto it, or let it become law without a signature.',
    civicLesson:
      'The executive veto is a critical check on legislative power. A governor or president can reject a bill, but the legislature can override a veto with a supermajority (usually two-thirds). Executives often use the threat of veto to shape legislation before it ever reaches their desk.',
    choices: [
      {
        id: 'governor-signs',
        label: 'The Governor signs the bill into law',
        description:
          'The Governor, impressed by public support and bipartisan backing, signs the bill at a school ceremony.',
        effects: { publicSupport: +15, mediaAttention: +20, implementationDifficulty: -5 },
        feedback:
          'Historic moment! The Governor signed the Safe Crosswalks Near Schools Act into law surrounded by students, parents, and advocates.',
        isSignature: true
      },
      {
        id: 'governor-veto',
        label: 'The Governor vetoes the bill',
        description:
          'Citing budget concerns, the Governor rejects the bill — unless the legislature can override the veto.',
        effects: { publicSupport: -10, budgetConcern: -20, committeeSupport: -15 },
        feedback:
          'A setback, but not necessarily the end. If your coalition is strong enough, the legislature can attempt a veto override.',
        isVeto: true
      },
      {
        id: 'conditional-signing',
        label: 'The Governor signs with conditions',
        description:
          'The Governor signs but directs agencies to implement the bill in phases based on available funding.',
        effects: {
          publicSupport: +5,
          budgetConcern: -10,
          implementationDifficulty: +10
        },
        feedback:
          'A pragmatic outcome. The bill becomes law but with strings attached — implementation will require ongoing advocacy to ensure full funding.'
      }
    ]
  },
  {
    id: 'implementation',
    title: 'Implementation',
    shortDescription:
      'The bill is law! Now the real work begins — government agencies must put the policy into practice, and the quality of implementation determines whether the law actually achieves its goals.',
    civicLesson:
      'Passing a law is only the first step. Implementation — how agencies translate law into action — often determines whether legislation succeeds. Underfunded mandates, bureaucratic delays, and weak enforcement can all undermine good laws. Civic engagement doesn\'t end at the signing ceremony.',
    choices: [
      {
        id: 'full-funding',
        label: 'Advocate for full first-year funding in the budget',
        description:
          'Work with budget committees to ensure the new law receives complete funding from day one.',
        effects: { implementationDifficulty: -20, publicSupport: +10, budgetConcern: +10 },
        feedback:
          'Full funding secured! Construction crews are marking crosswalks at schools across the district this summer — right on schedule.'
      },
      {
        id: 'oversight-committee',
        label: 'Establish a citizen oversight committee',
        description:
          'Create a committee of parents, advocates, and experts to monitor and report on implementation progress.',
        effects: {
          implementationDifficulty: -15,
          publicSupport: +5,
          mediaAttention: +10
        },
        feedback:
          'The oversight committee caught several bureaucratic delays early and kept agencies accountable. Implementation is proceeding smoothly.'
      },
      {
        id: 'minimal-oversight',
        label: 'Trust agencies to implement without extra oversight',
        description:
          'Let government agencies handle the details on their own timeline.',
        effects: { implementationDifficulty: +10, publicSupport: -5 },
        feedback:
          'Without oversight, implementation has been slow and inconsistent. Only half the schools received improvements by the original deadline.'
      }
    ]
  }
];

export const INITIAL_STATE = {
  publicSupport: 50,
  budgetConcern: 30,
  committeeSupport: 40,
  oppositionStrength: 35,
  mediaAttention: 20,
  implementationDifficulty: 40,
  voteCount: 0,
  currentStage: 0,
  completedStages: [],
  stageChoices: {},
  feedbackVisible: false,
  lastChoice: null,
  oldState: null,
  isComplete: false,
  passed: null
};
