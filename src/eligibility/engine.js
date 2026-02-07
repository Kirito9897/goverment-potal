// Rule-based eligibility engine.
// This module is intentionally framework-agnostic so that it can be reused
// or replaced with an AI / LLM powered implementation later.

/**
 * @typedef {Object} EligibilityInput
 * @property {number} age
 * @property {number} income
 * @property {string} state
 * @property {string} category
 * @property {string[]} [tags] - additional tags describing the applicant (student, farmer, etc.)
 */

/**
 * Evaluate whether a user is eligible for a given scheme based on simple JSON rules.
 * @param {Object} scheme
 * @param {EligibilityInput} input
 * @returns {{eligible: boolean, reason: string}}
 */
export function evaluateSchemeEligibility(scheme, input) {
  const rules = scheme.eligibilityRules || {};
  const reasons = [];

  if (rules.minAge != null && input.age < rules.minAge) {
    reasons.push(`Minimum age required is ${rules.minAge} years.`);
  }
  if (rules.maxAge != null && input.age > rules.maxAge) {
    reasons.push(`Maximum age allowed is ${rules.maxAge} years.`);
  }

  if (rules.minIncome != null && input.income < rules.minIncome) {
    reasons.push(
      `Minimum annual income required is ₹${rules.minIncome.toLocaleString('en-IN')}.`
    );
  }
  if (rules.maxIncome != null && input.income > rules.maxIncome) {
    reasons.push(
      `Annual family income should not exceed ₹${rules.maxIncome.toLocaleString('en-IN')}.`
    );
  }

  if (Array.isArray(rules.states) && rules.states.length > 0) {
    const match = rules.states.includes(input.state);
    if (!match) {
      reasons.push('This scheme is available only for specific States/UTs.');
    }
  }

  if (Array.isArray(rules.categories) && rules.categories.length > 0) {
    const match = rules.categories.includes(input.category);
    if (!match) {
      reasons.push(
        `This scheme is reserved for categories: ${rules.categories.join(', ')}.`
      );
    }
  }

  if (Array.isArray(rules.targetGroups) && rules.targetGroups.length > 0) {
    const tags = input.tags || [];
    const intersect = tags.filter((t) => rules.targetGroups.includes(t));
    if (intersect.length === 0) {
      reasons.push(
        `The scheme primarily targets: ${rules.targetGroups.join(', ')}.`
      );
    }
  }

  if (reasons.length === 0) {
    return {
      eligible: true,
      reason:
        'You appear to meet the basic eligibility criteria based on the information provided. Please verify details on the official scheme website before applying.'
    };
  }

  return {
    eligible: false,
    reason:
      'Based on the information provided, you may not meet all eligibility conditions:\n- ' +
      reasons.join('\n- ')
  };
}

/**
 * Evaluate eligibility across a list of schemes and return explanations.
 * @param {Array} schemes
 * @param {EligibilityInput} input
 */
export function evaluateEligibilityForSchemes(schemes, input) {
  return schemes.map((scheme) => {
    const result = evaluateSchemeEligibility(scheme, input);
    return { scheme, ...result };
  });
}
