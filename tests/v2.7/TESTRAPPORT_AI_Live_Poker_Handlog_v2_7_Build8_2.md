# TESTRAPPORT AI --- Live Poker Handlog v2.7 Build 8.2

## Basis

-   Basisbuild: `Live_Poker_Handlog_v2_7_Build8_1.html`
-   Doelbuild: `Live_Poker_Handlog_v2_7_Build8_2.html`
-   Bouwinstructie: `Bouwinstructie_Build8_2_Potloodfixes.md`

## Uitgevoerde wijzigingen

1.  `d26EnhanceHistoricalCardGroups()` zoekt het kaartlabel nu terug
    vanaf de concrete `.cardrow` via `previousElementSibling`.
2.  `d26InlineAHistoryBody()`: `players` → `v27HeroInfo` voor
    `heroStackQualifier`.
3.  De verouderde basisimplementatie van `villainIdentity` is verwijderd
    en vervangen door één `DODE CODE`-marker. De F6-route is daarmee de
    enige actieve identity-editor.
4.  `d26MoveHistoricalEditTools()`: `players` → `v27HeroInfo`.
5.  `f6ReplaceHistoricalEditors()`: `players` → `v27VillainInfo`.
6.  De hint in `rPicker()` is uitgebreid conform §4.2.
7.  De twee onbereikbare `toast(decision.message,3200)`-regels zijn
    gemarkeerd als `DODE CODE`; er is geen andere interactieve
    invoerroute gevonden die de voorafgaande `disabled`-blokkade
    omzeilt.

## Keuze §2.3

Gekozen: **verwijderen en vervangen door een `DODE CODE`-marker**. De
F6-variant is de aangewezen, rijkere implementatie. Het laten staan van
de oude implementatie zou onnodige parallelle code behouden.

## Verificatie §4.3

Voor gewone kaarten zijn de aanroepen van `d26ApplyExplicitCardChoice()`
afkomstig uit picker-clickroutes. Die picker schakelt verboden
rank/suit-keuzes vooraf uit. Voor runout geldt hetzelfde via
`rc7RoundC5Picker()` en `d26RunoutCardChoiceBlocked()`. Er is geen
alternatieve interactieve route aangetroffen die een verboden keuze
zonder deze `disabled`-poort aanlevert. De twee 3200-ms-toastregels zijn
daarom gemarkeerd als dode code. De bereikbare
`displace-later-owner`-toast van 3600 ms is ongewijzigd gebleven.

## Testmatrix

### §1.3 --- positionering

  -----------------------------------------------------------------------
  ID                      Resultaat               Verificatie
  ----------------------- ----------------------- -----------------------
  POS01                   PASS (structureel)      Hero-kaartenrij zoekt
                                                  terug naar
                                                  `Mijn kaarten`.

  POS02                   PASS (structureel)      Villain-kaartenrij
                                                  zoekt terug vanaf de
                                                  eigen rij en niet meer
                                                  vanaf de paneelhost.

  POS03                   PASS (structureel)      Traversal start per
                                                  `.cardrow`; villains
                                                  delen geen globale
                                                  eerste labelquery meer.

  POS04                   PASS (structureel)      Dezelfde lokale
                                                  traversal geldt voor
                                                  flop/turn/river;
                                                  kaartkliklogica is niet
                                                  gewijzigd.
  -----------------------------------------------------------------------

### §2.4 --- stapnamen

  ----------------------------------------------------------------------------
  ID                      Resultaat               Verificatie
  ----------------------- ----------------------- ----------------------------
  STEP01                  PASS (structureel)      `heroStackQualifier` wordt
                                                  op `v27HeroInfo` opgebouwd
                                                  en F3G3 herpositioneert op
                                                  dezelfde stap.

  STEP02                  PASS (structureel)      F6 identity-route is actief
                                                  op `v27VillainInfo`.

  STEP03                  PASS (structureel)      F6 note-route is actief op
                                                  `v27VillainInfo`.

  STEP04                  PASS (structureel)      F6 loopt per
                                                  `.subpanel`/villain-index.

  STEP05                  PASS                    Oude basis-identity-editor
                                                  verwijderd.
  ----------------------------------------------------------------------------

### §3 --- alle Klasse A/B-velden

  --------------------------------------------------------------------------
  ID                      Veld                    Resultaat
  ----------------------- ----------------------- --------------------------
  ALL-A01                 handDate                PASS (route
                                                  aanwezig/ongewijzigd)

  ALL-A02                 heroStackQualifier      PASS (herstelde staproute)

  ALL-A03                 villainIdentity         PASS (F6-route hersteld)

  ALL-A04                 villainNote             PASS (F6-route hersteld)

  ALL-A05                 handNote                PASS (route
                                                  aanwezig/ongewijzigd)

  ALL-A06                 bountyWon               PASS (route
                                                  aanwezig/ongewijzigd)

  ALL-A07                 bountyCount             PASS (route
                                                  aanwezig/ongewijzigd)

  ALL-B01                 heroCards               PASS (route aanwezig;
                                                  positioneringsregressie)

  ALL-B02                 villainCards (1)        PASS (lokale
                                                  labeldetectie)

  ALL-B03                 villainCards (2+)       PASS (lokale detectie per
                                                  cardrow)

  ALL-B04                 flopCards               PASS (route/ongewijzigd)

  ALL-B05                 turnCard                PASS (route/ongewijzigd)

  ALL-B06                 riverCard               PASS (route/ongewijzigd)

  ALL-B07                 runoutCards             PASS (route/ongewijzigd)

  ALL-B08                 winners                 PASS (route/ongewijzigd)

  ALL-B09                 outcome                 PASS (route/ongewijzigd)

  ALL-B10                 manualPotOverride       PASS (route/ongewijzigd;
                                                  zware validatie niet
                                                  aangepast)
  --------------------------------------------------------------------------

De PASS-statussen hierboven zijn bron-/renderroutevalidaties; geen
fysieke Android-touchtest.

### §4.5 --- pickerhint

  --------------------------------------------------------------------------------
  ID                      Resultaat               Verificatie
  ----------------------- ----------------------- --------------------------------
  NOTE01                  PASS                    Uitgebreide tekst staat in
  Hero/Villain/board                              `rPicker()`, eerste twee zinnen
                                                  exact behouden.

  NOTE01 runout           **FAIL /                Runout gebruikt feitelijk
                          instructieconflict**    `rc7RoundC5Picker()`. §4.4
                                                  verbiedt wijziging buiten de
                                                  tekst in `rPicker()`.

  NOTE02                  PASS (structureel)      `displace-later-owner`-melding
                                                  en displacementlogica
                                                  ongewijzigd.

  NOTE03                  PASS (structureel)      `disabled`-logica ongewijzigd.
  --------------------------------------------------------------------------------

## Regressie §5

De diff raakt uitsluitend de voorgeschreven render-/hintregels en
dode-code-documentatie. `wzReplayStreet`, `wzInitialStreetState`,
`wzApply`, `wzLegalActions`, `analyze()` en `classifyHistoricalEdit()`
zijn inhoudelijk ongewijzigd. `D26_FIELD_RULES`, kaartdisplacementlogica
en de zware potoverride-validatie zijn niet gewijzigd.

De genoemde
VAL/STR/MAX/CALL/POT/AS/raise-rechten/ORD/UB/E2E/RC/FOLD-CARDS-fixtures
zijn niet als zelfstandig uitvoerbare testsuite in de HTML aangetroffen.
Daarom claimt dit rapport niet dat die fixtures opnieuw runtime zijn
uitgevoerd; de regressieborging is diff-/bron-gebaseerd.

## Syntax

`node --check` op de exact uit de HTML geëxtraheerde inline JavaScript:
**PASS**. Node 22 accepteert `--check` niet rechtstreeks op `.html`.

## GO/NO-GO

**NO GO volgens de letterlijke Build-8.2-acceptatiecriteria.**

NOTE01 verlangt de uitgebreide hint óók in de runoutpicker, terwijl §4.4
expliciet voorschrijft dat alleen `rPicker()` mag worden gewijzigd. De
bron toont dat runout een afzonderlijke `rc7RoundC5Picker()` gebruikt.
De potloodfixes zelf zijn technisch gereed; het resterende punt is een
inconsistentie in de bouwinstructie.
