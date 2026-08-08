# BOUWINSTRUCTIE — Live Poker Handlog v2.6 RC8 Build 14

## Doel
Herstel uitsluitend reviewpunt P1: cashgame-acties met waardetype BB worden in `analyze()` fout omgerekend wanneer de big blind niet 1 valuta-eenheid is.

## Basis
`Live_Poker_Handlog_v2.6_RC8_Build13_KMB_Mobiele_Invoer_BBA_Sync.html`

## Oorzaak
`wzUnitToBase()` bevat reeds de correcte cashgameconversie `unit === 'bb' ? n * bb : n`, maar `toBase()` in de pot-engine retourneert voor een cashgame-BB-actie alleen `n`.

## Wijziging
Maak `toBase()` consistent met `wzUnitToBase()`:
- `%` blijft potpercentage;
- cash + `bb` => `n * bb`;
- cash + valuta => `n`;
- toernooi + `chips` => `n / bb`;
- overige toernooiunits blijven ongewijzigd.

## Harde regressiegrens
Niet wijzigen: uncalled-bet-logica, stackbegrenzing, straddles, tournament/BBA, K/M/B, tafelvisual, actieve/inactieve seats en PWA.
