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

Actions :
0. every one can view home
1. user can register
2. user can login
3. user can reset password
4. user can search for a item
5. user can add address
6. user can add item to cart
7. user can order items
8. user can view previous orders
9. user can rate ordered items
10. user can change their address