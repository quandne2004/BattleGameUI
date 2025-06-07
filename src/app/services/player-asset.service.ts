import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlayerAsset {
  id?: number;
  playerId: number;
  assetId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerAssetsService {
  private apiUrl = 'http://localhost:5000/api/player-assets'; // sửa lại url API bạn

  constructor(private http: HttpClient) {}

  getAll(): Observable<PlayerAsset[]> {
    return this.http.get<PlayerAsset[]>(this.apiUrl);
  }

  getById(id: number): Observable<PlayerAsset> {
    return this.http.get<PlayerAsset>(`${this.apiUrl}/${id}`);
  }

  create(playerAsset: PlayerAsset): Observable<PlayerAsset> {
    return this.http.post<PlayerAsset>(this.apiUrl, playerAsset);
  }

  update(id: number, playerAsset: PlayerAsset): Observable<PlayerAsset> {
    return this.http.put<PlayerAsset>(`${this.apiUrl}/${id}`, playerAsset);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
