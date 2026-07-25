# Live Poker HandLog v2.5 RC1 — technisch testoverzicht

Datum: 23 juli 2026

## Opgeleverde versie

- Eén zelfstandig HTML-bestand zonder externe libraries of buildproces.
- Appversie: `v2.5 RC1`.
- Databaseschema: `12`.
- Back-upformaat: `1`.
- Bestaande v2.4-opslag (`hhl:v11:data`) wordt automatisch gemigreerd naar `hhl:v12:data`.

## Uitgevoerde technische controles

- JavaScript-syntaxis gecontroleerd met `node --check`: geslaagd.
- Opstart-smoketest uitgevoerd in een geïsoleerde JavaScript-context met lege opslag: geslaagd; de v12-database wordt aangemaakt.
- Gecontroleerd dat het HTML-bestand zelfstandig is en geen externe scripts, stylesheets of netwerkafhankelijkheden bevat.
- Versievermeldingen in documenttitel, appconstanten, zichtbare versieknop en release notes aangepast.
- Statische controle uitgevoerd op aanwezigheid van:
  - selectieve JSON-export;
  - metadata met back-up-, schema- en appversie;
  - importmodi samenvoegen en vervangen;
  - speler-ID-remapping;
  - sessieconflictafhandeling;
  - veiligheidsback-up en staging;
  - recovery-scherm en Emergency Mode;
  - centrale startstackformatter;
  - veld-voor-veld samenvoegen van villainrecords;
  - cross-street-validatie;
  - waarschuwingen voor impliciete folds en onbekende all-ins.

## Functioneel geïmplementeerd

### Gegevensbeheer

- Export van spelers, sessies/handen en instellingen, afzonderlijk of gecombineerd.
- Eén JSON-bestand met categorie-informatie en versie-/datummetadata.
- Import na voorafgaande bestands- en structuurcontrole.
- Samenvoegen van spelers op ID en genormaliseerde naam.
- Handmatige afhandeling wanneer meerdere lokale spelers dezelfde genormaliseerde naam hebben.
- Remapping van geïmporteerde speler-ID's in sessies en villainrecords.
- Sessies samenvoegen op sessie-ID met expliciete keuze bij inhoudsconflict.
- Instellingen per sleutel samenvoegen; bij vervangen wordt het instellingenobject vervangen en gemigreerd.
- Automatische interne veiligheidsback-up vóór vervangen.
- Staging en validatie vóór promotie naar actieve gegevens.
- Maximaal één `restore_failed`-kopie.

### Recovery

- Recovery-scherm bij ongeldige JSON of ongeldige hoofdstructuur.
- Download van de onleesbare ruwe opslaginhoud.
- Alleen volledige back-ups worden vanuit recovery geaccepteerd.
- Opnieuw proberen blijft beschikbaar.
- Afzonderlijke Emergency Mode-dataset.
- Geheugenmodus met waarschuwing wanneer localStorage niet beschrijfbaar is.

### Handvalidatie en rapportage

- Blokkering van acties na expliciete fold of volledige all-in.
- Blokkering van turnboard zonder volledig flopboard en riverboard zonder turnboard.
- Blokkering van showdown of winnaarstatus voor een expliciet of impliciet gefolde speler.
- Impliciete fold na een betrouwbare latere raise/re-raise, zonder automatische call.
- Eerdere inzet blijft via de bestaande pot-engine meetellen.
- Onbekende all-inomvang geeft een niet-blokkerende waarschuwing; na doorgaan wordt de pot als onbetrouwbaar gemarkeerd.
- Centrale formattering van Hero- en villain-startstacks.
- Cashgame-villainstack gebruikt `stackChips` en is niet afhankelijk van `stackBB`.
- Toernooistacks tonen bb en chips wanneer beide beschikbaar zijn.
- Dubbele villainrecords worden veld voor veld samengevoegd.

## Handmatig te testen

De volgende controles vereisen interactie in een echte browser, bij voorkeur zowel desktop-Chrome als Safari op iPhone:

1. Alle regressiescenario's uit paragraaf 6.1 van het ontwikkelprompt.
2. Download en opnieuw selecteren van alle exportvarianten.
3. Browsermeldingen bij speler- en sessieconflicten.
4. Een volledige importmatrix in lege en gevulde databases.
5. Recovery door doelbewust corrupte localStorage te plaatsen.
6. Emergency Mode met geblokkeerde of volle localStorage.
7. Alle impliciete-foldscenario's op preflop, flop, turn en river.
8. All-ins waarbij de omvang afkomstig is uit actiebedrag, startstack of resterende stack.
9. Onbekende all-ins met callers en potentiële sidepots.
10. Rapport als tekst en afbeelding bij een onbetrouwbare pot.
11. Alle sessietypen voor villain-startstacks, inclusief dubbele villainregistraties.
12. Bestaande kaartduplicaatvalidatie als regressietest.

## Bekende beperkingen en risico's van RC1

- De conflictafhandeling gebruikt browserdialoogvensters (`confirm`/`prompt`). Dit is functioneel, maar nog niet de beoogde definitieve mobiele gebruikersinterface.
- De detectie van impliciete folds is bewust conservatief, maar moet met realistische actievolgorden uitgebreid handmatig worden gevalideerd. Met name meerdere raises op één straat vragen aandacht.
- De bestaande pot-engine heeft geen afzonderlijk sidepotrapport. RC1 onderdrukt betrouwbare potpresentatie bij onbekende all-ins, maar sidepotgedrag moet regressief worden getest met de bestaande showdown- en winnaarsregistratie.
- De technisch geïsoleerde opstarttest simuleert geen volledige browser-DOM, bestandsdownload, canvas of Web Share API.
- Recovery bij volledig onbeschikbare localStorage kan alleen betrouwbaar in een echte browser/privacycontext worden getest.
- RC1 is nadrukkelijk geen definitieve v2.5-release. Eerst moet het volledige acceptatieprotocol worden uitgevoerd en moeten bevindingen worden verwerkt.

## Voorlopig releaseadvies

**GO voor gerichte RC1-test, niet voor definitief gebruik als enige gegevensbron.**

Maak vóór het testen een externe v2.4-back-up of bewaar het bestaande v2.4-HTML-bestand en de huidige browsergegevens. Test import en vervangen eerst met niet-kritische kopieën.
