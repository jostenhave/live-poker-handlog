# Changelog — Live Poker Handlog v2.6 RC6

**Datum:** 30 juli 2026  
**Basis:** v2.6 RC5a  
**Type release:** brede herstel-RC

## Nummering

Deze versie is genummerd als **RC6** en niet als RC5b. De wijzigingen raken meerdere centrale onderdelen tegelijk: de preflop- en postflopengine, de wizardstate, conceptbeheer, cashgame-straddles, navigatie, validatie, tafelvisual en handafronding. Daarmee is sprake van een inhoudelijk nieuwe release candidate en niet alleen van een kleine hotfix op RC5a.

## Opgelost

### Centrale handstate en actievolgorde

- Impliciete preflopfolds sluiten SB, BB en actieve straddlers uit.
- SB, BB en reguliere straddlers blijven na de eerste vrijwillige actor expliciet in de preflopactiewachtrij.
- Eerder gefolde spelers keren niet terug op flop, turn of river.
- All-inspelers blijven wel in de hand en kunnen winnen, maar krijgen geen nieuwe actie meer.
- De postflopqueue wordt opgebouwd vanuit de cumulatieve spelerstatus en niet opnieuw vanuit alle tafelposities.

### Cashgame-straddles

- Bij een BTN-straddle wordt de stap voor selectie van de eerste vrijwillige actor overgeslagen.
- Met actieve SB start de preflopactie bij SB.
- Met `SB n.v.t.` start de preflopactie bij BB.
- Reguliere straddlers worden niet meer als automatische folds verwerkt.
- Actuele straddlewaarden worden bij één klik op **Volgende stap** verwerkt.

### Wizard en concepten

- De dubbele knop **Vorige stap** in de header is verwijderd.
- Alleen de onderste wizardnavigatie blijft behouden.
- Het kruisje rechtsboven opent altijd een keuzevenster met:
  - Concept bewaren;
  - Concept verwijderen;
  - Doorgaan met registreren.
- Concepten blijven op de opgeslagen wizardstap hervatbaar.

### Validatie

- Een ontbrekende verplichte Hero-startstack geeft een rode foutmelding onder het veld.
- Het startstackveld krijgt foutmarkering en focus.
- De gebruiker blijft op dezelfde wizardstap totdat een geldige waarde is ingevoerd.

### Tafelvisual

- SB-, BB-, BBA- en straddlemarkers worden naar de binnenzijde van het vilt geplaatst.
- BB en BBA krijgen afzonderlijke posities om overlap te voorkomen.
- De kleur- en vormcodering uit RC5a blijft behouden.

### Hand afronden

- Onder **Uitkomst** staan de keuzes:
  - `1 winnaar`;
  - `Chop`.
- Daaronder staat een afzonderlijke sectie **Selecteer winnaar(s)**.
- Bij `1 winnaar` is één selectie toegestaan.
- Bij `Chop` zijn minimaal twee geselecteerde spelers vereist.

### Teksten

- Villain-seatselectie vermeldt zowel de keuzelijst als selectie via de tafel.
- Toernooi-instructies noemen geen straddles.
- Cashgame-instructies noemen actieve straddlers alleen waar relevant.

## Bewust niet opgenomen

- Tijdstip tonen bij handen in het sessieoverzicht blijft een backlogitem voor doorontwikkeling na v2.6.

## Technische controle

- JavaScript-syntaxcontrole uitgevoerd met `node --check`: geslaagd.
