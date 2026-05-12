# Carolyn Clark Site — Feedback Response Plan

**Repo:** `/Users/michael.lynn/code/carolyn/website`
**Source:** Carolyn's feedback form, submitted 5/11/2026 22:00
**Plan written:** 2026-05-12
**Site at time of review:** Home, About, Myofascial Release, Therapeutic Massage, What to Expect, FAQ, Contact

---

## TL;DR

Carolyn's feedback is overwhelmingly positive on the structure — colors, fonts, layout, nav, and mobile all got a clear "yes." The work splits into three buckets:

1. **Paste-in copy revisions** — she wrote out replacement text for the About page, the MFR page, and the Therapeutic Massage page. Verbatim. Highest priority, lowest risk.
2. **Aesthetic cleanup** — remove emojis, remove stock photos, dial down "wellness coach" language across the whole site. Requires a decision about what fills the visual space the stock photos leave behind.
3. **Small UI tweaks** — one button label, one CTA microcopy change.

Do bucket 1 and bucket 3 in one PR. Do bucket 2 as a follow-up after we make one decision with you (and probably Carolyn): what replaces the stock photos in the interim.

---

## What she explicitly approved — do not touch

These were called out as working. They're constraints, not problems:

- **Color scheme** — "Yes I like the colors"
- **Fonts & typography** — "Yes"
- **Navigation menu** — "Yes"
- **Mobile & functionality** — "Yes"
- **Overall layout & clean feel** — "I really like the overall layout, typography, and clean feel of the site. It already feels polished and calming overall."
- **What she loves:** "The functionality, polished and clean look and layout."

Translation: don't restructure anything. Don't touch `lib/theme.ts`. Don't reorganize the nav. The work below is almost entirely **copy and imagery**.

---

## Bucket 1: Direct copy replacements (do first)

For each of these, Carolyn provided the exact replacement text. Use her words. If you catch yourself rewriting more than a single phrase, stop — she's a specialist describing her own work and her wording is intentional.

The site was scaffolded to keep page copy in `content/` modules separate from the page components (`content/services.ts`, `content/about.ts`, `content/mfr-content.ts`, etc., per the original plan). Edits should land there, not inside JSX. If the actual structure on disk differs, the first task is to confirm where the copy lives and update there.

### 1.1 Hero — confirm no change

She quoted the hero copy back approvingly:

> **Healing That Goes Deeper**
> John F. Barnes Myofascial Release & Therapeutic Massage
> Carolyn Clark is a Licensed Massage Therapist specializing in the John F. Barnes Myofascial Release Approach. Her work is rooted in a whole-person approach that recognizes the connection between the physical and emotional aspects of the body. Through individualized, hands-on care, she helps clients address pain, tension, and restriction rather than simply managing symptoms.

**Action:** Verify the home page hero matches this string. If it does, leave it. If it doesn't, replace it with this.

### 1.2 About page — replace philosophy block

She gave a complete rewrite. Section heading is now **"A Whole-Person Approach to Care."** Body:

> Carolyn works with clients experiencing chronic pain, headaches, TMJ dysfunction, postural tension, and those recovering from injury, surgery, or trauma.
>
> Her approach is rooted in the understanding that the body responds to and carries our lived experiences, and that lasting change comes from addressing the underlying restrictions contributing to pain and dysfunction rather than simply managing symptoms temporarily.
>
> Sessions are individualized and guided by presence, patience, and careful listening to the body to support greater ease, mobility, and connection within the body.

**Action:** Replace the philosophy/intro block on About with this. If the page has additional sections (credentials block, training history, photo, etc.) **keep them** — she revised the philosophy section, not the whole page. Flag to confirm with her if anything outside this block reads as "wellness coach" language and should also be revisited.

### 1.3 Myofascial Release page — replace body (the biggest single edit)

She put the most effort into this. Use her words verbatim. She explicitly acknowledged the MFR work is "a little more nuanced" and needs to be wordier — do not try to tighten this.

Page heading: **"John F. Barnes Myofascial Release"**

Body:

> Fascia is a continuous web of connective tissue that surrounds and supports every muscle, bone, nerve, blood vessel, and organ in the body. It acts as the body's protective support system and responds during times of injury, surgery, inflammation, stress, or emotional trauma.
>
> When the fascial system becomes restricted as a result of these experiences, it creates tension and compression throughout the body that can contribute to chronic pain, postural imbalance, limited mobility, and a wide range of other symptoms.
>
> The John F. Barnes Myofascial Release Approach uses gentle, sustained pressure to engage the fascial system and allow restricted tissue to soften and release naturally, without force.
>
> By working with the body instead of against it, this approach supports lasting change through the mind-body connection while addressing the underlying restrictions contributing to pain and dysfunction rather than simply managing symptoms temporarily.
>
> Treatment may also include self-treatment instruction and home care recommendations to support continued progress between sessions.

Then a new section, **"Commonly Addressed Conditions"**, as a list:

- Neck and back pain
- TMJ
- Frozen shoulder
- Carpal tunnel syndrome
- Thoracic outlet syndrome
- Fibromyalgia
- Whiplash
- Anxiety / depression
- Emotional trauma
- Scoliosis
- C-section scarring
- Pelvic and menstrual pain
- Sports injuries
- Post-mastectomy scarring
- Plantar fasciitis
- Sciatica

**Action:**
- Replace the MFR page body with the five paragraphs above.
- Add the "Commonly Addressed Conditions" section below the body.
- Render as a clean two- or three-column responsive grid on desktop, single column on mobile. Plain typography. **No icons, no checkmarks, no emojis** — each item is just a phrase.

### 1.4 Therapeutic Massage page — replace body

She wants the modalities included explicitly. Verbatim replacement for the body:

> Therapeutic massage sessions are individualized to each client's needs and may include a combination of deep tissue work, myofascial release, Swedish massage, assisted stretching, trigger point therapy and energy work to relieve pain and tension, increase mobility and promote overall relaxation and well-being.

**Action:** Replace the body copy on the Therapeutic Massage page with this sentence. Keep everything else on the page (pricing, CTA, etc.).

### 1.5 What to Expect, FAQ — no feedback given

She left these fields blank on the feedback form. **Don't assume that means approval** — it likely means she didn't have specific text to add yet. Flag to her in the follow-up: "Would you like me to send the current What to Expect and FAQ copy for a closer look?" Don't change them in this pass.

---

## Bucket 2: Aesthetic cleanup (needs one decision before we start)

Three related items from her free-text feedback. They go together because they're all about the same problem: the site reads slightly more "wellness brand" than she wants.

> "I think I want to remove the emojis and stock photos and use less wellness coach type words."
>
> "Less wellness jargon, no wellness stock photos, no emojis, more description of the work."
>
> Hero image & background: "I'd prefer no stock photos."

### 2.1 Remove all emojis

Grep the entire repo for emoji characters and remove them. Common offenders to scan for: 🌿 ✨ 💆 🧘 ☀️ 🌸 🤲 — anything in page components, `content/` files, navigation labels, CTAs.

```bash
# from repo root
grep -rPn "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" --include="*.ts" --include="*.tsx" --include="*.md"
```

Replace with nothing — don't substitute icons. The brand voice doc lists this as a "no" already; this is enforcement.

### 2.2 Remove stock photos

Currently the site mixes stock from Unsplash (per the brand voice site's `showcase` photos) with whatever else is in `public/images/`. Carolyn wants the stock photos out.

**The decision we need from you:** what fills the empty visual space?

Three options, ordered from fastest to best-for-her:

- **Option A — Texture/abstract over photography.** Replace the stock photo hero/section backgrounds with soft tonal washes from the brand palette (cream → creamDeep gradients, subtle grain texture, organic blob shapes in moss/terracotta at very low opacity). Costs nothing, ships today, looks intentional, sidesteps the "wellness stock" problem entirely. **My recommendation as the interim.**
- **Option B — Carolyn's own photos.** The handoff doc says she has "non-professional photos." We've never seen them. Could be unusable, could be exactly what's needed. Ask her to send what she has before we do anything else.
- **Option C — A small photo session.** Best outcome, longest path. Has to wait. Not a blocker for this round.

**Recommended path:** Ship Option A as the immediate fix in the same PR as the copy changes. In parallel, ask Carolyn for any photos she has and plan to swap them in when they arrive. Park Option C for after launch.

Whichever path, the swap should be one place: replace what the page components are pulling (likely from a `images` constant or via `next/image` `src=` props) with either gradient/texture components or local images from `public/images/`. The Unsplash remote pattern in `next.config.mjs` can stay — we'll just stop using it on this site.

### 2.3 De-jargon pass — "less wellness coach type words"

This is the squishiest item and the easiest to overdo. The brand voice doc already covers it (see "vocabulary" — preferred terms vs. terms to avoid). What she's reacting to is probably a few specific words on a few specific pages.

The high-confidence targets to remove or replace, gleaned from the inspiration sites and the brand voice doc:

| Avoid | Prefer |
|---|---|
| "Journey" | (just delete it, usually) |
| "Healing journey" | "Care", "treatment", "your work together" |
| "Transformative" | "Lasting", "meaningful", or nothing |
| "Holistic wellness" | "Whole-person care" (her own phrase) |
| "Sacred space" | "A quiet, comfortable space" |
| "Energy" used loosely | Only use where she uses it — she's fine with "energy work" as a specific modality |
| "Awaken", "unlock", "elevate" | Don't use |
| "Empower yourself to…" | Don't use |
| Exclamation marks on body copy | Strip them |

**Action:** Do one pass over every `content/*.ts` file, every page component, and the footer/header. Flag anything that lands in the left column above for replacement or deletion. **Don't rewrite her replacement copy from bucket 1** — she chose those words deliberately, including phrases like "lived experiences" that another editor might cut. The hatchet is for older marketing-tinged language, not her freshly-written sections.

When in doubt, defer to the language in the brand voice doc — that's the canonical voice reference.

---

## Bucket 3: Small UI tweaks

### 3.1 Hero CTA button label

> "I would like the second button to say Licensed Massage Therapist instead of MT abbreviated."

She's flagging that the second button (or possibly a chip/badge near the CTA) currently shows "LMT" or "MT" and she wants it spelled out.

**Action:** Find the hero button or credential chip rendering "MT" or "LMT" and change it to "Licensed Massage Therapist." If this is in `content/business.ts` or wherever credentials are stored, update there. Spot-check that the same string isn't shortened elsewhere — header, footer, meta tags.

### 3.2 Contact page CTA copy

> "I want to take out 'ready for your healing journey' and just have contact or schedule."

There's a CTA somewhere on or above the contact page that currently reads something like "Ready for your healing journey?" Replace it with simpler microcopy. Since she explicitly said "contact or schedule," the call is something like:

- Heading: **"Contact"** or **"Schedule a session"**
- Button: **"Call or text"** (matches her overall booking approach — no online scheduling on this site)

Pick one heading, keep the button label consistent with what the site uses elsewhere. Confirm with her if there's any ambiguity, but this is squarely in "she said the words" territory — not worth a round trip.

---

## Suggested PR breakdown

Two PRs, in this order:

**PR 1 — Copy revisions + small tweaks** *(no design risk, ship same-day)*

- About page philosophy block → her new version
- MFR page body → her new version
- MFR page → add "Commonly Addressed Conditions" section
- Therapeutic Massage page body → her new version
- Hero second button → "Licensed Massage Therapist"
- Contact CTA → "Contact" / "Call or text"
- Strip emojis everywhere
- De-jargon pass (the table in §2.3)

**PR 2 — Imagery** *(needs your green-light on Option A vs. waiting for her photos)*

- Remove all Unsplash photos from rendered pages
- Replace with texture/gradient backgrounds (Option A) OR with her own photos if she's sent them by then
- Keep the Unsplash `remotePatterns` in `next.config.mjs` (cheap, useful for placeholders during development)

Don't bundle these. PR 1 is a clean win we should get in front of her quickly to show responsiveness. PR 2 is where there's a genuine choice to make.

---

## Things to send back to Carolyn

A short list to bring up next time you talk to her — these are the gaps in the feedback that we shouldn't guess at:

1. **What to Expect and FAQ pages** — she left feedback blank for both. Are they fine, or did she run out of time? Offer to send the current copy for review.
2. **Photos** — does she have anything she'd like us to look at, even non-pro shots of the room or her hands working? If yes, ship Option B in PR 2. If no, we go with Option A and revisit after she does a session.
3. **Any other "wellness coach" phrases that bug her** — the table in §2.3 is our best guess at what she's reacting to. Worth confirming we caught it, or asking her to mark up anything specific.

---

## What's outdated in `PROJECT_HANDOFF.md`

This is bookkeeping but worth fixing so the next session doesn't read stale context: the handoff doc at the project root says "Customer-facing site not yet started." That's no longer true — the customer site exists and has been reviewed. After this round of changes lands, update the handoff to reflect:

- Customer site built and deployed (to `*.vercel.app` preview, presumably)
- Pages live: Home, About, MFR, Therapeutic Massage, What to Expect, FAQ, Contact
- Carolyn's first round of feedback received and addressed (link to this plan and the PRs)
- Outstanding: photography, domain registration, contact form delivery service choice
