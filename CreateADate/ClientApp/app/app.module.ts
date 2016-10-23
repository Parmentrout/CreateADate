import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { DateComponent } from './components/date/date.component';
import { BuilderComponent } from './components/builder/builder.component';
import { ActivityComponent } from './components/builder/activity.component';
import { DateService, BuilderService } from './services/index';


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        DateComponent,
        BuilderComponent,
        HomeComponent,
        ActivityComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'date', component: DateComponent },
            { path: 'builder', component: BuilderComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        HttpModule,
        JsonpModule
    ],
    providers: [DateService, BuilderService]
})
export class AppModule {
}
