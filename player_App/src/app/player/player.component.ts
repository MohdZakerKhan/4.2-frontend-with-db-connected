
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  playerarray : any[] = [];
  id = "";
  name: string ="";
  club: string ="";
  goals: Number =0;
  
  constructor(private http: HttpClient ) 
  {
    this.getAllplayer();
  }
  getAllplayer() {
    this.http.get("http://localhost:4000/player")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.playerarray = resultData;
    });
  }
  setUpdate(data: any) 
  {
   this.name = data.name;
   this.club = data.club;
   this.goals = data.goals;
   this.id = data.id;
  
  }
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "club" : this.club,
      "goals" : this.goals,
    };
    
    this.http.put("http://localhost:4000/player"+ "/"+this.id,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllplayer();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:4000/player"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllplayer();
   
    });
    }
    
  save()
  {
    if(this.id == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
register()
  {
    let bodyData = {
      "name" : this.name,
      "club" : this.club,
      "goals" : this.goals, 
  };
    this.http.post("http://localhost:4000/player",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Player Registered Successfully")
         //this.getAllEmployee();
        this.name = '';
        this.club = '';
        this.goals  = 0;
        this.getAllplayer();
    });
  }
}

