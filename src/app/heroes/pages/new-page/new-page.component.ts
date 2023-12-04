import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit{

  public heroForm  =  new FormGroup(
    {
      id:              new FormControl(''),
      superhero:       new FormControl('', { nonNullable: true }),
      publisher:       new FormControl<Publisher>(Publisher.DCComics),
      alter_ego:       new FormControl(''),
      first_appearance:new FormControl(''),
      characters:      new FormControl(''),
      alt_img:         new FormControl(''),
    }
  );

  public publishers = [{id: 'DC Comics', desc: 'DC - Comics'}, {id: 'Marvel Comics', desc: 'Marvel - Comics'}]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router ,
    private heroesService: HeroesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);
      this.heroForm.reset(hero);
      return;
    });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }


  onDeleteHero(){
    if(!this.currentHero.id) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });
    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
      switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id!)),
      filter(wasDeleted => wasDeleted))
    .subscribe(result => {
      this.router.navigate(['/heroes/list']);
      this.shwoSnackBar(`${this.currentHero.superhero} deleted`);
    });
  }


  shwoSnackBar(message: string){
    this.snackBar.open(message, 'Ok!', {
      duration: 2500
    });
  }

  onSubmit(){
      console.log(this.heroForm.value);
      console.log(this.heroForm.valid);
      if (this.heroForm.invalid) return;
      if (this.currentHero.id) {
        this.heroesService.updateHero(this.currentHero).subscribe(hero => {
          this.shwoSnackBar(`${hero.superhero} updated`);
        });
        return ;
      }
      this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.shwoSnackBar(`${hero.superhero} creado`);
      })  ;
  }

}
