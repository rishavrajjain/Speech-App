import React,{useState} from 'react'
import './text.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

export default function AddText(props) {

    const [dict,setDict]=useState({
        title:'',
        text:'',
    });
    const token= localStorage.getItem('token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    const [loading,setLoading]=useState(false);

    const onChange = e => setDict({ ...dict, [e.target.name]: e.target.value });

    const submit = async (e)=>{
        e.preventDefault();
        try{
            const {title,text}=dict;
            if(title=== '' || text=== ''){
                toast.error('Please fill in all the details', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }
              setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/addText`,{
                title,
                text
            },config)
            setLoading(false);
            toast.success('Text added', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                props.history.push('/dashboard');
        }catch(err){
            setLoading(false);
            console.log(err);
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }


    return (
        <div>
            <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
            <section id="form-page">
        
        
        
        <div className="container form-page" >
        
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Add Text</h1>
          </div>
          <div class="form-content">
            <form>
              <div class="form-group"><label for="title">Title</label><input onChange={onChange} type="text" id="title" name="title" required="required" /></div>
              
              <div class="form-group"><label for="text">Text</label><textarea rows="8" onChange={onChange} type="text" id="text" name="text" required="required" /></div>
              
              
              <div class="form-group"><button onClick={submit}>Submit</button></div>
              
            </form>
          </div>
        </div>
        <div class="form-panel two">
          
        </div>
        </div>
        
      </div>
        
       
        
        </div>
        </section>  
        </LoadingOverlay>      
        </div>
    )
}