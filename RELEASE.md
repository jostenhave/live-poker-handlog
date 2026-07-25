# Live Poker Handlog
## Releaseprocedure

Dit document beschrijft de standaardprocedure voor het publiceren van een nieuwe versie van **Live Poker Handlog**.

Door deze stappen altijd in dezelfde volgorde uit te voeren blijven GitHub, GitHub Pages en de Progressive Web App (PWA) synchroon.

---

# Release Checklist

## Verplicht

- [ ] Ontwikkeling afgerond
- [ ] Testen uitgevoerd
- [ ] Versienummer bijgewerkt
- [ ] Service Worker cacheversie gecontroleerd en indien nodig verhoogd
- [ ] Commit gemaakt
- [ ] Push naar GitHub uitgevoerd
- [ ] GitHub Pages gecontroleerd
- [ ] Android-installatie gecontroleerd

## Indien van toepassing

- [ ] iPhone / iPad-installatie gecontroleerd
- [ ] README.md bijgewerkt
- [ ] CHANGELOG.md bijgewerkt
- [ ] INSTALLATIE.md bijgewerkt
- [ ] Nieuwe iconenset toegevoegd

---

# Standaard werkwijze

Iedere release doorloopt vijf fasen:

1. Ontwikkelen
2. Testen
3. Release voorbereiden
4. Publiceren
5. Controleren

Sla geen stappen over.

---

# 1. Ontwikkelen

Nieuwe functionaliteit wordt ontwikkeld vanuit de map:

```text
development/
```

Commit regelmatig met een duidelijke omschrijving.

Voorbeelden:

```text
Add tournament summary
Improve stack calculation
Fix blind posting
Refactor report generation
```

---

# 2. Testen

Voordat een release wordt gepubliceerd:

- Functionele controle
- Regressietest
- Acceptatietest (indien van toepassing)

Nieuwe functionaliteit wordt pas gepubliceerd nadat deze is goedgekeurd.

---

# 3. Release voorbereiden

## 3.1 Versienummer controleren

Controleer onder andere:

- App-versie
- Release notes
- README (indien nodig)

---

## 3.2 Service Worker

Open:

```text
service-worker.js
```

Controleer de cacheversie.

Bij iedere release waarbij bestanden worden gecachet moet de cacheversie worden verhoogd.

Bijvoorbeeld:

```javascript
const CACHE_NAME = "live-poker-handlog-v2.5-pwa-1";
```

---

## 3.3 Manifest

Controleer:

- naam
- short_name
- iconen

Bestand:

```text
manifest.webmanifest
```

---

## 3.4 Iconen

Controleer of alle vereiste iconen aanwezig zijn:

```text
assets/icons/

icon-192.png
icon-512.png
maskable-512.png
apple-touch-icon.png
favicon-32.png
favicon-16.png
```

Nieuwe iconen worden altijd afgeleid van:

```text
assets/branding/
```

---

# 4. Publiceren

## Stap 1

Commit alle wijzigingen.

Bijvoorbeeld:

```text
Release v2.5
```

---

## Stap 2

Push alle commits naar GitHub.

Controleer of GitHub de nieuwste bestanden toont.

---

## Stap 3

Controleer GitHub Pages.

Open:

```text
https://jostenhave.github.io/live-poker-handlog/
```

Controleer:

- nieuwste versie zichtbaar;
- geen consolefouten;
- PWA werkt.

---

## Stap 4

Maak een nieuwe GitHub Release.

Voorbeeld:

Tag:

```text
v2.5
```

Release title:

```text
Live Poker Handlog v2.5
```

Voeg een korte samenvatting van de belangrijkste wijzigingen toe.

---

# 5. Controle

## Android (Google Chrome)

Controleer:

- App installeren werkt
- App opent zonder browserinterface
- Juiste appnaam
- Juiste app-icoon
- Nieuwste versie zichtbaar

---

## iPhone / iPad (Safari)

Controleer (indien beschikbaar):

- Toevoegen aan beginscherm werkt
- App opent zonder Safari-interface
- Juiste appnaam
- Juiste app-icoon
- Nieuwste versie zichtbaar

---

# Documentatie

Werk indien nodig bij:

- README.md
- CHANGELOG.md
- INSTALLATIE.md

---

# Release afgerond

Een release is afgerond wanneer:

- GitHub is bijgewerkt;
- GitHub Pages de nieuwste versie toont;
- de PWA correct werkt;
- alle relevante documentatie is bijgewerkt.