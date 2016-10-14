import { Component } from '@angular/core';
import { BuilderService } from '../../services/builder.service';

@Component({
    selector: 'activity-options',
    template: require('./activity.component.html')
})
export class ActivityComponent {

    constructor(private _builderService: BuilderService) { }


}
