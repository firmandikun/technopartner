import React from 'react'

const Footer = () => {
  return (
    <footer >
        <div className="container  py-3 shadow-lg card border-0">
            <div className="">
            <ul className="nav d-flex justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/"> <img src="/assets/home1.png" className="img-fluid" alt="..." width={30} height={30} /></a>
                </li>

                <li className="mx-5"></li>
            
                <li className="nav-item">
                
                    <a className="nav-link" href="/categori"> <img src="/assets/menu1.png" className="img-fluid" alt="..." width={30} height={30} /> </a>
                </li>
                
                </ul>

            </div>
        </div>
    </footer>
  )
}

export default Footer
