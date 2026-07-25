# Live Poker Handlog
## Testing Guide

Dit document beschrijft de standaard teststrategie voor **Live Poker Handlog**.

Het doel is om iedere wijziging op een consistente en reproduceerbare manier te testen voordat deze onderdeel wordt van een definitieve release.

---

# Teststrategie

Live Poker Handlog maakt gebruik van een combinatie van:

- AI-testen
- Handmatige controles
- Praktijktesten tijdens echte pokersessies

AI is de primaire testpartner tijdens de ontwikkeling.

Praktijktesten vormen de uiteindelijke validatie.

---

# Testsoorten

## Functionele test

Controle van uitsluitend de gewijzigde functionaliteit.

Doel:

Controleren of de nieuwe functionaliteit correct werkt.

---

## Regressietest

Controle van bestaande functionaliteit die geraakt kan zijn door wijzigingen.

Doel:

Voorkomen dat eerder werkende onderdelen onbedoeld zijn gewijzigd.

---

## Acceptatietest

Uitgebreide eindcontrole voordat een definitieve release wordt gepubliceerd.

Doel:

Beoordelen of de volledige applicatie gereed is voor gebruik.

---

## Praktijktest

Test tijdens een echte live pokersessie.

Doel:

Controleren of de app ook onder praktijkomstandigheden prettig en betrouwbaar werkt.

Feedback uit praktijktesten wordt eerst verzameld en pas verwerkt in een volgende ontwikkelversie.

---

# AI-testprotocol

AI wordt gebruikt voor:

- Functionele tests
- Regressietests
- Acceptatietests
- Validatie van berekeningen
- Controle van rapportages
- Controle van gebruikersinterface
- Controle van foutafhandeling
- Controle van PWA-functionaliteit

---

# Uitgangspunten voor AI-testen

AI voert uitsluitend controles uit die zelfstandig kunnen worden beoordeeld.

Wanneer onderdelen niet zelfstandig testbaar zijn, worden deze expliciet benoemd.

AI doet geen aannames.

Wanneer informatie ontbreekt, wordt dit vermeld.

---

# Verwachte inhoud van een AI-testrapport

Een volledig testrapport bevat minimaal:

## Samenvatting

Korte samenvatting van de uitgevoerde test.

---

## Uitgevoerde tests

Overzicht van alle uitgevoerde testcases.

---

## Geslaagde tests

Alle testcases die succesvol zijn verlopen.

---

## Afgekeurde tests

Alle testcases die niet voldoen.

Per bevinding wordt minimaal vastgelegd:

- Testcase
- Verwacht resultaat
- Werkelijk resultaat
- Reproduceerbaarheid
- Ernst
- Advies

---

## Niet-uitgevoerde tests

Overzicht van onderdelen die niet konden worden getest.

Inclusief reden.

---

## Bevindingen

Classificeer iedere bevinding als:

- Kritiek
- Hoog
- Middel
- Laag

---

## Adviezen

Beschrijf mogelijke verbeteringen.

Nieuwe functionele wensen worden duidelijk onderscheiden van fouten.

Feature requests worden niet meegenomen als defect.

---

## Releaseadvies

Sluit ieder testrapport af met één van de volgende adviezen:

- GO
- GO onder voorwaarden
- NO GO

---

# Testmomenten

| Situatie | Test |
|----------|------|
| Kleine bugfix | Functionele test |
| Nieuwe functionaliteit | Functionele test + regressietest |
| Grote wijziging | Uitgebreide regressietest |
| Release Candidate | Volledige AI-acceptatietest |
| Definitieve release | AI-acceptatietest + praktijktest |

---

# Praktijktesten

Praktijktesten worden uitgevoerd tijdens echte pokersessies.

Gebruikerservaring is hierbij even belangrijk als technische correctheid.

Feedback wordt eerst verzameld.

Pas daarna wordt besloten welke verbeteringen onderdeel worden van een volgende versie.

---

# Testdocumentatie

Testdocumenten worden opgeslagen in:

```text
tests/
├── protocols/
├── reports/
└── scenarios/
```

---

# Testprotocollen

Gebruik waar mogelijk vaste testprotocollen.

Bijvoorbeeld:

- Cashgame
- Tournament
- PKO
- Big Blind Ante
- Straddles
- Showdown
- Rapportage
- PWA

---

# Testscenario's

Nieuwe functionaliteit krijgt indien nodig een eigen verzameling testscenario's.

Hierdoor blijven regressietests reproduceerbaar.

---

# Doel

Het doel van testen is niet alleen het vinden van fouten.

Het doel is aantoonbaar vast te stellen dat Live Poker Handlog betrouwbaar, onderhoudbaar en geschikt is voor gebruik tijdens live pokersessies.