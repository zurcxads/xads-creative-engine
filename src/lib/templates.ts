const HEADLINE_TEMPLATES: Record<string, string[]> = {
  urgency: [
    "Your {offer} License Expires Soon — Act Now",
    "Last Chance: Free {offer} Update Available",
    "WARNING: {offer} Deal Ends Tonight",
    "Only 24 Hours Left to Claim Your {offer} Upgrade",
    "Don't Wait — {offer} Prices Go Up Tomorrow",
    "Final Notice: Your {offer} Eligibility Expires Soon",
    "Time Is Running Out for This {offer} Offer",
    "Act Fast: Limited {offer} Spots Remaining",
    "Hurry — {offer} Savings Disappear at Midnight",
    "This {offer} Offer Won't Last — Claim Yours Now",
    "URGENT: Your {offer} Benefits Are About to Expire",
    "Last Day to Lock In {offer} at This Price",
    "The Clock Is Ticking on This {offer} Deal",
    "Don't Miss Out: {offer} Offer Closing Soon",
    "Your {offer} Window Is Closing — Act Today",
    "3 Hours Left: {offer} Flash Sale Ending",
  ],
  'social-proof': [
    "Join 2M+ Users Who Already Upgraded Their {offer}",
    "Why Everyone Is Switching to {offer} in 2025",
    "See Why 500K+ People Chose {offer} This Month",
    "{offer}: The #1 Choice for Smart Homeowners",
    "Your Neighbors Already Got {offer} — Have You?",
    "Rated #1: Why Millions Trust {offer}",
    "The {offer} Solution Everyone Is Talking About",
    "9 Out of 10 Users Recommend {offer}",
    "Over 1 Million Happy {offer} Customers Can't Be Wrong",
    "Why {offer} Is Trending Nationwide Right Now",
    "The {offer} Upgrade That's Going Viral",
    "Thousands Are Saving Big with {offer} — Join Them",
    "America's Most Popular {offer} Solution",
    "{offer}: Trusted by Families Across All 50 States",
    "The {offer} Program Your Friends Won't Stop Talking About",
    "Breaking Records: {offer} Signups Hit All-Time High",
  ],
  fear: [
    "Warning: Your PC May Be At Risk Without {offer}",
    "Don't Ignore This {offer} Security Alert",
    "Is Your {offer} Putting Your Family at Risk?",
    "The Hidden Danger of Ignoring {offer}",
    "Your {offer} Could Be Costing You Thousands",
    "ALERT: {offer} Vulnerability Detected",
    "Stop! Your {offer} Setup May Be Compromised",
    "The Shocking Truth About Your {offer} Situation",
    "Are You Making This Costly {offer} Mistake?",
    "What Happens If You Don't Update Your {offer}",
    "Your {offer} Is Exposed — Here's What to Do",
    "Critical {offer} Issue: Are You Affected?",
    "The {offer} Problem Nobody Wants to Talk About",
    "Hackers Are Targeting Outdated {offer} — Protect Yourself",
    "Don't Let {offer} Problems Destroy Your Peace of Mind",
    "WARNING: 73% of {offer} Users Are at Risk",
  ],
  curiosity: [
    "The Hidden {offer} Feature That Changes Everything",
    "They Don't Want You to Know This About {offer}",
    "This {offer} Secret Is Saving People Thousands",
    "The {offer} Trick Experts Don't Share",
    "What They're Not Telling You About {offer}",
    "The Little-Known {offer} Hack Going Viral",
    "I Tried {offer} and What Happened Next Was Unbelievable",
    "The {offer} Loophole That's 100% Legal",
    "This Strange {offer} Method Actually Works",
    "The One {offer} Thing You've Been Doing Wrong",
    "Why Most People Get {offer} Wrong",
    "The Surprising Truth About {offer} in 2025",
    "This {offer} Discovery Is Changing the Game",
    "What Insiders Know About {offer} That You Don't",
    "The {offer} Strategy That's Breaking the Internet",
    "You Won't Believe This {offer} Result",
  ],
  benefit: [
    "Save $2,000+ with This {offer} Solution",
    "Get {offer} and Start Saving Today",
    "The Easiest Way to Upgrade Your {offer}",
    "Transform Your Home with {offer} in Just 1 Day",
    "Cut Your Bills in Half with {offer}",
    "{offer}: Premium Quality at Zero Cost to You",
    "Unlock Premium {offer} Benefits — 100% Free",
    "Get the {offer} Upgrade You Deserve",
    "Finally: {offer} Made Simple and Affordable",
    "The Smartest {offer} Investment You'll Make",
    "Enjoy Better {offer} Without Breaking the Bank",
    "{offer}: More Value Than You Ever Expected",
    "Upgrade to {offer} and Never Look Back",
    "The {offer} Solution That Pays for Itself",
    "Better {offer}, Better Life — Start Now",
    "Everything You Need from {offer}, Nothing You Don't",
  ],
  testimonial: [
    '"I Saved $3,000 on {offer}" — Real Customer Story',
    '"Best {offer} Decision I Ever Made" — Sarah K.',
    '"I Wish I Found {offer} Sooner" — Mike T.',
    '"My {offer} Experience Was Incredible" — Lisa R.',
    '"I Can\'t Believe How Easy {offer} Was" — James D.',
    '"Finally, a {offer} Solution That Actually Works" — Maria C.',
    '"My Neighbor Recommended {offer} and WOW" — David L.',
    '"{offer} Changed Everything for My Family" — Karen M.',
    '"From Skeptic to Believer: My {offer} Journey" — Tom B.',
    '"I Tried Everything Before {offer}" — Anna P.',
    '"Zero Regrets About Choosing {offer}" — Chris H.',
    '"The {offer} Results Speak for Themselves" — Nicole S.',
    '"{offer} Exceeded All My Expectations" — Robert F.',
    '"Why Didn\'t I Get {offer} Sooner?" — Jennifer W.',
    '"A+ Experience with {offer}" — Mark G.',
    '"I Tell Everyone About {offer}" — Patricia N.',
  ],
  question: [
    "Are You Still Overpaying for {offer}?",
    "Did You Know About This {offer} Program?",
    "Is Your {offer} Up to Date?",
    "Why Are So Many People Switching {offer}?",
    "Have You Checked Your {offer} Eligibility?",
    "What If {offer} Could Save You $1,000+?",
    "Ready for a {offer} Upgrade?",
    "Is Your Current {offer} Holding You Back?",
    "Want Better {offer} Without the Hassle?",
    "Could {offer} Be the Answer You've Been Looking For?",
    "Tired of {offer} Problems?",
    "What Would You Do with Extra {offer} Savings?",
    "Still on the Fence About {offer}?",
    "How Much Could You Save with {offer}?",
    "Looking for a Smarter {offer} Solution?",
    "When Was the Last Time You Reviewed Your {offer}?",
  ],
}

const BODY_TEMPLATES: Record<string, string[]> = {
  urgency: [
    "Time-sensitive: {offer} programs are closing enrollment soon. Thousands have already claimed their spot — don't be left behind. Check your eligibility in 30 seconds.",
    "This limited-time {offer} offer is available to qualified homeowners only. Once spots fill up, this deal is gone for good. See if you qualify today.",
    "The deadline for the {offer} incentive program is approaching fast. Don't let this opportunity pass you by. Quick 2-minute check — no commitment required.",
  ],
  'social-proof': [
    "Over 2 million Americans have already taken advantage of {offer} programs this year alone. See what all the buzz is about — check your eligibility in seconds.",
    "Your neighbors, coworkers, and friends are all upgrading to {offer}. Join the movement and find out why it's the #1 rated program in the country.",
    "Rated 4.9/5 by verified customers. {offer} is the trusted choice for families who want quality, savings, and peace of mind. See if you qualify.",
  ],
  fear: [
    "Every day you wait, you could be losing money on {offer}. Outdated systems put your home and finances at risk. Get a free assessment before it's too late.",
    "Warning: ignoring your {offer} situation could cost you thousands in repairs and lost value. Don't wait for a crisis — take action today.",
    "73% of homeowners don't realize their {offer} is compromised until it's too late. A quick 2-minute check could save you from a costly disaster.",
  ],
  curiosity: [
    "There's a little-known {offer} program that most people don't know about. It's saving qualified homeowners an average of $2,400/year. See if you're eligible.",
    "The secret to better {offer} isn't what you think. This unconventional approach is delivering incredible results for thousands of smart homeowners.",
    "What if everything you knew about {offer} was wrong? Discover the surprising truth that's helping everyday people save thousands.",
  ],
  benefit: [
    "Get premium {offer} at a fraction of the cost. Our program connects you with top-rated providers, exclusive discounts, and hassle-free installation. Start saving today.",
    "Imagine cutting your {offer} costs by 50% or more. It's not a dream — it's what thousands of homeowners are experiencing right now. See how.",
    "Better {offer}, lower bills, zero hassle. Our streamlined process gets you from quote to installation in record time. Check your eligibility now.",
  ],
  testimonial: [
    '"I was skeptical at first, but {offer} completely changed our situation. We\'re saving over $200/month and the process was incredibly smooth." — Verified Customer',
    '"After years of dealing with {offer} issues, I finally found a solution that works. The team was professional and the results exceeded my expectations." — Happy Homeowner',
    '"I tell everyone about {offer}. The savings are real, the quality is outstanding, and the customer service is top-notch. 10/10 would recommend." — Sarah M.',
  ],
  question: [
    "Still dealing with {offer} headaches? You're not alone. But there's a better way. Thousands of homeowners have found the answer — and it takes just 2 minutes to check.",
    "What if you could solve your {offer} problem once and for all? Our free eligibility check takes 30 seconds and could save you thousands. Worth a look?",
    "How much are you really spending on {offer}? Most people are shocked when they find out. Get a free analysis and discover your savings potential.",
  ],
}

const CTA_TEMPLATES: Record<string, string[]> = {
  urgency: ["Claim Your Spot Now", "Get It Before It's Gone", "Act Now — Limited Time"],
  'social-proof': ["Join Millions Today", "See Why They Switched", "Get Started Free"],
  fear: ["Protect Yourself Now", "Check Your Risk Free", "Don't Wait — Fix It Today"],
  curiosity: ["Discover the Secret", "Find Out Now", "See What You're Missing"],
  benefit: ["Start Saving Today", "Get Your Free Quote", "Unlock Your Benefits"],
  testimonial: ["See Real Results", "Join Happy Customers", "Try It Risk-Free"],
  question: ["Check Eligibility Now", "Find Out in 30 Seconds", "Get Your Answer"],
}

const IMAGE_DESC_TEMPLATES: Record<string, string[]> = {
  urgency: [
    "A countdown timer overlaid on a {offer}-themed background with bold red accents. Sense of urgency with clock imagery.",
    "Split screen: left side shows expired/outdated {offer}, right side shows sleek modern upgrade. Dramatic lighting.",
  ],
  'social-proof': [
    "A diverse group of happy homeowners giving thumbs up in front of their homes. Warm, trustworthy lighting. {offer} branding subtle.",
    "A map of the US with glowing dots showing {offer} adoption spreading. Clean, modern data visualization style.",
  ],
  fear: [
    "Dark, moody shot of a deteriorating {offer} situation. Warning signs and caution tape. Dramatic shadows.",
    "Before/after split: left side dark and problematic, right side bright and resolved. {offer} theme.",
  ],
  curiosity: [
    "A mysterious glowing door or portal with {offer} branding. Intriguing, cinematic lighting. Makes viewer want to know more.",
    "Close-up of someone's surprised/amazed reaction looking at a screen. {offer} elements visible. Warm highlight on face.",
  ],
  benefit: [
    "A happy family in a bright, modern home enjoying their {offer} upgrade. Natural sunlight, lifestyle photography style.",
    "Clean product shot of {offer} with savings amount overlaid. Premium feel, white/violet color scheme.",
  ],
  testimonial: [
    "Portrait-style photo of a real-looking person with a 5-star rating overlay. Warm, authentic feel. {offer} context in background.",
    "A before/after transformation with {offer}. Real, relatable setting. Trust-building visual elements.",
  ],
  question: [
    "Person with a thoughtful expression looking at {offer} options. Question mark visual elements. Clean, modern design.",
    "Interactive-feeling image with {offer} quiz/checker UI mockup. Engaging, click-worthy design.",
  ],
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function fillTemplate(template: string, offer: string): string {
  const offerName = offer.charAt(0).toUpperCase() + offer.slice(1)
  return template.replace(/{offer}/g, offerName)
}

export function generateCreatives(offer: string, angle: string) {
  const headlines = pickRandom(HEADLINE_TEMPLATES[angle] || HEADLINE_TEMPLATES.urgency, 5).map(t => fillTemplate(t, offer))
  const bodyTexts = pickRandom(BODY_TEMPLATES[angle] || BODY_TEMPLATES.urgency, 3).map(t => fillTemplate(t, offer))
  const ctas = pickRandom(CTA_TEMPLATES[angle] || CTA_TEMPLATES.urgency, 3).map(t => fillTemplate(t, offer))
  const imageDescs = pickRandom(IMAGE_DESC_TEMPLATES[angle] || IMAGE_DESC_TEMPLATES.urgency, 2).map(t => fillTemplate(t, offer))

  return { headlines, bodyTexts, ctas, imageDescs }
}

// Video prompt generation
const SCENE_TEMPLATES: Record<string, { hook: string; problem: string; solution: string; cta: string }> = {
  urgency: {
    hook: "Open on a ticking clock or countdown timer. Text overlay: limited time offer for {offer}.",
    problem: "Show someone frustrated, missing deadlines, realizing they're about to lose out on the {offer} deal.",
    solution: "Quick montage of easy signup process. Screen recordings of simple steps. Relief on the person's face.",
    cta: "Bold text: 'Act Now Before It's Too Late.' URL/button animation. Urgency music crescendo.",
  },
  'social-proof': {
    hook: "Montage of diverse, happy people giving testimonials about {offer}. Quick cuts, energetic.",
    problem: "One person alone, uncertain, scrolling their phone. Everyone around them already has {offer}.",
    solution: "They join in, sign up easily. Join the community. Celebration moment.",
    cta: "Counter showing '2M+ users and counting.' Call to action: 'Join them today.'",
  },
  fear: {
    hook: "Dark, dramatic shot. Warning text flashes on screen about {offer} risks.",
    problem: "Show the consequences: bills piling up, system failures, stress. Dramatic music.",
    solution: "Light breaks through. {offer} solution appears. Everything stabilizes. Relief.",
    cta: "Urgent text: 'Don't wait until it's too late.' Action button with glow effect.",
  },
  curiosity: {
    hook: "Mysterious reveal: 'What they don't want you to know about {offer}.' Intriguing visuals.",
    problem: "Show common misconceptions. 'Most people think...' with X marks.",
    solution: "The reveal: the hidden {offer} program/feature. Wow moment. Eyes wide.",
    cta: "'Discover the secret.' Clean CTA with arrow animation.",
  },
  benefit: {
    hook: "Bright, optimistic opening. Show the end result: savings, happiness, upgraded {offer}.",
    problem: "Brief flash of the old way: expensive, complicated, frustrating.",
    solution: "Side-by-side comparison. New {offer} solution wins on every metric. Clean graphics.",
    cta: "'Start saving today.' Friendly, warm CTA with smile.",
  },
  testimonial: {
    hook: "Real person talking to camera: 'Let me tell you about {offer}...' Authentic feel.",
    problem: "They describe their old situation. Relatable struggles with {offer}.",
    solution: "Their face lights up as they describe the transformation. B-roll of results.",
    cta: "'See for yourself.' Testimonial overlay with stars. Sign up prompt.",
  },
  question: {
    hook: "Text on screen: 'Are you still...?' about {offer}. Engaging question format.",
    problem: "Show the common situation most people are stuck in with {offer}.",
    solution: "Reveal: there's a better way. Quick demo of the solution.",
    cta: "'Find out in 30 seconds.' Interactive-feeling CTA.",
  },
}

const STYLE_MODIFIERS: Record<string, string> = {
  'talking-head': 'Single person speaking directly to camera in a well-lit room. Casual, authentic vibe. Eye contact with lens.',
  'screen-recording': 'Screen capture style with cursor movements. Clean desktop. Zoom-ins on key elements. Minimal face cam in corner.',
  'cinematic-broll': 'Cinematic B-roll footage. Shallow depth of field. Smooth camera movements. Color graded with moody tones.',
  'text-overlay': 'Bold kinetic typography over abstract/gradient backgrounds. Text animates in with impact. Minimal imagery, maximum readability.',
  'before-after': 'Split screen or transition wipe between before and after states. Dramatic contrast. Satisfying transformation.',
  'ugc-style': 'User-generated content feel. Slightly shaky handheld camera. Natural lighting. Real person, real setting. Authentic and relatable.',
}

const TONE_MODIFIERS: Record<string, string> = {
  professional: 'Corporate but approachable. Clean visuals, steady pacing, authoritative voiceover.',
  casual: 'Relaxed, conversational. Like talking to a friend. Natural gestures and expressions.',
  urgent: 'Fast-paced editing. Quick cuts. Intense music. Bold text. High energy throughout.',
  friendly: 'Warm, inviting. Soft lighting. Smiles. Gentle music. Trustworthy and comforting.',
}

export function generateVideoPrompts(
  offer: string,
  angle: string,
  style: string,
  duration: string,
  tone: string
) {
  const scenes = SCENE_TEMPLATES[angle] || SCENE_TEMPLATES.urgency
  const styleNote = STYLE_MODIFIERS[style] || ''
  const toneNote = TONE_MODIFIERS[tone] || ''
  const offerName = offer.charAt(0).toUpperCase() + offer.slice(1)
  const durSec = duration.replace('s', '')

  const sceneBreakdown = [
    { label: 'Scene 1 — Hook', desc: fillTemplate(scenes.hook, offer) },
    { label: 'Scene 2 — Problem', desc: fillTemplate(scenes.problem, offer) },
    { label: 'Scene 3 — Solution', desc: fillTemplate(scenes.solution, offer) },
    { label: 'Scene 4 — CTA', desc: fillTemplate(scenes.cta, offer) },
  ]

  const script = `[HOOK - ${Math.round(Number(durSec) * 0.2)}s]\n${fillTemplate(scenes.hook, offer)}\n\n[PROBLEM - ${Math.round(Number(durSec) * 0.3)}s]\n${fillTemplate(scenes.problem, offer)}\n\n[SOLUTION - ${Math.round(Number(durSec) * 0.3)}s]\n${fillTemplate(scenes.solution, offer)}\n\n[CTA - ${Math.round(Number(durSec) * 0.2)}s]\n${fillTemplate(scenes.cta, offer)}`

  const basePrompt = `${durSec}-second ${style.replace('-', ' ')} video ad for ${offerName}. ${toneNote} ${styleNote}`

  const kling = `${basePrompt}\n\nVisual style: Cinematic, high production value. Smooth camera movements with depth of field transitions. Start with a dramatic wide shot, then push in to medium close-up. Rich color grading with ${tone === 'urgent' ? 'high contrast and saturated' : 'warm, inviting'} tones. ${fillTemplate(scenes.hook, offer)} Transition through scenes with elegant dissolves and motion blur. Final frame: bold CTA text with subtle particle effects. 4K quality, 24fps cinematic look.`

  const runway = `${basePrompt}\n\nCamera: Start with slow dolly forward, transition to handheld energy in the middle, end with steady lock-off on CTA. Motion: Smooth interpolation between scenes. Key movements — push in on hook, orbit around subject in problem scene, pull back to reveal in solution, static hold on CTA. ${fillTemplate(scenes.hook, offer)} Style: ${tone} mood with professional color grade. Gen-3 Alpha turbo mode.`

  const hailuoai = `${basePrompt}\n\nCharacter: ${style === 'talking-head' || style === 'ugc-style' ? 'A relatable 30-something adult' : 'Abstract/product focused'}, American, casual attire. Scene: Modern home/office setting with natural lighting. ${fillTemplate(scenes.hook, offer)} Expression progression: concerned → curious → relieved → happy. Environment details: clean, aspirational but achievable. MiniMax Hailuo video, ${durSec}s duration.`

  const pika = `${style.replace('-', ' ')}, ${offerName} ad, ${tone} tone, ${durSec}s. ${fillTemplate(scenes.hook, offer).substring(0, 100)} --style cinematic --motion smooth --camera push-in --quality high`

  return {
    sceneBreakdown,
    script,
    prompts: { kling, runway, hailuoai, pika },
  }
}
