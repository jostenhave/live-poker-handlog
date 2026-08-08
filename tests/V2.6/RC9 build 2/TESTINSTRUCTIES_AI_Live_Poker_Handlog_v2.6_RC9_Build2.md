# TESTINSTRUCTIES AI — Live Poker Handlog v2.6 RC9 Build 2

## Statisch / automatisch
1. JavaScript-syntax HTML PASS.
2. JavaScript-syntax service worker PASS.
3. Vaste pokerlogica-regressiesuite volledig PASS.
4. `SCHEMA_VERSION=12` en `hhl:v12:data` ongewijzigd.
5. Updatebanner bevat `Nieuwe versie beschikbaar`, `Nu bijwerken` en `Later`.
6. Normale nieuwe worker activeert niet automatisch; `SKIP_WAITING` wordt pas na gebruikerskeuze gestuurd.
7. Legacy-v2.5-bootstrap mag eenmalig automatisch activeren omdat de oude v2.5-client geen updatebanner kent.
8. Definitietelling omvat zowel functiedeclaraties als `naam = function`-toewijzingen.
9. Controleer reviewvoorbeelden: wzSave 9, wzAction 8, rHand 13, editHand 8, wzTable 7, wzPlayers 7, shareText 10, d26InlineAHistoryBody 9.
10. `analyze()` bevat blokcommentaar voor basiseenheid, forced contributions, geregistreerde acties, stackbegrenzing, uncalled return en eindresultaat.
11. Geen meta-commentaar over “Document 1/2/3” in de HTML.

## Fysieke PWA-test — twee fasen
### Fase A: bootstrap vanuit geïnstalleerde v2.5
- Publiceer Build 2 met de testcache.
- Open/sluit de bestaande v2.5-PWA volgens de stapsgewijze instructie.
- Doel: Build 2 actief krijgen zonder lokale data te verliezen.
- Verwachting: bij deze allereerste overgang kan v2.5 nog géén nieuwe updatebanner tonen.

### Fase B: updatebanner werkelijk testen
- Maak/publiceer daarna alleen een nieuwe RC9-testrevisie met een nieuwe cache-identiteit en herkenbare versie-identiteit.
- Open de inmiddels actieve Build 2-PWA.
- Verwacht: `Nieuwe versie beschikbaar`.
- Test eerst `Later`: melding verdwijnt, huidige versie blijft actief.
- Heropen/updatecheck; melding verschijnt opnieuw.
- Kies `Nu bijwerken`.
- Verwacht: eenmalige reload naar de nieuwe testrevisie.
- Controleer lokale speler/sessie en offline heropenen.

Definitieve v2.6-publicatie volgt pas na deze fysieke updateacceptatie.
