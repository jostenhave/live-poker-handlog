# Changelog — Live Poker Handlog v2.5 RC4

Releasedatum: 26 juli 2026

## Opgelost

### RC3-001 — Ongecallde raises
- De pot-engine geeft het ongecallde deel van een raise nu correct terug aan de laatste aggressor.
- Een speler zonder blind houdt bij een ongecallde raise geen onterechte bijdrage in de pot.
- Small blind, big blind en straddles behouden alleen hun eigen verplichte bijdrage.
- Gedeeltelijk gecallde raises worden teruggebracht tot het werkelijk gematchte niveau.

## Verbeterd

### RC3-002 — Sessies-only import
- Iedere `villain.playerId` moet voorkomen in de spelerslijst van dezelfde sessie.
- Verwijzingen naar spelers uit een andere sessie of alleen uit de spelersbibliotheek worden afgewezen.
- Lege `playerId`-velden blijven toegestaan voor onbekende villains.

### RC3-003 — Hand-/sessierelaties
- Een hand met een afwijkende `sessionId` wordt bij import afgewezen.
- Een overeenkomende maar overbodige `sessionId` wordt tijdens migratie verwijderd.
- De bovenliggende sessie blijft de enige leidende sessierelatie.

## Technisch

- Versie bijgewerkt naar `v2.5 RC4`.
- HTML-titel en release notes bijgewerkt.
- JavaScript-syntaxis gecontroleerd.
- Gerichte regressiecontroles uitgevoerd op:
  - ongecallde openraises;
  - raises vanuit SB en BB;
  - raises met straddle;
  - raise-callscenario;
  - sessiegebonden `playerId`-validatie;
  - hand-/sessierelaties.

## Niet gewijzigd

RC4 bevat geen nieuwe v2.6-functionaliteit. De overige functionaliteit uit RC3 is ongewijzigd behouden.
