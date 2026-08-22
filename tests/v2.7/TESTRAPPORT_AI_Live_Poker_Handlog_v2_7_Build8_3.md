# TESTRAPPORT AI --- Live Poker Handlog v2.7 Build 8.3

## Onderdeel A --- stackMode als Klasse A

### DOM-verificatie

De actuele v2.7-DOM is vóór de wijziging expliciet gecontroleerd.

**Hero toernooi** `data-v27-hero-stack-mode` staat uitsluitend in de
toernooivariant binnen `.stack-grid.v27b22-hero-stack-row`. Cash rendert
alleen `data-v27-hero-stack` en dus geen unit-select.

**Villain toernooi** `data-v27-vstack-mode="{i}"` staat uitsluitend in
de toernooivariant binnen `.stack-grid`. De effectieve historische
Villain-laag is `f6ReplaceHistoricalEditors()` met één
`.v27-villain-info` en `UI.wz.v27VillainIndex`. Daarom is de
Villain-wiring daar geplaatst, ná de bestaande F6-opschoning van
identity-tools. Zo wordt het nieuwe potlood niet door die opschoning
verwijderd.

### Testmatrix

  -----------------------------------------------------------------------------
  Test                    Resultaat               Verificatie
  ----------------------- ----------------------- -----------------------------
  STACKUNIT-01            PASS structureel        `heroStackUnit` is Klasse
                                                  A/checkpoint hero; potlood
                                                  hangt aan de werkelijk
                                                  aanwezige
                                                  `data-v27-hero-stack-mode`;
                                                  save muteert
                                                  `UI.draft.stackMode`.

  STACKUNIT-02            PASS structureel        `villainStackUnit` is Klasse
                                                  A/checkpoint players; potlood
                                                  gebruikt actuele
                                                  `v27VillainIndex`; save
                                                  muteert `v.stackMode`.

  STACKUNIT-03            PASS                    Cash-DOM bevat geen
                                                  stack-mode-select, dus de
                                                  wiring doet niets en toont
                                                  geen potlood.

  STACKUNIT-04            PASS regressie          `heroStackQualifier`, F6
                                                  `villainIdentity` en
                                                  `villainNote` zijn niet
                                                  inhoudelijk vervangen.
  -----------------------------------------------------------------------------

## Onderdeel B --- bountyhoogte uitfaseren

`ownBountyValue` is verwijderd uit `D26_FIELD_RULES` en
`D26_CLASS_A_FIELDS`. De live hero-/villain-bountymechanismen, de twee
specifieke historische enhancement-aanroepen en de drie resterende
`ownBountyValue`-applyroutes zijn gemarkeerd als **DODE CODE --- v2.8**
en niet verwijderd.

  -----------------------------------------------------------------------
  Test                    Resultaat               Verificatie
  ----------------------- ----------------------- -----------------------
  BOUNTY-01               PASS regressie          Geen code toegevoegd om
                                                  oude live
                                                  bountyhoogtevelden
                                                  opnieuw zichtbaar te
                                                  maken.

  BOUNTY-02               PASS                    `ownBountyValue` is
                                                  geen bekend
                                                  Klasse-A-veld meer;
                                                  `d26ApplyClassAEdit`
                                                  weigert deze route.

  BOUNTY-03               PASS                    `bountyWon`
                                                  classifierregel en
                                                  historische
                                                  enhancement-aanroep
                                                  zijn ongewijzigd
                                                  actief.

  BOUNTY-04               PASS                    `bountyCount`
                                                  classifierregel en
                                                  historische
                                                  enhancement-aanroep
                                                  zijn ongewijzigd
                                                  actief; rapportcode is
                                                  niet geraakt.
  -----------------------------------------------------------------------

**Expliciet:** `bountyWon` en `bountyCount` zijn niet uitgefaseerd en
niet functioneel gewijzigd.

## Onderdeel C --- aliassen

  Test                                            Resultaat
  ----------------------------------------------- -----------
  ALIAS-01 `sbNA → sbNotApplicable`               PASS
  ALIAS-02 `bbaEnabled → bbaActive`               PASS
  ALIAS-03 `runoutFrom → runoutFromStreet`        PASS
  ALIAS-04 `heroStackMode → heroStackQualifier`   PASS

## Beschermde functies

-   `wzReplayStreet`: PASS
-   `wzInitialStreetState`: PASS
-   `wzApply`: PASS
-   `wzLegalActions`: PASS
-   `analyze`: PASS
-   `classifyHistoricalEdit`: PASS
-   `decideCardDisplacement`: PASS
-   `f63ResultSummary`: PASS
-   `f64ResultLabel`: PASS
-   `d26ApplyClassBResultEdit`: PASS

## Versiecontrole

-   `<title>` = `Live Poker Handlog v2.7 Build 8.3`
-   `APP_VERSION` = `v2.7 Build 8.3`
-   `VERSION` = `v2.7 Build 8.3 · 2026-08-21`

## Syntax

`node --check`: **PASS**.

## Status

**GO voor fysieke acceptatie.**
