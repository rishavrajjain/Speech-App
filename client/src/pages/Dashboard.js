import React, { useEffect, useState } from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { toast } from "react-toastify";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import axios from "axios";
const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

function synthesizeSpeech(text) {
    const speechConfig = sdk.SpeechConfig.fromSubscription(`${process.env.REACT_APP_AZURE_API_KEY}`, "eastus");
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
        text,
        result => {
            if (result) {
                synthesizer.close();
                return result.audioData;
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

export default (props) => {


    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [text,setText]=useState('');
    const token= localStorage.getItem('token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    const textSpeech = ()=>{
        synthesizeSpeech(text)
    }

    const speech = (text)=>{
        synthesizeSpeech(text)
    }


    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/allTextOneUser`,{},config).then((res)=>{
            setData(res.data.dictionaries);
            setLoading(false);
        }).catch(err=>{
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
                setLoading(false);
        })

    },[])
    
    
    return(
  <AnimationRevealPage>
    <div className="container">
    <input className="form-control" name="text" onChange={(e)=>setText(e.target.value)} placeholder="Text" style={{marginTop:'3.5rem'}}/>
    <PrimaryButton className="btn btn-block" onClick={textSpeech}>Speak</PrimaryButton>
    <PrimaryButton onClick={()=>props.history.push('/addText')}>Add Text</PrimaryButton>

    <div className="row" style={{marginTop:'2rem'}}>
    {
        data.map(dict=>{
            return(
                <div className="col-xl-3 col-md-3 col-sm-12">
                    <div class="card" style={{width: "18rem;"}}>
                    <i className="fa fa-profile"></i>
                    <div class="card-body">
                    <h5 class="card-title">{dict.title}</h5>
                    <hr></hr>
                    <p class="card-text" style={{marginTop:'1rem'}}>{dict.text}</p>
                    <PrimaryButton onClick={()=>speech(dict.text)}>Speak</PrimaryButton>
                    <PrimaryButton style={{marginLeft:'10px'}} onClick={()=>props.history.push(`/editText/${dict._id}`)}>Edit</PrimaryButton>
                    </div>
                    </div>
                </div>
            )
            
        })
    }
        
    
    
    
    </div>
    
    </div>
  </AnimationRevealPage>
)};
