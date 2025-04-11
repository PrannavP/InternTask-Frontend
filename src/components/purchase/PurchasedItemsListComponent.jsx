import axios from "axios";
import { useState, useEffect } from "react";

const PurchasedItemsListComponent = () => {
    const [purchases, setPurchases] = useState([]);
    const [groupedPurchases, setGroupedPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get("http://localhost:5147/api/purchase/getallpurchases");
                setPurchases(response.data);
            } catch (error) {
                console.error("Error fetching purchases:", error);
            }
        };

        fetchPurchases();
    }, []);

    useEffect(() => {
        // Group purchases by billNo
        const grouped = (Array.isArray(purchases) ? purchases : []).reduce((acc, purchase) => {
            const { purchaseId, billNo, date, itemName, quantity, rate, totalPrice, remaining_Qty } = purchase;

            if (!acc[billNo]) {
                acc[billNo] = {
                    billNo,
                    date,
                    items: [],
                    grandTotal: 0,
                };
            }

            acc[billNo].items.push({ purchaseId, itemName, quantity, rate, totalPrice, remaining_Qty });
            acc[billNo].grandTotal += totalPrice;

            return acc;
        }, {});

        setGroupedPurchases(Object.values(grouped));
    }, [purchases]);

    return (
        <div className="purchased-items-list-container">
            <h2>Purchased Items List</h2>
            {groupedPurchases.length > 0 ? (
                <table className="purchased-items-table">
                    <thead>
                        <tr>
                            <th>Purchase Id</th>
                            <th>Bill No</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Grand Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedPurchases.map((group) => (
                            <tr key={group.billNo}>
                                <td>{group.items[0]?.purchaseId}</td>
                                <td>{group.billNo}</td>
                                <td>{new Date(group.date).toLocaleDateString()}</td>
                                <td>
                                    {group.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <strong>Item:</strong> {item.itemName} - {item.quantity} x {item.rate} = {item.totalPrice.toLocaleString()} <br />
                                            <span className="remaining-qty">
                                                (Remaining: {item.remaining_Qty})
                                            </span>
                                        </div>
                                    ))}
                                </td>
                                <td>{group.grandTotal.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No purchases found.</p>
            )}
        </div>
    );
};

export default PurchasedItemsListComponent;