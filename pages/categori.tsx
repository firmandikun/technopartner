import axios from 'axios'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'

const Categori = () => {


    const [category, setCategory] = useState([])
    const [menu, setMenu] = useState([])

    const fetchData = async () => {
        const token = Cookies.get("token");


        var bodyFormData = new FormData();
        bodyFormData.append("show_all", 1);
        //fetch user from Rest API
        await axios.post("https://soal.staging.id/api/menu", bodyFormData, {
            headers:{ Authorization: `Bearer ${token}` },
            data: bodyFormData

        })
        .then((response) => {
    
            //set response user to state
            // setUser(response.data);
             console.log(response.data.result)
            //  const data = response.data.result
             setCategory(response.data.result.categories);
             setMenu(response.data.result.categories.menu);
            //  setData(data.greeting)
            
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    

  return (
    <Layout>
        <nav className="d-flex" style={{ overflow: 'scroll' }} >
        {
            category.map((item) => {
                console.log(item.menu);
                
                return (
                   <a className="nav-link ">{item.category_name}</a>
                   
                )
            })
        }
        </nav>
        <div className='container' >
            {
                category.map((item) => {
                    console.log("item :", item);
                    
                    return (
                       <>
                            <p className=" ">{item.category_name}</p>

                            {item.menu.map((items) => {
                                return (

                                    <div className="card mb-3" >
                                    <div className="row g-0">
                                      <div className="col-2">
                                        <img src={items.photo} className="" alt="..." width={50} height={60} />
                                      </div>
                                      <div className="col-8">
                                        <div className="card-body d-flex">
                                          <div>
                                          <p className="text-sm fw-bold">{items.name}</p>
                                          <p className="text-sm">{items.description}</p>
                                          </div>
                                          <p className="text-sm"><small className="text-muted">{items.price} </small></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                   
                                )
                            } )}

                          

                       </>
                    )
                })
            }



        </div>
    </Layout>
  )
}

export default Categori