import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe ("test suite: add to cart", () => {
    it("add an existing product to the cart", () => {
        
    });

    it("adds a new product to the cart", () => {

        spyOn (localStorage, 'setItem');

        spyOn (localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        
        addToCart ('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 5);
        except (cart.length).toEqual(1);
        except (localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});