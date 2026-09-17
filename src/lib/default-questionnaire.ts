import type { PublicQuestion, PublicQuestionnaire } from "./types";
export const defaultQuestions: PublicQuestion[] = [
  {
    "id": "44444444-4444-4444-8444-000000000001",
    "key": "full_name",
    "label": {
      "en": "What is your full name?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 1,
    "type": "short_text",
    "options": [],
    "config": {
      "systemRole": "contact_name",
      "maxLength": 120
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000002",
    "key": "phone",
    "label": {
      "en": "Your mobile / WhatsApp number",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 2,
    "type": "phone",
    "options": [],
    "config": {
      "systemRole": "contact_phone"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000003",
    "key": "email",
    "label": {
      "en": "Your email address",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 3,
    "type": "email",
    "options": [],
    "config": {},
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000004",
    "key": "city",
    "label": {
      "en": "Which city do you currently live in?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 4,
    "type": "short_text",
    "options": [],
    "config": {
      "maxLength": 120
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000005",
    "key": "growth_path",
    "label": {
      "en": "Which position are you applying for?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 5,
    "type": "single_choice",
    "options": [
      {
        "id": "performance_marketer",
        "label": {
          "en": "Performance Marketer",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "lead_generation",
        "label": {
          "en": "Lead Generation Expert",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "d2c_growth",
        "label": {
          "en": "D2C Growth Expert",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "seo",
        "label": {
          "en": "SEO Expert / SEO Specialist",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "manager",
        "label": {
          "en": "Manager / Senior Manager",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "influencer",
        "label": {
          "en": "Influencer Marketing Executive",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "video_editor",
        "label": {
          "en": "Video Editor",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "social_media",
        "label": {
          "en": "Social Media Manager",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "shopify",
        "label": {
          "en": "Shopify Developer",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "designer",
        "label": {
          "en": "Graphic Designer",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "sales",
        "label": {
          "en": "Sales Executive",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "systemRole": "flow_selector"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000006",
    "key": "performance_marketer_q1",
    "label": {
      "en": "How many years of hands-on paid advertising experience do you have?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 6,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Fresher",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "performance_marketer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000007",
    "key": "performance_marketer_q2",
    "label": {
      "en": "Approximately how much total ad spend have you personally managed?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 7,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Below ₹5 lakh",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "₹5–25 lakh",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "₹25 lakh–₹1 crore",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "₹1–5 crore",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "₹5 crore+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "performance_marketer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000008",
    "key": "performance_marketer_q3",
    "label": {
      "en": "What is the highest monthly ad spend you managed for a single brand?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 8,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Below ₹1 lakh",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "₹1–5 lakh",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "₹5–15 lakh",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "₹15–50 lakh",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "₹50 lakh+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "performance_marketer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000009",
    "key": "performance_marketer_q4",
    "label": {
      "en": "What was your best sustainable monthly ROAS, and in which industry?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Include the industry, ROAS, monthly spend and how long you sustained it.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 9,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "performance_marketer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000010",
    "key": "performance_marketer_q5",
    "label": {
      "en": "CPA increases by 40% while CPM stays almost unchanged. What would you investigate first?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 10,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Increase budget immediately",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "CTR, CVR, creative performance and funnel drop-offs",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Increase campaign frequency",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Change billing method",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "performance_marketer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000011",
    "key": "performance_marketer_q6",
    "label": {
      "en": "What Meta Ads frequency would concern you in prospecting, and why?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 11,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "performance_marketer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000012",
    "key": "lead_generation_q1",
    "label": {
      "en": "How many years of lead-generation advertising experience do you have?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 12,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Fresher",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "lead_generation"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000013",
    "key": "lead_generation_q2",
    "label": {
      "en": "Which platforms have you personally managed?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 13,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Meta Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Google Search Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Google Display",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "YouTube",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "LinkedIn Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Other",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "lead_generation"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000014",
    "key": "lead_generation_q3",
    "label": {
      "en": "What is your highest monthly lead-generation budget?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 14,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Below ₹1L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "₹1–5L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "₹5–15L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "₹15–30L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "₹30L+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "lead_generation"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000015",
    "key": "lead_generation_q4",
    "label": {
      "en": "Share your strongest lead-generation result.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Include industry, monthly spend, number of leads, CPL and qualified lead percentage.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 15,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "lead_generation"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000016",
    "key": "lead_generation_q5",
    "label": {
      "en": "500 leads at ₹100 CPL, but only 20 are qualified. What would you optimise first?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 16,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Increase budget",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Reduce CPL",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Improve audience, qualification questions, messaging and conversion tracking",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Duplicate all campaigns",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "lead_generation"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000017",
    "key": "lead_generation_q6",
    "label": {
      "en": "How do you measure lead quality beyond CPL?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 17,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "lead_generation"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000018",
    "key": "d2c_growth_q1",
    "label": {
      "en": "How many D2C / e-commerce brands have you worked with directly?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 18,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "0",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "1–3",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "4–10",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "10–20",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "20+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "d2c_growth"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000019",
    "key": "d2c_growth_q2",
    "label": {
      "en": "What is the highest monthly D2C revenue you helped manage or generate?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 19,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Below ₹5L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "₹5–20L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "₹20–50L",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "₹50L–₹1Cr",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "₹1Cr+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "d2c_growth"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000020",
    "key": "d2c_growth_q3",
    "label": {
      "en": "What was the monthly ad spend at that scale, and what ROAS / MER did the brand achieve?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 20,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "d2c_growth"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000021",
    "key": "d2c_growth_q4",
    "label": {
      "en": "Which metrics would you review to assess profitability?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 21,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "ROAS",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "AOV",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Gross margin",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "COGS",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "RTO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Refund rate",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Shipping",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_8",
        "label": {
          "en": "Payment gateway charges",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_9",
        "label": {
          "en": "Repeat purchase",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_10",
        "label": {
          "en": "CAC",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_11",
        "label": {
          "en": "LTV",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_12",
        "label": {
          "en": "All of the above",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "d2c_growth"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000022",
    "key": "d2c_growth_q5",
    "label": {
      "en": "A brand generates 4x ROAS but is still losing money. Give three possible reasons.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 22,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "d2c_growth"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000023",
    "key": "d2c_growth_q6",
    "label": {
      "en": "Meta Ads is profitable but Shopify conversion falls from 3% to 1.8%. What would you investigate?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 23,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "d2c_growth"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000024",
    "key": "seo_q1",
    "label": {
      "en": "How many years of SEO experience do you have?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 24,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Fresher",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "seo"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000025",
    "key": "seo_q2",
    "label": {
      "en": "Which SEO areas have you personally handled?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 25,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Technical SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "On-page SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Off-page SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Local SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "E-commerce SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "International SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Content strategy",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "seo"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000026",
    "key": "seo_q3",
    "label": {
      "en": "Share your strongest SEO result.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Organic traffic before → after → time period. Explain your contribution.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 26,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "seo"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000027",
    "key": "seo_q4",
    "label": {
      "en": "Which tools do you actively use?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 27,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Google Search Console",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "GA4",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Ahrefs",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "SEMrush",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Screaming Frog",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Keyword Planner",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "PageSpeed Insights",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_8",
        "label": {
          "en": "Other",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "seo"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000028",
    "key": "seo_q5",
    "label": {
      "en": "A website suddenly loses 40% organic traffic. What are the first five things you check?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 28,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "seo"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000029",
    "key": "seo_q6",
    "label": {
      "en": "Which technical problem usually has the highest priority?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 29,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Missing meta description on one page",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "50,000 important pages accidentally marked noindex",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "One image without alt text",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Blog title too short",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "seo"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000030",
    "key": "manager_q1",
    "label": {
      "en": "How many years have you managed a digital marketing team?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 30,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Never",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "manager"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000031",
    "key": "manager_q2",
    "label": {
      "en": "What is the largest team you have directly managed?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 31,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "1–5",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "6–10",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "11–20",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "21–40",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "40+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "manager"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000032",
    "key": "manager_q3",
    "label": {
      "en": "How many client accounts / projects have you managed simultaneously?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 32,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "1–5",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "6–10",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "11–20",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "20+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "manager"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000033",
    "key": "manager_q4",
    "label": {
      "en": "Which teams have reported to you?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 33,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Performance Marketing",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "SEO",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Social Media",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Design",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Development",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Influencer Marketing",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Sales / Client Servicing",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "manager"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000034",
    "key": "manager_q5",
    "label": {
      "en": "A client is unhappy after two months of missed targets. Your team cites poor offers and delayed creatives. What do you do?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 34,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "manager"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000035",
    "key": "manager_q6",
    "label": {
      "en": "What KPIs would you track weekly to evaluate your team and client account health?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 35,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "manager"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000036",
    "key": "influencer_q1",
    "label": {
      "en": "How many influencer campaigns have you personally handled?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 36,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "0",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "1–10",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "11–50",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "51–100",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "100+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "influencer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000037",
    "key": "influencer_q2",
    "label": {
      "en": "Which creator categories have you worked with?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 37,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Nano",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Micro",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Macro",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Celebrity",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "UGC Creators",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "influencer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000038",
    "key": "influencer_q3",
    "label": {
      "en": "Describe your largest influencer campaign.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Number of creators + budget + industry + result.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 38,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "influencer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000039",
    "key": "influencer_q4",
    "label": {
      "en": "How do you assess whether an influencer suits a brand?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 39,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Followers only",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Engagement rate",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Audience demographics",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Previous content",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Fake follower analysis",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Brand fit",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Past conversion performance",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "influencer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000040",
    "key": "influencer_q5",
    "label": {
      "en": "500K followers / 0.7% engagement versus 80K / 5.5% with a relevant audience. Which would you investigate first and why?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 40,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "influencer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000041",
    "key": "influencer_q6",
    "label": {
      "en": "How do you track influencer campaign performance?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 41,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "influencer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000042",
    "key": "video_editor_q1",
    "label": {
      "en": "How many years of professional video-editing experience do you have?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 42,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Fresher",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000043",
    "key": "video_editor_q2",
    "label": {
      "en": "Which software can you use professionally?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 43,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Premiere Pro",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "After Effects",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "DaVinci Resolve",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Final Cut Pro",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "CapCut",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Other",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000044",
    "key": "video_editor_q3",
    "label": {
      "en": "Which formats have you edited?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 44,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Meta Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Instagram Reels",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "YouTube Shorts",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Long-form YouTube",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Product Videos",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "UGC Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Motion Graphics",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000045",
    "key": "video_editor_q4",
    "label": {
      "en": "How many quality short-form videos can you realistically complete in one working day?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 45,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "1",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "2–3",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "4–5",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "6+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000046",
    "key": "video_editor_q5",
    "label": {
      "en": "A 30-second D2C ad has poor first-three-second retention. What would you change?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 46,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000047",
    "key": "video_project_1",
    "label": {
      "en": "Link to video-editing project 1",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 47,
    "type": "url",
    "options": [],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000048",
    "key": "video_project_2",
    "label": {
      "en": "Link to video-editing project 2",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 48,
    "type": "url",
    "options": [],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000049",
    "key": "video_project_3",
    "label": {
      "en": "Link to video-editing project 3",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 49,
    "type": "url",
    "options": [],
    "config": {
      "flow": "video_editor"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000050",
    "key": "social_media_q1",
    "label": {
      "en": "How many brands have you handled simultaneously?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 50,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "0",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "1–3",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "4–7",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "8–12",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "12+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "social_media"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000051",
    "key": "social_media_q2",
    "label": {
      "en": "Which responsibilities have you personally handled?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 51,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Strategy",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Content Calendar",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Copywriting",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Reel Concepts",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Community Management",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Analytics",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Client Communication",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_8",
        "label": {
          "en": "Competitor Research",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "social_media"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000052",
    "key": "social_media_q3",
    "label": {
      "en": "Share one account you helped grow.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Starting followers → current followers → time taken → your role.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 52,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "social_media"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000053",
    "key": "social_media_q4",
    "label": {
      "en": "Which metric matters most for evaluating organic content?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 53,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Followers only",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Reach",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Engagement",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Saves / Shares",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Website actions",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Depends on the content / business objective",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "social_media"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000054",
    "key": "social_media_q5",
    "label": {
      "en": "Reels get views but almost no profile visits, followers or enquiries. What would you change?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 54,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "social_media"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000055",
    "key": "social_media_q6",
    "label": {
      "en": "Create one Reel idea for a D2C fashion brand in 2–3 sentences.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 55,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "social_media"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000056",
    "key": "shopify_q1",
    "label": {
      "en": "How many Shopify stores have you developed or customised?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 56,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "0",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "1–5",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "6–15",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "16–30",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "30+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000057",
    "key": "shopify_q2",
    "label": {
      "en": "Have you created custom Shopify sections without a page builder?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 57,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Yes",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "No",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000058",
    "key": "shopify_q3",
    "label": {
      "en": "What is wrong with changing a theme's core code without considering future updates?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 58,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000059",
    "key": "shopify_q4",
    "label": {
      "en": "A product page slows down after adding third-party apps. How would you diagnose and improve it?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 59,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000060",
    "key": "shopify_rating_liquid",
    "label": {
      "en": "Rate your experience with Liquid (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 60,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000061",
    "key": "shopify_rating_html",
    "label": {
      "en": "Rate your experience with HTML (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 61,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000062",
    "key": "shopify_rating_css",
    "label": {
      "en": "Rate your experience with CSS (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 62,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000063",
    "key": "shopify_rating_javascript",
    "label": {
      "en": "Rate your experience with JavaScript (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 63,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000064",
    "key": "shopify_rating_shopify_sections",
    "label": {
      "en": "Rate your experience with Shopify Sections (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 64,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000065",
    "key": "shopify_rating_shopify_metafields",
    "label": {
      "en": "Rate your experience with Shopify Metafields (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 65,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000066",
    "key": "shopify_rating_shopify_apis",
    "label": {
      "en": "Rate your experience with Shopify APIs (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 66,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000067",
    "key": "shopify_rating_react",
    "label": {
      "en": "Rate your experience with React (1 = beginner, 5 = advanced)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 67,
    "type": "rating",
    "options": [],
    "config": {
      "flow": "shopify",
      "min": 1,
      "max": 5
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000068",
    "key": "shopify_store_1",
    "label": {
      "en": "Live Shopify store 1: URL",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 68,
    "type": "url",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000069",
    "key": "shopify_work_1",
    "label": {
      "en": "What did you personally build on store 1?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 69,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000070",
    "key": "shopify_store_2",
    "label": {
      "en": "Live Shopify store 2: URL",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 70,
    "type": "url",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000071",
    "key": "shopify_work_2",
    "label": {
      "en": "What did you personally build on store 2?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 71,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000072",
    "key": "shopify_store_3",
    "label": {
      "en": "Live Shopify store 3: URL",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 72,
    "type": "url",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000073",
    "key": "shopify_work_3",
    "label": {
      "en": "What did you personally build on store 3?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 73,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "shopify"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000074",
    "key": "designer_q1",
    "label": {
      "en": "How many years of professional graphic-design experience do you have?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 74,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Fresher",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000075",
    "key": "designer_q2",
    "label": {
      "en": "Which software can you use professionally?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 75,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Photoshop",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Illustrator",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Figma",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Canva",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "After Effects",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Other",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000076",
    "key": "designer_q3",
    "label": {
      "en": "Which creatives have you designed?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 76,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Meta Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Google Ads",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Social Media",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Website Banners",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "E-commerce Creatives",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Branding",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_7",
        "label": {
          "en": "Packaging",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000077",
    "key": "designer_q4",
    "label": {
      "en": "How many quality static creatives can you produce in a working day?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 77,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "1–2",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "3–5",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "6–8",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "8+",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000078",
    "key": "designer_q5",
    "label": {
      "en": "A Meta ad has high CPM and low CTR. From a design perspective, what would you test?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 78,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000079",
    "key": "design_project_1",
    "label": {
      "en": "Link to advertising creative 1",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 79,
    "type": "url",
    "options": [],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000080",
    "key": "design_project_2",
    "label": {
      "en": "Link to advertising creative 2",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 80,
    "type": "url",
    "options": [],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000081",
    "key": "design_project_3",
    "label": {
      "en": "Link to advertising creative 3",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 81,
    "type": "url",
    "options": [],
    "config": {
      "flow": "designer"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000082",
    "key": "sales_q1",
    "label": {
      "en": "How many years of hands-on sales experience do you have?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 82,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Fresher",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Less than 1 year",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "1–2 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "2–4 years",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "4+ years",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "sales"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000083",
    "key": "sales_q2",
    "label": {
      "en": "What have you personally sold?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 83,
    "type": "multi_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Digital marketing services",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Websites / Shopify projects",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "SaaS / software",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "B2B services",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "Consumer products",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_6",
        "label": {
          "en": "Other",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "sales"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000084",
    "key": "sales_q3",
    "label": {
      "en": "Share your strongest sales result.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Monthly target, revenue closed, target achievement %, average deal size and time period. Separate your contribution from team results.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 84,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "sales"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000085",
    "key": "sales_q4",
    "label": {
      "en": "A prospect asks for pricing immediately. What is your best next step?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 85,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Offer the biggest discount",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Understand goals, budget, decision-maker and timeline before proposing a fit",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Send the same package to everyone",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Stop following up",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {
      "flow": "sales"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000086",
    "key": "sales_q5",
    "label": {
      "en": "A prospect says your agency is too expensive and another agency promises guaranteed results. How would you respond?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 86,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "sales"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000087",
    "key": "sales_q6",
    "label": {
      "en": "Describe your CRM and follow-up process.",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Name tools, pipeline stages, follow-up cadence, and how you track conversion rate and lost deals.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 87,
    "type": "long_text",
    "options": [],
    "config": {
      "flow": "sales"
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000088",
    "key": "employment",
    "label": {
      "en": "Current employment status",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 88,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Employed",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Freelancing",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Unemployed",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "Student",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {},
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000089",
    "key": "current_salary",
    "label": {
      "en": "Current monthly salary (₹)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Enter 0 if you do not currently receive a salary.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 89,
    "type": "number",
    "options": [],
    "config": {
      "min": 0,
      "max": 10000000
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000090",
    "key": "expected_salary",
    "label": {
      "en": "Expected monthly salary (₹)",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 90,
    "type": "number",
    "options": [],
    "config": {
      "min": 0,
      "max": 10000000
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000091",
    "key": "notice_period",
    "label": {
      "en": "When can you join?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 91,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Immediately",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "Within 7 days",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "15 days",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_4",
        "label": {
          "en": "30 days",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_5",
        "label": {
          "en": "45+ days",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {},
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000092",
    "key": "surat_office",
    "label": {
      "en": "Are you comfortable working from our Surat office?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 92,
    "type": "single_choice",
    "options": [
      {
        "id": "option_1",
        "label": {
          "en": "Yes",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_2",
        "label": {
          "en": "No",
          "hi": "",
          "gu": ""
        }
      },
      {
        "id": "option_3",
        "label": {
          "en": "Need to discuss",
          "hi": "",
          "gu": ""
        }
      }
    ],
    "config": {},
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000093",
    "key": "motivation",
    "label": {
      "en": "Why do you want to join Global Surat?",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 93,
    "type": "long_text",
    "options": [],
    "config": {
      "maxLength": 300
    },
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000094",
    "key": "portfolio",
    "label": {
      "en": "Your portfolio URL",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "Required for Graphic Designer and Video Editor applicants. Optional for other positions.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": false,
    "position": 94,
    "type": "url",
    "options": [],
    "config": {},
    "isActive": true
  },
  {
    "id": "44444444-4444-4444-8444-000000000095",
    "key": "resume",
    "label": {
      "en": "Upload your résumé",
      "hi": "",
      "gu": ""
    },
    "helpText": {
      "en": "PDF, DOC or DOCX. Maximum 5 MB. Only our hiring team can access your file.",
      "hi": "",
      "gu": ""
    },
    "placeholder": {
      "en": "",
      "hi": "",
      "gu": ""
    },
    "required": true,
    "position": 95,
    "type": "file",
    "options": [],
    "config": {},
    "isActive": true
  }
];
export const fallbackQuestionnaire: PublicQuestionnaire = { formId:"11111111-1111-4111-8111-111111111111",versionId:"22222222-2222-4222-8222-222222222222",slug:"careers",name:"Global Surat Careers",version:1,questions:defaultQuestions,isFallback:true };
