import PurchasedItemsListComponent from "../components/purchase/PurchasedItemsListComponent";
import SideNavBarComponent from "../components/SideNavBarComponent";

import '../styles/items_list_page.css';

const ItemsListPage = () => {
    return(
        <>
        <SideNavBarComponent />
        <div className="items-list-page-main-container">
            <h1>Items Lists Page</h1>
            <PurchasedItemsListComponent />
        </div>
        </>
    )
};

export default ItemsListPage;