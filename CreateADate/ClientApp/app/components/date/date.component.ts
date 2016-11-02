import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { Date, Activity, Location } from '../../models/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
    //moduleId: module.id,
    selector: 'my-date',
    template: require('./date.component.html')
})
export class DateComponent {
    date: Date = new Date();
    activitiesEnabled: boolean = false;
    detailsShown: boolean = false;
    locationSelected: Location;
    currentActivities: Activity[];
    currentActivityOrder: number;
    locationShown: boolean = true;
    dateId: string = "";

    constructor(private _dateService: DateService, private route: ActivatedRoute,
        private router: Router, private _http: Http) {
        
    }

    startDate() {
        this.locationShown = true;

        //this.route.params.forEach((params: Params) => {
        //    let id = +params['id']; // (+) converts string 'id' to a number
            
        //});

        let params = new URLSearchParams();
        params.set('id', this.dateId);

        this._http.get('/api/Date/GetDate', { search: params })
            .subscribe(result => {
                this.date = result.json();
            });

        //this._dateService.getDates()
        //    .then(date => this.date = date);
    }

    startActivities(location: Location): void {
        //Hide locations
        this.locationShown = false;

        //Find current activity set from location ID
        this.locationSelected = location;
        this.currentActivityOrder = 0;

        this.activitiesEnabled = true;
        this.goToActivities();
    }

    showActivityDetails(activity: Activity): void {

        // Get other activity
        let hiddenActivity = this.currentActivities.filter(act => act.optionId !== activity.optionId)[0];
        //$('#activity' + hiddenActivity.activityId).hide('slow');
        this.detailsShown = true;
    }

    //Move on to next activity
    goToActivities(): void {
        this.detailsShown = false;
        this.currentActivityOrder++;
        this.currentActivities = this.locationSelected.activities.filter(act => act.activityOrder === this.currentActivityOrder);

        if (this.currentActivities.length === 0) {
            this.locationShown = true;
        }
    }

    idChange(value: string) {
        this.dateId = value;
    }
}