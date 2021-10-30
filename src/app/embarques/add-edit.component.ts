import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmbarquesService, StatusEmbarquesService, AlertService, UserService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    selectedFiles: File[];
    uploadProgress = 0;
    errorMsg = '';
    statusEmbarquesList  = [];
    accountsList = [];
    public response: {dbPath: ''};
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private embarquesService: EmbarquesService,
        private statusEmbarquesService: StatusEmbarquesService,
        private userService: UserService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.statusEmbarquesService.getAll()            
        .pipe(first())
        .subscribe(receipts => this.statusEmbarquesList = receipts);



        this.userService.getAll()        
        .pipe(first())
        .subscribe(accounts => this.accountsList = accounts);

        
        this.form = this.formBuilder.group({
            statusDescription: ['', Validators.required],
            referencia: ['', Validators.required],
            fechaArribo: ['', Validators.required],
            origen: ['', Validators.required],
            destino: ['', Validators.required],
            cantidadContainers: ['', Validators.required],
            mercancia: ['', Validators.required],
        });

        if (!this.isAddMode) {
            this.embarquesService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createEmbarques();
        } else {
            this.updateEmbarques();
        }
    }

    private createEmbarques() {
        this.embarquesService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Status added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
    public uploadFinished = (event) => {
      this.response = event;
    }
    private updateEmbarques() {
        this.embarquesService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Status updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    
  }