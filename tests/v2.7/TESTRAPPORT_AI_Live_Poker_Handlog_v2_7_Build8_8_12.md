# TESTRAPPORT AI --- Live Poker Handlog v2.7 Build 8.8.12

## Statische validatie

-   `interactive-widget=resizes-content`: PASS;
-   handmatige footerOffset verwijderd: PASS;
-   fixed footer blijft `bottom:0`: PASS;
-   keyboardpadding/scrollreserve behouden: PASS;
-   Build 8.8.9 companion behouden: PASS;
-   Build 8.8.11 historical cash scrollreserve behouden: PASS;
-   historical Startstack renderer ongewijzigd: PASS;
-   actionlogica ongewijzigd: PASS;
-   tafelvisual ongewijzigd: PASS;
-   `node --check`: PASS.

## Fysieke validatie vereist

Omdat de gedeelde footerroute wijzigt, is een gerichte regressietest op
meerdere schermen nodig.
