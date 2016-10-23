import { Date, Location, Activity } from '../models/index';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BuilderService implements OnInit {
    public date: Date = new Date();
    public location1: Location = new Location();
    public location2: Location = new Location();
    public currentActivityGroup: Activity[] = new Array<Activity>();

    constructor(private _http: Http) { }

    ngOnInit() {
        this.date.locations = new Array<Location>();
    }

    public initializeLocations(locations: Location[]) {
        if (!this.date.locations) {
            this.date.locations = new Array<Location>();
        }

        this.date.locations.push(locations[0]);
        this.date.locations.push(locations[1]);
    }

    public saveActivityGroup(locationId: number) {
        let index = locationId - 1;

        if (!this.date.locations[index].activities) {
            this.date.locations[index].activities = new Array<Activity>();
        }

        this.date.locations[index].activities.push(this.currentActivityGroup[0]);
        this.date.locations[index].activities.push(this.currentActivityGroup[1]);

        this.currentActivityGroup = new Array<Activity>();
    }

    public postDate(date: Date): Promise<any> {

        let body = JSON.stringify({ date });
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('/api/Date/PostNewDate', date, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

        //return this._http.post('/api/Date/PostNewDate', body, options).toPromise().then(this.extractData).catch(this.handleError);;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}