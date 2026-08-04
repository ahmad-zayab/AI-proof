const fs = require('fs');
const path = './src/lib/question-bank.json';

let content = fs.readFileSync(path, 'utf8');

const replacements = [
  [
    `"text": "Talk to key people to figure out the unwritten rules and goals."`,
    `"text": "Talk to the people who actually know how things work around here."`
  ],
  [
    `"question": "You face a confusing problem where past numbers do not match what people are feeling right now. What do you do?"`,
    `"question": "You notice the reports say everything is fine, but the people around you seem unhappy. What do you trust?"`
  ],
  [
    `"question": "A big project is due, but your main computer system crashes completely. How do you react?"`,
    `"question": "A big project is due, but your main tool you need suddenly breaks. How do you react?"`
  ],
  [
    `"question": "You realize the main way your company measures success is actually hurting the business. What do you do?"`,
    `"question": "You realize the main way your company decides if the business is doing well is actually hurting the business. What do you do?"`
  ],
  [
    `"question": "You need help from five different groups at work, but none of them have the time to help you. What do you do?"`,
    `"question": "You need help from several people, but everyone is too busy to help you. What do you do?"`
  ],
  [
    `"text": "Carefully balancing the right emotions to calm people down without admitting legal guilt."`,
    `"text": "Carefully balancing the right emotions to calm people down without accidentally getting your company in trouble."`
  ],
  [
    `"question": "When you show numbers to your boss, what takes up most of your time?"`,
    `"question": "When you report how things are going to your boss, what takes the most work?"`
  ],
  [
    `"text": "Getting different computer programs to talk to each other."`,
    `"text": "Making sure two different lists of information match up."`
  ],
  [
    `"text": "A completely new way to think about the entire business that nobody has ever thought of before."`,
    `"text": "A brand new idea that could change how we do everything."`
  ],
  [
    `"text": "I pay for expensive, fancy college magazines."`,
    `"text": "I read paid expert articles that most people don't have access to."`
  ],
  [
    `"text": "I stop answering basic questions and focus on building deep, powerful friendships with rich clients."`,
    `"text": "I stop answering basic questions and focus on building deep, powerful friendships with my most important customers."`
  ],
  [
    `"question": "Your math shows that the boss's favorite pet project is losing tons of money. How do you tell them?"`,
    `"question": "Your math shows that the boss's favorite idea is losing tons of money. How do you tell them?"`
  ],
  [
    `"text": "Do it, but keep it a secret so nobody gets mad."`,
    `"text": "Do it, but keep it hidden so nobody gets mad."`
  ],
  [
    `"text": "I talk to people and use secret, unwritten knowledge to tell a story."`,
    `"text": "I talk to people and use behind-the-scenes, unwritten knowledge to tell a story."`
  ],
  [
    `"text": "I point out the secret, real-world context they completely forgot to mention."`,
    `"text": "I point out the hidden, real-world context they completely forgot to mention."`
  ],
  [
    `"question": "A computer tells you to hand out work in a way that is super fast, but ruins any chance for your workers to get promoted. What do you do?"`,
    `"question": "A computer wants you to assign work in a way that's super fast but kills your workers' chance of getting promoted."`
  ]
];

let changed = 0;
for (const [target, replacement] of replacements) {
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    changed++;
  } else {
    console.log("Could not find:", target);
  }
}

fs.writeFileSync(path, content, 'utf8');
console.log(`Successfully replaced ${changed} strings.`);
