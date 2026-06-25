"use client";

import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type Props = {
    isPro: boolean;
};

const SubscriptionButton = ({ isPro }: Props) => {
    const [loading, setLoading] = React.useState(false);

    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleSubscription = async () => {
        if (!isSignedIn) {
            router.push("/sign-in?redirect_url=/checkout");
            return;
        }

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
            {isPro ? "Manage Subscription" : "Upgrade to Pro"}
            <ArrowRight className="size-4" />
        </Button>
    );
};

export default SubscriptionButton;