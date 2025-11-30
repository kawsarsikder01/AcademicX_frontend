import { SettingsForm } from "@/components/Admin/SettingsForm";
import AdminLayout from "../admin-layout";

export default function SettingsPage() {
    return (
        <AdminLayout>
            <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                <SettingsForm />
            </div>
        </AdminLayout>
    );
}