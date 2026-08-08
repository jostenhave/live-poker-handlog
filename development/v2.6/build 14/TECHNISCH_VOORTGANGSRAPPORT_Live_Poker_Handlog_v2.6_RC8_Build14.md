# TECHNISCH VOORTGANGSRAPPORT — Live Poker Handlog v2.6 RC8 Build 14

## Herstel
De pot-engine en wizard gebruikten twee verschillende unitconversies. De wizard rekende cash `BB` correct om naar valuta; `analyze()` niet. `toBase()` behandelt cashgames nu expliciet met `a.unit === 'bb' ? n * bb : n`.

## Test
JavaScript-syntax en gerichte unitconversiefixtures zijn groen. De bekende potfixtures 13/19 en de nieuwe €1/€2- en €2/€5-scenario's blijven onderdeel van de fysieke acceptatie.

## Scope
Geen andere pokerlogica aangepast. Punt 2 en 3 worden hierna apart uitgewerkt.
