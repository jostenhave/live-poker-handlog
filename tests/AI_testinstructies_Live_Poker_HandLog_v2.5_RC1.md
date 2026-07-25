# AI-testinstructies — Live Poker HandLog v2.5 RC1

## Rol en doel

Je bent een kritische softwaretester met ervaring in mobiele single-page webapps, JavaScript, localStorage, JSON-import/export en pokerlogica.

Voer een grondige acceptatie- en regressietest uit op het aangeleverde bestand **Live_Poker_HandLog_v2.5_RC1.html**.

Het doel is uitsluitend om vast te stellen:

1. of de nieuwe functionaliteit van v2.5 RC1 correct werkt;
2. of bestaande functionaliteit uit v2.4 niet is beschadigd;
3. welke risico’s, fouten en onduidelijkheden nog aanwezig zijn;
4. of RC1 geschikt is als basis voor een volgende release candidate.

**Wijzig de HTML-code niet. Bouw geen nieuwe versie. Doe uitsluitend onderzoek en rapporteer bevindingen.**

---

## Testuitgangspunten

- Het betreft één zelfstandig HTML-bestand zonder externe libraries of buildproces.
- Appversie: **v2.5 RC1**.
- Databaseschema: **12**.
- Bestaande v2.4-opslag gebruikt sleutel `hhl:v11:data` en moet naar v12 kunnen migreren.
- Test waar mogelijk in een echte browseromgeving met DOM, localStorage, bestandsdownloads en browserdialogen.
- Gebruik bij voorkeur minimaal:
  - Chromium/Chrome op desktop;
  - Safari op iPhone of een zo betrouwbaar mogelijke mobiele Safari-simulatie.
- Leg vast welke controles niet uitvoerbaar waren door beperkingen van de testomgeving.
- Maak vóór destructieve import- of recoverytests een afzonderlijke testkopie van de browserdata.

---

## Bekende bevindingen die al zijn gemeld

Bevestig deze bevindingen indien reproduceerbaar, maar presenteer ze als **bekend** en niet als nieuw ontdekte fouten:

1. De selectievakjes en labels bij export en import zijn niet goed uitgelijnd.
2. De toelichting bij import bevat technische taal, waaronder het woord **staging**.
3. De interne veiligheidskopie die vóór **Vervangen** wordt gemaakt, is niet zichtbaar of via de interface terug te zetten.
4. De melding gebruikt de termen **turnboard** en **riverboard** in plaats van **turn card** en **river card**.
5. Bij het toevoegen van een villain toont **Sessiespeler** alleen reeds aan de sessie gekoppelde spelers; overige spelers uit de Spelersbibliotheek zijn daar niet selecteerbaar.
6. De witte vlag bij een hand betekent dat Hero heeft gefold. Dit is door de opdrachtgever geaccepteerd en hoeft niet te worden aangepast.

Ontdek je een bredere oorzaak, extra gevolg of ernstiger risico rond een bekende bevinding, rapporteer dat wel afzonderlijk.

---

# Testaanpak

Voer de test uit in de onderstaande volgorde.

## Fase 1 — Statische codeanalyse

Controleer zonder wijzigingen aan te brengen:

- JavaScript-syntaxis en opstartblokkades;
- dubbele of niet-bestaande functieaanroepen;
- foutgevoelige globale variabelen;
- eventhandlers die niet aan bestaande elementen zijn gekoppeld;
- inconsistenties in opslag- en schemasleutels;
- onveilige of onvolledige JSON-validatie;
- risico op gedeeltelijk overschrijven van gegevens;
- correcte speler-ID-remapping;
- correcte koppeling tussen spelersbibliotheek, sessies, handen en villains;
- mogelijke regressies in potberekening, stacks, acties en rapportage;
- zichtbare teksten met technische of inconsistente terminologie.

Statische vermoedens zijn nog geen bewezen defect. Markeer ze als **code-risico** totdat ze functioneel zijn gereproduceerd.

## Fase 2 — Basissmoketest

Test minimaal:

1. app opent zonder foutmelding;
2. lege database wordt correct aangemaakt;
3. navigatie tussen hoofdschermen werkt;
4. nieuwe cashgame kan worden aangemaakt;
5. nieuw toernooi van ieder ondersteund type kan worden aangemaakt;
6. een hand kan worden aangemaakt, opgeslagen, geopend en aangepast;
7. gegevens blijven na herladen beschikbaar;
8. versie- en release-informatie tonen consequent v2.5 RC1.

## Fase 3 — Migratie van v2.4 naar v2.5 RC1

Maak of simuleer een geldige v2.4-dataset in `hhl:v11:data`.

Controleer:

- automatische migratie naar schema 12;
- behoud van spelers;
- behoud van sessies en handen;
- behoud van instellingen;
- behoud van algemene en handspecifieke notities;
- behoud van seats, posities, stacks, acties, boards, showdown en resultaten;
- voorkomen van duplicatie bij opnieuw openen;
- gedrag wanneer zowel v11- als v12-data aanwezig zijn;
- gedrag bij ontbrekende of oudere velden.

## Fase 4 — Gegevensbeheer: export

Test alle zeven niet-lege combinaties van:

- Spelers;
- Sessies en handen;
- Instellingen.

Controleer per export:

- alleen geselecteerde categorieën zijn opgenomen;
- JSON is geldig en opnieuw importeerbaar;
- metadata bevat minimaal datum, appversie, schemaversie en opgenomen categorieën;
- aantallen objecten kloppen;
- referenties tussen sessies, handen en spelers blijven bruikbaar;
- deselecteren van alle categorieën wordt correct afgehandeld;
- download werkt op desktop en mobiel;
- bestandsnaam is geldig voor het besturingssysteem;
- bijzondere tekens in namen of notities beschadigen het bestand niet.

## Fase 5 — Gegevensbeheer: import en samenvoegen

Voer minimaal deze matrix uit:

| Lokale database | Importbestand | Modus |
|---|---|---|
| leeg | volledige back-up | Samenvoegen |
| leeg | gedeeltelijke back-up | Samenvoegen |
| gevuld | nieuwe objecten | Samenvoegen |
| gevuld | identieke objecten | Samenvoegen |
| gevuld | conflicterende spelers | Samenvoegen |
| gevuld | conflicterende sessies | Samenvoegen |
| gevuld | alleen instellingen | Samenvoegen |

Controleer:

- spelersmatching op ID;
- spelersmatching op genormaliseerde naam;
- namen met hoofdletterverschil, voor-/achterspaties en dubbele spaties;
- twee lokale spelers met dezelfde genormaliseerde naam;
- speler-ID-remapping in sessies en villainrecords;
- geen verweesde spelerreferenties;
- geen onbedoelde dubbele handen;
- sessieconflicten worden expliciet en begrijpelijk afgehandeld;
- annuleren van een conflict laat de actieve database intact;
- instellingen worden per sleutel correct samengevoegd;
- import van een categorie die niet in het bestand zit is niet selecteerbaar of wordt veilig geweigerd.

## Fase 6 — Gegevensbeheer: vervangen

Test met een gevulde lokale database en een geldige volledige en gedeeltelijke back-up.

Controleer:

- vóór wijziging wordt een interne veiligheidskopie gemaakt;
- de actieve data worden pas aangepast nadat het gehele bestand is gevalideerd;
- mislukte import laat de oorspronkelijke database intact;
- alleen geselecteerde categorieën worden vervangen;
- niet-geselecteerde categorieën blijven behouden;
- instellingen worden correct gemigreerd;
- na herladen staat nog steeds de verwachte dataset actief;
- datum/tijd en inhoud van de interne veiligheidskopie zijn technisch correct;
- beschrijf expliciet dat RC1 geen zichtbare herstelknop biedt en beoordeel het risico daarvan.

## Fase 7 — Ongeldige importbestanden

Test minimaal:

- leeg bestand;
- ongeldige JSON;
- geldige JSON met verkeerde hoofdstructuur;
- ontbrekende metadata;
- onbekende back-upversie;
- nieuwer schema dan de app ondersteunt;
- ontbrekende verplichte velden;
- verkeerde datatypen;
- dubbele IDs;
- deels geldige en deels ongeldige categorieën;
- extreem grote tekstvelden;
- onverwachte extra velden;
- bestand met alleen één geldige categorie.

Controleer dat:

- een duidelijke melding verschijnt;
- geen gedeeltelijke import plaatsvindt;
- bestaande gegevens intact blijven;
- de gebruiker veilig kan terugkeren en opnieuw proberen.

## Fase 8 — Recovery en Emergency Mode

Simuleer afzonderlijk:

1. ongeldige JSON in de hoofdopslagsleutel;
2. geldige JSON met ongeldige hoofdstructuur;
3. ontbrekende hoofdopslag;
4. localStorage dat niet schrijfbaar is;
5. localStorage-quota overschreden, voor zover uitvoerbaar;
6. een al bestaande `restore_failed`-kopie.

Controleer:

- recovery-scherm verschijnt wanneer dat hoort;
- onleesbare ruwe inhoud kan worden gedownload;
- alleen een geschikte volledige back-up als herstelbestand wordt geaccepteerd;
- opnieuw proberen werkt;
- maximaal één `restore_failed`-kopie wordt bewaard;
- Emergency Mode gebruikt een afzonderlijke dataset;
- duidelijk zichtbaar blijft dat gegevens in Emergency Mode of geheugenmodus mogelijk niet duurzaam worden opgeslagen;
- de normale dataset niet stilzwijgend wordt overschreven.

## Fase 9 — Spelersbibliotheek en sessiespelers

Test bij cashgames en alle toernooitypen:

- speler aanmaken in Spelersbibliotheek;
- speler toevoegen aan een sessie;
- algemene notitie behouden;
- sessiespecifieke seat en notitie opslaan;
- Hero-seat instellen;
- speler verwijderen uit sessie zonder bibliotheekrecord onbedoeld te verwijderen;
- speler uit bibliotheek verwijderen en gevolgen voor bestaande sessies/handen;
- dubbele namen;
- namen met accenten, emoji en apostrof;
- wisselen van tafel en seats;
- toevoegen van villain aan een hand.

Leg specifiek vast dat in RC1 overige bibliotheekspelers niet direct in het veld **Sessiespeler** verschijnen, en onderzoek of hierdoor data verloren gaan of alleen een extra handeling nodig is.

## Fase 10 — Handregistratie en cross-street-validatie

Test minimaal de volgende regels:

### Board

- flop met precies drie kaarten;
- turn card zonder volledige flop;
- river card zonder turn card;
- dubbele kaart op board;
- kaart die ook als holecard voorkomt;
- board verwijderen nadat latere straten zijn ingevuld;
- runoutscenario’s, indien beschikbaar.

### Acties

- actie na expliciete fold;
- actie na volledige all-in;
- showdown voor een expliciet gefolde speler;
- winnaarstatus voor een gefolde speler;
- meerdere acties van dezelfde speler op één straat;
- raise, re-raise, call en fold in verschillende volgorden;
- straat zonder acties;
- bewerken van een eerdere straat nadat latere straten bestaan.

Controleer dat blokkades terecht zijn, meldingen begrijpelijk zijn en geldige pokerlijnen niet onterecht worden geblokkeerd.

## Fase 11 — Impliciete folds

Gebruik minimaal deze scenario’s op preflop én postflop:

1. A bet, B call, C raise, A en B krijgen geen vervolgactie;
2. A bet, B raise, A call;
3. A bet, B raise, A fold;
4. A bet, B raise, C call, A ontbreekt;
5. A raise, B re-raise, C call, A call, B heeft geen extra actie nodig;
6. meerdere raises op dezelfde straat;
7. speler is all-in vóór een latere raise;
8. speler heeft eerder chips ingelegd maar foldt impliciet;
9. latere straat bevat actie van een speler die volgens de analyse impliciet gefold zou zijn;
10. onvolledige of onbetrouwbare actiebedragen.

Controleer:

- impliciete fold wordt alleen toegepast wanneer dat logisch betrouwbaar is;
- er wordt nooit automatisch een call aangenomen;
- eerder ingelegde chips blijven in de pot;
- gefolde speler kan niet als winnaar of showdownspeler worden opgeslagen;
- de rapportage benoemt de hand niet onjuist;
- conservatieve twijfelgevallen worden gewaarschuwd in plaats van stil geïnterpreteerd.

## Fase 12 — Potberekening en all-ins

Test cashgames en toernooien met bedragen in chips en waar relevant in bb.

Minimale scenario’s:

- blinds zonder verdere actie;
- limp-pot;
- raise en één caller;
- raise en meerdere callers;
- re-raisepot;
- fold na eerder ingelegde chips;
- volledige all-in met bekend actiebedrag;
- all-in afgeleid uit startstack;
- all-in afgeleid uit resterende stack;
- all-in waarvan de omvang onbekend is;
- onbekende all-in met één caller;
- onbekende all-in met meerdere spelers en mogelijke sidepot;
- meerdere all-ins met verschillende stacks;
- cashgame met straddle, re-straddle en button straddle;
- toernooi met big blind ante.

Controleer:

- eindpot bevat blinds, antes, straddles en alle eerdere bijdragen exact één keer;
- calls worden begrensd door beschikbare stack;
- een korte all-in wordt niet als volledige raise behandeld wanneer dat niet mag;
- onbekende all-in geeft een waarschuwing;
- na doorgaan wordt de pot zichtbaar als onbetrouwbaar gemarkeerd;
- tekst- en beeldrapport doen geen schijnprecisie voor een onbetrouwbare pot;
- bestaande v2.4-potlogica is niet verslechterd.

## Fase 13 — Startstacks en villainrecords

Test per sessietype:

- Cashgame;
- Regular MTT;
- PKO;
- KO;
- Mystery Bounty.

Controleer:

- Hero-startstack bovenaan correct;
- villain-startstack bovenaan correct;
- cashgame-villainstack gebruikt chips en is niet afhankelijk van een bb-veld;
- toernooistack toont chips en bb wanneer beide beschikbaar zijn;
- Nederlandse getalnotatie blijft correct;
- invoer zoals `10k`, `1,5k` en duizendtallen blijft werken volgens de bestaande regels;
- nul, leeg en onbekend worden niet met elkaar verward;
- dubbele villainrecords voor dezelfde speler worden veld voor veld samengevoegd;
- holecards, note, seat, positie en startstack verdwijnen niet bij samenvoegen;
- conflicterende waarden worden voorspelbaar opgelost en niet willekeurig overschreven.

## Fase 14 — Rapportage en delen

Test tekst- en beeldrapport voor:

- gewonnen hand;
- verloren hand;
- split pot;
- Hero foldt;
- showdown met bekende kaarten;
- geen showdown;
- cashgame;
- ieder toernooitype;
- bountyresultaten;
- onbekende/onbetrouwbare pot;
- lange speler- en sessienamen;
- lange notities;
- meerdere villains;
- dubbele villainregistratie die is samengevoegd.

Controleer:

- geen dubbele of ontbrekende informatie;
- bedragen en stacks consistent;
- Hero-holecards op de juiste plek;
- board en actievolgorde correct;
- rapport bevat geen interne technische termen;
- afbeelding is niet afgesneden of onleesbaar;
- delen/downloaden werkt waar de browser dit ondersteunt.

## Fase 15 — Algemene regressietest v2.4

Controleer minimaal dat onderstaande bestaande functies nog werken:

- alle sessietypen;
- sessie aanmaken, bewerken en verwijderen;
- spelers beheren;
- Hero-seat;
- nieuwe tafel;
- alle straten registreren;
- Quick Log;
- kaarten invoeren en verwijderen;
- Hero- en villain-startstacks;
- straddles;
- big blind ante;
- bountyregistratie;
- showdown;
- potberekening;
- Nederlandse getalnotatie;
- rapport als tekst en afbeelding;
- release notes;
- gegevens blijven bewaard na herladen.

---

# Rapportage-eisen

Lever één testprotocol op met de volgende onderdelen.

## 1. Samenvatting

Vermeld:

- geteste versie en bestandsnaam;
- gebruikte testomgeving(en);
- omvang van de test;
- aantallen geslaagde, afgekeurde en niet-uitgevoerde testcases;
- belangrijkste risico’s;
- voorlopig releaseadvies.

## 2. Bevindingenregister

Classificeer iedere bevinding als:

- **Kritiek** — gegevensverlies, app onbruikbaar, ernstige corruptie of structureel fout pokerresultaat;
- **Hoog** — belangrijke functie werkt niet of kan tot materieel onjuiste gegevens leiden;
- **Middel** — functie werkt gedeeltelijk, is misleidend of vraagt een duidelijke workaround;
- **Laag** — tekst, uitlijning, beperkte UX of cosmetische afwijking zonder gegevensrisico.

Gebruik per bevinding deze vaste structuur:

| Veld | Inhoud |
|---|---|
| ID | Uniek nummer, bijvoorbeeld `RC1-001` |
| Status | Nieuw / Bekend / Niet reproduceerbaar |
| Ernst | Kritiek / Hoog / Middel / Laag |
| Onderdeel | Scherm of functie |
| Testcase | Uitgevoerde handeling en testdata |
| Verwacht resultaat | Objectief verwacht gedrag |
| Werkelijk resultaat | Feitelijk waargenomen gedrag |
| Reproduceerbaarheid | Altijd / Regelmatig / Eenmalig / Niet reproduceerbaar |
| Omgeving | Browser, OS en apparaat/simulatie |
| Gegevensrisico | Ja/nee met korte toelichting |
| Technische analyse | Waarschijnlijke oorzaak, alleen wanneer onderbouwd |
| Advies | Concrete oplossingsrichting, zonder code te wijzigen |

Voeg bij visuele of browserafhankelijke bevindingen een screenshot toe wanneer mogelijk.

## 3. Geslaagde tests

Geef een genummerde lijst met testcase, omgeving en resultaat. Schrijf niet alleen “werkt”, maar benoem wat precies is aangetoond.

## 4. Afgekeurde tests

Verwijs naar het bevindingen-ID en geef aan welke teststap faalde.

## 5. Niet-uitgevoerde tests

Vermeld per testcase:

- waarom deze niet uitvoerbaar was;
- welke omgeving of handmatige controle nog nodig is;
- welk risico daardoor openblijft.

## 6. Traceability-overzicht

Maak een tabel die ieder hoofdonderdeel uit deze instructie koppelt aan:

- uitgevoerde testcase(s);
- resultaat Geslaagd/Afgekeurd/Niet uitgevoerd;
- eventueel bevindingen-ID.

## 7. Releaseadvies

Gebruik precies één van deze beoordelingen:

- **GO** — geschikt om door te zetten zonder blokkerende wijzigingen;
- **GO onder voorwaarden** — alleen doorzetten nadat expliciet genoemde punten zijn opgelost of geaccepteerd;
- **NO GO** — onvoldoende betrouwbaar voor een volgende fase.

Onderbouw het advies op basis van gegevensintegriteit, pokerlogica, regressierisico en mobiele bruikbaarheid.

---

# Belangrijke gedragsregels voor de tester

- Verander de broncode niet.
- Maak geen RC2 of andere nieuwe versie.
- Voer geen nieuwe featureverzoeken uit.
- Beoordeel alleen de huidige RC1 en rapporteer voorstellen afzonderlijk.
- Noem een testcase pas geslaagd wanneer deze daadwerkelijk is uitgevoerd.
- Maak geen aannames over browsergedrag dat niet is getest.
- Onderscheid bewezen defecten, vermoedelijke code-risico’s en gebruiksvragen.
- Controleer bij iedere import- of recoverytest expliciet dat de oorspronkelijke data niet stilzwijgend zijn beschadigd.
- Geef nauwkeurigheid en reproduceerbaarheid voorrang boven snelheid.
