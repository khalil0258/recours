import axios from "axios";

axios.defaults.withCredentials=true;

// for the national verification 
export const checkTheLocal=async(id_reunion,id_decision,type)=>{
 try { 
    //console.log(typeof(id_reunion))
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
// console.log("api",data,...body)
    const path=`http://localhost:4000/recours/soumetreRecours?data=${data}`
       const response=await axios.post(path,body);
       return response;
    
} catch (error) {
    console.log(error)
}}
 


// for getting user infos 
export const getUserInfos=async()=>{
 
   try {
      const path="http://localhost:4000/user/getUserInfos";
      const response=await axios.get(path);
      return response;
   } catch (error) {
      console.log("rrr",error)
   }
}


// changer le motpass 
export const changerMotpass=async(body)=>{
   try {
      //console.log(body)
      const path=`http://localhost:4000/user/changePassword`;
      const response=await axios.put(path,body)
      //console.log(response)
      return response;
   } catch (error) {
      
   }
}

// update user infos 
export const updateInfos=async(body)=>{
   try {
      //console.log("body",body)
      const path="http://localhost:4000/user/update-profile";
      const response=await axios.put(path,body)
      //console.log(response)
      return response;
   } catch (error) {
      console.log(error)
   }
}

// check if connected 
export const checkConnexion=async()=>{
   try {
      const path="http://localhost:4000/auth/isConnected";
      const response=await axios.get(path);
      //console.log("isconnected",response)
      return response;
   } catch (error) {
      console.log(error)
   }
}

// logout 
export const login_out=async()=>{
   try {
      //console.log(" logout")
      const path="http://localhost:4000/auth/logout";
          const response=await axios.get(path);
      //console.log("logout",response)
      return response;
   } catch (error) {
      console.log(error)
   }
}
