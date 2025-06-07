import { Component, OnInit } from '@angular/core';
import { Asset, AssetsService } from '../services/asset.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assets',
  standalone: true,

  imports: [FormsModule],
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  assets: Asset[] = [];
  editingAsset: Asset | null = null;

  constructor(private assetsService: AssetsService) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetsService
      .getAll()
      .subscribe((data: Asset[]) => (this.assets = data));
  }

  addAsset(): void {
    this.editingAsset = { assetName: '', type: '' };
  }

  editAsset(a: Asset): void {
    this.editingAsset = { ...a };
  }

  saveAsset(): void {
    if (!this.editingAsset) return;

    if (this.editingAsset.id) {
      this.assetsService
        .update(this.editingAsset.id, this.editingAsset)
        .subscribe(() => {
          this.loadAssets();
          this.editingAsset = null;
        });
    } else {
      this.assetsService.create(this.editingAsset).subscribe(() => {
        this.loadAssets();
        this.editingAsset = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingAsset = null;
  }

  deleteAsset(id: number): void {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.assetsService.delete(id).subscribe(() => this.loadAssets());
    }
  }
}
