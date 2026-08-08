# Changelog – Live Poker Handlog v2.6 RC7 Ronde D2.6 Fase 6.7

## Gericht eindherstel

Fase 6.7 verwerkt de laatste blokkerende datumbevinding en twee expliciet goedgekeurde polishpunten.

### Historische datumprikker

De actuele waarde van de mobiele datumprikker wordt bij bevestigen rechtstreeks uit het zichtbare datumveld gelezen.

Daarnaast worden zowel `input` als `change` verwerkt. Daarmee werkt de route op Android ongeacht wanneer de browser de pickerwaarde commit.

Verwacht:

- datum wijzigen en `✓` maakt de working copy dirty;
- opslaan via het kruis bewaart de datum;
- opslaan via **Hand afronden** bewaart de datum;
- `✕` behoudt de oude datum;
- reload toont de opgeslagen datum.

### Historische Villainholecards

Na bevestiging van één kaart worden nu volledig gesloten:

- het controlescherm;
- de kaartkiezer;
- de actieve kaartgroep;
- de tijdelijke rankselectie.

De gebruiker keert direct terug naar **Tafel & spelers** en ziet de gewijzigde kaart.

### Eén niet-Hero-winnaar in het rapport

De resultaatregel gebruikt voortaan:

```text
<positie> (<spelersnaam>) - wint pot <bedrag>
```

Voorbeeld:

```text
BB (Bastiaan) - wint pot €3
```

Zonder naam:

```text
BB - wint pot €3
```

### Beschermde scope

Niet gewijzigd:

- potengine;
- commitproof;
- resultaatmutator;
- chopformatter;
- kaartverdringingslogica;
- spelerkoppeling;
- actie-invoer;
- bountylogica;
- D2-rebuildgrenzen;
- PWA-bestanden.
