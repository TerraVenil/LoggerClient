import { Component, } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import { TableDemo } from './table/table-demo';

@Component({
  selector: 'table-section',
  template: `
  <section>
    <div class="row">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">
        <table-demo></table-demo>
      </div>
    </div>
  </section>
  `,
  directives: [TableDemo, CORE_DIRECTIVES]
})
export class TableSection {
}