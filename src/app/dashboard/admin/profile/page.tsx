import UserProfileSettings from "@/components/dashboard/UserProfileSettings";

export default function AdminProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Executive Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Verify root level clearance and update your admin avatar.
        </p>
      </div>

      <UserProfileSettings />
    </div>
  );
}
