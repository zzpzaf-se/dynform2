import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemFormFieldsService } from '../services/item-form-fields.service';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../dynamic-form/form/form.component';
import { FormFieldsModule } from '../dynamic-form/form-fields.module';
import { FormFieldsService } from '../services/form-fields-service';

@Component({
  selector: 'request-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    MatInputModule,
    FormFieldsModule,
  ],
  // providers: [FormFieldsModule],
  templateUrl: './request-data.component.html',
  styleUrl: './request-data.component.scss',
})
export class RequestDataComponent {

  constructor(
    private formBuilder: FormBuilder,
    // private itemService: ItemFormFieldsService
  ) {}

  private itemService = inject(FormFieldsService); 
  requestFormGroup!: FormGroup;
  input1Label: string = 'Item Id';
  input1Placeholder: string = 'Input Id here';
  input1ControlNane: string = 'itemId';
  submitButtomText: string = 'Get it';

  
  ngOnInit() {
    this.initializeForm();
    this.requestFormGroup.valueChanges.subscribe(val => {
      const id = this.requestFormGroup.get(this.input1ControlNane)?.value;
      if (id == undefined || id == null || id == '' || id <= 0) return;
      // console.log('>===>> RequestDataComponent - id', id);
      this.itemService.setId(id!);
    });
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});
    fbGroup.addControl(this.input1ControlNane, new FormControl(''));
    this.requestFormGroup = fbGroup;
  }

}
