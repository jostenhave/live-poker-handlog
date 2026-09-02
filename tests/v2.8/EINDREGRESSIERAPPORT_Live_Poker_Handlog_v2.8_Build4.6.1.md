# Eindregressierapport — Live Poker Handlog v2.8 Build 4.6.1

**Fase:** 1 — Geconsolideerde eindregressie  
**Datum:** 30 augustus 2026  
**Geteste kandidaat:** `Live_Poker_Handlog_v2.8_Build4.6.1.html`  
**Eindadvies:** **GO naar fase 2 — fysieke Android-eindacceptatie**

---

## 1. Doel

Deze regressie controleert of Build 4.6.1 als functionele v2.8-releasebasis kan dienen voordat de fysieke Android-eindacceptatie, handleidingintegratie en uiteindelijke PWA-release worden uitgevoerd.

De test combineert:

1. een nieuwe statische integriteitscontrole;
2. een nieuwe syntaxcontrole;
3. een nieuwe functionele zero-diffvergelijking met de fysiek geaccepteerde Build 4.5.2.4;
4. een nieuwe headless-Chromium runtimecontrole;
5. gerichte regressieasserties op de belangrijkste v2.8-routes;
6. bestaande fysieke acceptatie als gedragsreferentie voor functionaliteit die in Build 4.6.1 executable exact gelijk is gebleven.

---

## 2. Hashgate

### Build 4.5.2.4 — functionele referentie

`32e766c0d76bf6032faef21fba04e95a009263d46283326efa2d558f0cdae741`

**PASS**

### Build 4.6.1 — kandidaat

`620ce5428860551a72344333b0e087da20abe56d0e15c32d4d03004f6292255b`

**PASS**

---

## 3. Statische integriteitscontrole

| Controle | Gemeten | Resultaat |
|---|---:|---|
| `addEventListener(` totaal | 104 | PASS |
| document `click` | 28 | PASS |
| document `input` | 19 | PASS |
| document `change` | 19 | PASS |
| `WIJZIGING v2.8 Build` | 0 | PASS |
| `WIJZIGING v2.7 Build` | 0 | PASS |
| `APP_VERSION` | `v2.7` | verwacht in 4.6.1 |
| `SCHEMA_VERSION` | `12` | PASS |
| `PWA_VERSION_ID` | `v2.7-pwa-4` | verwacht vóór releasepackaging |
| storage key | `hhl:v12:data` | PASS |

`APP_VERSION` en `PWA_VERSION_ID` worden pas in de latere release-/PWA-fasen naar de definitieve v2.8-release-identiteit gebracht. Dit is daarom geen fout in Build 4.6.1.

---

## 4. Syntaxcontrole

Het volledige inline JavaScript is uit de HTML geëxtraheerd en gecontroleerd met:

`node --check`

Resultaat: **PASS**

Geen syntaxfouten aangetroffen.

---

## 5. Functionele zero-diff tegen Build 4.5.2.4

Voor Build 4.5.2.4 en Build 4.6.1 zijn:

1. alle blockcomments verwijderd;
2. uitsluitend het zichtbare `VERSION`-label genormaliseerd;
3. whitespace genormaliseerd.

Daarna zijn beide bronnen opnieuw rechtstreeks vergeleken.

Resultaat: **exact gelijk — PASS**.

Dit bevestigt opnieuw dat Build 4.6.1 geen executable functionele wijziging bevat ten opzichte van de fysiek geaccepteerde Build 4.5.2.4. De verschillen zitten uitsluitend in commentaar en het zichtbare buildlabel.

---

## 6. Nieuwe Chromium-runtimecontrole

De app is opnieuw uitgevoerd in headless Chromium.

Vanwege de sandboxbeveiliging van de testomgeving kon de app niet via een normale `file:`- of localhost-origin worden geladen. Daarom is de HTML rechtstreeks in een lege Chromium-pagina geplaatst en is voor de runtimecontrole een lokale `localStorage`-shim gebruikt. De appcode zelf is niet aangepast.

### Uitkomst

**30 van 30 runtimeasserties PASS.**

Er zijn geen JavaScript-runtimefouten of unhandled promise rejections geregistreerd.

---

## 7. Runtime-testmatrix

### A. Startup en basisnavigatie

- Home rendert correct — **PASS**
- zichtbaar buildlabel `v2.8 Build 4.6.1` — **PASS**
- geen onterechte Herstelmodus — **PASS**
- versie-/schema-/PWA-constanten leesbaar — **PASS**
- Dark/Light-toggle wijzigt effectieve theme-state — **PASS**

### B. Cashsessie

Via de echte UI-route:

- nieuwe sessie openen — **PASS**
- Cashgame kiezen — **PASS**
- naam invoeren — **PASS**
- SB = 1 invoeren — **PASS**
- BB = 2 invoeren — **PASS**
- sessie opslaan — **PASS**
- sessiescherm toont `€1 / €2` — **PASS**
- sessie krijgt `created`-metadata — **PASS**

### C. Nieuwe hand / wizard

- `+ Nieuwe hand` opent Stap 1 van 5 — **PASS**
- Basisgegevens zichtbaar — **PASS**
- Vorige/Volgende-navigatie aanwezig — **PASS**
- finale Step-5-weergave bevat `Opslaan & delen` — **PASS**
- finale Step-5-weergave bevat geen `Volgende stap` — **PASS**

### D. Hero-flow

Gerichte runtimeassertie op de effectieve Build-4.3.2.x-route:

- `Hero wijzigen` wist Hero onmiddellijk — **PASS**
- tijdelijke no-Hero-state wordt actief — **PASS**
- nieuwe Hero-seat kan direct worden gekozen — **PASS**

### E. Villain-koppeling / duplicatepreventie

- dezelfde `playerId` kan niet aan een tweede seat in dezelfde hand worden gekoppeld — **PASS**
- handmatige naam die al in de spelersbibliotheek bestaat, wordt bij opslaan in bibliotheek geblokkeerd — **PASS**

### F. Resultaat- en reportssemantiek

- centrale positievolgorde sorteert `SB → BB → … → CO → BTN` — **PASS**
- exclusieve Hero-win geeft bijvoorbeeld `Ik win · pot €10 (5 bb)` — **PASS**
- Hero-fold wordt als `Ik verlies` gepresenteerd — **PASS**
- canvas player-info gebruikt 35/65-verhouding — **PASS**
- centrale separatorlogica voor player-info/street/straddles is actief — **PASS**
- showdownhelpers zijn runtime-effectief aanwezig — **PASS**

### G. Bountymodel

- historische KO-editor gebruikt `bountyCount` / `Aantal gewonnen bounties` — **PASS**
- historische PKO-editor gebruikt `bountyWon` — **PASS**
- historische Mystery-editor gebruikt `bountyWon` — **PASS**
- geen oude `Eigen bounty vóór hand`-semantiek in deze editorroute — **PASS**

De reeds fysiek geaccepteerde Build 4.5.2.4-bountycorrectie is bovendien executable exact behouden door de zero-diffgate.

### H. Opgeslagen hand / `UI.editTx`

Met een definitieve HU-handfixture is gecontroleerd:

- openen maakt een geïsoleerde working copy — **PASS**
- origineel blijft intact — **PASS**
- wijziging maakt de transaction dirty — **PASS**
- discard verlaat de edittransactie — **PASS**
- opgeslagen origineel blijft na discard ongewijzigd — **PASS**

### I. Metadata en filters

- `registeredAt` wordt door de handmetadatahelper correct gelezen — **PASS**
- sessiefilter- en handfilterroutes zijn runtime-effectief aanwezig — **PASS**

### J. Betting / all-in / import-export — regressieborging

- runtime-effectieve minimumraisebranch met de afgesproken tekstsemantiek aanwezig — **PASS**
- gesloten-all-in/runouthelper aanwezig — **PASS**
- back-up/export/importvalidatieroutes (`makeBackup`, `performImport`, `validateBackup`) aanwezig — **PASS**

Voor de exacte pokerlegaliteit van minimumraise, short all-in, actorqueue en potengine geldt aanvullend de zero-diffgate: de executable code is identiek aan de eerder fysiek/regressie-geaccepteerde Build 4.5.2.4-basis.

---

## 8. Geërfde fysieke acceptatie

Build 4.6.1 verandert geen executable code ten opzichte van Build 4.5.2.4. Daardoor blijft de eerdere fysieke acceptatie relevant voor onder meer:

- BBA en forced-bet markers;
- minimumraiselegaliteit en fouttekst;
- Hero/Villain-flow;
- historische Villain-edit;
- `UI.editTx` save/discard;
- KO/PKO/Mystery-bountybewerking;
- RESULTAAT/OPMERKINGEN-volgorde;
- showdowncount;
- 35/65 player-info;
- vaste showdownkaartzone;
- éénkaart-left-slot;
- separators;
- Step-5-footer.

Deze geërfde acceptatie vervangt niet de geplande finale fysieke Android-check in fase 2, maar geeft wel sterk regressiebewijs voor fase 1.

---

## 9. Niet in deze fase vrijgegeven

De volgende onderdelen horen bewust bij latere releasefasen:

- definitieve v2.8-handleiding;
- technische integratie en fysieke test van de handleiding in nieuw venster/tabblad;
- definitieve Nederlandstalige releasecomments;
- `APP_VERSION='v2.8'`;
- nieuwe v2.8 `PWA_VERSION_ID`;
- unieke v2.8-service worker;
- fresh-installtest van het definitieve releasepakket;
- v2.7 → v2.8-updatepad;
- GitHub-productiepublicatie.

---

## 10. Open observatie

De eerder éénmalig gemelde preflopafwijking waarbij na een SB-fold de BB mogelijk werd overgeslagen, is nog steeds niet reproduceerbaar en is in Build 4.6.1 niet gewijzigd. Er is daarom geen bronwijziging uitgevoerd.

Als dit tijdens fase 2 opnieuw optreedt, moeten screenshots worden vastgelegd van:

1. toestand vóór de raise;
2. beschikbare SB-opties;
3. toestand direct na de SB-fold.

---

# Eindoordeel fase 1

## GO

Er is **geen functionele regressie aangetroffen** in Build 4.6.1.

Bewijs:

- juiste SHA-256 — PASS;
- syntax — PASS;
- statische integriteit — PASS;
- functionele zero-diff met fysiek geaccepteerde Build 4.5.2.4 — PASS;
- 30/30 nieuwe Chromium-runtimeasserties — PASS;
- 0 geregistreerde runtimefouten — PASS.

**Build 4.6.1 gaat door naar fase 2: fysieke Android-eindacceptatie.**
