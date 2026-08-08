# TESTINSTRUCTIES AI — Live Poker Handlog v2.6 RC8 Build 13

## Statisch
1. APP_VERSION en title = Build 13.
2. Dedicated tournament SB/BB/BBA hebben `inputmode="text"`, niet `decimal`.
3. Parserfactoren K=1e3, M=1e6, B=1e9 ongewijzigd.
4. BB-commit schrijft bij actieve BBA exact naar `UI.draft.ante` én zichtbaar ante-element.
5. BBA-toggle synchroniseert huidige BB.
6. JavaScript syntaxcheck.

## Fysiek Android
A. Activeer BBA.
B. Typ SB `100,25B`.
C. Typ BB `200,55B`.
D. Controleer onmiddellijk dat BBA `200,55B` toont.
E. Wissel focus en controleer behoud.
F. Volgende → Terug → controleer behoud.
G. Tafel & spelers: controleer `100,25B`, `200,55B`, `BBA 200,55B`.
H. Historische bewerkmodus: controleer dezelfde waarden.

## Regressie
Controleer daarnaast één K- en één M-fixture.
