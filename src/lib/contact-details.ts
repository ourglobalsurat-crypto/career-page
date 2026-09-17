export const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '7433800704';
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hr@globalsurat.com';
export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917433800704').replace(/\D/g, '');
const phoneDigits = contactPhone.replace(/\D/g, '');
export const contactPhoneHref = `tel:+${phoneDigits.length === 10 ? '91' : ''}${phoneDigits}`;
export const contactEmailHref = `mailto:${contactEmail}`;
