/* Decorative motion never blocks setup or hides instructional content. */
(()=>{
 const section=document.getElementById('reveal'), video=document.getElementById('reveal-video'), coin=document.getElementById('coin-video'), button=document.getElementById('motion-toggle'), progress=document.getElementById('film-progress');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=!preference.matches&&!navigator.connection?.saveData, queued=false, coinVisible=false, coinAuto=false;
 function load(v){const source=v.querySelector('source');if(!source.src){source.src=source.dataset.src;v.load();}}
 function sync(){queued=false;if(!enabled||document.hidden)return;const rect=section.getBoundingClientRect(),distance=section.offsetHeight-innerHeight+77;const fraction=Math.max(0,Math.min(1,-rect.top/Math.max(1,distance)));progress.style.transform=`scaleX(${fraction})`;if(Number.isFinite(video.duration)&&!video.seeking){const time=fraction*Math.max(0,video.duration-.05);if(Math.abs(video.currentTime-time)>.045)video.currentTime=time;}}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(sync);}}
 function apply(){document.body.classList.toggle('motion-off',!enabled);button.textContent=enabled?'Turn motion off':'Turn motion on';button.setAttribute('aria-pressed',String(!enabled));if(enabled){load(video);schedule();if(coinVisible)startCoin();}else{video.pause();coin.pause();}}
 function startCoin(){if(!enabled||coinAuto)return;load(coin);coinAuto=true;coin.play().catch(()=>{coinAuto=false;});}
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);video.addEventListener('loadedmetadata',schedule);video.addEventListener('seeked',()=>{if(enabled)schedule();});button.addEventListener('click',()=>{enabled=!enabled;apply();});preference.addEventListener('change',()=>{enabled=!preference.matches;apply();});
 coin.addEventListener('pointerdown',()=>load(coin),{once:true});coin.addEventListener('keydown',()=>load(coin),{once:true});
 new IntersectionObserver(entries=>{coinVisible=entries[0].isIntersecting;if(coinVisible)startCoin();else coin.pause();},{threshold:.3}).observe(coin);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)coin.pause();else schedule();});apply();
})();
