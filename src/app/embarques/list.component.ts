import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmbarquesService } from '@app/_services';
import { Receipts } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    receipts!: Receipts[];

    constructor(private embarquesService: EmbarquesService) {}

    ngOnInit() {
console.log("entro");

        this.embarquesService.getAll()
            .pipe(first())
            .subscribe(receipts => this.receipts = receipts);
    }

    deleteEmbarques(id: string) {
        const embarques = this.receipts.find(x => x.embarqueId === id);
        if (!embarques) return;
        embarques.isDeleting = true;
        this.embarquesService.delete(id)
            .pipe(first())
            .subscribe(() => this.receipts = this.receipts.filter(x => x.embarqueId !== id));
    }
}