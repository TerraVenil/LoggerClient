import { Component } from 'angular2/core';

@Component({
    selector: 'logViewer-app',
    template: '<h1>SQL Log Viewer {{getVersion()}}</h1>'
})

export class AppComponent { 

    public getVersion() : String {
        return "v1.0";
    }
}