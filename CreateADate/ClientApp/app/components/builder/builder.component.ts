import { Component, OnInit } from '@angular/core';
import { Date, Activity, Location, ActivityGroup } from '../../models/index';
import { BuilderService } from '../../services/builder.service';
import { ActivityComponent } from './activity.component';

@Component({
    selector: 'date-builder',
    template: require('./builder.component.html')
})
export class BuilderComponent implements OnInit {
    model: Date = new Date();
    location1: Location = new Location(); // fix these
    location2: Location = new Location(); // fix these
    locationsValid: boolean = false;
    activityGroups: ActivityGroup[] = new Array<ActivityGroup>();

    constructor(private _builderService: BuilderService) {
    }

    ngOnInit() {
        this.location1.name = '';
        this.location2.name = '';

        this.addBlankActivityGroup();
    }

    addBlankActivityGroup() {
        //option 1
        let option1 = new Activity();
        option1.optionId = 1;

        let option2 = new Activity();
        option2.optionId = 2;

        let actGroup = new ActivityGroup();
        actGroup.id = "1";
        actGroup.group = new Array<Activity>();
        actGroup.group.push(option1, option2);

        this.activityGroups.push(actGroup);
    }

    locationSubmit() {
        this._builderService.date.locations = new Array<Location>();
        this._builderService.date.locations.push(this.location1);
        this._builderService.date.locations.push(this.location2);
        var $ = require('jquery');
        $('#locationOptions').show('slow');
    }

    activitySubmit() {
        //Save current Activity      
        this.addBlankActivityGroup();
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
