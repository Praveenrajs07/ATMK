import axios from "axios";
import { saveAs } from 'file-saver';
export const OrgAdminmailcheckget = async (id,page) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  try {
    let response2 = await fetch(`/platform/v1/sigmadocsummary/${id}`,
      {
        headers: {
          'x-api-key': `${key}`
        },
      }
    )
    console.log("err",response2)
    const data2 = await response2.json();
    console.log("Api inside", data2);
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"sigmadocsummary",localStorage.getItem("UserID"));
    return [true, data2];
  } catch (err) {
    console.log("vercelerrro", err);
    return [false, ""];
  }
};

export const OrgAdminmailcheckget1 = async(email,page) =>{
   console.log("mailcheck",email)
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let cancelToken;
      if(typeof cancelToken != typeof undefined)
      {
        cancelToken.cancel("API Call cancelled")
      }
      let response2 = await fetch(`/platform/v1/userdetail/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2[0]);
      const iscalled = await CreatApiLog("GET",page,"userdetail",localStorage.getItem("UserID"));
      // return {data2};
      if ((data2[0]) === "" || (data2[0]) === null || (data2[0]) === undefined) {
        return [false,""];
      } 
    else{
      return [true,(data2[0])];
    }
      
      // return [true, (data2[0]).tennantId];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const OrgAdminmailcheckget2 = async(id,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/networkbytennatid/${id}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside1", data2)
      const iscalled = await CreatApiLog("GET",page,"networkbytennatid",localStorage.getItem("UserID"));
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const CreateOrganizationPost = async (name, organizationname, page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/org',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'name': `${name}`,
            'createdBy': `${organizationname}`,
        }
      };
      let tentidresponse ="";
      try {
     let response = await axios.request(options2);
     tentidresponse= await response.data;
     const iscalled = await CreatApiLog("POST",page,"org",localStorage.getItem("UserID"));
     console.log("response",tentidresponse);
      }catch(error){
        console.error("done2",error);
      }
      // axios.request(options2).then(function (response2) {
      // //  window.location.reload();
      // }).catch(function (error) {
      //     console.error("done2",error);
      // });
     
      return tentidresponse;
}
export const CreateOrguserrolepost = async (emailid, name, role, tenentid,page) =>
{         
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/userdetail',
        data: {
            'emailId': `${emailid}`,
            'userName': `${name}`,
            'password':"",
            'roleType': `${role}`,
            'method':"",
            'tennantId':`${tenentid}`,
            'otp':""
        }
      };
      try {
        const response = await axios(options2);
        const result = response.data;
        const title = 'User access';
        const description = `You have successfully added ${emailid} as a role: ${role} and the added user will receive an E-mail for confirmation.`;
        const tennat_id = tenentid;
        const statuses = false;
      
        await NotificationPost(title, description, localStorage.getItem("UserID"), tennat_id, statuses, "userdtail");
        console.log('Response:', result);
        const iscalled = await CreatApiLog("POST",page,"userdetail",localStorage.getItem("UserID"));
        return result;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
}
export const Orgadminsignup = async (emailid,Pwd,signInMethod,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: '/platform/v1/userdetail',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'password': `${Pwd}`,
            'method':`${signInMethod}`,
            'emailId': `${emailid}`
          
          
        }
      };
      let usercheck=true;
      try {
        let response = await axios.request(options2);
        let statuscheck= await response.data;
        const iscalled = await CreatApiLog("PUT",page,"userdetail",localStorage.getItem("UserID"));
        console.log("response",statuscheck);
         }catch(error){
           console.error("done2",error);
           usercheck=false;
         }
         return usercheck;


      // await axios.request(options2).then(function (response2) {
      //  console.log("response",response2);
      //  return true;
      // //  window.location.reload();
      // }).catch(function (error) {
      //     console.error("done2",error);
      //     return false;
      // });
}


export const updateuser = async (emailId,roleType,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: `/platform/v1/userdetail/${emailId}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'emailId': `${emailId}`,
            'roleType': `${roleType}`
          
        }
      };
      let usercheck=true;
      try {
        let response = await axios.request(options2);
        let statuscheck= await response.data;
        const iscalled = await CreatApiLog("PUT",page,"userdetail{id}",localStorage.getItem("UserID"));
        console.log("response",statuscheck);
         }catch(error){
           console.error("done2",error);
           usercheck=false;
         }
         return usercheck;
}

export const Orguserlogincheck = async (emailid,pwd,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/userdetailsid',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'emailId': `${emailid}`,
            'password':`${pwd}`
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     const iscalled = await CreatApiLog("POST",page,"userdetailsid",localStorage.getItem("UserID"));
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}
export const Sessionloginpost = async (currentDateTime,logouttime,userlogstatus,tenentid,role,email,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/session',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'loginTime': currentDateTime.toString(),
            'logoutTime': "",
            'activity':`${userlogstatus}`,
            'tennatId': `${tenentid}`,
            'roleType':`${role}`,
            'mailId':`${email}`
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
       return response2;
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
      const iscalled = await CreatApiLog("POST",page,"session",localStorage.getItem("UserID"));
}
export const Sessionstatusget= async(email,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/session/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2);
      const iscalled = await CreatApiLog("GET",page,"session{id}",localStorage.getItem("UserID"));
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
}


export const Sessionstatusget1 = async (id,page) => {
  console.log("getticket",id)
  const url = `/platform/v1/session/${id}`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });
    const iscalled = await CreatApiLog("GET",page,"session{id}",localStorage.getItem("UserID"));
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};


export const Sessionstatusupdate = async (logintime,logouttime,logstatus,email,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: '/platform/v1/session',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          'loginTime':`${logintime}`,
          'logoutTime':`${logouttime}`,
          'activity':`${logstatus}`,
          'mailId':`${email}`,
          
           
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     const iscalled = await CreatApiLog("PUT",page,"session",localStorage.getItem("UserID"));
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}
export const fetchSigmadocByTid = async (start, limit, tenantId,page) => {
  const url = '/platform/v1/sigmadocbytid';
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    data: {
      start: start,
      limit: limit,
      tenantId: tenantId
    }
  };

  try {
    const response = await axios(options);
    const sigmadocData = response.data;
    console.log('Response:', sigmadocData);
    const iscalled = await CreatApiLog("POST",page,"sigmadocbytid",localStorage.getItem("UserID"));
    return sigmadocData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
export const fetchSigmadocdetails = async (sigmaId,page) => {
  console.log("id", sigmaId);
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  try {
    const response3 = await fetch(`/platform/v1/sigmadoc/${sigmaId}`, {
      headers: {
        'x-api-key': `${key}`
      },
    });
    console.log("response", response3);

    const data = await response3.json();
    const iscalled = await CreatApiLog("GET",page,"sigmadoc{id}",localStorage.getItem("UserID"));
    console.log("Api inside", data);
    return [true, data];
  } catch (err) {
    console.log("Error fetching document details:", err);
    return [false, ""];
  }
};

export const addToFavorites = async (emailId, sigmaId, name__v, filename__v, status__v, tenantId,page) => {
  const url = '/platform/v1/favourite';
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    data: {
      emailId:emailId,
      docId: sigmaId,
      docName: name__v,
      fileName: filename__v,
      docStatus: status__v
    }
  };

  console.log("docId", sigmaId);
  
  try {
    const response = await axios(options);
    const result = response.data;
    const title = 'Favourites';
    const description = `${name__v} is added to favourites.`;
    const tennat_id = tenantId;
    const statuses = false;
  
    await NotificationPost(title, description, emailId, tennat_id, statuses,"favourite");
    console.log('Response:', result);
    const iscalled = await CreatApiLog("POST",page,"favourite",localStorage.getItem("UserID"));
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchFavoriteDetails = async (emailId,limit,page) => {
  console.log("mail",emailId)
  const url = `/platform/v1/favourite/${emailId}/${limit}`;
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';

  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': key
      }
    });
    
    console.log('Response:', response);

    // Assuming the response data is in the 'data' field
    const data = response.data;
    console.log('fetchFavoriteDetails:', data);
    const iscalled = await CreatApiLog("GET",page,"favourite{id}{id1}",localStorage.getItem("UserID"));
    return [true, data];
  } catch (error) {
    console.error('Error fetching favorite details:', error);
    return [false, null];
  }
};

export const deleteFavorite = async (emailId, sigmaId, name_v, tenantId,page) => {
  const url = `/platform/v1/favourite/${emailId}/${sigmaId}`;
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'DELETE',
    url,
    headers: {
      'x-api-key': key
    },
    data: {}
  };

  try {
    const responsed = await axios(options);
    console.log('Responsed:', responsed);
    const title = 'Favourites';
    const description = `${name_v} is removed from favourites.`;
    const tennat_id = tenantId;
    const statuses = false;
  
    await NotificationPost(title, description, emailId, tennat_id, statuses,"favourite{id}{id1}");
    const iscalled = await CreatApiLog("DELETE",page,"favourite{id}{id1}",localStorage.getItem("UserID"));
    return responsed;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const forgetPasswordMailVerification = async(email,page) =>{

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  //console.log("done1",response.data);
    // console.log("date",date);
    const options2 = {
      method: 'POST',
      url: `platform/v1/resetpassword/${email}`,
    };
    let MailVerify = false;
    await axios.request(options2).then(async function (response2) {
     console.log("response",response2);
     let present = await userDetailWithEmail(email,"resetpassword{id}")
      MailVerify = present[0];
    //  window.location.reload();
    }).catch(function (error) {
        console.error("done2",error);
        MailVerify = false;
    });
    const iscalled = await CreatApiLog("POST",page,"resetpassword{id}",localStorage.getItem("UserID"));
 return MailVerify;
}

export const resetPasswordSubmit = async (email, password, otp, page) =>
{       
let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
// let userID = localStorage.getItem('UserID');
// let connectAddress = localStorage.getItem("walletAddress");
// let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//console.log("done1",response.data);
  // console.log("date",date);
  const options2 = {
    method: 'PUT',
    url: `platform/v1/resetpassword/${email}`,
    headers: {
      'x-api-key': `${key}`    
    },
    data: {
      'emailId':`${email}`,
      'password':`${password}`,
      'otp':`${otp}`
    }
  };

  let MailVerify = false;
  try {
    let response = await axios.request(options2);
    MailVerify = true;
    let ev = response.data.result;
      let present = ev.indexOf("Failed")
      if(present>1){
        MailVerify =false;
      }
      else{
        MailVerify=true;
      }
      const iscalled = await CreatApiLog("PUT",page,"resetpassword{id}",localStorage.getItem("UserID"));
    console.log("response",response.data);
  }catch(error){
    console.error("done2",error);
    MailVerify = false;
  }
 
  return MailVerify;
}
export const Userprofileupload = async (Firstname,lastname,emailid,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/userprofile',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          'firstName':`${Firstname}`,
          'lastName':`${lastname}`,
          'mobileNumber':"",
          'profilePic':"",
          'gender':"",
          'state':"",
          'country':"",
          'launguage':"",
          'timeZone':"",
          'emailId': `${emailid}`,
           
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     const iscalled = await CreatApiLog("POST",page,"userprofile",localStorage.getItem("UserID"));
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}

export const Userprofileupdate = async (Firstname,lastname,mobno,Img,gender,state,selectedCountry,launguage,timezone,emailid,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: '/platform/v1/userprofile',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          'firstName':`${Firstname}`,
          'lastName':`${lastname}`,
          'mobileNumber':`${mobno}`,
          'profilePic':`${Img}`,
          'gender':`${gender}`,
          'state':`${state}`,
          'country':`${selectedCountry}`,
          'launguage':`${launguage}`,
          'timeZone':`${timezone}`,
          'emailId': `${emailid}`
           
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     const iscalled = await CreatApiLog("PUT",page,"userprofile",localStorage.getItem("UserID"));
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}

export const userprofileget = async(email,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/userprofile/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      const iscalled = await CreatApiLog("GET",page,"userprofile{id}",localStorage.getItem("UserID"));
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const getSigmafieldConfig = async (tennatid,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
  try{
    let response2 = await fetch(`/platform/v1/sigmafieldconf/${tennatid}`, 
    {
        headers: {
            'x-api-key': `${key}`    
          },
      }
      )
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    // console.log("Api inside", data2)
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"sigmafieldconf{id}",localStorage.getItem("UserID"));
    return [true,data2];
  }catch(err){
    console.log("vercelerrro",err)
    return [false,""];
  }
    
}

export const getJobList = async (tennatid,start,limit,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/job',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          tenantId:tennatid,
          limit:limit,
          start:start
           
        }
      };

     let jobsList =[];
      try {
        const response = await axios(options2);
         jobsList = response.data;
         const iscalled = await CreatApiLog("POST",page,"job",localStorage.getItem("UserID"));
        console.log('Responsejob:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const getJobListImmutable = async (tennatid,start,limit,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/job',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          tenantId:tennatid,
          limit:limit,
          start:start
           
        }
      };

     let jobsList =[];
      try {
        const response = await axios(options2);
         let jobsLists = response.data;
         jobsLists.map((r,i)=>{
          if(r.jobName === "MAKE_IREC"){
            jobsList.push(r);
          }
          console.log("datasr",jobsList)
         })
         const iscalled = await CreatApiLog("POST",page,"job",localStorage.getItem("UserID"));
        // console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const executeJobListImmutable = async (page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/finalisedocs',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          
           
        }
      };

     let jobsList ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
        const iscalled = await CreatApiLog("POST",page,"finalisedocs",localStorage.getItem("UserID"));
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const userDetailWithEmail = async (emailid,page) =>
{       
  try{
    let cancelToken;
    if(typeof cancelToken != typeof undefined)
    {
      cancelToken.cancel("API Call cancelled")
    }
    let response2 = await fetch(`/platform/v1/userdetail/${emailid}`)
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    const iscalled = await CreatApiLog("GET",page,"userdetail{id}",localStorage.getItem("UserID"));
    console.log("Api inside", data2)
    // return {data2};
    if(!data2 || (Array.isArray(data2) && data2.length === 0)){
      return [false, ""];
    }
    else{
      return [true, data2];
    }
    
  }catch(err){
    console.log("vercelerrro",err)
    return [false, ""];
  }
}

export const OrgTenentcheckget = async(tenentId, pageSize, page) =>{
   console.log("orgTenant", tenentId);
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let cancelToken;
      if(typeof cancelToken != typeof undefined)
      {
        cancelToken.cancel("API Call cancelled")
      }
      let response2 = await fetch(`/platform/v1/userdetailsid/${tenentId}/${parseInt(pageSize)}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("orgTenant check", data2);
      // return {data2};
      const iscalled = await CreatApiLog("GET",page,"userdetailsid{id}{id1}",localStorage.getItem("UserID"));
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const DeleteOrgUser = async (emailid,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'DELETE',
        url: `/platform/v1/userdetail/${emailid}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            
        }
      };
      try {
      const response2 = await axios.request(options2);
      console.log("response", response2);
      if (response2.status === 200) {
        const title = 'User Deletion';
        const description = `User with email ${emailid} has been deleted.`;
        
        const tennat_id = await getTennantId("userdetail{id}"); // Assuming tenentid is defined
        const statuses = false;
  console.log("tennat_id",tennat_id);
        await NotificationPost(title, description, localStorage.getItem("UserID"), tennat_id, statuses,"userdetail{id}");
        const iscalled = await CreatApiLog("DELETE",page,"userdetail{id}",localStorage.getItem("UserID"));
      }
  
      return response2;
      // axios.request(options2).then(function (response2) {
        
      //  console.log("response",response2);
      //  return response2;
       
      // //  window.location.reload();
      // })
      }
      catch (error) {
        console.error("Error:", error);
        throw error;
      }
}

export const getTransaction = async (start,limit,tennatId,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/tx',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          "start":start,
          "limit":limit,
          "tenantId":tennatId
           
        }
      };

     let jobsList=[] ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
        const iscalled = await CreatApiLog("POST",page,"tx",localStorage.getItem("UserID"));
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}
export const getTransactionblock = async (start,limit,tennatId,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/blocks',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          "start":start,
          "limit":limit,
          "tenantId":tennatId
           
        }
      };

     let jobsList=[] ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
        const iscalled = await CreatApiLog("POST",page,"blocks",localStorage.getItem("UserID"));
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}
export const nodeDetails = async (tenantId,page) =>
{       
  try{
    let response2 = await fetch(`/platform/v1/sigmanodesummary/${tenantId}`)
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    // console.log("Api inside", data2)
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"sigmanodesummary{id}",localStorage.getItem("UserID"));
    return [true, data2];
  }catch(err){
    console.log("vercelerrro",err)
    return [false, ""];
  }
    
}



export const getTennantId = async (page) =>
{       
  let usermailid = localStorage.getItem("UserID");
  
  try{
    let response2 = await fetch(`/platform/v1/userdetail/${usermailid}`)
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    console.log("getTennantId", data2)
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"userdetail{id}",localStorage.getItem("UserID"));
    return  (data2[0]).tennantId;
  }catch(err){
    console.log("vercelerrro",err)
    return "";
  }
    
}
export const createUserVisits = async(emailid,type,page) =>{

  const res = await fetch('https://geolocation-db.com/json/')
  // console.log("ipv4",await res.json())
  let k = (await res.json()).IPv4;
  console.log("ipv4",k)

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas = {
         "ipAddress":(k).toString(),
        "algoAddress":emailid,
        "networkType":type,
        "walletType":page
        
        }


const options2 = {
    method: 'POST',
    url: '/platform/v1/uservisitrecord',
    headers: {
        'x-api-key': `${key}`    
    },
    data: datas
    };
    
    axios.request(options2).then(function (response2) {
    console.log("hlo",response2);
    console.log("update successfull15")
    }).catch(function (error) {
        console.error("done2",error);
    });
    const iscalled = await CreatApiLog("POST",page,"uservisitrecord",localStorage.getItem("UserID"));
    
}
export const NotificationPost = async(title, description, email_id, tennat_id, statuses, page) => {

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {
           
    "title": title,
    "descriptions": description,
    "mailId": email_id,
    "epochtime": (Date.now())/1000,
    "tennatId": tennat_id,
    "statuses": statuses
  }

  const options2 = {
  method: 'POST',
  url: '/platform/v1/notification',
  data: data
  };
  const iscalled = await CreatApiLog("POST",page,"notification",localStorage.getItem("UserID"));
  axios.request(options2).then(function (response2) {
  console.log("notification", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});
}

export const NotificationSingle = async(id, email_id, status,page) => {
  console.log("status", status);
if(status != true)
{
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {
           
    "id": id,
    "mailId": email_id,
    "statuses": true
  }

  const options2 = {
  method: 'PUT',
  url: '/platform/v1/notificationbyid',
  data: data
  };
  const iscalled = await CreatApiLog("PUT",page,"notificationbyid",localStorage.getItem("UserID"));
  axios.request(options2).then(function (response2) {
  console.log("notification", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});
}
}

export const NotificationAll = async(email_id,page) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {   
    "mailId": email_id,
    "statuses": true
  }

  const options2 = {
  method: 'PUT',
  url: '/platform/v1/notification',
  data: data
  };
  const iscalled = await CreatApiLog("PUT",page,"notification",localStorage.getItem("UserID"));
  axios.request(options2).then(function (response2) {
  console.log("notification", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});

}

export const getNotificationById = async (emailid,page) => {
  console.log("mailnotify",emailid)
  const url = `/platform/v1/notification/${emailid}`;

  try {
    const response = await fetch(url);
    const iscalled = await CreatApiLog("GET",page,"notification{id}",localStorage.getItem("UserID"));
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const userByTenantId = async (tenantId,page) => {
  const url = `platform/v1/userdetailbytennantall/${tenantId}`;

  try {
    const response = await fetch(url);

    const data2 = await response.json();
    console.log("userdetailbytennant", data2)
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"userdetailbytennantall{id}",localStorage.getItem("UserID"));
    return [true, data2.length];
  }catch(err){
    console.log("userdetailbytennant",err)
    return [false,""];
  }
};
export const HelpandsupportPost = async(Ticket,Description,firstname,lastname,emailid,TennatId,statuse,page) =>{
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let datas = {
           
    "ticket": Ticket,
    "descriptions": Description,
    "firstName":firstname,
    "lastName":lastname,
    "mailId": emailid,
    "epochtime":"",
    "tennatId": TennatId,
    "statuses": statuse
  }

  const options2 = {
  method: 'POST',
  url: '/platform/v1/helpandsupport',
  headers: {
      'x-api-key': `${key}`    
  },
  data: datas
  };
  const iscalled = await CreatApiLog("POST",page,"helpandsupport",localStorage.getItem("UserID"));
  axios.request(options2).then(function (response2) {
  console.log("notification",response2);
  
  // console.log("update successfull15")
  }).catch(function (error) {
      console.error("done2",error);
});
}

export const getTicketsById = async (pageno,page) => {
  console.log("getticket",pageno)
  const url = `/platform/v1/helpandsupport/${pageno}`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });
    const iscalled = await CreatApiLog("GET",page,"helpandsupport{id}",localStorage.getItem("UserID"));
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const ResolveTicket = async(email_id,id,tenantId,page) => {
  console.log("email",email_id,id,tenantId);
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = { 
    "id":id,  
    "mailId": email_id,
    "statuses": true
  }

  const options2 = {
  method: 'PUT',
  url: '/platform/v1/helpandsupport',
  data: data
  };
  try {
    const response = await axios(options2);
    const result = response.data;
    const title = 'Sigma Help and Support';
    const description = `The ticket originating from ${email_id} has been resolved. Kindly review your email for updates. If you have any additional questions, please feel free to reach out to us through the admin mail or the Help and Support Ticket System.`;
    const tennat_id = tenantId;
    const statuses = false;
  
    await NotificationPost(title, description, email_id, tennat_id, statuses,"helpandsupport");
    const iscalled = await CreatApiLog("PUT",page,"helpandsupport",localStorage.getItem("UserID"));
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
//   axios.request(options2).then(function (response2) {
//   console.log("helpandsupportbyid", response2);
//   return [true, response2];
//   }).catch(function (error) {
//       console.error("done2", error);
//       return [false, 'Error occurred while fetching data'];
// });

}
export const getNFTProp = async (id,tennatId,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: `/platform/v1/nftdetails/${id}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          
          "tenantId":tennatId
           
        }
      };

     let jobsList=[] ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
        const iscalled = await CreatApiLog("POST",page,"nftdetails{id}",localStorage.getItem("UserID"));
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const getJobsCountByType = async (type,page) => {
  const url = `/platform/v1/jobsfetch/${type}`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });
    const iscalled = await CreatApiLog("GET",page,"jobsfetch{id}",localStorage.getItem("UserID"));
    if (response.ok) {
      const data = await response.json();
      return  data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log('Error:', error);
    return 0;
  }
};
export const getLatestJObTime = async (page) => {
  const url = `/platform/v1/jobsfetch`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });
    const iscalled = await CreatApiLog("GET",page,"jobsfetch",localStorage.getItem("UserID"));
  console.log("timeresponse", response);
    if (response.ok) {
      const data = await response.text();
      console.log("API Response Data:", data);
      console.log("--time--", data);
      return data;
    } else {
      return 0; 
    }
  } catch (error) {
    console.log('--time--', error);
    return 0;
  }
};


export const help1 = async(id,email_id,assignee,page) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = { 
    "id": id,  
    "mailId": email_id,
    "assignee":assignee
  
  }

  const options2 = {
  method: 'PUT',
  url: '/platform/v1/helpandsupportstatus',
  data: data
  };
  const iscalled = await CreatApiLog("PUT",page,"helpandsupportstatus",localStorage.getItem("UserID"));
  axios.request(options2).then(function (response2) {
  console.log("notification1", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});

};
export const getNotificationById1 = async (id,page) => {
  
  console.log("hi",id)
  const url = `/platform/v1/jobs/${id}`;

  try {
    const response = await fetch(url);
    const iscalled = await CreatApiLog("GET",page,"jobs{id}",localStorage.getItem("UserID"));
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};



export const getNotificationById2 = async(emailId,tenantId,page) =>{
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let datas = {
           
   
    "emailId": emailId,
    "tenantId": tenantId
   
  }

  const options2 = {
  method: 'POST',
  url: '/platform/v1/jobs',
  headers: {
      'x-api-key': `${key}`    
  },
  data: datas
  };
  const iscalled = await CreatApiLog("POST",page,"jobs",localStorage.getItem("UserID"));
  axios.request(options2).then(function (response2) {
  console.log("notification1",response2);
  
  // console.log("update successfull15")
  }).catch(function (error) {
      console.error("done2",error);
});
}



export const getNotificationById3 = async (userId, emailId, tenantId,page) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {
    "userId": userId,
    "emailId": emailId,
    "tenantId": tenantId
  };

  const options2 = {
    method: 'PUT',
    url: '/platform/v1/jobs',
    data: data
  };

  try {
    const response2 = await axios.request(options2);
    console.log("notification2", response2);
    const iscalled = await CreatApiLog("PUT",page,"jobs",localStorage.getItem("UserID"));
    return [true, response2];
  } catch (error) {
    console.error("done2", error);
    return [false, 'Error occurred while fetching data'];
  }
};


export const getNotificationById4 = async (userId,page) =>

{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'DELETE',
        url: `/platform/v1/jobsremove/${userId}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            
        }
      };
      const iscalled = await CreatApiLog("DELETE",page,"jobsremove",localStorage.getItem("UserID"));
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
       return response2;
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}

export const jobschedulardetailpost = async (email,role,tenentid,userlogstatus,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/jobschedule',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'mailId':`${email}`,
            'roleType': `${role}`,
            'tennatId':`${tenentid}`,
            'activity':`${userlogstatus}`
        }
      };
      const iscalled = await CreatApiLog("POST",page,"jobschedule",localStorage.getItem("UserID"));
      axios.request(options2).then(function (response2) {
       console.log("responsepost",response2);
       return response2;
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}
// export const jobreschedulardetail = async (schduletime) =>
// {       
//   let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//   // let userID = localStorage.getItem('UserID');
//   // let connectAddress = localStorage.getItem("walletAddress");
//   // let network = "AB";
  
//     axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//     //console.log("done1",response.data);
//       // console.log("date",date);
//       const options2 = {
//         method: 'POST',
//         url: `/platform/v1/updatedelay/${schduletime}`,
//         headers: {
//           'x-api-key': `${key}`    
//         },
       
//       };
      
//       axios.request(options2).then(function (response2) {
//        console.log("response",response2);
//        return response2;
//       //  window.location.reload();
//       }).catch(function (error) {
//           console.error("done2",error);
//       });
// }


export const jobreschedulardetail = async (schduletime,email,role,tenentid,userlogstatus,page) =>
{         
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: `/platform/v1/updatedelay/${schduletime}`,
        
      };
      try {
        const response = await axios(options2);
        const result = response.data;
      
        const mail_Id = email;
        const roletype=role;
        const tennat_id = tenentid;
        const usersettime = userlogstatus;
      
        await jobschedulardetailpost(localStorage.getItem("UserID"),roletype,tennat_id, usersettime,"updatedelay{id}");
        const iscalled = await CreatApiLog("POST",page,"updatedelay{id}",localStorage.getItem("UserID"));
        console.log('Response:', result);
        return result;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
}
export const jobschedulardetailget= async(page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/jobschedule`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      const iscalled = await CreatApiLog("GET",page,"jobschedule",localStorage.getItem("UserID"));
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const jobschedulardetailgetbyid= async(tennantId,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/jobschedule/${tennantId}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      const iscalled = await CreatApiLog("GET",page,"jobschedule{id}",localStorage.getItem("UserID"));
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const handleWriteToFile = async(tennantId,ipfshash,page) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
 
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const options2 = {
      method: 'POST',
      url: '/platform/v1/restdownload',
      headers: {
        'x-api-key': key,
        'Content-Disposition': 'attachment; filename="picture.pdf"',
      },
      data: {
        "tenantId": `${tennantId}`,
        "ipfsHash": `${ipfshash}`,
      },
      responseType: 'arraybuffer', // Set the response type to arraybuffer
    };
    

      try {
        
       
        const response = await axios(options2);
        console.log("reponsecheck",response);
        const iscalled = await CreatApiLog("POST",page,"restdownload",localStorage.getItem("UserID"));
        let datavalue = response.data;
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.pdf'); // Set the desired file name
        document.body.appendChild(link);
        link.click();
       
        console.log('download:', response);
       
      }catch(error){
      }
        
    
}
export const handleWriteToDocumentlist = async (start, limit,tennantId,page) => {
  const url = '/platform/v1/sigmadocbytid';
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    data: {
      start: start,
      limit: limit,
      tenantId:tennantId
    }
  };

  try {
    const response = await axios(options);
  const sigmadocData = response.data;
  console.log('Response:', sigmadocData);
  const iscalled = await CreatApiLog("POST",page,"sigmadocbytid",localStorage.getItem("UserID"));
  // Download the data as CSV
  if (sigmadocData && sigmadocData.length > 0) {
    const csvData = [
      "Document Name,Document ID,Version ID,Document Creation Date,File Modified Date,File Created Date,Document Status,NFT Creation Status,",
      ...sigmadocData.map(row => (
        `"${row.name__v}","${row.sigmaId}","${row.jobId}","${row.document_creation_date__v}","${row.file_modified_date__v}","${row.file_created_date__v}","${row.status__v}","${row.nftCreationStatus === '0' ? 'Pending' : row.nftCreationStatus === '1' ? 'Approved' : ''}"`
      )),
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'document_list.csv');
  }

  return sigmadocData;
} catch (error) {
  console.error('Error:', error);
  return null;
}
};
export const jobstatusupdate = async (tennantId,jobtype,jobstatus,page) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: `/platform/v1/jobhandle/${tennantId}/${jobtype}/${jobstatus}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {}
      };
      let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     const iscalled = await CreatApiLog("PUT",page,"jobhandle{id}{id1}{id2}",localStorage.getItem("UserID"));
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;


    
}

export const Jobstatusget= async(page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/jobhandle`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      const iscalled = await CreatApiLog("GET",page,"jobhandle",localStorage.getItem("UserID"));
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const uservisitrecord= async(id,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/uservisitrecord/${id}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      const iscalled = await CreatApiLog("GET",page,"uservisitrecord{id}",localStorage.getItem("UserID"));
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}


export const uservisitrecords= async(id,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/uservisitrecord`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      const iscalled = await CreatApiLog("GET",page,"uservisitrecord",localStorage.getItem("UserID"));
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const getoriginaldocprop = async (tennatId, docid,page) => {       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // const id = 31;

  const options2 = {
    method: 'POST',
    url: `/platform/v1/veevadocs/${tennatId}/${docid}`,
    headers: {
      'x-api-key': `${key}`    
    },
    data: '1',
  };

  let docsList = [];

  try {
    const response = await axios(options2);
    docsList = response.data;
    console.log('Response:', docsList);
    const iscalled = await CreatApiLog("GET",page,"veevadocs{id}{id1}",localStorage.getItem("UserID"));
  } catch (error) {
    console.error("Error:", error);
  }
  
  return docsList;
}

export const getoriginaldoccount = async (tennatId,page) => {       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // const id = 31;

  const options2 = {
    method: 'POST',
    url: `/platform/v1/doccount/${tennatId}`,
    headers: {
      'x-api-key': `${key}`    
    },
    data: '1',
  };

  let docscount = [];

  try {
    const response = await axios(options2);
    docscount = response.data;
    console.log('Response api doc count:', docscount);
    const iscalled = await CreatApiLog("POST",page,"doccount{id}",localStorage.getItem("UserID"));
  } catch (error) {
    console.error("Error:", error);
  }
  
  return docscount;
}
export const OrgPwdCheck = async(email,page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let cancelToken;
      if(typeof cancelToken != typeof undefined)
      {
        cancelToken.cancel("API Call cancelled")
      }
      let response2 = await fetch(`/platform/v1/pwdcheck/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
 
        const data2 = await response2.text(); // Get the raw response text
        const iscalled = await CreatApiLog("GET",page,"pwdcheck{id}",localStorage.getItem("UserID"));
        console.log("PWD check", data2);
        return data2;
      // return {data2};
      // return data2;

      
      // return [true, (data2[0]).tennantId];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const userByTenantIdAll = async (tenantId,page) => {
  const url = `platform/v1/userdetailbytennantall/${tenantId}`;
  console.log("url", url)
  let tidall;
  try {
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    const options2 = {
       method: 'GET',
    url: `/platform/v1/userdetailbytennantall/${tenantId}`,
    headers: {
        'x-api-key': `${key}`    
    },
   
    };
    const iscalled = await CreatApiLog("GET",page,"userdetailbytennantall{id}",localStorage.getItem("UserID"));
    await axios.request(options2).then(function (response2) {
    console.log("notification",response2);
    let dt =  response2.data;
    tidall=dt;
    console.log("notification",dt);
    // return [true, dt];
    // console.log("update successfull15")
    })
    // return {data2};
    // return [true, data2];
  }catch(err){
    console.log("userdetailbytennant",err)
    // return [false,""];
  }
  return tidall;
};
export const joblasttime= async(page) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/joblasttime`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      const iscalled = await CreatApiLog("GET",page,"joblasttime",localStorage.getItem("UserID"));
      return data2;
    }catch(err){
      console.log("vercelerrro",err)
      return "";
    }
     
}

export const getNFTTxBase = async (id,page) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  try {
    let response2 = await fetch(`/platform/v1/nfttxavalanche/${id}`,
      {
        headers: {
          'x-api-key': `${key}`
        },
      }
    )
    console.log("err",response2)
    const data2 = await response2.json();
    console.log("Api inside aws nft tx", data2);
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"nfttxavalanche{id}",localStorage.getItem("UserID"));
    return [true, data2];
  } catch (err) {
    console.log("vercelerrro", err);
    return [false, ""];
  }
};

export const getBlocksTxBase = async (id,page) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  try {
    let response2 = await fetch(`/platform/v1/blockstxavalanche/${id}`,
      {
        headers: {
          'x-api-key': `${key}`
        },
      }
    )
    console.log("err",response2)
    const data2 = await response2.json();
    console.log("Api inside aws block tx", data2);
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"blockstxavalanche{id}",localStorage.getItem("UserID"));
    return [true, data2];
  } catch (err) {
    console.log("vercelerrro", err);
    return [false, ""];
  }
};

export const getTxInputBase = async (id,page) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  try {
    let response2 = await fetch(`/platform/v1/txinput/${id}`,
      {
        headers: {
          'x-api-key': `${key}`
        },
      }
    )
    console.log("err",response2)
    const data2 = await response2.json();
    console.log("Api inside aws block tx", data2);
    // return {data2};
    const iscalled = await CreatApiLog("GET",page,"txinput{id}",localStorage.getItem("UserID"));
    return [true, data2];
  } catch (err) {
    console.log("vercelerrro", err);
    return [false, ""];
  }
};

export const CreatApiLog = async (method, page, apiName, mailId) =>
{       
  const res = await fetch('https://geolocation-db.com/json/')
  // console.log("ipv4",await res.json())
  let k = (await res.json()).IPv4;
  console.log("ipv4",k);

  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
   
      const options2 = {
        method: 'POST',
        url: '/platform/v1/apilog',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          "ipAddress": `${k}`,
          "method": `${method}`,
          "page": `${page}`,
          "apiName": `${apiName}`,
          "mailId": `${mailId}`
        }
      };
      
      try {
     let response = await axios.request(options2);
     let tentidresponse= await response.data;
     console.log("response",tentidresponse);
     return true;
      }catch(error){
        console.error("API error:",error);
        return false;
      }
     
      
}