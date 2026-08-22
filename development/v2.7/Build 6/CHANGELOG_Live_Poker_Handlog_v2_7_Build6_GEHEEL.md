# CHANGELOG — Live Poker Handlog v2.7 — Build 6 geheel

**Tussenchangelogs niet opgenomen.**

---

## Build 6.x — mobiele polish, table/footer en terminologie

**Startbasis:** Build 5.6  
**Eindstand:** Build 6.10

## Build 6.1 — straddlebedrag compact

- Reguliere en BTN-straddlevelden compacter gemaakt.
- Breedte in lijn met SB/BB/BBA-velden.
- K-suffix bleef naast het veld.
- Straddlelogica ongewijzigd.

## Build 6.2 — keyboard/footercoördinatie

- Footerpositionering losgekoppeld van automatische targetscroll.
- Viewport-watch blijft actief zolang bedragcontext bestaat.
- Minder kans op verkeerd terugvallen van de footer bij Android-keyboardtransities.

## Build 6.2.1 — contextwissel met open keyboard

- Raise/Bet-context wordt opnieuw gepositioneerd wanneer het keyboard al open is.
- Geen extra parallelle keyboardmanager toegevoegd.

## Build 6.2.2 — `Toon tafel` tijdens bedraginvoer

- Tafeloverlay opent zonder dat het keyboard de layout blijft verstoren.
- Auto-refocus gepauzeerd zolang de tafeloverlay open is.
- Na sluiten terug naar de bestaande invoerroute.

## Build 6.3 — disabled/inactive Light-pariteit

- Disabled controls en placeholders in Light Mode afgestemd op centrale tokens.
- Inactieve seats visueel correct in beide thema's.

## Build 6.4 — setupfooter fixed

- `.v27-flow-footer` gewijzigd van sticky naar fixed.
- Doel: geen overlap met lange setup-panelen en voorspelbare mobiele navigatie.

## Build 6.5 — dynamische tafelhoogte

- `.wz-tablebox` krijgt hoogte op basis van daadwerkelijk beschikbare viewport.
- Tafelvisual beter passend op verschillende telefoonhoogtes.

## Build 6.6 — tafelmodal en verticale fit

- Tafelvisual binnen modal/overlay beter geschaald.
- Verticale ruimte en footerhoogte meegenomen in sizing.

## Build 6.7 — generieke zichtbaarheid numerieke velden

- Actieve numerieke velden plus bijbehorende controls worden als functionele groep zichtbaar gehouden.
- Minder veldspecifieke scrollcorrecties.

## Build 6.8 — setup-/footerpolish

- Verdere mobiele polish op wizardstappen en footergedrag.
- Beschermde poker-/reportlogica buiten scope gehouden.

## Build 6.9 — terminologie

- `Hero` in gebruikersgerichte effectieve live UI vervangen door `Ik` / `Mijn`.
- Technische interne identifiers niet onnodig hernoemd.

## Build 6.10 — afronding Build 6

- Laatste consistentie- en regressiecorrecties.
- Build 6 als complete polishronde afgesloten.

---
