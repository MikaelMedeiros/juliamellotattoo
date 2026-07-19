import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { finalize } from 'rxjs';

import { GiftService } from '../gift.service';

import { Gift } from '../model/gift.model';
import { GiftFilterDto } from '../model/gift-filter.dto';

import { TableLazyLoadEvent } from 'primeng/table';

import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    SelectModule,
    DatePickerModule
  ]
})
export class ListComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly giftService = inject(GiftService);

  private readonly messageService = inject(MessageService);

  loading = false;
  filterDialog = false;

  gifts: Gift[] = [];

  totalRecords = 0;

  readonly pageSize = 10;

  readonly claimedOptions = [
    { label: 'Todos', value: null },
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ];

  readonly usedOptions = [
    { label: 'Todos', value: null },
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ];

  form = this.fb.group({
    name: [''],
    phone: [''],
    claimed: [null as boolean | null],
    used: [null as boolean | null],
    expirationStart: [null as Date | null],
    expirationEnd: [null as Date | null]
  });

  ngOnInit(): void {
    this.search();

    this.form.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(() => {
      this.search();
    });
  }

  search(page = 1): void {

    this.loading = true;

    const filter: GiftFilterDto = {
      page,
      pageSize: this.pageSize,

      name: this.form.value.name || undefined,
      phone: this.form.value.phone || undefined,

      claimed: this.form.value.claimed ?? undefined,
      used: this.form.value.used ?? undefined,

      expirationStart: this.form.value.expirationStart?.toISOString(),
      expirationEnd: this.form.value.expirationEnd?.toISOString()
    };

    this.giftService
      .getGifts(filter)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(response => {

        this.gifts = response.items;
        this.totalRecords = response.total;

      });

  }

  clear(): void {

    this.form.reset();

    this.search();

  }

  onLazyLoad(event: TableLazyLoadEvent): void {

    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;

    const page = Math.floor(first / rows) + 1;

    this.search(page);

  }

  getStatus(gift: Gift): string {

    if (gift.used) {
      return 'Utilizado';
    }

    if (gift.claimed) {
      return 'Resgatado';
    }

    return 'Disponível';

  }

  getSeverity(gift: Gift) {

    if (gift.used) {
      return 'danger';
    }

    if (gift.claimed) {
      return 'warn';
    }

    return 'success';

  }

  copyClaimLink(gift: Gift): void {

    const link = `${window.location.origin}/claim/${gift.id}`;

    navigator.clipboard.writeText(link);

    this.messageService.add({
      severity: 'success',
      summary: 'Link copiado',
      detail: 'O link do gift foi copiado para a área de transferência.'
    });

  }

}