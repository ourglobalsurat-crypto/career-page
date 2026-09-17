import type { Locale, LocalizedText } from "@/lib/types";

export const languageNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
};

export const languageNativeLabels: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी + English",
  gu: "ગુજરાતી + English",
};

export function text(value: LocalizedText, locale: Locale) {
  return value[locale] || value.en;
}

export const siteCopy = {
  navCta: {"en": "Apply now", "hi": "", "gu": ""},
  mainWebsite: {
    en: "Visit our main website",
    hi: "Main website देखें",
    gu: "Main website જુઓ",
  },
  websiteShort: {
    en: "Website",
    hi: "Website",
    gu: "Website",
  },
  eyebrow: {"en": "BUILD YOUR CAREER IN SURAT", "hi": "", "gu": ""},
  headlineTop: {"en": "Do work that matters.", "hi": "", "gu": ""},
  headlineAccent: {"en": "Grow with us.", "hi": "", "gu": ""},
  heroBody: {"en": "Join Global Surat’s team of marketers, creators, developers and sales professionals. Bring your experience, your best work and your ambition. Let’s build what’s next, together.", "hi": "", "gu": ""},
  primaryCta: {"en": "Start your application", "hi": "", "gu": ""},
  whatsappCta: {"en": "Talk to our team", "hi": "", "gu": ""},
  noJargon: {"en": "Real work. Real impact.", "hi": "", "gu": ""},
  freeCall: {"en": "A skills-first process", "hi": "", "gu": ""},
  localTeam: {"en": "Surat office", "hi": "", "gu": ""},
  languageAvailability: {"en": "Role-specific questions are in English. Share clear, practical examples.", "hi": "", "gu": ""},
  formKicker: {"en": "YOUR NEXT CHAPTER STARTS HERE", "hi": "", "gu": ""},
  formTitle: {"en": "Find your place with us.", "hi": "", "gu": ""},
  formIntro: {"en": "Choose your position first, then show us your experience. Keep your résumé and work links ready. Allow 10–15 minutes.", "hi": "", "gu": ""},
  start: { en: "Start now", hi: "अभी शुरू करें", gu: "હમણાં શરૂ કરો" },
  back: { en: "Back", hi: "पीछे", gu: "પાછળ" },
  next: { en: "Continue", hi: "आगे बढ़ें", gu: "આગળ વધો" },
  submit: {"en": "Submit application", "hi": "", "gu": ""},
  saving: { en: "Saving...", hi: "Save हो रहा है...", gu: "Save થઈ રહ્યું છે..." },
  optional: { en: "Optional", hi: "ज़रूरी नहीं", gu: "ફરજિયાત નથી" },
  selectAll: {
    en: "Choose all that apply",
    hi: "जो सही लगें, वे सभी चुनें",
    gu: "જે લાગુ પડે તે બધું પસંદ કરો",
  },
  requiredError: {
    en: "Please answer this to continue.",
    hi: "आगे बढ़ने के लिए जवाब चुनें।",
    gu: "આગળ વધવા માટે આ સવાલનો જવાબ આપો.",
  },
  consent: {"en": "I consent to Global Surat storing my application and résumé for recruitment and contacting me about this application.", "hi": "", "gu": ""},
  consentError: {
    en: "Please allow us to contact you.",
    hi: "कृपया हमें संपर्क करने की अनुमति दें।",
    gu: "કૃપા કરીને અમને સંપર્ક કરવાની મંજૂરી આપો.",
  },
  successKicker: {"en": "APPLICATION RECEIVED", "hi": "", "gu": ""},
  successTitle: {"en": "Thank you for applying!", "hi": "", "gu": ""},
  successBody: {"en": "Our hiring team will review your experience and work. If your profile matches the role, we’ll contact you about the next step.", "hi": "", "gu": ""},
  humanFollowUp: {"en": "Reviewed by our hiring team", "hi": "", "gu": ""},
  detailsPrivate: {
    en: "Your details stay private",
    hi: "आपकी details सुरक्षित रहेंगी",
    gu: "તમારી details સુરક્ષિત રહેશે",
  },
  formUnavailable: {
    en: "The questionnaire is temporarily unavailable.",
    hi: "सवाल अभी उपलब्ध नहीं हैं। कृपया थोड़ी देर बाद कोशिश करें।",
    gu: "સવાલો હમણાં ઉપલબ્ધ નથી. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.",
  },
  saveError: {
    en: "We could not save your details. Please try again.",
    hi: "आपकी details save नहीं हो सकीं। कृपया फिर कोशिश करें।",
    gu: "તમારી details save થઈ શકી નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",
  },
  connectError: {
    en: "We could not connect. Please check your internet and try again.",
    hi: "Connection नहीं हो सका। Internet जाँचकर फिर कोशिश करें।",
    gu: "Connection થઈ શક્યું નથી. Internet તપાસીને ફરી પ્રયાસ કરો.",
  },
  privacyNote: {
    en: "Private & secure. Your details are never sold.",
    hi: "आपकी details सुरक्षित हैं। उन्हें कभी बेचा नहीं जाता।",
    gu: "તમારી details સુરક્ષિત છે. તે ક્યારેય વેચાતી નથી.",
  },
  servicesEyebrow: {"en": "FIND YOUR NEXT ROLE", "hi": "", "gu": ""},
  servicesTitle: {"en": "Different strengths. One ambitious team.", "hi": "", "gu": ""},
  servicesIntro: {"en": "Explore our open positions below. Choose your role in the application to answer questions specific to your work.", "hi": "", "gu": ""},
  teamEyebrow: {"en": "MEET YOUR FUTURE TEAM", "hi": "", "gu": ""},
  teamTitle: {"en": "Good people. Meaningful work.", "hi": "", "gu": ""},
  teamBody: {"en": "Based in Surat, we work together across strategy, marketing, creative and development. Bring your perspective, take ownership and help our clients move forward.", "hi": "", "gu": ""},
  teamPhotoLabel: { en: "OUR TEAM", hi: "हमारी TEAM", gu: "અમારી TEAM" },
  processEyebrow: {"en": "OUR HIRING PROCESS", "hi": "", "gu": ""},
  processTitle: {"en": "Show us what you can do.", "hi": "", "gu": ""},
  faqEyebrow: { en: "GOOD TO KNOW", hi: "जानना अच्छा है", gu: "જાણવું સારું છે" },
  faqTitle: {"en": "Before you apply.", "hi": "", "gu": ""},
  finalEyebrow: {"en": "YOUR EXPERIENCE. YOUR IDEAS. YOUR NEXT STEP.", "hi": "", "gu": ""},
  finalTitle: {"en": "Ready to build your next chapter?", "hi": "", "gu": ""},
  footerBody: {"en": "Careers at Global Surat · Surat, Gujarat.", "hi": "", "gu": ""},
} satisfies Record<string, LocalizedText>;

export const marqueeItems = ['MARKETING', 'CREATIVE', 'DEVELOPMENT', 'SALES', 'YOUR NEXT CHAPTER'].map(en => ({en, hi:'', gu:''}));
export const processSteps = [
 {number:'01',title:{en:'Tell us about you',hi:'',gu:''},body:{en:'Choose a position and share your experience, practical answers and résumé.',hi:'',gu:''}},
 {number:'02',title:{en:'We review your work',hi:'',gu:''},body:{en:'Our hiring team reviews your answers, results and portfolio for the role.',hi:'',gu:''}},
 {number:'03',title:{en:'Let’s meet',hi:'',gu:''},body:{en:'If there is a fit, we contact you about an interview and the next steps.',hi:'',gu:''}},
];
