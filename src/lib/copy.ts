import type { Locale, LocalizedText } from "@/lib/types";

export const languageNames: Record<Locale, string> = {
  en: "English",
  hi: "Hinglish",
  gu: "Gujlish",
};

export const languageNativeLabels: Record<Locale, string> = {
  en: "English",
  hi: "Hindi + English",
  gu: "Gujarati + English",
};

export function text(value: LocalizedText, locale: Locale) {
  return value[locale] || value.en;
}

export const siteCopy = {
  navCta: {
    en: "Get my free plan",
    hi: "Free plan lo",
    gu: "Free plan melvo",
  },
  eyebrow: {
    en: "SURAT-BASED GROWTH TEAM",
    hi: "SURAT KI GROWTH TEAM",
    gu: "SURAT NI GROWTH TEAM",
  },
  headlineTop: {
    en: "Want more customers",
    hi: "Business ke liye zyada",
    gu: "Business ma vadhu",
  },
  headlineAccent: {
    en: "for your business?",
    hi: "customers chahiye?",
    gu: "customer joiye chhe?",
  },
  heroBody: {
    en: "Tell us what your business needs. We’ll suggest a clear next step for ads, Google visibility, product photos & videos, or an online store.",
    hi: "Bas business ki need batao. Ads, Google visibility, product photos/videos ya online store ke liye simple next step hum suggest karenge.",
    gu: "Bas business ni need janavo. Ads, Google visibility, product photo/video ke online store mate simple next step ame suggest karishu.",
  },
  primaryCta: {
    en: "Start 2-minute check",
    hi: "2-minute check shuru karo",
    gu: "2-minute check sharu karo",
  },
  noJargon: {
    en: "No confusing jargon",
    hi: "Koi confusing jargon nahi",
    gu: "Koi confusing jargon nahi",
  },
  freeCall: {
    en: "Free first conversation",
    hi: "Pehli baat free",
    gu: "Pehli vaat free",
  },
  localTeam: {
    en: "A real local team",
    hi: "Apni local team",
    gu: "Aapdi local team",
  },
  formKicker: {
    en: "YOUR 2-MINUTE BUSINESS CHECK",
    hi: "AAPKA 2-MINUTE BUSINESS CHECK",
    gu: "TAMARO 2-MINUTE BUSINESS CHECK",
  },
  formTitle: {
    en: "Let’s understand your business.",
    hi: "Chaliye, business samajhte hain.",
    gu: "Chalo, tamaro business samajhiye.",
  },
  formIntro: {
    en: "One easy question at a time. No technical knowledge needed.",
    hi: "Ek time par ek easy sawaal. Technical knowledge zaroori nahi.",
    gu: "Ek time par ek easy sawaal. Technical knowledge jaruri nathi.",
  },
  start: { en: "Start now", hi: "Abhi start karo", gu: "Havay start karo" },
  back: { en: "Back", hi: "Peechhe", gu: "Pachhal" },
  next: { en: "Continue", hi: "Aage chalo", gu: "Aagal vadho" },
  submit: {
    en: "Send my details",
    hi: "Meri details bhejo",
    gu: "Mari details moklo",
  },
  optional: { en: "Optional", hi: "Optional", gu: "Optional" },
  selectAll: {
    en: "Choose all that apply",
    hi: "Jo bhi sahi ho select karo",
    gu: "Je lagu pade te badhu select karo",
  },
  requiredError: {
    en: "Please answer this to continue.",
    hi: "Aage badhne ke liye answer chuniye.",
    gu: "Aagal vadhva mate answer pasand karo.",
  },
  consent: {
    en: "I agree that Global Surat may call or WhatsApp me about my enquiry. No spam.",
    hi: "Main agree karta/karti hoon ki Global Surat meri enquiry ke liye call ya WhatsApp kar sakta hai. No spam.",
    gu: "Hu agree chhu ke Global Surat mari enquiry mate call ke WhatsApp kari shake. No spam.",
  },
  consentError: {
    en: "Please allow us to contact you.",
    hi: "Please contact permission dijiye.",
    gu: "Please contact permission aapo.",
  },
  successTitle: {
    en: "Thank you — we’ve got it!",
    hi: "Thank you — details mil gayi!",
    gu: "Thank you — details mali gayi!",
  },
  successBody: {
    en: "Our Surat team will review your answers and contact you shortly with a simple next step.",
    hi: "Hamari Surat team answers dekhegi aur simple next step ke saath jaldi contact karegi.",
    gu: "Aapdi Surat team answers joine simple next step sathe jaldi contact karse.",
  },
  servicesEyebrow: {
    en: "WHAT WE CAN HELP WITH",
    hi: "HUM KISME HELP KARTE HAIN",
    gu: "AME SHU HELP KARIYE CHHIYE",
  },
  servicesTitle: {
    en: "You tell us the problem. We handle the technical part.",
    hi: "Aap problem batao. Technical kaam hum sambhalenge.",
    gu: "Tame problem janavo. Technical kaam ame sambhalishu.",
  },
  teamTitle: {
    en: "A team you can actually talk to.",
    hi: "Ek team jo aapki baat samjhe.",
    gu: "Ek team je tamari vaat samje.",
  },
  teamBody: {
    en: "We’re based in Surat and work with businesses in clear, everyday language—from the first call to the final launch.",
    hi: "Hum Surat mein hain aur first call se final launch tak simple language mein business ke saath kaam karte hain.",
    gu: "Ame Surat ma chhiye ane first call thi final launch sudhi simple language ma business sathe kaam kariye chhiye.",
  },
  processTitle: {
    en: "Simple from day one.",
    hi: "Day one se simple.",
    gu: "Day one thi simple.",
  },
  finalTitle: {
    en: "Ready to find your next growth step?",
    hi: "Next growth step jaanne ke liye ready?",
    gu: "Next growth step janva mate ready?",
  },
} satisfies Record<string, LocalizedText>;

export const services = [
  {
    number: "01",
    title: {
      en: "Get more calls & enquiries",
      hi: "Zyada calls aur enquiries pao",
      gu: "Vadhu calls ane enquiries melvo",
    },
    body: {
      en: "We show clear Facebook and Instagram ads to people most likely to contact you.",
      hi: "Facebook aur Instagram par sahi logon ko ads dikhakar calls aur WhatsApp badhate hain.",
      gu: "Facebook ane Instagram par sacha loko ne ads batavi calls ane WhatsApp vadhariye chhiye.",
    },
    technical: "Lead generation · Meta ads",
  },
  {
    number: "02",
    title: {
      en: "Sell more products online",
      hi: "Online zyada products becho",
      gu: "Online vadhu products vecho",
    },
    body: {
      en: "We improve your ads and online-shop journey so more visitors become buyers.",
      hi: "Ads aur online-shop journey improve karke visitors ko buyers banate hain.",
      gu: "Ads ane online-shop journey improve kari visitors ne buyers banaviye chhiye.",
    },
    technical: "D2C performance marketing",
  },
  {
    number: "03",
    title: {
      en: "Make products look premium",
      hi: "Products ko premium dikhao",
      gu: "Products ne premium dekhado",
    },
    body: {
      en: "Social posts, product-page photos, UGC-style videos and product showcase videos.",
      hi: "Social posts, product-page photos, UGC-style aur showcase videos banwate hain.",
      gu: "Social posts, product-page photos, UGC-style ane showcase videos banaviye chhiye.",
    },
    technical: "AI creative production",
  },
  {
    number: "04",
    title: {
      en: "Open or improve your online shop",
      hi: "Online shop banao ya improve karo",
      gu: "Online shop banao ke improve karo",
    },
    body: {
      en: "A fast, easy-to-use Shopify store that helps customers buy without confusion.",
      hi: "Fast aur easy Shopify store jahan customer bina confusion ke buy kare.",
      gu: "Fast ane easy Shopify store jya customer confusion vagar buy kare.",
    },
    technical: "Shopify web development",
  },
  {
    number: "05",
    title: {
      en: "Show up higher on Google",
      hi: "Google par upar dikhai do",
      gu: "Google par upar dekhavo",
    },
    body: {
      en: "We make it easier for nearby and relevant customers to find your business.",
      hi: "Nearby aur relevant customers ke liye business ko Google par easy to find banate hain.",
      gu: "Nearby ane relevant customers mate business ne Google par easy to find banaviye chhiye.",
    },
    technical: "SEO",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: { en: "Tell us", hi: "Humein batao", gu: "Amne janavo" },
    body: {
      en: "Answer a few easy questions about your business.",
      hi: "Business ke baare mein kuch easy sawaal.",
      gu: "Business vishe thoda easy sawaal.",
    },
  },
  {
    number: "02",
    title: { en: "We review", hi: "Hum review karein", gu: "Ame review kariye" },
    body: {
      en: "A real strategist looks at your needs—not a bot.",
      hi: "Aapki need ek real strategist dekhega, bot nahi.",
      gu: "Tamari need ek real strategist joshe, bot nahi.",
    },
  },
  {
    number: "03",
    title: { en: "Clear next step", hi: "Simple next step", gu: "Simple next step" },
    body: {
      en: "We call with a practical suggestion and no pressure.",
      hi: "Practical suggestion ke saath call—koi pressure nahi.",
      gu: "Practical suggestion sathe call—koi pressure nahi.",
    },
  },
] as const;
