import { Component, OnInit } from '@angular/core';
import { Date, Activity, Location } from '../../models/index';
import { BuilderService } from '../../services/builder.service';
import { ActivityComponent } from './activity.component';

@Component({
    selector: 'date-builder',
    template: require('./builder.component.html')
})
export class BuilderComponent implements OnInit {
    model: Date = new Date();
    location1: Location = new Location();
    location2: Location = new Location();
    locationsValid: boolean = false;
    showActivities: boolean = false;
    addActivities: boolean = false;

    constructor(private _builderService: BuilderService) {
    }

    ngOnInit() {
        this.location1.name = '';
        this.location2.name = '';
    }

    locationSubmit() {
        //this._builderService.date.locations = new Array<Location>();
        //this._builderService.date.locations.push(this.location1);
        //this._builderService.date.locations.push(this.location2);

        this.showActivities = true;
       // $('#locationoptions').show(1000);
    }

    activitySubmit() {
        this.addActivities = true;
    }
    onLoc1Change(value: string) {
        this.location1.name = value;
        this.validateLocations();
    }

    onLoc2Change(value: string) {
        this.location2.name = value;
        this.validateLocations();
    }

    private validateLocations() {
        if (this.location1.name !== '' && this.location2.name != '') {
            this.locationsValid = true;
        }
    }
}



//Example!!
//export class FetchDataComponent {
//    public forecasts: WeatherForecast[];

//    constructor(http: Http) {
//        http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
//            this.forecasts = result.json();
//        });
//    }
//}

//interface WeatherForecast {
//    dateFormatted: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}
