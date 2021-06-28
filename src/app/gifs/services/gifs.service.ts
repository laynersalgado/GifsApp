import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'uhVbf6B1gPOac97PAziA7BcGgRiUNqGM';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string [] = [];

  public resultados: any []= [];

  get historial(){    
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    
    if(localStorage.getItem('Historial')){
      this._historial = JSON.parse(localStorage.getItem('Historial')!);
    }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs (query: string=''){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.slice(0,10)
      localStorage.setItem('Historial', JSON.stringify(this._historial))
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get(`${this.servicioUrl}/search`, {params})
    .subscribe( (resp:any )=>{
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })

  }
  
}
