export type Restaurant = {
	id: number;
	name: string;
	cuisine: string;
	rating: number;
	location: string;
	price_range: string;
	menu?: Menu;
};

type Menu = {
	id: number;
	restaurantId: number;
	dessert: Dish[];
	entrance: Dish[];
	main_dishes: Dish[];
}[]

export type Dish = {
	name: string;
	description: string;
	price: number;
};
