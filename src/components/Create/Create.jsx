import React, {useRef,useEffect,useState} from 'react';
import {Container, Row} from "react-bootstrap";
// import {ErrorToast, IsEmpty} from "../../helper/FormHelper";
import {useNavigate} from "react-router-dom";
// import {NewTaskRequest,allUser} from "../../APIRequest/APIRequest";
import {useSelector} from "react-redux";
const Create = () => {
    let titleRef,descriptionRef=useRef();
    let navigate = useNavigate ();
    let [member, setMember] = useState("");

    useEffect(()=>{
       //allUser();
    },[])
       
    //let getAllUser = useSelector((state) => state.summary.allUsersData)

    //let selectValue=(e) => setMember(e.target.value)

    // const CreateNew = () => {
    //     let title=titleRef.value;
    //     let description=descriptionRef.value;
    //     let assigMember = member;
    //     if(IsEmpty(title)){
    //         ErrorToast("Title Required")
    //     }
    //     else if(IsEmpty(description)){
    //         ErrorToast("Description Required")
    //     }
    //     else if(IsEmpty(assigMember)){
    //         ErrorToast("assigMember Required")
    //     }
    //     else {
    //         NewTaskRequest(title,description,assigMember).then((res)=>{
    //             if(res===true){
    //                 navigate("/All")
    //             }
    //         })
    //     }
    // }

    return (
        <Container fluid={true} className="content-body">
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 >Create New Task For - {"member"}</h4>
                            <br/>
                            {/* <input ref={(input)=>titleRef=input} placeholder="Task Name" className="form-control animated fadeInUp" type="text"/> */}
                            <br/>
                            {/* <textarea ref={(input)=>descriptionRef=input} rows={5} placeholder="Task Description" className="form-control animated fadeInUp" type="text"/> */}
                            <br/>
                            {/* <select className="form-select" aria-label="Default select example" onChange={selectValue}>
                                {getAllUser.map((item)=><option key={item._id} value={item.firstName+item.lastName}>{item.firstName+" "+item.lastName}</option>)}
                            </select> */}
                            <br/>
                            {/* <button onClick={CreateNew} className="btn float-end btn-primary">Create</button> */}
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};
export default Create;