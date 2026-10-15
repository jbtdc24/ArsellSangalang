/* ---------------------------------------------------------------
   Everything on the site comes from this file. Edit text here,
   commit, and Vercel redeploys automatically.
---------------------------------------------------------------- */
window.SITE = {
  name: 'Arsell Sangalang',
  first: 'Arsell',
  location: 'Princeton, New Jersey',

  // Shown under the name in the hero.
  // Roles that rotate under her name.
  roles: ['Sales Development Representative', 'Client Services Representative'],

  intro:
    'I start conversations and keep them going. Five-plus years of looking after clients, and a track of outbound work that turns cold accounts into booked meetings.',

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
      text: 'The steady point of contact for PSG’s clients. I handle day-to-day communication, keep every account accurate in HubSpot, and follow through so campaigns turn into real conversations.'
    },
    {
      role: 'Sales Development Representative',
      company: 'Modality.AI',
      type: 'Part-time',
      start: '2026-01',
      end: null,
      text: 'Outbound prospecting for Modality.AI: researching accounts, running outreach sequences and booking first meetings for the sales team.'
    },
    {
      role: 'Sales Development Representative',
      company: 'CDD Vault',
      type: 'Part-time',
      start: '2023-11',
      end: '2024-12',
      text: 'Outbound for Collaborative Drug Discovery’s CDD Vault software: building target lists, writing personalised outreach and setting qualified meetings.'
    }
  ],

  // What she does. Keep each one short.
  strengths: [
    {
      title: 'Client service',
      text: 'Fast answers, clear updates and nothing lost between meetings, proposals and follow-ups. Clients know someone is on it.'
    },
    {
      title: 'Sales development',
      text: 'Researching accounts, writing outreach that is specific to each prospect, and booking first meetings worth having.'
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

  // Example conversations played in the hero card (illustrative, not real clients).
  scenes: [
    {
      tag: 'Outbound',
      who: 'Maya Torres', title: 'VP of Operations', initials: 'MT',
      first: 'out',
      out: 'Hi Maya, congrats on opening the second location. Teams growing that fast usually feel it in scheduling first. Worth 15 minutes to compare notes?',
      in: 'Good timing, honestly. Does Thursday morning work?',
      result: 'Discovery call booked', detail: 'Thursday, 10:00 AM'
    },
    {
      tag: 'Follow-up',
      who: 'Daniel Reyes', title: 'Head of Sales', initials: 'DR',
      first: 'out',
      out: 'Daniel, here’s the case study I mentioned. Page 2 answers your onboarding question.',
      in: 'This helps. Can you bring our ops lead into the next call?',
      result: 'Next meeting set', detail: 'Tuesday, 2:30 PM with 3 attendees'
    },
    {
      tag: 'Client service',
      who: 'Priya Shah', title: 'Client since 2022', initials: 'PS',
      first: 'in',
      in: 'Hi Arsell, our latest invoice still shows the old plan. Can you check?',
      out: 'Checked and fixed. The corrected invoice is in your inbox, and I’ve updated your account so it won’t happen again.',
      result: 'Resolved same day', detail: 'Client notified'
    }
  ],

  // Pipeline stages shown under the hero card.
  stages: ['Researched', 'Contacted', 'Replied', 'Booked'],

  // "How I work" steps, shown in order on the scrolling track.
  process: [
    { title: 'Research the account', text: 'Who they are, what they need right now, and who makes the call. Before anyone gets a message.' },
    { title: 'Reach out with a reason', text: 'Outreach written for that person, with one clear reason to talk now.' },
    { title: 'Listen first', text: 'The first call is for questions: goals, budget, timing, who else is involved. Not a pitch.' },
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
