import json
from pathlib import Path

questions = []
def loc(s): return dict(en=s, hi='', gu='')
def q(key, label, options=None, type=None, flow=None, help='', **config):
    questions.append(dict(id=f'44444444-4444-4444-8444-{len(questions)+1:012}', key=key, label=loc(label), helpText=loc(help), placeholder=loc(''), required=True, position=len(questions)+1, type=type or ('single_choice' if options else 'long_text'), options=[dict(id=f'option_{i+1}', label=loc(s)) for i,s in enumerate(options or [])], config={**({'flow':flow} if flow else {}), **config}, isActive=True))

q('full_name','What is your full name?',type='short_text',systemRole='contact_name',maxLength=120)
q('phone','Your mobile / WhatsApp number',type='phone',systemRole='contact_phone')
q('email','Your email address',type='email')
q('city','Which city do you currently live in?',type='short_text',maxLength=120)
roles = [('performance_marketer','Performance Marketer'),('lead_generation','Lead Generation Expert'),('d2c_growth','D2C Growth Expert'),('seo','SEO Expert / SEO Specialist'),('manager','Manager / Senior Manager'),('influencer','Influencer Marketing Executive'),('video_editor','Video Editor'),('social_media','Social Media Manager'),('shopify','Shopify Developer'),('designer','Graphic Designer'),('sales','Sales Executive')]
q('growth_path','Which position are you applying for?', ['placeholder'],systemRole='flow_selector')
questions[-1]['options']=[dict(id=k,label=loc(v)) for k,v in roles]
exp=['Fresher','Less than 1 year','1–2 years','2–4 years','4+ years']
budget=['Below ₹1 lakh','₹1–5 lakh','₹5–15 lakh','₹15–50 lakh','₹50 lakh+']
def role(key, rows):
    for i,row in enumerate(rows):
        if isinstance(row,str): row = [row]
        label, options, kind, help = (list(row)+[None,None,''])[:4]
        q(f'{key}_q{i+1}',label,options,type=kind,flow=key,help=help or '')
role('performance_marketer',[
 ('How many years of hands-on paid advertising experience do you have?',exp),
 ('Approximately how much total ad spend have you personally managed?',['Below ₹5 lakh','₹5–25 lakh','₹25 lakh–₹1 crore','₹1–5 crore','₹5 crore+']),
 ('What is the highest monthly ad spend you managed for a single brand?',budget),
 ('What was your best sustainable monthly ROAS, and in which industry?',None,None,'Include the industry, ROAS, monthly spend and how long you sustained it.'),
 ("CPA increases by 40% while CPM stays almost unchanged. What would you investigate first?",['Increase budget immediately','CTR, CVR, creative performance and funnel drop-offs','Increase campaign frequency','Change billing method']),
 ('What Meta Ads frequency would concern you in prospecting, and why?')])
role('lead_generation',[
 ('How many years of lead-generation advertising experience do you have?',exp),
 ('Which platforms have you personally managed?',['Meta Ads','Google Search Ads','Google Display','YouTube','LinkedIn Ads','Other'],'multi_choice'),
 ('What is your highest monthly lead-generation budget?',['Below ₹1L','₹1–5L','₹5–15L','₹15–30L','₹30L+']),
 ('Share your strongest lead-generation result.',None,None,'Include industry, monthly spend, number of leads, CPL and qualified lead percentage.'),
 ('500 leads at ₹100 CPL, but only 20 are qualified. What would you optimise first?',['Increase budget','Reduce CPL','Improve audience, qualification questions, messaging and conversion tracking','Duplicate all campaigns']),
 ('How do you measure lead quality beyond CPL?')])
role('d2c_growth',[
 ('How many D2C / e-commerce brands have you worked with directly?',['0','1–3','4–10','10–20','20+']),
 ('What is the highest monthly D2C revenue you helped manage or generate?',['Below ₹5L','₹5–20L','₹20–50L','₹50L–₹1Cr','₹1Cr+']),
 ('What was the monthly ad spend at that scale, and what ROAS / MER did the brand achieve?'),
 ('Which metrics would you review to assess profitability?',['ROAS','AOV','Gross margin','COGS','RTO','Refund rate','Shipping','Payment gateway charges','Repeat purchase','CAC','LTV','All of the above'],'multi_choice'),
 ('A brand generates 4x ROAS but is still losing money. Give three possible reasons.'),
 ('Meta Ads is profitable but Shopify conversion falls from 3% to 1.8%. What would you investigate?')])
role('seo',[
 ('How many years of SEO experience do you have?',exp),
 ('Which SEO areas have you personally handled?',['Technical SEO','On-page SEO','Off-page SEO','Local SEO','E-commerce SEO','International SEO','Content strategy'],'multi_choice'),
 ('Share your strongest SEO result.',None,None,'Organic traffic before → after → time period. Explain your contribution.'),
 ('Which tools do you actively use?',['Google Search Console','GA4','Ahrefs','SEMrush','Screaming Frog','Keyword Planner','PageSpeed Insights','Other'],'multi_choice'),
 ('A website suddenly loses 40% organic traffic. What are the first five things you check?'),
 ('Which technical problem usually has the highest priority?',['Missing meta description on one page','50,000 important pages accidentally marked noindex','One image without alt text','Blog title too short'])])
role('manager',[
 ('How many years have you managed a digital marketing team?',['Never','Less than 1 year','1–2 years','2–4 years','4+ years']),
 ('What is the largest team you have directly managed?',['1–5','6–10','11–20','21–40','40+']),
 ('How many client accounts / projects have you managed simultaneously?',['1–5','6–10','11–20','20+']),
 ('Which teams have reported to you?',['Performance Marketing','SEO','Social Media','Design','Development','Influencer Marketing','Sales / Client Servicing'],'multi_choice'),
 ('A client is unhappy after two months of missed targets. Your team cites poor offers and delayed creatives. What do you do?'),
 ('What KPIs would you track weekly to evaluate your team and client account health?')])
role('influencer',[
 ('How many influencer campaigns have you personally handled?',['0','1–10','11–50','51–100','100+']),
 ('Which creator categories have you worked with?',['Nano','Micro','Macro','Celebrity','UGC Creators'],'multi_choice'),
 ('Describe your largest influencer campaign.',None,None,'Number of creators + budget + industry + result.'),
 ('How do you assess whether an influencer suits a brand?',['Followers only','Engagement rate','Audience demographics','Previous content','Fake follower analysis','Brand fit','Past conversion performance'],'multi_choice'),
 ('500K followers / 0.7% engagement versus 80K / 5.5% with a relevant audience. Which would you investigate first and why?'),
 ('How do you track influencer campaign performance?')])
role('video_editor',[
 ('How many years of professional video-editing experience do you have?',exp),
 ('Which software can you use professionally?',['Premiere Pro','After Effects','DaVinci Resolve','Final Cut Pro','CapCut','Other'],'multi_choice'),
 ('Which formats have you edited?',['Meta Ads','Instagram Reels','YouTube Shorts','Long-form YouTube','Product Videos','UGC Ads','Motion Graphics'],'multi_choice'),
 ('How many quality short-form videos can you realistically complete in one working day?',['1','2–3','4–5','6+']),
 ('A 30-second D2C ad has poor first-three-second retention. What would you change?')])
for i in range(1,4): q(f'video_project_{i}',f'Link to video-editing project {i}',type='url',flow='video_editor')
role('social_media',[
 ('How many brands have you handled simultaneously?',['0','1–3','4–7','8–12','12+']),
 ('Which responsibilities have you personally handled?',['Strategy','Content Calendar','Copywriting','Reel Concepts','Community Management','Analytics','Client Communication','Competitor Research'],'multi_choice'),
 ('Share one account you helped grow.',None,None,'Starting followers → current followers → time taken → your role.'),
 ('Which metric matters most for evaluating organic content?',['Followers only','Reach','Engagement','Saves / Shares','Website actions','Depends on the content / business objective']),
 ('Reels get views but almost no profile visits, followers or enquiries. What would you change?'),
 ('Create one Reel idea for a D2C fashion brand in 2–3 sentences.')])
role('shopify',[
 ('How many Shopify stores have you developed or customised?',['0','1–5','6–15','16–30','30+']),
 ('Have you created custom Shopify sections without a page builder?',['Yes','No']),
 ("What is wrong with changing a theme's core code without considering future updates?"),
 ('A product page slows down after adding third-party apps. How would you diagnose and improve it?')])
for tech in ['Liquid','HTML','CSS','JavaScript','Shopify Sections','Shopify Metafields','Shopify APIs','React']:
    q('shopify_rating_'+tech.lower().replace(' ','_'),f'Rate your experience with {tech} (1 = beginner, 5 = advanced)',type='rating',flow='shopify',min=1,max=5)
for i in range(1,4):
    q(f'shopify_store_{i}',f'Live Shopify store {i}: URL',type='url',flow='shopify')
    q(f'shopify_work_{i}',f'What did you personally build on store {i}?',flow='shopify')
role('designer',[
 ('How many years of professional graphic-design experience do you have?',exp),
 ('Which software can you use professionally?',['Photoshop','Illustrator','Figma','Canva','After Effects','Other'],'multi_choice'),
 ('Which creatives have you designed?',['Meta Ads','Google Ads','Social Media','Website Banners','E-commerce Creatives','Branding','Packaging'],'multi_choice'),
 ('How many quality static creatives can you produce in a working day?',['1–2','3–5','6–8','8+']),
 ('A Meta ad has high CPM and low CTR. From a design perspective, what would you test?')])
for i in range(1,4): q(f'design_project_{i}',f'Link to advertising creative {i}',type='url',flow='designer')
role('sales',[
 ('How many years of hands-on sales experience do you have?',exp),
 ('What have you personally sold?',['Digital marketing services','Websites / Shopify projects','SaaS / software','B2B services','Consumer products','Other'],'multi_choice'),
 ('Share your strongest sales result.',None,None,'Monthly target, revenue closed, target achievement %, average deal size and time period. Separate your contribution from team results.'),
 ('A prospect asks for pricing immediately. What is your best next step?',['Offer the biggest discount','Understand goals, budget, decision-maker and timeline before proposing a fit','Send the same package to everyone','Stop following up']),
 ('A prospect says your agency is too expensive and another agency promises guaranteed results. How would you respond?'),
 ('Describe your CRM and follow-up process.',None,None,'Name tools, pipeline stages, follow-up cadence, and how you track conversion rate and lost deals.')])
q('employment','Current employment status',['Employed','Freelancing','Unemployed','Student'])
q('current_salary','Current monthly salary (₹)',type='number',min=0,max=10000000,help='Enter 0 if you do not currently receive a salary.')
q('expected_salary','Expected monthly salary (₹)',type='number',min=0,max=10000000)
q('notice_period','When can you join?',['Immediately','Within 7 days','15 days','30 days','45+ days'])
q('surat_office','Are you comfortable working from our Surat office?',['Yes','No','Need to discuss'])
q('motivation','Why do you want to join Global Surat?',maxLength=300)
q('portfolio','Your portfolio URL',type='url',help='Required for Graphic Designer and Video Editor applicants. Optional for other positions.')
questions[-1]['required']=False
q('resume','Upload your résumé',type='file',help='PDF, DOC or DOCX. Maximum 5 MB. Only our hiring team can access your file.')
Path('src/lib/default-questionnaire.ts').write_text('import type { PublicQuestion, PublicQuestionnaire } from "./types";\nexport const defaultQuestions: PublicQuestion[] = '+json.dumps(questions,ensure_ascii=False,indent=2)+';\nexport const fallbackQuestionnaire: PublicQuestionnaire = { formId:"11111111-1111-4111-8111-111111111111",versionId:"22222222-2222-4222-8222-222222222222",slug:"careers",name:"Global Surat Careers",version:1,questions:defaultQuestions,isFallback:true };\n',encoding='utf-8')
