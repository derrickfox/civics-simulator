export const INITIAL_BUDGET_STATE = {
  publicSupport: 45,
  bipartisanSupport: 40,
  deficitControl: 50,
  programFunding: 48,
  economicOutlook: 50,
  passageChance: 42,
  currentStage: 0,
  completedStages: [],
  stageChoices: {},
  feedbackVisible: false,
  lastChoice: null,
  oldState: null,
  isComplete: false,
  passed: null,
  shutdown: false,
};

export const budgetStages = [
  {
    id: 'presidents-request',
    title: "President's Budget Request",
    shortDescription:
      "The President has submitted a $7.3 trillion budget proposal to Congress. It funds new domestic programs and a defense increase, partially offset by taxes on high earners. As a senior senator on the Budget Committee, you set the tone for how Congress will respond.",
    civicLesson:
      "Each February, the President submits a detailed budget request to Congress — but it's just a proposal. Congress has the actual power of the purse. The President's budget is often called 'dead on arrival,' but it sets the opening bid and frames the debate for the entire year.",
    choices: [
      {
        id: 'accept-framework',
        label: "Adopt the President's framework as the starting point",
        description: 'Signal bipartisan openness — build the congressional budget on top of the White House proposal.',
        effects: { publicSupport: 8, programFunding: 10, passageChance: 8, deficitControl: -8 },
        feedback:
          "Your decision to work from the President's framework drew praise from the White House and progressive caucus. Deficit hawks are already sharpening their pencils, but you've set a collaborative tone.",
      },
      {
        id: 'counter-budget',
        label: 'Propose a congressional counter-budget with deficit focus',
        description: 'Assert congressional independence — submit your own leaner framework that prioritizes fiscal responsibility.',
        effects: { deficitControl: 12, bipartisanSupport: 10, programFunding: -8, publicSupport: 3 },
        feedback:
          "Your counter-proposal drew endorsements from three Republican colleagues and earned a Wall Street Journal editorial board praise. Progressive groups are frustrated, but you've established fiscal credibility.",
      },
      {
        id: 'bipartisan-working-group',
        label: 'Launch a bipartisan working group before any formal response',
        description: 'Bring both parties to the table early — delay the formal budget resolution to build real consensus.',
        effects: { bipartisanSupport: 18, passageChance: 12, publicSupport: 6, deficitControl: 3 },
        feedback:
          "The working group — 6 Democrats, 6 Republicans — got wall-to-wall media coverage. It's slower, but members from both sides are invested in a deal before the formal process even starts.",
      },
    ],
  },
  {
    id: 'cbo-score',
    title: 'The CBO Score',
    shortDescription:
      "The Congressional Budget Office scores the current proposal at $820 billion more than the White House claimed over 10 years. The CBO's math is damaging the bill's momentum — everyone is asking how you respond to a number you can't ignore.",
    civicLesson:
      "The Congressional Budget Office is a nonpartisan agency that scores the cost of legislation. CBO scores can make or break a budget bill — if the numbers come back too high, it triggers automatic rules (like the Byrd Rule or PAYGO) that can kill the legislation. Every budget fight includes a battle over CBO assumptions.",
    choices: [
      {
        id: 'adjust-proposal',
        label: 'Accept the CBO score and cut the proposal to match',
        description: "Demonstrate fiscal discipline — revise the bill to stay within the CBO's projections.",
        effects: { deficitControl: 14, bipartisanSupport: 10, programFunding: -12, publicSupport: -4 },
        feedback:
          "Cutting to the CBO number was painful — you dropped the child care expansion and trimmed the infrastructure package. But deficit hawks are now onboard, and the bill passed committee unanimously.",
      },
      {
        id: 'challenge-cbo',
        label: "Challenge the CBO's methodology publicly",
        description: "Argue the CBO underestimates growth and uses outdated models. Fight the score, not the spending.",
        effects: { publicSupport: 8, bipartisanSupport: -12, passageChance: -8, deficitControl: -5 },
        feedback:
          "Your challenge fired up your base but angered the Senate's budget hawks and the CBO's defenders. Three potential Republican allies walked away. The score still stands.",
      },
      {
        id: 'dynamic-scoring',
        label: 'Request a dynamic score accounting for economic growth',
        description: 'Ask the CBO to model economic multiplier effects — investment now generates revenue later.',
        effects: { programFunding: 10, economicOutlook: 12, deficitControl: -5, bipartisanSupport: 3 },
        feedback:
          "The dynamic score improved the numbers by $380B over 10 years. It's a legitimate method, but your opponents called it 'magic math.' Economists are split. The bill looks better on paper.",
      },
    ],
  },
  {
    id: 'house-committee',
    title: 'House Budget Committee Markup',
    shortDescription:
      "The House Budget Committee is controlled by deficit hawks who want $450 billion in spending cuts before they'll advance the bill. You're negotiating with the House chairman — whatever you agree to here shapes the entire House version.",
    civicLesson:
      "The budget markup process is where the real legislative sausage is made. Committee chairs have enormous power to add, cut, and reshape spending. Senators often negotiate directly with their House counterparts to avoid having to reconcile wildly different versions later. A deal in committee is easier than a fight on the floor.",
    choices: [
      {
        id: 'accept-cuts',
        label: 'Accept deep discretionary spending cuts to move the bill forward',
        description: 'Give the deficit hawks most of what they want — take the cuts now to keep the bill alive.',
        effects: { deficitControl: 15, bipartisanSupport: 12, programFunding: -15, passageChance: 10 },
        feedback:
          "The cuts were steep — Head Start, Pell Grants, and housing vouchers all took hits. But the House chairman gave you a handshake deal, and the bill moved out of committee 28–5. Painful, but alive.",
      },
      {
        id: 'targeted-cuts',
        label: 'Propose targeted cuts in duplicative and inefficient programs',
        description: "Find $200B through program consolidation and waste elimination rather than broad cuts.",
        effects: { bipartisanSupport: 8, economicOutlook: 6, deficitControl: 8, programFunding: -5 },
        feedback:
          "Your targeted cuts — eliminating 14 redundant federal agencies and consolidating overlapping grant programs — won praise from good-government groups. The House hawks wanted more, but accepted the deal.",
      },
      {
        id: 'tax-loopholes',
        label: 'Demand cuts come from closing corporate tax loopholes',
        description: "Reject spending cuts entirely — offset the deficit through revenue from tax enforcement and closing loopholes.",
        effects: { publicSupport: 14, programFunding: 12, bipartisanSupport: -14, deficitControl: 5 },
        feedback:
          "Your tax-loophole push energized progressives and polled at 68% with the public. But the House chairman walked out of negotiations. You'll need to find those votes elsewhere.",
      },
    ],
  },
  {
    id: 'senate-resolution',
    title: 'Senate Budget Resolution',
    shortDescription:
      "The Senate is split 51–49 and you need 60 votes to avoid a filibuster. Three moderate senators from the other party are genuinely persuadable — but each one has a specific ask. You can't get all three without making trade-offs.",
    civicLesson:
      "Senate budget rules are among the most complex in American law. A budget resolution only needs 51 votes, but appropriations bills need 60. The reconciliation process allows certain budget-related changes to pass with just 51, but it's limited by the Byrd Rule — provisions must be budget-related or they're stripped out. These procedural rules shape the substance of every budget.",
    choices: [
      {
        id: 'win-moderates',
        label: 'Cut deals with three moderate senators on targeted investments',
        description: "Give each persuadable senator a win in their state — a bridge, a hospital, a military base.",
        effects: { bipartisanSupport: 18, passageChance: 14, deficitControl: -8, economicOutlook: 5 },
        feedback:
          "Senator Collins got her fisheries program. Senator Manchin got the natural gas pipeline review. Senator Murkowski got Arctic research funding. All three voted yes. You have your 60.",
      },
      {
        id: 'reconciliation-only',
        label: 'Use reconciliation — pass it with 51 votes, no deals needed',
        description: 'Invoke the reconciliation process and cut out the Republicans entirely. Faster, but more partisan.',
        effects: { passageChance: 8, programFunding: 10, bipartisanSupport: -16, deficitControl: 6 },
        feedback:
          "Reconciliation passed the Senate floor 51–49. Republicans are furious and vowing to strip out provisions under the Byrd Rule. The bill will emerge leaner and more partisan than you hoped.",
      },
      {
        id: 'delay-negotiate',
        label: 'Delay the vote and spend two more weeks in direct negotiation',
        description: "Take more time to build a stronger coalition — risk a short-term continuing resolution while you negotiate.",
        effects: { bipartisanSupport: 12, passageChance: 6, economicOutlook: -5, publicSupport: -6 },
        feedback:
          "The delay produced two more Republican co-sponsors but cost you a month. Markets and bond ratings agencies issued warnings about fiscal uncertainty. The extra time paid off in votes, not optics.",
      },
    ],
  },
  {
    id: 'defense-appropriations',
    title: 'Defense Appropriations',
    shortDescription:
      "The Pentagon has requested an 8% increase — $62 billion more than last year. Defense hawks say it's the minimum needed for modernization. The Progressive Caucus calls it a windfall for contractors. You're casting the decisive vote.",
    civicLesson:
      "Defense spending is the single largest discretionary line item in the federal budget, making up about half of all discretionary spending. Appropriations bills originate in the House and must pass both chambers. The defense bill is usually passed first and sets the tone for the rest of the appropriations process.",
    choices: [
      {
        id: 'full-defense',
        label: "Fund the Pentagon's full 8% request",
        description: 'Support the military — fund modernization, readiness, and the new procurement programs the Pentagon requested.',
        effects: { bipartisanSupport: 12, deficitControl: -12, economicOutlook: 5, passageChance: 8 },
        feedback:
          "The defense hawks delivered 15 Republican votes you didn't have before. The Joint Chiefs praised the bill in a public statement. But your deficit number just got significantly worse.",
      },
      {
        id: 'inflation-only',
        label: 'Fund defense at inflation — 3% increase',
        description: 'Hold the line on the defense budget — real increases, but not the windfall the Pentagon requested.',
        effects: { deficitControl: 10, economicOutlook: 3, bipartisanSupport: -6, programFunding: 5 },
        feedback:
          "The 3% approach saved $40B and freed room for domestic programs. Defense hawks are grumbling, but moderate Republicans stayed with you. The money shifted to infrastructure and workforce training.",
      },
      {
        id: 'reform-defense',
        label: 'Fund defense reforms — eliminate 3 legacy weapon systems, add readiness spending',
        description: 'Cut Cold War-era programs that Pentagon analysts say are wasteful; reinvest in cyber, readiness, and personnel.',
        effects: { deficitControl: 8, publicSupport: 12, economicOutlook: 8, bipartisanSupport: -4 },
        feedback:
          "The reform package was praised by defense reform groups and a bipartisan group of veterans. Three weapons contractors' lobbyists immediately launched attack campaigns. Overall, the Pentagon got more useful spending for less money.",
      },
    ],
  },
  {
    id: 'domestic-appropriations',
    title: 'Domestic Appropriations',
    shortDescription:
      "Education, housing, public health, and infrastructure are all underfunded relative to last year. The domestic appropriations bill is where these programs get their money — and where you decide whose priorities win.",
    civicLesson:
      "Domestic discretionary spending — everything from Head Start to the National Institutes of Health — makes up about 15% of the federal budget. Most of the budget debate focuses here even though mandatory spending (Social Security, Medicare, Medicaid) is far larger and harder to change. Appropriations bills must be passed every year, or the government shuts down.",
    choices: [
      {
        id: 'invest-domestic',
        label: 'Restore full funding plus add a $180B infrastructure investment',
        description: "Fund all domestic agencies at or above last year's levels and add a targeted infrastructure package.",
        effects: { programFunding: 18, publicSupport: 14, deficitControl: -14, economicOutlook: 8 },
        feedback:
          "The infrastructure investment — 40,000 miles of road, 200 bridges, universal broadband — generated enormous enthusiasm. The deficit number is concerning, but economists project positive returns within 7 years.",
      },
      {
        id: 'flat-domestic',
        label: 'Fund domestic programs at last year\'s level — no cuts, no increases',
        description: 'Hold the line — maintain existing programs without expanding them.',
        effects: { deficitControl: 6, programFunding: -4, publicSupport: -3, passageChance: 5 },
        feedback:
          "Flat funding is the path of least resistance. Agencies can operate. No programs are cut. No one is thrilled, but no one is threatening to vote no over this line item.",
      },
      {
        id: 'cut-domestic',
        label: 'Cut domestic discretionary 5% across the board',
        description: 'Show fiscal discipline — take equal cuts across every domestic agency.',
        effects: { deficitControl: 14, bipartisanSupport: 8, programFunding: -16, publicSupport: -12 },
        feedback:
          "The 5% cut satisfied deficit hawks and freed up $85B in savings. But education groups, hospital associations, and housing advocates ran attack ads in 22 congressional districts. Three House members flipped against the bill.",
      },
    ],
  },
  {
    id: 'floor-amendment',
    title: 'Floor Amendment Battle',
    shortDescription:
      "The bill is on the Senate floor. A powerful defense hawk has filed an amendment adding $200 billion in emergency defense spending — off budget, not counted against the deficit limit. The vote is tomorrow. Every senator is watching how you handle this.",
    civicLesson:
      "Floor amendments can completely rewrite a budget bill — or blow it up. Procedural votes (like cloture) often matter more than the final passage vote. A senator who controls the floor schedule has enormous power. 'Off-budget' designations are frequently used to add spending without triggering deficit rules, which critics call a gimmick and supporters call necessary flexibility.",
    choices: [
      {
        id: 'support-amendment',
        label: 'Support the amendment — lock in defense votes',
        description: "Voting yes wins you 8 Republican votes you desperately need. The off-budget designation keeps it out of the deficit score.",
        effects: { bipartisanSupport: 14, passageChance: 10, deficitControl: -10, economicOutlook: -4 },
        feedback:
          "The amendment passed 58–42. The defense coalition is now firmly behind your bill. Critics are hammering the 'off-budget gimmick,' but you have the votes to pass the underlying legislation.",
      },
      {
        id: 'oppose-amendment',
        label: 'Oppose the amendment — hold the line on the deficit',
        description: 'Vote no and whip against it. Off-budget tricks undermine fiscal integrity.',
        effects: { deficitControl: 12, economicOutlook: 6, bipartisanSupport: -12, passageChance: -6 },
        feedback:
          "The amendment failed 49–51. Defense hawks are furious and threatening to vote against the final bill. You held your fiscal principles, but you'll need to find new votes somewhere else.",
      },
      {
        id: 'compromise-amendment',
        label: 'Propose a substitute amendment — half the spending, fully offset',
        description: 'Meet the defense hawks halfway with $100B in new spending, paid for with cuts elsewhere.',
        effects: { bipartisanSupport: 10, passageChance: 8, deficitControl: 3, economicOutlook: 2 },
        feedback:
          "Your substitute passed 62–38. Both sides got something. The defense hawks got real money. Fiscal hawks got an offset. The press called it 'exactly the kind of compromise Washington forgot how to make.'",
      },
    ],
  },
  {
    id: 'conference-committee',
    title: 'Conference Committee',
    shortDescription:
      "The House passed a version $320 billion below the Senate's. You're on the conference committee, negotiating the final number. The House chairman wants $280B in cuts from the Senate version. Your Senate colleagues want no more than $120B in cuts. The deal has to happen here.",
    civicLesson:
      "When the House and Senate pass different versions of the same bill, a conference committee meets to produce a single compromise version. Conference reports cannot be amended — they go back to each chamber for a straight up-or-down vote. This gives conference committee members enormous power: whatever they agree to is what both chambers will vote on.",
    choices: [
      {
        id: 'accept-house-number',
        label: 'Accept the House number — take the deeper cuts',
        description: 'Give the House what they want to end the standoff and send the bill to the President.',
        effects: { deficitControl: 14, bipartisanSupport: 10, programFunding: -14, passageChance: 8 },
        feedback:
          "The House-number deal moved fast. The conference report was filed within 48 hours. House Republicans were pleased; Senate progressives threatened to vote no on the conference report but ultimately relented.",
      },
      {
        id: 'accept-senate-number',
        label: 'Hold the Senate number — push back on House cuts',
        description: 'Defend Senate priorities — take only $120B in cuts and force the House to accept the higher spending level.',
        effects: { programFunding: 12, publicSupport: 10, deficitControl: -8, passageChance: -6 },
        feedback:
          "The Senate held firm, and the House ultimately blinked. But it took 17 days of tense negotiation and two near-collapses. The conference report passed the House by only 4 votes.",
      },
      {
        id: 'split-with-offsets',
        label: 'Split the difference — $200B in cuts plus $120B in new revenue offsets',
        description: "Meet in the middle on cuts, but add revenue measures to compensate for program reductions.",
        effects: { bipartisanSupport: 12, deficitControl: 10, programFunding: 5, passageChance: 10 },
        feedback:
          "The split-and-offset deal was hailed as a 'genuine compromise' by every major newspaper. The new revenue came from IRS enforcement funding — projected to collect $240B in unpaid taxes over 10 years.",
      },
    ],
  },
  {
    id: 'reconciliation',
    title: 'Mandatory Spending Reform',
    shortDescription:
      "The reconciliation bill covers mandatory programs — Medicare, Medicaid, and Social Security. The budget needs $600 billion in 10-year savings from these programs to meet deficit targets. These decisions affect tens of millions of Americans.",
    civicLesson:
      "Mandatory spending — Social Security, Medicare, Medicaid, and interest on the debt — makes up about 65% of the entire federal budget and grows automatically each year. Unlike discretionary spending, it doesn't require annual appropriations. Reforming mandatory programs is the hardest thing in Washington: the beneficiaries are numerous, politically active, and vote at high rates.",
    choices: [
      {
        id: 'drug-pricing',
        label: 'Reform prescription drug pricing — allow Medicare to negotiate',
        description: 'Let Medicare negotiate drug prices directly with pharmaceutical companies. CBO estimates: $420B in savings.',
        effects: { deficitControl: 16, publicSupport: 18, bipartisanSupport: -10, economicOutlook: 8 },
        feedback:
          "The drug pricing reform polled at 84% favorability across party lines — the most popular provision in the entire bill. Pharmaceutical companies spent $180M fighting it. The provision survived.",
      },
      {
        id: 'means-test-medicare',
        label: 'Means-test Medicare — reduce benefits for high earners',
        description: 'High-income seniors would pay higher premiums. CBO estimates: $280B in savings.',
        effects: { deficitControl: 12, bipartisanSupport: 8, publicSupport: -14, programFunding: -6 },
        feedback:
          "Means-testing satisfied deficit hawks and picked up Republican support. But AARP ran a $60M attack campaign and seniors' groups called it 'a first step toward dismantling Medicare.' Polls dropped 9 points.",
      },
      {
        id: 'payment-shifts',
        label: "Use payment timing shifts — move payment dates across fiscal years",
        description: 'Technically reduce this year\'s deficit by shifting payment dates. CBO scores $220B in savings.',
        effects: { passageChance: 8, deficitControl: -4, bipartisanSupport: 4, economicOutlook: -6 },
        feedback:
          "The timing shifts are the oldest trick in the budget manual. It looks good on paper, doesn't actually change the long-term trajectory, and economists and rating agencies can see right through it. But it got the bill over the deficit target.",
      },
    ],
  },
  {
    id: 'presidential-signature',
    title: "Presidential Signature",
    shortDescription:
      "The budget conference report is on the President's desk. You've gotten it this far — but the President wants one last concession before signing: a $75 billion addition to a favorite priority program. If you refuse, a veto sends it back to Congress with 11 days before the fiscal year ends.",
    civicLesson:
      "The President can sign or veto any bill Congress sends. A veto can be overridden with a two-thirds vote in both chambers — almost never achievable on a budget bill. A presidential veto this late in the fiscal year typically triggers a continuing resolution (CR) or, if nothing passes, a government shutdown. The threat of a shutdown is a major source of presidential leverage.",
    choices: [
      {
        id: 'accept-presidents-ask',
        label: "Accept the President's request — add the $75B and sign",
        description: 'Give the President the win. The $75B addition is worth avoiding a shutdown or veto fight.',
        effects: { passageChance: 14, publicSupport: 8, deficitControl: -8, bipartisanSupport: 4 },
        feedback:
          "The President signed the budget in the Rose Garden. The $75B addition went to clean energy manufacturing credits — projected to create 200,000 jobs. The deficit number is slightly worse, but the budget is law.",
      },
      {
        id: 'negotiate-offset',
        label: 'Negotiate — offer the program but with a pay-for',
        description: "Give the President the priority but insist it be offset by closing a corporate tax loophole.",
        effects: { deficitControl: 8, bipartisanSupport: 6, publicSupport: 10, passageChance: 8 },
        feedback:
          "After 72 hours of negotiation, the President agreed to pair the $75B clean energy investment with the elimination of a fossil fuel subsidy. Both sides declared victory. The budget was signed by midnight.",
      },
      {
        id: 'dare-veto',
        label: "Send it as-is — dare the President to veto it",
        description: "Hold your ground. The President signed a budget that already reflects enormous compromise. No more additions.",
        effects: { publicSupport: 12, bipartisanSupport: -8, passageChance: -10, deficitControl: 6 },
        feedback:
          "The President vetoed it. The override vote fell 12 votes short in the House. Congress passed a 30-day continuing resolution to avoid a shutdown while you renegotiate. The standoff lasted 19 days.",
      },
    ],
  },
];
