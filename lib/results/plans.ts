import { DatePlan } from '../quiz/types';

export const DATE_PLANS: DatePlan[] = [
  // LOW KEY
  {
    id: 'movie-marathon',
    tier: 'LOW_KEY',
    title: 'Comfort Movie Marathon Night',
    steps: [
      'Order comfort food (one main, one dessert)',
      'Pick two movies you already love',
      'Blankets, lights low, phones away',
    ],
    letter: {
      opening: 'Hey you,',
      body: `Here's the plan: we order in comfort food—one main, one dessert. Pick two movies we already love.

Blankets, lights low, phones away. Pause whenever we want.`,
      closing: "You in?",
    },
  },
  {
    id: 'home-spa',
    tier: 'LOW_KEY',
    title: 'At-Home Spa & Slow Evening',
    steps: [
      'Sheet masks or face packs',
      'Warm shower or foot soak',
      'Light dinner or dessert',
    ],
    letter: {
      opening: 'Hey you,',
      body: `Sheet masks or face packs first. Then a warm shower or foot soak.

Light dinner or dessert after.`,
      closing: "Sound good?",
    },
  },
  {
    id: 'surprise-food',
    tier: 'LOW_KEY',
    title: 'Surprise Food Night',
    steps: [
      'Each person orders one item for the other',
      'No reveals until delivery',
      'Eat together + one movie',
    ],
    letter: {
      opening: 'Hey you,',
      body: `We each order one item for the other—no reveals until the food arrives.

Then we eat together and put on one movie.`,
      closing: "Curious what you'll pick for me.",
    },
  },

  // ACTIVITY
  {
    id: 'cook-cards',
    tier: 'ACTIVITY',
    title: 'Cook + Music + Cards Night',
    steps: [
      'Cook favourite dish together, open a bottle of wine while you do so',
      'Put on some music',
      'Eat your meal while watching a movie or turn it into a cozy candlelight dinner',
      "Don't forget to order dessert!",
    ],
    letter: {
      opening: 'Hey you,',
      body: `Cook our favorite dish together, open a bottle of wine, put on some music.

Eat at the table—candlelight or whatever—or curl up with a movie. Dessert after.`,
      closing: "You in?",
    },
  },
  {
    id: 'build-together',
    tier: 'ACTIVITY',
    title: 'Build Something Together',
    steps: [
      'Lego, puzzle, or craft',
      '45-minute timer',
      'Order food while building',
    ],
    letter: {
      opening: 'Hey you,',
      body: `Lego, puzzle, or craft—you pick. 45-minute timer, order food while we work.

See what we end up with.`,
      closing: "Down?",
    },
  },

  // BIG
  {
    id: 'candlelight-dinner',
    tier: 'BIG',
    title: 'Candlelight Dinner + Dessert Walk',
    steps: [
      'Dress up',
      'One good restaurant',
      'Dessert somewhere else',
    ],
    letter: {
      opening: 'My love,',
      body: `We dress up. One good restaurant for dinner, then dessert somewhere else.`,
      closing: "Let's do it.",
    },
  },
  {
    id: 'picnic-sunset',
    tier: 'BIG',
    title: 'Picnic + Sunset Walk',
    steps: [
      'Pick up food',
      'Sit somewhere quiet',
      'Walk after + ice cream',
    ],
    letter: {
      opening: 'My love,',
      body: `Pick up food, find a spot to sit, watch the day wind down.

Walk after and grab ice cream.`,
      closing: "What do you say?",
    },
  },
  {
    id: 'mini-getaway',
    tier: 'BIG',
    title: 'Mini Getaway Close to Home',
    steps: [
      'Airbnb within 1–2 hours',
      'Dinner in or nearby',
      'Sleep in next morning',
    ],
    letter: {
      opening: 'My love,',
      body: `Found a place an hour or two away. Check in, dinner in or nearby, sleep in next morning.`,
      closing: "Let's go.",
    },
  },
];
