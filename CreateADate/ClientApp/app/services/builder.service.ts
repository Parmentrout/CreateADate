import { Date, Location } from '../models/index';
import { Injectable } from '@angular/core';

@Injectable()
export class BuilderService {
    public date: Date = new Date();
    public location1: Location;
    public location2: Location;
    
}