import { UsersList } from "@/components/users-list"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <UsersList />
    </div>
  )
}

