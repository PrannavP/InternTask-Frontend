import AssignItemsFormComponent from "../components/assign_items/AssignItemsFormComponent";
import SideNavBarComponent from "../components/SideNavBarComponent";

import '../styles/assign-items-page.css';

const AssignItemsPage = () => {
    return(
        <>
        <SideNavBarComponent />
        <div className="assign-item-page-main-container">
            <AssignItemsFormComponent />
        </div>
        </>
    );
};

export default AssignItemsPage;