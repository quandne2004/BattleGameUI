import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player, PlayerService } from '../services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {


  constructor(private playerService: PlayerService) { }
  players: Player[] = [];
  editingPlayer: Player | null = null;

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe((data: Player[]) => (this.players = data));
  }

  addPlayer() {
    this.editingPlayer = { name: '' };
  }

  editPlayer(player: Player) {
    this.editingPlayer = { ...player };
  }

  savePlayer() {
    if (!this.editingPlayer) return;

    if (this.editingPlayer.id) {
      this.playerService.updatePlayer(this.editingPlayer.id, this.editingPlayer)
        .subscribe(() => {
          this.loadPlayers();
          this.editingPlayer = null;
        });
    } else {
      this.playerService.createPlayer(this.editingPlayer)
        .subscribe(() => {
          this.loadPlayers();
          this.editingPlayer = null;
        });
    }
  }

  cancelEdit() {
    this.editingPlayer = null;
  }

  deletePlayer(id?: number) {
    if (!id) return;
    this.playerService.deletePlayer(id).subscribe(() => this.loadPlayers());
  }
}
