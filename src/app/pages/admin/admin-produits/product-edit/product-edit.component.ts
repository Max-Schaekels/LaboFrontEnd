import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  
  private _fb : FormBuilder = inject(FormBuilder);

  isEditing : boolean = false;


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
