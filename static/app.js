(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Jl="bannerline.mute",jd="bannerline.coach";function Qd(i){return i==="1"}function ep(i){return i?"1":"0"}const jl=[523.25,587.33,659.25,523.25,783.99,659.25,587.33,392];function tp(){let i=!1;try{i=Qd(localStorage.getItem(Jl))}catch{i=!1}let e=null,t=null,n=null,s=0,r=!1,o=0;function a(){if(e)return;const f=window.AudioContext||window.webkitAudioContext;f&&(e=new f,t=e.createGain(),t.gain.value=i?0:1,t.connect(e.destination))}function c(f,d,g,x,m){if(!e||!t)return;const p=e.createOscillator(),v=e.createGain();p.type=x,p.frequency.setValueAtTime(f,d),v.gain.setValueAtTime(1e-4,d),v.gain.exponentialRampToValueAtTime(Math.max(2e-4,m),d+.02),v.gain.exponentialRampToValueAtTime(1e-4,d+g),p.connect(v),v.connect(t),p.start(d),p.stop(d+g+.02)}function l(){n&&(clearInterval(n),n=null)}function u(){if(!e||i||n)return;const f=()=>{if(!e||i)return;const d=e.currentTime+.02,g=jl[s%jl.length];c(g,d,.34,"triangle",.035),c(g/2,d,.4,"sine",.02),s+=1};f(),n=setInterval(f,520)}function h(){try{localStorage.setItem(Jl,ep(i))}catch{}}return{get muted(){return i},unlock(){a(),e&&(e.state==="suspended"&&e.resume(),r=!0,i||u())},toggle(){return a(),i=!i,h(),e&&t&&(t.gain.setTargetAtTime(i?0:1,e.currentTime,.03),e.state==="suspended"&&e.resume()),i?l():r&&u(),i},sfx(f){if(i||(a(),!e||e.state!=="running"))return;const d=e.currentTime+.01;if(f==="send")c(440,d,.08,"triangle",.05),c(660,d+.07,.12,"triangle",.05);else if(f==="nope")c(180,d,.12,"sine",.04);else if(f==="clash"){const g=performance.now();if(g-o<120)return;o=g,c(210,d,.06,"square",.03),c(160,d+.04,.07,"triangle",.03)}else f==="capture"?(c(523,d,.1,"triangle",.05),c(659,d+.09,.1,"triangle",.05),c(784,d+.18,.16,"triangle",.05)):f==="spawn"?c(880,d,.05,"sine",.02):f==="win"?(c(523,d,.12,"triangle",.06),c(659,d+.12,.12,"triangle",.06),c(784,d+.24,.22,"triangle",.07)):f==="lose"&&(c(392,d,.16,"sine",.05),c(311,d+.14,.18,"sine",.05),c(247,d+.3,.28,"triangle",.05))}}}const np="crossing",ip="對岸",sp="一條大路，兩邊兵營",rp="balanced",op={"player-hq":{x:0,z:6.55},"player-bar":{x:1.72,z:3.05},"player-road":{x:0,z:3.05},mid:{x:0,z:0},"enemy-road":{x:0,z:-3.05},"enemy-bar":{x:-1.72,z:-3.05},"enemy-hq":{x:0,z:-6.55}},ap={"player-hq":["player-road"],"player-bar":["player-road"],"player-road":["player-hq","player-bar","mid"],mid:["player-road","enemy-road"],"enemy-road":["mid","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},cp=[{buildingId:"player-hq",x:0,z:5.75,rx:3.15,rz:1.95},{buildingId:"player-bar",x:.12,z:2.25,rx:3.25,rz:1.6},{buildingId:"enemy-bar",x:-.12,z:-2.25,rx:3.25,rz:1.6},{buildingId:"enemy-hq",x:0,z:-5.75,rx:3.15,rz:1.95}],lp=["player-hq","player-road","mid","enemy-road","enemy-hq"],up=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.1},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:30,cap:54,regen:2.25},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:18,cap:48,regen:1.7},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:44,cap:52,regen:0}],$s={id:np,name:ip,blurb:sp,personality:rp,nodes:op,graph:ap,zones:cp,road:lp,buildings:up},Ns=$s.nodes,xl=$s.graph,hp=$s.zones;$s.road;function Ql(i){const e=Math.floor(i*.5);return Math.max(0,Math.min(e,i-8))}function fp(i,e,t,n,s,r){return i>=e?!0:!t||n==null||r?!1:i>=n+s}function eu(i){return i.hqGrace>0&&i.t<i.hqGrace||i.hqAssault>0&&i.t<i.hqAssault}function dp(i,e){return i==="aggressive"?(e.kind==="hq"?40:16)-e.count-e.travel*.5:i==="cautious"?(e.kind==="hq"?-20:0)-e.travel*2-e.count*.05:-e.travel*10-e.count*.01}function pp(i,e,t){let n=null,s=-1/0;const r=e??i.length;for(let o=0;o<r;o++){if(t&&i[o].kind==="hq")continue;const a=i[o].count*10-i[o].travel;a>s&&(s=a,n=i[o])}return n}function mp(i,e,t,n){let s=null,r=-1/0;const o=t??e.length;for(let a=0;a<o;a++){if(n&&e[a].kind==="hq")continue;const c=dp(i,e[a]);c>r&&(r=c,s=e[a])}return s}function gp(i,e){if(e.relief=!1,e.counter=!1,!fp(i.t,i.nextSendAt,i.underAttack,i.alarmAt,i.reactDelay,i.answered)||i.count<2||i.kind==="hq"&&(i.wave||0)>=2)return!1;const n=!!(i.holdWall&&i.underAttack&&i.ownsThreatened&&i.threatenedId),s=n&&i.buildingId===i.threatenedId;if(s&&i.count>=8)return!1;const r=n&&!s;if(i.kind==="hq"&&(i.wave||0)>=1&&!r)return!1;if(r){const u=i.reliefKeep>0?i.reliefKeep:.35,h=i.counterKeep>0?i.counterKeep:u,f=i.relieve?u:h;let d=Math.min(i.count-1,Math.max(0,Math.floor(i.count*f)));if(i.marchCap>0){const v=i.count-i.marchCap;v>d&&(d=v)}const g=i.reliefCap>0?i.reliefCap:12,x=i.counterCap>0?i.counterCap:10;if(i.relieve){const v=Math.min(g,i.count-1),M=i.count-v;M>d&&(d=M)}else{const v=i.count-x;v>d&&(d=v)}if(i.count-d<1)return!1;if(i.relieve)return e.targetId=i.threatenedId,e.keep=d,e.relief=!0,!0;if(i.threatenedKind==="hq"&&i.riposte>0&&i.alarmAt!=null&&i.t<i.alarmAt+i.riposte)return!1;const m=eu(i),p=pp(i.targets,i.targetCount,m);return p?(e.targetId=p.id,e.keep=d,e.counter=!0,!0):!1}if(!r&&i.t<i.nextSendAt&&!(i.kind==="hq"?i.count<14:i.count<i.sendMin)&&!i.opened)return!1;const o=!!(i.underAttack&&i.threatenedId&&!i.pressing);if(!r&&o&&i.buildingId!==i.threatenedId&&i.ownsThreatened){const u=i.reliefKeep>0?i.reliefKeep:.35,h=Math.min(i.count-1,Math.max(0,Math.floor(i.count*u)));return i.count-h<1?!1:(e.targetId=i.threatenedId,e.keep=h,!0)}if(!o){if(i.kind==="hq"){const u=Ql(i.count);if(i.count<14||i.count-u<8)return!1}else if(i.count<i.sendMin)return!1}const a=eu(i),c=mp(i.personality,i.targets,i.targetCount,a);if(!c)return!1;let l=0;if(i.kind==="hq"&&!o){l=Ql(i.count);const u=i.count-14;u>l&&(l=u)}else o?l=i.count>=3?1:0:i.personality==="cautious"&&(l=Math.min(i.count-1,Math.max(0,Math.floor(i.count*.3))));if(i.marchCap>0&&!o){const u=i.count-i.marchCap;u>l&&(l=u)}if(!o&&i.waveKeep>0&&i.kind!=="hq"){const u=Math.floor(i.count*i.waveKeep);u>l&&(l=Math.min(u,i.count-1))}return i.count-l<1?!1:(e.targetId=c.id,e.keep=l,!0)}const xp="long-road",_p="長路",vp="前後哨站，路更長",yp="cautious",Mp={"player-hq":{x:0,z:7.2},"player-road":{x:0,z:5},"player-bar":{x:1.75,z:5},"player-post":{x:0,z:1.35},"enemy-post":{x:0,z:-1.35},"enemy-road":{x:0,z:-5},"enemy-bar":{x:-1.75,z:-5},"enemy-hq":{x:0,z:-7.2}},Sp={"player-hq":["player-road"],"player-road":["player-hq","player-bar","player-post"],"player-bar":["player-road"],"player-post":["player-road","enemy-post"],"enemy-post":["player-post","enemy-road"],"enemy-road":["enemy-post","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},bp=[{buildingId:"player-hq",x:0,z:6.55,rx:3.15,rz:1.15},{buildingId:"player-bar",x:.3,z:4.75,rx:3.2,rz:.95},{buildingId:"player-post",x:0,z:1.45,rx:3.15,rz:1.2},{buildingId:"enemy-post",x:0,z:-1.45,rx:3.15,rz:1.2},{buildingId:"enemy-bar",x:-.3,z:-4.75,rx:3.2,rz:.95},{buildingId:"enemy-hq",x:0,z:-6.55,rx:3.15,rz:1.15}],wp=["player-hq","player-road","player-post","enemy-post","enemy-road","enemy-hq"],Ep=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:14,cap:30,regen:.3},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:22,cap:48,regen:2},{id:"player-post",kind:"barracks",owner:"player",node:"player-post",count:12,cap:36,regen:1.4},{id:"enemy-post",kind:"barracks",owner:"enemy",node:"enemy-post",count:12,cap:36,regen:1.15},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:16,cap:44,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:36,cap:48,regen:0}],Tp={id:xp,name:_p,blurb:vp,personality:yp,nodes:Mp,graph:Sp,zones:bp,road:wp,buildings:Ep},Ap="two-lanes",Rp="雙橋",Cp="左右兩條路，可以分兵",Pp="aggressive",Ip={"player-hq":{x:0,z:6.6},"hub-p":{x:0,z:4.3},"player-west":{x:-1.85,z:1.25},"player-east":{x:1.85,z:1.25},"enemy-west":{x:-1.85,z:-1.25},"enemy-east":{x:1.85,z:-1.25},"hub-e":{x:0,z:-4.3},"enemy-hq":{x:0,z:-6.6}},Lp={"player-hq":["hub-p"],"hub-p":["player-hq","player-west","player-east"],"player-west":["hub-p","enemy-west"],"player-east":["hub-p","enemy-east"],"enemy-west":["player-west","hub-e"],"enemy-east":["player-east","hub-e"],"hub-e":["enemy-west","enemy-east","enemy-hq"],"enemy-hq":["hub-e"]},Dp=[{buildingId:"player-hq",x:0,z:6.15,rx:3.2,rz:1.15},{buildingId:"player-west",x:-1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"player-east",x:1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"enemy-west",x:-1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-east",x:1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-hq",x:0,z:-6.15,rx:3.2,rz:1.15}],Np=["player-hq","hub-p","player-west","enemy-west","hub-e","enemy-hq"],Up=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.28},{id:"player-west",kind:"barracks",owner:"player",node:"player-west",count:18,cap:42,regen:1.8},{id:"player-east",kind:"barracks",owner:"player",node:"player-east",count:18,cap:42,regen:1.8},{id:"enemy-west",kind:"barracks",owner:"enemy",node:"enemy-west",count:14,cap:40,regen:1.45},{id:"enemy-east",kind:"barracks",owner:"enemy",node:"enemy-east",count:14,cap:40,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:40,cap:50,regen:0}],Fp={id:Ap,name:Rp,blurb:Cp,personality:Pp,nodes:Ip,graph:Lp,zones:Dp,road:Np,buildings:Up};function Jo(i,e,t=xl){if(i===e)return[i];if(!t[i]||!t[e])return null;const n={[i]:null},s=[i];for(;s.length;){const r=s.shift(),o=t[r]||[];for(let a=0;a<o.length;a++){const c=o[a];if(!Object.prototype.hasOwnProperty.call(n,c)){if(n[c]=r,c===e){const l=[e];let u=e;for(;n[u];)u=n[u],l.push(u);return l.reverse(),l}s.push(c)}}}return null}const Ar=[$s,Tp,Fp],fc={easy:{id:"easy",label:"易",sendMinScale:.7,periodScale:1.55,regenScale:.6,reactDelay:3.6,firstShift:0,hqGrace:36,marchCap:8},normal:{id:"normal",label:"中",sendMinScale:1,periodScale:1,regenScale:1.08,reactDelay:.45,firstShift:0,hqGrace:20,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:6,hqRegen:.24,waveKeep:.58,maxRelief:1,barBonus:0,hqBonus:10,reliefCap:24,counterCap:16},hard:{id:"hard",label:"難",sendMinScale:.85,periodScale:.9,regenScale:1.16,reactDelay:.35,firstShift:-6,hqGrace:12,hqAssault:60,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:12,hqRegen:.32,waveKeep:.64,maxRelief:1,barBonus:12,hqBonus:18,reliefCap:26,counterCap:16}};function Op(i){for(let e=0;e<Ar.length;e++)if(Ar[e].id===i)return Ar[e];return $s}function zp(i){return fc[i]||fc.normal}function Bp(i,e){const t=e&&e.firstShift?e.firstShift:0;return Math.max(4,i+t)}const vn={clashEvery:.3,clashLoss:4,captureSeconds:.7,marchSpeed:4.8,contactRadius:.92,arriveRadius:.7,enemySendMin:16,enemySendPeriod:10,substep:.05},kp={"enemy-bar":16,"enemy-hq":22};function Hp({garrison:i,attackerCount:e,attackerOwner:t,buildingOwner:n}){const s=Math.max(0,Math.floor(i||0)),r=Math.max(0,Math.floor(e||0));return s>0||r<=0||!t||!n?!1:t!==n}function Gp(i,e,t,n){if(!n)return{progress:0,done:!1};const s=t,r=Math.max(0,i||0)+Math.max(0,e)/s;return r>=1?{progress:1,done:!0}:{progress:r,done:!1}}function Vp(i,e){return{owner:i,count:Math.max(0,Math.floor(e||0)),capture:0}}function Wp(i,e){return i!=="player"?"lose":e==="player"?"win":null}function tu(i,e,t){const n=Math.max(0,Math.floor(Number.isFinite(i)?i:0)),s=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),r=Math.max(0,Math.floor(Number.isFinite(t)?t:0)),o=Math.min(n,s,r),a=n-o,c=s-o;let l=null;return a===0&&c===0?l="none":a>0&&c===0?l="a":c>0&&a===0&&(l="b"),{a,b:c,loss:o,winner:l}}function Xp(i,e){const t=i.map(l=>Math.max(0,Math.floor(l))),n=t.reduce((l,u)=>l+u,0),s=Math.max(0,Math.floor(e));if(n<=0||s<=0)return t.map(()=>0);const r=t.map(l=>l/n*s),o=r.map(l=>Math.floor(l));let a=s-o.reduce((l,u)=>l+u,0);const c=r.map((l,u)=>({i:u,frac:l-Math.floor(l)})).sort((l,u)=>u.frac-l.frac||l.i-u.i);for(let l=0;l<c.length&&a>0;l++)o[c[l].i]+=1,a-=1;return o}function qp(i,e,t,n,s){const r=Math.max(0,i),o=Math.max(0,e);if(!(n>0)||r>=o||!(s>0))return{count:Math.min(r,o>0?Math.max(r,0):r),bank:r>=o?0:t||0};let a=(t||0)+n*s,c=r;const l=Math.floor(a);if(l>0){const u=Math.min(o-c,l);c+=u,a-=l,c>=o&&(c=o,a=0)}return{count:c,bank:a}}function Yp(i,e){const t=i.owner==="enemy"&&e.regenScale>0?e.regenScale:1;let n=i.regen*t;i.owner==="enemy"&&i.kind==="hq"&&e.hqRegen>0&&(n+=e.hqRegen);let s=i.count,r=i.cap;return i.owner==="enemy"&&i.kind==="barracks"&&e.barBonus>0&&(s=Math.min(i.cap,i.count+e.barBonus)),i.owner==="enemy"&&i.kind==="hq"&&e.hqBonus>0&&(s=i.count+e.hqBonus,r=Math.max(i.cap,s)),{id:i.id,kind:i.kind,owner:i.owner,node:i.node,count:s,cap:r,regen:n,baseRegen:i.regen,bank:0,capture:0,upgrades:{haste:0,bulwark:0}}}function Kp(i={}){const e=Op(i.mapId||"crossing"),t=zp(i.difficulty||"normal"),n=e.buildings.map(r=>Yp(r,t)),s={};for(let r=0;r<n.length;r++){const o=n[r];if(o.owner!=="enemy")continue;const a=kp[o.id]??(o.kind==="hq"?22:16);s[o.id]=Bp(a,t)}return{t:0,status:i.status||"playing",ai:i.ai!==!1,clashAcc:0,nextSquadId:1,nextSendAt:s,buildings:n,squads:[],events:[],map:e,nodes:e.nodes,graph:e.graph,personality:e.personality||"balanced",difficulty:t.id,sendMin:vn.enemySendMin*t.sendMinScale,sendPeriod:vn.enemySendPeriod*t.periodScale,reactDelay:t.reactDelay,hqGrace:t.hqGrace>0?t.hqGrace:0,hqAssault:t.hqAssault>0?t.hqAssault:0,marchCap:t.marchCap>0?t.marchCap:0,reliefKeep:t.reliefKeep>0?t.reliefKeep:0,holdWall:!!t.holdWall,riposte:t.riposte>0?t.riposte:0,counterKeep:t.counterKeep>0?t.counterKeep:0,waveKeep:t.waveKeep>0?t.waveKeep:0,maxRelief:t.maxRelief>0?t.maxRelief:0,reliefCap:t.reliefCap>0?t.reliefCap:12,counterCap:t.counterCap>0?t.counterCap:10,alarmAt:null,answered:{},opened:{},waveTurn:{},reliefCount:{}}}function Js(i){return i&&i.nodes||Ns}function _l(i){return i&&i.graph||xl}function Yt(i,e){for(let t=0;t<i.buildings.length;t++)if(i.buildings[t].id===e)return i.buildings[t];return null}function Es(i,e){if(!i)return null;for(let t=0;t<i.squads.length;t++)if(i.squads[t].id===e)return i.squads[t];return null}function mf(i,e,t){if(!i||i.status!=="playing")return{ok:!1,reason:"over"};const n=Es(i,e),s=Yt(i,t);if(!n||n.owner!=="player"||n.count<=0)return{ok:!1,reason:"bad-squad"};if(!s)return{ok:!1,reason:"bad-target"};const r=n.path||[];if(!r.length)return{ok:!1,reason:"no-path"};const o=n.seg>=r.length-1,a=o?r[r.length-1]:r[n.seg],c=o?null:r[n.seg+1];let l;const u=_l(i);if(!c)l=Jo(a,s.node,u);else{const h=Jo(c,s.node,u);if(!h)return{ok:!1,reason:"no-path"};l=h[0]===a?h:[a,...h]}return!l||l.length<2?{ok:!1,reason:"same"}:(n.targetId=s.id,n.path=l,n.seg=0,n.mode="march",i.events.push({type:"retarget",squadId:e,targetId:t,owner:n.owner}),{ok:!0})}const gf=10;function jo(i){return Math.max(0,Math.floor(i||0))*gf}function nu(i,e){let t=0;for(let n=0;n<i.buildings.length;n++){const s=i.buildings[n];s.owner===e&&(t+=s.count)}for(let n=0;n<i.squads.length;n++){const s=i.squads[n];s.owner===e&&(t+=s.count)}return t}function Zp(i){const e=Math.max(0,Math.floor(i.count||0));if(e<=1)return 0;const t=Math.max(1,Math.floor(e*.2));return Math.min(t,6,e-1)}function vl(i,e,t,n=0){if(!i||i.status!=="playing")return{ok:!1,reason:"over"};const s=Yt(i,e),r=Yt(i,t);if(!s||!r||s.id===r.id)return{ok:!1,reason:"bad-target"};const o=Math.max(0,Math.floor(n));if(s.count-o<1)return{ok:!1,reason:"empty"};const a=Jo(s.node,r.node,_l(i));if(!a||a.length<2)return{ok:!1,reason:"no-path"};const c=s.count-o;s.count=o,s.bank=0;const l=Js(i)[a[0]],u={id:`sq${i.nextSquadId++}`,owner:s.owner,count:c,targetId:r.id,path:a,seg:0,x:l.x,z:l.z,mode:"march"};return i.squads.push(u),i.events.push({type:"send",owner:s.owner,count:c,fromId:e,targetId:t}),{ok:!0,count:c,id:u.id}}function $p(i,e,t){let n=vn.marchSpeed*e;for(;n>0&&i.seg<i.path.length-1;){const s=t[i.path[i.seg+1]],r=s.x-i.x,o=s.z-i.z,a=Math.hypot(r,o);if(a<=1e-6){i.x=s.x,i.z=s.z,i.seg+=1;continue}if(a<=n+1e-8)i.x=s.x,i.z=s.z,n-=a,i.seg+=1;else{const c=1/a;i.x+=r*c*n,i.z+=o*c*n,n=0}}}function Jp(i,e){let t=0;for(let n=0;n<i.length-1;n++){const s=e[i[n]],r=e[i[n+1]];t+=Math.hypot(s.x-r.x,s.z-r.z)}return t}const Vi={id:null},fi={targetId:"",keep:0,relief:!1,counter:!1},Qo=[];for(let i=0;i<12;i++)Qo.push({id:"",kind:"",count:0,travel:0});function jp(i){Vi.id=null,Vi.dist=1/0;let e=1/0,t=!1;const n=Js(i);for(let s=0;s<i.squads.length;s++){const r=i.squads[s];if(r.owner!=="player"||r.count<=0||!r.targetId)continue;const o=Yt(i,r.targetId);if(!o||o.owner!=="enemy")continue;t=!0;const a=n[o.node],c=Math.hypot(r.x-a.x,r.z-a.z);c<e&&(e=c,Vi.id=o.id,Vi.dist=c)}return t}function Qp(i,e){const t=Js(i),n=_l(i);let s=0;for(let r=0;r<i.buildings.length&&s<Qo.length;r++){const o=i.buildings[r];if(o.owner!=="player")continue;const a=Jo(e,o.node,n);if(!a)continue;const c=Qo[s];c.id=o.id,c.kind=o.kind,c.count=o.count,c.travel=a.length<2?0:Jp(a,t),s+=1}return s}function em(i){if(!i.ai)return;const e=jp(i);e?i.alarmAt==null&&(i.alarmAt=i.t):i.alarmAt!=null&&(i.alarmAt=null);const t=Yt(i,Vi.id),n=e&&Vi.dist<=vn.arriveRadius,s=i.opened||(i.opened={});let r=null;if(i.holdWall&&e&&t&&t.owner==="enemy"){const o=Js(i),a=o[t.node];let c=1/0;if(a)for(let l=0;l<i.buildings.length;l++){const u=i.buildings[l];if(u.owner!=="enemy"||u.id===t.id||u.count<2)continue;const h=o[u.node];if(!h)continue;const f=(h.x-a.x)*(h.x-a.x)+(h.z-a.z)*(h.z-a.z);f<c&&(c=f,r=u.id)}}for(let o=0;o<i.buildings.length;o++){const a=i.buildings[o];if(a.owner!=="enemy")continue;const c=Qp(i,a.node);if(!gp({t:i.t,nextSendAt:i.nextSendAt[a.id]??0,underAttack:e,alarmAt:i.alarmAt,reactDelay:i.reactDelay,answered:!!i.answered[a.id],count:a.count,kind:a.kind,buildingId:a.id,personality:i.personality,sendMin:i.sendMin,threatenedId:Vi.id,ownsThreatened:!!(t&&t.owner==="enemy"),targets:Qo,targetCount:c,opened:!!s[a.id],pressing:n,hqGrace:i.hqGrace||0,hqAssault:i.hqAssault||0,marchCap:i.marchCap||0,reliefKeep:i.reliefKeep||0,holdWall:!!i.holdWall,counterKeep:i.counterKeep||0,waveKeep:i.waveKeep||0,wave:i.waveTurn[a.id]||0,reliefCap:i.reliefCap||0,counterCap:i.counterCap||0,riposte:i.riposte||0,threatenedKind:t?t.kind:"",relieve:!!(r&&r===a.id&&t&&t.owner==="enemy"&&t.kind==="barracks"&&t.count>=12&&i.maxRelief>0&&(i.reliefCount[a.id]||0)<i.maxRelief&&(i.waveTurn[a.id]||0)%2===0)},fi)||!vl(i,a.id,fi.targetId,fi.keep).ok)continue;s[a.id]=!0,(fi.relief||fi.counter)&&(i.waveTurn[a.id]=(i.waveTurn[a.id]||0)+1),fi.relief&&(i.reliefCount[a.id]=(i.reliefCount[a.id]||0)+1);let h=i.sendPeriod;(fi.relief||fi.counter)&&i.riposte>0&&(h=i.riposte),i.nextSendAt[a.id]=i.t+h,e&&(i.answered[a.id]=!0)}}function tm(i){const e=i.squads,t=new Set,n=[];for(let s=0;s<e.length;s++){const r=e[s];if(r.count<=0||t.has(r.id))continue;let o=null,a=vn.contactRadius;for(let c=0;c<e.length;c++){if(s===c)continue;const l=e[c];if(l.count<=0||t.has(l.id)||l.owner===r.owner)continue;const u=Math.hypot(r.x-l.x,r.z-l.z);u<=a&&(a=u,o=l)}o&&(t.add(r.id),t.add(o.id),n.push([r,o]))}return{pairs:n,paired:t}}function nm(i,e){for(let t=0;t<i.squads.length;t++){const n=i.squads[t];if(n.count<=0)continue;if(e.has(n.id)){n.mode="fight";continue}const s=Yt(i,n.targetId);if(!s){n.mode="march";continue}const r=Js(i)[s.node],o=Math.hypot(n.x-r.x,n.z-r.z);if(n.seg>=n.path.length-1&&o<=vn.arriveRadius)if(s.owner===n.owner){const c=Math.max(0,s.cap-s.count),l=Math.min(n.count,c);l>0&&(s.count+=l,n.count-=l,i.events.push({type:"reinforce",buildingId:s.id,owner:n.owner})),n.count>0&&(n.x=r.x,n.z=r.z,n.mode="march")}else n.mode="siege",n.x=r.x,n.z=r.z;else n.mode="march"}}function im(i,e){let t=!1;for(let s=0;s<e.length;s++){const r=e[s][0],o=e[s][1];if(r.count<=0||o.count<=0)continue;const a=tu(r.count,o.count,vn.clashLoss);r.count=a.a,o.count=a.b,t=!0}const n=new Map;for(let s=0;s<i.squads.length;s++){const r=i.squads[s];if(r.mode!=="siege"||r.count<=0)continue;let o=n.get(r.targetId);o||(o=[],n.set(r.targetId,o)),o.push(r)}for(const[s,r]of n){const o=Yt(i,s);if(!o||r.every(f=>f.owner===o.owner))continue;const a=r.filter(f=>f.owner!==o.owner&&f.count>0);if(!a.length)continue;const c=a.map(f=>f.count),l=c.reduce((f,d)=>f+d,0),u=tu(l,o.count,vn.clashLoss);o.count=u.b;const h=Xp(c,u.a);for(let f=0;f<a.length;f++)a[f].count=h[f];o.count>0&&(o.capture=0),t=!0}t&&i.events.push({type:"clash"})}function sm(i,e){for(let t=0;t<i.buildings.length;t++){const n=i.buildings[t];let s=0,r=null;const o=[];for(let u=0;u<i.squads.length;u++){const h=i.squads[u];h.mode!=="siege"||h.targetId!==n.id||h.count<=0||h.owner!==n.owner&&(s+=h.count,r=h.owner,o.push(h))}const a=Hp({garrison:n.count,attackerCount:s,attackerOwner:r,buildingOwner:n.owner}),c=Gp(n.capture,e,vn.captureSeconds,a);if(n.capture=c.progress,!c.done||!r)continue;const l=Vp(r,s);n.owner=l.owner,n.count=l.count,n.capture=0,n.bank=0;for(let u=0;u<o.length;u++)o[u].count=0;i.events.push({type:"capture",buildingId:n.id,owner:r})}}function rm(i){const e=Yt(i,"player-hq"),t=Yt(i,"enemy-hq"),n=Wp(e&&e.owner,t&&t.owner);n&&i.status==="playing"&&(i.status=n,i.events.push({type:n}))}function om(i,e){if(i.status!=="playing")return;for(let r=0;r<i.buildings.length;r++){const o=i.buildings[r];if(!(o.regen>0)||o.kind!=="barracks"&&o.kind!=="hq")continue;let a=!1;for(let u=0;u<i.squads.length;u++){const h=i.squads[u];if(h.mode==="siege"&&h.targetId===o.id&&h.owner!==o.owner&&h.count>0){a=!0;break}}if(a)continue;const c=o.count,l=qp(o.count,o.cap,o.bank,o.regen,e);o.count=l.count,o.bank=l.bank,o.count>c&&i.events.push({type:"spawn",buildingId:o.id,owner:o.owner})}em(i);const t=Js(i);for(let r=0;r<i.squads.length;r++){const o=i.squads[r];o.mode==="march"&&o.count>0&&$p(o,e,t)}const{pairs:n,paired:s}=tm(i);for(nm(i,s),i.clashAcc+=e;i.clashAcc>=vn.clashEvery;)i.clashAcc-=vn.clashEvery,im(i,n);sm(i,e),i.squads.some(r=>r.count<=0)&&(i.squads=i.squads.filter(r=>r.count>0)),rm(i)}function xf(i,e,t={}){if(!i||i.status!=="playing"||!Number.isFinite(e)||e<=0)return i;t.ai===!1&&(i.ai=!1),t.ai===!0&&(i.ai=!0),i.events.length=0;let n=e;const s=vn.substep;for(;n>1e-8&&i.status==="playing";){const r=Math.min(s,n);om(i,r),i.t+=r,n-=r}return i}const _f={haste:{id:"haste",label:"加速",cost:8,step:4,max:2},bulwark:{id:"bulwark",label:"加固",cost:8,step:4,max:2}};function am(i,e){const t=i&&i.upgrades,n=t&&t[e];return n>0?n:0}function cm(i,e){const t=_f[i];return t?t.cost+Math.max(0,e)*t.step:1/0}function Us(i,e){const t=_f[e];if(!t||!i)return{ok:!1,reason:"bad",cost:0,label:""};const n=am(i,e);if(n>=t.max)return{ok:!1,reason:"max",cost:0,label:t.label,rank:n};const s=cm(e,n);return i.count-s<1?{ok:!1,reason:"troops",cost:s,label:t.label,rank:n}:{ok:!0,cost:s,label:t.label,rank:n}}function lm(i){return!i||i.owner!=="player"||i.kind!=="hq"&&i.kind!=="barracks"?!1:Us(i,"haste").ok||Us(i,"bulwark").ok}function um(i,e){const t=Us(i,e);if(!t.ok)return t;i.upgrades||(i.upgrades={haste:0,bulwark:0}),i.count-=t.cost,i.bank=0;const n=t.rank+1;if(i.upgrades[e]=n,e==="haste"){const s=i.baseRegen>0?i.baseRegen:.6;i.regen=s*1.55**n}else e==="bulwark"&&(i.cap+=10);return{ok:!0,cost:t.cost,rank:n,label:t.label}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yl="170",hm=0,iu=1,fm=2,vf=1,yf=2,jn=3,si=0,Kt=1,At=2,Ti=0,Cs=1,Wi=2,su=3,ru=4,dm=5,Hi=100,pm=101,mm=102,gm=103,xm=104,_m=200,vm=201,ym=202,Mm=203,dc=204,pc=205,Sm=206,bm=207,wm=208,Em=209,Tm=210,Am=211,Rm=212,Cm=213,Pm=214,mc=0,gc=1,xc=2,Fs=3,_c=4,vc=5,yc=6,Mc=7,Mf=0,Im=1,Lm=2,Ai=0,Dm=1,Nm=2,Um=3,Sf=4,Fm=5,Om=6,zm=7,ou="attached",Bm="detached",bf=300,Os=301,zs=302,Sc=303,bc=304,ua=306,Bs=1e3,wi=1001,ea=1002,Zt=1003,wf=1004,br=1005,on=1006,Vo=1007,ti=1008,ri=1009,Ef=1010,Tf=1011,Or=1012,Ml=1013,Yi=1014,Tn=1015,jr=1016,Sl=1017,bl=1018,ks=1020,Af=35902,Rf=1021,Cf=1022,xn=1023,Pf=1024,If=1025,Ps=1026,Hs=1027,wl=1028,El=1029,Lf=1030,Tl=1031,Al=1033,Wo=33776,Xo=33777,qo=33778,Yo=33779,wc=35840,Ec=35841,Tc=35842,Ac=35843,Rc=36196,Cc=37492,Pc=37496,Ic=37808,Lc=37809,Dc=37810,Nc=37811,Uc=37812,Fc=37813,Oc=37814,zc=37815,Bc=37816,kc=37817,Hc=37818,Gc=37819,Vc=37820,Wc=37821,Ko=36492,Xc=36494,qc=36495,Df=36283,Yc=36284,Kc=36285,Zc=36286,zr=2300,Br=2301,xa=2302,au=2400,cu=2401,lu=2402,km=2500,Hm=0,Nf=1,$c=2,Gm=3200,Vm=3201,Uf=0,Wm=1,bi="",Rt="srgb",$t="srgb-linear",ha="linear",dt="srgb",ts=7680,uu=519,Xm=512,qm=513,Ym=514,Ff=515,Km=516,Zm=517,$m=518,Jm=519,Jc=35044,hu="300 es",ni=2e3,ta=2001;class js{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fu=1234567;const Rr=Math.PI/180,Gs=180/Math.PI;function _n(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Ft(i,e,t){return Math.max(e,Math.min(t,i))}function Rl(i,e){return(i%e+e)%e}function jm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Qm(i,e,t){return i!==e?(t-i)/(e-i):0}function Cr(i,e,t){return(1-t)*i+t*e}function e0(i,e,t,n){return Cr(i,e,1-Math.exp(-t*n))}function t0(i,e=1){return e-Math.abs(Rl(i,e*2)-e)}function n0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function i0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function s0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function r0(i,e){return i+Math.random()*(e-i)}function o0(i){return i*(.5-Math.random())}function a0(i){i!==void 0&&(fu=i);let e=fu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function c0(i){return i*Rr}function l0(i){return i*Gs}function u0(i){return(i&i-1)===0&&i!==0}function h0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function f0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function d0(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function En(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Of={DEG2RAD:Rr,RAD2DEG:Gs,generateUUID:_n,clamp:Ft,euclideanModulo:Rl,mapLinear:jm,inverseLerp:Qm,lerp:Cr,damp:e0,pingpong:t0,smoothstep:n0,smootherstep:i0,randInt:s0,randFloat:r0,randFloatSpread:o0,seededRandom:a0,degToRad:c0,radToDeg:l0,isPowerOfTwo:u0,ceilPowerOfTwo:h0,floorPowerOfTwo:f0,setQuaternionFromProperEuler:d0,normalize:ut,denormalize:En};class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,n,s,r,o,a,c,l){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],x=s[0],m=s[3],p=s[6],v=s[1],M=s[4],_=s[7],P=s[2],R=s[5],A=s[8];return r[0]=o*x+a*v+c*P,r[3]=o*m+a*M+c*R,r[6]=o*p+a*_+c*A,r[1]=l*x+u*v+h*P,r[4]=l*m+u*M+h*R,r[7]=l*p+u*_+h*A,r[2]=f*x+d*v+g*P,r[5]=f*m+d*M+g*R,r[8]=f*p+d*_+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=t*h+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(s*l-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_a.makeScale(e,t)),this}rotate(e){return this.premultiply(_a.makeRotation(-e)),this}translate(e,t){return this.premultiply(_a.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _a=new et;function zf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function p0(){const i=kr("canvas");return i.style.display="block",i}const du={};function wr(i){i in du||(du[i]=!0,console.warn(i))}function m0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function g0(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function x0(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const it={enabled:!0,workingColorSpace:$t,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===dt&&(i.r=ii(i.r),i.g=ii(i.g),i.b=ii(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===dt&&(i.r=Is(i.r),i.g=Is(i.g),i.b=Is(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===bi?ha:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const pu=[.64,.33,.3,.6,.15,.06],mu=[.2126,.7152,.0722],gu=[.3127,.329],xu=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_u=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);it.define({[$t]:{primaries:pu,whitePoint:gu,transfer:ha,toXYZ:xu,fromXYZ:_u,luminanceCoefficients:mu,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:pu,whitePoint:gu,transfer:dt,toXYZ:xu,fromXYZ:_u,luminanceCoefficients:mu,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}});let ns;class _0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ns===void 0&&(ns=kr("canvas")),ns.width=e.width,ns.height=e.height;const n=ns.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=kr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ii(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ii(t[n]/255)*255):t[n]=ii(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let v0=0;class Bf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=_n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(va(s[o].image)):r.push(va(s[o]))}else r=va(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function va(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let y0=0;class Pt extends js{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=wi,s=wi,r=on,o=ti,a=xn,c=ri,l=Pt.DEFAULT_ANISOTROPY,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=_n(),this.name="",this.source=new Bf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case ea:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case ea:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=bf;Pt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,s=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,_=(d+1)/2,P=(p+1)/2,R=(u+f)/4,A=(h+x)/4,T=(g+m)/4;return M>_&&M>P?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=R/n,r=A/n):_>P?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=R/s,r=T/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=A/r,s=T/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-x)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class M0 extends js{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Pt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Bf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ki extends M0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kf extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class S0 extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class li{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=x;return}if(h!==x||c!==f||l!==d||u!==g){let m=1-a;const p=c*f+l*d+u*g+h*x,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const P=Math.sqrt(M),R=Math.atan2(P,p*v);m=Math.sin(m*R)/P,a=Math.sin(a*R)/P}const _=a*v;if(c=c*m+f*_,l=l*m+d*_,u=u*m+g*_,h=h*m+x*_,m===1-a){const P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ya.copy(this).projectOnVector(e),this.sub(ya)}reflect(e){return this.sub(ya.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ya=new I,vu=new li;class Fn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Sn):Sn.fromBufferAttribute(r,o),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ro.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ro.copy(n.boundingBox)),ro.applyMatrix4(e.matrixWorld),this.union(ro)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),oo.subVectors(this.max,or),is.subVectors(e.a,or),ss.subVectors(e.b,or),rs.subVectors(e.c,or),di.subVectors(ss,is),pi.subVectors(rs,ss),Pi.subVectors(is,rs);let t=[0,-di.z,di.y,0,-pi.z,pi.y,0,-Pi.z,Pi.y,di.z,0,-di.x,pi.z,0,-pi.x,Pi.z,0,-Pi.x,-di.y,di.x,0,-pi.y,pi.x,0,-Pi.y,Pi.x,0];return!Ma(t,is,ss,rs,oo)||(t=[1,0,0,0,1,0,0,0,1],!Ma(t,is,ss,rs,oo))?!1:(ao.crossVectors(di,pi),t=[ao.x,ao.y,ao.z],Ma(t,is,ss,rs,oo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xn=[new I,new I,new I,new I,new I,new I,new I,new I],Sn=new I,ro=new Fn,is=new I,ss=new I,rs=new I,di=new I,pi=new I,Pi=new I,or=new I,oo=new I,ao=new I,Ii=new I;function Ma(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ii.fromArray(i,r);const a=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),c=e.dot(Ii),l=t.dot(Ii),u=n.dot(Ii);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const b0=new Fn,ar=new I,Sa=new I;class On{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):b0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);const t=ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(Sa)),this.expandByPoint(ar.copy(e.center).sub(Sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new I,ba=new I,co=new I,mi=new I,wa=new I,lo=new I,Ea=new I;class Qr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ba.copy(e).add(t).multiplyScalar(.5),co.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(ba);const r=e.distanceTo(t)*.5,o=-this.direction.dot(co),a=mi.dot(this.direction),c=-mi.dot(co),l=mi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const x=1/u;h*=x,f*=x,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ba).addScaledVector(co,f),d}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){wa.subVectors(t,e),lo.subVectors(n,e),Ea.crossVectors(wa,lo);let o=this.direction.dot(Ea),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,e);const c=a*this.direction.dot(lo.crossVectors(mi,lo));if(c<0)return null;const l=a*this.direction.dot(wa.cross(mi));if(l<0||c+l>o)return null;const u=-a*mi.dot(Ea);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(e,t,n,s,r,o,a,c,l,u,h,f,d,g,x,m){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,f,d,g,x,m)}set(e,t,n,s,r,o,a,c,l,u,h,f,d,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),o=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-x*l,t[9]=-a*c,t[2]=x-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,g=l*u,x=l*h;t[0]=f+x*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=x+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,g=l*u,x=l*h;t[0]=f-x*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+x,t[1]=c*h,t[5]=x*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-x*h}else if(e.order==="XZY"){const f=o*c,d=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+x,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(w0,e,E0)}lookAt(e,t,n){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),gi.crossVectors(n,tn),gi.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),gi.crossVectors(n,tn)),gi.normalize(),uo.crossVectors(tn,gi),s[0]=gi.x,s[4]=uo.x,s[8]=tn.x,s[1]=gi.y,s[5]=uo.y,s[9]=tn.y,s[2]=gi.z,s[6]=uo.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],v=n[3],M=n[7],_=n[11],P=n[15],R=s[0],A=s[4],T=s[8],y=s[12],b=s[1],C=s[5],H=s[9],B=s[13],W=s[2],j=s[6],V=s[10],ie=s[14],N=s[3],se=s[7],re=s[11],K=s[15];return r[0]=o*R+a*b+c*W+l*N,r[4]=o*A+a*C+c*j+l*se,r[8]=o*T+a*H+c*V+l*re,r[12]=o*y+a*B+c*ie+l*K,r[1]=u*R+h*b+f*W+d*N,r[5]=u*A+h*C+f*j+d*se,r[9]=u*T+h*H+f*V+d*re,r[13]=u*y+h*B+f*ie+d*K,r[2]=g*R+x*b+m*W+p*N,r[6]=g*A+x*C+m*j+p*se,r[10]=g*T+x*H+m*V+p*re,r[14]=g*y+x*B+m*ie+p*K,r[3]=v*R+M*b+_*W+P*N,r[7]=v*A+M*C+_*j+P*se,r[11]=v*T+M*H+_*V+P*re,r[15]=v*y+M*B+_*ie+P*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*l*h-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+t*c*d-t*l*f+r*o*f-s*o*d+s*l*u-r*c*u)+m*(+t*l*h-t*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+p*(-s*a*u-t*c*h+t*a*f+s*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=h*m*l-x*f*l+x*c*d-a*m*d-h*c*p+a*f*p,M=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,_=u*x*l-g*h*l+g*a*d-o*x*d-u*a*p+o*h*p,P=g*h*c-u*x*c-g*a*f+o*x*f+u*a*m-o*h*m,R=t*v+n*M+s*_+r*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=v*A,e[1]=(x*f*r-h*m*r-x*s*d+n*m*d+h*s*p-n*f*p)*A,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*A,e[3]=(h*c*r-a*f*r-h*s*l+n*f*l+a*s*d-n*c*d)*A,e[4]=M*A,e[5]=(u*m*r-g*f*r+g*s*d-t*m*d-u*s*p+t*f*p)*A,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*A,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*d+t*c*d)*A,e[8]=_*A,e[9]=(g*h*r-u*x*r-g*n*d+t*x*d+u*n*p-t*h*p)*A,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*p+t*a*p)*A,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*d-t*a*d)*A,e[12]=P*A,e[13]=(u*x*s-g*h*s+g*n*f-t*x*f-u*n*m+t*h*m)*A,e[14]=(g*a*s-o*x*s-g*n*c+t*x*c+o*n*m-t*a*m)*A,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,x=o*u,m=o*h,p=a*h,v=c*l,M=c*u,_=c*h,P=n.x,R=n.y,A=n.z;return s[0]=(1-(x+p))*P,s[1]=(d+_)*P,s[2]=(g-M)*P,s[3]=0,s[4]=(d-_)*R,s[5]=(1-(f+p))*R,s[6]=(m+v)*R,s[7]=0,s[8]=(g+M)*A,s[9]=(m-v)*A,s[10]=(1-(f+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=os.set(s[0],s[1],s[2]).length();const o=os.set(s[4],s[5],s[6]).length(),a=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);const l=1/r,u=1/o,h=1/a;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=h,bn.elements[9]*=h,bn.elements[10]*=h,t.setFromRotationMatrix(bn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ni){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let d,g;if(a===ni)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ta)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ni){const c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),f=(t+e)*l,d=(n+s)*u;let g,x;if(a===ni)g=(o+r)*h,x=-2*h;else if(a===ta)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const os=new I,bn=new Ke,w0=new I(0,0,0),E0=new I(1,1,1),gi=new I,uo=new I,tn=new I,yu=new Ke,Mu=new li;class Rn{constructor(e=0,t=0,n=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ft(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mu.setFromEuler(this),this.setFromQuaternion(Mu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let T0=0;const Su=new I,as=new li,Yn=new Ke,ho=new I,cr=new I,A0=new I,R0=new li,bu=new I(1,0,0),wu=new I(0,1,0),Eu=new I(0,0,1),Tu={type:"added"},C0={type:"removed"},cs={type:"childadded",child:null},Ta={type:"childremoved",child:null};class mt extends js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new I,t=new Rn,n=new li,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ke},normalMatrix:{value:new et}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(bu,e)}rotateY(e){return this.rotateOnAxis(wu,e)}rotateZ(e){return this.rotateOnAxis(Eu,e)}translateOnAxis(e,t){return Su.copy(e).applyQuaternion(this.quaternion),this.position.add(Su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bu,e)}translateY(e){return this.translateOnAxis(wu,e)}translateZ(e){return this.translateOnAxis(Eu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ho.copy(e):ho.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(cr,ho,this.up):Yn.lookAt(ho,cr,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),as.setFromRotationMatrix(Yn),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Tu),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(C0),Ta.child=e,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Tu),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,A0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,R0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}mt.DEFAULT_UP=new I(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wn=new I,Kn=new I,Aa=new I,Zn=new I,ls=new I,us=new I,Au=new I,Ra=new I,Ca=new I,Pa=new I,Ia=new st,La=new st,Da=new st;class gn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),wn.subVectors(e,t),s.cross(wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){wn.subVectors(s,t),Kn.subVectors(n,t),Aa.subVectors(e,t);const o=wn.dot(wn),a=wn.dot(Kn),c=wn.dot(Aa),l=Kn.dot(Kn),u=Kn.dot(Aa),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ia.setScalar(0),La.setScalar(0),Da.setScalar(0),Ia.fromBufferAttribute(e,t),La.fromBufferAttribute(e,n),Da.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ia,r.x),o.addScaledVector(La,r.y),o.addScaledVector(Da,r.z),o}static isFrontFacing(e,t,n,s){return wn.subVectors(n,t),Kn.subVectors(e,t),wn.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),wn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;ls.subVectors(s,n),us.subVectors(r,n),Ra.subVectors(e,n);const c=ls.dot(Ra),l=us.dot(Ra);if(c<=0&&l<=0)return t.copy(n);Ca.subVectors(e,s);const u=ls.dot(Ca),h=us.dot(Ca);if(u>=0&&h<=u)return t.copy(s);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(ls,o);Pa.subVectors(e,r);const d=ls.dot(Pa),g=us.dot(Pa);if(g>=0&&d<=g)return t.copy(r);const x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(us,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Au.subVectors(r,s),a=(h-u)/(h-u+(d-g)),t.copy(s).addScaledVector(Au,a);const p=1/(m+x+f);return o=x*p,a=f*p,t.copy(n).addScaledVector(ls,o).addScaledVector(us,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Hf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},fo={h:0,s:0,l:0};function Na(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ee{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Rl(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Na(o,r,e+1/3),this.g=Na(o,r,e),this.b=Na(o,r,e-1/3)}return it.toWorkingColorSpace(this,s),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=Hf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return it.fromWorkingColorSpace(Gt.copy(this),e),Math.round(Ft(Gt.r*255,0,255))*65536+Math.round(Ft(Gt.g*255,0,255))*256+Math.round(Ft(Gt.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.fromWorkingColorSpace(Gt.copy(this),t);const n=Gt.r,s=Gt.g,r=Gt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.fromWorkingColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Rt){it.fromWorkingColorSpace(Gt.copy(this),e);const t=Gt.r,n=Gt.g,s=Gt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(fo);const n=Cr(xi.h,fo.h,t),s=Cr(xi.s,fo.s,t),r=Cr(xi.l,fo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new ee;ee.NAMES=Hf;let P0=0;class An extends js{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=_n(),this.name="",this.blending=Cs,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dc,this.blendDst=pc,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dc&&(n.blendSrc=this.blendSrc),this.blendDst!==pc&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class xt extends An{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new I,po=new ye;class Ye{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)po.fromBufferAttribute(this,t),po.applyMatrix3(e),this.setXY(t,po.x,po.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jc&&(e.usage=this.usage),e}}class Gf extends Ye{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Vf extends Ye{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends Ye{constructor(e,t,n){super(new Float32Array(e),t,n)}}let I0=0;const hn=new Ke,Ua=new mt,hs=new I,nn=new Fn,lr=new Fn,Ut=new I;class lt extends js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zf(e)?Vf:Gf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Ua.lookAt(e),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _t(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(nn.min,lr.min),nn.expandByPoint(Ut),Ut.addVectors(nn.max,lr.max),nn.expandByPoint(Ut)):(nn.expandByPoint(lr.min),nn.expandByPoint(lr.max))}nn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ut.fromBufferAttribute(a,l),c&&(hs.fromBufferAttribute(e,l),Ut.add(hs)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new I,c[T]=new I;const l=new I,u=new I,h=new I,f=new ye,d=new ye,g=new ye,x=new I,m=new I;function p(T,y,b){l.fromBufferAttribute(n,T),u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,b),f.fromBufferAttribute(r,T),d.fromBufferAttribute(r,y),g.fromBufferAttribute(r,b),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(C),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(C),a[T].add(x),a[y].add(x),a[b].add(x),c[T].add(m),c[y].add(m),c[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let T=0,y=v.length;T<y;++T){const b=v[T],C=b.start,H=b.count;for(let B=C,W=C+H;B<W;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const M=new I,_=new I,P=new I,R=new I;function A(T){P.fromBufferAttribute(s,T),R.copy(P);const y=a[T];M.copy(y),M.sub(P.multiplyScalar(P.dot(y))).normalize(),_.crossVectors(R,y);const C=_.dot(c[T])<0?-1:1;o.setXYZW(T,M.x,M.y,M.z,C)}for(let T=0,y=v.length;T<y;++T){const b=v[T],C=b.start,H=b.count;for(let B=C,W=C+H;B<W;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,u=new I,h=new I;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new Ye(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new lt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ru=new Ke,Li=new Qr,mo=new On,Cu=new I,go=new I,xo=new I,_o=new I,Fa=new I,vo=new I,Pu=new I,yo=new I;class qe extends mt{constructor(e=new lt,t=new xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){vo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Fa.fromBufferAttribute(h,e),o?vo.addScaledVector(Fa,u):vo.addScaledVector(Fa.sub(t),u))}t.add(vo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mo.copy(n.boundingSphere),mo.applyMatrix4(r),Li.copy(e.ray).recast(e.near),!(mo.containsPoint(Li.origin)===!1&&(Li.intersectSphere(mo,Cu)===null||Li.origin.distanceToSquared(Cu)>(e.far-e.near)**2))&&(Ru.copy(r).invert(),Li.copy(e.ray).applyMatrix4(Ru),!(n.boundingBox!==null&&Li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Li)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,P=M;_<P;_+=3){const R=a.getX(_),A=a.getX(_+1),T=a.getX(_+2);s=Mo(this,p,e,n,l,u,h,R,A,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const v=a.getX(m),M=a.getX(m+1),_=a.getX(m+2);s=Mo(this,o,e,n,l,u,h,v,M,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,P=M;_<P;_+=3){const R=_,A=_+1,T=_+2;s=Mo(this,p,e,n,l,u,h,R,A,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const v=m,M=m+1,_=m+2;s=Mo(this,o,e,n,l,u,h,v,M,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function L0(i,e,t,n,s,r,o,a){let c;if(e.side===Kt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===si,a),c===null)return null;yo.copy(a),yo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(yo);return l<t.near||l>t.far?null:{distance:l,point:yo.clone(),object:i}}function Mo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,go),i.getVertexPosition(c,xo),i.getVertexPosition(l,_o);const u=L0(i,e,t,n,go,xo,_o,Pu);if(u){const h=new I;gn.getBarycoord(Pu,go,xo,_o,h),s&&(u.uv=gn.getInterpolatedAttribute(s,a,c,l,h,new ye)),r&&(u.uv1=gn.getInterpolatedAttribute(r,a,c,l,h,new ye)),o&&(u.normal=gn.getInterpolatedAttribute(o,a,c,l,h,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new I,materialIndex:0};gn.getNormal(go,xo,_o,f.normal),u.face=f,u.barycoord=h}return u}class Se extends lt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(h,2));function g(x,m,p,v,M,_,P,R,A,T,y){const b=_/A,C=P/T,H=_/2,B=P/2,W=R/2,j=A+1,V=T+1;let ie=0,N=0;const se=new I;for(let re=0;re<V;re++){const K=re*C-B;for(let Re=0;Re<j;Re++){const ue=Re*b-H;se[x]=ue*v,se[m]=K*M,se[p]=W,l.push(se.x,se.y,se.z),se[x]=0,se[m]=0,se[p]=R>0?1:-1,u.push(se.x,se.y,se.z),h.push(Re/A),h.push(1-re/T),ie+=1}}for(let re=0;re<T;re++)for(let K=0;K<A;K++){const Re=f+K+j*re,ue=f+K+j*(re+1),Q=f+(K+1)+j*(re+1),de=f+(K+1)+j*re;c.push(Re,ue,de),c.push(ue,Q,de),N+=6}a.addGroup(d,N,y),d+=N,f+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Se(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Xt(i){const e={};for(let t=0;t<i.length;t++){const n=Vs(i[t]);for(const s in n)e[s]=n[s]}return e}function D0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Wf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const N0={clone:Vs,merge:Xt};var U0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,F0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends An{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=U0,this.fragmentShader=F0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vs(e.uniforms),this.uniformsGroups=D0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Xf extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=ni}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _i=new I,Iu=new ye,Lu=new ye;class qt extends Xf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_i.x,_i.y).multiplyScalar(-e/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-e/_i.z)}getViewSize(e,t){return this.getViewBounds(e,Iu,Lu),t.subVectors(Lu,Iu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fs=-90,ds=1;class O0 extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(fs,ds,e,t);s.layers=this.layers,this.add(s);const r=new qt(fs,ds,e,t);r.layers=this.layers,this.add(r);const o=new qt(fs,ds,e,t);o.layers=this.layers,this.add(o);const a=new qt(fs,ds,e,t);a.layers=this.layers,this.add(a);const c=new qt(fs,ds,e,t);c.layers=this.layers,this.add(c);const l=new qt(fs,ds,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ta)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class qf extends Pt{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Os,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class z0 extends Ki{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new qf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:on}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Se(5,5,5),r=new Ri({name:"CubemapFromEquirect",uniforms:Vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:Ti});r.uniforms.tEquirect.value=t;const o=new qe(s,r),a=t.minFilter;return t.minFilter===ti&&(t.minFilter=on),new O0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Oa=new I,B0=new I,k0=new et;class Si{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Oa.subVectors(n,t).cross(B0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Oa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||k0.getNormalMatrix(e),s=this.coplanarPoint(Oa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new On,So=new I;class Pl{constructor(e=new Si,t=new Si,n=new Si,s=new Si,r=new Si,o=new Si){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],f=s[7],d=s[8],g=s[9],x=s[10],m=s[11],p=s[12],v=s[13],M=s[14],_=s[15];if(n[0].setComponents(c-r,f-l,m-d,_-p).normalize(),n[1].setComponents(c+r,f+l,m+d,_+p).normalize(),n[2].setComponents(c+o,f+u,m+g,_+v).normalize(),n[3].setComponents(c-o,f-u,m-g,_-v).normalize(),n[4].setComponents(c-a,f-h,m-x,_-M).normalize(),t===ni)n[5].setComponents(c+a,f+h,m+x,_+M).normalize();else if(t===ta)n[5].setComponents(a,h,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(So.x=s.normal.x>0?e.max.x:e.min.x,So.y=s.normal.y>0?e.max.y:e.min.y,So.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(So)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function H0(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],x=h[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const x=h[d];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class oi extends lt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const v=p*f-o;for(let M=0;M<l;M++){const _=M*h-r;g.push(_,-v,0),x.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const M=v+l*p,_=v+l*(p+1),P=v+1+l*(p+1),R=v+1+l*p;d.push(M,_,R),d.push(_,P,R)}this.setIndex(d),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oi(e.width,e.height,e.widthSegments,e.heightSegments)}}var G0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,V0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,W0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,X0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Y0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,K0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Z0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,J0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,j0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Q0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ng=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ug=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,hg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_g="gl_FragColor = linearToOutputTexel( gl_FragColor );",vg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Eg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Pg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ig=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ng=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ug=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Og=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$g=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ex=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ix=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ox=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ux=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,px=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,xx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_x=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,wx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ax=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Px=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ix=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ux=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Zx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$x=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,o_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,c_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,l_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,f_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,g_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,__=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,v_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:G0,alphahash_pars_fragment:V0,alphamap_fragment:W0,alphamap_pars_fragment:X0,alphatest_fragment:q0,alphatest_pars_fragment:Y0,aomap_fragment:K0,aomap_pars_fragment:Z0,batching_pars_vertex:$0,batching_vertex:J0,begin_vertex:j0,beginnormal_vertex:Q0,bsdfs:eg,iridescence_fragment:tg,bumpmap_pars_fragment:ng,clipping_planes_fragment:ig,clipping_planes_pars_fragment:sg,clipping_planes_pars_vertex:rg,clipping_planes_vertex:og,color_fragment:ag,color_pars_fragment:cg,color_pars_vertex:lg,color_vertex:ug,common:hg,cube_uv_reflection_fragment:fg,defaultnormal_vertex:dg,displacementmap_pars_vertex:pg,displacementmap_vertex:mg,emissivemap_fragment:gg,emissivemap_pars_fragment:xg,colorspace_fragment:_g,colorspace_pars_fragment:vg,envmap_fragment:yg,envmap_common_pars_fragment:Mg,envmap_pars_fragment:Sg,envmap_pars_vertex:bg,envmap_physical_pars_fragment:Ng,envmap_vertex:wg,fog_vertex:Eg,fog_pars_vertex:Tg,fog_fragment:Ag,fog_pars_fragment:Rg,gradientmap_pars_fragment:Cg,lightmap_pars_fragment:Pg,lights_lambert_fragment:Ig,lights_lambert_pars_fragment:Lg,lights_pars_begin:Dg,lights_toon_fragment:Ug,lights_toon_pars_fragment:Fg,lights_phong_fragment:Og,lights_phong_pars_fragment:zg,lights_physical_fragment:Bg,lights_physical_pars_fragment:kg,lights_fragment_begin:Hg,lights_fragment_maps:Gg,lights_fragment_end:Vg,logdepthbuf_fragment:Wg,logdepthbuf_pars_fragment:Xg,logdepthbuf_pars_vertex:qg,logdepthbuf_vertex:Yg,map_fragment:Kg,map_pars_fragment:Zg,map_particle_fragment:$g,map_particle_pars_fragment:Jg,metalnessmap_fragment:jg,metalnessmap_pars_fragment:Qg,morphinstance_vertex:ex,morphcolor_vertex:tx,morphnormal_vertex:nx,morphtarget_pars_vertex:ix,morphtarget_vertex:sx,normal_fragment_begin:rx,normal_fragment_maps:ox,normal_pars_fragment:ax,normal_pars_vertex:cx,normal_vertex:lx,normalmap_pars_fragment:ux,clearcoat_normal_fragment_begin:hx,clearcoat_normal_fragment_maps:fx,clearcoat_pars_fragment:dx,iridescence_pars_fragment:px,opaque_fragment:mx,packing:gx,premultiplied_alpha_fragment:xx,project_vertex:_x,dithering_fragment:vx,dithering_pars_fragment:yx,roughnessmap_fragment:Mx,roughnessmap_pars_fragment:Sx,shadowmap_pars_fragment:bx,shadowmap_pars_vertex:wx,shadowmap_vertex:Ex,shadowmask_pars_fragment:Tx,skinbase_vertex:Ax,skinning_pars_vertex:Rx,skinning_vertex:Cx,skinnormal_vertex:Px,specularmap_fragment:Ix,specularmap_pars_fragment:Lx,tonemapping_fragment:Dx,tonemapping_pars_fragment:Nx,transmission_fragment:Ux,transmission_pars_fragment:Fx,uv_pars_fragment:Ox,uv_pars_vertex:zx,uv_vertex:Bx,worldpos_vertex:kx,background_vert:Hx,background_frag:Gx,backgroundCube_vert:Vx,backgroundCube_frag:Wx,cube_vert:Xx,cube_frag:qx,depth_vert:Yx,depth_frag:Kx,distanceRGBA_vert:Zx,distanceRGBA_frag:$x,equirect_vert:Jx,equirect_frag:jx,linedashed_vert:Qx,linedashed_frag:e_,meshbasic_vert:t_,meshbasic_frag:n_,meshlambert_vert:i_,meshlambert_frag:s_,meshmatcap_vert:r_,meshmatcap_frag:o_,meshnormal_vert:a_,meshnormal_frag:c_,meshphong_vert:l_,meshphong_frag:u_,meshphysical_vert:h_,meshphysical_frag:f_,meshtoon_vert:d_,meshtoon_frag:p_,points_vert:m_,points_frag:g_,shadow_vert:x_,shadow_frag:__,sprite_vert:v_,sprite_frag:y_},Ie={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Un={basic:{uniforms:Xt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:Xt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ee(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:Xt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:Xt([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:Xt([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new ee(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:Xt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:Xt([Ie.points,Ie.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:Xt([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:Xt([Ie.common,Ie.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:Xt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:Xt([Ie.sprite,Ie.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:Xt([Ie.common,Ie.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:Xt([Ie.lights,Ie.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Un.physical={uniforms:Xt([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const bo={r:0,b:0,g:0},Ni=new Rn,M_=new Ke;function S_(i,e,t,n,s,r,o){const a=new ee(0);let c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?t:e).get(M)),M}function x(v){let M=!1;const _=g(v);_===null?p(a,c):_&&_.isColor&&(p(_,1),M=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,M){const _=g(M);_&&(_.isCubeTexture||_.mapping===ua)?(u===void 0&&(u=new qe(new Se(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:Vs(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ni.copy(M.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(M_.makeRotationFromEuler(Ni)),u.material.toneMapped=it.getTransfer(_.colorSpace)!==dt,(h!==_||f!==_.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new qe(new oi(2,2),new Ri({name:"BackgroundMaterial",uniforms:Vs(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=it.getTransfer(_.colorSpace)!==dt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,M){v.getRGB(bo,Wf(i)),n.buffers.color.setClear(bo.r,bo.g,bo.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:x,addToRenderList:m}}function b_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(b,C,H,B,W){let j=!1;const V=h(B,H,C);r!==V&&(r=V,l(r.object)),j=d(b,B,H,W),j&&g(b,B,H,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,_(b,C,H,B),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function u(b){return i.deleteVertexArray(b)}function h(b,C,H){const B=H.wireframe===!0;let W=n[b.id];W===void 0&&(W={},n[b.id]=W);let j=W[C.id];j===void 0&&(j={},W[C.id]=j);let V=j[B];return V===void 0&&(V=f(c()),j[B]=V),V}function f(b){const C=[],H=[],B=[];for(let W=0;W<t;W++)C[W]=0,H[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:B,object:b,attributes:{},index:null}}function d(b,C,H,B){const W=r.attributes,j=C.attributes;let V=0;const ie=H.getAttributes();for(const N in ie)if(ie[N].location>=0){const re=W[N];let K=j[N];if(K===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(K=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(K=b.instanceColor)),re===void 0||re.attribute!==K||K&&re.data!==K.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(b,C,H,B){const W={},j=C.attributes;let V=0;const ie=H.getAttributes();for(const N in ie)if(ie[N].location>=0){let re=j[N];re===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(re=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(re=b.instanceColor));const K={};K.attribute=re,re&&re.data&&(K.data=re.data),W[N]=K,V++}r.attributes=W,r.attributesNum=V,r.index=B}function x(){const b=r.newAttributes;for(let C=0,H=b.length;C<H;C++)b[C]=0}function m(b){p(b,0)}function p(b,C){const H=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;H[b]=1,B[b]===0&&(i.enableVertexAttribArray(b),B[b]=1),W[b]!==C&&(i.vertexAttribDivisor(b,C),W[b]=C)}function v(){const b=r.newAttributes,C=r.enabledAttributes;for(let H=0,B=C.length;H<B;H++)C[H]!==b[H]&&(i.disableVertexAttribArray(H),C[H]=0)}function M(b,C,H,B,W,j,V){V===!0?i.vertexAttribIPointer(b,C,H,W,j):i.vertexAttribPointer(b,C,H,B,W,j)}function _(b,C,H,B){x();const W=B.attributes,j=H.getAttributes(),V=C.defaultAttributeValues;for(const ie in j){const N=j[ie];if(N.location>=0){let se=W[ie];if(se===void 0&&(ie==="instanceMatrix"&&b.instanceMatrix&&(se=b.instanceMatrix),ie==="instanceColor"&&b.instanceColor&&(se=b.instanceColor)),se!==void 0){const re=se.normalized,K=se.itemSize,Re=e.get(se);if(Re===void 0)continue;const ue=Re.buffer,Q=Re.type,de=Re.bytesPerElement,Te=Q===i.INT||Q===i.UNSIGNED_INT||se.gpuType===Ml;if(se.isInterleavedBufferAttribute){const ve=se.data,Le=ve.stride,Xe=se.offset;if(ve.isInstancedInterleavedBuffer){for(let He=0;He<N.locationSize;He++)p(N.location+He,ve.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let He=0;He<N.locationSize;He++)m(N.location+He);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let He=0;He<N.locationSize;He++)M(N.location+He,K/N.locationSize,Q,re,Le*de,(Xe+K/N.locationSize*He)*de,Te)}else{if(se.isInstancedBufferAttribute){for(let ve=0;ve<N.locationSize;ve++)p(N.location+ve,se.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ve=0;ve<N.locationSize;ve++)m(N.location+ve);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let ve=0;ve<N.locationSize;ve++)M(N.location+ve,K/N.locationSize,Q,re,K*de,K/N.locationSize*ve*de,Te)}}else if(V!==void 0){const re=V[ie];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(N.location,re);break;case 3:i.vertexAttrib3fv(N.location,re);break;case 4:i.vertexAttrib4fv(N.location,re);break;default:i.vertexAttrib1fv(N.location,re)}}}}v()}function P(){T();for(const b in n){const C=n[b];for(const H in C){const B=C[H];for(const W in B)u(B[W].object),delete B[W];delete C[H]}delete n[b]}}function R(b){if(n[b.id]===void 0)return;const C=n[b.id];for(const H in C){const B=C[H];for(const W in B)u(B[W].object),delete B[W];delete C[H]}delete n[b.id]}function A(b){for(const C in n){const H=n[C];if(H[b.id]===void 0)continue;const B=H[b.id];for(const W in B)u(B[W].object),delete B[W];delete H[b.id]}}function T(){y(),o=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:y,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function w_(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function E_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==xn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const T=A===jr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==ri&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Tn&&!T)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:P,maxSamples:R}}function T_(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Si,a=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const v=r?0:n,M=v*4;let _=p.clippingState||null;c.value=_,_=u(g,f,M,d);for(let P=0;P!==M;++P)_[P]=t[P];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=d+x*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,_=d;M!==x;++M,_+=4)o.copy(h[M]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function A_(i){let e=new WeakMap;function t(o,a){return a===Sc?o.mapping=Os:a===bc&&(o.mapping=zs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Sc||a===bc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new z0(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Il extends Xf{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ts=4,Du=[.125,.215,.35,.446,.526,.582],Gi=20,za=new Il,Nu=new ee;let Ba=null,ka=0,Ha=0,Ga=!1;const Bi=(1+Math.sqrt(5))/2,ps=1/Bi,Uu=[new I(-Bi,ps,0),new I(Bi,ps,0),new I(-ps,0,Bi),new I(ps,0,Bi),new I(0,Bi,-ps),new I(0,Bi,ps),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Fu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ba=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ba,ka,Ha),this._renderer.xr.enabled=Ga,e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Os||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ba=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:jr,format:xn,colorSpace:$t,depthBuffer:!1},s=Ou(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ou(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=R_(r)),this._blurMaterial=C_(r,e,t)}return s}_compileMaterial(e){const t=new qe(this._lodPlanes[0],e);this._renderer.compile(t,za)}_sceneToCubeUV(e,t,n,s){const a=new qt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Nu),u.toneMapping=Ai,u.autoClear=!1;const d=new xt({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),g=new qe(new Se,d);let x=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,x=!0):(d.color.copy(Nu),x=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const M=this._cubeSize;wo(s,v*M,p>2?M:0,M,M),u.setRenderTarget(s),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Os||e.mapping===zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new qe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;wo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,za)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Uu[(s-r-1)%Uu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new qe(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Gi-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Gi;m>Gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);const p=[];let v=0;for(let A=0;A<Gi;++A){const T=A/x,y=Math.exp(-T*T/2);p.push(y),A===0?v+=y:A<m&&(v+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const _=this._sizeLods[s],P=3*_*(s>M-Ts?s-M+Ts:0),R=4*(this._cubeSize-_);wo(t,P,R,3*_,2*_),c.setRenderTarget(t),c.render(h,za)}}function R_(i){const e=[],t=[],n=[];let s=i;const r=i-Ts+1+Du.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Ts?c=Du[o-i+Ts-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*d),M=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let R=0;R<d;R++){const A=R%3*2/3-1,T=R>2?0:-1,y=[A,T,0,A+2/3,T,0,A+2/3,T+1,0,A,T,0,A+2/3,T+1,0,A,T+1,0];v.set(y,x*g*R),M.set(f,m*g*R);const b=[R,R,R,R,R,R];_.set(b,p*g*R)}const P=new lt;P.setAttribute("position",new Ye(v,x)),P.setAttribute("uv",new Ye(M,m)),P.setAttribute("faceIndex",new Ye(_,p)),e.push(P),s>Ts&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ou(i,e,t){const n=new Ki(i,e,t);return n.texture.mapping=ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function C_(i,e,t){const n=new Float32Array(Gi),s=new I(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function zu(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Bu(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Ll(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function P_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Sc||c===bc,u=c===Os||c===zs;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Fu(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Fu(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function I_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&wr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function L_(i,e,t,n){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const x=d[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let x=0;if(d!==null){const v=d.array;x=d.version;for(let M=0,_=v.length;M<_;M+=3){const P=v[M+0],R=v[M+1],A=v[M+2];f.push(P,R,R,A,A,P)}}else if(g!==void 0){const v=g.array;x=g.version;for(let M=0,_=v.length/3-1;M<_;M+=3){const P=M+0,R=M+1,A=M+2;f.push(P,R,R,A,A,P)}}else return;const m=new(zf(f)?Vf:Gf)(f,1);m.version=x;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function D_(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),t.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*x[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function N_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function U_(i,e,t){const n=new WeakMap,s=new st;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let b=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var d=b;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let P=a.attributes.position.count*_,R=1;P>e.maxTextureSize&&(R=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const A=new Float32Array(P*R*4*h),T=new kf(A,P,R,h);T.type=Tn,T.needsUpdate=!0;const y=_*4;for(let C=0;C<h;C++){const H=p[C],B=v[C],W=M[C],j=P*R*4*C;for(let V=0;V<H.count;V++){const ie=V*y;g===!0&&(s.fromBufferAttribute(H,V),A[j+ie+0]=s.x,A[j+ie+1]=s.y,A[j+ie+2]=s.z,A[j+ie+3]=0),x===!0&&(s.fromBufferAttribute(B,V),A[j+ie+4]=s.x,A[j+ie+5]=s.y,A[j+ie+6]=s.z,A[j+ie+7]=0),m===!0&&(s.fromBufferAttribute(W,V),A[j+ie+8]=s.x,A[j+ie+9]=s.y,A[j+ie+10]=s.z,A[j+ie+11]=W.itemSize===4?s.w:1)}}f={count:h,texture:T,size:new ye(P,R)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function F_(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Kf extends Pt{constructor(e,t,n,s,r,o,a,c,l,u=Ps){if(u!==Ps&&u!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ps&&(n=Yi),n===void 0&&u===Hs&&(n=ks),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Zt,this.minFilter=c!==void 0?c:Zt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Zf=new Pt,ku=new Kf(1,1),$f=new kf,Jf=new S0,jf=new qf,Hu=[],Gu=[],Vu=new Float32Array(16),Wu=new Float32Array(9),Xu=new Float32Array(4);function Qs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Hu[s];if(r===void 0&&(r=new Float32Array(s),Hu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fa(i,e){let t=Gu[e];t===void 0&&(t=new Int32Array(e),Gu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function O_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function B_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function k_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function H_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;Xu.set(n),i.uniformMatrix2fv(this.addr,!1,Xu),Lt(t,n)}}function G_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;Wu.set(n),i.uniformMatrix3fv(this.addr,!1,Wu),Lt(t,n)}}function V_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;Vu.set(n),i.uniformMatrix4fv(this.addr,!1,Vu),Lt(t,n)}}function W_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function X_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function q_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function Y_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function K_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function $_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function J_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function j_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ku.compareFunction=Ff,r=ku):r=Zf,t.setTexture2D(e||r,s)}function Q_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Jf,s)}function ev(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||jf,s)}function tv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||$f,s)}function nv(i){switch(i){case 5126:return O_;case 35664:return z_;case 35665:return B_;case 35666:return k_;case 35674:return H_;case 35675:return G_;case 35676:return V_;case 5124:case 35670:return W_;case 35667:case 35671:return X_;case 35668:case 35672:return q_;case 35669:case 35673:return Y_;case 5125:return K_;case 36294:return Z_;case 36295:return $_;case 36296:return J_;case 35678:case 36198:case 36298:case 36306:case 35682:return j_;case 35679:case 36299:case 36307:return Q_;case 35680:case 36300:case 36308:case 36293:return ev;case 36289:case 36303:case 36311:case 36292:return tv}}function iv(i,e){i.uniform1fv(this.addr,e)}function sv(i,e){const t=Qs(e,this.size,2);i.uniform2fv(this.addr,t)}function rv(i,e){const t=Qs(e,this.size,3);i.uniform3fv(this.addr,t)}function ov(i,e){const t=Qs(e,this.size,4);i.uniform4fv(this.addr,t)}function av(i,e){const t=Qs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cv(i,e){const t=Qs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function lv(i,e){const t=Qs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function uv(i,e){i.uniform1iv(this.addr,e)}function hv(i,e){i.uniform2iv(this.addr,e)}function fv(i,e){i.uniform3iv(this.addr,e)}function dv(i,e){i.uniform4iv(this.addr,e)}function pv(i,e){i.uniform1uiv(this.addr,e)}function mv(i,e){i.uniform2uiv(this.addr,e)}function gv(i,e){i.uniform3uiv(this.addr,e)}function xv(i,e){i.uniform4uiv(this.addr,e)}function _v(i,e,t){const n=this.cache,s=e.length,r=fa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Zf,r[o])}function vv(i,e,t){const n=this.cache,s=e.length,r=fa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Jf,r[o])}function yv(i,e,t){const n=this.cache,s=e.length,r=fa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||jf,r[o])}function Mv(i,e,t){const n=this.cache,s=e.length,r=fa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||$f,r[o])}function Sv(i){switch(i){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return ov;case 35674:return av;case 35675:return cv;case 35676:return lv;case 5124:case 35670:return uv;case 35667:case 35671:return hv;case 35668:case 35672:return fv;case 35669:case 35673:return dv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return xv;case 35678:case 36198:case 36298:case 36306:case 35682:return _v;case 35679:case 36299:case 36307:return vv;case 35680:case 36300:case 36308:case 36293:return yv;case 36289:case 36303:case 36311:case 36292:return Mv}}class bv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nv(t.type)}}class wv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sv(t.type)}}class Ev{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Va=/(\w+)(\])?(\[|\.)?/g;function qu(i,e){i.seq.push(e),i.map[e.id]=e}function Tv(i,e,t){const n=i.name,s=n.length;for(Va.lastIndex=0;;){const r=Va.exec(n),o=Va.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){qu(t,l===void 0?new bv(a,i,e):new wv(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Ev(a),qu(t,h)),t=h}}}class Zo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Tv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Yu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Av=37297;let Rv=0;function Cv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Ku=new et;function Pv(i){it._getMatrix(Ku,it.workingColorSpace,i);const e=`mat3( ${Ku.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case ha:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Cv(i.getShaderSource(e),o)}else return s}function Iv(i,e){const t=Pv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Lv(i,e){let t;switch(e){case Dm:t="Linear";break;case Nm:t="Reinhard";break;case Um:t="Cineon";break;case Sf:t="ACESFilmic";break;case Om:t="AgX";break;case zm:t="Neutral";break;case Fm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Eo=new I;function Dv(){it.getLuminanceCoefficients(Eo);const i=Eo.x.toFixed(4),e=Eo.y.toFixed(4),t=Eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Nv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function Uv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Er(i){return i!==""}function $u(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ju(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ov=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(i){return i.replace(Ov,Bv)}const zv=new Map;function Bv(i,e){let t=tt[e];if(t===void 0){const n=zv.get(e);if(n!==void 0)t=tt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return jc(t)}const kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ju(i){return i.replace(kv,Hv)}function Hv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Gv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===vf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===yf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===jn&&(e="SHADOWMAP_TYPE_VSM"),e}function Vv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Os:case zs:e="ENVMAP_TYPE_CUBE";break;case ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Wv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function Xv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Mf:e="ENVMAP_BLENDING_MULTIPLY";break;case Im:e="ENVMAP_BLENDING_MIX";break;case Lm:e="ENVMAP_BLENDING_ADD";break}return e}function qv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Yv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Gv(t),l=Vv(t),u=Wv(t),h=Xv(t),f=qv(t),d=Nv(t),g=Uv(r),x=s.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Er).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(m=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?tt.tonemapping_pars_fragment:"",t.toneMapping!==Ai?Lv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,Iv("linearToOutputTexel",t.outputColorSpace),Dv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),o=jc(o),o=$u(o,t),o=Ju(o,t),a=jc(a),a=$u(a,t),a=Ju(a,t),o=ju(o),a=ju(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+o,_=v+p+a,P=Yu(s,s.VERTEX_SHADER,M),R=Yu(s,s.FRAGMENT_SHADER,_);s.attachShader(x,P),s.attachShader(x,R),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(x).trim(),B=s.getShaderInfoLog(P).trim(),W=s.getShaderInfoLog(R).trim();let j=!0,V=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,P,R);else{const ie=Zu(s,P,"vertex"),N=Zu(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+ie+`
`+N)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||W==="")&&(V=!1);V&&(C.diagnostics={runnable:j,programLog:H,vertexShader:{log:B,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(P),s.deleteShader(R),T=new Zo(s,x),y=Fv(s,x)}let T;this.getUniforms=function(){return T===void 0&&A(this),T};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,Av)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=R,this}let Kv=0;class Zv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new $v(e),t.set(e,n)),n}}class $v{constructor(e){this.id=Kv++,this.code=e,this.usedTimes=0}}function Jv(i,e,t,n,s,r,o){const a=new Cl,c=new Zv,l=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,b,C,H,B){const W=H.fog,j=B.geometry,V=y.isMeshStandardMaterial?H.environment:null,ie=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),N=ie&&ie.mapping===ua?ie.image.height:null,se=g[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const re=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,K=re!==void 0?re.length:0;let Re=0;j.morphAttributes.position!==void 0&&(Re=1),j.morphAttributes.normal!==void 0&&(Re=2),j.morphAttributes.color!==void 0&&(Re=3);let ue,Q,de,Te;if(se){const je=Un[se];ue=je.vertexShader,Q=je.fragmentShader}else ue=y.vertexShader,Q=y.fragmentShader,c.update(y),de=c.getVertexShaderID(y),Te=c.getFragmentShaderID(y);const ve=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Xe=B.isInstancedMesh===!0,He=B.isBatchedMesh===!0,$e=!!y.map,ce=!!y.matcap,pe=!!ie,L=!!y.aoMap,De=!!y.lightMap,fe=!!y.bumpMap,Pe=!!y.normalMap,we=!!y.displacementMap,We=!!y.emissiveMap,Ae=!!y.metalnessMap,w=!!y.roughnessMap,S=y.anisotropy>0,O=y.clearcoat>0,G=y.dispersion>0,ne=y.iridescence>0,Z=y.sheen>0,be=y.transmission>0,Me=S&&!!y.anisotropyMap,Ee=O&&!!y.clearcoatMap,X=O&&!!y.clearcoatNormalMap,U=O&&!!y.clearcoatRoughnessMap,te=ne&&!!y.iridescenceMap,me=ne&&!!y.iridescenceThicknessMap,le=Z&&!!y.sheenColorMap,ae=Z&&!!y.sheenRoughnessMap,Y=!!y.specularMap,k=!!y.specularColorMap,Ce=!!y.specularIntensityMap,D=be&&!!y.transmissionMap,xe=be&&!!y.thicknessMap,q=!!y.gradientMap,oe=!!y.alphaMap,ge=y.alphaTest>0,he=!!y.alphaHash,Oe=!!y.extensions;let Je=Ai;y.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(Je=i.toneMapping);const ft={shaderID:se,shaderType:y.type,shaderName:y.name,vertexShader:ue,fragmentShader:Q,defines:y.defines,customVertexShaderID:de,customFragmentShaderID:Te,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:He,batchingColor:He&&B._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&B.instanceColor!==null,instancingMorph:Xe&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ve===null?i.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:$t,alphaToCoverage:!!y.alphaToCoverage,map:$e,matcap:ce,envMap:pe,envMapMode:pe&&ie.mapping,envMapCubeUVHeight:N,aoMap:L,lightMap:De,bumpMap:fe,normalMap:Pe,displacementMap:f&&we,emissiveMap:We,normalMapObjectSpace:Pe&&y.normalMapType===Wm,normalMapTangentSpace:Pe&&y.normalMapType===Uf,metalnessMap:Ae,roughnessMap:w,anisotropy:S,anisotropyMap:Me,clearcoat:O,clearcoatMap:Ee,clearcoatNormalMap:X,clearcoatRoughnessMap:U,dispersion:G,iridescence:ne,iridescenceMap:te,iridescenceThicknessMap:me,sheen:Z,sheenColorMap:le,sheenRoughnessMap:ae,specularMap:Y,specularColorMap:k,specularIntensityMap:Ce,transmission:be,transmissionMap:D,thicknessMap:xe,gradientMap:q,opaque:y.transparent===!1&&y.blending===Cs&&y.alphaToCoverage===!1,alphaMap:oe,alphaTest:ge,alphaHash:he,combine:y.combine,mapUv:$e&&x(y.map.channel),aoMapUv:L&&x(y.aoMap.channel),lightMapUv:De&&x(y.lightMap.channel),bumpMapUv:fe&&x(y.bumpMap.channel),normalMapUv:Pe&&x(y.normalMap.channel),displacementMapUv:we&&x(y.displacementMap.channel),emissiveMapUv:We&&x(y.emissiveMap.channel),metalnessMapUv:Ae&&x(y.metalnessMap.channel),roughnessMapUv:w&&x(y.roughnessMap.channel),anisotropyMapUv:Me&&x(y.anisotropyMap.channel),clearcoatMapUv:Ee&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:X&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:me&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:le&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ae&&x(y.sheenRoughnessMap.channel),specularMapUv:Y&&x(y.specularMap.channel),specularColorMapUv:k&&x(y.specularColorMap.channel),specularIntensityMapUv:Ce&&x(y.specularIntensityMap.channel),transmissionMapUv:D&&x(y.transmissionMap.channel),thicknessMapUv:xe&&x(y.thicknessMap.channel),alphaMapUv:oe&&x(y.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Pe||S),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&($e||oe),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Le,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Re,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Je,decodeVideoTexture:$e&&y.map.isVideoTexture===!0&&it.getTransfer(y.map.colorSpace)===dt,decodeVideoTextureEmissive:We&&y.emissiveMap.isVideoTexture===!0&&it.getTransfer(y.emissiveMap.colorSpace)===dt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===At,flipSided:y.side===Kt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Oe&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&y.extensions.multiDraw===!0||He)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)b.push(C),b.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(v(b,y),M(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function v(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function M(y,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function _(y){const b=g[y.type];let C;if(b){const H=Un[b];C=N0.clone(H.uniforms)}else C=y.uniforms;return C}function P(y,b){let C;for(let H=0,B=u.length;H<B;H++){const W=u[H];if(W.cacheKey===b){C=W,++C.usedTimes;break}}return C===void 0&&(C=new Yv(i,b,y,r),u.push(C)),C}function R(y){if(--y.usedTimes===0){const b=u.indexOf(y);u[b]=u[u.length-1],u.pop(),y.destroy()}}function A(y){c.remove(y)}function T(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:P,releaseProgram:R,releaseShaderCache:A,programs:u,dispose:T}}function jv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Qv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function eh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function th(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,d,g,x,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function a(h,f,d,g,x,m){const p=o(h,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(h,f,d,g,x,m){const p=o(h,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||Qv),n.length>1&&n.sort(f||eh),s.length>1&&s.sort(f||eh)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function ey(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new th,i.set(n,[o])):s>=r.length?(o=new th,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function ty(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ee};break;case"SpotLight":t={position:new I,direction:new I,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":t={color:new ee,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function ny(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let iy=0;function sy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ry(i){const e=new ty,t=ny(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new Ke,o=new Ke;function a(l){let u=0,h=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,v=0,M=0,_=0,P=0,R=0,A=0;l.sort(sy);for(let y=0,b=l.length;y<b;y++){const C=l[y],H=C.color,B=C.intensity,W=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=H.r*B,h+=H.g*B,f+=H.b*B;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],B);A++}else if(C.isDirectionalLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const ie=C.shadow,N=t.get(C);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize=ie.mapSize,n.directionalShadow[d]=N,n.directionalShadowMap[d]=j,n.directionalShadowMatrix[d]=C.shadow.matrix,v++}n.directional[d]=V,d++}else if(C.isSpotLight){const V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(H).multiplyScalar(B),V.distance=W,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[x]=V;const ie=C.shadow;if(C.map&&(n.spotLightMap[P]=C.map,P++,ie.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[x]=ie.matrix,C.castShadow){const N=t.get(C);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize=ie.mapSize,n.spotShadow[x]=N,n.spotShadowMap[x]=j,_++}x++}else if(C.isRectAreaLight){const V=e.get(C);V.color.copy(H).multiplyScalar(B),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=V,m++}else if(C.isPointLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const ie=C.shadow,N=t.get(C);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize=ie.mapSize,N.shadowCameraNear=ie.camera.near,N.shadowCameraFar=ie.camera.far,n.pointShadow[g]=N,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=V,g++}else if(C.isHemisphereLight){const V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(B),V.groundColor.copy(C.groundColor).multiplyScalar(B),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const T=n.hash;(T.directionalLength!==d||T.pointLength!==g||T.spotLength!==x||T.rectAreaLength!==m||T.hemiLength!==p||T.numDirectionalShadows!==v||T.numPointShadows!==M||T.numSpotShadows!==_||T.numSpotMaps!==P||T.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,T.directionalLength=d,T.pointLength=g,T.spotLength=x,T.rectAreaLength=m,T.hemiLength=p,T.numDirectionalShadows=v,T.numPointShadows=M,T.numSpotShadows=_,T.numSpotMaps=P,T.numLightProbes=A,n.version=iy++)}function c(l,u){let h=0,f=0,d=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const M=l[p];if(M.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(M.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function nh(i){const e=new ry(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function oy(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new nh(i),e.set(s,[a])):r>=o.length?(a=new nh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class ay extends An{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Gm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cy extends An{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ly=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function hy(i,e,t){let n=new Pl;const s=new ye,r=new ye,o=new st,a=new ay({depthPacking:Vm}),c=new cy,l={},u=t.maxTextureSize,h={[si]:Kt,[Kt]:si,[At]:At},f=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:ly,fragmentShader:uy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new lt;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vf;let p=this.type;this.render=function(R,A,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=i.getRenderTarget(),b=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Ti),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const B=p!==jn&&this.type===jn,W=p===jn&&this.type!==jn;for(let j=0,V=R.length;j<V;j++){const ie=R[j],N=ie.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const se=N.getFrameExtents();if(s.multiply(se),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,N.mapSize.y=r.y)),N.map===null||B===!0||W===!0){const K=this.type!==jn?{minFilter:Zt,magFilter:Zt}:{};N.map!==null&&N.map.dispose(),N.map=new Ki(s.x,s.y,K),N.map.texture.name=ie.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const re=N.getViewportCount();for(let K=0;K<re;K++){const Re=N.getViewport(K);o.set(r.x*Re.x,r.y*Re.y,r.x*Re.z,r.y*Re.w),H.viewport(o),N.updateMatrices(ie,K),n=N.getFrustum(),_(A,T,N.camera,ie,this.type)}N.isPointLightShadow!==!0&&this.type===jn&&v(N,T),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,b,C)};function v(R,A){const T=e.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ki(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,T,f,x,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,T,d,x,null)}function M(R,A,T,y){let b=null;const C=T.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)b=C;else if(b=T.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=b.uuid,B=A.uuid;let W=l[H];W===void 0&&(W={},l[H]=W);let j=W[B];j===void 0&&(j=b.clone(),W[B]=j,A.addEventListener("dispose",P)),b=j}if(b.visible=A.visible,b.wireframe=A.wireframe,y===jn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:h[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,T.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const H=i.properties.get(b);H.light=T}return b}function _(R,A,T,y,b){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===jn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,R.matrixWorld);const B=e.update(R),W=R.material;if(Array.isArray(W)){const j=B.groups;for(let V=0,ie=j.length;V<ie;V++){const N=j[V],se=W[N.materialIndex];if(se&&se.visible){const re=M(R,se,y,b);R.onBeforeShadow(i,R,A,T,B,re,N),i.renderBufferDirect(T,null,B,re,R,N),R.onAfterShadow(i,R,A,T,B,re,N)}}}else if(W.visible){const j=M(R,W,y,b);R.onBeforeShadow(i,R,A,T,B,j,null),i.renderBufferDirect(T,null,B,j,R,null),R.onAfterShadow(i,R,A,T,B,j,null)}}const H=R.children;for(let B=0,W=H.length;B<W;B++)_(H[B],A,T,y,b)}function P(R){R.target.removeEventListener("dispose",P);for(const T in l){const y=l[T],b=R.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const fy={[mc]:gc,[xc]:yc,[_c]:Mc,[Fs]:vc,[gc]:mc,[yc]:xc,[Mc]:_c,[vc]:Fs};function dy(i,e){function t(){let D=!1;const xe=new st;let q=null;const oe=new st(0,0,0,0);return{setMask:function(ge){q!==ge&&!D&&(i.colorMask(ge,ge,ge,ge),q=ge)},setLocked:function(ge){D=ge},setClear:function(ge,he,Oe,Je,ft){ft===!0&&(ge*=Je,he*=Je,Oe*=Je),xe.set(ge,he,Oe,Je),oe.equals(xe)===!1&&(i.clearColor(ge,he,Oe,Je),oe.copy(xe))},reset:function(){D=!1,q=null,oe.set(-1,0,0,0)}}}function n(){let D=!1,xe=!1,q=null,oe=null,ge=null;return{setReversed:function(he){if(xe!==he){const Oe=e.get("EXT_clip_control");xe?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);const Je=ge;ge=null,this.setClear(Je)}xe=he},getReversed:function(){return xe},setTest:function(he){he?ve(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(he){q!==he&&!D&&(i.depthMask(he),q=he)},setFunc:function(he){if(xe&&(he=fy[he]),oe!==he){switch(he){case mc:i.depthFunc(i.NEVER);break;case gc:i.depthFunc(i.ALWAYS);break;case xc:i.depthFunc(i.LESS);break;case Fs:i.depthFunc(i.LEQUAL);break;case _c:i.depthFunc(i.EQUAL);break;case vc:i.depthFunc(i.GEQUAL);break;case yc:i.depthFunc(i.GREATER);break;case Mc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=he}},setLocked:function(he){D=he},setClear:function(he){ge!==he&&(xe&&(he=1-he),i.clearDepth(he),ge=he)},reset:function(){D=!1,q=null,oe=null,ge=null,xe=!1}}}function s(){let D=!1,xe=null,q=null,oe=null,ge=null,he=null,Oe=null,Je=null,ft=null;return{setTest:function(je){D||(je?ve(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(je){xe!==je&&!D&&(i.stencilMask(je),xe=je)},setFunc:function(je,Et,wt){(q!==je||oe!==Et||ge!==wt)&&(i.stencilFunc(je,Et,wt),q=je,oe=Et,ge=wt)},setOp:function(je,Et,wt){(he!==je||Oe!==Et||Je!==wt)&&(i.stencilOp(je,Et,wt),he=je,Oe=Et,Je=wt)},setLocked:function(je){D=je},setClear:function(je){ft!==je&&(i.clearStencil(je),ft=je)},reset:function(){D=!1,xe=null,q=null,oe=null,ge=null,he=null,Oe=null,Je=null,ft=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,v=null,M=null,_=null,P=null,R=null,A=new ee(0,0,0),T=0,y=!1,b=null,C=null,H=null,B=null,W=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ie=0;const N=i.getParameter(i.VERSION);N.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(N)[1]),V=ie>=1):N.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),V=ie>=2);let se=null,re={};const K=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),ue=new st().fromArray(K),Q=new st().fromArray(Re);function de(D,xe,q,oe){const ge=new Uint8Array(4),he=i.createTexture();i.bindTexture(D,he),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<q;Oe++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,ge):i.texImage2D(xe+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ge);return he}const Te={};Te[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),Te[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Te[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Te[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ve(i.DEPTH_TEST),o.setFunc(Fs),fe(!1),Pe(iu),ve(i.CULL_FACE),L(Ti);function ve(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Le(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Xe(D,xe){return h[D]!==xe?(i.bindFramebuffer(D,xe),h[D]=xe,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=xe),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function He(D,xe){let q=d,oe=!1;if(D){q=f.get(xe),q===void 0&&(q=[],f.set(xe,q));const ge=D.textures;if(q.length!==ge.length||q[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Oe=ge.length;he<Oe;he++)q[he]=i.COLOR_ATTACHMENT0+he;q.length=ge.length,oe=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,oe=!0);oe&&i.drawBuffers(q)}function $e(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const ce={[Hi]:i.FUNC_ADD,[pm]:i.FUNC_SUBTRACT,[mm]:i.FUNC_REVERSE_SUBTRACT};ce[gm]=i.MIN,ce[xm]=i.MAX;const pe={[_m]:i.ZERO,[vm]:i.ONE,[ym]:i.SRC_COLOR,[dc]:i.SRC_ALPHA,[Tm]:i.SRC_ALPHA_SATURATE,[wm]:i.DST_COLOR,[Sm]:i.DST_ALPHA,[Mm]:i.ONE_MINUS_SRC_COLOR,[pc]:i.ONE_MINUS_SRC_ALPHA,[Em]:i.ONE_MINUS_DST_COLOR,[bm]:i.ONE_MINUS_DST_ALPHA,[Am]:i.CONSTANT_COLOR,[Rm]:i.ONE_MINUS_CONSTANT_COLOR,[Cm]:i.CONSTANT_ALPHA,[Pm]:i.ONE_MINUS_CONSTANT_ALPHA};function L(D,xe,q,oe,ge,he,Oe,Je,ft,je){if(D===Ti){x===!0&&(Le(i.BLEND),x=!1);return}if(x===!1&&(ve(i.BLEND),x=!0),D!==dm){if(D!==m||je!==y){if((p!==Hi||_!==Hi)&&(i.blendEquation(i.FUNC_ADD),p=Hi,_=Hi),je)switch(D){case Cs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wi:i.blendFunc(i.ONE,i.ONE);break;case su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ru:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Cs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ru:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,M=null,P=null,R=null,A.set(0,0,0),T=0,m=D,y=je}return}ge=ge||xe,he=he||q,Oe=Oe||oe,(xe!==p||ge!==_)&&(i.blendEquationSeparate(ce[xe],ce[ge]),p=xe,_=ge),(q!==v||oe!==M||he!==P||Oe!==R)&&(i.blendFuncSeparate(pe[q],pe[oe],pe[he],pe[Oe]),v=q,M=oe,P=he,R=Oe),(Je.equals(A)===!1||ft!==T)&&(i.blendColor(Je.r,Je.g,Je.b,ft),A.copy(Je),T=ft),m=D,y=!1}function De(D,xe){D.side===At?Le(i.CULL_FACE):ve(i.CULL_FACE);let q=D.side===Kt;xe&&(q=!q),fe(q),D.blending===Cs&&D.transparent===!1?L(Ti):L(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const oe=D.stencilWrite;a.setTest(oe),oe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),We(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ve(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function fe(D){b!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),b=D)}function Pe(D){D!==hm?(ve(i.CULL_FACE),D!==C&&(D===iu?i.cullFace(i.BACK):D===fm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),C=D}function we(D){D!==H&&(V&&i.lineWidth(D),H=D)}function We(D,xe,q){D?(ve(i.POLYGON_OFFSET_FILL),(B!==xe||W!==q)&&(i.polygonOffset(xe,q),B=xe,W=q)):Le(i.POLYGON_OFFSET_FILL)}function Ae(D){D?ve(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function w(D){D===void 0&&(D=i.TEXTURE0+j-1),se!==D&&(i.activeTexture(D),se=D)}function S(D,xe,q){q===void 0&&(se===null?q=i.TEXTURE0+j-1:q=se);let oe=re[q];oe===void 0&&(oe={type:void 0,texture:void 0},re[q]=oe),(oe.type!==D||oe.texture!==xe)&&(se!==q&&(i.activeTexture(q),se=q),i.bindTexture(D,xe||Te[D]),oe.type=D,oe.texture=xe)}function O(){const D=re[se];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function G(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ee(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function U(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(D){ue.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ue.copy(D))}function ae(D){Q.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Q.copy(D))}function Y(D,xe){let q=l.get(xe);q===void 0&&(q=new WeakMap,l.set(xe,q));let oe=q.get(D);oe===void 0&&(oe=i.getUniformBlockIndex(xe,D.name),q.set(D,oe))}function k(D,xe){const oe=l.get(xe).get(D);c.get(xe)!==oe&&(i.uniformBlockBinding(xe,oe,D.__bindingPointIndex),c.set(xe,oe))}function Ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},se=null,re={},h={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,v=null,M=null,_=null,P=null,R=null,A=new ee(0,0,0),T=0,y=!1,b=null,C=null,H=null,B=null,W=null,ue.set(0,0,i.canvas.width,i.canvas.height),Q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ve,disable:Le,bindFramebuffer:Xe,drawBuffers:He,useProgram:$e,setBlending:L,setMaterial:De,setFlipSided:fe,setCullFace:Pe,setLineWidth:we,setPolygonOffset:We,setScissorTest:Ae,activeTexture:w,bindTexture:S,unbindTexture:O,compressedTexImage2D:G,compressedTexImage3D:ne,texImage2D:te,texImage3D:me,updateUBOMapping:Y,uniformBlockBinding:k,texStorage2D:X,texStorage3D:U,texSubImage2D:Z,texSubImage3D:be,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ee,scissor:le,viewport:ae,reset:Ce}}function ih(i,e,t,n){const s=py(n);switch(t){case Rf:return i*e;case Pf:return i*e;case If:return i*e*2;case wl:return i*e/s.components*s.byteLength;case El:return i*e/s.components*s.byteLength;case Lf:return i*e*2/s.components*s.byteLength;case Tl:return i*e*2/s.components*s.byteLength;case Cf:return i*e*3/s.components*s.byteLength;case xn:return i*e*4/s.components*s.byteLength;case Al:return i*e*4/s.components*s.byteLength;case Wo:case Xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qo:case Yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ec:case Ac:return Math.max(i,16)*Math.max(e,8)/4;case wc:case Tc:return Math.max(i,8)*Math.max(e,8)/2;case Rc:case Cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ic:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Nc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case zc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Bc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case kc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Gc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ko:case Xc:case qc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Df:case Yc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Kc:case Zc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function py(i){switch(i){case ri:case Ef:return{byteLength:1,components:1};case Or:case Tf:case jr:return{byteLength:2,components:1};case Sl:case bl:return{byteLength:2,components:4};case Yi:case Ml:case Tn:return{byteLength:4,components:1};case Af:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function my(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ye,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,S){return d?new OffscreenCanvas(w,S):kr("canvas")}function x(w,S,O){let G=1;const ne=Ae(w);if((ne.width>O||ne.height>O)&&(G=O/Math.max(ne.width,ne.height)),G<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Z=Math.floor(G*ne.width),be=Math.floor(G*ne.height);h===void 0&&(h=g(Z,be));const Me=S?g(Z,be):h;return Me.width=Z,Me.height=be,Me.getContext("2d").drawImage(w,0,0,Z,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+Z+"x"+be+")."),Me}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(w,S,O,G,ne=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Z=S;if(S===i.RED&&(O===i.FLOAT&&(Z=i.R32F),O===i.HALF_FLOAT&&(Z=i.R16F),O===i.UNSIGNED_BYTE&&(Z=i.R8)),S===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.R8UI),O===i.UNSIGNED_SHORT&&(Z=i.R16UI),O===i.UNSIGNED_INT&&(Z=i.R32UI),O===i.BYTE&&(Z=i.R8I),O===i.SHORT&&(Z=i.R16I),O===i.INT&&(Z=i.R32I)),S===i.RG&&(O===i.FLOAT&&(Z=i.RG32F),O===i.HALF_FLOAT&&(Z=i.RG16F),O===i.UNSIGNED_BYTE&&(Z=i.RG8)),S===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RG8UI),O===i.UNSIGNED_SHORT&&(Z=i.RG16UI),O===i.UNSIGNED_INT&&(Z=i.RG32UI),O===i.BYTE&&(Z=i.RG8I),O===i.SHORT&&(Z=i.RG16I),O===i.INT&&(Z=i.RG32I)),S===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),O===i.UNSIGNED_INT&&(Z=i.RGB32UI),O===i.BYTE&&(Z=i.RGB8I),O===i.SHORT&&(Z=i.RGB16I),O===i.INT&&(Z=i.RGB32I)),S===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),O===i.UNSIGNED_INT&&(Z=i.RGBA32UI),O===i.BYTE&&(Z=i.RGBA8I),O===i.SHORT&&(Z=i.RGBA16I),O===i.INT&&(Z=i.RGBA32I)),S===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),S===i.RGBA){const be=ne?ha:it.getTransfer(G);O===i.FLOAT&&(Z=i.RGBA32F),O===i.HALF_FLOAT&&(Z=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Z=be===dt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function _(w,S){let O;return w?S===null||S===Yi||S===ks?O=i.DEPTH24_STENCIL8:S===Tn?O=i.DEPTH32F_STENCIL8:S===Or&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Yi||S===ks?O=i.DEPTH_COMPONENT24:S===Tn?O=i.DEPTH_COMPONENT32F:S===Or&&(O=i.DEPTH_COMPONENT16),O}function P(w,S){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Zt&&w.minFilter!==on?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function R(w){const S=w.target;S.removeEventListener("dispose",R),T(S),S.isVideoTexture&&u.delete(S)}function A(w){const S=w.target;S.removeEventListener("dispose",A),b(S)}function T(w){const S=n.get(w);if(S.__webglInit===void 0)return;const O=w.source,G=f.get(O);if(G){const ne=G[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&y(w),Object.keys(G).length===0&&f.delete(O)}n.remove(w)}function y(w){const S=n.get(w);i.deleteTexture(S.__webglTexture);const O=w.source,G=f.get(O);delete G[S.__cacheKey],o.memory.textures--}function b(w){const S=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(S.__webglFramebuffer[G]))for(let ne=0;ne<S.__webglFramebuffer[G].length;ne++)i.deleteFramebuffer(S.__webglFramebuffer[G][ne]);else i.deleteFramebuffer(S.__webglFramebuffer[G]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[G])}else{if(Array.isArray(S.__webglFramebuffer))for(let G=0;G<S.__webglFramebuffer.length;G++)i.deleteFramebuffer(S.__webglFramebuffer[G]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let G=0;G<S.__webglColorRenderbuffer.length;G++)S.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[G]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const O=w.textures;for(let G=0,ne=O.length;G<ne;G++){const Z=n.get(O[G]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(O[G])}n.remove(w)}let C=0;function H(){C=0}function B(){const w=C;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function W(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function j(w,S){const O=n.get(w);if(w.isVideoTexture&&we(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){const G=w.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(O,w,S);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+S)}function V(w,S){const O=n.get(w);if(w.version>0&&O.__version!==w.version){Q(O,w,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+S)}function ie(w,S){const O=n.get(w);if(w.version>0&&O.__version!==w.version){Q(O,w,S);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+S)}function N(w,S){const O=n.get(w);if(w.version>0&&O.__version!==w.version){de(O,w,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+S)}const se={[Bs]:i.REPEAT,[wi]:i.CLAMP_TO_EDGE,[ea]:i.MIRRORED_REPEAT},re={[Zt]:i.NEAREST,[wf]:i.NEAREST_MIPMAP_NEAREST,[br]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[Vo]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},K={[Xm]:i.NEVER,[Jm]:i.ALWAYS,[qm]:i.LESS,[Ff]:i.LEQUAL,[Ym]:i.EQUAL,[$m]:i.GEQUAL,[Km]:i.GREATER,[Zm]:i.NOTEQUAL};function Re(w,S){if(S.type===Tn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===on||S.magFilter===Vo||S.magFilter===br||S.magFilter===ti||S.minFilter===on||S.minFilter===Vo||S.minFilter===br||S.minFilter===ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,se[S.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,se[S.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,se[S.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,re[S.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,re[S.minFilter]),S.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,K[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Zt||S.minFilter!==br&&S.minFilter!==ti||S.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ue(w,S){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",R));const G=S.source;let ne=f.get(G);ne===void 0&&(ne={},f.set(G,ne));const Z=W(S);if(Z!==w.__cacheKey){ne[Z]===void 0&&(ne[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ne[Z].usedTimes++;const be=ne[w.__cacheKey];be!==void 0&&(ne[w.__cacheKey].usedTimes--,be.usedTimes===0&&y(S)),w.__cacheKey=Z,w.__webglTexture=ne[Z].texture}return O}function Q(w,S,O){let G=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(G=i.TEXTURE_3D);const ne=ue(w,S),Z=S.source;t.bindTexture(G,w.__webglTexture,i.TEXTURE0+O);const be=n.get(Z);if(Z.version!==be.__version||ne===!0){t.activeTexture(i.TEXTURE0+O);const Me=it.getPrimaries(it.workingColorSpace),Ee=S.colorSpace===bi?null:it.getPrimaries(S.colorSpace),X=S.colorSpace===bi||Me===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);let U=x(S.image,!1,s.maxTextureSize);U=We(S,U);const te=r.convert(S.format,S.colorSpace),me=r.convert(S.type);let le=M(S.internalFormat,te,me,S.colorSpace,S.isVideoTexture);Re(G,S);let ae;const Y=S.mipmaps,k=S.isVideoTexture!==!0,Ce=be.__version===void 0||ne===!0,D=Z.dataReady,xe=P(S,U);if(S.isDepthTexture)le=_(S.format===Hs,S.type),Ce&&(k?t.texStorage2D(i.TEXTURE_2D,1,le,U.width,U.height):t.texImage2D(i.TEXTURE_2D,0,le,U.width,U.height,0,te,me,null));else if(S.isDataTexture)if(Y.length>0){k&&Ce&&t.texStorage2D(i.TEXTURE_2D,xe,le,Y[0].width,Y[0].height);for(let q=0,oe=Y.length;q<oe;q++)ae=Y[q],k?D&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ae.width,ae.height,te,me,ae.data):t.texImage2D(i.TEXTURE_2D,q,le,ae.width,ae.height,0,te,me,ae.data);S.generateMipmaps=!1}else k?(Ce&&t.texStorage2D(i.TEXTURE_2D,xe,le,U.width,U.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,U.width,U.height,te,me,U.data)):t.texImage2D(i.TEXTURE_2D,0,le,U.width,U.height,0,te,me,U.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){k&&Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,le,Y[0].width,Y[0].height,U.depth);for(let q=0,oe=Y.length;q<oe;q++)if(ae=Y[q],S.format!==xn)if(te!==null)if(k){if(D)if(S.layerUpdates.size>0){const ge=ih(ae.width,ae.height,S.format,S.type);for(const he of S.layerUpdates){const Oe=ae.data.subarray(he*ge/ae.data.BYTES_PER_ELEMENT,(he+1)*ge/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,he,ae.width,ae.height,1,te,Oe)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ae.width,ae.height,U.depth,te,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,le,ae.width,ae.height,U.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ae.width,ae.height,U.depth,te,me,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,le,ae.width,ae.height,U.depth,0,te,me,ae.data)}else{k&&Ce&&t.texStorage2D(i.TEXTURE_2D,xe,le,Y[0].width,Y[0].height);for(let q=0,oe=Y.length;q<oe;q++)ae=Y[q],S.format!==xn?te!==null?k?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ae.width,ae.height,te,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,q,le,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?D&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ae.width,ae.height,te,me,ae.data):t.texImage2D(i.TEXTURE_2D,q,le,ae.width,ae.height,0,te,me,ae.data)}else if(S.isDataArrayTexture)if(k){if(Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,le,U.width,U.height,U.depth),D)if(S.layerUpdates.size>0){const q=ih(U.width,U.height,S.format,S.type);for(const oe of S.layerUpdates){const ge=U.data.subarray(oe*q/U.data.BYTES_PER_ELEMENT,(oe+1)*q/U.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,U.width,U.height,1,te,me,ge)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,U.width,U.height,U.depth,te,me,U.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,U.width,U.height,U.depth,0,te,me,U.data);else if(S.isData3DTexture)k?(Ce&&t.texStorage3D(i.TEXTURE_3D,xe,le,U.width,U.height,U.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,U.width,U.height,U.depth,te,me,U.data)):t.texImage3D(i.TEXTURE_3D,0,le,U.width,U.height,U.depth,0,te,me,U.data);else if(S.isFramebufferTexture){if(Ce)if(k)t.texStorage2D(i.TEXTURE_2D,xe,le,U.width,U.height);else{let q=U.width,oe=U.height;for(let ge=0;ge<xe;ge++)t.texImage2D(i.TEXTURE_2D,ge,le,q,oe,0,te,me,null),q>>=1,oe>>=1}}else if(Y.length>0){if(k&&Ce){const q=Ae(Y[0]);t.texStorage2D(i.TEXTURE_2D,xe,le,q.width,q.height)}for(let q=0,oe=Y.length;q<oe;q++)ae=Y[q],k?D&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,te,me,ae):t.texImage2D(i.TEXTURE_2D,q,le,te,me,ae);S.generateMipmaps=!1}else if(k){if(Ce){const q=Ae(U);t.texStorage2D(i.TEXTURE_2D,xe,le,q.width,q.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te,me,U)}else t.texImage2D(i.TEXTURE_2D,0,le,te,me,U);m(S)&&p(G),be.__version=Z.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function de(w,S,O){if(S.image.length!==6)return;const G=ue(w,S),ne=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+O);const Z=n.get(ne);if(ne.version!==Z.__version||G===!0){t.activeTexture(i.TEXTURE0+O);const be=it.getPrimaries(it.workingColorSpace),Me=S.colorSpace===bi?null:it.getPrimaries(S.colorSpace),Ee=S.colorSpace===bi||be===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const X=S.isCompressedTexture||S.image[0].isCompressedTexture,U=S.image[0]&&S.image[0].isDataTexture,te=[];for(let oe=0;oe<6;oe++)!X&&!U?te[oe]=x(S.image[oe],!0,s.maxCubemapSize):te[oe]=U?S.image[oe].image:S.image[oe],te[oe]=We(S,te[oe]);const me=te[0],le=r.convert(S.format,S.colorSpace),ae=r.convert(S.type),Y=M(S.internalFormat,le,ae,S.colorSpace),k=S.isVideoTexture!==!0,Ce=Z.__version===void 0||G===!0,D=ne.dataReady;let xe=P(S,me);Re(i.TEXTURE_CUBE_MAP,S);let q;if(X){k&&Ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Y,me.width,me.height);for(let oe=0;oe<6;oe++){q=te[oe].mipmaps;for(let ge=0;ge<q.length;ge++){const he=q[ge];S.format!==xn?le!==null?k?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,0,0,he.width,he.height,le,he.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,Y,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,0,0,he.width,he.height,le,ae,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,Y,he.width,he.height,0,le,ae,he.data)}}}else{if(q=S.mipmaps,k&&Ce){q.length>0&&xe++;const oe=Ae(te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Y,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(U){k?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,te[oe].width,te[oe].height,le,ae,te[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Y,te[oe].width,te[oe].height,0,le,ae,te[oe].data);for(let ge=0;ge<q.length;ge++){const Oe=q[ge].image[oe].image;k?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,0,0,Oe.width,Oe.height,le,ae,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,Y,Oe.width,Oe.height,0,le,ae,Oe.data)}}else{k?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,le,ae,te[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Y,le,ae,te[oe]);for(let ge=0;ge<q.length;ge++){const he=q[ge];k?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,0,0,le,ae,he.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,Y,le,ae,he.image[oe])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),Z.__version=ne.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function Te(w,S,O,G,ne,Z){const be=r.convert(O.format,O.colorSpace),Me=r.convert(O.type),Ee=M(O.internalFormat,be,Me,O.colorSpace),X=n.get(S),U=n.get(O);if(U.__renderTarget=S,!X.__hasExternalTextures){const te=Math.max(1,S.width>>Z),me=Math.max(1,S.height>>Z);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,Z,Ee,te,me,S.depth,0,be,Me,null):t.texImage2D(ne,Z,Ee,te,me,0,be,Me,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Pe(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,ne,U.__webglTexture,0,fe(S)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,ne,U.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ve(w,S,O){if(i.bindRenderbuffer(i.RENDERBUFFER,w),S.depthBuffer){const G=S.depthTexture,ne=G&&G.isDepthTexture?G.type:null,Z=_(S.stencilBuffer,ne),be=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=fe(S);Pe(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,Z,S.width,S.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,w)}else{const G=S.textures;for(let ne=0;ne<G.length;ne++){const Z=G[ne],be=r.convert(Z.format,Z.colorSpace),Me=r.convert(Z.type),Ee=M(Z.internalFormat,be,Me,Z.colorSpace),X=fe(S);O&&Pe(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,X,Ee,S.width,S.height):Pe(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X,Ee,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=n.get(S.depthTexture);G.__renderTarget=S,(!G.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),j(S.depthTexture,0);const ne=G.__webglTexture,Z=fe(S);if(S.depthTexture.format===Ps)Pe(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(S.depthTexture.format===Hs)Pe(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Xe(w){const S=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){const G=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),G){const ne=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,G.removeEventListener("dispose",ne)};G.addEventListener("dispose",ne),S.__depthDisposeCallback=ne}S.__boundDepthTexture=G}if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Le(S.__webglFramebuffer,w)}else if(O){S.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[G]),S.__webglDepthbuffer[G]===void 0)S.__webglDepthbuffer[G]=i.createRenderbuffer(),ve(S.__webglDepthbuffer[G],w,!1);else{const ne=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ve(S.__webglDepthbuffer,w,!1);else{const G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,ne)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(w,S,O){const G=n.get(w);S!==void 0&&Te(G.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Xe(w)}function $e(w){const S=w.texture,O=n.get(w),G=n.get(S);w.addEventListener("dispose",A);const ne=w.textures,Z=w.isWebGLCubeRenderTarget===!0,be=ne.length>1;if(be||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=S.version,o.memory.textures++),Z){O.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[Me]=[];for(let Ee=0;Ee<S.mipmaps.length;Ee++)O.__webglFramebuffer[Me][Ee]=i.createFramebuffer()}else O.__webglFramebuffer[Me]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let Me=0;Me<S.mipmaps.length;Me++)O.__webglFramebuffer[Me]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(be)for(let Me=0,Ee=ne.length;Me<Ee;Me++){const X=n.get(ne[Me]);X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&Pe(w)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Me=0;Me<ne.length;Me++){const Ee=ne[Me];O.__webglColorRenderbuffer[Me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Me]);const X=r.convert(Ee.format,Ee.colorSpace),U=r.convert(Ee.type),te=M(Ee.internalFormat,X,U,Ee.colorSpace,w.isXRRenderTarget===!0),me=fe(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,me,te,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,O.__webglColorRenderbuffer[Me])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),ve(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Re(i.TEXTURE_CUBE_MAP,S);for(let Me=0;Me<6;Me++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)Te(O.__webglFramebuffer[Me][Ee],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ee);else Te(O.__webglFramebuffer[Me],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);m(S)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let Me=0,Ee=ne.length;Me<Ee;Me++){const X=ne[Me],U=n.get(X);t.bindTexture(i.TEXTURE_2D,U.__webglTexture),Re(i.TEXTURE_2D,X),Te(O.__webglFramebuffer,w,X,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,0),m(X)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let Me=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Me=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,G.__webglTexture),Re(Me,S),S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)Te(O.__webglFramebuffer[Ee],w,S,i.COLOR_ATTACHMENT0,Me,Ee);else Te(O.__webglFramebuffer,w,S,i.COLOR_ATTACHMENT0,Me,0);m(S)&&p(Me),t.unbindTexture()}w.depthBuffer&&Xe(w)}function ce(w){const S=w.textures;for(let O=0,G=S.length;O<G;O++){const ne=S[O];if(m(ne)){const Z=v(w),be=n.get(ne).__webglTexture;t.bindTexture(Z,be),p(Z),t.unbindTexture()}}}const pe=[],L=[];function De(w){if(w.samples>0){if(Pe(w)===!1){const S=w.textures,O=w.width,G=w.height;let ne=i.COLOR_BUFFER_BIT;const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(w),Me=S.length>1;if(Me)for(let Ee=0;Ee<S.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ee=0;Ee<S.length;Ee++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),Me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const X=n.get(S[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,X,0)}i.blitFramebuffer(0,0,O,G,0,0,O,G,ne,i.NEAREST),c===!0&&(pe.length=0,L.length=0,pe.push(i.COLOR_ATTACHMENT0+Ee),w.depthBuffer&&w.resolveDepthBuffer===!1&&(pe.push(Z),L.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Me)for(let Ee=0;Ee<S.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const X=n.get(S[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,X,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const S=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function fe(w){return Math.min(s.maxSamples,w.samples)}function Pe(w){const S=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function we(w){const S=o.render.frame;u.get(w)!==S&&(u.set(w,S),w.update())}function We(w,S){const O=w.colorSpace,G=w.format,ne=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==$t&&O!==bi&&(it.getTransfer(O)===dt?(G!==xn||ne!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function Ae(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=j,this.setTexture2DArray=V,this.setTexture3D=ie,this.setTextureCube=N,this.rebindTextures=He,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Pe}function gy(i,e){function t(n,s=bi){let r;const o=it.getTransfer(s);if(n===ri)return i.UNSIGNED_BYTE;if(n===Sl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===bl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Af)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ef)return i.BYTE;if(n===Tf)return i.SHORT;if(n===Or)return i.UNSIGNED_SHORT;if(n===Ml)return i.INT;if(n===Yi)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===jr)return i.HALF_FLOAT;if(n===Rf)return i.ALPHA;if(n===Cf)return i.RGB;if(n===xn)return i.RGBA;if(n===Pf)return i.LUMINANCE;if(n===If)return i.LUMINANCE_ALPHA;if(n===Ps)return i.DEPTH_COMPONENT;if(n===Hs)return i.DEPTH_STENCIL;if(n===wl)return i.RED;if(n===El)return i.RED_INTEGER;if(n===Lf)return i.RG;if(n===Tl)return i.RG_INTEGER;if(n===Al)return i.RGBA_INTEGER;if(n===Wo||n===Xo||n===qo||n===Yo)if(o===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wc||n===Ec||n===Tc||n===Ac)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ec)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rc||n===Cc||n===Pc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Rc||n===Cc)return o===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ic||n===Lc||n===Dc||n===Nc||n===Uc||n===Fc||n===Oc||n===zc||n===Bc||n===kc||n===Hc||n===Gc||n===Vc||n===Wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ic)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Dc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Hc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Gc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ko||n===Xc||n===qc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ko)return o===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Df||n===Yc||n===Kc||n===Zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ko)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Kc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class xy extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class an extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _y={type:"move"};class Wa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new an,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new an,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new an,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_y)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new an;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const vy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class My{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Pt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ri({vertexShader:vy,fragmentShader:yy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qe(new oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sy extends js{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const x=new My,m=t.getContextAttributes();let p=null,v=null;const M=[],_=[],P=new ye;let R=null;const A=new qt;A.viewport=new st;const T=new qt;T.viewport=new st;const y=[A,T],b=new xy;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let de=M[Q];return de===void 0&&(de=new Wa,M[Q]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Q){let de=M[Q];return de===void 0&&(de=new Wa,M[Q]=de),de.getGripSpace()},this.getHand=function(Q){let de=M[Q];return de===void 0&&(de=new Wa,M[Q]=de),de.getHandSpace()};function B(Q){const de=_.indexOf(Q.inputSource);if(de===-1)return;const Te=M[de];Te!==void 0&&(Te.update(Q.inputSource,Q.frame,l||o),Te.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",j);for(let Q=0;Q<M.length;Q++){const de=_[Q];de!==null&&(_[Q]=null,M[Q].disconnect(de))}C=null,H=null,x.reset(),e.setRenderTarget(p),d=null,f=null,h=null,s=null,v=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0){const de={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Ki(d.framebufferWidth,d.framebufferHeight,{format:xn,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let de=null,Te=null,ve=null;m.depth&&(ve=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=m.stencil?Hs:Ps,Te=m.stencil?ks:Yi);const Le={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(Le),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Ki(f.textureWidth,f.textureHeight,{format:xn,type:ri,depthTexture:new Kf(f.textureWidth,f.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ue.setContext(s),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(Q){for(let de=0;de<Q.removed.length;de++){const Te=Q.removed[de],ve=_.indexOf(Te);ve>=0&&(_[ve]=null,M[ve].disconnect(Te))}for(let de=0;de<Q.added.length;de++){const Te=Q.added[de];let ve=_.indexOf(Te);if(ve===-1){for(let Xe=0;Xe<M.length;Xe++)if(Xe>=_.length){_.push(Te),ve=Xe;break}else if(_[Xe]===null){_[Xe]=Te,ve=Xe;break}if(ve===-1)break}const Le=M[ve];Le&&Le.connect(Te)}}const V=new I,ie=new I;function N(Q,de,Te){V.setFromMatrixPosition(de.matrixWorld),ie.setFromMatrixPosition(Te.matrixWorld);const ve=V.distanceTo(ie),Le=de.projectionMatrix.elements,Xe=Te.projectionMatrix.elements,He=Le[14]/(Le[10]-1),$e=Le[14]/(Le[10]+1),ce=(Le[9]+1)/Le[5],pe=(Le[9]-1)/Le[5],L=(Le[8]-1)/Le[0],De=(Xe[8]+1)/Xe[0],fe=He*L,Pe=He*De,we=ve/(-L+De),We=we*-L;if(de.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(We),Q.translateZ(we),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Le[10]===-1)Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const Ae=He+we,w=$e+we,S=fe-We,O=Pe+(ve-We),G=ce*$e/w*Ae,ne=pe*$e/w*Ae;Q.projectionMatrix.makePerspective(S,O,G,ne,Ae,w),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function se(Q,de){de===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(de.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let de=Q.near,Te=Q.far;x.texture!==null&&(x.depthNear>0&&(de=x.depthNear),x.depthFar>0&&(Te=x.depthFar)),b.near=T.near=A.near=de,b.far=T.far=A.far=Te,(C!==b.near||H!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),C=b.near,H=b.far),A.layers.mask=Q.layers.mask|2,T.layers.mask=Q.layers.mask|4,b.layers.mask=A.layers.mask|T.layers.mask;const ve=Q.parent,Le=b.cameras;se(b,ve);for(let Xe=0;Xe<Le.length;Xe++)se(Le[Xe],ve);Le.length===2?N(b,A,T):b.projectionMatrix.copy(A.projectionMatrix),re(Q,b,ve)};function re(Q,de,Te){Te===null?Q.matrix.copy(de.matrixWorld):(Q.matrix.copy(Te.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(de.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Gs*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(b)};let K=null;function Re(Q,de){if(u=de.getViewerPose(l||o),g=de,u!==null){const Te=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let ve=!1;Te.length!==b.cameras.length&&(b.cameras.length=0,ve=!0);for(let Xe=0;Xe<Te.length;Xe++){const He=Te[Xe];let $e=null;if(d!==null)$e=d.getViewport(He);else{const pe=h.getViewSubImage(f,He);$e=pe.viewport,Xe===0&&(e.setRenderTargetTextures(v,pe.colorTexture,f.ignoreDepthValues?void 0:pe.depthStencilTexture),e.setRenderTarget(v))}let ce=y[Xe];ce===void 0&&(ce=new qt,ce.layers.enable(Xe),ce.viewport=new st,y[Xe]=ce),ce.matrix.fromArray(He.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(He.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set($e.x,$e.y,$e.width,$e.height),Xe===0&&(b.matrix.copy(ce.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ve===!0&&b.cameras.push(ce)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const Xe=h.getDepthInformation(Te[0]);Xe&&Xe.isValid&&Xe.texture&&x.init(e,Xe,s.renderState)}}for(let Te=0;Te<M.length;Te++){const ve=_[Te],Le=M[Te];ve!==null&&Le!==void 0&&Le.update(ve,de,l||o)}K&&K(Q,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),g=null}const ue=new Yf;ue.setAnimationLoop(Re),this.setAnimationLoop=function(Q){K=Q},this.dispose=function(){}}}const Ui=new Rn,by=new Ke;function wy(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,M,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Kt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Kt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),M=v.envMap,_=v.envMapRotation;M&&(m.envMap.value=M,Ui.copy(_),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(by.makeRotationFromEuler(Ui)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ey(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const _=M.program;n.uniformBlockBinding(v,_)}function l(v,M){let _=s[v.id];_===void 0&&(g(v),_=u(v),s[v.id]=_,v.addEventListener("dispose",m));const P=M.program;n.updateUBOMapping(v,P);const R=e.render.frame;r[v.id]!==R&&(f(v),r[v.id]=R)}function u(v){const M=h();v.__bindingPointIndex=M;const _=i.createBuffer(),P=v.__size,R=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,P,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=s[v.id],_=v.uniforms,P=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let R=0,A=_.length;R<A;R++){const T=Array.isArray(_[R])?_[R]:[_[R]];for(let y=0,b=T.length;y<b;y++){const C=T[y];if(d(C,R,y,P)===!0){const H=C.__offset,B=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let j=0;j<B.length;j++){const V=B[j],ie=x(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,H+W,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,W),W+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,M,_,P){const R=v.value,A=M+"_"+_;if(P[A]===void 0)return typeof R=="number"||typeof R=="boolean"?P[A]=R:P[A]=R.clone(),!0;{const T=P[A];if(typeof R=="number"||typeof R=="boolean"){if(T!==R)return P[A]=R,!0}else if(T.equals(R)===!1)return T.copy(R),!0}return!1}function g(v){const M=v.uniforms;let _=0;const P=16;for(let A=0,T=M.length;A<T;A++){const y=Array.isArray(M[A])?M[A]:[M[A]];for(let b=0,C=y.length;b<C;b++){const H=y[b],B=Array.isArray(H.value)?H.value:[H.value];for(let W=0,j=B.length;W<j;W++){const V=B[W],ie=x(V),N=_%P,se=N%ie.boundary,re=N+se;_+=se,re!==0&&P-re<ie.storage&&(_+=P-re),H.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=ie.storage}}}const R=_%P;return R>0&&(_+=P-R),v.__size=_,v.__cache={},this}function x(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Ty{constructor(e={}){const{canvas:t=p0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this.toneMapping=Ai,this.toneMappingExposure=1;const _=this;let P=!1,R=0,A=0,T=null,y=-1,b=null;const C=new st,H=new st;let B=null;const W=new ee(0);let j=0,V=t.width,ie=t.height,N=1,se=null,re=null;const K=new st(0,0,V,ie),Re=new st(0,0,V,ie);let ue=!1;const Q=new Pl;let de=!1,Te=!1;const ve=new Ke,Le=new Ke,Xe=new I,He=new st,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function pe(){return T===null?N:1}let L=n;function De(E,z){return t.getContext(E,z)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yl}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",he,!1),L===null){const z="webgl2";if(L=De(z,E),L===null)throw De(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let fe,Pe,we,We,Ae,w,S,O,G,ne,Z,be,Me,Ee,X,U,te,me,le,ae,Y,k,Ce,D;function xe(){fe=new I_(L),fe.init(),k=new gy(L,fe),Pe=new E_(L,fe,e,k),we=new dy(L,fe),Pe.reverseDepthBuffer&&f&&we.buffers.depth.setReversed(!0),We=new N_(L),Ae=new jv,w=new my(L,fe,we,Ae,Pe,k,We),S=new A_(_),O=new P_(_),G=new H0(L),Ce=new b_(L,G),ne=new L_(L,G,We,Ce),Z=new F_(L,ne,G,We),le=new U_(L,Pe,w),U=new T_(Ae),be=new Jv(_,S,O,fe,Pe,Ce,U),Me=new wy(_,Ae),Ee=new ey,X=new oy(fe),me=new S_(_,S,O,we,Z,d,c),te=new hy(_,Z,Pe),D=new Ey(L,We,Pe,we),ae=new w_(L,fe,We),Y=new D_(L,fe,We),We.programs=be.programs,_.capabilities=Pe,_.extensions=fe,_.properties=Ae,_.renderLists=Ee,_.shadowMap=te,_.state=we,_.info=We}xe();const q=new Sy(_,L);this.xr=q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=fe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=fe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(E){E!==void 0&&(N=E,this.setSize(V,ie,!1))},this.getSize=function(E){return E.set(V,ie)},this.setSize=function(E,z,J=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=E,ie=z,t.width=Math.floor(E*N),t.height=Math.floor(z*N),J===!0&&(t.style.width=E+"px",t.style.height=z+"px"),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(V*N,ie*N).floor()},this.setDrawingBufferSize=function(E,z,J){V=E,ie=z,N=J,t.width=Math.floor(E*J),t.height=Math.floor(z*J),this.setViewport(0,0,E,z)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(K)},this.setViewport=function(E,z,J,$){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,z,J,$),we.viewport(C.copy(K).multiplyScalar(N).round())},this.getScissor=function(E){return E.copy(Re)},this.setScissor=function(E,z,J,$){E.isVector4?Re.set(E.x,E.y,E.z,E.w):Re.set(E,z,J,$),we.scissor(H.copy(Re).multiplyScalar(N).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(E){we.setScissorTest(ue=E)},this.setOpaqueSort=function(E){se=E},this.setTransparentSort=function(E){re=E},this.getClearColor=function(E){return E.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(E=!0,z=!0,J=!0){let $=0;if(E){let F=!1;if(T!==null){const _e=T.texture.format;F=_e===Al||_e===Tl||_e===El}if(F){const _e=T.texture.type,Ue=_e===ri||_e===Yi||_e===Or||_e===ks||_e===Sl||_e===bl,ze=me.getClearColor(),Be=me.getClearAlpha(),Ze=ze.r,Qe=ze.g,ke=ze.b;Ue?(g[0]=Ze,g[1]=Qe,g[2]=ke,g[3]=Be,L.clearBufferuiv(L.COLOR,0,g)):(x[0]=Ze,x[1]=Qe,x[2]=ke,x[3]=Be,L.clearBufferiv(L.COLOR,0,x))}else $|=L.COLOR_BUFFER_BIT}z&&($|=L.DEPTH_BUFFER_BIT),J&&($|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",he,!1),Ee.dispose(),X.dispose(),Ae.dispose(),S.dispose(),O.dispose(),Z.dispose(),Ce.dispose(),D.dispose(),be.dispose(),q.dispose(),q.removeEventListener("sessionstart",Dt),q.removeEventListener("sessionend",Nt),Mt.stop()};function oe(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const E=We.autoReset,z=te.enabled,J=te.autoUpdate,$=te.needsUpdate,F=te.type;xe(),We.autoReset=E,te.enabled=z,te.autoUpdate=J,te.needsUpdate=$,te.type=F}function he(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Oe(E){const z=E.target;z.removeEventListener("dispose",Oe),Je(z)}function Je(E){ft(E),Ae.remove(E)}function ft(E){const z=Ae.get(E).programs;z!==void 0&&(z.forEach(function(J){be.releaseProgram(J)}),E.isShaderMaterial&&be.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,J,$,F,_e){z===null&&(z=$e);const Ue=F.isMesh&&F.matrixWorld.determinant()<0,ze=Ot(E,z,J,$,F);we.setMaterial($,Ue);let Be=J.index,Ze=1;if($.wireframe===!0){if(Be=ne.getWireframeAttribute(J),Be===void 0)return;Ze=2}const Qe=J.drawRange,ke=J.attributes.position;let rt=Qe.start*Ze,gt=(Qe.start+Qe.count)*Ze;_e!==null&&(rt=Math.max(rt,_e.start*Ze),gt=Math.min(gt,(_e.start+_e.count)*Ze)),Be!==null?(rt=Math.max(rt,0),gt=Math.min(gt,Be.count)):ke!=null&&(rt=Math.max(rt,0),gt=Math.min(gt,ke.count));const vt=gt-rt;if(vt<0||vt===1/0)return;Ce.setup(F,$,ze,J,Be);let Jt,at=ae;if(Be!==null&&(Jt=G.get(Be),at=Y,at.setIndex(Jt)),F.isMesh)$.wireframe===!0?(we.setLineWidth($.wireframeLinewidth*pe()),at.setMode(L.LINES)):at.setMode(L.TRIANGLES);else if(F.isLine){let Ge=$.linewidth;Ge===void 0&&(Ge=1),we.setLineWidth(Ge*pe()),F.isLineSegments?at.setMode(L.LINES):F.isLineLoop?at.setMode(L.LINE_LOOP):at.setMode(L.LINE_STRIP)}else F.isPoints?at.setMode(L.POINTS):F.isSprite&&at.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)at.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))at.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ge=F._multiDrawStarts,Wn=F._multiDrawCounts,ct=F._multiDrawCount,Mn=Be?G.get(Be).bytesPerElement:1,es=Ae.get($).currentProgram.getUniforms();for(let en=0;en<ct;en++)es.setValue(L,"_gl_DrawID",en),at.render(Ge[en]/Mn,Wn[en])}else if(F.isInstancedMesh)at.renderInstances(rt,vt,F.count);else if(J.isInstancedBufferGeometry){const Ge=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Wn=Math.min(J.instanceCount,Ge);at.renderInstances(rt,vt,Wn)}else at.render(rt,vt)};function je(E,z,J){E.transparent===!0&&E.side===At&&E.forceSinglePass===!1?(E.side=Kt,E.needsUpdate=!0,Qi(E,z,J),E.side=si,E.needsUpdate=!0,Qi(E,z,J),E.side=At):Qi(E,z,J)}this.compile=function(E,z,J=null){J===null&&(J=E),p=X.get(J),p.init(z),M.push(p),J.traverseVisible(function(F){F.isLight&&F.layers.test(z.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==J&&E.traverseVisible(function(F){F.isLight&&F.layers.test(z.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const $=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const _e=F.material;if(_e)if(Array.isArray(_e))for(let Ue=0;Ue<_e.length;Ue++){const ze=_e[Ue];je(ze,J,F),$.add(ze)}else je(_e,J,F),$.add(_e)}),M.pop(),p=null,$},this.compileAsync=function(E,z,J=null){const $=this.compile(E,z,J);return new Promise(F=>{function _e(){if($.forEach(function(Ue){Ae.get(Ue).currentProgram.isReady()&&$.delete(Ue)}),$.size===0){F(E);return}setTimeout(_e,10)}fe.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Et=null;function wt(E){Et&&Et(E)}function Dt(){Mt.stop()}function Nt(){Mt.start()}const Mt=new Yf;Mt.setAnimationLoop(wt),typeof self<"u"&&Mt.setContext(self),this.setAnimationLoop=function(E){Et=E,q.setAnimationLoop(E),E===null?Mt.stop():Mt.start()},q.addEventListener("sessionstart",Dt),q.addEventListener("sessionend",Nt),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(z),z=q.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,z,T),p=X.get(E,M.length),p.init(z),M.push(p),Le.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Q.setFromProjectionMatrix(Le),Te=this.localClippingEnabled,de=U.init(this.clippingPlanes,Te),m=Ee.get(E,v.length),m.init(),v.push(m),q.enabled===!0&&q.isPresenting===!0){const _e=_.xr.getDepthSensingMesh();_e!==null&&ln(_e,z,-1/0,_.sortObjects)}ln(E,z,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(se,re),ce=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,ce&&me.addToRenderList(m,E),this.info.render.frame++,de===!0&&U.beginShadows();const J=p.state.shadowsArray;te.render(J,E,z),de===!0&&U.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,F=m.transmissive;if(p.setupLights(),z.isArrayCamera){const _e=z.cameras;if(F.length>0)for(let Ue=0,ze=_e.length;Ue<ze;Ue++){const Be=_e[Ue];Hn($,F,E,Be)}ce&&me.render(E);for(let Ue=0,ze=_e.length;Ue<ze;Ue++){const Be=_e[Ue];Cn(m,E,Be,Be.viewport)}}else F.length>0&&Hn($,F,E,z),ce&&me.render(E),Cn(m,E,z);T!==null&&(w.updateMultisampleRenderTarget(T),w.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(_,E,z),Ce.resetDefaultState(),y=-1,b=null,M.pop(),M.length>0?(p=M[M.length-1],de===!0&&U.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function ln(E,z,J,$){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Q.intersectsSprite(E)){$&&He.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Le);const Ue=Z.update(E),ze=E.material;ze.visible&&m.push(E,Ue,ze,J,He.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Q.intersectsObject(E))){const Ue=Z.update(E),ze=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),He.copy(E.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),He.copy(Ue.boundingSphere.center)),He.applyMatrix4(E.matrixWorld).applyMatrix4(Le)),Array.isArray(ze)){const Be=Ue.groups;for(let Ze=0,Qe=Be.length;Ze<Qe;Ze++){const ke=Be[Ze],rt=ze[ke.materialIndex];rt&&rt.visible&&m.push(E,Ue,rt,J,He.z,ke)}}else ze.visible&&m.push(E,Ue,ze,J,He.z,null)}}const _e=E.children;for(let Ue=0,ze=_e.length;Ue<ze;Ue++)ln(_e[Ue],z,J,$)}function Cn(E,z,J,$){const F=E.opaque,_e=E.transmissive,Ue=E.transparent;p.setupLightsView(J),de===!0&&U.setGlobalState(_.clippingPlanes,J),$&&we.viewport(C.copy($)),F.length>0&&yn(F,z,J),_e.length>0&&yn(_e,z,J),Ue.length>0&&yn(Ue,z,J),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Hn(E,z,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new Ki(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?jr:ri,minFilter:ti,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const _e=p.state.transmissionRenderTarget[$.id],Ue=$.viewport||C;_e.setSize(Ue.z,Ue.w);const ze=_.getRenderTarget();_.setRenderTarget(_e),_.getClearColor(W),j=_.getClearAlpha(),j<1&&_.setClearColor(16777215,.5),_.clear(),ce&&me.render(J);const Be=_.toneMapping;_.toneMapping=Ai;const Ze=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),de===!0&&U.setGlobalState(_.clippingPlanes,$),yn(E,J,$),w.updateMultisampleRenderTarget(_e),w.updateRenderTargetMipmap(_e),fe.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let ke=0,rt=z.length;ke<rt;ke++){const gt=z[ke],vt=gt.object,Jt=gt.geometry,at=gt.material,Ge=gt.group;if(at.side===At&&vt.layers.test($.layers)){const Wn=at.side;at.side=Kt,at.needsUpdate=!0,ir(vt,J,$,Jt,at,Ge),at.side=Wn,at.needsUpdate=!0,Qe=!0}}Qe===!0&&(w.updateMultisampleRenderTarget(_e),w.updateRenderTargetMipmap(_e))}_.setRenderTarget(ze),_.setClearColor(W,j),Ze!==void 0&&($.viewport=Ze),_.toneMapping=Be}function yn(E,z,J){const $=z.isScene===!0?z.overrideMaterial:null;for(let F=0,_e=E.length;F<_e;F++){const Ue=E[F],ze=Ue.object,Be=Ue.geometry,Ze=$===null?Ue.material:$,Qe=Ue.group;ze.layers.test(J.layers)&&ir(ze,z,J,Be,Ze,Qe)}}function ir(E,z,J,$,F,_e){E.onBeforeRender(_,z,J,$,F,_e),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(_,z,J,$,E,_e),F.transparent===!0&&F.side===At&&F.forceSinglePass===!1?(F.side=Kt,F.needsUpdate=!0,_.renderBufferDirect(J,z,$,F,E,_e),F.side=si,F.needsUpdate=!0,_.renderBufferDirect(J,z,$,F,E,_e),F.side=At):_.renderBufferDirect(J,z,$,F,E,_e),E.onAfterRender(_,z,J,$,F,_e)}function Qi(E,z,J){z.isScene!==!0&&(z=$e);const $=Ae.get(E),F=p.state.lights,_e=p.state.shadowsArray,Ue=F.state.version,ze=be.getParameters(E,F.state,_e,z,J),Be=be.getProgramCacheKey(ze);let Ze=$.programs;$.environment=E.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(E.isMeshStandardMaterial?O:S).get(E.envMap||$.environment),$.envMapRotation=$.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,Ze===void 0&&(E.addEventListener("dispose",Oe),Ze=new Map,$.programs=Ze);let Qe=Ze.get(Be);if(Qe!==void 0){if($.currentProgram===Qe&&$.lightsStateVersion===Ue)return so(E,ze),Qe}else ze.uniforms=be.getUniforms(E),E.onBeforeCompile(ze,_),Qe=be.acquireProgram(ze,Be),Ze.set(Be,Qe),$.uniforms=ze.uniforms;const ke=$.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ke.clippingPlanes=U.uniform),so(E,ze),$.needsLights=Vn(E),$.lightsStateVersion=Ue,$.needsLights&&(ke.ambientLightColor.value=F.state.ambient,ke.lightProbe.value=F.state.probe,ke.directionalLights.value=F.state.directional,ke.directionalLightShadows.value=F.state.directionalShadow,ke.spotLights.value=F.state.spot,ke.spotLightShadows.value=F.state.spotShadow,ke.rectAreaLights.value=F.state.rectArea,ke.ltc_1.value=F.state.rectAreaLTC1,ke.ltc_2.value=F.state.rectAreaLTC2,ke.pointLights.value=F.state.point,ke.pointLightShadows.value=F.state.pointShadow,ke.hemisphereLights.value=F.state.hemi,ke.directionalShadowMap.value=F.state.directionalShadowMap,ke.directionalShadowMatrix.value=F.state.directionalShadowMatrix,ke.spotShadowMap.value=F.state.spotShadowMap,ke.spotLightMatrix.value=F.state.spotLightMatrix,ke.spotLightMap.value=F.state.spotLightMap,ke.pointShadowMap.value=F.state.pointShadowMap,ke.pointShadowMatrix.value=F.state.pointShadowMatrix),$.currentProgram=Qe,$.uniformsList=null,Qe}function io(E){if(E.uniformsList===null){const z=E.currentProgram.getUniforms();E.uniformsList=Zo.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function so(E,z){const J=Ae.get(E);J.outputColorSpace=z.outputColorSpace,J.batching=z.batching,J.batchingColor=z.batchingColor,J.instancing=z.instancing,J.instancingColor=z.instancingColor,J.instancingMorph=z.instancingMorph,J.skinning=z.skinning,J.morphTargets=z.morphTargets,J.morphNormals=z.morphNormals,J.morphColors=z.morphColors,J.morphTargetsCount=z.morphTargetsCount,J.numClippingPlanes=z.numClippingPlanes,J.numIntersection=z.numClipIntersection,J.vertexAlphas=z.vertexAlphas,J.vertexTangents=z.vertexTangents,J.toneMapping=z.toneMapping}function Ot(E,z,J,$,F){z.isScene!==!0&&(z=$e),w.resetTextureUnits();const _e=z.fog,Ue=$.isMeshStandardMaterial?z.environment:null,ze=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:$t,Be=($.isMeshStandardMaterial?O:S).get($.envMap||Ue),Ze=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Qe=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),ke=!!J.morphAttributes.position,rt=!!J.morphAttributes.normal,gt=!!J.morphAttributes.color;let vt=Ai;$.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(vt=_.toneMapping);const Jt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,at=Jt!==void 0?Jt.length:0,Ge=Ae.get($),Wn=p.state.lights;if(de===!0&&(Te===!0||E!==b)){const un=E===b&&$.id===y;U.setState($,E,un)}let ct=!1;$.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Wn.state.version||Ge.outputColorSpace!==ze||F.isBatchedMesh&&Ge.batching===!1||!F.isBatchedMesh&&Ge.batching===!0||F.isBatchedMesh&&Ge.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ge.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ge.instancing===!1||!F.isInstancedMesh&&Ge.instancing===!0||F.isSkinnedMesh&&Ge.skinning===!1||!F.isSkinnedMesh&&Ge.skinning===!0||F.isInstancedMesh&&Ge.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ge.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ge.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ge.instancingMorph===!1&&F.morphTexture!==null||Ge.envMap!==Be||$.fog===!0&&Ge.fog!==_e||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==U.numPlanes||Ge.numIntersection!==U.numIntersection)||Ge.vertexAlphas!==Ze||Ge.vertexTangents!==Qe||Ge.morphTargets!==ke||Ge.morphNormals!==rt||Ge.morphColors!==gt||Ge.toneMapping!==vt||Ge.morphTargetsCount!==at)&&(ct=!0):(ct=!0,Ge.__version=$.version);let Mn=Ge.currentProgram;ct===!0&&(Mn=Qi($,z,F));let es=!1,en=!1,sr=!1;const yt=Mn.getUniforms(),Pn=Ge.uniforms;if(we.useProgram(Mn.program)&&(es=!0,en=!0,sr=!0),$.id!==y&&(y=$.id,en=!0),es||b!==E){we.buffers.depth.getReversed()?(ve.copy(E.projectionMatrix),g0(ve),x0(ve),yt.setValue(L,"projectionMatrix",ve)):yt.setValue(L,"projectionMatrix",E.projectionMatrix),yt.setValue(L,"viewMatrix",E.matrixWorldInverse);const ui=yt.map.cameraPosition;ui!==void 0&&ui.setValue(L,Xe.setFromMatrixPosition(E.matrixWorld)),Pe.logarithmicDepthBuffer&&yt.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&yt.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,en=!0,sr=!0)}if(F.isSkinnedMesh){yt.setOptional(L,F,"bindMatrix"),yt.setOptional(L,F,"bindMatrixInverse");const un=F.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),yt.setValue(L,"boneTexture",un.boneTexture,w))}F.isBatchedMesh&&(yt.setOptional(L,F,"batchingTexture"),yt.setValue(L,"batchingTexture",F._matricesTexture,w),yt.setOptional(L,F,"batchingIdTexture"),yt.setValue(L,"batchingIdTexture",F._indirectTexture,w),yt.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&yt.setValue(L,"batchingColorTexture",F._colorsTexture,w));const rr=J.morphAttributes;if((rr.position!==void 0||rr.normal!==void 0||rr.color!==void 0)&&le.update(F,J,Mn),(en||Ge.receiveShadow!==F.receiveShadow)&&(Ge.receiveShadow=F.receiveShadow,yt.setValue(L,"receiveShadow",F.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Pn.envMap.value=Be,Pn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&z.environment!==null&&(Pn.envMapIntensity.value=z.environmentIntensity),en&&(yt.setValue(L,"toneMappingExposure",_.toneMappingExposure),Ge.needsLights&&Gn(Pn,sr),_e&&$.fog===!0&&Me.refreshFogUniforms(Pn,_e),Me.refreshMaterialUniforms(Pn,$,N,ie,p.state.transmissionRenderTarget[E.id]),Zo.upload(L,io(Ge),Pn,w)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Zo.upload(L,io(Ge),Pn,w),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&yt.setValue(L,"center",F.center),yt.setValue(L,"modelViewMatrix",F.modelViewMatrix),yt.setValue(L,"normalMatrix",F.normalMatrix),yt.setValue(L,"modelMatrix",F.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const un=$.uniformsGroups;for(let ui=0,hi=un.length;ui<hi;ui++){const $l=un[ui];D.update($l,Mn),D.bind($l,Mn)}}return Mn}function Gn(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function Vn(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,z,J){Ae.get(E.texture).__webglTexture=z,Ae.get(E.depthTexture).__webglTexture=J;const $=Ae.get(E);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=J===void 0,$.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,z){const J=Ae.get(E);J.__webglFramebuffer=z,J.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(E,z=0,J=0){T=E,R=z,A=J;let $=!0,F=null,_e=!1,Ue=!1;if(E){const Be=Ae.get(E);if(Be.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(L.FRAMEBUFFER,null),$=!1;else if(Be.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(Be.__hasExternalTextures)w.rebindTextures(E,Ae.get(E.texture).__webglTexture,Ae.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ke=E.depthTexture;if(Be.__boundDepthTexture!==ke){if(ke!==null&&Ae.has(ke)&&(E.width!==ke.image.width||E.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}const Ze=E.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(Ue=!0);const Qe=Ae.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Qe[z])?F=Qe[z][J]:F=Qe[z],_e=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?F=Ae.get(E).__webglMultisampledFramebuffer:Array.isArray(Qe)?F=Qe[J]:F=Qe,C.copy(E.viewport),H.copy(E.scissor),B=E.scissorTest}else C.copy(K).multiplyScalar(N).floor(),H.copy(Re).multiplyScalar(N).floor(),B=ue;if(we.bindFramebuffer(L.FRAMEBUFFER,F)&&$&&we.drawBuffers(E,F),we.viewport(C),we.scissor(H),we.setScissorTest(B),_e){const Be=Ae.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+z,Be.__webglTexture,J)}else if(Ue){const Be=Ae.get(E.texture),Ze=z||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Be.__webglTexture,J||0,Ze)}y=-1},this.readRenderTargetPixels=function(E,z,J,$,F,_e,Ue){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=Ae.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ue!==void 0&&(ze=ze[Ue]),ze){we.bindFramebuffer(L.FRAMEBUFFER,ze);try{const Be=E.texture,Ze=Be.format,Qe=Be.type;if(!Pe.textureFormatReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-$&&J>=0&&J<=E.height-F&&L.readPixels(z,J,$,F,k.convert(Ze),k.convert(Qe),_e)}finally{const Be=T!==null?Ae.get(T).__webglFramebuffer:null;we.bindFramebuffer(L.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(E,z,J,$,F,_e,Ue){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=Ae.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ue!==void 0&&(ze=ze[Ue]),ze){const Be=E.texture,Ze=Be.format,Qe=Be.type;if(!Pe.textureFormatReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=E.width-$&&J>=0&&J<=E.height-F){we.bindFramebuffer(L.FRAMEBUFFER,ze);const ke=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ke),L.bufferData(L.PIXEL_PACK_BUFFER,_e.byteLength,L.STREAM_READ),L.readPixels(z,J,$,F,k.convert(Ze),k.convert(Qe),0);const rt=T!==null?Ae.get(T).__webglFramebuffer:null;we.bindFramebuffer(L.FRAMEBUFFER,rt);const gt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await m0(L,gt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ke),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,_e),L.deleteBuffer(ke),L.deleteSync(gt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,z=null,J=0){E.isTexture!==!0&&(wr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1]);const $=Math.pow(2,-J),F=Math.floor(E.image.width*$),_e=Math.floor(E.image.height*$),Ue=z!==null?z.x:0,ze=z!==null?z.y:0;w.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,J,0,0,Ue,ze,F,_e),we.unbindTexture()},this.copyTextureToTexture=function(E,z,J=null,$=null,F=0){E.isTexture!==!0&&(wr("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,E=arguments[1],z=arguments[2],F=arguments[3]||0,J=null);let _e,Ue,ze,Be,Ze,Qe,ke,rt,gt;const vt=E.isCompressedTexture?E.mipmaps[F]:E.image;J!==null?(_e=J.max.x-J.min.x,Ue=J.max.y-J.min.y,ze=J.isBox3?J.max.z-J.min.z:1,Be=J.min.x,Ze=J.min.y,Qe=J.isBox3?J.min.z:0):(_e=vt.width,Ue=vt.height,ze=vt.depth||1,Be=0,Ze=0,Qe=0),$!==null?(ke=$.x,rt=$.y,gt=$.z):(ke=0,rt=0,gt=0);const Jt=k.convert(z.format),at=k.convert(z.type);let Ge;z.isData3DTexture?(w.setTexture3D(z,0),Ge=L.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(w.setTexture2DArray(z,0),Ge=L.TEXTURE_2D_ARRAY):(w.setTexture2D(z,0),Ge=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,z.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,z.unpackAlignment);const Wn=L.getParameter(L.UNPACK_ROW_LENGTH),ct=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Mn=L.getParameter(L.UNPACK_SKIP_PIXELS),es=L.getParameter(L.UNPACK_SKIP_ROWS),en=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,vt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Be),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ze),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Qe);const sr=E.isDataArrayTexture||E.isData3DTexture,yt=z.isDataArrayTexture||z.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Pn=Ae.get(E),rr=Ae.get(z),un=Ae.get(Pn.__renderTarget),ui=Ae.get(rr.__renderTarget);we.bindFramebuffer(L.READ_FRAMEBUFFER,un.__webglFramebuffer),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,ui.__webglFramebuffer);for(let hi=0;hi<ze;hi++)sr&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ae.get(E).__webglTexture,F,Qe+hi),E.isDepthTexture?(yt&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ae.get(z).__webglTexture,F,gt+hi),L.blitFramebuffer(Be,Ze,_e,Ue,ke,rt,_e,Ue,L.DEPTH_BUFFER_BIT,L.NEAREST)):yt?L.copyTexSubImage3D(Ge,F,ke,rt,gt+hi,Be,Ze,_e,Ue):L.copyTexSubImage2D(Ge,F,ke,rt,gt+hi,Be,Ze,_e,Ue);we.bindFramebuffer(L.READ_FRAMEBUFFER,null),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else yt?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Ge,F,ke,rt,gt,_e,Ue,ze,Jt,at,vt.data):z.isCompressedArrayTexture?L.compressedTexSubImage3D(Ge,F,ke,rt,gt,_e,Ue,ze,Jt,vt.data):L.texSubImage3D(Ge,F,ke,rt,gt,_e,Ue,ze,Jt,at,vt):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,F,ke,rt,_e,Ue,Jt,at,vt.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,F,ke,rt,vt.width,vt.height,Jt,vt.data):L.texSubImage2D(L.TEXTURE_2D,F,ke,rt,_e,Ue,Jt,at,vt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Wn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Mn),L.pixelStorei(L.UNPACK_SKIP_ROWS,es),L.pixelStorei(L.UNPACK_SKIP_IMAGES,en),F===0&&z.generateMipmaps&&L.generateMipmap(Ge),we.unbindTexture()},this.copyTextureToTexture3D=function(E,z,J=null,$=null,F=0){return E.isTexture!==!0&&(wr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,$=arguments[1]||null,E=arguments[2],z=arguments[3],F=arguments[4]||0),wr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,z,J,$,F)},this.initRenderTarget=function(E){Ae.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),we.unbindTexture()},this.resetState=function(){R=0,A=0,T=null,we.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}}class Dl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ee(e),this.near=t,this.far=n}clone(){return new Dl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ay extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Qf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jc,this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new I;class Hr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ye(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Hr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ki extends An{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ms;const ur=new I,gs=new I,xs=new I,_s=new ye,hr=new ye,ed=new Ke,To=new I,fr=new I,Ao=new I,sh=new ye,Xa=new ye,rh=new ye;class vs extends mt{constructor(e=new ki){if(super(),this.isSprite=!0,this.type="Sprite",ms===void 0){ms=new lt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qf(t,5);ms.setIndex([0,1,2,0,2,3]),ms.setAttribute("position",new Hr(n,3,0,!1)),ms.setAttribute("uv",new Hr(n,2,3,!1))}this.geometry=ms,this.material=e,this.center=new ye(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gs.setFromMatrixScale(this.matrixWorld),ed.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gs.multiplyScalar(-xs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ro(To.set(-.5,-.5,0),xs,o,gs,s,r),Ro(fr.set(.5,-.5,0),xs,o,gs,s,r),Ro(Ao.set(.5,.5,0),xs,o,gs,s,r),sh.set(0,0),Xa.set(1,0),rh.set(1,1);let a=e.ray.intersectTriangle(To,fr,Ao,!1,ur);if(a===null&&(Ro(fr.set(-.5,.5,0),xs,o,gs,s,r),Xa.set(0,1),a=e.ray.intersectTriangle(To,Ao,fr,!1,ur),a===null))return;const c=e.ray.origin.distanceTo(ur);c<e.near||c>e.far||t.push({distance:c,point:ur.clone(),uv:gn.getInterpolation(ur,To,fr,Ao,sh,Xa,rh,new ye),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ro(i,e,t,n,s,r){_s.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(hr.x=r*_s.x-s*_s.y,hr.y=s*_s.x+r*_s.y):hr.copy(_s),i.copy(e),i.x+=hr.x,i.y+=hr.y,i.applyMatrix4(ed)}const oh=new I,ah=new st,ch=new st,Ry=new I,lh=new Ke,Co=new I,qa=new On,uh=new Ke,Ya=new Qr;class Cy extends qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ou,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Fn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Co),this.boundingBox.expandByPoint(Co)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new On),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Co),this.boundingSphere.expandByPoint(Co)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qa.copy(this.boundingSphere),qa.applyMatrix4(s),e.ray.intersectsSphere(qa)!==!1&&(uh.copy(s).invert(),Ya.copy(e.ray).applyMatrix4(uh),!(this.boundingBox!==null&&Ya.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ya)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new st,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ou?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Bm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;ah.fromBufferAttribute(s.attributes.skinIndex,e),ch.fromBufferAttribute(s.attributes.skinWeight,e),oh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=ch.getComponent(r);if(o!==0){const a=ah.getComponent(r);lh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ry.copy(oh).applyMatrix4(lh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class td extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class nd extends Pt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Zt,u=Zt,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hh=new Ke,Py=new Ke;class Nl{constructor(e=[],t=[]){this.uuid=_n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Py;hh.multiplyMatrices(a,t[r]),hh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Nl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new nd(t,e,e,xn,Tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new td),this.bones.push(o),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Qc extends Ye{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ys=new Ke,fh=new Ke,Po=[],dh=new Fn,Iy=new Ke,dr=new qe,pr=new On;class Pr extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Iy)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),dh.copy(e.boundingBox).applyMatrix4(ys),this.boundingBox.union(dh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new On),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),pr.copy(e.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(dr.geometry=this.geometry,dr.material=this.material,dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pr.copy(this.boundingSphere),pr.applyMatrix4(n),e.ray.intersectsSphere(pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ys),fh.multiplyMatrices(n,ys),dr.matrixWorld=fh,dr.raycast(e,Po);for(let o=0,a=Po.length;o<a;o++){const c=Po[o];c.instanceId=r,c.object=this,t.push(c)}Po.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new nd(new Float32Array(s*this.count),s,this.count,wl,Tn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class id extends An{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const na=new I,ia=new I,ph=new Ke,mr=new Qr,Io=new On,Ka=new I,mh=new I;class Ul extends mt{constructor(e=new lt,t=new id){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)na.fromBufferAttribute(t,s-1),ia.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=na.distanceTo(ia);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;ph.copy(s).invert(),mr.copy(e.ray).applyMatrix4(ph);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){const p=u.getX(x),v=u.getX(x+1),M=Lo(this,e,mr,c,p,v);M&&t.push(M)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(d),p=Lo(this,e,mr,c,x,m);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){const p=Lo(this,e,mr,c,x,x+1);p&&t.push(p)}if(this.isLineLoop){const x=Lo(this,e,mr,c,g-1,d);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Lo(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(na.fromBufferAttribute(o,s),ia.fromBufferAttribute(o,r),t.distanceSqToSegment(na,ia,Ka,mh)>n)return;Ka.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ka);if(!(c<e.near||c>e.far))return{distance:c,point:mh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const gh=new I,xh=new I;class Ly extends Ul{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)gh.fromBufferAttribute(t,s),xh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+gh.distanceTo(xh);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Dy extends Ul{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Fl extends An{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _h=new Ke,el=new Qr,Do=new On,No=new I;class sd extends mt{constructor(e=new lt,t=new Fl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(s),Do.radius+=r,e.ray.intersectsSphere(Do)===!1)return;_h.copy(s).invert(),el.copy(e.ray).applyMatrix4(_h);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,x=d;g<x;g++){const m=l.getX(g);No.fromBufferAttribute(h,m),vh(No,m,c,s,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,x=d;g<x;g++)No.fromBufferAttribute(h,g),vh(No,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function vh(i,e,t,n,s,r,o){const a=el.distanceSqToPoint(i);if(a<t){const c=new I;el.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Za extends Pt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ye:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new I,s=[],r=[],o=[],a=new I,c=new Ke;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ft(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Ft(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ol extends zn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ye){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ny extends Ol{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function zl(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Uo=new I,$a=new zl,Ja=new zl,ja=new zl;class Uy extends zn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Uo.subVectors(s[0],s[1]).add(s[0]),l=Uo);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Uo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Uo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),x=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),$a.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,x,m),Ja.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,x,m),ja.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&($a.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Ja.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),ja.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set($a.calc(c),Ja.calc(c),ja.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function yh(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Fy(i,e){const t=1-i;return t*t*e}function Oy(i,e){return 2*(1-i)*i*e}function zy(i,e){return i*i*e}function Ir(i,e,t,n){return Fy(i,e)+Oy(i,t)+zy(i,n)}function By(i,e){const t=1-i;return t*t*t*e}function ky(i,e){const t=1-i;return 3*t*t*i*e}function Hy(i,e){return 3*(1-i)*i*i*e}function Gy(i,e){return i*i*i*e}function Lr(i,e,t,n,s){return By(i,e)+ky(i,t)+Hy(i,n)+Gy(i,s)}class rd extends zn{constructor(e=new ye,t=new ye,n=new ye,s=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ye){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,s.x,r.x,o.x,a.x),Lr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vy extends zn{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,s.x,r.x,o.x,a.x),Lr(e,s.y,r.y,o.y,a.y),Lr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class od extends zn{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wy extends zn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ad extends zn{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xy extends zn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y),Ir(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cd extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(yh(a,c.x,l.x,u.x,h.x),yh(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ye().fromArray(s))}return this}}var tl=Object.freeze({__proto__:null,ArcCurve:Ny,CatmullRomCurve3:Uy,CubicBezierCurve:rd,CubicBezierCurve3:Vy,EllipseCurve:Ol,LineCurve:od,LineCurve3:Wy,QuadraticBezierCurve:ad,QuadraticBezierCurve3:Xy,SplineCurve:cd});class qy extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new tl[s.type]().fromJSON(s))}return this}}class Mh extends qy{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new od(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new ad(this.currentPoint.clone(),new ye(e,t),new ye(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new rd(this.currentPoint.clone(),new ye(e,t),new ye(n,s),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new cd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new Ol(e,t,n,s,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Xi extends lt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new I,u=new ye;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class cn extends lt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const x=[],m=n/2;let p=0;v(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new _t(h,3)),this.setAttribute("normal",new _t(f,3)),this.setAttribute("uv",new _t(d,2));function v(){const _=new I,P=new I;let R=0;const A=(t-e)/n;for(let T=0;T<=r;T++){const y=[],b=T/r,C=b*(t-e)+e;for(let H=0;H<=s;H++){const B=H/s,W=B*c+a,j=Math.sin(W),V=Math.cos(W);P.x=C*j,P.y=-b*n+m,P.z=C*V,h.push(P.x,P.y,P.z),_.set(j,A,V).normalize(),f.push(_.x,_.y,_.z),d.push(B,1-b),y.push(g++)}x.push(y)}for(let T=0;T<s;T++)for(let y=0;y<r;y++){const b=x[y][T],C=x[y+1][T],H=x[y+1][T+1],B=x[y][T+1];(e>0||y!==0)&&(u.push(b,C,B),R+=3),(t>0||y!==r-1)&&(u.push(C,H,B),R+=3)}l.addGroup(p,R,0),p+=R}function M(_){const P=g,R=new ye,A=new I;let T=0;const y=_===!0?e:t,b=_===!0?1:-1;for(let H=1;H<=s;H++)h.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),g++;const C=g;for(let H=0;H<=s;H++){const W=H/s*c+a,j=Math.cos(W),V=Math.sin(W);A.x=y*V,A.y=m*b,A.z=y*j,h.push(A.x,A.y,A.z),f.push(0,b,0),R.x=j*.5+.5,R.y=V*.5*b+.5,d.push(R.x,R.y),g++}for(let H=0;H<s;H++){const B=P+H,W=C+H;_===!0?u.push(W,W+1,B):u.push(W+1,W,B),T+=3}l.addGroup(p,T,_===!0?1:2),p+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ls extends cn{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ls(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bl extends lt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new _t(r,3)),this.setAttribute("normal",new _t(r.slice(),3)),this.setAttribute("uv",new _t(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const M=new I,_=new I,P=new I;for(let R=0;R<t.length;R+=3)d(t[R+0],M),d(t[R+1],_),d(t[R+2],P),c(M,_,P,v)}function c(v,M,_,P){const R=P+1,A=[];for(let T=0;T<=R;T++){A[T]=[];const y=v.clone().lerp(_,T/R),b=M.clone().lerp(_,T/R),C=R-T;for(let H=0;H<=C;H++)H===0&&T===R?A[T][H]=y:A[T][H]=y.clone().lerp(b,H/C)}for(let T=0;T<R;T++)for(let y=0;y<2*(R-T)-1;y++){const b=Math.floor(y/2);y%2===0?(f(A[T][b+1]),f(A[T+1][b]),f(A[T][b])):(f(A[T][b+1]),f(A[T+1][b+1]),f(A[T+1][b]))}}function l(v){const M=new I;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function u(){const v=new I;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];const _=m(v)/2/Math.PI+.5,P=p(v)/Math.PI+.5;o.push(_,1-P)}g(),h()}function h(){for(let v=0;v<o.length;v+=6){const M=o[v+0],_=o[v+2],P=o[v+4],R=Math.max(M,_,P),A=Math.min(M,_,P);R>.9&&A<.1&&(M<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),P<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,M){const _=v*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function g(){const v=new I,M=new I,_=new I,P=new I,R=new ye,A=new ye,T=new ye;for(let y=0,b=0;y<r.length;y+=9,b+=6){v.set(r[y+0],r[y+1],r[y+2]),M.set(r[y+3],r[y+4],r[y+5]),_.set(r[y+6],r[y+7],r[y+8]),R.set(o[b+0],o[b+1]),A.set(o[b+2],o[b+3]),T.set(o[b+4],o[b+5]),P.copy(v).add(M).add(_).divideScalar(3);const C=m(P);x(R,b+0,v,C),x(A,b+2,M,C),x(T,b+4,_,C)}}function x(v,M,_,P){P<0&&v.x===1&&(o[M]=v.x-1),_.x===0&&_.z===0&&(o[M]=P/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.vertices,e.indices,e.radius,e.details)}}class kl extends Bl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kl(e.radius,e.detail)}}class ld extends Mh{constructor(e){super(e),this.uuid=_n(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Mh().fromJSON(s))}return this}}const Yy={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=ud(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,h,f,d;if(n&&(r=jy(i,e,r,t)),i.length>80*t){a=l=i[0],c=u=i[1];for(let g=t;g<s;g+=t)h=i[g],f=i[g+1],h<a&&(a=h),f<c&&(c=f),h>l&&(l=h),f>u&&(u=f);d=Math.max(l-a,u-c),d=d!==0?32767/d:0}return Gr(r,o,t,a,c,d,0),o}};function ud(i,e,t,n,s){let r,o;if(s===lM(i,e,t,n)>0)for(r=e;r<t;r+=n)o=Sh(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=Sh(r,i[r],i[r+1],o);return o&&da(o,o.next)&&(Wr(o),o=o.next),o}function Zi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(da(t,t.next)||bt(t.prev,t,t.next)===0)){if(Wr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&iM(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Zy(i,n,s,r):Ky(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Wr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=$y(Zi(i),e,t),Gr(i,e,t,n,s,r,2)):o===2&&Jy(i,e,t,n,s,r):Gr(Zi(i),e,t,n,s,r,1);break}}}function Ky(i){const e=i.prev,t=i,n=i.next;if(bt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,h=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&As(s,a,r,c,o,l,g.x,g.y)&&bt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Zy(i,e,t,n){const s=i.prev,r=i,o=i.next;if(bt(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=u<h?u<f?u:f:h<f?h:f,x=a>c?a>l?a:l:c>l?c:l,m=u>h?u>f?u:f:h>f?h:f,p=nl(d,g,e,t,n),v=nl(x,m,e,t,n);let M=i.prevZ,_=i.nextZ;for(;M&&M.z>=p&&_&&_.z<=v;){if(M.x>=d&&M.x<=x&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&As(a,u,c,h,l,f,M.x,M.y)&&bt(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&As(a,u,c,h,l,f,_.x,_.y)&&bt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=x&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&As(a,u,c,h,l,f,M.x,M.y)&&bt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&As(a,u,c,h,l,f,_.x,_.y)&&bt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function $y(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!da(s,r)&&hd(s,n,n.next,r)&&Vr(s,r)&&Vr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Wr(n),Wr(n.next),n=i=r),n=n.next}while(n!==i);return Zi(n)}function Jy(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&oM(o,a)){let c=fd(o,a);o=Zi(o,o.next),c=Zi(c,c.next),Gr(o,e,t,n,s,r,0),Gr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function jy(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=ud(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(rM(l));for(s.sort(Qy),r=0;r<s.length;r++)t=eM(s[r],t);return t}function Qy(i,e){return i.x-e.x}function eM(i,e){const t=tM(i,e);if(!t)return e;const n=fd(t,i);return Zi(n,n.next),Zi(t,t.next)}function tM(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>n&&(n=f,s=t.x<t.next.x?t:t.next,f===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let u=1/0,h;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&As(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Vr(t,i)&&(h<u||h===u&&(t.x>s.x||t.x===s.x&&nM(s,t)))&&(s=t,u=h)),t=t.next;while(t!==a);return s}function nM(i,e){return bt(i.prev,i,e.prev)<0&&bt(e.next,i,i.next)<0}function iM(i,e,t,n){let s=i;do s.z===0&&(s.z=nl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,sM(s)}function sM(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function nl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function rM(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function As(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function oM(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!aM(i,e)&&(Vr(i,e)&&Vr(e,i)&&cM(i,e)&&(bt(i.prev,i,e.prev)||bt(i,e.prev,e))||da(i,e)&&bt(i.prev,i,i.next)>0&&bt(e.prev,e,e.next)>0)}function bt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function da(i,e){return i.x===e.x&&i.y===e.y}function hd(i,e,t,n){const s=Oo(bt(i,e,t)),r=Oo(bt(i,e,n)),o=Oo(bt(t,n,i)),a=Oo(bt(t,n,e));return!!(s!==r&&o!==a||s===0&&Fo(i,t,e)||r===0&&Fo(i,n,e)||o===0&&Fo(t,i,n)||a===0&&Fo(t,e,n))}function Fo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Oo(i){return i>0?1:i<0?-1:0}function aM(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&hd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Vr(i,e){return bt(i.prev,i,i.next)<0?bt(i,e,i.next)>=0&&bt(i,i.prev,e)>=0:bt(i,e,i.prev)<0||bt(i,i.next,e)<0}function cM(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function fd(i,e){const t=new il(i.i,i.x,i.y),n=new il(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Sh(i,e,t,n){const s=new il(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Wr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function il(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function lM(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Dr{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Dr.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];bh(e),wh(n,e);let o=e.length;t.forEach(bh);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,wh(n,t[c]);const a=Yy.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function bh(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function wh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Hl extends lt{constructor(e=new ld([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new _t(s,3)),this.setAttribute("uv",new _t(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:uM;let M,_=!1,P,R,A,T;p&&(M=p.getSpacedPoints(u),_=!0,f=!1,P=p.computeFrenetFrames(u,!1),R=new I,A=new I,T=new I),f||(m=0,d=0,g=0,x=0);const y=a.extractPoints(l);let b=y.shape;const C=y.holes;if(!Dr.isClockWise(b)){b=b.reverse();for(let ce=0,pe=C.length;ce<pe;ce++){const L=C[ce];Dr.isClockWise(L)&&(C[ce]=L.reverse())}}const B=Dr.triangulateShape(b,C),W=b;for(let ce=0,pe=C.length;ce<pe;ce++){const L=C[ce];b=b.concat(L)}function j(ce,pe,L){return pe||console.error("THREE.ExtrudeGeometry: vec does not exist"),ce.clone().addScaledVector(pe,L)}const V=b.length,ie=B.length;function N(ce,pe,L){let De,fe,Pe;const we=ce.x-pe.x,We=ce.y-pe.y,Ae=L.x-ce.x,w=L.y-ce.y,S=we*we+We*We,O=we*w-We*Ae;if(Math.abs(O)>Number.EPSILON){const G=Math.sqrt(S),ne=Math.sqrt(Ae*Ae+w*w),Z=pe.x-We/G,be=pe.y+we/G,Me=L.x-w/ne,Ee=L.y+Ae/ne,X=((Me-Z)*w-(Ee-be)*Ae)/(we*w-We*Ae);De=Z+we*X-ce.x,fe=be+We*X-ce.y;const U=De*De+fe*fe;if(U<=2)return new ye(De,fe);Pe=Math.sqrt(U/2)}else{let G=!1;we>Number.EPSILON?Ae>Number.EPSILON&&(G=!0):we<-Number.EPSILON?Ae<-Number.EPSILON&&(G=!0):Math.sign(We)===Math.sign(w)&&(G=!0),G?(De=-We,fe=we,Pe=Math.sqrt(S)):(De=we,fe=We,Pe=Math.sqrt(S/2))}return new ye(De/Pe,fe/Pe)}const se=[];for(let ce=0,pe=W.length,L=pe-1,De=ce+1;ce<pe;ce++,L++,De++)L===pe&&(L=0),De===pe&&(De=0),se[ce]=N(W[ce],W[L],W[De]);const re=[];let K,Re=se.concat();for(let ce=0,pe=C.length;ce<pe;ce++){const L=C[ce];K=[];for(let De=0,fe=L.length,Pe=fe-1,we=De+1;De<fe;De++,Pe++,we++)Pe===fe&&(Pe=0),we===fe&&(we=0),K[De]=N(L[De],L[Pe],L[we]);re.push(K),Re=Re.concat(K)}for(let ce=0;ce<m;ce++){const pe=ce/m,L=d*Math.cos(pe*Math.PI/2),De=g*Math.sin(pe*Math.PI/2)+x;for(let fe=0,Pe=W.length;fe<Pe;fe++){const we=j(W[fe],se[fe],De);ve(we.x,we.y,-L)}for(let fe=0,Pe=C.length;fe<Pe;fe++){const we=C[fe];K=re[fe];for(let We=0,Ae=we.length;We<Ae;We++){const w=j(we[We],K[We],De);ve(w.x,w.y,-L)}}}const ue=g+x;for(let ce=0;ce<V;ce++){const pe=f?j(b[ce],Re[ce],ue):b[ce];_?(A.copy(P.normals[0]).multiplyScalar(pe.x),R.copy(P.binormals[0]).multiplyScalar(pe.y),T.copy(M[0]).add(A).add(R),ve(T.x,T.y,T.z)):ve(pe.x,pe.y,0)}for(let ce=1;ce<=u;ce++)for(let pe=0;pe<V;pe++){const L=f?j(b[pe],Re[pe],ue):b[pe];_?(A.copy(P.normals[ce]).multiplyScalar(L.x),R.copy(P.binormals[ce]).multiplyScalar(L.y),T.copy(M[ce]).add(A).add(R),ve(T.x,T.y,T.z)):ve(L.x,L.y,h/u*ce)}for(let ce=m-1;ce>=0;ce--){const pe=ce/m,L=d*Math.cos(pe*Math.PI/2),De=g*Math.sin(pe*Math.PI/2)+x;for(let fe=0,Pe=W.length;fe<Pe;fe++){const we=j(W[fe],se[fe],De);ve(we.x,we.y,h+L)}for(let fe=0,Pe=C.length;fe<Pe;fe++){const we=C[fe];K=re[fe];for(let We=0,Ae=we.length;We<Ae;We++){const w=j(we[We],K[We],De);_?ve(w.x,w.y+M[u-1].y,M[u-1].x+L):ve(w.x,w.y,h+L)}}}Q(),de();function Q(){const ce=s.length/3;if(f){let pe=0,L=V*pe;for(let De=0;De<ie;De++){const fe=B[De];Le(fe[2]+L,fe[1]+L,fe[0]+L)}pe=u+m*2,L=V*pe;for(let De=0;De<ie;De++){const fe=B[De];Le(fe[0]+L,fe[1]+L,fe[2]+L)}}else{for(let pe=0;pe<ie;pe++){const L=B[pe];Le(L[2],L[1],L[0])}for(let pe=0;pe<ie;pe++){const L=B[pe];Le(L[0]+V*u,L[1]+V*u,L[2]+V*u)}}n.addGroup(ce,s.length/3-ce,0)}function de(){const ce=s.length/3;let pe=0;Te(W,pe),pe+=W.length;for(let L=0,De=C.length;L<De;L++){const fe=C[L];Te(fe,pe),pe+=fe.length}n.addGroup(ce,s.length/3-ce,1)}function Te(ce,pe){let L=ce.length;for(;--L>=0;){const De=L;let fe=L-1;fe<0&&(fe=ce.length-1);for(let Pe=0,we=u+m*2;Pe<we;Pe++){const We=V*Pe,Ae=V*(Pe+1),w=pe+De+We,S=pe+fe+We,O=pe+fe+Ae,G=pe+De+Ae;Xe(w,S,O,G)}}}function ve(ce,pe,L){c.push(ce),c.push(pe),c.push(L)}function Le(ce,pe,L){He(ce),He(pe),He(L);const De=s.length/3,fe=v.generateTopUV(n,s,De-3,De-2,De-1);$e(fe[0]),$e(fe[1]),$e(fe[2])}function Xe(ce,pe,L,De){He(ce),He(pe),He(De),He(pe),He(L),He(De);const fe=s.length/3,Pe=v.generateSideWallUV(n,s,fe-6,fe-3,fe-2,fe-1);$e(Pe[0]),$e(Pe[1]),$e(Pe[3]),$e(Pe[1]),$e(Pe[2]),$e(Pe[3])}function He(ce){s.push(c[ce*3+0]),s.push(c[ce*3+1]),s.push(c[ce*3+2])}function $e(ce){r.push(ce.x),r.push(ce.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return hM(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new tl[s.type]().fromJSON(s)),new Hl(n,e.options)}}const uM={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new ye(r,o),new ye(a,c),new ye(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[s*3],d=e[s*3+1],g=e[s*3+2],x=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new ye(o,1-c),new ye(l,1-h),new ye(f,1-g),new ye(x,1-p)]:[new ye(a,1-c),new ye(u,1-h),new ye(d,1-g),new ye(m,1-p)]}};function hM(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class eo extends lt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new I,f=new I,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const v=[],M=p/n;let _=0;p===0&&o===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let P=0;P<=t;P++){const R=P/t;h.x=-e*Math.cos(s+R*r)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(s+R*r)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(R+_,1-M),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const M=u[p][v+1],_=u[p][v],P=u[p+1][v],R=u[p+1][v+1];(p!==0||o>0)&&d.push(M,_,R),(p!==n-1||c<Math.PI)&&d.push(_,P,R)}this.setIndex(d),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ai extends lt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new I,h=new I,f=new I;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const x=g/s*r,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const x=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,v=(s+1)*d+g;o.push(x,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Bt extends An{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uf,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Bn extends Bt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function zo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function fM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function dM(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Eh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function dd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class to{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class pM extends to{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:au,endingEnd:au}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case cu:r=e,a=2*t-n;break;case lu:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case cu:o=e,c=2*n-t;break;case lu:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,v=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,M=(-1-d)*m+(1.5+d)*x+.5*g,_=d*m-d*x;for(let P=0;P!==a;++P)r[P]=p*o[u+P]+v*o[l+P]+M*o[c+P]+_*o[h+P];return r}}class mM extends to{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}}class gM extends to{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class kn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zo(t,this.TimeBufferType),this.values=zo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zo(e.times,Array),values:zo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new gM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new mM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new pM(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case zr:t=this.InterpolantFactoryMethodDiscrete;break;case Br:t=this.InterpolantFactoryMethodLinear;break;case xa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zr;case this.InterpolantFactoryMethodLinear:return Br;case this.InterpolantFactoryMethodSmooth:return xa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&fM(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const x=t[h+g];if(x!==t[f+g]||x!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=Br;class er extends kn{constructor(e,t,n){super(e,t,n)}}er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=zr;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;class pd extends kn{}pd.prototype.ValueTypeName="color";class Ws extends kn{}Ws.prototype.ValueTypeName="number";class xM extends to{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let u=l+a;l!==u;l+=4)li.slerpFlat(r,0,o,l-a,o,l,c);return r}}class Xs extends kn{InterpolantFactoryMethodLinear(e){return new xM(this.times,this.values,this.getValueSize(),e)}}Xs.prototype.ValueTypeName="quaternion";Xs.prototype.InterpolantFactoryMethodSmooth=void 0;class tr extends kn{constructor(e,t,n){super(e,t,n)}}tr.prototype.ValueTypeName="string";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=zr;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends kn{}qs.prototype.ValueTypeName="vector";class _M{constructor(e="",t=-1,n=[],s=km){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=_n(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(yM(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(kn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=dM(c);c=Eh(c,1,u),l=Eh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Ws(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=s[h];f||(s[h]=f=[]),f.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,x){if(d.length!==0){const m=[],p=[];dd(d,m,p,g),m.length!==0&&x.push(new h(f,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)d[f[g].morphTargets[x]]=-1;for(const x in d){const m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){const M=f[g];m.push(M.time),p.push(M.morphTarget===x?1:0)}s.push(new Ws(".morphTargetInfluence["+x+"]",m,p))}c=d.length*o}else{const d=".bones["+t[h].name+"]";n(qs,d+".position",f,"pos",s),n(Xs,d+".quaternion",f,"rot",s),n(qs,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function vM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ws;case"vector":case"vector2":case"vector3":case"vector4":return qs;case"color":return pd;case"quaternion":return Xs;case"bool":case"boolean":return er;case"string":return tr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function yM(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=vM(i.type);if(i.times===void 0){const t=[],n=[];dd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ei={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class MM{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const SM=new MM;class nr{constructor(e){this.manager=e!==void 0?e:SM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}nr.DEFAULT_MATERIAL_NAME="__DEFAULT";const $n={};class bM extends Error{constructor(e,t){super(e),this.response=t}}class md extends nr{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ei.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if($n[e]!==void 0){$n[e].push({onLoad:t,onProgress:n,onError:s});return}$n[e]=[],$n[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=$n[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let x=0;const m=new ReadableStream({start(p){v();function v(){h.read().then(({done:M,value:_})=>{if(M)p.close();else{x+=_.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let R=0,A=u.length;R<A;R++){const T=u[R];T.onProgress&&T.onProgress(P)}p.enqueue(_),v()}},M=>{p.error(M)})}}});return new Response(m)}else throw new bM(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{Ei.add(e,l);const u=$n[e];delete $n[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=$n[e];if(u===void 0)throw this.manager.itemError(e),l;delete $n[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class wM extends nr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ei.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=kr("img");function c(){u(),Ei.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class EM extends nr{constructor(e){super(e)}load(e,t,n,s){const r=new Pt,o=new wM(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class no extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class TM extends no{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Qa=new Ke,Th=new I,Ah=new I;class Gl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pl,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Th.setFromMatrixPosition(e.matrixWorld),t.position.copy(Th),Ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ah),t.updateMatrixWorld(),Qa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class AM extends Gl{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Gs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class RM extends no{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new AM}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Rh=new Ke,gr=new I,ec=new I;class CM extends Gl{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),gr.setFromMatrixPosition(e.matrixWorld),n.position.copy(gr),ec.copy(n.position),ec.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ec),n.updateMatrixWorld(),s.makeTranslation(-gr.x,-gr.y,-gr.z),Rh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rh)}}class PM extends no{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new CM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class IM extends Gl{constructor(){super(new Il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gd extends no{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new IM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class LM extends no{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Nr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class DM extends nr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ei.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ei.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ei.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ei.add(e,c),r.manager.itemStart(e)}}const Vl="\\[\\]\\.:\\/",NM=new RegExp("["+Vl+"]","g"),Wl="[^"+Vl+"]",UM="[^"+Vl.replace("\\.","")+"]",FM=/((?:WC+[\/:])*)/.source.replace("WC",Wl),OM=/(WCOD+)?/.source.replace("WCOD",UM),zM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),BM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),kM=new RegExp("^"+FM+OM+zM+BM+"$"),HM=["material","materials","bones","map"];class GM{constructor(e,t,n){const s=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ht{constructor(e,t,n){this.path=t,this.parsedPath=n||ht.parseTrackName(t),this.node=ht.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ht.Composite(e,t,n):new ht(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(NM,"")}static parseTrackName(e){const t=kM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);HM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ht.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ht.Composite=GM;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Ch=new Ke;class VM{constructor(e,t,n=0,s=1/0){this.ray=new Qr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Cl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ch),this}intersectObject(e,t=!0,n=[]){return sl(e,this,n,t),n.sort(Ph),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)sl(e[s],this,n,t);return n.sort(Ph),n}}function Ph(i,e){return i.distance-e.distance}function sl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)sl(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yl);function WM(i,e,t){return{x:(i-t.left)/t.width*2-1,y:-((e-t.top)/t.height)*2+1}}const XM=1.42,xd=44,Xl=32,xr=92,rl={hq:1.05,barracks:1.55},_d=1.05;function vd(i,e,t){return t!=="siege"?i:i+(e==="player"?.85:-.85)}const qM={hq:2.05,barracks:.78},YM={hq:2.55,barracks:1.2},Ms=new I,ei={x:0,y:0};function sa(i,e,t,n,s,r,o){return Ms.set(i,e,t),Ms.project(n),Ms.z<-1||Ms.z>1?!1:(o.x=(Ms.x*.5+.5)*s,o.y=(-Ms.y*.5+.5)*r,!0)}function KM(i,e){return e<=xd&&e<i}const pn=[];function ZM(i){let e=pn[i];return e||(e={px:0,py:0,squad:0,ok:0},pn[i]=e),e}function yd(i,e,t,n,s,r){const o=e|0;for(let l=0;l<o;l++){const u=i[l],h=ZM(l);h.squad=u.squad?1:0,h.ok=0,sa(u.x,u.y,u.z,t,n,s,ei)&&(h.ok=1,h.px=ei.x,h.py=ei.y-Xl,h.ox=h.px,h.oy=h.py)}const a=36,c=l=>{n>a*2&&(l.px=Math.min(n-a,Math.max(a,l.px))),s>a*2&&(l.py=Math.min(s-a,Math.max(a,l.py)))};for(let l=0;l<8;l++)for(let u=0;u<o;u++){const h=pn[u];if(h.ok)for(let f=u+1;f<o;f++){const d=pn[f];if(!d.ok)continue;let g=d.px-h.px,x=d.py-h.py,m=Math.hypot(g,x);if(m>=xr)continue;m<.01&&(g=0,x=1,m=1);const p=(xr-m)/m,v=g*p,M=x*p;if(h.squad!==d.squad){const _=h.squad?h:d,P=h.squad?d:h;if(Math.abs(x)>=Math.abs(g)){const R=_.px-P.px,A=_.py-P.py;let T=Math.abs(R)<1?1:Math.sign(R);const b=Math.sqrt(Math.max(0,xr*xr-A*A))-Math.abs(R);if(b>0){const C=_.px+T*b;n>a*2&&(C<a||C>n-a)&&(T=-T),_.px+=T*b}}else h.squad?(h.px-=v,h.py-=M):(d.px+=v,d.py+=M);c(_)}else h.px-=v*.5,h.py-=M*.5,d.px+=v*.5,d.py+=M*.5,c(h),c(d)}}for(let l=0;l<o;l++){const u=pn[l];if(!u.ok||!u.squad)continue;let h=1/0;for(let x=0;x<o;x++)l===x||!pn[x].ok||(h=Math.min(h,Math.hypot(u.px-pn[x].px,u.py-pn[x].py)));if(h>=xr-1)continue;let f=u.px,d=u.py,g=h;for(let x=1;x<=5;x++){const m=24*x;for(let p=0;p<12;p++){const v=p/12*Math.PI*2;let M=u.ox+Math.cos(v)*m,_=u.oy+Math.sin(v)*m;n>a*2&&(M=Math.min(n-a,Math.max(a,M))),s>a*2&&(_=Math.min(s-a,Math.max(a,_)));let P=1/0;for(let R=0;R<o;R++)l===R||!pn[R].ok||(P=Math.min(P,Math.hypot(M-pn[R].px,_-pn[R].py)));P>g&&(g=P,f=M,d=_)}}u.px=f,u.py=d}for(let l=0;l<o;l++){const u=pn[l],h=r[l];h.px=u.px,h.py=u.py,h.ok=u.ok}return o}const ol=[],Ur=[];function $M(i){let e=ol[i];return e||(e={x:0,y:0,z:0,squad:0},ol[i]=e),e}function JM(i){let e=Ur[i];return e||(e={px:0,py:0,ok:0},Ur[i]=e),e}function jM(i,e,t,n,s,r,o){let a=null,c=1/0,l=null,u=XM,h=null,f=1/0;const d=t>=1&&n>=1&&e;if(d){for(let g=0;g<i.length;g++){const x=i[g],m=x.kind==="squad",p=x.kind==="hq"?"hq":"barracks",v=$M(g);v.x=x.x,v.y=m?_d:rl[p],v.z=x.z,v.squad=m?1:0,JM(g)}yd(ol,i.length,e,t,n,Ur)}for(let g=0;g<i.length;g++){const x=i[g],m=x.kind==="squad",p=x.kind==="hq"?"hq":"barracks";let v=1/0,M=1/0;if(d&&Ur[g].ok){const _=Ur[g],P=Math.hypot(s-_.px,r-_.py);if(M=P,P<v&&(v=P),!m){const R=Math.hypot(s-_.px,r-(_.py+Xl));R<v&&(v=R)}if(!m&&sa(x.x,qM[p],x.z,e,t,n,ei)){const R=Math.hypot(s-ei.x,r-ei.y);R<v&&(v=R)}if(!m&&sa(x.x,YM[p],x.z,e,t,n,ei)){const R=Math.hypot(s-ei.x,r-ei.y);R<v&&(v=R)}KM(c,v)&&(c=v,a=x),m&&M<=xd&&M<f&&(h=x,f=M)}if(o){const _=Math.hypot(x.x-o.x,x.z-o.z);_<u&&(u=_,l=x)}}return a&&a.kind!=="squad"&&h&&f<c&&(a=h),a||l}const QM='<svg viewBox="0 0 16 12" aria-hidden="true"><path fill="currentColor" d="M0 5.1h2.4l.5 2.6H1zM2.2 4.2h6.4v1.8H2.2zM8.4 3.3h6.4v1.5H8.4zM6 6h1.3v3.4H6z"/></svg>',eS='<svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M6 .4l4.6 2.6v1.6H1.4V3zM2.2 5.6h7.6V11H2.2z"/></svg>';function tS(i){const e=new Map,t={x:0,y:0},n=new Set,s=[],r=["","快","固","快固"],o=[],a=[],c=[];let l=Ns;function u(m){let p=o[m];return p||(p={x:0,y:0,z:0,squad:0},o[m]=p,a[m]={px:0,py:0,ok:0}),p}function h(m){let p=e.get(m);return p||(p=document.createElement("div"),p.className="badge",p.innerHTML='<span class="mark" aria-hidden="true"></span><span class="tag"></span><b class="num"></b><i class="sub"></i>',i.appendChild(p),e.set(m,p)),p}function f(m,p){const v=m.querySelector(".mark");!v||v.dataset.kind===p||(v.dataset.kind=p,v.innerHTML=p==="squad"?QM:eS)}function d(m,p,v){const M=m.querySelector(p);M.textContent!==v&&(M.textContent=v)}function g(m,p){if(!p||!p.ok){m.hidden=!0;return}m.hidden=!1;const v=p.py+Xl;m.style.transform=`translate(${p.px}px, ${v}px) translate(-50%, -139%)`}function x(m,p,v){const M=m.squads;for(let _=0;_<M.length;_++){const P=M[_];if(P.mode==="siege"&&P.targetId===p&&P.owner!==v&&P.count>0)return!0}return!1}return{setMap(m){l=m&&m.nodes||Ns},update(m,p,v){const M=v.clientWidth||1,_=v.clientHeight||1,P=m&&m.nodes||l;n.clear();let R=0;for(let A=0;A<m.buildings.length;A++){const T=m.buildings[A];n.add(T.id);const y=h(T.id);y.classList.toggle("player",T.owner==="player"),y.classList.toggle("enemy",T.owner==="enemy"),y.classList.toggle("squad",!1),y.classList.toggle("hq",T.kind==="hq"),f(y,"camp");const b=lm(T);if(y.classList.toggle("can-up",b),b){const N=Us(T,"haste"),se=Us(T,"bulwark"),re=N.ok?N:se;y.dataset.cost=re&&re.cost?` ${re.cost*gf}`:""}else y.dataset.cost&&(y.dataset.cost="");const C=T.kind==="hq"?"司令部":"兵營";d(y,".tag",C),d(y,".num",String(jo(T.count)));const H=T.upgrades,B=(H&&H.haste>0?1:0)+(H&&H.bulwark>0?2:0),W=r[B];let j="";T.capture>.02?j="佔領中":T.kind==="hq"&&(T.count<=0||x(m,T.id,T.owner))?j="危":W?j=W:T.count>=T.cap&&(j="滿"),d(y,".sub",j),y.classList.toggle("is-danger",j==="危");const V=P[T.node];if(!V){y.hidden=!0;continue}const ie=u(R);ie.x=V.x,ie.y=rl[T.kind]||rl.barracks,ie.z=V.z,ie.squad=0,c[R]=y,R+=1}for(let A=0;A<m.squads.length;A++){const T=m.squads[A];if(T.count<=0)continue;n.add(T.id);const y=h(T.id);y.classList.add("squad"),f(y,"squad"),y.classList.remove("hq"),y.classList.toggle("player",T.owner==="player"),y.classList.toggle("enemy",T.owner==="enemy"),y.classList.toggle("can-up",!1),y.classList.toggle("is-danger",!1),d(y,".tag",T.mode==="siege"?"攻城":"行軍"),d(y,".num",String(jo(T.count))),d(y,".sub",T.mode==="fight"?"交戰":"");const b=u(R);b.x=vd(T.x,T.owner,T.mode),b.y=_d,b.z=T.z,b.squad=1,c[R]=y,R+=1}yd(o,R,p,M,_,a);for(let A=0;A<R;A++)g(c[A],a[A]);s.length=0;for(const A of e.keys())n.has(A)||s.push(A);for(let A=0;A<s.length;A++)e.get(s[A]).remove(),e.delete(s[A])},clientPoint(m,p,v){const M=l[m];if(!M)return null;const _=v.getBoundingClientRect();return sa(M.x,.4,M.z,p,_.width,_.height,t)?{x:_.left+t.x,y:_.top+t.y}:null}}}function $i(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new lt;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(t){let u=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=i[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Ih(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let x=0;x<o[u].length;++x)d.push(o[u][x][f]);const g=Ih(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Ih(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new Ye(o,t,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<t;g++){const x=u.getComponent(f,g);a.setComponent(f+h,g,x)}}else o.set(u.array,c);c+=u.count*t}return s!==void 0&&(a.gpuType=s),a}function Lh(i,e){if(e===Hm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===$c||e===Nf){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===$c)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Xr(i,e){const t=Math.hypot(i,e);if(t<1e-8)return 0;const n=Math.atan2(-i/t,-e/t);return n===0?0:n}function qr(i,e,t,n){const s=Math.cos(t),r=Math.sin(t);return n.x=i*s+e*r,n.z=-i*r+e*s,n}const Fe={sky:8366276,sand:9075292,meadow:7043662,meadowDeep:5925698,road:9272164,roadEdge:4866876,trunk:4864810,leaf:4151866,leafDeep:3097904,rock:7236195,stream:4091791,bridge:7238254,ink:1712672,concrete:8025452,metal:9344660,player:{main:3120731,deep:1796925,flag:4050554,slab:3824703,glow:4050554},enemy:{main:12860466,deep:9315356,flag:14832968,slab:6042930,glow:14832968}};function Nn(i){return i==="player"?Fe.player:Fe.enemy}const _r=480,Md=.48,nS=.52,iS=4090674,sS=8137250,tc={x:0,z:0},Dh=new I,Nh=new I;function rS(i){const e=Math.max(0,Math.floor(i));return e<=8?e:16}function oS(i,e){return e<-5.2?{x:1.15,z:-3.85}:e>-3.6?{x:(i>.4?1:-1)<0?-2.55:1.9,z:-3.55}:{x:i,z:e}}function Fr(i,e,t,n=0){return i==="enemy"?oS(e,t):t<4.2&&t>-.5?{x:.05,z:1.85}:{x:e,z:t}}function aS(i,e,t){const n=Math.max(1,t),s=i==="enemy",r=s||n>22,o=r?s?n>=20?6:Math.min(n,4):n>=24?6:5:Math.min(4,n),a=r?s?.36:.34:.42,c=r?s?.38:.46:.36,l=Math.floor(e/o),u=e%o,h=Math.min(o,n-l*o),f=(u-(h-1)/2)*a,d=s||!r?-l*c:l*c;return{lx:f,lz:d,mass:r}}function Sd(i,e,t,n,s){const r=aS(i,e,t),o=i==="enemy";return r.mass&&(t>22||o&&t>=20)?(s.x=r.lx,s.z=o?-r.lz:r.lz,s):qr(r.lx,r.lz,n,s)}function cS(i,e){const t=Math.max(0,Math.floor(e));return t<=8?t:i==="enemy"?Math.min(32,Math.max(t,Math.round(t*2))):t<16?Math.min(22,Math.round(t*1.4)):Math.min(44,Math.round(t*2.3))}function lS(i,e){const t=Math.max(0,Math.floor(e));return t<=8?t:i==="enemy"?30:t>=16?40:Math.min(22,Math.round(t*1.4))}function Uh(i,e){const t=i.clone(),n=t.getAttribute("color");if(!n)return t;const s=t.getAttribute("position"),r=new ee(e),o=new ee;for(let a=0;a<n.count;a++){if(o.setRGB(n.getX(a),n.getY(a),n.getZ(a)),o.r*.2126+o.g*.7152+o.b*.0722<.25)continue;o.multiply(r);const l=s?s.getY(a):.5;let u=.94+a%5*.02;l<.42?u*=.82:l>.8&&(u*=.88),o.multiplyScalar(u),n.setXYZ(a,o.r,o.g,o.b)}return n.needsUpdate=!0,t}function uS(i){return i>8?4:i>4?3:Math.max(1,i)}const vr={x:0,z:0};function hS(i,e,t,n,s){const r=Math.max(1,rS(s)),o=uS(r),c=(Math.ceil(r/o)-1)*nS,l=Math.abs(n)-.72;let u=Math.max(.28,Math.min(c+.5,Math.max(.28,l))),h=e==="hq"?i==="player"?1.28:1.55:-1.9;const f=i==="player"?Xr(0,-1):Xr(0,1);let d=0;t>.4?d=1:t<-.4?d=-1:d=i==="player"?1:-1,e==="hq"?(u=Math.min(u,.15),Math.abs(t)<=.4&&(d=-d)):Math.abs(n)<2.4&&(u=-.45,h=-1.5),qr(1,0,f,vr);const g=vr.x*d>=0?h:-h;return qr(g,-u,f,vr),{x:t+vr.x,z:n+vr.z,yaw:f}}function sn(i,e){const t=i.getAttribute("position").count,n=new Float32Array(t*3);return n.fill(e),i.setAttribute("color",new Ye(n,3)),i}function Ss(i,e,t,n){return new cn(i,e,t,n)}function fn(i,e,t,n,s,r){return i.translate(-e,-t,-n),s&&i.rotateX(s),r&&i.rotateY(r),i.translate(e,t,n),i}function fS(i=0){const e=sn(Ss(.04,.05,.46,6),.22);e.translate(-.07,.23,.02);const t=sn(Ss(.04,.05,.46,6),.16);t.translate(.07,.23,-.02);const n=sn(Ss(.19,.155,.48,8),.42);n.translate(0,.48,0);const s=sn(new cn(.23,.2,.09,8),.38);s.scale(1.12,1,.78),s.translate(0,.7,0);const r=sn(Ss(.034,.04,.3,6),.9);r.translate(-.25,.58,-.04);const o=sn(Ss(.03,.034,.28,6),.26);o.translate(.25,.56,-.05);const a=sn(Ss(.04,.044,.07,8),.55);a.translate(0,.75,0);const c=sn(new eo(.15,12,6,0,Math.PI*2,0,Math.PI/2),1);c.scale(1,.35,1),c.translate(0,.78,-.01);const l=sn(new ai(.14,.016,5,10),.88);l.rotateX(Math.PI/2),l.translate(0,.785,-.01);const u=sn(new cn(.22,.22,.012,12),.72);u.translate(0,.772,-.02);const h=sn(new Se(.04,.03,.5),.08);h.translate(.34,.5,-.36);const f=sn(new Se(.048,.05,.09),.12);f.translate(.33,.46,-.08);const d=sn(new Se(.12,.14,.07),.2);d.translate(0,.52,.12),i===1?(fn(e,-.07,.46,.02,1.25,.1),fn(t,.07,.46,-.02,-1.05,0),fn(r,-.25,.68,-.04,-.85,.25),fn(o,.25,.66,-.05,.45,-.35),fn(h,.34,.5,-.14,.12,-1.05),fn(n,0,.48,0,.18,.28)):i===2&&(fn(e,-.07,.46,.02,-1,0),fn(t,.07,.46,-.02,1.2,-.12),fn(r,-.25,.68,-.04,.9,-.2),fn(o,.25,.66,-.05,-.35,.4),fn(h,.34,.5,-.14,-.12,1),fn(n,0,.48,0,.22,-.42));const g=$i([e,t,n,s,r,o,a,c,l,u,h,f,d]);return g.computeVertexNormals(),g}function Fh(i,e,t){const n=fS(t||0),s=n.getAttribute("color"),r=new Float32Array(s.count*3),o=new ee(i),a=o.clone().multiplyScalar(.62),c=new ee(5002050),l=new ee(e),u=new ee(3422768),h=new ee(12888194),f=new ee(2896686),d=new ee;for(let g=0;g<s.count;g++){const x=s.getX(g);let m=o;x>=.95?m=c:x>=.85?m=l:x>=.7?m=u:x>=.5?m=h:x<=.14?m=f:(d.copy(a).lerp(o,Math.min(1,(x-.14)/.36)),m=d),r[g*3]=m.r,r[g*3+1]=m.g,r[g*3+2]=m.b}return n.setAttribute("color",new Ye(r,3)),n}let Oh=Ns;const Bo=3;function dS(i){const e=new Bt({color:16777215,vertexColors:!0,roughness:.74,metalness:.04}),t=[],n=[];for(let v=0;v<Bo;v++){const M=new Pr(Fh(3817520,iS,v),e,_r),_=new Pr(Fh(4208688,sS,v),e,_r);M.castShadow=!0,_.castShadow=!0,M.receiveShadow=!1,_.receiveShadow=!1,M.frustumCulled=!1,_.frustumCulled=!1,M.count=0,_.count=0,t.push(M),n.push(_)}const s=new Xi(.42,14);s.rotateX(-Math.PI/2);const r=new Pr(s,new xt({color:1185295,transparent:!0,opacity:.28,depthWrite:!1}),_r);r.castShadow=!1,r.receiveShadow=!1,r.frustumCulled=!1,r.count=0,i.add(...t,...n,r);const o=new mt;let a=0;const c=new Map,l=new Map,u=[0,0,0],h=[0,0,0];let f=null,d=null,g=1;function x(v,M,_){if(Math.hypot(M,_)<.05)return c.get(v)||0;const P=Xr(M,_);return c.set(v,P),P}function m(v,M,_,P,R,A,T,y,b){const C=v==="player"?t:n,H=v==="player"?u:h,B=b||0,W=C[B],j=H[B];if(j>=_r)return;const V=0;o.position.set(M,_,P),o.rotation.set(V*.4,R,V*.25);const ie=A*g;o.scale.set(ie*1.55,ie*1.08,ie*1.28),o.updateMatrix(),W.setMatrixAt(j,o.matrix),a<_r&&(o.position.y=.025,o.rotation.set(0,0,0),o.scale.set(A*g*1.05,1,A*g*.7),o.updateMatrix(),r.setMatrixAt(a,o.matrix),a+=1,o.rotation.set(0,R,0)),H[B]+=1,T&&(d=W,Dh.set(0,0,-1).applyQuaternion(o.quaternion))}function p(v,M,_,P,R,A){if(R<=0)return;const T=v==="enemy";for(let y=0;y<R;y++){const b=A&&y===0;Sd(v,y,R,P,tc);const C=b?1:.96,H=T||b?P:P+(y%5-2)*.035,B=b?0:y%2+1;m(v,M+tc.x,.02,_+tc.z,H,Md*C,b,0,B)}}return{facingDot(){return f},setMap(v){Oh=v.nodes||Ns,v.graph,c.clear(),l.clear()},update(v){for(let T=0;T<Bo;T++)u[T]=0,h[T]=0;a=0,d=null;let M=!1;const _=v&&v.nodes||Oh,P=[];for(let T=0;T<v.buildings.length;T++){const y=v.buildings[T];if(y.count<=0)continue;const b=_[y.node];if(!b)continue;const C=hS(y.owner,y.kind,b.x,b.z,y.count),H=Fr(y.owner,C.x,C.z,y.count);P.push({owner:y.owner,x:H.x,z:H.z,yaw:C.yaw,count:y.count,squad:null})}for(let T=0;T<v.squads.length;T++){const y=v.squads[T];if(y.count<=0)continue;let b=0,C=0;if(y.mode==="march"&&y.seg<y.path.length-1){const W=_[y.path[y.seg+1]];W&&(b=W.x-y.x,C=W.z-y.z)}else if(y.path.length>1){const W=_[y.path[Math.max(0,y.seg-1)]];W&&(b=y.x-W.x,C=y.z-W.z)}const H=x(y.id,b,C),B=Fr(y.owner,y.x,y.z,y.count);P.push({owner:y.owner,x:B.x,z:B.z,yaw:H,count:y.count,squad:y})}const R=[],A=new Map;for(let T=0;T<P.length;T++){const y=P[T],b=`${y.owner}@${y.x.toFixed(2)},${y.z.toFixed(2)}`;let C=A.get(b);C||(C={owner:y.owner,x:y.x,z:y.z,yaw:y.yaw,raw:0,lead:null},A.set(b,C),R.push(C)),C.raw+=y.count,!C.lead&&y.squad&&y.squad.mode==="march"&&(C.lead=y.squad)}for(let T=0;T<R.length;T++){const y=R[T],b=!M&&y.lead;if(p(y.owner,y.x,y.z,y.yaw,lS(y.owner,y.raw),b),!b)continue;M=!0;const C=y.lead,H=l.get(C.id);if(H&&d){const W=C.x-H.x,j=C.z-H.z,V=Math.hypot(W,j);V>.004&&(Nh.set(W/V,0,j/V),f=Dh.dot(Nh))}let B=l.get(C.id);B?(B.x=C.x,B.z=C.z):(B={x:C.x,z:C.z},l.set(C.id,B))}for(let T=0;T<Bo;T++)t[T].count=u[T],n[T].count=h[T],t[T].instanceMatrix.needsUpdate=!0,n[T].instanceMatrix.needsUpdate=!0;r.count=a,r.instanceMatrix.needsUpdate=!0},useSoldier(v){const M=Uh(v,2776114),_=Uh(v,9313308),P=new Bt({color:16777215,roughness:.78,metalness:.04,vertexColors:!0}),R=new Bt({color:16777215,roughness:.78,metalness:.04,vertexColors:!0});for(let A=0;A<Bo;A++)t[A].geometry=M,n[A].geometry=_,t[A].material=P,n[A].material=R;r.visible=!0,g=1.8}}}const Jn=640;function pS(i){const e=new Float32Array(Jn*3),t=new Float32Array(Jn*3),n=new Float32Array(Jn*3);e.fill(0);for(let w=0;w<Jn;w++)e[w*3+1]=-8;const s=new lt;s.setAttribute("position",new Ye(e,3)),s.setAttribute("color",new Ye(t,3));const r=new Fl({size:.3,vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1,depthTest:!0,sizeAttenuation:!0}),o=new sd(s,r);o.frustumCulled=!1,o.renderOrder=4,i.add(o);const a=24,c=new Float32Array(a*18),l=new Float32Array(a*18),u=new lt;u.setAttribute("position",new Ye(c,3)),u.setAttribute("color",new Ye(l,3)),u.setDrawRange(0,0);const h=new qe(u,new xt({vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,blending:Wi,side:At,toneMapped:!1}));h.frustumCulled=!1,h.renderOrder=5,i.add(h);const f=document.createElement("canvas");f.width=64,f.height=64;const d=f.getContext("2d"),g=d.createRadialGradient(32,32,2,32,32,30);g.addColorStop(0,"rgba(244, 240, 230, 0.95)"),g.addColorStop(1,"rgba(244, 240, 230, 0)"),d.fillStyle=g,d.fillRect(0,0,64,64);const x=new ki({map:new Za(f),transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1}),m=[0,1].map(()=>{const w=new vs(x);return w.scale.set(.16,.16,1),w.visible=!1,w.renderOrder=6,w.frustumCulled=!1,i.add(w),w});function p(w){const S=document.createElement("canvas");S.width=64,S.height=64;const O=S.getContext("2d"),G=O.createRadialGradient(32,32,0,32,32,31);for(let Z=0;Z<w.length;Z++)G.addColorStop(w[Z][0],w[Z][1]);O.fillStyle=G,O.fillRect(0,0,64,64);const ne=new Za(S);return ne.colorSpace=Rt,ne}const v=p([[0,"rgba(255, 252, 240, 1)"],[.06,"rgba(255, 248, 210, 0.95)"],[.16,"rgba(255, 210, 90, 0.35)"],[.36,"rgba(255, 150, 40, 0)"],[1,"rgba(255, 140, 40, 0)"]]),M=p([[0,"rgba(214, 198, 168, 0.55)"],[.45,"rgba(186, 170, 142, 0.22)"],[1,"rgba(160, 148, 124, 0)"]]),_=new ki({map:v,color:16777215,transparent:!0,opacity:.9,depthWrite:!1,depthTest:!1,blending:Wi,toneMapped:!1}),P=[0,1].map(()=>{const w=new vs(_);return w.scale.set(.2,.2,1),w.visible=!1,w.renderOrder=6,w.frustumCulled=!1,i.add(w),w}),R=new ki({map:v,color:16777215,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,blending:Wi,toneMapped:!1}),A=p([[0,"rgba(255, 252, 230, 1)"],[.34,"rgba(255, 236, 150, 1)"],[.62,"rgba(255, 190, 60, 0.9)"],[1,"rgba(255, 140, 30, 0)"]]),T=new ki({map:A,color:16777215,transparent:!0,opacity:1,depthWrite:!1,depthTest:!1,blending:Wi,toneMapped:!1});T.rotation=-.35;const y=[0,1,2,3,4].map(()=>{const w=new vs(R);return w.scale.set(.16,.16,1),w.visible=!1,w.renderOrder=6,w.frustumCulled=!1,i.add(w),w}),b=new ki({map:M,color:16777215,transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1,toneMapped:!1}),C=[0,1,2,3].map(()=>{const w=new vs(b);return w.scale.set(.22,.12,1),w.visible=!1,w.renderOrder=5,w.frustumCulled=!1,i.add(w),w}),H=document.createElement("canvas");H.width=64,H.height=64;const B=H.getContext("2d"),W=B.createRadialGradient(32,30,4,32,30,31);W.addColorStop(0,"rgba(90, 92, 86, 1)"),W.addColorStop(.72,"rgba(90, 92, 86, 1)"),W.addColorStop(.9,"rgba(90, 92, 86, 0.65)"),W.addColorStop(1,"rgba(90, 92, 86, 0)"),B.fillStyle=W,B.fillRect(0,0,64,64);const j=new Za(H);j.colorSpace=Rt;const V=new ki({map:j,transparent:!0,depthWrite:!1,depthTest:!1,opacity:1,toneMapped:!1}),ie=new vs(V);ie.scale.set(.28,.2,1),ie.position.set(.32,1.78,-6.42),ie.renderOrder=3,ie.frustumCulled=!1,i.add(ie);const N={x:-.024,y:.6,z:-.397},se=Md*1.8,re=[[-3.45,.58,-1.58],[-2.85,.58,-1.58],[-2.25,.58,-1.58],[-1.7,.58,-1.58],[.25,.58,-1.88],[.85,.58,-1.88],[1.45,.58,-1.88],[2.05,.58,-1.88],[-.9,.58,1.48],[-.25,.58,1.48],[.4,.58,1.48],[1.05,.58,1.48]],K=re.map(w=>{const S=new vs(T);return S.scale.set(.07,.22,1),S.position.set(w[0],w[1],w[2]),S.visible=!1,S.renderOrder=6,S.frustumCulled=!1,i.add(S),S}),Re=new ee(16774344),ue=new ee(16765562),Q=new Float32Array(Jn),de=new Float32Array(Jn),Te=new Float32Array(Jn*3);let ve=0,Le=!0;const Xe=new ee(Fe.sand),He=new ee(12893876);new ee(16052454);const $e=new ee(16769162),ce=new ee(16742962),pe={x:0,z:0},L={x:0,z:0};let De=0;function fe(w,S){let O=0,G=w.owner==="player"?-1:1;if(w.path&&w.path.length>1&&S){const ne=S[w.path[Math.max(0,(w.seg||1)-1)]];ne&&(O=w.x-ne.x,G=w.z-ne.z)}return Xr(O,G)}function Pe(w,S,O,G){qr(N.x,N.z,G,pe),w.position.set(S+pe.x*se,.02+N.y*se,O+pe.z*se),w.scale.set(.42,.42,1),w.visible=Le}function we(w,S,O,G,ne){const Z=Math.max(1,cS(w,S)),be=[];qr(0,-1,ne,L);for(let X=0;X<Z;X++){Sd(w,X,Z,ne,pe);const U=pe.x*L.x+pe.z*L.z;be.push({x:O+pe.x,z:G+pe.z,along:U})}be.sort((X,U)=>U.along-X.along);const Me=be[0],Ee=be[Math.min(be.length-1,Math.max(1,Math.floor(Z/8)))];return Ee&&Ee!==Me?[Me,Ee]:[Me]}function We(w,S,O,G,ne,Z,be){if(De>=a)return;const Me=G-w,Ee=Z-O,X=Math.hypot(Me,Ee)||1,U=.055,te=1/X,me=-Ee*te*U,le=Me*te*U,ae=De*18,Y=[w-me,S,O-le,w+me,S,O+le,G-me,ne,Z-le,w+me,S,O+le,G+me,ne,Z+le,G-me,ne,Z-le];for(let k=0;k<18;k++)c[ae+k]=Y[k];for(let k=0;k<6;k++){const Ce=ae+k*3;l[Ce]=be.r,l[Ce+1]=be.g,l[Ce+2]=be.b}De+=1}function Ae(w,S,O,G,ne,Z,be,Me){const Ee=ve;ve=(ve+1)%Jn,Q[Ee]=ne,de[Ee]=ne;const X=Ee*3;e[X]=w,e[X+1]=S,e[X+2]=O,Te[X]=Z,Te[X+1]=be,Te[X+2]=Me,n[X]=G.r,n[X+1]=G.g,n[X+2]=G.b,t[X]=G.r,t[X+1]=G.g,t[X+2]=G.b}return{setEnabled(w){Le=!!w,o.visible=Le,h.visible=Le,ie.visible=Le;for(let S=0;S<K.length;S++)K[S].visible=Le;if(!Le){m[0].visible=!1,m[1].visible=!1,P[0].visible=!1,P[1].visible=!1;for(let S=0;S<y.length;S++)y[S].visible=!1;for(let S=0;S<C.length;S++)C[S].visible=!1}},update(w,S){if(!Le||!S)return;const O=S.squads||[];let G=64;const ne=Math.floor((S.t||0)*8);let Z=0,be=0;const Me=S.nodes;for(let Y=0;Y<y.length;Y++)y[Y].visible=!1;for(let Y=0;Y<C.length;Y++)C[Y].visible=!1;for(let Y=0;Y<O.length&&G>0;Y++){const k=O[Y];if(!k||k.count<=0)continue;const Ce=Y*17%5*.05;if(k.mode==="march")Math.abs(k.z)>=1.2&&(Ae(k.x+Ce,.16,k.z-Ce,Xe,.8,0,.45,0),G-=1,G>0&&Y%2===0&&(Ae(k.x-Ce,.22,k.z+.1,Xe,.55,.2,.3,0),G-=1));else if(k.mode==="fight"||k.mode==="siege"){const D=Fr(k.owner,k.x,k.z,k.count),xe=(Y+ne)%3-1,q=fe(k,Me),oe=we(k.owner,k.count,D.x,D.z,q);for(let ge=0;ge<oe.length&&Z<y.length-1;ge++)Pe(y[Z],oe[ge].x,oe[ge].z,q),Z+=1;if(be<C.length){const ge=C[be];be+=1;const he=k.owner==="player"&&Math.abs(k.z)<1.15,Oe=he?k.x:D.x,Je=he?1.35:D.z;ge.position.set(Oe+xe*.1,.08,Je),ge.scale.set(.26,.16,1),ge.visible=Le}if(k.mode==="siege"&&G>0&&(Ae(k.x-.2,.85,k.z+.1,ce,.55,.35,1.1,-.2),G-=1),k.mode==="siege"&&G>0&&(Ae(k.x+.15,1.15,k.z,He,.9,-.2,.8,.15),G-=1),k.mode==="siege"){const ge=(Y*3+ne)%6;for(let he=0;he<4&&G>0;he++){const Oe=ge+he*1.5,Je=Math.cos(Oe),ft=Math.sin(Oe);Ae(k.x+Je*.35,.65+he%3*.28,k.z+ft*.35,he%2?ce:$e,.5,Je*1.5,1.7,ft*1.5),G-=1}}}}const Ee=y[y.length-1],X=.86+.14*Math.sin((S.t||0)*16);if(Ee.position.set(1.69,.66,5.05),Ee.scale.set(.18*X,.18*X,1),Ee.visible=Le,Z<y.length-1){const Y=y[Z];Y.position.set(0,.48,-5.45),Y.scale.set(.18*X,.18*X,1),Y.visible=Le}if(be<C.length){const Y=C[be];Y.position.set(1.55,.1,4.55),Y.scale.set(.42,.2,1),Y.visible=Le}const U=S.nodes,te=S.buildings;if(U&&te)for(let Y=0;Y<te.length&&G>0;Y++){const k=te[Y];if(k.kind!=="hq"&&k.kind!=="barracks")continue;let Ce=!1;for(let xe=0;xe<O.length;xe++){const q=O[xe];q.mode==="siege"&&q.targetId===k.id&&q.owner!==k.owner&&q.count>0&&(Ce=!0)}const D=U[k.node];D&&(Ce&&G>0&&(Ae(D.x,1.35,D.z,ce,.5,Y%2?.4:-.4,1.1,.1),G-=1),Ce&&G>0&&(Ae(D.x+.2,1.7,D.z-.1,He,.8,.15,.7,0),G-=1),k.capture>.05&&G>0&&(Ae(D.x,.9,D.z,$e,.35,0,1.4,0),G-=1),k.capture>.05&&G>0&&(Ae(D.x+.25,1.15,D.z-.15,$e,.4,.8,1.6,-.4),G-=1),k.capture>.05&&G>0&&(Ae(D.x-.2,1.05,D.z+.1,ce,.35,-.7,1.5,.35),G-=1))}De=0,m[0].visible=!1,m[1].visible=!1,P[0].visible=!1,P[1].visible=!1;const me=(typeof performance<"u"?performance.now():0)*.001;ie.position.y=1.78+Math.sin(me*.35)*.03,ie.visible=Le;const le=.86+.14*Math.sin((S.t||0)*18);for(let Y=0;Y<K.length;Y++){const k=re[Y];K[Y].position.set(k[0],k[1],k[2]),K[Y].scale.set(.07*le,.22*le,1),K[Y].visible=Le}for(let Y=0;Y<O.length;Y++){const k=O[Y];if(!(!k||k.count<=0))for(let Ce=Y+1;Ce<O.length;Ce++){const D=O[Ce];if(!D||D.count<=0||k.owner===D.owner)continue;const xe=D.x-k.x,q=D.z-k.z,oe=Math.hypot(xe,q);if(oe>4.4||oe<.12||De>=a)continue;const ge=Fr(k.owner,k.x,k.z,k.count),he=Fr(D.owner,D.x,D.z,D.count);let Oe=he.x-ge.x,Je=he.z-ge.z,ft=Math.hypot(Oe,Je);ft<.2&&(Oe=xe,Je=q,ft=oe);const je=Math.min(.55,ft*.35),Et=Math.min(.022,je*.05),wt=1/ft,Dt=-Je*wt*Et,Nt=Oe*wt*Et,Mt=.5,ln=ge.x,Cn=ge.z,Hn=ge.x+Oe*wt*je,yn=ge.z+Je*wt*je,ir=De*18,Qi=[ln-Dt,Mt,Cn-Nt,ln+Dt,Mt,Cn+Nt,Hn-Dt,Mt,yn-Nt,ln+Dt,Mt,Cn+Nt,Hn+Dt,Mt,yn+Nt,Hn-Dt,Mt,yn-Nt];for(let Ot=0;Ot<18;Ot++)c[ir+Ot]=Qi[Ot];const io=k.owner==="player"?Re:ue,so=D.owner==="player"?Re:ue;for(let Ot=0;Ot<6;Ot++){const Gn=Ot===2||Ot===4||Ot===5?so:io,Vn=ir+Ot*3;l[Vn]=Gn.r,l[Vn+1]=Gn.g,l[Vn+2]=Gn.b}if(De+=1,De<a){const Ot=he.x,Gn=he.z,Vn=he.x-Oe*wt*je,E=he.z-Je*wt*je,z=De*18,J=[Ot-Dt,Mt,Gn-Nt,Ot+Dt,Mt,Gn+Nt,Vn-Dt,Mt,E-Nt,Ot+Dt,Mt,Gn+Nt,Vn+Dt,Mt,E+Nt,Vn-Dt,Mt,E-Nt];for(let F=0;F<18;F++)c[z+F]=J[F];const $=D.owner==="player"?Re:ue;for(let F=0;F<6;F++){const _e=z+F*3;l[_e]=$.r,l[_e+1]=$.g,l[_e+2]=$.b}De+=1}(De===1||De===2)&&(P[0].position.set(ln,.52,Cn),P[1].position.set(he.x,.52,he.z),P[0].visible=Le,P[1].visible=Le)}}We(1.69,.66,5.05,1.58,.58,4.72,Re),We(0,.48,-5.45,.06,.42,-5.18,ue),P[0].position.set(1.64,.62,4.88),P[0].scale.set(.16,.16,1),P[0].visible=Le,P[1].position.set(.03,.46,-5.32),P[1].scale.set(.16,.16,1),P[1].visible=Le,u.setDrawRange(0,De*6),u.attributes.position.needsUpdate=!0,u.attributes.color.needsUpdate=!0,h.visible=Le&&De>0;const ae=Math.min(.05,w||.016);for(let Y=0;Y<Jn;Y++){if(Q[Y]<=0)continue;Q[Y]-=ae;const k=Y*3;if(Q[Y]<=0){e[k+1]=-8,Q[Y]=0;continue}e[k]+=Te[k]*ae,e[k+1]+=Te[k+1]*ae,e[k+2]+=Te[k+2]*ae;const Ce=Q[Y]/de[Y];t[k]=n[k]*Ce,t[k+1]=n[k+1]*Ce,t[k+2]=n[k+2]*Ce}s.attributes.position.needsUpdate=!0,s.attributes.color.needsUpdate=!0}}}function mS(i,e,t,n){const s=new VM,r=new Si(new I(0,1,0),0),o=new ye,a=new I;let c=null;function l(f){const d=i.getBoundingClientRect();if(d.width<1||d.height<1)return null;const g=WM(f.clientX,f.clientY,d);return o.set(g.x,g.y),s.setFromCamera(o,e),s.ray.intersectPlane(r,a)?{x:a.x,z:a.z}:null}function u(f){const d=i.getBoundingClientRect(),g=l(f);return d.width<1||d.height<1?{building:null,world:g}:{building:jM(t(),e,d.width,d.height,f.clientX-d.left,f.clientY-d.top,g),world:g}}i.addEventListener("contextmenu",f=>f.preventDefault()),i.addEventListener("pointerdown",f=>{if(f.button!==0&&f.pointerType==="mouse")return;i.setPointerCapture(f.pointerId),n.unlock();const{building:d}=u(f);c={x:f.clientX,y:f.clientY,id:d?d.id:null,owner:d?d.owner:null,dragging:!1}}),i.addEventListener("pointermove",f=>{if(!c)return;const d=Math.hypot(f.clientX-c.x,f.clientY-c.y);if(!c.dragging&&d>14&&c.id&&c.owner==="player"&&(c.dragging=!0,n.onDragStart(c.id)),!c.dragging)return;const{world:g,building:x}=u(f);g&&n.onDragMove(g,x?x.id:null)});function h(f){if(!c)return;const d=c;c=null;const{building:g}=u(f),x=g?g.id:null;if(d.dragging){n.onDragEnd(d.id,x);return}n.onTap(x)}i.addEventListener("pointerup",h),i.addEventListener("pointercancel",()=>{c&&(c=null,n.onDragEnd(null,null))})}function bd(i,e){i.fov=42,Number.isFinite(e)&&e>0&&(i.aspect=e),i.position.set(4.2,18.8,16.2),i.up.set(0,1,0),i.lookAt(-.6,.35,-.6),i.updateProjectionMatrix(),i.updateMatrixWorld()}function gS(i,e){i.fov=34,Number.isFinite(e)&&e>0&&(i.aspect=e),i.position.set(4.8,20,28),i.up.set(0,1,0),i.lookAt(.2,.3,1.2),i.updateProjectionMatrix(),i.updateMatrixWorld()}function xS(i){try{const e=i.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");if(!t)return!0;const n=`${e.getParameter(t.UNMASKED_RENDERER_WEBGL)||""} ${e.getParameter(t.UNMASKED_VENDOR_WEBGL)||""}`;return/swiftshader|llvmpipe|softpipe|software/i.test(n)?!0:!/nvidia|amd|radeon|intel|apple|adreno|mali|powervr/i.test(n)}catch{return!0}}function zh(i,e,t){i.shadowMap.enabled=!!t,i.shadowMap.type=yf,e.castShadow=!!t,t&&(e.shadow.mapSize.set(1024,1024),e.shadow.camera.near=4,e.shadow.camera.far=42,e.shadow.camera.left=-14,e.shadow.camera.right=14,e.shadow.camera.top=14,e.shadow.camera.bottom=-14,e.shadow.bias=-8e-4,e.shadow.normalBias=.028,e.shadow.camera.updateProjectionMatrix())}function _S(i){const e=new Ty({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"});e.outputColorSpace=Rt,e.toneMapping=Sf,e.toneMappingExposure=1.15,e.setClearColor(Fe.sky,1);const t=new Ay;t.fog=new Dl(14017263,78,150),t.background=new ee(Fe.sky);const n=new qt(46,1,.1,90);bd(n),t.add(new TM(16774884,9088866,1.12)),t.add(new LM(16775406,.46));const s=new gd(16760944,3.5);s.position.set(-16,6.4,7.5),s.target.position.set(0,0,0),t.add(s),t.add(s.target);const r=xS(e);let o=!r;zh(e,s,o);function a(){const c=i.clientWidth||390,l=i.clientHeight||844;n.aspect=c/Math.max(1,l),n.updateProjectionMatrix();const u=Math.min(Math.max(window.devicePixelRatio||1,2),2);e.setPixelRatio(u),e.setSize(c,l,!1)}return{renderer:e,scene:t,camera:n,sun:s,software:r,get shadowsOn(){return o},setShadows(c){o=!!c,zh(e,s,o),e.shadowMap.needsUpdate=!0},resize:a}}class vS extends nr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new wS(t)}),this.register(function(t){return new ES(t)}),this.register(function(t){return new NS(t)}),this.register(function(t){return new US(t)}),this.register(function(t){return new FS(t)}),this.register(function(t){return new AS(t)}),this.register(function(t){return new RS(t)}),this.register(function(t){return new CS(t)}),this.register(function(t){return new PS(t)}),this.register(function(t){return new bS(t)}),this.register(function(t){return new IS(t)}),this.register(function(t){return new TS(t)}),this.register(function(t){return new DS(t)}),this.register(function(t){return new LS(t)}),this.register(function(t){return new MS(t)}),this.register(function(t){return new OS(t)}),this.register(function(t){return new zS(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Nr.extractUrlBase(e);o=Nr.resolveURL(l,this.path)}else o=Nr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new md(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===wd){try{o[nt.KHR_BINARY_GLTF]=new BS(e)}catch(h){s&&s(h);return}r=JSON.parse(o[nt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new jS(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case nt.KHR_MATERIALS_UNLIT:o[h]=new SS;break;case nt.KHR_DRACO_MESH_COMPRESSION:o[h]=new kS(r,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:o[h]=new HS;break;case nt.KHR_MESH_QUANTIZATION:o[h]=new GS;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function yS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class MS{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new ee(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],$t);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new gd(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new PM(u),l.distance=h;break;case"spot":l=new RM(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class SS{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return xt}extendParams(e,t,n){const s=[];e.color=new ee(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],$t),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Rt))}return Promise.all(s)}}class bS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class wS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(a,a)}return Promise.all(r)}}class ES{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class TS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class AS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ee(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],$t)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Rt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class RS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class CS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ee().setRGB(a[0],a[1],a[2],$t),Promise.all(r)}}class PS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class IS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ee().setRGB(a[0],a[1],a[2],$t),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Rt)),Promise.all(r)}}class LS{constructor(e){this.parser=e,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class DS{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class NS{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class US{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class FS{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class OS{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,s.mode,s.filter),d})})}else return null}}class zS{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==mn.TRIANGLES&&l.mode!==mn.TRIANGLE_STRIP&&l.mode!==mn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const x=new Ke,m=new I,p=new li,v=new I(1,1,1),M=new Pr(g.geometry,g.material,f);for(let _=0;_<f;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&v.fromBufferAttribute(c.SCALE,_),M.setMatrixAt(_,x.compose(m,p,v));for(const _ in c)if(_==="_COLOR_0"){const P=c[_];M.instanceColor=new Qc(P.array,P.itemSize,P.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);mt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const wd="glTF",yr=12,Bh={JSON:1313821514,BIN:5130562};class BS{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,yr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==wd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-yr,r=new DataView(e,yr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Bh.JSON){const l=new Uint8Array(e,yr+o,a);this.content=n.decode(l)}else if(c===Bh.BIN){const l=yr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class kS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=al[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=al[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=Ds[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(d){for(const g in d.attributes){const x=d.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}h(d)},a,l,$t,f)})})}}class HS{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class GS{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class Ed extends to{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,x=g-l,m=-2*d+3*f,p=d-f,v=1-m,M=p-f+h;for(let _=0;_!==a;_++){const P=o[x+_+a],R=o[x+_+c]*u,A=o[g+_+a],T=o[g+_]*u;r[_]=v*P+M*R+m*A+p*T}return r}}const VS=new li;class WS extends Ed{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return VS.fromArray(r).normalize().toArray(r),r}}const mn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ds={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},kh={9728:Zt,9729:on,9984:wf,9985:Vo,9986:br,9987:ti},Hh={33071:wi,33648:ea,10497:Bs},nc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},al={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},XS={CUBICSPLINE:void 0,LINEAR:Br,STEP:zr},ic={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function qS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Bt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:si})),i.DefaultMaterial}function Fi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Qn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function YS(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(s){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function KS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ZS(i){let e;const t=i.extensions&&i.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+sc(t.attributes):e=i.indices+":"+sc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+sc(i.targets[n]);return e}function sc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function cl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $S(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const JS=new Ke;class jS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new yS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new EM(this.options.manager):this.textureLoader=new DM(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new md(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Fi(r,a,s),Qn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Nr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=nc[s.type],a=Ds[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Ye(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=nc[s.type],l=Ds[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(d&&d!==h){const p=Math.floor(f/d),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let M=t.cache.get(v);M||(x=new l(a,p*d,s.count*d/u),M=new Qf(x,d/u),t.cache.add(v,M)),m=new Hr(M,c,f%d/u,g)}else a===null?x=new l(s.count*c):x=new l(a,f,s.count*c),m=new Ye(x,c,g);if(s.sparse!==void 0){const p=nc.SCALAR,v=Ds[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,P=new v(o[1],M,s.sparse.count*p),R=new l(o[2],_,s.sparse.count*c);a!==null&&(m=new Ye(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,T=P.length;A<T;A++){const y=P[A];if(m.setX(y,R[A*c]),c>=2&&m.setY(y,R[A*c+1]),c>=3&&m.setZ(y,R[A*c+2]),c>=4&&m.setW(y,R[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=kh[f.magFilter]||on,u.minFilter=kh[f.minFilter]||ti,u.wrapS=Hh[f.wrapS]||Bs,u.wrapT=Hh[f.wrapT]||Bs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Zt&&u.minFilter!==on,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(x){const m=new Pt(x);m.needsUpdate=!0,f(m)}),t.load(Nr.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Qn(h,o),h.userData.mimeType=o.mimeType||$S(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[nt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Fl,An.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new id,An.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Bt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[nt.KHR_MATERIALS_UNLIT]){const h=s[nt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new ee(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],$t),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Rt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=At);const u=r.alphaMode||ic.OPAQUE;if(u===ic.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ic.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==xt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ye(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==xt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==xt){const h=r.emissiveFactor;a.emissive=new ee().setRGB(h[0],h[1],h[2],$t)}return r.emissiveTexture!==void 0&&o!==xt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Rt)),Promise.all(l).then(function(){const h=new o(a);return r.name&&(h.name=r.name),Qn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Fi(s,h,r),h})}createUniqueName(e){const t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Gh(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=ZS(l),h=s[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Gh(new lt,l,t),s[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?qS(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const x=u[d],m=o[d];let p;const v=l[d];if(m.mode===mn.TRIANGLES||m.mode===mn.TRIANGLE_STRIP||m.mode===mn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Cy(x,v):new qe(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===mn.TRIANGLE_STRIP?p.geometry=Lh(p.geometry,Nf):m.mode===mn.TRIANGLE_FAN&&(p.geometry=Lh(p.geometry,$c));else if(m.mode===mn.LINES)p=new Ly(x,v);else if(m.mode===mn.LINE_STRIP)p=new Ul(x,v);else if(m.mode===mn.LINE_LOOP)p=new Dy(x,v);else if(m.mode===mn.POINTS)p=new sd(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&KS(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Qn(p,r),m.extensions&&Fi(s,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&Fi(s,h[0],r),h[0];const f=new an;r.extensions&&Fi(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(Of.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Il(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Qn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new Ke;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Nl(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){const d=s.channels[h],g=s.samplers[d.sampler],x=d.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let v=0,M=f.length;v<M;v++){const _=f[v],P=d[v],R=g[v],A=x[v],T=m[v];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const y=n._createAnimationTracks(_,P,R,A,T);if(y)for(let b=0;b<y.length;b++)p.push(y[b])}return new _M(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,JS)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new td:l.length>1?u=new an:l.length===1?u=l[0]:u=new mt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Qn(u,r),r.extensions&&Fi(n,u,r),r.matrix!==void 0){const h=new Ke;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new an;n.name&&(r.name=s.createUniqueName(n.name)),Qn(r,n),n.extensions&&Fi(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of s.associations)(f instanceof An||f instanceof Pt)&&h.set(f,d);return u.traverse(f=>{const d=s.associations.get(f);d!=null&&h.set(f,d)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];vi[r.path]===vi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(vi[r.path]){case vi.weights:l=Ws;break;case vi.rotation:l=Xs;break;case vi.position:case vi.scale:l=qs;break;default:switch(n.itemSize){case 1:l=Ws;break;case 2:case 3:default:l=qs;break}break}const u=s.interpolation!==void 0?XS[s.interpolation]:Br,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+vi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=cl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Xs?WS:Ed;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function QS(i,e,t){const n=e.attributes,s=new Fn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),a.normalized){const u=cl(Ds[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new I,c=new I;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const x=cl(Ds[f.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new On;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Gh(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=al[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return it.workingColorSpace!==$t&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),Qn(i,e),QS(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?YS(i,e.targets,t):i})}const Wt="assets/models/",e1={soldier:`${Wt}soldier.glb`,rifle:`${Wt}rifle.glb`,tank:`${Wt}tank.glb`,pineA:`${Wt}pine-a.glb`,pineB:`${Wt}pine-b.glb`,rockA:`${Wt}rock-a.glb`,rockB:`${Wt}rock-b.glb`,bags:`${Wt}sandbags.glb`,fence:`${Wt}fence.glb`,fort:`${Wt}fence-fort.glb`,tower:`${Wt}hq-tower.glb`,bunker:`${Wt}bunker.glb`,roof:`${Wt}bunker-roof.glb`,wall:`${Wt}bunker-wall.glb`,radar:`${Wt}radar.glb`},Ct=new Fn,t1=new I,Tr=new I,Vh=new st,Oi=new st,Wh=new Ke;function n1(){return new vS}function i1(i){return n1().loadAsync(i)}function s1(i){i.traverse(e=>{(e.name==="UpperArmL"||e.name==="UpperArmR")&&e.rotateX(-1.65)}),i.updateMatrixWorld(!0)}function r1(i,e){let t=null;return i.traverse(n=>{n.name===e&&(t=n)}),t}function Td(i){const e=i.geometry,t=e.getAttribute("position"),n=e.getAttribute("skinIndex"),s=e.getAttribute("skinWeight");i.skeleton.update();const r=i.skeleton.boneMatrices,o=new Float32Array(t.count*3);for(let c=0;c<t.count;c++){Vh.set(t.getX(c),t.getY(c),t.getZ(c),1).applyMatrix4(i.bindMatrix),Oi.set(0,0,0,0);for(let l=0;l<4;l++){const u=s.getComponent(c,l);if(!u)continue;const h=Math.round(n.getComponent(c,l));Wh.fromArray(r,h*16);const f=Vh.clone().applyMatrix4(Wh);Oi.addScaledVector(f,u)}Oi.applyMatrix4(i.bindMatrixInverse),Oi.applyMatrix4(i.matrixWorld),o[c*3]=Oi.x,o[c*3+1]=Oi.y,o[c*3+2]=Oi.z}const a=new lt;return a.setAttribute("position",new Ye(o,3)),e.getIndex()&&a.setIndex(e.getIndex().clone()),a}function Ad(i,e){const t=i.getAttribute("position"),n=new Float32Array(t.count*3),s=new ee(e);for(let r=0;r<t.count;r++)n[r*3]=s.r,n[r*3+1]=s.g,n[r*3+2]=s.b;return i.setAttribute("color",new Ye(n,3)),i}function ll(i,e){const t=i.getIndex()?i.toNonIndexed():i,n=new lt;return n.setAttribute("position",t.getAttribute("position").clone()),Ad(n,e)}function o1(i){const e=[];return i.updateMatrixWorld(!0),i.traverse(t=>{if(!t.isMesh||t.isSkinnedMesh)return;const n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),e.push(n)}),e}function a1(i,e){s1(i);const t=[];i.traverse(p=>{if(!p.isSkinnedMesh)return;const v=Td(p),_=(p.name||p.parent&&p.parent.name||"").includes("Head")?.42:1;t.push(ll(v,new ee(_,_,_).getHex()))});const n=o1(e).map(p=>ll(p,16777215)),s=$i(n);s.computeBoundingBox(),s.rotateY(-Math.PI/2),s.computeBoundingBox();const r=s.boundingBox.getSize(t1),o=.72/Math.max(r.z,.001);s.scale(o*1.1,o*1.7,o*.85),s.rotateY(.85),s.computeBoundingBox(),r1(i,"HandR").getWorldPosition(Tr),s.translate(Tr.x+.22-(s.boundingBox.min.x+s.boundingBox.max.x)*.5,Tr.y-(s.boundingBox.min.y+s.boundingBox.max.y)*.5,Tr.z-s.boundingBox.min.z),t.push(Ad(s,1711128));const c=$i(t);c.rotateY(Math.PI),c.computeBoundingBox();const l=c.boundingBox,h=1/Math.max(.001,l.max.y-l.min.y);c.scale(h,h,h),c.computeBoundingBox();const f=c.boundingBox,d=(f.min.x+f.max.x)*.5,g=(f.min.z+f.max.z)*.5;c.translate(-d,-f.min.y,-g);const x=c.getAttribute("position"),m=c.getAttribute("color");for(let p=0;p<x.count;p++)m.getX(p)*.2126+m.getY(p)*.7152+m.getZ(p)*.0722<.2&&x.setZ(p,x.getZ(p)-.06);return c.computeVertexNormals(),c}function Mr(i,e,t=.45,n=1){i.updateMatrixWorld(!0);const s=[];i.traverse(l=>{if(!l.isMesh)return;const u=l.geometry.clone();u.applyMatrix4(l.matrixWorld);const h=Array.isArray(l.material)?l.material[0]:l.material,f=h&&h.color?h.color.clone():new ee(16777215),d=f.r*.2126+f.g*.7152+f.b*.0722;e&&d>=.25&&f.lerp(new ee(e),t),n!==1&&f.multiplyScalar(n),s.push(ll(u,f.getHex()))});const r=$i(s);r.computeVertexNormals(),r.computeBoundingBox();const o=r.boundingBox,a=Math.max(.001,o.max.y-o.min.y);r.scale(1/a,1/a,1/a),r.computeBoundingBox();const c=r.boundingBox;return r.translate(-(c.min.x+c.max.x)*.5,-c.min.y,-(c.min.z+c.max.z)*.5),r}function Xh(i){const e=i.attributes.position,t=i.attributes.color;if(!e||!t)return i;const n=new ee(7030320),s=new ee(2059064),r=new ee(10802286),o=new ee;let a=.001;for(let c=0;c<e.count;c++)a=Math.max(a,e.getY(c));for(let c=0;c<e.count;c++){const l=e.getY(c)/a;l<.16?o.copy(n):(o.copy(s),o.lerp(r,Math.max(0,(l-.58)/.42)*.75)),t.setXYZ(c,o.r,o.g,o.b)}return t.needsUpdate=!0,i}function In(i){return new Bt({color:i,roughness:.9,metalness:.02})}function qh(i,e,t=!1){i.traverse(n=>{n.isMesh&&(n.material=e,n.castShadow=t,n.receiveShadow=!0)})}function Yh(i,e){const t=i.attributes.position,n=i.attributes.normal,s=new Float32Array(t.count*3),r=new ee(e),o=new ee;for(let a=0;a<t.count;a++){const c=n?n.getY(a):.5,l=.55+.45*Math.max(0,Math.min(1,c*.5+.5));o.copy(r).multiplyScalar(l),s[a*3]=o.r,s[a*3+1]=o.g,s[a*3+2]=o.b}return i.setAttribute("color",new Ye(s,3)),i}function c1(i){i.traverse(e=>{if(!e.isMesh||!e.material)return;const n=(Array.isArray(e.material)?e.material:[e.material]).map(s=>{const r=s.clone();return r.roughness=Math.max(r.roughness||0,.72),r.metalness=Math.min(r.metalness||0,.12),r});e.material=Array.isArray(e.material)?n:n[0],e.castShadow=!1,e.receiveShadow=!0})}function $o(i){i.traverse(e=>{e.geometry&&(e.geometry=e.geometry.clone()),e.material&&(e.material=Array.isArray(e.material)?e.material.map(t=>t.clone()):e.material.clone())})}function ws(i,e,t,n){e.add(i),i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1),e.updateWorldMatrix(!0,!0),Ct.setFromObject(i);const s=Math.max(.001,Ct.max.y-Ct.min.y),r=Math.max(.001,Ct.max.x-Ct.min.x,Ct.max.z-Ct.min.z);let o=t/s;n&&r*o>n&&(o=n/r),i.scale.setScalar(o),e.updateWorldMatrix(!0,!0),Ct.setFromObject(i);const a=e.getWorldPosition(Tr).y,c=e.getWorldScale(new I).y||1;i.position.y+=(a-Ct.min.y)/c}function l1(i){let e=i;for(;e;){if(e.userData&&e.userData.flutter)return!0;e=e.parent}return!1}function u1(i){const e=i.userData.pip,t=i.userData.dangerRing;i.traverse(n=>{!n.isMesh||l1(n)||n===e||n===t||(n.visible=!1)})}function rc(i,e,t,n,s,r=!1){if(!e||!t.length)return;const o=e.clone(),a=n.clone(),c=new Pr(o,a,t.length);c.castShadow=r,c.receiveShadow=!0,c.frustumCulled=!1;const l=new mt;for(let u=0;u<t.length;u++){const h=t[u];l.position.set(h.x,0,h.z),l.rotation.set(0,s?s(u,h):0,0),l.scale.setScalar(h.s),l.updateMatrix(),c.setMatrixAt(u,l.matrix)}c.instanceMatrix.needsUpdate=!0,i.add(c)}function Yr(i){i.updateWorldMatrix(!0,!0);const e=new I,t=new I;return i.getWorldPosition(e),i.getWorldScale(t),{origin:e,scale:t}}function oc(i,e,t){e.updateWorldMatrix(!0,!0),Ct.setFromObject(i);const s=Yr(e).scale.y||1;i.position.y+=(t-Ct.min.y)/s}function Kh(i,e){e.updateWorldMatrix(!0,!0),Ct.setFromObject(i);const t=Yr(e),n=t.scale.y||1;i.position.y+=(t.origin.y-Ct.min.y)/n}function ac(i,e){const t=Yr(i),n=t.scale.y||1;i.traverse(s=>{!s.userData||!s.userData.flutter||(s.position.y=(e-t.origin.y)/n+.12/n)})}function Zh(i){i.updateMatrixWorld(!0);const e=[];i.traverse(r=>{if(r.isSkinnedMesh)r.skeleton.update(),e.push(Td(r));else if(r.isMesh){const o=r.geometry.clone();o.applyMatrix4(r.matrixWorld),e.push(o)}});const t=[];for(let r=0;r<e.length;r++){const o=e[r].getIndex()?e[r].toNonIndexed():e[r],a=new lt;a.setAttribute("position",o.getAttribute("position").clone()),t.push(a)}const n=$i(t);if(!n)return null;n.computeBoundingBox();const s=n.boundingBox.getSize(new I);return s.x>s.z&&n.rotateY(Math.PI/2),n.computeVertexNormals(),n}function cc(i,e,t,n){for(let s=0;s<n;s++){const r=e.clone(!0);$o(r);const o=s/n*Math.PI*2;ws(r,i,.32,.52),r.traverse(a=>{!a.isMesh||!a.material||!a.material.color||(a.material.color.set(12886890),a.material.roughness=.92,a.material.metalness=0,a.castShadow=!0,a.receiveShadow=!0)}),r.position.x+=Math.cos(o)*t,r.position.z+=Math.sin(o)*t,r.rotation.y=o}}function h1(i,e){u1(i);const t=i.userData.owner==="enemy",n=i.userData.kind==="hq",s=Yr(i).scale.x||1;function r(f,d,g,x,m,p,v){const M=new qe(new Se(f/s,d/s,g/s),x);return M.position.set(m/s,0,p/s),M.castShadow=!0,M.receiveShadow=!0,i.add(M),oc(M,i,v),M}if(n&&t){const f=In(12038824),d=new Bt({color:12855330,emissive:10099734,emissiveIntensity:.28,roughness:.55,metalness:.02}),g=new Bt({color:9313308,emissive:6950928,emissiveIntensity:.22,roughness:.62});r(2.55,.12,2.15,In(12894134),0,0,.02),r(2.05,.72,1.7,f,0,0,.12),r(2.12,.08,1.78,d,0,0,.82),r(1.62,.5,1.28,In(13223099),0,0,.88),r(1.72,.08,1.38,d,0,0,1.36),r(1.35,.14,1.02,In(13946822),0,0,1.42),r(.52,.58,.1,g,0,-.9,.16);const x=s;if(e.radar){const p=e.radar.clone(!0);$o(p),c1(p),ws(p,i,.55,.95),oc(p,i,1.52)}if(e.wall||e.fort){const v=1.62/x,M=1.28,_=In(12039082),P=new Bt({color:13637656,emissive:16720924,emissiveIntensity:.08,roughness:.5,metalness:.02}),R=.22/x,A=.02/x,T=.3/x,y=.04/x;for(let j=0;j<36;j++){const V=-Math.PI/2+j/36*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(V+Math.PI/2),Math.cos(V+Math.PI/2)))<M)continue;const N=new qe(new Se(T,R,.16/x),_);N.position.set(Math.cos(V)*v,R*.5,Math.sin(V)*v),N.rotation.y=V+Math.PI/2,N.castShadow=!0,N.receiveShadow=!0,i.add(N);const se=new qe(new Se(T,A,y),P);se.position.set(Math.cos(V)*(v+.06/x),R+A*.5,Math.sin(V)*(v+.06/x)),se.rotation.y=N.rotation.y,se.castShadow=!0,se.receiveShadow=!0,i.add(se)}for(const j of[-1,1]){const V=-Math.PI/2+j*M,ie=new qe(new Se(.1/x,.22/x,.1/x),_);ie.position.set(Math.cos(V)*v,.11/x,Math.sin(V)*v),ie.castShadow=!0,ie.receiveShadow=!0,i.add(ie)}const b=-Math.PI/2-M,C=Math.cos(b)*v,H=Math.sin(b)*v,B=new qe(new cn(.025/x,.025/x,.95/x,6),In(4078132));B.position.set(C,.48/x,H),B.castShadow=!0,i.add(B);const W=new qe(new oi(.72/x,.42/x),new Bt({color:9313308,emissive:4853776,emissiveIntensity:.18,side:At,roughness:.7}));W.position.set(C+.38/x,.68/x,H),W.rotation.y=Math.PI-.4,W.castShadow=!0,i.add(W)}e.bags&&cc(i,e.bags,1.2/x,11),ac(i,1.62);return}if(n&&!t){i.position.z-=.95;const f=In(9344644),d=new Bt({color:3115592,emissive:1326114,emissiveIntensity:.14,roughness:.76,metalness:0});if(r(2.05,.1,1.45,In(14144200),0,0,.02),r(1.4,.4,.98,f,0,.02,.1),r(1.58,.2,1.12,d,0,0,.48),e.bags&&cc(i,e.bags,.98/s,10),e.tank&&(e.tankGeo||(e.tankGeo=Zh(e.tank)),e.tankGeo)){const g=new qe(Yh(e.tankGeo.clone(),5134900),new Bt({color:16777215,roughness:.82,metalness:.08,vertexColors:!0}));g.castShadow=!0,g.receiveShadow=!0,g.frustumCulled=!1,ws(g,i,.72,1.9),i.updateWorldMatrix(!0,!0);const x=new I(1.7,0,4.35);i.worldToLocal(x),g.position.x=x.x,g.position.z=x.z,Kh(g,i)}ac(i,.82);return}if(!e.bunker||!e.roof)return;const o=e.bunker.clone(!0);$o(o),qh(o,In(t?9077884:8358514),!0),ws(o,i,n?.85:.68,n?1.7:1.35),i.updateWorldMatrix(!0,!0),Ct.setFromObject(o);const a=Ct.max.y,c=Math.max(Ct.max.x-Ct.min.x,Ct.max.z-Ct.min.z),l=e.roof.clone(!0);$o(l),qh(l,In(t?9317414:3115592)),ws(l,i,.42,c*1.05),oc(l,i,a-.04);const u=(c*.55+.28)/(Yr(i).scale.x||1);e.bags&&cc(i,e.bags,u,n?9:7);let h=a+.16;if(!t&&n&&e.tank&&(e.tankGeo||(e.tankGeo=Zh(e.tank)),e.tankGeo)){const f=new qe(Yh(e.tankGeo.clone(),5134900),new Bt({color:16777215,roughness:.82,metalness:.08,vertexColors:!0}));f.castShadow=!0,f.receiveShadow=!0,f.frustumCulled=!1,ws(f,i,.72,1.9),i.updateWorldMatrix(!0,!0);const d=new I(1.7,0,4.35);i.worldToLocal(d),f.position.x=d.x,f.position.z=d.z,Kh(f,i)}ac(i,h)}function f1(i){const e=[],t=i.minZ-.95;for(let o=0;o<8;o++){const a=o/7,c=i.minX+.15+a*(i.maxX-i.minX)*.62;e.push({x:c,z:t-o%2*.45,s:1.5+o%3*.14})}for(let o=0;o<12;o++){const a=o/11,c=i.minZ+.15+a*(i.maxZ-i.minZ)*.86,l=i.minX-1.25+a*2.15;Math.abs(c)<.55||Math.hypot(l,c-6.5)<1.7||Math.hypot(l+4.9,c+3.15)<1.85||Math.hypot(l+2.15,c+1.05)<1.45||Math.hypot(l-1.45,c+.7)<1.15||e.push({x:l,z:c,s:1.28+o%3*.12})}for(let o=0;o<8;o++){const a=o/7,c=i.minZ+.4+a*(i.maxZ-i.minZ)*.72,l=i.minX-.55+a*1.7;Math.abs(c)<.55||Math.abs(l)<1.6||Math.hypot(l+4.9,c+3.15)<1.85||Math.hypot(l+2.15,c+1.05)<1.45||Math.hypot(l-1.45,c+.7)<1.15||e.push({x:l,z:c+.35,s:1.12+o%2*.1})}for(let o=0;o<9;o++){const a=o/8,c=i.minZ+1.1+a*(i.maxZ-i.minZ)*.48,l=i.maxX-1.15-a*.4;Math.abs(c)<.55||Math.hypot(l+2.15,c+1.05)<1.45||Math.hypot(l-1.45,c+.7)<1.15||e.push({x:l,z:c,s:1.32+o%3*.1})}for(let o=0;o<11;o++){const a=o/10,c=i.minZ+.35+a*(i.maxZ-i.minZ)*.9;if(Math.abs(c)<.7)continue;const l=i.minX-2.05-o%2*.55;Math.hypot(l,c-6.5)<1.9||Math.hypot(l+4.9,c+3.15)<1.85||e.push({x:l,z:c+o%2*.28,s:1.52+o%3*.14})}for(let o=0;o<11;o++){const a=o/10,c=i.minZ+.55+a*(i.maxZ-i.minZ)*.86;if(Math.abs(c)<.7)continue;const l=i.maxX-.05+o%2*.45;Math.hypot(l,c-6.5)<1.9||Math.hypot(l+4.9,c+3.15)<1.85||Math.hypot(l-3.2,c-4.65)<1.7||Math.hypot(l+2.15,c+1.05)<1.45||Math.hypot(l-1.45,c+.7)<1.15||e.push({x:l,z:c-o%2*.32,s:1.46+o%3*.16})}const n=i.minZ-.78,s=(o,a)=>Math.hypot((o+6.6)/1.55,(a+13.4)/1.1)<1.05||Math.hypot((o+.05)/1.32,(a+14.2)/1)<1.05;for(let o=0;o<5;o++){const a=-(1.15+o*.74),c=n-o%2*.2;Math.abs(a)<.95||s(a,c)||e.push({x:a,z:c,s:1.2})}for(let o=0;o<5;o++){const a=1.15+o*.74,c=n-(o+1)%2*.2;Math.abs(a)<.95||s(a,c)||e.push({x:a,z:c,s:1.2})}const r=[[1.75,-6.6],[2.38,-6.48],[2.9,-6.36],[1.75,-5.96],[2.38,-5.84],[2.9,-5.72]];for(let o=0;o<r.length;o++){const a=r[o][0],c=r[o][1];Math.abs(a)<.95||Math.abs(a)<1.4&&c>-7.65&&c<-5.45||e.push({x:a,z:c,s:1.2})}return e}function d1(i,e){if(i.userData.assetDress)return;i.userData.assetDress=!0;const t=i.userData.flora||[];for(let l=0;l<t.length;l++)t[l].visible=!1;const n=i.userData.playBox||{minX:-3.4,maxX:3.4,minZ:-7.7,maxZ:7.7},s=f1(n),r=new Bt({vertexColors:!0,roughness:.86,metalness:0}),o=new Bt({vertexColors:!0,roughness:.84,metalness:0});rc(i,e.pineA,s.filter((l,u)=>u%2===0),r,l=>l*.7,!0),rc(i,e.pineB,s.filter((l,u)=>u%2===1),r,l=>l*.9,!0);const a=[{x:-7.2,z:2.4,s:1.15,y:.4},{x:-7.4,z:-2.2,s:1.15,y:.2},{x:7.3,z:2.6,s:1.15,y:Math.PI},{x:7.1,z:-1.8,s:1.15,y:Math.PI},{x:-3.6,z:8.4,s:1.05,y:Math.PI/2},{x:3.4,z:-8.2,s:1.05,y:Math.PI/2}];rc(i,e.fence,a.map(l=>({x:l.x,z:l.z,s:l.s,y:l.y})),o,(l,u)=>u.y||0);const c=i.userData.buildings;c&&c.forEach(l=>h1(l,e))}function p1(i,e){return(async()=>{const n=await Promise.all(Object.entries(e1).map(async([c,l])=>{try{const u=await i1(l);return[c,u]}catch(u){return console.warn("model failed",l,u),[c,null]}})),s=Object.fromEntries(n),r=["soldier","rifle","tank","pineA","pineB","rockA","rockB","bags","fence","fort","tower","bunker","roof","wall"];for(let c=0;c<r.length;c++)if(!s[r[c]])throw new Error(`model missing ${r[c]}`);const o=a1(s.soldier.scene,s.rifle.scene);e.useSoldier(o);const a={tower:s.tower.scene,bunker:s.bunker.scene,roof:s.roof.scene,wall:s.wall.scene,fort:s.fort.scene,bags:s.bags.scene,tank:s.tank.scene,radar:s.radar?s.radar.scene:null,pineA:Xh(Mr(s.pineA.scene,2779704,.4,1)),pineB:Xh(Mr(s.pineB.scene,2383410,.4,1)),rockA:Mr(s.rockA.scene,6972768),rockB:Mr(s.rockB.scene,7630440),fence:Mr(s.fence.scene,6968128)};return i.setDresser(c=>d1(c,a)),!0})()}const Sr=new I;function dn(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Sr.copy(e),Sr[n]=0,Sr.normalize();const l=.5*o/(o+a),u=1-Sr.angleTo(i)/c;return Math.sign(Sr[t])===1?u*l:a/(o+a)+l+l*(1-u)}class m1 extends Se{constructor(e=1,t=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(e/2,t/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new I,c=new I,l=new I(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,d=u.length/6,g=new I,x=.5/s;for(let m=0,p=0;m<u.length;m+=3,p+=2)switch(a.fromArray(u,m),c.copy(a),c.x-=Math.sign(c.x)*x,c.y-=Math.sign(c.y)*x,c.z-=Math.sign(c.z)*x,c.normalize(),u[m+0]=l.x*Math.sign(a.x)+c.x*r,u[m+1]=l.y*Math.sign(a.y)+c.y*r,u[m+2]=l.z*Math.sign(a.z)+c.z*r,h[m+0]=c.x,h[m+1]=c.y,h[m+2]=c.z,Math.floor(m/d)){case 0:g.set(1,0,0),f[p+0]=dn(g,c,"z","y",r,n),f[p+1]=1-dn(g,c,"y","z",r,t);break;case 1:g.set(-1,0,0),f[p+0]=1-dn(g,c,"z","y",r,n),f[p+1]=1-dn(g,c,"y","z",r,t);break;case 2:g.set(0,1,0),f[p+0]=1-dn(g,c,"x","z",r,e),f[p+1]=dn(g,c,"z","x",r,n);break;case 3:g.set(0,-1,0),f[p+0]=1-dn(g,c,"x","z",r,e),f[p+1]=1-dn(g,c,"z","x",r,n);break;case 4:g.set(0,0,1),f[p+0]=1-dn(g,c,"x","y",r,e),f[p+1]=1-dn(g,c,"y","x",r,t);break;case 5:g.set(0,0,-1),f[p+0]=dn(g,c,"x","y",r,e),f[p+1]=1-dn(g,c,"y","x",r,t);break}}}function Rd(i){const e=[];for(let t=0;t<i.length;t++){const n=i[t];e.push({buildingId:n.buildingId,zMin:n.z-n.rz,zMax:n.z+n.rz,xMin:n.x-n.rx,xMax:n.x+n.rx})}return e.sort((t,n)=>n.zMax-t.zMax),e}Rd(hp);const g1=[],$h=1.55;function x1(i){return Rd(i)}function _1(i,e,t=g1){t.length=0;for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++){const r=i[n],o=i[s],a=e[r.buildingId],c=e[o.buildingId];if(!a||!c||a===c)continue;const l=Math.min(r.xMax,o.xMax)-Math.max(r.xMin,o.xMin),u=Math.min(r.zMax,o.zMax)-Math.max(r.zMin,o.zMin),h=Math.max(r.zMin,o.zMin)-Math.min(r.zMax,o.zMax),f=Math.max(r.xMin,o.xMin)-Math.min(r.xMax,o.xMax);if(l>.45&&h<$h&&h>-.35){const d=r.zMax>=o.zMax?r:o,g=d===r?o:r,x=Math.max(d.xMin,g.xMin),m=Math.min(d.xMax,g.xMax);if(m-x<.4)continue;t.push({axis:"x",z:(d.zMin+g.zMax)/2,x0:x,x1:m,z0:0,z1:0,x:(x+m)/2,plusOwner:e[d.buildingId],minusOwner:e[g.buildingId]})}else if(u>.45&&f<$h&&f>-.35){const d=r.xMax>=o.xMax?r:o,g=d===r?o:r,x=Math.max(r.zMin,o.zMin),m=Math.min(r.zMax,o.zMax);if(m-x<.4)continue;const p=(d.xMin+g.xMax)/2;t.push({axis:"z",z:(x+m)/2,x0:p,x1:p,z0:x,z1:m,x:p,plusOwner:e[d.buildingId],minusOwner:e[g.buildingId]})}}return t}const v1=[{x:-3.05,z:6.15,s:1.08,color:Fe.leaf},{x:-3.25,z:4.15,s:.82,color:Fe.leafDeep},{x:3.15,z:5.55,s:1.12,color:Fe.leaf},{x:3.3,z:3.35,s:.74,color:Fe.leaf},{x:-3.15,z:1.05,s:.9,color:Fe.leafDeep},{x:3.05,z:.7,s:.78,color:Fe.leaf},{x:-3.2,z:-1.45,s:1,color:Fe.leaf},{x:3.2,z:-1.7,s:.88,color:Fe.leafDeep},{x:2.95,z:-4.55,s:.8,color:Fe.leaf},{x:-3.15,z:-5.15,s:1.05,color:Fe.leaf},{x:2.45,z:-6.85,s:.7,color:Fe.leafDeep},{x:-2.15,z:7.05,s:.76,color:Fe.leaf},{x:1.55,z:7.15,s:.64,color:Fe.leaf},{x:-1.35,z:-7.15,s:.7,color:Fe.leaf}],y1=[{x:2.55,z:6.4,s:.85},{x:2.15,z:6.15,s:.42},{x:-2.7,z:-6.5,s:.7},{x:-2.25,z:-6.15,s:.38},{x:3.4,z:-.2,s:.55},{x:3.05,z:.25,s:.32},{x:-3.45,z:2.4,s:.62},{x:-3.05,z:2.05,s:.34},{x:3.15,z:-6.2,s:.48},{x:-3.05,z:-2.4,s:.4},{x:-1.15,z:6.85,s:.36},{x:3.55,z:4.35,s:.44},{x:-2.35,z:-4.15,s:.4},{x:1.95,z:-4.55,s:.3}];function Cd(i){let e=1/0,t=-1/0,n=1/0,s=-1/0;const r=i.zones||[];for(let o=0;o<r.length;o++){const a=r[o];e=Math.min(e,a.x-a.rx),t=Math.max(t,a.x+a.rx),n=Math.min(n,a.z-a.rz),s=Math.max(s,a.z+a.rz)}return{minX:e,maxX:t,minZ:n,maxZ:s}}function Pd(i){if(i.id==="crossing")return v1;const e=i.zones||[],t=[];for(let n=0;n<e.length;n++){const s=e[n];t.push({x:s.x-s.rx+.45,z:s.z+s.rz*.35,s:.85,color:n%2?Fe.leafDeep:Fe.leaf}),t.push({x:s.x+s.rx-.4,z:s.z-s.rz*.2,s:.7,color:Fe.leaf})}return t}function Id(i){if(i.id==="crossing")return y1;const e=i.zones||[],t=[];for(let n=0;n<e.length;n++){const s=e[n];t.push({x:s.x+s.rx*.62,z:s.z-s.rz*.72,s:.5}),t.push({x:s.x-s.rx*.55,z:s.z+s.rz*.42,s:.34})}return t}function Ld(i){const e=Cd(i);return{x:0,z:0,halfWidth:Math.max(6.4,e.maxX-e.minX+.8)/2,depth:1.28}}function M1(i,e){const t=i.z,n=e.z;if(t>0&&n>0||t<0&&n<0)return null;if(t===n)return t!==0?null:{x:(i.x+e.x)/2,z:0};const s=(0-t)/(n-t);return s<0||s>1?null:{x:i.x+(e.x-i.x)*s,z:0}}function Dd(i){const e=i.nodes||{},t=i.graph||{},n=new Set,s=[],r=Object.keys(t);for(let o=0;o<r.length;o++){const a=t[r[o]]||[],c=e[r[o]];for(let l=0;l<a.length;l++){const u=a[l],h=r[o]<u?`${r[o]}|${u}`:`${u}|${r[o]}`;if(n.has(h))continue;n.add(h);const f=e[u];if(!c||!f)continue;const d=M1(c,f);if(!d)continue;const g=d.x.toFixed(2);let x=!1;for(let m=0;m<s.length;m++)if(s[m].x.toFixed(2)===g){x=!0;break}x||s.push(d)}}return s.sort((o,a)=>o.x-a.x),s}const ql=5923160,yi=.16,Jh=.05,S1=.28,b1=new I(0,1,0),Nd=new I(0,0,1),Ys=new I;function ot(i,e={}){return new Bt({color:i,roughness:.88,metalness:.04,...e})}function ra(i,e=.08){const t=i.getAttribute("position");if(!t)return i;const n=new Float32Array(t.count*3);for(let s=0;s<t.count;s++){const o=1+Math.sin(t.getX(s)*19.7+t.getY(s)*11.3+t.getZ(s)*7.9)*e;n[s*3]=o,n[s*3+1]=o,n[s*3+2]=o}return i.setAttribute("color",new Ye(n,3)),i}function oa(i){const e=i.clone();return e.vertexColors=!0,e}function Kr(i){const e=new ee(i);return e.lerp(new ee(ql),.18),e.getHex()}function jh(i){const e=new ee(i);return e.lerp(new ee(Fe.meadow),.84),e.getHex()}const Qh=new ee;new ee(9267264);new ee(3820076);const Ln=new ee,w1=new ee(3107378),E1=new ee(13807220),T1=new ee(14676912),A1=new ee(3958836),R1=new ee(10932830),C1=new ee(4028982),P1=new ee(10209370),I1=new ee(5147196);function Ud(i){return Math.sin(i*3)*.55+Math.sin(i*7+.8)*.45}function ko(i,e,t,n,s,r,o){const a=i-t,c=e-n,l=Math.hypot(a/s,c/r),u=Math.atan2(c/r,a/s),h=Math.hypot(s*Math.cos(u),r*Math.sin(u))||1;return l/(1+o*Ud(u)/h)}function Yl(i,e,t){const n=Math.hypot((e+4.9)/1.05,(t+3.15)/.85);n<1&&i.lerp(w1,1-n*.1);const s=Math.hypot((e-3.2)/1.55,(t-4.65)/1.25);s<1&&i.lerp(E1,1-s*.1);const r=Math.hypot((e+2.15)/.95,(t+1.05)/.65);r<1&&i.lerp(T1,1-r*.12);const o=Math.hypot((e-1.45)/.7,(t+.7)/.5);o<1&&i.lerp(A1,1-o*.12);const a=ko(e,t,-6.6,-13.4,1.55,1.1,.28);a<1&&i.lerp(R1,1-a*.1);const c=ko(e,t,-.05,-14.2,1.32,1,.28);c<1&&i.lerp(C1,1-c*.1);const l=ko(e,t,-4.1,-6.95,1.35,.9,.28);l<1&&i.lerp(P1,1-l*.1);const u=ko(e,t,1.85,-5.4,.9,.6,.28);u<1&&i.lerp(I1,1-u*.1)}function Mi(i,e,t,n,s,r=.07,o=0){const a=new Xi(1,24);a.rotateX(-Math.PI/2),a.scale(t,1,n);const c=a.attributes.position,l=new Float32Array(c.count*3),u=new ee(s),h=new ee(9360476),f=new ee;for(let d=0;d<c.count;d++){const g=c.getX(d),x=c.getZ(d),m=Math.min(1,Math.hypot(g/t,x/n));if(f.copy(u),m>.78&&f.lerp(h,(m-.78)/.22),l[d*3]=f.r,l[d*3+1]=f.g,l[d*3+2]=f.b,o&&(g!==0||x!==0)){const p=Math.hypot(g,x),v=Math.atan2(x/n,g/t),M=o*Ud(v);c.setX(d,g+g/p*M),c.setZ(d,x+x/p*M)}}return a.setAttribute("color",new Ye(l,3)),a.translate(i,r,e),a}function L1(){const n=new Float32Array(303);let s=1;for(let a=1;a<=5;a++){const c=a/5;for(let l=0;l<20;l++){const u=l/20*Math.PI*2,h=s*3;n[h]=Math.cos(u)*c,n[h+1]=0,n[h+2]=Math.sin(u)*c,s+=1}}const r=[];for(let a=0;a<20;a++)r.push(0,1+a,1+(a+1)%20);for(let a=0;a<4;a++)for(let c=0;c<20;c++){const l=1+a*20+c,u=1+a*20+(c+1)%20,h=l+20,f=u+20;r.push(l,u,f,l,f,h)}const o=new lt;return o.setAttribute("position",new Ye(n,3)),o.setIndex(r),o.computeVertexNormals(),o}function ef(i,e){const t=i.geometry,n=t.attributes.position;let s=t.attributes.color;s||(t.setAttribute("color",new Ye(new Float32Array(n.count*3),3)),s=t.attributes.color),Qh.setHex(e);const r=i.position.x,o=i.position.z,a=i.scale.x||1,c=i.scale.z||1,l=new ee(9360476),u=new ee(6204998),h=new ee(13037190),f=new ee(13018476);for(let d=0;d<n.count;d++){const g=n.getX(d)*a+r,x=n.getZ(d)*c+o,m=Math.sin(g*.72+.8)*Math.cos(x*.58-.3),p=Math.sin(g*1.8+x*.6);Ln.copy(l),p>.35?Ln.lerp(h,.42):p<-.4?Ln.lerp(u,.38):Ln.lerp(u,.12),Math.abs(g)<.95&&Math.abs(x)>.9&&m>.55&&Ln.lerp(f,.2),Ln.lerp(Qh,.08),Yl(Ln,g,x),s.setXYZ(d,Ln.r,Ln.g,Ln.b)}s.needsUpdate=!0}function D1(i,e,t){const s=(i.graph[e]||[])[0],r=i.nodes[e],o=s&&i.nodes[s];return!r||!o?(t.x=0,t.z=-1,t):(t.x=o.x-r.x,t.z=o.z-r.z,t)}function Fd(i){const e=ot(i,{roughness:.5,side:At}),t=new an,n=new qe(new oi(.4,.24),e),s=new qe(new oi(.4,.24),e);return s.rotation.y=Math.PI/2,n.userData.slot="flag",s.userData.slot="flag",t.add(n,s),t.userData.flutter=!0,t}function Od(i){const e=new qe(new ai(i,.04,6,24),new xt({color:Fe.metal}));return e.rotation.x=Math.PI/2,e.position.y=.1,e.visible=!1,e.name="pip",e}const tf=new I,nf=new li,N1=new I(1,1,1),sf=new Rn,U1=new Ke;function Ne(i,e,t,n,s=0,r=0,o=0){return sf.set(s,r,o),nf.setFromEuler(sf),tf.set(e,t,n),i.applyMatrix4(U1.compose(tf,nf,N1)),i}function rn(i,e){const t=$i(i);for(let s=0;s<i.length;s++)i[s].dispose();const n=new qe(t,e);return n.castShadow=!0,n.receiveShadow=!0,n}function zt(i,e,t,n,s,r,o,a,c){const l=new qe(new m1(i,e,t,n,s),c);return l.position.set(r,o,a),l.castShadow=!0,l.receiveShadow=!0,l}function F1(i){const e=new an,t=ot(Fe.concrete,{roughness:.92,metalness:0}),n=zt(2.85,.4,2.15,4,.18,0,.16,.05,t),s=zt(.36,.66,1.12,3,.14,-1.28,.48,-.02,t),r=zt(.36,.66,1.12,3,.14,1.28,.48,-.02,t),o=zt(1.02,.18,.78,4,.12,0,2.98,.02,t),a=zt(.86,.16,.64,3,.1,0,3.32,.02,t),c=rn([Ne(new Se(2.2,.2,.4),0,.2,-.98),Ne(new Se(2.15,.1,.78),0,.38,-.78,-.42,0,0),Ne(new Se(2.2,.14,.16),0,.2,1.08),Ne(new Se(.7,.36,.16),0,.42,1.12),Ne(new Se(.16,.55,.16),-.7,.5,1.05),Ne(new Se(.16,.55,.16),.7,.5,1.05),Ne(new Se(.36,.14,.22),-1.05,.2,.9),Ne(new Se(.36,.14,.22),1.05,.2,.9),Ne(new Se(.28,.12,.16),-.9,.3,-1.18),Ne(new Se(.28,.12,.16),-.48,.32,-1.22),Ne(new Se(.28,.12,.16),.02,.3,-1.18),Ne(new Se(.28,.12,.16),.5,.32,-1.22),Ne(new Se(.28,.12,.16),.96,.3,-1.16),Ne(new Se(1.7,.1,1.05),0,.72,0),Ne(new Se(.14,.16,.14),-.42,3.48,-.28),Ne(new Se(.14,.16,.14),.42,3.48,-.28),Ne(new Se(.14,.16,.14),-.42,3.48,.32),Ne(new Se(.14,.16,.14),.42,3.48,.32)],t),l=ot(Fe.sand,{roughness:.92,metalness:0}),u=zt(2.45,.32,1.75,4,.14,0,.14,.05,l),h=rn([Ne(new Se(.34,.14,.18),-.7,.28,-1.02),Ne(new Se(.34,.14,.18),0,.28,-1.02),Ne(new Se(.34,.14,.18),.7,.28,-1.02)],l),f=ot(ql,{roughness:.82,metalness:.06});f.emissive=new ee(i.glow),f.emissiveIntensity=0;const d=ot(Kr(i.main),{roughness:.48,metalness:.08}),g=rn([Ne(new Se(2.2,.16,.12),0,.86,.64),Ne(new Se(.14,.22,1.2),-1.02,.9,0),Ne(new Se(.14,.22,1.2),1.02,.9,0),Ne(new Se(1.7,.08,.1),0,.84,-.6)],f);g.userData.slot="body";const x=zt(1.92,.58,1.2,5,.26,0,.42,0,f),m=zt(1.22,2.15,.96,4,.36,0,1.85,.02,d);m.userData.slot="roof",o.material=d,a.material=d,o.userData.slot="roof",a.userData.slot="roof";const p=zt(1.38,.86,1.12,5,.22,0,2.48,.02,d);p.userData.slot="roof";const v=rn([Ne(new Se(.46,.32,.06),0,.3,-.68),Ne(new Se(.08,.14,.05),-.62,.52,-.66),Ne(new Se(.08,.14,.05),.62,.52,-.66),Ne(new Se(.5,.04,.05),0,.2,-.7),Ne(new Se(.5,.04,.05),0,.3,-.7)],ot(Fe.ink,{roughness:.8,metalness:.12})),M=rn([Ne(new cn(.028,.034,.46,6),.16,3.58,.02),Ne(new cn(.18,.18,.032,16),.16,3.84,.1,1.05,.15,.2),Ne(new ai(.15,.008,6,14),.16,3.86,.12,1.05,.15,.1),Ne(new cn(.018,.022,.7,5),.72,3.7,.05),Ne(new Se(.16,.02,.02),.72,4.02,.05)],ot(Fe.metal,{roughness:.38,metalness:.55})),_=Fd(i.flag);_.position.set(.72,3.95,.05);const P=Od(1.42),R=new qe(new ai(1.38,.045,6,28),new xt({color:i.glow,transparent:!0,opacity:.9,toneMapped:!1}));if(R.rotation.x=Math.PI/2,R.position.y=.14,R.visible=!1,e.userData.pip=P,e.userData.pulse=f,e.userData.dangerRing=R,e.add(n,s,r,o,a,c,u,h,x,g,m,p,v,M,_,P,R),i.main===Fe.player.main){m.visible=!1,o.visible=!1,a.visible=!1,p.visible=!1,M.visible=!1;const A=zt(2.15,.2,1.62,4,.1,0,1.02,.02,d);A.userData.slot="roof";const T=zt(1.7,.1,1.15,3,.06,0,1.16,.02,d);T.userData.slot="roof";const y=rn([Ne(new Se(.42,.28,.32),-1.15,.32,-.7),Ne(new Se(.42,.28,.32),-1.15,.32,.15),Ne(new Se(.42,.28,.32),-1.15,.32,.85),Ne(new Se(.42,.28,.32),1.15,.32,-.55),Ne(new Se(.42,.28,.32),1.15,.32,.25),Ne(new Se(.42,.28,.32),1.15,.32,.95),Ne(new Se(.5,.26,.36),.2,.3,1.15),Ne(new Se(.5,.26,.36),-.45,.3,1.15)],oa(l));ra(y.geometry,.08),e.add(A,T,y)}else{m.material=oa(t),ra(m.geometry,.08),m.userData.slot="",p.visible=!1,o.material=t,a.material=t,o.userData.slot="",a.userData.slot="";const A=zt(1.08,.12,.84,3,.03,0,1.08,.02,d),T=zt(1.02,.11,.78,3,.03,0,2.62,.02,d);A.userData.slot="roof",T.userData.slot="roof",e.add(A,T)}return e}function O1(i){const e=new an,t=ot(Fe.sand,{roughness:.92,metalness:0}),n=zt(1.95,.32,1.28,4,.14,0,.14,.05,t),s=rn([Ne(new Se(.52,.34,.36),-.98,.26,-.58),Ne(new Se(.52,.34,.36),.98,.26,-.58),Ne(new Se(.52,.34,.36),-.98,.26,.12),Ne(new Se(.52,.34,.36),.98,.26,.12),Ne(new Se(.52,.34,.36),-.98,.26,.74),Ne(new Se(.52,.34,.36),.98,.26,.74),Ne(new Se(.46,.3,.5),-.55,.26,.86),Ne(new Se(.46,.3,.5),.55,.26,.86),Ne(new Se(.46,.3,.5),-.18,.26,-.82),Ne(new Se(.46,.3,.5),.38,.26,-.82)],oa(t));ra(s.geometry,.08);const r=ot(Fe.concrete,{roughness:.92,metalness:0}),o=zt(1.74,.58,1.02,6,.16,0,.38,0,oa(r));ra(o.geometry,.08);const a=ot(ql,{roughness:.9,metalness:.04}),c=ot(Kr(i.main),{roughness:.84,metalness:.04}),l=zt(1.58,.22,.56,4,.08,0,.88,-.22,c);l.rotation.x=-.45;const u=zt(1.58,.22,.56,4,.08,0,.88,.22,c);u.rotation.x=.45;const h=rn([Ne(new Se(.1,.22,.9),-.84,.86,0),Ne(new Se(.1,.22,.9),.84,.86,0),Ne(new Se(1.2,.04,.1),0,1.04,.02),Ne(new Se(.12,.07,.12),-.46,1.02,.02),Ne(new Se(.12,.07,.12),.46,1.02,-.02)],a),f=rn([Ne(new Se(1.55,.08,.78),0,.98,0)],c);f.userData.slot="roof";const d=rn([Ne(new Se(.7,.045,.04),0,.18,-.48),Ne(new Se(.7,.045,.04),0,.26,-.48),Ne(new Se(.7,.045,.04),0,.34,-.48),Ne(new Se(.22,.06,.04),-.52,.48,-.46),Ne(new Se(.22,.06,.04),.52,.48,-.46)],ot(Fe.ink,{roughness:.78,metalness:.16})),g=new qe(new Se(.55,.04,.38),ot(Fe.concrete,{roughness:.84}));g.position.set(0,.1,-.86),g.receiveShadow=!0;const x=rn([Ne(new cn(.02,.024,.48,5),-.72,1.02,0),Ne(new Se(.08,.42,.08),-.78,.32,-.4),Ne(new Se(.08,.42,.08),.78,.32,-.4),Ne(new Se(.08,.42,.08),-.78,.32,.38),Ne(new Se(.08,.42,.08),.78,.32,.38)],ot(Fe.metal,{roughness:.42,metalness:.4})),m=Fd(i.flag);m.scale.setScalar(.65),m.position.set(-.72,1.22,0);const p=Od(1.12),v=new qe(new ai(1.05,.04,6,24),new xt({color:16769162,transparent:!0,opacity:.9,toneMapped:!1}));return v.rotation.x=Math.PI/2,v.position.y=.12,v.visible=!1,e.userData.pip=p,e.userData.pulse=o.material,e.userData.dangerRing=v,e.add(n,s,o,l,u,h,f,d,g,x,m,p,v),e}function z1(i){const e=new an,t=ot(3228712,{roughness:.78,metalness:.16});t.emissive=new ee(2372126),t.emissiveIntensity=.18;const n=rn([Ne(new Se(.62,.16,.95),0,.22,0),Ne(new Se(.4,.12,.42),0,.34,.06)],t),s=new qe(new Se(.36,.04,.28),ot(Kr(i.main),{roughness:.5,metalness:.16}));s.position.set(0,.42,.06),s.userData.slot="roof";const r=new qe(new Se(.05,.05,.55),ot(Fe.metal,{roughness:.35,metalness:.6}));r.position.set(0,.36,-.55);const o=ot(3815474,{roughness:.9,metalness:.12});o.emissive=new ee(2762788),o.emissiveIntensity=.12;const a=rn([Ne(new Se(.12,.14,1.02),-.36,.12,0),Ne(new Se(.12,.14,1.02),.36,.12,0)],o);return e.add(n,a,r,s),e.scale.setScalar(1),e}function B1(i,e){const t=Nn(e);i.traverse(n=>{if(!n.material||!n.userData.slot)return;const s=n.userData.slot;s==="body"?(n.material.color.setHex(Kr(t.main)),n.material.emissive&&n.material.emissive.setHex(t.glow)):s==="roof"?n.material.color.setHex(Kr(t.main)):s==="flag"&&n.material.color.setHex(t.flag)})}const Ho=new ee;function rf(i,e,t){Ho.setHex(i),e[t]=Ho.r,e[t+1]=Ho.g,e[t+2]=Ho.b}function k1(){const e=new Float32Array([-.5,-.14,0,.5,-.14,0,.5,0,0,-.5,0,0,-.5,0,0,.5,0,0,.5,.14,0,-.5,.14,0]),t=new Float32Array(24);for(let s=0;s<4;s++)rf(Fe.player.main,t,s*3);for(let s=4;s<8;s++)rf(Fe.enemy.main,t,s*3);const n=new lt;return n.setAttribute("position",new Ye(e,3)),n.setAttribute("color",new Ye(t,3)),n.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),n.rotateX(-Math.PI/2),n}function H1(){const e=new Float32Array(114),t=new Float32Array(114),n=new ee(Fe.player.main),s=new ee(Fe.enemy.main);for(let a=0;a<=18;a++){const c=a/18,l=-.5+c,u=Math.sin(c*Math.PI)*.72,h=a*6;e[h]=l,e[h+1]=.1,e[h+2]=u+.28,e[h+3]=l,e[h+4]=.1,e[h+5]=u-.24,t[h]=n.r,t[h+1]=n.g,t[h+2]=n.b,t[h+3]=s.r,t[h+4]=s.g,t[h+5]=s.b}const r=[];for(let a=0;a<18;a++){const c=a*2;r.push(c,c+1,c+2,c+1,c+3,c+2)}const o=new lt;return o.setAttribute("position",new Ye(e,3)),o.setAttribute("color",new Ye(t,3)),o.setIndex(r),o}function G1(){const t=new Float32Array(54),n=new Float32Array(54),s=new ee(4116338),r=new ee(14697784);for(let c=0;c<=8;c++){const u=-.5+c/8,h=c*6;t[h]=u,t[h+1]=-.025,t[h+2]=0,t[h+3]=u,t[h+4]=.025,t[h+5]=0,n[h]=s.r,n[h+1]=s.g,n[h+2]=s.b,n[h+3]=r.r,n[h+4]=r.g,n[h+5]=r.b}const o=[];for(let c=0;c<8;c++){const l=c*2;o.push(l,l+1,l+2,l+1,l+3,l+2)}const a=new lt;return a.setAttribute("position",new Ye(t,3)),a.setAttribute("color",new Ye(n,3)),a.setIndex(o),a.rotateX(-Math.PI/2),a.computeVertexNormals(),a}function of(i,e){const n=new Float32Array(138),s=new Float32Array(138),r=new ee(4063096),o=new ee(16730666);for(let l=0;l<=22;l++){const u=l/22,h=-.5+u,f=Math.sin(u*Math.PI)*e,d=l*6;n[d]=h,n[d+1]=f-i,n[d+2]=0,n[d+3]=h,n[d+4]=f+i,n[d+5]=0,s[d]=r.r,s[d+1]=r.g,s[d+2]=r.b,s[d+3]=o.r,s[d+4]=o.g,s[d+5]=o.b}const a=[];for(let l=0;l<22;l++){const u=l*2;a.push(u,u+1,u+2,u+1,u+3,u+2)}const c=new lt;return c.setAttribute("position",new Ye(n,3)),c.setAttribute("color",new Ye(s,3)),c.setIndex(a),c.rotateX(-Math.PI/2),c.computeVertexNormals(),c}function zi(i,e){const t=new qe(i,e);return t.visible=!1,t.renderOrder=6,t.frustumCulled=!1,t}function Dn(i,e,t,n){if(!e.length)return;const s=$i(e);for(let o=0;o<e.length;o++)e[o].dispose();const r=new qe(s,t);return r.castShadow=!n||n.cast!==!1,r.receiveShadow=!n||n.receive!==!1,i.add(r),r}function V1(i){const e=[];for(let t=0;t<i.length;t++){const n=i[t].x,s=i[t].z,r=new Se(.92,.1,2.2,8,1,28);r.translate(n,.17,s),e.push(r);for(const o of[-.4,.4]){const a=new Se(.1,.08,2.2);a.translate(n+o,.24,s),e.push(a)}}return e}function lc(i,e,t,n,s,r){s*=1;const o=Math.sin(t*12.7+n*4.3),a=.48+Math.abs(Math.sin(n*2.15+t*.37))*1.35,c=.4+Math.abs(Math.cos(t*1.85-n*.62))*.95,l=o*.32,u=new cn(.04*c*s,.08*c*s,.4*a*s,5);u.translate(t+l,.05+.18*a*s,n),i.push(u);const h=Math.abs(Math.sin(t*5.1+n*3.7)),f=h>.72?7112262:h>.48?2373160:h>.24?4874808:r,d=e[f]||(e[f]=[]),g=.05,x=new Ls(.48*c*s,.82*a*s,7);x.translate(t+l*.45,g+.46*a*s,n);const m=new Ls(.3*c*s,.62*a*s,7);m.translate(t-l*.25,g+.98*a*s,n);const p=new Ls(.13*c*s,.36*a*s,5);p.translate(t+l*.08,g+1.4*a*s,n),d.push(x,m,p)}function zd(i){i.computeVertexNormals();const e=i.attributes.normal;let t=0;for(let r=0;r<e.count;r++)t+=e.getY(r);if(t>=0)return i;const n=i.getIndex(),s=n.array;for(let r=0;r<s.length;r+=3){const o=s[r+1];s[r+1]=s[r+2],s[r+2]=o}return n.needsUpdate=!0,i.computeVertexNormals(),i}function W1(i,e){const r=new Float32Array(2307),o=new Float32Array(769*3),a=new ee(9360476),c=new ee(6204998),l=new ee(13037190),u=new ee(13018476),h=new ee;let f=1;for(let x=1;x<=16;x++){const m=x/16;for(let p=0;p<48;p++){const v=p/48*Math.PI*2,M=f*3;r[M]=Math.cos(v)*m*i*.5,r[M+1]=0,r[M+2]=Math.sin(v)*m*e*.5,f+=1}}for(let x=0;x<769;x++){const m=r[x*3],p=r[x*3+2],v=Math.hypot(m/(i*.5||1),p/(e*.5||1)),M=Math.sin(m*.7+.4)*Math.cos(p*.55),_=Math.sin(m*1.6+p*1.1);h.copy(a),_>.2?h.lerp(l,.4):_<-.25?h.lerp(c,.35):h.lerp(c,.1),Math.abs(m)<.95&&Math.abs(p)>.9&&M>.55&&h.lerp(u,.18),v>.92&&h.lerp(c,.18),Yl(h,m,p),o[x*3]=h.r,o[x*3+1]=h.g,o[x*3+2]=h.b}const d=[];for(let x=0;x<48;x++)d.push(0,1+(x+1)%48,1+x);for(let x=0;x<15;x++)for(let m=0;m<48;m++){const p=1+x*48+m,v=1+x*48+(m+1)%48,M=p+48,_=v+48;d.push(p,_,v,p,M,_)}const g=new lt;return g.setAttribute("position",new Ye(r,3)),g.setAttribute("color",new Ye(o,3)),g.setIndex(d),zd(g)}function X1(i){const t=i/2,n=[{off:-.21000000000000002,y:.11,hex:6982216,sand:!0},{off:-.1825,y:.095,hex:6455368,sand:!0},{off:-yi,y:.078,hex:5926980,sand:!0},{off:-yi*.7,y:.064,hex:3826292},{off:-yi*.28,y:.052,hex:4880528},{off:0,y:.046,hex:4091524},{off:yi*.32,y:.052,hex:3497584},{off:yi*.74,y:.064,hex:3826292},{off:yi,y:.078,hex:5926980,sand:!0},{off:yi+Jh*.45,y:.095,hex:6455368,sand:!0},{off:yi+Jh,y:.11,hex:6982216,sand:!0}],s=new Float32Array(23*n.length*3),r=new Float32Array(23*n.length*3),o=new ee;let a=0;for(let h=0;h<=22;h++){const f=-t+i*h/22,d=Math.sin(f/t*Math.PI)*S1;for(let g=0;g<n.length;g++){const x=n[g];if(s[a]=f,s[a+1]=x.y,s[a+2]=d+x.off,o.setHex(x.hex),x.sand){const m=.5+.5*Math.sin(f*4.1+x.off*6);o.lerp(new ee(5926976),m*.12)}else{const m=.5+.5*Math.sin(f*3.3+x.off*9);o.lerp(new ee(5935268),m*.22),o.lerp(new ee(2373704),(1-m)*.2)}r[a]=o.r,r[a+1]=o.g,r[a+2]=o.b,a+=3}}const c=[],l=n.length;for(let h=0;h<22;h++)for(let f=0;f<l-1;f++){const d=h*l+f;c.push(d,d+1,d+l,d+1,d+l+1,d+l)}const u=new lt;return u.setAttribute("position",new Ye(s,3)),u.setAttribute("color",new Ye(r,3)),u.setIndex(c),zd(u)}function q1(i){let e=1/0,t=-1/0,n=1/0,s=-1/0;const r=i.zones;for(let o=0;o<r.length;o++){const a=r[o];e=Math.min(e,a.x-a.rx),t=Math.max(t,a.x+a.rx),n=Math.min(n,a.z-a.rz),s=Math.max(s,a.z+a.rz)}return{minX:e,maxX:t,minZ:n,maxZ:s}}const ul=.72,Y1=.05,Bd=.155,K1=.55;function Z1(i){const e=new Set,t=[],n=i.graph||{},s=i.nodes||{},r=Object.keys(n);for(let o=0;o<r.length;o++){const a=r[o],c=n[a]||[],l=s[a];for(let u=0;u<c.length;u++){const h=c[u],f=a<h?`${a}|${h}`:`${h}|${a}`;if(e.has(f))continue;e.add(f);const d=s[h];!l||!d||t.push([{x:l.x,z:l.z},{x:d.x,z:d.z}])}}return t}function $1(i,e){for(let t=0;t<2;t++)for(let n=0;n<2;n++){const s=i[t],r=e[n];if(Math.hypot(s.x-r.x,s.z-r.z)>.04)continue;const o=i[1-t],a=e[1-n],c=s.x-o.x,l=s.z-o.z,u=a.x-r.x,h=a.z-r.z,f=Math.hypot(c,l)||1,d=Math.hypot(u,h)||1,g=c/f*(h/d)-l/f*(u/d),x=c/f*(u/d)+l/f*(h/d);if(Math.abs(g)<.08&&x>.92)return[o,a]}return null}function J1(i){const e=i.map(n=>[n[0],n[1]]);let t=0;for(;t<32;){t+=1;let n=!1;for(let s=0;s<e.length&&!n;s++)for(let r=s+1;r<e.length;r++){const o=$1(e[s],e[r]);if(o){e[s]=o,e.splice(r,1),n=!0;break}}if(!n)break}return e.map(n=>({x0:n[0].x,z0:n[0].z,x1:n[1].x,z1:n[1].z,y:Bd}))}function j1(i,e){const{x0:t,z0:n,x1:s,z1:r}=i,o=r-n;if(Math.abs(o)<1e-4)return[i];const a=[0,1],c=[e,-e];for(let u=0;u<c.length;u++){const h=(c[u]-n)/o;h>.002&&h<.998&&a.push(h)}a.sort((u,h)=>u-h);const l=[];for(let u=0;u<a.length-1;u++){const h=a[u],f=a[u+1];if(f-h<.002)continue;const d=n+o*((h+f)/2);Math.abs(d)<e-.001||l.push({x0:t+(s-t)*h,z0:n+o*h,x1:t+(s-t)*f,z1:n+o*f,y:i.y})}return l}function Q1(i,e,t){const n=t.x1-t.x0,s=t.z1-t.z0,r=n*n+s*s;if(r<1e-6)return!1;const o=((i-t.x0)*n+(e-t.z0)*s)/r;if(o<=.03||o>=.97)return!1;const a=t.x0+n*o,c=t.z0+s*o;return Math.hypot(a-i,c-e)<.06}function eb(i){const e=ul/2-.06;for(let t=0;t<i.length;t++)for(let n=0;n<i.length;n++){if(t===n)continue;const s=i[t],r=i[n];for(let o=0;o<2;o++){const a=o===0?s.x0:s.x1,c=o===0?s.z0:s.z1;if(!Q1(a,c,r))continue;const l=s.x1-s.x0,u=s.z1-s.z0,h=Math.hypot(l,u)||1,f=l/h,d=u/h;o===0?(s.x0=a+f*e,s.z0=c+d*e):(s.x1=a-f*e,s.z1=c-d*e),s.y=Bd-.02}}}function tb(i){const e=J1(Z1(i)),t=[];for(let n=0;n<e.length;n++){const s=j1(e[n],K1);for(let r=0;r<s.length;r++)t.push(s[r])}return eb(t),t}function nb(i){const e=i.attributes.position,t=new Float32Array(e.count*3),n=new ee(13807220),s=new ee(12096088),r=new ee(15255946),o=new ee;for(let a=0;a<e.count;a++){const c=e.getX(a),l=e.getZ(a),u=Math.sin(c*6.5+l*3.1)*Math.cos(l*5.2-c*2.4);u>.45?o.copy(r):u<.05?o.copy(s):(o.copy(n),o.lerp(s,.12));const h=Math.sin(l*18+c*2.4),f=Math.sin(c*16+l*.6);h>.55||f>.82?o.lerp(s,.28):h<-.35&&o.lerp(r,.45),t[a*3]=o.r,t[a*3+1]=o.g,t[a*3+2]=o.b}i.setAttribute("color",new Ye(t,3))}function af(i,e){const t=i.attributes.position,n=new Float32Array(t.count*3),s=new ee(e),r=new ee(e).multiplyScalar(.62),o=new ee(e).lerp(new ee(6969928),.4),a=new ee;for(let c=0;c<t.count;c++){const l=t.getX(c),u=t.getZ(c),h=Math.sin(u*22+l*3.2);a.copy(s),h>.35?a.lerp(o,.4):h<-.15&&a.lerp(r,.55),n[c*3]=a.r,n[c*3+1]=a.g,n[c*3+2]=a.b}i.setAttribute("color",new Ye(n,3))}function ib(i,e,t,n){const s=Math.min(t,e*.46,Math.max(.04,i*.46)),r=e/2,o=i/2,a=new ld;a.moveTo(-r+s,-o),a.lineTo(r-s,-o),a.absarc(r-s,-o+s,s,-Math.PI/2,0,!1),a.lineTo(r,o-s),a.absarc(r-s,o-s,s,0,Math.PI/2,!1),a.lineTo(-r+s,o),a.absarc(-r+s,o-s,s,Math.PI/2,Math.PI,!1),a.lineTo(-r,-o+s),a.absarc(-r+s,-o+s,s,Math.PI,Math.PI*1.5,!1);const c=new Hl(a,{depth:n,bevelEnabled:!1,curveSegments:5});return c.translate(0,0,-n/2),c.rotateX(-Math.PI/2),c}function sb(i,e,t,n,s,r,o){const a=Math.max(4,Math.round(i/.1)),c=new oi(e,i,8,a);c.rotateX(-Math.PI/2);const l=new qe(c);l.position.set((t+s)/2,o,(n+r)/2);const u=s-t,h=r-n,f=Math.hypot(u,h)||1;return Ys.set(u/f,0,h/f),l.quaternion.setFromUnitVectors(Nd,Ys),l.updateMatrix(),c.applyMatrix4(l.matrix),nb(c),c}function rb(i,e,t,n,s,r,o,a,c){const l=ib(i,e,t,n),u=new qe(l);u.position.set((s+o)/2,c,(r+a)/2);const h=o-s,f=a-r,d=Math.hypot(h,f)||1;return Ys.set(h/d,0,f/d),u.quaternion.setFromUnitVectors(Nd,Ys),u.updateMatrix(),l.applyMatrix4(u.matrix),l}function ob(i,e,t){const n=tb(e),s=[],r=[];for(let o=0;o<n.length;o++){const a=n[o],c=Math.hypot(a.x1-a.x0,a.z1-a.z0);c<.15||(s.push(sb(c,ul,a.x0,a.z0,a.x1,a.z1,a.y+.03)),r.push(rb(c,ul+.7,.42,Y1*.55,a.x0,a.z0,a.x1,a.z1,a.y-.03)))}Dn(i,s,t,{cast:!1,receive:!0}),Dn(i,r,ot(13807738,{roughness:.96,metalness:0}),{cast:!1,receive:!0})}function ab(i,e){const t=new an,n=q1(i),s=Math.max(48,(n.maxX-n.minX)*4.2),r=Math.max(64,(n.maxZ-n.minZ)*3.6),o=new qe(W1(s*.98,r*.98),ot(16777215,{vertexColors:!0,roughness:.94,metalness:0}));o.position.y=-.02,o.receiveShadow=!0,o.castShadow=!1,t.add(o),Dn(t,[Mi(-4.9,-3.15,1.05,.85,3107378),Mi(3.2,4.65,1.55,1.25,13807220),Mi(-2.15,-1.05,.95,.65,14676912),Mi(1.45,-.7,.7,.5,3958836),Mi(-6.6,-13.4,1.55,1.1,10932830,.07,.28),Mi(-.05,-14.2,1.32,1,4028982,.082,.28),Mi(-4.1,-6.95,1.35,.9,10209370,.074,.28),Mi(1.85,-5.4,.9,.6,5147196,.086,.28)],ot(16777215,{vertexColors:!0,roughness:.96,metalness:0}),{cast:!1,receive:!0});const a={};for(let X=0;X<i.buildings.length;X++)a[i.buildings[X].id]=i.buildings[X].owner;const c=new Map;for(let X=0;X<i.zones.length;X++){const U=i.zones[X],te=a[U.buildingId],me=te?jh(Nn(te).slab):Fe.meadow,le=new qe(L1(),ot(16777215,{vertexColors:!0,roughness:.96,metalness:0}));te&&(le.userData.owner=te),le.scale.set(U.rx,1,U.rz),le.position.set(U.x,.02+X*.006,U.z),le.rotation.y=0,le.receiveShadow=!0,le.castShadow=!1,ef(le,me),t.add(le),c.set(U.buildingId,le)}const l=[[-.95,2.6,.48,.32,9070660],[.85,-2.15,.42,.28,8216640],[-.7,4.7,.36,.24,9268296]],u=[],h=new ee,f=new ee(Fe.meadow);for(let X=0;X<l.length;X++){const U=l[X],te=new Xi(1,18);te.rotateX(-Math.PI/2),te.scale(U[2],1,U[3]),te.translate(U[0],.1,U[1]);const me=te.attributes.position,le=new Float32Array(me.count*3);h.setHex(U[4]);for(let ae=0;ae<me.count;ae++){const Y=Math.min(1,Math.hypot((me.getX(ae)-U[0])/U[2],(me.getZ(ae)-U[1])/U[3])),k=h.clone();Y>.86&&k.lerp(f,(Y-.86)/.14*.55),le[ae*3]=k.r,le[ae*3+1]=k.g,le[ae*3+2]=k.b}te.setAttribute("color",new Ye(le,3)),u.push(te)}Dn(t,u,ot(16777215,{vertexColors:!0,roughness:.96,metalness:0}),{cast:!1,receive:!0});const d=Ld(i),g=new qe(X1(d.halfWidth*2),ot(16777215,{vertexColors:!0,roughness:.62,metalness:.02}));g.receiveShadow=!0,g.castShadow=!1,t.add(g);const x=ot(16777215,{vertexColors:!0,roughness:.9,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});ob(t,i,x);const m=V1(Dd(i)),p=[],v=[];for(let X=0;X<m.length;X++)X%3===0?(af(m[X],4076588),p.push(m[X])):(af(m[X],2762274),v.push(m[X]));const M=ot(16777215,{vertexColors:!0,roughness:.9,metalness:.05,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),_=ot(16777215,{vertexColors:!0,roughness:.88,metalness:.06,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});Dn(t,p,M),Dn(t,v,_);const P=[],R={},A=[],T=[],y=Pd(i);for(let X=0;X<y.length;X++){const U=y[X];A.push({x:U.x,z:U.z,s:U.s}),lc(P,R,U.x,U.z,U.s,U.color)}const b=[[n.minX+.15,n.minZ+1.1,1.05],[n.minX+.35,(n.minZ+n.maxZ)*.15,.9],[n.minX+.2,n.maxZ-1.3,1.12],[n.maxX-.2,n.minZ+1.5,.95],[n.maxX-.3,(n.minZ+n.maxZ)*.2,1.08],[n.maxX-.15,n.maxZ-1.05,.86],[n.minX+1.15,n.maxZ-.2,.78],[n.maxX-1.2,n.minZ+.35,.8]];for(let X=0;X<b.length;X++){const U=b[X];A.push({x:U[0],z:U[1],s:U[2]}),lc(P,R,U[0],U[1],U[2],X%2?Fe.leafDeep:Fe.leaf)}for(let X=0;X<36;X++){const U=X/36*Math.PI*2+.4,te=9+X%6*.85,me=Math.cos(U)*te*1.2,le=Math.sin(U)*te*.95;if(Math.abs(me)<2.1&&Math.abs(le)<10||Math.abs(le)<1.7)continue;const ae=.75+X%4*.12;A.push({x:me,z:le,s:ae}),lc(P,R,me,le,ae,X%3?Fe.leaf:Fe.leafDeep)}const C=Id(i).slice(),H=[];for(let X=0;X<12;X++){const U=X/12*Math.PI*2+.15,te=10.5+X%4*1.1;C.push({x:Math.cos(U)*te*1.15,z:Math.sin(U)*te*.9,s:1.35+X%3*.45})}for(let X=0;X<C.length;X++)H.push({x:C[X].x,z:C[X].z,s:C[X].s});if(C.length){const X=new kl(.36,0),U=[];for(let me=0;me<C.length;me++){const le=C[me],ae=X.clone();ae.scale(le.s,le.s*.62,le.s*.85),ae.translate(le.x,.08,le.z),U.push(ae);const Y=X.clone();Y.scale(le.s*.45,le.s*.35,le.s*.4),Y.translate(le.x+.28*le.s,.06,le.z+.22*le.s),U.push(Y)}X.dispose();const te=Dn(t,U,ot(Fe.rock,{roughness:.9,metalness:.02}));te&&T.push(te)}const B=Dn(t,P,ot(Fe.trunk));B&&T.push(B);const W=Object.keys(R);for(let X=0;X<W.length;X++){const U=Dn(t,R[W[X]],ot(Number(W[X])));U&&T.push(U)}const j=new Map,V=[],ie=[],N={x:0,z:0};for(let X=0;X<i.buildings.length;X++){const U=i.buildings[X],te=U.kind==="hq"?F1(Nn(U.owner)):O1(Nn(U.owner)),me=i.nodes[U.node];D1(i,U.node,N),te.position.set(me.x,.06,me.z),te.rotation.y=Xr(N.x,N.z);const le=U.kind==="hq"?.92:1.47;if(te.userData.baseScale=le,te.scale.setScalar(le),te.userData.owner=U.owner,te.userData.kind=U.kind,te.traverse(ae=>{ae.userData&&ae.userData.flutter&&V.push(ae)}),U.kind==="barracks"&&U.owner==="player"){const ae=z1(Nn(U.owner));ae.scale.setScalar(1.65),ae.position.set(.95,0,-1.25),te.add(ae)}if(t.add(te),j.set(U.id,te),U.kind==="hq"){const ae=new Xi(2.6,20);ae.rotateX(-Math.PI/2),ae.scale(1.2,1,.82),ae.translate(me.x+1.05,.08,me.z+.85),ie.push(ae)}else{const ae=new Xi(1.85,14);ae.rotateX(-Math.PI/2),ae.translate(me.x+.45,.06,me.z+.15),ie.push(ae)}}const se=Dn(t,ie,new xt({color:1841170,transparent:!0,opacity:.22,depthWrite:!1}));se&&T.push(se),t.userData.flora=T,t.userData.treeSpots=A,t.userData.rockSpots=H,t.userData.playBox=n,t.userData.buildings=j;const re=new xt({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1,side:At}),K=new xt({vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,toneMapped:!1,side:At}),Re=H1(),ue=G1(),Q=[],de=[],Te=[],ve=new xt({vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1}),Le=new xt({vertexColors:!0,transparent:!0,opacity:.07,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1}),Xe=k1(),He=[],$e=[];for(let X=0;X<8;X++){const U=zi(Xe,ve);t.add(U),He.push(U);const te=zi(Xe,Le);t.add(te),$e.push(te)}for(let X=0;X<He.length;X++){const U=zi(Re,K);t.add(U),de.push(U);const te=zi(Re,re);t.add(te),Q.push(te);const me=new xt({vertexColors:!0,transparent:!0,opacity:.96,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),le=zi(ue,me);t.add(le),Te.push(le)}const ce=of(.07,1.05),pe=of(.13,1.05),L=new xt({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,depthTest:!1,side:At,toneMapped:!1}),De=new xt({vertexColors:!0,transparent:!0,opacity:.72,depthWrite:!1,depthTest:!1,blending:Wi,side:At,toneMapped:!1}),fe=[],Pe=[];for(let X=0;X<He.length;X++){const U=zi(pe,De);t.add(U),Pe.push(U);const te=zi(ce,L);t.add(te),fe.push(te)}const we=x1(i.zones),We=[],Ae={},w=new ai(1.05,.05,8,32);w.rotateX(Math.PI/2);const S=new qe(w,new xt({color:4050554}));S.position.y=.2,S.visible=!1,t.add(S);const O=new ai(.95,.035,6,28);O.rotateX(Math.PI/2);const G=new qe(O,new xt({color:16777215}));G.position.y=.18,G.visible=!1,t.add(G);const ne=new qe(new cn(.12,.12,1,8),new xt({color:16774344,transparent:!0,opacity:.95}));ne.visible=!1,ne.frustumCulled=!1,t.add(ne);const Z=new qe(new Ls(.28,.58,8),new xt({color:16774344}));Z.visible=!1,Z.frustumCulled=!1,t.add(Z);const be=new qe(new eo(.12,8,6),new xt({color:16054260}));be.visible=!1,t.add(be);function Me(X,U,te){let me,le;const ae=te&&te.nodes||i.nodes,Y=U&&ae[U];if(Y)me=Y.x,le=Y.z;else if(te&&U){const k=te.squads;for(let Ce=0;Ce<k.length;Ce++)if(k[Ce].id===U){me=k[Ce].x,le=k[Ce].z;break}}if(me===void 0){X.visible=!1;return}X.visible=!0,X.position.x=me,X.position.z=le}function Ee(X,U,te){const me=X.squads;for(let le=0;le<me.length;le++){const ae=me[le];if(ae.mode==="siege"&&ae.targetId===U&&ae.owner!==te&&ae.count>0)return!0}return!1}return{group:t,resetDrag(){ne.visible=!1,Z.visible=!1,be.visible=!1,G.visible=!1},setDrag(X,U,te,me){const le=i.nodes,ae=me||X&&le[X];if(!X||!U||!ae){ne.visible=!1,Z.visible=!1,be.visible=!1;return}const Y=U.x-ae.x,k=U.z-ae.z,Ce=Math.hypot(Y,k);if(Ce<.08?(ne.visible=!1,Z.visible=!1):(ne.visible=!0,Z.visible=!0,ne.scale.set(1.4,Ce,1.4),ne.position.set((ae.x+U.x)/2,.55,(ae.z+U.z)/2),Ys.set(Y/Ce,0,k/Ce),ne.quaternion.setFromUnitVectors(b1,Ys),Z.quaternion.copy(ne.quaternion),Z.position.set(U.x,.55,U.z)),be.visible=!0,be.position.set(U.x,.28,U.z),te&&te!==X&&le[te]){G.visible=!0;const D=le[te];G.position.x=D.x,G.position.z=D.z}else G.visible=!1},update(X,U,te){for(let Y=0;Y<U.buildings.length;Y++){const k=U.buildings[Y];Ae[k.id]=k.owner;const Ce=j.get(k.id);if(!Ce)continue;Ce.userData.owner!==k.owner&&(Ce.userData.owner=k.owner,B1(Ce,k.owner));const D=c.get(k.id);D&&D.userData.owner!==k.owner&&(D.userData.owner=k.owner,ef(D,jh(Nn(k.owner).slab)));const xe=k.upgrades;Ce.userData.pip&&(Ce.userData.pip.visible=!!(xe&&(xe.haste>0||xe.bulwark>0)));const q=k.capture>.04,oe=k.kind==="hq"&&(k.count<=0||Ee(U,k.id,k.owner))||q,ge=Ce.userData.baseScale||1;if(oe&&!e){const Je=ge*(1+.045*Math.sin(X*9));Ce.scale.setScalar(Je)}else Ce.scale.setScalar(ge);const he=Ce.userData.pulse;he&&(oe?(he.emissive=he.emissive||new ee,he.emissive.setHex(q?16742962:Nn(k.owner).glow),he.emissiveIntensity=.35+(e?0:.4*Math.sin(X*9))):(he.emissive.setHex(3817528),he.emissiveIntensity=.14));const Oe=Ce.userData.dangerRing;if(Oe&&(Oe.visible=!!oe,oe)){const Je=1+(e?0:.18*(.5+.5*Math.sin(X*6)));Oe.scale.set(Je,Je,Je),Oe.material.color.setHex(q?16769162:Nn(k.owner).glow)}}const me=_1(we,Ae,We);ve.opacity=.92;let le=-1,ae=1/0;for(let Y=0;Y<He.length;Y++){const k=me[Y];if(!k)continue;const Ce=k.axis!=="z",D=Ce?Math.max(.8,k.x1-k.x0):Math.max(.8,k.z1-k.z0),xe=Ce?k.z:(k.z0+k.z1)/2,q=Math.abs(xe)*3-D;q<ae&&(ae=q,le=Y)}for(let Y=0;Y<He.length;Y++){const k=me[Y],Ce=He[Y];if(!k){Ce.visible=!1,$e[Y].visible=!1,Q[Y].visible=!1,de[Y].visible=!1,Te[Y].visible=!1,fe[Y].visible=!1,Pe[Y].visible=!1;continue}const D=k.axis!=="z",xe=D?Math.max(.8,k.x1-k.x0):Math.max(.8,k.z1-k.z0),q=D?(k.x0+k.x1)/2:k.x,oe=D?k.z:(k.z0+k.z1)/2,ge=k.plusOwner==="player"?0:Math.PI,he=D?ge:Math.PI/2+ge;Ce.visible=!0;const Oe=1.22,Je=Math.sin(he)*Oe,ft=Math.cos(he)*Oe;Ce.position.set(q+Je,.22,oe+ft),Ce.scale.set(xe,1,1.2),Ce.rotation.y=he;const je=$e[Y];je.visible=!0,je.position.set(q+Je,.1,oe+ft),je.scale.set(xe,1,1.75),je.rotation.y=he;const Et=Q[Y],wt=de[Y];Et.visible=!0,wt.visible=!0;const Dt=9.2,Nt=q+Je*1.15,Mt=oe+ft*2.15;Et.position.set(Nt,.68,Mt),wt.position.set(Nt,.6,Mt),Et.scale.set(Dt,1,1.5),wt.scale.set(Dt*1.04,1,2.05),Et.rotation.y=he,wt.rotation.y=he,Et.visible=!1,wt.visible=!1,Ce.visible=!1,je.visible=!1,Te[Y].visible=!1;const ln=Y===le,Cn=Math.max(xe,13);if(fe[Y].visible=ln,Pe[Y].visible=ln,ln){const Hn=Math.sin(he)*1.15,yn=Math.cos(he)*1.15;fe[Y].position.set(q+Hn,.42,oe+yn),Pe[Y].position.set(q+Hn,.36,oe+yn),fe[Y].scale.set(Cn,1,1),Pe[Y].scale.set(Cn,1,1),fe[Y].rotation.y=he,Pe[Y].rotation.y=he}}for(let Y=me.length;Y<$e.length;Y++)$e[Y].visible=!1,Q[Y].visible=!1,de[Y].visible=!1,Te[Y].visible=!1,fe[Y].visible=!1,Pe[Y].visible=!1;Me(S,te,U),!e&&S.visible&&(S.rotation.y=X*.8);for(let Y=0;Y<V.length;Y++){const k=V[Y];k.rotation.y=e?0:Math.sin(X*2.2+Y)*.4}},dispose(){const X=new Set,U=new Set;t.traverse(te=>{te.geometry&&X.add(te.geometry),te.material&&U.add(te.material)});for(const te of X)te.dispose();for(const te of U)te.dispose()}}}function cb(){const i=new eo(46,20,12),e=i.attributes.position,t=new Float32Array(e.count*3),n=new ee(15003382),s=new ee(Fe.sky),r=new ee(14996654),o=new ee;for(let c=0;c<e.count;c++){const l=e.getY(c)/46,u=Of.clamp((l+.15)/1.15,0,1);u<.42?o.copy(r).lerp(s,u/.42):o.copy(s).lerp(n,(u-.42)/.58),t[c*3]=o.r,t[c*3+1]=o.g,t[c*3+2]=o.b}i.setAttribute("color",new Ye(t,3));const a=new qe(i,new xt({vertexColors:!0,side:Kt,depthWrite:!1,fog:!1,toneMapped:!1}));return a.frustumCulled=!1,a.renderOrder=-2,a}function lb(i){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;i.add(cb());const t=new oi(180,220,36,40),n=t.attributes.position,s=new Float32Array(n.count*3),r=new ee(9360476),o=new ee(6204998),a=new ee(13037190),c=new ee(13018476),l=new ee;for(let x=0;x<n.count;x++){const m=n.getX(x),p=n.getY(x),v=Math.sin(m*.07)*Math.cos(p*.055)+Math.sin(m*.16+p*.11)*.4,M=Math.sin(m*.09+1.7)*Math.cos(p*.075);l.copy(r),v>.25?l.lerp(a,.4):M<-.35?l.lerp(o,.32):l.lerp(o,.12),Math.abs(m)<1.1&&M>.7&&l.lerp(c,.18),Yl(l,m,-p),s[x*3]=l.r,s[x*3+1]=l.g,s[x*3+2]=l.b}t.setAttribute("color",new Ye(s,3));const u=new qe(t,ot(16777215,{vertexColors:!0,roughness:.96,metalness:0}));u.rotation.x=-Math.PI/2,u.position.y=-.05,u.receiveShadow=!0,i.add(u);const h=new an;i.add(h);let f=null,d=null;function g(x){f&&(h.remove(f.group),f.dispose(),f=null),f=ab(x,e),h.add(f.group),d&&d(f.group)}return{mount:g,setDresser(x){d=x,f&&d(f.group)},resetDrag(){f&&f.resetDrag()},setDrag(x,m,p,v){f&&f.setDrag(x,m,p,v)},update(x,m,p){f&&f.update(x,m,p)}}}const aa=document.getElementById("app"),pa=document.getElementById("view"),bs=document.getElementById("hint"),qi=document.getElementById("sheet"),Rs=document.getElementById("mute"),ci=document.getElementById("home"),kd=document.getElementById("upgrades"),Hd=document.getElementById("up-haste"),Gd=document.getElementById("up-bulwark"),ub=document.getElementById("score-mine"),hb=document.getElementById("score-foe"),uc=document.querySelector(".scores"),Ks=document.getElementById("coach"),ca=document.getElementById("toast"),cf=document.getElementById("sheet-time"),kt=_S(pa),Zs=lb(kt.scene),ma=dS(kt.scene),fb=p1(Zs,ma),Vd=pS(kt.scene);let hl=!0;const Kl=tS(document.getElementById("badges")),jt=tp();let Zr="crossing",$r="normal",Ve=null,St=null,la=!1,lf=0,fl=!1;function Wd(){const i=jt.muted;Rs.textContent=i?"🔇":"🔊",Rs.setAttribute("aria-pressed",i?"true":"false"),Rs.setAttribute("aria-label",i?"打開聲音":"靜音"),Rs.classList.toggle("is-muted",i)}function db(i){const e=Math.max(0,Math.floor(i||0));if(e<60)return`用咗 ${e} 秒`;const t=Math.floor(e/60),n=e%60;return`用咗 ${t} 分 ${n} 秒`}function dl(){Ks&&(Ks.hidden=!0);try{localStorage.setItem(jd,"1")}catch{}}function Xd(){Ks&&(Ks.hidden=!0)}function pb(){if(!ca)return;let i=!1;if(Ve&&Ve.status==="playing"&&ci.hidden){const e=Ve.squads;for(let t=0;t<e.length;t++){const n=e[t];if(n.owner==="enemy"&&n.count>0&&n.targetId==="player-hq"){i=!0;break}}}i!==fl&&(fl=i,ca.hidden=!i)}function Qt(i){if(ci&&!ci.hidden){bs.hidden=!0;return}if(bs.hidden=!1,!Ve||Ve.status!=="playing"){bs.textContent="再戰，或者揀地圖";return}i==="drag"?bs.textContent="鬆手就出兵":i==="selected"?bs.textContent="可以升級，或者拖去目標出兵":bs.textContent="點自己建築出兵"}function pl(i){qi.hidden=!1,qi.classList.toggle("win",i==="win"),qi.classList.toggle("lose",i==="lose"),document.getElementById("sheet-title").textContent=i==="win"?"勝利":"戰敗",document.getElementById("sheet-kicker").textContent="戰果",document.getElementById("sheet-body").textContent=i==="win"?"攻陷敵方司令部":"司令部被攻陷",cf&&(cf.textContent=db(Ve&&Ve.t)),Qt("idle")}function Jr(){qi.hidden=!0,qi.classList.remove("win","lose")}function Zl(){Ve&&(ub.textContent=String(jo(nu(Ve,"player"))),hb.textContent=String(jo(nu(Ve,"enemy"))))}function qd(){const i=kt.camera;ci&&!ci.hidden?gS(i,i.aspect):bd(i,i.aspect)}function Ji(i){ci.hidden=!i,aa&&aa.classList.toggle("is-home",!!i),uc&&(uc.hidden=!1,uc.classList.toggle("is-preview",!!i)),i&&(kd.hidden=!0),qd(),Xd()}function ji(i){Ve=Kp({mapId:Zr,difficulty:$r,status:i}),Zs.mount(Ve.map),kt.renderer.shadowMap.needsUpdate=!0,ma.setMap(Ve.map),Kl.setMap(Ve.map),St=null,la=!1,Zs.resetDrag(),fl=!1,ca&&(ca.hidden=!0),Zl(),Xd()}function ga(i,e,t){const n=i.querySelectorAll("button");for(let s=0;s<n.length;s++)n[s].classList.toggle("is-on",n[s].getAttribute(e)===t)}function Yd(){const i=St&&Ve&&Ve.status==="playing"?Yt(Ve,St):null,e=!!(i&&i.owner==="player"&&ci.hidden);kd.hidden=!e,e&&(uf(Hd,i,"haste"),uf(Gd,i,"bulwark"))}function uf(i,e,t){const n=Us(e,t),s=n.rank+1,r=n.reason==="max"?`${n.label} 滿級`:`${n.label} ${s}級 · ${n.cost}`;i.textContent!==r&&(i.textContent=r),i.disabled=!n.ok}function Kd(i){const e=St&&Yt(Ve,St);if(!e)return;const t=um(e,i);jt.sfx(t.ok?"spawn":"nope"),Yd()}function mb(i){const e=new Set;for(let t=0;t<Ve.events.length;t++)e.add(Ve.events[t].type);e.has("win")?(jt.sfx("win"),pl("win")):e.has("lose")?(jt.sfx("lose"),pl("lose")):e.has("capture")?jt.sfx("capture"):e.has("clash")&&jt.sfx("clash"),e.has("spawn")&&i>lf&&Ve.events.some(n=>n.type==="spawn"&&n.owner==="player")&&(jt.sfx("spawn"),lf=i+900)}function hf(i,e){return Ve.status!=="playing"||!i||!e||i===e?!1:(Es(Ve,i)?mf(Ve,i,e):gb(i,e)).ok?(jt.sfx("send"),St=null,Qt("idle"),!0):(jt.sfx("nope"),!1)}function gb(i,e){const t=Yt(Ve,i);return!t||t.owner!=="player"?{ok:!1}:vl(Ve,i,e,Zp(t))}mS(pa,kt.camera,()=>{const i=[];for(let e=0;e<Ve.buildings.length;e++){const t=Ve.buildings[e],s=(Ve.nodes||Ns)[t.node];i.push({id:t.id,owner:t.owner,kind:t.kind,x:s.x,z:s.z})}for(let e=0;e<Ve.squads.length;e++){const t=Ve.squads[e];t.count<=0||i.push({id:t.id,owner:t.owner,kind:"squad",x:vd(t.x,t.owner,t.mode),z:t.z})}return i},{unlock(){jt.unlock()},onTap(i){if(Ve.status!=="playing")return;if(!i){St=null,Qt("idle");return}const e=Es(Ve,i);if(e&&e.owner!=="player")return;if(St&&St!==i){const s=Es(Ve,St),r=Yt(Ve,St);if(s&&s.owner==="player"||r&&r.owner==="player"){hf(St,i);return}}const t=Yt(Ve,i);if(t&&t.owner==="player"){dl(),St=St===i?null:i,Qt(St?"selected":"idle");return}const n=Es(Ve,i);n&&n.owner==="player"&&(St=St===i?null:i,Qt(St?"selected":"idle"))},onDragStart(i){la=!0,St=i;const e=Yt(Ve,i);e&&e.owner==="player"&&dl(),Qt("drag")},onDragMove(i,e){const t=Es(Ve,St);Zs.setDrag(St,i,e,t?{x:t.x,z:t.z}:null)},onDragEnd(i,e){la=!1,Zs.resetDrag(),i&&e&&hf(i,e),Qt(St?"selected":"idle")}});Rs.addEventListener("pointerdown",i=>{i.stopPropagation()});Rs.addEventListener("click",i=>{i.stopPropagation(),jt.unlock(),jt.toggle(),Wd()});function Ci(i,e){i.addEventListener("pointerdown",t=>{t.stopPropagation()}),i.addEventListener("click",t=>{t.stopPropagation(),jt.unlock(),e()})}function pt(i){return`#${i.toString(16).padStart(6,"0")}`}function xb(i){const e=document.createElement("canvas");e.className="map-thumb";const t=280,n=188;e.width=t,e.height=n;const s=e.getContext("2d"),r=Cd(i),o=Pd(i),a=Id(i);for(let N=0;N<o.length;N++){const se=o[N];r.minX=Math.min(r.minX,se.x-.35),r.maxX=Math.max(r.maxX,se.x+.35),r.minZ=Math.min(r.minZ,se.z-.35),r.maxZ=Math.max(r.maxZ,se.z+.35)}const c=16,l=Math.max(.001,r.maxX-r.minX),u=Math.max(.001,r.maxZ-r.minZ),h=(n-c*2)/u,f=Math.min((t-c*2)/l,h*1.65),d=(r.minX+r.maxX)/2;function g(N){return{x:t/2+(N.x-d)*f,y:c+(N.z-r.minZ)*h}}s.fillStyle=pt(Fe.meadow),s.fillRect(0,0,t,n),s.fillStyle=pt(Fe.meadowDeep),s.fillRect(0,0,t,n*.16),s.fillRect(0,n*.84,t,n*.16),s.fillRect(0,0,t*.12,n),s.fillRect(t*.88,0,t*.12,n),s.globalAlpha=.55,s.fillStyle=pt(Fe.sand),s.beginPath(),s.ellipse(t*.5,n*.28,t*.08,n*.07,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(t*.46,n*.74,t*.1,n*.06,0,0,Math.PI*2),s.fill(),s.globalAlpha=1;const x={},m=i.buildings||[];for(let N=0;N<m.length;N++)x[m[N].id]=m[N].owner;const p=i.zones||[];s.globalAlpha=.22;for(let N=0;N<p.length;N++){const se=p[N],re=x[se.buildingId],K=re?Nn(re):null,Re=g(se);s.beginPath(),s.ellipse(Re.x,Re.y,Math.max(10,se.rx*f*.85),Math.max(8,se.rz*h*.9),0,0,Math.PI*2),s.fillStyle=pt(K?K.slab:Fe.meadowDeep),s.fill()}s.globalAlpha=1;const v=Ld(i),M=g({x:v.x,z:v.z}),_=Math.max(18,Math.min(n*.2,v.depth*h*.55)),P=Math.max(5,_*.35),R=_*.42;function A(N,se){s.beginPath();for(let K=0;K<=10;K++){const Re=t*K/10,ue=Math.sin(K/10*Math.PI)*P;s.lineTo(Re,M.y-N+ue+se)}for(let K=10;K>=0;K--){const Re=t*K/10,ue=Math.sin(K/10*Math.PI)*P;s.lineTo(Re,M.y+N+ue+se)}s.closePath(),s.fill()}s.fillStyle=pt(Fe.sand),A(_/2+R,0),s.fillStyle=pt(6970436),A(_/2+R*.45,0),s.fillStyle=pt(Fe.stream),A(_/2,0),s.fillStyle=pt(7255252),A(_*.22,P*.15);function T(N,se){s.fillStyle=se,s.globalAlpha=.92,s.beginPath();for(let K=0;K<=12;K++){const Re=t*K/12,ue=Math.sin(K/12*Math.PI)*16;s.lineTo(Re,M.y+ue+N)}for(let K=12;K>=0;K--){const Re=t*K/12,ue=Math.sin(K/12*Math.PI)*16;s.lineTo(Re,M.y+ue+N+4)}s.closePath(),s.fill(),s.globalAlpha=1}const y=_/2+R+10;T(y,pt(Fe.player.main)),T(-y-4,pt(Fe.enemy.main));const b=i.nodes||{},C=Math.max(11,.72*f);s.fillStyle=pt(Fe.road);function H(N,se){const re=g(N),K=g(se),Re=K.x-re.x,ue=K.y-re.y,Q=Math.hypot(Re,ue)||1,de=-ue/Q*C*.5,Te=Re/Q*C*.5;s.beginPath(),s.moveTo(re.x+de,re.y+Te),s.lineTo(K.x+de,K.y+Te),s.lineTo(K.x-de,K.y-Te),s.lineTo(re.x-de,re.y-Te),s.closePath(),s.fill()}const B=Math.max(.42,v.depth*.85),W=new Set,j=i.graph||{},V=Object.keys(j);for(let N=0;N<V.length;N++){const se=j[V[N]]||[],re=b[V[N]];for(let K=0;K<se.length;K++){const Re=se[K],ue=V[N]<Re?`${V[N]}|${Re}`:`${Re}|${V[N]}`;if(W.has(ue))continue;W.add(ue);const Q=b[Re];if(!(!re||!Q))if(re.z*Q.z<-1e-4){const de=(0-re.z)/(Q.z-re.z),Te=re.x+(Q.x-re.x)*de;H(re,{x:Te,z:re.z>0?B:-B}),H(Q,{x:Te,z:Q.z>0?B:-B})}else H(re,Q)}}const ie=Dd(i);for(let N=0;N<ie.length;N++){const se=g(ie[N]),re=Math.max(18,C+8),K=_+6;s.fillStyle=pt(Fe.bridge),s.fillRect(se.x-re/2,se.y-K/2,re,K),s.fillStyle=pt(Fe.roadEdge),s.fillRect(se.x-re/2,se.y-K/2,3,K),s.fillRect(se.x+re/2-3,se.y-K/2,3,K)}for(let N=0;N<a.length;N++){const se=g(a[N]),re=Math.max(5,a[N].s*h*.7);s.fillStyle=pt(Fe.rock),s.beginPath(),s.ellipse(se.x,se.y,re*1.25,re*.8,0,0,Math.PI*2),s.fill()}for(let N=0;N<o.length;N++){const se=o[N],re=g(se),K=Math.max(26,se.s*h*2.1),Re=K*.46;s.fillStyle=pt(Fe.trunk),s.fillRect(re.x-1.5,re.y-2,3,6),s.fillStyle=pt(se.color),s.beginPath(),s.moveTo(re.x,re.y-K),s.lineTo(re.x+Re,re.y+2),s.lineTo(re.x-Re,re.y+2),s.fill(),s.fillStyle=pt(Fe.leaf),s.beginPath(),s.moveTo(re.x,re.y-K*.72),s.lineTo(re.x+Re*.62,re.y-K*.22),s.lineTo(re.x-Re*.62,re.y-K*.22),s.fill()}for(let N=0;N<m.length;N++){const se=m[N],re=b[se.node];if(!re)continue;const K=g(re),Re=Nn(se.owner),ue=Math.max(15,Math.min(f,h)*1.35);se.kind==="hq"?(s.fillStyle=pt(Fe.sand),s.fillRect(K.x-ue*1.25,K.y-ue*.2,ue*2.5,ue*.85),s.fillStyle=pt(Fe.concrete),s.fillRect(K.x-ue*.95,K.y-ue*.55,ue*1.9,ue*.55),s.fillRect(K.x-ue*.7,K.y-ue*.95,ue*1.4,ue*.45),s.fillStyle=pt(Re.main),s.fillRect(K.x-ue*.78,K.y-ue*1.02,ue*1.56,ue*.16),s.fillStyle=pt(Fe.metal),s.fillRect(K.x-ue*.08,K.y-ue*1.7,ue*.16,ue*.75),s.beginPath(),s.arc(K.x+ue*.42,K.y-ue*1.35,Math.max(2,ue*.12),0,Math.PI*2),s.fill(),s.fillStyle=pt(Re.flag),s.fillRect(K.x-ue*.08,K.y-ue*1.85,ue*.42,ue*.22)):(s.fillStyle=pt(Fe.sand),s.fillRect(K.x-ue*1.45,K.y-ue*.05,ue*.28,ue*.4),s.fillRect(K.x+ue*1.17,K.y-ue*.05,ue*.28,ue*.4),s.fillStyle=pt(Fe.concrete),s.fillRect(K.x-ue*1.15,K.y-ue*.15,ue*2.3,ue*.45),s.fillRect(K.x-ue*1.05,K.y-ue*.42,ue*2.1,ue*.32),s.fillStyle=pt(Re.main),s.fillRect(K.x-ue*1.12,K.y-ue*.58,ue*2.24,ue*.16),s.fillStyle=pt(Fe.ink),s.fillRect(K.x-ue*.28,K.y-ue*.22,ue*.56,ue*.28),s.fillStyle=pt(Re.flag),s.fillRect(K.x-ue*.95,K.y-ue*.78,ue*.28,ue*.16))}return e}const ml=document.getElementById("maps"),gl=document.getElementById("diffs");for(let i=0;i<Ar.length;i++){const e=Ar[i],t=document.createElement("button");t.type="button",t.setAttribute("data-map",e.id),t.appendChild(xb(e));const n=document.createElement("span");n.className="map-name",n.textContent=e.name;const s=document.createElement("small");s.textContent=e.blurb,t.append(n,s),Ci(t,()=>{Zr=e.id,ga(ml,"data-map",Zr),ji("menu"),Ji(!0),Qt("idle")}),ml.appendChild(t)}const ff=["easy","normal","hard"];for(let i=0;i<ff.length;i++){const e=ff[i],t=document.createElement("button");t.type="button",t.setAttribute("data-diff",e),t.textContent=fc[e].label,Ci(t,()=>{$r=e,ga(gl,"data-diff",$r)}),gl.appendChild(t)}Ci(document.getElementById("start"),()=>{ji("playing"),Jr(),Ji(!1),Qt("idle")});function Zd(){Jr(),Ji(!0),ji("menu"),Qt("idle")}Ci(document.getElementById("home-btn"),Zd);Ci(document.getElementById("sheet-map"),Zd);Ci(Hd,()=>Kd("haste"));Ci(Gd,()=>Kd("bulwark"));Ks&&Ci(Ks,dl);document.getElementById("retry").addEventListener("click",()=>{jt.unlock(),ji("playing"),Jr(),Ji(!1),Qt("idle")});function $d(){kt.resize(),qd()}const _b=new ResizeObserver($d);_b.observe(aa);$d();Wd();ga(gl,"data-diff",$r);ga(ml,"data-map",Zr);ji("menu");Ji(!0);Qt("idle");Zl();let df=performance.now(),Go=0,hc=performance.now(),pf=0;function vb(i){if(pf+=1,pf<90){Go=0,hc=i;return}Go+=1;const e=i-hc;if(e<1600)return;const t=Go*1e3/e;if(Go=0,hc=i,!(t>=40)){if(hl){hl=!1,Vd.setEnabled(!1);return}kt.shadowsOn&&kt.setShadows(!1)}}function Jd(i){const e=Math.min(.05,(i-df)/1e3);df=i,Ve&&Ve.status==="playing"&&(xf(Ve,e),mb(i));const t=i/1e3,n=ci&&!ci.hidden||qi&&!qi.hidden,s=document.getElementById("badges");s&&(s.hidden=n),Ve&&(Zs.update(t,Ve,la?null:St),ma.update(Ve),Vd.update(e,Ve),n||Kl.update(Ve,kt.camera,pa),Yd(),Zl(),pb()),kt.renderer.render(kt.scene,kt.camera),vb(i),requestAnimationFrame(Jd)}requestAnimationFrame(Jd);window.__BL={whenAssets:fb,get state(){return Ve},pick:"screen-44",send(i,e){return vl(Ve,i,e)},retarget(i,e){return mf(Ve,i,e)},step(i){xf(Ve,i),(Ve.status==="win"||Ve.status==="lose")&&pl(Ve.status)},point(i){return Kl.clientPoint(i,kt.camera,pa)},facingDot(){return ma.facingDot()},quality(){return{shadows:kt.shadowsOn,fx:hl,software:kt.software}},setShadows(i){kt.setShadows(!!i)},start(i,e){i&&(Zr=i),e&&($r=e),ji("playing"),Jr(),Ji(!1),Qt("idle")},reset(){ji("playing"),Jr(),Ji(!1),Qt("idle")}};window.addEventListener("error",i=>{const e=document.createElement("pre");e.id="boot-error",e.textContent=i.message||"畫面起動失敗",aa.appendChild(e)});
