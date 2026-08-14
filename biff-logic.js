/* ---- THE BIFF: LADDER FOOTER ---- */
(function(){
var orig=window.nrl;
window.nrl=function(){
  orig();
  var n=D.nrl||{},lad=n.ladder||[];
  if(!lad.length)return;
  var rows=lad.map(function(t){
    var top8=t.pos<=8;
    return '<div class="blrow'+(top8?' top8':'')+'"><span class="blpos">'+t.pos+'</span><span class="blteam">'+E(t.team)+'</span><span class="blrec">'+t.w+'-'+t.l+'</span><span class="blpts">'+t.pts+'</span><span class="bldiff">'+(t.diff>0?'+':'')+t.diff+'</span></div>';
  }).join('');
  var html='<div class="bladder"><div class="bladtitle">NRL LADDER</div><div class="bladhead"><span></span><span>TEAM</span><span>W-L</span><span>PTS</span><span>+/-</span></div>'+rows+'<div class="bladkey">Top 8 highlighted \u2014 finals cutline</div></div>';
  var host=document.getElementById('nb');
  if(host)host.insertAdjacentHTML('beforeend',html);
};
})();
