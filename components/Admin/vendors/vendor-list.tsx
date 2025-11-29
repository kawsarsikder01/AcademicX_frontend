import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cookies } from "next/headers";
import VendorTable from "./vendor-table";

export interface vendorType {
    id: string;
    ownername: string;
    email: string;
    company_name: string;
    bio: string;
    website: string;
    phone: string;
    address: string;
    logo?: string;
    driver?: string;
    verification_status?: string;
    created_at?: string;
    updated_at?: string;
}

// Server Component
const VendorList = async () => {
    let vendors: vendorType[] = [];

    try {
        const cookieStore = await cookies();
        const adminToken = cookieStore.get("admin_token")?.value;


        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/vendors`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
            cache: "no-store", // ensure fresh data on every request
        });


        if (!res.ok) throw new Error("Failed to fetch categories");

        const awaitedRes =  await res.json();

        vendors = awaitedRes.data;
    } catch (error) {


        console.error(error);
    }

    return (
        <div className="@container/main flex flex-1 flex-col gap-2 p-4">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Vendor List</CardTitle>
                </CardHeader>
                <CardDescription className="px-3">
                    <VendorTable vendors={vendors}  />
                </CardDescription>
            </Card>
        </div>
    );
};

export default VendorList;
