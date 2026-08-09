# Live Poker Handlog v2.6 — Release notes

**Releasedatum:** 9 augustus 2026

## Belangrijkste wijzigingen

- Vernieuwde verticale tafelvisual met duidelijke actieve en inactieve seats.
- Consistente chip-, blind-, straddle- en BBA-markers voor cashgames en toernooien.
- K/M/B-invoer voor grote toernooichipbedragen, inclusief Nederlandse decimale komma.
- Uitgebreide geleide actie-invoer met centrale betting state, all-inbewaking en structurele historische bewerking.
- Correcte cashgame-BB-conversie in de potengine bij big blinds groter dan 1.
- Robuustere verwerking van ongecallde inzetten, raises en forced contributions.
- Verbeterde rapportage voor afgeleide folds, winnaars, chops en villaininformatie.
- Nieuwe expliciete PWA-updateflow: een nieuwe versie wordt pas actief na **Nu bijwerken**.

## Bestaande beperking

Bij multiway all-ins met ongelijke stacks registreert de app één totale pot. Main pot en side pot(s) worden niet afzonderlijk aan verschillende winnaars toegewezen.

## Releasehistorie

De zichtbare releasehistorie in de app bevat vanaf deze release alleen definitieve versies. RC- en Build-entries van v2.5 en v2.6 zijn geconsolideerd onder respectievelijk `v2.5` en `v2.6`.
