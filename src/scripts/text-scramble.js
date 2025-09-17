// Export de la classe (même code qu'avant)
export class TextScramble {
  constructor(el, {chars='!<>-_\\/[]{}—=+*^?#________', fps=60} = {}) {
    if (!el) throw new Error('TextScramble: element not found');
    this.el = el; this.chars = chars;
    this.update = this.update.bind(this);
    this._running = false; this._frame = 0; this._frameRequest = null;
    this._msPerFrame = 1000 / Math.max(1, fps); this._lastTime = 0;
  }
  setText(newText) {
    const oldText = this.el.textContent || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(r => (this._resolve = r));
    this._queue = [];
    for (let i=0;i<length;i++){
      const from = oldText[i] || '', to = newText[i] || '';
      const start = Math.floor(Math.random()*40);
      const end = start + Math.floor(Math.random()*40);
      this._queue.push({from,to,start,end,char:null});
    }
    this.cancel(); this._frame = 0; this._running = true; this._tick();
    return promise;
  }
  _tick(time=performance.now()){
    if (!this._lastTime) this._lastTime = time;
    const delta = time - this._lastTime;
    if (delta >= this._msPerFrame){
      this._lastTime = time - (delta % this._msPerFrame);
      this.update(); this._frame++;
    }
    if (this._running) this._frameRequest = requestAnimationFrame(this._tick.bind(this));
  }
  update(){
    let output = [], complete = 0;
    for (let i=0,n=this._queue.length;i<n;i++){
      let {from,to,start,end,char} = this._queue[i];
      if (this._frame >= end){ complete++; output.push(to); }
      else if (this._frame >= start){
        if (!char || Math.random() < 0.28){ char = this._randomChar(); this._queue[i].char = char; }
        output.push({dud:true,char});
      } else { output.push(from); }
    }
    const frag = document.createDocumentFragment();
    for (const part of output){
      if (typeof part === 'string') frag.appendChild(document.createTextNode(part));
      else { const s=document.createElement('span'); s.className='dud'; s.textContent=part.char; frag.appendChild(s); }
    }
    this.el.replaceChildren(frag);
    if (complete === this._queue.length){ this._running = false; this._resolve && this._resolve(); }
  }
  cancel(){ this._running=false; if (this._frameRequest) cancelAnimationFrame(this._frameRequest); this._frameRequest=null; }
  _randomChar(){ return this.chars[Math.floor(Math.random()*this.chars.length)]; }
}
