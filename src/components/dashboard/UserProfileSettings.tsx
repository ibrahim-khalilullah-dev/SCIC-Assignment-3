"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, Button, Input } from "@heroui/react";
import { Settings, User, Edit3, Upload, Mail, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function UserProfileSettings() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile image must be under 2MB.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const payload = await res.json();
      if (payload.success) {
        setImageUrl(payload.data.url);
        toast.success("Image uploaded. Click save to apply changes.");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch {
      toast.error("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || "");
    setImageUrl(user.image || "");
    setIsEditing(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image: imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile.");
        return;
      }

      setUser({
        ...user,
        name,
        image: imageUrl,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      toast.error("Server communication error.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-default-50 border-none p-6 rounded-[24px] shadow-md flex flex-col items-center text-center relative overflow-hidden">
          <div className="relative mt-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary bg-default-100 flex items-center justify-center relative group">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-[10px] text-white font-bold">
                  Uploading...
                </div>
              )}
            </div>

            {isEditing && (
              <label className="absolute bottom-0 right-0 h-8 w-8 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-3.5 h-3.5" />
              </label>
            )}
          </div>

          <div className="mt-5 space-y-1">
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <span className="text-xs text-muted-foreground block">
              {user.email}
            </span>
            <span className="inline-block mt-3 px-3 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">
              {user.role}
            </span>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-7">
        <Card className="bg-default-50 border-none p-6 sm:p-8 rounded-[24px] shadow-md space-y-6">
          <div className="border-b border-default-100 pb-5 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" /> Profile Settings
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Customize your credentials and upload your profile avatar.
              </p>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="flat"
                color="primary"
                radius="sm"
                size="sm"
                className="font-bold"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                isRequired
                type="text"
                label="Full Name"
                value={name}
                onValueChange={setName}
                variant="bordered"
                radius="sm"
                startContent={
                  <User className="size-4 text-default-400 pointer-events-none" />
                }
              />

              <Input
                isDisabled
                type="email"
                label="Email Address"
                value={user.email}
                variant="bordered"
                radius="sm"
                className="opacity-60 cursor-not-allowed"
                startContent={
                  <Mail className="size-4 text-default-400 pointer-events-none" />
                }
              />

              <div className="pt-4 border-t border-default-100 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="flat"
                  radius="sm"
                  onClick={handleCancel}
                  className="font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  radius="sm"
                  isLoading={isSaving}
                  disabled={isSaving || isUploading}
                  className="font-bold shadow-lg shadow-primary/20"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-1.5 border-b border-default-100 pb-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {user.name}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 border-b border-default-100 pb-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {user.email}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 border-b border-default-100 pb-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Account Role
                </span>
                <span className="text-sm font-semibold text-foreground capitalize">
                  {user.role}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  System Clearance
                </span>
                <span className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Active NextMart Node
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
