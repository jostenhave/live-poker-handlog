# TESTRAPPORT AI --- Live Poker Handlog v2.7 Build 8.8

## Wijziging

Eén generieke functie toegevoegd:

``` js
function rc9SyncFooterToKeyboard(){
 const vv=window.visualViewport;
 const footers=document.querySelectorAll('.wz-footer,.d1-nav-footer,.v27-flow-footer');
 if(!footers.length)return;
 const gap=vv?Math.max(0,window.innerHeight-(vv.height+vv.offsetTop)):0;
 footers.forEach(f=>{f.style.bottom=gap+'px'});
}
```

Aangesloten op: - `visualViewport.resize` - `visualViewport.scroll` -
één initiële directe aanroep.

De bestaande CSS-regels van `.wz-footer`, `.d1-nav-footer` en
`.v27-flow-footer` zijn niet gewijzigd.

## Testmatrix

  ---------------------------------------------------------------------------
  Test-ID                 Resultaat               Verificatie
  ----------------------- ----------------------- ---------------------------
  FOOTER-KB-01            PASS structureel        `.v27-flow-footer` valt
                                                  onder de gedeelde query en
                                                  krijgt dynamisch
                                                  `bottom=gap`.

  FOOTER-KB-02            PASS structureel        `.d1-nav-footer` valt onder
                                                  dezelfde route.

  FOOTER-KB-03            PASS structureel        `.wz-footer` valt onder
                                                  dezelfde route.

  FOOTER-KB-04            PASS structureel        Zonder keyboard is `gap=0`,
                                                  dus `bottom:0` wordt
                                                  hersteld.

  FOOTER-KB-05            PASS structureel        Scrolllistener voert alleen
                                                  dezelfde hoogteberekening
                                                  uit; geen DOM-meting via
                                                  `getBoundingClientRect()`
                                                  en geen
                                                  render/reflow-engine
                                                  toegevoegd.

  FOOTER-KB-06            PASS regressie          `rc8RefreshTableVisual`,
                                                  `rc8FitTableVisual`,
                                                  `rc8SizeTableboxHeight`,
                                                  `rc8FitAllTableVisuals` en
                                                  `rc8ObserveTableVisuals`
                                                  zijn byte-inhoudelijk
                                                  ongewijzigd.
  ---------------------------------------------------------------------------

## Syntax

`node --check`: **PASS**.

## Status

**TECHNISCH GO VOOR FYSIEKE VALIDATIE OP ANDROID.**
