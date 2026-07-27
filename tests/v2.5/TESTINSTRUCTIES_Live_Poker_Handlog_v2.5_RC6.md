# Testinstructies — Live Poker Handlog v2.5 RC6

## 1. Opdracht

Voer een gerichte heracceptatie- en regressietest uit op:

`Live_Poker_Handlog_v2.5_RC6.html`

Doelen:

1. aantonen dat toernooiraisebedragen vanuit SB en BB via de zichtbare interface als totaalbedragen worden verwerkt;
2. aantonen dat bb- en chipinvoer gelijkwaardige potten opleveren;
3. aantonen dat Import Vervangen vooraf expliciet om bevestiging vraagt;
4. aantonen dat sessieconflicten bij Samenvoegen uitsluitend op sessie-ID worden bepaald;
5. bevestigen dat de cashgamepot-engine uit RC5 niet is beschadigd.

Wijzig de broncode niet.

## 2. Testmethoden

Maak onderscheid tussen statische analyse, geïsoleerde runtimetest, interactieve browsertest en niet-uitgevoerde test. Voor de releasebeslissing zijn de zichtbare browserflow en het opgeslagen/gedeelde rapport leidend.

## 3. Verplichte browserhertest — Regular MTT

Gebruik 9-handed, blinds 500/1.000.

### T-UI-01 — Zonder ante, invoer in bb

- Hero CO raise naar 2,5 bb.
- BB 3-bet naar 8 bb.
- Hero foldt.

Verwacht:

- SB 0,5 bb;
- Hero 2,5 bb;
- BB 2,5 bb blijft gematcht;
- 5,5 bb retour aan BB;
- eindpot **5,5 bb**.

Controleer live preview, opgeslagen hand, uitgebreid verslag, verkort verslag en opnieuw openen/bewerken.

### T-UI-02 — Zonder ante, invoer in chips

Zelfde lijn met 2.500 en 8.000 chips. Verwacht **5,5 bb**.

### T-UI-03 — Met 1 bb BBA, invoer in bb

Zelfde lijn met ante 1.000. Verwacht **6,5 bb**.

### T-UI-04 — Met BBA, invoer in chips

Zelfde lijn in chips. Verwacht **6,5 bb**.

## 4. Alle toernooivarianten

Herhaal T-UI-01 t/m T-UI-04 voor:

- Regular MTT;
- PKO;
- KO;
- Mystery Bounty.

Bountyvelden mogen de pot niet beïnvloeden.

## 5. Positievarianten

| ID | Scenario | Verwacht zonder BBA |
|---|---|---:|
| POS-01 | CO raise 2,5 bb, BB 3-bet 8 bb, CO fold | 5,5 bb |
| POS-02 | BTN raise 2,5 bb, SB 3-bet 8 bb, BTN fold | 5 bb |
| POS-03 | SB raise 2,5 bb, BB 3-bet 8 bb, SB fold | 5 bb |
| POS-04 | BB raise 2,5 bb, BTN 3-bet 8 bb, BB fold | 5,5 bb |
| POS-05 | Heads-up BTN/SB raise 2,5 bb, BB 3-bet 8 bb, BTN/SB fold | 5 bb |

## 6. Hogere raises

| ID | Scenario | Verwacht zonder BBA |
|---|---|---:|
| HR-01 | Raise 2,5 bb, call, squeeze 8 bb, folds | 8 bb |
| HR-02 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, fold | 16,5 bb |
| HR-03 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, call | 40,5 bb |
| HR-04 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, 5-bet 45 bb, fold | 40,5 bb |

Met BBA is iedere verwachting 1 bb hoger.

## 7. Cashgameregressie

| ID | Scenario | Verwacht |
|---|---|---:|
| CG-R01 | BTN raise €6, BB call | €13 |
| CG-R02 | BTN raise €6, BB 3-bet €20, BTN fold | €13 |
| CG-R03 | BTN raise €6, BB 3-bet €20, BTN 4-bet €50, BB fold | €41 |
| CG-R04 | Straddle €4, BTN raise €12, straddler 3-bet €40, BTN fold | €27 |

## 8. Import Vervangen

### IMP-R01 — Waarschuwing

Maak een volledige back-up, voeg `MOET VERDWIJNEN` toe, kies Vervangen en klik Import uitvoeren.

Verwacht vóór enige wijziging:

- benoeming van de te vervangen categorieën;
- melding dat eerst een veiligheidskopie wordt gemaakt;
- keuze Doorgaan/Annuleren.

### IMP-R02 — Annuleren

Verwacht:

- geen import;
- `MOET VERDWIJNEN` blijft bestaan;
- actieve data ongewijzigd;
- geen voltooidmelding.

### IMP-R03 — Doorgaan

Verwacht:

- veiligheidskopie;
- `MOET VERDWIJNEN` verdwijnt;
- back-upgegevens terug;
- app bruikbaar.

### IMP-R04 — Safety restore

Herstel de veiligheidskopie. Verwacht dat `MOET VERDWIJNEN` terugkomt.

## 9. Import Samenvoegen — sessie-ID

### IM-S01 — Zelfde naam, andere ID

Verwacht geen conflictmelding en beide sessies behouden.

### IM-S02 — Zelfde ID, gelijke inhoud

Verwacht geen conflictmelding, geen duplicaat en één sessie.

### IM-S03 — Zelfde ID, andere inhoud

Verwacht conflictmelding. Test zowel geïmporteerde sessie gebruiken als lokale sessie behouden.

### IM-S04 — Zelfde naam en inhoud, andere ID

Verwacht geen conflictmelding en twee afzonderlijke sessies.

Neem de concrete IDs op in het rapport.

## 10. Overige regressiesmoke

Test opstart, versie, release notes, hand opslaan/bewerken, zeven exportcombinaties, safety download, spelersbibliotheek, villainkoppeling, turn-/river-validatie, Emergency Mode-opslagscheiding, kopiëren en afbeelding genereren.

## 11. Acceptatiecriteria

RC6 krijgt alleen GO wanneer:

- alle T-UI-tests exact kloppen;
- alle vier toernooivarianten gelijk rekenen;
- bb- en chipinvoer gelijkwaardig zijn;
- cashgameregressie slaagt;
- Vervangen vooraf waarschuwt;
- Annuleren geen gegevens wijzigt;
- sessieconflicten uitsluitend op ID ontstaan;
- geen kritieke of hoge regressie wordt gevonden.

## 12. Rapportage

Lever een downloadbaar Markdown-rapport met managementsamenvatting, testomgeving, browserhertest, resultaten per toernooivariant, importbevestiging, sessie-ID-conflicten, cashgameregressie, afgekeurde en niet-uitgevoerde tests, bevindingen en GO / GO onder voorwaarden / NO GO.
