# Changelog – Live Poker Handlog v2.6 RC5a

**Datum:** 29 juli 2026  
**Type:** herstelrelease op RC5

## Opgelost

### RC5-001 – Wizard bleef geblokkeerd op Stap 1
- De vroeg geregistreerde capture-listener die iedere klik op `Volgende stap` onderschepte, is verwijderd.
- Er is nog één RC5a-eigenaar voor de voorwaartse wizardnavigatie.
- Na geldige invoer van SB en BB opent `Volgende stap` nu **Stap 2 – Tafel & spelers**.
- Dezelfde overgang geldt voor cashgames en alle toernooivarianten.

### Live validatie van `Volgende stap`
- De knopstatus wordt direct bijgewerkt na invoer of wijziging van relevante velden.
- Hiervoor wordt alleen de `disabled`-status aangepast; de gehele wizard wordt niet per toetsaanslag opnieuw gerenderd.
- Hierdoor blijft de invoerfocus behouden.

### RC5-002 – Lege blindvelden werden als `0` weergegeven
- De centrale chipformatter retourneert voor lege waarden voortaan een lege tekenreeks.
- Nieuwe sessies tonen daardoor lege SB- en BB-velden in plaats van `0`.

## Cashgame-straddles
- De bestaande sessiekaders blijven leidend voor welke opties per hand beschikbaar zijn.
- Stap 1 ondersteunt:
  - geen straddle;
  - reguliere straddle;
  - meerdere reguliere straddles/re-straddles;
  - vaste of open bedragen volgens de sessie-instellingen;
  - BTN-straddle wanneer deze in de sessie is toegestaan.
- De geregistreerde forced bets worden in de daaropvolgende tafelstate verwerkt als chipmarkers.

## Niet gewijzigd
- Poker-/potengine.
- Conceptmodel en herstelmechanismen.
- Kaartselector, all-inflow, runout, winnaarselectie en rapportage buiten de hierboven genoemde herstelpunten.
