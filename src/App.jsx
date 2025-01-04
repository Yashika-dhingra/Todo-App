import { useEffect,useState } from "react";
import classes from './styles.module.css';
import TodoItem from './components/todo-item';
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {

  const[loading, setLoading]= useState(false);
  const [todoList, settodoList]= useState([]);
  const [errorMsg, setErrorMsg]= useState(null);
  const[todoDetails, setTodoDetails]= useState(null);
  const[openDialog, setOpenDialog]= useState(false);

  async function fetchAllTodosList(){
    try{
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/todos');
      const result = await apiResponse.json();

      if(result?.todos && result?.todos?.length > 0){
        settodoList(result?.todos);
        setLoading(false);
        setErrorMsg('');
      }else{
        settodoList([]);
        setLoading(false);
        setErrorMsg('');
      }

     console.log(result);

    }catch{
      console.log(error);
      setErrorMsg('Some error occured!!')
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId){
    console.log(getCurrentTodoId);

    try{
      const apiResponse = await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`);//not static
      const details = await apiResponse.json();
      
      console.log(details); // details are results only
      
      if(details){
        setTodoDetails(details);
        setOpenDialog(true);
      }else{
        setTodoDetails(null);
        setOpenDialog(false);
      }

    }catch(error){
      console.log(error);
      
    }
    
  }

  useEffect(()=>{
    fetchAllTodosList();
  },[])

  if(loading){
    return <Skeleton Skeleton variant="circular" width={650} height={650}/>
  }

  return (
   <div className={classes.mainWrapper}>
    <h1 className={classes.headerTitle}>ToDo App Using Material UI</h1>
    <div className={classes.todoListWrapper}>
      {
        todoList && todoList.length > 0 ?
        todoList.map(todoItem=> 
        <TodoItem  
        fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
        todo={todoItem} />) 
        : null}
    </div>
    <TodoDetails
    setOpenDialog={setOpenDialog}
    openDialog={openDialog}
    todoDetails={todoDetails}
    setTodoDetails={setTodoDetails}
    />
   </div>
  );
}

export default App;

