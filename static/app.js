(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ql="bannerline.mute",Gd="bannerline.coach";function Vd(i){return i==="1"}function Wd(i){return i?"1":"0"}const Yl=[523.25,587.33,659.25,523.25,783.99,659.25,587.33,392];function Xd(){let i=!1;try{i=Vd(localStorage.getItem(ql))}catch{i=!1}let e=null,t=null,n=null,s=0,r=!1,o=0;function a(){if(e)return;const f=window.AudioContext||window.webkitAudioContext;f&&(e=new f,t=e.createGain(),t.gain.value=i?0:1,t.connect(e.destination))}function c(f,d,g,x,m){if(!e||!t)return;const p=e.createOscillator(),v=e.createGain();p.type=x,p.frequency.setValueAtTime(f,d),v.gain.setValueAtTime(1e-4,d),v.gain.exponentialRampToValueAtTime(Math.max(2e-4,m),d+.02),v.gain.exponentialRampToValueAtTime(1e-4,d+g),p.connect(v),v.connect(t),p.start(d),p.stop(d+g+.02)}function l(){n&&(clearInterval(n),n=null)}function u(){if(!e||i||n)return;const f=()=>{if(!e||i)return;const d=e.currentTime+.02,g=Yl[s%Yl.length];c(g,d,.34,"triangle",.035),c(g/2,d,.4,"sine",.02),s+=1};f(),n=setInterval(f,520)}function h(){try{localStorage.setItem(ql,Wd(i))}catch{}}return{get muted(){return i},unlock(){a(),e&&(e.state==="suspended"&&e.resume(),r=!0,i||u())},toggle(){return a(),i=!i,h(),e&&t&&(t.gain.setTargetAtTime(i?0:1,e.currentTime,.03),e.state==="suspended"&&e.resume()),i?l():r&&u(),i},sfx(f){if(i||(a(),!e||e.state!=="running"))return;const d=e.currentTime+.01;if(f==="send")c(440,d,.08,"triangle",.05),c(660,d+.07,.12,"triangle",.05);else if(f==="nope")c(180,d,.12,"sine",.04);else if(f==="clash"){const g=performance.now();if(g-o<120)return;o=g,c(210,d,.06,"square",.03),c(160,d+.04,.07,"triangle",.03)}else f==="capture"?(c(523,d,.1,"triangle",.05),c(659,d+.09,.1,"triangle",.05),c(784,d+.18,.16,"triangle",.05)):f==="spawn"?c(880,d,.05,"sine",.02):f==="win"?(c(523,d,.12,"triangle",.06),c(659,d+.12,.12,"triangle",.06),c(784,d+.24,.22,"triangle",.07)):f==="lose"&&(c(392,d,.16,"sine",.05),c(311,d+.14,.18,"sine",.05),c(247,d+.3,.28,"triangle",.05))}}}const qd="crossing",Yd="對岸",Kd="一條大路，兩邊兵營",Zd="balanced",$d={"player-hq":{x:0,z:6.55},"player-bar":{x:1.72,z:3.05},"player-road":{x:0,z:3.05},mid:{x:0,z:0},"enemy-road":{x:0,z:-3.05},"enemy-bar":{x:-1.72,z:-3.05},"enemy-hq":{x:0,z:-6.55}},Jd={"player-hq":["player-road"],"player-bar":["player-road"],"player-road":["player-hq","player-bar","mid"],mid:["player-road","enemy-road"],"enemy-road":["mid","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},jd=[{buildingId:"player-hq",x:0,z:5.75,rx:3.15,rz:1.95},{buildingId:"player-bar",x:.12,z:2.25,rx:3.25,rz:1.6},{buildingId:"enemy-bar",x:-.12,z:-2.25,rx:3.25,rz:1.6},{buildingId:"enemy-hq",x:0,z:-5.75,rx:3.15,rz:1.95}],Qd=["player-hq","player-road","mid","enemy-road","enemy-hq"],ep=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.1},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:30,cap:54,regen:2.25},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:18,cap:48,regen:1.7},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:44,cap:52,regen:0}],Ys={id:qd,name:Yd,blurb:Kd,personality:Zd,nodes:$d,graph:Jd,zones:jd,road:Qd,buildings:ep},Is=Ys.nodes,dl=Ys.graph,tp=Ys.zones;Ys.road;const of={haste:{id:"haste",label:"加速",cost:8,step:4,max:2},bulwark:{id:"bulwark",label:"加固",cost:8,step:4,max:2}};function np(i,e){const t=i&&i.upgrades,n=t&&t[e];return n>0?n:0}function ip(i,e){const t=of[i];return t?t.cost+Math.max(0,e)*t.step:1/0}function Ls(i,e){const t=of[e];if(!t||!i)return{ok:!1,reason:"bad",cost:0,label:""};const n=np(i,e);if(n>=t.max)return{ok:!1,reason:"max",cost:0,label:t.label,rank:n};const s=ip(e,n);return i.count-s<1?{ok:!1,reason:"troops",cost:s,label:t.label,rank:n}:{ok:!0,cost:s,label:t.label,rank:n}}function sp(i){return!i||i.owner!=="player"||i.kind!=="hq"&&i.kind!=="barracks"?!1:Ls(i,"haste").ok||Ls(i,"bulwark").ok}function rp(i,e){const t=Ls(i,e);if(!t.ok)return t;i.upgrades||(i.upgrades={haste:0,bulwark:0}),i.count-=t.cost,i.bank=0;const n=t.rank+1;if(i.upgrades[e]=n,e==="haste"){const s=i.baseRegen>0?i.baseRegen:.6;i.regen=s*1.55**n}else e==="bulwark"&&(i.cap+=10);return{ok:!0,cost:t.cost,rank:n,label:t.label}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pl="170",op=0,Kl=1,ap=2,af=1,cf=2,Kn=3,ti=0,Yt=1,At=2,Si=0,ws=1,Es=2,Zl=3,$l=4,cp=5,zi=100,lp=101,up=102,hp=103,fp=104,dp=200,pp=201,mp=202,gp=203,cc=204,lc=205,xp=206,_p=207,vp=208,yp=209,Mp=210,Sp=211,bp=212,wp=213,Ep=214,uc=0,hc=1,fc=2,Ds=3,dc=4,pc=5,mc=6,gc=7,lf=0,Tp=1,Ap=2,bi=0,Rp=1,Cp=2,Pp=3,uf=4,Ip=5,Lp=6,Dp=7,Jl="attached",Np="detached",hf=300,Ns=301,Us=302,xc=303,_c=304,la=306,Fs=1e3,yi=1001,Jo=1002,Kt=1003,ff=1004,br=1005,an=1006,Wo=1007,jn=1008,ni=1009,df=1010,pf=1011,zr=1012,ml=1013,Gi=1014,En=1015,Qr=1016,gl=1017,xl=1018,Os=1020,mf=35902,gf=1021,xf=1022,xn=1023,_f=1024,vf=1025,Ts=1026,zs=1027,_l=1028,vl=1029,yf=1030,yl=1031,Ml=1033,Xo=33776,qo=33777,Yo=33778,Ko=33779,vc=35840,yc=35841,Mc=35842,Sc=35843,bc=36196,wc=37492,Ec=37496,Tc=37808,Ac=37809,Rc=37810,Cc=37811,Pc=37812,Ic=37813,Lc=37814,Dc=37815,Nc=37816,Uc=37817,Fc=37818,Oc=37819,zc=37820,Bc=37821,Zo=36492,kc=36494,Hc=36495,Mf=36283,Gc=36284,Vc=36285,Wc=36286,Br=2300,kr=2301,ga=2302,jl=2400,Ql=2401,eu=2402,Up=2500,Fp=0,Sf=1,Xc=2,Op=3200,zp=3201,bf=0,Bp=1,vi="",Rt="srgb",$t="srgb-linear",ua="linear",pt="srgb",Ji=7680,tu=519,kp=512,Hp=513,Gp=514,wf=515,Vp=516,Wp=517,Xp=518,qp=519,qc=35044,nu="300 es",Qn=2e3,jo=2001;class Ks{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let iu=1234567;const Rr=Math.PI/180,Bs=180/Math.PI;function _n(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Ft(i,e,t){return Math.max(e,Math.min(t,i))}function Sl(i,e){return(i%e+e)%e}function Yp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Kp(i,e,t){return i!==e?(t-i)/(e-i):0}function Cr(i,e,t){return(1-t)*i+t*e}function Zp(i,e,t,n){return Cr(i,e,1-Math.exp(-t*n))}function $p(i,e=1){return e-Math.abs(Sl(i,e*2)-e)}function Jp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function jp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Qp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function em(i,e){return i+Math.random()*(e-i)}function tm(i){return i*(.5-Math.random())}function nm(i){i!==void 0&&(iu=i);let e=iu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function im(i){return i*Rr}function sm(i){return i*Bs}function rm(i){return(i&i-1)===0&&i!==0}function om(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function am(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cm(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ef={DEG2RAD:Rr,RAD2DEG:Bs,generateUUID:_n,clamp:Ft,euclideanModulo:Sl,mapLinear:Yp,inverseLerp:Kp,lerp:Cr,damp:Zp,pingpong:$p,smoothstep:Jp,smootherstep:jp,randInt:Qp,randFloat:em,randFloatSpread:tm,seededRandom:nm,degToRad:im,radToDeg:sm,isPowerOfTwo:rm,ceilPowerOfTwo:om,floorPowerOfTwo:am,setQuaternionFromProperEuler:cm,normalize:ut,denormalize:wn};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,n,s,r,o,a,c,l){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],x=s[0],m=s[3],p=s[6],v=s[1],y=s[4],_=s[7],C=s[2],E=s[5],A=s[8];return r[0]=o*x+a*v+c*C,r[3]=o*m+a*y+c*E,r[6]=o*p+a*_+c*A,r[1]=l*x+u*v+h*C,r[4]=l*m+u*y+h*E,r[7]=l*p+u*_+h*A,r[2]=f*x+d*v+g*C,r[5]=f*m+d*y+g*E,r[8]=f*p+d*_+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=t*h+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(s*l-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(xa.makeScale(e,t)),this}rotate(e){return this.premultiply(xa.makeRotation(-e)),this}translate(e,t){return this.premultiply(xa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xa=new Qe;function Tf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lm(){const i=Hr("canvas");return i.style.display="block",i}const su={};function wr(i){i in su||(su[i]=!0,console.warn(i))}function um(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function hm(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function fm(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const it={enabled:!0,workingColorSpace:$t,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===pt&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===pt&&(i.r=As(i.r),i.g=As(i.g),i.b=As(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===vi?ua:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function As(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ru=[.64,.33,.3,.6,.15,.06],ou=[.2126,.7152,.0722],au=[.3127,.329],cu=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lu=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);it.define({[$t]:{primaries:ru,whitePoint:au,transfer:ua,toXYZ:cu,fromXYZ:lu,luminanceCoefficients:ou,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:ru,whitePoint:au,transfer:pt,toXYZ:cu,fromXYZ:lu,luminanceCoefficients:ou,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}});let ji;class dm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ji===void 0&&(ji=Hr("canvas")),ji.width=e.width,ji.height=e.height;const n=ji.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ji}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ei(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let pm=0;class Af{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=_n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(_a(s[o].image)):r.push(_a(s[o]))}else r=_a(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function _a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mm=0;class Ct extends Ks{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=yi,s=yi,r=an,o=jn,a=xn,c=ni,l=Ct.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=_n(),this.name="",this.source=new Af(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fs:e.x=e.x-Math.floor(e.x);break;case yi:e.x=e.x<0?0:1;break;case Jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fs:e.y=e.y-Math.floor(e.y);break;case yi:e.y=e.y<0?0:1;break;case Jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=hf;Ct.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,s=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,_=(d+1)/2,C=(p+1)/2,E=(u+f)/4,A=(h+x)/4,R=(g+m)/4;return y>_&&y>C?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=E/n,r=A/n):_>C?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=R/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=R/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-x)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gm extends Ks{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ct(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Af(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vi extends gm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rf extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xm extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=x;return}if(h!==x||c!==f||l!==d||u!==g){let m=1-a;const p=c*f+l*d+u*g+h*x,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),E=Math.atan2(C,p*v);m=Math.sin(m*E)/C,a=Math.sin(a*E)/C}const _=a*v;if(c=c*m+f*_,l=l*m+d*_,u=u*m+g*_,h=h*m+x*_,m===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=C,l*=C,u*=C,h*=C}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return va.copy(this).projectOnVector(e),this.sub(va)}reflect(e){return this.sub(va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new L,uu=new oi;class In{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oo.copy(n.boundingBox)),oo.applyMatrix4(e.matrixWorld),this.union(oo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),ao.subVectors(this.max,ir),Qi.subVectors(e.a,ir),es.subVectors(e.b,ir),ts.subVectors(e.c,ir),li.subVectors(es,Qi),ui.subVectors(ts,es),Ai.subVectors(Qi,ts);let t=[0,-li.z,li.y,0,-ui.z,ui.y,0,-Ai.z,Ai.y,li.z,0,-li.x,ui.z,0,-ui.x,Ai.z,0,-Ai.x,-li.y,li.x,0,-ui.y,ui.x,0,-Ai.y,Ai.x,0];return!ya(t,Qi,es,ts,ao)||(t=[1,0,0,0,1,0,0,0,1],!ya(t,Qi,es,ts,ao))?!1:(co.crossVectors(li,ui),t=[co.x,co.y,co.z],ya(t,Qi,es,ts,ao))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new L,new L,new L,new L,new L,new L,new L,new L],Mn=new L,oo=new In,Qi=new L,es=new L,ts=new L,li=new L,ui=new L,Ai=new L,ir=new L,ao=new L,co=new L,Ri=new L;function ya(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ri.fromArray(i,r);const a=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),c=e.dot(Ri),l=t.dot(Ri),u=n.dot(Ri);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const _m=new In,sr=new L,Ma=new L;class Ln{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):_m.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);const t=sr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(sr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(Ma)),this.expandByPoint(sr.copy(e.center).sub(Ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hn=new L,Sa=new L,lo=new L,hi=new L,ba=new L,uo=new L,wa=new L;class eo{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Sa.copy(e).add(t).multiplyScalar(.5),lo.copy(t).sub(e).normalize(),hi.copy(this.origin).sub(Sa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(lo),a=hi.dot(this.direction),c=-hi.dot(lo),l=hi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const x=1/u;h*=x,f*=x,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Sa).addScaledVector(lo,f),d}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const n=Hn.dot(this.direction),s=Hn.dot(Hn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,n,s,r){ba.subVectors(t,e),uo.subVectors(n,e),wa.crossVectors(ba,uo);let o=this.direction.dot(wa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hi.subVectors(this.origin,e);const c=a*this.direction.dot(uo.crossVectors(hi,uo));if(c<0)return null;const l=a*this.direction.dot(ba.cross(hi));if(l<0||c+l>o)return null;const u=-a*hi.dot(wa);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(e,t,n,s,r,o,a,c,l,u,h,f,d,g,x,m){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,f,d,g,x,m)}set(e,t,n,s,r,o,a,c,l,u,h,f,d,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),o=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-x*l,t[9]=-a*c,t[2]=x-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,g=l*u,x=l*h;t[0]=f+x*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=x+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,g=l*u,x=l*h;t[0]=f-x*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+x,t[1]=c*h,t[5]=x*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-x*h}else if(e.order==="XZY"){const f=o*c,d=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+x,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vm,e,ym)}lookAt(e,t,n){const s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),fi.crossVectors(n,nn),fi.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),fi.crossVectors(n,nn)),fi.normalize(),ho.crossVectors(nn,fi),s[0]=fi.x,s[4]=ho.x,s[8]=nn.x,s[1]=fi.y,s[5]=ho.y,s[9]=nn.y,s[2]=fi.z,s[6]=ho.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],v=n[3],y=n[7],_=n[11],C=n[15],E=s[0],A=s[4],R=s[8],b=s[12],S=s[1],P=s[5],k=s[9],B=s[13],W=s[2],J=s[6],X=s[10],oe=s[14],U=s[3],se=s[7],ie=s[11],Z=s[15];return r[0]=o*E+a*S+c*W+l*U,r[4]=o*A+a*P+c*J+l*se,r[8]=o*R+a*k+c*X+l*ie,r[12]=o*b+a*B+c*oe+l*Z,r[1]=u*E+h*S+f*W+d*U,r[5]=u*A+h*P+f*J+d*se,r[9]=u*R+h*k+f*X+d*ie,r[13]=u*b+h*B+f*oe+d*Z,r[2]=g*E+x*S+m*W+p*U,r[6]=g*A+x*P+m*J+p*se,r[10]=g*R+x*k+m*X+p*ie,r[14]=g*b+x*B+m*oe+p*Z,r[3]=v*E+y*S+_*W+C*U,r[7]=v*A+y*P+_*J+C*se,r[11]=v*R+y*k+_*X+C*ie,r[15]=v*b+y*B+_*oe+C*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*l*h-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+t*c*d-t*l*f+r*o*f-s*o*d+s*l*u-r*c*u)+m*(+t*l*h-t*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+p*(-s*a*u-t*c*h+t*a*f+s*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=h*m*l-x*f*l+x*c*d-a*m*d-h*c*p+a*f*p,y=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,_=u*x*l-g*h*l+g*a*d-o*x*d-u*a*p+o*h*p,C=g*h*c-u*x*c-g*a*f+o*x*f+u*a*m-o*h*m,E=t*v+n*y+s*_+r*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=v*A,e[1]=(x*f*r-h*m*r-x*s*d+n*m*d+h*s*p-n*f*p)*A,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*A,e[3]=(h*c*r-a*f*r-h*s*l+n*f*l+a*s*d-n*c*d)*A,e[4]=y*A,e[5]=(u*m*r-g*f*r+g*s*d-t*m*d-u*s*p+t*f*p)*A,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*A,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*d+t*c*d)*A,e[8]=_*A,e[9]=(g*h*r-u*x*r-g*n*d+t*x*d+u*n*p-t*h*p)*A,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*p+t*a*p)*A,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*d-t*a*d)*A,e[12]=C*A,e[13]=(u*x*s-g*h*s+g*n*f-t*x*f-u*n*m+t*h*m)*A,e[14]=(g*a*s-o*x*s-g*n*c+t*x*c+o*n*m-t*a*m)*A,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,x=o*u,m=o*h,p=a*h,v=c*l,y=c*u,_=c*h,C=n.x,E=n.y,A=n.z;return s[0]=(1-(x+p))*C,s[1]=(d+_)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(d-_)*E,s[5]=(1-(f+p))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(g+y)*A,s[9]=(m-v)*A,s[10]=(1-(f+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ns.set(s[0],s[1],s[2]).length();const o=ns.set(s[4],s[5],s[6]).length(),a=ns.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Sn.copy(this);const l=1/r,u=1/o,h=1/a;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=u,Sn.elements[5]*=u,Sn.elements[6]*=u,Sn.elements[8]*=h,Sn.elements[9]*=h,Sn.elements[10]*=h,t.setFromRotationMatrix(Sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Qn){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let d,g;if(a===Qn)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===jo)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Qn){const c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),f=(t+e)*l,d=(n+s)*u;let g,x;if(a===Qn)g=(o+r)*h,x=-2*h;else if(a===jo)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ns=new L,Sn=new qe,vm=new L(0,0,0),ym=new L(1,1,1),fi=new L,ho=new L,nn=new L,hu=new qe,fu=new oi;class An{constructor(e=0,t=0,n=0,s=An.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ft(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fu.setFromEuler(this),this.setFromQuaternion(fu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class bl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Mm=0;const du=new L,is=new oi,Gn=new qe,fo=new L,rr=new L,Sm=new L,bm=new oi,pu=new L(1,0,0),mu=new L(0,1,0),gu=new L(0,0,1),xu={type:"added"},wm={type:"removed"},ss={type:"childadded",child:null},Ea={type:"childremoved",child:null};class gt extends Ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new L,t=new An,n=new oi,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Qe}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(pu,e)}rotateY(e){return this.rotateOnAxis(mu,e)}rotateZ(e){return this.rotateOnAxis(gu,e)}translateOnAxis(e,t){return du.copy(e).applyQuaternion(this.quaternion),this.position.add(du.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pu,e)}translateY(e){return this.translateOnAxis(mu,e)}translateZ(e){return this.translateOnAxis(gu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fo.copy(e):fo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(rr,fo,this.up):Gn.lookAt(fo,rr,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(Gn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xu),ss.child=e,this.dispatchEvent(ss),ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wm),Ea.child=e,this.dispatchEvent(Ea),Ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xu),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,Sm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,bm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}gt.DEFAULT_UP=new L(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bn=new L,Vn=new L,Ta=new L,Wn=new L,rs=new L,os=new L,_u=new L,Aa=new L,Ra=new L,Ca=new L,Pa=new st,Ia=new st,La=new st;class gn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),bn.subVectors(e,t),s.cross(bn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){bn.subVectors(s,t),Vn.subVectors(n,t),Ta.subVectors(e,t);const o=bn.dot(bn),a=bn.dot(Vn),c=bn.dot(Ta),l=Vn.dot(Vn),u=Vn.dot(Ta),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Wn.x),c.addScaledVector(o,Wn.y),c.addScaledVector(a,Wn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Pa.setScalar(0),Ia.setScalar(0),La.setScalar(0),Pa.fromBufferAttribute(e,t),Ia.fromBufferAttribute(e,n),La.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Pa,r.x),o.addScaledVector(Ia,r.y),o.addScaledVector(La,r.z),o}static isFrontFacing(e,t,n,s){return bn.subVectors(n,t),Vn.subVectors(e,t),bn.cross(Vn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),bn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;rs.subVectors(s,n),os.subVectors(r,n),Aa.subVectors(e,n);const c=rs.dot(Aa),l=os.dot(Aa);if(c<=0&&l<=0)return t.copy(n);Ra.subVectors(e,s);const u=rs.dot(Ra),h=os.dot(Ra);if(u>=0&&h<=u)return t.copy(s);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(rs,o);Ca.subVectors(e,r);const d=rs.dot(Ca),g=os.dot(Ca);if(g>=0&&d<=g)return t.copy(r);const x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(os,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return _u.subVectors(r,s),a=(h-u)/(h-u+(d-g)),t.copy(s).addScaledVector(_u,a);const p=1/(m+x+f);return o=x*p,a=f*p,t.copy(n).addScaledVector(rs,o).addScaledVector(os,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},po={h:0,s:0,l:0};function Da(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class re{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Sl(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Da(o,r,e+1/3),this.g=Da(o,r,e),this.b=Da(o,r,e-1/3)}return it.toWorkingColorSpace(this,s),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=Cf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return it.fromWorkingColorSpace(kt.copy(this),e),Math.round(Ft(kt.r*255,0,255))*65536+Math.round(Ft(kt.g*255,0,255))*256+Math.round(Ft(kt.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.fromWorkingColorSpace(kt.copy(this),t);const n=kt.r,s=kt.g,r=kt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=Rt){it.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,s=kt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(di),this.setHSL(di.h+e,di.s+t,di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(di),e.getHSL(po);const n=Cr(di.h,po.h,t),s=Cr(di.s,po.s,t),r=Cr(di.l,po.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new re;re.NAMES=Cf;let Em=0;class Tn extends Ks{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=_n(),this.name="",this.blending=ws,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=lc,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cc&&(n.blendSrc=this.blendSrc),this.blendDst!==lc&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _t extends Tn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new L,mo=new ve;class Ke{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mo.fromBufferAttribute(this,t),mo.applyMatrix3(e),this.setXY(t,mo.x,mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qc&&(e.usage=this.usage),e}}class Pf extends Ke{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class If extends Ke{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends Ke{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Tm=0;const hn=new qe,Na=new gt,as=new L,sn=new In,or=new In,Ut=new L;class lt extends Ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tf(e)?If:Pf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Na.lookAt(e),Na.updateMatrix(),this.applyMatrix4(Na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new vt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];or.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(sn.min,or.min),sn.expandByPoint(Ut),Ut.addVectors(sn.max,or.max),sn.expandByPoint(Ut)):(sn.expandByPoint(or.min),sn.expandByPoint(or.max))}sn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ut.fromBufferAttribute(a,l),c&&(as.fromBufferAttribute(e,l),Ut.add(as)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new L,c[R]=new L;const l=new L,u=new L,h=new L,f=new ve,d=new ve,g=new ve,x=new L,m=new L;function p(R,b,S){l.fromBufferAttribute(n,R),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,S),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(P),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[R].add(x),a[b].add(x),a[S].add(x),c[R].add(m),c[b].add(m),c[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,b=v.length;R<b;++R){const S=v[R],P=S.start,k=S.count;for(let B=P,W=P+k;B<W;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const y=new L,_=new L,C=new L,E=new L;function A(R){C.fromBufferAttribute(s,R),E.copy(C);const b=a[R];y.copy(b),y.sub(C.multiplyScalar(C.dot(b))).normalize(),_.crossVectors(E,b);const P=_.dot(c[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,P)}for(let R=0,b=v.length;R<b;++R){const S=v[R],P=S.start,k=S.count;for(let B=P,W=P+k;B<W;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new Ke(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new lt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vu=new qe,Ci=new eo,go=new Ln,yu=new L,xo=new L,_o=new L,vo=new L,Ua=new L,yo=new L,Mu=new L,Mo=new L;class Ye extends gt{constructor(e=new lt,t=new _t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){yo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Ua.fromBufferAttribute(h,e),o?yo.addScaledVector(Ua,u):yo.addScaledVector(Ua.sub(t),u))}t.add(yo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(r),Ci.copy(e.ray).recast(e.near),!(go.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(go,yu)===null||Ci.origin.distanceToSquared(yu)>(e.far-e.near)**2))&&(vu.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(vu),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,C=y;_<C;_+=3){const E=a.getX(_),A=a.getX(_+1),R=a.getX(_+2);s=So(this,p,e,n,l,u,h,E,A,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const v=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=So(this,o,e,n,l,u,h,v,y,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,C=y;_<C;_+=3){const E=_,A=_+1,R=_+2;s=So(this,p,e,n,l,u,h,E,A,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const v=m,y=m+1,_=m+2;s=So(this,o,e,n,l,u,h,v,y,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Am(i,e,t,n,s,r,o,a){let c;if(e.side===Yt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===ti,a),c===null)return null;Mo.copy(a),Mo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Mo);return l<t.near||l>t.far?null:{distance:l,point:Mo.clone(),object:i}}function So(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,xo),i.getVertexPosition(c,_o),i.getVertexPosition(l,vo);const u=Am(i,e,t,n,xo,_o,vo,Mu);if(u){const h=new L;gn.getBarycoord(Mu,xo,_o,vo,h),s&&(u.uv=gn.getInterpolatedAttribute(s,a,c,l,h,new ve)),r&&(u.uv1=gn.getInterpolatedAttribute(r,a,c,l,h,new ve)),o&&(u.normal=gn.getInterpolatedAttribute(o,a,c,l,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};gn.getNormal(xo,_o,vo,f.normal),u.face=f,u.barycoord=h}return u}class be extends lt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(h,2));function g(x,m,p,v,y,_,C,E,A,R,b){const S=_/A,P=C/R,k=_/2,B=C/2,W=E/2,J=A+1,X=R+1;let oe=0,U=0;const se=new L;for(let ie=0;ie<X;ie++){const Z=ie*P-B;for(let Ae=0;Ae<J;Ae++){const le=Ae*S-k;se[x]=le*v,se[m]=Z*y,se[p]=W,l.push(se.x,se.y,se.z),se[x]=0,se[m]=0,se[p]=E>0?1:-1,u.push(se.x,se.y,se.z),h.push(Ae/A),h.push(1-ie/R),oe+=1}}for(let ie=0;ie<R;ie++)for(let Z=0;Z<A;Z++){const Ae=f+Z+J*ie,le=f+Z+J*(ie+1),te=f+(Z+1)+J*(ie+1),fe=f+(Z+1)+J*ie;c.push(Ae,le,fe),c.push(le,te,fe),U+=6}a.addGroup(d,U,b),d+=U,f+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new be(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ks(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Wt(i){const e={};for(let t=0;t<i.length;t++){const n=ks(i[t]);for(const s in n)e[s]=n[s]}return e}function Rm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const Cm={clone:ks,merge:Wt};var Pm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends Tn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pm,this.fragmentShader=Im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=Rm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Df extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new L,Su=new ve,bu=new ve;class Xt extends Df{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,Su,bu),t.subVectors(bu,Su)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const cs=-90,ls=1;class Lm extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xt(cs,ls,e,t);s.layers=this.layers,this.add(s);const r=new Xt(cs,ls,e,t);r.layers=this.layers,this.add(r);const o=new Xt(cs,ls,e,t);o.layers=this.layers,this.add(o);const a=new Xt(cs,ls,e,t);a.layers=this.layers,this.add(a);const c=new Xt(cs,ls,e,t);c.layers=this.layers,this.add(c);const l=new Xt(cs,ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===jo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nf extends Ct{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Ns,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Dm extends Vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Nf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:an}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new be(5,5,5),r=new wi({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Si});r.uniforms.tEquirect.value=t;const o=new Ye(s,r),a=t.minFilter;return t.minFilter===jn&&(t.minFilter=an),new Lm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Fa=new L,Nm=new L,Um=new Qe;class _i{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Fa.subVectors(n,t).cross(Nm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Fa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Um.getNormalMatrix(e),s=this.coplanarPoint(Fa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Ln,bo=new L;class wl{constructor(e=new _i,t=new _i,n=new _i,s=new _i,r=new _i,o=new _i){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],f=s[7],d=s[8],g=s[9],x=s[10],m=s[11],p=s[12],v=s[13],y=s[14],_=s[15];if(n[0].setComponents(c-r,f-l,m-d,_-p).normalize(),n[1].setComponents(c+r,f+l,m+d,_+p).normalize(),n[2].setComponents(c+o,f+u,m+g,_+v).normalize(),n[3].setComponents(c-o,f-u,m-g,_-v).normalize(),n[4].setComponents(c-a,f-h,m-x,_-y).normalize(),t===Qn)n[5].setComponents(c+a,f+h,m+x,_+y).normalize();else if(t===jo)n[5].setComponents(a,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(bo.x=s.normal.x>0?e.max.x:e.min.x,bo.y=s.normal.y>0?e.max.y:e.min.y,bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(bo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Uf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Fm(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],x=h[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const x=h[d];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class ii extends lt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const v=p*f-o;for(let y=0;y<l;y++){const _=y*h-r;g.push(_,-v,0),x.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const y=v+l*p,_=v+l*(p+1),C=v+1+l*(p+1),E=v+1+l*p;d.push(y,_,E),d.push(_,C,E)}this.setIndex(d),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(x,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.width,e.height,e.widthSegments,e.heightSegments)}}var Om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zm=`#ifdef USE_ALPHAHASH
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
#endif`,Bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,km=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vm=`#ifdef USE_AOMAP
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
#endif`,Wm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xm=`#ifdef USE_BATCHING
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
#endif`,qm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$m=`#ifdef USE_IRIDESCENCE
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
#endif`,Jm=`#ifdef USE_BUMPMAP
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,o0=`#define PI 3.141592653589793
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
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,c0=`vec3 transformedNormal = objectNormal;
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
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,x0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
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
#endif`,y0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,M0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,b0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
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
}`,E0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,T0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
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
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,N0=`PhysicalMaterial material;
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
#endif`,U0=`struct PhysicalMaterial {
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
}`,F0=`
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
#endif`,O0=`#if defined( RE_IndirectDiffuse )
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
#endif`,z0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,B0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,k0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,V0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,X0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,q0=`#if defined( USE_POINTS_UV )
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
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Z0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,J0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`#ifdef USE_MORPHTARGETS
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
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
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
#endif`,og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bg=`#ifdef USE_SKINNING
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
#endif`,wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eg=`#ifdef USE_SKINNING
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
#endif`,Tg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Ig=`#ifdef USE_TRANSMISSION
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Og=`uniform sampler2D t2D;
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
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`#include <common>
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
}`,Vg=`#if DEPTH_PACKING == 3200
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
}`,Wg=`#define DISTANCE
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
}`,Xg=`#define DISTANCE
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
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`uniform float scale;
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
}`,Zg=`uniform vec3 diffuse;
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
}`,$g=`#include <common>
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
}`,Jg=`uniform vec3 diffuse;
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
}`,jg=`#define LAMBERT
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
}`,Qg=`#define LAMBERT
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
}`,ex=`#define MATCAP
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
}`,tx=`#define MATCAP
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
}`,nx=`#define NORMAL
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
}`,ix=`#define NORMAL
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
}`,sx=`#define PHONG
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
}`,rx=`#define PHONG
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
}`,ox=`#define STANDARD
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
}`,ax=`#define STANDARD
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
}`,cx=`#define TOON
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
}`,lx=`#define TOON
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
}`,ux=`uniform float size;
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
}`,hx=`uniform vec3 diffuse;
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
}`,fx=`#include <common>
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
}`,dx=`uniform vec3 color;
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
}`,px=`uniform float rotation;
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
}`,mx=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:Om,alphahash_pars_fragment:zm,alphamap_fragment:Bm,alphamap_pars_fragment:km,alphatest_fragment:Hm,alphatest_pars_fragment:Gm,aomap_fragment:Vm,aomap_pars_fragment:Wm,batching_pars_vertex:Xm,batching_vertex:qm,begin_vertex:Ym,beginnormal_vertex:Km,bsdfs:Zm,iridescence_fragment:$m,bumpmap_pars_fragment:Jm,clipping_planes_fragment:jm,clipping_planes_pars_fragment:Qm,clipping_planes_pars_vertex:e0,clipping_planes_vertex:t0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:r0,common:o0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:c0,displacementmap_pars_vertex:l0,displacementmap_vertex:u0,emissivemap_fragment:h0,emissivemap_pars_fragment:f0,colorspace_fragment:d0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:x0,envmap_pars_vertex:_0,envmap_physical_pars_fragment:C0,envmap_vertex:v0,fog_vertex:y0,fog_pars_vertex:M0,fog_fragment:S0,fog_pars_fragment:b0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:E0,lights_lambert_fragment:T0,lights_lambert_pars_fragment:A0,lights_pars_begin:R0,lights_toon_fragment:P0,lights_toon_pars_fragment:I0,lights_phong_fragment:L0,lights_phong_pars_fragment:D0,lights_physical_fragment:N0,lights_physical_pars_fragment:U0,lights_fragment_begin:F0,lights_fragment_maps:O0,lights_fragment_end:z0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:k0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:G0,map_fragment:V0,map_pars_fragment:W0,map_particle_fragment:X0,map_particle_pars_fragment:q0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:K0,morphinstance_vertex:Z0,morphcolor_vertex:$0,morphnormal_vertex:J0,morphtarget_pars_vertex:j0,morphtarget_vertex:Q0,normal_fragment_begin:eg,normal_fragment_maps:tg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:sg,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:og,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:cg,iridescence_pars_fragment:lg,opaque_fragment:ug,packing:hg,premultiplied_alpha_fragment:fg,project_vertex:dg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:xg,shadowmap_pars_fragment:_g,shadowmap_pars_vertex:vg,shadowmap_vertex:yg,shadowmask_pars_fragment:Mg,skinbase_vertex:Sg,skinning_pars_vertex:bg,skinning_vertex:wg,skinnormal_vertex:Eg,specularmap_fragment:Tg,specularmap_pars_fragment:Ag,tonemapping_fragment:Rg,tonemapping_pars_fragment:Cg,transmission_fragment:Pg,transmission_pars_fragment:Ig,uv_pars_fragment:Lg,uv_pars_vertex:Dg,uv_vertex:Ng,worldpos_vertex:Ug,background_vert:Fg,background_frag:Og,backgroundCube_vert:zg,backgroundCube_frag:Bg,cube_vert:kg,cube_frag:Hg,depth_vert:Gg,depth_frag:Vg,distanceRGBA_vert:Wg,distanceRGBA_frag:Xg,equirect_vert:qg,equirect_frag:Yg,linedashed_vert:Kg,linedashed_frag:Zg,meshbasic_vert:$g,meshbasic_frag:Jg,meshlambert_vert:jg,meshlambert_frag:Qg,meshmatcap_vert:ex,meshmatcap_frag:tx,meshnormal_vert:nx,meshnormal_frag:ix,meshphong_vert:sx,meshphong_frag:rx,meshphysical_vert:ox,meshphysical_frag:ax,meshtoon_vert:cx,meshtoon_frag:lx,points_vert:ux,points_frag:hx,shadow_vert:fx,shadow_frag:dx,sprite_vert:px,sprite_frag:mx},Ie={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},Pn={basic:{uniforms:Wt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Wt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new re(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Wt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Wt([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Wt([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new re(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Wt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Wt([Ie.points,Ie.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Wt([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Wt([Ie.common,Ie.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Wt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Wt([Ie.sprite,Ie.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Wt([Ie.common,Ie.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Wt([Ie.lights,Ie.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Pn.physical={uniforms:Wt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const wo={r:0,b:0,g:0},Ii=new An,gx=new qe;function xx(i,e,t,n,s,r,o){const a=new re(0);let c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function x(v){let y=!1;const _=g(v);_===null?p(a,c):_&&_.isColor&&(p(_,1),y=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,y){const _=g(y);_&&(_.isCubeTexture||_.mapping===la)?(u===void 0&&(u=new Ye(new be(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:ks(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ii.copy(y.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(gx.makeRotationFromEuler(Ii)),u.material.toneMapped=it.getTransfer(_.colorSpace)!==pt,(h!==_||f!==_.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ye(new ii(2,2),new wi({name:"BackgroundMaterial",uniforms:ks(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=it.getTransfer(_.colorSpace)!==pt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,y){v.getRGB(wo,Lf(i)),n.buffers.color.setClear(wo.r,wo.g,wo.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:x,addToRenderList:m}}function _x(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,P,k,B,W){let J=!1;const X=h(B,k,P);r!==X&&(r=X,l(r.object)),J=d(S,B,k,W),J&&g(S,B,k,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,_(S,P,k,B),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,P,k){const B=k.wireframe===!0;let W=n[S.id];W===void 0&&(W={},n[S.id]=W);let J=W[P.id];J===void 0&&(J={},W[P.id]=J);let X=J[B];return X===void 0&&(X=f(c()),J[B]=X),X}function f(S){const P=[],k=[],B=[];for(let W=0;W<t;W++)P[W]=0,k[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:B,object:S,attributes:{},index:null}}function d(S,P,k,B){const W=r.attributes,J=P.attributes;let X=0;const oe=k.getAttributes();for(const U in oe)if(oe[U].location>=0){const ie=W[U];let Z=J[U];if(Z===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(Z=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(Z=S.instanceColor)),ie===void 0||ie.attribute!==Z||Z&&ie.data!==Z.data)return!0;X++}return r.attributesNum!==X||r.index!==B}function g(S,P,k,B){const W={},J=P.attributes;let X=0;const oe=k.getAttributes();for(const U in oe)if(oe[U].location>=0){let ie=J[U];ie===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(ie=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(ie=S.instanceColor));const Z={};Z.attribute=ie,ie&&ie.data&&(Z.data=ie.data),W[U]=Z,X++}r.attributes=W,r.attributesNum=X,r.index=B}function x(){const S=r.newAttributes;for(let P=0,k=S.length;P<k;P++)S[P]=0}function m(S){p(S,0)}function p(S,P){const k=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;k[S]=1,B[S]===0&&(i.enableVertexAttribArray(S),B[S]=1),W[S]!==P&&(i.vertexAttribDivisor(S,P),W[S]=P)}function v(){const S=r.newAttributes,P=r.enabledAttributes;for(let k=0,B=P.length;k<B;k++)P[k]!==S[k]&&(i.disableVertexAttribArray(k),P[k]=0)}function y(S,P,k,B,W,J,X){X===!0?i.vertexAttribIPointer(S,P,k,W,J):i.vertexAttribPointer(S,P,k,B,W,J)}function _(S,P,k,B){x();const W=B.attributes,J=k.getAttributes(),X=P.defaultAttributeValues;for(const oe in J){const U=J[oe];if(U.location>=0){let se=W[oe];if(se===void 0&&(oe==="instanceMatrix"&&S.instanceMatrix&&(se=S.instanceMatrix),oe==="instanceColor"&&S.instanceColor&&(se=S.instanceColor)),se!==void 0){const ie=se.normalized,Z=se.itemSize,Ae=e.get(se);if(Ae===void 0)continue;const le=Ae.buffer,te=Ae.type,fe=Ae.bytesPerElement,Ee=te===i.INT||te===i.UNSIGNED_INT||se.gpuType===ml;if(se.isInterleavedBufferAttribute){const ye=se.data,Oe=ye.stride,Xe=se.offset;if(ye.isInstancedInterleavedBuffer){for(let Ue=0;Ue<U.locationSize;Ue++)p(U.location+Ue,ye.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Ue=0;Ue<U.locationSize;Ue++)m(U.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,le);for(let Ue=0;Ue<U.locationSize;Ue++)y(U.location+Ue,Z/U.locationSize,te,ie,Oe*fe,(Xe+Z/U.locationSize*Ue)*fe,Ee)}else{if(se.isInstancedBufferAttribute){for(let ye=0;ye<U.locationSize;ye++)p(U.location+ye,se.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ye=0;ye<U.locationSize;ye++)m(U.location+ye);i.bindBuffer(i.ARRAY_BUFFER,le);for(let ye=0;ye<U.locationSize;ye++)y(U.location+ye,Z/U.locationSize,te,ie,Z*fe,Z/U.locationSize*ye*fe,Ee)}}else if(X!==void 0){const ie=X[oe];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(U.location,ie);break;case 3:i.vertexAttrib3fv(U.location,ie);break;case 4:i.vertexAttrib4fv(U.location,ie);break;default:i.vertexAttrib1fv(U.location,ie)}}}}v()}function C(){R();for(const S in n){const P=n[S];for(const k in P){const B=P[k];for(const W in B)u(B[W].object),delete B[W];delete P[k]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const k in P){const B=P[k];for(const W in B)u(B[W].object),delete B[W];delete P[k]}delete n[S.id]}function A(S){for(const P in n){const k=n[P];if(k[S.id]===void 0)continue;const B=k[S.id];for(const W in B)u(B[W].object),delete B[W];delete k[S.id]}}function R(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function vx(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==xn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const R=A===Qr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==ni&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==En&&!R)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:C,maxSamples:E}}function Mx(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new _i,a=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const v=r?0:n,y=v*4;let _=p.clippingState||null;c.value=_,_=u(g,f,y,d);for(let C=0;C!==y;++C)_[C]=t[C];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=d+x*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=d;y!==x;++y,_+=4)o.copy(h[y]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Sx(i){let e=new WeakMap;function t(o,a){return a===xc?o.mapping=Ns:a===_c&&(o.mapping=Us),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===xc||a===_c)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Dm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class El extends Df{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ys=4,wu=[.125,.215,.35,.446,.526,.582],Bi=20,Oa=new El,Eu=new re;let za=null,Ba=0,ka=0,Ha=!1;const Fi=(1+Math.sqrt(5))/2,us=1/Fi,Tu=[new L(-Fi,us,0),new L(Fi,us,0),new L(-us,0,Fi),new L(us,0,Fi),new L(0,Fi,-us),new L(0,Fi,us),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Au{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){za=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(za,Ba,ka),this._renderer.xr.enabled=Ha,e.scissorTest=!1,Eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===Us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),za=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:Qr,format:xn,colorSpace:$t,depthBuffer:!1},s=Ru(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ru(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bx(r)),this._blurMaterial=wx(r,e,t)}return s}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,Oa)}_sceneToCubeUV(e,t,n,s){const a=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Eu),u.toneMapping=bi,u.autoClear=!1;const d=new _t({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),g=new Ye(new be,d);let x=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,x=!0):(d.color.copy(Eu),x=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const y=this._cubeSize;Eo(s,v*y,p>2?y:0,y,y),u.setRenderTarget(s),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ns||e.mapping===Us;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Eo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Oa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Tu[(s-r-1)%Tu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ye(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Bi-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Bi;m>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);const p=[];let v=0;for(let A=0;A<Bi;++A){const R=A/x,b=Math.exp(-R*R/2);p.push(b),A===0?v+=b:A<m&&(v+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const _=this._sizeLods[s],C=3*_*(s>y-ys?s-y+ys:0),E=4*(this._cubeSize-_);Eo(t,C,E,3*_,2*_),c.setRenderTarget(t),c.render(h,Oa)}}function bx(i){const e=[],t=[],n=[];let s=i;const r=i-ys+1+wu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-ys?c=wu[o-i+ys-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*d),y=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let E=0;E<d;E++){const A=E%3*2/3-1,R=E>2?0:-1,b=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];v.set(b,x*g*E),y.set(f,m*g*E);const S=[E,E,E,E,E,E];_.set(S,p*g*E)}const C=new lt;C.setAttribute("position",new Ke(v,x)),C.setAttribute("uv",new Ke(y,m)),C.setAttribute("faceIndex",new Ke(_,p)),e.push(C),s>ys&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ru(i,e,t){const n=new Vi(i,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function wx(i,e,t){const n=new Float32Array(Bi),s=new L(0,1,0);return new wi({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Cu(){return new wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Pu(){return new wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Tl(){return`

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
	`}function Ex(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===xc||c===_c,u=c===Ns||c===Us;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Au(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Au(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Tx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&wr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ax(i,e,t,n){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const x=d[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let x=0;if(d!==null){const v=d.array;x=d.version;for(let y=0,_=v.length;y<_;y+=3){const C=v[y+0],E=v[y+1],A=v[y+2];f.push(C,E,E,A,A,C)}}else if(g!==void 0){const v=g.array;x=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const C=y+0,E=y+1,A=y+2;f.push(C,E,E,A,A,C)}}else return;const m=new(Tf(f)?If:Pf)(f,1);m.version=x;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Rx(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),t.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*x[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Cx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Px(i,e,t){const n=new WeakMap,s=new st;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let C=a.attributes.position.count*_,E=1;C>e.maxTextureSize&&(E=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const A=new Float32Array(C*E*4*h),R=new Rf(A,C,E,h);R.type=En,R.needsUpdate=!0;const b=_*4;for(let P=0;P<h;P++){const k=p[P],B=v[P],W=y[P],J=C*E*4*P;for(let X=0;X<k.count;X++){const oe=X*b;g===!0&&(s.fromBufferAttribute(k,X),A[J+oe+0]=s.x,A[J+oe+1]=s.y,A[J+oe+2]=s.z,A[J+oe+3]=0),x===!0&&(s.fromBufferAttribute(B,X),A[J+oe+4]=s.x,A[J+oe+5]=s.y,A[J+oe+6]=s.z,A[J+oe+7]=0),m===!0&&(s.fromBufferAttribute(W,X),A[J+oe+8]=s.x,A[J+oe+9]=s.y,A[J+oe+10]=s.z,A[J+oe+11]=W.itemSize===4?s.w:1)}}f={count:h,texture:R,size:new ve(C,E)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ix(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Ff extends Ct{constructor(e,t,n,s,r,o,a,c,l,u=Ts){if(u!==Ts&&u!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ts&&(n=Gi),n===void 0&&u===zs&&(n=Os),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Kt,this.minFilter=c!==void 0?c:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Of=new Ct,Iu=new Ff(1,1),zf=new Rf,Bf=new xm,kf=new Nf,Lu=[],Du=[],Nu=new Float32Array(16),Uu=new Float32Array(9),Fu=new Float32Array(4);function Zs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Lu[s];if(r===void 0&&(r=new Float32Array(s),Lu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ha(i,e){let t=Du[e];t===void 0&&(t=new Int32Array(e),Du[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Lx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function Nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function Ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function Fx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Fu.set(n),i.uniformMatrix2fv(this.addr,!1,Fu),It(t,n)}}function Ox(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Uu.set(n),i.uniformMatrix3fv(this.addr,!1,Uu),It(t,n)}}function zx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Nu.set(n),i.uniformMatrix4fv(this.addr,!1,Nu),It(t,n)}}function Bx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function kx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function Hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function Gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function Vx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Wx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function Xx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function qx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function Yx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Iu.compareFunction=wf,r=Iu):r=Of,t.setTexture2D(e||r,s)}function Kx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Bf,s)}function Zx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||kf,s)}function $x(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zf,s)}function Jx(i){switch(i){case 5126:return Lx;case 35664:return Dx;case 35665:return Nx;case 35666:return Ux;case 35674:return Fx;case 35675:return Ox;case 35676:return zx;case 5124:case 35670:return Bx;case 35667:case 35671:return kx;case 35668:case 35672:return Hx;case 35669:case 35673:return Gx;case 5125:return Vx;case 36294:return Wx;case 36295:return Xx;case 36296:return qx;case 35678:case 36198:case 36298:case 36306:case 35682:return Yx;case 35679:case 36299:case 36307:return Kx;case 35680:case 36300:case 36308:case 36293:return Zx;case 36289:case 36303:case 36311:case 36292:return $x}}function jx(i,e){i.uniform1fv(this.addr,e)}function Qx(i,e){const t=Zs(e,this.size,2);i.uniform2fv(this.addr,t)}function e_(i,e){const t=Zs(e,this.size,3);i.uniform3fv(this.addr,t)}function t_(i,e){const t=Zs(e,this.size,4);i.uniform4fv(this.addr,t)}function n_(i,e){const t=Zs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function i_(i,e){const t=Zs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function s_(i,e){const t=Zs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function r_(i,e){i.uniform1iv(this.addr,e)}function o_(i,e){i.uniform2iv(this.addr,e)}function a_(i,e){i.uniform3iv(this.addr,e)}function c_(i,e){i.uniform4iv(this.addr,e)}function l_(i,e){i.uniform1uiv(this.addr,e)}function u_(i,e){i.uniform2uiv(this.addr,e)}function h_(i,e){i.uniform3uiv(this.addr,e)}function f_(i,e){i.uniform4uiv(this.addr,e)}function d_(i,e,t){const n=this.cache,s=e.length,r=ha(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Of,r[o])}function p_(i,e,t){const n=this.cache,s=e.length,r=ha(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Bf,r[o])}function m_(i,e,t){const n=this.cache,s=e.length,r=ha(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||kf,r[o])}function g_(i,e,t){const n=this.cache,s=e.length,r=ha(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||zf,r[o])}function x_(i){switch(i){case 5126:return jx;case 35664:return Qx;case 35665:return e_;case 35666:return t_;case 35674:return n_;case 35675:return i_;case 35676:return s_;case 5124:case 35670:return r_;case 35667:case 35671:return o_;case 35668:case 35672:return a_;case 35669:case 35673:return c_;case 5125:return l_;case 36294:return u_;case 36295:return h_;case 36296:return f_;case 35678:case 36198:case 36298:case 36306:case 35682:return d_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}class __{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jx(t.type)}}class v_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=x_(t.type)}}class y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ga=/(\w+)(\])?(\[|\.)?/g;function Ou(i,e){i.seq.push(e),i.map[e.id]=e}function M_(i,e,t){const n=i.name,s=n.length;for(Ga.lastIndex=0;;){const r=Ga.exec(n),o=Ga.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ou(t,l===void 0?new __(a,i,e):new v_(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new y_(a),Ou(t,h)),t=h}}}class $o{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);M_(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function zu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const S_=37297;let b_=0;function w_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Bu=new Qe;function E_(i){it._getMatrix(Bu,it.workingColorSpace,i);const e=`mat3( ${Bu.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case ua:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ku(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+w_(i.getShaderSource(e),o)}else return s}function T_(i,e){const t=E_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function A_(i,e){let t;switch(e){case Rp:t="Linear";break;case Cp:t="Reinhard";break;case Pp:t="Cineon";break;case uf:t="ACESFilmic";break;case Lp:t="AgX";break;case Dp:t="Neutral";break;case Ip:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const To=new L;function R_(){it.getLuminanceCoefficients(To);const i=To.x.toFixed(4),e=To.y.toFixed(4),t=To.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function P_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function I_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Er(i){return i!==""}function Hu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(i){return i.replace(L_,N_)}const D_=new Map;function N_(i,e){let t=et[e];if(t===void 0){const n=D_.get(e);if(n!==void 0)t=et[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Yc(t)}const U_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vu(i){return i.replace(U_,F_)}function F_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function O_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===af?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Kn&&(e="SHADOWMAP_TYPE_VSM"),e}function z_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ns:case Us:e="ENVMAP_TYPE_CUBE";break;case la:e="ENVMAP_TYPE_CUBE_UV";break}return e}function B_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Us:e="ENVMAP_MODE_REFRACTION";break}return e}function k_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case lf:e="ENVMAP_BLENDING_MULTIPLY";break;case Tp:e="ENVMAP_BLENDING_MIX";break;case Ap:e="ENVMAP_BLENDING_ADD";break}return e}function H_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function G_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=O_(t),l=z_(t),u=B_(t),h=k_(t),f=H_(t),d=C_(t),g=P_(r),x=s.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Er).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(m=[Wu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[Wu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?et.tonemapping_pars_fragment:"",t.toneMapping!==bi?A_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,T_("linearToOutputTexel",t.outputColorSpace),R_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),o=Yc(o),o=Hu(o,t),o=Gu(o,t),a=Yc(a),a=Hu(a,t),a=Gu(a,t),o=Vu(o),a=Vu(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===nu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+m+o,_=v+p+a,C=zu(s,s.VERTEX_SHADER,y),E=zu(s,s.FRAGMENT_SHADER,_);s.attachShader(x,C),s.attachShader(x,E),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(P){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(x).trim(),B=s.getShaderInfoLog(C).trim(),W=s.getShaderInfoLog(E).trim();let J=!0,X=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,C,E);else{const oe=ku(s,C,"vertex"),U=ku(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+oe+`
`+U)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||W==="")&&(X=!1);X&&(P.diagnostics={runnable:J,programLog:k,vertexShader:{log:B,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(C),s.deleteShader(E),R=new $o(s,x),b=I_(s,x)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,S_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=b_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=E,this}let V_=0;class W_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new X_(e),t.set(e,n)),n}}class X_{constructor(e){this.id=V_++,this.code=e,this.usedTimes=0}}function q_(i,e,t,n,s,r,o){const a=new bl,c=new W_,l=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,P,k,B){const W=k.fog,J=B.geometry,X=b.isMeshStandardMaterial?k.environment:null,oe=(b.isMeshStandardMaterial?t:e).get(b.envMap||X),U=oe&&oe.mapping===la?oe.image.height:null,se=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const ie=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Z=ie!==void 0?ie.length:0;let Ae=0;J.morphAttributes.position!==void 0&&(Ae=1),J.morphAttributes.normal!==void 0&&(Ae=2),J.morphAttributes.color!==void 0&&(Ae=3);let le,te,fe,Ee;if(se){const tt=Pn[se];le=tt.vertexShader,te=tt.fragmentShader}else le=b.vertexShader,te=b.fragmentShader,c.update(b),fe=c.getVertexShaderID(b),Ee=c.getFragmentShaderID(b);const ye=i.getRenderTarget(),Oe=i.state.buffers.depth.getReversed(),Xe=B.isInstancedMesh===!0,Ue=B.isBatchedMesh===!0,$e=!!b.map,ce=!!b.matcap,ge=!!oe,I=!!b.aoMap,Fe=!!b.lightMap,ue=!!b.bumpMap,Pe=!!b.normalMap,we=!!b.displacementMap,We=!!b.emissiveMap,Te=!!b.metalnessMap,w=!!b.roughnessMap,M=b.anisotropy>0,F=b.clearcoat>0,H=b.dispersion>0,ne=b.iridescence>0,j=b.sheen>0,Re=b.transmission>0,Me=M&&!!b.anisotropyMap,Ce=F&&!!b.clearcoatMap,q=F&&!!b.clearcoatNormalMap,N=F&&!!b.clearcoatRoughnessMap,Q=ne&&!!b.iridescenceMap,xe=ne&&!!b.iridescenceThicknessMap,he=j&&!!b.sheenColorMap,V=j&&!!b.sheenRoughnessMap,G=!!b.specularMap,ae=!!b.specularColorMap,_e=!!b.specularIntensityMap,D=Re&&!!b.transmissionMap,pe=Re&&!!b.thicknessMap,K=!!b.gradientMap,ee=!!b.alphaMap,me=b.alphaTest>0,de=!!b.alphaHash,ze=!!b.extensions;let Je=bi;b.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Je=i.toneMapping);const ft={shaderID:se,shaderType:b.type,shaderName:b.name,vertexShader:le,fragmentShader:te,defines:b.defines,customVertexShaderID:fe,customFragmentShaderID:Ee,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Ue,batchingColor:Ue&&B._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&B.instanceColor!==null,instancingMorph:Xe&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ye===null?i.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:$t,alphaToCoverage:!!b.alphaToCoverage,map:$e,matcap:ce,envMap:ge,envMapMode:ge&&oe.mapping,envMapCubeUVHeight:U,aoMap:I,lightMap:Fe,bumpMap:ue,normalMap:Pe,displacementMap:f&&we,emissiveMap:We,normalMapObjectSpace:Pe&&b.normalMapType===Bp,normalMapTangentSpace:Pe&&b.normalMapType===bf,metalnessMap:Te,roughnessMap:w,anisotropy:M,anisotropyMap:Me,clearcoat:F,clearcoatMap:Ce,clearcoatNormalMap:q,clearcoatRoughnessMap:N,dispersion:H,iridescence:ne,iridescenceMap:Q,iridescenceThicknessMap:xe,sheen:j,sheenColorMap:he,sheenRoughnessMap:V,specularMap:G,specularColorMap:ae,specularIntensityMap:_e,transmission:Re,transmissionMap:D,thicknessMap:pe,gradientMap:K,opaque:b.transparent===!1&&b.blending===ws&&b.alphaToCoverage===!1,alphaMap:ee,alphaTest:me,alphaHash:de,combine:b.combine,mapUv:$e&&x(b.map.channel),aoMapUv:I&&x(b.aoMap.channel),lightMapUv:Fe&&x(b.lightMap.channel),bumpMapUv:ue&&x(b.bumpMap.channel),normalMapUv:Pe&&x(b.normalMap.channel),displacementMapUv:we&&x(b.displacementMap.channel),emissiveMapUv:We&&x(b.emissiveMap.channel),metalnessMapUv:Te&&x(b.metalnessMap.channel),roughnessMapUv:w&&x(b.roughnessMap.channel),anisotropyMapUv:Me&&x(b.anisotropyMap.channel),clearcoatMapUv:Ce&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:q&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:N&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:he&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:V&&x(b.sheenRoughnessMap.channel),specularMapUv:G&&x(b.specularMap.channel),specularColorMapUv:ae&&x(b.specularColorMap.channel),specularIntensityMapUv:_e&&x(b.specularIntensityMap.channel),transmissionMapUv:D&&x(b.transmissionMap.channel),thicknessMapUv:pe&&x(b.thicknessMap.channel),alphaMapUv:ee&&x(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Pe||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!J.attributes.uv&&($e||ee),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Oe,skinning:B.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:Ae,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Je,decodeVideoTexture:$e&&b.map.isVideoTexture===!0&&it.getTransfer(b.map.colorSpace)===pt,decodeVideoTextureEmissive:We&&b.emissiveMap.isVideoTexture===!0&&it.getTransfer(b.emissiveMap.colorSpace)===pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===At,flipSided:b.side===Yt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ze&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&b.extensions.multiDraw===!0||Ue)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)S.push(P),S.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(v(S,b),y(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function v(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function y(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const S=g[b.type];let P;if(S){const k=Pn[S];P=Cm.clone(k.uniforms)}else P=b.uniforms;return P}function C(b,S){let P;for(let k=0,B=u.length;k<B;k++){const W=u[k];if(W.cacheKey===S){P=W,++P.usedTimes;break}}return P===void 0&&(P=new G_(i,S,b,r),u.push(P)),P}function E(b){if(--b.usedTimes===0){const S=u.indexOf(b);u[S]=u[u.length-1],u.pop(),b.destroy()}}function A(b){c.remove(b)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:C,releaseProgram:E,releaseShaderCache:A,programs:u,dispose:R}}function Y_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function K_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Xu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function qu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,d,g,x,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function a(h,f,d,g,x,m){const p=o(h,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(h,f,d,g,x,m){const p=o(h,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||K_),n.length>1&&n.sort(f||Xu),s.length>1&&s.sort(f||Xu)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Z_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new qu,i.set(n,[o])):s>=r.length?(o=new qu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function $_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new re};break;case"SpotLight":t={position:new L,direction:new L,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new re,groundColor:new re};break;case"RectAreaLight":t={color:new re,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function J_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let j_=0;function Q_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ev(i){const e=new $_,t=J_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new qe,o=new qe;function a(l){let u=0,h=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,v=0,y=0,_=0,C=0,E=0,A=0;l.sort(Q_);for(let b=0,S=l.length;b<S;b++){const P=l[b],k=P.color,B=P.intensity,W=P.distance,J=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=k.r*B,h+=k.g*B,f+=k.b*B;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],B);A++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const oe=P.shadow,U=t.get(P);U.shadowIntensity=oe.intensity,U.shadowBias=oe.bias,U.shadowNormalBias=oe.normalBias,U.shadowRadius=oe.radius,U.shadowMapSize=oe.mapSize,n.directionalShadow[d]=U,n.directionalShadowMap[d]=J,n.directionalShadowMatrix[d]=P.shadow.matrix,v++}n.directional[d]=X,d++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(k).multiplyScalar(B),X.distance=W,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[x]=X;const oe=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,oe.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[x]=oe.matrix,P.castShadow){const U=t.get(P);U.shadowIntensity=oe.intensity,U.shadowBias=oe.bias,U.shadowNormalBias=oe.normalBias,U.shadowRadius=oe.radius,U.shadowMapSize=oe.mapSize,n.spotShadow[x]=U,n.spotShadowMap[x]=J,_++}x++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(k).multiplyScalar(B),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const oe=P.shadow,U=t.get(P);U.shadowIntensity=oe.intensity,U.shadowBias=oe.bias,U.shadowNormalBias=oe.normalBias,U.shadowRadius=oe.radius,U.shadowMapSize=oe.mapSize,U.shadowCameraNear=oe.camera.near,U.shadowCameraFar=oe.camera.far,n.pointShadow[g]=U,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=P.shadow.matrix,y++}n.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(B),X.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==_||R.numSpotMaps!==C||R.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+C-E,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,R.directionalLength=d,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=_,R.numSpotMaps=C,R.numLightProbes=A,n.version=j_++)}function c(l,u){let h=0,f=0,d=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const y=l[p];if(y.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(y.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Yu(i){const e=new ev(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function tv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Yu(i),e.set(s,[a])):r>=o.length?(a=new Yu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class nv extends Tn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Op,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class iv extends Tn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rv=`uniform sampler2D shadow_pass;
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
}`;function ov(i,e,t){let n=new wl;const s=new ve,r=new ve,o=new st,a=new nv({depthPacking:zp}),c=new iv,l={},u=t.maxTextureSize,h={[ti]:Yt,[Yt]:ti,[At]:At},f=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:sv,fragmentShader:rv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new lt;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ye(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=af;let p=this.type;this.render=function(E,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Si),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=p!==Kn&&this.type===Kn,W=p===Kn&&this.type!==Kn;for(let J=0,X=E.length;J<X;J++){const oe=E[J],U=oe.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const se=U.getFrameExtents();if(s.multiply(se),r.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,U.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,U.mapSize.y=r.y)),U.map===null||B===!0||W===!0){const Z=this.type!==Kn?{minFilter:Kt,magFilter:Kt}:{};U.map!==null&&U.map.dispose(),U.map=new Vi(s.x,s.y,Z),U.map.texture.name=oe.name+".shadowMap",U.camera.updateProjectionMatrix()}i.setRenderTarget(U.map),i.clear();const ie=U.getViewportCount();for(let Z=0;Z<ie;Z++){const Ae=U.getViewport(Z);o.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),k.viewport(o),U.updateMatrices(oe,Z),n=U.getFrustum(),_(A,R,U.camera,oe,this.type)}U.isPointLightShadow!==!0&&this.type===Kn&&v(U,R),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,P)};function v(E,A){const R=e.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Vi(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,R,f,x,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,R,d,x,null)}function y(E,A,R,b){let S=null;const P=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)S=P;else if(S=R.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const k=S.uuid,B=A.uuid;let W=l[k];W===void 0&&(W={},l[k]=W);let J=W[B];J===void 0&&(J=S.clone(),W[B]=J,A.addEventListener("dispose",C)),S=J}if(S.visible=A.visible,S.wireframe=A.wireframe,b===Kn?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:h[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=i.properties.get(S);k.light=R}return S}function _(E,A,R,b,S){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===Kn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const B=e.update(E),W=E.material;if(Array.isArray(W)){const J=B.groups;for(let X=0,oe=J.length;X<oe;X++){const U=J[X],se=W[U.materialIndex];if(se&&se.visible){const ie=y(E,se,b,S);E.onBeforeShadow(i,E,A,R,B,ie,U),i.renderBufferDirect(R,null,B,ie,E,U),E.onAfterShadow(i,E,A,R,B,ie,U)}}}else if(W.visible){const J=y(E,W,b,S);E.onBeforeShadow(i,E,A,R,B,J,null),i.renderBufferDirect(R,null,B,J,E,null),E.onAfterShadow(i,E,A,R,B,J,null)}}const k=E.children;for(let B=0,W=k.length;B<W;B++)_(k[B],A,R,b,S)}function C(E){E.target.removeEventListener("dispose",C);for(const R in l){const b=l[R],S=E.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const av={[uc]:hc,[fc]:mc,[dc]:gc,[Ds]:pc,[hc]:uc,[mc]:fc,[gc]:dc,[pc]:Ds};function cv(i,e){function t(){let D=!1;const pe=new st;let K=null;const ee=new st(0,0,0,0);return{setMask:function(me){K!==me&&!D&&(i.colorMask(me,me,me,me),K=me)},setLocked:function(me){D=me},setClear:function(me,de,ze,Je,ft){ft===!0&&(me*=Je,de*=Je,ze*=Je),pe.set(me,de,ze,Je),ee.equals(pe)===!1&&(i.clearColor(me,de,ze,Je),ee.copy(pe))},reset:function(){D=!1,K=null,ee.set(-1,0,0,0)}}}function n(){let D=!1,pe=!1,K=null,ee=null,me=null;return{setReversed:function(de){if(pe!==de){const ze=e.get("EXT_clip_control");pe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT);const Je=me;me=null,this.setClear(Je)}pe=de},getReversed:function(){return pe},setTest:function(de){de?ye(i.DEPTH_TEST):Oe(i.DEPTH_TEST)},setMask:function(de){K!==de&&!D&&(i.depthMask(de),K=de)},setFunc:function(de){if(pe&&(de=av[de]),ee!==de){switch(de){case uc:i.depthFunc(i.NEVER);break;case hc:i.depthFunc(i.ALWAYS);break;case fc:i.depthFunc(i.LESS);break;case Ds:i.depthFunc(i.LEQUAL);break;case dc:i.depthFunc(i.EQUAL);break;case pc:i.depthFunc(i.GEQUAL);break;case mc:i.depthFunc(i.GREATER);break;case gc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ee=de}},setLocked:function(de){D=de},setClear:function(de){me!==de&&(pe&&(de=1-de),i.clearDepth(de),me=de)},reset:function(){D=!1,K=null,ee=null,me=null,pe=!1}}}function s(){let D=!1,pe=null,K=null,ee=null,me=null,de=null,ze=null,Je=null,ft=null;return{setTest:function(tt){D||(tt?ye(i.STENCIL_TEST):Oe(i.STENCIL_TEST))},setMask:function(tt){pe!==tt&&!D&&(i.stencilMask(tt),pe=tt)},setFunc:function(tt,St,dt){(K!==tt||ee!==St||me!==dt)&&(i.stencilFunc(tt,St,dt),K=tt,ee=St,me=dt)},setOp:function(tt,St,dt){(de!==tt||ze!==St||Je!==dt)&&(i.stencilOp(tt,St,dt),de=tt,ze=St,Je=dt)},setLocked:function(tt){D=tt},setClear:function(tt){ft!==tt&&(i.clearStencil(tt),ft=tt)},reset:function(){D=!1,pe=null,K=null,ee=null,me=null,de=null,ze=null,Je=null,ft=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,v=null,y=null,_=null,C=null,E=null,A=new re(0,0,0),R=0,b=!1,S=null,P=null,k=null,B=null,W=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,oe=0;const U=i.getParameter(i.VERSION);U.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(U)[1]),X=oe>=1):U.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),X=oe>=2);let se=null,ie={};const Z=i.getParameter(i.SCISSOR_BOX),Ae=i.getParameter(i.VIEWPORT),le=new st().fromArray(Z),te=new st().fromArray(Ae);function fe(D,pe,K,ee){const me=new Uint8Array(4),de=i.createTexture();i.bindTexture(D,de),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<K;ze++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,ee,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(pe+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return de}const Ee={};Ee[i.TEXTURE_2D]=fe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ee[i.TEXTURE_CUBE_MAP]=fe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[i.TEXTURE_2D_ARRAY]=fe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ee[i.TEXTURE_3D]=fe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ye(i.DEPTH_TEST),o.setFunc(Ds),ue(!1),Pe(Kl),ye(i.CULL_FACE),I(Si);function ye(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Oe(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Xe(D,pe){return h[D]!==pe?(i.bindFramebuffer(D,pe),h[D]=pe,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Ue(D,pe){let K=d,ee=!1;if(D){K=f.get(pe),K===void 0&&(K=[],f.set(pe,K));const me=D.textures;if(K.length!==me.length||K[0]!==i.COLOR_ATTACHMENT0){for(let de=0,ze=me.length;de<ze;de++)K[de]=i.COLOR_ATTACHMENT0+de;K.length=me.length,ee=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,ee=!0);ee&&i.drawBuffers(K)}function $e(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const ce={[zi]:i.FUNC_ADD,[lp]:i.FUNC_SUBTRACT,[up]:i.FUNC_REVERSE_SUBTRACT};ce[hp]=i.MIN,ce[fp]=i.MAX;const ge={[dp]:i.ZERO,[pp]:i.ONE,[mp]:i.SRC_COLOR,[cc]:i.SRC_ALPHA,[Mp]:i.SRC_ALPHA_SATURATE,[vp]:i.DST_COLOR,[xp]:i.DST_ALPHA,[gp]:i.ONE_MINUS_SRC_COLOR,[lc]:i.ONE_MINUS_SRC_ALPHA,[yp]:i.ONE_MINUS_DST_COLOR,[_p]:i.ONE_MINUS_DST_ALPHA,[Sp]:i.CONSTANT_COLOR,[bp]:i.ONE_MINUS_CONSTANT_COLOR,[wp]:i.CONSTANT_ALPHA,[Ep]:i.ONE_MINUS_CONSTANT_ALPHA};function I(D,pe,K,ee,me,de,ze,Je,ft,tt){if(D===Si){x===!0&&(Oe(i.BLEND),x=!1);return}if(x===!1&&(ye(i.BLEND),x=!0),D!==cp){if(D!==m||tt!==b){if((p!==zi||_!==zi)&&(i.blendEquation(i.FUNC_ADD),p=zi,_=zi),tt)switch(D){case ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Es:i.blendFunc(i.ONE,i.ONE);break;case Zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Es:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,y=null,C=null,E=null,A.set(0,0,0),R=0,m=D,b=tt}return}me=me||pe,de=de||K,ze=ze||ee,(pe!==p||me!==_)&&(i.blendEquationSeparate(ce[pe],ce[me]),p=pe,_=me),(K!==v||ee!==y||de!==C||ze!==E)&&(i.blendFuncSeparate(ge[K],ge[ee],ge[de],ge[ze]),v=K,y=ee,C=de,E=ze),(Je.equals(A)===!1||ft!==R)&&(i.blendColor(Je.r,Je.g,Je.b,ft),A.copy(Je),R=ft),m=D,b=!1}function Fe(D,pe){D.side===At?Oe(i.CULL_FACE):ye(i.CULL_FACE);let K=D.side===Yt;pe&&(K=!K),ue(K),D.blending===ws&&D.transparent===!1?I(Si):I(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const ee=D.stencilWrite;a.setTest(ee),ee&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),We(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ye(i.SAMPLE_ALPHA_TO_COVERAGE):Oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(D){S!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),S=D)}function Pe(D){D!==op?(ye(i.CULL_FACE),D!==P&&(D===Kl?i.cullFace(i.BACK):D===ap?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Oe(i.CULL_FACE),P=D}function we(D){D!==k&&(X&&i.lineWidth(D),k=D)}function We(D,pe,K){D?(ye(i.POLYGON_OFFSET_FILL),(B!==pe||W!==K)&&(i.polygonOffset(pe,K),B=pe,W=K)):Oe(i.POLYGON_OFFSET_FILL)}function Te(D){D?ye(i.SCISSOR_TEST):Oe(i.SCISSOR_TEST)}function w(D){D===void 0&&(D=i.TEXTURE0+J-1),se!==D&&(i.activeTexture(D),se=D)}function M(D,pe,K){K===void 0&&(se===null?K=i.TEXTURE0+J-1:K=se);let ee=ie[K];ee===void 0&&(ee={type:void 0,texture:void 0},ie[K]=ee),(ee.type!==D||ee.texture!==pe)&&(se!==K&&(i.activeTexture(K),se=K),i.bindTexture(D,pe||Ee[D]),ee.type=D,ee.texture=pe)}function F(){const D=ie[se];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function H(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function N(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(D){le.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),le.copy(D))}function V(D){te.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),te.copy(D))}function G(D,pe){let K=l.get(pe);K===void 0&&(K=new WeakMap,l.set(pe,K));let ee=K.get(D);ee===void 0&&(ee=i.getUniformBlockIndex(pe,D.name),K.set(D,ee))}function ae(D,pe){const ee=l.get(pe).get(D);c.get(pe)!==ee&&(i.uniformBlockBinding(pe,ee,D.__bindingPointIndex),c.set(pe,ee))}function _e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},se=null,ie={},h={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,v=null,y=null,_=null,C=null,E=null,A=new re(0,0,0),R=0,b=!1,S=null,P=null,k=null,B=null,W=null,le.set(0,0,i.canvas.width,i.canvas.height),te.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ye,disable:Oe,bindFramebuffer:Xe,drawBuffers:Ue,useProgram:$e,setBlending:I,setMaterial:Fe,setFlipSided:ue,setCullFace:Pe,setLineWidth:we,setPolygonOffset:We,setScissorTest:Te,activeTexture:w,bindTexture:M,unbindTexture:F,compressedTexImage2D:H,compressedTexImage3D:ne,texImage2D:Q,texImage3D:xe,updateUBOMapping:G,uniformBlockBinding:ae,texStorage2D:q,texStorage3D:N,texSubImage2D:j,texSubImage3D:Re,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ce,scissor:he,viewport:V,reset:_e}}function Ku(i,e,t,n){const s=lv(n);switch(t){case gf:return i*e;case _f:return i*e;case vf:return i*e*2;case _l:return i*e/s.components*s.byteLength;case vl:return i*e/s.components*s.byteLength;case yf:return i*e*2/s.components*s.byteLength;case yl:return i*e*2/s.components*s.byteLength;case xf:return i*e*3/s.components*s.byteLength;case xn:return i*e*4/s.components*s.byteLength;case Ml:return i*e*4/s.components*s.byteLength;case Xo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yo:case Ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yc:case Sc:return Math.max(i,16)*Math.max(e,8)/4;case vc:case Mc:return Math.max(i,8)*Math.max(e,8)/2;case bc:case wc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ec:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ic:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Fc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Oc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case zc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Bc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Zo:case kc:case Hc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Mf:case Gc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Vc:case Wc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lv(i){switch(i){case ni:case df:return{byteLength:1,components:1};case zr:case pf:case Qr:return{byteLength:2,components:1};case gl:case xl:return{byteLength:2,components:4};case Gi:case ml:case En:return{byteLength:4,components:1};case mf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function uv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ve,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,M){return d?new OffscreenCanvas(w,M):Hr("canvas")}function x(w,M,F){let H=1;const ne=Te(w);if((ne.width>F||ne.height>F)&&(H=F/Math.max(ne.width,ne.height)),H<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const j=Math.floor(H*ne.width),Re=Math.floor(H*ne.height);h===void 0&&(h=g(j,Re));const Me=M?g(j,Re):h;return Me.width=j,Me.height=Re,Me.getContext("2d").drawImage(w,0,0,j,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+j+"x"+Re+")."),Me}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(w,M,F,H,ne=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let j=M;if(M===i.RED&&(F===i.FLOAT&&(j=i.R32F),F===i.HALF_FLOAT&&(j=i.R16F),F===i.UNSIGNED_BYTE&&(j=i.R8)),M===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.R8UI),F===i.UNSIGNED_SHORT&&(j=i.R16UI),F===i.UNSIGNED_INT&&(j=i.R32UI),F===i.BYTE&&(j=i.R8I),F===i.SHORT&&(j=i.R16I),F===i.INT&&(j=i.R32I)),M===i.RG&&(F===i.FLOAT&&(j=i.RG32F),F===i.HALF_FLOAT&&(j=i.RG16F),F===i.UNSIGNED_BYTE&&(j=i.RG8)),M===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RG8UI),F===i.UNSIGNED_SHORT&&(j=i.RG16UI),F===i.UNSIGNED_INT&&(j=i.RG32UI),F===i.BYTE&&(j=i.RG8I),F===i.SHORT&&(j=i.RG16I),F===i.INT&&(j=i.RG32I)),M===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGB8UI),F===i.UNSIGNED_SHORT&&(j=i.RGB16UI),F===i.UNSIGNED_INT&&(j=i.RGB32UI),F===i.BYTE&&(j=i.RGB8I),F===i.SHORT&&(j=i.RGB16I),F===i.INT&&(j=i.RGB32I)),M===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),F===i.UNSIGNED_INT&&(j=i.RGBA32UI),F===i.BYTE&&(j=i.RGBA8I),F===i.SHORT&&(j=i.RGBA16I),F===i.INT&&(j=i.RGBA32I)),M===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),M===i.RGBA){const Re=ne?ua:it.getTransfer(H);F===i.FLOAT&&(j=i.RGBA32F),F===i.HALF_FLOAT&&(j=i.RGBA16F),F===i.UNSIGNED_BYTE&&(j=Re===pt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function _(w,M){let F;return w?M===null||M===Gi||M===Os?F=i.DEPTH24_STENCIL8:M===En?F=i.DEPTH32F_STENCIL8:M===zr&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Gi||M===Os?F=i.DEPTH_COMPONENT24:M===En?F=i.DEPTH_COMPONENT32F:M===zr&&(F=i.DEPTH_COMPONENT16),F}function C(w,M){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Kt&&w.minFilter!==an?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function E(w){const M=w.target;M.removeEventListener("dispose",E),R(M),M.isVideoTexture&&u.delete(M)}function A(w){const M=w.target;M.removeEventListener("dispose",A),S(M)}function R(w){const M=n.get(w);if(M.__webglInit===void 0)return;const F=w.source,H=f.get(F);if(H){const ne=H[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&b(w),Object.keys(H).length===0&&f.delete(F)}n.remove(w)}function b(w){const M=n.get(w);i.deleteTexture(M.__webglTexture);const F=w.source,H=f.get(F);delete H[M.__cacheKey],o.memory.textures--}function S(w){const M=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(M.__webglFramebuffer[H]))for(let ne=0;ne<M.__webglFramebuffer[H].length;ne++)i.deleteFramebuffer(M.__webglFramebuffer[H][ne]);else i.deleteFramebuffer(M.__webglFramebuffer[H]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[H])}else{if(Array.isArray(M.__webglFramebuffer))for(let H=0;H<M.__webglFramebuffer.length;H++)i.deleteFramebuffer(M.__webglFramebuffer[H]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let H=0;H<M.__webglColorRenderbuffer.length;H++)M.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[H]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const F=w.textures;for(let H=0,ne=F.length;H<ne;H++){const j=n.get(F[H]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(F[H])}n.remove(w)}let P=0;function k(){P=0}function B(){const w=P;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),P+=1,w}function W(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function J(w,M){const F=n.get(w);if(w.isVideoTexture&&we(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const H=w.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(F,w,M);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+M)}function X(w,M){const F=n.get(w);if(w.version>0&&F.__version!==w.version){te(F,w,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+M)}function oe(w,M){const F=n.get(w);if(w.version>0&&F.__version!==w.version){te(F,w,M);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+M)}function U(w,M){const F=n.get(w);if(w.version>0&&F.__version!==w.version){fe(F,w,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+M)}const se={[Fs]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[Jo]:i.MIRRORED_REPEAT},ie={[Kt]:i.NEAREST,[ff]:i.NEAREST_MIPMAP_NEAREST,[br]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Wo]:i.LINEAR_MIPMAP_NEAREST,[jn]:i.LINEAR_MIPMAP_LINEAR},Z={[kp]:i.NEVER,[qp]:i.ALWAYS,[Hp]:i.LESS,[wf]:i.LEQUAL,[Gp]:i.EQUAL,[Xp]:i.GEQUAL,[Vp]:i.GREATER,[Wp]:i.NOTEQUAL};function Ae(w,M){if(M.type===En&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===an||M.magFilter===Wo||M.magFilter===br||M.magFilter===jn||M.minFilter===an||M.minFilter===Wo||M.minFilter===br||M.minFilter===jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,se[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,se[M.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,se[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ie[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ie[M.minFilter]),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Z[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Kt||M.minFilter!==br&&M.minFilter!==jn||M.type===En&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function le(w,M){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",E));const H=M.source;let ne=f.get(H);ne===void 0&&(ne={},f.set(H,ne));const j=W(M);if(j!==w.__cacheKey){ne[j]===void 0&&(ne[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),ne[j].usedTimes++;const Re=ne[w.__cacheKey];Re!==void 0&&(ne[w.__cacheKey].usedTimes--,Re.usedTimes===0&&b(M)),w.__cacheKey=j,w.__webglTexture=ne[j].texture}return F}function te(w,M,F){let H=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(H=i.TEXTURE_3D);const ne=le(w,M),j=M.source;t.bindTexture(H,w.__webglTexture,i.TEXTURE0+F);const Re=n.get(j);if(j.version!==Re.__version||ne===!0){t.activeTexture(i.TEXTURE0+F);const Me=it.getPrimaries(it.workingColorSpace),Ce=M.colorSpace===vi?null:it.getPrimaries(M.colorSpace),q=M.colorSpace===vi||Me===Ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let N=x(M.image,!1,s.maxTextureSize);N=We(M,N);const Q=r.convert(M.format,M.colorSpace),xe=r.convert(M.type);let he=y(M.internalFormat,Q,xe,M.colorSpace,M.isVideoTexture);Ae(H,M);let V;const G=M.mipmaps,ae=M.isVideoTexture!==!0,_e=Re.__version===void 0||ne===!0,D=j.dataReady,pe=C(M,N);if(M.isDepthTexture)he=_(M.format===zs,M.type),_e&&(ae?t.texStorage2D(i.TEXTURE_2D,1,he,N.width,N.height):t.texImage2D(i.TEXTURE_2D,0,he,N.width,N.height,0,Q,xe,null));else if(M.isDataTexture)if(G.length>0){ae&&_e&&t.texStorage2D(i.TEXTURE_2D,pe,he,G[0].width,G[0].height);for(let K=0,ee=G.length;K<ee;K++)V=G[K],ae?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,V.width,V.height,Q,xe,V.data):t.texImage2D(i.TEXTURE_2D,K,he,V.width,V.height,0,Q,xe,V.data);M.generateMipmaps=!1}else ae?(_e&&t.texStorage2D(i.TEXTURE_2D,pe,he,N.width,N.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,N.width,N.height,Q,xe,N.data)):t.texImage2D(i.TEXTURE_2D,0,he,N.width,N.height,0,Q,xe,N.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ae&&_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,he,G[0].width,G[0].height,N.depth);for(let K=0,ee=G.length;K<ee;K++)if(V=G[K],M.format!==xn)if(Q!==null)if(ae){if(D)if(M.layerUpdates.size>0){const me=Ku(V.width,V.height,M.format,M.type);for(const de of M.layerUpdates){const ze=V.data.subarray(de*me/V.data.BYTES_PER_ELEMENT,(de+1)*me/V.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,de,V.width,V.height,1,Q,ze)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,V.width,V.height,N.depth,Q,V.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,he,V.width,V.height,N.depth,0,V.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,V.width,V.height,N.depth,Q,xe,V.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,he,V.width,V.height,N.depth,0,Q,xe,V.data)}else{ae&&_e&&t.texStorage2D(i.TEXTURE_2D,pe,he,G[0].width,G[0].height);for(let K=0,ee=G.length;K<ee;K++)V=G[K],M.format!==xn?Q!==null?ae?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,V.width,V.height,Q,V.data):t.compressedTexImage2D(i.TEXTURE_2D,K,he,V.width,V.height,0,V.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,V.width,V.height,Q,xe,V.data):t.texImage2D(i.TEXTURE_2D,K,he,V.width,V.height,0,Q,xe,V.data)}else if(M.isDataArrayTexture)if(ae){if(_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,he,N.width,N.height,N.depth),D)if(M.layerUpdates.size>0){const K=Ku(N.width,N.height,M.format,M.type);for(const ee of M.layerUpdates){const me=N.data.subarray(ee*K/N.data.BYTES_PER_ELEMENT,(ee+1)*K/N.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ee,N.width,N.height,1,Q,xe,me)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,N.width,N.height,N.depth,Q,xe,N.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,he,N.width,N.height,N.depth,0,Q,xe,N.data);else if(M.isData3DTexture)ae?(_e&&t.texStorage3D(i.TEXTURE_3D,pe,he,N.width,N.height,N.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,N.width,N.height,N.depth,Q,xe,N.data)):t.texImage3D(i.TEXTURE_3D,0,he,N.width,N.height,N.depth,0,Q,xe,N.data);else if(M.isFramebufferTexture){if(_e)if(ae)t.texStorage2D(i.TEXTURE_2D,pe,he,N.width,N.height);else{let K=N.width,ee=N.height;for(let me=0;me<pe;me++)t.texImage2D(i.TEXTURE_2D,me,he,K,ee,0,Q,xe,null),K>>=1,ee>>=1}}else if(G.length>0){if(ae&&_e){const K=Te(G[0]);t.texStorage2D(i.TEXTURE_2D,pe,he,K.width,K.height)}for(let K=0,ee=G.length;K<ee;K++)V=G[K],ae?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Q,xe,V):t.texImage2D(i.TEXTURE_2D,K,he,Q,xe,V);M.generateMipmaps=!1}else if(ae){if(_e){const K=Te(N);t.texStorage2D(i.TEXTURE_2D,pe,he,K.width,K.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q,xe,N)}else t.texImage2D(i.TEXTURE_2D,0,he,Q,xe,N);m(M)&&p(H),Re.__version=j.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function fe(w,M,F){if(M.image.length!==6)return;const H=le(w,M),ne=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);const j=n.get(ne);if(ne.version!==j.__version||H===!0){t.activeTexture(i.TEXTURE0+F);const Re=it.getPrimaries(it.workingColorSpace),Me=M.colorSpace===vi?null:it.getPrimaries(M.colorSpace),Ce=M.colorSpace===vi||Re===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const q=M.isCompressedTexture||M.image[0].isCompressedTexture,N=M.image[0]&&M.image[0].isDataTexture,Q=[];for(let ee=0;ee<6;ee++)!q&&!N?Q[ee]=x(M.image[ee],!0,s.maxCubemapSize):Q[ee]=N?M.image[ee].image:M.image[ee],Q[ee]=We(M,Q[ee]);const xe=Q[0],he=r.convert(M.format,M.colorSpace),V=r.convert(M.type),G=y(M.internalFormat,he,V,M.colorSpace),ae=M.isVideoTexture!==!0,_e=j.__version===void 0||H===!0,D=ne.dataReady;let pe=C(M,xe);Ae(i.TEXTURE_CUBE_MAP,M);let K;if(q){ae&&_e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,G,xe.width,xe.height);for(let ee=0;ee<6;ee++){K=Q[ee].mipmaps;for(let me=0;me<K.length;me++){const de=K[me];M.format!==xn?he!==null?ae?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,0,0,de.width,de.height,he,de.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,G,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ae?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,0,0,de.width,de.height,he,V,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,G,de.width,de.height,0,he,V,de.data)}}}else{if(K=M.mipmaps,ae&&_e){K.length>0&&pe++;const ee=Te(Q[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,G,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(N){ae?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Q[ee].width,Q[ee].height,he,V,Q[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,G,Q[ee].width,Q[ee].height,0,he,V,Q[ee].data);for(let me=0;me<K.length;me++){const ze=K[me].image[ee].image;ae?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,0,0,ze.width,ze.height,he,V,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,G,ze.width,ze.height,0,he,V,ze.data)}}else{ae?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,he,V,Q[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,G,he,V,Q[ee]);for(let me=0;me<K.length;me++){const de=K[me];ae?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,0,0,he,V,de.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,G,he,V,de.image[ee])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),j.__version=ne.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function Ee(w,M,F,H,ne,j){const Re=r.convert(F.format,F.colorSpace),Me=r.convert(F.type),Ce=y(F.internalFormat,Re,Me,F.colorSpace),q=n.get(M),N=n.get(F);if(N.__renderTarget=M,!q.__hasExternalTextures){const Q=Math.max(1,M.width>>j),xe=Math.max(1,M.height>>j);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,j,Ce,Q,xe,M.depth,0,Re,Me,null):t.texImage2D(ne,j,Ce,Q,xe,0,Re,Me,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Pe(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,ne,N.__webglTexture,0,ue(M)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,ne,N.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(w,M,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer){const H=M.depthTexture,ne=H&&H.isDepthTexture?H.type:null,j=_(M.stencilBuffer,ne),Re=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=ue(M);Pe(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,j,M.width,M.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,j,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,j,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,w)}else{const H=M.textures;for(let ne=0;ne<H.length;ne++){const j=H[ne],Re=r.convert(j.format,j.colorSpace),Me=r.convert(j.type),Ce=y(j.internalFormat,Re,Me,j.colorSpace),q=ue(M);F&&Pe(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,q,Ce,M.width,M.height):Pe(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,q,Ce,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ce,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=n.get(M.depthTexture);H.__renderTarget=M,(!H.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J(M.depthTexture,0);const ne=H.__webglTexture,j=ue(M);if(M.depthTexture.format===Ts)Pe(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(M.depthTexture.format===zs)Pe(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Xe(w){const M=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const H=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),H){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,H.removeEventListener("dispose",ne)};H.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=H}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Oe(M.__webglFramebuffer,w)}else if(F){M.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[H]),M.__webglDepthbuffer[H]===void 0)M.__webglDepthbuffer[H]=i.createRenderbuffer(),ye(M.__webglDepthbuffer[H],w,!1);else{const ne=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=M.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ye(M.__webglDepthbuffer,w,!1);else{const H=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,ne)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(w,M,F){const H=n.get(w);M!==void 0&&Ee(H.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Xe(w)}function $e(w){const M=w.texture,F=n.get(w),H=n.get(M);w.addEventListener("dispose",A);const ne=w.textures,j=w.isWebGLCubeRenderTarget===!0,Re=ne.length>1;if(Re||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=M.version,o.memory.textures++),j){F.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer[Me]=[];for(let Ce=0;Ce<M.mipmaps.length;Ce++)F.__webglFramebuffer[Me][Ce]=i.createFramebuffer()}else F.__webglFramebuffer[Me]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer=[];for(let Me=0;Me<M.mipmaps.length;Me++)F.__webglFramebuffer[Me]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Re)for(let Me=0,Ce=ne.length;Me<Ce;Me++){const q=n.get(ne[Me]);q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&Pe(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Me=0;Me<ne.length;Me++){const Ce=ne[Me];F.__webglColorRenderbuffer[Me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[Me]);const q=r.convert(Ce.format,Ce.colorSpace),N=r.convert(Ce.type),Q=y(Ce.internalFormat,q,N,Ce.colorSpace,w.isXRRenderTarget===!0),xe=ue(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,xe,Q,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,F.__webglColorRenderbuffer[Me])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(F.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Ae(i.TEXTURE_CUBE_MAP,M);for(let Me=0;Me<6;Me++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ce=0;Ce<M.mipmaps.length;Ce++)Ee(F.__webglFramebuffer[Me][Ce],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ce);else Ee(F.__webglFramebuffer[Me],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);m(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let Me=0,Ce=ne.length;Me<Ce;Me++){const q=ne[Me],N=n.get(q);t.bindTexture(i.TEXTURE_2D,N.__webglTexture),Ae(i.TEXTURE_2D,q),Ee(F.__webglFramebuffer,w,q,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,0),m(q)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let Me=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Me=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,H.__webglTexture),Ae(Me,M),M.mipmaps&&M.mipmaps.length>0)for(let Ce=0;Ce<M.mipmaps.length;Ce++)Ee(F.__webglFramebuffer[Ce],w,M,i.COLOR_ATTACHMENT0,Me,Ce);else Ee(F.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,Me,0);m(M)&&p(Me),t.unbindTexture()}w.depthBuffer&&Xe(w)}function ce(w){const M=w.textures;for(let F=0,H=M.length;F<H;F++){const ne=M[F];if(m(ne)){const j=v(w),Re=n.get(ne).__webglTexture;t.bindTexture(j,Re),p(j),t.unbindTexture()}}}const ge=[],I=[];function Fe(w){if(w.samples>0){if(Pe(w)===!1){const M=w.textures,F=w.width,H=w.height;let ne=i.COLOR_BUFFER_BIT;const j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(w),Me=M.length>1;if(Me)for(let Ce=0;Ce<M.length;Ce++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Ce=0;Ce<M.length;Ce++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),Me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Ce]);const q=n.get(M[Ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,q,0)}i.blitFramebuffer(0,0,F,H,0,0,F,H,ne,i.NEAREST),c===!0&&(ge.length=0,I.length=0,ge.push(i.COLOR_ATTACHMENT0+Ce),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ge.push(j),I.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,I)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Me)for(let Ce=0;Ce<M.length;Ce++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Ce]);const q=n.get(M[Ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,q,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const M=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ue(w){return Math.min(s.maxSamples,w.samples)}function Pe(w){const M=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function we(w){const M=o.render.frame;u.get(w)!==M&&(u.set(w,M),w.update())}function We(w,M){const F=w.colorSpace,H=w.format,ne=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==$t&&F!==vi&&(it.getTransfer(F)===pt?(H!==xn||ne!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),M}function Te(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.setTexture2D=J,this.setTexture2DArray=X,this.setTexture3D=oe,this.setTextureCube=U,this.rebindTextures=Ue,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Pe}function hv(i,e){function t(n,s=vi){let r;const o=it.getTransfer(s);if(n===ni)return i.UNSIGNED_BYTE;if(n===gl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===df)return i.BYTE;if(n===pf)return i.SHORT;if(n===zr)return i.UNSIGNED_SHORT;if(n===ml)return i.INT;if(n===Gi)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Qr)return i.HALF_FLOAT;if(n===gf)return i.ALPHA;if(n===xf)return i.RGB;if(n===xn)return i.RGBA;if(n===_f)return i.LUMINANCE;if(n===vf)return i.LUMINANCE_ALPHA;if(n===Ts)return i.DEPTH_COMPONENT;if(n===zs)return i.DEPTH_STENCIL;if(n===_l)return i.RED;if(n===vl)return i.RED_INTEGER;if(n===yf)return i.RG;if(n===yl)return i.RG_INTEGER;if(n===Ml)return i.RGBA_INTEGER;if(n===Xo||n===qo||n===Yo||n===Ko)if(o===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ko)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vc||n===yc||n===Mc||n===Sc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bc||n===wc||n===Ec)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bc||n===wc)return o===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ec)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc||n===Uc||n===Fc||n===Oc||n===zc||n===Bc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Tc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ac)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ic)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zo||n===kc||n===Hc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Zo)return o===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mf||n===Gc||n===Vc||n===Wc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Gc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class fv extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class cn extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dv={type:"move"};class Va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new cn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mv=`
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

}`;class gv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Ct,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wi({vertexShader:pv,fragmentShader:mv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new ii(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xv extends Ks{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const x=new gv,m=t.getContextAttributes();let p=null,v=null;const y=[],_=[],C=new ve;let E=null;const A=new Xt;A.viewport=new st;const R=new Xt;R.viewport=new st;const b=[A,R],S=new fv;let P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let fe=y[te];return fe===void 0&&(fe=new Va,y[te]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(te){let fe=y[te];return fe===void 0&&(fe=new Va,y[te]=fe),fe.getGripSpace()},this.getHand=function(te){let fe=y[te];return fe===void 0&&(fe=new Va,y[te]=fe),fe.getHandSpace()};function B(te){const fe=_.indexOf(te.inputSource);if(fe===-1)return;const Ee=y[fe];Ee!==void 0&&(Ee.update(te.inputSource,te.frame,l||o),Ee.dispatchEvent({type:te.type,data:te.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",J);for(let te=0;te<y.length;te++){const fe=_[te];fe!==null&&(_[te]=null,y[te].disconnect(fe))}P=null,k=null,x.reset(),e.setRenderTarget(p),d=null,f=null,h=null,s=null,v=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0){const fe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,fe),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Vi(d.framebufferWidth,d.framebufferHeight,{format:xn,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let fe=null,Ee=null,ye=null;m.depth&&(ye=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=m.stencil?zs:Ts,Ee=m.stencil?Os:Gi);const Oe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(Oe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Vi(f.textureWidth,f.textureHeight,{format:xn,type:ni,depthTexture:new Ff(f.textureWidth,f.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),le.setContext(s),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(te){for(let fe=0;fe<te.removed.length;fe++){const Ee=te.removed[fe],ye=_.indexOf(Ee);ye>=0&&(_[ye]=null,y[ye].disconnect(Ee))}for(let fe=0;fe<te.added.length;fe++){const Ee=te.added[fe];let ye=_.indexOf(Ee);if(ye===-1){for(let Xe=0;Xe<y.length;Xe++)if(Xe>=_.length){_.push(Ee),ye=Xe;break}else if(_[Xe]===null){_[Xe]=Ee,ye=Xe;break}if(ye===-1)break}const Oe=y[ye];Oe&&Oe.connect(Ee)}}const X=new L,oe=new L;function U(te,fe,Ee){X.setFromMatrixPosition(fe.matrixWorld),oe.setFromMatrixPosition(Ee.matrixWorld);const ye=X.distanceTo(oe),Oe=fe.projectionMatrix.elements,Xe=Ee.projectionMatrix.elements,Ue=Oe[14]/(Oe[10]-1),$e=Oe[14]/(Oe[10]+1),ce=(Oe[9]+1)/Oe[5],ge=(Oe[9]-1)/Oe[5],I=(Oe[8]-1)/Oe[0],Fe=(Xe[8]+1)/Xe[0],ue=Ue*I,Pe=Ue*Fe,we=ye/(-I+Fe),We=we*-I;if(fe.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(We),te.translateZ(we),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),Oe[10]===-1)te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Te=Ue+we,w=$e+we,M=ue-We,F=Pe+(ye-We),H=ce*$e/w*Te,ne=ge*$e/w*Te;te.projectionMatrix.makePerspective(M,F,H,ne,Te,w),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function se(te,fe){fe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(fe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let fe=te.near,Ee=te.far;x.texture!==null&&(x.depthNear>0&&(fe=x.depthNear),x.depthFar>0&&(Ee=x.depthFar)),S.near=R.near=A.near=fe,S.far=R.far=A.far=Ee,(P!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,k=S.far),A.layers.mask=te.layers.mask|2,R.layers.mask=te.layers.mask|4,S.layers.mask=A.layers.mask|R.layers.mask;const ye=te.parent,Oe=S.cameras;se(S,ye);for(let Xe=0;Xe<Oe.length;Xe++)se(Oe[Xe],ye);Oe.length===2?U(S,A,R):S.projectionMatrix.copy(A.projectionMatrix),ie(te,S,ye)};function ie(te,fe,Ee){Ee===null?te.matrix.copy(fe.matrixWorld):(te.matrix.copy(Ee.matrixWorld),te.matrix.invert(),te.matrix.multiply(fe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Bs*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(te){c=te,f!==null&&(f.fixedFoveation=te),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=te)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let Z=null;function Ae(te,fe){if(u=fe.getViewerPose(l||o),g=fe,u!==null){const Ee=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let ye=!1;Ee.length!==S.cameras.length&&(S.cameras.length=0,ye=!0);for(let Xe=0;Xe<Ee.length;Xe++){const Ue=Ee[Xe];let $e=null;if(d!==null)$e=d.getViewport(Ue);else{const ge=h.getViewSubImage(f,Ue);$e=ge.viewport,Xe===0&&(e.setRenderTargetTextures(v,ge.colorTexture,f.ignoreDepthValues?void 0:ge.depthStencilTexture),e.setRenderTarget(v))}let ce=b[Xe];ce===void 0&&(ce=new Xt,ce.layers.enable(Xe),ce.viewport=new st,b[Xe]=ce),ce.matrix.fromArray(Ue.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(Ue.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set($e.x,$e.y,$e.width,$e.height),Xe===0&&(S.matrix.copy(ce.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ye===!0&&S.cameras.push(ce)}const Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const Xe=h.getDepthInformation(Ee[0]);Xe&&Xe.isValid&&Xe.texture&&x.init(e,Xe,s.renderState)}}for(let Ee=0;Ee<y.length;Ee++){const ye=_[Ee],Oe=y[Ee];ye!==null&&Oe!==void 0&&Oe.update(ye,fe,l||o)}Z&&Z(te,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),g=null}const le=new Uf;le.setAnimationLoop(Ae),this.setAnimationLoop=function(te){Z=te},this.dispose=function(){}}}const Li=new An,_v=new qe;function vv(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Yt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Yt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),y=v.envMap,_=v.envMapRotation;y&&(m.envMap.value=y,Li.copy(_),Li.x*=-1,Li.y*=-1,Li.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),m.envMapRotation.value.setFromMatrix4(_v.makeRotationFromEuler(Li)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function yv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const _=y.program;n.uniformBlockBinding(v,_)}function l(v,y){let _=s[v.id];_===void 0&&(g(v),_=u(v),s[v.id]=_,v.addEventListener("dispose",m));const C=y.program;n.updateUBOMapping(v,C);const E=e.render.frame;r[v.id]!==E&&(f(v),r[v.id]=E)}function u(v){const y=h();v.__bindingPointIndex=y;const _=i.createBuffer(),C=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,C,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const y=s[v.id],_=v.uniforms,C=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,A=_.length;E<A;E++){const R=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,S=R.length;b<S;b++){const P=R[b];if(d(P,E,b,C)===!0){const k=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let J=0;J<B.length;J++){const X=B[J],oe=x(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,k+W,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,W),W+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,y,_,C){const E=v.value,A=y+"_"+_;if(C[A]===void 0)return typeof E=="number"||typeof E=="boolean"?C[A]=E:C[A]=E.clone(),!0;{const R=C[A];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return C[A]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(v){const y=v.uniforms;let _=0;const C=16;for(let A=0,R=y.length;A<R;A++){const b=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,P=b.length;S<P;S++){const k=b[S],B=Array.isArray(k.value)?k.value:[k.value];for(let W=0,J=B.length;W<J;W++){const X=B[W],oe=x(X),U=_%C,se=U%oe.boundary,ie=U+se;_+=se,ie!==0&&C-ie<oe.storage&&(_+=C-ie),k.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=oe.storage}}}const E=_%C;return E>0&&(_+=C-E),v.__size=_,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){const y=v.target;y.removeEventListener("dispose",m);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Mv{constructor(e={}){const{canvas:t=lm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this.toneMapping=bi,this.toneMappingExposure=1;const _=this;let C=!1,E=0,A=0,R=null,b=-1,S=null;const P=new st,k=new st;let B=null;const W=new re(0);let J=0,X=t.width,oe=t.height,U=1,se=null,ie=null;const Z=new st(0,0,X,oe),Ae=new st(0,0,X,oe);let le=!1;const te=new wl;let fe=!1,Ee=!1;const ye=new qe,Oe=new qe,Xe=new L,Ue=new st,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function ge(){return R===null?U:1}let I=n;function Fe(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pl}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",de,!1),I===null){const z="webgl2";if(I=Fe(z,T),I===null)throw Fe(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ue,Pe,we,We,Te,w,M,F,H,ne,j,Re,Me,Ce,q,N,Q,xe,he,V,G,ae,_e,D;function pe(){ue=new Tx(I),ue.init(),ae=new hv(I,ue),Pe=new yx(I,ue,e,ae),we=new cv(I,ue),Pe.reverseDepthBuffer&&f&&we.buffers.depth.setReversed(!0),We=new Cx(I),Te=new Y_,w=new uv(I,ue,we,Te,Pe,ae,We),M=new Sx(_),F=new Ex(_),H=new Fm(I),_e=new _x(I,H),ne=new Ax(I,H,We,_e),j=new Ix(I,ne,H,We),he=new Px(I,Pe,w),N=new Mx(Te),Re=new q_(_,M,F,ue,Pe,_e,N),Me=new vv(_,Te),Ce=new Z_,q=new tv(ue),xe=new xx(_,M,F,we,j,d,c),Q=new ov(_,j,Pe),D=new yv(I,We,Pe,we),V=new vx(I,ue,We),G=new Rx(I,ue,We),We.programs=Re.programs,_.capabilities=Pe,_.extensions=ue,_.properties=Te,_.renderLists=Ce,_.shadowMap=Q,_.state=we,_.info=We}pe();const K=new xv(_,I);this.xr=K,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=ue.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ue.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(T){T!==void 0&&(U=T,this.setSize(X,oe,!1))},this.getSize=function(T){return T.set(X,oe)},this.setSize=function(T,z,$=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=T,oe=z,t.width=Math.floor(T*U),t.height=Math.floor(z*U),$===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(X*U,oe*U).floor()},this.setDrawingBufferSize=function(T,z,$){X=T,oe=z,U=$,t.width=Math.floor(T*$),t.height=Math.floor(z*$),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,z,$,Y){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,z,$,Y),we.viewport(P.copy(Z).multiplyScalar(U).round())},this.getScissor=function(T){return T.copy(Ae)},this.setScissor=function(T,z,$,Y){T.isVector4?Ae.set(T.x,T.y,T.z,T.w):Ae.set(T,z,$,Y),we.scissor(k.copy(Ae).multiplyScalar(U).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(T){we.setScissorTest(le=T)},this.setOpaqueSort=function(T){se=T},this.setTransparentSort=function(T){ie=T},this.getClearColor=function(T){return T.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor.apply(xe,arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha.apply(xe,arguments)},this.clear=function(T=!0,z=!0,$=!0){let Y=0;if(T){let O=!1;if(R!==null){const Se=R.texture.format;O=Se===Ml||Se===yl||Se===vl}if(O){const Se=R.texture.type,De=Se===ni||Se===Gi||Se===zr||Se===Os||Se===gl||Se===xl,Be=xe.getClearColor(),ke=xe.getClearAlpha(),Ze=Be.r,je=Be.g,He=Be.b;De?(g[0]=Ze,g[1]=je,g[2]=He,g[3]=ke,I.clearBufferuiv(I.COLOR,0,g)):(x[0]=Ze,x[1]=je,x[2]=He,x[3]=ke,I.clearBufferiv(I.COLOR,0,x))}else Y|=I.COLOR_BUFFER_BIT}z&&(Y|=I.DEPTH_BUFFER_BIT),$&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Ce.dispose(),q.dispose(),Te.dispose(),M.dispose(),F.dispose(),j.dispose(),_e.dispose(),D.dispose(),Re.dispose(),K.dispose(),K.removeEventListener("sessionstart",Lt),K.removeEventListener("sessionend",Dt),Ht.stop()};function ee(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=We.autoReset,z=Q.enabled,$=Q.autoUpdate,Y=Q.needsUpdate,O=Q.type;pe(),We.autoReset=T,Q.enabled=z,Q.autoUpdate=$,Q.needsUpdate=Y,Q.type=O}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ze(T){const z=T.target;z.removeEventListener("dispose",ze),Je(z)}function Je(T){ft(T),Te.remove(T)}function ft(T){const z=Te.get(T).programs;z!==void 0&&(z.forEach(function($){Re.releaseProgram($)}),T.isShaderMaterial&&Re.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,$,Y,O,Se){z===null&&(z=$e);const De=O.isMesh&&O.matrixWorld.determinant()<0,Be=On(T,z,$,Y,O);we.setMaterial(Y,De);let ke=$.index,Ze=1;if(Y.wireframe===!0){if(ke=ne.getWireframeAttribute($),ke===void 0)return;Ze=2}const je=$.drawRange,He=$.attributes.position;let rt=je.start*Ze,xt=(je.start+je.count)*Ze;Se!==null&&(rt=Math.max(rt,Se.start*Ze),xt=Math.min(xt,(Se.start+Se.count)*Ze)),ke!==null?(rt=Math.max(rt,0),xt=Math.min(xt,ke.count)):He!=null&&(rt=Math.max(rt,0),xt=Math.min(xt,He.count));const yt=xt-rt;if(yt<0||yt===1/0)return;_e.setup(O,Y,Be,$,ke);let Jt,ot=V;if(ke!==null&&(Jt=H.get(ke),ot=G,ot.setIndex(Jt)),O.isMesh)Y.wireframe===!0?(we.setLineWidth(Y.wireframeLinewidth*ge()),ot.setMode(I.LINES)):ot.setMode(I.TRIANGLES);else if(O.isLine){let Ge=Y.linewidth;Ge===void 0&&(Ge=1),we.setLineWidth(Ge*ge()),O.isLineSegments?ot.setMode(I.LINES):O.isLineLoop?ot.setMode(I.LINE_LOOP):ot.setMode(I.LINE_STRIP)}else O.isPoints?ot.setMode(I.POINTS):O.isSprite&&ot.setMode(I.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ot.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ue.get("WEBGL_multi_draw"))ot.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ge=O._multiDrawStarts,Bn=O._multiDrawCounts,at=O._multiDrawCount,yn=ke?H.get(ke).bytesPerElement:1,$i=Te.get(Y).currentProgram.getUniforms();for(let tn=0;tn<at;tn++)$i.setValue(I,"_gl_DrawID",tn),ot.render(Ge[tn]/yn,Bn[tn])}else if(O.isInstancedMesh)ot.renderInstances(rt,yt,O.count);else if($.isInstancedBufferGeometry){const Ge=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Bn=Math.min($.instanceCount,Ge);ot.renderInstances(rt,yt,Bn)}else ot.render(rt,yt)};function tt(T,z,$){T.transparent===!0&&T.side===At&&T.forceSinglePass===!1?(T.side=Yt,T.needsUpdate=!0,Zi(T,z,$),T.side=ti,T.needsUpdate=!0,Zi(T,z,$),T.side=At):Zi(T,z,$)}this.compile=function(T,z,$=null){$===null&&($=T),p=q.get($),p.init(z),y.push(p),$.traverseVisible(function(O){O.isLight&&O.layers.test(z.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==$&&T.traverseVisible(function(O){O.isLight&&O.layers.test(z.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const Y=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const Se=O.material;if(Se)if(Array.isArray(Se))for(let De=0;De<Se.length;De++){const Be=Se[De];tt(Be,$,O),Y.add(Be)}else tt(Se,$,O),Y.add(Se)}),y.pop(),p=null,Y},this.compileAsync=function(T,z,$=null){const Y=this.compile(T,z,$);return new Promise(O=>{function Se(){if(Y.forEach(function(De){Te.get(De).currentProgram.isReady()&&Y.delete(De)}),Y.size===0){O(T);return}setTimeout(Se,10)}ue.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let St=null;function dt(T){St&&St(T)}function Lt(){Ht.stop()}function Dt(){Ht.start()}const Ht=new Uf;Ht.setAnimationLoop(dt),typeof self<"u"&&Ht.setContext(self),this.setAnimationLoop=function(T){St=T,K.setAnimationLoop(T),T===null?Ht.stop():Ht.start()},K.addEventListener("sessionstart",Lt),K.addEventListener("sessionend",Dt),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(z),z=K.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,z,R),p=q.get(T,y.length),p.init(z),y.push(p),Oe.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),te.setFromProjectionMatrix(Oe),Ee=this.localClippingEnabled,fe=N.init(this.clippingPlanes,Ee),m=Ce.get(T,v.length),m.init(),v.push(m),K.enabled===!0&&K.isPresenting===!0){const Se=_.xr.getDepthSensingMesh();Se!==null&&ln(Se,z,-1/0,_.sortObjects)}ln(T,z,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(se,ie),ce=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,ce&&xe.addToRenderList(m,T),this.info.render.frame++,fe===!0&&N.beginShadows();const $=p.state.shadowsArray;Q.render($,T,z),fe===!0&&N.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,O=m.transmissive;if(p.setupLights(),z.isArrayCamera){const Se=z.cameras;if(O.length>0)for(let De=0,Be=Se.length;De<Be;De++){const ke=Se[De];Ki(Y,O,T,ke)}ce&&xe.render(T);for(let De=0,Be=Se.length;De<Be;De++){const ke=Se[De];Fn(m,T,ke,ke.viewport)}}else O.length>0&&Ki(Y,O,T,z),ce&&xe.render(T),Fn(m,T,z);R!==null&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(_,T,z),_e.resetDefaultState(),b=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],fe===!0&&N.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function ln(T,z,$,Y){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)$=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||te.intersectsSprite(T)){Y&&Ue.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Oe);const De=j.update(T),Be=T.material;Be.visible&&m.push(T,De,Be,$,Ue.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||te.intersectsObject(T))){const De=j.update(T),Be=T.material;if(Y&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ue.copy(T.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Ue.copy(De.boundingSphere.center)),Ue.applyMatrix4(T.matrixWorld).applyMatrix4(Oe)),Array.isArray(Be)){const ke=De.groups;for(let Ze=0,je=ke.length;Ze<je;Ze++){const He=ke[Ze],rt=Be[He.materialIndex];rt&&rt.visible&&m.push(T,De,rt,$,Ue.z,He)}}else Be.visible&&m.push(T,De,Be,$,Ue.z,null)}}const Se=T.children;for(let De=0,Be=Se.length;De<Be;De++)ln(Se[De],z,$,Y)}function Fn(T,z,$,Y){const O=T.opaque,Se=T.transmissive,De=T.transparent;p.setupLightsView($),fe===!0&&N.setGlobalState(_.clippingPlanes,$),Y&&we.viewport(P.copy(Y)),O.length>0&&Ti(O,z,$),Se.length>0&&Ti(Se,z,$),De.length>0&&Ti(De,z,$),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Ki(T,z,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Vi(1,1,{generateMipmaps:!0,type:ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float")?Qr:ni,minFilter:jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const Se=p.state.transmissionRenderTarget[Y.id],De=Y.viewport||P;Se.setSize(De.z,De.w);const Be=_.getRenderTarget();_.setRenderTarget(Se),_.getClearColor(W),J=_.getClearAlpha(),J<1&&_.setClearColor(16777215,.5),_.clear(),ce&&xe.render($);const ke=_.toneMapping;_.toneMapping=bi;const Ze=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),fe===!0&&N.setGlobalState(_.clippingPlanes,Y),Ti(T,$,Y),w.updateMultisampleRenderTarget(Se),w.updateRenderTargetMipmap(Se),ue.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let He=0,rt=z.length;He<rt;He++){const xt=z[He],yt=xt.object,Jt=xt.geometry,ot=xt.material,Ge=xt.group;if(ot.side===At&&yt.layers.test(Y.layers)){const Bn=ot.side;ot.side=Yt,ot.needsUpdate=!0,so(yt,$,Y,Jt,ot,Ge),ot.side=Bn,ot.needsUpdate=!0,je=!0}}je===!0&&(w.updateMultisampleRenderTarget(Se),w.updateRenderTargetMipmap(Se))}_.setRenderTarget(Be),_.setClearColor(W,J),Ze!==void 0&&(Y.viewport=Ze),_.toneMapping=ke}function Ti(T,z,$){const Y=z.isScene===!0?z.overrideMaterial:null;for(let O=0,Se=T.length;O<Se;O++){const De=T[O],Be=De.object,ke=De.geometry,Ze=Y===null?De.material:Y,je=De.group;Be.layers.test($.layers)&&so(Be,z,$,ke,Ze,je)}}function so(T,z,$,Y,O,Se){T.onBeforeRender(_,z,$,Y,O,Se),T.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(_,z,$,Y,T,Se),O.transparent===!0&&O.side===At&&O.forceSinglePass===!1?(O.side=Yt,O.needsUpdate=!0,_.renderBufferDirect($,z,Y,O,T,Se),O.side=ti,O.needsUpdate=!0,_.renderBufferDirect($,z,Y,O,T,Se),O.side=At):_.renderBufferDirect($,z,Y,O,T,Se),T.onAfterRender(_,z,$,Y,O,Se)}function Zi(T,z,$){z.isScene!==!0&&(z=$e);const Y=Te.get(T),O=p.state.lights,Se=p.state.shadowsArray,De=O.state.version,Be=Re.getParameters(T,O.state,Se,z,$),ke=Re.getProgramCacheKey(Be);let Ze=Y.programs;Y.environment=T.isMeshStandardMaterial?z.environment:null,Y.fog=z.fog,Y.envMap=(T.isMeshStandardMaterial?F:M).get(T.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Ze===void 0&&(T.addEventListener("dispose",ze),Ze=new Map,Y.programs=Ze);let je=Ze.get(ke);if(je!==void 0){if(Y.currentProgram===je&&Y.lightsStateVersion===De)return Nt(T,Be),je}else Be.uniforms=Re.getUniforms(T),T.onBeforeCompile(Be,_),je=Re.acquireProgram(Be,ke),Ze.set(ke,je),Y.uniforms=Be.uniforms;const He=Y.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(He.clippingPlanes=N.uniform),Nt(T,Be),Y.needsLights=er(T),Y.lightsStateVersion=De,Y.needsLights&&(He.ambientLightColor.value=O.state.ambient,He.lightProbe.value=O.state.probe,He.directionalLights.value=O.state.directional,He.directionalLightShadows.value=O.state.directionalShadow,He.spotLights.value=O.state.spot,He.spotLightShadows.value=O.state.spotShadow,He.rectAreaLights.value=O.state.rectArea,He.ltc_1.value=O.state.rectAreaLTC1,He.ltc_2.value=O.state.rectAreaLTC2,He.pointLights.value=O.state.point,He.pointLightShadows.value=O.state.pointShadow,He.hemisphereLights.value=O.state.hemi,He.directionalShadowMap.value=O.state.directionalShadowMap,He.directionalShadowMatrix.value=O.state.directionalShadowMatrix,He.spotShadowMap.value=O.state.spotShadowMap,He.spotLightMatrix.value=O.state.spotLightMatrix,He.spotLightMap.value=O.state.spotLightMap,He.pointShadowMap.value=O.state.pointShadowMap,He.pointShadowMatrix.value=O.state.pointShadowMatrix),Y.currentProgram=je,Y.uniformsList=null,je}function ro(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=$o.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Nt(T,z){const $=Te.get(T);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function On(T,z,$,Y,O){z.isScene!==!0&&(z=$e),w.resetTextureUnits();const Se=z.fog,De=Y.isMeshStandardMaterial?z.environment:null,Be=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:$t,ke=(Y.isMeshStandardMaterial?F:M).get(Y.envMap||De),Ze=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,je=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),He=!!$.morphAttributes.position,rt=!!$.morphAttributes.normal,xt=!!$.morphAttributes.color;let yt=bi;Y.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(yt=_.toneMapping);const Jt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ot=Jt!==void 0?Jt.length:0,Ge=Te.get(Y),Bn=p.state.lights;if(fe===!0&&(Ee===!0||T!==S)){const un=T===S&&Y.id===b;N.setState(Y,T,un)}let at=!1;Y.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Bn.state.version||Ge.outputColorSpace!==Be||O.isBatchedMesh&&Ge.batching===!1||!O.isBatchedMesh&&Ge.batching===!0||O.isBatchedMesh&&Ge.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ge.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ge.instancing===!1||!O.isInstancedMesh&&Ge.instancing===!0||O.isSkinnedMesh&&Ge.skinning===!1||!O.isSkinnedMesh&&Ge.skinning===!0||O.isInstancedMesh&&Ge.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ge.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ge.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ge.instancingMorph===!1&&O.morphTexture!==null||Ge.envMap!==ke||Y.fog===!0&&Ge.fog!==Se||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==N.numPlanes||Ge.numIntersection!==N.numIntersection)||Ge.vertexAlphas!==Ze||Ge.vertexTangents!==je||Ge.morphTargets!==He||Ge.morphNormals!==rt||Ge.morphColors!==xt||Ge.toneMapping!==yt||Ge.morphTargetsCount!==ot)&&(at=!0):(at=!0,Ge.__version=Y.version);let yn=Ge.currentProgram;at===!0&&(yn=Zi(Y,z,O));let $i=!1,tn=!1,tr=!1;const Mt=yn.getUniforms(),Rn=Ge.uniforms;if(we.useProgram(yn.program)&&($i=!0,tn=!0,tr=!0),Y.id!==b&&(b=Y.id,tn=!0),$i||S!==T){we.buffers.depth.getReversed()?(ye.copy(T.projectionMatrix),hm(ye),fm(ye),Mt.setValue(I,"projectionMatrix",ye)):Mt.setValue(I,"projectionMatrix",T.projectionMatrix),Mt.setValue(I,"viewMatrix",T.matrixWorldInverse);const ai=Mt.map.cameraPosition;ai!==void 0&&ai.setValue(I,Xe.setFromMatrixPosition(T.matrixWorld)),Pe.logarithmicDepthBuffer&&Mt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Mt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,tn=!0,tr=!0)}if(O.isSkinnedMesh){Mt.setOptional(I,O,"bindMatrix"),Mt.setOptional(I,O,"bindMatrixInverse");const un=O.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Mt.setValue(I,"boneTexture",un.boneTexture,w))}O.isBatchedMesh&&(Mt.setOptional(I,O,"batchingTexture"),Mt.setValue(I,"batchingTexture",O._matricesTexture,w),Mt.setOptional(I,O,"batchingIdTexture"),Mt.setValue(I,"batchingIdTexture",O._indirectTexture,w),Mt.setOptional(I,O,"batchingColorTexture"),O._colorsTexture!==null&&Mt.setValue(I,"batchingColorTexture",O._colorsTexture,w));const nr=$.morphAttributes;if((nr.position!==void 0||nr.normal!==void 0||nr.color!==void 0)&&he.update(O,$,yn),(tn||Ge.receiveShadow!==O.receiveShadow)&&(Ge.receiveShadow=O.receiveShadow,Mt.setValue(I,"receiveShadow",O.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Rn.envMap.value=ke,Rn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&z.environment!==null&&(Rn.envMapIntensity.value=z.environmentIntensity),tn&&(Mt.setValue(I,"toneMappingExposure",_.toneMappingExposure),Ge.needsLights&&zn(Rn,tr),Se&&Y.fog===!0&&Me.refreshFogUniforms(Rn,Se),Me.refreshMaterialUniforms(Rn,Y,U,oe,p.state.transmissionRenderTarget[T.id]),$o.upload(I,ro(Ge),Rn,w)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&($o.upload(I,ro(Ge),Rn,w),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Mt.setValue(I,"center",O.center),Mt.setValue(I,"modelViewMatrix",O.modelViewMatrix),Mt.setValue(I,"normalMatrix",O.normalMatrix),Mt.setValue(I,"modelMatrix",O.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const un=Y.uniformsGroups;for(let ai=0,ci=un.length;ai<ci;ai++){const Xl=un[ai];D.update(Xl,yn),D.bind(Xl,yn)}}return yn}function zn(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function er(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,z,$){Te.get(T.texture).__webglTexture=z,Te.get(T.depthTexture).__webglTexture=$;const Y=Te.get(T);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=$===void 0,Y.__autoAllocateDepthBuffer||ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,z){const $=Te.get(T);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,$=0){R=T,E=z,A=$;let Y=!0,O=null,Se=!1,De=!1;if(T){const ke=Te.get(T);if(ke.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(ke.__webglFramebuffer===void 0)w.setupRenderTarget(T);else if(ke.__hasExternalTextures)w.rebindTextures(T,Te.get(T.texture).__webglTexture,Te.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const He=T.depthTexture;if(ke.__boundDepthTexture!==He){if(He!==null&&Te.has(He)&&(T.width!==He.image.width||T.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(T)}}const Ze=T.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(De=!0);const je=Te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(je[z])?O=je[z][$]:O=je[z],Se=!0):T.samples>0&&w.useMultisampledRTT(T)===!1?O=Te.get(T).__webglMultisampledFramebuffer:Array.isArray(je)?O=je[$]:O=je,P.copy(T.viewport),k.copy(T.scissor),B=T.scissorTest}else P.copy(Z).multiplyScalar(U).floor(),k.copy(Ae).multiplyScalar(U).floor(),B=le;if(we.bindFramebuffer(I.FRAMEBUFFER,O)&&Y&&we.drawBuffers(T,O),we.viewport(P),we.scissor(k),we.setScissorTest(B),Se){const ke=Te.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+z,ke.__webglTexture,$)}else if(De){const ke=Te.get(T.texture),Ze=z||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ke.__webglTexture,$||0,Ze)}b=-1},this.readRenderTargetPixels=function(T,z,$,Y,O,Se,De){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Be=Be[De]),Be){we.bindFramebuffer(I.FRAMEBUFFER,Be);try{const ke=T.texture,Ze=ke.format,je=ke.type;if(!Pe.textureFormatReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-Y&&$>=0&&$<=T.height-O&&I.readPixels(z,$,Y,O,ae.convert(Ze),ae.convert(je),Se)}finally{const ke=R!==null?Te.get(R).__webglFramebuffer:null;we.bindFramebuffer(I.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(T,z,$,Y,O,Se,De){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Be=Be[De]),Be){const ke=T.texture,Ze=ke.format,je=ke.type;if(!Pe.textureFormatReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=T.width-Y&&$>=0&&$<=T.height-O){we.bindFramebuffer(I.FRAMEBUFFER,Be);const He=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,He),I.bufferData(I.PIXEL_PACK_BUFFER,Se.byteLength,I.STREAM_READ),I.readPixels(z,$,Y,O,ae.convert(Ze),ae.convert(je),0);const rt=R!==null?Te.get(R).__webglFramebuffer:null;we.bindFramebuffer(I.FRAMEBUFFER,rt);const xt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await um(I,xt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,He),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Se),I.deleteBuffer(He),I.deleteSync(xt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,z=null,$=0){T.isTexture!==!0&&(wr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,T=arguments[1]);const Y=Math.pow(2,-$),O=Math.floor(T.image.width*Y),Se=Math.floor(T.image.height*Y),De=z!==null?z.x:0,Be=z!==null?z.y:0;w.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,De,Be,O,Se),we.unbindTexture()},this.copyTextureToTexture=function(T,z,$=null,Y=null,O=0){T.isTexture!==!0&&(wr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,T=arguments[1],z=arguments[2],O=arguments[3]||0,$=null);let Se,De,Be,ke,Ze,je,He,rt,xt;const yt=T.isCompressedTexture?T.mipmaps[O]:T.image;$!==null?(Se=$.max.x-$.min.x,De=$.max.y-$.min.y,Be=$.isBox3?$.max.z-$.min.z:1,ke=$.min.x,Ze=$.min.y,je=$.isBox3?$.min.z:0):(Se=yt.width,De=yt.height,Be=yt.depth||1,ke=0,Ze=0,je=0),Y!==null?(He=Y.x,rt=Y.y,xt=Y.z):(He=0,rt=0,xt=0);const Jt=ae.convert(z.format),ot=ae.convert(z.type);let Ge;z.isData3DTexture?(w.setTexture3D(z,0),Ge=I.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(w.setTexture2DArray(z,0),Ge=I.TEXTURE_2D_ARRAY):(w.setTexture2D(z,0),Ge=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment);const Bn=I.getParameter(I.UNPACK_ROW_LENGTH),at=I.getParameter(I.UNPACK_IMAGE_HEIGHT),yn=I.getParameter(I.UNPACK_SKIP_PIXELS),$i=I.getParameter(I.UNPACK_SKIP_ROWS),tn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ke),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ze),I.pixelStorei(I.UNPACK_SKIP_IMAGES,je);const tr=T.isDataArrayTexture||T.isData3DTexture,Mt=z.isDataArrayTexture||z.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Rn=Te.get(T),nr=Te.get(z),un=Te.get(Rn.__renderTarget),ai=Te.get(nr.__renderTarget);we.bindFramebuffer(I.READ_FRAMEBUFFER,un.__webglFramebuffer),we.bindFramebuffer(I.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let ci=0;ci<Be;ci++)tr&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.get(T).__webglTexture,O,je+ci),T.isDepthTexture?(Mt&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.get(z).__webglTexture,O,xt+ci),I.blitFramebuffer(ke,Ze,Se,De,He,rt,Se,De,I.DEPTH_BUFFER_BIT,I.NEAREST)):Mt?I.copyTexSubImage3D(Ge,O,He,rt,xt+ci,ke,Ze,Se,De):I.copyTexSubImage2D(Ge,O,He,rt,xt+ci,ke,Ze,Se,De);we.bindFramebuffer(I.READ_FRAMEBUFFER,null),we.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Mt?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Ge,O,He,rt,xt,Se,De,Be,Jt,ot,yt.data):z.isCompressedArrayTexture?I.compressedTexSubImage3D(Ge,O,He,rt,xt,Se,De,Be,Jt,yt.data):I.texSubImage3D(Ge,O,He,rt,xt,Se,De,Be,Jt,ot,yt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,O,He,rt,Se,De,Jt,ot,yt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,O,He,rt,yt.width,yt.height,Jt,yt.data):I.texSubImage2D(I.TEXTURE_2D,O,He,rt,Se,De,Jt,ot,yt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Bn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,at),I.pixelStorei(I.UNPACK_SKIP_PIXELS,yn),I.pixelStorei(I.UNPACK_SKIP_ROWS,$i),I.pixelStorei(I.UNPACK_SKIP_IMAGES,tn),O===0&&z.generateMipmaps&&I.generateMipmap(Ge),we.unbindTexture()},this.copyTextureToTexture3D=function(T,z,$=null,Y=null,O=0){return T.isTexture!==!0&&(wr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Y=arguments[1]||null,T=arguments[2],z=arguments[3],O=arguments[4]||0),wr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,z,$,Y,O)},this.initRenderTarget=function(T){Te.get(T).__webglFramebuffer===void 0&&w.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?w.setTextureCube(T,0):T.isData3DTexture?w.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?w.setTexture2DArray(T,0):w.setTexture2D(T,0),we.unbindTexture()},this.resetState=function(){E=0,A=0,R=null,we.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}}class Al{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new re(e),this.near=t,this.far=n}clone(){return new Al(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Sv extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Hf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qc,this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new L;class Gr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ke(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Gr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Oi extends Tn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let hs;const ar=new L,fs=new L,ds=new L,ps=new ve,cr=new ve,Gf=new qe,Ao=new L,lr=new L,Ro=new L,Zu=new ve,Wa=new ve,$u=new ve;class ur extends gt{constructor(e=new Oi){if(super(),this.isSprite=!0,this.type="Sprite",hs===void 0){hs=new lt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Hf(t,5);hs.setIndex([0,1,2,0,2,3]),hs.setAttribute("position",new Gr(n,3,0,!1)),hs.setAttribute("uv",new Gr(n,2,3,!1))}this.geometry=hs,this.material=e,this.center=new ve(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fs.setFromMatrixScale(this.matrixWorld),Gf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ds.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fs.multiplyScalar(-ds.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Co(Ao.set(-.5,-.5,0),ds,o,fs,s,r),Co(lr.set(.5,-.5,0),ds,o,fs,s,r),Co(Ro.set(.5,.5,0),ds,o,fs,s,r),Zu.set(0,0),Wa.set(1,0),$u.set(1,1);let a=e.ray.intersectTriangle(Ao,lr,Ro,!1,ar);if(a===null&&(Co(lr.set(-.5,.5,0),ds,o,fs,s,r),Wa.set(0,1),a=e.ray.intersectTriangle(Ao,Ro,lr,!1,ar),a===null))return;const c=e.ray.origin.distanceTo(ar);c<e.near||c>e.far||t.push({distance:c,point:ar.clone(),uv:gn.getInterpolation(ar,Ao,lr,Ro,Zu,Wa,$u,new ve),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Co(i,e,t,n,s,r){ps.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(cr.x=r*ps.x-s*ps.y,cr.y=s*ps.x+r*ps.y):cr.copy(ps),i.copy(e),i.x+=cr.x,i.y+=cr.y,i.applyMatrix4(Gf)}const Ju=new L,ju=new st,Qu=new st,bv=new L,eh=new qe,Po=new L,Xa=new Ln,th=new qe,qa=new eo;class wv extends Ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jl,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new In),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingBox.expandByPoint(Po)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingSphere.expandByPoint(Po)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xa.copy(this.boundingSphere),Xa.applyMatrix4(s),e.ray.intersectsSphere(Xa)!==!1&&(th.copy(s).invert(),qa.copy(e.ray).applyMatrix4(th),!(this.boundingBox!==null&&qa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,qa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new st,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Np?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;ju.fromBufferAttribute(s.attributes.skinIndex,e),Qu.fromBufferAttribute(s.attributes.skinWeight,e),Ju.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Qu.getComponent(r);if(o!==0){const a=ju.getComponent(r);eh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(bv.copy(Ju).applyMatrix4(eh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Vf extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Wf extends Ct{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Kt,u=Kt,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nh=new qe,Ev=new qe;class Rl{constructor(e=[],t=[]){this.uuid=_n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Ev;nh.multiplyMatrices(a,t[r]),nh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Rl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Wf(t,e,e,xn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Vf),this.bones.push(o),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Kc extends Ke{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ms=new qe,ih=new qe,Io=[],sh=new In,Tv=new qe,hr=new Ye,fr=new Ln;class Pr extends Ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Tv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new In),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),sh.copy(e.boundingBox).applyMatrix4(ms),this.boundingBox.union(sh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),fr.copy(e.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fr.copy(this.boundingSphere),fr.applyMatrix4(n),e.ray.intersectsSphere(fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ms),ih.multiplyMatrices(n,ms),hr.matrixWorld=ih,hr.raycast(e,Io);for(let o=0,a=Io.length;o<a;o++){const c=Io[o];c.instanceId=r,c.object=this,t.push(c)}Io.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Kc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wf(new Float32Array(s*this.count),s,this.count,_l,En));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Xf extends Tn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qo=new L,ea=new L,rh=new qe,dr=new eo,Lo=new Ln,Ya=new L,oh=new L;class Cl extends gt{constructor(e=new lt,t=new Xf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Qo.fromBufferAttribute(t,s-1),ea.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Qo.distanceTo(ea);e.setAttribute("lineDistance",new vt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(s),Lo.radius+=r,e.ray.intersectsSphere(Lo)===!1)return;rh.copy(s).invert(),dr.copy(e.ray).applyMatrix4(rh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){const p=u.getX(x),v=u.getX(x+1),y=Do(this,e,dr,c,p,v);y&&t.push(y)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(d),p=Do(this,e,dr,c,x,m);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){const p=Do(this,e,dr,c,x,x+1);p&&t.push(p)}if(this.isLineLoop){const x=Do(this,e,dr,c,g-1,d);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Do(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(Qo.fromBufferAttribute(o,s),ea.fromBufferAttribute(o,r),t.distanceSqToSegment(Qo,ea,Ya,oh)>n)return;Ya.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ya);if(!(c<e.near||c>e.far))return{distance:c,point:oh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const ah=new L,ch=new L;class Av extends Cl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ah.fromBufferAttribute(t,s),ch.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ah.distanceTo(ch);e.setAttribute("lineDistance",new vt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rv extends Cl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Pl extends Tn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const lh=new qe,Zc=new eo,No=new Ln,Uo=new L;class qf extends gt{constructor(e=new lt,t=new Pl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(s),No.radius+=r,e.ray.intersectsSphere(No)===!1)return;lh.copy(s).invert(),Zc.copy(e.ray).applyMatrix4(lh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,x=d;g<x;g++){const m=l.getX(g);Uo.fromBufferAttribute(h,m),uh(Uo,m,c,s,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,x=d;g<x;g++)Uo.fromBufferAttribute(h,g),uh(Uo,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function uh(i,e,t,n,s,r,o){const a=Zc.distanceSqToPoint(i);if(a<t){const c=new L;Zc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Fo extends Ct{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ve:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,s=[],r=[],o=[],a=new L,c=new qe;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ft(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Ft(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Il extends Dn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ve){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cv extends Il{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ll(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Oo=new L,Ka=new Ll,Za=new Ll,$a=new Ll;class Pv extends Dn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Oo.subVectors(s[0],s[1]).add(s[0]),l=Oo);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Oo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Oo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),x=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Ka.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,x,m),Za.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,x,m),$a.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(Ka.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Za.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),$a.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Ka.calc(c),Za.calc(c),$a.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function hh(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Iv(i,e){const t=1-i;return t*t*e}function Lv(i,e){return 2*(1-i)*i*e}function Dv(i,e){return i*i*e}function Ir(i,e,t,n){return Iv(i,e)+Lv(i,t)+Dv(i,n)}function Nv(i,e){const t=1-i;return t*t*t*e}function Uv(i,e){const t=1-i;return 3*t*t*i*e}function Fv(i,e){return 3*(1-i)*i*i*e}function Ov(i,e){return i*i*i*e}function Lr(i,e,t,n,s){return Nv(i,e)+Uv(i,t)+Fv(i,n)+Ov(i,s)}class Yf extends Dn{constructor(e=new ve,t=new ve,n=new ve,s=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ve){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,s.x,r.x,o.x,a.x),Lr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class zv extends Dn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,s.x,r.x,o.x,a.x),Lr(e,s.y,r.y,o.y,a.y),Lr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kf extends Dn{constructor(e=new ve,t=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ve){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bv extends Dn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zf extends Dn{constructor(e=new ve,t=new ve,n=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ve){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kv extends Dn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y),Ir(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $f extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ve){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(hh(a,c.x,l.x,u.x,h.x),hh(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ve().fromArray(s))}return this}}var $c=Object.freeze({__proto__:null,ArcCurve:Cv,CatmullRomCurve3:Pv,CubicBezierCurve:Yf,CubicBezierCurve3:zv,EllipseCurve:Il,LineCurve:Kf,LineCurve3:Bv,QuadraticBezierCurve:Zf,QuadraticBezierCurve3:kv,SplineCurve:$f});class Hv extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $c[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new $c[s.type]().fromJSON(s))}return this}}class fh extends Hv{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Kf(this.currentPoint.clone(),new ve(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Zf(this.currentPoint.clone(),new ve(e,t),new ve(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new Yf(this.currentPoint.clone(),new ve(e,t),new ve(n,s),new ve(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new $f(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new Il(e,t,n,s,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Rs extends lt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new L,u=new ve;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new vt(o,3)),this.setAttribute("normal",new vt(a,3)),this.setAttribute("uv",new vt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class en extends lt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const x=[],m=n/2;let p=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new vt(h,3)),this.setAttribute("normal",new vt(f,3)),this.setAttribute("uv",new vt(d,2));function v(){const _=new L,C=new L;let E=0;const A=(t-e)/n;for(let R=0;R<=r;R++){const b=[],S=R/r,P=S*(t-e)+e;for(let k=0;k<=s;k++){const B=k/s,W=B*c+a,J=Math.sin(W),X=Math.cos(W);C.x=P*J,C.y=-S*n+m,C.z=P*X,h.push(C.x,C.y,C.z),_.set(J,A,X).normalize(),f.push(_.x,_.y,_.z),d.push(B,1-S),b.push(g++)}x.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){const S=x[b][R],P=x[b+1][R],k=x[b+1][R+1],B=x[b][R+1];(e>0||b!==0)&&(u.push(S,P,B),E+=3),(t>0||b!==r-1)&&(u.push(P,k,B),E+=3)}l.addGroup(p,E,0),p+=E}function y(_){const C=g,E=new ve,A=new L;let R=0;const b=_===!0?e:t,S=_===!0?1:-1;for(let k=1;k<=s;k++)h.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;const P=g;for(let k=0;k<=s;k++){const W=k/s*c+a,J=Math.cos(W),X=Math.sin(W);A.x=b*X,A.y=m*S,A.z=b*J,h.push(A.x,A.y,A.z),f.push(0,S,0),E.x=J*.5+.5,E.y=X*.5*S+.5,d.push(E.x,E.y),g++}for(let k=0;k<s;k++){const B=C+k,W=P+k;_===!0?u.push(W,W+1,B):u.push(W+1,W,B),R+=3}l.addGroup(p,R,_===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cs extends en{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Cs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dl extends lt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new vt(r,3)),this.setAttribute("normal",new vt(r.slice(),3)),this.setAttribute("uv",new vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new L,_=new L,C=new L;for(let E=0;E<t.length;E+=3)d(t[E+0],y),d(t[E+1],_),d(t[E+2],C),c(y,_,C,v)}function c(v,y,_,C){const E=C+1,A=[];for(let R=0;R<=E;R++){A[R]=[];const b=v.clone().lerp(_,R/E),S=y.clone().lerp(_,R/E),P=E-R;for(let k=0;k<=P;k++)k===0&&R===E?A[R][k]=b:A[R][k]=b.clone().lerp(S,k/P)}for(let R=0;R<E;R++)for(let b=0;b<2*(E-R)-1;b++){const S=Math.floor(b/2);b%2===0?(f(A[R][S+1]),f(A[R+1][S]),f(A[R][S])):(f(A[R][S+1]),f(A[R+1][S+1]),f(A[R+1][S]))}}function l(v){const y=new L;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(v),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function u(){const v=new L;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const _=m(v)/2/Math.PI+.5,C=p(v)/Math.PI+.5;o.push(_,1-C)}g(),h()}function h(){for(let v=0;v<o.length;v+=6){const y=o[v+0],_=o[v+2],C=o[v+4],E=Math.max(y,_,C),A=Math.min(y,_,C);E>.9&&A<.1&&(y<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),C<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,y){const _=v*3;y.x=e[_+0],y.y=e[_+1],y.z=e[_+2]}function g(){const v=new L,y=new L,_=new L,C=new L,E=new ve,A=new ve,R=new ve;for(let b=0,S=0;b<r.length;b+=9,S+=6){v.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),E.set(o[S+0],o[S+1]),A.set(o[S+2],o[S+3]),R.set(o[S+4],o[S+5]),C.copy(v).add(y).add(_).divideScalar(3);const P=m(C);x(E,S+0,v,P),x(A,S+2,y,P),x(R,S+4,_,P)}}function x(v,y,_,C){C<0&&v.x===1&&(o[y]=v.x-1),_.x===0&&_.z===0&&(o[y]=C/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dl(e.vertices,e.indices,e.radius,e.details)}}class Nl extends Dl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Nl(e.radius,e.detail)}}class Jf extends fh{constructor(e){super(e),this.uuid=_n(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new fh().fromJSON(s))}return this}}const Gv={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=jf(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,h,f,d;if(n&&(r=Yv(i,e,r,t)),i.length>80*t){a=l=i[0],c=u=i[1];for(let g=t;g<s;g+=t)h=i[g],f=i[g+1],h<a&&(a=h),f<c&&(c=f),h>l&&(l=h),f>u&&(u=f);d=Math.max(l-a,u-c),d=d!==0?32767/d:0}return Vr(r,o,t,a,c,d,0),o}};function jf(i,e,t,n,s){let r,o;if(s===sy(i,e,t,n)>0)for(r=e;r<t;r+=n)o=dh(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=dh(r,i[r],i[r+1],o);return o&&fa(o,o.next)&&(Xr(o),o=o.next),o}function Wi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(fa(t,t.next)||Et(t.prev,t,t.next)===0)){if(Xr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Vr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&jv(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Wv(i,n,s,r):Vv(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Xr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Xv(Wi(i),e,t),Vr(i,e,t,n,s,r,2)):o===2&&qv(i,e,t,n,s,r):Vr(Wi(i),e,t,n,s,r,1);break}}}function Vv(i){const e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,h=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Ms(s,a,r,c,o,l,g.x,g.y)&&Et(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Wv(i,e,t,n){const s=i.prev,r=i,o=i.next;if(Et(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=u<h?u<f?u:f:h<f?h:f,x=a>c?a>l?a:l:c>l?c:l,m=u>h?u>f?u:f:h>f?h:f,p=Jc(d,g,e,t,n),v=Jc(x,m,e,t,n);let y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=v;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Ms(a,u,c,h,l,f,y.x,y.y)&&Et(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Ms(a,u,c,h,l,f,_.x,_.y)&&Et(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Ms(a,u,c,h,l,f,y.x,y.y)&&Et(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Ms(a,u,c,h,l,f,_.x,_.y)&&Et(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Xv(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!fa(s,r)&&Qf(s,n,n.next,r)&&Wr(s,r)&&Wr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Xr(n),Xr(n.next),n=i=r),n=n.next}while(n!==i);return Wi(n)}function qv(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ty(o,a)){let c=ed(o,a);o=Wi(o,o.next),c=Wi(c,c.next),Vr(o,e,t,n,s,r,0),Vr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Yv(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=jf(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(ey(l));for(s.sort(Kv),r=0;r<s.length;r++)t=Zv(s[r],t);return t}function Kv(i,e){return i.x-e.x}function Zv(i,e){const t=$v(i,e);if(!t)return e;const n=ed(t,i);return Wi(n,n.next),Wi(t,t.next)}function $v(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>n&&(n=f,s=t.x<t.next.x?t:t.next,f===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let u=1/0,h;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Ms(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Wr(t,i)&&(h<u||h===u&&(t.x>s.x||t.x===s.x&&Jv(s,t)))&&(s=t,u=h)),t=t.next;while(t!==a);return s}function Jv(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function jv(i,e,t,n){let s=i;do s.z===0&&(s.z=Jc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Qv(s)}function Qv(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Jc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ey(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ms(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function ty(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ny(i,e)&&(Wr(i,e)&&Wr(e,i)&&iy(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||fa(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function fa(i,e){return i.x===e.x&&i.y===e.y}function Qf(i,e,t,n){const s=Bo(Et(i,e,t)),r=Bo(Et(i,e,n)),o=Bo(Et(t,n,i)),a=Bo(Et(t,n,e));return!!(s!==r&&o!==a||s===0&&zo(i,t,e)||r===0&&zo(i,n,e)||o===0&&zo(t,i,n)||a===0&&zo(t,e,n))}function zo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Bo(i){return i>0?1:i<0?-1:0}function ny(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Qf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Wr(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function iy(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function ed(i,e){const t=new jc(i.i,i.x,i.y),n=new jc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function dh(i,e,t,n){const s=new jc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Xr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function jc(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function sy(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Dr{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Dr.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];ph(e),mh(n,e);let o=e.length;t.forEach(ph);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,mh(n,t[c]);const a=Gv.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function ph(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function mh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ul extends lt{constructor(e=new Jf([new ve(.5,.5),new ve(-.5,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new vt(s,3)),this.setAttribute("uv",new vt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:ry;let y,_=!1,C,E,A,R;p&&(y=p.getSpacedPoints(u),_=!0,f=!1,C=p.computeFrenetFrames(u,!1),E=new L,A=new L,R=new L),f||(m=0,d=0,g=0,x=0);const b=a.extractPoints(l);let S=b.shape;const P=b.holes;if(!Dr.isClockWise(S)){S=S.reverse();for(let ce=0,ge=P.length;ce<ge;ce++){const I=P[ce];Dr.isClockWise(I)&&(P[ce]=I.reverse())}}const B=Dr.triangulateShape(S,P),W=S;for(let ce=0,ge=P.length;ce<ge;ce++){const I=P[ce];S=S.concat(I)}function J(ce,ge,I){return ge||console.error("THREE.ExtrudeGeometry: vec does not exist"),ce.clone().addScaledVector(ge,I)}const X=S.length,oe=B.length;function U(ce,ge,I){let Fe,ue,Pe;const we=ce.x-ge.x,We=ce.y-ge.y,Te=I.x-ce.x,w=I.y-ce.y,M=we*we+We*We,F=we*w-We*Te;if(Math.abs(F)>Number.EPSILON){const H=Math.sqrt(M),ne=Math.sqrt(Te*Te+w*w),j=ge.x-We/H,Re=ge.y+we/H,Me=I.x-w/ne,Ce=I.y+Te/ne,q=((Me-j)*w-(Ce-Re)*Te)/(we*w-We*Te);Fe=j+we*q-ce.x,ue=Re+We*q-ce.y;const N=Fe*Fe+ue*ue;if(N<=2)return new ve(Fe,ue);Pe=Math.sqrt(N/2)}else{let H=!1;we>Number.EPSILON?Te>Number.EPSILON&&(H=!0):we<-Number.EPSILON?Te<-Number.EPSILON&&(H=!0):Math.sign(We)===Math.sign(w)&&(H=!0),H?(Fe=-We,ue=we,Pe=Math.sqrt(M)):(Fe=we,ue=We,Pe=Math.sqrt(M/2))}return new ve(Fe/Pe,ue/Pe)}const se=[];for(let ce=0,ge=W.length,I=ge-1,Fe=ce+1;ce<ge;ce++,I++,Fe++)I===ge&&(I=0),Fe===ge&&(Fe=0),se[ce]=U(W[ce],W[I],W[Fe]);const ie=[];let Z,Ae=se.concat();for(let ce=0,ge=P.length;ce<ge;ce++){const I=P[ce];Z=[];for(let Fe=0,ue=I.length,Pe=ue-1,we=Fe+1;Fe<ue;Fe++,Pe++,we++)Pe===ue&&(Pe=0),we===ue&&(we=0),Z[Fe]=U(I[Fe],I[Pe],I[we]);ie.push(Z),Ae=Ae.concat(Z)}for(let ce=0;ce<m;ce++){const ge=ce/m,I=d*Math.cos(ge*Math.PI/2),Fe=g*Math.sin(ge*Math.PI/2)+x;for(let ue=0,Pe=W.length;ue<Pe;ue++){const we=J(W[ue],se[ue],Fe);ye(we.x,we.y,-I)}for(let ue=0,Pe=P.length;ue<Pe;ue++){const we=P[ue];Z=ie[ue];for(let We=0,Te=we.length;We<Te;We++){const w=J(we[We],Z[We],Fe);ye(w.x,w.y,-I)}}}const le=g+x;for(let ce=0;ce<X;ce++){const ge=f?J(S[ce],Ae[ce],le):S[ce];_?(A.copy(C.normals[0]).multiplyScalar(ge.x),E.copy(C.binormals[0]).multiplyScalar(ge.y),R.copy(y[0]).add(A).add(E),ye(R.x,R.y,R.z)):ye(ge.x,ge.y,0)}for(let ce=1;ce<=u;ce++)for(let ge=0;ge<X;ge++){const I=f?J(S[ge],Ae[ge],le):S[ge];_?(A.copy(C.normals[ce]).multiplyScalar(I.x),E.copy(C.binormals[ce]).multiplyScalar(I.y),R.copy(y[ce]).add(A).add(E),ye(R.x,R.y,R.z)):ye(I.x,I.y,h/u*ce)}for(let ce=m-1;ce>=0;ce--){const ge=ce/m,I=d*Math.cos(ge*Math.PI/2),Fe=g*Math.sin(ge*Math.PI/2)+x;for(let ue=0,Pe=W.length;ue<Pe;ue++){const we=J(W[ue],se[ue],Fe);ye(we.x,we.y,h+I)}for(let ue=0,Pe=P.length;ue<Pe;ue++){const we=P[ue];Z=ie[ue];for(let We=0,Te=we.length;We<Te;We++){const w=J(we[We],Z[We],Fe);_?ye(w.x,w.y+y[u-1].y,y[u-1].x+I):ye(w.x,w.y,h+I)}}}te(),fe();function te(){const ce=s.length/3;if(f){let ge=0,I=X*ge;for(let Fe=0;Fe<oe;Fe++){const ue=B[Fe];Oe(ue[2]+I,ue[1]+I,ue[0]+I)}ge=u+m*2,I=X*ge;for(let Fe=0;Fe<oe;Fe++){const ue=B[Fe];Oe(ue[0]+I,ue[1]+I,ue[2]+I)}}else{for(let ge=0;ge<oe;ge++){const I=B[ge];Oe(I[2],I[1],I[0])}for(let ge=0;ge<oe;ge++){const I=B[ge];Oe(I[0]+X*u,I[1]+X*u,I[2]+X*u)}}n.addGroup(ce,s.length/3-ce,0)}function fe(){const ce=s.length/3;let ge=0;Ee(W,ge),ge+=W.length;for(let I=0,Fe=P.length;I<Fe;I++){const ue=P[I];Ee(ue,ge),ge+=ue.length}n.addGroup(ce,s.length/3-ce,1)}function Ee(ce,ge){let I=ce.length;for(;--I>=0;){const Fe=I;let ue=I-1;ue<0&&(ue=ce.length-1);for(let Pe=0,we=u+m*2;Pe<we;Pe++){const We=X*Pe,Te=X*(Pe+1),w=ge+Fe+We,M=ge+ue+We,F=ge+ue+Te,H=ge+Fe+Te;Xe(w,M,F,H)}}}function ye(ce,ge,I){c.push(ce),c.push(ge),c.push(I)}function Oe(ce,ge,I){Ue(ce),Ue(ge),Ue(I);const Fe=s.length/3,ue=v.generateTopUV(n,s,Fe-3,Fe-2,Fe-1);$e(ue[0]),$e(ue[1]),$e(ue[2])}function Xe(ce,ge,I,Fe){Ue(ce),Ue(ge),Ue(Fe),Ue(ge),Ue(I),Ue(Fe);const ue=s.length/3,Pe=v.generateSideWallUV(n,s,ue-6,ue-3,ue-2,ue-1);$e(Pe[0]),$e(Pe[1]),$e(Pe[3]),$e(Pe[1]),$e(Pe[2]),$e(Pe[3])}function Ue(ce){s.push(c[ce*3+0]),s.push(c[ce*3+1]),s.push(c[ce*3+2])}function $e(ce){r.push(ce.x),r.push(ce.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return oy(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new $c[s.type]().fromJSON(s)),new Ul(n,e.options)}}const ry={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new ve(r,o),new ve(a,c),new ve(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[s*3],d=e[s*3+1],g=e[s*3+2],x=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new ve(o,1-c),new ve(l,1-h),new ve(f,1-g),new ve(x,1-p)]:[new ve(a,1-c),new ve(u,1-h),new ve(d,1-g),new ve(m,1-p)]}};function oy(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class to extends lt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,f=new L,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let _=0;p===0&&o===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let C=0;C<=t;C++){const E=C/t;h.x=-e*Math.cos(s+E*r)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(s+E*r)*Math.sin(o+y*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(E+_,1-y),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const y=u[p][v+1],_=u[p][v],C=u[p+1][v],E=u[p+1][v+1];(p!==0||o>0)&&d.push(y,_,E),(p!==n-1||c<Math.PI)&&d.push(_,C,E)}this.setIndex(d),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(x,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new to(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class si extends lt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new L,h=new L,f=new L;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const x=g/s*r,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const x=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,v=(s+1)*d+g;o.push(x,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new vt(a,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class qt extends Tn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bf,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nn extends qt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ko(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ay(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function cy(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function gh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function td(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class no{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ly extends no{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jl,endingEnd:jl}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ql:r=e,a=2*t-n;break;case eu:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ql:o=e,c=2*n-t;break;case eu:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,v=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*x+.5*g,_=d*m-d*x;for(let C=0;C!==a;++C)r[C]=p*o[u+C]+v*o[l+C]+y*o[c+C]+_*o[h+C];return r}}class uy extends no{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}}class hy extends no{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Un{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ko(t,this.TimeBufferType),this.values=ko(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ko(e.times,Array),values:ko(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new hy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new uy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ly(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Br:t=this.InterpolantFactoryMethodDiscrete;break;case kr:t=this.InterpolantFactoryMethodLinear;break;case ga:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return ga}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&ay(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ga,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const x=t[h+g];if(x!==t[f+g]||x!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=kr;class $s extends Un{constructor(e,t,n){super(e,t,n)}}$s.prototype.ValueTypeName="bool";$s.prototype.ValueBufferType=Array;$s.prototype.DefaultInterpolation=Br;$s.prototype.InterpolantFactoryMethodLinear=void 0;$s.prototype.InterpolantFactoryMethodSmooth=void 0;class nd extends Un{}nd.prototype.ValueTypeName="color";class Hs extends Un{}Hs.prototype.ValueTypeName="number";class fy extends no{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let u=l+a;l!==u;l+=4)oi.slerpFlat(r,0,o,l-a,o,l,c);return r}}class Gs extends Un{InterpolantFactoryMethodLinear(e){return new fy(this.times,this.values,this.getValueSize(),e)}}Gs.prototype.ValueTypeName="quaternion";Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class Js extends Un{constructor(e,t,n){super(e,t,n)}}Js.prototype.ValueTypeName="string";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=Br;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class Vs extends Un{}Vs.prototype.ValueTypeName="vector";class dy{constructor(e="",t=-1,n=[],s=Up){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=_n(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(my(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Un.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=cy(c);c=gh(c,1,u),l=gh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Hs(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=s[h];f||(s[h]=f=[]),f.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,x){if(d.length!==0){const m=[],p=[];td(d,m,p,g),m.length!==0&&x.push(new h(f,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)d[f[g].morphTargets[x]]=-1;for(const x in d){const m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){const y=f[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}s.push(new Hs(".morphTargetInfluence["+x+"]",m,p))}c=d.length*o}else{const d=".bones["+t[h].name+"]";n(Vs,d+".position",f,"pos",s),n(Gs,d+".quaternion",f,"rot",s),n(Vs,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function py(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hs;case"vector":case"vector2":case"vector3":case"vector4":return Vs;case"color":return nd;case"quaternion":return Gs;case"bool":case"boolean":return $s;case"string":return Js}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function my(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=py(i.type);if(i.times===void 0){const t=[],n=[];td(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Mi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class gy{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const xy=new gy;class js{constructor(e){this.manager=e!==void 0?e:xy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}js.DEFAULT_MATERIAL_NAME="__DEFAULT";const Xn={};class _y extends Error{constructor(e,t){super(e),this.response=t}}class id extends js{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Mi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Xn[e]!==void 0){Xn[e].push({onLoad:t,onProgress:n,onError:s});return}Xn[e]=[],Xn[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Xn[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let x=0;const m=new ReadableStream({start(p){v();function v(){h.read().then(({done:y,value:_})=>{if(y)p.close();else{x+=_.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let E=0,A=u.length;E<A;E++){const R=u[E];R.onProgress&&R.onProgress(C)}p.enqueue(_),v()}},y=>{p.error(y)})}}});return new Response(m)}else throw new _y(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{Mi.add(e,l);const u=Xn[e];delete Xn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=Xn[e];if(u===void 0)throw this.manager.itemError(e),l;delete Xn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class vy extends js{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Mi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Hr("img");function c(){u(),Mi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class yy extends js{constructor(e){super(e)}load(e,t,n,s){const r=new Ct,o=new vy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class io extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class My extends io{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ja=new qe,xh=new L,_h=new L;class Fl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wl,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),_h.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_h),t.updateMatrixWorld(),Ja.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sy extends Fl{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Bs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class by extends io{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Sy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const vh=new qe,pr=new L,ja=new L;class wy extends Fl{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),pr.setFromMatrixPosition(e.matrixWorld),n.position.copy(pr),ja.copy(n.position),ja.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ja),n.updateMatrixWorld(),s.makeTranslation(-pr.x,-pr.y,-pr.z),vh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vh)}}class Ey extends io{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new wy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ty extends Fl{constructor(){super(new El(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sd extends io{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Ty}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ay extends io{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Nr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ry extends js{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Mi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Mi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Mi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Mi.add(e,c),r.manager.itemStart(e)}}const Ol="\\[\\]\\.:\\/",Cy=new RegExp("["+Ol+"]","g"),zl="[^"+Ol+"]",Py="[^"+Ol.replace("\\.","")+"]",Iy=/((?:WC+[\/:])*)/.source.replace("WC",zl),Ly=/(WCOD+)?/.source.replace("WCOD",Py),Dy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zl),Ny=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zl),Uy=new RegExp("^"+Iy+Ly+Dy+Ny+"$"),Fy=["material","materials","bones","map"];class Oy{constructor(e,t,n){const s=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ht{constructor(e,t,n){this.path=t,this.parsedPath=n||ht.parseTrackName(t),this.node=ht.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ht.Composite(e,t,n):new ht(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Cy,"")}static parseTrackName(e){const t=Uy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Fy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ht.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ht.Composite=Oy;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const yh=new qe;class zy{constructor(e,t,n=0,s=1/0){this.ray=new eo(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new bl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yh),this}intersectObject(e,t=!0,n=[]){return Qc(e,this,n,t),n.sort(Mh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Qc(e[s],this,n,t);return n.sort(Mh),n}}function Mh(i,e){return i.distance-e.distance}function Qc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Qc(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pl);function By(i,e,t){return{x:(i-t.left)/t.width*2-1,y:-((e-t.top)/t.height)*2+1}}const ky=1.42,rd=44,Bl=32,mr=92,el={hq:1.05,barracks:1.55},od=1.05;function ad(i,e,t){return t!=="siege"?i:i+(e==="player"?.85:-.85)}const Hy={hq:2.05,barracks:.78},Gy={hq:2.55,barracks:1.2},gs=new L,Jn={x:0,y:0};function ta(i,e,t,n,s,r,o){return gs.set(i,e,t),gs.project(n),gs.z<-1||gs.z>1?!1:(o.x=(gs.x*.5+.5)*s,o.y=(-gs.y*.5+.5)*r,!0)}function Vy(i,e){return e<=rd&&e<i}const pn=[];function Wy(i){let e=pn[i];return e||(e={px:0,py:0,squad:0,ok:0},pn[i]=e),e}function cd(i,e,t,n,s,r){const o=e|0;for(let l=0;l<o;l++){const u=i[l],h=Wy(l);h.squad=u.squad?1:0,h.ok=0,ta(u.x,u.y,u.z,t,n,s,Jn)&&(h.ok=1,h.px=Jn.x,h.py=Jn.y-Bl,h.ox=h.px,h.oy=h.py)}const a=36,c=l=>{n>a*2&&(l.px=Math.min(n-a,Math.max(a,l.px))),s>a*2&&(l.py=Math.min(s-a,Math.max(a,l.py)))};for(let l=0;l<8;l++)for(let u=0;u<o;u++){const h=pn[u];if(h.ok)for(let f=u+1;f<o;f++){const d=pn[f];if(!d.ok)continue;let g=d.px-h.px,x=d.py-h.py,m=Math.hypot(g,x);if(m>=mr)continue;m<.01&&(g=0,x=1,m=1);const p=(mr-m)/m,v=g*p,y=x*p;if(h.squad!==d.squad){const _=h.squad?h:d,C=h.squad?d:h;if(Math.abs(x)>=Math.abs(g)){const E=_.px-C.px,A=_.py-C.py;let R=Math.abs(E)<1?1:Math.sign(E);const S=Math.sqrt(Math.max(0,mr*mr-A*A))-Math.abs(E);if(S>0){const P=_.px+R*S;n>a*2&&(P<a||P>n-a)&&(R=-R),_.px+=R*S}}else h.squad?(h.px-=v,h.py-=y):(d.px+=v,d.py+=y);c(_)}else h.px-=v*.5,h.py-=y*.5,d.px+=v*.5,d.py+=y*.5,c(h),c(d)}}for(let l=0;l<o;l++){const u=pn[l];if(!u.ok||!u.squad)continue;let h=1/0;for(let x=0;x<o;x++)l===x||!pn[x].ok||(h=Math.min(h,Math.hypot(u.px-pn[x].px,u.py-pn[x].py)));if(h>=mr-1)continue;let f=u.px,d=u.py,g=h;for(let x=1;x<=5;x++){const m=24*x;for(let p=0;p<12;p++){const v=p/12*Math.PI*2;let y=u.ox+Math.cos(v)*m,_=u.oy+Math.sin(v)*m;n>a*2&&(y=Math.min(n-a,Math.max(a,y))),s>a*2&&(_=Math.min(s-a,Math.max(a,_)));let C=1/0;for(let E=0;E<o;E++)l===E||!pn[E].ok||(C=Math.min(C,Math.hypot(y-pn[E].px,_-pn[E].py)));C>g&&(g=C,f=y,d=_)}}u.px=f,u.py=d}for(let l=0;l<o;l++){const u=pn[l],h=r[l];h.px=u.px,h.py=u.py,h.ok=u.ok}return o}const tl=[],Ur=[];function Xy(i){let e=tl[i];return e||(e={x:0,y:0,z:0,squad:0},tl[i]=e),e}function qy(i){let e=Ur[i];return e||(e={px:0,py:0,ok:0},Ur[i]=e),e}function Yy(i,e,t,n,s,r,o){let a=null,c=1/0,l=null,u=ky,h=null,f=1/0;const d=t>=1&&n>=1&&e;if(d){for(let g=0;g<i.length;g++){const x=i[g],m=x.kind==="squad",p=x.kind==="hq"?"hq":"barracks",v=Xy(g);v.x=x.x,v.y=m?od:el[p],v.z=x.z,v.squad=m?1:0,qy(g)}cd(tl,i.length,e,t,n,Ur)}for(let g=0;g<i.length;g++){const x=i[g],m=x.kind==="squad",p=x.kind==="hq"?"hq":"barracks";let v=1/0,y=1/0;if(d&&Ur[g].ok){const _=Ur[g],C=Math.hypot(s-_.px,r-_.py);if(y=C,C<v&&(v=C),!m){const E=Math.hypot(s-_.px,r-(_.py+Bl));E<v&&(v=E)}if(!m&&ta(x.x,Hy[p],x.z,e,t,n,Jn)){const E=Math.hypot(s-Jn.x,r-Jn.y);E<v&&(v=E)}if(!m&&ta(x.x,Gy[p],x.z,e,t,n,Jn)){const E=Math.hypot(s-Jn.x,r-Jn.y);E<v&&(v=E)}Vy(c,v)&&(c=v,a=x),m&&y<=rd&&y<f&&(h=x,f=y)}if(o){const _=Math.hypot(x.x-o.x,x.z-o.z);_<u&&(u=_,l=x)}}return a&&a.kind!=="squad"&&h&&f<c&&(a=h),a||l}const Ky='<svg viewBox="0 0 16 12" aria-hidden="true"><path fill="currentColor" d="M0 5.1h2.4l.5 2.6H1zM2.2 4.2h6.4v1.8H2.2zM8.4 3.3h6.4v1.5H8.4zM6 6h1.3v3.4H6z"/></svg>',Zy='<svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M6 .4l4.6 2.6v1.6H1.4V3zM2.2 5.6h7.6V11H2.2z"/></svg>';function $y(i){const e=new Map,t={x:0,y:0},n=new Set,s=[],r=["","快","固","快固"],o=[],a=[],c=[];let l=Is;function u(m){let p=o[m];return p||(p={x:0,y:0,z:0,squad:0},o[m]=p,a[m]={px:0,py:0,ok:0}),p}function h(m){let p=e.get(m);return p||(p=document.createElement("div"),p.className="badge",p.innerHTML='<span class="mark" aria-hidden="true"></span><span class="tag"></span><b class="num"></b><i class="sub"></i>',i.appendChild(p),e.set(m,p)),p}function f(m,p){const v=m.querySelector(".mark");!v||v.dataset.kind===p||(v.dataset.kind=p,v.innerHTML=p==="squad"?Ky:Zy)}function d(m,p,v){const y=m.querySelector(p);y.textContent!==v&&(y.textContent=v)}function g(m,p){if(!p||!p.ok){m.hidden=!0;return}m.hidden=!1;const v=p.py+Bl;m.style.transform=`translate(${p.px}px, ${v}px) translate(-50%, -139%)`}function x(m,p,v){const y=m.squads;for(let _=0;_<y.length;_++){const C=y[_];if(C.mode==="siege"&&C.targetId===p&&C.owner!==v&&C.count>0)return!0}return!1}return{setMap(m){l=m&&m.nodes||Is},update(m,p,v){const y=v.clientWidth||1,_=v.clientHeight||1,C=m&&m.nodes||l;n.clear();let E=0;for(let A=0;A<m.buildings.length;A++){const R=m.buildings[A];n.add(R.id);const b=h(R.id);b.classList.toggle("player",R.owner==="player"),b.classList.toggle("enemy",R.owner==="enemy"),b.classList.toggle("squad",!1),b.classList.toggle("hq",R.kind==="hq"),f(b,"camp");const S=sp(R);if(b.classList.toggle("can-up",S),S){const U=Ls(R,"haste"),se=Ls(R,"bulwark"),ie=U.ok?U:se;b.dataset.cost=ie&&ie.cost?` ${ie.cost}`:""}else b.dataset.cost&&(b.dataset.cost="");const P=R.kind==="hq"?"司令部":"兵營";d(b,".tag",P),d(b,".num",String(Math.max(0,Math.floor(R.count))));const k=R.upgrades,B=(k&&k.haste>0?1:0)+(k&&k.bulwark>0?2:0),W=r[B];let J="";R.capture>.02?J="佔領中":R.kind==="hq"&&(R.count<=0||x(m,R.id,R.owner))?J="危":W?J=W:R.count>=R.cap&&(J="滿"),d(b,".sub",J),b.classList.toggle("is-danger",J==="危");const X=C[R.node];if(!X){b.hidden=!0;continue}const oe=u(E);oe.x=X.x,oe.y=el[R.kind]||el.barracks,oe.z=X.z,oe.squad=0,c[E]=b,E+=1}for(let A=0;A<m.squads.length;A++){const R=m.squads[A];if(R.count<=0)continue;n.add(R.id);const b=h(R.id);b.classList.add("squad"),f(b,"squad"),b.classList.remove("hq"),b.classList.toggle("player",R.owner==="player"),b.classList.toggle("enemy",R.owner==="enemy"),b.classList.toggle("can-up",!1),b.classList.toggle("is-danger",!1),d(b,".tag",R.mode==="siege"?"攻城":"行軍"),d(b,".num",String(Math.max(0,Math.floor(R.count)))),d(b,".sub",R.mode==="fight"?"交戰":"");const S=u(E);S.x=ad(R.x,R.owner,R.mode),S.y=od,S.z=R.z,S.squad=1,c[E]=b,E+=1}cd(o,E,p,y,_,a);for(let A=0;A<E;A++)g(c[A],a[A]);s.length=0;for(const A of e.keys())n.has(A)||s.push(A);for(let A=0;A<s.length;A++)e.get(s[A]).remove(),e.delete(s[A])},clientPoint(m,p,v){const y=l[m];if(!y)return null;const _=v.getBoundingClientRect();return ta(y.x,.4,y.z,p,_.width,_.height,t)?{x:_.left+t.x,y:_.top+t.y}:null}}}function Xi(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new lt;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(t){let u=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=i[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Sh(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let x=0;x<o[u].length;++x)d.push(o[u][x][f]);const g=Sh(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Sh(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new Ke(o,t,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<t;g++){const x=u.getComponent(f,g);a.setComponent(f+h,g,x)}}else o.set(u.array,c);c+=u.count*t}return s!==void 0&&(a.gpuType=s),a}function bh(i,e){if(e===Fp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Xc||e===Sf){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Xc)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function qr(i,e){const t=Math.hypot(i,e);if(t<1e-8)return 0;const n=Math.atan2(-i/t,-e/t);return n===0?0:n}function Yr(i,e,t,n){const s=Math.cos(t),r=Math.sin(t);return n.x=i*s+e*r,n.z=-i*r+e*s,n}const Ne={sky:8366276,sand:9075292,meadow:7043662,meadowDeep:5925698,road:9272164,roadEdge:4866876,trunk:4864810,leaf:4151866,leafDeep:3097904,rock:7236195,stream:4091791,bridge:7238254,ink:1712672,concrete:8025452,metal:9344660,player:{main:3120731,deep:1796925,flag:4050554,slab:3824703,glow:4050554},enemy:{main:12860466,deep:9315356,flag:14832968,slab:6042930,glow:14832968}};function Cn(i){return i==="player"?Ne.player:Ne.enemy}const gr=480,ld=.48,Jy=.52,jy=4090674,Qy=8137250,Qa={x:0,z:0},wh=new L,Eh=new L;function eM(i){const e=Math.max(0,Math.floor(i));return e<=8?e:16}function tM(i,e,t){const n=Math.max(0,Math.floor(t||0));if(e<-5.2)return{x:i>=0?1.22:i,z:-4.25};if(e>-3.6){const s=i>.4?1:-1;return n>8?{x:s<0?-3.4:1.85,z:-4.25}:{x:s<0?-3.35:2.7,z:e<-1.6?-.7:-.45}}return{x:i,z:e}}function Fr(i,e,t,n=0){return i==="enemy"?tM(e,t,n):t<1.8&&t>-.5?{x:e-.4,z:t+1.55}:{x:e,z:t}}function nM(i,e,t){const n=Math.max(1,t),s=i==="enemy",r=s||n>22,o=r?s?n>=20?7:Math.min(n,6):n>=24?8:6:Math.min(4,n),a=r?s?.56:.62:.46,c=r?s?.86:.74:.4,l=Math.floor(e/o),u=e%o,h=Math.min(o,n-l*o),f=(u-(h-1)/2)*a,d=s||!r?-l*c:l*c;return{lx:f,lz:d,mass:r}}function ud(i,e,t,n,s){const r=nM(i,e,t),o=i==="enemy";return r.mass&&(t>22||o&&t>=20)?(s.x=r.lx,s.z=o?-r.lz:r.lz,s):Yr(r.lx,r.lz,n,s)}function hd(i,e){const t=Math.max(0,Math.floor(e));return t<=8?t:i==="enemy"?Math.min(32,Math.max(t,Math.round(t*2))):t<16?Math.min(22,Math.round(t*1.4)):Math.min(44,Math.round(t*2.3))}function Th(i,e){const t=i.clone(),n=t.getAttribute("color");if(!n)return t;const s=t.getAttribute("position"),r=new re(e),o=new re;for(let a=0;a<n.count;a++){if(o.setRGB(n.getX(a),n.getY(a),n.getZ(a)),o.r*.2126+o.g*.7152+o.b*.0722<.25)continue;o.multiply(r);const l=s?s.getY(a):.5;let u=.94+a%5*.02;l<.42?u*=.82:l>.8&&(u*=.88),o.multiplyScalar(u),n.setXYZ(a,o.r,o.g,o.b)}return n.needsUpdate=!0,t}function iM(i){return i>8?4:i>4?3:Math.max(1,i)}const xr={x:0,z:0};function sM(i,e,t,n,s){const r=Math.max(1,eM(s)),o=iM(r),c=(Math.ceil(r/o)-1)*Jy,l=Math.abs(n)-.72;let u=Math.max(.28,Math.min(c+.5,Math.max(.28,l))),h=e==="hq"?i==="player"?1.28:1.55:-1.9;const f=i==="player"?qr(0,-1):qr(0,1);let d=0;t>.4?d=1:t<-.4?d=-1:d=i==="player"?1:-1,e==="hq"?(u=Math.min(u,.15),Math.abs(t)<=.4&&(d=-d)):Math.abs(n)<2.4&&(u=-.45,h=-1.5),Yr(1,0,f,xr);const g=xr.x*d>=0?h:-h;return Yr(g,-u,f,xr),{x:t+xr.x,z:n+xr.z,yaw:f}}function rn(i,e){const t=i.getAttribute("position").count,n=new Float32Array(t*3);return n.fill(e),i.setAttribute("color",new Ke(n,3)),i}function xs(i,e,t,n){return new en(i,e,t,n)}function fn(i,e,t,n,s,r){return i.translate(-e,-t,-n),s&&i.rotateX(s),r&&i.rotateY(r),i.translate(e,t,n),i}function rM(i=0){const e=rn(xs(.04,.05,.46,6),.22);e.translate(-.07,.23,.02);const t=rn(xs(.04,.05,.46,6),.16);t.translate(.07,.23,-.02);const n=rn(xs(.19,.155,.48,8),.42);n.translate(0,.48,0);const s=rn(new en(.23,.2,.09,8),.38);s.scale(1.12,1,.78),s.translate(0,.7,0);const r=rn(xs(.034,.04,.3,6),.9);r.translate(-.25,.58,-.04);const o=rn(xs(.03,.034,.28,6),.26);o.translate(.25,.56,-.05);const a=rn(xs(.04,.044,.07,8),.55);a.translate(0,.75,0);const c=rn(new to(.15,12,6,0,Math.PI*2,0,Math.PI/2),1);c.scale(1,.35,1),c.translate(0,.78,-.01);const l=rn(new si(.14,.016,5,10),.88);l.rotateX(Math.PI/2),l.translate(0,.785,-.01);const u=rn(new en(.22,.22,.012,12),.72);u.translate(0,.772,-.02);const h=rn(new be(.04,.03,.5),.08);h.translate(.34,.5,-.36);const f=rn(new be(.048,.05,.09),.12);f.translate(.33,.46,-.08);const d=rn(new be(.12,.14,.07),.2);d.translate(0,.52,.12),i===1?(fn(e,-.07,.46,.02,1.25,.1),fn(t,.07,.46,-.02,-1.05,0),fn(r,-.25,.68,-.04,-.85,.25),fn(o,.25,.66,-.05,.45,-.35),fn(h,.34,.5,-.14,.12,-1.05),fn(n,0,.48,0,.18,.28)):i===2&&(fn(e,-.07,.46,.02,-1,0),fn(t,.07,.46,-.02,1.2,-.12),fn(r,-.25,.68,-.04,.9,-.2),fn(o,.25,.66,-.05,-.35,.4),fn(h,.34,.5,-.14,-.12,1),fn(n,0,.48,0,.22,-.42));const g=Xi([e,t,n,s,r,o,a,c,l,u,h,f,d]);return g.computeVertexNormals(),g}function Ah(i,e,t){const n=rM(t||0),s=n.getAttribute("color"),r=new Float32Array(s.count*3),o=new re(i),a=o.clone().multiplyScalar(.62),c=new re(5002050),l=new re(e),u=new re(3422768),h=new re(12888194),f=new re(2896686),d=new re;for(let g=0;g<s.count;g++){const x=s.getX(g);let m=o;x>=.95?m=c:x>=.85?m=l:x>=.7?m=u:x>=.5?m=h:x<=.14?m=f:(d.copy(a).lerp(o,Math.min(1,(x-.14)/.36)),m=d),r[g*3]=m.r,r[g*3+1]=m.g,r[g*3+2]=m.b}return n.setAttribute("color",new Ke(r,3)),n}let Rh=Is;const Ho=3;function oM(i){const e=new qt({color:16777215,vertexColors:!0,roughness:.74,metalness:.04}),t=[],n=[];for(let v=0;v<Ho;v++){const y=new Pr(Ah(3817520,jy,v),e,gr),_=new Pr(Ah(4208688,Qy,v),e,gr);y.castShadow=!0,_.castShadow=!0,y.receiveShadow=!1,_.receiveShadow=!1,y.frustumCulled=!1,_.frustumCulled=!1,y.count=0,_.count=0,t.push(y),n.push(_)}const s=new Rs(.42,14);s.rotateX(-Math.PI/2);const r=new Pr(s,new _t({color:1185295,transparent:!0,opacity:.28,depthWrite:!1}),gr);r.castShadow=!1,r.receiveShadow=!1,r.frustumCulled=!1,r.count=0,i.add(...t,...n,r);const o=new gt;let a=0;const c=new Map,l=new Map,u=[0,0,0],h=[0,0,0];let f=null,d=null,g=1;function x(v,y,_){if(Math.hypot(y,_)<.05)return c.get(v)||0;const C=qr(y,_);return c.set(v,C),C}function m(v,y,_,C,E,A,R,b,S){const P=v==="player"?t:n,k=v==="player"?u:h,B=S||0,W=P[B],J=k[B];if(J>=gr)return;const X=0;o.position.set(y,_,C),o.rotation.set(X*.4,E,X*.25),o.scale.setScalar(A*g),o.updateMatrix(),W.setMatrixAt(J,o.matrix),a<gr&&(o.position.y=.025,o.rotation.set(0,0,0),o.scale.set(A*g*1.05,1,A*g*.7),o.updateMatrix(),r.setMatrixAt(a,o.matrix),a+=1,o.rotation.set(0,E,0)),k[B]+=1,R&&(d=W,wh.set(0,0,-1).applyQuaternion(o.quaternion))}function p(v,y,_,C,E,A){const R=hd(v,E);if(R<=0)return;const b=v==="enemy";for(let S=0;S<R;S++){const P=A&&S===0;ud(v,S,R,C,Qa);const k=P?1:.96,B=b||P?C:C+(S%5-2)*.035,W=P?0:S%2+1;m(v,y+Qa.x,.02,_+Qa.z,B,ld*k,P,0,W)}}return{facingDot(){return f},setMap(v){Rh=v.nodes||Is,v.graph,c.clear(),l.clear()},update(v){for(let C=0;C<Ho;C++)u[C]=0,h[C]=0;a=0,d=null;let y=!1;const _=v&&v.nodes||Rh;for(let C=0;C<v.buildings.length;C++){const E=v.buildings[C];if(E.count<=0)continue;const A=_[E.node];if(!A)continue;const R=sM(E.owner,E.kind,A.x,A.z,E.count),b=Fr(E.owner,R.x,R.z,E.count);p(E.owner,b.x,b.z,R.yaw,E.count,!1)}for(let C=0;C<v.squads.length;C++){const E=v.squads[C];if(E.count<=0)continue;let A=0,R=0;if(E.mode==="march"&&E.seg<E.path.length-1){const W=_[E.path[E.seg+1]];W&&(A=W.x-E.x,R=W.z-E.z)}else if(E.path.length>1){const W=_[E.path[Math.max(0,E.seg-1)]];W&&(A=E.x-W.x,R=E.z-W.z)}const b=x(E.id,A,R),S=Fr(E.owner,E.x,E.z,E.count),P=S.x,k=S.z,B=!y&&E.mode==="march";if(p(E.owner,P,k,b,E.count,B),B){y=!0;const W=l.get(E.id);if(W&&d){const X=E.x-W.x,oe=E.z-W.z,U=Math.hypot(X,oe);U>.004&&(Eh.set(X/U,0,oe/U),f=wh.dot(Eh))}let J=l.get(E.id);J?(J.x=E.x,J.z=E.z):(J={x:E.x,z:E.z},l.set(E.id,J))}}for(let C=0;C<Ho;C++)t[C].count=u[C],n[C].count=h[C],t[C].instanceMatrix.needsUpdate=!0,n[C].instanceMatrix.needsUpdate=!0;r.count=a,r.instanceMatrix.needsUpdate=!0},useSoldier(v){const y=Th(v,2776114),_=Th(v,9313308),C=new qt({color:16777215,roughness:.78,metalness:.04,vertexColors:!0}),E=new qt({color:16777215,roughness:.78,metalness:.04,vertexColors:!0});for(let A=0;A<Ho;A++)t[A].geometry=y,n[A].geometry=_,t[A].material=C,n[A].material=E;r.visible=!0,g=1.4}}}const qn=640;function aM(i){const e=new Float32Array(qn*3),t=new Float32Array(qn*3),n=new Float32Array(qn*3);e.fill(0);for(let w=0;w<qn;w++)e[w*3+1]=-8;const s=new lt;s.setAttribute("position",new Ke(e,3)),s.setAttribute("color",new Ke(t,3));const r=new Pl({size:.3,vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1,depthTest:!0,sizeAttenuation:!0}),o=new qf(s,r);o.frustumCulled=!1,o.renderOrder=4,i.add(o);const a=24,c=new Float32Array(a*18),l=new Float32Array(a*18),u=new lt;u.setAttribute("position",new Ke(c,3)),u.setAttribute("color",new Ke(l,3)),u.setDrawRange(0,0);const h=new Ye(u,new _t({vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,blending:Es,side:At,toneMapped:!1}));h.frustumCulled=!1,h.renderOrder=5,i.add(h);const f=document.createElement("canvas");f.width=64,f.height=64;const d=f.getContext("2d"),g=d.createRadialGradient(32,32,2,32,32,30);g.addColorStop(0,"rgba(244, 240, 230, 0.95)"),g.addColorStop(1,"rgba(244, 240, 230, 0)"),d.fillStyle=g,d.fillRect(0,0,64,64);const x=new Oi({map:new Fo(f),transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1}),m=[0,1].map(()=>{const w=new ur(x);return w.scale.set(.16,.16,1),w.visible=!1,w.renderOrder=6,w.frustumCulled=!1,i.add(w),w});function p(w){const M=document.createElement("canvas");M.width=64,M.height=64;const F=M.getContext("2d"),H=F.createRadialGradient(32,32,0,32,32,31);for(let j=0;j<w.length;j++)H.addColorStop(w[j][0],w[j][1]);F.fillStyle=H,F.fillRect(0,0,64,64);const ne=new Fo(M);return ne.colorSpace=Rt,ne}const v=p([[0,"rgba(255, 252, 236, 1)"],[.16,"rgba(255, 244, 190, 0.95)"],[.42,"rgba(255, 186, 70, 0.45)"],[1,"rgba(255, 140, 40, 0)"]]),y=p([[0,"rgba(214, 198, 168, 0.55)"],[.45,"rgba(186, 170, 142, 0.22)"],[1,"rgba(160, 148, 124, 0)"]]),_=new Oi({map:v,color:16777215,transparent:!0,opacity:.9,depthWrite:!1,depthTest:!1,blending:Es,toneMapped:!1}),C=[0,1].map(()=>{const w=new ur(_);return w.scale.set(.2,.2,1),w.visible=!1,w.renderOrder=6,w.frustumCulled=!1,i.add(w),w}),E=new Oi({map:v,color:16777215,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,blending:Es,toneMapped:!1}),A=[0,1,2,3,4].map(()=>{const w=new ur(E);return w.scale.set(.34,.34,1),w.visible=!1,w.renderOrder=6,w.frustumCulled=!1,i.add(w),w}),R=new Oi({map:y,color:16777215,transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1,toneMapped:!1}),b=[0,1,2,3].map(()=>{const w=new ur(R);return w.scale.set(.22,.12,1),w.visible=!1,w.renderOrder=5,w.frustumCulled=!1,i.add(w),w}),S=document.createElement("canvas");S.width=64,S.height=64;const P=S.getContext("2d"),k=P.createRadialGradient(32,32,4,32,32,30);k.addColorStop(0,"rgba(70, 72, 68, 0.92)"),k.addColorStop(.4,"rgba(70, 72, 68, 0.62)"),k.addColorStop(1,"rgba(70, 72, 68, 0)"),P.fillStyle=k,P.fillRect(0,0,64,64);const B=new Oi({map:new Fo(S),transparent:!0,depthWrite:!1,depthTest:!1,opacity:.85,toneMapped:!1}),W=document.createElement("canvas");W.width=64,W.height=64;const J=W.getContext("2d"),X=J.createRadialGradient(32,30,4,32,30,31);X.addColorStop(0,"rgba(90, 92, 86, 1)"),X.addColorStop(.72,"rgba(90, 92, 86, 1)"),X.addColorStop(.9,"rgba(90, 92, 86, 0.65)"),X.addColorStop(1,"rgba(90, 92, 86, 0)"),J.fillStyle=X,J.fillRect(0,0,64,64);const oe=new Fo(W);oe.colorSpace=Rt;const U=new Oi({map:oe,transparent:!0,depthWrite:!1,depthTest:!1,opacity:1,toneMapped:!1}),se=[[.6,1.6,6],[1.5,2.5,-4.8],[-.88,2.62,-6.22],[6.6,2.3,2.4],[-6.8,2.5,-2.2]],ie=[[.85,1.05],[.7,.9],[.55,.78],[.7,.85],[.7,.85]],Z=se.map((w,M)=>{const F=new ur(M===2?U:B);return F.scale.set(ie[M][0],ie[M][1],1),F.position.set(w[0],w[1],w[2]),F.renderOrder=3,F.frustumCulled=!1,i.add(F),F}),Ae={x:-.024,y:.6,z:-.397},le=ld*1.4,te=new re(16774344),fe=new re(16765562),Ee=new Float32Array(qn),ye=new Float32Array(qn),Oe=new Float32Array(qn*3);let Xe=0,Ue=!0;const $e=new re(Ne.sand),ce=new re(12893876);new re(16052454);const ge=new re(16769162),I=new re(16742962),Fe={x:0,z:0},ue={x:0,z:0};function Pe(w,M){let F=0,H=w.owner==="player"?-1:1;if(w.path&&w.path.length>1&&M){const ne=M[w.path[Math.max(0,(w.seg||1)-1)]];ne&&(F=w.x-ne.x,H=w.z-ne.z)}return qr(F,H)}function we(w,M,F,H){Yr(Ae.x,Ae.z,H,Fe),w.position.set(M+Fe.x*le,.02+Ae.y*le,F+Fe.z*le),w.scale.set(.36,.36,1),w.visible=Ue}function We(w,M,F,H,ne){const j=Math.max(1,hd(w,M)),Re=[];Yr(0,-1,ne,ue);for(let q=0;q<j;q++){ud(w,q,j,ne,Fe);const N=Fe.x*ue.x+Fe.z*ue.z;Re.push({x:F+Fe.x,z:H+Fe.z,along:N})}Re.sort((q,N)=>N.along-q.along);const Me=Re[0],Ce=Re[Math.min(Re.length-1,Math.max(1,Math.floor(j/8)))];return Ce&&Ce!==Me?[Me,Ce]:[Me]}function Te(w,M,F,H,ne,j,Re,Me){const Ce=Xe;Xe=(Xe+1)%qn,Ee[Ce]=ne,ye[Ce]=ne;const q=Ce*3;e[q]=w,e[q+1]=M,e[q+2]=F,Oe[q]=j,Oe[q+1]=Re,Oe[q+2]=Me,n[q]=H.r,n[q+1]=H.g,n[q+2]=H.b,t[q]=H.r,t[q+1]=H.g,t[q+2]=H.b}return{setEnabled(w){Ue=!!w,o.visible=Ue,h.visible=Ue;for(let M=0;M<Z.length;M++)Z[M].visible=Ue;if(!Ue){m[0].visible=!1,m[1].visible=!1,C[0].visible=!1,C[1].visible=!1;for(let M=0;M<A.length;M++)A[M].visible=!1;for(let M=0;M<b.length;M++)b[M].visible=!1}},update(w,M){if(!Ue||!M)return;const F=M.squads||[];let H=64;const ne=Math.floor((M.t||0)*8);let j=!1,Re=0,Me=0;const Ce=M.nodes;for(let V=0;V<A.length;V++)A[V].visible=!1;for(let V=0;V<b.length;V++)b[V].visible=!1;for(let V=0;V<F.length&&H>0;V++){const G=F[V];if(!G||G.count<=0)continue;const ae=V*17%5*.05;if(G.mode==="march")Math.abs(G.z)>=1.2&&(Te(G.x+ae,.16,G.z-ae,$e,.8,0,.45,0),H-=1,H>0&&V%2===0&&(Te(G.x-ae,.22,G.z+.1,$e,.55,.2,.3,0),H-=1));else if(G.mode==="fight"||G.mode==="siege"){G.owner==="player"&&(j=!0);const _e=Fr(G.owner,G.x,G.z,G.count),D=(V+ne)%3-1,pe=Pe(G,Ce),K=We(G.owner,G.count,_e.x,_e.z,pe);for(let ee=0;ee<K.length&&Re<A.length-1;ee++)we(A[Re],K[ee].x,K[ee].z,pe),Re+=1;if(Me<b.length){const ee=b[Me];Me+=1;const me=G.owner==="player"&&Math.abs(G.z)<1.15,de=me?G.x:_e.x,ze=me?1.35:_e.z;ee.position.set(de+D*.1,.08,ze),ee.scale.set(.42,.28,1),ee.visible=Ue}if(G.mode==="siege"&&H>0&&(Te(G.x-.2,.85,G.z+.1,I,.55,.35,1.1,-.2),H-=1),G.mode==="siege"&&H>0&&(Te(G.x+.15,1.15,G.z,ce,.9,-.2,.8,.15),H-=1),G.mode==="siege"){const ee=(V*3+ne)%6;for(let me=0;me<4&&H>0;me++){const de=ee+me*1.5,ze=Math.cos(de),Je=Math.sin(de);Te(G.x+ze*.35,.65+me%3*.28,G.z+Je*.35,me%2?I:ge,.5,ze*1.5,1.7,Je*1.5),H-=1}}}}if(j){const V=A[A.length-1];V.position.set(1.69,.5,5.14),V.scale.set(.4,.4,1),V.visible=Ue}const q=M.nodes,N=M.buildings;if(q&&N)for(let V=0;V<N.length&&H>0;V++){const G=N[V];if(G.kind!=="hq"&&G.kind!=="barracks")continue;let ae=!1;for(let D=0;D<F.length;D++){const pe=F[D];pe.mode==="siege"&&pe.targetId===G.id&&pe.owner!==G.owner&&pe.count>0&&(ae=!0)}const _e=q[G.node];_e&&(ae&&H>0&&(Te(_e.x,1.35,_e.z,I,.5,V%2?.4:-.4,1.1,.1),H-=1),ae&&H>0&&(Te(_e.x+.2,1.7,_e.z-.1,ce,.8,.15,.7,0),H-=1),G.capture>.05&&H>0&&(Te(_e.x,.9,_e.z,ge,.35,0,1.4,0),H-=1),G.capture>.05&&H>0&&(Te(_e.x+.25,1.15,_e.z-.15,ge,.4,.8,1.6,-.4),H-=1),G.capture>.05&&H>0&&(Te(_e.x-.2,1.05,_e.z+.1,I,.35,-.7,1.5,.35),H-=1))}let Q=0;m[0].visible=!1,m[1].visible=!1,C[0].visible=!1,C[1].visible=!1;const xe=(typeof performance<"u"?performance.now():0)*.001;for(let V=0;V<Z.length;V++){const G=se[V],ae=V===2?.06:.18;Z[V].position.y=G[1]+Math.sin(xe*.35+V)*ae,Z[V].visible=Ue}for(let V=0;V<F.length;V++){const G=F[V];if(!(!G||G.count<=0))for(let ae=V+1;ae<F.length;ae++){const _e=F[ae];if(!_e||_e.count<=0||G.owner===_e.owner)continue;const D=_e.x-G.x,pe=_e.z-G.z,K=Math.hypot(D,pe);if(K>4.4||K<.12||Q>=a)continue;const ee=Fr(G.owner,G.x,G.z,G.count),me=Fr(_e.owner,_e.x,_e.z,_e.count);let de=me.x-ee.x,ze=me.z-ee.z,Je=Math.hypot(de,ze);Je<.2&&(de=D,ze=pe,Je=K);const ft=Math.min(.55,Je*.35),tt=Math.min(.022,ft*.05),St=1/Je,dt=-ze*St*tt,Lt=de*St*tt,Dt=.5,Ht=ee.x,ln=ee.z,Fn=ee.x+de*St*ft,Ki=ee.z+ze*St*ft,Ti=Q*18,so=[Ht-dt,Dt,ln-Lt,Ht+dt,Dt,ln+Lt,Fn-dt,Dt,Ki-Lt,Ht+dt,Dt,ln+Lt,Fn+dt,Dt,Ki+Lt,Fn-dt,Dt,Ki-Lt];for(let Nt=0;Nt<18;Nt++)c[Ti+Nt]=so[Nt];const Zi=G.owner==="player"?te:fe,ro=_e.owner==="player"?te:fe;for(let Nt=0;Nt<6;Nt++){const On=Nt===2||Nt===4||Nt===5?ro:Zi,zn=Ti+Nt*3;l[zn]=On.r,l[zn+1]=On.g,l[zn+2]=On.b}if(Q+=1,Q<a){const Nt=me.x,On=me.z,zn=me.x-de*St*ft,er=me.z-ze*St*ft,T=Q*18,z=[Nt-dt,Dt,On-Lt,Nt+dt,Dt,On+Lt,zn-dt,Dt,er-Lt,Nt+dt,Dt,On+Lt,zn+dt,Dt,er+Lt,zn-dt,Dt,er-Lt];for(let Y=0;Y<18;Y++)c[T+Y]=z[Y];const $=_e.owner==="player"?te:fe;for(let Y=0;Y<6;Y++){const O=T+Y*3;l[O]=$.r,l[O+1]=$.g,l[O+2]=$.b}Q+=1}(Q===1||Q===2)&&(C[0].position.set(Ht,.52,ln),C[1].position.set(me.x,.52,me.z),C[0].visible=Ue,C[1].visible=Ue)}}u.setDrawRange(0,Q*6),u.attributes.position.needsUpdate=!0,u.attributes.color.needsUpdate=!0,h.visible=Ue&&Q>0;const he=Math.min(.05,w||.016);for(let V=0;V<qn;V++){if(Ee[V]<=0)continue;Ee[V]-=he;const G=V*3;if(Ee[V]<=0){e[G+1]=-8,Ee[V]=0;continue}e[G]+=Oe[G]*he,e[G+1]+=Oe[G+1]*he,e[G+2]+=Oe[G+2]*he;const ae=Ee[V]/ye[V];t[G]=n[G]*ae,t[G+1]=n[G+1]*ae,t[G+2]=n[G+2]*ae}s.attributes.position.needsUpdate=!0,s.attributes.color.needsUpdate=!0}}}function cM(i,e,t,n){const s=new zy,r=new _i(new L(0,1,0),0),o=new ve,a=new L;let c=null;function l(f){const d=i.getBoundingClientRect();if(d.width<1||d.height<1)return null;const g=By(f.clientX,f.clientY,d);return o.set(g.x,g.y),s.setFromCamera(o,e),s.ray.intersectPlane(r,a)?{x:a.x,z:a.z}:null}function u(f){const d=i.getBoundingClientRect(),g=l(f);return d.width<1||d.height<1?{building:null,world:g}:{building:Yy(t(),e,d.width,d.height,f.clientX-d.left,f.clientY-d.top,g),world:g}}i.addEventListener("contextmenu",f=>f.preventDefault()),i.addEventListener("pointerdown",f=>{if(f.button!==0&&f.pointerType==="mouse")return;i.setPointerCapture(f.pointerId),n.unlock();const{building:d}=u(f);c={x:f.clientX,y:f.clientY,id:d?d.id:null,owner:d?d.owner:null,dragging:!1}}),i.addEventListener("pointermove",f=>{if(!c)return;const d=Math.hypot(f.clientX-c.x,f.clientY-c.y);if(!c.dragging&&d>14&&c.id&&c.owner==="player"&&(c.dragging=!0,n.onDragStart(c.id)),!c.dragging)return;const{world:g,building:x}=u(f);g&&n.onDragMove(g,x?x.id:null)});function h(f){if(!c)return;const d=c;c=null;const{building:g}=u(f),x=g?g.id:null;if(d.dragging){n.onDragEnd(d.id,x);return}n.onTap(x)}i.addEventListener("pointerup",h),i.addEventListener("pointercancel",()=>{c&&(c=null,n.onDragEnd(null,null))})}function fd(i,e){i.fov=42,Number.isFinite(e)&&e>0&&(i.aspect=e),i.position.set(4.2,18.8,16.2),i.up.set(0,1,0),i.lookAt(-.6,.35,-.6),i.updateProjectionMatrix(),i.updateMatrixWorld()}function lM(i,e){i.fov=34,Number.isFinite(e)&&e>0&&(i.aspect=e),i.position.set(4.8,20,28),i.up.set(0,1,0),i.lookAt(.2,.3,1.2),i.updateProjectionMatrix(),i.updateMatrixWorld()}function uM(i){try{const e=i.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");if(!t)return!0;const n=`${e.getParameter(t.UNMASKED_RENDERER_WEBGL)||""} ${e.getParameter(t.UNMASKED_VENDOR_WEBGL)||""}`;return/swiftshader|llvmpipe|softpipe|software/i.test(n)?!0:!/nvidia|amd|radeon|intel|apple|adreno|mali|powervr/i.test(n)}catch{return!0}}function Ch(i,e,t){i.shadowMap.enabled=!!t,i.shadowMap.type=cf,e.castShadow=!!t,t&&(e.shadow.mapSize.set(1024,1024),e.shadow.camera.near=4,e.shadow.camera.far=42,e.shadow.camera.left=-14,e.shadow.camera.right=14,e.shadow.camera.top=14,e.shadow.camera.bottom=-14,e.shadow.bias=-8e-4,e.shadow.normalBias=.028,e.shadow.camera.updateProjectionMatrix())}function hM(i){const e=new Mv({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"});e.outputColorSpace=Rt,e.toneMapping=uf,e.toneMappingExposure=1.15,e.setClearColor(Ne.sky,1);const t=new Sv;t.fog=new Al(14017263,78,150),t.background=new re(Ne.sky);const n=new Xt(46,1,.1,90);fd(n),t.add(new My(16774884,9088866,1.12)),t.add(new Ay(16775406,.46));const s=new sd(16760944,3.5);s.position.set(-16,6.4,7.5),s.target.position.set(0,0,0),t.add(s),t.add(s.target);const r=uM(e);let o=!r;Ch(e,s,o);function a(){const c=i.clientWidth||390,l=i.clientHeight||844;n.aspect=c/Math.max(1,l),n.updateProjectionMatrix();const u=Math.min(Math.max(window.devicePixelRatio||1,2),2);e.setPixelRatio(u),e.setSize(c,l,!1)}return{renderer:e,scene:t,camera:n,sun:s,software:r,get shadowsOn(){return o},setShadows(c){o=!!c,Ch(e,s,o),e.shadowMap.needsUpdate=!0},resize:a}}class fM extends js{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new xM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new AM(t)}),this.register(function(t){return new RM(t)}),this.register(function(t){return new CM(t)}),this.register(function(t){return new yM(t)}),this.register(function(t){return new MM(t)}),this.register(function(t){return new SM(t)}),this.register(function(t){return new bM(t)}),this.register(function(t){return new gM(t)}),this.register(function(t){return new wM(t)}),this.register(function(t){return new vM(t)}),this.register(function(t){return new TM(t)}),this.register(function(t){return new EM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new PM(t)}),this.register(function(t){return new IM(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Nr.extractUrlBase(e);o=Nr.resolveURL(l,this.path)}else o=Nr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new id(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===dd){try{o[nt.KHR_BINARY_GLTF]=new LM(e)}catch(h){s&&s(h);return}r=JSON.parse(o[nt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new XM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case nt.KHR_MATERIALS_UNLIT:o[h]=new mM;break;case nt.KHR_DRACO_MESH_COMPRESSION:o[h]=new DM(r,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:o[h]=new NM;break;case nt.KHR_MESH_QUANTIZATION:o[h]=new UM;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function dM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class pM{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new re(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],$t);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new sd(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ey(u),l.distance=h;break;case"spot":l=new by(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Zn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class mM{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return _t}extendParams(e,t,n){const s=[];e.color=new re(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],$t),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Rt))}return Promise.all(s)}}class gM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class xM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ve(a,a)}return Promise.all(r)}}class _M{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class vM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class yM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new re(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],$t)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Rt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class MM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class SM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new re().setRGB(a[0],a[1],a[2],$t),Promise.all(r)}}class bM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class wM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new re().setRGB(a[0],a[1],a[2],$t),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Rt)),Promise.all(r)}}class EM{constructor(e){this.parser=e,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class TM{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class AM{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class RM{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class CM{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class PM{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,s.mode,s.filter),d})})}else return null}}class IM{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==mn.TRIANGLES&&l.mode!==mn.TRIANGLE_STRIP&&l.mode!==mn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const x=new qe,m=new L,p=new oi,v=new L(1,1,1),y=new Pr(g.geometry,g.material,f);for(let _=0;_<f;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&v.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,x.compose(m,p,v));for(const _ in c)if(_==="_COLOR_0"){const C=c[_];y.instanceColor=new Kc(C.array,C.itemSize,C.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);gt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const dd="glTF",_r=12,Ph={JSON:1313821514,BIN:5130562};class LM{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,_r),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==dd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-_r,r=new DataView(e,_r);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Ph.JSON){const l=new Uint8Array(e,_r+o,a);this.content=n.decode(l)}else if(c===Ph.BIN){const l=_r+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class DM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=nl[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=nl[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=Ps[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(d){for(const g in d.attributes){const x=d.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}h(d)},a,l,$t,f)})})}}class NM{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class UM{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class pd extends no{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,x=g-l,m=-2*d+3*f,p=d-f,v=1-m,y=p-f+h;for(let _=0;_!==a;_++){const C=o[x+_+a],E=o[x+_+c]*u,A=o[g+_+a],R=o[g+_]*u;r[_]=v*C+y*E+m*A+p*R}return r}}const FM=new oi;class OM extends pd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return FM.fromArray(r).normalize().toArray(r),r}}const mn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ps={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ih={9728:Kt,9729:an,9984:ff,9985:Wo,9986:br,9987:jn},Lh={33071:yi,33648:Jo,10497:Fs},ec={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},nl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},zM={CUBICSPLINE:void 0,LINEAR:kr,STEP:Br},tc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function BM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new qt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),i.DefaultMaterial}function Di(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Zn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function kM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(s){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function HM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function GM(i){let e;const t=i.extensions&&i.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+nc(t.attributes):e=i.indices+":"+nc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+nc(i.targets[n]);return e}function nc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function il(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function VM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const WM=new qe;class XM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new yy(this.options.manager):this.textureLoader=new Ry(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new id(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Di(r,a,s),Zn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Nr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=ec[s.type],a=Ps[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Ke(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=ec[s.type],l=Ps[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(d&&d!==h){const p=Math.floor(f/d),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=t.cache.get(v);y||(x=new l(a,p*d,s.count*d/u),y=new Hf(x,d/u),t.cache.add(v,y)),m=new Gr(y,c,f%d/u,g)}else a===null?x=new l(s.count*c):x=new l(a,f,s.count*c),m=new Ke(x,c,g);if(s.sparse!==void 0){const p=ec.SCALAR,v=Ps[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,C=new v(o[1],y,s.sparse.count*p),E=new l(o[2],_,s.sparse.count*c);a!==null&&(m=new Ke(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,R=C.length;A<R;A++){const b=C[A];if(m.setX(b,E[A*c]),c>=2&&m.setY(b,E[A*c+1]),c>=3&&m.setZ(b,E[A*c+2]),c>=4&&m.setW(b,E[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Ih[f.magFilter]||an,u.minFilter=Ih[f.minFilter]||jn,u.wrapS=Lh[f.wrapS]||Fs,u.wrapT=Lh[f.wrapT]||Fs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Kt&&u.minFilter!==an,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(x){const m=new Ct(x);m.needsUpdate=!0,f(m)}),t.load(Nr.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Zn(h,o),h.userData.mimeType=o.mimeType||VM(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[nt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Pl,Tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Xf,Tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return qt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[nt.KHR_MATERIALS_UNLIT]){const h=s[nt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new re(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],$t),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Rt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=At);const u=r.alphaMode||tc.OPAQUE;if(u===tc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===tc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==_t&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ve(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==_t&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==_t){const h=r.emissiveFactor;a.emissive=new re().setRGB(h[0],h[1],h[2],$t)}return r.emissiveTexture!==void 0&&o!==_t&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Rt)),Promise.all(l).then(function(){const h=new o(a);return r.name&&(h.name=r.name),Zn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Di(s,h,r),h})}createUniqueName(e){const t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Dh(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=GM(l),h=s[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Dh(new lt,l,t),s[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?BM(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const x=u[d],m=o[d];let p;const v=l[d];if(m.mode===mn.TRIANGLES||m.mode===mn.TRIANGLE_STRIP||m.mode===mn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new wv(x,v):new Ye(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===mn.TRIANGLE_STRIP?p.geometry=bh(p.geometry,Sf):m.mode===mn.TRIANGLE_FAN&&(p.geometry=bh(p.geometry,Xc));else if(m.mode===mn.LINES)p=new Av(x,v);else if(m.mode===mn.LINE_STRIP)p=new Cl(x,v);else if(m.mode===mn.LINE_LOOP)p=new Rv(x,v);else if(m.mode===mn.POINTS)p=new qf(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&HM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Zn(p,r),m.extensions&&Di(s,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&Di(s,h[0],r),h[0];const f=new cn;r.extensions&&Di(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xt(Ef.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new El(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Zn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new qe;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Rl(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){const d=s.channels[h],g=s.samplers[d.sampler],x=d.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let v=0,y=f.length;v<y;v++){const _=f[v],C=d[v],E=g[v],A=x[v],R=m[v];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const b=n._createAnimationTracks(_,C,E,A,R);if(b)for(let S=0;S<b.length;S++)p.push(b[S])}return new dy(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,WM)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Vf:l.length>1?u=new cn:l.length===1?u=l[0]:u=new gt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Zn(u,r),r.extensions&&Di(n,u,r),r.matrix!==void 0){const h=new qe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new cn;n.name&&(r.name=s.createUniqueName(n.name)),Zn(r,n),n.extensions&&Di(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of s.associations)(f instanceof Tn||f instanceof Ct)&&h.set(f,d);return u.traverse(f=>{const d=s.associations.get(f);d!=null&&h.set(f,d)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];mi[r.path]===mi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(mi[r.path]){case mi.weights:l=Hs;break;case mi.rotation:l=Gs;break;case mi.position:case mi.scale:l=Vs;break;default:switch(n.itemSize){case 1:l=Hs;break;case 2:case 3:default:l=Vs;break}break}const u=s.interpolation!==void 0?zM[s.interpolation]:kr,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+mi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=il(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Gs?OM:pd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function qM(i,e,t){const n=e.attributes,s=new In;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){const u=il(Ps[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new L,c=new L;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const x=il(Ps[f.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new Ln;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Dh(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=nl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return it.workingColorSpace!==$t&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),Zn(i,e),qM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?kM(i,e.targets,t):i})}const Vt="assets/models/",YM={soldier:`${Vt}soldier.glb`,rifle:`${Vt}rifle.glb`,tank:`${Vt}tank.glb`,pineA:`${Vt}pine-a.glb`,pineB:`${Vt}pine-b.glb`,rockA:`${Vt}rock-a.glb`,rockB:`${Vt}rock-b.glb`,bags:`${Vt}sandbags.glb`,fence:`${Vt}fence.glb`,fort:`${Vt}fence-fort.glb`,tower:`${Vt}hq-tower.glb`,bunker:`${Vt}bunker.glb`,roof:`${Vt}bunker-roof.glb`,wall:`${Vt}bunker-wall.glb`,radar:`${Vt}radar.glb`},bt=new In,KM=new L,Tr=new L,Nh=new st,Ni=new st,Uh=new qe;function ZM(){return new fM}function $M(i){return ZM().loadAsync(i)}function JM(i){i.traverse(e=>{(e.name==="UpperArmL"||e.name==="UpperArmR")&&e.rotateX(-1.65)}),i.updateMatrixWorld(!0)}function jM(i,e){let t=null;return i.traverse(n=>{n.name===e&&(t=n)}),t}function md(i){const e=i.geometry,t=e.getAttribute("position"),n=e.getAttribute("skinIndex"),s=e.getAttribute("skinWeight");i.skeleton.update();const r=i.skeleton.boneMatrices,o=new Float32Array(t.count*3);for(let c=0;c<t.count;c++){Nh.set(t.getX(c),t.getY(c),t.getZ(c),1).applyMatrix4(i.bindMatrix),Ni.set(0,0,0,0);for(let l=0;l<4;l++){const u=s.getComponent(c,l);if(!u)continue;const h=Math.round(n.getComponent(c,l));Uh.fromArray(r,h*16);const f=Nh.clone().applyMatrix4(Uh);Ni.addScaledVector(f,u)}Ni.applyMatrix4(i.bindMatrixInverse),Ni.applyMatrix4(i.matrixWorld),o[c*3]=Ni.x,o[c*3+1]=Ni.y,o[c*3+2]=Ni.z}const a=new lt;return a.setAttribute("position",new Ke(o,3)),e.getIndex()&&a.setIndex(e.getIndex().clone()),a}function gd(i,e){const t=i.getAttribute("position"),n=new Float32Array(t.count*3),s=new re(e);for(let r=0;r<t.count;r++)n[r*3]=s.r,n[r*3+1]=s.g,n[r*3+2]=s.b;return i.setAttribute("color",new Ke(n,3)),i}function sl(i,e){const t=i.getIndex()?i.toNonIndexed():i,n=new lt;return n.setAttribute("position",t.getAttribute("position").clone()),gd(n,e)}function QM(i){const e=[];return i.updateMatrixWorld(!0),i.traverse(t=>{if(!t.isMesh||t.isSkinnedMesh)return;const n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),e.push(n)}),e}function eS(i,e){JM(i);const t=[];i.traverse(x=>{if(!x.isSkinnedMesh)return;const m=md(x),v=(x.name||x.parent&&x.parent.name||"").includes("Head")?.78:1;t.push(sl(m,new re(v,v,v).getHex()))});const n=QM(e).map(x=>sl(x,16777215)),s=Xi(n);s.computeBoundingBox(),s.rotateY(-Math.PI/2),s.computeBoundingBox();const r=s.boundingBox.getSize(KM),o=.72/Math.max(r.z,.001);s.scale(o*2.2,o*1.7,o),s.rotateY(.55),s.computeBoundingBox(),jM(i,"HandR").getWorldPosition(Tr),s.translate(Tr.x-(s.boundingBox.min.x+s.boundingBox.max.x)*.5,Tr.y-(s.boundingBox.min.y+s.boundingBox.max.y)*.5,Tr.z-s.boundingBox.min.z),t.push(gd(s,1711128));const c=Xi(t);c.rotateY(Math.PI),c.computeBoundingBox();const l=c.boundingBox,h=1/Math.max(.001,l.max.y-l.min.y);c.scale(h,h,h),c.computeBoundingBox();const f=c.boundingBox,d=(f.min.x+f.max.x)*.5,g=(f.min.z+f.max.z)*.5;return c.translate(-d,-f.min.y,-g),c.computeVertexNormals(),c}function vr(i,e,t=.45,n=1){i.updateMatrixWorld(!0);const s=[];i.traverse(l=>{if(!l.isMesh)return;const u=l.geometry.clone();u.applyMatrix4(l.matrixWorld);const h=Array.isArray(l.material)?l.material[0]:l.material,f=h&&h.color?h.color.clone():new re(16777215),d=f.r*.2126+f.g*.7152+f.b*.0722;e&&d>=.25&&f.lerp(new re(e),t),n!==1&&f.multiplyScalar(n),s.push(sl(u,f.getHex()))});const r=Xi(s);r.computeVertexNormals(),r.computeBoundingBox();const o=r.boundingBox,a=Math.max(.001,o.max.y-o.min.y);r.scale(1/a,1/a,1/a),r.computeBoundingBox();const c=r.boundingBox;return r.translate(-(c.min.x+c.max.x)*.5,-c.min.y,-(c.min.z+c.max.z)*.5),r}function yr(i){return new qt({color:i,roughness:.9,metalness:.02})}function ic(i,e,t=!1){i.traverse(n=>{n.isMesh&&(n.material=e,n.castShadow=t,n.receiveShadow=!0)})}function tS(i,e){const t=i.attributes.position,n=i.attributes.normal,s=new Float32Array(t.count*3),r=new re(e),o=new re;for(let a=0;a<t.count;a++){const c=n?n.getY(a):.5,l=.55+.45*Math.max(0,Math.min(1,c*.5+.5));o.copy(r).multiplyScalar(l),s[a*3]=o.r,s[a*3+1]=o.g,s[a*3+2]=o.b}return i.setAttribute("color",new Ke(s,3)),i}function nS(i){i.traverse(e=>{if(!e.isMesh||!e.material)return;const n=(Array.isArray(e.material)?e.material:[e.material]).map(s=>{const r=s.clone();return r.roughness=Math.max(r.roughness||0,.72),r.metalness=Math.min(r.metalness||0,.12),r});e.material=Array.isArray(e.material)?n:n[0],e.castShadow=!1,e.receiveShadow=!0})}function Ar(i){i.traverse(e=>{e.geometry&&(e.geometry=e.geometry.clone()),e.material&&(e.material=Array.isArray(e.material)?e.material.map(t=>t.clone()):e.material.clone())})}function vs(i,e,t,n){e.add(i),i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1),e.updateWorldMatrix(!0,!0),bt.setFromObject(i);const s=Math.max(.001,bt.max.y-bt.min.y),r=Math.max(.001,bt.max.x-bt.min.x,bt.max.z-bt.min.z);let o=t/s;n&&r*o>n&&(o=n/r),i.scale.setScalar(o),e.updateWorldMatrix(!0,!0),bt.setFromObject(i);const a=e.getWorldPosition(Tr).y,c=e.getWorldScale(new L).y||1;i.position.y+=(a-bt.min.y)/c}function iS(i){let e=i;for(;e;){if(e.userData&&e.userData.flutter)return!0;e=e.parent}return!1}function sS(i){const e=i.userData.pip,t=i.userData.dangerRing;i.traverse(n=>{!n.isMesh||iS(n)||n===e||n===t||(n.visible=!1)})}function Mr(i,e,t,n,s,r=!1){if(!e||!t.length)return;const o=e.clone(),a=n.clone(),c=new Pr(o,a,t.length);c.castShadow=r,c.receiveShadow=!0,c.frustumCulled=!1;const l=new gt;for(let u=0;u<t.length;u++){const h=t[u];l.position.set(h.x,0,h.z),l.rotation.set(0,s?s(u,h):0,0),l.scale.setScalar(h.s),l.updateMatrix(),c.setMatrixAt(u,l.matrix)}c.instanceMatrix.needsUpdate=!0,i.add(c)}function Kr(i){i.updateWorldMatrix(!0,!0);const e=new L,t=new L;return i.getWorldPosition(e),i.getWorldScale(t),{origin:e,scale:t}}function sc(i,e,t){e.updateWorldMatrix(!0,!0),bt.setFromObject(i);const s=Kr(e).scale.y||1;i.position.y+=(t-bt.min.y)/s}function rS(i,e){e.updateWorldMatrix(!0,!0),bt.setFromObject(i);const t=Kr(e),n=t.scale.y||1;i.position.y+=(t.origin.y-bt.min.y)/n}function Fh(i,e){const t=Kr(i),n=t.scale.y||1;i.traverse(s=>{!s.userData||!s.userData.flutter||(s.position.y=(e-t.origin.y)/n+.12/n)})}function oS(i){i.updateMatrixWorld(!0);const e=[];i.traverse(r=>{if(r.isSkinnedMesh)r.skeleton.update(),e.push(md(r));else if(r.isMesh){const o=r.geometry.clone();o.applyMatrix4(r.matrixWorld),e.push(o)}});const t=[];for(let r=0;r<e.length;r++){const o=e[r].getIndex()?e[r].toNonIndexed():e[r],a=new lt;a.setAttribute("position",o.getAttribute("position").clone()),t.push(a)}const n=Xi(t);if(!n)return null;n.computeBoundingBox();const s=n.boundingBox.getSize(new L);return s.x>s.z&&n.rotateY(Math.PI/2),n.computeVertexNormals(),n}function aS(i,e,t,n){for(let s=0;s<n;s++){const r=e.clone(!0);Ar(r);const o=s/n*Math.PI*2;vs(r,i,.32,.52),r.traverse(a=>{!a.isMesh||!a.material||!a.material.color||(a.material.color.set(12886890),a.material.roughness=.92,a.material.metalness=0,a.castShadow=!0,a.receiveShadow=!0)}),r.position.x+=Math.cos(o)*t,r.position.z+=Math.sin(o)*t,r.rotation.y=o}}function cS(i,e){sS(i);const t=i.userData.owner==="enemy",n=i.userData.kind==="hq";if(n&&t&&e.tower){const u=e.tower.clone(!0);Ar(u),ic(u,yr(13946822),!0),vs(u,i,3.15,1.45),i.updateWorldMatrix(!0,!0),bt.setFromObject(u);const h=bt.min.y,f=bt.max.y,d=Math.max(.25,(bt.max.x-bt.min.x)*.5),g=new qt({color:14689308,emissive:16722466,emissiveIntensity:.7,roughness:.45,metalness:.04}),x=Kr(i).scale.x||1;for(const p of[.28,.52,.76]){const v=new Ye(new en(.5,.5,.16,20),g);v.scale.setScalar(d*1.2/(.5*x)),v.castShadow=!0,v.receiveShadow=!0,i.add(v),sc(v,i,h+(f-h)*p)}if(e.radar){const p=e.radar.clone(!0);Ar(p),nS(p),vs(p,i,.9,1.25),sc(p,i,f-.04)}if(e.wall||e.fort){const v=1.62/x,y=.48,_=yr(12894134),C=new qt({color:13637656,emissive:16720924,emissiveIntensity:.45,roughness:.5,metalness:.02});for(let b=0;b<20;b++){const S=-Math.PI/2+b/20*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(S+Math.PI/2),Math.cos(S+Math.PI/2)))<y)continue;const k=new Ye(new be(1.05/x,.58/x,.22/x),_);k.position.set(Math.cos(S)*v,.29/x,Math.sin(S)*v),k.rotation.y=S+Math.PI/2,k.castShadow=!0,k.receiveShadow=!0,i.add(k);const B=new Ye(new be(1.05/x,.09/x,.2/x),C);B.position.set(k.position.x,k.position.y+.27/x,k.position.z),B.rotation.y=k.rotation.y,B.castShadow=!0,B.receiveShadow=!0,i.add(B)}for(const b of[-1,1]){const S=-Math.PI/2+b*y,P=new Ye(new be(.16/x,.7/x,.16/x),_);P.position.set(Math.cos(S)*v,.35/x,Math.sin(S)*v),P.castShadow=!0,P.receiveShadow=!0,i.add(P)}const E=-v,A=new Ye(new en(.025/x,.025/x,.95/x,6),yr(4078132));A.position.set(-.15/x,.48/x,E-.08/x),A.castShadow=!0,i.add(A);const R=new Ye(new ii(.95/x,.55/x),new qt({color:9313308,emissive:4853776,emissiveIntensity:.18,side:At,roughness:.7}));R.position.set(.28/x,.72/x,E-.08/x),R.rotation.y=Math.PI-.55,R.castShadow=!0,i.add(R)}Fh(i,f+.02);return}if(!e.bunker||!e.roof)return;const s=e.bunker.clone(!0);Ar(s),ic(s,yr(t?9077884:8358514),!0),vs(s,i,n?.85:.68,n?1.7:1.35),i.updateWorldMatrix(!0,!0),bt.setFromObject(s);const r=bt.max.y,o=Math.max(bt.max.x-bt.min.x,bt.max.z-bt.min.z),a=e.roof.clone(!0);Ar(a),ic(a,yr(t?9317414:3115592)),vs(a,i,.42,o*1.05),sc(a,i,r-.04);const c=(o*.55+.28)/(Kr(i).scale.x||1);e.bags&&aS(i,e.bags,c,n?9:7);let l=r+.16;if(!t&&n&&e.tank&&(e.tankGeo||(e.tankGeo=oS(e.tank)),e.tankGeo)){const u=new Ye(tS(e.tankGeo.clone(),5134900),new qt({color:16777215,roughness:.82,metalness:.08,vertexColors:!0}));u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!1,vs(u,i,.72,1.9),i.updateWorldMatrix(!0,!0);const h=new L(1.7,0,4.35);i.worldToLocal(h),u.position.x=h.x,u.position.z=h.z,rS(u,i)}Fh(i,l)}function lS(i){const e=[],t=i.minZ-.95;for(let n=0;n<8;n++){const s=n/7,r=i.minX+.15+s*(i.maxX-i.minX)*.62;e.push({x:r,z:t-n%2*.45,s:1.5+n%3*.14})}for(let n=0;n<12;n++){const s=n/11,r=i.minZ+.15+s*(i.maxZ-i.minZ)*.86,o=i.minX-1.25+s*2.15;Math.abs(r)<.55||Math.hypot(o,r-6.5)<1.7||e.push({x:o,z:r,s:1.28+n%3*.12})}for(let n=0;n<8;n++){const s=n/7,r=i.minZ+.4+s*(i.maxZ-i.minZ)*.72,o=i.minX-.55+s*1.7;Math.abs(r)<.55||Math.abs(o)<1.6||e.push({x:o,z:r+.35,s:1.12+n%2*.1})}for(let n=0;n<9;n++){const s=n/8,r=i.minZ+1.1+s*(i.maxZ-i.minZ)*.48,o=i.maxX-1.15-s*.4;Math.abs(r)<.55||e.push({x:o,z:r,s:1.32+n%3*.1})}return e}function uS(i,e){if(i.userData.assetDress)return;i.userData.assetDress=!0;const t=i.userData.flora||[];for(let f=0;f<t.length;f++)t[f].visible=!1;const n=i.userData.playBox||{minX:-3.4,maxX:3.4,minZ:-7.7,maxZ:7.7},s=lS(n),r=new qt({vertexColors:!0,roughness:.86,metalness:0}),o=new qt({vertexColors:!0,roughness:.92,metalness:0}),a=new qt({vertexColors:!0,roughness:.84,metalness:0});Mr(i,e.pineA,s.filter((f,d)=>d%2===0),r,f=>f*.7,!0),Mr(i,e.pineB,s.filter((f,d)=>d%2===1),r,f=>f*.9,!0);const c=[],l=[];for(let f=0;f<s.length;f+=2){const d=s[f],g={x:d.x+(f%4===0?.46:-.38),z:d.z+(f%3===0?.3:-.24),s:.36+f%3*.1};Math.abs(g.z)<.6||Math.abs(g.x)<1.4&&Math.abs(g.z)<6.2||(f%4===0?c.push(g):l.push(g))}Mr(i,e.rockA,c,o),Mr(i,e.rockB,l,o);const u=[{x:-7.2,z:2.4,s:1.15,y:.4},{x:-7.4,z:-2.2,s:1.15,y:.2},{x:7.3,z:2.6,s:1.15,y:Math.PI},{x:7.1,z:-1.8,s:1.15,y:Math.PI},{x:-3.6,z:8.4,s:1.05,y:Math.PI/2},{x:3.4,z:-8.2,s:1.05,y:Math.PI/2}];Mr(i,e.fence,u.map(f=>({x:f.x,z:f.z,s:f.s,y:f.y})),a,(f,d)=>d.y||0);const h=i.userData.buildings;h&&h.forEach(f=>cS(f,e))}function hS(i,e){return(async()=>{const n=await Promise.all(Object.entries(YM).map(async([c,l])=>{try{const u=await $M(l);return[c,u]}catch(u){return console.warn("model failed",l,u),[c,null]}})),s=Object.fromEntries(n),r=["soldier","rifle","tank","pineA","pineB","rockA","rockB","bags","fence","fort","tower","bunker","roof","wall"];for(let c=0;c<r.length;c++)if(!s[r[c]])throw new Error(`model missing ${r[c]}`);const o=eS(s.soldier.scene,s.rifle.scene);e.useSoldier(o);const a={tower:s.tower.scene,bunker:s.bunker.scene,roof:s.roof.scene,wall:s.wall.scene,fort:s.fort.scene,bags:s.bags.scene,tank:s.tank.scene,radar:s.radar?s.radar.scene:null,pineA:vr(s.pineA.scene,1318934,.94,.35),pineB:vr(s.pineB.scene,1054736,.96,.35),rockA:vr(s.rockA.scene,6972768),rockB:vr(s.rockB.scene,7630440),fence:vr(s.fence.scene,6968128)};return i.setDresser(c=>uS(c,a)),!0})()}const Sr=new L;function dn(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Sr.copy(e),Sr[n]=0,Sr.normalize();const l=.5*o/(o+a),u=1-Sr.angleTo(i)/c;return Math.sign(Sr[t])===1?u*l:a/(o+a)+l+l*(1-u)}class fS extends be{constructor(e=1,t=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(e/2,t/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new L,c=new L,l=new L(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,d=u.length/6,g=new L,x=.5/s;for(let m=0,p=0;m<u.length;m+=3,p+=2)switch(a.fromArray(u,m),c.copy(a),c.x-=Math.sign(c.x)*x,c.y-=Math.sign(c.y)*x,c.z-=Math.sign(c.z)*x,c.normalize(),u[m+0]=l.x*Math.sign(a.x)+c.x*r,u[m+1]=l.y*Math.sign(a.y)+c.y*r,u[m+2]=l.z*Math.sign(a.z)+c.z*r,h[m+0]=c.x,h[m+1]=c.y,h[m+2]=c.z,Math.floor(m/d)){case 0:g.set(1,0,0),f[p+0]=dn(g,c,"z","y",r,n),f[p+1]=1-dn(g,c,"y","z",r,t);break;case 1:g.set(-1,0,0),f[p+0]=1-dn(g,c,"z","y",r,n),f[p+1]=1-dn(g,c,"y","z",r,t);break;case 2:g.set(0,1,0),f[p+0]=1-dn(g,c,"x","z",r,e),f[p+1]=dn(g,c,"z","x",r,n);break;case 3:g.set(0,-1,0),f[p+0]=1-dn(g,c,"x","z",r,e),f[p+1]=1-dn(g,c,"z","x",r,n);break;case 4:g.set(0,0,1),f[p+0]=1-dn(g,c,"x","y",r,e),f[p+1]=1-dn(g,c,"y","x",r,t);break;case 5:g.set(0,0,-1),f[p+0]=dn(g,c,"x","y",r,e),f[p+1]=1-dn(g,c,"y","x",r,t);break}}}function xd(i){const e=[];for(let t=0;t<i.length;t++){const n=i[t];e.push({buildingId:n.buildingId,zMin:n.z-n.rz,zMax:n.z+n.rz,xMin:n.x-n.rx,xMax:n.x+n.rx})}return e.sort((t,n)=>n.zMax-t.zMax),e}xd(tp);const dS=[],Oh=1.55;function pS(i){return xd(i)}function mS(i,e,t=dS){t.length=0;for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++){const r=i[n],o=i[s],a=e[r.buildingId],c=e[o.buildingId];if(!a||!c||a===c)continue;const l=Math.min(r.xMax,o.xMax)-Math.max(r.xMin,o.xMin),u=Math.min(r.zMax,o.zMax)-Math.max(r.zMin,o.zMin),h=Math.max(r.zMin,o.zMin)-Math.min(r.zMax,o.zMax),f=Math.max(r.xMin,o.xMin)-Math.min(r.xMax,o.xMax);if(l>.45&&h<Oh&&h>-.35){const d=r.zMax>=o.zMax?r:o,g=d===r?o:r,x=Math.max(d.xMin,g.xMin),m=Math.min(d.xMax,g.xMax);if(m-x<.4)continue;t.push({axis:"x",z:(d.zMin+g.zMax)/2,x0:x,x1:m,z0:0,z1:0,x:(x+m)/2,plusOwner:e[d.buildingId],minusOwner:e[g.buildingId]})}else if(u>.45&&f<Oh&&f>-.35){const d=r.xMax>=o.xMax?r:o,g=d===r?o:r,x=Math.max(r.zMin,o.zMin),m=Math.min(r.zMax,o.zMax);if(m-x<.4)continue;const p=(d.xMin+g.xMax)/2;t.push({axis:"z",z:(x+m)/2,x0:p,x1:p,z0:x,z1:m,x:p,plusOwner:e[d.buildingId],minusOwner:e[g.buildingId]})}}return t}const gS=[{x:-3.05,z:6.15,s:1.08,color:Ne.leaf},{x:-3.25,z:4.15,s:.82,color:Ne.leafDeep},{x:3.15,z:5.55,s:1.12,color:Ne.leaf},{x:3.3,z:3.35,s:.74,color:Ne.leaf},{x:-3.15,z:1.05,s:.9,color:Ne.leafDeep},{x:3.05,z:.7,s:.78,color:Ne.leaf},{x:-3.2,z:-1.45,s:1,color:Ne.leaf},{x:3.2,z:-1.7,s:.88,color:Ne.leafDeep},{x:2.95,z:-4.55,s:.8,color:Ne.leaf},{x:-3.15,z:-5.15,s:1.05,color:Ne.leaf},{x:2.45,z:-6.85,s:.7,color:Ne.leafDeep},{x:-2.15,z:7.05,s:.76,color:Ne.leaf},{x:1.55,z:7.15,s:.64,color:Ne.leaf},{x:-1.35,z:-7.15,s:.7,color:Ne.leaf}],xS=[{x:2.55,z:6.4,s:.85},{x:2.15,z:6.15,s:.42},{x:-2.7,z:-6.5,s:.7},{x:-2.25,z:-6.15,s:.38},{x:3.4,z:-.2,s:.55},{x:3.05,z:.25,s:.32},{x:-3.45,z:2.4,s:.62},{x:-3.05,z:2.05,s:.34},{x:3.15,z:-6.2,s:.48},{x:-3.05,z:-2.4,s:.4},{x:-1.15,z:6.85,s:.36},{x:3.55,z:4.35,s:.44},{x:-2.35,z:-4.15,s:.4},{x:1.95,z:-4.55,s:.3}];function _d(i){let e=1/0,t=-1/0,n=1/0,s=-1/0;const r=i.zones||[];for(let o=0;o<r.length;o++){const a=r[o];e=Math.min(e,a.x-a.rx),t=Math.max(t,a.x+a.rx),n=Math.min(n,a.z-a.rz),s=Math.max(s,a.z+a.rz)}return{minX:e,maxX:t,minZ:n,maxZ:s}}function vd(i){if(i.id==="crossing")return gS;const e=i.zones||[],t=[];for(let n=0;n<e.length;n++){const s=e[n];t.push({x:s.x-s.rx+.45,z:s.z+s.rz*.35,s:.85,color:n%2?Ne.leafDeep:Ne.leaf}),t.push({x:s.x+s.rx-.4,z:s.z-s.rz*.2,s:.7,color:Ne.leaf})}return t}function yd(i){if(i.id==="crossing")return xS;const e=i.zones||[],t=[];for(let n=0;n<e.length;n++){const s=e[n];t.push({x:s.x+s.rx*.62,z:s.z-s.rz*.72,s:.5}),t.push({x:s.x-s.rx*.55,z:s.z+s.rz*.42,s:.34})}return t}function Md(i){const e=_d(i);return{x:0,z:0,halfWidth:Math.max(6.4,e.maxX-e.minX+.8)/2,depth:1.28}}function _S(i,e){const t=i.z,n=e.z;if(t>0&&n>0||t<0&&n<0)return null;if(t===n)return t!==0?null:{x:(i.x+e.x)/2,z:0};const s=(0-t)/(n-t);return s<0||s>1?null:{x:i.x+(e.x-i.x)*s,z:0}}function Sd(i){const e=i.nodes||{},t=i.graph||{},n=new Set,s=[],r=Object.keys(t);for(let o=0;o<r.length;o++){const a=t[r[o]]||[],c=e[r[o]];for(let l=0;l<a.length;l++){const u=a[l],h=r[o]<u?`${r[o]}|${u}`:`${u}|${r[o]}`;if(n.has(h))continue;n.add(h);const f=e[u];if(!c||!f)continue;const d=_S(c,f);if(!d)continue;const g=d.x.toFixed(2);let x=!1;for(let m=0;m<s.length;m++)if(s[m].x.toFixed(2)===g){x=!0;break}x||s.push(d)}}return s.sort((o,a)=>o.x-a.x),s}const kl=5923160,gi=.16,zh=.05,vS=.28,yS=new L(0,1,0),bd=new L(0,0,1),Ws=new L;function ct(i,e={}){return new qt({color:i,roughness:.88,metalness:.04,...e})}function na(i,e=.08){const t=i.getAttribute("position");if(!t)return i;const n=new Float32Array(t.count*3);for(let s=0;s<t.count;s++){const o=1+Math.sin(t.getX(s)*19.7+t.getY(s)*11.3+t.getZ(s)*7.9)*e;n[s*3]=o,n[s*3+1]=o,n[s*3+2]=o}return i.setAttribute("color",new Ke(n,3)),i}function ia(i){const e=i.clone();return e.vertexColors=!0,e}function Zr(i){const e=new re(i);return e.lerp(new re(kl),.18),e.getHex()}function Bh(i){const e=new re(i);return e.lerp(new re(Ne.meadow),.84),e.getHex()}const kh=new re;new re(9267264);new re(3820076);const Yn=new re;function MS(){const n=new Float32Array(303);let s=1;for(let a=1;a<=5;a++){const c=a/5;for(let l=0;l<20;l++){const u=l/20*Math.PI*2,h=s*3;n[h]=Math.cos(u)*c,n[h+1]=0,n[h+2]=Math.sin(u)*c,s+=1}}const r=[];for(let a=0;a<20;a++)r.push(0,1+a,1+(a+1)%20);for(let a=0;a<4;a++)for(let c=0;c<20;c++){const l=1+a*20+c,u=1+a*20+(c+1)%20,h=l+20,f=u+20;r.push(l,u,f,l,f,h)}const o=new lt;return o.setAttribute("position",new Ke(n,3)),o.setIndex(r),o.computeVertexNormals(),o}function Hh(i,e){const t=i.geometry,n=t.attributes.position;let s=t.attributes.color;s||(t.setAttribute("color",new Ke(new Float32Array(n.count*3),3)),s=t.attributes.color),kh.setHex(e);const r=i.position.x,o=i.position.z,a=i.scale.x||1,c=i.scale.z||1,l=new re(7317578),u=new re(5212732),h=new re(9357402),f=new re(9070660);for(let d=0;d<n.count;d++){const g=n.getX(d)*a+r,x=n.getZ(d)*c+o,m=Math.sin(g*.72+.8)*Math.cos(x*.58-.3),p=Math.sin(g*1.8+x*.6);Yn.copy(l),p>.35?Yn.lerp(h,.42):p<-.4?Yn.lerp(u,.38):Yn.lerp(u,.12),Math.abs(g)<.95&&Math.abs(x)>.9&&m>.35&&Yn.lerp(f,.45),Yn.lerp(kh,.08),s.setXYZ(d,Yn.r,Yn.g,Yn.b)}s.needsUpdate=!0}function SS(i,e,t){const s=(i.graph[e]||[])[0],r=i.nodes[e],o=s&&i.nodes[s];return!r||!o?(t.x=0,t.z=-1,t):(t.x=o.x-r.x,t.z=o.z-r.z,t)}function wd(i){const e=ct(i,{roughness:.5,side:At}),t=new cn,n=new Ye(new ii(.4,.24),e),s=new Ye(new ii(.4,.24),e);return s.rotation.y=Math.PI/2,n.userData.slot="flag",s.userData.slot="flag",t.add(n,s),t.userData.flutter=!0,t}function Ed(i){const e=new Ye(new si(i,.04,6,24),new _t({color:Ne.metal}));return e.rotation.x=Math.PI/2,e.position.y=.1,e.visible=!1,e.name="pip",e}const Gh=new L,Vh=new oi,bS=new L(1,1,1),Wh=new An,wS=new qe;function Le(i,e,t,n,s=0,r=0,o=0){return Wh.set(s,r,o),Vh.setFromEuler(Wh),Gh.set(e,t,n),i.applyMatrix4(wS.compose(Gh,Vh,bS)),i}function on(i,e){const t=Xi(i);for(let s=0;s<i.length;s++)i[s].dispose();const n=new Ye(t,e);return n.castShadow=!0,n.receiveShadow=!0,n}function Ot(i,e,t,n,s,r,o,a,c){const l=new Ye(new fS(i,e,t,n,s),c);return l.position.set(r,o,a),l.castShadow=!0,l.receiveShadow=!0,l}function ES(i){const e=new cn,t=ct(Ne.concrete,{roughness:.92,metalness:0}),n=Ot(2.85,.4,2.15,4,.18,0,.16,.05,t),s=Ot(.36,.66,1.12,3,.14,-1.28,.48,-.02,t),r=Ot(.36,.66,1.12,3,.14,1.28,.48,-.02,t),o=Ot(1.02,.18,.78,4,.12,0,2.98,.02,t),a=Ot(.86,.16,.64,3,.1,0,3.32,.02,t),c=on([Le(new be(2.2,.2,.4),0,.2,-.98),Le(new be(2.15,.1,.78),0,.38,-.78,-.42,0,0),Le(new be(2.2,.14,.16),0,.2,1.08),Le(new be(.7,.36,.16),0,.42,1.12),Le(new be(.16,.55,.16),-.7,.5,1.05),Le(new be(.16,.55,.16),.7,.5,1.05),Le(new be(.36,.14,.22),-1.05,.2,.9),Le(new be(.36,.14,.22),1.05,.2,.9),Le(new be(.28,.12,.16),-.9,.3,-1.18),Le(new be(.28,.12,.16),-.48,.32,-1.22),Le(new be(.28,.12,.16),.02,.3,-1.18),Le(new be(.28,.12,.16),.5,.32,-1.22),Le(new be(.28,.12,.16),.96,.3,-1.16),Le(new be(1.7,.1,1.05),0,.72,0),Le(new be(.14,.16,.14),-.42,3.48,-.28),Le(new be(.14,.16,.14),.42,3.48,-.28),Le(new be(.14,.16,.14),-.42,3.48,.32),Le(new be(.14,.16,.14),.42,3.48,.32)],t),l=ct(Ne.sand,{roughness:.92,metalness:0}),u=Ot(2.45,.32,1.75,4,.14,0,.14,.05,l),h=on([Le(new be(.34,.14,.18),-.7,.28,-1.02),Le(new be(.34,.14,.18),0,.28,-1.02),Le(new be(.34,.14,.18),.7,.28,-1.02)],l),f=ct(kl,{roughness:.82,metalness:.06});f.emissive=new re(i.glow),f.emissiveIntensity=0;const d=ct(Zr(i.main),{roughness:.48,metalness:.08}),g=on([Le(new be(2.2,.16,.12),0,.86,.64),Le(new be(.14,.22,1.2),-1.02,.9,0),Le(new be(.14,.22,1.2),1.02,.9,0),Le(new be(1.7,.08,.1),0,.84,-.6)],f);g.userData.slot="body";const x=Ot(1.92,.58,1.2,5,.26,0,.42,0,f),m=Ot(1.22,2.15,.96,4,.36,0,1.85,.02,d);m.userData.slot="roof",o.material=d,a.material=d,o.userData.slot="roof",a.userData.slot="roof";const p=Ot(1.38,.86,1.12,5,.22,0,2.48,.02,d);p.userData.slot="roof";const v=on([Le(new be(.46,.32,.06),0,.3,-.68),Le(new be(.08,.14,.05),-.62,.52,-.66),Le(new be(.08,.14,.05),.62,.52,-.66),Le(new be(.5,.04,.05),0,.2,-.7),Le(new be(.5,.04,.05),0,.3,-.7)],ct(Ne.ink,{roughness:.8,metalness:.12})),y=on([Le(new en(.028,.034,.46,6),.16,3.58,.02),Le(new en(.18,.18,.032,16),.16,3.84,.1,1.05,.15,.2),Le(new si(.15,.008,6,14),.16,3.86,.12,1.05,.15,.1),Le(new en(.018,.022,.7,5),.72,3.7,.05),Le(new be(.16,.02,.02),.72,4.02,.05)],ct(Ne.metal,{roughness:.38,metalness:.55})),_=wd(i.flag);_.position.set(.72,3.95,.05);const C=Ed(1.42),E=new Ye(new si(1.38,.045,6,28),new _t({color:i.glow,transparent:!0,opacity:.9,toneMapped:!1}));if(E.rotation.x=Math.PI/2,E.position.y=.14,E.visible=!1,e.userData.pip=C,e.userData.pulse=f,e.userData.dangerRing=E,e.add(n,s,r,o,a,c,u,h,x,g,m,p,v,y,_,C,E),i.main===Ne.player.main){m.visible=!1,o.visible=!1,a.visible=!1,p.visible=!1,y.visible=!1;const A=Ot(2.15,.2,1.62,4,.1,0,1.02,.02,d);A.userData.slot="roof";const R=Ot(1.7,.1,1.15,3,.06,0,1.16,.02,d);R.userData.slot="roof";const b=on([Le(new be(.42,.28,.32),-1.15,.32,-.7),Le(new be(.42,.28,.32),-1.15,.32,.15),Le(new be(.42,.28,.32),-1.15,.32,.85),Le(new be(.42,.28,.32),1.15,.32,-.55),Le(new be(.42,.28,.32),1.15,.32,.25),Le(new be(.42,.28,.32),1.15,.32,.95),Le(new be(.5,.26,.36),.2,.3,1.15),Le(new be(.5,.26,.36),-.45,.3,1.15)],ia(l));na(b.geometry,.08),e.add(A,R,b)}else{m.material=ia(t),na(m.geometry,.08),m.userData.slot="",p.visible=!1,o.material=t,a.material=t,o.userData.slot="",a.userData.slot="";const A=Ot(1.08,.12,.84,3,.03,0,1.08,.02,d),R=Ot(1.02,.11,.78,3,.03,0,2.62,.02,d);A.userData.slot="roof",R.userData.slot="roof",e.add(A,R)}return e}function TS(i){const e=new cn,t=ct(Ne.sand,{roughness:.92,metalness:0}),n=Ot(1.95,.32,1.28,4,.14,0,.14,.05,t),s=on([Le(new be(.52,.34,.36),-.98,.26,-.58),Le(new be(.52,.34,.36),.98,.26,-.58),Le(new be(.52,.34,.36),-.98,.26,.12),Le(new be(.52,.34,.36),.98,.26,.12),Le(new be(.52,.34,.36),-.98,.26,.74),Le(new be(.52,.34,.36),.98,.26,.74),Le(new be(.46,.3,.5),-.55,.26,.86),Le(new be(.46,.3,.5),.55,.26,.86),Le(new be(.46,.3,.5),-.18,.26,-.82),Le(new be(.46,.3,.5),.38,.26,-.82)],ia(t));na(s.geometry,.08);const r=ct(Ne.concrete,{roughness:.92,metalness:0}),o=Ot(1.74,.58,1.02,6,.16,0,.38,0,ia(r));na(o.geometry,.08);const a=ct(kl,{roughness:.9,metalness:.04}),c=ct(Zr(i.main),{roughness:.84,metalness:.04}),l=Ot(1.58,.22,.56,4,.08,0,.88,-.22,c);l.rotation.x=-.45;const u=Ot(1.58,.22,.56,4,.08,0,.88,.22,c);u.rotation.x=.45;const h=on([Le(new be(.1,.22,.9),-.84,.86,0),Le(new be(.1,.22,.9),.84,.86,0),Le(new be(1.2,.04,.1),0,1.04,.02),Le(new be(.12,.07,.12),-.46,1.02,.02),Le(new be(.12,.07,.12),.46,1.02,-.02)],a),f=on([Le(new be(1.55,.08,.78),0,.98,0)],c);f.userData.slot="roof";const d=on([Le(new be(.7,.045,.04),0,.18,-.48),Le(new be(.7,.045,.04),0,.26,-.48),Le(new be(.7,.045,.04),0,.34,-.48),Le(new be(.22,.06,.04),-.52,.48,-.46),Le(new be(.22,.06,.04),.52,.48,-.46)],ct(Ne.ink,{roughness:.78,metalness:.16})),g=new Ye(new be(.55,.04,.38),ct(Ne.concrete,{roughness:.84}));g.position.set(0,.1,-.86),g.receiveShadow=!0;const x=on([Le(new en(.02,.024,.48,5),-.72,1.02,0),Le(new be(.08,.42,.08),-.78,.32,-.4),Le(new be(.08,.42,.08),.78,.32,-.4),Le(new be(.08,.42,.08),-.78,.32,.38),Le(new be(.08,.42,.08),.78,.32,.38)],ct(Ne.metal,{roughness:.42,metalness:.4})),m=wd(i.flag);m.scale.setScalar(.65),m.position.set(-.72,1.22,0);const p=Ed(1.12),v=new Ye(new si(1.05,.04,6,24),new _t({color:16769162,transparent:!0,opacity:.9,toneMapped:!1}));return v.rotation.x=Math.PI/2,v.position.y=.12,v.visible=!1,e.userData.pip=p,e.userData.pulse=o.material,e.userData.dangerRing=v,e.add(n,s,o,l,u,h,f,d,g,x,m,p,v),e}function AS(i){const e=new cn,t=ct(3228712,{roughness:.78,metalness:.16});t.emissive=new re(2372126),t.emissiveIntensity=.18;const n=on([Le(new be(.62,.16,.95),0,.22,0),Le(new be(.4,.12,.42),0,.34,.06)],t),s=new Ye(new be(.36,.04,.28),ct(Zr(i.main),{roughness:.5,metalness:.16}));s.position.set(0,.42,.06),s.userData.slot="roof";const r=new Ye(new be(.05,.05,.55),ct(Ne.metal,{roughness:.35,metalness:.6}));r.position.set(0,.36,-.55);const o=ct(3815474,{roughness:.9,metalness:.12});o.emissive=new re(2762788),o.emissiveIntensity=.12;const a=on([Le(new be(.12,.14,1.02),-.36,.12,0),Le(new be(.12,.14,1.02),.36,.12,0)],o);return e.add(n,a,r,s),e.scale.setScalar(1),e}function RS(i,e){const t=Cn(e);i.traverse(n=>{if(!n.material||!n.userData.slot)return;const s=n.userData.slot;s==="body"?(n.material.color.setHex(Zr(t.main)),n.material.emissive&&n.material.emissive.setHex(t.glow)):s==="roof"?n.material.color.setHex(Zr(t.main)):s==="flag"&&n.material.color.setHex(t.flag)})}const Go=new re;function Xh(i,e,t){Go.setHex(i),e[t]=Go.r,e[t+1]=Go.g,e[t+2]=Go.b}function CS(){const e=new Float32Array([-.5,-.14,0,.5,-.14,0,.5,0,0,-.5,0,0,-.5,0,0,.5,0,0,.5,.14,0,-.5,.14,0]),t=new Float32Array(24);for(let s=0;s<4;s++)Xh(Ne.player.main,t,s*3);for(let s=4;s<8;s++)Xh(Ne.enemy.main,t,s*3);const n=new lt;return n.setAttribute("position",new Ke(e,3)),n.setAttribute("color",new Ke(t,3)),n.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),n.rotateX(-Math.PI/2),n}function PS(){const e=new Float32Array(114),t=new Float32Array(114),n=new re(Ne.player.main),s=new re(Ne.enemy.main);for(let a=0;a<=18;a++){const c=a/18,l=-.5+c,u=Math.sin(c*Math.PI)*.72,h=a*6;e[h]=l,e[h+1]=.1,e[h+2]=u+.28,e[h+3]=l,e[h+4]=.1,e[h+5]=u-.24,t[h]=n.r,t[h+1]=n.g,t[h+2]=n.b,t[h+3]=s.r,t[h+4]=s.g,t[h+5]=s.b}const r=[];for(let a=0;a<18;a++){const c=a*2;r.push(c,c+1,c+2,c+1,c+3,c+2)}const o=new lt;return o.setAttribute("position",new Ke(e,3)),o.setAttribute("color",new Ke(t,3)),o.setIndex(r),o}function IS(){const t=new Float32Array(54),n=new Float32Array(54),s=new re(4116338),r=new re(14697784);for(let c=0;c<=8;c++){const u=-.5+c/8,h=c*6;t[h]=u,t[h+1]=-.025,t[h+2]=0,t[h+3]=u,t[h+4]=.025,t[h+5]=0,n[h]=s.r,n[h+1]=s.g,n[h+2]=s.b,n[h+3]=r.r,n[h+4]=r.g,n[h+5]=r.b}const o=[];for(let c=0;c<8;c++){const l=c*2;o.push(l,l+1,l+2,l+1,l+3,l+2)}const a=new lt;return a.setAttribute("position",new Ke(t,3)),a.setAttribute("color",new Ke(n,3)),a.setIndex(o),a.rotateX(-Math.PI/2),a.computeVertexNormals(),a}function qh(i,e){const n=new Float32Array(138),s=new Float32Array(138),r=new re(4063096),o=new re(16730666);for(let l=0;l<=22;l++){const u=l/22,h=-.5+u,f=Math.sin(u*Math.PI)*e,d=l*6;n[d]=h,n[d+1]=f-i,n[d+2]=0,n[d+3]=h,n[d+4]=f+i,n[d+5]=0,s[d]=r.r,s[d+1]=r.g,s[d+2]=r.b,s[d+3]=o.r,s[d+4]=o.g,s[d+5]=o.b}const a=[];for(let l=0;l<22;l++){const u=l*2;a.push(u,u+1,u+2,u+1,u+3,u+2)}const c=new lt;return c.setAttribute("position",new Ke(n,3)),c.setAttribute("color",new Ke(s,3)),c.setIndex(a),c.rotateX(-Math.PI/2),c.computeVertexNormals(),c}function Ui(i,e){const t=new Ye(i,e);return t.visible=!1,t.renderOrder=6,t.frustumCulled=!1,t}function $n(i,e,t,n){if(!e.length)return;const s=Xi(e);for(let o=0;o<e.length;o++)e[o].dispose();const r=new Ye(s,t);return r.castShadow=!n||n.cast!==!1,r.receiveShadow=!n||n.receive!==!1,i.add(r),r}function LS(i){const e=[];for(let t=0;t<i.length;t++){const n=i[t].x,s=i[t].z,r=new be(.92,.1,2.2,8,1,28);r.translate(n,.17,s),e.push(r);for(const o of[-.4,.4]){const a=new be(.1,.08,2.2);a.translate(n+o,.24,s),e.push(a)}}return e}function rc(i,e,t,n,s,r){s*=1;const o=Math.sin(t*12.7+n*4.3),a=.48+Math.abs(Math.sin(n*2.15+t*.37))*1.35,c=.4+Math.abs(Math.cos(t*1.85-n*.62))*.95,l=o*.32,u=new en(.04*c*s,.08*c*s,.4*a*s,5);u.translate(t+l,.05+.18*a*s,n),i.push(u);const h=Math.abs(Math.sin(t*5.1+n*3.7)),f=h>.72?7112262:h>.48?2373160:h>.24?4874808:r,d=e[f]||(e[f]=[]),g=.05,x=new Cs(.48*c*s,.82*a*s,7);x.translate(t+l*.45,g+.46*a*s,n);const m=new Cs(.3*c*s,.62*a*s,7);m.translate(t-l*.25,g+.98*a*s,n);const p=new Cs(.13*c*s,.36*a*s,5);p.translate(t+l*.08,g+1.4*a*s,n),d.push(x,m,p)}function Td(i){i.computeVertexNormals();const e=i.attributes.normal;let t=0;for(let r=0;r<e.count;r++)t+=e.getY(r);if(t>=0)return i;const n=i.getIndex(),s=n.array;for(let r=0;r<s.length;r+=3){const o=s[r+1];s[r+1]=s[r+2],s[r+2]=o}return n.needsUpdate=!0,i.computeVertexNormals(),i}function DS(i,e){const r=new Float32Array(2307),o=new Float32Array(769*3),a=new re(7317578),c=new re(5146168),l=new re(9357402),u=new re(9070660),h=new re;let f=1;for(let x=1;x<=16;x++){const m=x/16;for(let p=0;p<48;p++){const v=p/48*Math.PI*2,y=f*3;r[y]=Math.cos(v)*m*i*.5,r[y+1]=0,r[y+2]=Math.sin(v)*m*e*.5,f+=1}}for(let x=0;x<769;x++){const m=r[x*3],p=r[x*3+2],v=Math.hypot(m/(i*.5||1),p/(e*.5||1)),y=Math.sin(m*.7+.4)*Math.cos(p*.55),_=Math.sin(m*1.6+p*1.1);h.copy(a),_>.2?h.lerp(l,.4):_<-.25?h.lerp(c,.35):h.lerp(c,.1),Math.abs(m)<.95&&Math.abs(p)>.9&&y>.2&&h.lerp(u,.5),v>.92&&h.lerp(c,.18),o[x*3]=h.r,o[x*3+1]=h.g,o[x*3+2]=h.b}const d=[];for(let x=0;x<48;x++)d.push(0,1+(x+1)%48,1+x);for(let x=0;x<15;x++)for(let m=0;m<48;m++){const p=1+x*48+m,v=1+x*48+(m+1)%48,y=p+48,_=v+48;d.push(p,_,v,p,y,_)}const g=new lt;return g.setAttribute("position",new Ke(r,3)),g.setAttribute("color",new Ke(o,3)),g.setIndex(d),Td(g)}function NS(i){const t=i/2,n=[{off:-.21000000000000002,y:.11,hex:6982216,sand:!0},{off:-.1825,y:.095,hex:6455368,sand:!0},{off:-gi,y:.078,hex:5926980,sand:!0},{off:-gi*.7,y:.064,hex:3826292},{off:-gi*.28,y:.052,hex:4880528},{off:0,y:.046,hex:4091524},{off:gi*.32,y:.052,hex:3497584},{off:gi*.74,y:.064,hex:3826292},{off:gi,y:.078,hex:5926980,sand:!0},{off:gi+zh*.45,y:.095,hex:6455368,sand:!0},{off:gi+zh,y:.11,hex:6982216,sand:!0}],s=new Float32Array(23*n.length*3),r=new Float32Array(23*n.length*3),o=new re;let a=0;for(let h=0;h<=22;h++){const f=-t+i*h/22,d=Math.sin(f/t*Math.PI)*vS;for(let g=0;g<n.length;g++){const x=n[g];if(s[a]=f,s[a+1]=x.y,s[a+2]=d+x.off,o.setHex(x.hex),x.sand){const m=.5+.5*Math.sin(f*4.1+x.off*6);o.lerp(new re(5926976),m*.12)}else{const m=.5+.5*Math.sin(f*3.3+x.off*9);o.lerp(new re(5935268),m*.22),o.lerp(new re(2373704),(1-m)*.2)}r[a]=o.r,r[a+1]=o.g,r[a+2]=o.b,a+=3}}const c=[],l=n.length;for(let h=0;h<22;h++)for(let f=0;f<l-1;f++){const d=h*l+f;c.push(d,d+1,d+l,d+1,d+l+1,d+l)}const u=new lt;return u.setAttribute("position",new Ke(s,3)),u.setAttribute("color",new Ke(r,3)),u.setIndex(c),Td(u)}function US(i){let e=1/0,t=-1/0,n=1/0,s=-1/0;const r=i.zones;for(let o=0;o<r.length;o++){const a=r[o];e=Math.min(e,a.x-a.rx),t=Math.max(t,a.x+a.rx),n=Math.min(n,a.z-a.rz),s=Math.max(s,a.z+a.rz)}return{minX:e,maxX:t,minZ:n,maxZ:s}}const rl=.72,FS=.05,Ad=.155,OS=.55;function zS(i){const e=new Set,t=[],n=i.graph||{},s=i.nodes||{},r=Object.keys(n);for(let o=0;o<r.length;o++){const a=r[o],c=n[a]||[],l=s[a];for(let u=0;u<c.length;u++){const h=c[u],f=a<h?`${a}|${h}`:`${h}|${a}`;if(e.has(f))continue;e.add(f);const d=s[h];!l||!d||t.push([{x:l.x,z:l.z},{x:d.x,z:d.z}])}}return t}function BS(i,e){for(let t=0;t<2;t++)for(let n=0;n<2;n++){const s=i[t],r=e[n];if(Math.hypot(s.x-r.x,s.z-r.z)>.04)continue;const o=i[1-t],a=e[1-n],c=s.x-o.x,l=s.z-o.z,u=a.x-r.x,h=a.z-r.z,f=Math.hypot(c,l)||1,d=Math.hypot(u,h)||1,g=c/f*(h/d)-l/f*(u/d),x=c/f*(u/d)+l/f*(h/d);if(Math.abs(g)<.08&&x>.92)return[o,a]}return null}function kS(i){const e=i.map(n=>[n[0],n[1]]);let t=0;for(;t<32;){t+=1;let n=!1;for(let s=0;s<e.length&&!n;s++)for(let r=s+1;r<e.length;r++){const o=BS(e[s],e[r]);if(o){e[s]=o,e.splice(r,1),n=!0;break}}if(!n)break}return e.map(n=>({x0:n[0].x,z0:n[0].z,x1:n[1].x,z1:n[1].z,y:Ad}))}function HS(i,e){const{x0:t,z0:n,x1:s,z1:r}=i,o=r-n;if(Math.abs(o)<1e-4)return[i];const a=[0,1],c=[e,-e];for(let u=0;u<c.length;u++){const h=(c[u]-n)/o;h>.002&&h<.998&&a.push(h)}a.sort((u,h)=>u-h);const l=[];for(let u=0;u<a.length-1;u++){const h=a[u],f=a[u+1];if(f-h<.002)continue;const d=n+o*((h+f)/2);Math.abs(d)<e-.001||l.push({x0:t+(s-t)*h,z0:n+o*h,x1:t+(s-t)*f,z1:n+o*f,y:i.y})}return l}function GS(i,e,t){const n=t.x1-t.x0,s=t.z1-t.z0,r=n*n+s*s;if(r<1e-6)return!1;const o=((i-t.x0)*n+(e-t.z0)*s)/r;if(o<=.03||o>=.97)return!1;const a=t.x0+n*o,c=t.z0+s*o;return Math.hypot(a-i,c-e)<.06}function VS(i){const e=rl/2-.06;for(let t=0;t<i.length;t++)for(let n=0;n<i.length;n++){if(t===n)continue;const s=i[t],r=i[n];for(let o=0;o<2;o++){const a=o===0?s.x0:s.x1,c=o===0?s.z0:s.z1;if(!GS(a,c,r))continue;const l=s.x1-s.x0,u=s.z1-s.z0,h=Math.hypot(l,u)||1,f=l/h,d=u/h;o===0?(s.x0=a+f*e,s.z0=c+d*e):(s.x1=a-f*e,s.z1=c-d*e),s.y=Ad-.02}}}function WS(i){const e=kS(zS(i)),t=[];for(let n=0;n<e.length;n++){const s=HS(e[n],OS);for(let r=0;r<s.length;r++)t.push(s[r])}return VS(t),t}function XS(i){const e=i.attributes.position,t=new Float32Array(e.count*3),n=new re(Ne.road);n.lerp(new re(6966834),.7);const s=new re(4140058),r=new re(9267268),o=new re;for(let a=0;a<e.count;a++){const c=e.getX(a),l=e.getZ(a),u=Math.sin(c*6.5+l*3.1)*Math.cos(l*5.2-c*2.4);u>.45?o.copy(r):u<.12?o.copy(s):(o.copy(n),o.lerp(s,.55));const h=Math.sin(l*18+c*2.4),f=Math.sin(c*16+l*.6);h>.45||f>.72?o.lerp(s,.82):h<-.35&&o.lerp(r,.75),t[a*3]=o.r,t[a*3+1]=o.g,t[a*3+2]=o.b}i.setAttribute("color",new Ke(t,3))}function Yh(i,e){const t=i.attributes.position,n=new Float32Array(t.count*3),s=new re(e),r=new re(e).multiplyScalar(.62),o=new re(e).lerp(new re(6969928),.4),a=new re;for(let c=0;c<t.count;c++){const l=t.getX(c),u=t.getZ(c),h=Math.sin(u*22+l*3.2);a.copy(s),h>.35?a.lerp(o,.4):h<-.15&&a.lerp(r,.55),n[c*3]=a.r,n[c*3+1]=a.g,n[c*3+2]=a.b}i.setAttribute("color",new Ke(n,3))}function qS(i,e,t,n){const s=Math.min(t,e*.46,Math.max(.04,i*.46)),r=e/2,o=i/2,a=new Jf;a.moveTo(-r+s,-o),a.lineTo(r-s,-o),a.absarc(r-s,-o+s,s,-Math.PI/2,0,!1),a.lineTo(r,o-s),a.absarc(r-s,o-s,s,0,Math.PI/2,!1),a.lineTo(-r+s,o),a.absarc(-r+s,o-s,s,Math.PI/2,Math.PI,!1),a.lineTo(-r,-o+s),a.absarc(-r+s,-o+s,s,Math.PI,Math.PI*1.5,!1);const c=new Ul(a,{depth:n,bevelEnabled:!1,curveSegments:5});return c.translate(0,0,-n/2),c.rotateX(-Math.PI/2),c}function YS(i,e,t,n,s,r,o){const a=Math.max(4,Math.round(i/.1)),c=new ii(e,i,8,a);c.rotateX(-Math.PI/2);const l=new Ye(c);l.position.set((t+s)/2,o,(n+r)/2);const u=s-t,h=r-n,f=Math.hypot(u,h)||1;return Ws.set(u/f,0,h/f),l.quaternion.setFromUnitVectors(bd,Ws),l.updateMatrix(),c.applyMatrix4(l.matrix),XS(c),c}function KS(i,e,t,n,s,r,o,a,c){const l=qS(i,e,t,n),u=new Ye(l);u.position.set((s+o)/2,c,(r+a)/2);const h=o-s,f=a-r,d=Math.hypot(h,f)||1;return Ws.set(h/d,0,f/d),u.quaternion.setFromUnitVectors(bd,Ws),u.updateMatrix(),l.applyMatrix4(u.matrix),l}function ZS(i,e,t){const n=WS(e),s=[],r=[];for(let o=0;o<n.length;o++){const a=n[o],c=Math.hypot(a.x1-a.x0,a.z1-a.z0);c<.15||(s.push(YS(c,rl,a.x0,a.z0,a.x1,a.z1,a.y+.03)),r.push(KS(c,rl+.7,.42,FS*.55,a.x0,a.z0,a.x1,a.z1,a.y-.03)))}$n(i,s,t,{cast:!1,receive:!0}),$n(i,r,ct(7033144,{roughness:.96,metalness:0}),{cast:!1,receive:!0})}function $S(i,e){const t=new cn,n=US(i),s=Math.max(48,(n.maxX-n.minX)*4.2),r=Math.max(64,(n.maxZ-n.minZ)*3.6),o=new Ye(DS(s*.98,r*.98),ct(16777215,{vertexColors:!0,roughness:.94,metalness:0}));o.position.y=-.02,o.receiveShadow=!0,o.castShadow=!1,t.add(o);const a={};for(let q=0;q<i.buildings.length;q++)a[i.buildings[q].id]=i.buildings[q].owner;const c=new Map;for(let q=0;q<i.zones.length;q++){const N=i.zones[q],Q=a[N.buildingId],xe=Q?Bh(Cn(Q).slab):Ne.meadow,he=new Ye(MS(),ct(16777215,{vertexColors:!0,roughness:.96,metalness:0}));Q&&(he.userData.owner=Q),he.scale.set(N.rx,1,N.rz),he.position.set(N.x,.02+q*.006,N.z),he.rotation.y=0,he.receiveShadow=!0,he.castShadow=!1,Hh(he,xe),t.add(he),c.set(N.buildingId,he)}const l=[[-.95,2.6,.48,.32,9070660],[.85,-2.15,.42,.28,8216640],[-.7,4.7,.36,.24,9268296]],u=[],h=new re,f=new re(Ne.meadow);for(let q=0;q<l.length;q++){const N=l[q],Q=new Rs(1,18);Q.rotateX(-Math.PI/2),Q.scale(N[2],1,N[3]),Q.translate(N[0],.1,N[1]);const xe=Q.attributes.position,he=new Float32Array(xe.count*3);h.setHex(N[4]);for(let V=0;V<xe.count;V++){const G=Math.min(1,Math.hypot((xe.getX(V)-N[0])/N[2],(xe.getZ(V)-N[1])/N[3])),ae=h.clone();G>.86&&ae.lerp(f,(G-.86)/.14*.55),he[V*3]=ae.r,he[V*3+1]=ae.g,he[V*3+2]=ae.b}Q.setAttribute("color",new Ke(he,3)),u.push(Q)}$n(t,u,ct(16777215,{vertexColors:!0,roughness:.96,metalness:0}),{cast:!1,receive:!0});const d=Md(i),g=new Ye(NS(d.halfWidth*2),ct(16777215,{vertexColors:!0,roughness:.62,metalness:.02}));g.receiveShadow=!0,g.castShadow=!1,t.add(g);const x=ct(16777215,{vertexColors:!0,roughness:.9,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});ZS(t,i,x);const m=LS(Sd(i)),p=[],v=[];for(let q=0;q<m.length;q++)q%3===0?(Yh(m[q],4076588),p.push(m[q])):(Yh(m[q],2762274),v.push(m[q]));const y=ct(16777215,{vertexColors:!0,roughness:.9,metalness:.05,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),_=ct(16777215,{vertexColors:!0,roughness:.88,metalness:.06,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});$n(t,p,y),$n(t,v,_);const C=[],E={},A=[],R=[],b=vd(i);for(let q=0;q<b.length;q++){const N=b[q];A.push({x:N.x,z:N.z,s:N.s}),rc(C,E,N.x,N.z,N.s,N.color)}const S=[[n.minX+.15,n.minZ+1.1,1.05],[n.minX+.35,(n.minZ+n.maxZ)*.15,.9],[n.minX+.2,n.maxZ-1.3,1.12],[n.maxX-.2,n.minZ+1.5,.95],[n.maxX-.3,(n.minZ+n.maxZ)*.2,1.08],[n.maxX-.15,n.maxZ-1.05,.86],[n.minX+1.15,n.maxZ-.2,.78],[n.maxX-1.2,n.minZ+.35,.8]];for(let q=0;q<S.length;q++){const N=S[q];A.push({x:N[0],z:N[1],s:N[2]}),rc(C,E,N[0],N[1],N[2],q%2?Ne.leafDeep:Ne.leaf)}for(let q=0;q<36;q++){const N=q/36*Math.PI*2+.4,Q=9+q%6*.85,xe=Math.cos(N)*Q*1.2,he=Math.sin(N)*Q*.95;if(Math.abs(xe)<2.1&&Math.abs(he)<10||Math.abs(he)<1.7)continue;const V=.75+q%4*.12;A.push({x:xe,z:he,s:V}),rc(C,E,xe,he,V,q%3?Ne.leaf:Ne.leafDeep)}const P=yd(i).slice(),k=[];for(let q=0;q<12;q++){const N=q/12*Math.PI*2+.15,Q=10.5+q%4*1.1;P.push({x:Math.cos(N)*Q*1.15,z:Math.sin(N)*Q*.9,s:1.35+q%3*.45})}for(let q=0;q<P.length;q++)k.push({x:P[q].x,z:P[q].z,s:P[q].s});if(P.length){const q=new Nl(.36,0),N=[];for(let xe=0;xe<P.length;xe++){const he=P[xe],V=q.clone();V.scale(he.s,he.s*.62,he.s*.85),V.translate(he.x,.08,he.z),N.push(V);const G=q.clone();G.scale(he.s*.45,he.s*.35,he.s*.4),G.translate(he.x+.28*he.s,.06,he.z+.22*he.s),N.push(G)}q.dispose();const Q=$n(t,N,ct(Ne.rock,{roughness:.9,metalness:.02}));Q&&R.push(Q)}const B=$n(t,C,ct(Ne.trunk));B&&R.push(B);const W=Object.keys(E);for(let q=0;q<W.length;q++){const N=$n(t,E[W[q]],ct(Number(W[q])));N&&R.push(N)}const J=new Map,X=[],oe=[],U={x:0,z:0};for(let q=0;q<i.buildings.length;q++){const N=i.buildings[q],Q=N.kind==="hq"?ES(Cn(N.owner)):TS(Cn(N.owner)),xe=i.nodes[N.node];SS(i,N.node,U),Q.position.set(xe.x,.06,xe.z),Q.rotation.y=qr(U.x,U.z);const he=N.kind==="hq"?.92:1.47;if(Q.userData.baseScale=he,Q.scale.setScalar(he),Q.userData.owner=N.owner,Q.userData.kind=N.kind,Q.traverse(V=>{V.userData&&V.userData.flutter&&X.push(V)}),N.kind==="barracks"&&N.owner==="player"){const V=AS(Cn(N.owner));V.scale.setScalar(1.65),V.position.set(.95,0,-1.25),Q.add(V)}if(t.add(Q),J.set(N.id,Q),N.kind==="hq"){const V=new Rs(2.6,20);V.rotateX(-Math.PI/2),V.scale(1.2,1,.82),V.translate(xe.x+1.05,.08,xe.z+.85),oe.push(V)}else{const V=new Rs(1.85,14);V.rotateX(-Math.PI/2),V.translate(xe.x+.45,.06,xe.z+.15),oe.push(V)}}const se=$n(t,oe,new _t({color:1841170,transparent:!0,opacity:.22,depthWrite:!1}));se&&R.push(se),t.userData.flora=R,t.userData.treeSpots=A,t.userData.rockSpots=k,t.userData.playBox=n,t.userData.buildings=J;const ie=new _t({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1,side:At}),Z=new _t({vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,toneMapped:!1,side:At}),Ae=PS(),le=IS(),te=[],fe=[],Ee=[],ye=new _t({vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1}),Oe=new _t({vertexColors:!0,transparent:!0,opacity:.07,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1}),Xe=CS(),Ue=[],$e=[];for(let q=0;q<8;q++){const N=Ui(Xe,ye);t.add(N),Ue.push(N);const Q=Ui(Xe,Oe);t.add(Q),$e.push(Q)}for(let q=0;q<Ue.length;q++){const N=Ui(Ae,Z);t.add(N),fe.push(N);const Q=Ui(Ae,ie);t.add(Q),te.push(Q);const xe=new _t({vertexColors:!0,transparent:!0,opacity:.96,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),he=Ui(le,xe);t.add(he),Ee.push(he)}const ce=qh(.22,.16),ge=qh(.46,.16),I=new _t({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,depthTest:!0,side:At,toneMapped:!1}),Fe=new _t({vertexColors:!0,transparent:!0,opacity:.48,depthWrite:!1,depthTest:!1,blending:Es,side:At,toneMapped:!1}),ue=[],Pe=[];for(let q=0;q<Ue.length;q++){const N=Ui(ge,Fe);t.add(N),Pe.push(N);const Q=Ui(ce,I);t.add(Q),ue.push(Q)}const we=pS(i.zones),We=[],Te={},w=new si(1.05,.05,8,32);w.rotateX(Math.PI/2);const M=new Ye(w,new _t({color:4050554}));M.position.y=.2,M.visible=!1,t.add(M);const F=new si(.95,.035,6,28);F.rotateX(Math.PI/2);const H=new Ye(F,new _t({color:16777215}));H.position.y=.18,H.visible=!1,t.add(H);const ne=new Ye(new en(.12,.12,1,8),new _t({color:16774344,transparent:!0,opacity:.95}));ne.visible=!1,ne.frustumCulled=!1,t.add(ne);const j=new Ye(new Cs(.28,.58,8),new _t({color:16774344}));j.visible=!1,j.frustumCulled=!1,t.add(j);const Re=new Ye(new to(.12,8,6),new _t({color:16054260}));Re.visible=!1,t.add(Re);function Me(q,N,Q){let xe,he;const V=Q&&Q.nodes||i.nodes,G=N&&V[N];if(G)xe=G.x,he=G.z;else if(Q&&N){const ae=Q.squads;for(let _e=0;_e<ae.length;_e++)if(ae[_e].id===N){xe=ae[_e].x,he=ae[_e].z;break}}if(xe===void 0){q.visible=!1;return}q.visible=!0,q.position.x=xe,q.position.z=he}function Ce(q,N,Q){const xe=q.squads;for(let he=0;he<xe.length;he++){const V=xe[he];if(V.mode==="siege"&&V.targetId===N&&V.owner!==Q&&V.count>0)return!0}return!1}return{group:t,resetDrag(){ne.visible=!1,j.visible=!1,Re.visible=!1,H.visible=!1},setDrag(q,N,Q,xe){const he=i.nodes,V=xe||q&&he[q];if(!q||!N||!V){ne.visible=!1,j.visible=!1,Re.visible=!1;return}const G=N.x-V.x,ae=N.z-V.z,_e=Math.hypot(G,ae);if(_e<.08?(ne.visible=!1,j.visible=!1):(ne.visible=!0,j.visible=!0,ne.scale.set(1.4,_e,1.4),ne.position.set((V.x+N.x)/2,.55,(V.z+N.z)/2),Ws.set(G/_e,0,ae/_e),ne.quaternion.setFromUnitVectors(yS,Ws),j.quaternion.copy(ne.quaternion),j.position.set(N.x,.55,N.z)),Re.visible=!0,Re.position.set(N.x,.28,N.z),Q&&Q!==q&&he[Q]){H.visible=!0;const D=he[Q];H.position.x=D.x,H.position.z=D.z}else H.visible=!1},update(q,N,Q){for(let G=0;G<N.buildings.length;G++){const ae=N.buildings[G];Te[ae.id]=ae.owner;const _e=J.get(ae.id);if(!_e)continue;_e.userData.owner!==ae.owner&&(_e.userData.owner=ae.owner,RS(_e,ae.owner));const D=c.get(ae.id);D&&D.userData.owner!==ae.owner&&(D.userData.owner=ae.owner,Hh(D,Bh(Cn(ae.owner).slab)));const pe=ae.upgrades;_e.userData.pip&&(_e.userData.pip.visible=!!(pe&&(pe.haste>0||pe.bulwark>0)));const K=ae.capture>.04,ee=ae.kind==="hq"&&(ae.count<=0||Ce(N,ae.id,ae.owner))||K,me=_e.userData.baseScale||1;if(ee&&!e){const Je=me*(1+.045*Math.sin(q*9));_e.scale.setScalar(Je)}else _e.scale.setScalar(me);const de=_e.userData.pulse;de&&(ee?(de.emissive=de.emissive||new re,de.emissive.setHex(K?16742962:Cn(ae.owner).glow),de.emissiveIntensity=.35+(e?0:.4*Math.sin(q*9))):(de.emissive.setHex(3817528),de.emissiveIntensity=.14));const ze=_e.userData.dangerRing;if(ze&&(ze.visible=!!ee,ee)){const Je=1+(e?0:.18*(.5+.5*Math.sin(q*6)));ze.scale.set(Je,Je,Je),ze.material.color.setHex(K?16769162:Cn(ae.owner).glow)}}const xe=mS(we,Te,We);ye.opacity=.92;let he=-1,V=1/0;for(let G=0;G<Ue.length;G++){const ae=xe[G];if(!ae)continue;const _e=ae.axis!=="z",D=_e?Math.max(.8,ae.x1-ae.x0):Math.max(.8,ae.z1-ae.z0),pe=_e?ae.z:(ae.z0+ae.z1)/2,K=Math.abs(pe)*3-D;K<V&&(V=K,he=G)}for(let G=0;G<Ue.length;G++){const ae=xe[G],_e=Ue[G];if(!ae){_e.visible=!1,$e[G].visible=!1,te[G].visible=!1,fe[G].visible=!1,Ee[G].visible=!1,ue[G].visible=!1,Pe[G].visible=!1;continue}const D=ae.axis!=="z",pe=D?Math.max(.8,ae.x1-ae.x0):Math.max(.8,ae.z1-ae.z0),K=D?(ae.x0+ae.x1)/2:ae.x,ee=D?ae.z:(ae.z0+ae.z1)/2,me=ae.plusOwner==="player"?0:Math.PI,de=D?me:Math.PI/2+me;_e.visible=!0;const ze=1.22,Je=Math.sin(de)*ze,ft=Math.cos(de)*ze;_e.position.set(K+Je,.22,ee+ft),_e.scale.set(pe,1,1.2),_e.rotation.y=de;const tt=$e[G];tt.visible=!0,tt.position.set(K+Je,.1,ee+ft),tt.scale.set(pe,1,1.75),tt.rotation.y=de;const St=te[G],dt=fe[G];St.visible=!0,dt.visible=!0;const Lt=9.2,Dt=K+Je*1.15,Ht=ee+ft*2.15;St.position.set(Dt,.68,Ht),dt.position.set(Dt,.6,Ht),St.scale.set(Lt,1,1.5),dt.scale.set(Lt*1.04,1,2.05),St.rotation.y=de,dt.rotation.y=de,St.visible=!1,dt.visible=!1,_e.visible=!1,tt.visible=!1,Ee[G].visible=!1;const ln=G===he,Fn=Math.max(pe,13);ue[G].visible=ln,Pe[G].visible=ln,ln&&(ue[G].position.set(K+Je,.36,ee+ft),Pe[G].position.set(K+Je,.3,ee+ft),ue[G].scale.set(Fn,1,1),Pe[G].scale.set(Fn,1,1),ue[G].rotation.y=de,Pe[G].rotation.y=de)}for(let G=xe.length;G<$e.length;G++)$e[G].visible=!1,te[G].visible=!1,fe[G].visible=!1,Ee[G].visible=!1,ue[G].visible=!1,Pe[G].visible=!1;Me(M,Q,N),!e&&M.visible&&(M.rotation.y=q*.8);for(let G=0;G<X.length;G++){const ae=X[G];ae.rotation.y=e?0:Math.sin(q*2.2+G)*.4}},dispose(){const q=new Set,N=new Set;t.traverse(Q=>{Q.geometry&&q.add(Q.geometry),Q.material&&N.add(Q.material)});for(const Q of q)Q.dispose();for(const Q of N)Q.dispose()}}}function JS(){const i=new to(46,20,12),e=i.attributes.position,t=new Float32Array(e.count*3),n=new re(15003382),s=new re(Ne.sky),r=new re(14996654),o=new re;for(let c=0;c<e.count;c++){const l=e.getY(c)/46,u=Ef.clamp((l+.15)/1.15,0,1);u<.42?o.copy(r).lerp(s,u/.42):o.copy(s).lerp(n,(u-.42)/.58),t[c*3]=o.r,t[c*3+1]=o.g,t[c*3+2]=o.b}i.setAttribute("color",new Ke(t,3));const a=new Ye(i,new _t({vertexColors:!0,side:Yt,depthWrite:!1,fog:!1,toneMapped:!1}));return a.frustumCulled=!1,a.renderOrder=-2,a}function jS(i){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;i.add(JS());const t=new ii(180,220,36,40),n=t.attributes.position,s=new Float32Array(n.count*3),r=new re(7317578),o=new re(5146168),a=new re(9357402),c=new re(9070660),l=new re;for(let x=0;x<n.count;x++){const m=n.getX(x),p=n.getY(x),v=Math.sin(m*.07)*Math.cos(p*.055)+Math.sin(m*.16+p*.11)*.4,y=Math.sin(m*.09+1.7)*Math.cos(p*.075);l.copy(r),v>.25?l.lerp(a,.4):y<-.35?l.lerp(o,.32):l.lerp(o,.12),Math.abs(m)<1.1&&y>.55&&l.lerp(c,.4),s[x*3]=l.r,s[x*3+1]=l.g,s[x*3+2]=l.b}t.setAttribute("color",new Ke(s,3));const u=new Ye(t,ct(16777215,{vertexColors:!0,roughness:.96,metalness:0}));u.rotation.x=-Math.PI/2,u.position.y=-.05,u.receiveShadow=!0,i.add(u);const h=new cn;i.add(h);let f=null,d=null;function g(x){f&&(h.remove(f.group),f.dispose(),f=null),f=$S(x,e),h.add(f.group),d&&d(f.group)}return{mount:g,setDresser(x){d=x,f&&d(f.group)},resetDrag(){f&&f.resetDrag()},setDrag(x,m,p,v){f&&f.setDrag(x,m,p,v)},update(x,m,p){f&&f.update(x,m,p)}}}const QS="long-road",eb="長路",tb="前後哨站，路更長",nb="cautious",ib={"player-hq":{x:0,z:7.2},"player-road":{x:0,z:5},"player-bar":{x:1.75,z:5},"player-post":{x:0,z:1.35},"enemy-post":{x:0,z:-1.35},"enemy-road":{x:0,z:-5},"enemy-bar":{x:-1.75,z:-5},"enemy-hq":{x:0,z:-7.2}},sb={"player-hq":["player-road"],"player-road":["player-hq","player-bar","player-post"],"player-bar":["player-road"],"player-post":["player-road","enemy-post"],"enemy-post":["player-post","enemy-road"],"enemy-road":["enemy-post","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},rb=[{buildingId:"player-hq",x:0,z:6.55,rx:3.15,rz:1.15},{buildingId:"player-bar",x:.3,z:4.75,rx:3.2,rz:.95},{buildingId:"player-post",x:0,z:1.45,rx:3.15,rz:1.2},{buildingId:"enemy-post",x:0,z:-1.45,rx:3.15,rz:1.2},{buildingId:"enemy-bar",x:-.3,z:-4.75,rx:3.2,rz:.95},{buildingId:"enemy-hq",x:0,z:-6.55,rx:3.15,rz:1.15}],ob=["player-hq","player-road","player-post","enemy-post","enemy-road","enemy-hq"],ab=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:14,cap:30,regen:.3},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:22,cap:48,regen:2},{id:"player-post",kind:"barracks",owner:"player",node:"player-post",count:12,cap:36,regen:1.4},{id:"enemy-post",kind:"barracks",owner:"enemy",node:"enemy-post",count:12,cap:36,regen:1.15},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:16,cap:44,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:36,cap:48,regen:0}],cb={id:QS,name:eb,blurb:tb,personality:nb,nodes:ib,graph:sb,zones:rb,road:ob,buildings:ab},lb="two-lanes",ub="雙橋",hb="左右兩條路，可以分兵",fb="aggressive",db={"player-hq":{x:0,z:6.6},"hub-p":{x:0,z:4.3},"player-west":{x:-1.85,z:1.25},"player-east":{x:1.85,z:1.25},"enemy-west":{x:-1.85,z:-1.25},"enemy-east":{x:1.85,z:-1.25},"hub-e":{x:0,z:-4.3},"enemy-hq":{x:0,z:-6.6}},pb={"player-hq":["hub-p"],"hub-p":["player-hq","player-west","player-east"],"player-west":["hub-p","enemy-west"],"player-east":["hub-p","enemy-east"],"enemy-west":["player-west","hub-e"],"enemy-east":["player-east","hub-e"],"hub-e":["enemy-west","enemy-east","enemy-hq"],"enemy-hq":["hub-e"]},mb=[{buildingId:"player-hq",x:0,z:6.15,rx:3.2,rz:1.15},{buildingId:"player-west",x:-1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"player-east",x:1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"enemy-west",x:-1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-east",x:1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-hq",x:0,z:-6.15,rx:3.2,rz:1.15}],gb=["player-hq","hub-p","player-west","enemy-west","hub-e","enemy-hq"],xb=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.28},{id:"player-west",kind:"barracks",owner:"player",node:"player-west",count:18,cap:42,regen:1.8},{id:"player-east",kind:"barracks",owner:"player",node:"player-east",count:18,cap:42,regen:1.8},{id:"enemy-west",kind:"barracks",owner:"enemy",node:"enemy-west",count:14,cap:40,regen:1.45},{id:"enemy-east",kind:"barracks",owner:"enemy",node:"enemy-east",count:14,cap:40,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:40,cap:50,regen:0}],_b={id:lb,name:ub,blurb:hb,personality:fb,nodes:db,graph:pb,zones:mb,road:gb,buildings:xb};function sa(i,e,t=dl){if(i===e)return[i];if(!t[i]||!t[e])return null;const n={[i]:null},s=[i];for(;s.length;){const r=s.shift(),o=t[r]||[];for(let a=0;a<o.length;a++){const c=o[a];if(!Object.prototype.hasOwnProperty.call(n,c)){if(n[c]=r,c===e){const l=[e];let u=e;for(;n[u];)u=n[u],l.push(u);return l.reverse(),l}s.push(c)}}}return null}const Or=[Ys,cb,_b],ol={easy:{id:"easy",label:"易",sendMinScale:.7,periodScale:1.55,regenScale:.6,reactDelay:3.6,firstShift:0,hqGrace:36,marchCap:8},normal:{id:"normal",label:"中",sendMinScale:1,periodScale:1,regenScale:1.08,reactDelay:.45,firstShift:0,hqGrace:20,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:6,hqRegen:.24,waveKeep:.58,maxRelief:1,barBonus:0,hqBonus:10,reliefCap:24,counterCap:16},hard:{id:"hard",label:"難",sendMinScale:.85,periodScale:.9,regenScale:1.16,reactDelay:.35,firstShift:-6,hqGrace:12,hqAssault:60,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:12,hqRegen:.32,waveKeep:.64,maxRelief:1,barBonus:12,hqBonus:18,reliefCap:26,counterCap:16}};function vb(i){for(let e=0;e<Or.length;e++)if(Or[e].id===i)return Or[e];return Ys}function yb(i){return ol[i]||ol.normal}function Mb(i,e){const t=e&&e.firstShift?e.firstShift:0;return Math.max(4,i+t)}function Kh(i){const e=Math.floor(i*.5);return Math.max(0,Math.min(e,i-8))}function Sb(i,e,t,n,s,r){return i>=e?!0:!t||n==null||r?!1:i>=n+s}function Zh(i){return i.hqGrace>0&&i.t<i.hqGrace||i.hqAssault>0&&i.t<i.hqAssault}function bb(i,e){return i==="aggressive"?(e.kind==="hq"?40:16)-e.count-e.travel*.5:i==="cautious"?(e.kind==="hq"?-20:0)-e.travel*2-e.count*.05:-e.travel*10-e.count*.01}function wb(i,e,t){let n=null,s=-1/0;const r=e??i.length;for(let o=0;o<r;o++){if(t&&i[o].kind==="hq")continue;const a=i[o].count*10-i[o].travel;a>s&&(s=a,n=i[o])}return n}function Eb(i,e,t,n){let s=null,r=-1/0;const o=t??e.length;for(let a=0;a<o;a++){if(n&&e[a].kind==="hq")continue;const c=bb(i,e[a]);c>r&&(r=c,s=e[a])}return s}function Tb(i,e){if(e.relief=!1,e.counter=!1,!Sb(i.t,i.nextSendAt,i.underAttack,i.alarmAt,i.reactDelay,i.answered)||i.count<2||i.kind==="hq"&&(i.wave||0)>=2)return!1;const n=!!(i.holdWall&&i.underAttack&&i.ownsThreatened&&i.threatenedId),s=n&&i.buildingId===i.threatenedId;if(s&&i.count>=8)return!1;const r=n&&!s;if(i.kind==="hq"&&(i.wave||0)>=1&&!r)return!1;if(r){const u=i.reliefKeep>0?i.reliefKeep:.35,h=i.counterKeep>0?i.counterKeep:u,f=i.relieve?u:h;let d=Math.min(i.count-1,Math.max(0,Math.floor(i.count*f)));if(i.marchCap>0){const v=i.count-i.marchCap;v>d&&(d=v)}const g=i.reliefCap>0?i.reliefCap:12,x=i.counterCap>0?i.counterCap:10;if(i.relieve){const v=Math.min(g,i.count-1),y=i.count-v;y>d&&(d=y)}else{const v=i.count-x;v>d&&(d=v)}if(i.count-d<1)return!1;if(i.relieve)return e.targetId=i.threatenedId,e.keep=d,e.relief=!0,!0;if(i.threatenedKind==="hq"&&i.riposte>0&&i.alarmAt!=null&&i.t<i.alarmAt+i.riposte)return!1;const m=Zh(i),p=wb(i.targets,i.targetCount,m);return p?(e.targetId=p.id,e.keep=d,e.counter=!0,!0):!1}if(!r&&i.t<i.nextSendAt&&!(i.kind==="hq"?i.count<14:i.count<i.sendMin)&&!i.opened)return!1;const o=!!(i.underAttack&&i.threatenedId&&!i.pressing);if(!r&&o&&i.buildingId!==i.threatenedId&&i.ownsThreatened){const u=i.reliefKeep>0?i.reliefKeep:.35,h=Math.min(i.count-1,Math.max(0,Math.floor(i.count*u)));return i.count-h<1?!1:(e.targetId=i.threatenedId,e.keep=h,!0)}if(!o){if(i.kind==="hq"){const u=Kh(i.count);if(i.count<14||i.count-u<8)return!1}else if(i.count<i.sendMin)return!1}const a=Zh(i),c=Eb(i.personality,i.targets,i.targetCount,a);if(!c)return!1;let l=0;if(i.kind==="hq"&&!o){l=Kh(i.count);const u=i.count-14;u>l&&(l=u)}else o?l=i.count>=3?1:0:i.personality==="cautious"&&(l=Math.min(i.count-1,Math.max(0,Math.floor(i.count*.3))));if(i.marchCap>0&&!o){const u=i.count-i.marchCap;u>l&&(l=u)}if(!o&&i.waveKeep>0&&i.kind!=="hq"){const u=Math.floor(i.count*i.waveKeep);u>l&&(l=Math.min(u,i.count-1))}return i.count-l<1?!1:(e.targetId=c.id,e.keep=l,!0)}const vn={clashEvery:.3,clashLoss:4,captureSeconds:.7,marchSpeed:4.8,contactRadius:.92,arriveRadius:.7,enemySendMin:16,enemySendPeriod:10,substep:.05},Ab={"enemy-bar":16,"enemy-hq":22};function Rb({garrison:i,attackerCount:e,attackerOwner:t,buildingOwner:n}){const s=Math.max(0,Math.floor(i||0)),r=Math.max(0,Math.floor(e||0));return s>0||r<=0||!t||!n?!1:t!==n}function Cb(i,e,t,n){if(!n)return{progress:0,done:!1};const s=t,r=Math.max(0,i||0)+Math.max(0,e)/s;return r>=1?{progress:1,done:!0}:{progress:r,done:!1}}function Pb(i,e){return{owner:i,count:Math.max(0,Math.floor(e||0)),capture:0}}function Ib(i,e){return i!=="player"?"lose":e==="player"?"win":null}function $h(i,e,t){const n=Math.max(0,Math.floor(Number.isFinite(i)?i:0)),s=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),r=Math.max(0,Math.floor(Number.isFinite(t)?t:0)),o=Math.min(n,s,r),a=n-o,c=s-o;let l=null;return a===0&&c===0?l="none":a>0&&c===0?l="a":c>0&&a===0&&(l="b"),{a,b:c,loss:o,winner:l}}function Lb(i,e){const t=i.map(l=>Math.max(0,Math.floor(l))),n=t.reduce((l,u)=>l+u,0),s=Math.max(0,Math.floor(e));if(n<=0||s<=0)return t.map(()=>0);const r=t.map(l=>l/n*s),o=r.map(l=>Math.floor(l));let a=s-o.reduce((l,u)=>l+u,0);const c=r.map((l,u)=>({i:u,frac:l-Math.floor(l)})).sort((l,u)=>u.frac-l.frac||l.i-u.i);for(let l=0;l<c.length&&a>0;l++)o[c[l].i]+=1,a-=1;return o}function Db(i,e,t,n,s){const r=Math.max(0,i),o=Math.max(0,e);if(!(n>0)||r>=o||!(s>0))return{count:Math.min(r,o>0?Math.max(r,0):r),bank:r>=o?0:t||0};let a=(t||0)+n*s,c=r;const l=Math.floor(a);if(l>0){const u=Math.min(o-c,l);c+=u,a-=l,c>=o&&(c=o,a=0)}return{count:c,bank:a}}function Nb(i,e){const t=i.owner==="enemy"&&e.regenScale>0?e.regenScale:1;let n=i.regen*t;i.owner==="enemy"&&i.kind==="hq"&&e.hqRegen>0&&(n+=e.hqRegen);let s=i.count,r=i.cap;return i.owner==="enemy"&&i.kind==="barracks"&&e.barBonus>0&&(s=Math.min(i.cap,i.count+e.barBonus)),i.owner==="enemy"&&i.kind==="hq"&&e.hqBonus>0&&(s=i.count+e.hqBonus,r=Math.max(i.cap,s)),{id:i.id,kind:i.kind,owner:i.owner,node:i.node,count:s,cap:r,regen:n,baseRegen:i.regen,bank:0,capture:0,upgrades:{haste:0,bulwark:0}}}function Ub(i={}){const e=vb(i.mapId||"crossing"),t=yb(i.difficulty||"normal"),n=e.buildings.map(r=>Nb(r,t)),s={};for(let r=0;r<n.length;r++){const o=n[r];if(o.owner!=="enemy")continue;const a=Ab[o.id]??(o.kind==="hq"?22:16);s[o.id]=Mb(a,t)}return{t:0,status:i.status||"playing",ai:i.ai!==!1,clashAcc:0,nextSquadId:1,nextSendAt:s,buildings:n,squads:[],events:[],map:e,nodes:e.nodes,graph:e.graph,personality:e.personality||"balanced",difficulty:t.id,sendMin:vn.enemySendMin*t.sendMinScale,sendPeriod:vn.enemySendPeriod*t.periodScale,reactDelay:t.reactDelay,hqGrace:t.hqGrace>0?t.hqGrace:0,hqAssault:t.hqAssault>0?t.hqAssault:0,marchCap:t.marchCap>0?t.marchCap:0,reliefKeep:t.reliefKeep>0?t.reliefKeep:0,holdWall:!!t.holdWall,riposte:t.riposte>0?t.riposte:0,counterKeep:t.counterKeep>0?t.counterKeep:0,waveKeep:t.waveKeep>0?t.waveKeep:0,maxRelief:t.maxRelief>0?t.maxRelief:0,reliefCap:t.reliefCap>0?t.reliefCap:12,counterCap:t.counterCap>0?t.counterCap:10,alarmAt:null,answered:{},opened:{},waveTurn:{},reliefCount:{}}}function Qs(i){return i&&i.nodes||Is}function Hl(i){return i&&i.graph||dl}function Zt(i,e){for(let t=0;t<i.buildings.length;t++)if(i.buildings[t].id===e)return i.buildings[t];return null}function Ss(i,e){if(!i)return null;for(let t=0;t<i.squads.length;t++)if(i.squads[t].id===e)return i.squads[t];return null}function Rd(i,e,t){if(!i||i.status!=="playing")return{ok:!1,reason:"over"};const n=Ss(i,e),s=Zt(i,t);if(!n||n.owner!=="player"||n.count<=0)return{ok:!1,reason:"bad-squad"};if(!s)return{ok:!1,reason:"bad-target"};const r=n.path||[];if(!r.length)return{ok:!1,reason:"no-path"};const o=n.seg>=r.length-1,a=o?r[r.length-1]:r[n.seg],c=o?null:r[n.seg+1];let l;const u=Hl(i);if(!c)l=sa(a,s.node,u);else{const h=sa(c,s.node,u);if(!h)return{ok:!1,reason:"no-path"};l=h[0]===a?h:[a,...h]}return!l||l.length<2?{ok:!1,reason:"same"}:(n.targetId=s.id,n.path=l,n.seg=0,n.mode="march",i.events.push({type:"retarget",squadId:e,targetId:t,owner:n.owner}),{ok:!0})}function Jh(i,e){let t=0;for(let n=0;n<i.buildings.length;n++){const s=i.buildings[n];s.owner===e&&(t+=s.count)}for(let n=0;n<i.squads.length;n++){const s=i.squads[n];s.owner===e&&(t+=s.count)}return t}function Fb(i){const e=Math.max(0,Math.floor(i.count||0));if(e<=1)return 0;const t=Math.max(1,Math.floor(e*.2));return Math.min(t,6,e-1)}function Gl(i,e,t,n=0){if(!i||i.status!=="playing")return{ok:!1,reason:"over"};const s=Zt(i,e),r=Zt(i,t);if(!s||!r||s.id===r.id)return{ok:!1,reason:"bad-target"};const o=Math.max(0,Math.floor(n));if(s.count-o<1)return{ok:!1,reason:"empty"};const a=sa(s.node,r.node,Hl(i));if(!a||a.length<2)return{ok:!1,reason:"no-path"};const c=s.count-o;s.count=o,s.bank=0;const l=Qs(i)[a[0]],u={id:`sq${i.nextSquadId++}`,owner:s.owner,count:c,targetId:r.id,path:a,seg:0,x:l.x,z:l.z,mode:"march"};return i.squads.push(u),i.events.push({type:"send",owner:s.owner,count:c,fromId:e,targetId:t}),{ok:!0,count:c,id:u.id}}function Ob(i,e,t){let n=vn.marchSpeed*e;for(;n>0&&i.seg<i.path.length-1;){const s=t[i.path[i.seg+1]],r=s.x-i.x,o=s.z-i.z,a=Math.hypot(r,o);if(a<=1e-6){i.x=s.x,i.z=s.z,i.seg+=1;continue}if(a<=n+1e-8)i.x=s.x,i.z=s.z,n-=a,i.seg+=1;else{const c=1/a;i.x+=r*c*n,i.z+=o*c*n,n=0}}}function zb(i,e){let t=0;for(let n=0;n<i.length-1;n++){const s=e[i[n]],r=e[i[n+1]];t+=Math.hypot(s.x-r.x,s.z-r.z)}return t}const ki={id:null},xi={targetId:"",keep:0,relief:!1,counter:!1},ra=[];for(let i=0;i<12;i++)ra.push({id:"",kind:"",count:0,travel:0});function Bb(i){ki.id=null,ki.dist=1/0;let e=1/0,t=!1;const n=Qs(i);for(let s=0;s<i.squads.length;s++){const r=i.squads[s];if(r.owner!=="player"||r.count<=0||!r.targetId)continue;const o=Zt(i,r.targetId);if(!o||o.owner!=="enemy")continue;t=!0;const a=n[o.node],c=Math.hypot(r.x-a.x,r.z-a.z);c<e&&(e=c,ki.id=o.id,ki.dist=c)}return t}function kb(i,e){const t=Qs(i),n=Hl(i);let s=0;for(let r=0;r<i.buildings.length&&s<ra.length;r++){const o=i.buildings[r];if(o.owner!=="player")continue;const a=sa(e,o.node,n);if(!a)continue;const c=ra[s];c.id=o.id,c.kind=o.kind,c.count=o.count,c.travel=a.length<2?0:zb(a,t),s+=1}return s}function Hb(i){if(!i.ai)return;const e=Bb(i);e?i.alarmAt==null&&(i.alarmAt=i.t):i.alarmAt!=null&&(i.alarmAt=null);const t=Zt(i,ki.id),n=e&&ki.dist<=vn.arriveRadius,s=i.opened||(i.opened={});let r=null;if(i.holdWall&&e&&t&&t.owner==="enemy"){const o=Qs(i),a=o[t.node];let c=1/0;if(a)for(let l=0;l<i.buildings.length;l++){const u=i.buildings[l];if(u.owner!=="enemy"||u.id===t.id||u.count<2)continue;const h=o[u.node];if(!h)continue;const f=(h.x-a.x)*(h.x-a.x)+(h.z-a.z)*(h.z-a.z);f<c&&(c=f,r=u.id)}}for(let o=0;o<i.buildings.length;o++){const a=i.buildings[o];if(a.owner!=="enemy")continue;const c=kb(i,a.node);if(!Tb({t:i.t,nextSendAt:i.nextSendAt[a.id]??0,underAttack:e,alarmAt:i.alarmAt,reactDelay:i.reactDelay,answered:!!i.answered[a.id],count:a.count,kind:a.kind,buildingId:a.id,personality:i.personality,sendMin:i.sendMin,threatenedId:ki.id,ownsThreatened:!!(t&&t.owner==="enemy"),targets:ra,targetCount:c,opened:!!s[a.id],pressing:n,hqGrace:i.hqGrace||0,hqAssault:i.hqAssault||0,marchCap:i.marchCap||0,reliefKeep:i.reliefKeep||0,holdWall:!!i.holdWall,counterKeep:i.counterKeep||0,waveKeep:i.waveKeep||0,wave:i.waveTurn[a.id]||0,reliefCap:i.reliefCap||0,counterCap:i.counterCap||0,riposte:i.riposte||0,threatenedKind:t?t.kind:"",relieve:!!(r&&r===a.id&&t&&t.owner==="enemy"&&t.kind==="barracks"&&t.count>=12&&i.maxRelief>0&&(i.reliefCount[a.id]||0)<i.maxRelief&&(i.waveTurn[a.id]||0)%2===0)},xi)||!Gl(i,a.id,xi.targetId,xi.keep).ok)continue;s[a.id]=!0,(xi.relief||xi.counter)&&(i.waveTurn[a.id]=(i.waveTurn[a.id]||0)+1),xi.relief&&(i.reliefCount[a.id]=(i.reliefCount[a.id]||0)+1);let h=i.sendPeriod;(xi.relief||xi.counter)&&i.riposte>0&&(h=i.riposte),i.nextSendAt[a.id]=i.t+h,e&&(i.answered[a.id]=!0)}}function Gb(i){const e=i.squads,t=new Set,n=[];for(let s=0;s<e.length;s++){const r=e[s];if(r.count<=0||t.has(r.id))continue;let o=null,a=vn.contactRadius;for(let c=0;c<e.length;c++){if(s===c)continue;const l=e[c];if(l.count<=0||t.has(l.id)||l.owner===r.owner)continue;const u=Math.hypot(r.x-l.x,r.z-l.z);u<=a&&(a=u,o=l)}o&&(t.add(r.id),t.add(o.id),n.push([r,o]))}return{pairs:n,paired:t}}function Vb(i,e){for(let t=0;t<i.squads.length;t++){const n=i.squads[t];if(n.count<=0)continue;if(e.has(n.id)){n.mode="fight";continue}const s=Zt(i,n.targetId);if(!s){n.mode="march";continue}const r=Qs(i)[s.node],o=Math.hypot(n.x-r.x,n.z-r.z);if(n.seg>=n.path.length-1&&o<=vn.arriveRadius)if(s.owner===n.owner){const c=Math.max(0,s.cap-s.count),l=Math.min(n.count,c);l>0&&(s.count+=l,n.count-=l,i.events.push({type:"reinforce",buildingId:s.id,owner:n.owner})),n.count>0&&(n.x=r.x,n.z=r.z,n.mode="march")}else n.mode="siege",n.x=r.x,n.z=r.z;else n.mode="march"}}function Wb(i,e){let t=!1;for(let s=0;s<e.length;s++){const r=e[s][0],o=e[s][1];if(r.count<=0||o.count<=0)continue;const a=$h(r.count,o.count,vn.clashLoss);r.count=a.a,o.count=a.b,t=!0}const n=new Map;for(let s=0;s<i.squads.length;s++){const r=i.squads[s];if(r.mode!=="siege"||r.count<=0)continue;let o=n.get(r.targetId);o||(o=[],n.set(r.targetId,o)),o.push(r)}for(const[s,r]of n){const o=Zt(i,s);if(!o||r.every(f=>f.owner===o.owner))continue;const a=r.filter(f=>f.owner!==o.owner&&f.count>0);if(!a.length)continue;const c=a.map(f=>f.count),l=c.reduce((f,d)=>f+d,0),u=$h(l,o.count,vn.clashLoss);o.count=u.b;const h=Lb(c,u.a);for(let f=0;f<a.length;f++)a[f].count=h[f];o.count>0&&(o.capture=0),t=!0}t&&i.events.push({type:"clash"})}function Xb(i,e){for(let t=0;t<i.buildings.length;t++){const n=i.buildings[t];let s=0,r=null;const o=[];for(let u=0;u<i.squads.length;u++){const h=i.squads[u];h.mode!=="siege"||h.targetId!==n.id||h.count<=0||h.owner!==n.owner&&(s+=h.count,r=h.owner,o.push(h))}const a=Rb({garrison:n.count,attackerCount:s,attackerOwner:r,buildingOwner:n.owner}),c=Cb(n.capture,e,vn.captureSeconds,a);if(n.capture=c.progress,!c.done||!r)continue;const l=Pb(r,s);n.owner=l.owner,n.count=l.count,n.capture=0,n.bank=0;for(let u=0;u<o.length;u++)o[u].count=0;i.events.push({type:"capture",buildingId:n.id,owner:r})}}function qb(i){const e=Zt(i,"player-hq"),t=Zt(i,"enemy-hq"),n=Ib(e&&e.owner,t&&t.owner);n&&i.status==="playing"&&(i.status=n,i.events.push({type:n}))}function Yb(i,e){if(i.status!=="playing")return;for(let r=0;r<i.buildings.length;r++){const o=i.buildings[r];if(!(o.regen>0)||o.kind!=="barracks"&&o.kind!=="hq")continue;let a=!1;for(let u=0;u<i.squads.length;u++){const h=i.squads[u];if(h.mode==="siege"&&h.targetId===o.id&&h.owner!==o.owner&&h.count>0){a=!0;break}}if(a)continue;const c=o.count,l=Db(o.count,o.cap,o.bank,o.regen,e);o.count=l.count,o.bank=l.bank,o.count>c&&i.events.push({type:"spawn",buildingId:o.id,owner:o.owner})}Hb(i);const t=Qs(i);for(let r=0;r<i.squads.length;r++){const o=i.squads[r];o.mode==="march"&&o.count>0&&Ob(o,e,t)}const{pairs:n,paired:s}=Gb(i);for(Vb(i,s),i.clashAcc+=e;i.clashAcc>=vn.clashEvery;)i.clashAcc-=vn.clashEvery,Wb(i,n);Xb(i,e),i.squads.some(r=>r.count<=0)&&(i.squads=i.squads.filter(r=>r.count>0)),qb(i)}function Cd(i,e,t={}){if(!i||i.status!=="playing"||!Number.isFinite(e)||e<=0)return i;t.ai===!1&&(i.ai=!1),t.ai===!0&&(i.ai=!0),i.events.length=0;let n=e;const s=vn.substep;for(;n>1e-8&&i.status==="playing";){const r=Math.min(s,n);Yb(i,r),i.t+=r,n-=r}return i}const oa=document.getElementById("app"),da=document.getElementById("view"),_s=document.getElementById("hint"),Hi=document.getElementById("sheet"),bs=document.getElementById("mute"),ri=document.getElementById("home"),Pd=document.getElementById("upgrades"),Id=document.getElementById("up-haste"),Ld=document.getElementById("up-bulwark"),Kb=document.getElementById("score-mine"),Zb=document.getElementById("score-foe"),oc=document.querySelector(".scores"),Xs=document.getElementById("coach"),aa=document.getElementById("toast"),jh=document.getElementById("sheet-time"),zt=hM(da),qs=jS(zt.scene),pa=oM(zt.scene),$b=hS(qs,pa),Dd=aM(zt.scene);let al=!0;const Vl=$y(document.getElementById("badges")),jt=Xd();let $r="crossing",Jr="normal",Ve=null,wt=null,ca=!1,Qh=0,cl=!1;function Nd(){const i=jt.muted;bs.textContent=i?"🔇":"🔊",bs.setAttribute("aria-pressed",i?"true":"false"),bs.setAttribute("aria-label",i?"打開聲音":"靜音"),bs.classList.toggle("is-muted",i)}function Jb(i){const e=Math.max(0,Math.floor(i||0));if(e<60)return`用咗 ${e} 秒`;const t=Math.floor(e/60),n=e%60;return`用咗 ${t} 分 ${n} 秒`}function ll(){Xs&&(Xs.hidden=!0);try{localStorage.setItem(Gd,"1")}catch{}}function Ud(){Xs&&(Xs.hidden=!0)}function jb(){if(!aa)return;let i=!1;if(Ve&&Ve.status==="playing"&&ri.hidden){const e=Ve.squads;for(let t=0;t<e.length;t++){const n=e[t];if(n.owner==="enemy"&&n.count>0&&n.targetId==="player-hq"){i=!0;break}}}i!==cl&&(cl=i,aa.hidden=!i)}function Qt(i){if(ri&&!ri.hidden){_s.hidden=!0;return}if(_s.hidden=!1,!Ve||Ve.status!=="playing"){_s.textContent="再戰，或者揀地圖";return}i==="drag"?_s.textContent="鬆手就出兵":i==="selected"?_s.textContent="可以升級，或者拖去目標出兵":_s.textContent="點自己建築出兵"}function ul(i){Hi.hidden=!1,Hi.classList.toggle("win",i==="win"),Hi.classList.toggle("lose",i==="lose"),document.getElementById("sheet-title").textContent=i==="win"?"勝利":"戰敗",document.getElementById("sheet-kicker").textContent="戰果",document.getElementById("sheet-body").textContent=i==="win"?"攻陷敵方司令部":"司令部被攻陷",jh&&(jh.textContent=Jb(Ve&&Ve.t)),Qt("idle")}function jr(){Hi.hidden=!0,Hi.classList.remove("win","lose")}function Wl(){Ve&&(Kb.textContent=String(Jh(Ve,"player")),Zb.textContent=String(Jh(Ve,"enemy")))}function Fd(){const i=zt.camera;ri&&!ri.hidden?lM(i,i.aspect):fd(i,i.aspect)}function qi(i){ri.hidden=!i,oa&&oa.classList.toggle("is-home",!!i),oc&&(oc.hidden=!1,oc.classList.toggle("is-preview",!!i)),i&&(Pd.hidden=!0),Fd(),Ud()}function Yi(i){Ve=Ub({mapId:$r,difficulty:Jr,status:i}),qs.mount(Ve.map),zt.renderer.shadowMap.needsUpdate=!0,pa.setMap(Ve.map),Vl.setMap(Ve.map),wt=null,ca=!1,qs.resetDrag(),cl=!1,aa&&(aa.hidden=!0),Wl(),Ud()}function ma(i,e,t){const n=i.querySelectorAll("button");for(let s=0;s<n.length;s++)n[s].classList.toggle("is-on",n[s].getAttribute(e)===t)}function Od(){const i=wt&&Ve&&Ve.status==="playing"?Zt(Ve,wt):null,e=!!(i&&i.owner==="player"&&ri.hidden);Pd.hidden=!e,e&&(ef(Id,i,"haste"),ef(Ld,i,"bulwark"))}function ef(i,e,t){const n=Ls(e,t),s=n.rank+1,r=n.reason==="max"?`${n.label} 滿級`:`${n.label} ${s}級 · ${n.cost}`;i.textContent!==r&&(i.textContent=r),i.disabled=!n.ok}function zd(i){const e=wt&&Zt(Ve,wt);if(!e)return;const t=rp(e,i);jt.sfx(t.ok?"spawn":"nope"),Od()}function Qb(i){const e=new Set;for(let t=0;t<Ve.events.length;t++)e.add(Ve.events[t].type);e.has("win")?(jt.sfx("win"),ul("win")):e.has("lose")?(jt.sfx("lose"),ul("lose")):e.has("capture")?jt.sfx("capture"):e.has("clash")&&jt.sfx("clash"),e.has("spawn")&&i>Qh&&Ve.events.some(n=>n.type==="spawn"&&n.owner==="player")&&(jt.sfx("spawn"),Qh=i+900)}function tf(i,e){return Ve.status!=="playing"||!i||!e||i===e?!1:(Ss(Ve,i)?Rd(Ve,i,e):e1(i,e)).ok?(jt.sfx("send"),wt=null,Qt("idle"),!0):(jt.sfx("nope"),!1)}function e1(i,e){const t=Zt(Ve,i);return!t||t.owner!=="player"?{ok:!1}:Gl(Ve,i,e,Fb(t))}cM(da,zt.camera,()=>{const i=[];for(let e=0;e<Ve.buildings.length;e++){const t=Ve.buildings[e],s=(Ve.nodes||Is)[t.node];i.push({id:t.id,owner:t.owner,kind:t.kind,x:s.x,z:s.z})}for(let e=0;e<Ve.squads.length;e++){const t=Ve.squads[e];t.count<=0||i.push({id:t.id,owner:t.owner,kind:"squad",x:ad(t.x,t.owner,t.mode),z:t.z})}return i},{unlock(){jt.unlock()},onTap(i){if(Ve.status!=="playing")return;if(!i){wt=null,Qt("idle");return}const e=Ss(Ve,i);if(e&&e.owner!=="player")return;if(wt&&wt!==i){const s=Ss(Ve,wt),r=Zt(Ve,wt);if(s&&s.owner==="player"||r&&r.owner==="player"){tf(wt,i);return}}const t=Zt(Ve,i);if(t&&t.owner==="player"){ll(),wt=wt===i?null:i,Qt(wt?"selected":"idle");return}const n=Ss(Ve,i);n&&n.owner==="player"&&(wt=wt===i?null:i,Qt(wt?"selected":"idle"))},onDragStart(i){ca=!0,wt=i;const e=Zt(Ve,i);e&&e.owner==="player"&&ll(),Qt("drag")},onDragMove(i,e){const t=Ss(Ve,wt);qs.setDrag(wt,i,e,t?{x:t.x,z:t.z}:null)},onDragEnd(i,e){ca=!1,qs.resetDrag(),i&&e&&tf(i,e),Qt(wt?"selected":"idle")}});bs.addEventListener("pointerdown",i=>{i.stopPropagation()});bs.addEventListener("click",i=>{i.stopPropagation(),jt.unlock(),jt.toggle(),Nd()});function Ei(i,e){i.addEventListener("pointerdown",t=>{t.stopPropagation()}),i.addEventListener("click",t=>{t.stopPropagation(),jt.unlock(),e()})}function mt(i){return`#${i.toString(16).padStart(6,"0")}`}function t1(i){const e=document.createElement("canvas");e.className="map-thumb";const t=280,n=188;e.width=t,e.height=n;const s=e.getContext("2d"),r=_d(i),o=vd(i),a=yd(i);for(let U=0;U<o.length;U++){const se=o[U];r.minX=Math.min(r.minX,se.x-.35),r.maxX=Math.max(r.maxX,se.x+.35),r.minZ=Math.min(r.minZ,se.z-.35),r.maxZ=Math.max(r.maxZ,se.z+.35)}const c=16,l=Math.max(.001,r.maxX-r.minX),u=Math.max(.001,r.maxZ-r.minZ),h=(n-c*2)/u,f=Math.min((t-c*2)/l,h*1.65),d=(r.minX+r.maxX)/2;function g(U){return{x:t/2+(U.x-d)*f,y:c+(U.z-r.minZ)*h}}s.fillStyle=mt(Ne.meadow),s.fillRect(0,0,t,n),s.fillStyle=mt(Ne.meadowDeep),s.fillRect(0,0,t,n*.16),s.fillRect(0,n*.84,t,n*.16),s.fillRect(0,0,t*.12,n),s.fillRect(t*.88,0,t*.12,n),s.globalAlpha=.55,s.fillStyle=mt(Ne.sand),s.beginPath(),s.ellipse(t*.5,n*.28,t*.08,n*.07,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(t*.46,n*.74,t*.1,n*.06,0,0,Math.PI*2),s.fill(),s.globalAlpha=1;const x={},m=i.buildings||[];for(let U=0;U<m.length;U++)x[m[U].id]=m[U].owner;const p=i.zones||[];s.globalAlpha=.22;for(let U=0;U<p.length;U++){const se=p[U],ie=x[se.buildingId],Z=ie?Cn(ie):null,Ae=g(se);s.beginPath(),s.ellipse(Ae.x,Ae.y,Math.max(10,se.rx*f*.85),Math.max(8,se.rz*h*.9),0,0,Math.PI*2),s.fillStyle=mt(Z?Z.slab:Ne.meadowDeep),s.fill()}s.globalAlpha=1;const v=Md(i),y=g({x:v.x,z:v.z}),_=Math.max(18,Math.min(n*.2,v.depth*h*.55)),C=Math.max(5,_*.35),E=_*.42;function A(U,se){s.beginPath();for(let Z=0;Z<=10;Z++){const Ae=t*Z/10,le=Math.sin(Z/10*Math.PI)*C;s.lineTo(Ae,y.y-U+le+se)}for(let Z=10;Z>=0;Z--){const Ae=t*Z/10,le=Math.sin(Z/10*Math.PI)*C;s.lineTo(Ae,y.y+U+le+se)}s.closePath(),s.fill()}s.fillStyle=mt(Ne.sand),A(_/2+E,0),s.fillStyle=mt(6970436),A(_/2+E*.45,0),s.fillStyle=mt(Ne.stream),A(_/2,0),s.fillStyle=mt(7255252),A(_*.22,C*.15);function R(U,se){s.fillStyle=se,s.globalAlpha=.92,s.beginPath();for(let Z=0;Z<=12;Z++){const Ae=t*Z/12,le=Math.sin(Z/12*Math.PI)*16;s.lineTo(Ae,y.y+le+U)}for(let Z=12;Z>=0;Z--){const Ae=t*Z/12,le=Math.sin(Z/12*Math.PI)*16;s.lineTo(Ae,y.y+le+U+4)}s.closePath(),s.fill(),s.globalAlpha=1}const b=_/2+E+10;R(b,mt(Ne.player.main)),R(-b-4,mt(Ne.enemy.main));const S=i.nodes||{},P=Math.max(11,.72*f);s.fillStyle=mt(Ne.road);function k(U,se){const ie=g(U),Z=g(se),Ae=Z.x-ie.x,le=Z.y-ie.y,te=Math.hypot(Ae,le)||1,fe=-le/te*P*.5,Ee=Ae/te*P*.5;s.beginPath(),s.moveTo(ie.x+fe,ie.y+Ee),s.lineTo(Z.x+fe,Z.y+Ee),s.lineTo(Z.x-fe,Z.y-Ee),s.lineTo(ie.x-fe,ie.y-Ee),s.closePath(),s.fill()}const B=Math.max(.42,v.depth*.85),W=new Set,J=i.graph||{},X=Object.keys(J);for(let U=0;U<X.length;U++){const se=J[X[U]]||[],ie=S[X[U]];for(let Z=0;Z<se.length;Z++){const Ae=se[Z],le=X[U]<Ae?`${X[U]}|${Ae}`:`${Ae}|${X[U]}`;if(W.has(le))continue;W.add(le);const te=S[Ae];if(!(!ie||!te))if(ie.z*te.z<-1e-4){const fe=(0-ie.z)/(te.z-ie.z),Ee=ie.x+(te.x-ie.x)*fe;k(ie,{x:Ee,z:ie.z>0?B:-B}),k(te,{x:Ee,z:te.z>0?B:-B})}else k(ie,te)}}const oe=Sd(i);for(let U=0;U<oe.length;U++){const se=g(oe[U]),ie=Math.max(18,P+8),Z=_+6;s.fillStyle=mt(Ne.bridge),s.fillRect(se.x-ie/2,se.y-Z/2,ie,Z),s.fillStyle=mt(Ne.roadEdge),s.fillRect(se.x-ie/2,se.y-Z/2,3,Z),s.fillRect(se.x+ie/2-3,se.y-Z/2,3,Z)}for(let U=0;U<a.length;U++){const se=g(a[U]),ie=Math.max(5,a[U].s*h*.7);s.fillStyle=mt(Ne.rock),s.beginPath(),s.ellipse(se.x,se.y,ie*1.25,ie*.8,0,0,Math.PI*2),s.fill()}for(let U=0;U<o.length;U++){const se=o[U],ie=g(se),Z=Math.max(26,se.s*h*2.1),Ae=Z*.46;s.fillStyle=mt(Ne.trunk),s.fillRect(ie.x-1.5,ie.y-2,3,6),s.fillStyle=mt(se.color),s.beginPath(),s.moveTo(ie.x,ie.y-Z),s.lineTo(ie.x+Ae,ie.y+2),s.lineTo(ie.x-Ae,ie.y+2),s.fill(),s.fillStyle=mt(Ne.leaf),s.beginPath(),s.moveTo(ie.x,ie.y-Z*.72),s.lineTo(ie.x+Ae*.62,ie.y-Z*.22),s.lineTo(ie.x-Ae*.62,ie.y-Z*.22),s.fill()}for(let U=0;U<m.length;U++){const se=m[U],ie=S[se.node];if(!ie)continue;const Z=g(ie),Ae=Cn(se.owner),le=Math.max(15,Math.min(f,h)*1.35);se.kind==="hq"?(s.fillStyle=mt(Ne.sand),s.fillRect(Z.x-le*1.25,Z.y-le*.2,le*2.5,le*.85),s.fillStyle=mt(Ne.concrete),s.fillRect(Z.x-le*.95,Z.y-le*.55,le*1.9,le*.55),s.fillRect(Z.x-le*.7,Z.y-le*.95,le*1.4,le*.45),s.fillStyle=mt(Ae.main),s.fillRect(Z.x-le*.78,Z.y-le*1.02,le*1.56,le*.16),s.fillStyle=mt(Ne.metal),s.fillRect(Z.x-le*.08,Z.y-le*1.7,le*.16,le*.75),s.beginPath(),s.arc(Z.x+le*.42,Z.y-le*1.35,Math.max(2,le*.12),0,Math.PI*2),s.fill(),s.fillStyle=mt(Ae.flag),s.fillRect(Z.x-le*.08,Z.y-le*1.85,le*.42,le*.22)):(s.fillStyle=mt(Ne.sand),s.fillRect(Z.x-le*1.45,Z.y-le*.05,le*.28,le*.4),s.fillRect(Z.x+le*1.17,Z.y-le*.05,le*.28,le*.4),s.fillStyle=mt(Ne.concrete),s.fillRect(Z.x-le*1.15,Z.y-le*.15,le*2.3,le*.45),s.fillRect(Z.x-le*1.05,Z.y-le*.42,le*2.1,le*.32),s.fillStyle=mt(Ae.main),s.fillRect(Z.x-le*1.12,Z.y-le*.58,le*2.24,le*.16),s.fillStyle=mt(Ne.ink),s.fillRect(Z.x-le*.28,Z.y-le*.22,le*.56,le*.28),s.fillStyle=mt(Ae.flag),s.fillRect(Z.x-le*.95,Z.y-le*.78,le*.28,le*.16))}return e}const hl=document.getElementById("maps"),fl=document.getElementById("diffs");for(let i=0;i<Or.length;i++){const e=Or[i],t=document.createElement("button");t.type="button",t.setAttribute("data-map",e.id),t.appendChild(t1(e));const n=document.createElement("span");n.className="map-name",n.textContent=e.name;const s=document.createElement("small");s.textContent=e.blurb,t.append(n,s),Ei(t,()=>{$r=e.id,ma(hl,"data-map",$r),Yi("menu"),qi(!0),Qt("idle")}),hl.appendChild(t)}const nf=["easy","normal","hard"];for(let i=0;i<nf.length;i++){const e=nf[i],t=document.createElement("button");t.type="button",t.setAttribute("data-diff",e),t.textContent=ol[e].label,Ei(t,()=>{Jr=e,ma(fl,"data-diff",Jr)}),fl.appendChild(t)}Ei(document.getElementById("start"),()=>{Yi("playing"),jr(),qi(!1),Qt("idle")});function Bd(){jr(),qi(!0),Yi("menu"),Qt("idle")}Ei(document.getElementById("home-btn"),Bd);Ei(document.getElementById("sheet-map"),Bd);Ei(Id,()=>zd("haste"));Ei(Ld,()=>zd("bulwark"));Xs&&Ei(Xs,ll);document.getElementById("retry").addEventListener("click",()=>{jt.unlock(),Yi("playing"),jr(),qi(!1),Qt("idle")});function kd(){zt.resize(),Fd()}const n1=new ResizeObserver(kd);n1.observe(oa);kd();Nd();ma(fl,"data-diff",Jr);ma(hl,"data-map",$r);Yi("menu");qi(!0);Qt("idle");Wl();let sf=performance.now(),Vo=0,ac=performance.now(),rf=0;function i1(i){if(rf+=1,rf<90){Vo=0,ac=i;return}Vo+=1;const e=i-ac;if(e<1600)return;const t=Vo*1e3/e;if(Vo=0,ac=i,!(t>=40)){if(al){al=!1,Dd.setEnabled(!1);return}zt.shadowsOn&&zt.setShadows(!1)}}function Hd(i){const e=Math.min(.05,(i-sf)/1e3);sf=i,Ve&&Ve.status==="playing"&&(Cd(Ve,e),Qb(i));const t=i/1e3,n=ri&&!ri.hidden||Hi&&!Hi.hidden,s=document.getElementById("badges");s&&(s.hidden=n),Ve&&(qs.update(t,Ve,ca?null:wt),pa.update(Ve),Dd.update(e,Ve),n||Vl.update(Ve,zt.camera,da),Od(),Wl(),jb()),zt.renderer.render(zt.scene,zt.camera),i1(i),requestAnimationFrame(Hd)}requestAnimationFrame(Hd);window.__BL={whenAssets:$b,get state(){return Ve},pick:"screen-44",send(i,e){return Gl(Ve,i,e)},retarget(i,e){return Rd(Ve,i,e)},step(i){Cd(Ve,i),(Ve.status==="win"||Ve.status==="lose")&&ul(Ve.status)},point(i){return Vl.clientPoint(i,zt.camera,da)},facingDot(){return pa.facingDot()},quality(){return{shadows:zt.shadowsOn,fx:al,software:zt.software}},setShadows(i){zt.setShadows(!!i)},start(i,e){i&&($r=i),e&&(Jr=e),Yi("playing"),jr(),qi(!1),Qt("idle")},reset(){Yi("playing"),jr(),qi(!1),Qt("idle")}};window.addEventListener("error",i=>{const e=document.createElement("pre");e.id="boot-error",e.textContent=i.message||"畫面起動失敗",oa.appendChild(e)});
