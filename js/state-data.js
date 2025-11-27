// ========================================
// STATE LAWS DATABASE - PHASE 3
// Complete state laws for ALL 50 STATES
// Updated for 2025 legislation
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
    penalty: 'Class C misdemeanor (up to 3 months jail, $500 fine)',
    notes: 'Alabama does not allow tattooing of minors under any circumstances.',
    restrictions: 'Patron may not be intoxicated or otherwise impaired',
    medicalExceptions: true,
    strictnessLevel: 'strict', // For map color coding
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
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 2
  },
  
  arizona: {
    name: 'Arizona',
    abbreviation: 'AZ',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'AZ Rev. Stat. § 13-3721',
    penalty: 'Class 1 misdemeanor',
    notes: 'Arizona prohibits tattooing anyone under 18 years old.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 8,
    ranking: 3
  },
  
  arkansas: {
    name: 'Arkansas',
    abbreviation: 'AR',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'AR Code § 17-33-301',
    penalty: 'Misdemeanor',
    notes: 'Arkansas allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Parent or guardian must be present during procedure',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 2,
    ranking: 4
  },
  
  california: {
    name: 'California',
    abbreviation: 'CA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'CA Penal Code § 653',
    penalty: 'Misdemeanor (up to $2,500 fine)',
    notes: 'California strictly prohibits tattooing minors under 18, even with parental consent.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 12,
    ranking: 5
  },
  
  colorado: {
    name: 'Colorado',
    abbreviation: 'CO',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'CO Rev. Stat. § 25-4-1701',
    penalty: 'Class 2 misdemeanor',
    notes: 'Colorado allows tattooing at 16 with notarized parental consent and presence.',
    restrictions: 'Notarized written consent required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 3,
    ranking: 6
  },
  
  connecticut: {
    name: 'Connecticut',
    abbreviation: 'CT',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'CT Gen. Stat. § 19a-92',
    penalty: 'Class D misdemeanor',
    notes: 'Connecticut prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 2,
    ranking: 7
  },
  
  delaware: {
    name: 'Delaware',
    abbreviation: 'DE',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'DE Code Title 16 § 2901',
    penalty: 'Class B misdemeanor',
    notes: 'Delaware prohibits tattooing minors under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 8
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
    notes: 'Florida allows tattooing at age 16 with notarized parental consent and parental presence during procedure.',
    restrictions: 'Notarized consent required; parent must be present during procedure',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 7,
    ranking: 9
  },
  
  georgia: {
    name: 'Georgia',
    abbreviation: 'GA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'GA Code § 16-5-71',
    penalty: 'Misdemeanor (up to 12 months jail, $1,000 fine)',
    notes: 'Georgia prohibits tattooing anyone under 18. Special restriction on eye area.',
    restrictions: 'Unlawful to tattoo within an inch of the eye socket',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 4,
    ranking: 10
  },
  
  hawaii: {
    name: 'Hawaii',
    abbreviation: 'HI',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'HI Rev. Stat. § 321-371',
    penalty: 'Petty misdemeanor',
    notes: 'Hawaii prohibits tattooing anyone under 18 years old.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 2,
    ranking: 11
  },
  
  idaho: {
    name: 'Idaho',
    abbreviation: 'ID',
    minAge: 14,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 14,
    legalCode: 'ID Code § 18-1523',
    penalty: 'Misdemeanor',
    notes: 'Idaho allows tattooing at 14 with written parental consent and presence. One of the most lenient states.',
    restrictions: 'Written consent and presence of parent or legal guardian required',
    medicalExceptions: true,
    strictnessLevel: 'lenient',
    clickVolume: 1,
    ranking: 12
  },
  
  illinois: {
    name: 'Illinois',
    abbreviation: 'IL',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 18,
    legalCode: 'IL Stat. 410 ILCS 54/10',
    penalty: 'Class A misdemeanor',
    notes: 'Illinois requires individuals to be 18, but allows parental consent and presence.',
    restrictions: 'Parental consent and presence required for minors',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 5,
    ranking: 13
  },
  
  indiana: {
    name: 'Indiana',
    abbreviation: 'IN',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'IN Code § 35-45-2-5',
    penalty: 'Class B misdemeanor',
    notes: 'Indiana prohibits tattooing anyone under 18, no parental consent allowed.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 3,
    ranking: 14
  },
  
  iowa: {
    name: 'Iowa',
    abbreviation: 'IA',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'IA Code § 135.37',
    penalty: 'Simple misdemeanor',
    notes: 'Iowa allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 1,
    ranking: 15
  },
  
  kansas: {
    name: 'Kansas',
    abbreviation: 'KS',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'KS Stat. § 65-1949',
    penalty: 'Class C misdemeanor',
    notes: 'Kansas allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence of parent or guardian required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 2,
    ranking: 16
  },
  
  kentucky: {
    name: 'Kentucky',
    abbreviation: 'KY',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'KY Rev. Stat. § 436.425',
    penalty: 'Class A misdemeanor',
    notes: 'Kentucky prohibits tattooing anyone under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 2,
    ranking: 17
  },
  
  louisiana: {
    name: 'Louisiana',
    abbreviation: 'LA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'LA Rev. Stat. § 37:3451',
    penalty: 'Fine up to $500',
    notes: 'Louisiana prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 2,
    ranking: 18
  },
  
  maine: {
    name: 'Maine',
    abbreviation: 'ME',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'ME Rev. Stat. Title 32 § 4201',
    penalty: 'Civil violation',
    notes: 'Maine allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 1,
    ranking: 19
  },
  
  maryland: {
    name: 'Maryland',
    abbreviation: 'MD',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'MD Code, Health-Gen § 8-402',
    penalty: 'Misdemeanor',
    notes: 'Maryland prohibits tattooing anyone under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 3,
    ranking: 20
  },
  
  massachusetts: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'MA Gen. Laws ch. 265 § 34',
    penalty: 'Fine up to $300',
    notes: 'Massachusetts prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 4,
    ranking: 21
  },
  
  michigan: {
    name: 'Michigan',
    abbreviation: 'MI',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'MI Comp. Laws § 333.13102',
    penalty: 'Misdemeanor (up to 90 days jail, $1,000 fine)',
    notes: 'Michigan prohibits tattooing anyone under 18, no parental consent allowed.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 4,
    ranking: 22
  },
  
  minnesota: {
    name: 'Minnesota',
    abbreviation: 'MN',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'MN Stat. § 146B.07',
    penalty: 'Misdemeanor',
    notes: 'Minnesota allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 2,
    ranking: 23
  },
  
  mississippi: {
    name: 'Mississippi',
    abbreviation: 'MS',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'MS Code § 73-30-3',
    penalty: 'Misdemeanor',
    notes: 'Mississippi prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 24
  },
  
  missouri: {
    name: 'Missouri',
    abbreviation: 'MO',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'MO Rev. Stat. § 324.520',
    penalty: 'Class A misdemeanor',
    notes: 'Missouri prohibits tattooing anyone under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 2,
    ranking: 25
  },
  
  montana: {
    name: 'Montana',
    abbreviation: 'MT',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'MT Code § 37-30-102',
    penalty: 'Misdemeanor',
    notes: 'Montana allows tattooing at 16 with notarized parental consent and presence.',
    restrictions: 'Notarized consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 1,
    ranking: 26
  },
  
  nebraska: {
    name: 'Nebraska',
    abbreviation: 'NE',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'NE Rev. Stat. § 71-4801',
    penalty: 'Class II misdemeanor',
    notes: 'Nebraska prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 27
  },
  
  nevada: {
    name: 'Nevada',
    abbreviation: 'NV',
    minAge: 14,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 14,
    legalCode: 'NV Rev. Stat. § 597.880',
    penalty: 'Misdemeanor',
    notes: 'Nevada allows tattooing at 14 with written parental consent and presence. One of the most lenient states.',
    restrictions: 'Written consent and presence of parent or legal guardian required',
    medicalExceptions: true,
    strictnessLevel: 'lenient',
    clickVolume: 2,
    ranking: 28
  },
  
  newhampshire: {
    name: 'New Hampshire',
    abbreviation: 'NH',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'NH Rev. Stat. § 314-A:3',
    penalty: 'Misdemeanor',
    notes: 'New Hampshire prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 29
  },
  
  newjersey: {
    name: 'New Jersey',
    abbreviation: 'NJ',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'NJ Stat. § 26:2D-4.14',
    penalty: 'Disorderly persons offense',
    notes: 'New Jersey prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 3,
    ranking: 30
  },
  
  newmexico: {
    name: 'New Mexico',
    abbreviation: 'NM',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'NM Stat. § 61-14B-3',
    penalty: 'Misdemeanor',
    notes: 'New Mexico prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 31
  },
  
  newyork: {
    name: 'New York',
    abbreviation: 'NY',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'NY Gen. Bus. Law § 399',
    penalty: 'Class B misdemeanor',
    notes: 'New York prohibits tattooing anyone under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 8,
    ranking: 32
  },
  
  northcarolina: {
    name: 'North Carolina',
    abbreviation: 'NC',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'NC Gen. Stat. § 14-400',
    penalty: 'Class 2 misdemeanor',
    notes: 'North Carolina prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 4,
    ranking: 33
  },
  
  northdakota: {
    name: 'North Dakota',
    abbreviation: 'ND',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'ND Cent. Code § 12.1-31-08',
    penalty: 'Class B misdemeanor',
    notes: 'North Dakota allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 0,
    ranking: 34
  },
  
  ohio: {
    name: 'Ohio',
    abbreviation: 'OH',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'OH Rev. Code § 3730.04',
    penalty: 'Minor misdemeanor',
    notes: 'Ohio allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 5,
    ranking: 35
  },
  
  oklahoma: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'OK Stat. Title 63 § 1-1955',
    penalty: 'Misdemeanor',
    notes: 'Oklahoma allows tattooing at 16 with notarized parental consent and presence.',
    restrictions: 'Notarized consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 2,
    ranking: 36
  },
  
  oregon: {
    name: 'Oregon',
    abbreviation: 'OR',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 15,
    legalCode: 'OR Rev. Stat. § 690.410',
    penalty: 'Class A violation',
    notes: 'Oregon allows tattooing at 15 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'lenient',
    clickVolume: 2,
    ranking: 37
  },
  
  pennsylvania: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'PA Stat. Title 18 § 6311',
    penalty: 'Summary offense',
    notes: 'Pennsylvania prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 5,
    ranking: 38
  },
  
  rhodeisland: {
    name: 'Rhode Island',
    abbreviation: 'RI',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'RI Gen. Laws § 23-20.9-4',
    penalty: 'Misdemeanor',
    notes: 'Rhode Island allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 1,
    ranking: 39
  },
  
  southcarolina: {
    name: 'South Carolina',
    abbreviation: 'SC',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 16,
    legalCode: 'SC Code § 44-34-20',
    penalty: 'Misdemeanor',
    notes: 'South Carolina allows tattooing at 16 with written parental consent and presence.',
    restrictions: 'Written consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 2,
    ranking: 40
  },
  
  southdakota: {
    name: 'South Dakota',
    abbreviation: 'SD',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'SD Codified Laws § 34-1-17',
    penalty: 'Class 2 misdemeanor',
    notes: 'South Dakota prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 0,
    ranking: 41
  },
  
  tennessee: {
    name: 'Tennessee',
    abbreviation: 'TN',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'TN Code § 62-38-201',
    penalty: 'Class A misdemeanor',
    notes: 'Tennessee prohibits tattooing anyone under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 3,
    ranking: 42
  },
  
  texas: {
    name: 'Texas',
    abbreviation: 'TX',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 18,
    legalCode: 'TX Health & Safety Code § 146.012',
    penalty: 'Class A misdemeanor',
    notes: 'Texas requires individuals to be 18, but allows parental consent and presence.',
    restrictions: 'Parental consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 15,
    ranking: 43
  },
  
  utah: {
    name: 'Utah',
    abbreviation: 'UT',
    minAge: 18,
    parentalConsentAllowed: true,
    parentalPresenceRequired: true,
    consentAge: 18,
    legalCode: 'UT Code § 58-11a-602',
    penalty: 'Class B misdemeanor',
    notes: 'Utah requires individuals to be 18, but allows parental consent and presence.',
    restrictions: 'Parental consent and presence required',
    medicalExceptions: true,
    strictnessLevel: 'moderate',
    clickVolume: 2,
    ranking: 44
  },
  
  vermont: {
    name: 'Vermont',
    abbreviation: 'VT',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'VT Stat. Title 26 § 4802',
    penalty: 'Administrative fine',
    notes: 'Vermont prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 0,
    ranking: 45
  },
  
  virginia: {
    name: 'Virginia',
    abbreviation: 'VA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'VA Code § 18.2-371.3',
    penalty: 'Class 1 misdemeanor',
    notes: 'Virginia prohibits tattooing anyone under 18, no exceptions.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 4,
    ranking: 46
  },
  
  washington: {
    name: 'Washington',
    abbreviation: 'WA',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'WA Rev. Code § 18.300.010',
    penalty: 'Gross misdemeanor',
    notes: 'Washington prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 3,
    ranking: 47
  },
  
  westvirginia: {
    name: 'West Virginia',
    abbreviation: 'WV',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'WV Code § 30-50-4',
    penalty: 'Misdemeanor',
    notes: 'West Virginia prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 1,
    ranking: 48
  },
  
  wisconsin: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'WI Stat. § 948.70',
    penalty: 'Class A misdemeanor',
    notes: 'Wisconsin prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 2,
    ranking: 49
  },
  
  wyoming: {
    name: 'Wyoming',
    abbreviation: 'WY',
    minAge: 18,
    parentalConsentAllowed: false,
    parentalPresenceRequired: false,
    consentAge: null,
    legalCode: 'WY Stat. § 33-38-102',
    penalty: 'Misdemeanor',
    notes: 'Wyoming prohibits tattooing anyone under 18.',
    restrictions: 'None specified',
    medicalExceptions: true,
    strictnessLevel: 'strict',
    clickVolume: 0,
    ranking: 50
  }
};

// Helper function to get all state keys
function getAllStateKeys() {
  return Object.keys(stateLaws);
}

// Helper function to get states by strictness level
function getStatesByStrictness(level) {
  return Object.entries(stateLaws)
    .filter(([key, state]) => state.strictnessLevel === level)
    .map(([key, state]) => ({ key, ...state }));
}

// Helper function to search states
function searchStates(query) {
  const lowerQuery = query.toLowerCase();
  return Object.entries(stateLaws)
    .filter(([key, state]) => 
      state.name.toLowerCase().includes(lowerQuery) ||
      state.abbreviation.toLowerCase().includes(lowerQuery) ||
      state.legalCode.toLowerCase().includes(lowerQuery)
    )
    .map(([key, state]) => ({ key, ...state }));
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { stateLaws, getAllStateKeys, getStatesByStrictness, searchStates };
}
