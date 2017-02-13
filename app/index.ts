import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';
import { NgClass } from 'angular2/common';

import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { TableSection } from './components/table-section';

@Component({
  selector: 'viewer-app',
  template: `
  <main class="bd-pageheader">
    <div class="container">
      <h1>ng2-table</h1>
      <p>Native Angular2 directives for Table</p>
      <a class="btn btn-primary" href="https://github.com/valor-software/ng2-table">View on GitHub</a>
    </div>
  </main>
  <div class="container">
    <table-section class="col-md-12"></table-section>
  </div>
  `,
  directives: [
    NgClass,
    TableSection,
    PAGINATION_DIRECTIVES
  ]
})
export class Demo {
}

bootstrap(Demo);