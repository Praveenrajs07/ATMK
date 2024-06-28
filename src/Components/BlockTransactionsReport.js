import { Button, Col, Dropdown, Form, InputGroup, Row, Table, Badge, Modal, Spinner } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getTennantId, getTransactionblock, getNFTTxBase, getBlocksTxBase } from "../apifunction";
import Check from '../asserts/images/check_icon.svg';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";
import axios from 'axios';
function BlockTransactionsReport() {
    const [search, setSearch] = useState(false);
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const [StartValue, setStartValue] = useState(1);
    const [limit, setlimit] = useState(10);
    const [txh, setTxh] = useState([]);
    const history = useNavigate();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [transactions1, setTransactions1] = useState([]);

   // console.log("selected",roleId);
   let blockBuffer = [];
   let CountsBuffer = [];

   const [openModal, setOpenModal] = useState(false)
       
   const { logout } = useContext(AuthContext);
       
   const handleIdle = () => {
       setOpenModal(true);
   }
   const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 5 })
   
   const stay = () => {
       setOpenModal(false)
       idleTimer.reset()
   }
   
   const handleLogout = () => {
       logout()
       setOpenModal(false)
   } 
   const logout3 = async () =>
   {  
       
       let email=localStorage.getItem('UserID')
       console.log("emailid",email)
     
      localStorage.setItem("Login",false)
      localStorage.removeItem('Login');
      localStorage.setItem("UserID"," ");
      localStorage.removeItem('UserID');
      localStorage.removeItem('UserName');
      if ( localStorage.getItem('rememberMe')=== true) {
       localStorage.removeItem('rememberMe');
     } else {
       localStorage.removeItem('rememberMe');
     }
     history('/');



   } 
    // const getTransc = async() =>{
    //     if(limit == 10){
    //         let tnId = await getTennantId();
    //         let tx = await getTransactionblock(StartValue,limit,tnId);
    //         console.log("blocktxn",tx)
    //         setTxh(tx);
    //         if (tx.length === 0) {
    //             setReachedLastPage(true);
    //         } else {
    //             setReachedLastPage(false);
    //         }
    //         console.log("checktxh",txh)
    //     }
        
    // }
    // useEffect(() =>{getTransc()},[])
//     const getTranscAvalanche = async(value) => {
//         blockBuffer = [];
//         CountsBuffer = [];
//         let temp = [];
//         // Define the API endpoint URL
//     const apiUrl =
//     `https://api.basescan.org/api?module=account&action=tokennfttx&contractaddress=0xe57A6865Ee306143bCC2d30807cF3571A0655934&address=0xdc61dE4fED82E2CDbC5E31156c4dA41389Ae1e22&page=${value}&offset=10&startblock=0&endblock=99999999&sort=desc&apikey=AHSJCJMCVE468EJBIJ9KC1X4ZR7JVHKJE9`;
//   // Make the GET request to the API
//   await axios
//     .get(apiUrl)
//     .then((response) => {
//       // Handle the response data here
//       console.log("Avalanche Nft transaction",response.data); // This will be the ERC-721 transactions data
//       setTransactions(response.data.result); // Assuming 'result' contains the transaction data
//       temp = [...response.data.result];
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error('Error fetching data:', error);
//       getTranscAvalanche(value);
//     });
//     console.log(transactions);
//     await makeMultipleApiRequests(10,temp);
//     }

    const getTransactionsBase = async(value) =>{
        try{
            let [istrue, transactionactivity] = await getNFTTxBase(value,"BlockTransactionsReport");
            console.log("Api aws tx 1:",transactionactivity.result);
            setTransactions(transactionactivity.result);

            await makeMultipleApiRequests(10,transactionactivity.result);
        }
        catch(e){
            console.log("Api ERROR:",e);
        }
    }
    useEffect(() =>{
        // getTranscAvalanche(1);
        getTransactionsBase(1);
    },[]);


    // const makeApiRequestWithDelay2 = async (blockNo) => {
        
    //     let blockNum1 = parseInt(blockNo,10);
    //     let blockNum = blockNum1.toString(16);
    //     const apiUrl = `https://api.basescan.org/api?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${blockNum}&apikey=YourApiKeyToken;`
    //     try {
    //       const response = await axios.get(apiUrl);
      
    //       if (response.status === 200) {
    //         console.log('API Response:', response.data);
    //         CountsBuffer = [...CountsBuffer,(parseInt(response.data.result,16)).toString(10)];
    //       } else {
    //         console.error('API request failed with status:', response.status);
    //       }
    //     } catch (error) {
    //       console.error('Error making API request:', error);
    //     }
    //   };
    // const makeApiRequestWithDelay = async (blockNo) => {
        
    //     let blockNum1 = parseInt(blockNo,10);
    //     let blockNum = blockNum1.toString(16);
    //     const apiUrl = `https://api.basescan.org/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNum}&boolean=true&apikey=AHSJCJMCVE468EJBIJ9KC1X4ZR7JVHKJE9;`
    //     try {
    //       const response = await axios.get(apiUrl);
      
    //       if (response.status === 200) {
    //         console.log('API Response:', response.data);
    //         blockBuffer = [...blockBuffer,response.data.result];
    //       } else {
    //         console.error('API request failed with status:', response.status);
    //       }
    //     } catch (error) {
    //       console.error('Error making API request:', error);
    //       await makeApiRequestWithDelay(blockNo);
    //       await new Promise((resolve) => setTimeout(resolve, 200));
    //     }
    //   };
      const makeMultipleBlockApiCalls = async(blockNo) => {
        let blockNum1 = parseInt(blockNo,10);
        let blockNum = blockNum1.toString(16);
        try{
            let [istrue, blockTx] = await getBlocksTxBase(blockNum,"BlockTransactionsReport");
            console.log("Api aws blocks 1:",blockTx.result);
            blockBuffer = [...blockBuffer,blockTx.result];
        }
        catch(e){
            console.log("Api ERROR:", e);
        }
      }
      
      // Function to make multiple API requests with delays
      const makeMultipleApiRequests = async (count,tempr) => {
        let trans = tempr;
        console.log("check 5",transactions);
        console.log("Trans Ckeck : ",trans);
        if (Array.isArray(trans) && trans.length >= count) {
        for (let i = 0; i < count; i++) {
          await makeMultipleBlockApiCalls(trans[i].blockNumber);
        //   await new Promise((resolve) => setTimeout(resolve, 2000));
        //   await makeApiRequestWithDelay2(trans[i].blockNumber);
          // Adjust the delay time (in milliseconds) as needed
        //   await new Promise((resolve) => setTimeout(resolve, 200)); // 2 seconds delay
        }
            console.log("Trans Check Two:",blockBuffer);
            const combinedArray = tempr.map((item1,i) => {
                const matchingItem2 = blockBuffer.find((item2) => item2.hash === item1.blockHash);
                
                const matchingItem3 = CountsBuffer[i];
                // Check if there's a matching item in array2
                if (matchingItem2) {
                    let txLength =  matchingItem2.transactions.length;
                  // Merge properties from both arrays into a new object
                  return { ...item1, miner: matchingItem2.miner, TxCount: txLength };
                }
              
                // If no matching item in array2, return item from array1 as is
                return item1;
              })
            setTransactions1(combinedArray);
            console.log("Trans Check Three:",combinedArray); 
        }else {
            console.error("Invalid or insufficient transaction data.");
        }
      };
    const formatTime = (time) =>{
        let date = new Date(time);
        // Format the date and time using the toLocaleString method
        let formatted = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
        });
        // Display the formatted date and time
        // console.log(formatted);
        return formatted;
    }
    const pagination = async(value) =>{
        setStartValue(value);
        // let tnId = await getTennantId();
        // let tx = await getTransactionblock(value,limit,tnId);
        setTransactions1([]);
        await getTransactionsBase(value);

        // console.log("txhistory",tx)
        // setTxh(tx);
        if (transactions.length === 0) {
            setReachedLastPage(true);
        } else {
            setReachedLastPage(false);
        }
    }
    // const selectrow = async(value) =>{
    //     let tx = await getTransaction(StartValue,value,"543609ec-58ba-4f50-9757-aaf149e5f187");
    //     // console.log("txhistory",tx)
    //     setTxh(tx);
    //     // setlimit(value);
    //     selectrow(true);
    // }
        const calculateTimeAgo = (timestamp1) => {
        const timestamp = parseInt(timestamp1) * 1000;
          const currentTime = new Date();
          const previousTime = new Date(timestamp);
          const timeDifference = Math.abs(currentTime - previousTime) / 1000; // Convert milliseconds to seconds
      
          if (timeDifference < 60) {
            return 'a few seconds ago';
          } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
          } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
          } else if (timeDifference < 2592000) {
            const days = Math.floor(timeDifference / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
          } else if (timeDifference < 31536000) {
            const months = Math.floor(timeDifference / 2592000);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
          } else {
            const years = Math.floor(timeDifference / 31536000);
            return `${years} year${years !== 1 ? 's' : ''} ago`;
          }
        };
    return ( 
        <div>
            <Row className="mb-20">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Block Transactions Report</h4>
                </Col>
            </Row>
            <Row className="mb-3 align-items-center" style={{minHeight: '40px'}}>
                <Col xs={10} md={4} lg={3}>
                    {search && (
                        <Form>
                            <InputGroup className="form-search shadow">
                                <Button variant="reset" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button>
                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    aria-label="Write something to search"
                                    placeholder="Write something to search..."
                                />
                            </InputGroup>
                        </Form>
                    )}
                </Col>
                <Col xs={'auto'} className="ms-auto">
                    {/* <Button variant="outline-gray" className="me-0" onClick={() => setSearch(!search)}>
                        {search ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        ):(
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="d-block" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        )}
                    </Button> */}
                </Col>
            </Row>
            
            <div className="mb-20">
                <Table hover responsive>
                    <thead>
                        <tr>
                            {/* <th width="84">
                                <div className="d-flex align-items-center justify-content-between">
                                    <Dropdown size="sm" className="me-2">
                                        <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                            <img src={Eye} alt="Eye" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-filter-table">
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-1`}
                                                    label={`Show/Hide Columns`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-2`}
                                                    label={`Favourites`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-3`}
                                                    label={`Id`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-4`}
                                                    label={`File Name`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-5`}
                                                    label={`Document Name`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-6`}
                                                    label={`State`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-7`}
                                                    label={`Global Id`}
                                                />
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Check
                                        className="mb-0 check-single"
                                        type='checkbox'
                                        id={`default-8`}
                                    />
                                </div>
                            </th> */}
                             <th className="text-center">Block</th>
                             <th className="text-center">Hash</th>
                            <th className="text-center">Mined By</th>
                            <th className="text-center">Tx Count</th>
                            <th className="text-center">Date Mined</th>

                        </tr>
                    </thead>
                    <tbody>
                        {transactions1[0] === null || transactions1[0] === "" || transactions1[0] === undefined || transactions1[0] === "undefined" ?
                        (<><tr>
                            <td></td>
                            <td></td>
                            <td><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'50px'}}>
                        <Spinner animation="border" variant="dark" style={{ width: '50px', height: '50px',borderWidth:'5px' }}/>
                      </div></td>
                            </tr>
                            </>) :
                        (<>
                        {transactions1.map((r,i)=>{
                            return(<>
                            <tr>
                            {/* <td width="84">
                                <div className="d-flex justify-content-end">
                                    <Form.Check
                                        className="mb-0 check-single"
                                        type='checkbox'
                                        id={`default-9`}
                                    />
                                </div>
                            </td> */}
                            <td className="text-center">{(r.blockNumber)}</td>

                             <td className="text-center">{(r.blockHash).substring(0, 5)}...{(r.hash).substring((r.blockHash).length - 5)}</td>
                             {/* <td className="text-center"><Badge pill bg="success"><img src={Check} alt="success badge" />success</Badge></td> */}
                            {/* <td className="text-center text-truncate"> {(r.blockHash).substring(0, 5)}...{(r.blockHash).substring((r.blockHash).length - 5)}</td> */}
                            {/* <td className="text-center">{(r.miner !== null) ? <>{(r.miner).substring(0, 5)}...{(r.miner).substring((r.miner).length - 5)}</> : "Null"}</td> */}
                            <td className="text-center">{(r.miner !== null || r.miner !== undefined) ? r.miner : 0x0}</td>
                            <td className="text-center">{(r.TxCount !== null || r.TxCount !== undefined) ? r.TxCount : 0}</td>
                            {/* <td className="text-center">{(r.transactionCount)}</td> */}
                            <td className="text-center">{calculateTimeAgo(r.timeStamp)}</td>
                            {/* <td>{r.logs[0].data}</td> */}
                            {/* <td className="text-center">{r.blockNumber}</td>
                            <td className="text-center">{r.index}</td> */}
                        </tr>
                            </>)
                        })}
                        </>)}
                        
                        
                    </tbody>
                </Table>
                <Row className="mt-4">
                    <Col md={4} className="mb-md-0 mb-3 d-flex align-items-center">
                        {/* <h6 className="me-2 mb-0 text-muted">Showing 10 of 10:</h6>
                        <Dropdown size="sm">
                            <Dropdown.Toggle variant="gray" id="dropdown-basic">
                                Select Rows
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-filter">
                                <Dropdown.Item onClick={()=>selectrow(25)}>25 Rows</Dropdown.Item>
                                <Dropdown.Item onClick={()=>selectrow(50)}>50 Rows</Dropdown.Item>
                                <Dropdown.Item onClick={()=>selectrow(100)}>100 Rows</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </Col>
                    <Col md={8} className="d-flex justify-content-md-end justify-content-center">
                        <ul className="d-flex pagination list-unstyled">
                            <li>
                            <Link  className={StartValue !== 1 ? 'next' : StartValue === 1 ? 'prev disabled' : ''} onClick={()=>pagination(StartValue-1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                            <li><Link className='active'  onClick={()=>pagination(1)} >{(StartValue !== 1) ? (StartValue) : "1"}</Link></li>
                            {/* <li><Link className={StartValue === 10 ? 'active' : ''} onClick={()=>pagination(10)}>2</Link></li>
                            <li><Link className={StartValue === 20? 'active' : ''} onClick={()=>pagination(20)}>3</Link></li>
                            <li><Link className={StartValue === 30? 'active' : ''} onClick={()=>pagination(30)}>4</Link></li>
                            <li><Link className={StartValue === 40? 'active' : ''} onClick={()=>pagination(40)}>5</Link></li>
                            <li><Link className={StartValue === 50 ? 'active' : ''} onClick={()=>pagination(50)}>6</Link></li> */}
                            <li>
                            <Link className={`next ${reachedLastPage ? 'disabled' : ''}`}onClick={() => {if (!reachedLastPage){pagination(StartValue + 1); }}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            {/* /.mb-20 */}
            <Modal show={openModal} onHide={stay}>
        <Modal.Header closeButton>
          <Modal.Title>Your session is about to expire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your session is about to expire. You'll be automatically signed out.</p>
          <p>Do you want to stay signed in?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={logout3}>
            Sign out now
          </Button>
          <Button variant="primary" onClick={stay}>
            Stay signed in
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
     );
}
export default BlockTransactionsReport;