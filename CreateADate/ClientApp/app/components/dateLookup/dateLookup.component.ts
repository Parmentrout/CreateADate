import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'dateLookup',
    template: require('./dateLookup.component.html')
})
export class LookupComponent {

    private dateId: string = "";
    private url: string = "";

    private dateEditId: string = "";
    private editUrl: string = "";

    constructor(private _router: Router) {
    }

    goToDate() {
        //this._router.navigate(['/date/'+this.dateId]);
    }

    onDateEntry(value: string) {
        this.dateId = value;
        this.url = "/date/" + value;
    } 

    onDateEditEntry(value: string) {
        this.dateEditId = value;
        this.editUrl = "/builder/" + value;
    }

}