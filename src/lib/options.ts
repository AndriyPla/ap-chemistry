/** Stable per-question shuffle: varied positions without choices moving on re-render. */
export function shuffledOptions(questionId:string,options:string[]):string[]{
 const result=[...new Set(options)];
 let seed=2166136261;
 for(const char of questionId){seed^=char.charCodeAt(0);seed=Math.imul(seed,16777619)}
 const random=()=>{seed+=0x6d2b79f5;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296};
 for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}
 return result;
}
