# Technisch voortgangsrapport – Live Poker Handlog v2.6 RC7 Ronde D2.6 Fase 6.7

## Aanleiding

De fysieke Fase 6.6-eindmatrix slaagde voor resultaat, openroutes, kaarten, notitie, potoverride, spelerkoppeling, save/discard, reload en recordintegriteit.

Open bleven:

```text
D2.6-F6.6-001
Historische datumwijziging via de datumprikker wordt niet dirty en niet opgeslagen.
```

```text
D2.6-F6.6-UX-001
Na bevestiging van een historische Villainholecard sluit de kaartkiezer niet volledig.
```

Daarnaast is de rapportage bij één niet-Hero-winnaar aangescherpt.

## Datumherstel

### Oorzaak

De datumprikker hield de gekozen waarde alleen in een tijdelijke editorstate bij. Op Android kon de klik op `✓` plaatsvinden voordat de verwachte `change`-route de state betrouwbaar had bijgewerkt.

### Oplossing

Bij Class A-bevestiging wordt de waarde rechtstreeks gelezen uit:

```text
[data-f63-hist-date]
```

Fallback:

```text
picker.value
→ state.value
→ lege waarde
```

Daarnaast synchroniseren zowel `input` als `change` de editorstate.

De bestaande `d26ApplyClassAEdit()` blijft de enige mutatie- en dirty-route.

## Kaartoverlayherstel

`d26ClassBCardCommit()` sluit na bevestiging nu:

```text
UI.wz.d26ClassBCardConfirm
UI.wz.d26InlineBCard
UI.picker
UI.pickRank
UI.cardGroup
```

Daarna volgt één normale render.

De kaartmutator en verdringingsbeslissing zijn niet gewijzigd.

## Niet-Hero-winnaar

Een finale rapportwrapper vervangt uitsluitend de bestaande regel die met `Ik verlies` begint wanneer:

- `outcome = lose`;
- één niet-Hero-winnaar kan worden opgelost.

Resolutie:

- Villain-id;
- `playerId`;
- positie;
- `pos:<positie>`.

Zichtbare vorm:

```text
positie (naam) - wint pot bedrag
```

De bestaande potformatter bepaalt het bedrag. Bij een onbetrouwbare pot wordt geen kunstmatig bedrag toegevoegd.

## Statische controles

- JavaScript-syntax: PASS;
- datum-save leest live DOM-waarde: PASS;
- Android `input`- en `change`-events aanwezig: PASS;
- kaartcommit sluit picker, rank en kaartgroep: PASS;
- rapportwrapper en exacte formatvorm aanwezig: PASS;
- Fase 6.6-chopformatter ongewijzigd: PASS;
- overige beschermde functies gelijk aan Fase 6.6: PASS.

## Status

Statische integratiestatus: PASS.

Gerichte fysieke Android-hertest is verplicht.

Geen release-GO en geen PWA-GO.
