import UserProfileSettings from "@/components/dashboard/UserProfileSettings";

export default function UserProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Account Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your reader coordinates and upload custom profile images.
        </p>
      </div>

      <UserProfileSettings />
    </div>
  );
}
