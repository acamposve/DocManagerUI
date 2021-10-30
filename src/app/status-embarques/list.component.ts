import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { StatusEmbarquesService } from '@app/_services';
import { StatusEmbarques } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    statusembarques!: StatusEmbarques[];

    constructor(private statusEmbarquesService: StatusEmbarquesService) {}

    ngOnInit() {
        this.statusEmbarquesService.getAll()
            .pipe(first())
            .subscribe(statusembarques => this.statusembarques = statusembarques);
    }

    deleteStatusEmbarques(id: string) {
        const statusembarques = this.statusembarques.find(x => x.id === id);
        if (!statusembarques) return;
        statusembarques.isDeleting = true;
        this.statusEmbarquesService.delete(id)
            .pipe(first())
            .subscribe(() => this.statusembarques = this.statusembarques.filter(x => x.id !== id));
    }
}