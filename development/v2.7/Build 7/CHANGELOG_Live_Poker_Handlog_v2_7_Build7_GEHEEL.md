# CHANGELOG — Live Poker Handlog v2.7 — Build 7 geheel

**Tussenchangelogs niet opgenomen.**

---

## Build 7.x — pokerlogica, minimumraise en regressie

## Build 7.1 — minimumraise-audit en bronverificatie

- Effectieve raise-/bettingstate-routes geaudit.
- `wzInitialStreetState()` / `wzReplayStreet()` gecontroleerd op minimumraise-increment.
- Meerdere dode/eerdere override-declaraties geïdentificeerd.
- Bronregel “laatste/effectieve declaratie is leidend” expliciet onderdeel van de werkwijze gemaakt.

## Build 7.2 — minimumraise en minimum-openingsbet afdwingen

- Confirm-handler valideert voortaan:
  - minimumraise;
  - minimum-openingsbet.
- Normale raise minimaal laatste volledige raise-increment.
- Short all-in blijft uitzonderingsroute.
- Zelfde validatie geldt bij opnieuw bewerken via review, omdat die door dezelfde actionconfirmroute loopt.
- Dode code gemarkeerd waar relevant.

## Build 7.3 — stack-/all-inregels

- Remaining-stack en street-start-stacklogica aangescherpt.
- All-ininvoer en legalitychecks verder getest.
- Short-all-in en raise-rechten verder afgedekt.

## Build 7.3.1 — potStart-/stackcorrectie

- Correctie op pot-/streetstart-context die bij bepaalde stack-/all-inscenario's verkeerd kon doorwerken.
- Gericht op bronoorzaak, zonder `analyze()`-potengine onnodig te herschrijven.

## Build 7.4 — vervolg stack-/actioncorrecties

- Verdere correcties op resterende stackberekeningen.
- Interactie tussen startstack, reeds ingelegde chips en volgende acties robuuster.

## Build 7.5 — eindregressie zonder geplande codewijziging

- Actorvolgorde integraal gecontroleerd.
- Uncalled-bet-regressies opnieuw gecontroleerd.
- Bestaande short-handed positionering geregressietest.
- Integrale Build-7-afsluiting.

---
