import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

function FoodItemDetail() {
    const { id } = useParams();
    const [foodItem, setFoodItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFoodItem = async () => {
        try {
            const response = await axiosinstance.get(`/fooditems/foodbyid/${id}`);
            setFoodItem(response.data);
        } catch (error) {
            console.error("Error fetching food item:", error);
            setError("Failed to fetch food item.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoodItem();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!foodItem) {
        return <p>No food item found.</p>;
    }

    return (
        <div>
            <h1>{foodItem.name}</h1>
            <p>Description: {foodItem.description}</p>
            <p>Price: ${foodItem.price}</p>
            <p>Category ID: {foodItem.category}</p>
        </div>
    );
}

export default FoodItemDetail;
