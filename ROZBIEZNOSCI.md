# Rozbieżności w opisach — projekty, osiągnięcia, praca

Zestawienie niespójności znalezionych w treści (frontmatter + body) plików z
`src/content/projects/`, `src/content/achievements/` i `src/content/site/`.
Stan na 2026-07-15.

Legenda ważności:
- 🔴 błąd (literówka / błędne dane / pola się kłócą)
- 🟡 niespójność (dane logicznie się rozjeżdżają, warto ujednolicić)
- ⚪ drobiazg / kosmetyka

---

## Osiągnięcia (`src/content/achievements/`)

### 🔴 `bit2024.md` — kilka błędów w jednym pliku
- `title: "1rd Place - Game Jam"` — literówka, powinno być **"1st"** (nie "1rd").
- `rank: "Theme: In a time loop"` — w polu `rank` wpisany **temat jamu**, a nie miejsce.
  We wszystkich innych `winner` `rank` to miejsce (np. "1st Place", "2nd Place", "3rd Place").
  Temat powinien iść do `description`.
- `description: ""` — **puste**, w przeciwieństwie do pozostałych osiągnięć.
- `url` — ten sam link Facebook (`pfbid037UwBwtUGraNifZTQtd1Ex6tK8cigQZTwKma5LQpWtV2SkNaQbGzn5hyL2EfpBpMBl`)
  co w `bit2025.md`. Jeden post nie może dotyczyć dwóch różnych edycji (2024 i 2025) — link 2024 prawdopodobnie błędny.
- Brak body (żadnego opisu), inaczej niż `bit2025.md`.

### 🔴 `bit2025.md`
- `title: "1rd Place - Game Jam"` — ta sama literówka **"1rd" → "1st"** (a `rank` już poprawnie "1st Place").
- Body: *"During the final year of our Master's degree..."* — magisterka wg
  `master-degree.md` skończona **2025-09**, a jam był **2025-12** (data pliku), czyli
  **po** obronie. "During" jest nieścisłe.

### 🟡 `bit2024.md` vs `knot-fun.md` — data i brak wzmianki o nagrodzie
- Osiągnięcie datowane **2024-12**, projekt `knot-fun.md` datowany **2024-11**.
- Body `knot-fun.md` **w ogóle nie wspomina** o wygranej na BEST IT Festival —
  a `electro-exile`, `paper-blades` i `re-wand` swoje nagrody w body opisują. Niespójne traktowanie.

### 🟡 `best-it-festival.md` vs `electro-exile.md` — rok się nie zgadza
- Osiągnięcie (zdobycie 3. miejsca) datowane **2022-11**, opisane jako *"the first game jam I had ever taken part in"*.
- Projekt `electro-exile.md` datowany **2023-11** — **rok różnicy** względem daty wygranej.

### 🟡 `gvg-club.md` — nazwa klubu GVG vs GRiD
- Plik: `gvg-club.md`, `url: https://gvg.polsl.pl`, logo `grid.png`.
- `title: "GRiD member"`, `event: "Games , Rendering, Innovation and Development"`.
- Miesza się skrót **GVG** (nazwa pliku + URL) z **GRiD** (tytuł + event). Do ujednolicenia.
- `event` ma też **spację przed przecinkiem**: `"Games , Rendering..."` → `"Games, Rendering..."`.

### ⚪ `gvg-club.md` — "4+ Years" zaniża staż
- `rank: "Since October 2020"`, data 2020-10. Na 2026-07 to ~5,75 roku, a tytuł mówi "4+ Years".

### 🟡 `master-degree.md` vs `master-thesis.md` — opis pracy i data
- Osiągnięcie: *"built a complete framework for **evaluating** procedurally generated dungeons"*.
- Projekt: *"**comparing** procedural dungeon-generation algorithms ... with a statistical analysis"*.
  Dwa różne ujęcia tej samej pracy — warto zsynchronizować ("framework do ewaluacji" vs "porównanie algorytmów").
- Data pracy `master-thesis.md` = **2024-08**, a stopień magistra `master-degree.md` = **2025-09**
  (praca rok przed dyplomem — możliwe, ale warto sprawdzić).

### ⚪ `bit2025.md` typ / doc
- Typy `education` (`engineer-degree.md`, `master-degree.md`) są poprawne w schemacie
  (`content.config.ts` dopuszcza `education`), ale **CLAUDE.md nie wymienia `education`** w liście
  dozwolonych typów — dokumentacja nieaktualna.

---

## Projekty (`src/content/projects/`)

### 🔴 `skeleton-offense.md` — `teamSize` kłóci się z body
- `teamSize: 1`, a body: *"a two-person game"* połączone z *"another two-person team"* = **4 osoby**.
  `teamSize` powinien być 4 (lub inny), na pewno nie 1.

### 🟡 `re-wand.md` — data vs treść + brakujące pola
- `date: "2025-11"` (listopad), a body: *"started as a game jam project in **December 2025**"* (grudzień).
  Jam wg `bit2025.md` też 2025-12. Data pliku (2025-11) rozjeżdża się z grudniem.
- Brak `teamSize` (inne projekty PlaceHolders mają 6) i brak `draft` — jedyny projekt bez `teamSize`.
- `description: "My most recent project."` — bardzo ogólne w porównaniu z resztą.

### 🟡 sourceUrl wskazujący profil zamiast repo
Kilka projektów ma `sourceUrl` prowadzący do profilu GitHub (`https://github.com/szejkerek`),
a nie do konkretnego repozytorium:
- `pirate-rush-vr.md`
- `the-backyard.md`
- (`re-wand.md`, `electro-exile.md` itd. mają już konkretne repo)

### 🟡 Niespójny właściciel repo dla projektów zespołowych
Projekty PlaceHolders (6 osób) raz są pod org `PlaceHoldersStudio`, raz pod kontem osobistym:
- `electro-exile.md`, `knot-fun.md`, `re-wand.md`, `skeleton-offense.md` → `PlaceHoldersStudio`
- `lethal-speed.md` → `szejkerek/LethalSpeed` (konto osobiste, mimo zespołu 6 os.)

### 🟡 `pirate-rush-vr.md` — opis vs body
- `description`: *"slice fruit, **shoot targets**"* — body mówi o niszczeniu **beczek (barrels)** pistoletem,
  nie "targets". Drobna rozbieżność słownictwa.
- `description` sugeruje high-score/arcade, body nazywa grę **"rhythm-action"**.

### 🟡 `electro-exile.md` — nazwy studia / gry
- Body: gra *"formerly known as 'Last Battery'"*, `playUrl` = `carbon-crab-games.itch.io/the-last-battery`
  (studio **Carbon Crab Games**), a `sourceUrl` = `PlaceHoldersStudio`. Dwie różne nazwy zespołu/studia.

### ⚪ `brain-scan.md` — brak body
- Tylko frontmatter (`teamSize: 4`), zero treści opisu — jedyny "opublikowany" projekt bez body
  (poza `indie-game-jam.md`, który jest `draft`).

### ⚪ `paper-blades.md` — brak sourceUrl + gramatyka
- Brak `sourceUrl` (większość projektów go ma).
- *"origami samurais"* (w opisie i body) — w achievement `ztgk-2024.md` bez "s". Kosmetyka.

### ⚪ Tag "Game" vs deprecacja
- CLAUDE.md/CONTEXT.md: *"Project" jest terminem kanonicznym, "Game" zdeprecowany.*
  Tag `"Game"` jest jednak używany jako filtr w wielu projektach — do rozważenia, czy to celowe
  (gatunek) czy pozostałość.

### ⚪ Tag "AI" przy computer vision
- `zaowir.md` (stereo vision / OpenCV) otagowany `"AI"` — bardziej "Computer Vision" niż "AI".
  Analogicznie `smilefactory.md` (ML) i `animal-detection.md` (sieć neuronowa) też "AI" — spójność do przemyślenia.

---

## Praca (`src/content/site/work-experience.json`)

### 🔴 Nakładające się okresy zatrudnienia
- **IT Silesia**: `April 2022 to July 2023` (Mid Unity VR Developer)
- **Radicate**: `May 2023 to July 2023` (Unity Developer)
- Oba kończą się w lipcu 2023 i **nakładają się na maj–lipiec 2023**. Jeśli to były równoległe
  angaże — OK, ale warto to doprecyzować (kolejność/nakładka wygląda na błąd).

### ⚪ `education.json` vs osiągnięcia — nazewnictwo stopnia
- `education.json`: *"Bachelor's degree"* (2020–2024).
- Osiągnięcie: *"Engineer's Degree"* (`inż.`, 2024-02).
  W PL to inżynier, po ang. raz "Bachelor's", raz "Engineer's" — do ujednolicenia w wersji EN.

---

## Skrót — co poprawić najpierw (🔴)

1. `bit2024.md`: "1rd"→"1st", `rank` (temat→miejsce), pusty `description`, zdublowany `url`.
2. `bit2025.md`: "1rd"→"1st" w `title`.
3. `skeleton-offense.md`: `teamSize` 1 → realna liczba (~4).
4. `work-experience.json`: nakładające się daty IT Silesia / Radicate.
