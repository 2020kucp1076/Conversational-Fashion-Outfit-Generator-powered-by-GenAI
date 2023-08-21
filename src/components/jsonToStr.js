let index = 0;

export function browsingHistoryAndCarts(browsingHistoryAndCart) {
    const userCartDescription = browsingHistoryAndCart.users.map(user => {
        const frequentlyViewedItems = user["Frequently Viewed Items"].map(item => (
            `${item["Product Name"]} (${item.Brand}, ${item.Category})`
        )).join(', ');

        const cartItems = user.Cart.map(item => (
            `${item["Product Name"]} (${item.Brand}, ${item.Category})`
        )).join(', ');

        return (
            `User ID: ${user["User ID"]}\n` +
            `User Name: ${user["User Name"]}\n` +
            `Frequently Viewed Items: ${frequentlyViewedItems}\n` +
            `Cart Items: ${cartItems}\n\n`
        );
    });
    return userCartDescription;
}


const groupDataByUserId = (data) => {
    const groupedData = {};
    data.user_history.forEach((entry) => {
        const userId = entry['User ID'];
        if (!groupedData[userId]) {
            groupedData[userId] = [];
        }
        groupedData[userId].push(entry);
    });
    return groupedData;
};


export const getPurchaseHistory = (historyData) => {
    const descriptions = [];
    const groupedData = groupDataByUserId(historyData);
    for (const userId in groupedData) {
        const userEntries = groupedData[userId];
        const userName = userEntries[0]['User Name'];
        const userAge = userEntries[0]['Age'];
        const userBodyType = userEntries[0]['Body Type'];
        const userRegional = userEntries[0]['Regional'];
        const userStyle = userEntries[0]['Style'];
        const userFavoriteBrand = userEntries[0]['Favorite Brand'];
        const userLocation = userEntries[0]['Location'];
        const userPreferredPriceRange = userEntries[0]['Preferred Price Range'];

        const userPurchases = userEntries.map((entry) => {
            const purchaseDate = entry['Purchase Date'];
            const productName = entry['Product Name'];
            const category = entry['Category'];
            const brand = entry['Brand'];
            const price = entry['Price'];
            const itemId = entry['Item ID'];
            return `On ${purchaseDate}, ${userName} (User ID: ${userId}) from ${userLocation}, purchased a ${category} (${productName}) with ID ${itemId} from the brand ${brand} for a price of ${price}.`;
        }).join('\n');

        const userDescription = `User ID: ${userId}\nName: ${userName}\nAge: ${userAge}\nBody Type: ${userBodyType}\nRegional: ${userRegional}\nStyle: ${userStyle}\nFavorite Brand: ${userFavoriteBrand}\nLocation: ${userLocation}\nPreferred Price Range: ${userPreferredPriceRange}\n\nRecent Purchases:\n${userPurchases}\n\n`;

        descriptions.push(userDescription);
    }
    return descriptions;
};