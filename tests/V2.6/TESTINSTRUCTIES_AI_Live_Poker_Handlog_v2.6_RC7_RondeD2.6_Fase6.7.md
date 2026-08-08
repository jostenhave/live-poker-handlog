# Testinstructies AI – Live Poker Handlog v2.6 RC7 Ronde D2.6 Fase 6.7

## Testobject

`Live_Poker_Handlog_v2.6_RC7_RondeD2.6_Fase6.7.html`

Gebruik Fase 6.6 als directe referentie.

Wijzig geen code en deploy niets.

Lever een downloadbaar Markdown-rapport met:

```text
GO
GO onder voorwaarden
NO GO
```

---

# 1. Statische controle

## 1.1 Syntax

Voer `node --check` uit.

## 1.2 Beschermde functies

Vergelijk byte-inhoudelijk met Fase 6.6:

```text
analyze()
d23CommitProof()
d26ParsePotOverrideInput()
d26ValidateHeavyPotOverride()
d26ApplyPotOverrideToHand()
d26ApplyCardChoiceToHand()
d26ApplyResultChoiceToHand()
rc7F4ParseBountyCount()
rc7F4ApplyVillainBounty()
d26ResultLiveActors()
d26ApplyClassBResultEdit()
d26ClassBResultRollback()
d26ClassBResultCommit()
f63HistoricalPlayerSelect()
f63HistoricalDateBlock()
f64ResultLabel()
f65ShareProjection()
f65OpenStoredHandReadView()
f66ChopParticipant()
```

---

# 2. Historische datumprikker

Gebruik één opgeslagen hand.

## 2.1 Opslaan via Hand afronden

1. open via potlood;
2. wijzig datum via datumprikker;
3. tik `✓`;
4. ga naar Hand afronden;
5. kies **Wijzigingen opslaan**;
6. reload en open via handkaart en potlood.

Verwacht:

- nieuwe datum behouden;
- working copy dirty na `✓`;
- één handrecord;
- gelijkblijvend hand-ID.

## 2.2 Opslaan via kruis

1. wijzig datum opnieuw;
2. tik `✓`;
3. sluit via kruis.

Verwacht dirty-modal met opslagoptie.

Kies opslaan en controleer na reload de nieuwe datum.

## 2.3 Annuleren

1. open datumeditor;
2. kies andere datum;
3. tik `✕`;
4. sluit of navigeer verder.

Verwacht oorspronkelijke datum.

## 2.4 Geen wijziging

Open datumeditor en bevestig exact dezelfde datum.

Verwacht geen onterechte dirty-state.

---

# 3. Historische Villainholecards

Gebruik een Villain met twee kaartposities.

## 3.1 Kaart 1

1. open kaarteditor via potlood;
2. tik kaart 1;
3. kies andere kaart;
4. bevestig controlescherm.

Verwacht direct:

- controlescherm gesloten;
- kaartkiezer gesloten;
- terug op Tafel & spelers;
- gewijzigde kaart zichtbaar;
- geen extra tik buiten overlay nodig.

## 3.2 Kaart 2

Open daarna opnieuw via het potlood en wijzig kaart 2.

Verwacht dezelfde sluitroute.

## 3.3 Annuleren

Wijzig tijdelijk een kaart en kies terugdraaien.

Verwacht oude kaart en alle overlays gesloten.

## 3.4 Persistentie

Sla op, reload en controleer:

- beide kaarten correct;
- resultaat en acties gelijk;
- één handrecord.

---

# 4. Rapportage één niet-Hero-winnaar

## 4.1 Villain met naam

Maak of wijzig een hand naar één winnaar:

```text
positie = BB
naam = Bastiaan
```

Verwacht exact:

```text
BB (Bastiaan) - wint pot €...
```

Niet toegestaan:

```text
Ik verlies — pot ...
Bastiaan wint ...
```

## 4.2 Villain zonder naam

Verwacht:

```text
BB - wint pot €...
```

## 4.3 Hero en chop

Controleer dat ongewijzigd blijven:

- Hero-winstregel;
- chopregel;
- uitkomstsamenvatting;
- handkaart-openroute.

---

# 5. Gerichte regressie

Controleer minimaal:

- één winnaar → chop;
- chop → één winnaar;
- handkaart en potlood openen;
- datumprikker;
- compacte spelerdropdown;
- Villainnotitie;
- handmatige pot;
- save via kruis;
- discard;
- volledige reload;
- exact één record;
- potfixtures €13, €19 en €41.

---

# 6. Beslisregel

## GO

Alleen wanneer:

- datum via beide saveroutes persistent is;
- annuleren datum correct terugdraait;
- kaartkiezer na bevestigen volledig sluit;
- één niet-Hero-winnaar exact volgens de nieuwe formatvorm verschijnt;
- geen regressie in resultaat, openroutes of recordintegriteit.

## NO GO

Bij datumverlies, onjuiste dirty-modal, achterblijvende kaartoverlay, foutieve winnaarregel, dubbel record of regressie in eerder geaccepteerde functionaliteit.

Dit is geen release-GO en geen PWA-GO.
