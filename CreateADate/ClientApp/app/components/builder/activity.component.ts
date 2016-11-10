import { Component, Input, OnInit } from '@angular/core';
import { BuilderService } from '../../services/builder.service';
import { ActivityGroup, Activity } from '../../models/index';
import { Http , Headers, RequestOptions} from '@angular/http';
// Api key AIzaSyDsyYSU6Vqzm54NPTjlqKpgRsbCPkYMiek
declare var google: any;

@Component({
    selector: 'activity-options',
    template: require('./activity.component.html'),
    styles: [require('./activity.component.css')]
})
export class ActivityComponent implements OnInit {
    activity1: Activity = new Activity();
    activity2: Activity = new Activity();
    activityGroup: ActivityGroup = new ActivityGroup();
    constructor(private _builderService: BuilderService, private _http: Http) { }

    @Input() groupNumber: number;
    @Input() locationNumber: number;
    panelName: string;

    ngOnInit() {
        this.panelName = "collapse" + this.groupNumber;

        let headers = new Headers({ 'Content-Type': '/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
      //  this._http.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyDsyYSU6Vqzm54NPTjlqKpgRsbCPkYMiek&libraries=places&callback=initAutocomplete', options)
      //      .subscribe(initAutocomplete);
        //Initialize all fields
        this.activity1.name = '';
        this.activity1.description = '';
        this.activity1.address = '';
        this.activity1.optionId = 1;
        this.activity1.activityOrder = this.groupNumber;
        this.activity2.name = '';
        this.activity2.description = '';
        this.activity2.address = '';
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

    onOp1AddressChange(value: string) {
        this.updateBuilderService();
        this.activity1.address = value;
    }

    onOp2Change(value: string) {
        this.updateBuilderService();
        this.activity2.name = value;
    }

    onOp2DescChange(value: string) {
        this.updateBuilderService();
        this.activity2.description = value;
    }

    onOp2AddressChange(value: string) {
        this.updateBuilderService();
        this.activity2.address = value;
    }

    updateBuilderService() {

        this._builderService.currentActivityGroup[0] = this.activity1;
        this._builderService.currentActivityGroup[1] = this.activity2;
    }
}
declare var autocomplete: any;
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log(place.formatted_address);
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}