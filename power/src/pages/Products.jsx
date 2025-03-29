// Products.js
import { useNavigate } from 'react-router-dom';
 
const Products = () => {
   const navigate = useNavigate();
   return (
      <div className="container">
         <div className="title">
            <h1>Order Product CockTails</h1>
         </div>
         <button className="btn" onClick={() => navigate('order-summary')}>
            Place Order
         </button>
      </div>
   );
};
 
export default Products;