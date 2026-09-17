(function(){
  var data = window.SEARCH_DATA || [];
  var box = document.getElementById('q');
  var hits = document.getElementById('hits');
  if(!box) return;
  box.addEventListener('input', function(){
    var q = box.value.trim().toLowerCase();
    hits.innerHTML = '';
    if(q.length < 1){ return; }
    var n = 0;
    for(var i=0;i<data.length && n<30;i++){
      var d = data[i];
      var ti = d.t.toLowerCase().indexOf(q), ci = d.x.toLowerCase().indexOf(q);
      if(ti<0 && ci<0) continue;
      var a = document.createElement('a');
      a.href = d.u;
      var small = document.createElement('small'); small.textContent = d.s;
      a.appendChild(small);
      a.appendChild(document.createTextNode(d.t));
      hits.appendChild(a); n++;
    }
    if(n===0){
      var e = document.createElement('a'); e.textContent = '没有匹配的文章';
      hits.appendChild(e);
    }
  });
})();
