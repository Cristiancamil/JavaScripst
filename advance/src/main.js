import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { environmentsComponent } from './concepts/environments'
import { callbacksComponent } from './concepts/callbacks'
import { promisesComponent } from './concepts/promises'
import { asyncComponent } from './concepts/async'
import { asynAwaitComponent } from './concepts/async-await'
import { asyncAwaitV2Component } from './concepts/async-await-v2'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      
    </div>
    
  </div>
`

const element = document.querySelector('.card');

// environmentsComponent( element );
// callbacksComponent( element );
// promisesComponent( element );
// asyncComponent(element)
// asynAwaitComponent(element)
asyncAwaitV2Component(element)
