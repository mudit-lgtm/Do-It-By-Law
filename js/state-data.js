// ========================================
// STATE LAWS DATABASE - PHASE 2
// Complete state laws for 5 states
// ========================================

const stateLaws = {
  alabama: {
    name: 'Alabama',
    abbreviation: 'AL',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'AL Code § 22-17A-2',
    penalty: 'Class C misdemeanor',
    notes: 'Alabama does not allow tattooing of minors under any circumstances.',
    restrictions: 'Patron may not be intoxicated or otherwise impaired',
    medicalExceptions: true,
    clickVolume: 121,
    ranking: 1
  },
  
  alaska: {
    name: 'Alaska',
    abbreviation: 'AK',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'Alaska Stat. § 08.13.190',
    penalty: 'Class B misdemeanor',
    notes: 'Alaska prohibits tattooing anyone under 18, no exceptions for parental consent.',
    restrictions: 'None specified',
    medicalExceptions: true,
    clickVolume: 1,
    ranking: 2
  },
  
  california: {
    name: 'California',
    abbreviation: 'CA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'CA Penal Code § 653',
    penalty: 'Misdemeanor',
    notes: 'California strictly prohibits tattooing minors under 18, even with parental consent.',
    restrictions: 'None specified',
    medicalExceptions: true,
    clickVolume: 12,
    ranking: 3
  },
  
  florida: {
    name: 'Florida',
    abbreviation: 'FL',
    minAge: 16,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'FL Stat. § 381.00787',
    penalty: 'Misdemeanor of the second degree',
    notes: 'Florida allows tattooing at age 16 with notarized parental consent and parental presence.',
    restrictions: 'Notarized consent required; parent must be present during procedure',
    medicalExceptions: true,
    clickVolume: 0,
    ranking: 4
  },
  
  georgia: {
    name: 'Georgia',
    abbreviation: 'GA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'GA Code § 16-5-71',
    penalty: 'Misdemeanor',
    notes: 'Georgia prohibits tattooing anyone under 18.',
    restrictions: 'Unlawful to tattoo within an inch of the eye socket',
    medicalExceptions: true,
    clickVolume: 0,
    ranking: 5
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = stateLaws;
}
