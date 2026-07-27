# Changelog — Live Poker Handlog v2.5 RC6

Releasedatum: 27 juli 2026

## Doel

RC6 is een gerichte correctiebuild op basis van de browseracceptatietest van RC5.

## Opgelost

### Toernooipot via de zichtbare interface

- Small blind en big blind worden altijd direct aan de betreffende speler/positie gekoppeld.
- Een raise vanuit SB of BB wordt als totaalbedrag verwerkt.
- De reeds geposte blind wordt niet nogmaals bovenop het ingevoerde raisebedrag geteld.
- Dezelfde logica geldt voor Regular MTT, PKO, KO en Mystery Bounty, met en zonder big blind ante, en bij invoer in big blinds of chips.
- Straddles worden eveneens direct aan hun positie gekoppeld.

### Import Vervangen

- Voor een destructieve import verschijnt nu vooraf een expliciete bevestiging.
- De melding noemt welke categorieën worden vervangen en dat eerst een veiligheidskopie wordt gemaakt.
- Annuleren laat de actieve gegevens ongewijzigd.

## Expliciet te valideren

### Sessieconflicten bij Samenvoegen

- zelfde naam + andere ID → geen conflict;
- zelfde ID + gelijke inhoud → geen conflict en geen duplicaat;
- zelfde ID + andere inhoud → conflictmelding;
- zelfde naam + gelijke inhoud + andere ID → twee afzonderlijke sessies.

## Technisch

- Versie, HTML-titel en release notes bijgewerkt naar `v2.5 RC6`.
- Forced contributions worden niet meer via tijdelijke dead-moneykeys geplaatst.
- Posities worden altijd via `actorForPos()` gekoppeld.
- JavaScript-syntaxis gecontroleerd met Node.js.

## Niet gewijzigd

- vrijwillige-actieniveaulogica uit RC5;
- importvalidatie;
- Recovery Mode;
- Emergency Mode;
- spelersbibliotheek;
- villainkoppeling;
- kaart- en boardvalidatie;
- PWA-configuratie.

## Backlog

Kaarten die een gefolde speler toont, later apart vastleggen als `getoond na fold` of `geëxposeerd`, zonder deze speler als showdowndeelnemer te behandelen.
