import { useState, useCallback , useEffect, useRef} from 'react'
import "./App.css";

function App() {
  const [length, setlength] = useState(4)
  const [number,setnumberAllowed] = useState(false)
  const [char, setcharAllowed] = useState(false)
  const [password , setpassword] = useState("");

  let inputref = useRef(null);
  
  
  let setpass = useCallback( ()=>{

    let pass = "" ;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeefghijklmnopqrstuvwxyz";

    if (number) {
      str = str + "1234567890"
    }
   if (char){
     str= str + "@#$$%^&_-*"
   }

   for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }

    setpassword(pass) ;

  } , [length , number , char]) ;

  let copypasstoclip = useCallback ( ()=>{
    inputref.current.select();
    window.navigator.clipboard.writeText(password);
  } , [password])

  useEffect ( ()=>{
     
    setpass()

  } , [number , char , length]);

  

  return (
    <>
      <div className='container1'>

       <div className='container2'>
          <div className='container3'>
             <div><input type="text" className='passfield' value={password} ref={inputref} /></div>
             <div className='copybtn' onClick={copypasstoclip}>copy</div>
          </div>
          <div className='container4'>
            <input 
             type="range" 
             max={20} 
             min={1}
             value={length}
             onChange={(e) => {setlength(e.target.value)}}

            />
            <label htmlFor="">Length : {length} </label>
            <br />
            <input 
            type="checkbox"
            checked = {number}
            onChange={()=> {setnumberAllowed((prev) => !prev)}}
             /> 
            <label htmlFor="">Number</label>
            <br />
            <input 
            type="checkbox"
            checked = {char}
            onChange={()=> {setcharAllowed((prev) => !prev)}}
             />
            <label htmlFor="">Specialcharecter</label>
          </div>
       </div>



      </div>
    </>
  )
}

export default App
