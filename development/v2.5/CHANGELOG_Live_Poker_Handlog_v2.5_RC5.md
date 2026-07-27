# Changelog — Live Poker Handlog v2.5 RC5

Releasedatum: 26 juli 2026

## Doel van RC5

RC5 herziet de pot-engine generiek voor:

- cashgames;
- Regular MTT;
- PKO;
- KO;
- Mystery Bounty;
- toernooien zonder ante;
- toernooien met big blind ante;
- heads-up en multiway;
- invoer in geld, chips en big blinds.

Er is geen nieuwe v2.6-functionaliteit toegevoegd.

## Opgelost

### Ongecallde 3-bets, squeezes, 4-bets en hogere raises

De engine bepaalt het terug te geven ongecallde bedrag niet meer uitsluitend vanuit de eerdere eigen bijdrage van de laatste aggressor.

Per street worden nu afzonderlijk bijgehouden:

1. forced contributions;
2. totale streetbijdrage per speler;
3. het hoogste niveau dat iedere speler door een vrijwillige actie heeft bereikt.

Voor de laatste aggressor geldt:

```text
gematcht niveau =
max(
  eigen bijdrage vóór de laatste raise,
  hoogste vrijwillig bereikte niveau van een andere speler
)

retour =
totale streetbijdrage laatste aggressor − gematcht niveau
```

### Forced contributions

De volgende bijdragen blijven volledig in de pot, maar matchen zonder vrijwillige actie geen deel van een raise:

- small blind;
- big blind;
- big blind ante;
- reguliere straddle;
- re-straddle;
- button straddle.

## Historische foutscenario’s

Bij een cashgame van €1/€2:

- raise naar €6, 3-bet naar €20, fold → €13;
- raise naar €6, call, 3-bet naar €20, folds → €19;
- raise naar €6, 3-bet naar €20, 4-bet naar €50, fold → €41.

Bij een toernooi van 500/1.000:

- raise naar 2,5 bb, 3-bet naar 8 bb, fold → 5,5 bb;
- raise naar 2,5 bb, call, squeeze naar 8 bb, folds → 8 bb;
- raise naar 2,5 bb, 3-bet naar 8 bb, 4-bet naar 20 bb, fold → 17,5 bb;
- raise naar 2,5 bb, 3-bet naar 8 bb, 4-bet naar 20 bb, 5-bet naar 45 bb, fold → 41,5 bb.

## Technisch

- Versie, HTML-titel en release notes bijgewerkt naar `v2.5 RC5`.
- De kernfunctie `analyze()` gebruikt per street `voluntaryLevel`.
- Forced contributions worden wel in `streetIn` en de pot verwerkt, maar niet automatisch in `voluntaryLevel`.
- Calls, bets, raises, all-ins en jams verhogen het vrijwillig bereikte niveau.
- JavaScript-syntaxis gecontroleerd met Node.js.

## Niet gewijzigd

- importvalidatie;
- Emergency Mode;
- Recovery Mode;
- veiligheidskopieën;
- spelersbibliotheek;
- villainkoppeling;
- rapportopbouw buiten de potwaarden;
- PWA-configuratie.
