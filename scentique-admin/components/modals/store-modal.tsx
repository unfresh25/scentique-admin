"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);

            toast.success("Tienda creada exitosamente");
        } catch (error) {
            toast.error("Error al crear la tienda");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Crear tienda"
            description="Crear una tienda nueva para manejar tus productos."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >   
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Escribre el nombre de la tienda..." {...field} />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant={"outline"} 
                                    onClick={storeModal.onClose}
                                >
                                    Cancelar
                                </Button>
                                <Button disabled={loading} type="submit">
                                    Crear
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
        </Modal>
    );
};