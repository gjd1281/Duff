(function(){
/* SELF-INSTALLING CONTAINER — works even if index.html has no #nb div, so you don't need to find/edit anything there */
if(!document.getElementById('nb')){
  var nbHost=document.createElement('div');
  nbHost.id='nb';
  var anchor=document.getElementById('rb')||document.querySelector('main')||document.body;
  if(anchor && anchor.parentNode) anchor.parentNode.insertBefore(nbHost, anchor.nextSibling);
  else document.body.appendChild(nbHost);
}

/* SELF-SUFFICIENT HELPERS — only defined if app.js hasn't already defined them, so this never breaks either way */
if(typeof window.$!=="function"){window.$=function(s){return document.querySelector(s)}}
if(typeof window.E!=="function"){window.E=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}}

/* SAFE DEFAULTS — fills in any field your data.json doesn't have yet, so games render cleanly instead of showing "undefined" until the schema is updated on the next tiger run */
function bdef(g){
  g=g||{};
  return {
    home:g.home||"TBC", away:g.away||"TBC", pickSide:g.pickSide||"home",
    odds:g.odds||"$0.00", color:g.color||"#7A1518", venue:g.venue||"",
    time:g.time||"", badges:g.badges||[], conf:(g.conf==null?50:g.conf),
    rundown:g.rundown||"Full breakdown coming once the round is scored.",
    mongrel:g.mongrel||"TBC", tryFirst:(g.tryFirst==null?1:g.tryFirst),
    tryAny:(g.tryAny==null?1:g.tryAny), id:g.id||((g.home||"h")+"-"+(g.away||"a")),
    whyshort:g.whyshort||""
  };
}

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
  var n=D.nrl||{},games=(n.games||[]).map(bdef);
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

