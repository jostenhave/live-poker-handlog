# Changelog – Live Poker Handlog v2.6 RC4a

**Datum:** 29 juli 2026  
**Type:** technische herstelrelease  
**Basis:** Live Poker Handlog v2.6 RC4

## Doel

RC4a herstelt de startupblokkade uit RC4 zonder de functionele scope van RC4 uit te breiden.

## Opgelost

- De zelf-refererende overrideconstructies uit RC4 zijn vervangen door veilige functie-expressies.
- De volgende RC4-uitbreidingen verwijzen niet langer door JavaScript-hoisting naar zichzelf:
  - `render`;
  - `newHand`;
  - `editHand`;
  - `wzSave`;
  - `rNewSession`;
  - `rSession`;
  - `wzTable`;
  - `streetText`;
  - `wzPlayers`.
- De fout `RangeError: Maximum call stack size exceeded` bij het initialiseren van de app is daarmee technisch weggenomen.
- Versieaanduidingen zijn gewijzigd naar **v2.6 RC4a**.
- RC4a is toegevoegd aan de interne release notes.

## Behouden uit RC4

Alle RC4-functionaliteit is inhoudelijk behouden, waaronder:

- conceptstatus en automatisch tussentijds opslaan;
- hervatten van concepthanden;
- 10-, 9-, 8- en 6-handed ondersteuning;
- automatische Big Blind Ante;
- wijzigbare villainseat;
- postflopfiltering van gefolde en all-in spelers;
- actiekaart met `Vorige actie`;
- niet-interactieve tafeloverlay via `👁 Toon tafel`;
- straatcontrole en herinvoer;
- gekleurde kaartnotatie in controleschermen en report.

## Technische controles

- JavaScript-syntaxcontrole met `node --check`: **geslaagd**.
- Statische controle op de in RC4 vastgestelde combinatie van functie-alias + gelijknamige gehoiste functiedeclaratie: **geslaagd**.

## Niet gewijzigd

- Geen nieuwe features toegevoegd.
- Geen wijzigingen aan het dataschema.
- Geen wijzigingen aan bestaande opgeslagen gebruikersdata.
- Geen PWA- of service-workerwijzigingen in deze herstelrelease.
