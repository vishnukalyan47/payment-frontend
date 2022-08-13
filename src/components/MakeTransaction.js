import React, { useEffect, useRef, useState } from 'react'
import '../styles/MakeTransaction.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function MakeTransaction() {
//

    
      const [name, setname] = useState()
    const [accNo, setaccNo] = useState()
    const [clearBal, setclearBal] = useState()
    const [currency, setcurrency] = useState("currency")
    const [overdraft, setoverdraft] = useState(false)
    const [bic, setbic] = useState()
    const [institution, setinstitution] = useState()
    const [holdername, setholdername] = useState()
    const [holderNo, setholderNo] = useState()
    const [transfertypeVal, settransfertypeVal] = useState("transfer type")
    const [messagecodes, setmessagecodes] = useState("message codes")
    const [amount, setamount] = useState()
    const [transferfee, settransferfee] = useState()

    const EnterCorrectId = () => toast("Enter correct Account Number");

const senderDetails = () =>{
    if(accNo.length != 14) return  toast("Minimum length required");
    axios.post("http://localhost:8080/customers/detailsofcustomer", {
        customerid:accNo
    })
    .then(res=>{
        console.log(res)
        res = res.data; //just for working only with the data..
        setname(res.accountholdername);
        setclearBal(res.clearbalance);
      (res.overdraftflag === 0) ? setoverdraft(false) : setoverdraft(true);
    })
    .catch(e=> {
        console.log(e.response.data)
        return EnterCorrectId();
    })
}



const bankDetails = () =>{
axios.post("http://localhost:8080/bank/bankdetails",{
bic:bic
})
.then((res)=>{
res = res.data;
setinstitution(res.bankname);
})
.catch(e=> {
    return toast("Enter a valid BIC");
})
}


    const checkBlacklist = () =>{
        console.log("Check Holder name in sanction list ",holdername);

        //if present in list then dont show to enter the acc no of reciever...
    }

    const submitHandler = () =>{

        if(accNo===undefined || accNo.length!=14) {
            return EnterCorrectId();
        }
        if(!institution) return toast("Enter Bank Details");
        if(!holdername) return toast("Enter receiver's name");
        if(!holderNo) return toast("Enter receiver's account number");
        if(messagecodes==="message codes")  return toast("Select a message code");
        if(transfertypeVal==="transfer type") return toast("Select a transfer type");
        if(!amount) return toast("Amount should be greater than 0")
       


        const data = {
            "customer":{
                customerid:accNo
            },
            "rcbank":{
                bic
            },
            "transfertypes":{
                transfertypecode: transfertypeVal,
            },
            "message":{
            messagecode:messagecodes
            },
            inramount:amount,
            transferfees: transferfee,
            recieveraccountholdernumber: holderNo,
            recieveraccountholdername : holdername
        }
        axios.post("http://localhost:8080/transaction/savedata",data)
        .then(res=>{
            return toast("SUCCESS");
        })
        .catch(err=>{
        return toast("FAILED");
        })
    }
 
 

    return (
        <div>
            <Link to="/home" style={{textDecoration:"none"}}><h4>Back</h4></Link>

            <div>
                <div >Sender's Details</div>
                <div >
                    <label >Account No</label>
                    <input type="text" value={accNo} 
                    onChange={e=>setaccNo(e.target.value)}
                     />
                     <button onClick={senderDetails}>Get Details</button>
                    <label >Name</label>
                    <input type="text" value={name} />
                    <label >Clear Balance</label>
                    <input value={clearBal}/>
                </div>
                <div>Receiver's Details</div>
                <div>
                    <label >BIC(Bank ID)</label>
                    <input type="text" value={bic}  
                    onChange={e=>setbic(e.target.value)}
                    />
                    <button onClick={bankDetails}>Bank Details</button>
                    <label >Institution Name</label> 
                    <input value={institution}/>
                    <div>
                        {/* <button onClick={checkBlacklist}>Check</button> */}
                        <label >Holder Acc No</label>
                        <input value={holderNo}
                         onChange={e=>setholderNo(e.target.value)}
                         />
                         
                        <label >Holder Name</label>
                        <input value={holdername}
                        onChange={e=>setholdername(e.target.value)}
                        />
                    </div>
                    
                </div>
                <div>Transaction Details</div>
                <div>
                    <div className="dropdown">
                        <button className="dropbtn">{transfertypeVal}</button>
                            <div className="dropdown-content">
                                <button onClick={e=>{settransfertypeVal("Customer Transfer") }}>
                                    Customer TO Customer</button >
                            </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">{messagecodes}</button>
                            <div className="dropdown-content">
                                <button onClick={e=>setmessagecodes("CHQB")}>CHQB</button>
                                <button onClick={e=>setmessagecodes("CORT")}>CORT</button>
                                <button onClick={e=>setmessagecodes("HOLD")}>HOLD</button>
                                <button onClick={e=>setmessagecodes("INTC")}>INTC</button>
                            </div>
                    </div>
                   <div>
                    <label >Amount</label>
                            <input type="number" value={amount} 
                            onChange={e=>{
                                setamount(e.target.value)
                              const pres = e.target.value;
                              settransferfee(pres*0.0025)

                            }}
                            />
                    </div>
                    <label >Transfer fee(0.25% of Amount)</label>
                    <input type="text" value={transferfee} />
                </div>
            
            </div>
            <div>

            <div>
        <Button onClick={submitHandler}>Submit</Button>
        <ToastContainer />
      </div>
   

      
    </div>
        </div>
    )
}

export default MakeTransaction
