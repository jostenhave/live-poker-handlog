# CHANGELOG — Live Poker Handlog v2.7 Build 4

**Datum:** 14 augustus 2026  
**Basis:** Live Poker Handlog v2.7 Build 3.1.4  
**Schema:** 12 — ongewijzigd

## Samenvatting

Build 4 vernieuwt de resultaat- en reportfase. Het report is beschikbaar in een **grijze standaardvariant** en een **blauw/navy alternatieve variant**. Schermreport en deelafbeelding gebruiken dezelfde centrale theme-architectuur en dezelfde centrale 4-color suit-tokens, zodat kleurwijzigingen niet meer afzonderlijk in DOM- en canvascode hoeven te worden onderhouden.

De bestaande effectieve winnaar-/chopflow is behouden. Er is geen nieuwe parallelle `wzFinish()`- of resultaatarchitectuur toegevoegd.

## 1. Twee reportthemes

Toegevoegd:

- `gray` — standaard/default;
- `blue` — alternatieve navy/blauwe variant.

De keuze staat in:

```js
DB.prefs.reportTheme
```

Geldige waarden:

```text
gray
blue
```

Ontbrekende of ongeldige oude prefs vallen terug op `gray`. Hiervoor is geen schemawijziging nodig.

## 2. Centrale kleurarchitectuur

Nieuwe centrale bron:

```js
REPORT_THEMES
```

Hier staan de themegebonden reportkleuren voor grijs en blauw/navy.

De 4-color kaartkleuren zijn niet opnieuw hardcoded in de reportlaag. Zowel schermreport als canvas lezen de reeds centrale designtokens:

```text
--suit-spade
--suit-heart
--suit-diamond
--suit-club
--suit-unknown
```

Daardoor hoeft een latere wijziging van bijvoorbeeld de ruitenkleur niet apart in het schermreport en het canvas te worden doorgevoerd.

Verwijderd uit de reportarchitectuur:

- zelfstandige `IMG_COL`-kleurmap;
- hardcoded groene canvasachtergrond `#134d37`;
- hardcoded groene `.wa`-reportachtergrond.

## 3. Schermreport herbouwd

Het oude groene tekstreport is vervangen door een compacte reportkaart met themevariabelen.

Toegevoegd:

- themegebonden pagina-/paneelachtergrond;
- themegebonden border, tekst, muted en accent;
- duidelijke sectieregels;
- compacte inline kaartvisuals;
- 4-color kaartachtergronden met witte rank/suitweergave.

Hero holecards, boardcards en bekende Villaincards die in de bestaande reporttekst voorkomen worden visueel als kaartcomponent weergegeven.

De bestaande `shareText()` blijft de canonieke tekstuele reportbron voor WhatsApp/clipboard en wordt niet vervangen door nieuwe pokerlogica.

## 4. Deel-/exportafbeelding herbouwd

`renderReportCanvas()` is expliciet aangepast als zelfstandig renderpad.

De exportafbeelding gebruikt nu:

- dezelfde geselecteerde reporttheme als het scherm;
- dezelfde centrale theme-tokens;
- dezelfde centrale 4-color suit-tokens;
- echte afgeronde kaartvormen met rank en suit;
- geen gekleurde monospace-kaartcodes meer als enige kaartpresentatie.

Grijs en blauw hebben dezelfde inhoud en kaartsemantiek, maar een eigen themeachtergrond/-border.

## 5. Theme-keuze in het deelscherm

In het deelscherm is een compacte keuze toegevoegd:

```text
Grijs | Blauw
```

De keuze:

- werkt direct door in het schermreport;
- wordt opgeslagen in prefs;
- wordt gebruikt door `shareImage()` / `renderReportCanvas()`;
- gebruikt geen afzonderlijke exporttheme-keuze.

## 6. Resultaatflow behouden

De effectieve bestaande `wzFinish()`- en `wzSave()`-keten is niet vervangen.

Gecontroleerd zijn onder meer:

- één Villain als winnaar → `outcome='lose'`, canonieke Villain-id in `winner`;
- Hero + Villain → `outcome='chop'`, `winner='chop'`, canonieke `winners` bewaard;
- Hero als enige live speler → automatische `outcome='win'`, `winner='hero'`.

Er is geen nieuwe resultaat-datalaag toegevoegd.

## 7. Bewuste regressiegrenzen

Ongewijzigd gehouden en bronmatig vergeleken met Build 3.1.4:

- `v27b21SyncAmountInput()`;
- `v27b31ApplyViewport()`;
- `v27b31ResetFooter()`;
- `cardHTML()`;
- `rPicker()`;
- `d26CardChoiceBlocked()`;
- `d26ApplyExplicitCardChoice()`;
- `d26ApplyClassBCardEdit()`;
- `setCard()`;
- `sortPair()`;
- `sortFlop()`;
- `usedCards()`;
- `analyze()`;
- `wzReplayStreet()`;
- `wzLegalActions()`;
- `wzApply()`;
- `rc8SeatGeometry()`;
- effectieve `shareText()`-wrapper.

De Build-3.1.4-regel voor zichtbaarheid van de volledige bedrag-editor boven de keyboardfooter is niet gewijzigd.

## 8. Potregressie

De bekende cashgamefixtures zijn opnieuw runtime gecontroleerd:

- raise €6 → 3-bet €20 → fold = **€13**;
- raise €6 → call → 3-bet €20 → folds = **€19**;
- raise €6 → 3-bet €20 → 4-bet €50 → fold = **€41**.

Alle drie PASS.

## 9. Technische validatie

- JavaScript syntax: **PASS**;
- gerichte report-/theme-/canvasbrowserharness: **19/19 PASS**;
- resultaatflow runtime: **3/3 scenario's PASS**;
- potfixtures: **3/3 PASS**;
- uncaught browsererrors in gerichte harness: **0**;
- `IMG_COL`: verwijderd;
- `#134d37`: niet meer aanwezig in de Build-4-bron;
- schema 12: ongewijzigd.

De wijzigingen ten opzichte van Build 3.1.4 zijn beperkt tot circa **106 toegevoegde en 10 verwijderde regels** in de HTML-bron, voornamelijk report-/theme-presentatie.

## 10. Buiten scope gebleven

Niet meegenomen:

- Light Mode-afronding;
- `newSession` / KO-bounty restpunt;
- minimumraise-/technische debtbouw;
- historische A/B/C-herbouw;
- algemene override-/listenerconsolidatie;
- PWA/publicatieproces;
- wijzigingen aan betting- of potengine.

## Status

**TECHNISCH GO VOOR FYSIEKE ANDROID/CHROME-ACCEPTATIE.**

Build 4 is pas definitief GO na fysieke validatie van:

1. resultaatflow;
2. grijs schermreport;
3. blauw schermreport;
4. een daadwerkelijke grijze deelafbeelding;
5. een daadwerkelijke blauwe deelafbeelding;
6. één regressiesmoke van de Build-3 keyboardflow.
