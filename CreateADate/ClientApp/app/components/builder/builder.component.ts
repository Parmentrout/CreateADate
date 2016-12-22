import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Date, Activity, Location, ActivityGroup } from '../../models/index';
import { BuilderService } from '../../services/builder.service';
import { ActivityComponent } from './activity.component';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'date-builder',
    template: require('./builder.component.html'),
    styles: [require('./builder.component.css')]
})
export class BuilderComponent implements OnInit {
    location1: Location = new Location(); // fix these
    location2: Location = new Location(); // fix these
    private dateEditId: string = "";

    locationsValid: boolean = false;
    activity1Groups: ActivityGroup[] = new Array<ActivityGroup>();
    activity2Groups: ActivityGroup[] = new Array<ActivityGroup>();
    activity1Counter: number = 1;
    activity2Counter: number = 1;
    showStartButton: boolean = false; //changed this
    displayLocation1: boolean = true;
    displayLocation2: boolean = true;
    //new code
    displaySelector1: boolean = true;
    displaySelector2: boolean = true;
    displayCheckbox: boolean = true;
    displayLocs: boolean = false;
    dateName: string;
    emailAddress: string;
    nextButton: boolean = true;

    constructor(private _builderService: BuilderService, private _http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() {
            this.location1.name = '';
            this.location2.name = '';
            this.dateName = '';
            this.emailAddress = '';
            this._builderService.date = new Date();
            this._builderService.date.locations = new Array<Location>();
    }

    editDate() {

        let params = new URLSearchParams();
        params.set('id', this.dateEditId);

        this._http.get('/api/Date/GetDate', { search: params })
            .subscribe(result => {
                let dateReturned = result.json();
                if (dateReturned !== '') {
                    let date = result.json();
                    this._builderService.date = result.json();
                    this.mapExistingDate(date);
                } else {
                    //alert('Ack!  Date not found');
                }
            });
    }

    private mapExistingDate(date: Date) {
        this.location1.name = date.locations[0].name;
        if (date.locations.length > 1) {
            this.location2.name = date.locations[1].name;
        }
        this.dateName = date.name;
        this.emailAddress = date.email;
        this._builderService.date = date;
        this._builderService.date.locations = date.locations;
        this.goToLocation();

        //Now activities, how many do I have?
        let curLocation = 0;
        let curActivity = 0;

        for (let l = 1; l <= date.locations.length; l++) {
            let activityGroups = date.locations[curLocation].activities.length / 2;
            let curActivityGroupId = 1;

            for (let g = 1; g <= activityGroups; g++) {
                let act: Activity = date.locations[curLocation].activities[curActivity];
                let act2: Activity = date.locations[curLocation].activities[curActivity++];
                let activityGroup: ActivityGroup = new ActivityGroup();
                activityGroup.group = new Array<Activity>();
                activityGroup.group.push(act, act2);
                activityGroup.id = curActivityGroupId;
                if (l === 1) {
                    this.activity1Groups.push(activityGroup);
                } else {
                    this.activity2Groups.push(activityGroup);
                }
                curActivityGroupId++;
            }

            curLocation++;
        }

        var $ = require('jquery');
        this.displayLocation2 = false;
        $('#location1Options').show('slow');
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
        this.addBlankActivityGroup(this.activity1Groups, this.activity1Counter);
        this.showStartButton = false;

        if (!this.displayLocation2) {
            
        }

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

    onEmailEntry(value: string) {
        this.emailAddress = value;
    }

    onDateEditEntry(value: string) {
        this.dateEditId = value;
    }

    goToLocation2() {
        var $ = require('jquery');
        // Save Location 1 data to service
        this._builderService.saveActivityGroup(1);

        $('#location1Options').hide('slow');
        this.displayLocation1 = false;
        this.displayLocation2 = true;

        if (this.activity2Groups.length === 0) {
            this.addBlankActivityGroup(this.activity2Groups, this.activity2Counter);
        }

        $('#location2Options').show();
    }

    toggleLocations() {
        this.displayLocation2 = !this.displayLocation2;
    }

    //new code
    goToLocation(multipleLocations: boolean = false) {
        var $ = require('jquery');
        // Save Location 1 data to service

        //$('#locationOptions').hide('slow');
        this.displayLocation1 = true;

        if (multipleLocations) {
            this.displayLocation2 = true;
            this.displaySelector2 = true;
            this.displayCheckbox = false;
        } else {
            this.displayLocation2 = false;
            this.displaySelector2 = false;
        }

        this.nextButton = false;
        this.displayLocs = true;
        this.showStartButton = true;

       // $('#locationOptions').show();
        //this.addBlankActivityGroup(this.activity1Groups, this.activity1Counter);
    }

    activity2Submit() {
        //Save current Activity  
        this.activity2Counter++;    
        this._builderService.saveActivityGroup(2);
        this.addBlankActivityGroup(this.activity2Groups, this.activity2Counter);
    }

    finishDate() {
        var $ = require('jquery');

        this._builderService.saveActivityGroup(2);
        this._builderService.date.name = this.dateName;
        this._builderService.date.email = this.emailAddress;

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });

        this._http.post('/api/Date/PostNewDate', this._builderService.date, options)
            .subscribe(result => {
                $('#loading-indicator-builder').hide();
                alert('Date Saved! Your Date ID is ' + result.json());
            });

        $('#loading-indicator-builder').show();
    }

    toggleEditEntry() {
        var $ = require('jquery');
        $('#editInput').slideToggle();
    }

    private dateSaved() {
        alert('Thank you for using create a date! Your Date ID is: ' + this._builderService.committedDate);
    }


    private validateLocations() {
        if (this.location1.name !== '' && this.location2.name != '') {
            this.locationsValid = true;
        }
    }
}

