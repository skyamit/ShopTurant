Designing ShopTurant :

1. Schema - shopTurant

2. User 
	id, name, mobile, email, passwordHash, isSeller,
	registeredAt, lastLogin, isActive
3. Product
	id, userId, title, summary, type, price, discount, 
	createdAt, imageId, isActive
4. productReview
	id, productId, userId, title, rating, createdAt
5. Category 
	id, title
6. productCategory
	id, productId, categoryId
7. Address
	id, name, mobileNo, email, line1, line2, city, state, 
	country, isActive
8. Cart 
	id, userId, productId, isActive
9. order
	id, userId, orderedAt, status, cost, addressId
10. orderItem
	id, orderId, productId
11. transaction
	id, userId, orderId, status, createdAt
