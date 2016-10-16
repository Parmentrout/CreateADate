import { Component, Input, OnInit } from '@angular/core';
import { BuilderService } from '../../services/builder.service';
import { ActivityGroup, Activity } from '../../models/index';

@Component({
    selector: 'activity-options',
    template: require('./activity.component.html')
})
export class ActivityComponent implements OnInit {
    activity1: Activity = new Activity();
    activity2: Activity = new Activity();
    activityGroup: ActivityGroup = new ActivityGroup();
    constructor(private _builderService: BuilderService) { }

    @Input() groupNumber: number;
    @Input() locationNumber: number;
    panelName: string;

    ngOnInit() {
        this.panelName = "collapse" + this.groupNumber;

        //Initialize all fields
        this.activity1.name = '';
        this.activity1.description = '';
        this.activity1.optionId = 1;
        this.activity1.activityOrder = this.groupNumber;
        this.activity2.name = '';
        this.activity2.description = '';
        this.activity2.optionId = 2;
        this.activity2.activityOrder = this.groupNumber;

        this._builderService.currentActivityGroup.push(this.activity1);
        this._builderService.currentActivityGroup.push(this.activity2);
    }

    onOp1Change(value: string) {
        this.updateBuilderService();
        this.activity1.name = value;
    }

    onOp1DescChange(value: string) {
        this.updateBuilderService();
        this.activity1.description = value;
    }

    onOp2Change(value: string) {
        this.updateBuilderService();
        this.activity2.name = value;
    }

    onOp2DescChange(value: string) {
        this.updateBuilderService();
        this.activity2.description = value;
    }

    updateBuilderService() {
        this._builderService.currentActivityGroup[0] = this.activity1;
        this._builderService.currentActivityGroup[1] = this.activity2;
    }
}