/* ---- THE BIFF: NRL RENDER ENGINE (builds game cards + W/L toggle into #nb) ---- */
(function(){
var BS=document.createElement('style');
BS.textContent=
"#nb .nroundhdr{font:800 13px ui-monospace,monospace;color:#E0B354;letter-spacing:2px;margin-bottom:10px}"
+"#nb .nmulti{border:1px dashed rgba(224,179,84,.5);background:rgba(224,179,84,.06);border-radius:12px;padding:12px 14px;margin-bottom:14px}"
+"#nb .nmt{font:700 11px ui-monospace,monospace;color:#E0B354;letter-spacing:1px;margin-bottom:6px}"
+"#nb .nml{font:600 13px sans-serif;color:#D8D3C9;margin-bottom:4px}"
+"#nb .nmo{font:800 15px ui-monospace,monospace;color:#4ADE80}"
+"#nb .nhero{background:linear-gradient(165deg,rgba(35,38,45,.85),rgba(14,7,7,.9));border:1px solid rgba(255,255,255,.13);border-radius:16px;padding:16px 18px;margin-bottom:14px}"
+"#nb .neye{font:700 10px ui-monospace,monospace;color:#E0B354;letter-spacing:2px;margin-bottom:8px}"
+"#nb .nbig{font:800 clamp(22px,7vw,32px)/1.1 'Barlow Condensed',sans-serif;color:#fff;margin-bottom:4px}"
+"#nb .nbig i{color:#D6272B;font-style:normal;font-size:70%}"
+"#nb .nsub{font:600 13px sans-serif;color:#D8D3C9;margin-bottom:8px}"
+"#nb .nbadges{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:9px}"
+"#nb .nbadge{font:700 9px ui-monospace,monospace;padding:3px 8px;border-radius:10px;background:#2E323B;border:1px solid rgba(255,255,255,.13);color:#D8D3C9}"
+"#nb .nbadge.good{color:#0d2914;background:#7FE0A0;border-color:transparent}"
+"#nb .nbadge.boil{color:#1a1305;background:#E0B354;border-color:transparent}"
+"#nb .nbadge.grudge{color:#fff;background:#D6272B;border-color:transparent}"
+"#nb .nrb{height:7px;border-radius:6px;background:#2E323B;overflow:hidden;margin-bottom:4px}"
+"#nb .nrbf{height:100%;border-radius:6px}"
+"#nb .nconf{font:700 9.5px ui-monospace,monospace;color:#C7CBD3;margin-bottom:10px}"
+"#nb .nrundown{font:400 12.5px/1.55 sans-serif;color:#C7CBD3;border-top:1px solid rgba(255,255,255,.13);padding-top:10px;margin-bottom:10px}"
+"#nb .nrundown b{color:#fff}"
+"#nb .ntry{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.13);padding-top:9px;flex-wrap:wrap;gap:6px;margin-bottom:10px}"
+"#nb .nmongrel{font:600 11.5px sans-serif;color:#C7CBD3}"
+"#nb .nmongrel b{color:#E0B354}"
+"#nb .ntryodds{display:flex;gap:10px;font:700 10.5px ui-monospace,monospace;color:#D8D3C9}"
+"#nb .nempty{font:600 13px sans-serif;color:#C7CBD3;padding:20px 0}"
+"#nb .nwl{display:flex;border:1px solid rgba(255,255,255,.13);border-radius:9px;overflow:hidden;background:#2E323B}"
+"#nb .nwlbtn{flex:1;text-align:center;padding:8px 3px;font:700 10px ui-monospace,monospace;color:#D8D3C9;cursor:pointer;border-right:1px solid rgba(255,255,255,.13)}"
+"#nb .nwlbtn:last-child{border-right:0}"
+"#nb .nwlbtn.win.on{background:#4ADE80;color:#0d2914}"
+"#nb .nwlbtn.loss.on{background:#D6272B;color:#fff}";
document.head.appendChild(BS);

function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]});}

function confBar(c){
  c=Math.max(0,Math.min(100,c||0));
  var col=c>=75?"#4ADE80":c>=55?"#E0B354":"#D6272B";
  return '<div class="nrb"><div class="nrbf" style="width:'+c+'%;background:'+col+'"></div></div>';
}

function loadR(){try{return JSON.parse(localStorage.getItem("dw")||"{}")}catch(e){return{}}}
function saveR(r){try{localStorage.setItem("dw",JSON.stringify(r))}catch(e){}}

function gameCard(g,R){
  var pickName=g.pickSide==="home"?g.home:g.away;
  var badges=(g.badges||[]).map(function(b){
    return '<span class="nbadge '+esc(b[1]||"")+'">'+esc(b[0])+'</span>';
  }).join("");
  var key="nrl-"+g.id;
  var mark=R[key]||"";
  return ''
  +'<div class="nhero" style="border-left:4px solid '+(g.color||"#4ADE80")+'">'
    +'<div class="neye">'+esc(g.venue||"")+' &middot; '+esc(g.time||"")+'</div>'
    +'<div class="nbig">'+esc(g.home)+' <i>v</i> '+esc(g.away)+'</div>'
    +'<div class="nsub">Pick: <b>'+esc(pickName)+'</b> &middot; '+esc(g.odds||"")+'</div>'
    +(badges?'<div class="nbadges">'+badges+'</div>':'')
    +confBar(g.conf)
    +'<div class="nconf">CONFIDENCE '+(g.conf||0)+'%</div>'
    +(g.rundown?'<div class="nrundown">'+g.rundown+'</div>':'')
    +'<div class="ntry">'
      +(g.mongrel?'<div class="nmongrel"><b>Mongrel:</b> '+esc(g.mongrel)+'</div>':'<div></div>')
      +'<div class="ntryodds">'
        +(g.tryFirst?'<span>1st try $'+g.tryFirst+'</span>':'')
        +(g.tryAny?'<span>Any $'+g.tryAny+'</span>':'')
      +'</div>'
    +'</div>'
    +'<div class="nwl" data-key="'+key+'">'
      +'<div class="nwlbtn win'+(mark==="win"?" on":"")+'" data-v="win">WIN</div>'
      +'<div class="nwlbtn loss'+(mark==="loss"?" on":"")+'" data-v="loss">LOSS</div>'
    +'</div>'
  +'</div>';
}

function multiBlock(m){
  if(!m||!m.legs||!m.legs.length) return "";
  return '<div class="nmulti"><div class="nmt">ROUND MULTI</div>'
    +'<div class="nml">'+m.legs.map(esc).join(" + ")+'</div>'
    +'<div class="nmo">'+esc(m.odds||"")+'</div></div>';
}

window.nrl=function(){
  var host=document.getElementById('nb');
  if(!host) return;
  var n=(window.D && window.D.nrl) || {};
  var games=n.games||[];
  var R=loadR();
  if(!games.length){
    host.innerHTML='<div class="nempty">No NRL data loaded.</div>';
    return;
  }
  host.innerHTML =
    '<div class="nroundhdr">'+esc(n.round||"")+'</div>'
    + multiBlock(n.roundMulti)
    + games.map(function(g){return gameCard(g,R);}).join("");

  host.querySelectorAll(".nwl").forEach(function(el){
    el.querySelectorAll(".nwlbtn").forEach(function(btn){
      btn.addEventListener("click",function(){
        var key=el.getAttribute("data-key");
        var v=btn.getAttribute("data-v");
        var cur=loadR();
        cur[key]=(cur[key]===v)?"":v;
        saveR(cur);
        window.nrl();
      });
    });
  });
};
})();
