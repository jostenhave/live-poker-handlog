# TESTRAPPORT AI --- Live Poker Handlog v2.7 Build 8.7

## Bevestigde root cause

De fysieke diagnose liet zien dat de dealerbutton-stap op 300 px
tableboxhoogte bleef staan nadat `visualViewport.height` van circa
526,58 naar 838,40 px was gegroeid. Latere callbacks deden alleen een
fit en geen nieuwe sizing.

## Testmatrix

  --------------------------------------------------------------------------
  Test-ID                 Resultaat               Verificatie
  ----------------------- ----------------------- --------------------------
  TABLE-RSP-01            PASS bronmatig / fysiek `visualViewport.resize`
                          nog te bevestigen       roept de all-refreshroute
                                                  aan; tablebox wordt dus
                                                  opnieuw gesized vóór fit.

  TABLE-RSP-02            PASS bronmatig          Hero gebruikt dezelfde
                                                  `.wz-tablebox`-route.

  TABLE-RSP-03            PASS bronmatig          Geen sessietypefilter;
                                                  cash gebruikt dezelfde
                                                  route.

  TABLE-RSP-04            PASS bronmatig          Geen subtypefilter;
                                                  regulier/KO/PKO/Mystery
                                                  gelijk behandeld.

  TABLE-RSP-05            PASS                    `orientationchange` → all
                                                  refresh → size vóór fit.

  TABLE-RSP-06            PASS                    `window.resize` → all
                                                  refresh → size vóór fit.

  TABLE-RSP-07            PASS                    `visualViewport.resize`
                                                  toegevoegd.

  TABLE-RSP-08            PASS                    ResizeObserver gebruikt
                                                  `rc8RefreshTableVisual`.

  TABLE-RSP-09            PASS bronregressie      effectieve fitfunctie,
                                                  seatbuilder en
                                                  boundsfunctie
                                                  byte-ongewijzigd.

  TABLE-RSP-10            PASS                    300px minimum blijft
                                                  intact.
  --------------------------------------------------------------------------

## Scope

Geen wijziging aan seatgeometry, markerlogica of
poker-/pot-/actionengine.

## Diagnostiek

Geen tijdelijke TafelVisual-diagnostiek aanwezig.

## Syntax

`node --check`: **PASS**.

## Status

**TECHNISCH GO VOOR FYSIEKE VALIDATIE.**
