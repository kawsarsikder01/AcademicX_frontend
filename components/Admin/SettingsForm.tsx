"use client"

import { useEffect, useState } from "react"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const SettingsForm = () => {

    // -------------------------------
    // STATES
    // -------------------------------
    const [settings, setSettings] = useState({
        site_name: "",
        site_logo: "",
        site_favicon: "",
        site_email: "",
        site_phone: "",
        site_address: "",
        base_currency: "",
        currency_symbol: "",
        currency_position: "",
        site_charge: "",
        has_space: false,
        email_notifications: false,
        sms_notifications: false,
        in_app_notification: false,
        firebase_notification: false,
    })

    const router = useRouter()

    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null)

    // Fetch initial data
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/settings")
                const data = await res.json()

                const settings = data.data

                setSettings({
                    ...settings,
                    has_space: Boolean(settings.has_space),
                    email_notifications: settings.email_notifications === "enabled",
                    sms_notifications: settings.sms_notifications === "enabled",
                    in_app_notification: settings.in_app_notification === "enabled",
                    firebase_notification: settings.firebase_notification === "enabled",
                })

                setLogoPreview(settings.site_logo ? settings.site_logo : null)
                setFaviconPreview(settings.site_favicon ? settings.site_favicon : null)
            } catch (error) {
                toast.error("Failed to load settings")
            }
        }

        fetchSettings()
    }, [])

    // -------------------------------
    // IMAGE PREVIEW HANDLER
    // -------------------------------
    const handleImagePreview = (e: any, type: "logo" | "favicon") => {
        const file = e.target.files[0]
        if (!file) return

        const url = URL.createObjectURL(file)

        if (type === "logo") {
            setLogoPreview(url)
            setSettings(prev => ({ ...prev, site_logo: file }))
        } else {
            setFaviconPreview(url)
            setSettings(prev => ({ ...prev, site_favicon: file }))
        }
    }

    // -------------------------------
    // UPDATE HANDLER (POST)
    // -------------------------------
    const handleUpdate = async () => {
        const formData = new FormData()

        Object.entries(settings).forEach(([key, value]) => {
            formData.append(key, value as any)
        })

        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                body: formData,
            })

            if (!res.ok) throw new Error("Update failed")

            toast.success("Settings updated successfully!")
            router.refresh()
        } catch (error) {
            toast.error("Failed to save settings")
        }
    }

    // -------------------------------
    // RENDER UI
    // -------------------------------
    return (
        <Card>
            <CardHeader>
                <CardTitle>Site Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">

                {/* GENERAL */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">General Settings</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-4">Site Name</Label>
                            <Input
                                value={settings.site_name}
                                onChange={e => setSettings({ ...settings, site_name: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* BRANDING */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Branding</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* LOGO */}
                        <div>
                            <Label className="mb-4">Site Logo</Label>
                            <Input type="file" onChange={e => handleImagePreview(e, "logo")} />

                            {logoPreview && (
                                <img
                                    src={logoPreview}
                                    alt="logo preview"
                                    className="w-20 h-20 mt-2 rounded border object-cover"
                                />
                            )}
                        </div>

                        {/* FAVICON */}
                        <div>
                            <Label className="mb-4">Site Favicon</Label>
                            <Input type="file" onChange={e => handleImagePreview(e, "favicon")} />

                            {faviconPreview && (
                                <img
                                    src={faviconPreview}
                                    alt="favicon preview"
                                    className="w-16 h-16 mt-2 rounded border object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* CONTACT INFO */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <Label className="mb-4">Site Email</Label>
                            <Input
                                value={settings.site_email || ""}
                                onChange={e => setSettings({ ...settings, site_email: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label className="mb-4">Site Phone</Label>
                            <Input
                                value={settings.site_phone || ""}
                                onChange={e => setSettings({ ...settings, site_phone: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className="mb-4">Address</Label>
                            <Input
                                value={settings.site_address || ""}
                                onChange={e => setSettings({ ...settings, site_address: e.target.value })}
                            />
                        </div>

                    </div>
                </div>

                <Separator />

                {/* CURRENCY SETTINGS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Currency Settings</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <Label className="mb-4">Base Currency</Label>
                            <Input
                                value={settings.base_currency}
                                onChange={e => setSettings({ ...settings, base_currency: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label className="mb-4">Currency Symbol</Label>
                            <Input
                                value={settings.currency_symbol}
                                onChange={e => setSettings({ ...settings, currency_symbol: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label className="mb-4">Currency Position</Label>
                            <Select
                                value={settings.currency_position}
                                onValueChange={value => setSettings({ ...settings, currency_position: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                </div>

                <Separator />

                {/* CHARGES */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Charges</h3>

                    <div>
                        <Label className="mb-4">Site Charge (%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={settings.site_charge}
                            onChange={e => setSettings({ ...settings, site_charge: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Switch
                            checked={settings.has_space}
                            onCheckedChange={value => setSettings({ ...settings, has_space: value })}
                        />
                        <Label>Has Space Between Currency</Label>
                    </div>
                </div>

                <Separator />

                {/* NOTIFICATIONS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notifications</h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="mb-4">Email Notifications</Label>
                            <Switch
                                checked={settings.email_notifications}
                                onCheckedChange={v => setSettings({ ...settings, email_notifications: v })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label className="mb-4">SMS Notifications</Label>
                            <Switch
                                checked={settings.sms_notifications}
                                onCheckedChange={v => setSettings({ ...settings, sms_notifications: v })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label className="mb-4">In-App Notifications</Label>
                            <Switch
                                checked={settings.in_app_notification}
                                onCheckedChange={v => setSettings({ ...settings, in_app_notification: v })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label className="mb-4">Firebase Notifications</Label>
                            <Switch
                                checked={settings.firebase_notification}
                                onCheckedChange={v => setSettings({ ...settings, firebase_notification: v })}
                            />
                        </div>
                    </div>
                </div>

            </CardContent>

            <CardFooter className="flex justify-end">
                <Button onClick={handleUpdate}>Save Settings</Button>
            </CardFooter>
        </Card>
    )
}
