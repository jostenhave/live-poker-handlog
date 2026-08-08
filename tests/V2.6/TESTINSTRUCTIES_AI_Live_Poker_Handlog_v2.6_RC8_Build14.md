# TESTINSTRUCTIES AI — Live Poker Handlog v2.6 RC8 Build 14

## Doel
Bevestig uitsluitend de cashgame-BB-unitfix en regressiegrens.

## Statisch
1. `toBase()` moet cash + `bb` als `n * bb` behandelen.
2. Cash valuta blijft `n`.
3. Tournament `chips` blijft `n / bb`.
4. `wzUnitToBase()` moet dezelfde cash-BB-betekenis hebben.
5. JavaScript syntaxcheck.

## Verplichte potfixtures
- €1/€1 raise 6 → 3bet 20 → fold = 13.
- €1/€1 raise 6 → call → 3bet 20 → folds = 19.
- €1/€2 raise naar 3 BB → BB call → SB fold = 13.
- €2/€5 raise naar 3 BB → BB call → SB fold = 32.
- Minimaal één postflop actie in BB bij BB ≠ 1.
