import { useState } from "react";


function Form(){
    const [state,setState]=useState({
        firstName:"",
        lastName:""
    })
    let handleChange = (evt) =>{
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }
    
    let [list, setList] = useState();
    let cm = new CrudManager();
 
    let endpoint = "";
    let reference = "https://crudcrud.com/api/"+endpoint;
    
    let render = () => {
        let x;
        fetch(reference+'/todos')
        .then(response => response.json())
        .then(data => {
            <>
            {setList(data.map((e)=>{
                return e.firstName;
            }).join(' '))
            }
            <button>he</button>
            </>

            
        })
    }
    
    return(
        <div>

            <form>
                <label>
                    First name
                <input type="text" name="firstName" value={state.firstName} onChange={handleChange}/>
                </label>

                <label>
                    Last name
                    <input type="text" name="lastName" value={state.lastName} onChange={handleChange}/>
                </label>
                <input type="submit" onClick={
                    (e)=>{
                        e.preventDefault()
                        cm.create(state.firstName,state.lastName);
                        render()
                    }
                    }></input>
                <br></br>
                <label>
                    New Data
                    <input type="submit" value="Click here to fetch new data" onClick={(e)=>{
                        e.preventDefault()
                        render();      
                    }}></input>
                </label>
            </form>
            <div>{console.log("List: "+list)}</div>
                    
            List: {list}
        </div>
    );
}


class CrudManager {
    endpoint = "9dd6200af2694e07a1e876a7fb414a62";
    reference = "https://crudcrud.com/api/"+this.endpoint;
    x = [];
    

    create(fName,lName){

        fetch(this.reference+'/todos', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                firstName: fName,
                lastName: lName
            })
            })
            .then(response => response.json())
            .then(data => console.log(data))
    }



}



export default Form;