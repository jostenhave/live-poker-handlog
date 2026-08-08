# Technisch voortgangsrapport – Live Poker Handlog v2.6 RC8 Build 6

## Doel
Visuele verfijning van cashgamechips op het felt, met nadruk op symmetrie, schaalbaarheid en overlapvrij renderen.

## Technische aanpak
- Build 5 is als basis behouden.
- De cashchip-layoutfunctie is overschreven met een deterministische **markerbaanbenadering**.
- De markerbaan gebruikt dezelfde racetrack-logica als de seat-baan, maar op kleinere afmetingen binnen het felt.
- Voor elke bijdrage wordt eerst een primair markerpunt bepaald.
- Alleen indien nodig wordt een kleine fallback toegepast om overlap te vermijden.
- De stippellijnberekening gebruikt nu de werkelijke seat→chipvector voor betere visuele uitlijning.

## Risico-inschatting
Laag tot middel:
- Alleen cashgamefelt-rendering aangepast.
- Geen wijziging in dataopslag, pokerengine of wizardflow.
- Wel aandacht nodig voor visuele regressie bij 6-, 8-, 9- en 10-handed scenario’s.

## Aanbevolen controle
- 10-handed cashgame met maximale straddleketen
- 9-handed cashgame
- 8-handed cashgame
- 6-handed cashgame
- Modal “Actuele tafelsituatie” en reguliere wizardweergave
