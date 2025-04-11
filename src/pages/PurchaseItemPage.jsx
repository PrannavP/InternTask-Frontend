import PurchaseItemComponent from "../components/purchase/PurchaseItemComponent";
import SideNavBarComponent from "../components/SideNavBarComponent";

import '../styles/purchase_item.css';

const PurchaseItemPage = () => {
    return (
        <>
        <SideNavBarComponent />
        <div className="purchase-item-page-main-container">
            <h1 className="purchase-item-page-header">Purchase Items Page</h1>
            <PurchaseItemComponent />
        </div>
        </>
    )
};

export default PurchaseItemPage;