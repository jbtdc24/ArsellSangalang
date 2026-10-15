/* ---------------------------------------------------------------
   Everything on the site comes from this file. Edit text here,
   commit, and Vercel redeploys automatically.
---------------------------------------------------------------- */
window.SITE = {
  name: 'Arsell Sangalang',
  first: 'Arsell',
  location: 'Princeton, New Jersey',

  // Shown under the name in the hero.
  intro:
    'I work where life science meets sales. For more than five years I have looked after clients at PSG Life Sciences, and I open doors for research and health-tech companies as a sales development rep.',

  // Optional: put a photo at assets/img/arsell.jpg and set photo: 'assets/img/arsell.jpg'
  photo: '',

  // Optional: add an email address to show an email button in the contact section.
  email: '',
  linkedin: 'https://www.linkedin.com/in/arsell-sangalang/',

  // Experience. Dates are YYYY-MM; end: null means "present".
  experience: [
    {
      role: 'Client Services Representative',
      company: 'PSG Life Sciences',
      type: 'Full-time',
      start: '2021-02',
      end: null,
      place: 'Princeton, New Jersey',
      text: 'PSG is a fractional commercial team for biotech, CRO and research-tools companies. I keep client work moving: day-to-day communication, HubSpot records that stay accurate, and the follow-through that turns campaigns into conversations.'
    },
    {
      role: 'Sales Development Representative',
      company: 'Modality.AI',
      type: 'Part-time',
      start: '2026-01',
      end: null,
      text: 'Prospecting and first conversations for Modality.AI, a health-tech company building AI-driven assessments.'
    },
    {
      role: 'Sales Development Representative',
      company: 'CDD Vault',
      type: 'Part-time',
      start: '2023-11',
      end: '2024-12',
      text: 'Outbound for Collaborative Drug Discovery, whose CDD Vault platform helps drug-discovery teams manage their research data.'
    }
  ],

  // What she does. Keep each one short.
  strengths: [
    {
      title: 'Client service',
      text: 'Clients get answers quickly and nothing falls through the cracks between meetings, proposals and follow-ups.'
    },
    {
      title: 'Sales development',
      text: 'Researching accounts, writing outreach that is specific to a lab’s workflow, and booking first meetings worth having.'
    },
    {
      title: 'HubSpot CRM',
      text: 'Seven HubSpot Academy certifications, from Sales Hub and Marketing Hub implementation to SEO. Pipelines with stages that mean something.'
    },
    {
      title: 'Market research and planning',
      text: 'Finding the segments that can actually buy, and the people inside them who make the decision.'
    }
  ],

  // "How I work" steps, shown in order on the scrolling track.
  process: [
    { title: 'Research the account', text: 'Who they are, what they run in the lab, and who decides. Before anyone gets a message.' },
    { title: 'Reach out with a reason', text: 'Outreach written for their workflow, with one clear reason to talk now.' },
    { title: 'Listen first', text: 'The first meeting is for questions: workflows, budget, samples, timing. Not a pitch.' },
    { title: 'Keep the pipeline honest', text: 'HubSpot stages that reflect what is actually true about each deal.' },
    { title: 'Look after the client', text: 'Once they sign, quick answers and steady follow-through keep them coming back.' }
  ],

  certifications: [
    { name: 'Frictionless Sales', issuer: 'HubSpot Academy', date: '2026-06' },
    { name: 'Inbound', issuer: 'HubSpot Academy', date: '2026-06' },
    { name: 'SEO', issuer: 'HubSpot Academy', date: '2026-01' },
    { name: 'Marketing Hub Implementation', issuer: 'HubSpot Academy', date: '2021-11' },
    { name: 'Sales Hub Implementation', issuer: 'HubSpot Academy', date: '2021-11' },
    { name: 'Inbound Sales', issuer: 'HubSpot Academy', date: '2021-06' },
    { name: 'HubSpot Sales Software', issuer: 'HubSpot Academy', date: '2021-06' }
  ]
};
