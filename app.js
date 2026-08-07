var D={meta:{engine:"TIGER v12",generated:"—",label:"data.json not loaded",sample:true},racing:{meetings:[]},nrl:{games:[],multis:[]}},mi=0,vw="card",po=false,R={};
var $=function(s){return document.querySelector(s)};
var E=function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
function ld(){try{R=JSON.parse(localStorage.getItem("dw")||"{}")}catch(e){R={}}}
function sv(){try{localStorage.setItem("dw",JSON.stringify(R))}catch(e){}}
function adj(r){if(!po)return{g:r.gd,d:0};var d=r.pace=="on"?.3:r.pace=="back"?-.3:0;return{g:Math.round((r.gd+d)*100)/100,d:d}}
function bet(g,o){return g>=7.7?(o=="ROUGHIE"?"ROUGHIE":"WIN"):g>=7?(o=="ROUGHIE"?"ROUGHIE":"PLACE"):"AVOID"}
function chips(){var m=D.racing.meetings;$("#chips").innerHTML=m.map(function(x,i){return'<button class="chip" aria-pressed="'+(i==mi)+'" data-i="'+i+'">'+E(x.track)+'<small>'+E(x.condition)+' · '+E(x.rail)+'</small></button>'}).join("")||'<span style="color:#6FB79A;font-size:13px">No meetings in data.json</span>'}
function cir(){var m=D.racing.meetings[mi];if(!m)return;$("#cT").textContent=m.track+" · "+(m.straight||"");$("#cC").textContent=m.condition;$("#cR").textContent=m.rail;$("#cB").textContent=(m.biasZone||"—")+" (str "+(m.biasStrength||0)+")";var cw=(m.direction||"clockwise")=="clockwise";$("#dir").textContent=cw?"CW":"ACW";var o=$("#mo");o.setAttribute("keyPoints",cw?"0;1":"1;0");o.parentNode.replaceChild(o.cloneNode(true),o)}
function racing(){var m=D.racing.meetings[mi],b=$("#rb");if(!m){b.innerHTML='<p style="color:#6FB79A">No meeting data.</p>';return}
if(vw=="card")b.innerHTML=m.races.map(function(r){var a=adj(r),t=bet(a.g,r.bet),c=t.toLowerCase(),id=m.id+"-"+r.no,cu=R[id]||"";
return'<article class="card '+c+'"><div class="row"><div class="no">R'+r.no+'</div><div><div class="hn">'+E(r.horse)+'</div><div class="mt">'+E(r.price)+' · '+E((r.pace||"mid").toUpperCase())+'-PACE</div><div class="fl">'+(r.flags||[]).join(" ")+'</div></div><div><div class="gd '+(a.d>0?"up":a.d<0?"dn":"")+'">'+a.g.toFixed(2)+'</div><div class="bt '+c+'">'+t+'</div></div></div><div class="res" data-id="'+id+'"><label class="w"><input type="radio" name="x'+id+'" value="W"'+(cu=="W"?" checked":"")+'>W</label><label class="p"><input type="radio" name="x'+id+'" value="P"'+(cu=="P"?" checked":"")+'>P</label><label class="l"><input type="radio" name="x'+id+'" value="L"'+(cu=="L"?" checked":"")+'>L</label></div></article>'}).join("");
if(vw=="favs")b.innerHTML=m.races.map(function(r){var f=r.fav||{},ag=f.name==r.horse,tr=!ag&&f.gd<7.5;
return'<article class="card"><div class="row"><div class="no">R'+r.no+'</div><div><div class="hn">'+E(f.name||"—")+'</div><div class="mt">'+E(f.price||"—")+' · model '+(f.gd||0).toFixed(2)+'</div><div class="mt" style="color:'+(ag?"#57C08A":tr?"#C7402F":"#6FB79A")+'">'+(ag?"Model agrees":tr?"⚠️ Value trap — we are on "+E(r.horse):"Model prefers "+E(r.horse))+'</div></div><div class="gd">'+(f.gd||0).toFixed(2)+'</div></div></article>'}).join("");
if(vw=="h2h"){var K=[["form","Form"],["speed","Speed"],["barrier","Barrier"],["market","Market"]];
b.innerHTML=m.races.map(function(r){var h=r.h2h;if(!h)return"";
return'<article class="h2h"><div class="t"><div>R'+r.no+' '+E(h.a.name)+'<br><span class="mn" style="font-size:13px">GD '+h.a.gd.toFixed(2)+'</span></div><div>'+E(h.b.name)+'<br><span class="mn" style="font-size:13px">GD '+h.b.gd.toFixed(2)+'</span></div></div>'+K.map(function(k){return'<div class="bar"><div class="tk l"><i style="width:'+(h.a[k[0]]||0)*10+'%"></i></div><em>'+k[1]+'</em><div class="tk r"><i style="width:'+(h.b[k[0]]||0)*10+'%"></i></div></div>'}).join("")+'</article>'}).join("")}
strike()}
function nrl(){var n=D.nrl||{},g=(n.games||[]).slice().sort(function(a,b){return b.gd-a.gd}),t3={};g.slice(0,3).forEach(function(x){t3[x.home+x.away]=1});
$("#nb").innerHTML='<div class="sec" style="margin-top:2px">'+E(n.engine||"GD ALGO V1")+' · '+E(n.round||"")+'</div>'+(g.map(function(x){var tp=t3[x.home+x.away],ph=x.pick==x.home;
return'<article class="card'+(tp?" place":"")+'"><div class="row" style="grid-template-columns:1fr auto"><div><div class="hn">'+(ph?'<span style="color:#F2A83B">'+E(x.home)+'</span>':E(x.home))+' v '+(!ph?'<span style="color:#F2A83B">'+E(x.away)+'</span>':E(x.away))+'</div><div class="mt">'+E(x.line)+' '+E(x.odds)+' · 🏉 '+E(x.tryScorer)+(tp?' · TOP 3':'')+'</div></div><div class="gd">'+x.gd.toFixed(2)+'</div></div></article>'}).join("")||'<p style="color:#6FB79A">No games in data.json</p>')
+'<div class="sec">Multis</div>'+(n.multis||[]).map(function(m){return'<article class="card"><div class="row" style="grid-template-columns:1fr auto"><div><div class="hn" style="font-size:16px">'+E(m.name)+'</div><div class="mt">'+m.legs.map(E).join(" · ")+'</div></div><div class="gd">'+E(m.odds)+'</div></div></article>'}).join("")
+'<p style="color:#6FB79A;font-size:12px">Suggested only — you finalise the multis.</p>'}
function strike(){var v=[];for(var k in R)v.push(R[k]);var n=v.length,h=v.filter(function(x){return x!="L"}).length,w=v.filter(function(x){return x=="W"}).length;
if(!n){$("#sr").textContent="—";$("#sc").textContent="No races marked";return}
$("#sr").textContent=Math.round(h/n*100)+"%";$("#sc").textContent=w+" win · "+(h-w)+" place · "+(n-h)+" loss of "+n}
$("#chips").onclick=function(e){var b=e.target.closest(".chip");if(b){mi=+b.dataset.i;chips();cir();racing()}};
document.querySelector(".tabs").onclick=function(e){var b=e.target.closest("button");if(b){vw=b.dataset.v;document.querySelectorAll(".tabs button").forEach(function(x){x.setAttribute("aria-selected",x==b)});racing()}};
$("#pace").onchange=function(e){po=e.target.checked;racing()};
$("#rb").onchange=function(e){var w=e.target.closest(".res");if(w){R[w.dataset.id]=e.target.value;sv();strike()}};
$("#rst").onclick=function(){R={};sv();racing();strike()};
[["#mR",1],["#mN",0]].forEach(function(p){$(p[0]).onclick=function(){$("#mR").setAttribute("aria-selected",!!p[1]);$("#mN").setAttribute("aria-selected",!p[1]);$("#pR").hidden=!p[1];$("#pN").hidden=!!p[1];$("#sb").hidden=!p[1];scrollTo(0,0)}});
fetch("data.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){D=d}).catch(function(){$("#bn").hidden=false;$("#bn").textContent="data.json didn't load."}).then(function(){
$("#stamp").textContent=(D.meta.engine||"TIGER v12")+" · "+(D.meta.generated||"");
if(D.meta.sample){$("#bn").hidden=false;$("#bn").textContent=D.meta.label||"Sample card"}
ld();chips();cir();racing();nrl();strike()});
