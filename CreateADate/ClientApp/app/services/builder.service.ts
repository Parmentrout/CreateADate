import { Date, Location, Activity } from '../models/index';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class BuilderService implements OnInit {
    public date: Date = new Date();
    public location1: Location = new Location();
    public location2: Location = new Location();
    public currentActivityGroup: Activity[] = new Array<Activity>();

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
}