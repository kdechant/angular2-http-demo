import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DemoService} from './demo.service'

import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule,HttpModule,FormsModule],
    declarations: [AppComponent],
    providers: [DemoService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }