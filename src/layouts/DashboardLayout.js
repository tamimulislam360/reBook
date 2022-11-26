import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdminOrSeller from '../hooks/useAdminOrSeller';
import NavBar from '../shared/NavBar/NavBar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    const [isAdminOrSeller] = useAdminOrSeller(user?.email)
    return (
        <div>
            {/* <NavBar /> */}
            <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
            <Outlet/>
            
            </div> 
            <div className="drawer-side  border-r border-neutral/50">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 text-secondary">
               
                {
                    isAdminOrSeller === 'buyer' && <li><Link className="font-semibold" to="/dashboard/myorders">My Orders</Link></li>
                }
                {
                isAdminOrSeller === 'seller' && <>
                    <li><Link className="font-semibold" to="/dashboard/addproduct">Add A product</Link></li>
                    <li><Link className="font-semibold" to="/dashboard">My Products</Link></li>
                    <li><Link className="font-semibold" to="/dashboard/mybuyers">My buyers</Link></li>
                </>
                }
                {
                isAdminOrSeller === 'admin' && <>
                    <li><Link className="font-semibold" to="/dashboard/sellers">All Sellers</Link></li>
                    <li><Link className="font-semibold" to="/dashboard/buyers">All Buyers</Link></li>
                    <li><Link className="font-semibold" to="/dashboard/reported">Reported Items</Link></li>
                </>
                }
                </ul>
            
            </div>
            </div>
        </div>
    );
};

export default DashboardLayout;