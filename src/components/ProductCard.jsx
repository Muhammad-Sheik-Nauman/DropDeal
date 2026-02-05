"use client"
import React, { useState } from 'react'
import { deleteProduct } from '@/app/actions';
import {
    Card,

    CardContent,

    CardFooter,
    CardHeader,

} from "@/components/ui/card"

const ProductCard = ({ product }) => {
    const [showChart, setShowCart] = useState(false);
    const [deleting, setDeleting] = useState(false)

    const habdleDelete = async () => {
        if (!confirm("Remove this product from tracking?")) return;

        setDeleting(true);

        const result = await deleteProduct(product.id);

        if (result.error) {
            toast.error(result.error);

        } else {
            toast.success(result.message || "product deleted successfully!")
            setUrl("");
        }
        setDeleting(false)
    }
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className={"pb-3"}>
                <div className='flex gap-4'>
                    {product.image_url && (
                        <img src="{product.image_url}" alt="{product.name}" className='w-20 h-20 abject-cover rounded-md border' />
                    )}
                </div>

            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}

export default ProductCard