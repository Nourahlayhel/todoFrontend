import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgModel } from '@angular/forms';
import { Todo } from '../models/Todo';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getLocaleDateFormat, getLocaleDateTimeFormat, NumberSymbol } from '@angular/common';
import { catchError, Observable, Subject, Subscription } from 'rxjs';
import{debounceTime, map}from 'rxjs/operators'



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
 keyUp:Subject<KeyboardEvent>= new Subject<KeyboardEvent>();
subscription?:Subscription;
  todo :Todo[]=[];
  doing :Todo[]=[];
  done:Todo[]=[];
 searchText:string="";
 

 
  constructor(private route: ActivatedRoute,private apicaller:HttpClient,private _route: Router) { 
  
  }
 
  
  index(s:string,sub:string){
    return s.indexOf(sub);
  }
  onSeacrhTextEntered(searchvalue:string){
this.searchText=searchvalue;
console.log(this.searchText);
  }
add(){
  var desc=prompt("add task description");
  if(desc!=null){
  var t=new Todo;
t.TODO_ID=-1;
t.description=desc;
t.Person_ID=this.todo[0].Person_ID;
t.status="TO DO";
t.Due_date=new Date();
t.estimation="";
t.importance="";
t.category="";
this.todo.unshift(t);
return this.edit_task(t);}
else return null;


}
edit(i:number){
alert("hi");
}
trackByFn(index:number, item:Todo) {
  return index;  
}
removequote(){
  var x=(<HTMLDivElement>document.getElementById("quotediv"))
  x.style.backgroundColor="#F4F7FC";
    x.style.display = "none";
  
    var y=(<HTMLButtonElement>document.getElementById("info"))
    y.style.marginLeft="95%";
    y.style.display="block";
   
  
}
search(){
  var x=(<HTMLInputElement>document.getElementById("search"))
 
  x.focus();
}

showquote(){
  var x=(<HTMLDivElement>document.getElementById("quotediv"))
  var y=(<HTMLButtonElement>document.getElementById("info"))
  x.style.justifyContent="space-between";
  x.style.width="100%"
  y.style.display="none";
    x.style.display = "flex";
  x.style.backgroundColor="blueviolet";
  
  
}
duedatechange(event:any,i:NumberSymbol)
{
  var todo=new Todo();
  todo=this.todo[i];
    todo.Due_date=event.target.value;
      if(todo.importance==undefined)
      todo.importance="";
      if(todo.estimation==undefined)
      todo.estimation="";
  return this.edit_task(todo);

}
categorychange(event:any,i:number)
{
  var todo=new Todo();
  todo=this.todo[i];
    todo.category=event.target.value;
      if(todo.importance==undefined)
      todo.importance="";
      if(todo.estimation==undefined)
      todo.estimation="";
  return this.edit_task(todo);
}
importancechange(event:any,i:number){
  var todo=new Todo();
  todo=this.todo[i];
    todo.importance=event.target.value;
    console.log(todo.importance)
      if(todo.estimation==undefined)
      todo.estimation="";
  return this.edit_task(todo);
}

estimatechange(event:any,i:number){
  var todo=new Todo();
  todo=this.todo[i];
   var s:string=(<HTMLInputElement>document.getElementById("number")).value+' ' +(<HTMLInputElement>document.getElementById("units")).value

    todo.estimation=s;
      if(todo.importance==undefined)
      todo.importance="";
  return this.edit_task(todo);
}
change(event:any,i:number)
{
var todo:Todo=new Todo();
todo=this.todo[i];
todo.description=event.target.value;
if(todo.importance==undefined)
todo.importance="";
if(todo.estimation==undefined)
todo.estimation="";
console.log(todo.description)
return this.edit_task(todo);
}
edit_task(t:Todo){
  var raw = JSON.stringify({
    "TODO_ID": t.TODO_ID,
    "DESCRIPTION": t.description,
    "CATEGORY_NAME": t.category,
    "DUE_DATE": t.Due_date,
    "ESTIMATE":t.estimation,
    "USER_ID": t.Person_ID,
    "IMPORTANCE": t.importance,
    "STATUS": t.status
  });
  console.log(raw);
  return this.apicaller.post<Todo>("https://localhost:7093/api/data/edit_task",raw,{
 headers:new HttpHeaders(
   {
     'Content-Type':'application/json'
   }
 )
  }
 ).subscribe((data:any)=>console.log(data));
}
drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    return 0;}  else {
     
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    
      
    var newstatus;
    console.log(event);
    console.log(event.previousContainer.id);
    console.log(event.container.id);


    if(event.container.id=="cdk-drop-list-0")
    newstatus="TO DO";
    else
    if(event.container.id=="cdk-drop-list-1")
    newstatus="doing";
    else newstatus="done"; 
    var t:Todo=event.container.data[event.currentIndex];
    t.status=newstatus;
    console.log(t.status);
if(t.estimation==undefined)
t.estimation="";
 return this.edit_task(t);
      }
}
parseInt(todo:Todo){
  if(todo.estimation!.split(' ')[0]==undefined) return 0
  return parseInt(todo.estimation!.split(' ')[0])
}
str(todo:Todo){
  if(todo.estimation!.split(' ')[1]==undefined) return "none"
 else return (todo.estimation!.split(' ')[1])
 
  
}
  ngOnInit(): void {
  
this.route.params.subscribe((params=>
  this.apicaller.post<Todo>("https://localhost:7093/api/data/get_tasks/",{USER_ID:params["id"]})
.subscribe((data:any)=>{
 
  for(const d of(data as any)){
  
    var t=new Todo();
    t.TODO_ID=d.todo_id;
    t.Person_ID=d.user_id;
    t.status=d.status;
    t.description=d.description;
    t.Due_date=d.due_date;
    t.estimation=d.estimate;
    t.importance=d.importance;
    t.category=d.category_name;
    console.log(t.estimation?.split(' '))
    if(d.status=="TO DO")
    this.todo.push(t);
    else if (d.status=="doing")
  this.doing.push(t);
   else this.done.push(t)
  
}})))
this.subscription=this.keyUp.pipe(
  map((event:any)=>event?.target?.value),debounceTime(1000))

.subscribe((event)=>{
   this.searchText=event;

})}
}

