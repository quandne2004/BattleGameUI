import { Component, OnInit } from '@angular/core';
import {
  PlayerAsset,
  PlayerAssetsService,
} from '../services/player-asset.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-assets',
  standalone: true,

  imports: [FormsModule],
  templateUrl: './player-assets.component.html',
  styleUrls: ['./player-assets.component.scss'],
})
export class PlayerAssetsComponent implements OnInit {
  playerAssets: PlayerAsset[] = [];
  editingPlayerAsset: PlayerAsset | null = null;

  constructor(private playerAssetsService: PlayerAssetsService) {}

  ngOnInit(): void {
    this.loadPlayerAssets();
  }

  loadPlayerAssets(): void {
    this.playerAssetsService
      .getAll()
      .subscribe((data: PlayerAsset[]) => (this.playerAssets = data));
  }

  addPlayerAsset(): void {
    this.editingPlayerAsset = { playerId: 0, assetId: 0, quantity: 1 };
  }

  editPlayerAsset(pa: PlayerAsset): void {
    this.editingPlayerAsset = { ...pa };
  }

  savePlayerAsset(): void {
    if (!this.editingPlayerAsset) return;

    if (this.editingPlayerAsset.id) {
      this.playerAssetsService
        .update(this.editingPlayerAsset.id, this.editingPlayerAsset)
        .subscribe(() => {
          this.loadPlayerAssets();
          this.editingPlayerAsset = null;
        });
    } else {
      this.playerAssetsService.create(this.editingPlayerAsset).subscribe(() => {
        this.loadPlayerAssets();
        this.editingPlayerAsset = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingPlayerAsset = null;
  }

  deletePlayerAsset(id: number): void {
    if (confirm('Are you sure you want to delete this player asset?')) {
      this.playerAssetsService
        .delete(id)
        .subscribe(() => this.loadPlayerAssets());
    }
  }
}
