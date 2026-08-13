/* ---- THE BIFF: NRL ENGINE (overrides nrl()) ---- */
(function(){
var BS=document.createElement('style');
BS.textContent=
"#nb{--bV:#0E0707;--bB:#7A1518;--bBr:#D6272B;--bBg:#FF5457;--bS2:#23262D;--bS3:#2E323B;--bSl:#C7CBD3;--bBd:#D8D3C9;--bG:#E0B354;--bGr:#4ADE80;--bLn:rgba(255,255,255,.13)}"
+"#nb .bhero{background:linear-gradient(165deg,rgba(35,38,45,.85),rgba(14,7,7,.9));border:1px solid var(--bLn);border-radius:16px;padding:16px 18px 18px;margin-bottom:14px}"
+"#nb .beye{font:700 10px ui-monospace,monospace;color:var(--bG);letter-spacing:2px;margin-bottom:8px}"
+"#nb .blede{font:700 17px 'Barlow Condensed',sans-serif;color:var(--bBd)}"
+"#nb .bbig{font:800 clamp(42px,15vw,64px)/.85 'Barlow Condensed',sans-serif;letter-spacing:-1px;color:#fff;text-shadow:0 6px 30px rgba(255,84,87,.5);margin:2px 0 4px}"
+"#nb .bbig i{color:var(--bBg);font-style:normal}"
+"#nb .btail{font:700 15px 'Barlow Condensed',sans-serif;color:#fff}"
+"#nb .bsub{font:600 12.5px sans-serif;color:var(--bSl);margin-top:6px}"
+"#nb .bsum{display:flex;justify-content:space-between;padding:11px 12px;margin-bottom:12px;border:1px solid var(--bLn);border-radius:10px;background:var(--bS2)}"
+"#nb .bsi{text-align:center;flex:1}#nb .bsn{font:800 17px 'Barlow Condensed',sans-serif;color:var(--bG)}#nb .bsl{font:600 8.5px ui-monospace,monospace;color:var(--bBd);letter-spacing:.4px;margin-top:1px}"
+"#nb .brisk{display:flex;border:1px solid var(--bLn);border-radius:9px;overflow:hidden;background:var(--bS2);margin-bottom:6px}"
+"#nb .bropt{flex:1;text-align:center;padding:8px 3px;font:700 10px ui-monospace,monospace;color:var(--bBd);cursor:pointer;border-right:1px solid var(--bLn)}#nb .bropt:last-child{border-right:0}#nb .bropt.on{background:var(--bBr);color:#fff}"
+"#nb .brdesc{font:600 9.5px ui-monospace,monospace;color:var(--bBd);text-align:center;margin-bottom:14px}"
+"#nb .btabs{display:flex;gap:6px;margin-bottom:12px}#nb .btab{flex:1;text-align:center;padding:10px 6px;border-radius:9px;font:700 12px 'Barlow Condensed',sans-serif;background:var(--bS2);border:1px solid var(--bLn);color:var(--bBd);cursor:pointer}#nb .btab.on{background:linear-gradient(155deg,var(--bBr),var(--bB));color:#fff;border-color:transparent}"
+"#nb .bview{display:none}#nb .bview.on{display:block}"
+"#nb .bcard{position:relative;margin-bottom:12px;border-radius:12px;border:1px solid var(--bLn);overflow:hidden;background:var(--bS2)}"
+"#nb .bcard.dim{opacity:.35;filter:grayscale(.4)}"
+"#nb .bacc{position:absolute;left:0;top:0;bottom:0;width:5px}"
+"#nb .bin{padding:12px 14px 13px 17px}"
+"#nb .btop{display:flex;justify-content:space-between;margin-bottom:8px;gap:8px}"
+"#nb .bteams{font:700 15px 'Barlow Condensed',sans-serif;color:#fff}#nb .bvs{color:var(--bBd);font:600 11px sans-serif;padding:0 4px}"
+"#nb .bmeta{font:600 10px ui-monospace,monospace;color:var(--bBd);text-align:right;line-height:1.5;white-space:nowrap}"
+"#nb .bbadges{display:flex;gap:5px;margin-bottom:9px;flex-wrap:wrap}"
+"#nb .bbadge{font:700 9px ui-monospace,monospace;padding:3px 8px;border-radius:10px;background:var(--bS3);border:1px solid var(--bLn);color:var(--bBd)}"
+"#nb .bbadge.boil{color:#1a1305;background:var(--bG);border-color:transparent}#nb .bbadge.grudge{color:#fff;background:var(--bBr);border-color:transparent}#nb .bbadge.good{color:#0d2914;background:#7FE0A0;border-color:transparent}"
+"#nb .bprow{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}"
+"#nb .bpname{font:700 13.5px 'Barlow Condensed',sans-serif;color:#fff}"
+"#nb .bodds{font:800 13px ui-monospace,monospace;padding:5px 11px;border-radius:7px;color:#fff}"
+"#nb .bcbar{height:7px;border-radius:6px;background:var(--bS3);overflow:hidden;margin-bottom:4px}#nb .bcfill{height:100%;border-radius:6px}"
+"#nb .bclab{display:flex;justify-content:space-between;font:600 9.5px ui-monospace,monospace;color:var(--bBd);margin-bottom:11px}#nb .bclab b{color:#fff}"
+"#nb .brd{border-top:1px solid var(--bLn);padding-top:10px}#nb .brdl{font:700 9.5px ui-monospace,monospace;letter-spacing:1px;color:var(--bG);margin-bottom:5px}#nb .brdt{font:400 12.5px/1.55 sans-serif;color:var(--bBd)}#nb .brdt b{color:#fff}"
+"#nb .bmon{display:flex;gap:6px;margin-top:10px;padding-top:9px;border-top:1px solid var(--bLn);font:400 11.5px sans-serif;color:var(--bBd)}#nb .bmon b{color:#fff}"
+"#nb .bwl{display:flex;gap:7px;margin-top:11px;padding-top:10px;border-top:1px solid var(--bLn)}"
+"#nb .wlbtn{flex:1;text-align:center;padding:8px 4px;border-radius:8px;font:700 11px ui-monospace,monospace;background:var(--bS3);border:1px solid var(--bLn);color:var(--bBd);cursor:pointer}"
+"#nb .wlbtn.win.on{background:var(--bGr);color:#0d2914;border-color:transparent}#nb .wlbtn.loss.on{background:var(--bBr);color:#fff;border-color:transparent}"
+"#nb .bmt{margin-top:9px;padding:8px 4px;text-align:center;border-radius:8px;font:700 10px ui-monospace,monospace;letter-spacing:.5px;background:var(--bS3);border:1px dashed rgba(224,179,84,.4);color:var(--bG);cursor:pointer}"
+"#nb .bmp{display:none;padding:10px 11px;border-radius:0 0 8px 8px;background:rgba(224,179,84,.06);border:1px solid rgba(224,179,84,.4);border-top:0}#nb .bmp.on{display:block}"
+"#nb .bml{display:flex;justify-content:space-between;padding:5px 0;font:400 11.5px sans-serif;color:var(--bBd);gap:8px}#nb .bml+.bml{border-top:1px solid rgba(255,255,255,.07)}#nb .bml b{color:#fff}#nb .bml i{font-style:normal;font:800 12px ui-monospace,monospace;color:var(--bG);white-space:nowrap}"
+"#nb .bbb{position:relative;margin-bottom:11px;border-radius:12px;overflow:hidden;border:1px solid rgba(224,179,84,.35);background:var(--bS2)}#nb .bbbin{padding:12px 14px}#nb .bbrank{position:absolute;top:10px;right:12px;font:800 22px 'Barlow Condensed',sans-serif;color:rgba(224,179,84,.25)}"
+"#nb .bbteams{font:700 14px 'Barlow Condensed',sans-serif;color:#fff;margin-bottom:5px}"
+"#nb .bbwhy{font:400 12px/1.5 sans-serif;color:var(--bBd);margin:6px 0}"
+"#nb .bbconf{font:700 9.5px ui-monospace,monospace;color:var(--bG);margin-bottom:4px}"
+"#nb .bsgm{margin-top:12px;padding:12px 14px;border-radius:12px;border:1px dashed rgba(224,179,84,.5);background:rgba(224,179,84,.06)}#nb .bsgmt{font:700 12px 'Barlow Condensed',sans-serif;color:var(--bG);margin-bottom:6px}#nb .bsgml{font:400 11.5px/1.6 sans-serif;color:var(--bBd)}#nb .bsgml b{color:#fff}#nb .bsgmf{font:800 16px ui-monospace,monospace;color:var(--bG);margin-top:6px}"
+"#nb .btrk{border:1px solid var(--bLn);border-radius:12px;padding:13px 14px;background:var(--bS2);margin-top:16px}#nb .btrktop{display:flex;justify-content:space-between;align-items:baseline}#nb .btrkpct{font:800 22px 'Barlow Condensed',sans-serif;color:var(--bG)}#nb .btrksub{font:600 10px ui-monospace,monospace;color:var(--bBd)}#nb .btrkd{font:400 11.5px sans-serif;color:var(--bBd);margin-top:4px}";
document.head.appendChild(BS);

function bhx(h,a){h=String(h).replace('#','');var r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),bl=parseInt(h.substr(4,2),16);return"rgba("+r+","+g+","+bl+","+a+")"}
function bprice(oddsStr,tryOdds){var w=parseFloat(String(oddsStr).replace('$',''));return"$"+(w*tryOdds*.9).toFixed(2)}
var BR={};

function bcard(g){
  var pl=g.pickSide=="home"?g.home:g.away;
  var bh=(g.badges||[]).map(function(b){return'<span class="bbadge '+(b[1]||"")+'">'+E(b[0])+'</span>'}).join("");
  return '<div class="bcard" data-conf="'+g.conf+'"><div class="bacc" style="background:linear-gradient(180deg,'+g.color+','+bhx(g.color,.3)+')"></div><div class="bin" style="background:linear-gradient(115deg,'+bhx(g.color,.14)+',transparent 45%)">'
  +'<div class="btop"><div class="bteams">'+E(g.home)+'<span class="bvs">v</span>'+E(g.away)+'</div><div class="bmeta">'+E(g.venue)+'<br>'+E(g.time)+'</div></div>'
  +'<div class="bbadges">'+bh+'</div>'
  +'<div class="bprow"><div class="bpname">'+E(pl)+' to win</div><div class="bodds" style="background:'+bhx(g.color,.3)+';border:1px solid '+bhx(g.color,.55)+'">'+E(g.odds)+'</div></div>'
  +'<div class="bcbar"><div class="bcfill" style="width:'+g.conf+'%;background:linear-gradient(90deg,'+bhx(g.color,.5)+','+g.color+')"></div></div>'
  +'<div class="bclab"><span>BIFF CONFIDENCE</span><b>'+g.conf+'%</b></div>'
  +'<div class="brd"><div class="brdl">THE RUNDOWN</div><div class="brdt">'+g.rundown+'</div></div>'
  +'<div class="bmon">\uD83D\uDC15\u200D\uD83E\uDDBA <b>'+E(g.mongrel)+'</b> \u2014 mongrel rating, watch this bloke</div>'
  +'<div class="bwl"><div class="wlbtn win" data-id="'+g.id+'" data-r="W">W</div><div class="wlbtn loss" data-id="'+g.id+'" data-r="L">L</div></div>'
  +'<div class="bmt" data-multi="'+g.id+'">MULTIS FOR THIS GAME \u25BE</div>'
  +'<div class="bmp" id="bm-'+g.id+'">'
    +'<div class="bml"><span><b>'+E(pl)+' win</b> + <b>'+E(g.mongrel)+'</b> first try</span><i>'+bprice(g.odds,g.tryFirst)+'</i></div>'
    +'<div class="bml"><span><b>'+E(pl)+' win</b> + <b>'+E(g.mongrel)+'</b> anytime try</span><i>'+bprice(g.odds,g.tryAny)+'</i></div>'
  +'</div>'
  +'</div></div>';
}
function bbest(g,rank){
  var pl=g.pickSide=="home"?g.home:g.away;
  return '<div class="bbb"><div class="bbbin"><div class="bbrank">#'+rank+'</div>'
  +'<div class="bbteams">'+E(g.home)+'<span class="bvs">v</span>'+E(g.away)+'</div>'
  +'<div class="bprow"><div class="bpname" style="color:'+g.color+'">'+E(pl)+'</div><div class="bodds" style="background:'+bhx(g.color,.3)+';border:1px solid '+bhx(g.color,.55)+'">'+E(g.odds)+'</div></div>'
  +'<div class="bbwhy">'+E(g.whyshort)+'</div><div class="bbconf">BIFF CONFIDENCE \u2014 '+g.conf+'%</div>'
  +'<div class="bmt" data-multi="bb-'+g.id+'">MULTIS FOR THIS GAME \u25BE</div>'
  +'<div class="bmp" id="bm-bb-'+g.id+'">'
    +'<div class="bml"><span><b>'+E(pl)+' win</b> + <b>'+E(g.mongrel)+'</b> first try</span><i>'+bprice(g.odds,g.tryFirst)+'</i></div>'
    +'<div class="bml"><span><b>'+E(pl)+' win</b> + <b>'+E(g.mongrel)+'</b> anytime try</span><i>'+bprice(g.odds,g.tryAny)+'</i></div>'
  +'</div>'
  +'</div></div>';
}
function biffTracker(){
  var v=[],k;for(k in BR)v.push(BR[k]);var n=v.length,w=0;v.forEach(function(x){if(x=="W")w++});
  var pct=n?Math.round(w/n*100):null;
  var el=document.getElementById('btrkpct');if(el)el.textContent=pct==null?"\u2014%":pct+"%";
  var el2=document.getElementById('btrksub');if(el2)el2.textContent=n+" OF "+((D.nrl.games||[]).length)+" CALLED";
}

window.nrl=function(){
  var n=D.nrl||{},games=n.games||[];
  var grudge=games.filter(function(g){return(g.badges||[]).some(function(b){return b[1]=="grudge"})}).length;
  var boil=games.filter(function(g){return(g.badges||[]).some(function(b){return b[1]=="boil"})}).length;
  var top4=games.slice().sort(function(a,b){return b.conf-a.conf}).slice(0,4);
  var rm=n.roundMulti||{};
  $("#nb").innerHTML=
   '<div class="bhero"><div class="beye">'+E(n.round||"ROUND")+' \u00b7 '+games.length+' GAMES \u00b7 KICKING OFF NOW</div>'
   +'<div class="blede">Will these</div><div class="bbig">BLUDGERS<i>!!</i></div><div class="btail">have a go today or what</div>'
   +'<div class="bsub">Every pick, every match, colour-coded to the team we\u2019re backing.</div></div>'
   +'<div class="bsum"><div class="bsi"><div class="bsn">'+games.length+'/'+games.length+'</div><div class="bsl">GAMES SCORED</div></div><div class="bsi"><div class="bsn">'+grudge+'</div><div class="bsl">GRUDGE MATCHES</div></div><div class="bsi"><div class="bsn">'+boil+'</div><div class="bsl">BOILOVER WATCH</div></div></div>'
   +'<div class="brisk" id="brisk"><div class="bropt" data-r="safe">SAFE</div><div class="bropt on" data-r="value">VALUE</div><div class="bropt" data-r="biffit">BIFF IT</div></div>'
   +'<div class="brdesc" id="brdesc">Showing everything, ranked by confidence</div>'
   +'<div class="btabs"><div class="btab on" data-view="ball">ALL GAMES</div><div class="btab" data-view="bbest">\uD83C\uDFC6 BEST BETS</div></div>'
   +'<div class="bview on" id="view-ball">'+games.map(function(g){return bcard(g)}).join("")+'</div>'
   +'<div class="bview" id="view-bbest"><p style="font:400 12.5px/1.55 sans-serif;color:#D8D3C9;margin-bottom:12px">Top-rated calls of the round, ranked by BIFF confidence.</p>'
     +top4.map(function(g,i){return bbest(g,i+1)}).join("")
     +(rm.legs?'<div class="bsgm"><div class="bsgmt">\uD83E\uDD4A BIFF\u2019S ROUND MULTI \u2014 ALL 4 BEST BETS</div><div class="bsgml">Legs: '+rm.legs.map(function(l){return"<b>"+E(l)+"</b>"}).join(" + ")+'</div><div class="bsgmf">Combined: '+E(rm.odds)+'</div></div>':"")
   +'</div>'
   +'<div class="btrk"><div class="btrktop"><div class="btrkpct" id="btrkpct">\u2014%</div><div class="btrksub" id="btrksub">0 OF '+games.length+' CALLED</div></div><div class="btrkd">Tap W or L on each game above as it finishes.</div></div>';

  var riskEl=document.getElementById('brisk');
  if(riskEl)riskEl.onclick=function(e){
    var o=e.target.closest('.bropt');if(!o)return;
    document.querySelectorAll('#brisk .bropt').forEach(function(x){x.classList.remove('on')});o.classList.add('on');
    var m=o.dataset.r;
    document.getElementById('brdesc').textContent=m=="safe"?"Showing 70%+ confidence only \u2014 the banker plays":m=="biffit"?"Highlighting the roughies \u2014 lower confidence, bigger price":"Showing everything, ranked by confidence";
    document.querySelectorAll('#nb .bcard').forEach(function(c){var cf=+c.dataset.conf,dim=(m=="safe"&&cf<70)||(m=="biffit"&&cf>=65);c.classList.toggle('dim',dim)});
  };
  var tabsEl=$("#nb").querySelector(".btabs");
  if(tabsEl)tabsEl.onclick=function(e){
    var t=e.target.closest('.btab');if(!t)return;
    document.querySelectorAll('#nb .btab').forEach(function(x){x.classList.remove('on')});t.classList.add('on');
    document.querySelectorAll('#nb .bview').forEach(function(v){v.classList.remove('on')});
    document.getElementById('view-'+t.dataset.view).classList.add('on');
  };
  $("#nb").onclick=function(e){
    var mt=e.target.closest('.bmt');
    if(mt){var pnl=document.getElementById('bm-'+mt.dataset.multi);var o=pnl.classList.toggle('on');mt.textContent="MULTIS FOR THIS GAME "+(o?"\u25B4":"\u25BE");return}
    var wb=e.target.closest('.wlbtn');
    if(wb){var id=wb.dataset.id,r=wb.dataset.r;
      document.querySelectorAll('.wlbtn[data-id="'+id+'"]').forEach(function(b){b.classList.remove('on')});
      if(BR[id]==r){delete BR[id]}else{BR[id]=r;wb.classList.add('on')}
      biffTracker();return}
  };
};
})();
