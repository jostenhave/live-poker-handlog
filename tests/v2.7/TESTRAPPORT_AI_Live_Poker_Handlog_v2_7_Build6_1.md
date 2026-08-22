# TESTRAPPORT AI — Live Poker Handlog v2.7 Build 6.1

**Datum:** 16 augustus 2026  
**Getest bestand:** `Live_Poker_Handlog_v2_7_Build6_1.html`  
**Referentie:** `Live_Poker_Handlog_v2_7_Build5_6(1).html`

## 1. Samenvatting

Build 6.1 is technisch gecontroleerd als een zeer kleine presentatiebuild. De wijziging koppelt de bestaande `.straddle-amount`-class aan de twee straddlebedraginputs in de **laatste effectieve override** van `v271HandStraddleConfig()`.

De aangeleverde bouwinstructie ging uit van een eerdere declaratie als effectieve route. Bronanalyse heeft aangetoond dat die aanname in Build 5.6 niet klopt: later staat een runtime-herdefinitie die de eerdere functie overschrijft. De fix is daarom bewust op deze laatste effectieve bronroute uitgevoerd.

## 2. Preflight

| Controle | Resultaat |
|---|---|
| HTML-bestand aanwezig | PASS |
| Titel = Build 6.1 | PASS |
| `APP_VERSION` = Build 6.1 | PASS |
| `VERSION` = Build 6.1 · 2026-08-16 | PASS |
| `SCHEMA_VERSION=12` | PASS |
| JavaScript `node --check` | PASS |

## 3. JavaScript-syntax

Het volledige `<script>`-blok is uit de HTML geëxtraheerd en gecontroleerd met:

```bash
node --check
```

Resultaat: **PASS** — exitcode 0.

## 4. Volledige bron-diff Build 5.6 → 6.1

De daadwerkelijke diff bevat exact vijf inhoudelijke regels:

1. `<title>`: Build 5.6 → Build 6.1;
2. `APP_VERSION`: Build 5.6 → Build 6.1;
3. `VERSION`: Build 5.6 → Build 6.1;
4. class-toevoeging op het open reguliere straddlebedragveld in de laatste `v271HandStraddleConfig`-override;
5. class-toevoeging op het open BTN-straddlebedragveld in dezelfde override.

Er zijn **geen andere codewijzigingen** tussen de twee bestanden aangetroffen.

Resultaat: **PASS**.

## 5. Effectieve bronroute

### Bevinding

In Build 5.6 staan meerdere vormen van `v271HandStraddleConfig`:

- een eerdere functiedeclaratie;
- later een herdefinitie via `v271HandStraddleConfig=function(){...}`.

De latere toekenning vervangt de eerdere implementatie tijdens runtime en is daarmee de effectieve route.

### Uitgevoerde fix

In deze effectieve override bevat Build 6.1 nu:

```html
<input class="straddle-amount" data-straddle-amt="${x.index}" data-chip="1" ...>
```

voor reguliere open straddles, en:

```html
<input class="straddle-amount" data-straddle-amt="0" data-chip="1" ...>
```

voor een open BTN-straddle.

Resultaat: **PASS**.

## 6. CSS-bron

De bestaande CSS-regel is ongewijzigd:

```css
.straddle-amount{width:42%;min-width:140px;max-width:220px}
```

Er is dus geen tweede CSS-regel of override toegevoegd.

Resultaat: **PASS**.

## 7. Functionele attributen / binding

Voor beide gewijzigde inputs zijn ongewijzigd gebleven:

- `data-straddle-amt`;
- `data-chip="1"`;
- `chipDisplay(...)`-waardebinding;
- bestaande eventafhandeling via de generieke `[data-straddle-amt]`-route.

Omdat de volledige bron-diff geen wijziging aan handlers, state, validatie of berekening bevat, is er geen aanwijzing voor functionele regressie door deze patch.

Resultaat: **PASS op bronregressie**.

## 8. Beschermde functies

Door de volledige file-diff is vastgesteld dat onder andere de volgende routes byte-inhoudelijk ongewijzigd zijn:

- `regularStraddleRows()`;
- `handStraddles()`;
- `validateHandStraddles()`;
- `analyze()`;
- `streetText()`;
- `wzReplayStreet()`;
- `wzLegalActions()`;
- villain-flow;
- report/canvas;
- keyboard-/viewportcode;
- historical editing.

Resultaat: **PASS**.

## 9. Potfixtures

Niet opnieuw uitgevoerd.

Reden: de volledige diff raakt geen poker-, action-, contribution- of potlogica. Volgens de projectafspraak zijn de potfixtures alleen verplicht wanneer die routes ook maar enig regressierisico lopen. Dat is in deze build aantoonbaar niet het geval.

Status: **NIET VAN TOEPASSING**.

## 10. Visuele validatie Dark / Light

### Bronmatig

De breedteregel van `.straddle-amount` bevat uitsluitend geometrie en gebruikt geen theme-specifieke tokens. Dezelfde class wordt in Dark en Light toegepast.

Verwacht effect in beide thema's:

- `width:42%`;
- minimaal 140px;
- maximaal 220px;
- geen paneelbrede input meer.

### Werkelijke mobiele rendering

Niet fysiek uitgevoerd door de AI. Dit kan daarom **niet als fysieke PASS** worden geclaimd.

Status: **NOG FYSIEK TE VALIDEREN**.

## 11. Cold-launch Dark / Light en statusbalk

De fysieke controles uit de bouwinstructie zijn niet door de AI op een Android/PWA-installatie uitgevoerd.

Te controleren met gebruiker:

- cold launch Dark: toggle direct zichtbaar + juiste statusbalkkleur;
- cold launch Light: idem;
- geen blijvend verkeerde statusbalkkleur tijdens initialisatie.

Status: **OPEN — FYSIEKE VALIDATIE VEREIST**.

## 12. Browserclaim

Er is geen volledige end-to-end wizardinteractie in een echte Android/Chrome-omgeving uitgevoerd. Daarom wordt geen browser-/mobiele PASS geclaimd voor de visuele breedte of cold-launchstatus.

## 13. Eindbeoordeling

**TECHNISCH GO VOOR FYSIEKE VALIDATIE**.

Motivering:

- syntax PASS;
- diff exact binnen de bedoelde kleine scope;
- effectieve bronroute correct geraakt;
- geen nieuwe fixlaag;
- straddlebindings en logica ongewijzigd;
- overige code buiten de vijf diffregels identiek;
- alleen werkelijke mobiele visuele/cold-launch-validatie staat nog open.
