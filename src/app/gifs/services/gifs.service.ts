import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];
    private _tagsHistory: string[] = [];
    private apiKey: string = 'Y5D81i0Cw3DSaWPsb9PD8tr0dCbmUOvV';
    private url: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) { 
        this.loadLocalStorage();
    }

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    public searchTag(tag: string, results:number = 10): void{
        if(tag.length === 0) return;

        this.organizaHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', results)
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.url}/search`, { params }).subscribe(
            resp => {
                this.gifList = resp.data;
            }
        );
    }

    private saveLocalStorage(): void{
        localStorage.setItem('tagHistory', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage(): void{
        if(localStorage.getItem('tagHistory') === null){ return; } 
        this._tagsHistory = JSON.parse(localStorage.getItem('tagHistory')!);
        this.searchTag(this._tagsHistory[0])
    }

    public clearLocalStorage(){
        localStorage.removeItem('tagHistory');
        this._tagsHistory = [];
    }

    private organizaHistory(tag: string){

        tag = tag.toLowerCase();

        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter(word => word !== tag);
        }

        this._tagsHistory.unshift(tag);

        if(this._tagsHistory.length > 10){
            this._tagsHistory.pop();
        }

        this.saveLocalStorage()

    }

    
    
}