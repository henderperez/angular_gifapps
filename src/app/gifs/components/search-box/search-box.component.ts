import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    templateUrl: './search-box.component.html'
})

export class SearchBoxComponent  {

    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    // @ViewChild('txtTagResults')
    // public tagResults!: ElementRef<HTMLInputElement>;


    constructor(private gifsService: GifsService){ }

    searchTag( ):void {
        const newTag = this.tagInput.nativeElement.value;

        // if(this.tagResults.nativeElement.value){
        //     const newResults:number = parseInt(this.tagResults.nativeElement.value);
        //     this.gifsService.searchTag(newTag, newResults);
        // }else{
        //     this.gifsService.searchTag(newTag);
        // }

        this.gifsService.searchTag(newTag);

        this.tagInput.nativeElement.value = '';
    }

}