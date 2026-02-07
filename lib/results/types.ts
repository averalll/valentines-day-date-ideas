export interface NonNegotiables {
  items: string[];
}

/** Letter format for display and sharing. Built from plan.letter. */
export interface LoveLetter {
  opening: string;
  body: string;
  closing: string;
  dateStamp: string;
  nonNegotiables: NonNegotiables;
}

export const NON_NEGOTIABLES: NonNegotiables = {
  items: [
    'Get flowers (even one)',
    'Phone away for 30 minutes',
    'Be flexible if plans change',
    "End the night knowing you showed up",
  ],
};
