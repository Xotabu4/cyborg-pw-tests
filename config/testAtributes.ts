export const Tag = {
  CYBORG: "@CYBORG",
  AI: "@AI",
  AUTOMATED: "@AUTOMATED",
};

export const Owner = {
  okhotemskyi: "@okhotemskyi",
  billHerrington: "@billHerrington",
};

export const description = (description: string) => ({
  type: "description",
  description,
});

export const severity = {
  CRITICAL: {
    type: "severity",
    description: "CRITICAL",
  },
  HIGH: {
    type: "severity",
    description: "HIGH",
  },
  MEDIUM: {
    type: "severity",
    description: "MEDIUM",
  },
  LOW: {
    type: "severity",
    description: "LOW",
  },
};
