import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketsService } from '../tickets.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  constructor(public dialog: MatDialog, public ticketsService: TicketsService) {
  }

  ngOnInit(): void {
  }

  addTicket(): void {
    const dialogRef = this.dialog.open(TicketCreateComponent, {
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
