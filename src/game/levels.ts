export type Choice = {
  id: string;
  label: string;
  coins: number;        // delta
  xp: number;           // delta
  correct?: boolean;    // best choice
  badge?: string;       // award if chosen
  explanation: string;  // shown after pick
  loanEMI?: number;     // adds recurring EMI
  investment?: number;  // adds passive income per "month" tick
  flag?: string;        // narrative flag
};

export type Level = {
  id: number;
  title: string;
  chapter: string;
  emoji: string;
  scenario: string;
  question: string;
  choices: Choice[];
  intro?: string;
  miniGame?: "party" | "scam" | "subscriptions" | "boss";
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Discovery",
    chapter: "Chapter 1 · Awakening",
    emoji: "🌱",
    scenario: "You wake up curious about money. A wise mentor offers you a starter pouch and a promise: choices shape destiny.",
    question: "Accept the journey?",
    choices: [
      { id: "a", label: "Begin the quest", coins: 100, xp: 20, correct: true, explanation: "Curiosity is the first investment. You earned 100 coins to start.", badge: "First Step" },
    ],
  },
  {
    id: 2,
    title: "First Income",
    chapter: "Chapter 1 · Awakening",
    emoji: "💼",
    scenario: "Your first paycheck arrives: ₹5,000. The mall, a piggy bank, and a stock app all whisper your name.",
    question: "What do you do FIRST with your income?",
    choices: [
      { id: "a", label: "Save 30% before anything else", coins: 200, xp: 50, correct: true, explanation: "Pay yourself first. Saving before spending is the #1 wealth habit.", badge: "Saver" },
      { id: "b", label: "Spend it all on fun", coins: -150, xp: 10, explanation: "Lifestyle creep starts here. Fun is fine — but plan for it." },
      { id: "c", label: "YOLO into a hot stock", coins: -100, xp: 15, explanation: "Investing without a safety net is gambling. Build savings first." },
    ],
  },
  {
    id: 3,
    title: "Tax Deduction",
    chapter: "Chapter 1 · Awakening",
    emoji: "🧾",
    scenario: "Salary slip: ₹1,000 gross — but only ₹800 lands in your account. ₹200 vanished as tax.",
    question: "How do you respond?",
    choices: [
      { id: "a", label: "Learn how taxes work", coins: 150, xp: 60, correct: true, explanation: "Taxes are non-negotiable. Knowing slabs & deductions saves lakhs over a lifetime.", badge: "Tax Aware" },
      { id: "b", label: "Ignore it, it's just paperwork", coins: -50, xp: 10, explanation: "Ignorance costs more than tax itself." },
      { id: "c", label: "Try to dodge taxes illegally", coins: -300, xp: 5, explanation: "Illegal evasion = penalties + jail risk. Never worth it." },
    ],
  },
  {
    id: 4,
    title: "Needs vs Wants",
    chapter: "Chapter 2 · Habits",
    emoji: "🛍️",
    scenario: "₹500 in hand. Friends are buying limited-edition sneakers. Your old shoes still work. Groceries are low.",
    question: "Where does the ₹500 go?",
    choices: [
      { id: "a", label: "Groceries (need)", coins: 100, xp: 50, correct: true, explanation: "Needs first, wants second. Boring? Yes. Wealthy? Also yes." },
      { id: "b", label: "Sneakers (want)", coins: -200, xp: 10, explanation: "Hype fades, debt doesn't. Wants come AFTER needs are covered." },
      { id: "c", label: "Split 50/50", coins: -20, xp: 25, explanation: "Compromise is okay, but needs should win when funds are tight." },
    ],
  },
  {
    id: 5,
    title: "Income Upgrade",
    chapter: "Chapter 2 · Habits",
    emoji: "📈",
    scenario: "You have one free evening per day. Three doors appear.",
    question: "Where do you invest your time?",
    choices: [
      { id: "a", label: "Learn a new skill (course)", coins: -100, xp: 100, correct: true, explanation: "Skills compound. Today's ₹100 course can become tomorrow's ₹50,000 raise.", badge: "Lifelong Learner" },
      { id: "b", label: "Pick up a side gig", coins: 200, xp: 40, explanation: "Extra income is great, but pure hustle without skill plateaus quickly." },
      { id: "c", label: "Binge a series", coins: 0, xp: 5, explanation: "Rest matters — but every evening on the couch is opportunity cost." },
    ],
  },
  {
    id: 6,
    title: "Superbike Temptation",
    chapter: "Chapter 2 · Habits",
    emoji: "🏍️",
    scenario: "A glossy superbike. ₹3L. You can take a loan, drain savings, or walk away.",
    question: "Your move?",
    choices: [
      { id: "a", label: "Walk away — for now", coins: 100, xp: 80, correct: true, explanation: "Liabilities disguised as assets are the #1 wealth killer at this stage." },
      { id: "b", label: "Take a loan (₹6,000 EMI)", coins: 300, xp: 20, loanEMI: 6000, explanation: "You enjoy it now, but the EMI Monster has been summoned. 🐉" },
      { id: "c", label: "Drain all savings", coins: -800, xp: 15, explanation: "Zero buffer = one emergency away from disaster." },
    ],
  },
  {
    id: 7,
    title: "EMI Monster",
    chapter: "Chapter 3 · Debt",
    emoji: "🐉",
    scenario: "The EMI Monster shows up monthly, hungry. How do you tame it?",
    question: "Strategy?",
    choices: [
      { id: "a", label: "Pre-pay extra when possible", coins: -300, xp: 90, correct: true, explanation: "Pre-paying principal slashes total interest dramatically. Slay the monster early.", badge: "Debt Slayer" },
      { id: "b", label: "Pay only minimum", coins: -50, xp: 20, explanation: "Minimum payments = maximum interest. The monster grows fat." },
      { id: "c", label: "Skip a payment", coins: -500, xp: 5, explanation: "Missed EMI = penalty + credit score crash. Don't." },
    ],
  },
  {
    id: 8,
    title: "Bank Selection",
    chapter: "Chapter 3 · Debt",
    emoji: "🏦",
    scenario: "Three banks compete for your account. Each has hidden fees in the fine print.",
    question: "Which do you choose?",
    choices: [
      { id: "a", label: "Read fine print, pick zero-fee bank", coins: 250, xp: 80, correct: true, explanation: "Hidden charges silently drain ₹2-5k/year. Reading the fine print pays.", badge: "Fine Print Pro" },
      { id: "b", label: "Pick the bank with the cool app", coins: -100, xp: 20, explanation: "UX is nice, but fees compound. Look beyond the design." },
      { id: "c", label: "Cash under mattress", coins: -200, xp: 10, explanation: "Cash loses value to inflation every year. Bank it (wisely)." },
    ],
  },
  {
    id: 9,
    title: "Credit Score (CIBIL)",
    chapter: "Chapter 3 · Debt",
    emoji: "📊",
    scenario: "Your CIBIL score is 720. A loan officer eyes you suspiciously.",
    question: "How do you boost it?",
    choices: [
      { id: "a", label: "Pay all bills on time, keep utilization < 30%", coins: 200, xp: 100, correct: true, explanation: "On-time payments + low utilization = score above 800. Doors open everywhere.", badge: "Credit King" },
      { id: "b", label: "Take many loans to 'build history'", coins: -200, xp: 20, explanation: "Too many hard inquiries hurt your score. Less is more." },
      { id: "c", label: "Close all old credit cards", coins: -100, xp: 15, explanation: "Old cards = long history = better score. Keep them open (and unused)." },
    ],
  },
  {
    id: 10,
    title: "Debt Freedom",
    chapter: "Chapter 3 · Debt",
    emoji: "🗽",
    scenario: "You're standing at the gates of Debt Freedom. Beyond lies the Investment Realm — and scammers.",
    question: "Final debt strategy?",
    choices: [
      { id: "a", label: "Avalanche method (highest interest first)", coins: 400, xp: 120, correct: true, explanation: "Avalanche saves the most money. Mathematically optimal.", badge: "Debt Free" },
      { id: "b", label: "Snowball method (smallest first)", coins: 200, xp: 80, explanation: "Great for motivation, slightly more interest. Still excellent." },
      { id: "c", label: "Take new loan to pay old one", coins: -400, xp: 10, explanation: "Debt shuffling = drowning slower. Break the cycle." },
    ],
  },
  {
    id: 11,
    title: "Investment Maze",
    chapter: "Chapter 4 · Wealth",
    emoji: "🌀",
    scenario: "Stocks. Gold. Crypto. FD. All shouting at once. You have ₹10,000.",
    question: "Where do you start?",
    choices: [
      { id: "a", label: "Diversify across 3 asset classes", coins: 300, xp: 100, correct: true, investment: 50, explanation: "Diversification reduces risk. Don't put all eggs in one volatile basket.", badge: "Diversifier" },
      { id: "b", label: "All-in on crypto", coins: -500, xp: 30, explanation: "High volatility, high regret. Speculate only with money you can lose." },
      { id: "c", label: "All in FD (5% returns)", coins: 50, xp: 40, investment: 10, explanation: "Safe, but barely beats inflation. Some growth assets are needed." },
    ],
  },
  {
    id: 12,
    title: "SIP System",
    chapter: "Chapter 4 · Wealth",
    emoji: "📅",
    scenario: "A friend explains SIPs: invest ₹2,000 every month, no matter the market.",
    question: "Do you start one?",
    choices: [
      { id: "a", label: "Yes — auto-debit on salary day", coins: -200, xp: 110, correct: true, investment: 100, explanation: "Rupee-cost averaging + compounding = the calmest path to wealth.", badge: "SIP Soldier" },
      { id: "b", label: "I'll time the market instead", coins: -300, xp: 20, explanation: "Even pros can't time markets. Time IN the market beats timing." },
      { id: "c", label: "Wait until I 'have more money'", coins: 0, xp: 10, explanation: "Future-you wishes you started today. Compounding loves time." },
    ],
  },
  {
    id: 13,
    title: "Market News Reaction",
    chapter: "Chapter 4 · Wealth",
    emoji: "📰",
    scenario: "Headline: 'MARKET CRASHES 8%! PANIC!' Your portfolio is red.",
    question: "What do you do?",
    choices: [
      { id: "a", label: "Stay calm, keep investing", coins: 300, xp: 120, correct: true, explanation: "Crashes = discounts. Sticking to your plan is what makes investors rich.", badge: "Diamond Hands" },
      { id: "b", label: "Sell everything in panic", coins: -600, xp: 10, explanation: "Selling low locks in losses. The classic mistake." },
      { id: "c", label: "Borrow money to buy more", coins: -300, xp: 20, explanation: "Leveraged investing = leveraged stress. Not for beginners." },
    ],
  },
  {
    id: 14,
    title: "Delayed Gratification",
    chapter: "Chapter 4 · Wealth",
    emoji: "⏳",
    scenario: "A new iPhone drops. ₹1.2L. Your investment goal needs ₹1L this month.",
    question: "Choose your path.",
    choices: [
      { id: "a", label: "Skip it — fund the goal", coins: 200, xp: 100, correct: true, explanation: "Marshmallow test: those who wait, win. Goals > gadgets.", badge: "Patient Wolf" },
      { id: "b", label: "EMI the iPhone", coins: -100, xp: 25, loanEMI: 5000, explanation: "Financing depreciating assets is wealth's slow leak." },
      { id: "c", label: "Buy an older model in cash", coins: -400, xp: 60, explanation: "Reasonable compromise. Better than EMI." },
    ],
  },
  {
    id: 15,
    title: "Side Hustle Storm",
    chapter: "Chapter 5 · Mastery",
    emoji: "⚡",
    scenario: "Three side gigs land in your inbox at once. Time is finite.",
    question: "Pick your hustle.",
    choices: [
      { id: "a", label: "Freelance in your skill area", coins: 500, xp: 90, correct: true, explanation: "Skill-aligned hustles compound your main career too. Best ROI on time." },
      { id: "b", label: "Drop-shipping random products", coins: -200, xp: 20, explanation: "Saturated, low margin, high time. Beware of 'easy money' bait." },
      { id: "c", label: "MLM 'business opportunity'", coins: -800, xp: 5, explanation: "99% of MLM participants lose money. It's a recruitment trap." },
    ],
  },
  {
    id: 16,
    title: "Family Pressure",
    chapter: "Chapter 5 · Mastery",
    emoji: "👨‍👩‍👧",
    scenario: "Family wants a lavish wedding for a cousin. Suggested contribution: ₹2L.",
    question: "How do you respond?",
    choices: [
      { id: "a", label: "Contribute what you can afford", coins: -500, xp: 80, correct: true, explanation: "Honor family AND your finances. Boundaries protect both.", badge: "Boundary Boss" },
      { id: "b", label: "Take a loan to match expectations", coins: -300, xp: 15, loanEMI: 4000, explanation: "Borrowed prestige = real debt. Social pressure isn't worth ruin." },
      { id: "c", label: "Refuse entirely", coins: 0, xp: 30, explanation: "Sometimes okay, but relationships matter. Communicate, don't ghost." },
    ],
  },
  {
    id: 17,
    title: "House vs Rent",
    chapter: "Chapter 5 · Mastery",
    emoji: "🏠",
    scenario: "Buy a flat (₹50L home loan, ₹40k EMI for 20yrs) or rent (₹18k/mo) and invest the difference?",
    question: "Pick wisely.",
    choices: [
      { id: "a", label: "Rent + invest the difference", coins: 400, xp: 100, correct: true, investment: 150, explanation: "Math often favors renting in metros. Owning is lifestyle, not always wealth." },
      { id: "b", label: "Buy with 20yr loan", coins: -300, xp: 50, loanEMI: 8000, explanation: "Forced savings via EMI — but huge interest cost. Run YOUR numbers." },
      { id: "c", label: "Buy with 5yr aggressive loan", coins: -700, xp: 40, loanEMI: 12000, explanation: "Crushing EMI now, freedom later. Risky if income wobbles." },
    ],
  },
  {
    id: 18,
    title: "Emergency!",
    chapter: "Chapter 6 · Resilience",
    emoji: "🚨",
    scenario: "Hospital bill: ₹1.5L tomorrow. Heart racing.",
    question: "Source of funds?",
    choices: [
      { id: "a", label: "Health insurance covers it", coins: 0, xp: 130, correct: true, explanation: "Insurance is for exactly this. ₹500/mo premium saves lakhs in shock.", badge: "Insured" },
      { id: "b", label: "Tap emergency fund", coins: -1500, xp: 80, explanation: "What it's there for. Now rebuild it ASAP." },
      { id: "c", label: "Take personal loan @ 18%", coins: -1500, xp: 20, loanEMI: 7000, explanation: "Worst option. High-interest debt during crisis = trap." },
    ],
  },
  {
    id: 19,
    title: "Lifestyle Inflation",
    chapter: "Chapter 6 · Resilience",
    emoji: "💸",
    scenario: "Promotion! +30% salary. Your spending wants to grow with it.",
    question: "What do you do with the raise?",
    choices: [
      { id: "a", label: "Save/invest 80% of the raise", coins: 600, xp: 110, correct: true, investment: 200, explanation: "Lifestyle inflation is the silent wealth killer. Bank the raise." },
      { id: "b", label: "Upgrade everything immediately", coins: -800, xp: 20, explanation: "New car, bigger flat, fancy phone — and you're broke at the same level." },
      { id: "c", label: "Split 50/50", coins: 100, xp: 60, investment: 80, explanation: "Acceptable. A treat is fine; just don't normalize the new burn rate." },
    ],
  },
  {
    id: 20,
    title: "Subscription Leak",
    chapter: "Chapter 6 · Resilience",
    emoji: "📺",
    scenario: "11 active subscriptions silently drain ₹3,200/month. You use 4.",
    question: "Action?",
    choices: [
      { id: "a", label: "Audit & cancel unused 7", coins: 400, xp: 90, correct: true, explanation: "Tiny leaks sink ships. ₹2,000/mo saved = ₹4L+ in 10yrs invested.", badge: "Leak Sealer" },
      { id: "b", label: "Keep them — 'just in case'", coins: -200, xp: 10, explanation: "Just-in-case = always-paying. Cancel; resubscribe when needed." },
      { id: "c", label: "Add 2 more, why not", coins: -400, xp: 5, explanation: "Death by ₹199. The compound leak is real." },
    ],
  },
  {
    id: 21,
    title: "Insurance Decision",
    chapter: "Chapter 7 · Endgame",
    emoji: "🛡️",
    scenario: "An agent offers ULIP (insurance + investment combo). Looks shiny.",
    question: "Pick your protection.",
    choices: [
      { id: "a", label: "Term insurance + separate SIP", coins: 200, xp: 110, correct: true, investment: 80, explanation: "Never mix insurance & investment. Term is cheap & pure; SIP is efficient.", badge: "Smart Shielder" },
      { id: "b", label: "Buy the ULIP", coins: -400, xp: 30, explanation: "High fees, mediocre returns, weak cover. The agent's commission is huge." },
      { id: "c", label: "No insurance — I'm young", coins: -100, xp: 20, explanation: "Young = cheapest premiums. One accident can wipe out everything." },
    ],
  },
  {
    id: 22,
    title: "Credit Card Trap",
    chapter: "Chapter 7 · Endgame",
    emoji: "💳",
    scenario: "Bill: ₹50,000. 'Pay minimum ₹2,500' looks tempting.",
    question: "Your move?",
    choices: [
      { id: "a", label: "Pay full bill before due date", coins: -200, xp: 100, correct: true, explanation: "Cards are tools, not loans. Pay 100% to enjoy the rewards, not the 42% APR.", badge: "Card Master" },
      { id: "b", label: "Pay the minimum", coins: -600, xp: 10, explanation: "42% interest on the remainder. Welcome to the trap." },
      { id: "c", label: "Convert to EMI at 18%", coins: -300, xp: 30, loanEMI: 3000, explanation: "Better than minimum, still expensive. Avoid building habit." },
    ],
  },
  {
    id: 23,
    title: "Fake Investment Guru",
    chapter: "Chapter 7 · Endgame",
    emoji: "🎭",
    scenario: "An Insta guru promises 'guaranteed 30% monthly returns. DM for VIP group.'",
    question: "Reaction?",
    choices: [
      { id: "a", label: "Block & report", coins: 300, xp: 120, correct: true, explanation: "Anyone guaranteeing high returns is lying. Real wealth is boring & slow.", badge: "Scam Slayer" },
      { id: "b", label: "Invest a 'small test' ₹5,000", coins: -800, xp: 15, explanation: "Test = funding the scam. They vanish after the first 'profit' withdrawal." },
      { id: "c", label: "Go all-in for fast money", coins: -3000, xp: 5, explanation: "Devastating. Ponzi schemes always collapse." },
    ],
  },
  {
    id: 24,
    title: "Retirement Planning",
    chapter: "Chapter 7 · Endgame",
    emoji: "🌅",
    scenario: "You're 30. Retirement feels distant. NPS, EPF, equity SIPs all available.",
    question: "Plan your sunset?",
    choices: [
      { id: "a", label: "Aggressive equity SIP + NPS combo", coins: -400, xp: 130, correct: true, investment: 300, explanation: "Long horizon = equity wins. Tax-advantaged NPS is a beautiful bonus.", badge: "Future-Proof" },
      { id: "b", label: "Only EPF, set & forget", coins: 0, xp: 60, investment: 60, explanation: "Safe but slow. Inflation will outpace pure debt over 30 years." },
      { id: "c", label: "I'll think about it at 50", coins: 0, xp: 5, explanation: "Compounding's biggest gift is time. You just gave away 20 years." },
    ],
  },
  {
    id: 25,
    title: "Final Boss — Financial Freedom",
    chapter: "Chapter 8 · Freedom",
    emoji: "👑",
    scenario: "The Boss appears: a giant ledger of your monthly expenses. To win, your PASSIVE INCOME must exceed your EXPENSES.",
    question: "Your final stance?",
    choices: [
      { id: "a", label: "Live below means + invest all surplus", coins: 1000, xp: 250, correct: true, investment: 500, explanation: "🏆 FINANCIAL FREEDOM ACHIEVED. Passive income > expenses = work becomes optional.", badge: "Financial Freedom" },
      { id: "b", label: "Coast on current investments", coins: 200, xp: 100, explanation: "Comfortable, not free. One downturn could disturb the balance." },
      { id: "c", label: "Spend it all — you earned it", coins: -2000, xp: 20, explanation: "Game over (financially). The Boss wins. Restart the cycle." },
    ],
    miniGame: "boss",
  },
];
