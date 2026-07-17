# Copywriting Suggestions

Read every text panel on the site as a copywriter. Each suggestion names the technique used and gives a concrete rewrite. Different technique per panel so no two sections feel the same.

Mark each with `[x]` to apply, `[ ]` to skip, or write your own note.

Style guardrails followed in every rewrite: no em-dashes, no arrows, no AI-slop, no "My Role" section.

---

## 1. Hero bio (`src/content/site/hero.json`)

**Current:**
> Game developer building games and interactive applications, with a Master's in Computer Science focused on game technology and real-time graphics. I ship real products with Unity and Unreal Engine.

**Technique: lead with proof, cut the throat-clearing.** "Game developer building games" is a tautology and the strongest fact (you ship, you have awards) is buried at the end. Open on the concrete.

- [ ] **1a. Proof-first, specific:**
  > I build games and interactive 3D apps in Unity and Unreal Engine, from award-winning game-jam titles to a real-estate platform used across a 100-plus person company. Master's in Computer Science, specialized in real-time graphics.

- [ ] **1b. Shorter, punchier (if you want the bio to breathe):**
  > Unity and Unreal developer with a Master's in real-time graphics. I ship games that win jams and business software that ships to real clients.

- [X] **1c. Keep current structure, just kill the tautology:**
  > Game developer shipping games and interactive 3D applications in Unity and Unreal Engine, with a Master's in Computer Science focused on game technology and real-time graphics.

---

## 2. Hero stat labels (`src/pages/index.astro`)

**Current:** `Work Experience`, `Coding`, `Projects`, `Games`, `Game Jam Podiums` with values like `5 shipped`, `3 wins`.

**Technique: parallelism + concreteness.** Labels mix noun-phrases ("Work Experience") with gerunds ("Coding"). Make them read as one scannable set.

- [X] **2a. Tighten labels for rhythm:**
  - `Work Experience` stays, or shorten to `Experience`
  - `Coding` becomes `Years Coding`
  - `Games` value `5 shipped` is good; label could be `Games Shipped` and value just the number
  - `Game Jam Podiums` is strong, keep it

- [ ] **2b. Value-forward (put the number where the eye lands):** keep labels short and let values carry weight: `Experience / Coding / Projects / Games / Jam Podiums`.

---

## 3. Work: Placeholders Studio (`work-experience.json`)

**Current:**
> As solo founder I run a small game team, covering programming, publishing and business alongside team management. Built Paper Blades (2nd place, ZTGK 2024), the tethered co-op shooter Knot Fun (sponsor award, ZTGK 2025) and the in-development third-person action game ReWand. All titles are in active development.

**Technique: "so what" compression + strong verbs.** "covering programming, publishing and business alongside team management" is a list of hats; recruiters skim it. Front-load the range of the role, then let the titles + awards do the bragging.

- [ ] **3a. Range-then-proof:**
  > Solo founder of a small game studio: I handle programming, publishing, business and team management. Shipped Paper Blades (2nd place, ZTGK 2024), the tethered co-op shooter Knot Fun (sponsor award, ZTGK 2025), and the third-person action game ReWand, now in production with a publisher.

- [ ] **3b. Note:** "All titles are in active development" slightly contradicts "Built" and "Shipped". Consider dropping it or moving it into per-title status as in 3a.

---

## 4. Work: Resimo (`work-experience.json`)

**Current:**
> Develop the core engine and deployment pipeline behind an interactive 3D real estate desktop app (Unity), used by every client across a 100+ person company through a shared CORE codebase. Built the internal unit-testing framework, editor dev tools and app DevOps, and personally delivered dozens of client deployments from zero. Currently porting the full application to Unreal Engine.

**Technique: scale as the hook (numbers first).** This is your strongest professional entry. The "100+ person company" and "dozens of deployments" are the selling points; keep them but tighten the middle so they don't drown.

- [X] **4a. Scale-forward, trimmed:**
  > Own the core engine and deployment pipeline behind an interactive 3D real-estate app (Unity) used by every client across company on one shared CORE codebase. Built the internal unit-testing framework, editor tooling and DevOps, and delivered dozens of client builds from scratch. Currently porting the whole application to Unreal Engine.

- [ ] **4b. Micro:** "app DevOps" reads as jargon; "DevOps" or "release automation" is cleaner.

---

## 5. Work: Radikate (`work-experience.json`)

**Current:**
> Worked as one of 5 programmers on an 8-person team (2 artists, 1 PM) during a 3-month contract. Focused on the PC game Nerd Simulator from its earliest stage, with occasional maintenance and one new mechanic on the live mobile and PC title Jump Heroes.

**Technique: lead with the work, not the org chart.** The first sentence is entirely team composition. Recruiters want to know what you did. Flip it.

- [X] **5a. Work-first:**
  > Built PC game Nerd Simulator from its earliest stage as one of five programmers on an eight-person team, during a three-month contract. Also maintained the live mobile/PC title Jump Heroes and added one new mechanic.

---

## 6. Work: IT Silesia (`work-experience.json`)

**Current:**
> Joined as a student intern and was promoted to Mid. Built 6 VR training simulations for TransFr (XR Interaction Toolkit, Oculus), owning most of the scope from framework improvements to turning designs into working VR. Also contributed to two non-simulation products: an interactive product catalogue for mining manufacturer FAMUR and a touchscreen 3D real estate sales app for TDJ Estate.

**Technique: growth arc as narrative.** "intern to Mid" is a great progression signal already in the title. Reinforce it in the copy with an arc.

- [X] **6a. Arc-forward:**
  > Started as a student intern and grew into a Mid developer. Built six VR training simulations for TransFr (XR Interaction Toolkit, Oculus), owning most of the scope from framework work to turning designs into shipped VR. Also shipped two non-simulation products: an interactive product catalogue for mining manufacturer FAMUR and a touchscreen 3D real-estate sales app for TDJ Estate.

---

## 7. Education: Master's (`education.json`)

**Current:**
> Graduated in September 2025 with an MSc (mgr inż.), specialized in Interactive 3D Graphics (IGT), final grade 5.0. Courses covered graphics API programming (OpenGL, Vulkan, DirectX), real-time and realistic rendering, game programming, game AI, VR and AR, and image and motion analysis. My master's thesis analyzed procedural level generation algorithms for roguelike games.

**Technique: bury the syllabus, surface the signal.** The course list is long and reads like a transcript. The two things that stand out (grade 5.0, thesis topic) should not be sandwiched. Consider trimming the course dump.

- [X] **7a. Signal-first, syllabus trimmed:**
  > Graduated September 2025 with an MSc (mgr inż.), final grade 5.0, specialized in Interactive 3D Graphics. Coursework spanned graphics APIs (OpenGL, Vulkan, DirectX), real-time and photorealistic rendering, game AI, VR/AR and computer vision. My thesis measured procedural level-generation algorithms for roguelike games across thousands of generated dungeons.

- [ ] **7b. Micro:** adding "across thousands of generated dungeons" pulls the thesis into a concrete achievement instead of a topic label, and matches the project page.

---

## 8. Education: Bachelor's (`education.json`)

**Current:**
> Graduated in February 2024 with an engineering degree (inż.), final grade 5.0, specialized in Computer Graphics and Software (GKiO). A broad computer science base covering object-oriented programming, algorithms, data structures, databases and 2D and 3D graphics. My thesis was an arcade VR game built in Unity for the Oculus Quest 2. I also co-authored a published research paper on Kinect depth-sensor rehabilitation for elderly patients, tested with real patients.

**Technique: end on the strongest note (recency/peak effect).** The published paper "tested with real patients" is the most memorable line; it already sits last, good. Just tighten the generic middle.

- [X] **8a. Trim the generic base:**
  > Graduated February 2024 with an engineering degree (inż.), final grade 5.0, specialized in Computer Graphics and Software. Solid CS foundation across OOP, algorithms, data structures, databases and 2D/3D graphics. My thesis was an arcade VR game in Unity for the Oculus Quest 2, and I co-authored a published research paper on Kinect depth-sensor rehabilitation, tested with real elderly patients.

---

## 9. Project: High Pass Image Filter

**Current overview** opens: "High Pass Image Filter is a solo university project I built to answer one question with real numbers: how much faster is hand-written x64 Assembly than C++..."

**Technique: this one already uses the "one question" hook well.** Only tweak: the payoff line ("nearly twice as fast") is buried after the bullets. Consider a teaser up top.

- [ ] **9a. Add a curiosity-gap teaser to the last overview sentence:**
  > ...so I could swap implementations at runtime and measure them head to head. The answer surprised me, and the number is at the bottom of this page.

- [X] **9b. Or keep the reveal where it is but make it land harder:**
  > The payoff: hand-written Assembly ran nearly twice as fast as the compiler's best C++.

---

## 10. Project: JustDown

**Current overview:**
> JustDown is a solo 3D game demo I wrote from scratch in C++ and OpenGL 3.3 with no game engine, loosely inspired by *Only Up!* but reversed, so the player descends instead of climbs. Everything an engine normally hides, the renderer, the shaders, the post-processing, the physics and the level loading, I built by hand, which was the whole point of the project.

**Technique: sharpen the hook with contrast.** "no game engine" is the flex; make it the first thing. The "Only Up! but reversed" is a great concrete image, keep it.

- [X] **10a. Flex-first:**
  > JustDown is a 3D game demo I wrote from scratch in C++ and OpenGL 3.3 with no engine underneath. It is loosely *Only Up!* in reverse: the player descends instead of climbs. Everything an engine usually hides, the renderer, shaders, post-processing, physics and level loading, I built by hand. That was the whole point.

- [ ] **10b. Micro:** fix the double period typo in the frontmatter `description` ("bloom..").

---

## 11. Project: Physically Based Rendering (rro)

**Current overview:**
> This is a set of physically based rendering experiments I completed solo during university labs, built on top of the pbrt-v4 reference renderer...

**Technique: kill the weak "This is a" opener.** Generic openers ("This is", "This project") waste the highest-attention position. Name the thing.

- [X] **11a. Named opener:**
  > A set of physically based rendering experiments built on the pbrt-v4 reference renderer during university labs. Instead of touching the renderer's core, I authored and configured scenes to study how modern light transport behaves: comparing integrators, materials and participating media, then analysing how each parameter moved noise, image quality and render time.

---

## 12. Project: Animal Detection

**Current overview:**
> Animal Detection is a university deep-learning project where the whole year group collected a shared dataset of camouflaged animals and each student trained their own segmentation model on it...

**Technique: sensory hook.** "camouflaged animals" is a vivid image. Lead with the problem's difficulty to create stakes before the method.

- [ ] **12a. Stakes-first:**
  > Camouflage is built to fool eyes, so teaching a network to find a hidden animal is a genuinely hard segmentation problem. For this university project the whole year group pooled a shared dataset of camouflaged animals and each student trained their own model. Mine treats it as multi-class semantic segmentation: every pixel is labelled as the animal, the camouflaging background, the regular background, or an attention region around the subject.

- [X] **12b. Note:** the result line "IoU of 0.51 ... GTX 1070" is honest and concrete, keep it. Could add one clause on why 0.51 is respectable for 300 images, to pre-empt the reader undervaluing it.

---

## 13. Project: SmileFactory

**Current overview:**
> SmileFactory is a university machine-learning project by a five-person team asking whether a model can tell a genuine smile from a posed one...

**Technique: question-as-hook (already present), tighten the credit line.** The "I led the core implementation, covering..." sentence is long and list-heavy. Compress.

- [X] **13a. Tighter contribution line:**
  > I led the core implementation: data loading and fold handling, classifier integration and the metrics and plots. A teammate wrote the temporal windowing while others added classifiers and visualisation.

- [] **13b. Elevate the finding.** The Learnings line ("*when* you look at a smile matters as much as *what* you measure") is the best sentence in the whole entry. Consider echoing it as a teaser in the overview's opening question.

---

## 14. Project: Arkanoid Game Clone

**Current overview:**
> Arkanoid Game Clone was the first game I ever built, a solo university project recreating the 1986 arcade classic in C++17 and SFML with no game engine...

**Technique: origin-story framing.** "the first game I ever built" is emotionally sticky. Lean into the beginner-to-now arc, which the Learnings already nails ("the thing everything I have built since stands on").

- [X] **14a. Origin-forward:**
  > This is the first game I ever built: a solo recreation of the 1986 arcade classic in C++17 and SFML, no engine. Writing the core systems from scratch, scenes, collisions, resources and UI, was exactly the point.

---

## 15. Project: Stereo Vision & Disparity (zaowir)

**Current overview:** opens with "This is a solo computer-vision project from a series of university labs..."

**Technique: replace weak opener + lead with the journey.** The "full stereo pipeline" is impressive breadth; make the pipeline the hook.

- [X] **15a. Pipeline-as-journey:**
  > A solo computer-vision project walking the entire stereo pipeline in Python and OpenCV: from single and stereo camera calibration through rectification and disparity estimation, out to depth maps, 3D point clouds and optical flow on video.

- [X] **15b. Micro:** the Learnings sentence has no trailing period; add one.

---

## 16. Project: Tiny Pomodoro

**Current overview:**
> Tiny Pomodoro is a compact, always-on-top Windows focus timer I built solo in C# and WPF to put the ideas from *Deep Work* into practice, shaped around my own routine...

**Technique: pain-point hook.** Everyone knows the "reach for a distraction on autopilot" feeling. Open on the relatable pain, then reveal the tool as the fix.

- [X] **16a. Pain-first:**
  > I kept reaching for Spotify and the same three websites on autopilot mid-focus. Tiny Pomodoro is the fix: a compact, always-on-top Windows timer in C# and WPF that removes those distractions during a session and pulls in my real task list, then restores everything the moment I pause. Built with Claude Code, as a way to explore AI-assisted development on a problem I actually wanted solved.

- [X] **16b. Note on the AI-assist line:** it currently appears both in overview and learnings. Keep one strong mention; two can read as either humble-brag or hedging depending on audience.

---

## 17. Project: The Backyard

**Current overview:**
> The Backyard is an isometric game built by a five-person team over a 48-hour GameJamPlus in Lublin, set around a kid's treehouse and built out of classic childhood outdoor games. It never shipped and did not place, but it was a genuine team crucible...

**Technique: honest-framing done well, keep it; sharpen the emotional image.** "kid's treehouse" and "childhood outdoor games" are nostalgic gold. The "never shipped, did not place, but" is disarming and credible.

- [X] **17a. Sharpen nostalgia + keep honesty:**
  > The Backyard is an isometric game a five-person team built over a 48-hour GameJamPlus in Lublin: a kid's treehouse world stitched together from the outdoor games we all played as children, floor-is-lava, tag, and the rest. It never shipped and did not place, but it was a real team crucible. Several of us were touching Unity for the first time, so most of the work was learning the engine, splitting the load, and dragging a rough idea to playable inside two days.

---

## 18. Project: ReWand

**Current description (frontmatter):** "My most recent project."

**Technique: the frontmatter description is dead weight.** It shows on the card and gives the reader zero reason to click. Every other project has a concrete one-liner; this one should too.

- [X] **18a. Concrete card description:**
  > A third-person action game about spellcasting and reincarnation: when you die, your last life returns as an ally. In production with a publisher.

- [X] **18b. Overview is otherwise strong.** The "Why it matters" heading is a nice variation from the usual Learnings. The reincarnation mechanic ("a clone of their previous character returned as an ally") is the hook, so make sure the card description carries it (see 18a).

---

## 19. Project: Paper Blades

**Current overview:**
> Paper Blades is a roguelike strategy game set in a stylised feudal Japan where you command a squad of origami samurai using voice commands...

**Technique: the concept is the hook, front-load it hard.** "command origami samurai with your voice" is one of the most distinctive lines on the whole site. Do not dilute it. The awards then act as social proof.

- [X] **19a. Concept-first, one breath:**
  > You command a squad of origami samurai with your voice. Paper Blades is a roguelike strategy game in a stylised feudal Japan, built by a six-person Placeholders Studio team, and it became the studio's turning point: second place at the 16th ZTGK, plus the Digital Dragons, Game Access and GameDev Lawyer awards.

- [X] **19b. Contribution line:** "I worked on the game's voice-control side and built much of the shared systems layer it ran on" is good and specific, keep it as its own sentence.

---

## 20. Project: Electro Exile

**Current overview:**
> Electro Exile (released as *The Last Battery*) is a platformer from my first-ever game jam, built by a four-person team and awarded third place at the BEST IT Festival. You play a battery that steadily loses charge as it moves...

**Technique: mechanic-as-metaphor hook.** "you play a battery that loses charge as it moves" is a clean, memorable premise. Lead the reader into the clever design consequence.

- [X] **20a. Mechanic-forward:**
  > You play a battery that drains as it moves, and different terrain drains it faster, so a simple platformer quietly becomes a resource puzzle where every jump and route choice costs energy. Electro Exile (released as *The Last Battery*) came out of my first-ever game jam, a four-person team, third place at the BEST IT Festival. I owned player movement and the core architecture.

---

## 21. Project: This Portfolio Site

**Current overview:**
> This is my personal portfolio, the site you are reading right now, built solo with Astro, Svelte 5 and TypeScript...

**Technique: meta/self-aware charm, but drop the weak "This is".** "the site you are reading right now" is a nice touch. Keep the wink, lose the filler opener.

- [X] **21a. Wink, no filler:**
  > You are looking at it. This portfolio is built solo with Astro, Svelte 5 and TypeScript, with all project, achievement and book content living in Markdown collections rather than a CMS. A few deliberate architectural choices keep it fast, statically generated, and hard to break as the content grows.

- [ ] **21b. Note:** this is the only public project with no Learnings section. Fine, but a one-line "what I would do differently" adds credibility if you want parity.

---

## 22. Project: PCG Algorithm Analysis (master-thesis)

**Current** leads with a "What The Images Show" section before Overview.

**Technique: strong, but the Overview hook can be sharper.** "not by eyeballing a few maps but by generating thousands and measuring them" is the money line. It is already there; consider promoting it to the very first sentence.

- [X] **22a. Measurement-as-hook (reorder first sentence):**
  > Most procedural-generation work is judged by eyeballing a handful of maps. My master's thesis (defended 2025, graded 5.0) judges it by generating thousands and measuring them. I built the generators in Unity, a batch harness that sweeps their parameter spaces, a metric suite scoring every dungeon structurally and through a simulated player, and a JSON export pipeline feeding a separate Python analysis layer.

- [X] **22b. Note:** the "What The Images Show" section is a genuinely good, uncommon device for a visual thesis. Keep it, but consider placing it after the Overview so text-first readers get the pitch before the figure legend.

---

## 23. Project: Pirate Rush VR

**Current overview:**
> Pirate Rush VR is my engineering thesis, a standalone arcade high-score game for the Oculus Quest 2 that runs directly on the headset as a sideloaded APK with no PC tether. You play a pirate armed with a sabre and a flintlock...

**Technique: action verbs, second-person immersion.** The verb string "slice inbound fruit, shoot barrels, dodge bombs" is excellent VR copy. Consider leading with the visceral gameplay, then the thesis framing.

- [X] **23a. Gameplay-first:**
  > Slice inbound fruit with a sabre, shoot barrels with a flintlock, dodge cannon fire from the towers around you, and chain clean hits into a score multiplier. Pirate Rush VR is my engineering thesis: a standalone arcade high-score game running straight on the Oculus Quest 2 as a sideloaded APK, no PC tether. Because the thesis centred on comfort, I added configurable locomotion, snap and smooth turning, and a comfort mode that reduces simulator sickness.

- [X] **23b. Micro:** the runtime mesh-slicing bullet ("compute the mesh's exact volume with the divergence theorem") is a standout technical brag; consider surfacing "divergence theorem" earlier so skimmers catch it.

---

## 24. Project: Knot Fun

**Current overview:**
> Knot Fun is a local co-op arena shooter first built by a four-person team at the BEST IT Festival Game Jam in Gliwice, where it won first place, and later expanded by the whole Placeholders Studio team...

**Technique: the rope mechanic is the hook, lead with the tension it creates.** "tied to the others by a rope that damages enemies it sweeps through" is unique. The jam-to-showcase arc is strong social proof, keep it, but after the hook.

- [X] **24a. Mechanic-first:**
  > Every player is tied to the others by a simulated rope that limits how far you can spread, reacts to the environment, and slices through any enemy it sweeps, so positioning and coordination become the whole fight. Knot Fun is a local co-op arena shooter, first built by a four-person team at the BEST IT Festival Game Jam in Gliwice where it won first place, then expanded by the full Placeholders Studio team and shown at ZTGK, Digital Dragons and Game Access. I built the first working rope prototype that set the mechanic's direction, then focused on combat feedback and polish.

---

## 25. Achievement: Render Cube Sponsor Award / ZTGK 2025

**Current:**
> We returned to ZTGK the year after our Paper Blades run, this time as Placeholders with Knot Fun, our rope-based local co-op shooter. We did not place on the podium, but the game earned a sponsor award from Render Cube, which meant a lot coming from a studio whose work we admire.

**Technique: honest-underdog framing, keep it; fix the stale "coming soon".** The "did not place, but" is credible. But "Photos from the event are coming soon" reads as unfinished on a live site.

- [X] **25a. Remove or replace the placeholder line:** either add the photos, or cut "Photos from the event are coming soon." entirely so the entry doesn't look half-done.

- [x] **25b. Tighten the sentiment:**
  > We came back to ZTGK the year after Paper Blades, now as Placeholders with Knot Fun. No podium this time, but a sponsor award from Render Cube, a studio whose work we genuinely admire, which made it land all the same.

---

## 26. Achievement: 3rd Place BEST IT Festival (electro-exile)

**Current:**
> This was the first game jam I had ever taken part in. Together with three friends, as a team of four, we created Electro Exile... We won third place, but the most important part for me was the experience and the people I met. It motivated me to keep learning...

**Technique: good heart, trim redundancy.** "Together with three friends, as a team of four" says the same thing twice. "the experience and the people" is slightly generic; make one detail concrete.

- [x] **26a. De-duplicated, warmer:**
  > My first-ever game jam. Four of us, three friends and me, built Electro Exile (then called The Last Battery), a game about a battery rationing its own charge. Third place, but the real prize was the people and the proof that I wanted to keep doing this. The game was never finished, and I still had a great time.

---

## 27. Achievement: 1st Place BIT 2024 (knot-fun)

**Current:**
> Knot Fun started here, built during the jam by a four-person team and taking first place on the theme "In a time loop". The name is a play on words: players are tied together by a rope, a loop of knots, and time only moves while you do...

**Technique: the wordplay reveal is delightful, keep it fully.** This is one of the best achievement entries. The triple pun (rope loop / knots / time-only-moves-when-you-do) is a genuine "oh, clever" moment. Only micro-polish.

- [X] **27a. Micro only:** consider tightening "literally a loop of time" to avoid ending on "literally", which some readers flag. e.g. "a loop of knots, and a loop of time." No structural change needed. This entry is already strong.

---

## 28. Achievement: 1st Place BIT 2025 (re-wand)

**Current:**
> During the final year of our Master's degree, our four-person team decided to take part in the university game jam one last time. We won it by a wide margin.

**Technique: short punch line already works ("We won it by a wide margin").** Keep the confidence. The second paragraph explains the theme tie-in well.

- [X] **28a. Micro:** "one last time" plus "We won it by a wide margin" is a clean setup-payoff. Leave the structure. Optionally sharpen the last line: "The project outlived the jam: we are continuing it with a publisher who sat on the jury."

- [X] **28b. Note:** curly apostrophe in "Master's" here vs straight elsewhere; standardize across all content for consistency.

---

## 29. Achievement: GRiD member (gvg-club)

**Current:** two paragraphs about discovering the club, workshops, first job, friends.

**Technique: lead with the payoff, then the detail.** The strongest fact is "found my first job in the industry" and "friends with whom I still create projects today". It is buried in paragraph one's middle. Promote it.

- [X] **29a. Payoff-first:**
  > This club is where my game-dev career actually started. I found it in my first year at the Silesian University of Technology, and it handed me the events, workshops and game jams that led to my first industry job, along with the friends I still build projects with today. As an active member I ran on graphics-programming and game-dev meetings, worked on group projects, and led a few workshops myself, including ones on unit testing and Unity Addressables. My membership ran until I graduated in 2025.

---

## 30. Achievement: Co-Author scientific publication

**Current:**
> I was honoured when my future thesis supervisor invited me to join this project during my first year of university...

**Technique: lead with the rarity.** A first-year undergrad co-authoring a published, patient-tested paper is genuinely uncommon. Open on that, then the story.

- [X] **30a. Rarity-first:**
  > In my first year of university, my future thesis supervisor invited me onto a published research project, which is not a common place to start. We built a Unity application that used a Kinect depth sensor to track elderly patients through rehabilitation exercises, and I worked on the interactive exercises, real-time motion tracking and user feedback. It was later tested with real patients at the National Institute of Oncology in Gliwice, and the results were published as "Rehabilitation of Cognitive Functions of the Elderly with the Use of Depth Sensors", where I am one of nine co-authors on a paper led by my supervisor Ewa Lach.

---

## 31. Achievement: Engineer's Degree

**Current:**
> I learned more about computer science at the Silesian University of Technology than I could have learned anywhere else...

**Technique: the opener is a bold claim that is hard to back and slightly generic.** Trade the superlative for a concrete detail. End (peak effect) on the VR-game close, which is already good.

- [X] **31a. Concrete over superlative:**
  > My engineering degree at the Silesian University of Technology gave me the foundation everything since is built on: software engineering, object-oriented programming, algorithms, databases, distributed systems and team projects, plus a co-authored publication on depth-sensor rehabilitation. I remember it most for the people and the projects we built together, and closing it out by shipping a VR game as my thesis was the right way to end the chapter.

---

## 32. Achievement: Master's Degree

**Current:**
> My Master's degree was mostly about exploring new challenges, joining events, and working on increasingly ambitious projects. I genuinely enjoyed this stage of my studies, although it passed much faster than I expected...

**Technique: replace vague abstractions with specifics.** "exploring new challenges, joining events" is soft. The concrete meat (the dungeon-evaluation framework, the graphics focus) is stronger; lead with it.

- [X] **32a. Specifics-first:**
  > My Master's was where the projects got ambitious. I focused on graphics programming, physically based and real-time rendering, shader development, GPU computing and computer vision, and for my final project I built a complete framework for evaluating procedurally generated dungeons, so different generation methods could be tested, measured and compared the same way. It passed far faster than I expected, and I enjoyed every part of it.

---

## 33. Achievement: 2nd Place ZTGK 2024 (paper-blades)

**Current:**
> We went to ZTGK without really knowing what to expect. Somehow, we ended up on the podium among 46 teams, which still feels a bit crazy...

**Technique: understatement + specific stakes.** "among 46 teams" is great social proof; "still feels a bit crazy" is charming and human. Keep the voice. Only tighten "in the future" at the end.

- [ ] **33a. Micro:** "It is also a project we want to continue developing in the future" is slightly redundant with the earlier "favourite project". Trim to "It is still a project we want to keep developing." Everything else in this entry is strong, keep it.

---

## 34. Books page intro (`src/pages/books.astro`)

**Current:**
> My personal reading tracker (kept public on purpose). One of the tricks I picked up from *Atomic Habits*: making a habit visible creates accountability and keeps motivation going.

**Technique: excellent already, meta and self-justifying.** It explains why the page exists and cites the exact book that justifies it. Leave it. Optional micro below.

- [X] **34a. Optional tighten:** "(kept public on purpose)" could fold into the sentence: "My personal reading tracker, public on purpose: a trick from *Atomic Habits*, since a visible habit is an accountable one."

- [ ] **34b. Bigger idea:** none of your Finished books have a `thoughts` body yet. One or two sentences of personal take per finished book would make this page far more engaging than a cover grid, and it plays to the same accountability theme.

---

## 35. Footer headline (`src/components/Footer.svelte`)

**Current:** eyebrow "Get in touch", headline "Let's build something together."

**Technique: strong and conventional; consider a more specific CTA.** "Let's build something together" is friendly but generic. A game-dev-specific line would feel more you.

- [X] **35a. More specific CTA options (pick one or keep current):**
Chce tylko Let's talk.

---

## Cross-cutting notes (apply once, everywhere)

- [X] **A. Apostrophe consistency.** Content mixes curly (’) and straight (') apostrophes ("Master's" appears both ways). Pick one and normalize across all markdown. Wszędzie '
- [X] **B. Weak openers.** "This is a...", "This project...", "It is a..." appear in several project overviews (rro, zaowir, portfolio-site). The first sentence is the highest-value real estate; name the subject instead.
- [X] **C. Team-composition-first entries.** Several work/project entries open with headcount and org chart (Radikate, SmileFactory). Lead with what was built or the mechanic; the team makeup can follow.
- [X] **D. Buried payoffs.** Result lines ("nearly twice as fast", "79% accuracy", "IoU of 0.51") land after the bullet lists. Consider a one-line teaser near the top for skimmers, keeping the full number in place.
- [X] **E. Stale placeholders.** "Photos coming soon" (ztgk-2025) and the double-period typo (just-down description) read as unfinished on a live site.
