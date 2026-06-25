"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { ArrowRight } from "lucide-react";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
    const [loading, setLoading] = React.useState(false);
    const handleSubscription = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Button
            disabled={loading}
            onClick={handleSubscription}
            size="lg"
            className="bg-linear-to-b from-gray-600 to-gray-800 px-5 py-2 text-white rounded-lg"
        >
            {props.isPro ? "Manage Subscriptions" : "Upgrade to Pro"}
            <ArrowRight className="size-4" />
        </Button>
    );
};

export default SubscriptionButton;
