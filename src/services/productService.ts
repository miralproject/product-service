import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (name: string, description: string, price: number) => {
    return await prisma.product.create({
        data: {
            name,
            description,
            price,
        },
    });
};

export const getProducts = async () => {
    return await prisma.product.findMany();
};

export const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id },
    });
};

export const updateProduct = async (id: number, name: string, description: string, price: number) => {
    return await prisma.product.update({
        where: { id },
        data: { name, description, price },
    });
};

export const deleteProduct = async (id: number) => {
    return await prisma.product.delete({
        where: { id },
    });
};
