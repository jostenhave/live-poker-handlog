# TESTRAPPORT AI --- Live Poker Handlog v2.7 Build 8.6

## Implementatiekeuze

`heroStartStack` en `villainStartStack` blijven Klasse C. Aan beide
regels is uitsluitend `special:'startstack-conditional'` toegevoegd.

De lichte route gebruikt een afzonderlijke state/commitroute en roept
**niet** `d26ApplyClassAEdit()`, `d2BeginBranch()`,
`getDownstreamInvalidation()` of `rebuildFromCheckpoint()` aan.

## All-in-detectie

Nieuwe helper:

``` js
function d26ActorWentAllIn(actor){
 actor=d26StartStackActor(actor);
 const streets=['pf','flop','turn','river'];
 return streets.some(st=>wzReplayStreet(st).actors[actor]?.status==='allin');
}
```

`hero` wordt alleen aan de grens genormaliseerd naar de bestaande
replay-actornaam `ik`; Villains gebruiken hun bestaande `v.pos`.

De effectieve, ongewijzigde `wzReplayStreet()` bevat zowel de expliciete
all-in/jam-verwerking als de bestaande statuszetting wanneer contributie
de bekende stack bereikt. Daarmee gebruikt STARTSTACK-06 dezelfde bron
als de pokerengine en geen nieuwe parallelle all-inberekening.

## Databronveld en stackMode

De directe mutatie volgt exact de bestaande dubbele stackrepresentatie:

-   **Cash:** de invoer muteert `heroStackChips` respectievelijk
    `v.stackChips`.
-   **Toernooi + `stackMode==='chips'`:** muteert `heroStackChips` /
    `v.stackChips`; voor de ondergrens wordt de invoer via `bb`
    omgerekend naar de BB-basiseenheid van `wzTotalContribution()`.
-   **Toernooi + `stackMode==='bb'`:** muteert `heroStackBB` /
    `v.stackBB`; de ondergrens staat al in dezelfde BB-basiseenheid.

Na mutatie worden de bestaande `syncHeroStack()` respectievelijk
`syncVStack()` aangeroepen zodat de secundaire chips/BB-representatie
synchroon blijft.

## Ondergrens

`d26ActorLastActedStreet()` bepaalt de laatste straat met een
geregistreerde actie. `d26StartStackFloor()` gebruikt daarna
rechtstreeks de bestaande `wzTotalContribution(actor,last)`.

Letterlijke foutmelding bij onderschrijding: \> Deze waarde is lager dan
wat al is ingezet in deze hand.

Bij gelijkheid (`newValue === floor`) wordt niet geweigerd.

## Testmatrix

  -----------------------------------------------------------------------------
  Test-ID                 Resultaat               Verificatie
  ----------------------- ----------------------- -----------------------------
  STARTSTACK-01           PASS structureel        Hero zonder all-in krijgt
                                                  potlood; open stand toont de
                                                  voorgeschreven tekst en
                                                  commit muteert direct zonder
                                                  rebuild.

  STARTSTACK-02           PASS structureel        Villain zonder all-in krijgt
                                                  dezelfde conditionele route
                                                  op basis van `v.pos`.

  STARTSTACK-03           PASS structureel        `base < floor` toont exact
                                                  tekst 2 en retourneert
                                                  `false` vóór mutatie.

  STARTSTACK-04           PASS structureel        De check is strikt `<`; exact
                                                  op de ondergrens is
                                                  toegestaan.

  STARTSTACK-05           PASS structureel        `d26ActorWentAllIn()`
                                                  gebruikt de replaystatus; bij
                                                  `allin` wordt geen potlood
                                                  gerenderd.

  STARTSTACK-06           PASS bronvalidatie      De helper gebruikt
                                                  uitsluitend
                                                  `wzReplayStreet()`. De
                                                  effectieve replayfunctie
                                                  bevat de bestaande impliciete
                                                  all-instatus bij contributie
                                                  == bekende stack; deze
                                                  functie is byte-ongewijzigd.

  STARTSTACK-07           PASS regressie          Klasse-C-regels/checkpoints
                                                  blijven bestaan;
                                                  rebuildfuncties zijn
                                                  byte-ongewijzigd.

  STARTSTACK-08           PASS regressie          Bestaande Klasse A/B-routes
                                                  zijn niet gewijzigd; de
                                                  nieuwe route gebruikt eigen
                                                  data-attributen.

  STARTSTACK-09           PASS bronregressie      Alle opgegeven
                                                  pokerlogicafuncties zijn
                                                  byte-ongewijzigd.
  -----------------------------------------------------------------------------

## Beschermde functies

Byte-inhoudelijk ongewijzigd: - `wzReplayStreet` -
`wzInitialStreetState` - `wzApply` - `wzLegalActions` - `analyze` -
`classifyHistoricalEdit` - `getDownstreamInvalidation` -
`rebuildFromCheckpoint` - `wzTotalContribution` -
`decideCardDisplacement` - `f63ResultSummary` - `f64ResultLabel`

## Versie

-   `<title>`: Live Poker Handlog v2.7 Build 8.6
-   `APP_VERSION`: v2.7 Build 8.6
-   `VERSION`: v2.7 Build 8.6 · 2026-08-21

## Syntax

`node --check`: **PASS**.

## Status

**GO voor fysieke acceptatie.**
