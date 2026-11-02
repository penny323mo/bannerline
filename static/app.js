(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const dl="bannerline.mute",Ah="bannerline.coach";function Rh(n){return n==="1"}function Ch(n){return n?"1":"0"}const pl=[523.25,587.33,659.25,523.25,783.99,659.25,587.33,392];function Ph(){let n=!1;try{n=Rh(localStorage.getItem(dl))}catch{n=!1}let t=null,e=null,i=null,r=0,s=!1,o=0;function a(){if(t)return;const f=window.AudioContext||window.webkitAudioContext;f&&(t=new f,e=t.createGain(),e.gain.value=n?0:1,e.connect(t.destination))}function l(f,d,g,_,m){if(!t||!e)return;const p=t.createOscillator(),y=t.createGain();p.type=_,p.frequency.setValueAtTime(f,d),y.gain.setValueAtTime(1e-4,d),y.gain.exponentialRampToValueAtTime(Math.max(2e-4,m),d+.02),y.gain.exponentialRampToValueAtTime(1e-4,d+g),p.connect(y),y.connect(e),p.start(d),p.stop(d+g+.02)}function c(){i&&(clearInterval(i),i=null)}function u(){if(!t||n||i)return;const f=()=>{if(!t||n)return;const d=t.currentTime+.02,g=pl[r%pl.length];l(g,d,.34,"triangle",.035),l(g/2,d,.4,"sine",.02),r+=1};f(),i=setInterval(f,520)}function h(){try{localStorage.setItem(dl,Ch(n))}catch{}}return{get muted(){return n},unlock(){a(),t&&(t.state==="suspended"&&t.resume(),s=!0,n||u())},toggle(){return a(),n=!n,h(),t&&e&&(e.gain.setTargetAtTime(n?0:1,t.currentTime,.03),t.state==="suspended"&&t.resume()),n?c():s&&u(),n},sfx(f){if(n||(a(),!t||t.state!=="running"))return;const d=t.currentTime+.01;if(f==="send")l(440,d,.08,"triangle",.05),l(660,d+.07,.12,"triangle",.05);else if(f==="nope")l(180,d,.12,"sine",.04);else if(f==="clash"){const g=performance.now();if(g-o<120)return;o=g,l(210,d,.06,"square",.03),l(160,d+.04,.07,"triangle",.03)}else f==="capture"?(l(523,d,.1,"triangle",.05),l(659,d+.09,.1,"triangle",.05),l(784,d+.18,.16,"triangle",.05)):f==="spawn"?l(880,d,.05,"sine",.02):f==="win"?(l(523,d,.12,"triangle",.06),l(659,d+.12,.12,"triangle",.06),l(784,d+.24,.22,"triangle",.07)):f==="lose"&&(l(392,d,.16,"sine",.05),l(311,d+.14,.18,"sine",.05),l(247,d+.3,.28,"triangle",.05))}}}const Lh="crossing",Dh="對岸",Ih="一條大路，兩邊兵營",Uh="balanced",Nh={"player-hq":{x:0,z:6.55},"player-bar":{x:1.72,z:3.05},"player-road":{x:0,z:3.05},mid:{x:0,z:0},"enemy-road":{x:0,z:-3.05},"enemy-bar":{x:-1.72,z:-3.05},"enemy-hq":{x:0,z:-6.55}},Fh={"player-hq":["player-road"],"player-bar":["player-road"],"player-road":["player-hq","player-bar","mid"],mid:["player-road","enemy-road"],"enemy-road":["mid","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},Oh=[{buildingId:"player-hq",x:0,z:5.75,rx:3.15,rz:1.95},{buildingId:"player-bar",x:.12,z:2.25,rx:3.25,rz:1.6},{buildingId:"enemy-bar",x:-.12,z:-2.25,rx:3.25,rz:1.6},{buildingId:"enemy-hq",x:0,z:-5.75,rx:3.15,rz:1.95}],zh=["player-hq","player-road","mid","enemy-road","enemy-hq"],Bh=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.1},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:30,cap:54,regen:2.25},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:18,cap:48,regen:1.7},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:44,cap:52,regen:0}],er={id:Lh,name:Dh,blurb:Ih,personality:Uh,nodes:Nh,graph:Fh,zones:Oh,road:zh,buildings:Bh},qi=er.nodes,La=er.graph,kh=er.zones;er.road;const iu={haste:{id:"haste",label:"加速",cost:8,step:4,max:2},bulwark:{id:"bulwark",label:"加固",cost:8,step:4,max:2}};function Hh(n,t){const e=n&&n.upgrades,i=e&&e[t];return i>0?i:0}function Gh(n,t){const e=iu[n];return e?e.cost+Math.max(0,t)*e.step:1/0}function Yi(n,t){const e=iu[t];if(!e||!n)return{ok:!1,reason:"bad",cost:0,label:""};const i=Hh(n,t);if(i>=e.max)return{ok:!1,reason:"max",cost:0,label:e.label,rank:i};const r=Gh(t,i);return n.count-r<1?{ok:!1,reason:"troops",cost:r,label:e.label,rank:i}:{ok:!0,cost:r,label:e.label,rank:i}}function Vh(n){return!n||n.owner!=="player"||n.kind!=="hq"&&n.kind!=="barracks"?!1:Yi(n,"haste").ok||Yi(n,"bulwark").ok}function Wh(n,t){const e=Yi(n,t);if(!e.ok)return e;n.upgrades||(n.upgrades={haste:0,bulwark:0}),n.count-=e.cost,n.bank=0;const i=e.rank+1;if(n.upgrades[t]=i,t==="haste"){const r=n.baseRegen>0?n.baseRegen:.6;n.regen=r*1.55**i}else t==="bulwark"&&(n.cap+=10);return{ok:!0,cost:e.cost,rank:i,label:e.label}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Da="170",Xh=0,ml=1,qh=2,ru=1,su=2,En=3,Wn=0,Pe=1,Ue=2,Gn=0,Hi=1,gl=2,_l=3,xl=4,Yh=5,ii=100,Zh=101,Kh=102,$h=103,Jh=104,jh=200,Qh=201,tf=202,ef=203,Co=204,Po=205,nf=206,rf=207,sf=208,of=209,af=210,lf=211,cf=212,uf=213,hf=214,Lo=0,Do=1,Io=2,Zi=3,Uo=4,No=5,Fo=6,Oo=7,ou=0,ff=1,df=2,Vn=0,pf=1,mf=2,gf=3,au=4,_f=5,xf=6,vf=7,lu=300,Ki=301,$i=302,zo=303,Bo=304,Fs=306,ko=1e3,si=1001,Ho=1002,Ve=1003,Mf=1004,Wr=1005,hn=1006,Ws=1007,oi=1008,An=1009,cu=1010,uu=1011,Pr=1012,Ia=1013,ci=1014,fn=1015,kr=1016,Ua=1017,Na=1018,Ji=1020,hu=35902,fu=1021,du=1022,on=1023,pu=1024,mu=1025,Gi=1026,ji=1027,Fa=1028,Oa=1029,gu=1030,za=1031,Ba=1033,Ms=33776,ys=33777,Ss=33778,Es=33779,Go=35840,Vo=35841,Wo=35842,Xo=35843,qo=36196,Yo=37492,Zo=37496,Ko=37808,$o=37809,Jo=37810,jo=37811,Qo=37812,ta=37813,ea=37814,na=37815,ia=37816,ra=37817,sa=37818,oa=37819,aa=37820,la=37821,bs=36492,ca=36494,ua=36495,_u=36283,ha=36284,fa=36285,da=36286,yf=3200,Sf=3201,xu=0,Ef=1,Hn="",He="srgb",nr="srgb-linear",Os="linear",se="srgb",xi=7680,vl=519,bf=512,wf=513,Tf=514,vu=515,Af=516,Rf=517,Cf=518,Pf=519,Ml=35044,yl="300 es",wn=2e3,Ts=2001;class ir{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sl=1234567;const Er=Math.PI/180,Lr=180/Math.PI;function mi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[i&255]+Te[i>>8&255]+Te[i>>16&255]+Te[i>>24&255]).toLowerCase()}function Ee(n,t,e){return Math.max(t,Math.min(e,n))}function ka(n,t){return(n%t+t)%t}function Lf(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Df(n,t,e){return n!==t?(e-n)/(t-n):0}function br(n,t,e){return(1-e)*n+e*t}function If(n,t,e,i){return br(n,t,1-Math.exp(-e*i))}function Uf(n,t=1){return t-Math.abs(ka(n,t*2)-t)}function Nf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Ff(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Of(n,t){return n+Math.floor(Math.random()*(t-n+1))}function zf(n,t){return n+Math.random()*(t-n)}function Bf(n){return n*(.5-Math.random())}function kf(n){n!==void 0&&(Sl=n);let t=Sl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Hf(n){return n*Er}function Gf(n){return n*Lr}function Vf(n){return(n&n-1)===0&&n!==0}function Wf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Xf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function qf(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),u=o((t+i)/2),h=s((t-i)/2),f=o((t-i)/2),d=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Fi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Yf={DEG2RAD:Er,RAD2DEG:Lr,generateUUID:mi,clamp:Ee,euclideanModulo:ka,mapLinear:Lf,inverseLerp:Df,lerp:br,damp:If,pingpong:Uf,smoothstep:Nf,smootherstep:Ff,randInt:Of,randFloat:zf,randFloatSpread:Bf,seededRandom:kf,degToRad:Hf,radToDeg:Gf,isPowerOfTwo:Vf,ceilPowerOfTwo:Wf,floorPowerOfTwo:Xf,setQuaternionFromProperEuler:qf,normalize:Re,denormalize:Fi};class mt{constructor(t=0,e=0){mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,i,r,s,o,a,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],y=r[1],M=r[4],x=r[7],C=r[2],R=r[5],A=r[8];return s[0]=o*_+a*y+l*C,s[3]=o*m+a*M+l*R,s[6]=o*p+a*x+l*A,s[1]=c*_+u*y+h*C,s[4]=c*m+u*M+h*R,s[7]=c*p+u*x+h*A,s[2]=f*_+d*y+g*C,s[5]=f*m+d*M+g*R,s[8]=f*p+d*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=e*h+i*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*c-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=f*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xs.makeScale(t,e)),this}rotate(t){return this.premultiply(Xs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Xs=new Xt;function Mu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function As(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Zf(){const n=As("canvas");return n.style.display="block",n}const El={};function yr(n){n in El||(El[n]=!0,console.warn(n))}function Kf(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function $f(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Jf(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jt={enabled:!0,workingColorSpace:nr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(n.r=Tn(n.r),n.g=Tn(n.g),n.b=Tn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(n.r=Vi(n.r),n.g=Vi(n.g),n.b=Vi(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Hn?Os:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Tn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Vi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const bl=[.64,.33,.3,.6,.15,.06],wl=[.2126,.7152,.0722],Tl=[.3127,.329],Al=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rl=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[nr]:{primaries:bl,whitePoint:Tl,transfer:Os,toXYZ:Al,fromXYZ:Rl,luminanceCoefficients:wl,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:bl,whitePoint:Tl,transfer:se,toXYZ:Al,fromXYZ:Rl,luminanceCoefficients:wl,outputColorSpaceConfig:{drawingBufferColorSpace:He}}});let vi;class jf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{vi===void 0&&(vi=As("canvas")),vi.width=t.width,vi.height=t.height;const i=vi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=As("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Tn(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Tn(e[i]/255)*255):e[i]=Tn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Qf=0;class yu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=mi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(qs(r[o].image)):s.push(qs(r[o]))}else s=qs(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function qs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let td=0;class Le extends ir{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,i=si,r=si,s=hn,o=oi,a=on,l=An,c=Le.DEFAULT_ANISOTROPY,u=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=mi(),this.name="",this.source=new yu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ko:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case Ho:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ko:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case Ho:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=lu;Le.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,i=0,r=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(d+1)/2,C=(p+1)/2,R=(u+f)/4,A=(h+_)/4,P=(g+m)/4;return M>x&&M>C?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=R/i,s=A/i):x>C?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=R/r,s=P/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=P/s),this.set(i,r,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ed extends ir{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Le(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new yu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ui extends ed{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Su extends Le{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class nd extends Le{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*_,y=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const C=Math.sqrt(M),R=Math.atan2(C,p*y);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const x=a*y;if(l=l*m+f*x,c=c*m+d*x,u=u*m+g*x,h=h*m+_*x,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-a*d,t[e+2]=c*g+u*d+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,i=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),h=2*(s*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ys.copy(this).projectOnVector(t),this.sub(Ys)}reflect(t){return this.sub(Ys.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ys=new D,Cl=new rr;class gi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,en):en.fromBufferAttribute(s,o),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(t.matrixWorld),this.union(Xr)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(hr),qr.subVectors(this.max,hr),Mi.subVectors(t.a,hr),yi.subVectors(t.b,hr),Si.subVectors(t.c,hr),Dn.subVectors(yi,Mi),In.subVectors(Si,yi),Zn.subVectors(Mi,Si);let e=[0,-Dn.z,Dn.y,0,-In.z,In.y,0,-Zn.z,Zn.y,Dn.z,0,-Dn.x,In.z,0,-In.x,Zn.z,0,-Zn.x,-Dn.y,Dn.x,0,-In.y,In.x,0,-Zn.y,Zn.x,0];return!Zs(e,Mi,yi,Si,qr)||(e=[1,0,0,0,1,0,0,0,1],!Zs(e,Mi,yi,Si,qr))?!1:(Yr.crossVectors(Dn,In),e=[Yr.x,Yr.y,Yr.z],Zs(e,Mi,yi,Si,qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new D,new D,new D,new D,new D,new D,new D,new D],en=new D,Xr=new gi,Mi=new D,yi=new D,Si=new D,Dn=new D,In=new D,Zn=new D,hr=new D,qr=new D,Yr=new D,Kn=new D;function Zs(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Kn.fromArray(n,s);const a=r.x*Math.abs(Kn.x)+r.y*Math.abs(Kn.y)+r.z*Math.abs(Kn.z),l=t.dot(Kn),c=e.dot(Kn),u=i.dot(Kn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const id=new gi,fr=new D,Ks=new D;class sr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):id.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fr.subVectors(t,this.center);const e=fr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(fr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ks.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fr.copy(t.center).add(Ks)),this.expandByPoint(fr.copy(t.center).sub(Ks))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new D,$s=new D,Zr=new D,Un=new D,Js=new D,Kr=new D,js=new D;class Ha{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){$s.copy(t).add(e).multiplyScalar(.5),Zr.copy(e).sub(t).normalize(),Un.copy(this.origin).sub($s);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Zr),a=Un.dot(this.direction),l=-Un.dot(Zr),c=Un.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy($s).addScaledVector(Zr,f),d}intersectSphere(t,e){xn.subVectors(t.center,this.origin);const i=xn.dot(this.direction),r=xn.dot(xn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,i,r,s){Js.subVectors(e,t),Kr.subVectors(i,t),js.crossVectors(Js,Kr);let o=this.direction.dot(js),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,t);const l=a*this.direction.dot(Kr.crossVectors(Un,Kr));if(l<0)return null;const c=a*this.direction.dot(Js.cross(Un));if(c<0||l+c>o)return null;const u=-a*Un.dot(js);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,i,r,s,o,a,l,c,u,h,f,d,g,_,m){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,h,f,d,g,_,m)}set(t,e,i,r,s,o,a,l,c,u,h,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Ei.setFromMatrixColumn(t,0).length(),s=1/Ei.setFromMatrixColumn(t,1).length(),o=1/Ei.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(rd,t,sd)}lookAt(t,e,i){const r=this.elements;return ze.subVectors(t,e),ze.lengthSq()===0&&(ze.z=1),ze.normalize(),Nn.crossVectors(i,ze),Nn.lengthSq()===0&&(Math.abs(i.z)===1?ze.x+=1e-4:ze.z+=1e-4,ze.normalize(),Nn.crossVectors(i,ze)),Nn.normalize(),$r.crossVectors(ze,Nn),r[0]=Nn.x,r[4]=$r.x,r[8]=ze.x,r[1]=Nn.y,r[5]=$r.y,r[9]=ze.y,r[2]=Nn.z,r[6]=$r.z,r[10]=ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],y=i[3],M=i[7],x=i[11],C=i[15],R=r[0],A=r[4],P=r[8],E=r[12],v=r[1],L=r[5],O=r[9],z=r[13],H=r[2],Y=r[6],V=r[10],rt=r[14],I=r[3],j=r[7],Q=r[11],W=r[15];return s[0]=o*R+a*v+l*H+c*I,s[4]=o*A+a*L+l*Y+c*j,s[8]=o*P+a*O+l*V+c*Q,s[12]=o*E+a*z+l*rt+c*W,s[1]=u*R+h*v+f*H+d*I,s[5]=u*A+h*L+f*Y+d*j,s[9]=u*P+h*O+f*V+d*Q,s[13]=u*E+h*z+f*rt+d*W,s[2]=g*R+_*v+m*H+p*I,s[6]=g*A+_*L+m*Y+p*j,s[10]=g*P+_*O+m*V+p*Q,s[14]=g*E+_*z+m*rt+p*W,s[3]=y*R+M*v+x*H+C*I,s[7]=y*A+M*L+x*Y+C*j,s[11]=y*P+M*O+x*V+C*Q,s[15]=y*E+M*z+x*rt+C*W,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*d-i*l*d)+_*(+e*l*d-e*c*f+s*o*f-r*o*d+r*c*u-s*l*u)+m*(+e*c*h-e*a*d-s*o*h+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-e*l*h+e*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=h*m*c-_*f*c+_*l*d-a*m*d-h*l*p+a*f*p,M=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,x=u*_*c-g*h*c+g*a*d-o*_*d-u*a*p+o*h*p,C=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,R=e*y+i*M+r*x+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=y*A,t[1]=(_*f*s-h*m*s-_*r*d+i*m*d+h*r*p-i*f*p)*A,t[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*A,t[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*d-i*l*d)*A,t[4]=M*A,t[5]=(u*m*s-g*f*s+g*r*d-e*m*d-u*r*p+e*f*p)*A,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*p-e*l*p)*A,t[7]=(o*f*s-u*l*s+u*r*c-e*f*c-o*r*d+e*l*d)*A,t[8]=x*A,t[9]=(g*h*s-u*_*s-g*i*d+e*_*d+u*i*p-e*h*p)*A,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*p+e*a*p)*A,t[11]=(u*a*s-o*h*s-u*i*c+e*h*c+o*i*d-e*a*d)*A,t[12]=C*A,t[13]=(u*_*r-g*h*r+g*i*f-e*_*f-u*i*m+e*h*m)*A,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*m-e*a*m)*A,t[15]=(o*h*r-u*a*r+u*i*l-e*h*l-o*i*f+e*a*f)*A,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,_=o*u,m=o*h,p=a*h,y=l*c,M=l*u,x=l*h,C=i.x,R=i.y,A=i.z;return r[0]=(1-(_+p))*C,r[1]=(d+x)*C,r[2]=(g-M)*C,r[3]=0,r[4]=(d-x)*R,r[5]=(1-(f+p))*R,r[6]=(m+y)*R,r[7]=0,r[8]=(g+M)*A,r[9]=(m-y)*A,r[10]=(1-(f+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=Ei.set(r[0],r[1],r[2]).length();const o=Ei.set(r[4],r[5],r[6]).length(),a=Ei.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],nn.copy(this);const c=1/s,u=1/o,h=1/a;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=u,nn.elements[5]*=u,nn.elements[6]*=u,nn.elements[8]*=h,nn.elements[9]*=h,nn.elements[10]*=h,e.setFromRotationMatrix(nn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=wn){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),h=(e+t)/(e-t),f=(i+r)/(i-r);let d,g;if(a===wn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ts)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=wn){const l=this.elements,c=1/(e-t),u=1/(i-r),h=1/(o-s),f=(e+t)*c,d=(i+r)*u;let g,_;if(a===wn)g=(o+s)*h,_=-2*h;else if(a===Ts)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ei=new D,nn=new ie,rd=new D(0,0,0),sd=new D(1,1,1),Nn=new D,$r=new D,ze=new D,Pl=new ie,Ll=new rr;class an{constructor(t=0,e=0,i=0,r=an.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Pl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Ga{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let od=0;const Dl=new D,bi=new rr,vn=new ie,Jr=new D,dr=new D,ad=new D,ld=new rr,Il=new D(1,0,0),Ul=new D(0,1,0),Nl=new D(0,0,1),Fl={type:"added"},cd={type:"removed"},wi={type:"childadded",child:null},Qs={type:"childremoved",child:null};class xe extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new D,e=new an,i=new rr,r=new D(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ie},normalMatrix:{value:new Xt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.multiply(bi),this}rotateOnWorldAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.premultiply(bi),this}rotateX(t){return this.rotateOnAxis(Il,t)}rotateY(t){return this.rotateOnAxis(Ul,t)}rotateZ(t){return this.rotateOnAxis(Nl,t)}translateOnAxis(t,e){return Dl.copy(t).applyQuaternion(this.quaternion),this.position.add(Dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Il,t)}translateY(t){return this.translateOnAxis(Ul,t)}translateZ(t){return this.translateOnAxis(Nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Jr.copy(t):Jr.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(dr,Jr,this.up):vn.lookAt(Jr,dr,this.up),this.quaternion.setFromRotationMatrix(vn),r&&(vn.extractRotation(r.matrixWorld),bi.setFromRotationMatrix(vn),this.quaternion.premultiply(bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Fl),wi.child=t,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cd),Qs.child=t,this.dispatchEvent(Qs),Qs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Fl),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,t,ad),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,ld,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}xe.DEFAULT_UP=new D(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new D,Mn=new D,to=new D,yn=new D,Ti=new D,Ai=new D,Ol=new D,eo=new D,no=new D,io=new D,ro=new me,so=new me,oo=new me;class sn{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),rn.subVectors(t,e),r.cross(rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){rn.subVectors(r,e),Mn.subVectors(i,e),to.subVectors(t,e);const o=rn.dot(rn),a=rn.dot(Mn),l=rn.dot(to),c=Mn.dot(Mn),u=Mn.dot(to),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,yn.x),l.addScaledVector(o,yn.y),l.addScaledVector(a,yn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return ro.setScalar(0),so.setScalar(0),oo.setScalar(0),ro.fromBufferAttribute(t,e),so.fromBufferAttribute(t,i),oo.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ro,s.x),o.addScaledVector(so,s.y),o.addScaledVector(oo,s.z),o}static isFrontFacing(t,e,i,r){return rn.subVectors(i,e),Mn.subVectors(t,e),rn.cross(Mn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),rn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return sn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;Ti.subVectors(r,i),Ai.subVectors(s,i),eo.subVectors(t,i);const l=Ti.dot(eo),c=Ai.dot(eo);if(l<=0&&c<=0)return e.copy(i);no.subVectors(t,r);const u=Ti.dot(no),h=Ai.dot(no);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Ti,o);io.subVectors(t,s);const d=Ti.dot(io),g=Ai.dot(io);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Ai,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Ol.subVectors(s,r),a=(h-u)/(h-u+(d-g)),e.copy(r).addScaledVector(Ol,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(i).addScaledVector(Ti,o).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},jr={h:0,s:0,l:0};function ao(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class dt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Jt.workingColorSpace){if(t=ka(t,1),e=Ee(e,0,1),i=Ee(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=ao(o,s,t+1/3),this.g=ao(o,s,t),this.b=ao(o,s,t-1/3)}return Jt.toWorkingColorSpace(this,r),this}setStyle(t,e=He){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const i=Eu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Jt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(Ee(Ae.r*255,0,255))*65536+Math.round(Ee(Ae.g*255,0,255))*256+Math.round(Ee(Ae.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Ae.copy(this),e);const i=Ae.r,r=Ae.g,s=Ae.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=He){Jt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,i=Ae.g,r=Ae.b;return t!==He?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Fn),this.setHSL(Fn.h+t,Fn.s+e,Fn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fn),t.getHSL(jr);const i=br(Fn.h,jr.h,e),r=br(Fn.s,jr.s,e),s=br(Fn.l,jr.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new dt;dt.NAMES=Eu;let ud=0;class or extends ir{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=mi(),this.name="",this.blending=Hi,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Co,this.blendDst=Po,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(i.blending=this.blending),this.side!==Wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Co&&(i.blendSrc=this.blendSrc),this.blendDst!==Po&&(i.blendDst=this.blendDst),this.blendEquation!==ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Se extends or{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new D,Qr=new mt;class re{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ml,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Qr.fromBufferAttribute(this,e),Qr.applyMatrix3(t),this.setXY(e,Qr.x,Qr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Fi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ml&&(t.usage=this.usage),t}}class bu extends re{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class wu extends re{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class he extends re{constructor(t,e,i){super(new Float32Array(t),e,i)}}let hd=0;const Xe=new ie,lo=new xe,Ri=new D,Be=new gi,pr=new gi,ye=new D;class _e extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mu(t)?wu:bu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,i){return Xe.makeTranslation(t,e,i),this.applyMatrix4(Xe),this}scale(t,e,i){return Xe.makeScale(t,e,i),this.applyMatrix4(Xe),this}lookAt(t){return lo.lookAt(t),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new he(i,3))}else{for(let i=0,r=e.count;i<r;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Be.setFromBufferAttribute(s),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Be.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Be.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Be.min),this.boundingBox.expandByPoint(Be.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(Be.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];pr.setFromBufferAttribute(a),this.morphTargetsRelative?(ye.addVectors(Be.min,pr.min),Be.expandByPoint(ye),ye.addVectors(Be.max,pr.max),Be.expandByPoint(ye)):(Be.expandByPoint(pr.min),Be.expandByPoint(pr.max))}Be.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)ye.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(ye));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ye.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(t,c),ye.add(Ri)),r=Math.max(r,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new re(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new D,l[P]=new D;const c=new D,u=new D,h=new D,f=new mt,d=new mt,g=new mt,_=new D,m=new D;function p(P,E,v){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,E),h.fromBufferAttribute(i,v),f.fromBufferAttribute(s,P),d.fromBufferAttribute(s,E),g.fromBufferAttribute(s,v),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(L),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),a[P].add(_),a[E].add(_),a[v].add(_),l[P].add(m),l[E].add(m),l[v].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,E=y.length;P<E;++P){const v=y[P],L=v.start,O=v.count;for(let z=L,H=L+O;z<H;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new D,x=new D,C=new D,R=new D;function A(P){C.fromBufferAttribute(r,P),R.copy(C);const E=a[P];M.copy(E),M.sub(C.multiplyScalar(C.dot(E))).normalize(),x.crossVectors(R,E);const L=x.dot(l[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,L)}for(let P=0,E=y.length;P<E;++P){const v=y[P],L=v.start,O=v.count;for(let z=L,H=L+O;z<H;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new re(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new D,s=new D,o=new D,a=new D,l=new D,c=new D,u=new D,h=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new re(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zl=new ie,$n=new Ha,ts=new sr,Bl=new D,es=new D,ns=new D,is=new D,co=new D,rs=new D,kl=new D,ss=new D;class $t extends xe{constructor(t=new _e,e=new Se){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){rs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(co.fromBufferAttribute(h,t),o?rs.addScaledVector(co,u):rs.addScaledVector(co.sub(e),u))}e.add(rs)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(s),$n.copy(t.ray).recast(t.near),!(ts.containsPoint($n.origin)===!1&&($n.intersectSphere(ts,Bl)===null||$n.origin.distanceToSquared(Bl)>(t.far-t.near)**2))&&(zl.copy(s).invert(),$n.copy(t.ray).applyMatrix4(zl),!(i.boundingBox!==null&&$n.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,$n)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=y,C=M;x<C;x+=3){const R=a.getX(x),A=a.getX(x+1),P=a.getX(x+2);r=os(this,p,t,i,c,u,h,R,A,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const y=a.getX(m),M=a.getX(m+1),x=a.getX(m+2);r=os(this,o,t,i,c,u,h,y,M,x),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=y,C=M;x<C;x+=3){const R=x,A=x+1,P=x+2;r=os(this,p,t,i,c,u,h,R,A,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const y=m,M=m+1,x=m+2;r=os(this,o,t,i,c,u,h,y,M,x),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function fd(n,t,e,i,r,s,o,a){let l;if(t.side===Pe?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===Wn,a),l===null)return null;ss.copy(a),ss.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ss);return c<e.near||c>e.far?null:{distance:c,point:ss.clone(),object:n}}function os(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,es),n.getVertexPosition(l,ns),n.getVertexPosition(c,is);const u=fd(n,t,e,i,es,ns,is,kl);if(u){const h=new D;sn.getBarycoord(kl,es,ns,is,h),r&&(u.uv=sn.getInterpolatedAttribute(r,a,l,c,h,new mt)),s&&(u.uv1=sn.getInterpolatedAttribute(s,a,l,c,h,new mt)),o&&(u.normal=sn.getInterpolatedAttribute(o,a,l,c,h,new D),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new D,materialIndex:0};sn.getNormal(es,ns,is,f.normal),u.face=f,u.barycoord=h}return u}class _t extends _e{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(h,2));function g(_,m,p,y,M,x,C,R,A,P,E){const v=x/A,L=C/P,O=x/2,z=C/2,H=R/2,Y=A+1,V=P+1;let rt=0,I=0;const j=new D;for(let Q=0;Q<V;Q++){const W=Q*L-z;for(let vt=0;vt<Y;vt++){const at=vt*v-O;j[_]=at*y,j[m]=W*M,j[p]=H,c.push(j.x,j.y,j.z),j[_]=0,j[m]=0,j[p]=R>0?1:-1,u.push(j.x,j.y,j.z),h.push(vt/A),h.push(1-Q/P),rt+=1}}for(let Q=0;Q<P;Q++)for(let W=0;W<A;W++){const vt=f+W+Y*Q,at=f+W+Y*(Q+1),$=f+(W+1)+Y*(Q+1),lt=f+(W+1)+Y*Q;l.push(vt,at,lt),l.push(at,$,lt),I+=6}a.addGroup(d,I,E),d+=I,f+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _t(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qi(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Ce(n){const t={};for(let e=0;e<n.length;e++){const i=Qi(n[e]);for(const r in i)t[r]=i[r]}return t}function dd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Tu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const pd={clone:Qi,merge:Ce};var md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends or{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=md,this.fragmentShader=gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=dd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Au extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const On=new D,Hl=new mt,Gl=new mt;class $e extends Au{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Lr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(On.x,On.y).multiplyScalar(-t/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(On.x,On.y).multiplyScalar(-t/On.z)}getViewSize(t,e){return this.getViewBounds(t,Hl,Gl),e.subVectors(Gl,Hl)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Er*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ci=-90,Pi=1;class _d extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $e(Ci,Pi,t,e);r.layers=this.layers,this.add(r);const s=new $e(Ci,Pi,t,e);s.layers=this.layers,this.add(s);const o=new $e(Ci,Pi,t,e);o.layers=this.layers,this.add(o);const a=new $e(Ci,Pi,t,e);a.layers=this.layers,this.add(a);const l=new $e(Ci,Pi,t,e);l.layers=this.layers,this.add(l);const c=new $e(Ci,Pi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===wn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ts)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ru extends Le{constructor(t,e,i,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Ki,super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class xd extends ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ru(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:hn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new _t(5,5,5),s=new Xn({name:"CubemapFromEquirect",uniforms:Qi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pe,blending:Gn});s.uniforms.tEquirect.value=e;const o=new $t(r,s),a=e.minFilter;return e.minFilter===oi&&(e.minFilter=hn),new _d(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}const uo=new D,vd=new D,Md=new Xt;class Bn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=uo.subVectors(i,e).cross(vd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(uo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Md.getNormalMatrix(t),r=this.coplanarPoint(uo).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new sr,as=new D;class Va{constructor(t=new Bn,e=new Bn,i=new Bn,r=new Bn,s=new Bn,o=new Bn){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=wn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],y=r[13],M=r[14],x=r[15];if(i[0].setComponents(l-s,f-c,m-d,x-p).normalize(),i[1].setComponents(l+s,f+c,m+d,x+p).normalize(),i[2].setComponents(l+o,f+u,m+g,x+y).normalize(),i[3].setComponents(l-o,f-u,m-g,x-y).normalize(),i[4].setComponents(l-a,f-h,m-_,x-M).normalize(),e===wn)i[5].setComponents(l+a,f+h,m+_,x+M).normalize();else if(e===Ts)i[5].setComponents(a,h,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(as.x=r.normal.x>0?t.max.x:t.min.x,as.y=r.normal.y>0?t.max.y:t.min.y,as.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(as)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cu(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function yd(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class hi extends _e{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const y=p*f-o;for(let M=0;M<c;M++){const x=M*h-s;g.push(x,-y,0),_.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const M=y+c*p,x=y+c*(p+1),C=y+1+c*(p+1),R=y+1+c*p;d.push(M,x,R),d.push(x,C,R)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ed=`#ifdef USE_ALPHAHASH
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
#endif`,bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pd=`#ifdef USE_BATCHING
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
#endif`,Ld=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ud=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
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
#endif`,Fd=`#ifdef USE_BUMPMAP
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
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xd=`#define PI 3.141592653589793
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
} // validated`,qd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yd=`vec3 transformedNormal = objectNormal;
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
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tp=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cp=`#ifdef USE_GRADIENTMAP
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
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
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
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_p=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
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
#endif`,Mp=`struct PhysicalMaterial {
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
}`,yp=`
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ep=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lp=`#if defined( USE_POINTS_UV )
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
#endif`,Dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
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
#endif`,zp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wp=`#ifdef USE_NORMALMAP
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
#endif`,Xp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$p=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,om=`float getShadowMask() {
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
}`,am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lm=`#ifdef USE_SKINNING
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
#endif`,cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,um=`#ifdef USE_SKINNING
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
#endif`,hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mm=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#ifdef USE_TRANSMISSION
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sm=`uniform sampler2D t2D;
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`#include <common>
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
}`,Rm=`#if DEPTH_PACKING == 3200
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
}`,Cm=`#define DISTANCE
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
}`,Pm=`#define DISTANCE
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`uniform float scale;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Fm=`uniform vec3 diffuse;
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
}`,Om=`#define LAMBERT
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
}`,zm=`#define LAMBERT
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
}`,Bm=`#define MATCAP
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
}`,km=`#define MATCAP
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
}`,Hm=`#define NORMAL
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
}`,Gm=`#define NORMAL
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
}`,Vm=`#define PHONG
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
}`,Wm=`#define PHONG
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define STANDARD
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
}`,Ym=`#define TOON
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
}`,Zm=`#define TOON
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
}`,Km=`uniform float size;
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
}`,$m=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,jm=`uniform vec3 color;
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
}`,Qm=`uniform float rotation;
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
}`,t0=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:Sd,alphahash_pars_fragment:Ed,alphamap_fragment:bd,alphamap_pars_fragment:wd,alphatest_fragment:Td,alphatest_pars_fragment:Ad,aomap_fragment:Rd,aomap_pars_fragment:Cd,batching_pars_vertex:Pd,batching_vertex:Ld,begin_vertex:Dd,beginnormal_vertex:Id,bsdfs:Ud,iridescence_fragment:Nd,bumpmap_pars_fragment:Fd,clipping_planes_fragment:Od,clipping_planes_pars_fragment:zd,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:kd,color_fragment:Hd,color_pars_fragment:Gd,color_pars_vertex:Vd,color_vertex:Wd,common:Xd,cube_uv_reflection_fragment:qd,defaultnormal_vertex:Yd,displacementmap_pars_vertex:Zd,displacementmap_vertex:Kd,emissivemap_fragment:$d,emissivemap_pars_fragment:Jd,colorspace_fragment:jd,colorspace_pars_fragment:Qd,envmap_fragment:tp,envmap_common_pars_fragment:ep,envmap_pars_fragment:np,envmap_pars_vertex:ip,envmap_physical_pars_fragment:pp,envmap_vertex:rp,fog_vertex:sp,fog_pars_vertex:op,fog_fragment:ap,fog_pars_fragment:lp,gradientmap_pars_fragment:cp,lightmap_pars_fragment:up,lights_lambert_fragment:hp,lights_lambert_pars_fragment:fp,lights_pars_begin:dp,lights_toon_fragment:mp,lights_toon_pars_fragment:gp,lights_phong_fragment:_p,lights_phong_pars_fragment:xp,lights_physical_fragment:vp,lights_physical_pars_fragment:Mp,lights_fragment_begin:yp,lights_fragment_maps:Sp,lights_fragment_end:Ep,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:wp,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ap,map_fragment:Rp,map_pars_fragment:Cp,map_particle_fragment:Pp,map_particle_pars_fragment:Lp,metalnessmap_fragment:Dp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Up,morphcolor_vertex:Np,morphnormal_vertex:Fp,morphtarget_pars_vertex:Op,morphtarget_vertex:zp,normal_fragment_begin:Bp,normal_fragment_maps:kp,normal_pars_fragment:Hp,normal_pars_vertex:Gp,normal_vertex:Vp,normalmap_pars_fragment:Wp,clearcoat_normal_fragment_begin:Xp,clearcoat_normal_fragment_maps:qp,clearcoat_pars_fragment:Yp,iridescence_pars_fragment:Zp,opaque_fragment:Kp,packing:$p,premultiplied_alpha_fragment:Jp,project_vertex:jp,dithering_fragment:Qp,dithering_pars_fragment:tm,roughnessmap_fragment:em,roughnessmap_pars_fragment:nm,shadowmap_pars_fragment:im,shadowmap_pars_vertex:rm,shadowmap_vertex:sm,shadowmask_pars_fragment:om,skinbase_vertex:am,skinning_pars_vertex:lm,skinning_vertex:cm,skinnormal_vertex:um,specularmap_fragment:hm,specularmap_pars_fragment:fm,tonemapping_fragment:dm,tonemapping_pars_fragment:pm,transmission_fragment:mm,transmission_pars_fragment:gm,uv_pars_fragment:_m,uv_pars_vertex:xm,uv_vertex:vm,worldpos_vertex:Mm,background_vert:ym,background_frag:Sm,backgroundCube_vert:Em,backgroundCube_frag:bm,cube_vert:wm,cube_frag:Tm,depth_vert:Am,depth_frag:Rm,distanceRGBA_vert:Cm,distanceRGBA_frag:Pm,equirect_vert:Lm,equirect_frag:Dm,linedashed_vert:Im,linedashed_frag:Um,meshbasic_vert:Nm,meshbasic_frag:Fm,meshlambert_vert:Om,meshlambert_frag:zm,meshmatcap_vert:Bm,meshmatcap_frag:km,meshnormal_vert:Hm,meshnormal_frag:Gm,meshphong_vert:Vm,meshphong_frag:Wm,meshphysical_vert:Xm,meshphysical_frag:qm,meshtoon_vert:Ym,meshtoon_frag:Zm,points_vert:Km,points_frag:$m,shadow_vert:Jm,shadow_frag:jm,sprite_vert:Qm,sprite_frag:t0},Mt={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},un={basic:{uniforms:Ce([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ce([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new dt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ce([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ce([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ce([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new dt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ce([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ce([Mt.points,Mt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ce([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ce([Mt.common,Mt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ce([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ce([Mt.sprite,Mt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ce([Mt.common,Mt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ce([Mt.lights,Mt.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};un.physical={uniforms:Ce([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const ls={r:0,b:0,g:0},jn=new an,e0=new ie;function n0(n,t,e,i,r,s,o){const a=new dt(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?e:t).get(M)),M}function _(y){let M=!1;const x=g(y);x===null?p(a,l):x&&x.isColor&&(p(x,1),M=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===Fs)?(u===void 0&&(u=new $t(new _t(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Qi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),jn.copy(M.backgroundRotation),jn.x*=-1,jn.y*=-1,jn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(jn)),u.material.toneMapped=Jt.getTransfer(x.colorSpace)!==se,(h!==x||f!==x.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,d=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new $t(new hi(2,2),new Xn({name:"BackgroundMaterial",uniforms:Qi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(x.colorSpace)!==se,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,M){y.getRGB(ls,Tu(n)),i.buffers.color.setClear(ls.r,ls.g,ls.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m}}function i0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(v,L,O,z,H){let Y=!1;const V=h(z,O,L);s!==V&&(s=V,c(s.object)),Y=d(v,z,O,H),Y&&g(v,z,O,H),H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(v,L,O,z),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function h(v,L,O){const z=O.wireframe===!0;let H=i[v.id];H===void 0&&(H={},i[v.id]=H);let Y=H[L.id];Y===void 0&&(Y={},H[L.id]=Y);let V=Y[z];return V===void 0&&(V=f(l()),Y[z]=V),V}function f(v){const L=[],O=[],z=[];for(let H=0;H<e;H++)L[H]=0,O[H]=0,z[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:z,object:v,attributes:{},index:null}}function d(v,L,O,z){const H=s.attributes,Y=L.attributes;let V=0;const rt=O.getAttributes();for(const I in rt)if(rt[I].location>=0){const Q=H[I];let W=Y[I];if(W===void 0&&(I==="instanceMatrix"&&v.instanceMatrix&&(W=v.instanceMatrix),I==="instanceColor"&&v.instanceColor&&(W=v.instanceColor)),Q===void 0||Q.attribute!==W||W&&Q.data!==W.data)return!0;V++}return s.attributesNum!==V||s.index!==z}function g(v,L,O,z){const H={},Y=L.attributes;let V=0;const rt=O.getAttributes();for(const I in rt)if(rt[I].location>=0){let Q=Y[I];Q===void 0&&(I==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),I==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor));const W={};W.attribute=Q,Q&&Q.data&&(W.data=Q.data),H[I]=W,V++}s.attributes=H,s.attributesNum=V,s.index=z}function _(){const v=s.newAttributes;for(let L=0,O=v.length;L<O;L++)v[L]=0}function m(v){p(v,0)}function p(v,L){const O=s.newAttributes,z=s.enabledAttributes,H=s.attributeDivisors;O[v]=1,z[v]===0&&(n.enableVertexAttribArray(v),z[v]=1),H[v]!==L&&(n.vertexAttribDivisor(v,L),H[v]=L)}function y(){const v=s.newAttributes,L=s.enabledAttributes;for(let O=0,z=L.length;O<z;O++)L[O]!==v[O]&&(n.disableVertexAttribArray(O),L[O]=0)}function M(v,L,O,z,H,Y,V){V===!0?n.vertexAttribIPointer(v,L,O,H,Y):n.vertexAttribPointer(v,L,O,z,H,Y)}function x(v,L,O,z){_();const H=z.attributes,Y=O.getAttributes(),V=L.defaultAttributeValues;for(const rt in Y){const I=Y[rt];if(I.location>=0){let j=H[rt];if(j===void 0&&(rt==="instanceMatrix"&&v.instanceMatrix&&(j=v.instanceMatrix),rt==="instanceColor"&&v.instanceColor&&(j=v.instanceColor)),j!==void 0){const Q=j.normalized,W=j.itemSize,vt=t.get(j);if(vt===void 0)continue;const at=vt.buffer,$=vt.type,lt=vt.bytesPerElement,St=$===n.INT||$===n.UNSIGNED_INT||j.gpuType===Ia;if(j.isInterleavedBufferAttribute){const ut=j.data,Pt=ut.stride,Ft=j.offset;if(ut.isInstancedInterleavedBuffer){for(let Ot=0;Ot<I.locationSize;Ot++)p(I.location+Ot,ut.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Ot=0;Ot<I.locationSize;Ot++)m(I.location+Ot);n.bindBuffer(n.ARRAY_BUFFER,at);for(let Ot=0;Ot<I.locationSize;Ot++)M(I.location+Ot,W/I.locationSize,$,Q,Pt*lt,(Ft+W/I.locationSize*Ot)*lt,St)}else{if(j.isInstancedBufferAttribute){for(let ut=0;ut<I.locationSize;ut++)p(I.location+ut,j.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ut=0;ut<I.locationSize;ut++)m(I.location+ut);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ut=0;ut<I.locationSize;ut++)M(I.location+ut,W/I.locationSize,$,Q,W*lt,W/I.locationSize*ut*lt,St)}}else if(V!==void 0){const Q=V[rt];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(I.location,Q);break;case 3:n.vertexAttrib3fv(I.location,Q);break;case 4:n.vertexAttrib4fv(I.location,Q);break;default:n.vertexAttrib1fv(I.location,Q)}}}}y()}function C(){P();for(const v in i){const L=i[v];for(const O in L){const z=L[O];for(const H in z)u(z[H].object),delete z[H];delete L[O]}delete i[v]}}function R(v){if(i[v.id]===void 0)return;const L=i[v.id];for(const O in L){const z=L[O];for(const H in z)u(z[H].object),delete z[H];delete L[O]}delete i[v.id]}function A(v){for(const L in i){const O=i[L];if(O[v.id]===void 0)continue;const z=O[v.id];for(const H in z)u(z[H].object),delete z[H];delete O[v.id]}}function P(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function r0(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,i,1)}function l(c,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function s0(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==on&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===kr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==An&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==fn&&!P)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:C,maxSamples:R}}function o0(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Bn,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||r;return r=f,i=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,M=y*4;let x=p.clippingState||null;l.value=x,x=u(g,f,M,d);for(let C=0;C!==M;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=d;M!==_;++M,x+=4)o.copy(h[M]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function a0(n){let t=new WeakMap;function e(o,a){return a===zo?o.mapping=Ki:a===Bo&&(o.mapping=$i),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===zo||a===Bo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new xd(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Pu extends Au{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Oi=4,Vl=[.125,.215,.35,.446,.526,.582],ri=20,ho=new Pu,Wl=new dt;let fo=null,po=0,mo=0,go=!1;const ni=(1+Math.sqrt(5))/2,Li=1/ni,Xl=[new D(-ni,Li,0),new D(ni,Li,0),new D(-Li,0,ni),new D(Li,0,ni),new D(0,ni,-Li),new D(0,ni,Li),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class ql{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fo,po,mo),this._renderer.xr.enabled=go,t.scissorTest=!1,cs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ki||t.mapping===$i?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:kr,format:on,colorSpace:nr,depthBuffer:!1},r=Yl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yl(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=l0(s)),this._blurMaterial=c0(s,t,e)}return r}_compileMaterial(t){const e=new $t(this._lodPlanes[0],t);this._renderer.compile(e,ho)}_sceneToCubeUV(t,e,i,r){const a=new $e(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Wl),u.toneMapping=Vn,u.autoClear=!1;const d=new Se({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1}),g=new $t(new _t,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Wl),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const M=this._cubeSize;cs(r,y*M,p>2?M:0,M,M),u.setRenderTarget(r),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Ki||t.mapping===$i;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new $t(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;cs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ho)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Xl[(r-s-1)%Xl.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new $t(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ri-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):ri;m>ri&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ri}`);const p=[];let y=0;for(let A=0;A<ri;++A){const P=A/_,E=Math.exp(-P*P/2);p.push(E),A===0?y+=E:A<m&&(y+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const x=this._sizeLods[r],C=3*x*(r>M-Oi?r-M+Oi:0),R=4*(this._cubeSize-x);cs(e,C,R,3*x,2*x),l.setRenderTarget(e),l.render(h,ho)}}function l0(n){const t=[],e=[],i=[];let r=n;const s=n-Oi+1+Vl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-Oi?l=Vl[o-n+Oi-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*d),M=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let R=0;R<d;R++){const A=R%3*2/3-1,P=R>2?0:-1,E=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];y.set(E,_*g*R),M.set(f,m*g*R);const v=[R,R,R,R,R,R];x.set(v,p*g*R)}const C=new _e;C.setAttribute("position",new re(y,_)),C.setAttribute("uv",new re(M,m)),C.setAttribute("faceIndex",new re(x,p)),t.push(C),r>Oi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Yl(n,t,e){const i=new ui(n,t,e);return i.texture.mapping=Fs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cs(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function c0(n,t,e){const i=new Float32Array(ri),r=new D(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wa(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Zl(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wa(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Kl(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Wa(){return`

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
	`}function u0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===zo||l===Bo,u=l===Ki||l===$i;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ql(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new ql(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function h0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&yr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function f0(n,t,e,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let M=0,x=y.length;M<x;M+=3){const C=y[M+0],R=y[M+1],A=y[M+2];f.push(C,R,R,A,A,C)}}else if(g!==void 0){const y=g.array;_=g.version;for(let M=0,x=y.length/3-1;M<x;M+=3){const C=M+0,R=M+1,A=M+2;f.push(C,R,R,A,A,C)}}else return;const m=new(Mu(f)?wu:bu)(f,1);m.version=_;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function d0(n,t,e){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*o),e.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,f*o,g),e.update(d,i,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function h(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,f,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*_[y];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function p0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function m0(n,t,e){const i=new WeakMap,r=new me;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let v=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",v)};var d=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,R=1;C>t.maxTextureSize&&(R=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const A=new Float32Array(C*R*4*h),P=new Su(A,C,R,h);P.type=fn,P.needsUpdate=!0;const E=x*4;for(let L=0;L<h;L++){const O=p[L],z=y[L],H=M[L],Y=C*R*4*L;for(let V=0;V<O.count;V++){const rt=V*E;g===!0&&(r.fromBufferAttribute(O,V),A[Y+rt+0]=r.x,A[Y+rt+1]=r.y,A[Y+rt+2]=r.z,A[Y+rt+3]=0),_===!0&&(r.fromBufferAttribute(z,V),A[Y+rt+4]=r.x,A[Y+rt+5]=r.y,A[Y+rt+6]=r.z,A[Y+rt+7]=0),m===!0&&(r.fromBufferAttribute(H,V),A[Y+rt+8]=r.x,A[Y+rt+9]=r.y,A[Y+rt+10]=r.z,A[Y+rt+11]=H.itemSize===4?r.w:1)}}f={count:h,texture:P,size:new mt(C,R)},i.set(a,f),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function g0(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Lu extends Le{constructor(t,e,i,r,s,o,a,l,c,u=Gi){if(u!==Gi&&u!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Gi&&(i=ci),i===void 0&&u===ji&&(i=Ji),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ve,this.minFilter=l!==void 0?l:Ve,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Du=new Le,$l=new Lu(1,1),Iu=new Su,Uu=new nd,Nu=new Ru,Jl=[],jl=[],Ql=new Float32Array(16),tc=new Float32Array(9),ec=new Float32Array(4);function ar(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Jl[r];if(s===void 0&&(s=new Float32Array(r),Jl[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function ve(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Me(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zs(n,t){let e=jl[t];e===void 0&&(e=new Int32Array(t),jl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function _0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function x0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;n.uniform2fv(this.addr,t),Me(e,t)}}function v0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;n.uniform3fv(this.addr,t),Me(e,t)}}function M0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;n.uniform4fv(this.addr,t),Me(e,t)}}function y0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,i))return;ec.set(i),n.uniformMatrix2fv(this.addr,!1,ec),Me(e,i)}}function S0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,i))return;tc.set(i),n.uniformMatrix3fv(this.addr,!1,tc),Me(e,i)}}function E0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,i))return;Ql.set(i),n.uniformMatrix4fv(this.addr,!1,Ql),Me(e,i)}}function b0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function w0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;n.uniform2iv(this.addr,t),Me(e,t)}}function T0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;n.uniform3iv(this.addr,t),Me(e,t)}}function A0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;n.uniform4iv(this.addr,t),Me(e,t)}}function R0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function C0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;n.uniform2uiv(this.addr,t),Me(e,t)}}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;n.uniform3uiv(this.addr,t),Me(e,t)}}function L0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;n.uniform4uiv(this.addr,t),Me(e,t)}}function D0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?($l.compareFunction=vu,s=$l):s=Du,e.setTexture2D(t||s,r)}function I0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Uu,r)}function U0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Nu,r)}function N0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Iu,r)}function F0(n){switch(n){case 5126:return _0;case 35664:return x0;case 35665:return v0;case 35666:return M0;case 35674:return y0;case 35675:return S0;case 35676:return E0;case 5124:case 35670:return b0;case 35667:case 35671:return w0;case 35668:case 35672:return T0;case 35669:case 35673:return A0;case 5125:return R0;case 36294:return C0;case 36295:return P0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return I0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return N0}}function O0(n,t){n.uniform1fv(this.addr,t)}function z0(n,t){const e=ar(t,this.size,2);n.uniform2fv(this.addr,e)}function B0(n,t){const e=ar(t,this.size,3);n.uniform3fv(this.addr,e)}function k0(n,t){const e=ar(t,this.size,4);n.uniform4fv(this.addr,e)}function H0(n,t){const e=ar(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function G0(n,t){const e=ar(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function V0(n,t){const e=ar(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function W0(n,t){n.uniform1iv(this.addr,t)}function X0(n,t){n.uniform2iv(this.addr,t)}function q0(n,t){n.uniform3iv(this.addr,t)}function Y0(n,t){n.uniform4iv(this.addr,t)}function Z0(n,t){n.uniform1uiv(this.addr,t)}function K0(n,t){n.uniform2uiv(this.addr,t)}function $0(n,t){n.uniform3uiv(this.addr,t)}function J0(n,t){n.uniform4uiv(this.addr,t)}function j0(n,t,e){const i=this.cache,r=t.length,s=zs(e,r);ve(i,s)||(n.uniform1iv(this.addr,s),Me(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Du,s[o])}function Q0(n,t,e){const i=this.cache,r=t.length,s=zs(e,r);ve(i,s)||(n.uniform1iv(this.addr,s),Me(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Uu,s[o])}function tg(n,t,e){const i=this.cache,r=t.length,s=zs(e,r);ve(i,s)||(n.uniform1iv(this.addr,s),Me(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Nu,s[o])}function eg(n,t,e){const i=this.cache,r=t.length,s=zs(e,r);ve(i,s)||(n.uniform1iv(this.addr,s),Me(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Iu,s[o])}function ng(n){switch(n){case 5126:return O0;case 35664:return z0;case 35665:return B0;case 35666:return k0;case 35674:return H0;case 35675:return G0;case 35676:return V0;case 5124:case 35670:return W0;case 35667:case 35671:return X0;case 35668:case 35672:return q0;case 35669:case 35673:return Y0;case 5125:return Z0;case 36294:return K0;case 36295:return $0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return eg}}class ig{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=F0(e.type)}}class rg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ng(e.type)}}class sg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const _o=/(\w+)(\])?(\[|\.)?/g;function nc(n,t){n.seq.push(t),n.map[t.id]=t}function og(n,t,e){const i=n.name,r=i.length;for(_o.lastIndex=0;;){const s=_o.exec(i),o=_o.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){nc(e,c===void 0?new ig(a,n,t):new rg(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new sg(a),nc(e,h)),e=h}}}class ws{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);og(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function ic(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const ag=37297;let lg=0;function cg(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const rc=new Xt;function ug(n){Jt._getMatrix(rc,Jt.workingColorSpace,n);const t=`mat3( ${rc.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(n)){case Os:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function sc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+cg(n.getShaderSource(t),o)}else return r}function hg(n,t){const e=ug(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function fg(n,t){let e;switch(t){case pf:e="Linear";break;case mf:e="Reinhard";break;case gf:e="Cineon";break;case au:e="ACESFilmic";break;case xf:e="AgX";break;case vf:e="Neutral";break;case _f:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const us=new D;function dg(){Jt.getLuminanceCoefficients(us);const n=us.x.toFixed(4),t=us.y.toFixed(4),e=us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function mg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function gg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Sr(n){return n!==""}function oc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ac(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _g=/^[ \t]*#include +<([\w\d./]+)>/gm;function pa(n){return n.replace(_g,vg)}const xg=new Map;function vg(n,t){let e=Yt[t];if(e===void 0){const i=xg.get(t);if(i!==void 0)e=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return pa(e)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(n){return n.replace(Mg,yg)}function yg(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Sg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ru?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===su?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===En&&(t="SHADOWMAP_TYPE_VSM"),t}function Eg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ki:case $i:t="ENVMAP_TYPE_CUBE";break;case Fs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case $i:t="ENVMAP_MODE_REFRACTION";break}return t}function wg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ou:t="ENVMAP_BLENDING_MULTIPLY";break;case ff:t="ENVMAP_BLENDING_MIX";break;case df:t="ENVMAP_BLENDING_ADD";break}return t}function Tg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Ag(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Sg(e),c=Eg(e),u=bg(e),h=wg(e),f=Tg(e),d=pg(e),g=mg(s),_=r.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Sr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Sr).join(`
`),p.length>0&&(p+=`
`)):(m=[cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),p=[cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?fg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,hg("linearToOutputTexel",e.outputColorSpace),dg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Sr).join(`
`)),o=pa(o),o=oc(o,e),o=ac(o,e),a=pa(a),a=oc(a,e),a=ac(a,e),o=lc(o),a=lc(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=y+m+o,x=y+p+a,C=ic(r,r.VERTEX_SHADER,M),R=ic(r,r.FRAGMENT_SHADER,x);r.attachShader(_,C),r.attachShader(_,R),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(L){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),z=r.getShaderInfoLog(C).trim(),H=r.getShaderInfoLog(R).trim();let Y=!0,V=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,C,R);else{const rt=sc(r,C,"vertex"),I=sc(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+rt+`
`+I)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||H==="")&&(V=!1);V&&(L.diagnostics={runnable:Y,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:H,prefix:p}})}r.deleteShader(C),r.deleteShader(R),P=new ws(r,_),E=gg(r,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(_,ag)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=R,this}let Rg=0;class Cg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Pg(t),e.set(t,i)),i}}class Pg{constructor(t){this.id=Rg++,this.code=t,this.usedTimes=0}}function Lg(n,t,e,i,r,s,o){const a=new Ga,l=new Cg,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,v,L,O,z){const H=O.fog,Y=z.geometry,V=E.isMeshStandardMaterial?O.environment:null,rt=(E.isMeshStandardMaterial?e:t).get(E.envMap||V),I=rt&&rt.mapping===Fs?rt.image.height:null,j=g[E.type];E.precision!==null&&(d=r.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const Q=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,W=Q!==void 0?Q.length:0;let vt=0;Y.morphAttributes.position!==void 0&&(vt=1),Y.morphAttributes.normal!==void 0&&(vt=2),Y.morphAttributes.color!==void 0&&(vt=3);let at,$,lt,St;if(j){const ee=un[j];at=ee.vertexShader,$=ee.fragmentShader}else at=E.vertexShader,$=E.fragmentShader,l.update(E),lt=l.getVertexShaderID(E),St=l.getFragmentShaderID(E);const ut=n.getRenderTarget(),Pt=n.state.buffers.depth.getReversed(),Ft=z.isInstancedMesh===!0,Ot=z.isBatchedMesh===!0,Zt=!!E.map,st=!!E.matcap,B=!!rt,w=!!E.aoMap,nt=!!E.lightMap,Z=!!E.bumpMap,K=!!E.normalMap,G=!!E.displacementMap,gt=!!E.emissiveMap,ht=!!E.metalnessMap,T=!!E.roughnessMap,S=E.anisotropy>0,k=E.clearcoat>0,et=E.dispersion>0,it=E.iridescence>0,tt=E.sheen>0,Tt=E.transmission>0,pt=S&&!!E.anisotropyMap,Et=k&&!!E.clearcoatMap,Gt=k&&!!E.clearcoatNormalMap,ct=k&&!!E.clearcoatRoughnessMap,Rt=it&&!!E.iridescenceMap,Bt=it&&!!E.iridescenceThicknessMap,kt=tt&&!!E.sheenColorMap,Lt=tt&&!!E.sheenRoughnessMap,Kt=!!E.specularMap,qt=!!E.specularColorMap,ae=!!E.specularIntensityMap,U=Tt&&!!E.transmissionMap,yt=Tt&&!!E.thicknessMap,J=!!E.gradientMap,ot=!!E.alphaMap,At=E.alphaTest>0,bt=!!E.alphaHash,Vt=!!E.extensions;let pe=Vn;E.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(pe=n.toneMapping);const we={shaderID:j,shaderType:E.type,shaderName:E.name,vertexShader:at,fragmentShader:$,defines:E.defines,customVertexShaderID:lt,customFragmentShaderID:St,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:Ot,batchingColor:Ot&&z._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&z.instanceColor!==null,instancingMorph:Ft&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ut===null?n.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:nr,alphaToCoverage:!!E.alphaToCoverage,map:Zt,matcap:st,envMap:B,envMapMode:B&&rt.mapping,envMapCubeUVHeight:I,aoMap:w,lightMap:nt,bumpMap:Z,normalMap:K,displacementMap:f&&G,emissiveMap:gt,normalMapObjectSpace:K&&E.normalMapType===Ef,normalMapTangentSpace:K&&E.normalMapType===xu,metalnessMap:ht,roughnessMap:T,anisotropy:S,anisotropyMap:pt,clearcoat:k,clearcoatMap:Et,clearcoatNormalMap:Gt,clearcoatRoughnessMap:ct,dispersion:et,iridescence:it,iridescenceMap:Rt,iridescenceThicknessMap:Bt,sheen:tt,sheenColorMap:kt,sheenRoughnessMap:Lt,specularMap:Kt,specularColorMap:qt,specularIntensityMap:ae,transmission:Tt,transmissionMap:U,thicknessMap:yt,gradientMap:J,opaque:E.transparent===!1&&E.blending===Hi&&E.alphaToCoverage===!1,alphaMap:ot,alphaTest:At,alphaHash:bt,combine:E.combine,mapUv:Zt&&_(E.map.channel),aoMapUv:w&&_(E.aoMap.channel),lightMapUv:nt&&_(E.lightMap.channel),bumpMapUv:Z&&_(E.bumpMap.channel),normalMapUv:K&&_(E.normalMap.channel),displacementMapUv:G&&_(E.displacementMap.channel),emissiveMapUv:gt&&_(E.emissiveMap.channel),metalnessMapUv:ht&&_(E.metalnessMap.channel),roughnessMapUv:T&&_(E.roughnessMap.channel),anisotropyMapUv:pt&&_(E.anisotropyMap.channel),clearcoatMapUv:Et&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&_(E.sheenRoughnessMap.channel),specularMapUv:Kt&&_(E.specularMap.channel),specularColorMapUv:qt&&_(E.specularColorMap.channel),specularIntensityMapUv:ae&&_(E.specularIntensityMap.channel),transmissionMapUv:U&&_(E.transmissionMap.channel),thicknessMapUv:yt&&_(E.thicknessMap.channel),alphaMapUv:ot&&_(E.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(K||S),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(Zt||ot),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Pt,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:W,morphTextureStride:vt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:pe,decodeVideoTexture:Zt&&E.map.isVideoTexture===!0&&Jt.getTransfer(E.map.colorSpace)===se,decodeVideoTextureEmissive:gt&&E.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(E.emissiveMap.colorSpace)===se,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ue,flipSided:E.side===Pe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Vt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&E.extensions.multiDraw===!0||Ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function p(E){const v=[];if(E.shaderID?v.push(E.shaderID):(v.push(E.customVertexShaderID),v.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)v.push(L),v.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(y(v,E),M(v,E),v.push(n.outputColorSpace)),v.push(E.customProgramCacheKey),v.join()}function y(E,v){E.push(v.precision),E.push(v.outputColorSpace),E.push(v.envMapMode),E.push(v.envMapCubeUVHeight),E.push(v.mapUv),E.push(v.alphaMapUv),E.push(v.lightMapUv),E.push(v.aoMapUv),E.push(v.bumpMapUv),E.push(v.normalMapUv),E.push(v.displacementMapUv),E.push(v.emissiveMapUv),E.push(v.metalnessMapUv),E.push(v.roughnessMapUv),E.push(v.anisotropyMapUv),E.push(v.clearcoatMapUv),E.push(v.clearcoatNormalMapUv),E.push(v.clearcoatRoughnessMapUv),E.push(v.iridescenceMapUv),E.push(v.iridescenceThicknessMapUv),E.push(v.sheenColorMapUv),E.push(v.sheenRoughnessMapUv),E.push(v.specularMapUv),E.push(v.specularColorMapUv),E.push(v.specularIntensityMapUv),E.push(v.transmissionMapUv),E.push(v.thicknessMapUv),E.push(v.combine),E.push(v.fogExp2),E.push(v.sizeAttenuation),E.push(v.morphTargetsCount),E.push(v.morphAttributeCount),E.push(v.numDirLights),E.push(v.numPointLights),E.push(v.numSpotLights),E.push(v.numSpotLightMaps),E.push(v.numHemiLights),E.push(v.numRectAreaLights),E.push(v.numDirLightShadows),E.push(v.numPointLightShadows),E.push(v.numSpotLightShadows),E.push(v.numSpotLightShadowsWithMaps),E.push(v.numLightProbes),E.push(v.shadowMapType),E.push(v.toneMapping),E.push(v.numClippingPlanes),E.push(v.numClipIntersection),E.push(v.depthPacking)}function M(E,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),E.push(a.mask)}function x(E){const v=g[E.type];let L;if(v){const O=un[v];L=pd.clone(O.uniforms)}else L=E.uniforms;return L}function C(E,v){let L;for(let O=0,z=u.length;O<z;O++){const H=u[O];if(H.cacheKey===v){L=H,++L.usedTimes;break}}return L===void 0&&(L=new Ag(n,v,E,s),u.push(L)),L}function R(E){if(--E.usedTimes===0){const v=u.indexOf(E);u[v]=u[u.length-1],u.pop(),E.destroy()}}function A(E){l.remove(E)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:R,releaseShaderCache:A,programs:u,dispose:P}}function Dg(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Ig(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function uc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function hc(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(h,f,d,g,_,m){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),t++,p}function a(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):e.push(p)}function l(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function c(h,f){e.length>1&&e.sort(h||Ig),i.length>1&&i.sort(f||uc),r.length>1&&r.sort(f||uc)}function u(){for(let h=t,f=n.length;h<f;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Ug(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new hc,n.set(i,[o])):r>=s.length?(o=new hc,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Ng(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new dt};break;case"SpotLight":e={position:new D,direction:new D,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":e={color:new dt,position:new D,halfWidth:new D,halfHeight:new D};break}return n[t.id]=e,e}}}function Fg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Og=0;function zg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Bg(n){const t=new Ng,e=Fg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const r=new D,s=new ie,o=new ie;function a(c){let u=0,h=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,y=0,M=0,x=0,C=0,R=0,A=0;c.sort(zg);for(let E=0,v=c.length;E<v;E++){const L=c[E],O=L.color,z=L.intensity,H=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=O.r*z,h+=O.g*z,f+=O.b*z;else if(L.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(L.sh.coefficients[V],z);A++}else if(L.isDirectionalLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const rt=L.shadow,I=e.get(L);I.shadowIntensity=rt.intensity,I.shadowBias=rt.bias,I.shadowNormalBias=rt.normalBias,I.shadowRadius=rt.radius,I.shadowMapSize=rt.mapSize,i.directionalShadow[d]=I,i.directionalShadowMap[d]=Y,i.directionalShadowMatrix[d]=L.shadow.matrix,y++}i.directional[d]=V,d++}else if(L.isSpotLight){const V=t.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(O).multiplyScalar(z),V.distance=H,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,i.spot[_]=V;const rt=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,rt.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[_]=rt.matrix,L.castShadow){const I=e.get(L);I.shadowIntensity=rt.intensity,I.shadowBias=rt.bias,I.shadowNormalBias=rt.normalBias,I.shadowRadius=rt.radius,I.shadowMapSize=rt.mapSize,i.spotShadow[_]=I,i.spotShadowMap[_]=Y,x++}_++}else if(L.isRectAreaLight){const V=t.get(L);V.color.copy(O).multiplyScalar(z),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=V,m++}else if(L.isPointLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const rt=L.shadow,I=e.get(L);I.shadowIntensity=rt.intensity,I.shadowBias=rt.bias,I.shadowNormalBias=rt.normalBias,I.shadowRadius=rt.radius,I.shadowMapSize=rt.mapSize,I.shadowCameraNear=rt.camera.near,I.shadowCameraFar=rt.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=L.shadow.matrix,M++}i.point[g]=V,g++}else if(L.isHemisphereLight){const V=t.get(L);V.skyColor.copy(L.color).multiplyScalar(z),V.groundColor.copy(L.groundColor).multiplyScalar(z),i.hemi[p]=V,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==y||P.numPointShadows!==M||P.numSpotShadows!==x||P.numSpotMaps!==C||P.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=x+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=A,P.directionalLength=d,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=y,P.numPointShadows=M,P.numSpotShadows=x,P.numSpotMaps=C,P.numLightProbes=A,i.version=Og++)}function l(c,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const M=c[p];if(M.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(M.isSpotLight){const x=i.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function fc(n){const t=new Bg(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function kg(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new fc(n),t.set(r,[a])):s>=o.length?(a=new fc(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Hg extends or{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gg extends or{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wg=`uniform sampler2D shadow_pass;
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
}`;function Xg(n,t,e){let i=new Va;const r=new mt,s=new mt,o=new me,a=new Hg({depthPacking:Sf}),l=new Gg,c={},u=e.maxTextureSize,h={[Wn]:Pe,[Pe]:Wn,[Ue]:Ue},f=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:Vg,fragmentShader:Wg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new re(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $t(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ru;let p=this.type;this.render=function(R,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=n.getRenderTarget(),v=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Gn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==En&&this.type===En,H=p===En&&this.type!==En;for(let Y=0,V=R.length;Y<V;Y++){const rt=R[Y],I=rt.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const j=I.getFrameExtents();if(r.multiply(j),s.copy(I.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,I.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,I.mapSize.y=s.y)),I.map===null||z===!0||H===!0){const W=this.type!==En?{minFilter:Ve,magFilter:Ve}:{};I.map!==null&&I.map.dispose(),I.map=new ui(r.x,r.y,W),I.map.texture.name=rt.name+".shadowMap",I.camera.updateProjectionMatrix()}n.setRenderTarget(I.map),n.clear();const Q=I.getViewportCount();for(let W=0;W<Q;W++){const vt=I.getViewport(W);o.set(s.x*vt.x,s.y*vt.y,s.x*vt.z,s.y*vt.w),O.viewport(o),I.updateMatrices(rt,W),i=I.getFrustum(),x(A,P,I.camera,rt,this.type)}I.isPointLightShadow!==!0&&this.type===En&&y(I,P),I.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,v,L)};function y(R,A){const P=t.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ui(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(A,null,P,f,_,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(A,null,P,d,_,null)}function M(R,A,P,E){let v=null;const L=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)v=L;else if(v=P.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const O=v.uuid,z=A.uuid;let H=c[O];H===void 0&&(H={},c[O]=H);let Y=H[z];Y===void 0&&(Y=v.clone(),H[z]=Y,A.addEventListener("dispose",C)),v=Y}if(v.visible=A.visible,v.wireframe=A.wireframe,E===En?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:h[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const O=n.properties.get(v);O.light=P}return v}function x(R,A,P,E,v){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===En)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const z=t.update(R),H=R.material;if(Array.isArray(H)){const Y=z.groups;for(let V=0,rt=Y.length;V<rt;V++){const I=Y[V],j=H[I.materialIndex];if(j&&j.visible){const Q=M(R,j,E,v);R.onBeforeShadow(n,R,A,P,z,Q,I),n.renderBufferDirect(P,null,z,Q,R,I),R.onAfterShadow(n,R,A,P,z,Q,I)}}}else if(H.visible){const Y=M(R,H,E,v);R.onBeforeShadow(n,R,A,P,z,Y,null),n.renderBufferDirect(P,null,z,Y,R,null),R.onAfterShadow(n,R,A,P,z,Y,null)}}const O=R.children;for(let z=0,H=O.length;z<H;z++)x(O[z],A,P,E,v)}function C(R){R.target.removeEventListener("dispose",C);for(const P in c){const E=c[P],v=R.target.uuid;v in E&&(E[v].dispose(),delete E[v])}}}const qg={[Lo]:Do,[Io]:Fo,[Uo]:Oo,[Zi]:No,[Do]:Lo,[Fo]:Io,[Oo]:Uo,[No]:Zi};function Yg(n,t){function e(){let U=!1;const yt=new me;let J=null;const ot=new me(0,0,0,0);return{setMask:function(At){J!==At&&!U&&(n.colorMask(At,At,At,At),J=At)},setLocked:function(At){U=At},setClear:function(At,bt,Vt,pe,we){we===!0&&(At*=pe,bt*=pe,Vt*=pe),yt.set(At,bt,Vt,pe),ot.equals(yt)===!1&&(n.clearColor(At,bt,Vt,pe),ot.copy(yt))},reset:function(){U=!1,J=null,ot.set(-1,0,0,0)}}}function i(){let U=!1,yt=!1,J=null,ot=null,At=null;return{setReversed:function(bt){if(yt!==bt){const Vt=t.get("EXT_clip_control");yt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const pe=At;At=null,this.setClear(pe)}yt=bt},getReversed:function(){return yt},setTest:function(bt){bt?ut(n.DEPTH_TEST):Pt(n.DEPTH_TEST)},setMask:function(bt){J!==bt&&!U&&(n.depthMask(bt),J=bt)},setFunc:function(bt){if(yt&&(bt=qg[bt]),ot!==bt){switch(bt){case Lo:n.depthFunc(n.NEVER);break;case Do:n.depthFunc(n.ALWAYS);break;case Io:n.depthFunc(n.LESS);break;case Zi:n.depthFunc(n.LEQUAL);break;case Uo:n.depthFunc(n.EQUAL);break;case No:n.depthFunc(n.GEQUAL);break;case Fo:n.depthFunc(n.GREATER);break;case Oo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ot=bt}},setLocked:function(bt){U=bt},setClear:function(bt){At!==bt&&(yt&&(bt=1-bt),n.clearDepth(bt),At=bt)},reset:function(){U=!1,J=null,ot=null,At=null,yt=!1}}}function r(){let U=!1,yt=null,J=null,ot=null,At=null,bt=null,Vt=null,pe=null,we=null;return{setTest:function(ee){U||(ee?ut(n.STENCIL_TEST):Pt(n.STENCIL_TEST))},setMask:function(ee){yt!==ee&&!U&&(n.stencilMask(ee),yt=ee)},setFunc:function(ee,Qe,mn){(J!==ee||ot!==Qe||At!==mn)&&(n.stencilFunc(ee,Qe,mn),J=ee,ot=Qe,At=mn)},setOp:function(ee,Qe,mn){(bt!==ee||Vt!==Qe||pe!==mn)&&(n.stencilOp(ee,Qe,mn),bt=ee,Vt=Qe,pe=mn)},setLocked:function(ee){U=ee},setClear:function(ee){we!==ee&&(n.clearStencil(ee),we=ee)},reset:function(){U=!1,yt=null,J=null,ot=null,At=null,bt=null,Vt=null,pe=null,we=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,y=null,M=null,x=null,C=null,R=null,A=new dt(0,0,0),P=0,E=!1,v=null,L=null,O=null,z=null,H=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,rt=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(I)[1]),V=rt>=1):I.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),V=rt>=2);let j=null,Q={};const W=n.getParameter(n.SCISSOR_BOX),vt=n.getParameter(n.VIEWPORT),at=new me().fromArray(W),$=new me().fromArray(vt);function lt(U,yt,J,ot){const At=new Uint8Array(4),bt=n.createTexture();n.bindTexture(U,bt),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Vt=0;Vt<J;Vt++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(yt,0,n.RGBA,1,1,ot,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(yt+Vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return bt}const St={};St[n.TEXTURE_2D]=lt(n.TEXTURE_2D,n.TEXTURE_2D,1),St[n.TEXTURE_CUBE_MAP]=lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[n.TEXTURE_2D_ARRAY]=lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),St[n.TEXTURE_3D]=lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ut(n.DEPTH_TEST),o.setFunc(Zi),Z(!1),K(ml),ut(n.CULL_FACE),w(Gn);function ut(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Pt(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Ft(U,yt){return h[U]!==yt?(n.bindFramebuffer(U,yt),h[U]=yt,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=yt),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=yt),!0):!1}function Ot(U,yt){let J=d,ot=!1;if(U){J=f.get(yt),J===void 0&&(J=[],f.set(yt,J));const At=U.textures;if(J.length!==At.length||J[0]!==n.COLOR_ATTACHMENT0){for(let bt=0,Vt=At.length;bt<Vt;bt++)J[bt]=n.COLOR_ATTACHMENT0+bt;J.length=At.length,ot=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,ot=!0);ot&&n.drawBuffers(J)}function Zt(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const st={[ii]:n.FUNC_ADD,[Zh]:n.FUNC_SUBTRACT,[Kh]:n.FUNC_REVERSE_SUBTRACT};st[$h]=n.MIN,st[Jh]=n.MAX;const B={[jh]:n.ZERO,[Qh]:n.ONE,[tf]:n.SRC_COLOR,[Co]:n.SRC_ALPHA,[af]:n.SRC_ALPHA_SATURATE,[sf]:n.DST_COLOR,[nf]:n.DST_ALPHA,[ef]:n.ONE_MINUS_SRC_COLOR,[Po]:n.ONE_MINUS_SRC_ALPHA,[of]:n.ONE_MINUS_DST_COLOR,[rf]:n.ONE_MINUS_DST_ALPHA,[lf]:n.CONSTANT_COLOR,[cf]:n.ONE_MINUS_CONSTANT_COLOR,[uf]:n.CONSTANT_ALPHA,[hf]:n.ONE_MINUS_CONSTANT_ALPHA};function w(U,yt,J,ot,At,bt,Vt,pe,we,ee){if(U===Gn){_===!0&&(Pt(n.BLEND),_=!1);return}if(_===!1&&(ut(n.BLEND),_=!0),U!==Yh){if(U!==m||ee!==E){if((p!==ii||x!==ii)&&(n.blendEquation(n.FUNC_ADD),p=ii,x=ii),ee)switch(U){case Hi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gl:n.blendFunc(n.ONE,n.ONE);break;case _l:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case _l:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,M=null,C=null,R=null,A.set(0,0,0),P=0,m=U,E=ee}return}At=At||yt,bt=bt||J,Vt=Vt||ot,(yt!==p||At!==x)&&(n.blendEquationSeparate(st[yt],st[At]),p=yt,x=At),(J!==y||ot!==M||bt!==C||Vt!==R)&&(n.blendFuncSeparate(B[J],B[ot],B[bt],B[Vt]),y=J,M=ot,C=bt,R=Vt),(pe.equals(A)===!1||we!==P)&&(n.blendColor(pe.r,pe.g,pe.b,we),A.copy(pe),P=we),m=U,E=!1}function nt(U,yt){U.side===Ue?Pt(n.CULL_FACE):ut(n.CULL_FACE);let J=U.side===Pe;yt&&(J=!J),Z(J),U.blending===Hi&&U.transparent===!1?w(Gn):w(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const ot=U.stencilWrite;a.setTest(ot),ot&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),gt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ut(n.SAMPLE_ALPHA_TO_COVERAGE):Pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Z(U){v!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),v=U)}function K(U){U!==Xh?(ut(n.CULL_FACE),U!==L&&(U===ml?n.cullFace(n.BACK):U===qh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pt(n.CULL_FACE),L=U}function G(U){U!==O&&(V&&n.lineWidth(U),O=U)}function gt(U,yt,J){U?(ut(n.POLYGON_OFFSET_FILL),(z!==yt||H!==J)&&(n.polygonOffset(yt,J),z=yt,H=J)):Pt(n.POLYGON_OFFSET_FILL)}function ht(U){U?ut(n.SCISSOR_TEST):Pt(n.SCISSOR_TEST)}function T(U){U===void 0&&(U=n.TEXTURE0+Y-1),j!==U&&(n.activeTexture(U),j=U)}function S(U,yt,J){J===void 0&&(j===null?J=n.TEXTURE0+Y-1:J=j);let ot=Q[J];ot===void 0&&(ot={type:void 0,texture:void 0},Q[J]=ot),(ot.type!==U||ot.texture!==yt)&&(j!==J&&(n.activeTexture(J),j=J),n.bindTexture(U,yt||St[U]),ot.type=U,ot.texture=yt)}function k(){const U=Q[j];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function et(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Gt(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Rt(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function kt(U){at.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),at.copy(U))}function Lt(U){$.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function Kt(U,yt){let J=c.get(yt);J===void 0&&(J=new WeakMap,c.set(yt,J));let ot=J.get(U);ot===void 0&&(ot=n.getUniformBlockIndex(yt,U.name),J.set(U,ot))}function qt(U,yt){const ot=c.get(yt).get(U);l.get(yt)!==ot&&(n.uniformBlockBinding(yt,ot,U.__bindingPointIndex),l.set(yt,ot))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},j=null,Q={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,y=null,M=null,x=null,C=null,R=null,A=new dt(0,0,0),P=0,E=!1,v=null,L=null,O=null,z=null,H=null,at.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ut,disable:Pt,bindFramebuffer:Ft,drawBuffers:Ot,useProgram:Zt,setBlending:w,setMaterial:nt,setFlipSided:Z,setCullFace:K,setLineWidth:G,setPolygonOffset:gt,setScissorTest:ht,activeTexture:T,bindTexture:S,unbindTexture:k,compressedTexImage2D:et,compressedTexImage3D:it,texImage2D:Rt,texImage3D:Bt,updateUBOMapping:Kt,uniformBlockBinding:qt,texStorage2D:Gt,texStorage3D:ct,texSubImage2D:tt,texSubImage3D:Tt,compressedTexSubImage2D:pt,compressedTexSubImage3D:Et,scissor:kt,viewport:Lt,reset:ae}}function dc(n,t,e,i){const r=Zg(i);switch(e){case fu:return n*t;case pu:return n*t;case mu:return n*t*2;case Fa:return n*t/r.components*r.byteLength;case Oa:return n*t/r.components*r.byteLength;case gu:return n*t*2/r.components*r.byteLength;case za:return n*t*2/r.components*r.byteLength;case du:return n*t*3/r.components*r.byteLength;case on:return n*t*4/r.components*r.byteLength;case Ba:return n*t*4/r.components*r.byteLength;case Ms:case ys:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ss:case Es:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Vo:case Xo:return Math.max(n,16)*Math.max(t,8)/4;case Go:case Wo:return Math.max(n,8)*Math.max(t,8)/2;case qo:case Yo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Zo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ko:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case $o:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Jo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case jo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Qo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ta:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ea:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case na:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ia:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ra:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case sa:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case oa:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case aa:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case la:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case bs:case ca:case ua:return Math.ceil(n/4)*Math.ceil(t/4)*16;case _u:case ha:return Math.ceil(n/4)*Math.ceil(t/4)*8;case fa:case da:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zg(n){switch(n){case An:case cu:return{byteLength:1,components:1};case Pr:case uu:case kr:return{byteLength:2,components:1};case Ua:case Na:return{byteLength:2,components:4};case ci:case Ia:case fn:return{byteLength:4,components:1};case hu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Kg(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return d?new OffscreenCanvas(T,S):As("canvas")}function _(T,S,k){let et=1;const it=ht(T);if((it.width>k||it.height>k)&&(et=k/Math.max(it.width,it.height)),et<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const tt=Math.floor(et*it.width),Tt=Math.floor(et*it.height);h===void 0&&(h=g(tt,Tt));const pt=S?g(tt,Tt):h;return pt.width=tt,pt.height=Tt,pt.getContext("2d").drawImage(T,0,0,tt,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+tt+"x"+Tt+")."),pt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(T,S,k,et,it=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let tt=S;if(S===n.RED&&(k===n.FLOAT&&(tt=n.R32F),k===n.HALF_FLOAT&&(tt=n.R16F),k===n.UNSIGNED_BYTE&&(tt=n.R8)),S===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.R8UI),k===n.UNSIGNED_SHORT&&(tt=n.R16UI),k===n.UNSIGNED_INT&&(tt=n.R32UI),k===n.BYTE&&(tt=n.R8I),k===n.SHORT&&(tt=n.R16I),k===n.INT&&(tt=n.R32I)),S===n.RG&&(k===n.FLOAT&&(tt=n.RG32F),k===n.HALF_FLOAT&&(tt=n.RG16F),k===n.UNSIGNED_BYTE&&(tt=n.RG8)),S===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.RG8UI),k===n.UNSIGNED_SHORT&&(tt=n.RG16UI),k===n.UNSIGNED_INT&&(tt=n.RG32UI),k===n.BYTE&&(tt=n.RG8I),k===n.SHORT&&(tt=n.RG16I),k===n.INT&&(tt=n.RG32I)),S===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.RGB8UI),k===n.UNSIGNED_SHORT&&(tt=n.RGB16UI),k===n.UNSIGNED_INT&&(tt=n.RGB32UI),k===n.BYTE&&(tt=n.RGB8I),k===n.SHORT&&(tt=n.RGB16I),k===n.INT&&(tt=n.RGB32I)),S===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(tt=n.RGBA16UI),k===n.UNSIGNED_INT&&(tt=n.RGBA32UI),k===n.BYTE&&(tt=n.RGBA8I),k===n.SHORT&&(tt=n.RGBA16I),k===n.INT&&(tt=n.RGBA32I)),S===n.RGB&&k===n.UNSIGNED_INT_5_9_9_9_REV&&(tt=n.RGB9_E5),S===n.RGBA){const Tt=it?Os:Jt.getTransfer(et);k===n.FLOAT&&(tt=n.RGBA32F),k===n.HALF_FLOAT&&(tt=n.RGBA16F),k===n.UNSIGNED_BYTE&&(tt=Tt===se?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(tt=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(tt=n.RGB5_A1)}return(tt===n.R16F||tt===n.R32F||tt===n.RG16F||tt===n.RG32F||tt===n.RGBA16F||tt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function x(T,S){let k;return T?S===null||S===ci||S===Ji?k=n.DEPTH24_STENCIL8:S===fn?k=n.DEPTH32F_STENCIL8:S===Pr&&(k=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ci||S===Ji?k=n.DEPTH_COMPONENT24:S===fn?k=n.DEPTH_COMPONENT32F:S===Pr&&(k=n.DEPTH_COMPONENT16),k}function C(T,S){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ve&&T.minFilter!==hn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function R(T){const S=T.target;S.removeEventListener("dispose",R),P(S),S.isVideoTexture&&u.delete(S)}function A(T){const S=T.target;S.removeEventListener("dispose",A),v(S)}function P(T){const S=i.get(T);if(S.__webglInit===void 0)return;const k=T.source,et=f.get(k);if(et){const it=et[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&E(T),Object.keys(et).length===0&&f.delete(k)}i.remove(T)}function E(T){const S=i.get(T);n.deleteTexture(S.__webglTexture);const k=T.source,et=f.get(k);delete et[S.__cacheKey],o.memory.textures--}function v(T){const S=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(S.__webglFramebuffer[et]))for(let it=0;it<S.__webglFramebuffer[et].length;it++)n.deleteFramebuffer(S.__webglFramebuffer[et][it]);else n.deleteFramebuffer(S.__webglFramebuffer[et]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[et])}else{if(Array.isArray(S.__webglFramebuffer))for(let et=0;et<S.__webglFramebuffer.length;et++)n.deleteFramebuffer(S.__webglFramebuffer[et]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let et=0;et<S.__webglColorRenderbuffer.length;et++)S.__webglColorRenderbuffer[et]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[et]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=T.textures;for(let et=0,it=k.length;et<it;et++){const tt=i.get(k[et]);tt.__webglTexture&&(n.deleteTexture(tt.__webglTexture),o.memory.textures--),i.remove(k[et])}i.remove(T)}let L=0;function O(){L=0}function z(){const T=L;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T}function H(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function Y(T,S){const k=i.get(T);if(T.isVideoTexture&&G(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){const et=T.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,T,S);return}}e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+S)}function V(T,S){const k=i.get(T);if(T.version>0&&k.__version!==T.version){$(k,T,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+S)}function rt(T,S){const k=i.get(T);if(T.version>0&&k.__version!==T.version){$(k,T,S);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+S)}function I(T,S){const k=i.get(T);if(T.version>0&&k.__version!==T.version){lt(k,T,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+S)}const j={[ko]:n.REPEAT,[si]:n.CLAMP_TO_EDGE,[Ho]:n.MIRRORED_REPEAT},Q={[Ve]:n.NEAREST,[Mf]:n.NEAREST_MIPMAP_NEAREST,[Wr]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[Ws]:n.LINEAR_MIPMAP_NEAREST,[oi]:n.LINEAR_MIPMAP_LINEAR},W={[bf]:n.NEVER,[Pf]:n.ALWAYS,[wf]:n.LESS,[vu]:n.LEQUAL,[Tf]:n.EQUAL,[Cf]:n.GEQUAL,[Af]:n.GREATER,[Rf]:n.NOTEQUAL};function vt(T,S){if(S.type===fn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===hn||S.magFilter===Ws||S.magFilter===Wr||S.magFilter===oi||S.minFilter===hn||S.minFilter===Ws||S.minFilter===Wr||S.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,j[S.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,j[S.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,j[S.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Q[S.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Q[S.minFilter]),S.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,W[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ve||S.minFilter!==Wr&&S.minFilter!==oi||S.type===fn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function at(T,S){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",R));const et=S.source;let it=f.get(et);it===void 0&&(it={},f.set(et,it));const tt=H(S);if(tt!==T.__cacheKey){it[tt]===void 0&&(it[tt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),it[tt].usedTimes++;const Tt=it[T.__cacheKey];Tt!==void 0&&(it[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&E(S)),T.__cacheKey=tt,T.__webglTexture=it[tt].texture}return k}function $(T,S,k){let et=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(et=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(et=n.TEXTURE_3D);const it=at(T,S),tt=S.source;e.bindTexture(et,T.__webglTexture,n.TEXTURE0+k);const Tt=i.get(tt);if(tt.version!==Tt.__version||it===!0){e.activeTexture(n.TEXTURE0+k);const pt=Jt.getPrimaries(Jt.workingColorSpace),Et=S.colorSpace===Hn?null:Jt.getPrimaries(S.colorSpace),Gt=S.colorSpace===Hn||pt===Et?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let ct=_(S.image,!1,r.maxTextureSize);ct=gt(S,ct);const Rt=s.convert(S.format,S.colorSpace),Bt=s.convert(S.type);let kt=M(S.internalFormat,Rt,Bt,S.colorSpace,S.isVideoTexture);vt(et,S);let Lt;const Kt=S.mipmaps,qt=S.isVideoTexture!==!0,ae=Tt.__version===void 0||it===!0,U=tt.dataReady,yt=C(S,ct);if(S.isDepthTexture)kt=x(S.format===ji,S.type),ae&&(qt?e.texStorage2D(n.TEXTURE_2D,1,kt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,kt,ct.width,ct.height,0,Rt,Bt,null));else if(S.isDataTexture)if(Kt.length>0){qt&&ae&&e.texStorage2D(n.TEXTURE_2D,yt,kt,Kt[0].width,Kt[0].height);for(let J=0,ot=Kt.length;J<ot;J++)Lt=Kt[J],qt?U&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Lt.width,Lt.height,Rt,Bt,Lt.data):e.texImage2D(n.TEXTURE_2D,J,kt,Lt.width,Lt.height,0,Rt,Bt,Lt.data);S.generateMipmaps=!1}else qt?(ae&&e.texStorage2D(n.TEXTURE_2D,yt,kt,ct.width,ct.height),U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,Rt,Bt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,kt,ct.width,ct.height,0,Rt,Bt,ct.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){qt&&ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,kt,Kt[0].width,Kt[0].height,ct.depth);for(let J=0,ot=Kt.length;J<ot;J++)if(Lt=Kt[J],S.format!==on)if(Rt!==null)if(qt){if(U)if(S.layerUpdates.size>0){const At=dc(Lt.width,Lt.height,S.format,S.type);for(const bt of S.layerUpdates){const Vt=Lt.data.subarray(bt*At/Lt.data.BYTES_PER_ELEMENT,(bt+1)*At/Lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,bt,Lt.width,Lt.height,1,Rt,Vt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Lt.width,Lt.height,ct.depth,Rt,Lt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,kt,Lt.width,Lt.height,ct.depth,0,Lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Lt.width,Lt.height,ct.depth,Rt,Bt,Lt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,kt,Lt.width,Lt.height,ct.depth,0,Rt,Bt,Lt.data)}else{qt&&ae&&e.texStorage2D(n.TEXTURE_2D,yt,kt,Kt[0].width,Kt[0].height);for(let J=0,ot=Kt.length;J<ot;J++)Lt=Kt[J],S.format!==on?Rt!==null?qt?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Lt.width,Lt.height,Rt,Lt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,kt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?U&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Lt.width,Lt.height,Rt,Bt,Lt.data):e.texImage2D(n.TEXTURE_2D,J,kt,Lt.width,Lt.height,0,Rt,Bt,Lt.data)}else if(S.isDataArrayTexture)if(qt){if(ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,kt,ct.width,ct.height,ct.depth),U)if(S.layerUpdates.size>0){const J=dc(ct.width,ct.height,S.format,S.type);for(const ot of S.layerUpdates){const At=ct.data.subarray(ot*J/ct.data.BYTES_PER_ELEMENT,(ot+1)*J/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ot,ct.width,ct.height,1,Rt,Bt,At)}S.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Rt,Bt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,kt,ct.width,ct.height,ct.depth,0,Rt,Bt,ct.data);else if(S.isData3DTexture)qt?(ae&&e.texStorage3D(n.TEXTURE_3D,yt,kt,ct.width,ct.height,ct.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Rt,Bt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,kt,ct.width,ct.height,ct.depth,0,Rt,Bt,ct.data);else if(S.isFramebufferTexture){if(ae)if(qt)e.texStorage2D(n.TEXTURE_2D,yt,kt,ct.width,ct.height);else{let J=ct.width,ot=ct.height;for(let At=0;At<yt;At++)e.texImage2D(n.TEXTURE_2D,At,kt,J,ot,0,Rt,Bt,null),J>>=1,ot>>=1}}else if(Kt.length>0){if(qt&&ae){const J=ht(Kt[0]);e.texStorage2D(n.TEXTURE_2D,yt,kt,J.width,J.height)}for(let J=0,ot=Kt.length;J<ot;J++)Lt=Kt[J],qt?U&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Rt,Bt,Lt):e.texImage2D(n.TEXTURE_2D,J,kt,Rt,Bt,Lt);S.generateMipmaps=!1}else if(qt){if(ae){const J=ht(ct);e.texStorage2D(n.TEXTURE_2D,yt,kt,J.width,J.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Rt,Bt,ct)}else e.texImage2D(n.TEXTURE_2D,0,kt,Rt,Bt,ct);m(S)&&p(et),Tt.__version=tt.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function lt(T,S,k){if(S.image.length!==6)return;const et=at(T,S),it=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+k);const tt=i.get(it);if(it.version!==tt.__version||et===!0){e.activeTexture(n.TEXTURE0+k);const Tt=Jt.getPrimaries(Jt.workingColorSpace),pt=S.colorSpace===Hn?null:Jt.getPrimaries(S.colorSpace),Et=S.colorSpace===Hn||Tt===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Gt=S.isCompressedTexture||S.image[0].isCompressedTexture,ct=S.image[0]&&S.image[0].isDataTexture,Rt=[];for(let ot=0;ot<6;ot++)!Gt&&!ct?Rt[ot]=_(S.image[ot],!0,r.maxCubemapSize):Rt[ot]=ct?S.image[ot].image:S.image[ot],Rt[ot]=gt(S,Rt[ot]);const Bt=Rt[0],kt=s.convert(S.format,S.colorSpace),Lt=s.convert(S.type),Kt=M(S.internalFormat,kt,Lt,S.colorSpace),qt=S.isVideoTexture!==!0,ae=tt.__version===void 0||et===!0,U=it.dataReady;let yt=C(S,Bt);vt(n.TEXTURE_CUBE_MAP,S);let J;if(Gt){qt&&ae&&e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Kt,Bt.width,Bt.height);for(let ot=0;ot<6;ot++){J=Rt[ot].mipmaps;for(let At=0;At<J.length;At++){const bt=J[At];S.format!==on?kt!==null?qt?U&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,0,0,bt.width,bt.height,kt,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,Kt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,0,0,bt.width,bt.height,kt,Lt,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,Kt,bt.width,bt.height,0,kt,Lt,bt.data)}}}else{if(J=S.mipmaps,qt&&ae){J.length>0&&yt++;const ot=ht(Rt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Kt,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(ct){qt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Rt[ot].width,Rt[ot].height,kt,Lt,Rt[ot].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Kt,Rt[ot].width,Rt[ot].height,0,kt,Lt,Rt[ot].data);for(let At=0;At<J.length;At++){const Vt=J[At].image[ot].image;qt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,0,0,Vt.width,Vt.height,kt,Lt,Vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,Kt,Vt.width,Vt.height,0,kt,Lt,Vt.data)}}else{qt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,kt,Lt,Rt[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Kt,kt,Lt,Rt[ot]);for(let At=0;At<J.length;At++){const bt=J[At];qt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,0,0,kt,Lt,bt.image[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,Kt,kt,Lt,bt.image[ot])}}}m(S)&&p(n.TEXTURE_CUBE_MAP),tt.__version=it.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function St(T,S,k,et,it,tt){const Tt=s.convert(k.format,k.colorSpace),pt=s.convert(k.type),Et=M(k.internalFormat,Tt,pt,k.colorSpace),Gt=i.get(S),ct=i.get(k);if(ct.__renderTarget=S,!Gt.__hasExternalTextures){const Rt=Math.max(1,S.width>>tt),Bt=Math.max(1,S.height>>tt);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,tt,Et,Rt,Bt,S.depth,0,Tt,pt,null):e.texImage2D(it,tt,Et,Rt,Bt,0,Tt,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),K(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,it,ct.__webglTexture,0,Z(S)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,et,it,ct.__webglTexture,tt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(T,S,k){if(n.bindRenderbuffer(n.RENDERBUFFER,T),S.depthBuffer){const et=S.depthTexture,it=et&&et.isDepthTexture?et.type:null,tt=x(S.stencilBuffer,it),Tt=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=Z(S);K(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,tt,S.width,S.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,tt,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,tt,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Tt,n.RENDERBUFFER,T)}else{const et=S.textures;for(let it=0;it<et.length;it++){const tt=et[it],Tt=s.convert(tt.format,tt.colorSpace),pt=s.convert(tt.type),Et=M(tt.internalFormat,Tt,pt,tt.colorSpace),Gt=Z(S);k&&K(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Gt,Et,S.width,S.height):K(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Gt,Et,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Et,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=i.get(S.depthTexture);et.__renderTarget=S,(!et.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);const it=et.__webglTexture,tt=Z(S);if(S.depthTexture.format===Gi)K(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(S.depthTexture.format===ji)K(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Ft(T){const S=i.get(T),k=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){const et=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),et){const it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,et.removeEventListener("dispose",it)};et.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=et}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Pt(S.__webglFramebuffer,T)}else if(k){S.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[et]),S.__webglDepthbuffer[et]===void 0)S.__webglDepthbuffer[et]=n.createRenderbuffer(),ut(S.__webglDepthbuffer[et],T,!1);else{const it=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer[et];n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),ut(S.__webglDepthbuffer,T,!1);else{const et=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,it)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ot(T,S,k){const et=i.get(T);S!==void 0&&St(et.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Ft(T)}function Zt(T){const S=T.texture,k=i.get(T),et=i.get(S);T.addEventListener("dispose",A);const it=T.textures,tt=T.isWebGLCubeRenderTarget===!0,Tt=it.length>1;if(Tt||(et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture()),et.__version=S.version,o.memory.textures++),tt){k.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[pt]=[];for(let Et=0;Et<S.mipmaps.length;Et++)k.__webglFramebuffer[pt][Et]=n.createFramebuffer()}else k.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let pt=0;pt<S.mipmaps.length;pt++)k.__webglFramebuffer[pt]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(Tt)for(let pt=0,Et=it.length;pt<Et;pt++){const Gt=i.get(it[pt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&K(T)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let pt=0;pt<it.length;pt++){const Et=it[pt];k.__webglColorRenderbuffer[pt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[pt]);const Gt=s.convert(Et.format,Et.colorSpace),ct=s.convert(Et.type),Rt=M(Et.internalFormat,Gt,ct,Et.colorSpace,T.isXRRenderTarget===!0),Bt=Z(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt,Rt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,k.__webglColorRenderbuffer[pt])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ut(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(tt){e.bindTexture(n.TEXTURE_CUBE_MAP,et.__webglTexture),vt(n.TEXTURE_CUBE_MAP,S);for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)St(k.__webglFramebuffer[pt][Et],T,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et);else St(k.__webglFramebuffer[pt],T,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(S)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let pt=0,Et=it.length;pt<Et;pt++){const Gt=it[pt],ct=i.get(Gt);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),vt(n.TEXTURE_2D,Gt),St(k.__webglFramebuffer,T,Gt,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,0),m(Gt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pt=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,et.__webglTexture),vt(pt,S),S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)St(k.__webglFramebuffer[Et],T,S,n.COLOR_ATTACHMENT0,pt,Et);else St(k.__webglFramebuffer,T,S,n.COLOR_ATTACHMENT0,pt,0);m(S)&&p(pt),e.unbindTexture()}T.depthBuffer&&Ft(T)}function st(T){const S=T.textures;for(let k=0,et=S.length;k<et;k++){const it=S[k];if(m(it)){const tt=y(T),Tt=i.get(it).__webglTexture;e.bindTexture(tt,Tt),p(tt),e.unbindTexture()}}}const B=[],w=[];function nt(T){if(T.samples>0){if(K(T)===!1){const S=T.textures,k=T.width,et=T.height;let it=n.COLOR_BUFFER_BIT;const tt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Tt=i.get(T),pt=S.length>1;if(pt)for(let Et=0;Et<S.length;Et++)e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Et=0;Et<S.length;Et++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),pt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[Et]);const Gt=i.get(S[Et]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Gt,0)}n.blitFramebuffer(0,0,k,et,0,0,k,et,it,n.NEAREST),l===!0&&(B.length=0,w.length=0,B.push(n.COLOR_ATTACHMENT0+Et),T.depthBuffer&&T.resolveDepthBuffer===!1&&(B.push(tt),w.push(tt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,w)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,B))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pt)for(let Et=0;Et<S.length;Et++){e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[Et]);const Gt=i.get(S[Et]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,Gt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const S=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function Z(T){return Math.min(r.maxSamples,T.samples)}function K(T){const S=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function G(T){const S=o.render.frame;u.get(T)!==S&&(u.set(T,S),T.update())}function gt(T,S){const k=T.colorSpace,et=T.format,it=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==nr&&k!==Hn&&(Jt.getTransfer(k)===se?(et!==on||it!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function ht(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=rt,this.setTextureCube=I,this.rebindTextures=Ot,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=St,this.useMultisampledRTT=K}function $g(n,t){function e(i,r=Hn){let s;const o=Jt.getTransfer(r);if(i===An)return n.UNSIGNED_BYTE;if(i===Ua)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Na)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===cu)return n.BYTE;if(i===uu)return n.SHORT;if(i===Pr)return n.UNSIGNED_SHORT;if(i===Ia)return n.INT;if(i===ci)return n.UNSIGNED_INT;if(i===fn)return n.FLOAT;if(i===kr)return n.HALF_FLOAT;if(i===fu)return n.ALPHA;if(i===du)return n.RGB;if(i===on)return n.RGBA;if(i===pu)return n.LUMINANCE;if(i===mu)return n.LUMINANCE_ALPHA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===ji)return n.DEPTH_STENCIL;if(i===Fa)return n.RED;if(i===Oa)return n.RED_INTEGER;if(i===gu)return n.RG;if(i===za)return n.RG_INTEGER;if(i===Ba)return n.RGBA_INTEGER;if(i===Ms||i===ys||i===Ss||i===Es)if(o===se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ms)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ms)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ys)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ss)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Es)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Go||i===Vo||i===Wo||i===Xo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Go)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Vo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Wo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qo||i===Yo||i===Zo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qo||i===Yo)return o===se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ko||i===$o||i===Jo||i===jo||i===Qo||i===ta||i===ea||i===na||i===ia||i===ra||i===sa||i===oa||i===aa||i===la)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ko)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$o)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Jo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===jo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ta)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ea)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===na)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ia)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ra)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sa)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===oa)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===aa)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===la)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bs||i===ca||i===ua)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===bs)return o===se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ca)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ua)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_u||i===ha||i===fa||i===da)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===bs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ha)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===da)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Jg extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class dn extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jg={type:"move"};class xo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jg)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new dn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Qg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t_=`
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

}`;class e_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Le,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Xn({vertexShader:Qg,fragmentShader:t_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new hi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n_ extends ir{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=new e_,m=e.getContextAttributes();let p=null,y=null;const M=[],x=[],C=new mt;let R=null;const A=new $e;A.viewport=new me;const P=new $e;P.viewport=new me;const E=[A,P],v=new Jg;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let lt=M[$];return lt===void 0&&(lt=new xo,M[$]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function($){let lt=M[$];return lt===void 0&&(lt=new xo,M[$]=lt),lt.getGripSpace()},this.getHand=function($){let lt=M[$];return lt===void 0&&(lt=new xo,M[$]=lt),lt.getHandSpace()};function z($){const lt=x.indexOf($.inputSource);if(lt===-1)return;const St=M[lt];St!==void 0&&(St.update($.inputSource,$.frame,c||o),St.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",Y);for(let $=0;$<M.length;$++){const lt=x[$];lt!==null&&(x[$]=null,M[$].disconnect(lt))}L=null,O=null,_.reset(),t.setRenderTarget(p),d=null,f=null,h=null,r=null,y=null,at.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",H),r.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(C),r.renderState.layers===void 0){const lt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,lt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new ui(d.framebufferWidth,d.framebufferHeight,{format:on,type:An,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let lt=null,St=null,ut=null;m.depth&&(ut=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,lt=m.stencil?ji:Gi,St=m.stencil?Ji:ci);const Pt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(Pt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new ui(f.textureWidth,f.textureHeight,{format:on,type:An,depthTexture:new Lu(f.textureWidth,f.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),at.setContext(r),at.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y($){for(let lt=0;lt<$.removed.length;lt++){const St=$.removed[lt],ut=x.indexOf(St);ut>=0&&(x[ut]=null,M[ut].disconnect(St))}for(let lt=0;lt<$.added.length;lt++){const St=$.added[lt];let ut=x.indexOf(St);if(ut===-1){for(let Ft=0;Ft<M.length;Ft++)if(Ft>=x.length){x.push(St),ut=Ft;break}else if(x[Ft]===null){x[Ft]=St,ut=Ft;break}if(ut===-1)break}const Pt=M[ut];Pt&&Pt.connect(St)}}const V=new D,rt=new D;function I($,lt,St){V.setFromMatrixPosition(lt.matrixWorld),rt.setFromMatrixPosition(St.matrixWorld);const ut=V.distanceTo(rt),Pt=lt.projectionMatrix.elements,Ft=St.projectionMatrix.elements,Ot=Pt[14]/(Pt[10]-1),Zt=Pt[14]/(Pt[10]+1),st=(Pt[9]+1)/Pt[5],B=(Pt[9]-1)/Pt[5],w=(Pt[8]-1)/Pt[0],nt=(Ft[8]+1)/Ft[0],Z=Ot*w,K=Ot*nt,G=ut/(-w+nt),gt=G*-w;if(lt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(gt),$.translateZ(G),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pt[10]===-1)$.projectionMatrix.copy(lt.projectionMatrix),$.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const ht=Ot+G,T=Zt+G,S=Z-gt,k=K+(ut-gt),et=st*Zt/T*ht,it=B*Zt/T*ht;$.projectionMatrix.makePerspective(S,k,et,it,ht,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function j($,lt){lt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(lt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let lt=$.near,St=$.far;_.texture!==null&&(_.depthNear>0&&(lt=_.depthNear),_.depthFar>0&&(St=_.depthFar)),v.near=P.near=A.near=lt,v.far=P.far=A.far=St,(L!==v.near||O!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),L=v.near,O=v.far),A.layers.mask=$.layers.mask|2,P.layers.mask=$.layers.mask|4,v.layers.mask=A.layers.mask|P.layers.mask;const ut=$.parent,Pt=v.cameras;j(v,ut);for(let Ft=0;Ft<Pt.length;Ft++)j(Pt[Ft],ut);Pt.length===2?I(v,A,P):v.projectionMatrix.copy(A.projectionMatrix),Q($,v,ut)};function Q($,lt,St){St===null?$.matrix.copy(lt.matrixWorld):($.matrix.copy(St.matrixWorld),$.matrix.invert(),$.matrix.multiply(lt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(lt.projectionMatrix),$.projectionMatrixInverse.copy(lt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Lr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let W=null;function vt($,lt){if(u=lt.getViewerPose(c||o),g=lt,u!==null){const St=u.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let ut=!1;St.length!==v.cameras.length&&(v.cameras.length=0,ut=!0);for(let Ft=0;Ft<St.length;Ft++){const Ot=St[Ft];let Zt=null;if(d!==null)Zt=d.getViewport(Ot);else{const B=h.getViewSubImage(f,Ot);Zt=B.viewport,Ft===0&&(t.setRenderTargetTextures(y,B.colorTexture,f.ignoreDepthValues?void 0:B.depthStencilTexture),t.setRenderTarget(y))}let st=E[Ft];st===void 0&&(st=new $e,st.layers.enable(Ft),st.viewport=new me,E[Ft]=st),st.matrix.fromArray(Ot.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(Ot.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Ft===0&&(v.matrix.copy(st.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ut===!0&&v.cameras.push(st)}const Pt=r.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Ft=h.getDepthInformation(St[0]);Ft&&Ft.isValid&&Ft.texture&&_.init(t,Ft,r.renderState)}}for(let St=0;St<M.length;St++){const ut=x[St],Pt=M[St];ut!==null&&Pt!==void 0&&Pt.update(ut,lt,c||o)}W&&W($,lt),lt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:lt}),g=null}const at=new Cu;at.setAnimationLoop(vt),this.setAnimationLoop=function($){W=$},this.dispose=function(){}}}const Qn=new an,i_=new ie;function r_(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Tu(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Pe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Pe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),M=y.envMap,x=y.envMapRotation;M&&(m.envMap.value=M,Qn.copy(x),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),m.envMapRotation.value.setFromMatrix4(i_.makeRotationFromEuler(Qn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function s_(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){const x=M.program;i.uniformBlockBinding(y,x)}function c(y,M){let x=r[y.id];x===void 0&&(g(y),x=u(y),r[y.id]=x,y.addEventListener("dispose",m));const C=M.program;i.updateUBOMapping(y,C);const R=t.render.frame;s[y.id]!==R&&(f(y),s[y.id]=R)}function u(y){const M=h();y.__bindingPointIndex=M;const x=n.createBuffer(),C=y.__size,R=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,C,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,x),x}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const M=r[y.id],x=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let R=0,A=x.length;R<A;R++){const P=Array.isArray(x[R])?x[R]:[x[R]];for(let E=0,v=P.length;E<v;E++){const L=P[E];if(d(L,R,E,C)===!0){const O=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let H=0;for(let Y=0;Y<z.length;Y++){const V=z[Y],rt=_(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,O+H,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):(V.toArray(L.__data,H),H+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,M,x,C){const R=y.value,A=M+"_"+x;if(C[A]===void 0)return typeof R=="number"||typeof R=="boolean"?C[A]=R:C[A]=R.clone(),!0;{const P=C[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return C[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(y){const M=y.uniforms;let x=0;const C=16;for(let A=0,P=M.length;A<P;A++){const E=Array.isArray(M[A])?M[A]:[M[A]];for(let v=0,L=E.length;v<L;v++){const O=E[v],z=Array.isArray(O.value)?O.value:[O.value];for(let H=0,Y=z.length;H<Y;H++){const V=z[H],rt=_(V),I=x%C,j=I%rt.boundary,Q=I+j;x+=j,Q!==0&&C-Q<rt.storage&&(x+=C-Q),O.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=rt.storage}}}const R=x%C;return R>0&&(x+=C-R),y.__size=x,y.__cache={},this}function _(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){const M=y.target;M.removeEventListener("dispose",m);const x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const y in r)n.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class o_{constructor(t={}){const{canvas:e=Zf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const y=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=He,this.toneMapping=Vn,this.toneMappingExposure=1;const x=this;let C=!1,R=0,A=0,P=null,E=-1,v=null;const L=new me,O=new me;let z=null;const H=new dt(0);let Y=0,V=e.width,rt=e.height,I=1,j=null,Q=null;const W=new me(0,0,V,rt),vt=new me(0,0,V,rt);let at=!1;const $=new Va;let lt=!1,St=!1;const ut=new ie,Pt=new ie,Ft=new D,Ot=new me,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function B(){return P===null?I:1}let w=i;function nt(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Da}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",bt,!1),w===null){const N="webgl2";if(w=nt(N,b),w===null)throw nt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Z,K,G,gt,ht,T,S,k,et,it,tt,Tt,pt,Et,Gt,ct,Rt,Bt,kt,Lt,Kt,qt,ae,U;function yt(){Z=new h0(w),Z.init(),qt=new $g(w,Z),K=new s0(w,Z,t,qt),G=new Yg(w,Z),K.reverseDepthBuffer&&f&&G.buffers.depth.setReversed(!0),gt=new p0(w),ht=new Dg,T=new Kg(w,Z,G,ht,K,qt,gt),S=new a0(x),k=new u0(x),et=new yd(w),ae=new i0(w,et),it=new f0(w,et,gt,ae),tt=new g0(w,it,et,gt),kt=new m0(w,K,T),ct=new o0(ht),Tt=new Lg(x,S,k,Z,K,ae,ct),pt=new r_(x,ht),Et=new Ug,Gt=new kg(Z),Bt=new n0(x,S,k,G,tt,d,l),Rt=new Xg(x,tt,K),U=new s_(w,gt,K,G),Lt=new r0(w,Z,gt),Kt=new d0(w,Z,gt),gt.programs=Tt.programs,x.capabilities=K,x.extensions=Z,x.properties=ht,x.renderLists=Et,x.shadowMap=Rt,x.state=G,x.info=gt}yt();const J=new n_(x,w);this.xr=J,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const b=Z.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Z.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(b){b!==void 0&&(I=b,this.setSize(V,rt,!1))},this.getSize=function(b){return b.set(V,rt)},this.setSize=function(b,N,X=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,rt=N,e.width=Math.floor(b*I),e.height=Math.floor(N*I),X===!0&&(e.style.width=b+"px",e.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(V*I,rt*I).floor()},this.setDrawingBufferSize=function(b,N,X){V=b,rt=N,I=X,e.width=Math.floor(b*X),e.height=Math.floor(N*X),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(L)},this.getViewport=function(b){return b.copy(W)},this.setViewport=function(b,N,X,q){b.isVector4?W.set(b.x,b.y,b.z,b.w):W.set(b,N,X,q),G.viewport(L.copy(W).multiplyScalar(I).round())},this.getScissor=function(b){return b.copy(vt)},this.setScissor=function(b,N,X,q){b.isVector4?vt.set(b.x,b.y,b.z,b.w):vt.set(b,N,X,q),G.scissor(O.copy(vt).multiplyScalar(I).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(b){G.setScissorTest(at=b)},this.setOpaqueSort=function(b){j=b},this.setTransparentSort=function(b){Q=b},this.getClearColor=function(b){return b.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(b=!0,N=!0,X=!0){let q=0;if(b){let F=!1;if(P!==null){const ft=P.texture.format;F=ft===Ba||ft===za||ft===Oa}if(F){const ft=P.texture.type,wt=ft===An||ft===ci||ft===Pr||ft===Ji||ft===Ua||ft===Na,Dt=Bt.getClearColor(),It=Bt.getClearAlpha(),Ht=Dt.r,Wt=Dt.g,Ut=Dt.b;wt?(g[0]=Ht,g[1]=Wt,g[2]=Ut,g[3]=It,w.clearBufferuiv(w.COLOR,0,g)):(_[0]=Ht,_[1]=Wt,_[2]=Ut,_[3]=It,w.clearBufferiv(w.COLOR,0,_))}else q|=w.COLOR_BUFFER_BIT}N&&(q|=w.DEPTH_BUFFER_BIT),X&&(q|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Et.dispose(),Gt.dispose(),ht.dispose(),S.dispose(),k.dispose(),tt.dispose(),ae.dispose(),U.dispose(),Tt.dispose(),J.dispose(),J.removeEventListener("sessionstart",sl),J.removeEventListener("sessionend",ol),Yn.stop()};function ot(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const b=gt.autoReset,N=Rt.enabled,X=Rt.autoUpdate,q=Rt.needsUpdate,F=Rt.type;yt(),gt.autoReset=b,Rt.enabled=N,Rt.autoUpdate=X,Rt.needsUpdate=q,Rt.type=F}function bt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Vt(b){const N=b.target;N.removeEventListener("dispose",Vt),pe(N)}function pe(b){we(b),ht.remove(b)}function we(b){const N=ht.get(b).programs;N!==void 0&&(N.forEach(function(X){Tt.releaseProgram(X)}),b.isShaderMaterial&&Tt.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,X,q,F,ft){N===null&&(N=Zt);const wt=F.isMesh&&F.matrixWorld.determinant()<0,Dt=bh(b,N,X,q,F);G.setMaterial(q,wt);let It=X.index,Ht=1;if(q.wireframe===!0){if(It=it.getWireframeAttribute(X),It===void 0)return;Ht=2}const Wt=X.drawRange,Ut=X.attributes.position;let jt=Wt.start*Ht,le=(Wt.start+Wt.count)*Ht;ft!==null&&(jt=Math.max(jt,ft.start*Ht),le=Math.min(le,(ft.start+ft.count)*Ht)),It!==null?(jt=Math.max(jt,0),le=Math.min(le,It.count)):Ut!=null&&(jt=Math.max(jt,0),le=Math.min(le,Ut.count));const ce=le-jt;if(ce<0||ce===1/0)return;ae.setup(F,q,Dt,X,It);let Ie,Qt=Lt;if(It!==null&&(Ie=et.get(It),Qt=Kt,Qt.setIndex(Ie)),F.isMesh)q.wireframe===!0?(G.setLineWidth(q.wireframeLinewidth*B()),Qt.setMode(w.LINES)):Qt.setMode(w.TRIANGLES);else if(F.isLine){let Nt=q.linewidth;Nt===void 0&&(Nt=1),G.setLineWidth(Nt*B()),F.isLineSegments?Qt.setMode(w.LINES):F.isLineLoop?Qt.setMode(w.LINE_LOOP):Qt.setMode(w.LINE_STRIP)}else F.isPoints?Qt.setMode(w.POINTS):F.isSprite&&Qt.setMode(w.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Qt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))Qt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Nt=F._multiDrawStarts,gn=F._multiDrawCounts,te=F._multiDrawCount,tn=It?et.get(It).bytesPerElement:1,_i=ht.get(q).currentProgram.getUniforms();for(let Oe=0;Oe<te;Oe++)_i.setValue(w,"_gl_DrawID",Oe),Qt.render(Nt[Oe]/tn,gn[Oe])}else if(F.isInstancedMesh)Qt.renderInstances(jt,ce,F.count);else if(X.isInstancedBufferGeometry){const Nt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,gn=Math.min(X.instanceCount,Nt);Qt.renderInstances(jt,ce,gn)}else Qt.render(jt,ce)};function ee(b,N,X){b.transparent===!0&&b.side===Ue&&b.forceSinglePass===!1?(b.side=Pe,b.needsUpdate=!0,Vr(b,N,X),b.side=Wn,b.needsUpdate=!0,Vr(b,N,X),b.side=Ue):Vr(b,N,X)}this.compile=function(b,N,X=null){X===null&&(X=b),p=Gt.get(X),p.init(N),M.push(p),X.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),b!==X&&b.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const q=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ft=F.material;if(ft)if(Array.isArray(ft))for(let wt=0;wt<ft.length;wt++){const Dt=ft[wt];ee(Dt,X,F),q.add(Dt)}else ee(ft,X,F),q.add(ft)}),M.pop(),p=null,q},this.compileAsync=function(b,N,X=null){const q=this.compile(b,N,X);return new Promise(F=>{function ft(){if(q.forEach(function(wt){ht.get(wt).currentProgram.isReady()&&q.delete(wt)}),q.size===0){F(b);return}setTimeout(ft,10)}Z.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Qe=null;function mn(b){Qe&&Qe(b)}function sl(){Yn.stop()}function ol(){Yn.start()}const Yn=new Cu;Yn.setAnimationLoop(mn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(b){Qe=b,J.setAnimationLoop(b),b===null?Yn.stop():Yn.start()},J.addEventListener("sessionstart",sl),J.addEventListener("sessionend",ol),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(N),N=J.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,N,P),p=Gt.get(b,M.length),p.init(N),M.push(p),Pt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$.setFromProjectionMatrix(Pt),St=this.localClippingEnabled,lt=ct.init(this.clippingPlanes,St),m=Et.get(b,y.length),m.init(),y.push(m),J.enabled===!0&&J.isPresenting===!0){const ft=x.xr.getDepthSensingMesh();ft!==null&&Vs(ft,N,-1/0,x.sortObjects)}Vs(b,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(j,Q),st=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,st&&Bt.addToRenderList(m,b),this.info.render.frame++,lt===!0&&ct.beginShadows();const X=p.state.shadowsArray;Rt.render(X,b,N),lt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const ft=N.cameras;if(F.length>0)for(let wt=0,Dt=ft.length;wt<Dt;wt++){const It=ft[wt];ll(q,F,b,It)}st&&Bt.render(b);for(let wt=0,Dt=ft.length;wt<Dt;wt++){const It=ft[wt];al(m,b,It,It.viewport)}}else F.length>0&&ll(q,F,b,N),st&&Bt.render(b),al(m,b,N);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(x,b,N),ae.resetDefaultState(),E=-1,v=null,M.pop(),M.length>0?(p=M[M.length-1],lt===!0&&ct.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Vs(b,N,X,q){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||$.intersectsSprite(b)){q&&Ot.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Pt);const wt=tt.update(b),Dt=b.material;Dt.visible&&m.push(b,wt,Dt,X,Ot.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||$.intersectsObject(b))){const wt=tt.update(b),Dt=b.material;if(q&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ot.copy(b.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Ot.copy(wt.boundingSphere.center)),Ot.applyMatrix4(b.matrixWorld).applyMatrix4(Pt)),Array.isArray(Dt)){const It=wt.groups;for(let Ht=0,Wt=It.length;Ht<Wt;Ht++){const Ut=It[Ht],jt=Dt[Ut.materialIndex];jt&&jt.visible&&m.push(b,wt,jt,X,Ot.z,Ut)}}else Dt.visible&&m.push(b,wt,Dt,X,Ot.z,null)}}const ft=b.children;for(let wt=0,Dt=ft.length;wt<Dt;wt++)Vs(ft[wt],N,X,q)}function al(b,N,X,q){const F=b.opaque,ft=b.transmissive,wt=b.transparent;p.setupLightsView(X),lt===!0&&ct.setGlobalState(x.clippingPlanes,X),q&&G.viewport(L.copy(q)),F.length>0&&Gr(F,N,X),ft.length>0&&Gr(ft,N,X),wt.length>0&&Gr(wt,N,X),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function ll(b,N,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new ui(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?kr:An,minFilter:oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const ft=p.state.transmissionRenderTarget[q.id],wt=q.viewport||L;ft.setSize(wt.z,wt.w);const Dt=x.getRenderTarget();x.setRenderTarget(ft),x.getClearColor(H),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),st&&Bt.render(X);const It=x.toneMapping;x.toneMapping=Vn;const Ht=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),lt===!0&&ct.setGlobalState(x.clippingPlanes,q),Gr(b,X,q),T.updateMultisampleRenderTarget(ft),T.updateRenderTargetMipmap(ft),Z.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Ut=0,jt=N.length;Ut<jt;Ut++){const le=N[Ut],ce=le.object,Ie=le.geometry,Qt=le.material,Nt=le.group;if(Qt.side===Ue&&ce.layers.test(q.layers)){const gn=Qt.side;Qt.side=Pe,Qt.needsUpdate=!0,cl(ce,X,q,Ie,Qt,Nt),Qt.side=gn,Qt.needsUpdate=!0,Wt=!0}}Wt===!0&&(T.updateMultisampleRenderTarget(ft),T.updateRenderTargetMipmap(ft))}x.setRenderTarget(Dt),x.setClearColor(H,Y),Ht!==void 0&&(q.viewport=Ht),x.toneMapping=It}function Gr(b,N,X){const q=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ft=b.length;F<ft;F++){const wt=b[F],Dt=wt.object,It=wt.geometry,Ht=q===null?wt.material:q,Wt=wt.group;Dt.layers.test(X.layers)&&cl(Dt,N,X,It,Ht,Wt)}}function cl(b,N,X,q,F,ft){b.onBeforeRender(x,N,X,q,F,ft),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,N,X,q,b,ft),F.transparent===!0&&F.side===Ue&&F.forceSinglePass===!1?(F.side=Pe,F.needsUpdate=!0,x.renderBufferDirect(X,N,q,F,b,ft),F.side=Wn,F.needsUpdate=!0,x.renderBufferDirect(X,N,q,F,b,ft),F.side=Ue):x.renderBufferDirect(X,N,q,F,b,ft),b.onAfterRender(x,N,X,q,F,ft)}function Vr(b,N,X){N.isScene!==!0&&(N=Zt);const q=ht.get(b),F=p.state.lights,ft=p.state.shadowsArray,wt=F.state.version,Dt=Tt.getParameters(b,F.state,ft,N,X),It=Tt.getProgramCacheKey(Dt);let Ht=q.programs;q.environment=b.isMeshStandardMaterial?N.environment:null,q.fog=N.fog,q.envMap=(b.isMeshStandardMaterial?k:S).get(b.envMap||q.environment),q.envMapRotation=q.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ht===void 0&&(b.addEventListener("dispose",Vt),Ht=new Map,q.programs=Ht);let Wt=Ht.get(It);if(Wt!==void 0){if(q.currentProgram===Wt&&q.lightsStateVersion===wt)return hl(b,Dt),Wt}else Dt.uniforms=Tt.getUniforms(b),b.onBeforeCompile(Dt,x),Wt=Tt.acquireProgram(Dt,It),Ht.set(It,Wt),q.uniforms=Dt.uniforms;const Ut=q.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ut.clippingPlanes=ct.uniform),hl(b,Dt),q.needsLights=Th(b),q.lightsStateVersion=wt,q.needsLights&&(Ut.ambientLightColor.value=F.state.ambient,Ut.lightProbe.value=F.state.probe,Ut.directionalLights.value=F.state.directional,Ut.directionalLightShadows.value=F.state.directionalShadow,Ut.spotLights.value=F.state.spot,Ut.spotLightShadows.value=F.state.spotShadow,Ut.rectAreaLights.value=F.state.rectArea,Ut.ltc_1.value=F.state.rectAreaLTC1,Ut.ltc_2.value=F.state.rectAreaLTC2,Ut.pointLights.value=F.state.point,Ut.pointLightShadows.value=F.state.pointShadow,Ut.hemisphereLights.value=F.state.hemi,Ut.directionalShadowMap.value=F.state.directionalShadowMap,Ut.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ut.spotShadowMap.value=F.state.spotShadowMap,Ut.spotLightMatrix.value=F.state.spotLightMatrix,Ut.spotLightMap.value=F.state.spotLightMap,Ut.pointShadowMap.value=F.state.pointShadowMap,Ut.pointShadowMatrix.value=F.state.pointShadowMatrix),q.currentProgram=Wt,q.uniformsList=null,Wt}function ul(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=ws.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function hl(b,N){const X=ht.get(b);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function bh(b,N,X,q,F){N.isScene!==!0&&(N=Zt),T.resetTextureUnits();const ft=N.fog,wt=q.isMeshStandardMaterial?N.environment:null,Dt=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:nr,It=(q.isMeshStandardMaterial?k:S).get(q.envMap||wt),Ht=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Wt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ut=!!X.morphAttributes.position,jt=!!X.morphAttributes.normal,le=!!X.morphAttributes.color;let ce=Vn;q.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ce=x.toneMapping);const Ie=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Qt=Ie!==void 0?Ie.length:0,Nt=ht.get(q),gn=p.state.lights;if(lt===!0&&(St===!0||b!==v)){const We=b===v&&q.id===E;ct.setState(q,b,We)}let te=!1;q.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==gn.state.version||Nt.outputColorSpace!==Dt||F.isBatchedMesh&&Nt.batching===!1||!F.isBatchedMesh&&Nt.batching===!0||F.isBatchedMesh&&Nt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Nt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Nt.instancing===!1||!F.isInstancedMesh&&Nt.instancing===!0||F.isSkinnedMesh&&Nt.skinning===!1||!F.isSkinnedMesh&&Nt.skinning===!0||F.isInstancedMesh&&Nt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Nt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Nt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Nt.instancingMorph===!1&&F.morphTexture!==null||Nt.envMap!==It||q.fog===!0&&Nt.fog!==ft||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==ct.numPlanes||Nt.numIntersection!==ct.numIntersection)||Nt.vertexAlphas!==Ht||Nt.vertexTangents!==Wt||Nt.morphTargets!==Ut||Nt.morphNormals!==jt||Nt.morphColors!==le||Nt.toneMapping!==ce||Nt.morphTargetsCount!==Qt)&&(te=!0):(te=!0,Nt.__version=q.version);let tn=Nt.currentProgram;te===!0&&(tn=Vr(q,N,F));let _i=!1,Oe=!1,cr=!1;const ue=tn.getUniforms(),ln=Nt.uniforms;if(G.useProgram(tn.program)&&(_i=!0,Oe=!0,cr=!0),q.id!==E&&(E=q.id,Oe=!0),_i||v!==b){G.buffers.depth.getReversed()?(ut.copy(b.projectionMatrix),$f(ut),Jf(ut),ue.setValue(w,"projectionMatrix",ut)):ue.setValue(w,"projectionMatrix",b.projectionMatrix),ue.setValue(w,"viewMatrix",b.matrixWorldInverse);const Pn=ue.map.cameraPosition;Pn!==void 0&&Pn.setValue(w,Ft.setFromMatrixPosition(b.matrixWorld)),K.logarithmicDepthBuffer&&ue.setValue(w,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ue.setValue(w,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,Oe=!0,cr=!0)}if(F.isSkinnedMesh){ue.setOptional(w,F,"bindMatrix"),ue.setOptional(w,F,"bindMatrixInverse");const We=F.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),ue.setValue(w,"boneTexture",We.boneTexture,T))}F.isBatchedMesh&&(ue.setOptional(w,F,"batchingTexture"),ue.setValue(w,"batchingTexture",F._matricesTexture,T),ue.setOptional(w,F,"batchingIdTexture"),ue.setValue(w,"batchingIdTexture",F._indirectTexture,T),ue.setOptional(w,F,"batchingColorTexture"),F._colorsTexture!==null&&ue.setValue(w,"batchingColorTexture",F._colorsTexture,T));const ur=X.morphAttributes;if((ur.position!==void 0||ur.normal!==void 0||ur.color!==void 0)&&kt.update(F,X,tn),(Oe||Nt.receiveShadow!==F.receiveShadow)&&(Nt.receiveShadow=F.receiveShadow,ue.setValue(w,"receiveShadow",F.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(ln.envMap.value=It,ln.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&N.environment!==null&&(ln.envMapIntensity.value=N.environmentIntensity),Oe&&(ue.setValue(w,"toneMappingExposure",x.toneMappingExposure),Nt.needsLights&&wh(ln,cr),ft&&q.fog===!0&&pt.refreshFogUniforms(ln,ft),pt.refreshMaterialUniforms(ln,q,I,rt,p.state.transmissionRenderTarget[b.id]),ws.upload(w,ul(Nt),ln,T)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ws.upload(w,ul(Nt),ln,T),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ue.setValue(w,"center",F.center),ue.setValue(w,"modelViewMatrix",F.modelViewMatrix),ue.setValue(w,"normalMatrix",F.normalMatrix),ue.setValue(w,"modelMatrix",F.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const We=q.uniformsGroups;for(let Pn=0,Ln=We.length;Pn<Ln;Pn++){const fl=We[Pn];U.update(fl,tn),U.bind(fl,tn)}}return tn}function wh(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function Th(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,N,X){ht.get(b.texture).__webglTexture=N,ht.get(b.depthTexture).__webglTexture=X;const q=ht.get(b);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||Z.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){const X=ht.get(b);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,X=0){P=b,R=N,A=X;let q=!0,F=null,ft=!1,wt=!1;if(b){const It=ht.get(b);if(It.__useDefaultFramebuffer!==void 0)G.bindFramebuffer(w.FRAMEBUFFER,null),q=!1;else if(It.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(It.__hasExternalTextures)T.rebindTextures(b,ht.get(b.texture).__webglTexture,ht.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ut=b.depthTexture;if(It.__boundDepthTexture!==Ut){if(Ut!==null&&ht.has(Ut)&&(b.width!==Ut.image.width||b.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}const Ht=b.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(wt=!0);const Wt=ht.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Wt[N])?F=Wt[N][X]:F=Wt[N],ft=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?F=ht.get(b).__webglMultisampledFramebuffer:Array.isArray(Wt)?F=Wt[X]:F=Wt,L.copy(b.viewport),O.copy(b.scissor),z=b.scissorTest}else L.copy(W).multiplyScalar(I).floor(),O.copy(vt).multiplyScalar(I).floor(),z=at;if(G.bindFramebuffer(w.FRAMEBUFFER,F)&&q&&G.drawBuffers(b,F),G.viewport(L),G.scissor(O),G.setScissorTest(z),ft){const It=ht.get(b.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+N,It.__webglTexture,X)}else if(wt){const It=ht.get(b.texture),Ht=N||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,It.__webglTexture,X||0,Ht)}E=-1},this.readRenderTargetPixels=function(b,N,X,q,F,ft,wt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=ht.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&wt!==void 0&&(Dt=Dt[wt]),Dt){G.bindFramebuffer(w.FRAMEBUFFER,Dt);try{const It=b.texture,Ht=It.format,Wt=It.type;if(!K.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-q&&X>=0&&X<=b.height-F&&w.readPixels(N,X,q,F,qt.convert(Ht),qt.convert(Wt),ft)}finally{const It=P!==null?ht.get(P).__webglFramebuffer:null;G.bindFramebuffer(w.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(b,N,X,q,F,ft,wt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=ht.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&wt!==void 0&&(Dt=Dt[wt]),Dt){const It=b.texture,Ht=It.format,Wt=It.type;if(!K.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=b.width-q&&X>=0&&X<=b.height-F){G.bindFramebuffer(w.FRAMEBUFFER,Dt);const Ut=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Ut),w.bufferData(w.PIXEL_PACK_BUFFER,ft.byteLength,w.STREAM_READ),w.readPixels(N,X,q,F,qt.convert(Ht),qt.convert(Wt),0);const jt=P!==null?ht.get(P).__webglFramebuffer:null;G.bindFramebuffer(w.FRAMEBUFFER,jt);const le=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Kf(w,le,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Ut),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,ft),w.deleteBuffer(Ut),w.deleteSync(le),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,N=null,X=0){b.isTexture!==!0&&(yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,b=arguments[1]);const q=Math.pow(2,-X),F=Math.floor(b.image.width*q),ft=Math.floor(b.image.height*q),wt=N!==null?N.x:0,Dt=N!==null?N.y:0;T.setTexture2D(b,0),w.copyTexSubImage2D(w.TEXTURE_2D,X,0,0,wt,Dt,F,ft),G.unbindTexture()},this.copyTextureToTexture=function(b,N,X=null,q=null,F=0){b.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,b=arguments[1],N=arguments[2],F=arguments[3]||0,X=null);let ft,wt,Dt,It,Ht,Wt,Ut,jt,le;const ce=b.isCompressedTexture?b.mipmaps[F]:b.image;X!==null?(ft=X.max.x-X.min.x,wt=X.max.y-X.min.y,Dt=X.isBox3?X.max.z-X.min.z:1,It=X.min.x,Ht=X.min.y,Wt=X.isBox3?X.min.z:0):(ft=ce.width,wt=ce.height,Dt=ce.depth||1,It=0,Ht=0,Wt=0),q!==null?(Ut=q.x,jt=q.y,le=q.z):(Ut=0,jt=0,le=0);const Ie=qt.convert(N.format),Qt=qt.convert(N.type);let Nt;N.isData3DTexture?(T.setTexture3D(N,0),Nt=w.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Nt=w.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Nt=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,N.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,N.unpackAlignment);const gn=w.getParameter(w.UNPACK_ROW_LENGTH),te=w.getParameter(w.UNPACK_IMAGE_HEIGHT),tn=w.getParameter(w.UNPACK_SKIP_PIXELS),_i=w.getParameter(w.UNPACK_SKIP_ROWS),Oe=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,ce.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ce.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,It),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ht),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Wt);const cr=b.isDataArrayTexture||b.isData3DTexture,ue=N.isDataArrayTexture||N.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const ln=ht.get(b),ur=ht.get(N),We=ht.get(ln.__renderTarget),Pn=ht.get(ur.__renderTarget);G.bindFramebuffer(w.READ_FRAMEBUFFER,We.__webglFramebuffer),G.bindFramebuffer(w.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<Dt;Ln++)cr&&w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ht.get(b).__webglTexture,F,Wt+Ln),b.isDepthTexture?(ue&&w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ht.get(N).__webglTexture,F,le+Ln),w.blitFramebuffer(It,Ht,ft,wt,Ut,jt,ft,wt,w.DEPTH_BUFFER_BIT,w.NEAREST)):ue?w.copyTexSubImage3D(Nt,F,Ut,jt,le+Ln,It,Ht,ft,wt):w.copyTexSubImage2D(Nt,F,Ut,jt,le+Ln,It,Ht,ft,wt);G.bindFramebuffer(w.READ_FRAMEBUFFER,null),G.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else ue?b.isDataTexture||b.isData3DTexture?w.texSubImage3D(Nt,F,Ut,jt,le,ft,wt,Dt,Ie,Qt,ce.data):N.isCompressedArrayTexture?w.compressedTexSubImage3D(Nt,F,Ut,jt,le,ft,wt,Dt,Ie,ce.data):w.texSubImage3D(Nt,F,Ut,jt,le,ft,wt,Dt,Ie,Qt,ce):b.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,F,Ut,jt,ft,wt,Ie,Qt,ce.data):b.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,F,Ut,jt,ce.width,ce.height,Ie,ce.data):w.texSubImage2D(w.TEXTURE_2D,F,Ut,jt,ft,wt,Ie,Qt,ce);w.pixelStorei(w.UNPACK_ROW_LENGTH,gn),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,te),w.pixelStorei(w.UNPACK_SKIP_PIXELS,tn),w.pixelStorei(w.UNPACK_SKIP_ROWS,_i),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Oe),F===0&&N.generateMipmaps&&w.generateMipmap(Nt),G.unbindTexture()},this.copyTextureToTexture3D=function(b,N,X=null,q=null,F=0){return b.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,b=arguments[2],N=arguments[3],F=arguments[4]||0),yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,N,X,q,F)},this.initRenderTarget=function(b){ht.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),G.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,G.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}class Xa{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new dt(t),this.near=e,this.far=i}clone(){return new Xa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class a_ extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class l_ extends Le{constructor(t=null,e=1,i=1,r,s,o,a,l,c=Ve,u=Ve,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pc extends re{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Di=new ie,mc=new ie,hs=[],gc=new gi,c_=new ie,mr=new $t,gr=new sr;class vo extends $t{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,c_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new gi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Di),gc.copy(t.boundingBox).applyMatrix4(Di),this.boundingBox.union(gc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new sr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Di),gr.copy(t.boundingSphere).applyMatrix4(Di),this.boundingSphere.union(gr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(t,e){const i=this.matrixWorld,r=this.count;if(mr.geometry=this.geometry,mr.material=this.material,mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(i),t.ray.intersectsSphere(gr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Di),mc.multiplyMatrices(i,Di),mr.matrixWorld=mc,mr.raycast(t,hs);for(let o=0,a=hs.length;o<a;o++){const l=hs[o];l.instanceId=s,l.object=this,e.push(l)}hs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new pc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new l_(new Float32Array(r*this.count),r,this.count,Fa,fn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*t;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Fu extends or{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const _c=new ie,ma=new Ha,fs=new sr,ds=new D;class u_ extends xe{constructor(t=new _e,e=new Fu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fs.copy(i.boundingSphere),fs.applyMatrix4(r),fs.radius+=s,t.ray.intersectsSphere(fs)===!1)return;_c.copy(r).invert(),ma.copy(t.ray).applyMatrix4(_c);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=c.getX(g);ds.fromBufferAttribute(h,m),xc(ds,m,l,r,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)ds.fromBufferAttribute(h,g),xc(ds,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function xc(n,t,e,i,r,s,o){const a=ma.distanceSqToPoint(n);if(a<e){const l=new D;ma.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],f=i[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new mt:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new D,r=[],s=[],o=[],a=new D,l=new ie;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new D)}s[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ee(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(Ee(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class qa extends pn{constructor(t=0,e=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new mt){const i=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class h_ extends qa{constructor(t,e,i,r,s,o){super(t,e,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ya(){let n=0,t=0,e=0,i=0;function r(s,o,a,l){n=s,t=a,e=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return n+t*s+e*o+i*a}}}const ps=new D,Mo=new Ya,yo=new Ya,So=new Ya;class f_ extends pn{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new D){const i=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(ps.subVectors(r[0],r[1]).add(r[0]),c=ps);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(ps.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=ps),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Mo.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,_,m),yo.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,_,m),So.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Mo.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),yo.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),So.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(Mo.calc(l),yo.calc(l),So.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new D().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function vc(n,t,e,i,r){const s=(i-t)*.5,o=(r-e)*.5,a=n*n,l=n*a;return(2*e-2*i+s+o)*l+(-3*e+3*i-2*s-o)*a+s*n+e}function d_(n,t){const e=1-n;return e*e*t}function p_(n,t){return 2*(1-n)*n*t}function m_(n,t){return n*n*t}function wr(n,t,e,i){return d_(n,t)+p_(n,e)+m_(n,i)}function g_(n,t){const e=1-n;return e*e*e*t}function __(n,t){const e=1-n;return 3*e*e*n*t}function x_(n,t){return 3*(1-n)*n*n*t}function v_(n,t){return n*n*n*t}function Tr(n,t,e,i,r){return g_(n,t)+__(n,e)+x_(n,i)+v_(n,r)}class Ou extends pn{constructor(t=new mt,e=new mt,i=new mt,r=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new mt){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Tr(t,r.x,s.x,o.x,a.x),Tr(t,r.y,s.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class M_ extends pn{constructor(t=new D,e=new D,i=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new D){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Tr(t,r.x,s.x,o.x,a.x),Tr(t,r.y,s.y,o.y,a.y),Tr(t,r.z,s.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zu extends pn{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y_ extends pn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bu extends pn{constructor(t=new mt,e=new mt,i=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new mt){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(wr(t,r.x,s.x,o.x),wr(t,r.y,s.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class S_ extends pn{constructor(t=new D,e=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new D){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(wr(t,r.x,s.x,o.x),wr(t,r.y,s.y,o.y),wr(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ku extends pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const i=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(vc(a,l.x,c.x,u.x,h.x),vc(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new mt().fromArray(r))}return this}}var ga=Object.freeze({__proto__:null,ArcCurve:h_,CatmullRomCurve3:f_,CubicBezierCurve:Ou,CubicBezierCurve3:M_,EllipseCurve:qa,LineCurve:zu,LineCurve3:y_,QuadraticBezierCurve:Bu,QuadraticBezierCurve3:S_,SplineCurve:ku});class E_ extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ga[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new ga[r.type]().fromJSON(r))}return this}}class Mc extends E_{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new zu(this.currentPoint.clone(),new mt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const s=new Bu(this.currentPoint.clone(),new mt(t,e),new mt(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,o){const a=new Ou(this.currentPoint.clone(),new mt(t,e),new mt(i,r),new mt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new ku(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,r,s,o),this}absarc(t,e,i,r,s,o){return this.absellipse(t,e,i,i,r,s,o),this}ellipse(t,e,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,r,s,o,a,l),this}absellipse(t,e,i,r,s,o,a,l){const c=new qa(t,e,i,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Wi extends _e{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new D,u=new mt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const d=i+h/e*r;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(a,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Je extends _e{constructor(t=1,e=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],m=i/2;let p=0;y(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new he(h,3)),this.setAttribute("normal",new he(f,3)),this.setAttribute("uv",new he(d,2));function y(){const x=new D,C=new D;let R=0;const A=(e-t)/i;for(let P=0;P<=s;P++){const E=[],v=P/s,L=v*(e-t)+t;for(let O=0;O<=r;O++){const z=O/r,H=z*l+a,Y=Math.sin(H),V=Math.cos(H);C.x=L*Y,C.y=-v*i+m,C.z=L*V,h.push(C.x,C.y,C.z),x.set(Y,A,V).normalize(),f.push(x.x,x.y,x.z),d.push(z,1-v),E.push(g++)}_.push(E)}for(let P=0;P<r;P++)for(let E=0;E<s;E++){const v=_[E][P],L=_[E+1][P],O=_[E+1][P+1],z=_[E][P+1];(t>0||E!==0)&&(u.push(v,L,z),R+=3),(e>0||E!==s-1)&&(u.push(L,O,z),R+=3)}c.addGroup(p,R,0),p+=R}function M(x){const C=g,R=new mt,A=new D;let P=0;const E=x===!0?t:e,v=x===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,m*v,0),f.push(0,v,0),d.push(.5,.5),g++;const L=g;for(let O=0;O<=r;O++){const H=O/r*l+a,Y=Math.cos(H),V=Math.sin(H);A.x=E*V,A.y=m*v,A.z=E*Y,h.push(A.x,A.y,A.z),f.push(0,v,0),R.x=Y*.5+.5,R.y=V*.5*v+.5,d.push(R.x,R.y),g++}for(let O=0;O<r;O++){const z=C+O,H=L+O;x===!0?u.push(H,H+1,z):u.push(H+1,H,z),P+=3}c.addGroup(p,P,x===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xi extends Je{constructor(t=1,e=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Xi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Za extends _e{constructor(t=[],e=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new he(s,3)),this.setAttribute("normal",new he(s.slice(),3)),this.setAttribute("uv",new he(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const M=new D,x=new D,C=new D;for(let R=0;R<e.length;R+=3)d(e[R+0],M),d(e[R+1],x),d(e[R+2],C),l(M,x,C,y)}function l(y,M,x,C){const R=C+1,A=[];for(let P=0;P<=R;P++){A[P]=[];const E=y.clone().lerp(x,P/R),v=M.clone().lerp(x,P/R),L=R-P;for(let O=0;O<=L;O++)O===0&&P===R?A[P][O]=E:A[P][O]=E.clone().lerp(v,O/L)}for(let P=0;P<R;P++)for(let E=0;E<2*(R-P)-1;E++){const v=Math.floor(E/2);E%2===0?(f(A[P][v+1]),f(A[P+1][v]),f(A[P][v])):(f(A[P][v+1]),f(A[P+1][v+1]),f(A[P+1][v]))}}function c(y){const M=new D;for(let x=0;x<s.length;x+=3)M.x=s[x+0],M.y=s[x+1],M.z=s[x+2],M.normalize().multiplyScalar(y),s[x+0]=M.x,s[x+1]=M.y,s[x+2]=M.z}function u(){const y=new D;for(let M=0;M<s.length;M+=3){y.x=s[M+0],y.y=s[M+1],y.z=s[M+2];const x=m(y)/2/Math.PI+.5,C=p(y)/Math.PI+.5;o.push(x,1-C)}g(),h()}function h(){for(let y=0;y<o.length;y+=6){const M=o[y+0],x=o[y+2],C=o[y+4],R=Math.max(M,x,C),A=Math.min(M,x,C);R>.9&&A<.1&&(M<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),C<.2&&(o[y+4]+=1))}}function f(y){s.push(y.x,y.y,y.z)}function d(y,M){const x=y*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function g(){const y=new D,M=new D,x=new D,C=new D,R=new mt,A=new mt,P=new mt;for(let E=0,v=0;E<s.length;E+=9,v+=6){y.set(s[E+0],s[E+1],s[E+2]),M.set(s[E+3],s[E+4],s[E+5]),x.set(s[E+6],s[E+7],s[E+8]),R.set(o[v+0],o[v+1]),A.set(o[v+2],o[v+3]),P.set(o[v+4],o[v+5]),C.copy(y).add(M).add(x).divideScalar(3);const L=m(C);_(R,v+0,y,L),_(A,v+2,M,L),_(P,v+4,x,L)}}function _(y,M,x,C){C<0&&y.x===1&&(o[M]=y.x-1),x.x===0&&x.z===0&&(o[M]=C/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Za(t.vertices,t.indices,t.radius,t.details)}}class Ka extends Za{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ka(t.radius,t.detail)}}class Hu extends Mc{constructor(t){super(t),this.uuid=mi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(new Mc().fromJSON(r))}return this}}const b_={triangulate:function(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let s=Gu(n,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,f,d;if(i&&(s=C_(n,t,s,e)),n.length>80*e){a=c=n[0],l=u=n[1];for(let g=e;g<r;g+=e)h=n[g],f=n[g+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Dr(s,o,e,a,l,d,0),o}};function Gu(n,t,e,i,r){let s,o;if(r===k_(n,t,e,i)>0)for(s=t;s<e;s+=i)o=yc(s,n[s],n[s+1],o);else for(s=e-i;s>=t;s-=i)o=yc(s,n[s],n[s+1],o);return o&&Bs(o,o.next)&&(Ur(o),o=o.next),o}function fi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Bs(e,e.next)||de(e.prev,e,e.next)===0)){if(Ur(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Dr(n,t,e,i,r,s,o){if(!n)return;!o&&s&&U_(n,i,r,s);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,s?T_(n,i,r,s):w_(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),Ur(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=A_(fi(n),t,e),Dr(n,t,e,i,r,s,2)):o===2&&R_(n,t,e,i,r,s):Dr(fi(n),t,e,i,r,s,1);break}}}function w_(n){const t=n.prev,e=n,i=n.next;if(de(t,e,i)>=0)return!1;const r=t.x,s=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=r<s?r<o?r:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&zi(r,a,s,l,o,c,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function T_(n,t,e,i){const r=n.prev,s=n,o=n.next;if(de(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=u<h?u<f?u:f:h<f?h:f,_=a>l?a>c?a:c:l>c?l:c,m=u>h?u>f?u:f:h>f?h:f,p=_a(d,g,t,e,i),y=_a(_,m,t,e,i);let M=n.prevZ,x=n.nextZ;for(;M&&M.z>=p&&x&&x.z<=y;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==o&&zi(a,u,l,h,c,f,M.x,M.y)&&de(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&zi(a,u,l,h,c,f,x.x,x.y)&&de(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==o&&zi(a,u,l,h,c,f,M.x,M.y)&&de(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=y;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&zi(a,u,l,h,c,f,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function A_(n,t,e){let i=n;do{const r=i.prev,s=i.next.next;!Bs(r,s)&&Vu(r,i,i.next,s)&&Ir(r,s)&&Ir(s,r)&&(t.push(r.i/e|0),t.push(i.i/e|0),t.push(s.i/e|0),Ur(i),Ur(i.next),i=n=s),i=i.next}while(i!==n);return fi(i)}function R_(n,t,e,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&O_(o,a)){let l=Wu(o,a);o=fi(o,o.next),l=fi(l,l.next),Dr(o,t,e,i,r,s,0),Dr(l,t,e,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function C_(n,t,e,i){const r=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*i,l=s<o-1?t[s+1]*i:n.length,c=Gu(n,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(F_(c));for(r.sort(P_),s=0;s<r.length;s++)e=L_(r[s],e);return e}function P_(n,t){return n.x-t.x}function L_(n,t){const e=D_(n,t);if(!e)return t;const i=Wu(e,n);return fi(i,i.next),fi(e,e.next)}function D_(n,t){let e=t,i=-1/0,r;const s=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=s&&f>i&&(i=f,r=e.x<e.next.x?e:e.next,f===s))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,l=r.x,c=r.y;let u=1/0,h;e=r;do s>=e.x&&e.x>=l&&s!==e.x&&zi(o<c?s:i,o,l,c,o<c?i:s,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(s-e.x),Ir(e,n)&&(h<u||h===u&&(e.x>r.x||e.x===r.x&&I_(r,e)))&&(r=e,u=h)),e=e.next;while(e!==a);return r}function I_(n,t){return de(n.prev,n,t.prev)<0&&de(t.next,n,n.next)<0}function U_(n,t,e,i){let r=n;do r.z===0&&(r.z=_a(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,N_(r)}function N_(n){let t,e,i,r,s,o,a,l,c=1;do{for(e=n,n=null,s=null,o=0;e;){for(o++,i=e,a=0,t=0;t<c&&(a++,i=i.nextZ,!!i);t++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(r=e,e=e.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;e=i}s.nextZ=null,c*=2}while(o>1);return n}function _a(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function F_(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function zi(n,t,e,i,r,s,o,a){return(r-o)*(t-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(i-a)}function O_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!z_(n,t)&&(Ir(n,t)&&Ir(t,n)&&B_(n,t)&&(de(n.prev,n,t.prev)||de(n,t.prev,t))||Bs(n,t)&&de(n.prev,n,n.next)>0&&de(t.prev,t,t.next)>0)}function de(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Bs(n,t){return n.x===t.x&&n.y===t.y}function Vu(n,t,e,i){const r=gs(de(n,t,e)),s=gs(de(n,t,i)),o=gs(de(e,i,n)),a=gs(de(e,i,t));return!!(r!==s&&o!==a||r===0&&ms(n,e,t)||s===0&&ms(n,i,t)||o===0&&ms(e,n,i)||a===0&&ms(e,t,i))}function ms(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function gs(n){return n>0?1:n<0?-1:0}function z_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Vu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ir(n,t){return de(n.prev,n,n.next)<0?de(n,t,n.next)>=0&&de(n,n.prev,t)>=0:de(n,t,n.prev)<0||de(n,n.next,t)<0}function B_(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,s=(n.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Wu(n,t){const e=new xa(n.i,n.x,n.y),i=new xa(t.i,t.x,t.y),r=n.next,s=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function yc(n,t,e,i){const r=new xa(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Ur(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function xa(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function k_(n,t,e,i){let r=0;for(let s=t,o=e-i;s<e;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class Ar{static area(t){const e=t.length;let i=0;for(let r=e-1,s=0;s<e;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return Ar.area(t)<0}static triangulateShape(t,e){const i=[],r=[],s=[];Sc(t),Ec(i,t);let o=t.length;e.forEach(Sc);for(let l=0;l<e.length;l++)r.push(o),o+=e[l].length,Ec(i,e[l]);const a=b_.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Sc(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Ec(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class $a extends _e{constructor(t=new Hu([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,r=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new he(r,3)),this.setAttribute("uv",new he(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:H_;let M,x=!1,C,R,A,P;p&&(M=p.getSpacedPoints(u),x=!0,f=!1,C=p.computeFrenetFrames(u,!1),R=new D,A=new D,P=new D),f||(m=0,d=0,g=0,_=0);const E=a.extractPoints(c);let v=E.shape;const L=E.holes;if(!Ar.isClockWise(v)){v=v.reverse();for(let st=0,B=L.length;st<B;st++){const w=L[st];Ar.isClockWise(w)&&(L[st]=w.reverse())}}const z=Ar.triangulateShape(v,L),H=v;for(let st=0,B=L.length;st<B;st++){const w=L[st];v=v.concat(w)}function Y(st,B,w){return B||console.error("THREE.ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(B,w)}const V=v.length,rt=z.length;function I(st,B,w){let nt,Z,K;const G=st.x-B.x,gt=st.y-B.y,ht=w.x-st.x,T=w.y-st.y,S=G*G+gt*gt,k=G*T-gt*ht;if(Math.abs(k)>Number.EPSILON){const et=Math.sqrt(S),it=Math.sqrt(ht*ht+T*T),tt=B.x-gt/et,Tt=B.y+G/et,pt=w.x-T/it,Et=w.y+ht/it,Gt=((pt-tt)*T-(Et-Tt)*ht)/(G*T-gt*ht);nt=tt+G*Gt-st.x,Z=Tt+gt*Gt-st.y;const ct=nt*nt+Z*Z;if(ct<=2)return new mt(nt,Z);K=Math.sqrt(ct/2)}else{let et=!1;G>Number.EPSILON?ht>Number.EPSILON&&(et=!0):G<-Number.EPSILON?ht<-Number.EPSILON&&(et=!0):Math.sign(gt)===Math.sign(T)&&(et=!0),et?(nt=-gt,Z=G,K=Math.sqrt(S)):(nt=G,Z=gt,K=Math.sqrt(S/2))}return new mt(nt/K,Z/K)}const j=[];for(let st=0,B=H.length,w=B-1,nt=st+1;st<B;st++,w++,nt++)w===B&&(w=0),nt===B&&(nt=0),j[st]=I(H[st],H[w],H[nt]);const Q=[];let W,vt=j.concat();for(let st=0,B=L.length;st<B;st++){const w=L[st];W=[];for(let nt=0,Z=w.length,K=Z-1,G=nt+1;nt<Z;nt++,K++,G++)K===Z&&(K=0),G===Z&&(G=0),W[nt]=I(w[nt],w[K],w[G]);Q.push(W),vt=vt.concat(W)}for(let st=0;st<m;st++){const B=st/m,w=d*Math.cos(B*Math.PI/2),nt=g*Math.sin(B*Math.PI/2)+_;for(let Z=0,K=H.length;Z<K;Z++){const G=Y(H[Z],j[Z],nt);ut(G.x,G.y,-w)}for(let Z=0,K=L.length;Z<K;Z++){const G=L[Z];W=Q[Z];for(let gt=0,ht=G.length;gt<ht;gt++){const T=Y(G[gt],W[gt],nt);ut(T.x,T.y,-w)}}}const at=g+_;for(let st=0;st<V;st++){const B=f?Y(v[st],vt[st],at):v[st];x?(A.copy(C.normals[0]).multiplyScalar(B.x),R.copy(C.binormals[0]).multiplyScalar(B.y),P.copy(M[0]).add(A).add(R),ut(P.x,P.y,P.z)):ut(B.x,B.y,0)}for(let st=1;st<=u;st++)for(let B=0;B<V;B++){const w=f?Y(v[B],vt[B],at):v[B];x?(A.copy(C.normals[st]).multiplyScalar(w.x),R.copy(C.binormals[st]).multiplyScalar(w.y),P.copy(M[st]).add(A).add(R),ut(P.x,P.y,P.z)):ut(w.x,w.y,h/u*st)}for(let st=m-1;st>=0;st--){const B=st/m,w=d*Math.cos(B*Math.PI/2),nt=g*Math.sin(B*Math.PI/2)+_;for(let Z=0,K=H.length;Z<K;Z++){const G=Y(H[Z],j[Z],nt);ut(G.x,G.y,h+w)}for(let Z=0,K=L.length;Z<K;Z++){const G=L[Z];W=Q[Z];for(let gt=0,ht=G.length;gt<ht;gt++){const T=Y(G[gt],W[gt],nt);x?ut(T.x,T.y+M[u-1].y,M[u-1].x+w):ut(T.x,T.y,h+w)}}}$(),lt();function $(){const st=r.length/3;if(f){let B=0,w=V*B;for(let nt=0;nt<rt;nt++){const Z=z[nt];Pt(Z[2]+w,Z[1]+w,Z[0]+w)}B=u+m*2,w=V*B;for(let nt=0;nt<rt;nt++){const Z=z[nt];Pt(Z[0]+w,Z[1]+w,Z[2]+w)}}else{for(let B=0;B<rt;B++){const w=z[B];Pt(w[2],w[1],w[0])}for(let B=0;B<rt;B++){const w=z[B];Pt(w[0]+V*u,w[1]+V*u,w[2]+V*u)}}i.addGroup(st,r.length/3-st,0)}function lt(){const st=r.length/3;let B=0;St(H,B),B+=H.length;for(let w=0,nt=L.length;w<nt;w++){const Z=L[w];St(Z,B),B+=Z.length}i.addGroup(st,r.length/3-st,1)}function St(st,B){let w=st.length;for(;--w>=0;){const nt=w;let Z=w-1;Z<0&&(Z=st.length-1);for(let K=0,G=u+m*2;K<G;K++){const gt=V*K,ht=V*(K+1),T=B+nt+gt,S=B+Z+gt,k=B+Z+ht,et=B+nt+ht;Ft(T,S,k,et)}}}function ut(st,B,w){l.push(st),l.push(B),l.push(w)}function Pt(st,B,w){Ot(st),Ot(B),Ot(w);const nt=r.length/3,Z=y.generateTopUV(i,r,nt-3,nt-2,nt-1);Zt(Z[0]),Zt(Z[1]),Zt(Z[2])}function Ft(st,B,w,nt){Ot(st),Ot(B),Ot(nt),Ot(B),Ot(w),Ot(nt);const Z=r.length/3,K=y.generateSideWallUV(i,r,Z-6,Z-3,Z-2,Z-1);Zt(K[0]),Zt(K[1]),Zt(K[3]),Zt(K[1]),Zt(K[2]),Zt(K[3])}function Ot(st){r.push(l[st*3+0]),r.push(l[st*3+1]),r.push(l[st*3+2])}function Zt(st){s.push(st.x),s.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return G_(e,i,t)}static fromJSON(t,e){const i=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];i.push(a)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new ga[r.type]().fromJSON(r)),new $a(i,t.options)}}const H_={generateTopUV:function(n,t,e,i,r){const s=t[e*3],o=t[e*3+1],a=t[i*3],l=t[i*3+1],c=t[r*3],u=t[r*3+1];return[new mt(s,o),new mt(a,l),new mt(c,u)]},generateSideWallUV:function(n,t,e,i,r,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],h=t[i*3+2],f=t[r*3],d=t[r*3+1],g=t[r*3+2],_=t[s*3],m=t[s*3+1],p=t[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new mt(o,1-l),new mt(c,1-h),new mt(f,1-g),new mt(_,1-p)]:[new mt(a,1-l),new mt(u,1-h),new mt(d,1-g),new mt(m,1-p)]}};function G_(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Hr extends _e{constructor(t=1,e=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new D,f=new D,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const y=[],M=p/i;let x=0;p===0&&o===0?x=.5/e:p===i&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const R=C/e;h.x=-t*Math.cos(r+R*s)*Math.sin(o+M*a),h.y=t*Math.cos(o+M*a),h.z=t*Math.sin(r+R*s)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(R+x,1-M),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<e;y++){const M=u[p][y+1],x=u[p][y],C=u[p+1][y],R=u[p+1][y+1];(p!==0||o>0)&&d.push(M,x,R),(p!==i-1||l<Math.PI)&&d.push(x,C,R)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Rn extends _e{constructor(t=1,e=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new D,h=new D,f=new D;for(let d=0;d<=i;d++)for(let g=0;g<=r;g++){const _=g/r*s,m=d/i*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(_),h.y=(t+e*Math.cos(m))*Math.sin(_),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=r;g++){const _=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,y=(r+1)*d+g;o.push(_,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Xu extends or{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xu,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ja extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class V_ extends Ja{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Eo=new ie,bc=new D,wc=new D;class W_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Va,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;bc.setFromMatrixPosition(t.matrixWorld),e.position.copy(bc),wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(wc),e.updateMatrixWorld(),Eo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Eo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class X_ extends W_{constructor(){super(new Pu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class q_ extends Ja{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new X_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Y_ extends Ja{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Tc=new ie;class Z_{constructor(t,e,i=0,r=1/0){this.ray=new Ha(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Tc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tc),this}intersectObject(t,e=!0,i=[]){return va(t,this,i,e),i.sort(Ac),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)va(t[r],this,i,e);return i.sort(Ac),i}}function Ac(n,t){return n.distance-t.distance}function va(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)va(s[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Da);function K_(n,t,e){return{x:(n-e.left)/e.width*2-1,y:-((t-e.top)/e.height)*2+1}}const $_=1.42,qu=44,ja=32,_r=92,Ma={hq:1.05,barracks:1.55},Yu=1.05;function Zu(n,t,e){return e!=="siege"?n:n+(t==="player"?.85:-.85)}const J_={hq:2.05,barracks:.78},j_={hq:2.55,barracks:1.2},Ii=new D,bn={x:0,y:0};function Rs(n,t,e,i,r,s,o){return Ii.set(n,t,e),Ii.project(i),Ii.z<-1||Ii.z>1?!1:(o.x=(Ii.x*.5+.5)*r,o.y=(-Ii.y*.5+.5)*s,!0)}function Q_(n,t){return t<=qu&&t<n}const Ze=[];function tx(n){let t=Ze[n];return t||(t={px:0,py:0,squad:0,ok:0},Ze[n]=t),t}function Ku(n,t,e,i,r,s){const o=t|0;for(let c=0;c<o;c++){const u=n[c],h=tx(c);h.squad=u.squad?1:0,h.ok=0,Rs(u.x,u.y,u.z,e,i,r,bn)&&(h.ok=1,h.px=bn.x,h.py=bn.y-ja,h.ox=h.px,h.oy=h.py)}const a=36,l=c=>{i>a*2&&(c.px=Math.min(i-a,Math.max(a,c.px))),r>a*2&&(c.py=Math.min(r-a,Math.max(a,c.py)))};for(let c=0;c<8;c++)for(let u=0;u<o;u++){const h=Ze[u];if(h.ok)for(let f=u+1;f<o;f++){const d=Ze[f];if(!d.ok)continue;let g=d.px-h.px,_=d.py-h.py,m=Math.hypot(g,_);if(m>=_r)continue;m<.01&&(g=0,_=1,m=1);const p=(_r-m)/m,y=g*p,M=_*p;if(h.squad!==d.squad){const x=h.squad?h:d,C=h.squad?d:h;if(Math.abs(_)>=Math.abs(g)){const R=x.px-C.px,A=x.py-C.py;let P=Math.abs(R)<1?1:Math.sign(R);const v=Math.sqrt(Math.max(0,_r*_r-A*A))-Math.abs(R);if(v>0){const L=x.px+P*v;i>a*2&&(L<a||L>i-a)&&(P=-P),x.px+=P*v}}else h.squad?(h.px-=y,h.py-=M):(d.px+=y,d.py+=M);l(x)}else h.px-=y*.5,h.py-=M*.5,d.px+=y*.5,d.py+=M*.5,l(h),l(d)}}for(let c=0;c<o;c++){const u=Ze[c];if(!u.ok||!u.squad)continue;let h=1/0;for(let _=0;_<o;_++)c===_||!Ze[_].ok||(h=Math.min(h,Math.hypot(u.px-Ze[_].px,u.py-Ze[_].py)));if(h>=_r-1)continue;let f=u.px,d=u.py,g=h;for(let _=1;_<=5;_++){const m=24*_;for(let p=0;p<12;p++){const y=p/12*Math.PI*2;let M=u.ox+Math.cos(y)*m,x=u.oy+Math.sin(y)*m;i>a*2&&(M=Math.min(i-a,Math.max(a,M))),r>a*2&&(x=Math.min(r-a,Math.max(a,x)));let C=1/0;for(let R=0;R<o;R++)c===R||!Ze[R].ok||(C=Math.min(C,Math.hypot(M-Ze[R].px,x-Ze[R].py)));C>g&&(g=C,f=M,d=x)}}u.px=f,u.py=d}for(let c=0;c<o;c++){const u=Ze[c],h=s[c];h.px=u.px,h.py=u.py,h.ok=u.ok}return o}const ya=[],Rr=[];function ex(n){let t=ya[n];return t||(t={x:0,y:0,z:0,squad:0},ya[n]=t),t}function nx(n){let t=Rr[n];return t||(t={px:0,py:0,ok:0},Rr[n]=t),t}function ix(n,t,e,i,r,s,o){let a=null,l=1/0,c=null,u=$_,h=null,f=1/0;const d=e>=1&&i>=1&&t;if(d){for(let g=0;g<n.length;g++){const _=n[g],m=_.kind==="squad",p=_.kind==="hq"?"hq":"barracks",y=ex(g);y.x=_.x,y.y=m?Yu:Ma[p],y.z=_.z,y.squad=m?1:0,nx(g)}Ku(ya,n.length,t,e,i,Rr)}for(let g=0;g<n.length;g++){const _=n[g],m=_.kind==="squad",p=_.kind==="hq"?"hq":"barracks";let y=1/0,M=1/0;if(d&&Rr[g].ok){const x=Rr[g],C=Math.hypot(r-x.px,s-x.py);if(M=C,C<y&&(y=C),!m){const R=Math.hypot(r-x.px,s-(x.py+ja));R<y&&(y=R)}if(!m&&Rs(_.x,J_[p],_.z,t,e,i,bn)){const R=Math.hypot(r-bn.x,s-bn.y);R<y&&(y=R)}if(!m&&Rs(_.x,j_[p],_.z,t,e,i,bn)){const R=Math.hypot(r-bn.x,s-bn.y);R<y&&(y=R)}Q_(l,y)&&(l=y,a=_),m&&M<=qu&&M<f&&(h=_,f=M)}if(o){const x=Math.hypot(_.x-o.x,_.z-o.z);x<u&&(u=x,c=_)}}return a&&a.kind!=="squad"&&h&&f<l&&(a=h),a||c}function rx(n){const t=new Map,e={x:0,y:0},i=new Set,r=[],s=["","快","固","快固"],o=[],a=[],l=[];let c=qi;function u(_){let m=o[_];return m||(m={x:0,y:0,z:0,squad:0},o[_]=m,a[_]={px:0,py:0,ok:0}),m}function h(_){let m=t.get(_);return m||(m=document.createElement("div"),m.className="badge",m.innerHTML='<span class="tag"></span><b class="num"></b><i class="sub"></i>',n.appendChild(m),t.set(_,m)),m}function f(_,m,p){const y=_.querySelector(m);y.textContent!==p&&(y.textContent=p)}function d(_,m){if(!m||!m.ok){_.hidden=!0;return}_.hidden=!1;const p=m.py+ja;_.style.transform=`translate(${m.px}px, ${p}px) translate(-50%, -139%)`}function g(_,m,p){const y=_.squads;for(let M=0;M<y.length;M++){const x=y[M];if(x.mode==="siege"&&x.targetId===m&&x.owner!==p&&x.count>0)return!0}return!1}return{setMap(_){c=_&&_.nodes||qi},update(_,m,p){const y=p.clientWidth||1,M=p.clientHeight||1,x=_&&_.nodes||c;i.clear();let C=0;for(let R=0;R<_.buildings.length;R++){const A=_.buildings[R];i.add(A.id);const P=h(A.id);P.classList.toggle("player",A.owner==="player"),P.classList.toggle("enemy",A.owner==="enemy"),P.classList.toggle("squad",!1);const E=Vh(A);if(P.classList.toggle("can-up",E),E){const rt=Yi(A,"haste"),I=Yi(A,"bulwark"),j=rt.ok?rt:I;P.dataset.cost=j&&j.cost?` ${j.cost}`:""}else P.dataset.cost&&(P.dataset.cost="");const v=A.kind==="hq"?"司令部":"兵營";f(P,".tag",v),f(P,".num",String(Math.max(0,Math.floor(A.count))));const L=A.upgrades,O=(L&&L.haste>0?1:0)+(L&&L.bulwark>0?2:0),z=s[O];let H="";A.capture>.02?H="佔領中":A.kind==="hq"&&(A.count<=0||g(_,A.id,A.owner))?H="危":z?H=z:A.count>=A.cap&&(H="滿"),f(P,".sub",H),P.classList.toggle("is-danger",H==="危");const Y=x[A.node];if(!Y){P.hidden=!0;continue}const V=u(C);V.x=Y.x,V.y=Ma[A.kind]||Ma.barracks,V.z=Y.z,V.squad=0,l[C]=P,C+=1}for(let R=0;R<_.squads.length;R++){const A=_.squads[R];if(A.count<=0)continue;i.add(A.id);const P=h(A.id);P.classList.add("squad"),P.classList.toggle("player",A.owner==="player"),P.classList.toggle("enemy",A.owner==="enemy"),P.classList.toggle("can-up",!1),P.classList.toggle("is-danger",!1),f(P,".tag",A.mode==="siege"?"攻城":"行軍"),f(P,".num",String(Math.max(0,Math.floor(A.count)))),f(P,".sub",A.mode==="fight"?"交戰":"");const E=u(C);E.x=Zu(A.x,A.owner,A.mode),E.y=Yu,E.z=A.z,E.squad=1,l[C]=P,C+=1}Ku(o,C,m,y,M,a);for(let R=0;R<C;R++)d(l[R],a[R]);r.length=0;for(const R of t.keys())i.has(R)||r.push(R);for(let R=0;R<r.length;R++)t.get(r[R]).remove(),t.delete(r[R])},clientPoint(_,m,p){const y=c[_];if(!y)return null;const M=p.getBoundingClientRect();return Rs(y.x,.4,y.z,m,M.width,M.height,e)?{x:M.left+e.x,y:M.top+e.y}:null}}}function Qa(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new _e;let c=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const h=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=n[f].attributes.position.count}l.setIndex(h)}for(const u in s){const h=Rc(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][f]);const g=Rc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Rc(n){let t,e,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new re(o,e,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const h=l/e;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<e;g++){const _=u.getComponent(f,g);a.setComponent(f+h,g,_)}}else o.set(u.array,l);l+=u.count*e}return r!==void 0&&(a.gpuType=r),a}function Cs(n,t){const e=Math.hypot(n,t);if(e<1e-8)return 0;const i=Math.atan2(-n/e,-t/e);return i===0?0:i}function Sa(n,t,e,i){const r=Math.cos(e),s=Math.sin(e);return i.x=n*r+t*s,i.z=-n*s+t*r,i}const xt={sky:8366276,sand:9075292,meadow:7043662,meadowDeep:5925698,road:9272164,roadEdge:4866876,trunk:4864810,leaf:4151866,leafDeep:3097904,rock:7236195,stream:4091791,bridge:7238254,ink:1712672,concrete:8025452,metal:9344660,player:{main:3120731,deep:1796925,flag:4050554,slab:3824703,glow:4050554},enemy:{main:12860466,deep:9315356,flag:14832968,slab:6042930,glow:14832968}};function cn(n){return n==="player"?xt.player:xt.enemy}const xr=480,sx=1.28,$u=.52,ox=4090674,ax=8137250,bo={x:0,z:0},Cc=new D,Pc=new D;function Ju(n){const t=Math.max(0,Math.floor(n));return t<=4?t:Math.min(9,3+Math.round(Math.sqrt(t)*.7))}function ju(n){return n>8?4:n>4?3:Math.max(1,n)}const vr={x:0,z:0};function lx(n,t,e,i,r){const s=Math.max(1,Ju(r)),o=ju(s),l=(Math.ceil(s/o)-1)*$u,c=Math.abs(i)-.72;let u=Math.max(.28,Math.min(l+.5,Math.max(.28,c))),h=t==="hq"?n==="player"?1.28:1.55:-1.9;const f=n==="player"?Cs(0,-1):Cs(0,1);let d=0;e>.4?d=1:e<-.4?d=-1:d=n==="player"?1:-1,t==="hq"?(u=Math.min(u,.15),Math.abs(e)<=.4&&(d=-d)):Math.abs(i)<2.4&&(u=-.45,h=-1.5),Sa(1,0,f,vr);const g=vr.x*d>=0?h:-h;return Sa(g,-u,f,vr),{x:e+vr.x,z:i+vr.z,yaw:f}}function ke(n,t){const e=n.getAttribute("position").count,i=new Float32Array(e*3);return i.fill(t),n.setAttribute("color",new re(i,3)),n}function Ui(n,t,e,i){return new Je(n,t,e,i)}function qe(n,t,e,i,r,s){return n.translate(-t,-e,-i),r&&n.rotateX(r),s&&n.rotateY(s),n.translate(t,e,i),n}function cx(n=0){const t=ke(Ui(.04,.05,.46,6),.22);t.translate(-.07,.23,.02);const e=ke(Ui(.04,.05,.46,6),.16);e.translate(.07,.23,-.02);const i=ke(Ui(.11,.135,.46,8),.42);i.translate(0,.58,0);const r=ke(new Je(.168,.14,.055,8),.38);r.translate(0,.78,0);const s=ke(Ui(.028,.034,.3,6),.9);s.translate(-.15,.58,-.04);const o=ke(Ui(.026,.03,.28,6),.26);o.translate(.15,.56,-.05);const a=ke(Ui(.042,.046,.08,8),.55);a.translate(0,.86,0);const l=ke(new Hr(.07,10,8),1);l.scale(1,.94,1),l.translate(0,.94,-.01);const c=ke(new Rn(.066,.016,6,10),.88);c.rotateX(Math.PI/2),c.translate(0,.91,-.01);const u=ke(new _t(.15,.016,.09),.72);u.translate(0,.88,-.045);const h=ke(new _t(.04,.036,.42),.08);h.translate(.12,.52,-.28);const f=ke(new _t(.05,.06,.08),.12);f.translate(.12,.46,-.06);const d=ke(new _t(.09,.12,.06),.2);d.translate(0,.54,.09),n===1?(qe(t,-.07,.46,.02,1.25,.1),qe(e,.07,.46,-.02,-1.05,0),qe(s,-.15,.72,-.04,-.85,.25),qe(o,.15,.7,-.05,.45,-.35),qe(h,.12,.52,-.08,.15,-1.05),qe(i,0,.58,0,.18,.28)):n===2&&(qe(t,-.07,.46,.02,-1,0),qe(e,.07,.46,-.02,1.2,-.12),qe(s,-.15,.72,-.04,.9,-.2),qe(o,.15,.7,-.05,-.35,.4),qe(h,.12,.52,-.08,-.2,.95),qe(i,0,.58,0,.22,-.42));const g=Qa([t,e,i,r,s,o,a,l,c,u,h,f,d]);return g.computeVertexNormals(),g}function Lc(n,t,e){const i=cx(e||0),r=i.getAttribute("color"),s=new Float32Array(r.count*3),o=new dt(n),a=o.clone().multiplyScalar(.62),l=new dt(5002050),c=new dt(t),u=new dt(3422768),h=new dt(12888194),f=new dt(2896686),d=new dt;for(let g=0;g<r.count;g++){const _=r.getX(g);let m=o;_>=.95?m=l:_>=.85?m=c:_>=.7?m=u:_>=.5?m=h:_<=.14?m=f:(d.copy(a).lerp(o,Math.min(1,(_-.14)/.36)),m=d),s[g*3]=m.r,s[g*3+1]=m.g,s[g*3+2]=m.b}return i.setAttribute("color",new re(s,3)),i}let Dc=qi;const wo=3;function ux(n){const t=new Xu({color:16777215,vertexColors:!0,roughness:.74,metalness:.04}),e=[],i=[];for(let p=0;p<wo;p++){const y=new vo(Lc(5922888,ox,p),t,xr),M=new vo(Lc(6577740,ax,p),t,xr);y.castShadow=!1,M.castShadow=!1,y.receiveShadow=!1,M.receiveShadow=!1,y.frustumCulled=!1,M.frustumCulled=!1,y.count=0,M.count=0,e.push(y),i.push(M)}const r=new Wi(.3,12);r.rotateX(-Math.PI/2);const s=new vo(r,new Se({color:1712150,transparent:!0,opacity:.32,depthWrite:!1}),xr);s.castShadow=!1,s.receiveShadow=!1,s.frustumCulled=!1,s.count=0,n.add(...e,...i,s);const o=new xe;let a=0;const l=new Map,c=new Map,u=[0,0,0],h=[0,0,0];let f=null,d=null;function g(p,y,M){if(Math.hypot(y,M)<.05)return l.get(p)||0;const x=Cs(y,M);return l.set(p,x),x}function _(p,y,M,x,C,R,A,P,E){const v=p==="player"?e:i,L=p==="player"?u:h,O=E||0,z=v[O],H=L[O];if(H>=xr)return;const Y=P||0;o.position.set(y,M,x),o.rotation.set(Y*.4,C,Y*.25),o.scale.setScalar(R),o.updateMatrix(),z.setMatrixAt(H,o.matrix),a<xr&&(o.position.y=.03,o.rotation.set(0,0,0),o.scale.set(R*.72,1,R*.46),o.updateMatrix(),s.setMatrixAt(a,o.matrix),a+=1,o.rotation.set(0,C,0)),L[O]+=1,A&&(d=z,Cc.set(0,0,-1).applyQuaternion(o.quaternion))}function m(p,y,M,x,C,R){const A=Ju(C);if(A<=0)return;const P=ju(A),E=$u;for(let v=0;v<A;v++){const L=v%P,O=Math.floor(v/P),z=Math.ceil(A/P),H=O===z-1?A-O*P:P,Y=R&&v===0,V=Y?0:1,rt=(L-(H-1)/2)*E*1.7+V*Math.sin(v*2.17+O*1.3)*E*1.05,I=O*E*.72+V*Math.cos(v*1.63)*E*.95;Sa(rt,I,x,bo);const j=Y?1:.84+Math.abs(Math.sin(v*2.4))*.3,Q=Y?x:x+Math.sin(v*1.9)*.62,W=Y?0:Math.sin(v*2.6)*.16,vt=Y?0:v%2+1;_(p,y+bo.x,.02,M+bo.z,Q,sx*j,Y,W,vt)}}return{facingDot(){return f},setMap(p){Dc=p.nodes||qi,p.graph,l.clear(),c.clear()},update(p){for(let x=0;x<wo;x++)u[x]=0,h[x]=0;a=0,d=null;let y=!1;const M=p&&p.nodes||Dc;for(let x=0;x<p.buildings.length;x++){const C=p.buildings[x];if(C.count<=0)continue;const R=M[C.node];if(!R)continue;const A=lx(C.owner,C.kind,R.x,R.z,C.count);m(C.owner,A.x,A.z,A.yaw,C.count,!1)}for(let x=0;x<p.squads.length;x++){const C=p.squads[x];if(C.count<=0)continue;let R=0,A=0;if(C.mode==="march"&&C.seg<C.path.length-1){const v=M[C.path[C.seg+1]];v&&(R=v.x-C.x,A=v.z-C.z)}else if(C.path.length>1){const v=M[C.path[Math.max(0,C.seg-1)]];v&&(R=C.x-v.x,A=C.z-v.z)}const P=g(C.id,R,A),E=!y&&C.mode==="march";if(m(C.owner,C.x,C.z,P,C.count,E),E){y=!0;const v=c.get(C.id);if(v&&d){const O=C.x-v.x,z=C.z-v.z,H=Math.hypot(O,z);H>.004&&(Pc.set(O/H,0,z/H),f=Cc.dot(Pc))}let L=c.get(C.id);L?(L.x=C.x,L.z=C.z):(L={x:C.x,z:C.z},c.set(C.id,L))}}for(let x=0;x<wo;x++)e[x].count=u[x],i[x].count=h[x],e[x].instanceMatrix.needsUpdate=!0,i[x].instanceMatrix.needsUpdate=!0;s.count=a,s.instanceMatrix.needsUpdate=!0}}}const Sn=640;function hx(n){const t=new Float32Array(Sn*3),e=new Float32Array(Sn*3),i=new Float32Array(Sn*3);t.fill(0);for(let p=0;p<Sn;p++)t[p*3+1]=-8;const r=new _e;r.setAttribute("position",new re(t,3)),r.setAttribute("color",new re(e,3));const s=new Fu({size:1.6,vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1,sizeAttenuation:!0}),o=new u_(r,s);o.frustumCulled=!1,o.renderOrder=4,n.add(o);const a=new Float32Array(Sn),l=new Float32Array(Sn),c=new Float32Array(Sn*3);let u=0,h=!0;const f=new dt(xt.sand),d=new dt(12893876),g=new dt(16769162),_=new dt(16742962);function m(p,y,M,x,C,R,A,P){const E=u;u=(u+1)%Sn,a[E]=C,l[E]=C;const v=E*3;t[v]=p,t[v+1]=y,t[v+2]=M,c[v]=R,c[v+1]=A,c[v+2]=P,i[v]=x.r,i[v+1]=x.g,i[v+2]=x.b,e[v]=x.r,e[v+1]=x.g,e[v+2]=x.b}return{setEnabled(p){h=!!p,o.visible=h},update(p,y){if(!h||!y)return;const M=y.squads||[];let x=64;const C=Math.floor((y.t||0)*8);for(let E=0;E<M.length&&x>0;E++){const v=M[E];if(!v||v.count<=0)continue;const L=E*17%5*.05;if(v.mode==="march")m(v.x+L,.16,v.z-L,f,.8,0,.45,0),x-=1,x>0&&E%2===0&&(m(v.x-L,.22,v.z+.1,f,.55,.2,.3,0),x-=1);else if(v.mode==="fight"||v.mode==="siege"){m(v.x,.45,v.z,d,1.2,E%2?.6:-.6,1.1,0),x-=1,x>0&&(m(v.x+.12,.62,v.z,v.mode==="siege"?_:g,.4,0,.4,0),x-=1);const O=v.owner==="player"?-2.8:2.8;if(x>0&&(m(v.x,.7,v.z,g,.22,0,.15,O),x-=1),x>0&&(m(v.x+.08,.58,v.z,g,.18,0,.1,O*.75),x-=1),v.mode==="siege"&&x>0&&(m(v.x-.2,.85,v.z+.1,_,.55,.35,1.1,-.2),x-=1),v.mode==="siege"&&x>0&&(m(v.x+.15,1.15,v.z,d,.9,-.2,.8,.15),x-=1),v.mode==="siege"){const z=(E*3+C)%6;for(let H=0;H<4&&x>0;H++){const Y=z+H*1.5,V=Math.cos(Y),rt=Math.sin(Y);m(v.x+V*.35,.65+H%3*.28,v.z+rt*.35,H%2?_:g,.5,V*1.5,1.7,rt*1.5),x-=1}}}}const R=y.nodes,A=y.buildings;if(R&&A)for(let E=0;E<A.length&&x>0;E++){const v=A[E];if(v.kind!=="hq"&&v.kind!=="barracks")continue;let L=!1;for(let z=0;z<M.length;z++){const H=M[z];H.mode==="siege"&&H.targetId===v.id&&H.owner!==v.owner&&H.count>0&&(L=!0)}const O=R[v.node];O&&(L&&x>0&&(m(O.x,1.35,O.z,_,.5,E%2?.4:-.4,1.1,.1),x-=1),L&&x>0&&(m(O.x+.2,1.7,O.z-.1,d,.8,.15,.7,0),x-=1),v.capture>.05&&x>0&&(m(O.x,.9,O.z,g,.35,0,1.4,0),x-=1),v.capture>.05&&x>0&&(m(O.x+.25,1.15,O.z-.15,g,.4,.8,1.6,-.4),x-=1),v.capture>.05&&x>0&&(m(O.x-.2,1.05,O.z+.1,_,.35,-.7,1.5,.35),x-=1))}const P=Math.min(.05,p||.016);for(let E=0;E<Sn;E++){if(a[E]<=0)continue;a[E]-=P;const v=E*3;if(a[E]<=0){t[v+1]=-8,a[E]=0;continue}t[v]+=c[v]*P,t[v+1]+=c[v+1]*P,t[v+2]+=c[v+2]*P;const L=a[E]/l[E];e[v]=i[v]*L,e[v+1]=i[v+1]*L,e[v+2]=i[v+2]*L}r.attributes.position.needsUpdate=!0,r.attributes.color.needsUpdate=!0}}}function fx(n,t,e,i){const r=new Z_,s=new Bn(new D(0,1,0),0),o=new mt,a=new D;let l=null;function c(f){const d=n.getBoundingClientRect();if(d.width<1||d.height<1)return null;const g=K_(f.clientX,f.clientY,d);return o.set(g.x,g.y),r.setFromCamera(o,t),r.ray.intersectPlane(s,a)?{x:a.x,z:a.z}:null}function u(f){const d=n.getBoundingClientRect(),g=c(f);return d.width<1||d.height<1?{building:null,world:g}:{building:ix(e(),t,d.width,d.height,f.clientX-d.left,f.clientY-d.top,g),world:g}}n.addEventListener("contextmenu",f=>f.preventDefault()),n.addEventListener("pointerdown",f=>{if(f.button!==0&&f.pointerType==="mouse")return;n.setPointerCapture(f.pointerId),i.unlock();const{building:d}=u(f);l={x:f.clientX,y:f.clientY,id:d?d.id:null,owner:d?d.owner:null,dragging:!1}}),n.addEventListener("pointermove",f=>{if(!l)return;const d=Math.hypot(f.clientX-l.x,f.clientY-l.y);if(!l.dragging&&d>14&&l.id&&l.owner==="player"&&(l.dragging=!0,i.onDragStart(l.id)),!l.dragging)return;const{world:g,building:_}=u(f);g&&i.onDragMove(g,_?_.id:null)});function h(f){if(!l)return;const d=l;l=null;const{building:g}=u(f),_=g?g.id:null;if(d.dragging){i.onDragEnd(d.id,_);return}i.onTap(_)}n.addEventListener("pointerup",h),n.addEventListener("pointercancel",()=>{l&&(l=null,i.onDragEnd(null,null))})}function Qu(n,t){n.fov=41,Number.isFinite(t)&&t>0&&(n.aspect=t),n.position.set(.15,16,15),n.up.set(0,1,0),n.lookAt(0,.4,.4),n.updateProjectionMatrix(),n.updateMatrixWorld()}function dx(n,t){n.fov=30,Number.isFinite(t)&&t>0&&(n.aspect=t),n.position.set(.15,24,36),n.up.set(0,1,0),n.lookAt(0,.1,4),n.updateProjectionMatrix(),n.updateMatrixWorld()}function px(n){try{const t=n.getContext(),e=t.getExtension("WEBGL_debug_renderer_info");if(!e)return!0;const i=`${t.getParameter(e.UNMASKED_RENDERER_WEBGL)||""} ${t.getParameter(e.UNMASKED_VENDOR_WEBGL)||""}`;return/swiftshader|llvmpipe|softpipe|software/i.test(i)?!0:!/nvidia|amd|radeon|intel|apple|adreno|mali|powervr/i.test(i)}catch{return!0}}function Ic(n,t,e){n.shadowMap.enabled=!!e,n.shadowMap.type=su,t.castShadow=!!e,e&&(t.shadow.mapSize.set(1024,1024),t.shadow.camera.near=4,t.shadow.camera.far=42,t.shadow.camera.left=-14,t.shadow.camera.right=14,t.shadow.camera.top=14,t.shadow.camera.bottom=-14,t.shadow.bias=-8e-4,t.shadow.normalBias=.028,t.shadow.camera.updateProjectionMatrix())}function mx(n){const t=new o_({canvas:n,antialias:!0,alpha:!1,powerPreference:"high-performance"});t.outputColorSpace=He,t.toneMapping=au,t.toneMappingExposure=1.32,t.setClearColor(xt.sky,1);const e=new a_;e.fog=new Xa(4608566,48,100),e.background=new dt(xt.sky);const i=new $e(46,1,.1,90);Qu(i),e.add(new V_(16774884,10136426,.85)),e.add(new Y_(16775406,.42));const r=new q_(16769704,2.35);r.position.set(-9,13,8),r.target.position.set(0,0,0),e.add(r),e.add(r.target);const s=px(t);let o=!s;Ic(t,r,o);function a(){const l=n.clientWidth||390,c=n.clientHeight||844;i.aspect=l/Math.max(1,c),i.updateProjectionMatrix();const u=Math.min(Math.max(window.devicePixelRatio||1,2),2);t.setPixelRatio(u),t.setSize(l,c,!1)}return{renderer:t,scene:e,camera:i,sun:r,software:s,get shadowsOn(){return o},setShadows(l){o=!!l,Ic(t,r,o),t.shadowMap.needsUpdate=!0},resize:a}}const Mr=new D;function Ye(n,t,e,i,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),l=Math.PI/4;Mr.copy(t),Mr[i]=0,Mr.normalize();const c=.5*o/(o+a),u=1-Mr.angleTo(n)/l;return Math.sign(Mr[e])===1?u*c:a/(o+a)+c+c*(1-u)}class gx extends _t{constructor(t=1,e=1,i=1,r=2,s=.1){if(r=r*2+1,s=Math.min(t/2,e/2,i/2,s),super(1,1,1,r,r,r),r===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new D,l=new D,c=new D(t,e,i).divideScalar(2).subScalar(s),u=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,d=u.length/6,g=new D,_=.5/r;for(let m=0,p=0;m<u.length;m+=3,p+=2)switch(a.fromArray(u,m),l.copy(a),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),u[m+0]=c.x*Math.sign(a.x)+l.x*s,u[m+1]=c.y*Math.sign(a.y)+l.y*s,u[m+2]=c.z*Math.sign(a.z)+l.z*s,h[m+0]=l.x,h[m+1]=l.y,h[m+2]=l.z,Math.floor(m/d)){case 0:g.set(1,0,0),f[p+0]=Ye(g,l,"z","y",s,i),f[p+1]=1-Ye(g,l,"y","z",s,e);break;case 1:g.set(-1,0,0),f[p+0]=1-Ye(g,l,"z","y",s,i),f[p+1]=1-Ye(g,l,"y","z",s,e);break;case 2:g.set(0,1,0),f[p+0]=1-Ye(g,l,"x","z",s,t),f[p+1]=Ye(g,l,"z","x",s,i);break;case 3:g.set(0,-1,0),f[p+0]=1-Ye(g,l,"x","z",s,t),f[p+1]=1-Ye(g,l,"z","x",s,i);break;case 4:g.set(0,0,1),f[p+0]=1-Ye(g,l,"x","y",s,t),f[p+1]=1-Ye(g,l,"y","x",s,e);break;case 5:g.set(0,0,-1),f[p+0]=Ye(g,l,"x","y",s,t),f[p+1]=1-Ye(g,l,"y","x",s,e);break}}}function th(n){const t=[];for(let e=0;e<n.length;e++){const i=n[e];t.push({buildingId:i.buildingId,zMin:i.z-i.rz,zMax:i.z+i.rz,xMin:i.x-i.rx,xMax:i.x+i.rx})}return t.sort((e,i)=>i.zMax-e.zMax),t}th(kh);const _x=[],Uc=1.55;function xx(n){return th(n)}function vx(n,t,e=_x){e.length=0;for(let i=0;i<n.length;i++)for(let r=i+1;r<n.length;r++){const s=n[i],o=n[r],a=t[s.buildingId],l=t[o.buildingId];if(!a||!l||a===l)continue;const c=Math.min(s.xMax,o.xMax)-Math.max(s.xMin,o.xMin),u=Math.min(s.zMax,o.zMax)-Math.max(s.zMin,o.zMin),h=Math.max(s.zMin,o.zMin)-Math.min(s.zMax,o.zMax),f=Math.max(s.xMin,o.xMin)-Math.min(s.xMax,o.xMax);if(c>.45&&h<Uc&&h>-.35){const d=s.zMax>=o.zMax?s:o,g=d===s?o:s,_=Math.max(d.xMin,g.xMin),m=Math.min(d.xMax,g.xMax);if(m-_<.4)continue;e.push({axis:"x",z:(d.zMin+g.zMax)/2,x0:_,x1:m,z0:0,z1:0,x:(_+m)/2,plusOwner:t[d.buildingId],minusOwner:t[g.buildingId]})}else if(u>.45&&f<Uc&&f>-.35){const d=s.xMax>=o.xMax?s:o,g=d===s?o:s,_=Math.max(s.zMin,o.zMin),m=Math.min(s.zMax,o.zMax);if(m-_<.4)continue;const p=(d.xMin+g.xMax)/2;e.push({axis:"z",z:(_+m)/2,x0:p,x1:p,z0:_,z1:m,x:p,plusOwner:t[d.buildingId],minusOwner:t[g.buildingId]})}}return e}const Mx=[{x:-3.05,z:6.15,s:1.08,color:xt.leaf},{x:-3.25,z:4.15,s:.82,color:xt.leafDeep},{x:3.15,z:5.55,s:1.12,color:xt.leaf},{x:3.3,z:3.35,s:.74,color:xt.leaf},{x:-3.15,z:1.05,s:.9,color:xt.leafDeep},{x:3.05,z:.7,s:.78,color:xt.leaf},{x:-3.2,z:-1.45,s:1,color:xt.leaf},{x:3.2,z:-1.7,s:.88,color:xt.leafDeep},{x:2.95,z:-4.55,s:.8,color:xt.leaf},{x:-3.15,z:-5.15,s:1.05,color:xt.leaf},{x:2.45,z:-6.85,s:.7,color:xt.leafDeep},{x:-2.15,z:7.05,s:.76,color:xt.leaf},{x:1.55,z:7.15,s:.64,color:xt.leaf},{x:-1.35,z:-7.15,s:.7,color:xt.leaf}],yx=[{x:2.55,z:6.4,s:.85},{x:2.15,z:6.15,s:.42},{x:-2.7,z:-6.5,s:.7},{x:-2.25,z:-6.15,s:.38},{x:3.4,z:-.2,s:.55},{x:3.05,z:.25,s:.32},{x:-3.45,z:2.4,s:.62},{x:-3.05,z:2.05,s:.34},{x:3.15,z:-6.2,s:.48},{x:-3.05,z:-2.4,s:.4},{x:-1.15,z:6.85,s:.36},{x:3.55,z:4.35,s:.44},{x:-2.35,z:-4.15,s:.4},{x:1.95,z:-4.55,s:.3}];function eh(n){let t=1/0,e=-1/0,i=1/0,r=-1/0;const s=n.zones||[];for(let o=0;o<s.length;o++){const a=s[o];t=Math.min(t,a.x-a.rx),e=Math.max(e,a.x+a.rx),i=Math.min(i,a.z-a.rz),r=Math.max(r,a.z+a.rz)}return{minX:t,maxX:e,minZ:i,maxZ:r}}function nh(n){if(n.id==="crossing")return Mx;const t=n.zones||[],e=[];for(let i=0;i<t.length;i++){const r=t[i];e.push({x:r.x-r.rx+.45,z:r.z+r.rz*.35,s:.85,color:i%2?xt.leafDeep:xt.leaf}),e.push({x:r.x+r.rx-.4,z:r.z-r.rz*.2,s:.7,color:xt.leaf})}return e}function ih(n){if(n.id==="crossing")return yx;const t=n.zones||[],e=[];for(let i=0;i<t.length;i++){const r=t[i];e.push({x:r.x+r.rx*.62,z:r.z-r.rz*.72,s:.5}),e.push({x:r.x-r.rx*.55,z:r.z+r.rz*.42,s:.34})}return e}function rh(n){const t=eh(n);return{x:0,z:0,halfWidth:Math.max(6.4,t.maxX-t.minX+.8)/2,depth:1.28}}function Sx(n,t){const e=n.z,i=t.z;if(e>0&&i>0||e<0&&i<0)return null;if(e===i)return e!==0?null:{x:(n.x+t.x)/2,z:0};const r=(0-e)/(i-e);return r<0||r>1?null:{x:n.x+(t.x-n.x)*r,z:0}}function sh(n){const t=n.nodes||{},e=n.graph||{},i=new Set,r=[],s=Object.keys(e);for(let o=0;o<s.length;o++){const a=e[s[o]]||[],l=t[s[o]];for(let c=0;c<a.length;c++){const u=a[c],h=s[o]<u?`${s[o]}|${u}`:`${u}|${s[o]}`;if(i.has(h))continue;i.add(h);const f=t[u];if(!l||!f)continue;const d=Sx(l,f);if(!d)continue;const g=d.x.toFixed(2);let _=!1;for(let m=0;m<r.length;m++)if(r[m].x.toFixed(2)===g){_=!0;break}_||r.push(d)}}return r.sort((o,a)=>o.x-a.x),r}const Nr=5923160,ti=.64,Nc=.98,Ex=.28,bx=new D(0,1,0),wx=new D(0,0,1),Ps=new D;function ne(n,t={}){return new Xu({color:n,roughness:.72,metalness:.05,...t})}function ks(n){const t=new dt(n);return t.lerp(new dt(Nr),.74),t.getHex()}function Fc(n){const t=new dt(n);return t.lerp(new dt(xt.meadow),.58),t.getHex()}const Oc=new dt,zc=new dt(9267264),Tx=new dt(3820076),ei=new dt;function Bc(n,t){const e=n.geometry,i=e.attributes.position;let r=e.attributes.color;r||(e.setAttribute("color",new re(new Float32Array(i.count*3),3)),r=e.attributes.color),Oc.setHex(t);const s=n.position.x,o=n.position.z;for(let a=0;a<i.count;a++){const l=i.getX(a),c=i.getZ(a),u=Math.sin(l*2.4+s*.55)+Math.cos(c*3.1+o*.4);ei.copy(Oc),u>.2?ei.lerp(zc,.9):u<-.45?ei.lerp(Tx,.8):Math.sin(l*6.5+c*4+s)>.35&&ei.lerp(zc,.72),r.setXYZ(a,ei.r,ei.g,ei.b)}r.needsUpdate=!0}function Ax(n,t,e){const r=(n.graph[t]||[])[0],s=n.nodes[t],o=r&&n.nodes[r];return!s||!o?(e.x=0,e.z=-1,e):(e.x=o.x-s.x,e.z=o.z-s.z,e)}function oh(n){const t=ne(n,{roughness:.5,side:Ue}),e=new dn,i=new $t(new hi(.4,.24),t),r=new $t(new hi(.4,.24),t);return r.rotation.y=Math.PI/2,i.userData.slot="flag",r.userData.slot="flag",e.add(i,r),e.userData.flutter=!0,e}function ah(n){const t=new $t(new Rn(n,.04,6,24),new Se({color:xt.metal}));return t.rotation.x=Math.PI/2,t.position.y=.1,t.visible=!1,t.name="pip",t}const kc=new D,Hc=new rr,Rx=new D(1,1,1),Gc=new an,Cx=new ie;function Ct(n,t,e,i,r=0,s=0,o=0){return Gc.set(r,s,o),Hc.setFromEuler(Gc),kc.set(t,e,i),n.applyMatrix4(Cx.compose(kc,Hc,Rx)),n}function Ge(n,t){const e=Qa(n);for(let r=0;r<n.length;r++)n[r].dispose();const i=new $t(e,t);return i.castShadow=!0,i.receiveShadow=!0,i}function Ke(n,t,e,i,r,s,o,a,l){const c=new $t(new gx(n,t,e,i,r),l);return c.position.set(s,o,a),c.castShadow=!0,c.receiveShadow=!0,c}function Px(n){const t=new dn,e=ne(xt.concrete,{roughness:.88,metalness:.02}),i=Ke(2.85,.4,2.15,4,.18,0,.16,.05,e),r=Ke(.36,.66,1.12,3,.14,-1.28,.48,-.02,e),s=Ke(.36,.66,1.12,3,.14,1.28,.48,-.02,e),o=Ke(1.02,.18,.78,4,.12,0,2.98,.02,e),a=Ke(.86,.16,.64,3,.1,0,3.32,.02,e),l=Ge([Ct(new _t(2.2,.2,.4),0,.2,-.98),Ct(new _t(2.15,.1,.78),0,.38,-.78,-.42,0,0),Ct(new _t(2.2,.14,.16),0,.2,1.08),Ct(new _t(.7,.36,.16),0,.42,1.12),Ct(new _t(.16,.55,.16),-.7,.5,1.05),Ct(new _t(.16,.55,.16),.7,.5,1.05),Ct(new _t(.36,.14,.22),-1.05,.2,.9),Ct(new _t(.36,.14,.22),1.05,.2,.9),Ct(new _t(.28,.12,.16),-.9,.3,-1.18),Ct(new _t(.28,.12,.16),-.48,.32,-1.22),Ct(new _t(.28,.12,.16),.02,.3,-1.18),Ct(new _t(.28,.12,.16),.5,.32,-1.22),Ct(new _t(.28,.12,.16),.96,.3,-1.16),Ct(new _t(1.7,.1,1.05),0,.72,0),Ct(new _t(.14,.16,.14),-.42,3.48,-.28),Ct(new _t(.14,.16,.14),.42,3.48,-.28),Ct(new _t(.14,.16,.14),-.42,3.48,.32),Ct(new _t(.14,.16,.14),.42,3.48,.32)],e),c=ne(xt.sand,{roughness:.94,metalness:0}),u=Ke(2.45,.32,1.75,4,.14,0,.14,.05,c),h=Ge([Ct(new _t(.34,.14,.18),-.7,.28,-1.02),Ct(new _t(.34,.14,.18),0,.28,-1.02),Ct(new _t(.34,.14,.18),.7,.28,-1.02)],c),f=ne(Nr,{roughness:.82,metalness:.06});f.emissive=new dt(n.glow),f.emissiveIntensity=0;const d=Ge([Ct(new _t(2.2,.16,.12),0,.86,.64),Ct(new _t(.14,.22,1.2),-1.02,.9,0),Ct(new _t(.14,.22,1.2),1.02,.9,0),Ct(new _t(1.7,.08,.1),0,.84,-.6)],f);d.userData.slot="body";const g=Ke(1.92,.58,1.2,5,.26,0,.42,0,f),_=Ke(1.22,2.15,.96,6,.36,0,1.85,.02,f),m=Ge([Ct(new _t(.9,.026,.038),0,2.5,.46)],ne(ks(n.main),{roughness:.55,metalness:.08}));m.userData.slot="roof";const p=Ge([Ct(new _t(.46,.32,.06),0,.3,-.68),Ct(new _t(.08,.14,.05),-.62,.52,-.66),Ct(new _t(.08,.14,.05),.62,.52,-.66),Ct(new _t(.5,.04,.05),0,.2,-.7),Ct(new _t(.5,.04,.05),0,.3,-.7)],ne(xt.ink,{roughness:.8,metalness:.12})),y=Ge([Ct(new Je(.028,.034,.46,6),.16,3.58,.02),Ct(new Je(.18,.18,.032,16),.16,3.84,.1,1.05,.15,.2),Ct(new Rn(.15,.008,6,14),.16,3.86,.12,1.05,.15,.1),Ct(new Je(.018,.022,.7,5),.72,3.7,.05),Ct(new _t(.16,.02,.02),.72,4.02,.05)],ne(xt.metal,{roughness:.38,metalness:.55})),M=oh(n.flag);M.position.set(.72,3.95,.05);const x=ah(1.42),C=new $t(new Rn(1.38,.045,6,28),new Se({color:n.glow,transparent:!0,opacity:.9,toneMapped:!1}));return C.rotation.x=Math.PI/2,C.position.y=.14,C.visible=!1,t.userData.pip=x,t.userData.pulse=f,t.userData.dangerRing=C,t.add(i,r,s,o,a,l,u,h,g,d,_,m,p,y,M,x,C),t}function Lx(n){const t=new dn,e=ne(xt.sand,{roughness:.94,metalness:0}),i=Ke(1.95,.32,1.28,4,.14,0,.14,.05,e),r=Ge([Ct(new _t(.34,.16,.22),-.95,.16,-.55),Ct(new _t(.34,.16,.22),.95,.16,-.55),Ct(new _t(.34,.16,.22),-.95,.16,.15),Ct(new _t(.34,.16,.22),.95,.16,.15),Ct(new _t(.34,.16,.22),-.95,.16,.7),Ct(new _t(.34,.16,.22),.95,.16,.7),Ct(new _t(.28,.14,.36),-.55,.18,.78),Ct(new _t(.28,.14,.36),.55,.18,.78),Ct(new _t(.28,.14,.36),-.2,.18,-.72),Ct(new _t(.28,.14,.36),.35,.18,-.72)],e),s=ne(Nr,{roughness:.84,metalness:.05}),o=Ke(1.74,.58,1.02,6,.24,0,.38,0,s);o.userData.slot="body";const a=ne(Nr,{roughness:.8,metalness:.06}),l=Ke(1.58,.22,.56,4,.08,0,.88,-.22,a);l.rotation.x=-.45;const c=Ke(1.58,.22,.56,4,.08,0,.88,.22,a);c.rotation.x=.45;const u=Ge([Ct(new _t(.1,.22,.9),-.84,.86,0),Ct(new _t(.1,.22,.9),.84,.86,0),Ct(new _t(1.2,.04,.1),0,1.04,.02),Ct(new _t(.12,.07,.12),-.46,1.02,.02),Ct(new _t(.12,.07,.12),.46,1.02,-.02)],a),h=Ge([Ct(new _t(.72,.022,.034),0,1.02,.02)],ne(ks(n.main),{roughness:.55,metalness:.1}));h.userData.slot="roof";const f=Ge([Ct(new _t(.7,.045,.04),0,.18,-.48),Ct(new _t(.7,.045,.04),0,.26,-.48),Ct(new _t(.7,.045,.04),0,.34,-.48),Ct(new _t(.22,.06,.04),-.52,.48,-.46),Ct(new _t(.22,.06,.04),.52,.48,-.46)],ne(xt.ink,{roughness:.78,metalness:.16})),d=new $t(new _t(.55,.04,.38),ne(xt.concrete,{roughness:.84}));d.position.set(0,.1,-.86),d.receiveShadow=!0;const g=Ge([Ct(new Je(.02,.024,.48,5),-.72,1.02,0),Ct(new _t(.08,.42,.08),-.78,.32,-.4),Ct(new _t(.08,.42,.08),.78,.32,-.4),Ct(new _t(.08,.42,.08),-.78,.32,.38),Ct(new _t(.08,.42,.08),.78,.32,.38)],ne(xt.metal,{roughness:.42,metalness:.4})),_=oh(n.flag);_.scale.setScalar(.65),_.position.set(-.72,1.22,0);const m=ah(1.12),p=new $t(new Rn(1.05,.04,6,24),new Se({color:16769162,transparent:!0,opacity:.9,toneMapped:!1}));return p.rotation.x=Math.PI/2,p.position.y=.12,p.visible=!1,t.userData.pip=m,t.userData.pulse=o.material,t.userData.dangerRing=p,t.add(i,r,o,l,c,u,h,f,d,g,_,m,p),t}function Dx(n){const t=new dn,e=Ge([Ct(new _t(.62,.16,.95),0,.22,0),Ct(new _t(.4,.12,.42),0,.34,.06)],ne(4870728,{roughness:.55,metalness:.28})),i=new $t(new _t(.36,.04,.28),ne(ks(n.main),{roughness:.5,metalness:.16}));i.position.set(0,.42,.06),i.userData.slot="roof";const r=new $t(new _t(.05,.05,.55),ne(xt.metal,{roughness:.35,metalness:.6}));r.position.set(0,.36,-.55);const s=Ge([Ct(new _t(.12,.14,1.02),-.36,.12,0),Ct(new _t(.12,.14,1.02),.36,.12,0)],ne(xt.ink,{roughness:.8,metalness:.2}));return t.add(e,s,r,i),t.scale.setScalar(1),t}function Ix(n,t){const e=cn(t);n.traverse(i=>{if(!i.material||!i.userData.slot)return;const r=i.userData.slot;r==="body"?(i.material.color.setHex(Nr),i.material.emissive&&i.material.emissive.setHex(e.glow)):r==="roof"?i.material.color.setHex(ks(e.main)):r==="flag"&&i.material.color.setHex(e.flag)})}const _s=new dt;function Vc(n,t,e){_s.setHex(n),t[e]=_s.r,t[e+1]=_s.g,t[e+2]=_s.b}function Ux(){const t=new Float32Array([-.5,-.14,0,.5,-.14,0,.5,0,0,-.5,0,0,-.5,0,0,.5,0,0,.5,.14,0,-.5,.14,0]),e=new Float32Array(24);for(let r=0;r<4;r++)Vc(xt.player.main,e,r*3);for(let r=4;r<8;r++)Vc(xt.enemy.main,e,r*3);const i=new _e;return i.setAttribute("position",new re(t,3)),i.setAttribute("color",new re(e,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i.rotateX(-Math.PI/2),i}function Nx(){const t=new Float32Array(114),e=new Float32Array(114),i=new dt(xt.player.main),r=new dt(xt.enemy.main);for(let a=0;a<=18;a++){const l=a/18,c=-.5+l,u=Math.sin(l*Math.PI)*.72,h=a*6;t[h]=c,t[h+1]=.1,t[h+2]=u+.28,t[h+3]=c,t[h+4]=.1,t[h+5]=u-.24,e[h]=i.r,e[h+1]=i.g,e[h+2]=i.b,e[h+3]=r.r,e[h+4]=r.g,e[h+5]=r.b}const s=[];for(let a=0;a<18;a++){const l=a*2;s.push(l,l+1,l+2,l+1,l+3,l+2)}const o=new _e;return o.setAttribute("position",new re(t,3)),o.setAttribute("color",new re(e,3)),o.setIndex(s),o}function xs(n,t){const e=new $t(n,t);return e.visible=!1,e.renderOrder=6,e.frustumCulled=!1,e}function kn(n,t,e,i){if(!t.length)return;const r=Qa(t);for(let o=0;o<t.length;o++)t[o].dispose();const s=new $t(r,e);s.castShadow=!i||i.cast!==!1,s.receiveShadow=!i||i.receive!==!1,n.add(s)}function Fx(n){const t=[];for(let e=0;e<n.length;e++){const i=n[e].x,r=n[e].z,s=new _t(.92,.08,2.2);s.translate(i,.16,r),t.push(s);for(const o of[-.42,.42]){const a=new _t(.08,.22,2.2);a.translate(i+o,.28,r),t.push(a)}}return t}function To(n,t,e,i,r,s){const o=Math.sin(e*12.7+i*4.3),a=.48+Math.abs(Math.sin(i*2.15+e*.37))*1.35,l=.4+Math.abs(Math.cos(e*1.85-i*.62))*.95,c=o*.32,u=new Je(.04*l*r,.08*l*r,.4*a*r,5);u.translate(e+c,.05+.18*a*r,i),n.push(u);const h=Math.abs(Math.sin(e*5.1+i*3.7)),f=h>.72?7112262:h>.48?2373160:h>.24?4874808:s,d=t[f]||(t[f]=[]),g=.05,_=new Xi(.48*l*r,.82*a*r,7);_.translate(e+c*.45,g+.46*a*r,i);const m=new Xi(.3*l*r,.62*a*r,7);m.translate(e-c*.25,g+.98*a*r,i);const p=new Xi(.13*l*r,.36*a*r,5);p.translate(e+c*.08,g+1.4*a*r,i),d.push(_,m,p)}function lh(n){n.computeVertexNormals();const t=n.attributes.normal;let e=0;for(let s=0;s<t.count;s++)e+=t.getY(s);if(e>=0)return n;const i=n.getIndex(),r=i.array;for(let s=0;s<r.length;s+=3){const o=r[s+1];r[s+1]=r[s+2],r[s+2]=o}return i.needsUpdate=!0,n.computeVertexNormals(),n}function Ox(n,t){const s=new Float32Array(2307),o=new Float32Array(769*3),a=new dt(xt.meadow),l=new dt(xt.meadowDeep),c=new dt(6971972),u=new dt(xt.sand),h=new dt(7232578),f=new dt(xt.meadowDeep),d=new dt;let g=1;for(let p=1;p<=16;p++){const y=p/16;for(let M=0;M<48;M++){const x=M/48*Math.PI*2,C=g*3;s[C]=Math.cos(x)*y*n*.5,s[C+1]=0,s[C+2]=Math.sin(x)*y*t*.5,g+=1}}for(let p=0;p<769;p++){const y=s[p*3],M=s[p*3+2],x=Math.hypot(y/(n*.5||1),M/(t*.5||1)),C=Math.sin(y*.42+M*.28)+Math.sin(y*1.15-M*.7)*.7;d.copy(a),C>.45?d.lerp(c,.78):C<-.35?d.lerp(l,.88):d.lerp(l,.22),Math.abs(y)<2.6&&Math.abs(M)>1.15&&d.lerp(h,.48*(1-Math.min(1,Math.abs(y)/2.6))),Math.sin(y*.9+.4)*Math.sin(M*.55)>.2&&d.lerp(u,.62),x>.82&&d.lerp(f,.4),o[p*3]=d.r,o[p*3+1]=d.g,o[p*3+2]=d.b}const _=[];for(let p=0;p<48;p++)_.push(0,1+(p+1)%48,1+p);for(let p=0;p<15;p++)for(let y=0;y<48;y++){const M=1+p*48+y,x=1+p*48+(y+1)%48,C=M+48,R=x+48;_.push(M,R,x,M,C,R)}const m=new _e;return m.setAttribute("position",new re(s,3)),m.setAttribute("color",new re(o,3)),m.setIndex(_),lh(m)}function zx(n){const e=n/2,i=[{off:-1.62,y:.14,hex:15194024,sand:!0},{off:-1.0516,y:.125,hex:15984320,sand:!0},{off:-ti,y:.108,hex:14271642,sand:!0},{off:-ti+.18,y:.08,hex:12180714},{off:-.16,y:.062,hex:9357536},{off:0,y:.05,hex:7255252},{off:.16,y:.062,hex:xt.stream},{off:ti-.18,y:.08,hex:10408164},{off:ti,y:.108,hex:14271642,sand:!0},{off:ti+Nc*.42,y:.125,hex:15984320,sand:!0},{off:ti+Nc,y:.14,hex:15194024,sand:!0}],r=new Float32Array(23*i.length*3),s=new Float32Array(23*i.length*3),o=new dt;let a=0;for(let h=0;h<=22;h++){const f=-e+n*h/22,d=Math.sin(f/e*Math.PI)*Ex;for(let g=0;g<i.length;g++){const _=i[g];if(r[a]=f,r[a+1]=_.y,r[a+2]=d+_.off,o.setHex(_.hex),Math.abs(_.off)<.02){const m=Math.pow(Math.max(0,Math.sin(f*1.35+.6)),1.35);o.lerp(new dt(15202043),.28+m*.58)}else Math.abs(Math.abs(_.off)-(ti-.12))<.03&&o.lerp(new dt(14151414),.22+.28*(.5+.5*Math.sin(f*2.1)));s[a]=o.r,s[a+1]=o.g,s[a+2]=o.b,a+=3}}const l=[],c=i.length;for(let h=0;h<22;h++)for(let f=0;f<c-1;f++){const d=h*c+f;l.push(d,d+1,d+c,d+1,d+c+1,d+c)}const u=new _e;return u.setAttribute("position",new re(r,3)),u.setAttribute("color",new re(s,3)),u.setIndex(l),lh(u)}function Bx(n){let t=1/0,e=-1/0,i=1/0,r=-1/0;const s=n.zones;for(let o=0;o<s.length;o++){const a=s[o];t=Math.min(t,a.x-a.rx),e=Math.max(e,a.x+a.rx),i=Math.min(i,a.z-a.rz),r=Math.max(r,a.z+a.rz)}return{minX:t,maxX:e,minZ:i,maxZ:r}}const Ea=.72,Wc=.05,ch=.155,kx=1;function Hx(n){const t=new Set,e=[],i=n.graph||{},r=n.nodes||{},s=Object.keys(i);for(let o=0;o<s.length;o++){const a=s[o],l=i[a]||[],c=r[a];for(let u=0;u<l.length;u++){const h=l[u],f=a<h?`${a}|${h}`:`${h}|${a}`;if(t.has(f))continue;t.add(f);const d=r[h];!c||!d||e.push([{x:c.x,z:c.z},{x:d.x,z:d.z}])}}return e}function Gx(n,t){for(let e=0;e<2;e++)for(let i=0;i<2;i++){const r=n[e],s=t[i];if(Math.hypot(r.x-s.x,r.z-s.z)>.04)continue;const o=n[1-e],a=t[1-i],l=r.x-o.x,c=r.z-o.z,u=a.x-s.x,h=a.z-s.z,f=Math.hypot(l,c)||1,d=Math.hypot(u,h)||1,g=l/f*(h/d)-c/f*(u/d),_=l/f*(u/d)+c/f*(h/d);if(Math.abs(g)<.08&&_>.92)return[o,a]}return null}function Vx(n){const t=n.map(i=>[i[0],i[1]]);let e=0;for(;e<32;){e+=1;let i=!1;for(let r=0;r<t.length&&!i;r++)for(let s=r+1;s<t.length;s++){const o=Gx(t[r],t[s]);if(o){t[r]=o,t.splice(s,1),i=!0;break}}if(!i)break}return t.map(i=>({x0:i[0].x,z0:i[0].z,x1:i[1].x,z1:i[1].z,y:ch}))}function Wx(n,t){const{x0:e,z0:i,x1:r,z1:s}=n,o=s-i;if(Math.abs(o)<1e-4)return[n];const a=[0,1],l=[t,-t];for(let u=0;u<l.length;u++){const h=(l[u]-i)/o;h>.002&&h<.998&&a.push(h)}a.sort((u,h)=>u-h);const c=[];for(let u=0;u<a.length-1;u++){const h=a[u],f=a[u+1];if(f-h<.002)continue;const d=i+o*((h+f)/2);Math.abs(d)<t-.001||c.push({x0:e+(r-e)*h,z0:i+o*h,x1:e+(r-e)*f,z1:i+o*f,y:n.y})}return c}function Xx(n,t,e){const i=e.x1-e.x0,r=e.z1-e.z0,s=i*i+r*r;if(s<1e-6)return!1;const o=((n-e.x0)*i+(t-e.z0)*r)/s;if(o<=.03||o>=.97)return!1;const a=e.x0+i*o,l=e.z0+r*o;return Math.hypot(a-n,l-t)<.06}function qx(n){const t=Ea/2-.06;for(let e=0;e<n.length;e++)for(let i=0;i<n.length;i++){if(e===i)continue;const r=n[e],s=n[i];for(let o=0;o<2;o++){const a=o===0?r.x0:r.x1,l=o===0?r.z0:r.z1;if(!Xx(a,l,s))continue;const c=r.x1-r.x0,u=r.z1-r.z0,h=Math.hypot(c,u)||1,f=c/h,d=u/h;o===0?(r.x0=a+f*t,r.z0=l+d*t):(r.x1=a-f*t,r.z1=l-d*t),r.y=ch-.02}}}function Yx(n){const t=Vx(Hx(n)),e=[];for(let i=0;i<t.length;i++){const r=Wx(t[i],kx);for(let s=0;s<r.length;s++)e.push(r[s])}return qx(e),e}function Zx(n){const t=n.attributes.position,e=new Float32Array(t.count*3),i=new dt(xt.road),r=new dt(7233098),s=new dt(11573368),o=new dt;for(let a=0;a<t.count;a++){const l=t.getX(a),c=t.getZ(a),u=Math.sin(l*6.5+c*3.1)*Math.cos(c*5.2-l*2.4);u>.35?o.copy(s):u<-.25?o.copy(r):o.copy(i),e[a*3]=o.r,e[a*3+1]=o.g,e[a*3+2]=o.b}n.setAttribute("color",new re(e,3))}function Kx(n,t,e,i){const r=Math.min(e,t*.46,Math.max(.04,n*.46)),s=t/2,o=n/2,a=new Hu;a.moveTo(-s+r,-o),a.lineTo(s-r,-o),a.absarc(s-r,-o+r,r,-Math.PI/2,0,!1),a.lineTo(s,o-r),a.absarc(s-r,o-r,r,0,Math.PI/2,!1),a.lineTo(-s+r,o),a.absarc(-s+r,o-r,r,Math.PI/2,Math.PI,!1),a.lineTo(-s,-o+r),a.absarc(-s+r,-o+r,r,Math.PI,Math.PI*1.5,!1);const l=new $a(a,{depth:i,bevelEnabled:!1,curveSegments:5});return l.translate(0,0,-i/2),l.rotateX(-Math.PI/2),l}function Xc(n,t,e,i,r,s,o,a,l){const c=Kx(n,t,e,i),u=new $t(c);u.position.set((r+o)/2,l,(s+a)/2);const h=o-r,f=a-s,d=Math.hypot(h,f)||1;return Ps.set(h/d,0,f/d),u.quaternion.setFromUnitVectors(wx,Ps),u.updateMatrix(),c.applyMatrix4(u.matrix),c}function $x(n,t,e){const i=Yx(t),r=[],s=[];for(let o=0;o<i.length;o++){const a=i[o],l=Math.hypot(a.x1-a.x0,a.z1-a.z0);if(l<.15)continue;const c=Xc(l,Ea,.3,Wc,a.x0,a.z0,a.x1,a.z1,a.y);Zx(c),r.push(c),s.push(Xc(l,Ea+.7,.42,Wc*.55,a.x0,a.z0,a.x1,a.z1,a.y-.03))}kn(n,r,e,{cast:!1,receive:!1}),kn(n,s,ne(15127464,{roughness:.96,metalness:0}),{cast:!1,receive:!1})}function Jx(n,t){const e=new dn,i=Bx(n),r=Math.max(48,(i.maxX-i.minX)*4.2),s=Math.max(64,(i.maxZ-i.minZ)*3.6),o=new $t(Ox(r*.98,s*.98),ne(16777215,{vertexColors:!0,roughness:.94,metalness:0}));o.position.y=-.02,o.receiveShadow=!0,o.castShadow=!1,e.add(o);const a={};for(let B=0;B<n.buildings.length;B++)a[n.buildings[B].id]=n.buildings[B].owner;const l=new Map;for(let B=0;B<n.zones.length;B++){const w=n.zones[B],nt=a[w.buildingId],Z=nt?Fc(cn(nt).slab):xt.meadow,K=new $t(new Je(1,1.02,.045,24),ne(16777215,{vertexColors:!0,roughness:.96,metalness:0}));nt&&(K.userData.owner=nt),K.scale.set(w.rx,1,w.rz),K.position.set(w.x,.02+B*.006,w.z),K.rotation.y=0,K.receiveShadow=!0,K.castShadow=!1,Bc(K,Z),e.add(K),l.set(w.buildingId,K)}const c=[[2.35,4.7,1.2,9267264],[-2.55,3.9,.95,7032370],[1.5,7.05,.8,9859140],[-2.1,6.7,.7,8017462],[2.9,-4.5,1.1,9069116],[-2.4,-5.4,.9,6966320],[3.2,-6.7,.75,9728072],[-3.3,2.15,.72,8149560],[3.5,2.2,.68,8937528]],u=[],h=new dt,f=new dt(xt.meadow);for(let B=0;B<c.length;B++){const w=c[B],nt=new Wi(w[2],16);nt.rotateX(-Math.PI/2),nt.translate(w[0],.065,w[1]);const Z=nt.attributes.position,K=new Float32Array(Z.count*3);h.setHex(w[3]);for(let G=0;G<Z.count;G++){const gt=Math.min(1,Math.hypot(Z.getX(G)-w[0],Z.getZ(G)-w[1])/w[2]),ht=h.clone();gt>.45&&ht.lerp(f,(gt-.45)/.55),K[G*3]=ht.r,K[G*3+1]=ht.g,K[G*3+2]=ht.b}nt.setAttribute("color",new re(K,3)),u.push(nt)}kn(e,u,ne(16777215,{vertexColors:!0,roughness:.96,metalness:0}),{cast:!1,receive:!0});const d=rh(n),g=new $t(zx(d.halfWidth*2),ne(16777215,{vertexColors:!0,roughness:.42,metalness:.04}));g.receiveShadow=!0,g.castShadow=!1,e.add(g);const _=ne(16777215,{vertexColors:!0,roughness:.9,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});$x(e,n,_);const m=ne(xt.bridge,{polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});kn(e,Fx(sh(n)),m);const p=[],y={},M=nh(n);for(let B=0;B<M.length;B++){const w=M[B];To(p,y,w.x,w.z,w.s,w.color)}const x=[[i.minX+.15,i.minZ+1.1,1.05],[i.minX+.35,(i.minZ+i.maxZ)*.15,.9],[i.minX+.2,i.maxZ-1.3,1.12],[i.maxX-.2,i.minZ+1.5,.95],[i.maxX-.3,(i.minZ+i.maxZ)*.2,1.08],[i.maxX-.15,i.maxZ-1.05,.86],[i.minX+1.15,i.maxZ-.2,.78],[i.maxX-1.2,i.minZ+.35,.8]];for(let B=0;B<x.length;B++){const w=x[B];To(p,y,w[0],w[1],w[2],B%2?xt.leafDeep:xt.leaf)}for(let B=0;B<36;B++){const w=B/36*Math.PI*2+.4,nt=9+B%6*.85,Z=Math.cos(w)*nt*1.2,K=Math.sin(w)*nt*.95;Math.abs(Z)<2.1&&Math.abs(K)<10||Math.abs(K)<1.7||To(p,y,Z,K,.75+B%4*.12,B%3?xt.leaf:xt.leafDeep)}const C=ih(n).slice();for(let B=0;B<12;B++){const w=B/12*Math.PI*2+.15,nt=10.5+B%4*1.1;C.push({x:Math.cos(w)*nt*1.15,z:Math.sin(w)*nt*.9,s:.7+B%3*.28})}if(C.length){const B=new Ka(.22,0),w=[];for(let nt=0;nt<C.length;nt++){const Z=C[nt],K=B.clone();K.scale(Z.s,Z.s*.62,Z.s*.85),K.translate(Z.x,.08,Z.z),w.push(K);const G=B.clone();G.scale(Z.s*.45,Z.s*.35,Z.s*.4),G.translate(Z.x+.28*Z.s,.06,Z.z+.22*Z.s),w.push(G)}B.dispose(),kn(e,w,ne(xt.rock,{roughness:.9,metalness:.02}))}kn(e,p,ne(xt.trunk));const R=Object.keys(y);for(let B=0;B<R.length;B++)kn(e,y[R[B]],ne(Number(R[B])));const A=new Map,P=[],E=[],v={x:0,z:0};for(let B=0;B<n.buildings.length;B++){const w=n.buildings[B],nt=w.kind==="hq"?Px(cn(w.owner)):Lx(cn(w.owner)),Z=n.nodes[w.node];Ax(n,w.node,v),nt.position.set(Z.x,.06,Z.z),nt.rotation.y=Cs(v.x,v.z);const K=w.kind==="hq"?.92:1.47;if(nt.userData.baseScale=K,nt.scale.setScalar(K),nt.userData.owner=w.owner,nt.traverse(G=>{G.userData&&G.userData.flutter&&P.push(G)}),w.kind==="barracks"){const G=Dx(cn(w.owner));G.position.set(1.15,0,-.35),nt.add(G)}if(e.add(nt),A.set(w.id,nt),w.kind==="hq"){const G=new Wi(2.6,20);G.rotateX(-Math.PI/2),G.scale(1.2,1,.82),G.translate(Z.x+1.05,.08,Z.z+.85),E.push(G)}else{const G=new Wi(1.85,14);G.rotateX(-Math.PI/2),G.translate(Z.x+.45,.06,Z.z+.15),E.push(G)}}kn(e,E,new Se({color:1053710,transparent:!0,opacity:.88,depthWrite:!1}));const L=new Se({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1,side:Ue}),O=new Se({vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,toneMapped:!1,side:Ue}),z=Nx(),H=[],Y=[],V=new Se({vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!0,side:Ue,toneMapped:!1}),rt=new Se({vertexColors:!0,transparent:!0,opacity:.07,depthWrite:!1,depthTest:!0,side:Ue,toneMapped:!1}),I=Ux(),j=[],Q=[];for(let B=0;B<8;B++){const w=xs(I,V);e.add(w),j.push(w);const nt=xs(I,rt);e.add(nt),Q.push(nt)}for(let B=0;B<j.length;B++){const w=xs(z,O);e.add(w),Y.push(w);const nt=xs(z,L);e.add(nt),H.push(nt)}const W=xx(n.zones),vt=[],at={},$=new Rn(1.05,.05,8,32);$.rotateX(Math.PI/2);const lt=new $t($,new Se({color:4050554}));lt.position.y=.2,lt.visible=!1,e.add(lt);const St=new Rn(.95,.035,6,28);St.rotateX(Math.PI/2);const ut=new $t(St,new Se({color:16777215}));ut.position.y=.18,ut.visible=!1,e.add(ut);const Pt=new $t(new Je(.12,.12,1,8),new Se({color:16774344,transparent:!0,opacity:.95}));Pt.visible=!1,Pt.frustumCulled=!1,e.add(Pt);const Ft=new $t(new Xi(.28,.58,8),new Se({color:16774344}));Ft.visible=!1,Ft.frustumCulled=!1,e.add(Ft);const Ot=new $t(new Hr(.12,8,6),new Se({color:16054260}));Ot.visible=!1,e.add(Ot);function Zt(B,w,nt){let Z,K;const G=nt&&nt.nodes||n.nodes,gt=w&&G[w];if(gt)Z=gt.x,K=gt.z;else if(nt&&w){const ht=nt.squads;for(let T=0;T<ht.length;T++)if(ht[T].id===w){Z=ht[T].x,K=ht[T].z;break}}if(Z===void 0){B.visible=!1;return}B.visible=!0,B.position.x=Z,B.position.z=K}function st(B,w,nt){const Z=B.squads;for(let K=0;K<Z.length;K++){const G=Z[K];if(G.mode==="siege"&&G.targetId===w&&G.owner!==nt&&G.count>0)return!0}return!1}return{group:e,resetDrag(){Pt.visible=!1,Ft.visible=!1,Ot.visible=!1,ut.visible=!1},setDrag(B,w,nt,Z){const K=n.nodes,G=Z||B&&K[B];if(!B||!w||!G){Pt.visible=!1,Ft.visible=!1,Ot.visible=!1;return}const gt=w.x-G.x,ht=w.z-G.z,T=Math.hypot(gt,ht);if(T<.08?(Pt.visible=!1,Ft.visible=!1):(Pt.visible=!0,Ft.visible=!0,Pt.scale.set(1.4,T,1.4),Pt.position.set((G.x+w.x)/2,.55,(G.z+w.z)/2),Ps.set(gt/T,0,ht/T),Pt.quaternion.setFromUnitVectors(bx,Ps),Ft.quaternion.copy(Pt.quaternion),Ft.position.set(w.x,.55,w.z)),Ot.visible=!0,Ot.position.set(w.x,.28,w.z),nt&&nt!==B&&K[nt]){ut.visible=!0;const S=K[nt];ut.position.x=S.x,ut.position.z=S.z}else ut.visible=!1},update(B,w,nt){for(let K=0;K<w.buildings.length;K++){const G=w.buildings[K];at[G.id]=G.owner;const gt=A.get(G.id);if(!gt)continue;gt.userData.owner!==G.owner&&(gt.userData.owner=G.owner,Ix(gt,G.owner));const ht=l.get(G.id);ht&&ht.userData.owner!==G.owner&&(ht.userData.owner=G.owner,Bc(ht,Fc(cn(G.owner).slab)));const T=G.upgrades;gt.userData.pip&&(gt.userData.pip.visible=!!(T&&(T.haste>0||T.bulwark>0)));const S=G.capture>.04,k=G.kind==="hq"&&(G.count<=0||st(w,G.id,G.owner))||S,et=gt.userData.baseScale||1;if(k&&!t){const Tt=et*(1+.045*Math.sin(B*9));gt.scale.setScalar(Tt)}else gt.scale.setScalar(et);const it=gt.userData.pulse;it&&(k?(it.emissive=it.emissive||new dt,it.emissive.setHex(S?16742962:cn(G.owner).glow),it.emissiveIntensity=.35+(t?0:.4*Math.sin(B*9))):it.emissiveIntensity=0);const tt=gt.userData.dangerRing;if(tt&&(tt.visible=!!k,k)){const Tt=1+(t?0:.18*(.5+.5*Math.sin(B*6)));tt.scale.set(Tt,Tt,Tt),tt.material.color.setHex(S?16769162:cn(G.owner).glow)}}const Z=vx(W,at,vt);V.opacity=.12;for(let K=0;K<j.length;K++){const G=Z[K],gt=j[K];if(!G){gt.visible=!1,Q[K].visible=!1,H[K].visible=!1,Y[K].visible=!1;continue}const ht=G.axis!=="z",T=ht?Math.max(.8,G.x1-G.x0):Math.max(.8,G.z1-G.z0),S=ht?(G.x0+G.x1)/2:G.x,k=ht?G.z:(G.z0+G.z1)/2,et=G.plusOwner==="player"?0:Math.PI,it=ht?et:Math.PI/2+et;gt.visible=!0;const tt=1.22,Tt=Math.sin(it)*tt,pt=Math.cos(it)*tt;gt.position.set(S+Tt,.22,k+pt),gt.scale.set(T,1,1.2),gt.rotation.y=it;const Et=Q[K];Et.visible=!0,Et.position.set(S+Tt,.1,k+pt),Et.scale.set(T,1,1.75),Et.rotation.y=it;const Gt=H[K],ct=Y[K];Gt.visible=!0,ct.visible=!0;const Rt=9.2,Bt=S+Tt*1.15,kt=k+pt*2.15;Gt.position.set(Bt,.68,kt),ct.position.set(Bt,.6,kt),Gt.scale.set(Rt,1,1.5),ct.scale.set(Rt*1.04,1,2.05),Gt.rotation.y=it,ct.rotation.y=it}for(let K=Z.length;K<Q.length;K++)Q[K].visible=!1,H[K].visible=!1,Y[K].visible=!1;Zt(lt,nt,w),!t&&lt.visible&&(lt.rotation.y=B*.8);for(let K=0;K<P.length;K++){const G=P[K];G.rotation.y=t?0:Math.sin(B*2.2+K)*.4}},dispose(){const B=new Set,w=new Set;e.traverse(nt=>{nt.geometry&&B.add(nt.geometry),nt.material&&w.add(nt.material)});for(const nt of B)nt.dispose();for(const nt of w)nt.dispose()}}}function jx(){const n=new Hr(46,20,12),t=n.attributes.position,e=new Float32Array(t.count*3),i=new dt(15003382),r=new dt(xt.sky),s=new dt(6713946),o=new dt;for(let l=0;l<t.count;l++){const c=t.getY(l)/46,u=Yf.clamp((c+.15)/1.15,0,1);u<.42?o.copy(s).lerp(r,u/.42):o.copy(r).lerp(i,(u-.42)/.58),e[l*3]=o.r,e[l*3+1]=o.g,e[l*3+2]=o.b}n.setAttribute("color",new re(e,3));const a=new $t(n,new Se({vertexColors:!0,side:Pe,depthWrite:!1,fog:!1,toneMapped:!1}));return a.frustumCulled=!1,a.renderOrder=-2,a}function Qx(n){const t=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n.add(jx());const e=new hi(180,220,36,40),i=e.attributes.position,r=new Float32Array(i.count*3),s=new dt(xt.meadow),o=new dt(xt.meadowDeep),a=new dt(4871480),l=new dt;for(let d=0;d<i.count;d++){const g=i.getX(d),_=i.getY(d),m=Math.sin(g*.18)*Math.cos(_*.14)+Math.sin(g*.55+_*.4)*.65;l.copy(s),m>.35?l.lerp(a,.72):m<-.25?l.lerp(o,.55):l.lerp(o,.18),r[d*3]=l.r,r[d*3+1]=l.g,r[d*3+2]=l.b}e.setAttribute("color",new re(r,3));const c=new $t(e,ne(16777215,{vertexColors:!0,roughness:.96,metalness:0}));c.rotation.x=-Math.PI/2,c.position.y=-.05,c.receiveShadow=!0,n.add(c);const u=new dn;n.add(u);let h=null;function f(d){h&&(u.remove(h.group),h.dispose(),h=null),h=Jx(d,t),u.add(h.group)}return{mount:f,resetDrag(){h&&h.resetDrag()},setDrag(d,g,_,m){h&&h.setDrag(d,g,_,m)},update(d,g,_){h&&h.update(d,g,_)}}}const tv="long-road",ev="長路",nv="前後哨站，路更長",iv="cautious",rv={"player-hq":{x:0,z:7.2},"player-road":{x:0,z:5},"player-bar":{x:1.75,z:5},"player-post":{x:0,z:1.35},"enemy-post":{x:0,z:-1.35},"enemy-road":{x:0,z:-5},"enemy-bar":{x:-1.75,z:-5},"enemy-hq":{x:0,z:-7.2}},sv={"player-hq":["player-road"],"player-road":["player-hq","player-bar","player-post"],"player-bar":["player-road"],"player-post":["player-road","enemy-post"],"enemy-post":["player-post","enemy-road"],"enemy-road":["enemy-post","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},ov=[{buildingId:"player-hq",x:0,z:6.55,rx:3.15,rz:1.15},{buildingId:"player-bar",x:.3,z:4.75,rx:3.2,rz:.95},{buildingId:"player-post",x:0,z:1.45,rx:3.15,rz:1.2},{buildingId:"enemy-post",x:0,z:-1.45,rx:3.15,rz:1.2},{buildingId:"enemy-bar",x:-.3,z:-4.75,rx:3.2,rz:.95},{buildingId:"enemy-hq",x:0,z:-6.55,rx:3.15,rz:1.15}],av=["player-hq","player-road","player-post","enemy-post","enemy-road","enemy-hq"],lv=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:14,cap:30,regen:.3},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:22,cap:48,regen:2},{id:"player-post",kind:"barracks",owner:"player",node:"player-post",count:12,cap:36,regen:1.4},{id:"enemy-post",kind:"barracks",owner:"enemy",node:"enemy-post",count:12,cap:36,regen:1.15},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:16,cap:44,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:36,cap:48,regen:0}],cv={id:tv,name:ev,blurb:nv,personality:iv,nodes:rv,graph:sv,zones:ov,road:av,buildings:lv},uv="two-lanes",hv="雙橋",fv="左右兩條路，可以分兵",dv="aggressive",pv={"player-hq":{x:0,z:6.6},"hub-p":{x:0,z:4.3},"player-west":{x:-1.85,z:1.25},"player-east":{x:1.85,z:1.25},"enemy-west":{x:-1.85,z:-1.25},"enemy-east":{x:1.85,z:-1.25},"hub-e":{x:0,z:-4.3},"enemy-hq":{x:0,z:-6.6}},mv={"player-hq":["hub-p"],"hub-p":["player-hq","player-west","player-east"],"player-west":["hub-p","enemy-west"],"player-east":["hub-p","enemy-east"],"enemy-west":["player-west","hub-e"],"enemy-east":["player-east","hub-e"],"hub-e":["enemy-west","enemy-east","enemy-hq"],"enemy-hq":["hub-e"]},gv=[{buildingId:"player-hq",x:0,z:6.15,rx:3.2,rz:1.15},{buildingId:"player-west",x:-1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"player-east",x:1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"enemy-west",x:-1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-east",x:1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-hq",x:0,z:-6.15,rx:3.2,rz:1.15}],_v=["player-hq","hub-p","player-west","enemy-west","hub-e","enemy-hq"],xv=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.28},{id:"player-west",kind:"barracks",owner:"player",node:"player-west",count:18,cap:42,regen:1.8},{id:"player-east",kind:"barracks",owner:"player",node:"player-east",count:18,cap:42,regen:1.8},{id:"enemy-west",kind:"barracks",owner:"enemy",node:"enemy-west",count:14,cap:40,regen:1.45},{id:"enemy-east",kind:"barracks",owner:"enemy",node:"enemy-east",count:14,cap:40,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:40,cap:50,regen:0}],vv={id:uv,name:hv,blurb:fv,personality:dv,nodes:pv,graph:mv,zones:gv,road:_v,buildings:xv};function Ls(n,t,e=La){if(n===t)return[n];if(!e[n]||!e[t])return null;const i={[n]:null},r=[n];for(;r.length;){const s=r.shift(),o=e[s]||[];for(let a=0;a<o.length;a++){const l=o[a];if(!Object.prototype.hasOwnProperty.call(i,l)){if(i[l]=s,l===t){const c=[t];let u=t;for(;i[u];)u=i[u],c.push(u);return c.reverse(),c}r.push(l)}}}return null}const Cr=[er,cv,vv],ba={easy:{id:"easy",label:"易",sendMinScale:.7,periodScale:1.55,regenScale:.6,reactDelay:3.6,firstShift:0,hqGrace:36,marchCap:8},normal:{id:"normal",label:"中",sendMinScale:1,periodScale:1,regenScale:1.08,reactDelay:.45,firstShift:0,hqGrace:20,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:6,hqRegen:.24,waveKeep:.58,maxRelief:1,barBonus:0,hqBonus:10,reliefCap:24,counterCap:16},hard:{id:"hard",label:"難",sendMinScale:.85,periodScale:.9,regenScale:1.16,reactDelay:.35,firstShift:-6,hqGrace:12,hqAssault:60,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:12,hqRegen:.32,waveKeep:.64,maxRelief:1,barBonus:12,hqBonus:18,reliefCap:26,counterCap:16}};function Mv(n){for(let t=0;t<Cr.length;t++)if(Cr[t].id===n)return Cr[t];return er}function yv(n){return ba[n]||ba.normal}function Sv(n,t){const e=t&&t.firstShift?t.firstShift:0;return Math.max(4,n+e)}function qc(n){const t=Math.floor(n*.5);return Math.max(0,Math.min(t,n-8))}function Ev(n,t,e,i,r,s){return n>=t?!0:!e||i==null||s?!1:n>=i+r}function Yc(n){return n.hqGrace>0&&n.t<n.hqGrace||n.hqAssault>0&&n.t<n.hqAssault}function bv(n,t){return n==="aggressive"?(t.kind==="hq"?40:16)-t.count-t.travel*.5:n==="cautious"?(t.kind==="hq"?-20:0)-t.travel*2-t.count*.05:-t.travel*10-t.count*.01}function wv(n,t,e){let i=null,r=-1/0;const s=t??n.length;for(let o=0;o<s;o++){if(e&&n[o].kind==="hq")continue;const a=n[o].count*10-n[o].travel;a>r&&(r=a,i=n[o])}return i}function Tv(n,t,e,i){let r=null,s=-1/0;const o=e??t.length;for(let a=0;a<o;a++){if(i&&t[a].kind==="hq")continue;const l=bv(n,t[a]);l>s&&(s=l,r=t[a])}return r}function Av(n,t){if(t.relief=!1,t.counter=!1,!Ev(n.t,n.nextSendAt,n.underAttack,n.alarmAt,n.reactDelay,n.answered)||n.count<2||n.kind==="hq"&&(n.wave||0)>=2)return!1;const i=!!(n.holdWall&&n.underAttack&&n.ownsThreatened&&n.threatenedId),r=i&&n.buildingId===n.threatenedId;if(r&&n.count>=8)return!1;const s=i&&!r;if(n.kind==="hq"&&(n.wave||0)>=1&&!s)return!1;if(s){const u=n.reliefKeep>0?n.reliefKeep:.35,h=n.counterKeep>0?n.counterKeep:u,f=n.relieve?u:h;let d=Math.min(n.count-1,Math.max(0,Math.floor(n.count*f)));if(n.marchCap>0){const y=n.count-n.marchCap;y>d&&(d=y)}const g=n.reliefCap>0?n.reliefCap:12,_=n.counterCap>0?n.counterCap:10;if(n.relieve){const y=Math.min(g,n.count-1),M=n.count-y;M>d&&(d=M)}else{const y=n.count-_;y>d&&(d=y)}if(n.count-d<1)return!1;if(n.relieve)return t.targetId=n.threatenedId,t.keep=d,t.relief=!0,!0;if(n.threatenedKind==="hq"&&n.riposte>0&&n.alarmAt!=null&&n.t<n.alarmAt+n.riposte)return!1;const m=Yc(n),p=wv(n.targets,n.targetCount,m);return p?(t.targetId=p.id,t.keep=d,t.counter=!0,!0):!1}if(!s&&n.t<n.nextSendAt&&!(n.kind==="hq"?n.count<14:n.count<n.sendMin)&&!n.opened)return!1;const o=!!(n.underAttack&&n.threatenedId&&!n.pressing);if(!s&&o&&n.buildingId!==n.threatenedId&&n.ownsThreatened){const u=n.reliefKeep>0?n.reliefKeep:.35,h=Math.min(n.count-1,Math.max(0,Math.floor(n.count*u)));return n.count-h<1?!1:(t.targetId=n.threatenedId,t.keep=h,!0)}if(!o){if(n.kind==="hq"){const u=qc(n.count);if(n.count<14||n.count-u<8)return!1}else if(n.count<n.sendMin)return!1}const a=Yc(n),l=Tv(n.personality,n.targets,n.targetCount,a);if(!l)return!1;let c=0;if(n.kind==="hq"&&!o){c=qc(n.count);const u=n.count-14;u>c&&(c=u)}else o?c=n.count>=3?1:0:n.personality==="cautious"&&(c=Math.min(n.count-1,Math.max(0,Math.floor(n.count*.3))));if(n.marchCap>0&&!o){const u=n.count-n.marchCap;u>c&&(c=u)}if(!o&&n.waveKeep>0&&n.kind!=="hq"){const u=Math.floor(n.count*n.waveKeep);u>c&&(c=Math.min(u,n.count-1))}return n.count-c<1?!1:(t.targetId=l.id,t.keep=c,!0)}const je={clashEvery:.3,clashLoss:4,captureSeconds:.7,marchSpeed:4.8,contactRadius:.92,arriveRadius:.7,enemySendMin:16,enemySendPeriod:10,substep:.05},Rv={"enemy-bar":16,"enemy-hq":22};function Cv({garrison:n,attackerCount:t,attackerOwner:e,buildingOwner:i}){const r=Math.max(0,Math.floor(n||0)),s=Math.max(0,Math.floor(t||0));return r>0||s<=0||!e||!i?!1:e!==i}function Pv(n,t,e,i){if(!i)return{progress:0,done:!1};const r=e,s=Math.max(0,n||0)+Math.max(0,t)/r;return s>=1?{progress:1,done:!0}:{progress:s,done:!1}}function Lv(n,t){return{owner:n,count:Math.max(0,Math.floor(t||0)),capture:0}}function Dv(n,t){return n!=="player"?"lose":t==="player"?"win":null}function Zc(n,t,e){const i=Math.max(0,Math.floor(Number.isFinite(n)?n:0)),r=Math.max(0,Math.floor(Number.isFinite(t)?t:0)),s=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),o=Math.min(i,r,s),a=i-o,l=r-o;let c=null;return a===0&&l===0?c="none":a>0&&l===0?c="a":l>0&&a===0&&(c="b"),{a,b:l,loss:o,winner:c}}function Iv(n,t){const e=n.map(c=>Math.max(0,Math.floor(c))),i=e.reduce((c,u)=>c+u,0),r=Math.max(0,Math.floor(t));if(i<=0||r<=0)return e.map(()=>0);const s=e.map(c=>c/i*r),o=s.map(c=>Math.floor(c));let a=r-o.reduce((c,u)=>c+u,0);const l=s.map((c,u)=>({i:u,frac:c-Math.floor(c)})).sort((c,u)=>u.frac-c.frac||c.i-u.i);for(let c=0;c<l.length&&a>0;c++)o[l[c].i]+=1,a-=1;return o}function Uv(n,t,e,i,r){const s=Math.max(0,n),o=Math.max(0,t);if(!(i>0)||s>=o||!(r>0))return{count:Math.min(s,o>0?Math.max(s,0):s),bank:s>=o?0:e||0};let a=(e||0)+i*r,l=s;const c=Math.floor(a);if(c>0){const u=Math.min(o-l,c);l+=u,a-=c,l>=o&&(l=o,a=0)}return{count:l,bank:a}}function Nv(n,t){const e=n.owner==="enemy"&&t.regenScale>0?t.regenScale:1;let i=n.regen*e;n.owner==="enemy"&&n.kind==="hq"&&t.hqRegen>0&&(i+=t.hqRegen);let r=n.count,s=n.cap;return n.owner==="enemy"&&n.kind==="barracks"&&t.barBonus>0&&(r=Math.min(n.cap,n.count+t.barBonus)),n.owner==="enemy"&&n.kind==="hq"&&t.hqBonus>0&&(r=n.count+t.hqBonus,s=Math.max(n.cap,r)),{id:n.id,kind:n.kind,owner:n.owner,node:n.node,count:r,cap:s,regen:i,baseRegen:n.regen,bank:0,capture:0,upgrades:{haste:0,bulwark:0}}}function Fv(n={}){const t=Mv(n.mapId||"crossing"),e=yv(n.difficulty||"normal"),i=t.buildings.map(s=>Nv(s,e)),r={};for(let s=0;s<i.length;s++){const o=i[s];if(o.owner!=="enemy")continue;const a=Rv[o.id]??(o.kind==="hq"?22:16);r[o.id]=Sv(a,e)}return{t:0,status:n.status||"playing",ai:n.ai!==!1,clashAcc:0,nextSquadId:1,nextSendAt:r,buildings:i,squads:[],events:[],map:t,nodes:t.nodes,graph:t.graph,personality:t.personality||"balanced",difficulty:e.id,sendMin:je.enemySendMin*e.sendMinScale,sendPeriod:je.enemySendPeriod*e.periodScale,reactDelay:e.reactDelay,hqGrace:e.hqGrace>0?e.hqGrace:0,hqAssault:e.hqAssault>0?e.hqAssault:0,marchCap:e.marchCap>0?e.marchCap:0,reliefKeep:e.reliefKeep>0?e.reliefKeep:0,holdWall:!!e.holdWall,riposte:e.riposte>0?e.riposte:0,counterKeep:e.counterKeep>0?e.counterKeep:0,waveKeep:e.waveKeep>0?e.waveKeep:0,maxRelief:e.maxRelief>0?e.maxRelief:0,reliefCap:e.reliefCap>0?e.reliefCap:12,counterCap:e.counterCap>0?e.counterCap:10,alarmAt:null,answered:{},opened:{},waveTurn:{},reliefCount:{}}}function lr(n){return n&&n.nodes||qi}function tl(n){return n&&n.graph||La}function De(n,t){for(let e=0;e<n.buildings.length;e++)if(n.buildings[e].id===t)return n.buildings[e];return null}function Bi(n,t){if(!n)return null;for(let e=0;e<n.squads.length;e++)if(n.squads[e].id===t)return n.squads[e];return null}function uh(n,t,e){if(!n||n.status!=="playing")return{ok:!1,reason:"over"};const i=Bi(n,t),r=De(n,e);if(!i||i.owner!=="player"||i.count<=0)return{ok:!1,reason:"bad-squad"};if(!r)return{ok:!1,reason:"bad-target"};const s=i.path||[];if(!s.length)return{ok:!1,reason:"no-path"};const o=i.seg>=s.length-1,a=o?s[s.length-1]:s[i.seg],l=o?null:s[i.seg+1];let c;const u=tl(n);if(!l)c=Ls(a,r.node,u);else{const h=Ls(l,r.node,u);if(!h)return{ok:!1,reason:"no-path"};c=h[0]===a?h:[a,...h]}return!c||c.length<2?{ok:!1,reason:"same"}:(i.targetId=r.id,i.path=c,i.seg=0,i.mode="march",n.events.push({type:"retarget",squadId:t,targetId:e,owner:i.owner}),{ok:!0})}function Kc(n,t){let e=0;for(let i=0;i<n.buildings.length;i++){const r=n.buildings[i];r.owner===t&&(e+=r.count)}for(let i=0;i<n.squads.length;i++){const r=n.squads[i];r.owner===t&&(e+=r.count)}return e}function Ov(n){const t=Math.max(0,Math.floor(n.count||0));if(t<=1)return 0;const e=Math.max(1,Math.floor(t*.2));return Math.min(e,6,t-1)}function el(n,t,e,i=0){if(!n||n.status!=="playing")return{ok:!1,reason:"over"};const r=De(n,t),s=De(n,e);if(!r||!s||r.id===s.id)return{ok:!1,reason:"bad-target"};const o=Math.max(0,Math.floor(i));if(r.count-o<1)return{ok:!1,reason:"empty"};const a=Ls(r.node,s.node,tl(n));if(!a||a.length<2)return{ok:!1,reason:"no-path"};const l=r.count-o;r.count=o,r.bank=0;const c=lr(n)[a[0]],u={id:`sq${n.nextSquadId++}`,owner:r.owner,count:l,targetId:s.id,path:a,seg:0,x:c.x,z:c.z,mode:"march"};return n.squads.push(u),n.events.push({type:"send",owner:r.owner,count:l,fromId:t,targetId:e}),{ok:!0,count:l,id:u.id}}function zv(n,t,e){let i=je.marchSpeed*t;for(;i>0&&n.seg<n.path.length-1;){const r=e[n.path[n.seg+1]],s=r.x-n.x,o=r.z-n.z,a=Math.hypot(s,o);if(a<=1e-6){n.x=r.x,n.z=r.z,n.seg+=1;continue}if(a<=i+1e-8)n.x=r.x,n.z=r.z,i-=a,n.seg+=1;else{const l=1/a;n.x+=s*l*i,n.z+=o*l*i,i=0}}}function Bv(n,t){let e=0;for(let i=0;i<n.length-1;i++){const r=t[n[i]],s=t[n[i+1]];e+=Math.hypot(r.x-s.x,r.z-s.z)}return e}const ai={id:null},zn={targetId:"",keep:0,relief:!1,counter:!1},Ds=[];for(let n=0;n<12;n++)Ds.push({id:"",kind:"",count:0,travel:0});function kv(n){ai.id=null,ai.dist=1/0;let t=1/0,e=!1;const i=lr(n);for(let r=0;r<n.squads.length;r++){const s=n.squads[r];if(s.owner!=="player"||s.count<=0||!s.targetId)continue;const o=De(n,s.targetId);if(!o||o.owner!=="enemy")continue;e=!0;const a=i[o.node],l=Math.hypot(s.x-a.x,s.z-a.z);l<t&&(t=l,ai.id=o.id,ai.dist=l)}return e}function Hv(n,t){const e=lr(n),i=tl(n);let r=0;for(let s=0;s<n.buildings.length&&r<Ds.length;s++){const o=n.buildings[s];if(o.owner!=="player")continue;const a=Ls(t,o.node,i);if(!a)continue;const l=Ds[r];l.id=o.id,l.kind=o.kind,l.count=o.count,l.travel=a.length<2?0:Bv(a,e),r+=1}return r}function Gv(n){if(!n.ai)return;const t=kv(n);t?n.alarmAt==null&&(n.alarmAt=n.t):n.alarmAt!=null&&(n.alarmAt=null);const e=De(n,ai.id),i=t&&ai.dist<=je.arriveRadius,r=n.opened||(n.opened={});let s=null;if(n.holdWall&&t&&e&&e.owner==="enemy"){const o=lr(n),a=o[e.node];let l=1/0;if(a)for(let c=0;c<n.buildings.length;c++){const u=n.buildings[c];if(u.owner!=="enemy"||u.id===e.id||u.count<2)continue;const h=o[u.node];if(!h)continue;const f=(h.x-a.x)*(h.x-a.x)+(h.z-a.z)*(h.z-a.z);f<l&&(l=f,s=u.id)}}for(let o=0;o<n.buildings.length;o++){const a=n.buildings[o];if(a.owner!=="enemy")continue;const l=Hv(n,a.node);if(!Av({t:n.t,nextSendAt:n.nextSendAt[a.id]??0,underAttack:t,alarmAt:n.alarmAt,reactDelay:n.reactDelay,answered:!!n.answered[a.id],count:a.count,kind:a.kind,buildingId:a.id,personality:n.personality,sendMin:n.sendMin,threatenedId:ai.id,ownsThreatened:!!(e&&e.owner==="enemy"),targets:Ds,targetCount:l,opened:!!r[a.id],pressing:i,hqGrace:n.hqGrace||0,hqAssault:n.hqAssault||0,marchCap:n.marchCap||0,reliefKeep:n.reliefKeep||0,holdWall:!!n.holdWall,counterKeep:n.counterKeep||0,waveKeep:n.waveKeep||0,wave:n.waveTurn[a.id]||0,reliefCap:n.reliefCap||0,counterCap:n.counterCap||0,riposte:n.riposte||0,threatenedKind:e?e.kind:"",relieve:!!(s&&s===a.id&&e&&e.owner==="enemy"&&e.kind==="barracks"&&e.count>=12&&n.maxRelief>0&&(n.reliefCount[a.id]||0)<n.maxRelief&&(n.waveTurn[a.id]||0)%2===0)},zn)||!el(n,a.id,zn.targetId,zn.keep).ok)continue;r[a.id]=!0,(zn.relief||zn.counter)&&(n.waveTurn[a.id]=(n.waveTurn[a.id]||0)+1),zn.relief&&(n.reliefCount[a.id]=(n.reliefCount[a.id]||0)+1);let h=n.sendPeriod;(zn.relief||zn.counter)&&n.riposte>0&&(h=n.riposte),n.nextSendAt[a.id]=n.t+h,t&&(n.answered[a.id]=!0)}}function Vv(n){const t=n.squads,e=new Set,i=[];for(let r=0;r<t.length;r++){const s=t[r];if(s.count<=0||e.has(s.id))continue;let o=null,a=je.contactRadius;for(let l=0;l<t.length;l++){if(r===l)continue;const c=t[l];if(c.count<=0||e.has(c.id)||c.owner===s.owner)continue;const u=Math.hypot(s.x-c.x,s.z-c.z);u<=a&&(a=u,o=c)}o&&(e.add(s.id),e.add(o.id),i.push([s,o]))}return{pairs:i,paired:e}}function Wv(n,t){for(let e=0;e<n.squads.length;e++){const i=n.squads[e];if(i.count<=0)continue;if(t.has(i.id)){i.mode="fight";continue}const r=De(n,i.targetId);if(!r){i.mode="march";continue}const s=lr(n)[r.node],o=Math.hypot(i.x-s.x,i.z-s.z);if(i.seg>=i.path.length-1&&o<=je.arriveRadius)if(r.owner===i.owner){const l=Math.max(0,r.cap-r.count),c=Math.min(i.count,l);c>0&&(r.count+=c,i.count-=c,n.events.push({type:"reinforce",buildingId:r.id,owner:i.owner})),i.count>0&&(i.x=s.x,i.z=s.z,i.mode="march")}else i.mode="siege",i.x=s.x,i.z=s.z;else i.mode="march"}}function Xv(n,t){let e=!1;for(let r=0;r<t.length;r++){const s=t[r][0],o=t[r][1];if(s.count<=0||o.count<=0)continue;const a=Zc(s.count,o.count,je.clashLoss);s.count=a.a,o.count=a.b,e=!0}const i=new Map;for(let r=0;r<n.squads.length;r++){const s=n.squads[r];if(s.mode!=="siege"||s.count<=0)continue;let o=i.get(s.targetId);o||(o=[],i.set(s.targetId,o)),o.push(s)}for(const[r,s]of i){const o=De(n,r);if(!o||s.every(f=>f.owner===o.owner))continue;const a=s.filter(f=>f.owner!==o.owner&&f.count>0);if(!a.length)continue;const l=a.map(f=>f.count),c=l.reduce((f,d)=>f+d,0),u=Zc(c,o.count,je.clashLoss);o.count=u.b;const h=Iv(l,u.a);for(let f=0;f<a.length;f++)a[f].count=h[f];o.count>0&&(o.capture=0),e=!0}e&&n.events.push({type:"clash"})}function qv(n,t){for(let e=0;e<n.buildings.length;e++){const i=n.buildings[e];let r=0,s=null;const o=[];for(let u=0;u<n.squads.length;u++){const h=n.squads[u];h.mode!=="siege"||h.targetId!==i.id||h.count<=0||h.owner!==i.owner&&(r+=h.count,s=h.owner,o.push(h))}const a=Cv({garrison:i.count,attackerCount:r,attackerOwner:s,buildingOwner:i.owner}),l=Pv(i.capture,t,je.captureSeconds,a);if(i.capture=l.progress,!l.done||!s)continue;const c=Lv(s,r);i.owner=c.owner,i.count=c.count,i.capture=0,i.bank=0;for(let u=0;u<o.length;u++)o[u].count=0;n.events.push({type:"capture",buildingId:i.id,owner:s})}}function Yv(n){const t=De(n,"player-hq"),e=De(n,"enemy-hq"),i=Dv(t&&t.owner,e&&e.owner);i&&n.status==="playing"&&(n.status=i,n.events.push({type:i}))}function Zv(n,t){if(n.status!=="playing")return;for(let s=0;s<n.buildings.length;s++){const o=n.buildings[s];if(!(o.regen>0)||o.kind!=="barracks"&&o.kind!=="hq")continue;let a=!1;for(let u=0;u<n.squads.length;u++){const h=n.squads[u];if(h.mode==="siege"&&h.targetId===o.id&&h.owner!==o.owner&&h.count>0){a=!0;break}}if(a)continue;const l=o.count,c=Uv(o.count,o.cap,o.bank,o.regen,t);o.count=c.count,o.bank=c.bank,o.count>l&&n.events.push({type:"spawn",buildingId:o.id,owner:o.owner})}Gv(n);const e=lr(n);for(let s=0;s<n.squads.length;s++){const o=n.squads[s];o.mode==="march"&&o.count>0&&zv(o,t,e)}const{pairs:i,paired:r}=Vv(n);for(Wv(n,r),n.clashAcc+=t;n.clashAcc>=je.clashEvery;)n.clashAcc-=je.clashEvery,Xv(n,i);qv(n,t),n.squads.some(s=>s.count<=0)&&(n.squads=n.squads.filter(s=>s.count>0)),Yv(n)}function hh(n,t,e={}){if(!n||n.status!=="playing"||!Number.isFinite(t)||t<=0)return n;e.ai===!1&&(n.ai=!1),e.ai===!0&&(n.ai=!0),n.events.length=0;let i=t;const r=je.substep;for(;i>1e-8&&n.status==="playing";){const s=Math.min(r,i);Zv(n,s),n.t+=s,i-=s}return n}const Is=document.getElementById("app"),Hs=document.getElementById("view"),Ni=document.getElementById("hint"),li=document.getElementById("sheet"),ki=document.getElementById("mute"),Cn=document.getElementById("home"),fh=document.getElementById("upgrades"),dh=document.getElementById("up-haste"),ph=document.getElementById("up-bulwark"),Kv=document.getElementById("score-mine"),$v=document.getElementById("score-foe"),Ao=document.querySelector(".scores"),tr=document.getElementById("coach"),Us=document.getElementById("toast"),$c=document.getElementById("sheet-time"),be=mx(Hs),Fr=Qx(be.scene),nl=ux(be.scene),mh=hx(be.scene);let wa=!0;const il=rx(document.getElementById("badges")),Ne=Ph();let Or="crossing",zr="normal",zt=null,fe=null,Ns=!1,Jc=0,Ta=!1;function gh(){const n=Ne.muted;ki.textContent=n?"🔇":"🔊",ki.setAttribute("aria-pressed",n?"true":"false"),ki.setAttribute("aria-label",n?"打開聲音":"靜音"),ki.classList.toggle("is-muted",n)}function Jv(n){const t=Math.max(0,Math.floor(n||0));if(t<60)return`用咗 ${t} 秒`;const e=Math.floor(t/60),i=t%60;return`用咗 ${e} 分 ${i} 秒`}function Aa(){tr&&(tr.hidden=!0);try{localStorage.setItem(Ah,"1")}catch{}}function _h(){tr&&(tr.hidden=!0)}function jv(){if(!Us)return;let n=!1;if(zt&&zt.status==="playing"&&Cn.hidden){const t=zt.squads;for(let e=0;e<t.length;e++){const i=t[e];if(i.owner==="enemy"&&i.count>0&&i.targetId==="player-hq"){n=!0;break}}}n!==Ta&&(Ta=n,Us.hidden=!n)}function Fe(n){if(Cn&&!Cn.hidden){Ni.hidden=!0;return}if(Ni.hidden=!1,!zt||zt.status!=="playing"){Ni.textContent="再戰，或者揀地圖";return}n==="drag"?Ni.textContent="鬆手就出兵":n==="selected"?Ni.textContent="可以升級，或者拖去目標出兵":Ni.textContent="點自己建築出兵"}function Ra(n){li.hidden=!1,li.classList.toggle("win",n==="win"),li.classList.toggle("lose",n==="lose"),document.getElementById("sheet-title").textContent=n==="win"?"勝利":"戰敗",document.getElementById("sheet-kicker").textContent="戰果",document.getElementById("sheet-body").textContent=n==="win"?"攻陷敵方司令部":"司令部被攻陷",$c&&($c.textContent=Jv(zt&&zt.t)),Fe("idle")}function Br(){li.hidden=!0,li.classList.remove("win","lose")}function rl(){zt&&(Kv.textContent=String(Kc(zt,"player")),$v.textContent=String(Kc(zt,"enemy")))}function xh(){const n=be.camera;Cn&&!Cn.hidden?dx(n,n.aspect):Qu(n,n.aspect)}function di(n){Cn.hidden=!n,Is&&Is.classList.toggle("is-home",!!n),Ao&&(Ao.hidden=!1,Ao.classList.toggle("is-preview",!!n)),n&&(fh.hidden=!0),xh(),_h()}function pi(n){zt=Fv({mapId:Or,difficulty:zr,status:n}),Fr.mount(zt.map),be.renderer.shadowMap.needsUpdate=!0,nl.setMap(zt.map),il.setMap(zt.map),fe=null,Ns=!1,Fr.resetDrag(),Ta=!1,Us&&(Us.hidden=!0),rl(),_h()}function Gs(n,t,e){const i=n.querySelectorAll("button");for(let r=0;r<i.length;r++)i[r].classList.toggle("is-on",i[r].getAttribute(t)===e)}function vh(){const n=fe&&zt&&zt.status==="playing"?De(zt,fe):null,t=!!(n&&n.owner==="player"&&Cn.hidden);fh.hidden=!t,t&&(jc(dh,n,"haste"),jc(ph,n,"bulwark"))}function jc(n,t,e){const i=Yi(t,e),r=i.rank+1,s=i.reason==="max"?`${i.label} 滿級`:`${i.label} ${r}級 · ${i.cost}`;n.textContent!==s&&(n.textContent=s),n.disabled=!i.ok}function Mh(n){const t=fe&&De(zt,fe);if(!t)return;const e=Wh(t,n);Ne.sfx(e.ok?"spawn":"nope"),vh()}function Qv(n){const t=new Set;for(let e=0;e<zt.events.length;e++)t.add(zt.events[e].type);t.has("win")?(Ne.sfx("win"),Ra("win")):t.has("lose")?(Ne.sfx("lose"),Ra("lose")):t.has("capture")?Ne.sfx("capture"):t.has("clash")&&Ne.sfx("clash"),t.has("spawn")&&n>Jc&&zt.events.some(i=>i.type==="spawn"&&i.owner==="player")&&(Ne.sfx("spawn"),Jc=n+900)}function Qc(n,t){return zt.status!=="playing"||!n||!t||n===t?!1:(Bi(zt,n)?uh(zt,n,t):tM(n,t)).ok?(Ne.sfx("send"),fe=null,Fe("idle"),!0):(Ne.sfx("nope"),!1)}function tM(n,t){const e=De(zt,n);return!e||e.owner!=="player"?{ok:!1}:el(zt,n,t,Ov(e))}fx(Hs,be.camera,()=>{const n=[];for(let t=0;t<zt.buildings.length;t++){const e=zt.buildings[t],r=(zt.nodes||qi)[e.node];n.push({id:e.id,owner:e.owner,kind:e.kind,x:r.x,z:r.z})}for(let t=0;t<zt.squads.length;t++){const e=zt.squads[t];e.count<=0||n.push({id:e.id,owner:e.owner,kind:"squad",x:Zu(e.x,e.owner,e.mode),z:e.z})}return n},{unlock(){Ne.unlock()},onTap(n){if(zt.status!=="playing")return;if(!n){fe=null,Fe("idle");return}const t=Bi(zt,n);if(t&&t.owner!=="player")return;if(fe&&fe!==n){const r=Bi(zt,fe),s=De(zt,fe);if(r&&r.owner==="player"||s&&s.owner==="player"){Qc(fe,n);return}}const e=De(zt,n);if(e&&e.owner==="player"){Aa(),fe=fe===n?null:n,Fe(fe?"selected":"idle");return}const i=Bi(zt,n);i&&i.owner==="player"&&(fe=fe===n?null:n,Fe(fe?"selected":"idle"))},onDragStart(n){Ns=!0,fe=n;const t=De(zt,n);t&&t.owner==="player"&&Aa(),Fe("drag")},onDragMove(n,t){const e=Bi(zt,fe);Fr.setDrag(fe,n,t,e?{x:e.x,z:e.z}:null)},onDragEnd(n,t){Ns=!1,Fr.resetDrag(),n&&t&&Qc(n,t),Fe(fe?"selected":"idle")}});ki.addEventListener("pointerdown",n=>{n.stopPropagation()});ki.addEventListener("click",n=>{n.stopPropagation(),Ne.unlock(),Ne.toggle(),gh()});function qn(n,t){n.addEventListener("pointerdown",e=>{e.stopPropagation()}),n.addEventListener("click",e=>{e.stopPropagation(),Ne.unlock(),t()})}function oe(n){return`#${n.toString(16).padStart(6,"0")}`}function eM(n){const t=document.createElement("canvas");t.className="map-thumb";const e=280,i=188;t.width=e,t.height=i;const r=t.getContext("2d"),s=eh(n),o=nh(n),a=ih(n);for(let I=0;I<o.length;I++){const j=o[I];s.minX=Math.min(s.minX,j.x-.35),s.maxX=Math.max(s.maxX,j.x+.35),s.minZ=Math.min(s.minZ,j.z-.35),s.maxZ=Math.max(s.maxZ,j.z+.35)}const l=16,c=Math.max(.001,s.maxX-s.minX),u=Math.max(.001,s.maxZ-s.minZ),h=(i-l*2)/u,f=Math.min((e-l*2)/c,h*1.65),d=(s.minX+s.maxX)/2;function g(I){return{x:e/2+(I.x-d)*f,y:l+(I.z-s.minZ)*h}}r.fillStyle=oe(xt.meadow),r.fillRect(0,0,e,i),r.fillStyle=oe(xt.meadowDeep),r.fillRect(0,0,e,i*.16),r.fillRect(0,i*.84,e,i*.16),r.fillRect(0,0,e*.12,i),r.fillRect(e*.88,0,e*.12,i),r.globalAlpha=.55,r.fillStyle=oe(xt.sand),r.beginPath(),r.ellipse(e*.5,i*.28,e*.08,i*.07,0,0,Math.PI*2),r.fill(),r.beginPath(),r.ellipse(e*.46,i*.74,e*.1,i*.06,0,0,Math.PI*2),r.fill(),r.globalAlpha=1;const _={},m=n.buildings||[];for(let I=0;I<m.length;I++)_[m[I].id]=m[I].owner;const p=n.zones||[];r.globalAlpha=.22;for(let I=0;I<p.length;I++){const j=p[I],Q=_[j.buildingId],W=Q?cn(Q):null,vt=g(j);r.beginPath(),r.ellipse(vt.x,vt.y,Math.max(10,j.rx*f*.85),Math.max(8,j.rz*h*.9),0,0,Math.PI*2),r.fillStyle=oe(W?W.slab:xt.meadowDeep),r.fill()}r.globalAlpha=1;const y=rh(n),M=g({x:y.x,z:y.z}),x=Math.max(18,Math.min(i*.2,y.depth*h*.55)),C=Math.max(5,x*.35),R=x*.42;function A(I,j){r.beginPath();for(let W=0;W<=10;W++){const vt=e*W/10,at=Math.sin(W/10*Math.PI)*C;r.lineTo(vt,M.y-I+at+j)}for(let W=10;W>=0;W--){const vt=e*W/10,at=Math.sin(W/10*Math.PI)*C;r.lineTo(vt,M.y+I+at+j)}r.closePath(),r.fill()}r.fillStyle=oe(xt.sand),A(x/2+R,0),r.fillStyle=oe(6970436),A(x/2+R*.45,0),r.fillStyle=oe(xt.stream),A(x/2,0),r.fillStyle=oe(7255252),A(x*.22,C*.15);function P(I,j){r.fillStyle=j,r.globalAlpha=.92,r.beginPath();for(let W=0;W<=12;W++){const vt=e*W/12,at=Math.sin(W/12*Math.PI)*16;r.lineTo(vt,M.y+at+I)}for(let W=12;W>=0;W--){const vt=e*W/12,at=Math.sin(W/12*Math.PI)*16;r.lineTo(vt,M.y+at+I+4)}r.closePath(),r.fill(),r.globalAlpha=1}const E=x/2+R+10;P(E,oe(xt.player.main)),P(-E-4,oe(xt.enemy.main));const v=n.nodes||{},L=Math.max(11,.72*f);r.fillStyle=oe(xt.road);function O(I,j){const Q=g(I),W=g(j),vt=W.x-Q.x,at=W.y-Q.y,$=Math.hypot(vt,at)||1,lt=-at/$*L*.5,St=vt/$*L*.5;r.beginPath(),r.moveTo(Q.x+lt,Q.y+St),r.lineTo(W.x+lt,W.y+St),r.lineTo(W.x-lt,W.y-St),r.lineTo(Q.x-lt,Q.y-St),r.closePath(),r.fill()}const z=Math.max(.42,y.depth*.85),H=new Set,Y=n.graph||{},V=Object.keys(Y);for(let I=0;I<V.length;I++){const j=Y[V[I]]||[],Q=v[V[I]];for(let W=0;W<j.length;W++){const vt=j[W],at=V[I]<vt?`${V[I]}|${vt}`:`${vt}|${V[I]}`;if(H.has(at))continue;H.add(at);const $=v[vt];if(!(!Q||!$))if(Q.z*$.z<-1e-4){const lt=(0-Q.z)/($.z-Q.z),St=Q.x+($.x-Q.x)*lt;O(Q,{x:St,z:Q.z>0?z:-z}),O($,{x:St,z:$.z>0?z:-z})}else O(Q,$)}}const rt=sh(n);for(let I=0;I<rt.length;I++){const j=g(rt[I]),Q=Math.max(18,L+8),W=x+6;r.fillStyle=oe(xt.bridge),r.fillRect(j.x-Q/2,j.y-W/2,Q,W),r.fillStyle=oe(xt.roadEdge),r.fillRect(j.x-Q/2,j.y-W/2,3,W),r.fillRect(j.x+Q/2-3,j.y-W/2,3,W)}for(let I=0;I<a.length;I++){const j=g(a[I]),Q=Math.max(5,a[I].s*h*.7);r.fillStyle=oe(xt.rock),r.beginPath(),r.ellipse(j.x,j.y,Q*1.25,Q*.8,0,0,Math.PI*2),r.fill()}for(let I=0;I<o.length;I++){const j=o[I],Q=g(j),W=Math.max(26,j.s*h*2.1),vt=W*.46;r.fillStyle=oe(xt.trunk),r.fillRect(Q.x-1.5,Q.y-2,3,6),r.fillStyle=oe(j.color),r.beginPath(),r.moveTo(Q.x,Q.y-W),r.lineTo(Q.x+vt,Q.y+2),r.lineTo(Q.x-vt,Q.y+2),r.fill(),r.fillStyle=oe(xt.leaf),r.beginPath(),r.moveTo(Q.x,Q.y-W*.72),r.lineTo(Q.x+vt*.62,Q.y-W*.22),r.lineTo(Q.x-vt*.62,Q.y-W*.22),r.fill()}for(let I=0;I<m.length;I++){const j=m[I],Q=v[j.node];if(!Q)continue;const W=g(Q),vt=cn(j.owner),at=Math.max(15,Math.min(f,h)*1.35);j.kind==="hq"?(r.fillStyle=oe(xt.sand),r.fillRect(W.x-at*1.25,W.y-at*.2,at*2.5,at*.85),r.fillStyle=oe(xt.concrete),r.fillRect(W.x-at*.95,W.y-at*.55,at*1.9,at*.55),r.fillRect(W.x-at*.7,W.y-at*.95,at*1.4,at*.45),r.fillStyle=oe(vt.main),r.fillRect(W.x-at*.78,W.y-at*1.02,at*1.56,at*.16),r.fillStyle=oe(xt.metal),r.fillRect(W.x-at*.08,W.y-at*1.7,at*.16,at*.75),r.beginPath(),r.arc(W.x+at*.42,W.y-at*1.35,Math.max(2,at*.12),0,Math.PI*2),r.fill(),r.fillStyle=oe(vt.flag),r.fillRect(W.x-at*.08,W.y-at*1.85,at*.42,at*.22)):(r.fillStyle=oe(xt.sand),r.fillRect(W.x-at*1.45,W.y-at*.05,at*.28,at*.4),r.fillRect(W.x+at*1.17,W.y-at*.05,at*.28,at*.4),r.fillStyle=oe(xt.concrete),r.fillRect(W.x-at*1.15,W.y-at*.15,at*2.3,at*.45),r.fillRect(W.x-at*1.05,W.y-at*.42,at*2.1,at*.32),r.fillStyle=oe(vt.main),r.fillRect(W.x-at*1.12,W.y-at*.58,at*2.24,at*.16),r.fillStyle=oe(xt.ink),r.fillRect(W.x-at*.28,W.y-at*.22,at*.56,at*.28),r.fillStyle=oe(vt.flag),r.fillRect(W.x-at*.95,W.y-at*.78,at*.28,at*.16))}return t}const Ca=document.getElementById("maps"),Pa=document.getElementById("diffs");for(let n=0;n<Cr.length;n++){const t=Cr[n],e=document.createElement("button");e.type="button",e.setAttribute("data-map",t.id),e.appendChild(eM(t));const i=document.createElement("span");i.className="map-name",i.textContent=t.name;const r=document.createElement("small");r.textContent=t.blurb,e.append(i,r),qn(e,()=>{Or=t.id,Gs(Ca,"data-map",Or),pi("menu"),di(!0),Fe("idle")}),Ca.appendChild(e)}const tu=["easy","normal","hard"];for(let n=0;n<tu.length;n++){const t=tu[n],e=document.createElement("button");e.type="button",e.setAttribute("data-diff",t),e.textContent=ba[t].label,qn(e,()=>{zr=t,Gs(Pa,"data-diff",zr)}),Pa.appendChild(e)}qn(document.getElementById("start"),()=>{pi("playing"),Br(),di(!1),Fe("idle")});function yh(){Br(),di(!0),pi("menu"),Fe("idle")}qn(document.getElementById("home-btn"),yh);qn(document.getElementById("sheet-map"),yh);qn(dh,()=>Mh("haste"));qn(ph,()=>Mh("bulwark"));tr&&qn(tr,Aa);document.getElementById("retry").addEventListener("click",()=>{Ne.unlock(),pi("playing"),Br(),di(!1),Fe("idle")});function Sh(){be.resize(),xh()}const nM=new ResizeObserver(Sh);nM.observe(Is);Sh();gh();Gs(Pa,"data-diff",zr);Gs(Ca,"data-map",Or);pi("menu");di(!0);Fe("idle");rl();let eu=performance.now(),vs=0,Ro=performance.now(),nu=0;function iM(n){if(nu+=1,nu<90){vs=0,Ro=n;return}vs+=1;const t=n-Ro;if(t<1600)return;const e=vs*1e3/t;if(vs=0,Ro=n,!(e>=40)){if(wa){wa=!1,mh.setEnabled(!1);return}be.shadowsOn&&be.setShadows(!1)}}function Eh(n){const t=Math.min(.05,(n-eu)/1e3);eu=n,zt&&zt.status==="playing"&&(hh(zt,t),Qv(n));const e=n/1e3,i=Cn&&!Cn.hidden||li&&!li.hidden,r=document.getElementById("badges");r&&(r.hidden=i),zt&&(Fr.update(e,zt,Ns?null:fe),nl.update(zt),mh.update(t,zt),i||il.update(zt,be.camera,Hs),vh(),rl(),jv()),be.renderer.render(be.scene,be.camera),iM(n),requestAnimationFrame(Eh)}requestAnimationFrame(Eh);window.__BL={get state(){return zt},pick:"screen-44",send(n,t){return el(zt,n,t)},retarget(n,t){return uh(zt,n,t)},step(n){hh(zt,n),(zt.status==="win"||zt.status==="lose")&&Ra(zt.status)},point(n){return il.clientPoint(n,be.camera,Hs)},facingDot(){return nl.facingDot()},quality(){return{shadows:be.shadowsOn,fx:wa,software:be.software}},setShadows(n){be.setShadows(!!n)},start(n,t){n&&(Or=n),t&&(zr=t),pi("playing"),Br(),di(!1),Fe("idle")},reset(){pi("playing"),Br(),di(!1),Fe("idle")}};window.addEventListener("error",n=>{const t=document.createElement("pre");t.id="boot-error",t.textContent=n.message||"畫面起動失敗",Is.appendChild(t)});
