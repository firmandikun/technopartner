import { convertToIdr } from "../../../utilis/converts";
import Image from "next/image";
import Dialog from "../../atom/dialog";
import { useState } from "react";
interface profileProps {
    say: any,
    title: string,
    saldo: any,
    point: any,
    qrcode: string;
}

const CardProfile = (props: profileProps,) => {
  const { say, title, saldo, point, qrcode }  = props;
  const [open, setOpen] = useState<boolean>(false);


  const handleDialog = () => {
    setOpen(true);
  };


  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
        <div className="card m-4 border-0 shadow" style={{borderRadius: 20}} >
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted"> {say} </h6>
                <h5 className="card-title">{title}</h5>
                <div className="row d-flex  align-items-center px-3">
                     {/* <div className="bg-white rounded-circle shadow"> */}
                     <button type="button" className="btn btn-white rounded-circle shadow p-0 " onClick={handleDialog} >
                        <img src={qrcode} className="rounded-circle" width={30} height={30} alt="..." />
                      </button>
                   
                     {/* </div> */}

                     <Dialog open={open} size="lg"  >
                        <div className="p-3 d-flex flex-column">

                            <p className="text-center my-3" >Show the QR code bellow to the cashier</p>  
                            <img src={qrcode} className="img-fluid" alt="..." />
                            <button className="btn btn-danger btn-sm mt-3" onClick={handleDialogClose} >close</button>
                        </div>
                     </Dialog>

                    

                    <div className="mx-4">
                  
                     <div className="d-flex">
                         <div className="">saldo</div>
                        <div className="mx-4">{convertToIdr(saldo, "Rp")}</div>
                     </div>
                     <div className="d-flex">
                         <div className="">point</div>
                        <div className="mx-4">{point}</div>
                     </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CardProfile