export const content = {
  business: {
    name: 'Carolyn Clark',
    tagline: 'Myofascial Release & Therapeutic Massage',
    phone: '+1 (484) 941-2718',
    email: 'carolyn@example.com',
    location: 'Kimberton / Phoenixville, PA',
  },

  hero: {
    headline: 'Healing that goes deeper',
    subheadingBeforeAccent: 'John F. Barnes Myofascial Release & ',
    subheadingAccent: 'Therapeutic Massage',
    body:
      'Carolyn Clark is a Licensed Massage Therapist specializing in the John F. Barnes Myofascial Release Approach. Her work is rooted in a whole-person approach that recognizes the connection between the physical and emotional aspects of the body. Through individualized, hands-on care, she helps clients address pain, tension, and restriction rather than simply managing symptoms.',
    ctaPrimary: 'Book a Session',
    credentialChip: 'Licensed Massage Therapist • By appointment',
  },

  about: {
    /** Home page “about” band */
    homeTitle: 'A whole-person approach',
    homeTitleEmphasis: 'to care',
    homeIntro:
      'Carolyn works with clients experiencing chronic pain, headaches, TMJ dysfunction, postural tension, and those recovering from injury, surgery, or trauma.',
    homePhilosophy:
      'Her approach is rooted in the understanding that the body responds to and carries our lived experiences, and that lasting change comes from addressing the underlying restrictions contributing to pain and dysfunction rather than simply managing symptoms temporarily.',
    homeSessions:
      'Sessions are individualized and guided by presence, patience, and careful listening to the body to support greater ease, mobility, and connection within the body.',
    /** About page — photo / intro band (aligned with practice, not generic “wellness” framing) */
    practiceSectionTitle: 'Focused, patient-centered sessions',
    practiceSectionLead:
      'Treatment plans are built from your history, goals, and how your body responds in the moment. There is time to discuss what you are experiencing and what you hope to change.',
    practiceSectionClose:
      'Hands-on work is paced for your nervous system. When appropriate, you may receive suggestions for movement or self-care to support progress between visits.',
    intro:
      'Licensed Massage Therapist specializing in John F. Barnes Myofascial Release. Based in Kimberton / Phoenixville, PA.',
    credentials:
      'Licensed Massage Therapist specializing in John F. Barnes Myofascial Release.',
  },

  services: {
    featured: {
      title: 'John F. Barnes Myofascial Release',
      /** Service-page hero deck — first sentences of Carolyn’s approved MFR copy */
      heroLead:
        "Fascia is a continuous web of connective tissue that surrounds and supports every muscle, bone, nerve, blood vessel, and organ in the body. It acts as the body's protective support system and responds during times of injury, surgery, inflammation, stress, or emotional trauma.",
      /** Short teaser for home cards — drawn from Carolyn’s approved MFR copy */
      cardSummary:
        'Fascia is a continuous web of connective tissue that surrounds and supports every muscle, bone, nerve, blood vessel, and organ in the body. The John F. Barnes Myofascial Release Approach uses gentle, sustained pressure to engage the fascial system and allow restricted tissue to soften and release naturally, without force.',
      pricing: [
        { duration: '60 minutes', price: '$140' },
        { duration: '90 minutes', price: '$210' },
      ],
    },
    secondary: {
      title: 'Therapeutic Massage',
      heroLead:
        'Sessions combine focused hands-on techniques for pain relief, mobility, and relaxation — individualized to what you need when you come in.',
      whoBenefitsBody:
        'Therapeutic massage can support muscle tension, everyday stress, and physical discomfort from activity or desk work. Many people use it to recover after demanding weeks or to stay comfortable when tension tends to build.',
      parallaxBlurb:
        'Hands-on work tailored to how you feel the day you arrive — for relief, mobility, and rest.',
      cardSummary:
        "Therapeutic massage sessions are individualized to each client's needs and may include a combination of deep tissue work, myofascial release, Swedish massage, assisted stretching, trigger point therapy and energy work to relieve pain and tension, increase mobility and promote overall relaxation and well-being.",
      pricing: [
        { duration: '60 minutes', price: '$120' },
        { duration: '90 minutes', price: '$180' },
      ],
    },
  },

  home: {
    whyMfrCards: [
      {
        title: 'Restriction-focused care',
        description: 'Work targets underlying fascial restrictions, not only surface symptoms.',
        accent: 'terracotta' as const,
      },
      {
        title: 'Gentle, sustained pressure',
        description: 'Pressure is applied without forcing tissue; the body sets the pace.',
        accent: 'moss' as const,
      },
      {
        title: 'Progress between sessions',
        description: 'Education and home care can support what you build in the treatment room.',
        accent: 'gold' as const,
      },
    ],
    experienceParallax: {
      title: 'The treatment',
      titleEmphasis: 'space',
      description:
        'A quiet, comfortable setting for hands-on work. Sessions are unhurried so there is room to listen to how your body responds.',
    },
    testimonialsIntro:
      'Read what clients say about Myofascial Release and therapeutic massage.',
  },

  clientTypes: [
    'People with chronic pain seeking lasting relief',
    'Post-surgery and post-injury recovery',
    'Trauma recovery and nervous system regulation',
    'Stressed professionals seeking deep relaxation',
    'Athletes and active individuals',
    'Anyone building a regular self-care practice',
  ],

  booking: {
    heading: 'Ready to schedule?',
    subheading: 'Contact me to schedule an appointment.',
    phone: '+1 (484) 941-2718',
    email: 'carolyn@example.com',
    hours: 'By appointment',
    note: 'Schedule is in transition. Call or text for current availability.',
  },
};
