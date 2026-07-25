# Live Poker Handlog
## Development Guide

Dit document beschrijft de ontwikkelafspraken voor **Live Poker Handlog**.

Het doel is een consistente, onderhoudbare en reproduceerbare ontwikkelwerkwijze.

---

# Projectstructuur

```text
live-poker-handlog/

README.md
RELEASE.md
DEVELOPMENT.md
TESTING.md
CHANGELOG.md

index.html
manifest.webmanifest
service-worker.js

assets/
backlog/
development/
docs/
releases/
tests/
```

---

# Ontwikkelprincipes

## Stabiliteit boven snelheid

Nieuwe functionaliteit wordt pas toegevoegd nadat bestaande functionaliteit is gecontroleerd.

---

## Kleine, logische wijzigingen

Werk in kleine, logisch afgebakende wijzigingen.

Commit regelmatig en gebruik duidelijke commitberichten.

---

## Functionaliteit eerst ontwerpen

Nieuwe ideeën worden eerst functioneel uitgewerkt.

Pas daarna wordt gestart met de technische implementatie.

---

## Wijzigingen bundelen

Nieuwe functionele wensen worden eerst verzameld op de backlog.

Pas nadat de scope van een nieuwe versie is vastgesteld worden deze gezamenlijk ontwikkeld.

Hierdoor blijven releases overzichtelijk en goed testbaar.

---

# Versiebeheer

## Stabiele releases

Alle definitieve releases worden opgeslagen in:

```text
releases/
```

---

## Ontwikkelversies

Werkbestanden worden ontwikkeld vanuit:

```text
development/
```

---

## Releaseprocedure

Gebruik altijd de procedure uit:

```text
RELEASE.md
```

---

# GitHub

GitHub is de centrale broncode-opslag.

Alle wijzigingen verlopen via Git.

Commit regelmatig en push wijzigingen zodra deze logisch afgerond zijn.

---

# Commitberichten

Gebruik korte, duidelijke Engelstalige commitberichten.

Bijvoorbeeld:

```text
Add tournament summary
Improve stack calculation
Fix blind posting
Refactor report generation
Update documentation
Release v2.5
```

---

# Progressive Web App (PWA)

De live versie draait via GitHub Pages.

Bij wijzigingen aan bestanden die door de Service Worker worden gecachet moet worden gecontroleerd of de cacheversie moet worden verhoogd.

Zie:

```text
RELEASE.md
```

---

# Teststrategie

AI is de primaire testpartner tijdens de ontwikkeling.

Functionele wijzigingen worden waar mogelijk eerst door AI getest voordat praktijktesten plaatsvinden.

Uitgebreide testprotocollen en testrapporten worden vastgelegd volgens:

```text
TESTING.md
```

---

# Praktijktesten

Praktijktesten worden uitgevoerd tijdens echte pokersessies.

Feedback van testers wordt eerst verzameld.

Nieuwe wensen worden niet direct ontwikkeld, maar eerst toegevoegd aan de backlog en meegenomen bij een volgende versie.

---

# RC-versies

Een Release Candidate (RC) wordt alleen gemaakt wanneer daarvoor expliciet wordt gekozen.

Niet iedere wijziging vereist een nieuwe RC-versie.

---

# Documentatie

De volgende documenten vormen samen de projectdocumentatie.

| Bestand | Doel |
|---------|------|
| README.md | Projectinformatie |
| RELEASE.md | Publicatieprocedure |
| DEVELOPMENT.md | Ontwikkelafspraken |
| TESTING.md | Teststrategie en testprotocollen |
| CHANGELOG.md | Releasehistorie |
| INSTALLATIE.md | Installatiehandleiding |

---

# Naamgeving

Gebruik overal dezelfde productnaam:

**Live Poker Handlog**

De repositorynaam en URL blijven:

```text
live-poker-handlog
```

---

# Doel

Het project moet eenvoudig onderhoudbaar blijven.

Consistentie heeft voorrang boven snelheid.

Broncode, documentatie, testprotocollen en releasehistorie worden zoveel mogelijk synchroon gehouden.