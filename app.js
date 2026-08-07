var D={meta:{engine:"TIGER v12",generated:"",label:"data.json not loaded",sample:true},racing:{meetings:[]},nrl:{games:[],multis:[]}},mi=0,vw="card",R={};
var $=function(s){return document.querySelector(s)};
var E=function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
function ld(){try{R=JSON.parse(localStorage.getItem("dw")||"{}")}catch(e){R={}}}
function sv(){try{localStorage.setItem("dw",JSON.stringify(R))}catch(e){}}
function wet(m){var c=(m.condition||"").toLowerCase();return c.indexOf("soft")>-1||c.indexOf("heavy")>-1}
function adj(r,m){if(!wet(m))return{g:r.gd,d:0};var d=r.pace=="on"?.3:r.pace=="back"?-.3:0;return{g:Math.round((r.gd+d)*100)/100,d:d}}
function rate(g,o){if(o=="ROUGHIE")return{t:"EACH-WAY",e:"\uD83D\uDC34",c:"roughie"};if(g>=8.5)return{t:"WIN",e:"\uD83C\uDFC6",c:"win"};if(g>=8.2)return{t:"WIN",e:"\uD83D\uDD25",c:"win"};if(g>=7.7)return{t:"WIN",e:"\u2705",c:"win"};if(g>=7.3)return{t:"EACH-WAY",e:"\uD83E\uDD48",c:"place"};if(g>=7)return{t:"PLACE",e:"\uD83C\uDFAF",c:"place"};return{t:"AVOID",e:"\u274C",c:""}}
function tier(n){n=n||0;return n>=11?"\uD83E\uDD11\uD83E\uDD11\u26A1\u26A1\uD83D\uDCB0":n>=8?"\u26A1\uD83E\uDD11\u26A1":n>=5?"\u26A1\u26A1":n>=1?"\u26A1":""}
function num(p){return parseFloat(String(p).replace(/[^0-9.]/g,""))||0}
function rough(r){return num(r.price)>=20}
function fire(p){var n=num(p);if(!n)return"";return n<3?"\uD83D\uDD25":"\uD83D\uDD25\uD83D\uDD25"}
function chips(){var m=D.racing.meetings;$("#chips").innerHTML=m.map(function(x,i){return'<button class="chip" aria-pressed="'+(i==mi)+'" data-i="'+i+'">'+E(x.track)+'</button>'}).join("")||'<span style="color:#6E9C8C;font-size:13px">No meetings in data.json</span>'}
function cond(){var m=D.racing.meetings[mi];if(!m)return;$("#cT").textContent=m.track;$("#cC").textContent=m.condition;$("#cR").textContent=m.rail;
var cw=(m.direction||"clockwise")=="clockwise",o=$("#mo");o.setAttribute("keyPoints",cw?"0;1":"1;0");o.parentNode.replaceChild(o.cloneNode(true),o);$("#dir").textContent=cw?"CW":"ACW";
if(wet(m)){$("#pV").textContent="PACE LOCKED \u2014 WET";$("#pD").textContent="On-pace runners +0.30, backmarkers \u22120.30"}
else{$("#pV").textContent="PACE LOCKED \u2014 DRY";$("#pD").textContent="Raw engine scores, no pace adjustment"}}
function slat(r,m,lbl){var a=adj(r,m),v=rate(a.g,rough(r)?"ROUGHIE":r.bet),c=v.c,id=m.id+"-"+r.no,cu=R[id]||"";
return'<article class="card '+c+'"><div class="row"><div class="no">R'+r.no+'</div><div>'
+(lbl?'<div class="meet">'+E(m.track)+'</div>':'')
+'<div class="hn">'+E(r.horse)+'</div><div class="sub"><span class="pr">'+E(r.price)+'</span><span class="tag">TAB</span><span class="tag">'+E((r.pace||"mid").toUpperCase())+'-PACE</span></div>'
+'<div class="sig"><span class="em">'+tier(r.fc)+fire(r.price)+'</span><span class="ct">'+(r.fc||0)+'/15</span><span class="em">'+(r.flags||[]).join(" ")+'</span></div>'
+'</div><div class="gd"><span style="display:block;font:700 8px \'Barlow Condensed\',sans-serif;letter-spacing:.24em;color:#6E9C8C;margin-bottom:3px">GD SCORE</span><b style="font-size:20px" class="'+(a.d>0?"up":a.d<0?"dn":"")+'">'+a.g.toFixed(2)+'</b><i class="'+c+'">'+v.e+' '+v.t+'</i></div></div>'
+'<div class="res" data-id="'+id+'" data-price="'+E(r.price)+'"><button data-v="W" class="'+(cu=="W"?"on":"")+'">W</button><button data-v="P" class="'+(cu=="P"?"on":"")+'">P</button><button data-v="L" class="'+(cu=="L"?"on":"")+'">L</button></div></article>'}
function racing(){var b=$("#rb");
if(vw=="rough"){var out="",any=0;D.racing.meetings.forEach(function(m){(m.races||[]).forEach(function(r){if(rough(r)){out+=slat(r,m,1);any++}})});
b.innerHTML=any?out:'<p style="color:#6E9C8C">No runners at $20 or longer across today\u2019s meetings.</p>';strike();return}
var m=D.racing.meetings[mi];if(!m){b.innerHTML='<p style="color:#6E9C8C">No meeting data.</p>';return}
b.innerHTML=(m.races||[]).map(function(r){return slat(r,m,0)}).join("");strike()}
function nrl(){var n=D.nrl||{},g=(n.games||[]).slice().sort(function(a,b){return b.gd-a.gd}),t3={};g.slice(0,3).forEach(function(x){t3[x.home+x.away]=1});
$("#nb").innerHTML='<div class="sec" style="margin-top:2px">'+E(n.engine||"GD ALGO V1")+" \u00b7 "+E(n.round||"")+'</div>'+(g.map(function(x){var tp=t3[x.home+x.away],ph=x.pick==x.home;
return'<article class="card'+(tp?" win":"")+'"><div class="row" style="grid-template-columns:1fr auto"><div><div class="hn">'+(ph?'<span style="color:#FFB43D">'+E(x.home)+'</span>':E(x.home))+" v "+(!ph?'<span style="color:#FFB43D">'+E(x.away)+'</span>':E(x.away))+'</div><div class="sub"><span class="tag">'+E(x.line)+" "+E(x.odds)+'</span><span class="tag">TRY '+E(x.tryScorer)+'</span>'+(tp?'<span class="meet">TOP 3</span>':"")+'</div></div><div class="gd"><b>'+x.gd.toFixed(2)+'</b></div></div></article>'}).join("")||'<p style="color:#6E9C8C">No games in data.json</p>')
+'<div class="sec">Multis</div>'+(n.multis||[]).map(function(m){return'<article class="card"><div class="row" style="grid-template-columns:1fr auto"><div><div class="hn">'+E(m.name)+'</div><div class="sub"><span class="tag">'+m.legs.map(E).join(" \u00b7 ")+'</span></div></div><div class="gd"><b>'+E(m.odds)+'</b></div></div></article>'}).join("")
+'<p style="color:#6E9C8C;font-size:12px">Suggested only \u2014 you finalise the multis.</p>'}
function strike(){var v=[],k;for(k in R)v.push(R[k]);var n=v.length,h=0,w=0;v.forEach(function(x){if(x!="L")h++;if(x=="W")w++});
if(!n){$("#sr").textContent="\u2014";$("#sc").textContent="No races marked";return}
$("#sr").textContent=Math.round(h/n*100)+"%";$("#sc").textContent=w+" win \u00b7 "+(h-w)+" place \u00b7 "+(n-h)+" loss of "+n}
function toast(msg,bad){var t=$("#toast");$("#toastText").textContent=msg;t.className=(bad?"bad ":"")+"show";clearTimeout(window._tt);window._tt=setTimeout(function(){t.className=""},2600)}
$("#chips").onclick=function(e){var b=e.target.closest(".chip");if(b){mi=+b.dataset.i;chips();cond();racing()}};
document.querySelector(".tabs").onclick=function(e){var b=e.target.closest("button");if(b){vw=b.dataset.v;document.querySelectorAll(".tabs button").forEach(function(x){x.setAttribute("aria-selected",x==b)});racing()}};
$("#rb").onclick=function(e){var b=e.target.closest(".res button");if(!b)return;var wrap=b.parentNode,id=wrap.dataset.id,v=b.dataset.v;
if(R[id]==v){delete R[id];b.classList.remove("on")}else{R[id]=v;wrap.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");
var pr=num(wrap.dataset.price);
if(v=="W"&&pr>=20)toast("Your shout",0);
else if(v=="L"&&pr>0&&pr<3)toast("Don\u2019t back against me",1)}
sv();strike()};
$("#rst").onclick=function(){R={};sv();racing();strike()};
[["#mR",1],["#mN",0]].forEach(function(p){$(p[0]).onclick=function(){$("#mR").setAttribute("aria-selected",!!p[1]);$("#mN").setAttribute("aria-selected",!p[1]);$("#pR").hidden=!p[1];$("#pN").hidden=!!p[1];$("#sb").hidden=!p[1];scrollTo(0,0)}});
fetch("data.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){D=d}).catch(function(){$("#bn").hidden=false;$("#bn").textContent="data.json didn\u2019t load."}).then(function(){
$("#stamp").innerHTML=E(D.meta.engine||"TIGER v12")+"<br>"+E(D.meta.generated||"");
if(D.meta.sample){$("#bn").hidden=false;$("#bn").textContent=D.meta.label||"Sample card"}
ld();chips();cond();racing();nrl();strike()});
