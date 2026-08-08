# AI-testinstructies — Live Poker Handlog v2.6 RC6

## Doel

Voer een volledige heracceptatie- en regressietest uit op RC6. Besteed primair aandacht aan de in RC5a geconstateerde releaseblokkerende problemen.

## Bestanden

- `Live_Poker_Handlog_v2.6_RC6.html`
- `CHANGELOG_Live_Poker_Handlog_v2.6_RC6.md`

## Werkwijze

Maak strikt onderscheid tussen:

1. statische analyse;
2. zelfstandig uitvoerbare runtimetests;
3. niet-uitvoerbare handmatige tests.

Classificeer iedere bevinding als Kritiek, Hoog, Middel of Laag. Vermeld testcase, verwacht resultaat, werkelijk resultaat, reproduceerbaarheid en hersteladvies.

## Verplichte tests

### 1. Startup en algemene navigatie

- App opent zonder uncaught JavaScript-fouten.
- Nieuwe cashgamehand en nieuwe toernooihand kunnen van stap 1 naar stap 2.
- In de wizard staat bovenaan geen knop **Vorige stap** meer.
- Onderin staat één navigatiebalk met **Vorige stap** en **Volgende stap**.

### 2. Sluiten en conceptbeheer

Test het kruisje in minimaal stap 1, stap 2 en tijdens actie-invoer.

Verwacht:

- keuzevenster verschijnt;
- Concept bewaren keert terug naar de sessie en bewaart alle data;
- Concept verwijderen verwijdert de hand;
- Doorgaan met registreren sluit alleen het venster;
- heropenen van een concept hervat op de opgeslagen stap.

### 3. Reguliere cashgame-straddle

Scenario 9-handed, €1/€2, reguliere straddle UTG €5:

- kies CO als eerste vrijwillige actor;
- automatische folds mogen uitsluitend gewone posities vóór CO bevatten;
- UTG-straddler mag niet automatisch folden;
- na CO en latere spelers moeten SB, BB en UTG-straddler expliciet handelen wanneer zij nog actie hebben;
- controlekaart bevat de expliciete actie van de straddler;
- impliciete folds staan niet in het definitieve report.

Herhaal met twee straddles en controleer dat beide straddlers actief blijven.

### 4. BTN-straddle

Test met SB actief:

- het scherm voor eerste vrijwillige actor verschijnt niet;
- de actie-invoer start direct bij SB.

Test met `SB n.v.t.`:

- het scherm voor eerste vrijwillige actor verschijnt niet;
- de actie-invoer start direct bij BB.

### 5. Postflopstatus

Registreer preflop expliciete en impliciete folds.

Verwacht op flop, turn en river:

- gefolde spelers verschijnen niet meer als actor;
- gefolde spelers verschijnen niet in de straatcontrole;
- all-inspelers verschijnen niet als actor, maar blijven zichtbaar als actieve handdeelnemer;
- alleen nog actieve, niet-all-inspelers doorlopen de actiequeue.

### 6. Startstackvalidatie

Laat de verplichte Hero-startstack leeg en klik op **Volgende stap**.

Verwacht:

- rode foutmelding onder het veld;
- rode veldmarkering;
- focus op het veld;
- geen stapovergang.

Vul daarna een geldige waarde in en controleer dat de fout verdwijnt en doorgaan mogelijk is.

### 7. Tafelvisual

Controleer bij cashgame en toernooi:

- SB-, BB- en straddlemarkers staan op het vilt;
- BB en BBA overlappen niet;
- markers verdwijnen niet onder seatknoppen;
- weergave blijft bruikbaar bij 6-, 8-, 9- en 10-handed.

### 8. Hand afronden

Bij showdown met twee resterende spelers:

- sectie **Uitkomst** toont `1 winnaar` en `Chop`;
- sectie **Selecteer winnaar(s)** is visueel afzonderlijk;
- `1 winnaar` accepteert precies één speler;
- `Chop` vereist minimaal twee spelers;
- alleen spelers die de hand nog niet hebben gefold zijn selecteerbaar.

Test daarnaast automatische winnaar wanneer alle andere spelers folden.

### 9. BBA en SB n.v.t.

- BBA volgt de BB automatisch zolang BBA actief is.
- BBA en BB blijven afzonderlijk zichtbaar.
- `SB n.v.t.` wijzigt de visual direct.
- SB wordt niet in de preflopqueue geplaatst wanneer `SB n.v.t.` actief is.

### 10. Potengine-regressie

Bevestig minimaal de bekende cashgamefixtures:

- raise naar €6, 3-bet naar €20, fold → €13;
- raise naar €6, call, 3-bet naar €20, folds → €19;
- raise naar €6, 3-bet naar €20, 4-bet naar €50, fold → €41.

Controleer daarnaast dat forced bets en straddles financieel in de pot blijven zonder de vrijwillige actiesequence te vervangen.

### 11. Chipnotatie

Controleer centrale weergave:

- 999 → 999;
- 1.000 → 1K;
- 1.500 → 1,5K;
- 85.000 → 85K;
- 1.000.000 → 1M;
- maximaal twee decimalen.

## Niet handmatig opnemen

Clipboard, WhatsApp-deeplink, native share en afbeelding delen/downloaden hoeven niet handmatig te worden getest, omdat deze onderdelen in RC6 niet zijn gewijzigd.

## Oplevering

Lever een downloadbaar Markdown-rapport met:

- samenvatting;
- geslaagde tests;
- afgekeurde tests;
- niet-uitgevoerde tests;
- bevindingen met ernstclassificatie;
- releaseadvies: GO, GO onder voorwaarden of NO GO.
