# TESTINSTRUCTIES RELEASE — Live Poker Handlog v2.6

## Status

De statische en geautomatiseerde controles worden vóór oplevering uitgevoerd. De release blijft **releasecandidate** totdat de fysieke PWA-update vanaf de geïnstalleerde RC9-baseline is geslaagd.

## Fysieke PWA-acceptatie

Uitgangspunt: de schone `v2.6 RC9 PWA Baseline` is geïnstalleerd.

1. Publiceer de definitieve v2.6-runtimebestanden.
2. Open de bestaande geïnstalleerde baseline-PWA.
3. Controleer dat bovenaan nog de baselineversie staat.
4. Controleer dat **Nieuwe versie beschikbaar** verschijnt.
5. Kies **Later bijwerken**.
6. Controleer dat de baselineversie actief blijft.
7. Sluit de PWA volledig en open opnieuw.
8. Controleer opnieuw dat de baseline actief blijft en de update opnieuw wordt aangeboden.
9. Kies **Nu bijwerken**.
10. Controleer dat één gecontroleerde reload volgt.
11. Controleer dat rechtsboven daarna alleen `v2.6 · 2026-08-09` staat.
12. Controleer dat bestaande testdata behouden is.
13. Sluit de PWA volledig.
14. Zet internet uit.
15. Open opnieuw en controleer dat v2.6 offline opent.

## Release-GO

GO wanneer alle bovenstaande punten slagen en de geautomatiseerde regressies groen zijn.
