import axios from "axios"


// for the national verification 
export const checkTheLocal=async(id_reunion,id_decision,type)=>{
 try { 
    console.log(typeof(id_reunion))
    const path = `http://localhost:4000/recours/verification`;
    const queryParams = new URLSearchParams();
    queryParams.append('id_reunion', id_reunion);
    queryParams.append('type', type);
    if(type===1){
    queryParams.append('id_decision', +id_decision);
      } 
  
    const response = await axios.get(`${path}?${queryParams}`);
 
    return response;
    
 } catch (error) {
    console.log("here",error.message)
 }}

export const soumetre_recours= async(data,body)=>{
try { 
console.log("api",data,...body)
    const path=`http://localhost:4000/recours/soumetreRecours?data=${data}`
       const response=await axios.post(path,body);
       return response;
    
} catch (error) {
    console.log(error)
}}
 