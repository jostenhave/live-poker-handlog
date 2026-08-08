# Changelog – Live Poker Handlog v2.6 RC4

**Datum:** 29 juli 2026  
**Basis:** v2.6 RC3

## Kernherstel

- De gekozen eerste vrijwillige preflopactor begrenst de preflopqueue. Posities vóór deze actor worden als impliciete folds behandeld en keren niet later in de straat terug.
- Impliciete preflopfolds blijven ook op flop, turn en river uitgesloten.
- De postflopqueue gebruikt uitsluitend spelers die nog actief zijn en start bij de eerste actieve speler links van de button.
- Onbekende villainstacks blijven “onbekend” en worden niet als nul geïnterpreteerd bij het bepalen van beschikbare acties.

## Conceptregistratie

- Een nieuwe hand krijgt direct de status **Concept**.
- De wizard slaat tussentijds automatisch op.
- Sluiten van de wizard bewaart de concepthand in de sessie.
- Een concepthand kan vanuit het sessieoverzicht worden hervat.
- Bij definitief afronden verandert de status in **Definitief**.

## Navigatie

- De titel `Nieuwe hand – geleid` is verkort tot `Nieuwe hand`.
- Linksboven staat **Vorige stap** voor navigatie binnen de wizard.
- Rechtsboven staat een afzonderlijke **✕** om de registratie te sluiten en als concept te bewaren.
- Op de actiekaart heet de undo-functie **Vorige actie**.
- `Vorige actie` blijft zichtbaar maar is uitgeschakeld zolang nog geen vrijwillige actie is vastgelegd.
- De setupstappen gebruiken **Vorige stap** en **Volgende stap**.

## Actie-invoer en correcties

- De actiekaart bevat **👁 Toon tafel**.
- Toon tafel opent een niet-interactieve overlay met de actuele tafelsituatie.
- De correctielijst is compacter gemaakt.
- **Bewerken** opent opnieuw de reguliere actiekaart, inclusief actie, waardetype en waarde.
- **Straat opnieuw invoeren** start de betreffende straat opnieuw.
- Chipwaarden worden in correcties leesbaar met k-notatie weergegeven.

## Tafel en sessie-instellingen

- Ondersteunde standaard tafelgroottes: **10-, 9-, 8- en 6-handed** voor cashgames en toernooien.
- De sessie-instelling heet **Standaard tafelgrootte**.
- `Mijn seat` is verwijderd als sessie-instelling; Hero-seat wordt per hand bepaald.
- De geleide invoer ondersteunt ook 10-handed.
- De tafelvisual is iets naar links verplaatst om afsnijding rechts te voorkomen.
- `Dealer` wordt letter voor letter verticaal weergegeven.
- `SB n.v.t.` wordt direct visueel verwerkt.
- Hero-kleur blijft voorrang houden op positie- en blindkleuren.
- Een gekozen villainseat kan later worden gewijzigd.

## Blinds en ante

- Bij actieve Big Blind Ante wordt de ante automatisch gelijkgesteld aan de BB.
- Een wijziging van de BB werkt direct door in de ante.
- Het anteveld is bij actieve BBA alleen-lezen.

## Tekst en kaartweergave

- Straatnamen worden in de interface voluit geschreven: Preflop, Flop, Turn en River.
- In het report blijft `PF` behouden.
- Hero-acties worden weergegeven als bijvoorbeeld `Ik (BTN) raise naar 3 BB`.
- Kaarten worden als tekst met gekleurde kaartsymbolen weergegeven; er zijn geen extra kaartafbeeldingen toegevoegd.

## Bekende aandachtspunten voor acceptatietest

- Controleer de beschikbare ruimte en tikvlakken specifiek bij 10-handed op kleine Android-schermen.
- Controleer hervatten van concepten na sluiten en opnieuw openen van de browser.
- Controleer structurele wijzigingen in een eerdere wizardstap en de gevolgen voor latere stappen.
