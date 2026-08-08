# AI-testinstructies – Live Poker Handlog v2.6 RC5a

## Doel
Heracceptatie van de releaseblokker uit RC5 en gerichte regressie van de aangepaste onderdelen.

## Testobject
`Live_Poker_Handlog_v2.6_RC5a.html`

## Verplicht onderscheid
Maak in het rapport strikt onderscheid tussen:
1. statische analyse;
2. browser-runtime-tests;
3. niet-uitgevoerde tests.

## 1. Startup
- Voer `node --check` uit op het JavaScript uit het HTML-bestand.
- Start de app in Chromium.
- Controleer dat `v2.6 RC5a` zichtbaar is.
- Controleer op uncaught JavaScript-fouten.

## 2. Kritieke heracceptatie: Stap 1 → Stap 2

### Cashgame
1. Maak een nieuwe cashgamesessie.
2. Controleer dat SB en BB aanvankelijk leeg zijn.
3. Vul SB `1` en BB `2` in.
4. Start een nieuwe hand.
5. Controleer dat `Volgende stap` actief wordt na geldige invoer.
6. Klik `Volgende stap`.
7. Verwacht: dealerbuttonkeuze in **Stap 2 van 5 – Tafel & spelers**.

### Toernooi
1. Maak een reguliere toernooisessie.
2. Start een nieuwe hand.
3. Vul SB `500` en BB `1000` in.
4. Controleer BBA = `1000` wanneer actief.
5. Klik `Volgende stap`.
6. Verwacht: dealerbuttonkeuze in Stap 2.

### Technische controle
- Controleer dat een normale `data-wz-next`-klik niet eerder door een andere capture-listener wordt gestopt.
- Controleer dat er maar één RC5a-specifieke eigenaar van deze navigatieklik actief is.

## 3. Live knopvalidatie
- Wis SB of BB: `Volgende stap` wordt disabled.
- Vul beide opnieuw: `Volgende stap` wordt enabled.
- Controleer dat het actieve invoerveld niet bij iedere toetsaanslag focus verliest.

## 4. Lege blindvelden
- Maak een volledig nieuwe cashgamesessie.
- Verwacht: de sessievelden SB en BB zijn leeg, niet `0`.
- Vul waarden in, sla op en heropen de sessie.
- Verwacht: opgeslagen waarden blijven correct zichtbaar.

## 5. Cashgame-straddles
Test minimaal drie sessieconfiguraties:

### A. Reguliere straddle, vaste eerste en vaste vervolgstraddles
- Per hand: `Geen` en `Reg.` beschikbaar.
- Aantal straddles kan worden gekozen binnen het spelersmaximum.
- Bedragen verdubbelen automatisch.

### B. Reguliere straddle, open eerste en open vervolgstraddles
- Per straddle verschijnt een bedragveld.
- Lege verplichte open bedragen blokkeren doorgaan.

### C. BTN-straddle toegestaan
- `Btn.` is per hand beschikbaar.
- Vast/open bedrag volgt de sessie-instelling.

Ga daarna naar Stap 2 en controleer dat iedere actieve straddle als forced-betmarker op de juiste seat/positie wordt weergegeven.

## 6. Korte regressie
- Dynamisch spelersaantal 2 t/m sessiemaximum.
- BBA volgt BB.
- Concept wordt direct aangemaakt.
- Terug naar Stap 1 en opnieuw vooruit werkt.

## Releasebesluit
- **NO GO** als Stap 1 bij cashgame of toernooi niet kan worden verlaten.
- **NO GO** als `Volgende stap` na geldige invoer disabled blijft.
- **GO onder voorwaarden** wanneer de kritieke navigatie is opgelost maar uitsluitend niet-kritieke UX-punten resteren.
