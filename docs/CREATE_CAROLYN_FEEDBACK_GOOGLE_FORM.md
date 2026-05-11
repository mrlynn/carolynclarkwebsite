# Create the Carolyn website feedback Google Form

This mirrors [FEEDBACK_REVIEW_GUIDE.md](../../FEEDBACK_REVIEW_GUIDE.md) (parent folder) as a single Google Form with sections and long-answer fields.

## Option A — One-click with Google Apps Script (recommended)

1. Open [script.google.com](https://script.google.com) → **New project**.
2. Delete the default `myFunction` code and paste the entire script from the **Script** section below.
3. Select function **`createCarolynWebsiteFeedbackForm`** in the toolbar dropdown → **Run**.
4. Authorize the script when prompted (it only creates a form in your Drive).
5. When the run finishes, check **Execution log** for the form URL, or open [Google Forms](https://docs.google.com/forms) / **Google Drive** for the new form titled **Carolyn Clark Website — Feedback Review**.

To collect email addresses: in the Form editor, go to **Settings** (gear) → **Responses** → turn on **Collect email addresses**.

---

## Option B — Build by hand

Use the same section titles and paragraph prompts as in the script’s `sections` array (or copy from the original guide).

---

## Script (paste into Apps Script)

```javascript
/**
 * Creates a Google Form from the Carolyn Clark website feedback guide.
 * Run: createCarolynWebsiteFeedbackForm
 */
function createCarolynWebsiteFeedbackForm() {
  const form = FormApp.create('Carolyn Clark Website — Feedback Review');
  form.setDescription(
    'Hi Carolyn! Please review each section and share your feedback. ' +
    'There are no wrong answers—this is about making sure the site represents your business exactly how you want it.'
  );

  const sections = [
    {
      title: 'Overall design & branding',
      items: [
        {
          title: 'Color scheme',
          helpText:
            'How do you feel about the orange/peach and teal/green colors? ' +
            'Do they feel aligned with your brand and the healing nature of your work?',
        },
        {
          title: 'Fonts & typography',
          helpText:
            'Do the fonts feel professional and easy to read? ' +
            'Does the overall text feel welcoming or clinical?',
        },
        {
          title: 'Overall vibe',
          helpText:
            "What's your gut reaction to the overall look and feel? " +
            'Does it feel calming, professional, approachable?',
        },
      ],
    },
    {
      title: 'Home page',
      items: [
        {
          title: 'Hero section (main title “Healing that goes deeper”)',
          helpText:
            'Does this headline capture what you want to communicate? ' +
            'Is the messaging clear about what you offer?',
        },
        {
          title: 'Hero image & background',
          helpText:
            'Do the images/visuals feel appropriate for your business?',
        },
        {
          title: 'Call-to-action buttons',
          helpText:
            'Are the “Call to schedule” / “Call now” style actions noticeable and clear? ' +
            'Would you want any changes to button text or placement?',
        },
        {
          title: 'Navigation menu',
          helpText:
            'Are all the page names clear and helpful? Is the navigation easy to use?',
        },
      ],
    },
    {
      title: 'About page',
      items: [
        {
          title: 'About page feedback',
          helpText:
            'Does the page tell your story effectively? ' +
            'Is the content about your background/credentials clear? ' +
            'What would you add, remove, or change?',
        },
      ],
    },
    {
      title: 'Myofascial release page',
      items: [
        {
          title: 'Myofascial release page feedback',
          helpText:
            'Is the description of this service clear and compelling? ' +
            'Does it explain what it is and who it’s for? Any wording or messaging changes?',
        },
      ],
    },
    {
      title: 'Therapeutic massage page',
      items: [
        {
          title: 'Therapeutic massage page feedback',
          helpText:
            'Is this service description clear and helpful? ' +
            'Does it differentiate from the Myofascial Release service? ' +
            'Any changes to wording or emphasis?',
        },
      ],
    },
    {
      title: 'What to expect page',
      items: [
        {
          title: 'What to expect page feedback',
          helpText:
            'Does this page prepare clients for their first visit? ' +
            'Is it reassuring and helpful? Anything you’d like to add or clarify?',
        },
      ],
    },
    {
      title: 'FAQ page',
      items: [
        {
          title: 'FAQ page feedback',
          helpText:
            'Are the questions and answers helpful? ' +
            'Any questions missing that you get asked often?',
        },
      ],
    },
    {
      title: 'Contact page',
      items: [
        {
          title: 'Contact page feedback',
          helpText:
            'Is it easy to find and use? Does the contact form work well?',
        },
      ],
    },
    {
      title: 'Mobile & functionality',
      items: [
        {
          title: 'Mobile & functionality feedback',
          helpText:
            'Does the site look good and work well on your phone? ' +
            'Are buttons easy to click? Is anything hard to find or use?',
        },
      ],
    },
    {
      title: 'Final thoughts',
      items: [
        {
          title: 'What do you love about the site?',
          helpText: '',
        },
        {
          title: 'What would you change or improve?',
          helpText: '',
        },
        {
          title: 'Anything else you’d like to add or remove?',
          helpText: '',
        },
      ],
    },
  ];

  sections.forEach(function (section) {
    form.addSectionHeaderItem().setTitle(section.title);
    section.items.forEach(function (item) {
      const q = form.addParagraphTextItem().setTitle(item.title);
      if (item.helpText) {
        q.setHelpText(item.helpText);
      }
    });
  });

  form.setConfirmationMessage("Thanks — your feedback helps get the site exactly right.");

  const url = form.getPublishedUrl();
  const editUrl = form.getEditUrl();
  Logger.log('Published (share with Carolyn): ' + url);
  Logger.log('Edit form: ' + editUrl);
}
```

---

## After the form exists

- **Share** the form link with Carolyn (respondent view).
- Optional: add a **short answer** at the top for “Your name” if you are not collecting emails.
- Optional: link responses to a **Google Sheet** (Responses tab → spreadsheet icon).
