# TESTRAPPORT AI — Live Poker Handlog v2.7 Build 8.1

**Datum:** 20 augustus 2026  
**Basis:** Build 7.4

## 1. Diff
De functionele diff bestaat uit exact één verwijderde en één toegevoegde bronregel; inhoudelijk één vervanging in de effectieve `rHand()`. Geen versie-identificatie is aangepast, omdat de bouwinstructie expliciet een één-regel-diff vereist.

```diff
--- Live_Poker_Handlog_v2_7_Build7_4.html
+++ Live_Poker_Handlog_v2_7_Build8_1.html
@@ -11150,7 +11150,7 @@
  const body=(renderers[w.step]||v27Config)();
  const historical=d1Historical();
  const title=UI.editTx?'Opgeslagen hand bewerken':(UI.hid?'Hand bewerken':'Nieuwe hand');
- const historyBody=historical?`<div class="v275-history-note"><b>Eerdere stap bekijken</b>Je bekijkt bestaande invoer. Alleen 'Bewerken vanaf deze stap' mag de hand vanaf dit checkpoint wijzigen.</div><div class="d1-historical">${d11ReadonlyBody(body)}</div>${d2BranchBox()}`:body;
+ const historyBody=d26HistoryBody(body);
  const footer=historical?d1NavFooter():(v275IsSetupStep(w.step)?v27SetupFooter(w.step):d1NavFooter());
  const close=UI.editTx?d2CloseModal():(w.closePrompt?`<div class="wz-close-dialog"><div class="wz-close-card"><h1>Handregistratie verlaten?</h1><p class="compact">Wat wil je met deze onvoltooide hand doen?</p><button class="btn" data-wz-close-save>Concept bewaren</button><button class="btn danger" data-wz-close-delete>Concept verwijderen</button><button class="btn sub" data-wz-close-cancel>Doorgaan met registreren</button></div></div>`:'');
  return`<div class="top"><h1 class="wz-top-title">${title}</h1><button class="back wz-close" data-wz-close aria-label="Handregistratie sluiten">✕</button></div>${d2TransactionBanner()}${wzSteps()}${historyBody}${footer}${close}${d2ConfirmModal()}`;

```

## 2. Renderkoppeling §3.1
| Test | Scenario | Verwacht/controle | Resultaat |
|---|---|---|---|
| RC01 | historisch zonder pencil | no-pencil tekst + branchknop | PASS |
| RC02 | historisch met A/B pencil | enhanced markup + penciltekst + branchknop | PASS |
| RC03 | historisch finish | penciltekst; geen branchknop door finish-conditie | PASS |
| RC04 | live | d26HistoryBody retourneert body wanneer !d1Historical() | PASS |


Deze controles zijn op bron-/compositorniveau uitgevoerd. Een echte DOM/browserklik is niet als PASS geclaimd.

## 3. Klasse A §3.2
| Test | Veld | Controle | Resultaat |
|---|---|---|---|
| A01 | handDate | open/cancel/commit handlers en data-attributen intact | STATIC PASS |
| A02 | villainName | villainIdentity editor/commitroute intact | STATIC PASS |
| A03 | handNote finish | finish-specifieke inline editorlaag intact | STATIC PASS |


De editor-, cancel- en commitroutes zijn broninhoudelijk ongewijzigd en nu weer bereikbaar via de compositor. Zonder browserruntime kan deep-equal gedrag van daadwerkelijke DOM-interactie niet fysiek worden bewezen; daarom staat hier **STATIC PASS** en volgt Android-validatie.

## 4. Klasse B §3.3
| Test | Veld | Controle | Resultaat |
|---|---|---|---|
| B01 | heroCards | card open/confirm/cancel/close handlers intact | STATIC PASS |
| B02 | winners/outcome finish | result open/confirm/cancel/rollback/apply handlers intact | STATIC PASS |


Ook hier zijn de bestaande bronroutes reconnect; daadwerkelijke klik/cancel/rollback wordt fysiek gevalideerd.

## 5. Klasse C §3.4
| Test | Scenario | Controle | Resultaat |
|---|---|---|---|
| C01 | config branch | data-d2-edit-here + d2BeginBranch/rebuild route ongewijzigd | PASS |
| C02 | action branch | zelfde effectieve D2-route ongewijzigd | PASS |


De D2-branchroute is niet gewijzigd.

## 6. Fold/holecards §3.5
| Test | Scenario | Resultaat |
|---|---|---|
| FOLD-CARDS-01 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-02 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-03 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-04 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-05 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-06 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-07 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |
| FOLD-CARDS-08 | Scenario-definitie ontbreekt in beschikbare bestanden | NIET UITVOERBAAR |


Het in de instructie genoemde bestand `AANVULLENDE_INPUT_Build8_1_Bekende_Holecards_vs_Showdown.md` is niet aanwezig in de huidige uploads en kon ook niet in de File Library worden gevonden. De acht scenario's zijn daarom niet gereconstrueerd uit aannames. `showdownLines()` en de relevante winner/pokerbron zijn byte-identiek gebleven, maar dat vervangt de gevraagde expliciete matrix niet.

## 7. Build-7 regressiepoort §3.6
| Groep | Resultaat | Status |
|---|---|---|
| VAL | 18/18 | PASS |
| STR | 6/6 | PASS |
| MAX | 9/9 | PASS |
| CALL | 7/7 | PASS |
| POT | 9/9 | PASS |
| AS | 6/6 | PASS |
| RIGHTS | 5/5 | PASS |
| ORD | 7/7 | PASS |
| UB | 6/6 | PASS |
| E2E | 1/1 | PASS |


**Totaal: 74/74 PASS.** De functies `analyze`, `wzInitialStreetState`, `wzReplayStreet`, `wzLegalActions`, `wzApply`, `wzStreetStartStack`, `wzRemainingStack`, `wzTotalContribution`, `renderReportCanvas` en `showdownLines` zijn byte-identiek aan Build 7.4.

## 8. Syntax
`node --check`: **PASS**

## 9. Besluit
**TECHNISCH GO VOOR FYSIEKE VALIDATIE, formeel nog geen volledige Build-8.1 GO** omdat §3.5 niet exact uitvoerbaar was zonder het genoemde aanvullende testdocument. De één-regel-fix zelf en Build-7-regressiepoort zijn groen.
