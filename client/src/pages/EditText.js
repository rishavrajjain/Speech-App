import React,{useState,useEffect} from 'react';
import './text.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

export default function EditText(props) {
    const [dict,setDict]=useState({
        title:'',
        text:''
    })

    const token= localStorage.getItem('token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };
    const id = props.match.params.id;

    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/text/${id}`,config).then((res)=>{
            setDict(res.data.dictionary);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    },[])

    const onChange = e => setDict({ ...dict, [e.target.name]: e.target.value });

    const submit = async (e)=>{
        e.preventDefault();
        try{
            const {title,text}=dict;
            console.log(title);
            console.log(text);
            if(title === '' || text === '' ){
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
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/editText/${id}`,{
                title,
                text
            },config)
            setLoading(false);
            toast.success('Text updated', {
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


    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>): (
        <div>
            
            
            <section id="form-page">
        
        
        
        <div className="container form-page" >
        
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Edit</h1>
          </div>
          <div class="form-content">
            <form>
              <div class="form-group"><label for="title">Title</label><input onChange={onChange} value={dict.title} type="text" id="title" name="title" required="required" /></div>
              
              <div class="form-group"><label for="text">Text</label><textarea rows="8" onChange={onChange} type="text" id="text" value={dict.text} name="text" required="required" /></div>
              
              
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
             
        </div>
    )
}