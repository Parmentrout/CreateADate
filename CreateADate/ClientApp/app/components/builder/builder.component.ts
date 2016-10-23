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
    activity1Groups: ActivityGroup[] = new Array<ActivityGroup>();
    activity2Groups: ActivityGroup[] = new Array<ActivityGroup>();
    activity1Counter: number = 1;
    activity2Counter: number = 1;
    showStartButton: boolean = true;
    displayLocation1: boolean = true;
    displayLocation2: boolean = true;
    dateName: string;

    constructor(private _builderService: BuilderService) {
    }

    ngOnInit() {
        this.location1.name = '';
        this.location2.name = '';
        this.dateName = '';
        this._builderService.date = new Date();
        this._builderService.date.locations = new Array<Location>();
        this.addBlankActivityGroup(this.activity1Groups, this.activity1Counter);
    }

    addBlankActivityGroup(group: ActivityGroup[], counter: number) {
        //option 1
        let option1 = new Activity();
        option1.optionId = 1;

        let option2 = new Activity();
        option2.optionId = 2;

        let actGroup = new ActivityGroup();
        actGroup.id = counter;
        actGroup.group = new Array<Activity>();
        actGroup.group.push(option1, option2);

        group.push(actGroup);
    }

    locationSubmit() {
        this._builderService.initializeLocations([this.location1, this.location2]);

        this.showStartButton = false;
        this.displayLocation2 = false;
        var $ = require('jquery');
        $('#location1Options').show('slow');
    }

    activitySubmit() {
        this.activity1Counter++;

        this._builderService.saveActivityGroup(1);

        this.addBlankActivityGroup(this.activity1Groups, this.activity1Counter);
    }

    onLoc1Change(value: string) {
        this.location1.name = value;
        this.validateLocations();
    }

    onLoc2Change(value: string) {
        this.location2.name = value;
        this.validateLocations();
    }

    onNameEntry(value: string) {
        this.dateName = value;
    }

    goToLocation2() {
        var $ = require('jquery');
        // Save Location 1 data to service
        this._builderService.saveActivityGroup(1);

        $('#location1Options').hide('slow');
        this.displayLocation1 = false;
        this.displayLocation2 = true;
        this.addBlankActivityGroup(this.activity2Groups, this.activity2Counter);

        $('#location2Options').show();
    }

    activity2Submit() {
        //Save current Activity  
        this.activity2Counter++;    
        this._builderService.saveActivityGroup(2);
        this.addBlankActivityGroup(this.activity2Groups, this.activity2Counter);
    }

    finishDate() {
        this._builderService.saveActivityGroup(2);
        this._builderService.date.name = this.dateName;

        this._builderService.postDate(this._builderService.date).then(() => alert('Success!'));

        console.log(this._builderService.date);
        //alert('Please enter your email address so we can send you your date ID');
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
